export class OcdlegloSanctionHty {
    private _orderType: string;
    private _createUserId: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _adjustReason: String;
    private _commentText: string;
    private _sentenceSeq: number;
    private _adjustTime: Date;
    private _createDatetime: Date;
    private _offSanctionSentHtyId: number;
    private _serialVersionUID: number;
    private _newCounter: number;
    private _adjustDate: Date;
    private _sealFlag: string;
    private _staffId: number;
    private _noOfUnexcusedAbsence: number;
    

    get orderType(): string{ return this._orderType; }
    set orderType(porderType: string){ this._orderType = porderType ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get adjustReason(): String{ return this._adjustReason; }
    set adjustReason(padjustReason: String){ this._adjustReason = padjustReason ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get sentenceSeq(): number{ return this._sentenceSeq; }
    set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
    get adjustTime(): Date{ return this._adjustTime; }
    set adjustTime(padjustTime: Date){ this._adjustTime = padjustTime ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get offSanctionSentHtyId(): number{ return this._offSanctionSentHtyId; }
    set offSanctionSentHtyId(poffSanctionSentHtyId: number){ this._offSanctionSentHtyId = poffSanctionSentHtyId ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get newCounter(): number{ return this._newCounter; }
    set newCounter(pnewCounter: number){ this._newCounter = pnewCounter ;}
    get adjustDate(): Date{ return this._adjustDate; }
    set adjustDate(padjustDate: Date){ this._adjustDate = padjustDate ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get staffId(): number{ return this._staffId; }
    set staffId(pstaffId: number){ this._staffId = pstaffId ;}
    get noOfUnexcusedAbsence(): number { return this._noOfUnexcusedAbsence; }
    set noOfUnexcusedAbsence(value: number) {  this._noOfUnexcusedAbsence = value; }

toJSON(): any {
    return { 
       'orderType': this._orderType,
       'createUserId': this._createUserId,
       'offenderBookId': this._offenderBookId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'adjustReason': this._adjustReason,
       'commentText': this._commentText,
       'sentenceSeq': this._sentenceSeq,
       'adjustTime': this._adjustTime,
       'createDatetime': this._createDatetime,
       'offSanctionSentHtyId': this._offSanctionSentHtyId,
       'serialVersionUID': this._serialVersionUID,
       'newCounter': this._newCounter,
       'adjustDate': this._adjustDate,
       'sealFlag': this._sealFlag,
       'staffId': this._staffId,
       'noOfUnexcusedAbsence': this._noOfUnexcusedAbsence
        };
    } 
}