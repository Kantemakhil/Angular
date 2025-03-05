import { BaseModel } from '@common/beans/BaseModel';

export class DmnProcess extends BaseModel {
    private _decisionId: number;
    private _definitionKey: string;
    private _definitionDesc: string;
    private _dmnFile: Blob;
    private _createDatetime: Date;
    private _modifyDatetime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _button: string;
    private _dmn: string;
    private _deployeId: string;
    private _deployFlag: string;
    private _historyFlag: string;
    private _defVersion: number;
    private _definitionId: string;
    private _deployDatetime: Date;
    private _deployUserId: string;
    private _dateTime: string;
    private _category: string;

    get button(): string { return  this._button; }
    set button(pbutton: string) { this._button = pbutton; }
    get decisionId(): number { return  this._decisionId; }
    set decisionId(pdecisionId: number) { this._decisionId = pdecisionId; }

    get dmn(): string { return  this._dmn; }
    set dmn(pdmn: string) { this._dmn = pdmn; }

    get definitionKey(): string { return  this._definitionKey; }
    set definitionKey(pdefinitionKey: string) { this._definitionKey = pdefinitionKey; }

    get definitionDesc(): string { return  this._definitionDesc; }
    set definitionDesc(pdefinitionDesc: string) { this._definitionDesc = pdefinitionDesc; }

    get dmnFile(): Blob { return  this._dmnFile; }
    set dmnFile(pdmnFile: Blob) { this._dmnFile = pdmnFile; }

    get createDatetime(): Date{ return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}

    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
         
	get modifyUserId(): string{ return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}

    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    
    get deployeId(): string{ return this._deployeId; }
    set deployeId(pdeployeId: string){ this._deployeId = pdeployeId ;}
    
    get deployFlag(): string{ return this._deployFlag; }
    set deployFlag(pdeployFlag: string){ this._deployFlag = pdeployFlag ;}
    
    get historyFlag(): string{ return this._historyFlag; }
    set historyFlag(phistoryFlag: string){ this._historyFlag = phistoryFlag ;}
    
    get defVersion(): number{ return this._defVersion; }
    set defVersion(pdefVersion: number){ this._defVersion = pdefVersion ;}
    
    get definitionId(): string{ return this._definitionId; }
    set definitionId(pdefinitionId: string){ this._definitionId = pdefinitionId ;}
    
    get deployDatetime(): Date{ return this._deployDatetime; }
    set deployDatetime(pdeployDatetime: Date){ this._deployDatetime = pdeployDatetime ;}
         
	get deployUserId(): string{ return this._deployUserId; }
    set deployUserId(pdeployUserId: string){ this._deployUserId = pdeployUserId ;}
    
    get dateTime(): string { return  this._dateTime; }
    set dateTime(pdateTime: string) { this._dateTime = pdateTime; }
    get category(): string { return  this._category; }
    set category(pcategory: string) { this._category = pcategory; }
    toJSON(): any {
        return {
           'decisionId': this._decisionId,
           'definitionKey': this._definitionKey,
           'definitionDesc': this._definitionDesc,
           'dmnFile': this._dmnFile,
           'createDatetime': this._createDatetime,
           'modifyDatetime': this._modifyDatetime,
		    'modifyUserId': this._modifyUserId,
           'createUserId': this._createUserId,
           'dmn': this._dmn,
           'button':this._button,
           'deployeId': this._deployeId,
           'deployFlag': this._deployFlag,
           'historyFlag': this._historyFlag,
           'defVersion': this._defVersion,
           'definitionId': this.definitionId,
           'deployDatetime': this._deployDatetime,
           'deployUserId': this._deployUserId,
           'dateTime':this._dateTime,
           'category':this._category
        };
    }
}