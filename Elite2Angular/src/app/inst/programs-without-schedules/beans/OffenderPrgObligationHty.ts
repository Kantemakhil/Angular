export class OffenderPrgObligationHty {
    private _createDatetime: Date;
    private _statusChangeDate: Date;
    private _statusChangeReason: string;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: number;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _offenderPrgObligationHtyId: number;
    private _offenderPrgObligationId: number;
    private _status: string;
    private _statusDesc: string;
    private _statusDate: Date;
    private _statusReasonDesc: string;
    private _commentText: string;
   


    get statusDate(): Date { return this._statusDate; }
    set statusDate(pstatusDate: Date) { this._statusDate = pstatusDate; }
    get offenderPrgObligationId(): number { return this._offenderPrgObligationId; }
    set offenderPrgObligationId(poffenderPrgObligationId: number) { this._offenderPrgObligationId = poffenderPrgObligationId; }
    get statusDesc(): string { return this._statusDesc; }
    set statusDesc(pstatusDesc: string) { this._statusDesc = pstatusDesc; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get statusChangeDate(): Date { return this._statusChangeDate; }
    set statusChangeDate(pstatusChangeDate: Date) { this._statusChangeDate = pstatusChangeDate; }
    get statusChangeReason(): string { return this._statusChangeReason; }
    set statusChangeReason(pstatusChangeReason: string) { this._statusChangeReason = pstatusChangeReason; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): number { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: number) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get offenderPrgObligationHtyId(): number { return this._offenderPrgObligationHtyId; }
    set offenderPrgObligationHtyId(poffenderPrgObligationHtyId: number) { this._offenderPrgObligationHtyId = poffenderPrgObligationHtyId; }
    get status(): string { return this._status; }
    set status(pstatus: string) { this._status = pstatus; }
    get statusReasonDesc(): string { return this._statusReasonDesc; }
    set statusReasonDesc(pstatusReasonDesc: string) { this._statusReasonDesc = pstatusReasonDesc; }
    public get commentText(): string {return this._commentText;}
    public set commentText(commentText: string) { this._commentText = commentText; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'statusChangeDate': this._statusChangeDate,
            'statusChangeReason': this._statusChangeReason,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'offenderPrgObligationHtyId': this._offenderPrgObligationHtyId,
            'status': this._status,
            'statusDesc': this._statusDesc,
            'offenderPrgObligationId' : this._offenderPrgObligationId,
            'statusDate' : this._statusDate,
            'statusReasonDesc' : this._statusReasonDesc,
            'commentText': this._commentText,
        };
    }
}
