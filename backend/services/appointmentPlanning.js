const fhirService = require('./fhir')
const uuidv4 = require('uuid/v4')
const { schedule: Schedule, slot: Slot } = require('@schemas')
const controller = require('@controller')
const helper = require('@helper')
const SCHEDULE_CODES = require('@constants/Schedules')
const Identifiers = require('@constants/Identifiers')
const moment = require('moment-timezone')

const lunchBreakStart = {
  hour: '12',
  minute: '30',
}

const lunchBreakEnd = {
  hour: '13',
  minute: '30',
}

const vacation = [
  {
    month: '7',
    date: '12',
  },
]

function generateSlots({
  slotStartDateTime,
  slotEndDateTime,
  sortedSlots = [],
  schedule,
}) {
  const createSlotPromises = []
  let variableDay = moment.tz(slotStartDateTime, 'Asia/Ulaanbaatar')

  while (variableDay <= slotEndDateTime) {
    if (
      vacation.some(
        vacationDay =>
          variableDay.month() === vacationDay.month &&
          variableDay.date() === vacationDay.date
      ) ||
      variableDay.day() === 0 // Sunday
    ) {
      //  it is off day
      //  let's skip
    } else {
      // loop for 15 min interval
      let minuteInterval = 15

      let variableTime = moment.tz(
        {
          year: variableDay.year(),
          month: variableDay.month(),
          day: variableDay.date(),
          hour: 8,
          minute: 0 + minuteInterval,
          second: 0,
        },
        'Asia/Ulaanbaatar'
      )

      let appointmentEndTime = moment.tz(
        {
          year: variableDay.year(),
          month: variableDay.month(),
          day: variableDay.date(),
          hour: 17,
          minute: 0,
          second: 0,
        },
        'Asia/Ulaanbaatar'
      )

      const lunchBreakStartDateTime = moment.tz(
        {
          year: variableDay.year(),
          month: variableDay.month(),
          day: variableDay.date(),
          hour: parseInt(lunchBreakStart.hour),
          minute: parseInt(lunchBreakStart.minute),
          second: 0,
        },
        'Asia/Ulaanbaatar'
      )

      const lunchBreakEndDateTime = moment.tz(
        {
          year: variableDay.year(),
          month: variableDay.month(),
          day: variableDay.date(),
          hour: parseInt(lunchBreakEnd.hour),
          minute: parseInt(lunchBreakEnd.minute),
          second: 0,
        },
        'Asia/Ulaanbaatar'
      )

      while (variableTime <= appointmentEndTime) {
        const periodStart = variableTime.clone().subtract(15, 'minutes')
        const periodEnd = variableTime.clone()

        if (
          lunchBreakStartDateTime <= periodStart &&
          periodEnd <= lunchBreakEndDateTime
        ) {
          // it is lunchtime
          // no slots
        } else {
          if (
            !sortedSlots.some(slot => {
              // find slot intersection

              if (
                new Date(slot.end) <= periodStart ||
                periodEnd <= new Date(slot.start)
              ) {
                // ends before or starts after
                return false
              } else {
                // else is intersection
                return true
              }
            })
          ) {
            const newSlot = new Slot({
              identifier: [
                {
                  use: 'usual',
                  system: 'http://livercenter.mn/fhir/identifiers/slot',
                  value: uuidv4(),
                },
              ],
              serviceCategory: [SCHEDULE_CODES.ServiceCategory.GeneralPractice],
              serviceType: [SCHEDULE_CODES.ServiceType.GeneralPractice],
              specialty: [SCHEDULE_CODES.Specialty.GeneralPractice],
              // appointmentType: {},
              schedule: helper.getReference(schedule),
              status: 'free',
              start: periodStart.toISOString(),
              end: periodEnd.toISOString(),
              overbooked: false,
              // comment:
            })

            createSlotPromises.push(
              fhirService.postResource('Slot', newSlot.toJSON())
            )
          }
        }

        variableTime.add(15, 'minutes')
      }
    }

    variableDay.add(1, 'days')
  }

  return createSlotPromises
}

async function updateAppointmentPlanning() {
  // get Practitioners
  // get Practitioner appointments
  // create appointments for each practitioners if not exists
  // update appointments of each practitioners if exists
  // fill appointments with slots

  try {
    const practitionersResponse = await fhirService.getResource(
      'PractitionerRole',
      {
        role: 'http://terminology.hl7.org/CodeSystem/practitioner-role|doctor',
        'organization.name': 'Элэгний төв лаборатори',
        _include: [
          'PractitionerRole:organization',
          'PractitionerRole:practitioner',
        ],
      }
    )

    const practitionersBundle = practitionersResponse.data

    if (practitionersBundle.entry && practitionersBundle.entry.length > 0) {
      const practitioners = practitionersBundle.entry
        .filter(
          entry =>
            entry.resource && entry.resource.resourceType === 'Practitioner'
        )
        .map(entry => entry.resource)

      /* #region  create schedule array */

      const practitionerSchedulePromises = practitioners.map(practitioner => {
        // using get request to Schedule, because get request to Slot
        // will result in only 20 slots, leading to crawling pages

        console.log(practitioner)

        return fhirService
          .getResource('Schedule', {
            actor: `Practitioner/${practitioner.id}`,
          })
          .then(scheduleResponse => {
            const scheduleBundle = scheduleResponse.data

            const scheduleResources = scheduleBundle.entry.map(
              entry => entry.resource
            )

            return {
              practitioner: practitioner,
              schedule: scheduleResources,
            }
          })
      })

      const practitionerScheduleArray = await Promise.all(
        practitionerSchedulePromises
      ).catch(errorInfo => {
        throw errorInfo
      })

      /* #endregion */

      /* #region  create/update slots */
      practitionerScheduleArray.map(async practitionerAndSchedules => {
        const { practitioner, schedule } = practitionerAndSchedules
        const currentGeneralPracticeSchedule =
          schedule &&
          schedule.find(schedule =>
            schedule.serviceType.some(serviceType =>
              controller.codeIntersects(
                serviceType,
                SCHEDULE_CODES.ServiceType.GeneralPractice
              )
            )
          )

        const today = moment()
          .tz('Asia/Ulaanbaatar')
          .startOf('day')

        const threeMonthsAfter = today.clone().add(7, 'days')

        console.log(currentGeneralPracticeSchedule)
        if (currentGeneralPracticeSchedule) {
          // update

          /* #region  update Schedule if exists */
          const tempGeneralPracticeSchedule = new Schedule({
            ...currentGeneralPracticeSchedule,
            active: true,
            planningHorizon: {
              start: today.toISOString(),
              end: threeMonthsAfter.toISOString(),
            },
            // comment: {}
          }).toJSON()

          const updatedGeneralPracticeSchedule = await fhirService
            .putResource('Schedule', tempGeneralPracticeSchedule)
            .then(response => response.data)
            .catch(errorInfo => {
              throw errorInfo
            })

          const slotsResponse = await fhirService
            .getResource('Schedule', {
              _id: currentGeneralPracticeSchedule.id,
              _revinclude: ['Slot:schedule'],
            })
            .then(response => response.data)
            .catch(errorInfo => {
              throw errorInfo
            })

          const slotResources = slotsResponse.entry
            .filter(
              entry => entry.resource && entry.resource.resourceType === 'Slot'
            )
            .map(entry => entry.resource)

          const sortedSlots = helper.orderBy(slotResources, 'start', 'asc')

          /* #region  delete slots if period is in the past */
          const deleteSlotPromises = []
          sortedSlots.forEach(async slot => {
            if (moment.tz(slot.end, 'Asia/Ulaanbaatar') < today) {
              // delete
              deleteSlotPromises.push(
                fhirService.deleteResource('Slot', slot.id)
              )
            }
          })

          await Promise.all(deleteSlotPromises).catch(errorInfo => {
            throw errorInfo
          })
          /* #endregion */

          // slots

          const createSlotPromises = generateSlots({
            slotStartDateTime: today,
            slotEndDateTime: threeMonthsAfter,
            sortedSlots: sortedSlots,
            schedule: updatedGeneralPracticeSchedule,
          })

          console.log('createSlotPromises: ', createSlotPromises.length)
          await Promise.all(createSlotPromises).catch(errorInfo => {
            throw errorInfo
          })
          /* #endregion */
        } else {
          // create

          /* #region  Create Schedule if not exists */
          const tempGeneralPracticeSchedule = new Schedule({
            identifier: [
              {
                ...Identifiers.LiverCenter.Schedule,
                value: today.toISOString(),
              },
            ],
            active: true,
            serviceCategory: [SCHEDULE_CODES.ServiceCategory.GeneralPractice],
            serviceType: [SCHEDULE_CODES.ServiceType.GeneralPractice],
            specialty: [SCHEDULE_CODES.Specialty.GeneralPractice],
            actor: [
              {
                reference: `Practitioner/${practitioner.id}`,
              },
            ],
            planningHorizon: {
              start: today.toISOString(),
              end: threeMonthsAfter.toISOString(),
            },
            // comment: {}
          })

          const newGeneralPracticeSchedule = await fhirService
            .postResource('Schedule', tempGeneralPracticeSchedule.toJSON())
            .then(response => response.data)
            .catch(errorInfo => {
              throw errorInfo
            })

          console.log(
            'new General practice schedule',
            newGeneralPracticeSchedule
          )

          // slots
          const createSlotPromises = generateSlots({
            slotStartDateTime: today,
            slotEndDateTime: threeMonthsAfter,
            schedule: newGeneralPracticeSchedule,
          })

          console.log('createSlotPromises: ', createSlotPromises.length)
          await Promise.all(createSlotPromises).catch(errorInfo => {
            throw errorInfo
          })
          /* #endregion */
        }
      })
      /* #endregion */
    }
  } catch (errorInfo) {
    console.log(errorInfo)
  }
}

module.exports = {
  updateAppointmentPlanning,
}
