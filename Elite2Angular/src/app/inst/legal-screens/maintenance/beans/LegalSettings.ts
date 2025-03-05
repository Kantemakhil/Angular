
export class LegalSettings {
    private _value: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _setting: string;
    private _code: string;
    private _description: string;
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get code(): string {
        return this._code;
    }
    public set code(value: string) {
        this._code = value;
    }


    
    public get createDatetime(): Date {
        return this._createDatetime;
    }
    public set createDatetime(value: Date) {
        this._createDatetime = value;
    }

    public get createUserId(): string {
        return this._createUserId;
    }
    public set createUserId(value: string) {
        this._createUserId = value;
    }
   
    public get modifyDatetime(): Date {
        return this._modifyDatetime;
    }
    public set modifyDatetime(value: Date) {
        this._modifyDatetime = value;
    }
    
    public get modifyUserId(): string {
        return this._modifyUserId;
    }
    public set modifyUserId(value: string) {
        this._modifyUserId = value;
    }
  
    public get sealFlag(): string {
        return this._sealFlag;
    }
    public set sealFlag(value: string) {
        this._sealFlag = value;
    }
    public get setting(): string {
        return this._setting;
    }
    public set setting(value: string) {
        this._setting = value;
    }

  


    toJSON(): any {
        return {
            'value': this._value,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'setting': this._setting,
        };
    }

}