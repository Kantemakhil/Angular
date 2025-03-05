import {BaseModel} from '@commonbeans/BaseModel'

export class CaseIdentifiers extends BaseModel{ 
    
    private _seqNumber: number;
    private _caseId: number;
    private _type: string;   
    private _number: string;   
    private _oldType: string;   
    private _oldNumber: string;
    private _modifyUserId: string;
    private _createUserId: string;
    private _modifyDateTime: Date;
    private _createDateTime: Date;

    get seqNumber(): number { return this._seqNumber; }    
    set seqNumber( seq: number ) { this._seqNumber = seq; }

    get caseId(): number { return this._caseId; }    
    set caseId( caseId: number ) { this._caseId = caseId; }

    get type(): string { return this._type; }
    set type( type: string ) { this._type = type; }
    
    get number(): string { return this._number; }
    set number( number: string ) { this._number = number; }
    
    get oldType(): string { return this._oldType; }
    set oldType( oldtype: string ) { this._oldType = oldtype; }
    
    get oldNumber(): string { return this._oldNumber; }
    set oldNumber( oldnumber: string ) { this._oldNumber = oldnumber; }
    
    get modifyDateTime(): Date { return this._modifyDateTime; }
    set modifyDateTime( modifyDateTime: Date ) { this._modifyDateTime = modifyDateTime; }

    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime( createDateTime: Date ) { this._createDateTime = createDateTime; }
    
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( modifyUserId: string ) { this._modifyUserId = modifyUserId; }

    get createUserId(): string { return this._createUserId; }
    set createUserId( createUserId: string ) { this._createUserId = createUserId; }

}