import { BaseModel } from '@commonbeans/BaseModel';
import { VOffenderPrgObligations } from '@cm/programsservices/beans/VOffenderPrgObligations';
    export class VCourseActivities extends BaseModel {
         private _country: string;
         private _providerCode: string;
         private _pqsNumber: number;
         private _city: string;
         private _postalCode: string;
         private _courseActivityCode: string;
         private _commentText: string;
         private _internalLocationDesc: string;
         private _capacity: number;
         private _serialVersionUID: number;
         private _programCategory: string;
         private _programServicesDesc: string;
         private _providerId: number;
         private _crsActyId: number;
         private _state: string;
         private _suiteNumber: string;
         private _internalLocationId: number;
         private _programCategoryDesc: string;
         private _providerName: string;
         private _activeFlag: string;
         private _environmentDesc: string;
         private _courseClass: string;
         private _coursePhaseId: number;
         private _streetInformation: string;
         private _courseActivityDesc: string;
         private _agencyContact: string;
         private _nomsRegionCode: string;
         private _countryDesc: string;
         private _areaCode: string;
         private _environment: string;
         private _scheduleEndDate: Date;
         private _scheduleStartDate: Date;
         private _servicesAddressId: number;
         private _phaseDesc: string;
         private _agyLocId: string;
         private _vacancy: number;
         private _programId: number;
         private _providerClass: string;
         private _agyLocDesc: string;
         private _placementCorporateId: number;
         private _nbtGender: string;
         private _nbtAge: string;
         private _nbtRace: string;
         private _nbtFacility: string;
         private _nbtInclude: string;
         private _nbtExclude: string;
         private _nbtStatus: string;
         private _nbtAdvSearch: string;
         private _nbtRegion: string;
         private _nbtCallingForm: string;
         private _nbtAgyLocId: string;
         private _nbtSelect: string;
         private _pQueryOnly: string;
         private _parentAreaCode: string;
         private _bulkAssignData: Array<VOffenderPrgObligations>;
         private _sessionNo: number;
        
        public get bulkAssignData(): Array<VOffenderPrgObligations> {
            return this._bulkAssignData;
        }
        public set bulkAssignData(value: Array<VOffenderPrgObligations>) {
            this._bulkAssignData = value;
        }

         get pQueryOnly(): string { return  this._pQueryOnly; }

         set pQueryOnly(ppQueryOnly: string) { this._pQueryOnly = ppQueryOnly; }

         get country(): string { return  this._country; }

         set country(pcountry: string) { this._country = pcountry; }

         get providerCode(): string { return  this._providerCode; }

         set providerCode(pproviderCode: string) { this._providerCode = pproviderCode; }

         get pqsNumber(): number { return  this._pqsNumber; }

         set pqsNumber(ppqsNumber: number) { this._pqsNumber = ppqsNumber; }

         get city(): string { return  this._city; }

         set city(pcity: string) { this._city = pcity; }

         get postalCode(): string { return  this._postalCode; }

         set postalCode(ppostalCode: string) { this._postalCode = ppostalCode; }

         get courseActivityCode(): string { return  this._courseActivityCode; }

         set courseActivityCode(pcourseActivityCode: string) { this._courseActivityCode = pcourseActivityCode; }

         get commentText(): string { return  this._commentText; }

         set commentText(pcommentText: string) { this._commentText = pcommentText; }

         get internalLocationDesc(): string { return  this._internalLocationDesc; }

         set internalLocationDesc(pinternalLocationDesc: string) { this._internalLocationDesc = pinternalLocationDesc; }

         get capacity(): number { return  this._capacity; }

         set capacity(pcapacity: number) { this._capacity = pcapacity; }

         get serialVersionUID(): number { return  this._serialVersionUID; }

         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

         get programCategory(): string { return  this._programCategory; }

         set programCategory(pprogramCategory: string) { this._programCategory = pprogramCategory; }

         get programServicesDesc(): string { return  this._programServicesDesc; }

         set programServicesDesc(pprogramServicesDesc: string) { this._programServicesDesc = pprogramServicesDesc; }

         get providerId(): number { return  this._providerId; }

         set providerId(pproviderId: number) { this._providerId = pproviderId; }

         get crsActyId(): number { return  this._crsActyId; }

         set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId; }

         get state(): string { return  this._state; }

         set state(pstate: string) { this._state = pstate; }

         get suiteNumber(): string { return  this._suiteNumber; }

         set suiteNumber(psuiteNumber: string) { this._suiteNumber = psuiteNumber; }

         get internalLocationId(): number { return  this._internalLocationId; }

         set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }

         get programCategoryDesc(): string { return  this._programCategoryDesc; }

         set programCategoryDesc(pprogramCategoryDesc: string) { this._programCategoryDesc = pprogramCategoryDesc; }

         get providerName(): string { return  this._providerName; }

         set providerName(pproviderName: string) { this._providerName = pproviderName; }

         get activeFlag(): string { return  this._activeFlag; }

         set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

         get environmentDesc(): string { return  this._environmentDesc; }

         set environmentDesc(penvironmentDesc: string) { this._environmentDesc = penvironmentDesc; }

         get courseClass(): string { return  this._courseClass; }

         set courseClass(pcourseClass: string) { this._courseClass = pcourseClass; }

         get coursePhaseId(): number { return  this._coursePhaseId; }

         set coursePhaseId(pcoursePhaseId: number) { this._coursePhaseId = pcoursePhaseId; }

         get streetInformation(): string { return  this._streetInformation; }

         set streetInformation(pstreetInformation: string) { this._streetInformation = pstreetInformation; }

         get courseActivityDesc(): string { return  this._courseActivityDesc; }

         set courseActivityDesc(pcourseActivityDesc: string) { this._courseActivityDesc = pcourseActivityDesc; }

         get agencyContact(): string { return  this._agencyContact; }

         set agencyContact(pagencyContact: string) { this._agencyContact = pagencyContact; }

         get nomsRegionCode(): string { return  this._nomsRegionCode; }

         set nomsRegionCode(pnomsRegionCode: string) { this._nomsRegionCode = pnomsRegionCode; }

         get countryDesc(): string { return  this._countryDesc; }

         set countryDesc(pcountryDesc: string) { this._countryDesc = pcountryDesc; }

         get areaCode(): string { return  this._areaCode; }

         set areaCode(pareaCode: string) { this._areaCode = pareaCode; }

         get environment(): string { return  this._environment; }

         set environment(penvironment: string) { this._environment = penvironment; }

         get scheduleEndDate(): Date { return  this._scheduleEndDate; }

         set scheduleEndDate(pscheduleEndDate: Date) { this._scheduleEndDate = pscheduleEndDate; }

         get scheduleStartDate(): Date { return  this._scheduleStartDate; }

         set scheduleStartDate(pscheduleStartDate: Date) { this._scheduleStartDate = pscheduleStartDate; }

         get servicesAddressId(): number { return  this._servicesAddressId; }

         set servicesAddressId(pservicesAddressId: number) { this._servicesAddressId = pservicesAddressId; }

         get phaseDesc(): string { return  this._phaseDesc; }

         set phaseDesc(pphaseDesc: string) { this._phaseDesc = pphaseDesc; }

         get agyLocId(): string { return  this._agyLocId; }

         set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

         get vacancy(): number { return  this._vacancy; }

         set vacancy(pvacancy: number) { this._vacancy = pvacancy; }

         get programId(): number { return  this._programId; }

         set programId(pprogramId: number) { this._programId = pprogramId; }

         get providerClass(): string { return  this._providerClass; }

         set providerClass(pproviderClass: string) { this._providerClass = pproviderClass; }

         get agyLocDesc(): string { return  this._agyLocDesc; }

         set agyLocDesc(pagyLocDesc: string) { this._agyLocDesc = pagyLocDesc; }

         get placementCorporateId(): number { return  this._placementCorporateId; }

         set placementCorporateId(pplacementCorporateId: number) { this._placementCorporateId = pplacementCorporateId; }

         get nbtGender(): string { return  this._nbtGender; }

         set nbtGender(pnbtGender: string) { this._nbtGender = pnbtGender; }

         get nbtAge(): string { return  this._nbtAge; }

         set nbtAge(pnbtAge: string) { this._nbtAge = pnbtAge; }

         get nbtRace(): string { return  this._nbtRace; }

         set nbtRace(pnbtRace: string) { this._nbtRace = pnbtRace; }

         get nbtFacility(): string { return  this._nbtFacility; }

         set nbtFacility(pnbtFacility: string) { this._nbtFacility = pnbtFacility; }

         get nbtInclude(): string { return  this._nbtInclude; }

         set nbtInclude(pnbtInclude: string) { this._nbtInclude = pnbtInclude; }

         get nbtExclude(): string { return  this._nbtExclude; }

         set nbtExclude(pnbtExclude: string) { this._nbtExclude = pnbtExclude; }

         get nbtStatus(): string { return  this._nbtStatus; }

         set nbtStatus(pnbtStatus: string) { this._nbtStatus = pnbtStatus; }

         get nbtAdvSearch(): string { return  this._nbtAdvSearch; }

         set nbtAdvSearch(pnbtAdvSearch: string) { this._nbtAdvSearch = pnbtAdvSearch; }

         get nbtRegion(): string { return  this._nbtRegion; }

         set nbtRegion(pnbtRegion: string) { this._nbtRegion = pnbtRegion; }

         get nbtCallingForm(): string { return  this._nbtCallingForm; }

         set nbtCallingForm(pnbtCallingForm: string) { this._nbtCallingForm = pnbtCallingForm; }

         get nbtAgyLocId(): string { return  this._nbtAgyLocId; }

         set nbtAgyLocId(pnbtAgyLocId: string) { this._nbtAgyLocId = pnbtAgyLocId; }

         get nbtSelect(): string { return  this._nbtSelect; }

         set nbtSelect(pnbtSelect: string) { this._nbtSelect = pnbtSelect; }

         get parentAreaCode(): string { return  this._parentAreaCode; }

         set parentAreaCode(pparentAreaCode: string) { this._parentAreaCode = pparentAreaCode; }

         get sessionNo(): number { return this._sessionNo; }

         set sessionNo(value: number) { this._sessionNo = value; }


     toJSON(): any {
         return {
            'country': this._country,
            'providerCode': this._providerCode,
            'pqsNumber': this._pqsNumber,
            'city': this._city,
            'postalCode': this._postalCode,
            'courseActivityCode': this._courseActivityCode,
            'commentText': this._commentText,
            'internalLocationDesc': this._internalLocationDesc,
            'capacity': this._capacity,
            'serialVersionUID': this._serialVersionUID,
            'programCategory': this._programCategory,
            'programServicesDesc': this._programServicesDesc,
            'providerId': this._providerId,
            'crsActyId': this._crsActyId,
            'state': this._state,
            'suiteNumber': this._suiteNumber,
            'internalLocationId': this._internalLocationId,
            'programCategoryDesc': this._programCategoryDesc,
            'providerName': this._providerName,
            'activeFlag': this._activeFlag,
            'environmentDesc': this._environmentDesc,
            'courseClass': this._courseClass,
            'coursePhaseId': this._coursePhaseId,
            'streetInformation': this._streetInformation,
            'courseActivityDesc': this._courseActivityDesc,
            'agencyContact': this._agencyContact,
            'nomsRegionCode': this._nomsRegionCode,
            'countryDesc': this._countryDesc,
            'areaCode': this._areaCode,
            'environment': this._environment,
            'scheduleEndDate': this._scheduleEndDate,
            'scheduleStartDate': this._scheduleStartDate,
            'servicesAddressId': this._servicesAddressId,
            'phaseDesc': this._phaseDesc,
            'agyLocId': this._agyLocId,
            'vacancy': this._vacancy,
            'programId': this._programId,
            'providerClass': this._providerClass,
            'agyLocDesc': this._agyLocDesc,
            'placementCorporateId': this._placementCorporateId,
            'nbtAdvSearch': this._nbtAdvSearch,
            'nbtGender': this._nbtGender,
            'nbtAge': this._nbtAge,
            'nbtRace': this._nbtRace,
            'nbtFacility': this._nbtFacility,
            'nbtInclude': this._nbtInclude,
            'nbtExclude': this._nbtExclude,
            'nbtStatus': this._nbtStatus,
            'nbtRegion': this._nbtRegion,
            'nbtCallingForm': this._nbtCallingForm,
            'nbtAgyLocId': this._nbtAgyLocId,
            'nbtSelect': this._nbtSelect,
            'pQueryOnly': this._pQueryOnly,
            'parentAreaCode': this._parentAreaCode,
            'sessionNo' : this._sessionNo
             };
         }
 }
