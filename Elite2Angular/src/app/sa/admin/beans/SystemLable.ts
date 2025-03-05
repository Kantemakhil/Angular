import { BaseModel } from '@commonbeans/BaseModel';

export class SystemLable extends BaseModel{
     private _labelId:number;
     private _moduleName:string;
     private _msgKey:string;
     private _msgValue:string;
     private _msgType:string;
     private _createDateTime:string;
     private _createUserId:string;
     private _modifyDateTime:string;
      private _modifyUserId:string;

    get labelId(): number { return this._labelId; }

    set labelId(pmenuItem: number) { this._labelId = pmenuItem; }
    
    get moduleName(): string { return this._moduleName; }

    set moduleName(pmenuItem: string) { this._moduleName = pmenuItem; }
    
    get msgKey(): string { return this._msgKey; }

    set msgKey(pmenuItem: string) { this._msgKey = pmenuItem; }
    
    get msgValue(): string { return this._msgValue; }

    set msgValue(pmenuItem: string) { this._msgValue = pmenuItem; }
    
    get msgType(): string { return this._msgType; }

    set msgType(pmenuItem: string) { this._msgType = pmenuItem; }
    
    get createDateTime(): string { return this._createDateTime; }

    set createDateTime(pmenuItem: string) { this._createDateTime = pmenuItem; }
    
    get createUserId(): string { return this._createUserId; }

    set createUserId(pmenuItem: string) { this._createUserId = pmenuItem; }
    
    get modifyDateTime(): string { return this._modifyDateTime; }

    set modifyDateTime(pmenuItem: string) { this._modifyDateTime = pmenuItem; }
    
    
    toJSON(): any {
        return {
        'labelId':this._labelId,
        'moduleName':this._moduleName,
        'msgKey':this._msgKey,
        'msgValue':this._msgValue,
        'msgType':this._msgType,
        'createDateTime':this._createDateTime,
        'createUserId':this._createUserId,
        'modifyDateTime':this._modifyDateTime,
        'modifyUserId':this._modifyUserId
        };
    }
}