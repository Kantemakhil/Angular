export class ScheduleMovementSetting {
    private _settingValue: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _settingCode: string;
    private _settingDescription: string;
    private _settingCodeVal: any[] = [];
    public get settingCodeVal(): any[] {
        return this._settingCodeVal;
    }
    public set settingCodeVal(value: any[]) {
        this._settingCodeVal = value;
    }

        public get settingValue(): string {
        return this._settingValue;
    }
    public set settingValue(value: string) {
        this._settingValue = value;
    }

    public get settingDescription(): string {
        return this._settingDescription;
    }
    public set settingDescription(value: string) {
        this._settingDescription = value;
    }

    public get settingCode(): string {
        return this._settingCode;
    }
    public set settingCode(value: string) {
        this._settingCode = value;
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

   

    toJSON(): any {
        return {
            'settingValue': this._settingValue,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'settingCode': this._settingCode,
            'settingDescription': this._settingDescription,
            'settingCodeValue' : this._settingCodeVal
        };
    }
}
