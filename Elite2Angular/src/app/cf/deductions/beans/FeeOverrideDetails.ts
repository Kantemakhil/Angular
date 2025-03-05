export class FeeOverrideDetails {
    private _offFeeOverrideId: number;
    private _createUserId: string;
    private _addedDate: Date;
    private _overrideEndDate: Date;
    private _modifyDatetime: Date;
    private _addedBy: string;
    private _modifyUserId: string;
    private _overrideAmount: number;
    private _commentText: string;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _overrideType: string;
    private _priorityIndicator: number;
    private _overrideStartDate: Date;
    private _addedByStaffId: number;
    private _sealFlag: string;
    private _offenderFeeId: number;
    private _billGeneratedFlag: string;
    private _overrideTypeDb: string;

    get offFeeOverrideId(): number{ return this._offFeeOverrideId; }
    set offFeeOverrideId(poffFeeOverrideId: number){ this._offFeeOverrideId = poffFeeOverrideId ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get addedDate(): Date{ return this._addedDate; }
    set addedDate(paddedDate: Date){ this._addedDate = paddedDate ;}
    get overrideEndDate(): Date{ return this._overrideEndDate; }
    set overrideEndDate(poverrideEndDate: Date){ this._overrideEndDate = poverrideEndDate ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get addedBy(): string{ return this._addedBy; }
    set addedBy(paddedBy: string){ this._addedBy = paddedBy ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get overrideAmount(): number{ return this._overrideAmount; }
    set overrideAmount(poverrideAmount: number){ this._overrideAmount = poverrideAmount ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get overrideType(): string{ return this._overrideType; }
    set overrideType(poverrideType: string){ this._overrideType = poverrideType ;}
    get priorityIndicator(): number{ return this._priorityIndicator; }
    set priorityIndicator(ppriorityIndicator: number){ this._priorityIndicator = ppriorityIndicator ;}
    get overrideStartDate(): Date{ return this._overrideStartDate; }
    set overrideStartDate(poverrideStartDate: Date){ this._overrideStartDate = poverrideStartDate ;}
    get addedByStaffId(): number{ return this._addedByStaffId; }
    set addedByStaffId(paddedByStaffId: number){ this._addedByStaffId = paddedByStaffId ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get offenderFeeId(): number{ return this._offenderFeeId; }
    set offenderFeeId(poffenderFeeId: number){ this._offenderFeeId = poffenderFeeId ;}
    get billGeneratedFlag(): string{ return this._billGeneratedFlag; }
    set billGeneratedFlag(pbillGeneratedFlag: string){ this._billGeneratedFlag = pbillGeneratedFlag ;}
    get overrideTypeDb(): string{ return this._overrideTypeDb; }
    set overrideTypeDb(poverrideTypeDb: string){ this._overrideTypeDb = poverrideTypeDb ;}
toJSON(): any {
    return { 
       'offFeeOverrideId': this._offFeeOverrideId,
       'createUserId': this._createUserId,
       'addedDate': this._addedDate,
       'overrideEndDate': this._overrideEndDate,
       'modifyDatetime': this._modifyDatetime,
       'addedBy': this._addedBy,
       'modifyUserId': this._modifyUserId,
       'overrideAmount': this._overrideAmount,
       'commentText': this._commentText,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'overrideType': this._overrideType,
       'priorityIndicator': this._priorityIndicator,
       'overrideStartDate': this._overrideStartDate,
       'addedByStaffId': this._addedByStaffId,
       'sealFlag': this._sealFlag,
       'offenderFeeId': this._offenderFeeId,
       'billGeneratedFlag': this._billGeneratedFlag,
       'overrideTypeDb': this._overrideTypeDb
        };
    }  
}