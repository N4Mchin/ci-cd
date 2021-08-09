const express = require('express')
const router = new express.Router()

const MAIN_MENU = {
  adminUser: [
    {
      id: '711',
      icon: 'profile',
      name: 'Admin Dashboard',
      route: '/adminUser/profile/1',
    },
    {
      id: '712',
      icon: 'profile',
      name: 'Organization',
      route: '/organization',
    },
    {
      id: '7121',
      icon: 'profile',
      name: 'Organization',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '712',
      route: '/organization/:id',
    },
    {
      id: '713',
      icon: 'profile',
      name: 'User',
      route: '/user',
    },
    {
      id: '7131',
      icon: 'profile',
      name: 'User',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '713',
      route: '/user/:id',
    },
  ],
  receptionist: [
    {
      id: '2',
      icon: 'bar-chart',
      name: 'Dashboard',
      route: '/reception',
    },

    {
      id: '21',
      icon: 'user',
      name: 'Reception',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '21',
      route: '/reception/:id',
    },
    {
      id: '211',
      icon: 'profile',
      name: 'Dashboard',
      mpid: '-1',
      menuParentId: '-1',
      route: '/reception/profile/1',
    },
    {
      id: '22',
      icon: 'file',
      name: 'Reports',
      route: '/reception/report',
    },
    {
      id: '23',
      icon: 'user',
      name: 'Patient',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '23',
      route: '/reception/patient/:id',
    },
    {
      id: '24',
      icon: 'bars',
      name: 'External Samples',
      route: '/reception/externalSamples',
    },
  ],
  'external-receptionist': [
    {
      id: '2',
      icon: 'bar-chart',
      name: 'Dashboard',
      route: '/reception',
    },

    {
      id: '21',
      icon: 'user',
      name: 'Reception',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '21',
      route: '/reception/:id',
    },
    {
      id: '211',
      icon: 'profile',
      name: 'Dashboard',
      mpid: '-1',
      menuParentId: '-1',
      route: '/reception/profile/1',
    },
    {
      id: '22',
      icon: 'file',
      name: 'Reports',
      route: '/reception/report',
    },
    {
      id: '23',
      icon: 'user',
      name: 'Patient',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '23',
      route: '/reception/patient/:id',
    },
    {
      id: '24',
      icon: 'bars',
      name: 'External Samples',
      route: '/reception/externalSamples',
    },
  ],
  'senior-laboratory-technician': [
    {
      id: '9',
      icon: 'stock',
      name: 'Dashboard',
      route: '/laboratory/dashboard',
    },
    {
      id: '919',
      icon: 'user',
      name: 'Patient List',
      route: '/laboratory/patient',
    },
    {
      id: '9191',
      icon: 'user',
      mpid: '-1',
      menuParentId: '-1',
      name: 'Customers',
      route: '/laboratory/patient/:id',
    },
    {
      id: '9200',
      icon: 'experiment',
      name: 'Tests',
    },
    {
      id: '92001',
      icon: 'info-circle',
      name: 'Specimen Condition',
      mpid: '9200',
      menuParentId: '9200',
      bpid: '92001',
      breadcrumbParentId: '9200',
      route: '/laboratory/specimenCondition',
    },
    // {
    //   id: '92002',
    //   icon: 'bars',
    //   name: 'Result Entry',
    //   mpid: '9200',
    //   menuParentId: '9200',
    //   bpid: '92002',
    //   breadcrumbParentId: '9200',
    //   route: '/laboratory/test',
    // },
    {
      id: '9201',
      name: 'Rapid test',
      icon: 'experiment',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9201',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/rapidTests',
    },

    {
      id: '92003',
      icon: 'check-circle',
      name: 'Menu_TestResultVerification',
      mpid: '9200',
      menuParentId: '9200',
      bpid: '92003',
      breadcrumbParentId: '9200',
      route: '/laboratory/testResultVerification',
    },

    {
      id: '9300',
      name: 'Storage',
      icon: 'database',
      route: '/laboratory/storage',
    },
    // {
    //   id: '9700',
    //   icon: 'cloud',
    //   name: 'Documents',
    //   route: '/laboratory/document',
    // },
    {
      id: '9800',
      icon: 'file',
      name: 'Reports',
      route: '/laboratory/report',
    },
  ],
  'laboratory-technician': [
    {
      id: '9',
      icon: 'stock',
      name: 'Dashboard',
      route: '/laboratory/dashboard',
    },
    {
      id: '919',
      icon: 'user',
      name: 'Patient List',
      route: '/laboratory/patient',
    },
    {
      id: '9191',
      icon: 'user',
      mpid: '-1',
      menuParentId: '-1',
      name: 'Customers',
      route: '/laboratory/patient/:id',
    },

    {
      id: '9200',
      icon: 'experiment',
      name: 'Tests',
      route: '/laboratory/test',
    },
    {
      id: '92001',
      icon: 'info-circle',
      name: 'Specimen Condition',
      mpid: '9200',
      menuParentId: '9200',
      bpid: '92001',
      breadcrumbParentId: '9200',
      route: '/laboratory/specimenCondition',
    },
    {
      id: '92002',
      icon: 'bars',
      name: 'Result Entry',
      mpid: '9200',
      menuParentId: '9200',
      bpid: '92002',
      breadcrumbParentId: '9200',
      route: '/laboratory/test',
    },
    {
      id: '9201',
      name: 'Rapid test',
      icon: 'experiment',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9201',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/rapidTests',
    },
    {
      id: '92011',
      name: 'DailyLog',
      icon: 'experiment',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9201',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/rapidTests/dailyLog',
    },
    {
      id: '9202',
      icon: 'experiment',
      name: 'Viral Load Test',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9202',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/viralLoadTests',
    },
    {
      id: '92021',
      icon: 'file',
      name: 'DailyLog',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '92021',
      breadcrumbParentId: '9202',
      route: '/laboratory/test/viralLoadTests/dailyLog',
    },
    {
      id: '9203',
      icon: 'experiment',
      name: 'Биохими',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9203',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/biochemistry',
    },
    {
      id: '92031',
      icon: 'file',
      name: 'DailyLog',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '92031',
      breadcrumbParentId: '9203',
      route: '/laboratory/test/biochemistry/dailyLog',
    },
    {
      id: '9204',
      icon: 'experiment',
      name: 'Хематологи',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9204',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/hematology',
    },
    {
      id: '92041',
      icon: 'file',
      name: 'DailyLog',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9204',
      breadcrumbParentId: '9204',
      route: '/laboratory/test/hematology/dailyLog',
    },
    {
      id: '9205',
      icon: 'experiment',
      name: 'Иммунологи',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9205',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/immunology',
    },
    {
      id: '92051',
      icon: 'file',
      name: 'DailyLog',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9205',
      breadcrumbParentId: '9205',
      route: '/laboratory/test/immunology/dailyLog',
    },
    {
      id: '9206',
      icon: 'experiment',
      name: 'Coagulation',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9206',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/coagulation',
    },
    {
      id: '92061',
      icon: 'experiment',
      name: 'DailyLog',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9206',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/coagulation/dailyLog',
    },
    {
      id: '9207',
      icon: 'experiment',
      name: 'Генотип',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '92061',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/genotype',
    },
    {
      id: '9208',
      icon: 'experiment',
      name: 'Urinalysis',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9208',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/urinalysis',
    },
    {
      id: '9209',
      icon: 'experiment',
      name: 'ESR',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9209',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/esr',
    },
    {
      id: '9210',
      icon: 'experiment',
      name: 'Research Samples',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9210',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/researchSample',
    },
    {
      id: '9211',
      icon: 'experiment',
      name: 'Anti-HDV',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9211',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/antiHDV',
    },
    {
      id: '92111',
      icon: 'file',
      name: 'DailyLog',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9211',
      breadcrumbParentId: '9211',
      route: '/laboratory/test/antiHDV/dailyLog',
    },
    {
      id: '9212',
      icon: 'experiment',
      name: 'Ferritin',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9212',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/ferritin',
    },
    {
      id: '92121',
      icon: 'file',
      name: 'DailyLog',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9212',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/ferritin/dailyLog',
    },
    {
      id: '9213',
      icon: 'experiment',
      name: 'Vitamin D3',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9213',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/vitaminD3',
    },
    {
      id: '9214',
      icon: 'experiment',
      name: 'Sars-Cov 2-IgG',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9214',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/sarsCov2IgG',
    },
    {
      id: '9215',
      icon: 'experiment',
      name: 'Sars-Cov 2-IgG Elisa',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9215',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/sarsCov2IgGElisa',
    },
    {
      id: '92131',
      icon: 'file',
      name: 'DailyLog',
      mpid: '-1',
      menuParentId: '-1',
      bpid: '9213',
      breadcrumbParentId: '9200',
      route: '/laboratory/test/vitaminD3/dailyLog',
    },
    {
      id: '92201',
      icon: 'database',
      name: 'Reagents',
      mpid: '9200',
      menuParentId: '9200',
      bpid: '92001',
      breadcrumbParentId: '9200',
      route: '/laboratory/reagent',
    },
    {
      id: '920002',
      icon: 'bars',
      name: 'External Samples',
      mpid: '9200',
      menuParentId: '9200',
      bpid: '920002',
      breadcrumbParentId: '9200',
      route: '/laboratory/externalSamples',
    },
    {
      id: '9300',
      name: 'Storage',
      icon: 'database',
      route: '/laboratory/storage',
    },

    // {
    //   id: '9400',
    //   icon: 'shopping-cart',
    //   name: 'Orders',
    //   route: '/laboratory/order',
    // },
    // {
    //   id: '9600',
    //   icon: 'ellipsis',
    //   name: 'Supplemental Samples',
    //   route: '/laboratory/otherSamplesRegistry',
    // },
    // {
    //   id: '9700',
    //   icon: 'cloud',
    //   name: 'Documents',
    //   route: '/laboratory/document',
    // },
    {
      id: '9800',
      icon: 'file',
      name: 'Reports',
      route: '/laboratory/report',
    },
  ],
  phlebotomist: [
    {
      id: '8',
      icon: 'bar-chart',
      name: 'Dashboard',
      route: '/phlebotomy/dashboard',
    },
    {
      id: '81',
      icon: 'menu',
      name: 'Order List',
      route: '/phlebotomy',
    },
    {
      // deprecated
      id: '810',
      icon: 'experiment',
      name: 'Order List',
      mpid: '-1',
      menuParentId: '-1',
      route: '/phlebotomy/patient/:id',
    },
    {
      id: '811',
      icon: 'experiment',
      name: 'Order List',
      mpid: '-1',
      menuParentId: '-1',
      route: '/phlebotomy/serviceRequestList/:id',
    },
    {
      id: '82',
      icon: 'profile',
      name: 'Dashboard',
      mpid: '-1',
      menuParentId: '-1',
      route: '/phlebotomy/profile/:id',
    },

    {
      id: '82',
      icon: 'medicine-box',
      name: 'Tools',
      route: '/phlebotomy/tool',
    },
    {
      id: '83',
      icon: 'file',
      name: 'Reports',
      route: '/phlebotomy/report',
    },
  ],
  practitioner: [
    {
      id: '5',
      icon: 'bar-chart',
      name: 'Dashboard',
      route: '/practitioner',
    },
    {
      id: '51',
      icon: 'user',
      name: 'Profile',
      route: '/practitioner/profile/1',
    },
    {
      id: '52',
      icon: 'bars',
      name: 'PatientList',
      route: '/practitioner/patient',
    },
    {
      id: '521',
      icon: 'user',
      name: 'PatientInformation',
      mpid: '-1',
      menuParentId: '-1',
      route: '/practitioner/patient/:id',
    },
  ],
  dlivr: [
    {
      id: '621',
      icon: 'experiment',
      name: 'D-LIVR',
      route: '/practitioner/dlivr',
    },
    {
      id: '521',
      icon: 'user',
      name: 'PatientInformation',
      mpid: '-1',
      menuParentId: '-1',
      route: '/practitioner/patient/:id',
    },
  ],
  patient: [
    // {
    //   id: '1',
    //   icon: 'experiment',
    //   name: 'dashboard',
    //   route: '/patient/dashboard',
    // },
    // {
    //   id: '11',
    //   icon: 'user',
    //   name: 'settings',
    //   route: '/patient/:id',
    // },
    {
      id: '12',
      icon: 'user',
      name: 'Test Results',
      route: '/patient/results',
    },
  ],
}

router.get('/menu', async (req, res) => {
  const { user } = req

  console.log(user)
  const menu = []

  user.permission.scope.forEach(scope => {
    switch (scope) {
      // case 'developer':
      //   menu = [
      //     ...new Set([
      //       ...MAIN_MENU.receptionist,
      //       ...MAIN_MENU['senior-laboratory-technician'],
      //       ...MAIN_MENU['laboratory-technician'],
      //       ...MAIN_MENU.phlebotomist,
      //       ...MAIN_MENU.practitioner,
      //     ]),
      //   ]
      //   break
      case 'adminUser':
        menu.push(...MAIN_MENU.adminUser)
        break
      case 'patient':
        menu.push(...MAIN_MENU.patient)
        break
      case 'receptionist':
        menu.push(...MAIN_MENU.receptionist)
        break
      case 'phlebotomist':
        menu.push(...MAIN_MENU.phlebotomist)
        break
      case 'practitioner':
        menu.push(...MAIN_MENU.practitioner)
        break
      case 'dlivr':
        menu.push(...MAIN_MENU.dlivr)
        break
      case 'laboratory-technician':
        menu.push(...MAIN_MENU['laboratory-technician'])
        break
      case 'senior-laboratory-technician':
        menu.push(...MAIN_MENU['senior-laboratory-technician'])
        break
      case 'external-receptionist':
        menu.push(...MAIN_MENU['external-receptionist'])
        break

      default:
        break
    }
  })

  return res.status(200).json(menu)
})

module.exports = router

/**
 * modified: Sod-Erdene
 * date: 2020-03-27
 */
