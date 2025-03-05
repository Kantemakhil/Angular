import { BaseModel } from '@common/beans/BaseModel';

export class BpmnProcess extends BaseModel {
    private _code: string;
    private _description: string;
    private _variableList: Array<string>
    private _createDatetime: Date;
    private _modifyDatetime: Date;
    private _createUserId: string;
    private _modifyUserId: string;

    get code(): string{ return this._code; }
    set code(pcode: string){ this._code = pcode ;}
    
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}

    get variableList(): Array<string> { return this._variableList; }
    set variableList(pvariableList: Array<string>) { this._variableList = pvariableList; }
    
    get createDatetime(): Date{ return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}

    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
         
	get modifyUserId(): string{ return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}

    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}

    toJSON(): any {
        return {
            'code': this._code,
            'description': this._description,
            'variableList': this._variableList,
           'createDatetime': this._createDatetime,
           'modifyDatetime': this._modifyDatetime,
		    'modifyUserId': this._modifyUserId,
           'createUserId': this._createUserId,
        };
    }
}