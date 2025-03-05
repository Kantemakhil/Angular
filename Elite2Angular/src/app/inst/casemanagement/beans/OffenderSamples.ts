import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderSamples extends BaseModel {
    private _createUserId: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _testedBy: string;
    private _sampleTestDate: Date;
    private _sampleReason: string;
    private _modifyUserId: string;
    private _offenderSampleId: number;
    private _testedPositive: string;
    private _sampleType: string;
    private _takenStaffId: number;
    private _commentText: number;
    private _externalTestAgencyFlag: string;
    private _testCorporateId: number;
    private _createDatetime: Date;
    private _witnessStaffId: number;
    private _ofCcId: number;
    private _testStaffId: number;
    private _sampleDate: Date;
    private _sealFlag: number;
    private _sampleTime: Date;
    private _witnessStaffIdVal: string;
    private _takenStaffIdVal: string;
    private _countOffSub: number;
    private _stdTemp: Date;
    private _testedByTemp: string;
    private _testedPositiveFlag: string;
   
    get testedByTemp(): string { return this._testedByTemp; }

    set testedByTemp(ptestedByTemp: string) {this._testedByTemp = ptestedByTemp; }

    get stdTemp(): Date { return this._stdTemp; }

    set stdTemp(pstdTemp: Date) { this._stdTemp = pstdTemp; }

    get countOffSub(): number { return this._countOffSub; }

    set countOffSub(pcountOffSub: number) {this._countOffSub = pcountOffSub; }

    get witnessStaffIdVal(): string { return this._witnessStaffIdVal; }

    set witnessStaffIdVal(pwitnessStaffIdVal: string) { this._witnessStaffIdVal = pwitnessStaffIdVal; }

    get takenStaffIdVal(): string { return this._takenStaffIdVal; }

    set takenStaffIdVal(ptakenStaffIdVal: string) { this._takenStaffIdVal = ptakenStaffIdVal; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get testedBy(): string { return this._testedBy; }

    set testedBy(ptestedBy: string) { this._testedBy = ptestedBy; }

    get sampleTestDate(): Date { return this._sampleTestDate; }

    set sampleTestDate(psampleTestDate: Date) { this._sampleTestDate = psampleTestDate; }

    get sampleReason(): string { return this._sampleReason; }

    set sampleReason(psampleReason: string) { this._sampleReason = psampleReason; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get offenderSampleId(): number { return this._offenderSampleId; }

    set offenderSampleId(poffenderSampleId: number) { this._offenderSampleId = poffenderSampleId; }

    get testedPositive(): string { return this._testedPositive; }

    set testedPositive(ptestedPositive: string) { this._testedPositive = ptestedPositive; }

    get sampleType(): string { return this._sampleType; }

    set sampleType(psampleType: string) { this._sampleType = psampleType; }

    get takenStaffId(): number { return this._takenStaffId; }

    set takenStaffId(ptakenStaffId: number) { this._takenStaffId = ptakenStaffId; }

    get commentText(): number { return this._commentText; }

    set commentText(pcommentText: number) { this._commentText = pcommentText; }

    get externalTestAgencyFlag(): string { return this._externalTestAgencyFlag; }

    set externalTestAgencyFlag(pexternalTestAgencyFlag: string) { this._externalTestAgencyFlag = pexternalTestAgencyFlag; }

    get testCorporateId(): number { return this._testCorporateId; }

    set testCorporateId(ptestCorporateId: number) { this._testCorporateId = ptestCorporateId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get witnessStaffId(): number { return this._witnessStaffId; }

    set witnessStaffId(pwitnessStaffId: number) { this._witnessStaffId = pwitnessStaffId; }

    get ofCcId(): number { return this._ofCcId; }

    set ofCcId(pofCcId: number) { this._ofCcId = pofCcId; }

    get testStaffId(): number { return this._testStaffId; }

    set testStaffId(ptestStaffId: number) { this._testStaffId = ptestStaffId; }

    get sampleDate(): Date { return this._sampleDate; }

    set sampleDate(psampleDate: Date) { this._sampleDate = psampleDate; }

    get sealFlag(): number { return this._sealFlag; }

    set sealFlag(psealFlag: number) { this._sealFlag = psealFlag; }

    get sampleTime(): Date { return this._sampleTime; }

    set sampleTime(psampleTime: Date) { this._sampleTime = psampleTime; }

    get testedPositiveFlag(): string { return this._testedPositiveFlag;    }
    
    set testedPositiveFlag(value: string) { this._testedPositiveFlag = value;    }
    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'testedBy': this._testedBy,
            'sampleTestDate': this._sampleTestDate,
            'sampleReason': this._sampleReason,
            'modifyUserId': this._modifyUserId,
            'offenderSampleId': this._offenderSampleId,
            'testedPositive': this._testedPositive,
            'sampleType': this._sampleType,
            'takenStaffId': this._takenStaffId,
            'commentText': this._commentText,
            'externalTestAgencyFlag': this._externalTestAgencyFlag,
            'testCorporateId': this._testCorporateId,
            'createDatetime': this._createDatetime,
            'witnessStaffId': this._witnessStaffId,
            'ofCcId': this._ofCcId,
            'testStaffId': this._testStaffId,
            'sampleDate': this._sampleDate,
            'sealFlag': this._sealFlag,
            'sampleTime': this._sampleTime,
            'takenStaffIdVal': this._takenStaffIdVal,
            'witnessStaffIdVal': this._witnessStaffIdVal,
            'countOffSub': this._countOffSub,
            'stdTemp': this._stdTemp,
            'testedByTemp': this._testedByTemp,
            'testedPositiveFlag':this._testedPositiveFlag
        };
    }
}
