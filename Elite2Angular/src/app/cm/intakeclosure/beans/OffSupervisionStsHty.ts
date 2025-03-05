import { BaseModel } from '@commonbeans/BaseModel';
export class OffSupervisionStsHty extends BaseModel {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _sealFlag: string;
    private _startDatetime: Date;
    private _startTime: Date;
    private _endDatetime: Date;
    private _endTime: Date;
    private _supStatus: string;
    private _billableFlag: string;
    private _errorFlag: string;
    private _activeFlagVal: Boolean;
    private _offenderSupId: number;
    private _billableFlagValue: string;
    private _activeFlag: string;
    private _ovrlapFlag: Boolean;
    private _errorFlagVal: string;
    private _caseloadId: string;
    private _trustAccount: Boolean;
    private _userId: string;
    private _offenderId: number;

    get offenderId(): number { return this._offenderId; }
    
    set offenderId(PoffenderId: number) { this._offenderId = PoffenderId; }

    get userId(): string { return this._userId; }
    
    set userId(puserId: string) { this._userId = puserId; }

    get trustAccount(): Boolean { return this._trustAccount; }
    
    set trustAccount(ptrustAccount: Boolean) { this._trustAccount = ptrustAccount; }

    get caseloadId(): string { return this._caseloadId; }
    
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get errorFlagVal(): string { return this._errorFlagVal; }
    
    set errorFlagVal(perrorFlagVal: string) { this._errorFlagVal = perrorFlagVal; }

    get ovrlapFlag(): Boolean { return this._ovrlapFlag; }
    
    set ovrlapFlag(povrlapFlag: Boolean) { this._ovrlapFlag = povrlapFlag; }

    get activeFlag(): string { return this._activeFlag; }
    
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get billableFlagValue(): string { return this._billableFlagValue; }
    
    set billableFlagValue(pbillableFlagValue: string) { this._billableFlagValue = pbillableFlagValue; }

    get offenderSupId(): number { return this._offenderSupId; }

    set offenderSupId(poffenderSupId: number) { this._offenderSupId = poffenderSupId; }

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

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get startTime(): Date { return this._startTime; }

    set startTime(pstartTime: Date) { this._startTime = pstartTime; }

    get startDatetime(): Date { return this._startDatetime; }
    
    set startDatetime(pstartDatetime: Date) { this._startDatetime = pstartDatetime; }
    
    get endDatetime(): Date { return this._endDatetime; }

    set endDatetime(pendDatetime: Date) { this._endDatetime = pendDatetime; }

    get endTime(): Date { return this._endTime; }

    set endTime(pendTime: Date) { this._endTime = pendTime; }

    

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'modifyUserId': this._modifyUserId,
            'commentText': this._commentText,
            'billableFlag': this._billableFlag,
            'createDatetime': this._createDatetime,
            'supStatus': this._supStatus,
            'activeFlagVal': this._activeFlagVal,
            'errorFlag': this._errorFlag,
            'startDatetime': this._startDatetime,
            'startTime': this._startTime,
            'endDatetime': this._endDatetime,
            'sealFlag': this._sealFlag,
            'endTime': this._endTime,
            'offenderSupId': this._offenderSupId,
            'billableFlagValue': this._billableFlagValue,
            'activeFlag': this._activeFlag,
            'ovrlapFlag': this._ovrlapFlag,
            'errorFlagVal': this._errorFlagVal,
            'caseloadId': this._caseloadId,
            'trustAccount': this._trustAccount,
            'userId': this._userId,
            'offenderId': this._offenderId,
        };
    }
}
