import { BaseModel } from "@common/beans/BaseModel";

export class OffenderCommunityFiles extends BaseModel {
    private _volumeSeq: number;
    private _transferFlag: string;
    private _holdingAgyLocId: string;
    private _offenderFileSeq: number;
    private _creationUser: string;
    private _fileCreateDate: Date;
    private _storage: string;
    private _caseloaType: string;
    private _nonOfficerStatus: string;
    private _transLocation: string;
    private _dspDescription2: string;
    private _dspDescription3: string;
    private _dspDescription4: string;
    private _drvOffenderId: string;
    private _transAgyLocId: string;
    private _creationDate: Date;
    private _dspDescription: string;
    private _transactionId: number;
    private _fileSubType: string;
    private _requestChkbx: boolean;
    private _transferChkbx: boolean;
    private _closeFileNo: string;
    private _holdingStaffId: number;
    private _offenderFileNum: number;
    private _resubmissionDate: Date;
    private _offenderId: number;
    private _fileReference: string;
    private _fileType: string;
    private _transferUpdateable: boolean;
    private _dspName: string;
    public get dspName(): string {
        return this._dspName;
    }
    public set dspName(value: string) {
        this._dspName = value;
    }
    private _transCommentText: string;
    public get transCommentText(): string {
        return this._transCommentText;
    }
    public set transCommentText(value: string) {
        this._transCommentText = value;
    }

    get transferUpdateable(): boolean { return this._transferUpdateable; }
    set transferUpdateable(ptransferUpdateable: boolean) { this._transferUpdateable = ptransferUpdateable; }
    get volumeSeq(): number { return this._volumeSeq; }
    set volumeSeq(pvolumeSeq: number) { this._volumeSeq = pvolumeSeq; }
    get transferFlag(): string { return this._transferFlag; }
    set transferFlag(ptransferFlag: string) { this._transferFlag = ptransferFlag; }
    get holdingAgyLocId(): string { return this._holdingAgyLocId; }
    set holdingAgyLocId(pholdingAgyLocId: string) { this._holdingAgyLocId = pholdingAgyLocId; }
    get offenderFileSeq(): number { return this._offenderFileSeq; }
    set offenderFileSeq(poffenderFileSeq: number) { this._offenderFileSeq = poffenderFileSeq; }
    get creationUser(): string { return this._creationUser; }
    set creationUser(pcreationUser: string) { this._creationUser = pcreationUser; }
    get fileCreateDate(): Date { return this._fileCreateDate; }
    set fileCreateDate(pfileCreateDate: Date) { this._fileCreateDate = pfileCreateDate; }
    get storage(): string { return this._storage; }
    set storage(pstorage: string) { this._storage = pstorage; }
    get caseloaType(): string { return this._caseloaType; }
    set caseloaType(pcaseloaType: string) { this._caseloaType = pcaseloaType; }
    get nonOfficerStatus(): string { return this._nonOfficerStatus; }
    set nonOfficerStatus(pnonOfficerStatus: string) { this._nonOfficerStatus = pnonOfficerStatus; }
    get transLocation(): string { return this._transLocation; }
    set transLocation(ptransLocation: string) { this._transLocation = ptransLocation; }
    get dspDescription2(): string { return this._dspDescription2; }
    set dspDescription2(pdspDescription2: string) { this._dspDescription2 = pdspDescription2; }
    get dspDescription3(): string { return this._dspDescription3; }
    set dspDescription3(pdspDescription3: string) { this._dspDescription3 = pdspDescription3; }
    get dspDescription4(): string { return this._dspDescription4; }
    set dspDescription4(pdspDescription4: string) { this._dspDescription4 = pdspDescription4; }
    get drvOffenderId(): string { return this._drvOffenderId; }
    set drvOffenderId(pdrvOffenderId: string) { this._drvOffenderId = pdrvOffenderId; }
    get transAgyLocId(): string { return this._transAgyLocId; }
    set transAgyLocId(ptransAgyLocId: string) { this._transAgyLocId = ptransAgyLocId; }
    get creationDate(): Date { return this._creationDate; }
    set creationDate(pcreationDate: Date) { this._creationDate = pcreationDate; }
    get dspDescription(): string { return this._dspDescription; }
    set dspDescription(pdspDescription: string) { this._dspDescription = pdspDescription; }
    get transactionId(): number { return this._transactionId; }
    set transactionId(ptransactionId: number) { this._transactionId = ptransactionId; }
    get fileSubType(): string { return this._fileSubType; }
    set fileSubType(pfileSubType: string) { this._fileSubType = pfileSubType; }
    get requestChkbx(): boolean { return this._requestChkbx; }
    set requestChkbx(prequestChkbx: boolean) { this._requestChkbx = prequestChkbx; }
    get transferChkbx(): boolean { return this._transferChkbx; }
    set transferChkbx(ptransferChkbx: boolean) { this._transferChkbx = ptransferChkbx; }
    get closeFileNo(): string { return this._closeFileNo; }
    set closeFileNo(pcloseFileNo: string) { this._closeFileNo = pcloseFileNo; }
    get holdingStaffId(): number { return this._holdingStaffId; }
    set holdingStaffId(pholdingStaffId: number) { this._holdingStaffId = pholdingStaffId; }
    get offenderFileNum(): number { return this._offenderFileNum; }
    set offenderFileNum(poffenderFileNum: number) { this._offenderFileNum = poffenderFileNum; }
    get resubmissionDate(): Date { return this._resubmissionDate; }
    set resubmissionDate(presubmissionDate: Date) { this._resubmissionDate = presubmissionDate; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get fileReference(): string { return this._fileReference; }
    set fileReference(pfileReference: string) { this._fileReference = pfileReference; }
    get fileType(): string { return this._fileType; }
    set fileType(pfileType: string) { this._fileType = pfileType; }

    toJSON(): any {
        return {
            'volumeSeq': this._volumeSeq,
            'transferFlag': this._transferFlag,
            'holdingAgyLocId': this._holdingAgyLocId,
            'offenderFileSeq': this._offenderFileSeq,
            'creationUser': this._creationUser,
            'fileCreateDate': this._fileCreateDate,
            'storage': this._storage,
            'caseloaType': this._caseloaType,
            'nonOfficerStatus': this._nonOfficerStatus,
            'transLocation': this._transLocation,
            'dspDescription2': this._dspDescription2,
            'dspDescription3': this._dspDescription3,
            'dspDescription4': this._dspDescription4,
            'drvOffenderId': this._drvOffenderId,
            'transAgyLocId': this._transAgyLocId,
            'creationDate': this._creationDate,
            'dspDescription': this._dspDescription,
            'transactionId': this._transactionId,
            'fileSubType': this._fileSubType,
            'requestChkbx': this._requestChkbx,
            'transferChkbx': this._transferChkbx,
            'closeFileNo': this._closeFileNo,
            'holdingStaffId': this._holdingStaffId,
            'offenderFileNum': this._offenderFileNum,
            'resubmissionDate': this._resubmissionDate,
            'offenderId': this._offenderId,
            'fileReference': this._fileReference,
            'fileType': this._fileType,
            'transferUpdateable': this._transferUpdateable,
        };
    }
}