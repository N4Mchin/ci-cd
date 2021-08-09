import { API, backend } from 'utils/config'
const AUTH = `${backend.host}/auth/user`
const APIV1 = `${backend.host}${backend.api}`

export default {
  //queryRouteList: '/routes',
  queryRouteList: `${APIV1}/menu`,
  queryUserInfo: `${APIV1}/user/privateInfo`,
  queryLogIn: `POST ${AUTH}/login`,
  queryLogOut: `POST ${AUTH}/logout`,
  sendEmail: `POST ${AUTH}/sendemail`,
  changePassword: `POST ${AUTH}/changepassword`,
  queryPasswordRecoveryLink: `POST ${AUTH}/querypasswordrecoverylink`,
  passwordValidate: `POST ${AUTH}/validatepassword`,

  // queryUser: '${APIV1}/user/:id',
  queryUser: `${APIV1}/user/:id`,
  getUserInfoById: `${APIV1}/user/:id`,
  getUserList: `${APIV1}/users`,
  updateUser: `Patch ${APIV1}/user/:id`,
  postUserData: `POST ${APIV1}/user`,
  removeUser: `DELETE ${APIV1}/user/:id`,
  removeUserList: 'POST /users/delete',

  queryPatient: `${APIV1}/patient/:id`,
  getPatient: `${APIV1}/patient/:id`,
  queryPatientList: `${APIV1}/patient`,
  updatePatient: `PATCH ${APIV1}/patient/:id`,
  searchPatient: `POST ${APIV1}/patient/search`,
  createPatient: `POST ${APIV1}/patient`,
  removePatient: `DELETE ${APIV1}/patient/:id`,
  removePatientList: `POST ${APIV1}/ppractitioneratient/delete`,
  queryCreatePatientwithObservation: `POST ${APIV1}/patient/withObservation`,
  readPatientDetailed: `GET ${APIV1}/patient/:id`,
  readPatientWithObservation: `GET ${APIV1}/patient/withObservation/:id`,
  queryUpdatePatientwithObservation: `POST ${APIV1}/patient/updateWithObservation`,
  queryPatientInformationList: `POST ${APIV1}/patient/patientInformationList`,
  putPatientInformationList: `PUT ${APIV1}/patient/patientInformationList/`,
  getPatientInformationList: `GET ${APIV1}/patient/patientInformationList/:id`,

  queryPractitioner: `${APIV1}/practitioner/:id`,
  queryPractitionerList: `${APIV1}/practitioner`,
  updatePractitioner: `PATCH ${APIV1}/practitioner/:id`,
  createPractitioner: `POST ${APIV1}/practitioner`,
  removePractitioner: `DELETE ${APIV1}/practitioner/:id`,
  removePractitionerList: `POST ${APIV1}/practitioner/delete`,

  queryReference: `POST ${APIV1}/reference`,

  updateServiceRequest: `Patch ${APIV1}/serviceRequest/:id`,
  createServiceRequestList: `POST ${APIV1}/serviceRequestList`,
  removeServiceRequest: `DELETE ${APIV1}/serviceRequest/:id`,
  removeServiceRequestList: `POST /serviceRequest/delete`,
  cancelLabTestOrder: `POST ${APIV1}/serviceRequest/cancellation`,

  createComposition: `POST ${APIV1}/composition`,

  queryDashboard: `${APIV1}/dashboard`,

  getExternalSamples: `GET ${APIV1}/externalSamples`,
  putExternalSamples: `PUT ${APIV1}/externalSamples`,
  getPendingOrders: `GET ${APIV1}/serviceRequest/pending`,
  postPendingOrders: `POST ${APIV1}/serviceRequest/pending`,
  getConfirmedOrders: `GET ${APIV1}/serviceRequest/confirmed`,
  //
  getExternalSpecimenLog: `GET ${APIV1}/ExternalSpecimenLog`,
  putExternalSpecimenLog: `PUT ${APIV1}/ExternalSpecimenLog`,
  /* #region  ReceptionReport */
  requestFilteredList: `POST ${APIV1}/serviceRequest/report`,
  requestFilteredListPhlebotomy: `POST ${APIV1}/serviceRequest/phlebotomyReport`,
  requestFilteredListLaboratory: `POST ${APIV1}/serviceRequest/laboratoryReport`,
  /* #endregion */
  queryReportList: `GET ${APIV1}/report`,
  filteredReportList: `POST ${APIV1}/report`,
  getStatisticsForReception: `GET ${APIV1}/statistics/reception`,
  getStatisticsForLaboratory: `GET ${APIV1}/statistics/laboratory`,
  getStatisticsForPhlebotomy: `GET ${APIV1}/statistics/phlebotomy`,
  getStatisticsForPractitioner: `GET ${APIV1}/statistics/reception`,
  queryValuesets: `POST ${APIV1}/valuesets`,
  queryAddMaterialOrder: `POST ${APIV1}/laboratory/addMaterialOrder`,

  createTestResult: `POST ${APIV1}/laboratory/testResult`,
  /* #region  read and save reagent */
  saveReagent: `POST ${APIV1}/laboratory/saveReagent`,
  readReagent: `GET ${APIV1}/laboratory/readReagent`,
  readReagentLog: `GET ${APIV1}/laboratory/readReagentLog`,
  queryReagentTotal: `GET ${APIV1}/laboratory/queryReagentTotal`,
  /* #endregion */
  // readStatistics: `GET ${APIV1}/reception/statictics`,
  /* #region  reagent consumption */
  saveLabTestsReagentConsumption: `POST ${APIV1}/laboratory/saveLabTestsReagentConsumption`,
  /* #endregion */

  /* #region  test services */
  monitorOfHematology: `POST ${APIV1}/laboratory/monitorOfHematology`,
  readMonitorOfHematology: `GET ${APIV1}/laboratory/readMonitorOfHematology`,
  saveAnalyzator: `POST ${APIV1}/laboratory/saveAnalyzator`,
  readAnalyzator: `GET ${APIV1}/laboratory/readAnalyzator`,
  /* #endregion */

  /* #region  test protocol */

  saveProtocolData: `POST ${APIV1}/laboratory/testProtocol`,
  readTestProtocolData: `GET ${APIV1}/laboratory/testProtocol`,
  testsVerifiedWithDateRange: `POST ${APIV1}/laboratory/labProtocolTestsVerifiedWithDateRange`,
  viralLoadTestsVerifiedResults: `GET ${APIV1}/laboratory/viralLoadTestsVerifiedResults`,
  excelDataGenerator: `POST ${APIV1}/laboratory/excelDataGenerator`,

  saveRapidTestProtocol: `POST ${APIV1}/laboratory/testProtocol`,
  readRapidTestProtocol: `GET ${APIV1}/laboratory/testProtocolRapid`,
  protocolDataPrint: `GET ${APIV1}/laboratory/readProtocolDataPrint`,
  saveSpecialProtocolData: `POST ${APIV1}/laboratory/specialTestProtocol`,
  readSpecialProtocolData: `GET ${APIV1}/laboratory/specialTestProtocol`,
  saveCoagulationProtocol: `POST ${APIV1}/laboratory/testCoagulationProtcol`,
  readCoagulationProtocol: `GET ${APIV1}/laboratory/testCoagulationProtcol`,

  saveImmunologyProtocol: `POST ${APIV1}/laboratory/testProtocol`,
  saveCoagualtionProtocol: `POST ${APIV1}/laboratory/testProtocol`,

  readViralLoadSubTestsProtocolData: `GET ${APIV1}/laboratory/testProtocol`,
  readViralLoadHDVProtocolData: `GET ${APIV1}/laboratory/viralLoadHDVTestProtocol`,

  /* #endregion */

  sendTestResult: `POST ${APIV1}/laboratory/testResult/send`,
  querySendStatus: `GET ${APIV1}/laboratory/testResult/sendStatus`,
  queryTestResultVerification: `POST ${APIV1}/laboratory/testResult/verify`,

  createSampleModule: `POST ${APIV1}/laboratory/sampleModule`,
  readSampleModule: `GET ${APIV1}/laboratory/sampleModule/:id`,
  readSampleModuleList: `POST ${APIV1}/laboratory/sampleModule/getList`,
  updateSampleModule: `PUT ${APIV1}/laboratory/sampleModule`,

  /* #region  laboratory storage */
  saveStorageDatas: `POST ${APIV1}/laboratory/saveSpecimenStorageDetials`,
  searchStorageBarcode: `GET ${APIV1}/laboratory/storage/:id`,
  searchStorageData: `GET ${APIV1}/laboratory/searchedClientStorage/:id`,
  storageList: `GET ${APIV1}/laboratory/storageDashboardSpecimenList`,
  /* #endregion */

  /* #region  cruds */
  createResource: `POST ${APIV1}/resource`,
  updateResource: `PUT ${APIV1}/resource`,
  readResource: `GET ${APIV1}/resource`,
  readResourceById: `GET ${APIV1}/resource/:id`,
  batch_transaction_request: `POST ${APIV1}/batch_transaction`,
  /* #endregion */

  queryDeleteExposureKit: `POST ${APIV1}/phlebotomy/ExposureKit`,
  readTotalEquipment: `GET ${APIV1}/phlebotomy/equipment`,

  /* #region  phlebotomy tool */
  readFirstAidMaterials: `GET ${APIV1}/phlebotomy/firstAidMaterials`,
  readExposureMaterials: `GET ${APIV1}/phlebotomy/exposureMaterials`,
  saveMaterials: `POST ${APIV1}/phlebotomy/materials`,
  deleteMaterials: `POST ${APIV1}/phlebotomy/deleteMaterials`,
  /* #endregion */

  /* #region  barcode */
  generateSpecimenBarcode: `POST ${APIV1}/phlebotomy/specimenBarcode`,
  readEquipmentMaterials: `GET ${APIV1}/phlebotomy/equipmentMaterials`,
  /* #endregion */

  specimenReferences: `GET ${APIV1}/phlebotomy/specimenReference`,

  readTotalExposureKit: `GET ${APIV1}/phlebotomy/exposureKit`,
  changeRemainedValues: `PUT ${APIV1}/phlebotomy/remainedValues`,

  /* #region  searching patient */
  patientLists: `GET ${APIV1}/search/searchPatientList/:id`,
  searchBarcodeEquipment: `GET ${APIV1}/phlebotomy/searchBarcodeEquipment`,

  /* #endregion */

  // queryDrugInfo: `GET ${APIV1}/drugInfo`,
  // queryDrugInfoById: `GET ${APIV1}/drugInfo/:id`,
  getUploadedFilesInfo: `GET ${APIV1}/file/info/:patientId`,
  downloadUploadedFile: `GET ${APIV1}/file/:patientId/:fileId`,

  /* #region  e-Prescription */
  queryPrescription: `GET ${APIV1}/eprescription`,
  getCitizenInfo: `POST ${APIV1}/eprescription/citizenInfo`,
  getCitizenInfoWithoutFinger: `GET ${APIV1}/eprescription/citizenInfoWithoutFinger`,
  getSavedPerscriptionByType: `GET ${APIV1}/eprescription/savedPrescriptionByType`,
  getEprescriptionToken: `GET ${APIV1}/eprescription/token`,
  savePrescription: `POST ${APIV1}/eprescription/savePrescription`,
  getDrugInfoByDiagnose: `GET ${APIV1}/eprescription/drugInfoByDiagnose`,
  getRefInfoByReceiptNumber: `GET ${APIV1}/eprescription/refInfoByReceiptNumber`,
  /* #endregion */
}
