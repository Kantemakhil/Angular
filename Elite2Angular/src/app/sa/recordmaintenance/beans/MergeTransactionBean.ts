import {BaseModel} from '@commonbeans/BaseModel';

export class MergeTransactionBean extends BaseModel {
        private _pFromOffBookId: number;
        private _pFromFirstName: string;
        private _pToLastName: string;
        private _pToOffBookId: number;
        private _pToRootOffId: number;
        private _pToOffenderId: number;
        private _pToFirstName: string;
        private _pFromLastname: string;
        private _pFromOffenderId: number;
        private _pFromOffIdDisplay: string;
        private _pToOffIdDisplay: string;
        private _pFromRootOffId: number;
        private _pMergeTransactionId: number;
        private _pFromBookingNo: string;

        get pFromBookingNo(): string { return  this._pFromBookingNo; }

        set pFromBookingNo(ppFromBookingNo: string) { this._pFromBookingNo = ppFromBookingNo; }

        get pMergeTransactionId(): number { return  this._pMergeTransactionId; }

        set pMergeTransactionId(ppMergeTransactionId: number) { this._pMergeTransactionId = ppMergeTransactionId; }

        get pFromOffBookId(): number { return  this._pFromOffBookId; }

        set pFromOffBookId(ppFromOffBookId: number) { this._pFromOffBookId = ppFromOffBookId; }

        get pFromFirstName(): string { return  this._pFromFirstName; }

        set pFromFirstName(ppFromFirstName: string) { this._pFromFirstName = ppFromFirstName; }

        get pToLastName(): string { return  this._pToLastName; }

        set pToLastName(ppToLastName: string) { this._pToLastName = ppToLastName; }

        get pToOffBookId(): number { return  this._pToOffBookId; }

        set pToOffBookId(ppToOffBookId: number) { this._pToOffBookId = ppToOffBookId; }

        get pToRootOffId(): number { return  this._pToRootOffId; }

        set pToRootOffId(ppToRootOffId: number) { this._pToRootOffId = ppToRootOffId; }

        get pToOffenderId(): number { return  this._pToOffenderId; }

        set pToOffenderId(ppToOffenderId: number) { this._pToOffenderId = ppToOffenderId; }

        get pToFirstName(): string { return  this._pToFirstName; }

        set pToFirstName(ppToFirstName: string) { this._pToFirstName = ppToFirstName; }

        get pFromLastname(): string { return  this._pFromLastname; }

        set pFromLastname(ppFromLastname: string) { this._pFromLastname = ppFromLastname; }

        get pFromOffenderId(): number { return  this._pFromOffenderId; }

        set pFromOffenderId(ppFromOffenderId: number) { this._pFromOffenderId = ppFromOffenderId; }

        get pFromOffIdDisplay(): string { return  this._pFromOffIdDisplay; }

        set pFromOffIdDisplay(ppFromOffIdDisplay: string) { this._pFromOffIdDisplay = ppFromOffIdDisplay; }

        get pToOffIdDisplay(): string { return  this._pToOffIdDisplay; }

        set pToOffIdDisplay(ppToOffIdDisplay: string) { this._pToOffIdDisplay = ppToOffIdDisplay; }

        get pFromRootOffId(): number { return  this._pFromRootOffId; }

        set pFromRootOffId(ppFromRootOffId: number) { this._pFromRootOffId = ppFromRootOffId; }


    toJSON(): any {
        return {
           'pFromOffBookId': this._pFromOffBookId,
           'pFromFirstName': this._pFromFirstName,
           'pToLastName': this._pToLastName,
           'pToOffBookId': this._pToOffBookId,
           'pToRootOffId': this._pToRootOffId,
           'pToOffenderId': this._pToOffenderId,
           'pToFirstName': this._pToFirstName,
           'pFromLastname': this._pFromLastname,
           'pFromOffenderId': this._pFromOffenderId,
           'pFromOffIdDisplay': this._pFromOffIdDisplay,
           'pToOffIdDisplay': this._pToOffIdDisplay,
           'pFromRootOffId': this._pFromRootOffId,
           'pMergeTransactionId': this._pMergeTransactionId,
           'pFromBookingNo': this._pFromBookingNo
            };
        }
}
