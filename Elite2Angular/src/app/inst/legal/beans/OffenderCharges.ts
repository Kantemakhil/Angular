import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderCharges extends BaseModel {
    private _createUserId: string;
    private _lidsOffenceNumber: number;
    private _offenderBookId: number;
    private _offenderChargeId: number;
    private _modifyDatetime: Date;
    private _orderId: number;
    private _modifyUserId: string;
    private _offenceType: string;
    private _statuteCode: string;
    private _chargeStatus: string;
    private _pleaCode: string;
    private _serialVersionUID: number;
    private _offenceCode: string;
    private _caseId: number;
    private _resultCode2Indicator: string;
    private _totalPropertyValue: number;
    private _chargeSeq: number;
    private _offenceDate: Date;
    private _sealFlag: string;
    private _complicityTypeDesc: string;
    private _offenceTypeDescription: string;
    private _noOfOffences: number;
    private _resultCode2: string;
    private _offenceRangeDate: Date;
    private _cjitOffenceCode2: string;
    private _resultCode1: string;
    private _cjitOffenceCode1: string;
    private _propertyValue: number;
    private _cjitOffenceCode3: string;
    private _offenceDescription: string;
    private _createDatetime: Date;
    private _caseInfoNumber: string;
    private _mostSeriousFlag: string;
    private _resultCode1Indicator: string;
    private _eventId: number;
    private _resultCodeDesc: string;
    private _requestSeq: number;
    private  _chargeInfoNumber: string;
    private _applyFlag: boolean;
    private _offenceApplyFlag: boolean;

    get offenceApplyFlag(): boolean { return this._offenceApplyFlag; }

    set offenceApplyFlag(poffenceApplyFlag: boolean) { this._offenceApplyFlag = poffenceApplyFlag; }

    get applyFlag(): boolean { return this._applyFlag; }

    set applyFlag(papplyFlag: boolean) { this._applyFlag = papplyFlag; }

    get chargeInfoNumber(): string { return this._chargeInfoNumber; }

    set chargeInfoNumber(pchargeInfoNumber: string) { this._chargeInfoNumber = pchargeInfoNumber; }

    get requestSeq(): number { return this._requestSeq; }

    set requestSeq(prequestSeq: number) { this._requestSeq = prequestSeq; }

    get resultCodeDesc(): string { return this._resultCodeDesc; }

    set resultCodeDesc(presultCodeDesc: string) { this._resultCodeDesc = presultCodeDesc; }

    get eventId(): number { return this._eventId; }

    set eventId(peventId: number) { this._eventId = peventId; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get lidsOffenceNumber(): number { return this._lidsOffenceNumber; }

    set lidsOffenceNumber(plidsOffenceNumber: number) { this._lidsOffenceNumber = plidsOffenceNumber; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get offenderChargeId(): number { return this._offenderChargeId; }

    set offenderChargeId(poffenderChargeId: number) { this._offenderChargeId = poffenderChargeId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get orderId(): number { return this._orderId; }

    set orderId(porderId: number) { this._orderId = porderId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get offenceType(): string { return this._offenceType; }

    set offenceType(poffenceType: string) { this._offenceType = poffenceType; }

    get statuteCode(): string { return this._statuteCode; }

    set statuteCode(pstatuteCode: string) { this._statuteCode = pstatuteCode; }

    get chargeStatus(): string { return this._chargeStatus; }

    set chargeStatus(pchargeStatus: string) { this._chargeStatus = pchargeStatus; }

    get pleaCode(): string { return this._pleaCode; }

    set pleaCode(ppleaCode: string) { this._pleaCode = ppleaCode; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get offenceCode(): string { return this._offenceCode; }

    set offenceCode(poffenceCode: string) { this._offenceCode = poffenceCode; }

    get caseId(): number { return this._caseId; }

    set caseId(pcaseId: number) { this._caseId = pcaseId; }

    get resultCode2Indicator(): string { return this._resultCode2Indicator; }

    set resultCode2Indicator(presultCode2Indicator: string) { this._resultCode2Indicator = presultCode2Indicator; }

    get totalPropertyValue(): number { return this._totalPropertyValue; }

    set totalPropertyValue(ptotalPropertyValue: number) { this._totalPropertyValue = ptotalPropertyValue; }

    get chargeSeq(): number { return this._chargeSeq; }

    set chargeSeq(pchargeSeq: number) { this._chargeSeq = pchargeSeq; }

    get offenceDate(): Date { return this._offenceDate; }

    set offenceDate(poffenceDate: Date) { this._offenceDate = poffenceDate; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get complicityTypeDesc(): string { return this._complicityTypeDesc; }

    set complicityTypeDesc(pcomplicityTypeDesc: string) { this._complicityTypeDesc = pcomplicityTypeDesc; }

    get offenceTypeDescription(): string { return this._offenceTypeDescription; }

    set offenceTypeDescription(poffenceTypeDescription: string) { this._offenceTypeDescription = poffenceTypeDescription; }

    get noOfOffences(): number { return this._noOfOffences; }

    set noOfOffences(pnoOfOffences: number) { this._noOfOffences = pnoOfOffences; }

    get resultCode2(): string { return this._resultCode2; }

    set resultCode2(presultCode2: string) { this._resultCode2 = presultCode2; }

    get offenceRangeDate(): Date { return this._offenceRangeDate; }

    set offenceRangeDate(poffenceRangeDate: Date) { this._offenceRangeDate = poffenceRangeDate; }

    get cjitOffenceCode2(): string { return this._cjitOffenceCode2; }

    set cjitOffenceCode2(pcjitOffenceCode2: string) { this._cjitOffenceCode2 = pcjitOffenceCode2; }

    get resultCode1(): string { return this._resultCode1; }

    set resultCode1(presultCode1: string) { this._resultCode1 = presultCode1; }

    get cjitOffenceCode1(): string { return this._cjitOffenceCode1; }

    set cjitOffenceCode1(pcjitOffenceCode1: string) { this._cjitOffenceCode1 = pcjitOffenceCode1; }

    get propertyValue(): number { return this._propertyValue; }

    set propertyValue(ppropertyValue: number) { this._propertyValue = ppropertyValue; }

    get cjitOffenceCode3(): string { return this._cjitOffenceCode3; }

    set cjitOffenceCode3(pcjitOffenceCode3: string) { this._cjitOffenceCode3 = pcjitOffenceCode3; }

    get offenceDescription(): string { return this._offenceDescription; }

    set offenceDescription(poffenceDescription: string) { this._offenceDescription = poffenceDescription; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get caseInfoNumber(): string { return this._caseInfoNumber; }

    set caseInfoNumber(pcaseInfoNumber: string) { this._caseInfoNumber = pcaseInfoNumber; }

    get mostSeriousFlag(): string { return this._mostSeriousFlag; }

    set mostSeriousFlag(pmostSeriousFlag: string) { this._mostSeriousFlag = pmostSeriousFlag; }

    get resultCode1Indicator(): string { return this._resultCode1Indicator; }

    set resultCode1Indicator(presultCode1Indicator: string) { this._resultCode1Indicator = presultCode1Indicator; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'lidsOffenceNumber': this._lidsOffenceNumber,
            'offenderBookId': this._offenderBookId,
            'offenderChargeId': this._offenderChargeId,
            'modifyDatetime': this._modifyDatetime,
            'orderId': this._orderId,
            'modifyUserId': this._modifyUserId,
            'offenceType': this._offenceType,
            'statuteCode': this._statuteCode,
            'chargeStatus': this._chargeStatus,
            'pleaCode': this._pleaCode,
            'serialVersionUID': this._serialVersionUID,
            'offenceCode': this._offenceCode,
            'caseId': this._caseId,
            'resultCode2Indicator': this._resultCode2Indicator,
            'totalPropertyValue': this._totalPropertyValue,
            'chargeSeq': this._chargeSeq,
            'offenceDate': this._offenceDate,
            'sealFlag': this._sealFlag,
            'complicityTypeDesc': this._complicityTypeDesc,
            'offenceTypeDescription': this._offenceTypeDescription,
            'noOfOffences': this._noOfOffences,
            'resultCode2': this._resultCode2,
            'offenceRangeDate': this._offenceRangeDate,
            'cjitOffenceCode2': this._cjitOffenceCode2,
            'resultCode1': this._resultCode1,
            'cjitOffenceCode1': this._cjitOffenceCode1,
            'propertyValue': this._propertyValue,
            'cjitOffenceCode3': this._cjitOffenceCode3,
            'offenceDescription': this._offenceDescription,
            'createDatetime': this._createDatetime,
            'caseInfoNumber': this._caseInfoNumber,
            'mostSeriousFlag': this._mostSeriousFlag,
            'resultCode1Indicator': this._resultCode1Indicator,
            'eventId': this._eventId,
            'resultCodeDesc': this._resultCodeDesc,
            'chargeInfoNumber': this._chargeInfoNumber,
            'applyFlag': this._applyFlag,
            'requestSeq': this._requestSeq,
            'offenceApplyFlag': this._offenceApplyFlag
        };
    }
}
