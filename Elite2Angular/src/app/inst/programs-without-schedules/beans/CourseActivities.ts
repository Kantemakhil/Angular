import { VOffenderPrgObligations } from '@cm/programsservices/beans/VOffenderPrgObligations';
import { VCourseActivities } from '@instinstitutionalactivitiesbeans/VCourseActivities';

export class CourseActivities {
	private _courseActivityType: string;
	private _createUserId: string;
	private _code: string;
	private _multiPhaseSchedulingFlag: string;
	private _modifyDatetime: Date;
	private _providerPartyClass: string;
	private _modifyUserId: string;
	private _description: string;
	private _allowDoubleBookFlag: string;
	private _agencyLocationType: string;
	private _commentText: string;
	private _providerType: string;
	private _capacity: number;
	private _expiryDate: Date;
	private _serialVersionUID: number;
	private _beneficiaryName: string;
	private _crsActyId: number;
	private _checkSum: number;
	private _beneficiaryContact: string;
	private _sealFlag: string;
	private _sessionLength: number;
	private _internalLocationId: number;
	private _providerPartyId: number;
	private _holidayFlag: string;
	private _holidayFlagTemp: boolean;
	private _holidayFlagTempVal: boolean;

	private _activeFlag: string;
	private _courseClass: string;
	private _scheduleNotes: string;
	private _providerPartyCode: string;
	private _caseloadType: string;
	private _createDatetime: Date;
	private _noOfSessions: number;
	private _noOfSessionsTemp: number;
	private _placementText: string;
	private _scheduleEndDate: Date;
	private _offeringStartDate: Date;
	private _offeringEndDate: Date;
	private _beneficiaryType: string;
	private _scheduleStartDate: Date;
	private _servicesAddressId: number;
	private _caseloadId: string;
	private _agyLocId: string;
	private _listSeq: number;
	private _lastListSeq: number;
	private _iepLevel: string;
	private _programId: number;
	private _schEndDate: Date;
	private _phaseStartDate: Date;
	private _phaseDescription: string;
	private _programIstanceId: number;
	private _postUpdate: string;
	private _rowId: string;
	private _internalLocationIdVal: string;
	private _programIdVal: string;
	private _pQueryOnly: string;
	private _programCode: string;
	private _returnValue: number;
	private _coursePhaseId: number;
	private _commentTemp: string;
	private _internalLocationIdValTemp: string;
	private _codeValue: string;
	private _name: string;
	private _serviceDescription: string;
	private _houseInformation: string;
	private _streetInformation: string;
	private _areaInformation: string;
	private _postalCode: string;
	private _country: string;
	private _placementCorporateId: number;
	private _seqOne: number;
	private _actualSessions: number;
	private _totalSessions: number;
	private _moduleFlag: string;
	private _lastDescription: string;
	private _uptoDescription: string;
	private _uptoListSeq: number;
	private _weeks: number;
	private _startDate: Date;
	private _nbtreScheduleDate: Date;
	private _nbtPhaseDescription: string;
	private _nbtSessionNo: number;
	private _nbtCrsSchId: number;
	private _offPrgrefId: number;
	private _service: string;

	private _nbtDescription: string;
	private _startFlag: string;
	private _parentCrsActyId: number;
	private _nosessions: number;
	private _programCodeTemp: string;
	private _offenderBookId: number;
	private _offenderList: Array<VOffenderPrgObligations>;
	private _prgServiceList: Array<VCourseActivities>;
	private _allocatedOffender: number;
	private _weekDay = [];
	private _avlblCapacityFlag: string;
	private _readOnlyFlag: boolean;
	private _referredOffenders: number;
	private _targetOffFlag: string;
	private _suiteNumber: string;
	private _cityName: string;
	private _cityCode: string;
	private _provStateCode: string;
	private _streetAddress: string;
	private _provStateDesc: string;

	private _caCount: number;
	private _carCount: number;
	private _csrCount: number;
	private _csCount: number;
	private _ocaCount: number;
	private _oppCount: number;
	private _ppbofcCount: number;
	private _ppcCount: number;

	public get suiteNumber(): string {
		return this._suiteNumber;
	}
	public set suiteNumber(value: string) {
		this._suiteNumber = value;
	}
	private _street: string;
	public get street(): string {
		return this._street;
	}
	public set street(value: string) {
		this._street = value;
	}
	public get cityName(): string {
		return this._cityName;
	}
	public set cityName(value: string) {
		this._cityName = value;
	}
	public get cityCode(): string {
		return this._cityCode;
	}
	public set cityCode(value: string) {
		this._cityCode = value;
	}
	public get provStateCode(): string {
		return this._provStateCode;
	}
	public set provStateCode(value: string) {
		this._provStateCode = value;
	}
	get prgServiceList(): Array<VCourseActivities> {
		return this._prgServiceList;
	}
	set prgServiceList(value: Array<VCourseActivities>) {
		this._prgServiceList = value;
	}
	get offenderList(): Array<VOffenderPrgObligations> {
		return this._offenderList;
	}
	set offenderList(value: Array<VOffenderPrgObligations>) {
		this._offenderList = value;
	}


	get programCodeTemp(): string { return this._programCodeTemp; }
	set programCodeTemp(programCodeTemp: string) { this._programCodeTemp = programCodeTemp; }


	get nosessions(): number { return this._nosessions; }
	set nosessions(pnosessions: number) { this._nosessions = pnosessions; }


	get startFlag(): string { return this._startFlag; }
	set startFlag(pstartFlag: string) { this._startFlag = pstartFlag; }

	get parentCrsActyId(): number { return this._parentCrsActyId; }
	set parentCrsActyId(pparentCrsActyId: number) { this._parentCrsActyId = pparentCrsActyId; }

	get nbtDescription(): string { return this._nbtDescription; }
	set nbtDescription(pnbtDescription: string) { this._nbtDescription = pnbtDescription; }

	public get service(): string {
		return this._service;
	}
	public set service(value: string) {
		this._service = value;
	}


	get offPrgrefId(): number { return this._offPrgrefId; }
	set offPrgrefId(poffPrgrefId: number) { this._offPrgrefId = poffPrgrefId; }

	get seqOne(): number { return this._seqOne; }
	set seqOne(pseqOne: number) { this._seqOne = pseqOne; }
	public get holidayFlagTempVal(): boolean {
		return this._holidayFlagTempVal;
	}
	public set holidayFlagTempVal(value: boolean) {
		this._holidayFlagTempVal = value;
	}

	public get holidayFlagTemp(): boolean {
		return this._holidayFlagTemp;
	}
	public set holidayFlagTemp(value: boolean) {
		this._holidayFlagTemp = value;
	}

	public get checkSum(): number {
		return this._checkSum;
	}
	public set checkSum(value: number) {
		this._checkSum = value;
	}
	public get uptoListSeq(): number {
		return this._uptoListSeq;
	}
	public set uptoListSeq(value: number) {
		this._uptoListSeq = value;
	}

	public get nbtreScheduleDate(): Date {
		return this._nbtreScheduleDate;
	}
	public set nbtreScheduleDate(value: Date) {
		this._nbtreScheduleDate = value;
	}
	public get nbtPhaseDescription(): string {
		return this._nbtPhaseDescription;
	}
	public set nbtPhaseDescription(value: string) {
		this._nbtPhaseDescription = value;
	}
	public get nbtSessionNo(): number {
		return this._nbtSessionNo;
	}
	public set nbtSessionNo(value: number) {
		this._nbtSessionNo = value;
	}
	public get nbtCrsSchId(): number {
		return this._nbtCrsSchId;
	}
	public set nbtCrsSchId(value: number) {
		this._nbtCrsSchId = value;
	}

	public get lastListSeq(): number {
		return this._lastListSeq;
	}
	public set lastListSeq(value: number) {
		this._lastListSeq = value;
	}
	public get offeringEndDate(): Date {
		return this._offeringEndDate;
	}
	public set offeringEndDate(value: Date) {
		this._offeringEndDate = value;
	}
	public get lastDescription(): string {
		return this._lastDescription;
	}
	public set lastDescription(value: string) {
		this._lastDescription = value;
	}

	public get uptoDescription(): string {
		return this._uptoDescription;
	}
	public set uptoDescription(value: string) {
		this._uptoDescription = value;
	}

	public get weeks(): number {
		return this._weeks;
	}
	public set weeks(value: number) {
		this._weeks = value;
	}

	public get startDate(): Date {
		return this._startDate;
	}
	public set startDate(value: Date) {
		this._startDate = value;
	}



	public get actualSessions(): number {
		return this._actualSessions;
	}
	public set actualSessions(value: number) {
		this._actualSessions = value;
	}

	public get totalSessions(): number {
		return this._totalSessions;
	}
	public set totalSessions(value: number) {
		this._totalSessions = value;
	}
	public get moduleFlag(): string {
		return this._moduleFlag;
	}
	public set moduleFlag(value: string) {
		this._moduleFlag = value;
	}


	public get programIstanceId(): number {
		return this._programIstanceId;
	}
	public set programIstanceId(value: number) {
		this._programIstanceId = value;
	}
	public get phaseDescription(): string {
		return this._phaseDescription;
	}
	public set phaseDescription(value: string) {
		this._phaseDescription = value;
	}
	public get phaseStartDate(): Date {
		return this._phaseStartDate;
	}
	public set phaseStartDate(value: Date) {
		this._phaseStartDate = value;
	}
	public get offeringStartDate(): Date {
		return this._offeringStartDate;
	}
	public set offeringStartDate(value: Date) {
		this._offeringStartDate = value;
	}

	public get serviceDescription(): string {
		return this._serviceDescription;
	}
	public set serviceDescription(value: string) {
		this._serviceDescription = value;
	}


	get placementCorporateId(): number { return this._placementCorporateId; }
	set placementCorporateId(pplacementCorporateId: number) { this._placementCorporateId = pplacementCorporateId; }

	get name(): string { return this._name; }
	set name(pname: string) { this._name = pname; }

	get houseInformation(): string { return this._houseInformation; }
	set houseInformation(phouseInformation: string) { this._houseInformation = phouseInformation; }

	get streetInformation(): string { return this._streetInformation; }
	set streetInformation(pstreetInformation: string) { this._streetInformation = pstreetInformation; }

	get areaInformation(): string { return this._areaInformation; }
	set areaInformation(pareaInformation: string) { this._areaInformation = pareaInformation; }

	get postalCode(): string { return this._postalCode; }
	set postalCode(ppostalCode: string) { this._postalCode = ppostalCode; }

	get country(): string { return this._country; }
	set country(pcountry: string) { this._country = pcountry; }
	get codeValue(): string { return this._codeValue; }
	set codeValue(pcodeValue: string) { this._codeValue = pcodeValue; }




	get returnValue(): number { return this._returnValue; }
	set returnValue(preturnValue: number) { this._returnValue = preturnValue; }
	get coursePhaseId(): number { return this._coursePhaseId; }
	set coursePhaseId(pcoursePhaseId: number) { this._coursePhaseId = pcoursePhaseId; }
	get programCode(): string { return this._programCode; }
	set programCode(pprogramCode: string) { this._programCode = pprogramCode; }
	get internalLocationIdVal(): string { return this._internalLocationIdVal; }
	set internalLocationIdVal(pinternalLocationIdVal: string) { this._internalLocationIdVal = pinternalLocationIdVal; }
	get programIdVal(): string { return this._programIdVal; }
	set programIdVal(pprogramIdVal: string) { this._programIdVal = pprogramIdVal; }
	get rowId(): string { return this._rowId; }
	set rowId(prowId: string) { this._rowId = prowId; }
	get postUpdate(): string { return this._postUpdate; }
	set postUpdate(ppostUpdate: string) { this._postUpdate = ppostUpdate; }
	get schEndeDate(): Date { return this._schEndDate; }
	set schEndDate(pschEndDate: Date) { this._schEndDate = pschEndDate; }
	get courseActivityType(): string { return this._courseActivityType; }
	set courseActivityType(pcourseActivityType: string) { this._courseActivityType = pcourseActivityType; }
	get createUserId(): string { return this._createUserId; }
	set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
	get code(): string { return this._code; }
	set code(pcode: string) { this._code = pcode; }
	get multiPhaseSchedulingFlag(): string { return this._multiPhaseSchedulingFlag; }
	set multiPhaseSchedulingFlag(pmultiPhaseSchedulingFlag: string) { this._multiPhaseSchedulingFlag = pmultiPhaseSchedulingFlag; }
	get modifyDatetime(): Date { return this._modifyDatetime; }
	set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
	get providerPartyClass(): string { return this._providerPartyClass; }
	set providerPartyClass(pproviderPartyClass: string) { this._providerPartyClass = pproviderPartyClass; }
	get modifyUserId(): string { return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
	get description(): string { return this._description; }
	set description(pdescription: string) { this._description = pdescription; }
	get allowDoubleBookFlag(): string { return this._allowDoubleBookFlag; }
	set allowDoubleBookFlag(pallowDoubleBookFlag: string) { this._allowDoubleBookFlag = pallowDoubleBookFlag; }
	get agencyLocationType(): string { return this._agencyLocationType; }
	set agencyLocationType(pagencyLocationType: string) { this._agencyLocationType = pagencyLocationType; }
	get commentText(): string { return this._commentText; }
	set commentText(pcommentText: string) { this._commentText = pcommentText; }
	get providerType(): string { return this._providerType; }
	set providerType(pproviderType: string) { this._providerType = pproviderType; }
	get capacity(): number { return this._capacity; }
	set capacity(pcapacity: number) { this._capacity = pcapacity; }
	get expiryDate(): Date { return this._expiryDate; }
	set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
	get serialVersionUID(): number { return this._serialVersionUID; }
	set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
	get beneficiaryName(): string { return this._beneficiaryName; }
	set beneficiaryName(pbeneficiaryName: string) { this._beneficiaryName = pbeneficiaryName; }
	get crsActyId(): number { return this._crsActyId; }
	set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId; }
	get beneficiaryContact(): string { return this._beneficiaryContact; }
	set beneficiaryContact(pbeneficiaryContact: string) { this._beneficiaryContact = pbeneficiaryContact; }
	get sealFlag(): string { return this._sealFlag; }
	set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
	get sessionLength(): number { return this._sessionLength; }
	set sessionLength(psessionLength: number) { this._sessionLength = psessionLength; }
	get internalLocationId(): number { return this._internalLocationId; }
	set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }
	get providerPartyId(): number { return this._providerPartyId; }
	set providerPartyId(pproviderPartyId: number) { this._providerPartyId = pproviderPartyId; }
	get holidayFlag(): string { return this._holidayFlag; }
	set holidayFlag(pholidayFlag: string) { this._holidayFlag = pholidayFlag; }
	get activeFlag(): string { return this._activeFlag; }
	set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
	get courseClass(): string { return this._courseClass; }
	set courseClass(pcourseClass: string) { this._courseClass = pcourseClass; }
	get scheduleNotes(): string { return this._scheduleNotes; }
	set scheduleNotes(pscheduleNotes: string) { this._scheduleNotes = pscheduleNotes; }
	get providerPartyCode(): string { return this._providerPartyCode; }
	set providerPartyCode(pproviderPartyCode: string) { this._providerPartyCode = pproviderPartyCode; }
	get caseloadType(): string { return this._caseloadType; }
	set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
	get createDatetime(): Date { return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
	get noOfSessions(): number { return this._noOfSessions; }
	set noOfSessions(pnoOfSessions: number) { this._noOfSessions = pnoOfSessions; }
	get noOfSessionsTemp(): number { return this._noOfSessionsTemp; }
	set noOfSessionsTemp(pnoOfSessionsTemp: number) { this._noOfSessionsTemp = pnoOfSessionsTemp; }
	get placementText(): string { return this._placementText; }
	set placementText(pplacementText: string) { this._placementText = pplacementText; }
	get scheduleEndDate(): Date { return this._scheduleEndDate; }
	set scheduleEndDate(pscheduleEndDate: Date) { this._scheduleEndDate = pscheduleEndDate; }
	get beneficiaryType(): string { return this._beneficiaryType; }
	set beneficiaryType(pbeneficiaryType: string) { this._beneficiaryType = pbeneficiaryType; }
	get scheduleStartDate(): Date { return this._scheduleStartDate; }
	set scheduleStartDate(pscheduleStartDate: Date) { this._scheduleStartDate = pscheduleStartDate; }
	get servicesAddressId(): number { return this._servicesAddressId; }
	set servicesAddressId(pservicesAddressId: number) { this._servicesAddressId = pservicesAddressId; }
	get caseloadId(): string { return this._caseloadId; }
	set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
	get agyLocId(): string { return this._agyLocId; }
	set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
	get listSeq(): number { return this._listSeq; }
	set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
	get iepLevel(): string { return this._iepLevel; }
	set iepLevel(piepLevel: string) { this._iepLevel = piepLevel; }
	get programId(): number { return this._programId; }
	set programId(pprogramId: number) { this._programId = pprogramId; }
	get pQueryOnly(): string { return this._pQueryOnly; }
	set pQueryOnly(ppQueryOnly: string) { this._pQueryOnly = ppQueryOnly; }
	get commentTemp(): string { return this._commentTemp; }
	set commentTemp(pcommentTemp: string) { this._commentTemp = pcommentTemp; }
	get internalLocationIdValTemp(): string { return this._internalLocationIdValTemp; }
	set internalLocationIdValTemp(pinternalLocationIdValTemp: string) { this._internalLocationIdValTemp = pinternalLocationIdValTemp; }
	get offenderBookId(): number { return this._offenderBookId; }
	set offenderBookId(value: number) { this._offenderBookId = value; }
	public get allocatedOffender(): number { return this._allocatedOffender; }
	public set allocatedOffender(value: number) { this._allocatedOffender = value; }
	public get weekDay() { return this._weekDay; }
	public set weekDay(value) { this._weekDay = value; }
	public get avlblCapacityFlag(): string { return this._avlblCapacityFlag; }
	public set avlblCapacityFlag(value: string) { this._avlblCapacityFlag = value; }
	get readOnlyFlag(): boolean { return this._readOnlyFlag; }
	set readOnlyFlag(value: boolean) { this._readOnlyFlag = value; }
	get referredOffenders(): number { return this._referredOffenders; }
	set referredOffenders(value: number) { this._referredOffenders = value; }
	get targetOffFlag(): string { return this._targetOffFlag; }
	set targetOffFlag(value: string) { this._targetOffFlag = value; }

	get streetAddress(): string { return this._streetAddress; }

	set streetAddress( pstreetAddress: string ) { this._streetAddress = pstreetAddress; }
	get provStateDesc(): string { return this._provStateDesc; }

    set provStateDesc(pprovStateDesc: string) { this._provStateDesc = pprovStateDesc; }

	public get caCount(): number {
		return this._caCount;
	}
	public set caCount(value: number) {
		this._caCount = value;
	}

	public get carCount(): number {
		return this._carCount;
	}
	public set carCount(value: number) {
		this._carCount = value;
	}

	public get csrCount(): number {
		return this._csrCount;
	}
	public set csrCount(value: number) {
		this._csrCount = value;
	}

	public get csCount(): number {
		return this._csCount;
	}
	public set csCount(value: number) {
		this._csCount = value;
	}

	public get ocaCount(): number {
		return this._ocaCount;
	}
	public set ocaCount(value: number) {
		this._ocaCount = value;
	}
	public get oppCount(): number {
		return this._oppCount;
	}
	public set oppCount(value: number) {
		this._oppCount = value;
	}
	public get ppbofcCount(): number { 
		return this._ppbofcCount;
	}
	public set ppbofcCount(value: number) {
		this._ppbofcCount = value;
	}
	public get ppcCount(): number {
		return this._ppcCount;
	}
	public set ppcCount(value: number) {
		this._ppcCount = value;
	}

	toJSON(): any {
		return {
			'courseActivityType': this._courseActivityType,
			'createUserId': this._createUserId,
			'code': this._code,
			'multiPhaseSchedulingFlag': this._multiPhaseSchedulingFlag,
			'modifyDatetime': this._modifyDatetime,
			'providerPartyClass': this._providerPartyClass,
			'modifyUserId': this._modifyUserId,
			'description': this._description,
			'allowDoubleBookFlag': this._allowDoubleBookFlag,
			'agencyLocationType': this._agencyLocationType,
			'commentText': this._commentText,
			'providerType': this._providerType,
			'capacity': this._capacity,
			'expiryDate': this._expiryDate,
			'serialVersionUID': this._serialVersionUID,
			'beneficiaryName': this._beneficiaryName,
			'crsActyId': this._crsActyId,
			'beneficiaryContact': this._beneficiaryContact,
			'sealFlag': this._sealFlag,
			'sessionLength': this._sessionLength,
			'internalLocationId': this._internalLocationId,
			'providerPartyId': this._providerPartyId,
			'holidayFlag': this._holidayFlag,
			'activeFlag': this._activeFlag,
			'courseClass': this._courseClass,
			'scheduleNotes': this._scheduleNotes,
			'providerPartyCode': this._providerPartyCode,
			'caseloadType': this._caseloadType,
			'createDatetime': this._createDatetime,
			'noOfSessions': this._noOfSessions,
			'noOfSessionsTemp': this._noOfSessionsTemp,
			'placementText': this._placementText,
			'scheduleEndDate': this._scheduleEndDate,
			'beneficiaryType': this._beneficiaryType,
			'scheduleStartDate': this._scheduleStartDate,
			'servicesAddressId': this._servicesAddressId,
			'caseloadId': this._caseloadId,
			'agyLocId': this._agyLocId,
			'listSeq': this._listSeq,
			'iepLevel': this._iepLevel,
			'programId': this._programId,
			'schEndDate': this._schEndDate,
			'postUpdate': this._postUpdate,
			'rowId': this._rowId,
			'internalLocationIdVal': this._internalLocationIdVal,
			'programIdVal': this._programIdVal,
			'pQueryOnly': this._pQueryOnly,
			'programCode': this._programCode,
			'coursePhaseId': this._coursePhaseId,
			'returnValue': this._returnValue,
			'commentTemp': this._commentTemp,
			'internalLocationIdValTemp': this._internalLocationIdValTemp,
			'name': this._name,
			'houseInformation': this._houseInformation,
			'streetInformation': this._streetInformation,
			'areaInformation': this._areaInformation,
			'postalCode': this._postalCode,
			'country': this._country,
			'placementCorporateId': this._placementCorporateId,
			'seqOne': this._seqOne,
			'codeValue': this._codeValue,
			'offPrgrefId': this._offPrgrefId,
			'lastListSeq': this._lastListSeq,
			'offeringStartDate': this._offeringStartDate,
			'offeringEndDate': this._offeringEndDate,
			'serviceDescription': this._serviceDescription,
			'moduleFlag': this._moduleFlag,
			'checkSum': this._checkSum,
			'phaseStartDate': this._phaseStartDate,
			'phaseDescription': this._phaseDescription,
			'programIstanceId': this._programIstanceId,
			'totalSessions': this._totalSessions,
			'actualSessions': this._actualSessions,
			'lastDescription': this._lastDescription,
			'uptoDescription': this._uptoDescription,
			'uptoListSeq': this._uptoListSeq,
			'startDate': this._startDate,
			'weeks': this._weeks,
			'nbtreScheduleDate': this._nbtreScheduleDate,
			'nbtPhaseDescription': this._nbtPhaseDescription,
			'nbtSessionNo': this._nbtSessionNo,
			'nbtCrsSchId': this._nbtCrsSchId,
			'startFlag': this._startFlag,
			'nbtDescription': this._nbtDescription,
			'parentCrsActyId': this._parentCrsActyId,
			'nosessions': this._nosessions,
			'offenderBookID': this._offenderBookId,
			'offenderList': this._offenderList,
			'prgServiceList': this._prgServiceList,
			'allocatedOffender': this._allocatedOffender,
			'weekDay': this._weekDay,
			'avlblCapacityFlag': this._avlblCapacityFlag,
			'referredOffenders': this._referredOffenders,
			'targetOffFlag': this._targetOffFlag,
			'provStateCode': this._provStateCode,
			'suiteNumber': this._suiteNumber,
			'street': this._street,
			'cityName': this._cityName,
			'cityCode': this._cityCode,
			'streetAddress':this._streetAddress,
			'provStateDesc': this._provStateDesc
			
			
		};
	}
}
