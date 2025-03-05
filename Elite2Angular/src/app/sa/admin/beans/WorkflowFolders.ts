import { BaseModel } from '@commonbeans/BaseModel';
export class  WorkflowFolders extends BaseModel{
	private  _workFlowCode:string;
	private  _description:string;
	private  _workFlowSeq:number;
	private  _modifyDatetime:Date;//Timestamp
	private  _createDatetime;//Timestamp
	private  _createUserId:string;
	private  _caseLoadType:string;
	private  _sealFlag:string;
	private  _state:number;
	private  _depth:number;
    private  _icon:string;
    private _expiryDate: Date;
    private _activeFlag: string;
    private _code: string;

    get workFlowCode(): string { return this._workFlowCode; }
    set workFlowCode( pworkFlowCode: string ) { this._workFlowCode = pworkFlowCode; }

    get code(): string { return this._code; }
    set code( pcode: string ) { this._code = pcode; }

    get description(): string { return this._description; }
    set description( pdescription: string ) { this._description = pdescription; }

    get workFlowSeq(): number { return this._workFlowSeq; }
    set workFlowSeq( pworkFlowSeq: number ) { this._workFlowSeq = pworkFlowSeq; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get createDatetime(): string { return this._createDatetime; }
    set createDatetime( pcreateDatetime: string ) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get caseLoadType(): string { return this._caseLoadType; }
    set caseLoadType( pcaseLoadType: string ) { this._caseLoadType = pcaseLoadType; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get state(): number { return this._state; }
    set state( pstate: number ) { this._state = pstate; }

    get depth(): number { return this._depth; }
    set depth( pworkFlowCode: number ) { this._depth = pworkFlowCode; }

    get icon(): string { return this._icon; }
    set icon( pworkFlowCode: string ) { this._icon = pworkFlowCode; }
    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag ;}
    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }


    toJSON(): any {
        return {
            'workFlowCode': this._workFlowCode,
            'description': this._description,
            'workFlowSeq': this._workFlowSeq,
            'modifyDatetime': this._modifyDatetime,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'caseLoadType ': this._caseLoadType,
            'sealFlag': this._sealFlag,
            'state': this._state,
            'depth': this._depth,
            'icon': this._icon,
            'activeFlag': this._activeFlag,
            'expiryDate': this._expiryDate,
        };
    }
}