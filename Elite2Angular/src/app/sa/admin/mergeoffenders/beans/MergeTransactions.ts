import { BaseModel } from '@common/beans/BaseModel';


export class MergeTransactions extends BaseModel {

    private _mergeTransactionId: number;

    private _createDatetime: Date;

    private _createUserId: string;

    private _firstName1: string;

    private _firstName2: string;

    private _lastName1: string;

    private _lastName2: string;

    private _modifyDatetime: Date;

    private _modifyUserId: string;

    private _offenderBookId1: number;

    private _offenderBookId2: number;

    private _offenderId1: number;

    private _offenderId2: number;

    private _offenderIdDisplay1: string;

    private _offenderIdDisplay2: string;

    private _queueMessageId: string;

    private _requestDate: Date;

    private _requestStatusCode: string;

    private _rootOffenderId1: number;

    private _rootOffenderId2: number;

    private _sealFlag: string;

    private _transactionSource: string;

    private _transactionType: string;

    private _toDate: Date;

    private _staffName: string;

    private _trnBookingNo: string;

    get trnBookingNo(): string { return this._trnBookingNo; }
    set trnBookingNo(ptrnBookingNo: string) { this._trnBookingNo = ptrnBookingNo; }

    get staffName(): string { return this._staffName; }
    set staffName(pstaffName: string) { this._staffName = pstaffName; }

    get toDate(): Date { return this._toDate; }
    set toDate(ptoDate: Date) { this._toDate = ptoDate; }

    get mergeTransactionId(): number { return this._mergeTransactionId; }
    set mergeTransactionId(pmergeTransactionId: number) { this._mergeTransactionId = pmergeTransactionId; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get firstName1(): string { return this._firstName1; }
    set firstName1(pfirstName1: string) { this._firstName1 = pfirstName1; }

    get firstName2(): string { return this._firstName2; }
    set firstName2(pfirstName2: string) { this._firstName2 = pfirstName2; }

    get lastName1(): string { return this._lastName1; }
    set lastName1(plastName1: string) { this._lastName1 = plastName1; }

    get lastName2(): string { return this._lastName2; }
    set lastName2(plastName2: string) { this._lastName2 = plastName2; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get offenderBookId1(): number { return this._offenderBookId1; }
    set offenderBookId1(poffenderBookId1: number) { this._offenderBookId1 = poffenderBookId1; }

    get offenderBookId2(): number { return this._offenderBookId2; }
    set offenderBookId2(poffenderBookId2: number) { this._offenderBookId2 = poffenderBookId2; }

    get offenderId1(): number { return this._offenderId1; }
    set offenderId1(poffenderId1: number) { this._offenderId1 = poffenderId1; }


    get offenderId2(): number { return this._offenderId2; }
    set offenderId2(poffenderId2: number) { this._offenderId2 = poffenderId2; }

    get offenderIdDisplay1(): string { return this._offenderIdDisplay1; }
    set offenderIdDisplay1(poffenderIdDisplay1: string) { this._offenderIdDisplay1 = poffenderIdDisplay1; }

    get offenderIdDisplay2(): string { return this._offenderIdDisplay2; }
    set offenderIdDisplay2(poffenderIdDisplay2: string) { this._offenderIdDisplay2 = poffenderIdDisplay2; }

    get queueMessageId(): string { return this._queueMessageId; }
    set queueMessageId(pqueueMessageId: string) { this._queueMessageId = pqueueMessageId; }

    get requestDate(): Date { return this._requestDate; }
    set requestDate(prequestDate: Date) { this._requestDate = prequestDate; }

    get requestStatusCode(): string { return this._requestStatusCode; }
    set requestStatusCode(prequestStatusCode: string) { this._requestStatusCode = prequestStatusCode; }

    get rootOffenderId1(): number { return this._rootOffenderId1; }
    set rootOffenderId1(prootOffenderId1: number) { this._rootOffenderId1 = prootOffenderId1; }

    get rootOffenderId2(): number { return this._rootOffenderId2; }
    set rootOffenderId2(prootOffenderId2: number) { this._rootOffenderId2 = prootOffenderId2; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get transactionSource(): string { return this._transactionSource; }
    set transactionSource(ptransactionSource: string) { this._transactionSource = ptransactionSource; }

    get transactionType(): string { return this._transactionType; }
    set transactionType(ptransactionType: string) { this._transactionType = ptransactionType; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'firstName1': this._firstName1,
            'firstName2': this._firstName2,
            'lastName1': this._lastName1,
            'lastName2': this._lastName2,
            'modifyDatetime ': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'offenderBookId1': this._offenderBookId1,
            'offenderBookId2': this._offenderBookId2,
            'offenderId1': this._offenderId1,
            'offenderId2': this._offenderId2,
            'offenderIdDisplay1': this._offenderIdDisplay1,
            'offenderIdDisplay2': this._offenderIdDisplay2,
            'queueMessageId': this._queueMessageId,
            'requestDate': this._requestDate,
            'requestStatusCode': this._requestStatusCode,
            'rootOffenderId1': this._rootOffenderId1,
            'rootOffenderId2': this._rootOffenderId2,
            'sealFlag': this._sealFlag,
            'transactionSource': this._transactionSource,
            'transactionType': this._transactionType,
            'toDate': this._toDate,
            'mergeTransactionId': this._mergeTransactionId,
            'staffName': this._staffName,
            'trnBookingNo': this._trnBookingNo
        };
    }

}
