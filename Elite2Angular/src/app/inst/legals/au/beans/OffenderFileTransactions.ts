import { BaseModel } from "@common/beans/BaseModel";

export class OffenderFileTransactions extends BaseModel {
    private _offenderFileSeq: number;
    private _creationUser: string;
    private _dspTransactionDate: string;
    private _agyLocIdFrom: string;
    private _fileTransType: string;
    private _transferDate: Date;
    private _confirmed: string;
    private _drvTransactionId: string;
    private _staffIdTo: number;
    private _agyLocIdTo: string;
    private _dspDescription2: string;
    private _dspDescription3: string;
    private _dspDescription4: string;
    private _nonOfficerTo: string;
    private _dspDescription5: string;
    private _transactionDate: Date;
    private _creationDate: Date;
    private _dspDescription: string;
    private _transactionId: number;
    private _fileTransComment: string;
    private _drvTransactionId2: string;
    private _drvOffenderBookId: string;
    private _offenderId: number;
    private _staffIdFrom: number;
    private _nonOfficeFrom: string;

    get offenderFileSeq(): number { return this._offenderFileSeq; }
    set offenderFileSeq(poffenderFileSeq: number) { this._offenderFileSeq = poffenderFileSeq; }
    get creationUser(): string { return this._creationUser; }
    set creationUser(pcreationUser: string) { this._creationUser = pcreationUser; }
    get dspTransactionDate(): string { return this._dspTransactionDate; }
    set dspTransactionDate(pdspTransactionDate: string) { this._dspTransactionDate = pdspTransactionDate; }
    get agyLocIdFrom(): string { return this._agyLocIdFrom; }
    set agyLocIdFrom(pagyLocIdFrom: string) { this._agyLocIdFrom = pagyLocIdFrom; }
    get fileTransType(): string { return this._fileTransType; }
    set fileTransType(pfileTransType: string) { this._fileTransType = pfileTransType; }
    get transferDate(): Date { return this._transferDate; }
    set transferDate(ptransferDate: Date) { this._transferDate = ptransferDate; }
    get confirmed(): string { return this._confirmed; }
    set confirmed(pconfirmed: string) { this._confirmed = pconfirmed; }
    get drvTransactionId(): string { return this._drvTransactionId; }
    set drvTransactionId(pdrvTransactionId: string) { this._drvTransactionId = pdrvTransactionId; }
    get staffIdTo(): number { return this._staffIdTo; }
    set staffIdTo(pstaffIdTo: number) { this._staffIdTo = pstaffIdTo; }
    get agyLocIdTo(): string { return this._agyLocIdTo; }
    set agyLocIdTo(pagyLocIdTo: string) { this._agyLocIdTo = pagyLocIdTo; }
    get dspDescription2(): string { return this._dspDescription2; }
    set dspDescription2(pdspDescription2: string) { this._dspDescription2 = pdspDescription2; }
    get dspDescription3(): string { return this._dspDescription3; }
    set dspDescription3(pdspDescription3: string) { this._dspDescription3 = pdspDescription3; }
    get dspDescription4(): string { return this._dspDescription4; }
    set dspDescription4(pdspDescription4: string) { this._dspDescription4 = pdspDescription4; }
    get nonOfficerTo(): string { return this._nonOfficerTo; }
    set nonOfficerTo(pnonOfficerTo: string) { this._nonOfficerTo = pnonOfficerTo; }
    get dspDescription5(): string { return this._dspDescription5; }
    set dspDescription5(pdspDescription5: string) { this._dspDescription5 = pdspDescription5; }
    get transactionDate(): Date { return this._transactionDate; }
    set transactionDate(ptransactionDate: Date) { this._transactionDate = ptransactionDate; }
    get creationDate(): Date { return this._creationDate; }
    set creationDate(pcreationDate: Date) { this._creationDate = pcreationDate; }
    get dspDescription(): string { return this._dspDescription; }
    set dspDescription(pdspDescription: string) { this._dspDescription = pdspDescription; }
    get transactionId(): number { return this._transactionId; }
    set transactionId(ptransactionId: number) { this._transactionId = ptransactionId; }
    get fileTransComment(): string { return this._fileTransComment; }
    set fileTransComment(pfileTransComment: string) { this._fileTransComment = pfileTransComment; }
    get drvTransactionId2(): string { return this._drvTransactionId2; }
    set drvTransactionId2(pdrvTransactionId2: string) { this._drvTransactionId2 = pdrvTransactionId2; }
    get drvOffenderBookId(): string { return this._drvOffenderBookId; }
    set drvOffenderBookId(pdrvOffenderBookId: string) { this._drvOffenderBookId = pdrvOffenderBookId; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get staffIdFrom(): number { return this._staffIdFrom; }
    set staffIdFrom(pstaffIdFrom: number) { this._staffIdFrom = pstaffIdFrom; }
    get nonOfficeFrom(): string { return this._nonOfficeFrom; }
    set nonOfficeFrom(pnonOfficeFrom: string) { this._nonOfficeFrom = pnonOfficeFrom; }

    toJSON(): any {
        return {
            'offenderFileSeq': this._offenderFileSeq,
            'creationUser': this._creationUser,
            'dspTransactionDate': this._dspTransactionDate,
            'agyLocIdFrom': this._agyLocIdFrom,
            'fileTransType': this._fileTransType,
            'transferDate': this._transferDate,
            'confirmed': this._confirmed,
            'drvTransactionId': this._drvTransactionId,
            'staffIdTo': this._staffIdTo,
            'agyLocIdTo': this._agyLocIdTo,
            'dspDescription2': this._dspDescription2,
            'dspDescription3': this._dspDescription3,
            'dspDescription4': this._dspDescription4,
            'nonOfficerTo': this._nonOfficerTo,
            'dspDescription5': this._dspDescription5,
            'transactionDate': this._transactionDate,
            'creationDate': this._creationDate,
            'dspDescription': this._dspDescription,
            'transactionId': this._transactionId,
            'fileTransComment': this._fileTransComment,
            'drvTransactionId2': this._drvTransactionId2,
            'drvOffenderBookId': this._drvOffenderBookId,
            'offenderId': this._offenderId,
            'staffIdFrom': this._staffIdFrom,
            'nonOfficeFrom': this._nonOfficeFrom,
        };
    }
}