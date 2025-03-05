import { BaseModel } from '@commonbeans/BaseModel';

export class WorkFlowLogs extends BaseModel {

    private _createDatetime: Date;
    private _createUserId: string;
    private _createDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _actionUserId: number;
    private _workActionDate: Date;
    private _workActionCode: string;
    private _workFlowStatus: string;
    private _workFlowId: number;
    private _workFlowSeq: number;
    private _nbtOffenderBookId: number;
    private _nbtAlertSeq: number;
    private _commentText: string;
    private _createUser: string;
    private _status: string;
    private _comment: string;
    private _agyLocId:string;
    private _casePlanId: number;
    
   
    


    

    get createDate(): Date { return this._createDate; }
    set createDate( pcreateDate: Date ) { this._createDate = pcreateDate; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }
    get workActionDate(): Date { return this._workActionDate; }
    set workActionDate( pworkActionDate: Date ) { this._workActionDate = pworkActionDate; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }
    get actionUserId(): number { return this._actionUserId; }
    set actionUserId( pactionUserId: number ) { this._actionUserId = pactionUserId; }
    get workActionCode(): string { return this._workActionCode; }
    set workActionCode( pworkActionCode: string ) { this._workActionCode = pworkActionCode; }
    get workFlowStatus(): string { return this._workFlowStatus; }
    set workFlowStatus( pworkFlowStatus: string ) { this._workFlowStatus = pworkFlowStatus; }
    get workFlowId(): number { return this._workFlowId; }
    set workFlowId( pworkFlowId: number ) { this._workFlowId = pworkFlowId; }
    get workFlowSeq(): number { return this._workFlowSeq; }
    set workFlowSeq( pworkFlowSeq: number ) { this._workFlowSeq = pworkFlowSeq; }
    get nbtAlertSeq(): number { return this._nbtAlertSeq; }
    set nbtAlertSeq( pnbtAlertSeq: number ) { this._nbtAlertSeq = pnbtAlertSeq; }
    get nbtOffenderBookId(): number { return this._nbtOffenderBookId; }
    set nbtOffenderBookId( pnbtOffenderBookId: number ) { this._nbtOffenderBookId = pnbtOffenderBookId; }
    get commentText(): string { return this._commentText; }
    set commentText( pcommentText: string ) { this._commentText = pcommentText; }
    get createUser(): string { return this._createUser; }
    set createUser( pcreateUser: string ) { this._createUser = pcreateUser; }
    public get status(): string {return this._status;}
    public set status(value: string) { this._status = value; }
    public get comment(): string {return this._comment; }
    public set comment(value: string) { this._comment = value; }
    public get agyLocId(): string { return this._agyLocId; }
    public set agyLocId(value: string) { this._agyLocId = value; }
    get casePlanId(): number { return this._casePlanId; }
    set casePlanId( pcasePlanId: number ) { this._casePlanId = pcasePlanId; }
    
    toJSON(): any {
        return {
            'createDate': this._createDate,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'workActionDate': this._workActionDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'actionUserId': this._actionUserId,
            'workActionCode': this._workActionCode,
            'workFlowId': this._workFlowId,
            'workFlowSeq': this._workFlowSeq,
            'workFlowStatus': this._workFlowStatus,
            'nbtAlertSeq': this._nbtAlertSeq,
            'nbtOffenderBookId': this._nbtOffenderBookId,
            'commentText' : this._commentText,
            'createUser' : this._createUser,
            'status': this.status,
            'comment': this.comment,
            'agyLocId':this._agyLocId,
            'casePlanId': this._casePlanId
        };
    }
}
