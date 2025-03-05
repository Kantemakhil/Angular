import { BaseModel } from "@common/beans/BaseModel";

export class WorkflowScreens extends BaseModel{
    private  _workFlowCode:string;
	private  _moduleName:string;
	private  _description:string;
	private  _workFlowSeq:number;
	private  _modifyUserId:string;
	private  _modifyDatetime:Date;//TimeStamp
	private  _caseLoadType:string;
	private  _createDatetime;//Timestamp
	private  _sealFlag:string;
	private  _inserted:boolean;
	// private  _errorMessage:string;
	private  _state:number;
	private  _depth:number;
    private  _icon:string;
    private _toolTip:string

    get workFlowCode(): string { return this._workFlowCode; }
    set workFlowCode( pworkFlowCode: string ) { this._workFlowCode = pworkFlowCode; }

    get moduleName(): string { return this._moduleName; }
    set moduleName( pmoduleName: string ) { this._moduleName = pmoduleName; }

    get description(): string { return this._description; }
    set description( pdescription: string ) { this._description = pdescription; }

    get workFlowSeq(): number { return this._workFlowSeq; }
    set workFlowSeq( pworkFlowSeq: number ) { this._workFlowSeq = pworkFlowSeq; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

  
    get caseLoadType(): string { return this._caseLoadType; }
    set caseLoadType( pcaseLoadType: string ) { this._caseLoadType = pcaseLoadType; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get state(): number { return this._state; }
    set state( pstate: number ) { this._state = pstate; }

    get depth(): number { return this._depth; }
    set depth( pworkFlowCode: number ) { this._depth = pworkFlowCode; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get createDatetime(): string { return this._createDatetime; }
    set createDatetime( pcreateDatetime: string ) { this._createDatetime = pcreateDatetime; }

    get inserted(): boolean { return this._inserted; }
    set inserted( pinserted: boolean ) { this._inserted = pinserted; }

    // get errorMessage(): string { return this._errorMessage; }
    // set errorMessage( perrorMessage: string ) { this._errorMessage = perrorMessage; }

    get toolTip(): string { return this._toolTip; }
    set toolTip( ptoolTip: string ) { this._toolTip = ptoolTip; }
    
    toJSON(): any {
        return {
            'workFlowCode': this._workFlowCode,
            'moduleName': this._moduleName,
            'description': this._description,
            'workFlowSeq': this._workFlowSeq,
            'modifyUserId': this._modifyUserId,
            'modifyDateTime': this._modifyDatetime,
            'createDatetime': this._createDatetime,
            'caseLoadType ': this._caseLoadType,
            'sealFlag': this._sealFlag,
            'inserted': this._inserted,
            // 'errorMessage': this._errorMessage,
            'state': this._state,
            'depth': this._depth,
            'icon': this._icon,
            'toolTip': this._toolTip,
        };
    }
}