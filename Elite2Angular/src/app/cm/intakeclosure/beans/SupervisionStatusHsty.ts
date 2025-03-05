import { BaseModel } from '@commonbeans/BaseModel';
export class SupervisionStatusHsty extends BaseModel {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _comments: string;
    private _createDatetime: Date;
    private _sealFlag: string;
    private _startDate: Date;
    private _startTime: Date;
    private _endDate: Date;
    private _endTime: Date;
    private _supStatus: string;
    private _billableFlag: string;
    private _errorFlag: string;
    private _activeFlagVal: Boolean;
    private _rowId: number;
    private _billableFlagValue: string;
    private _activeFlag: string;

    get activeFlag(): string { return this._activeFlag; }
    
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get billableFlagValue(): string { return this._billableFlagValue; }
    
    set billableFlagValue(pbillableFlagValue: string) { this._billableFlagValue = pbillableFlagValue; }

    get rowId(): number { return this.rowId; }

    set rowId(prowId: number) { this.rowId = prowId; }

    get activeFlagVal(): Boolean { return this._activeFlagVal; }

    set activeFlagVal(pactiveFlagVal: Boolean) { this._activeFlagVal = pactiveFlagVal; }

    get errorFlag(): string { return this._errorFlag; }

    set errorFlag(perrorFlag: string) { this._errorFlag = perrorFlag; }

    get billableFlag(): string { return this._billableFlag; }

    set billableFlag(pbillableFlag: string) { this._billableFlag = pbillableFlag; }

    get supStatus(): string { return this._supStatus; }

    set supStatus(psupStatus: string) { this._supStatus = psupStatus; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get comments(): string { return this._comments; }

    set comments(pcomments: string) { this._comments = pcomments; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get startTime(): Date { return this._startTime; }

    set startTime(pstartTime: Date) { this._startTime = pstartTime; }

    get startDate(): Date { return this._startDate; }
    
    set startDate(pstartDate: Date) { this._startDate = pstartDate; }
    
    get endDate(): Date { return this._endDate; }

    set endDate(pendDate: Date) { this._endDate = pendDate; }

    get endTime(): Date { return this._endTime; }

    set endTime(pendTime: Date) { this._endTime = pendTime; }

    

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'modifyUserId': this._modifyUserId,
            'comments': this._comments,
            'billableFlag': this._billableFlag,
            'createDatetime': this._createDatetime,
            'supStatus': this._supStatus,
            'activeFlagVal': this._activeFlagVal,
            'errorFlag': this._errorFlag,
            'startDate': this._startDate,
            'startTime': this._startTime,
            'endDate': this._endDate,
            'sealFlag': this._sealFlag,
            'endTime': this._endTime,
            'rowId': this._rowId,
            'billableFlagValue': this._billableFlagValue,
            'activeFlag': this._activeFlag
        };
    }
}
