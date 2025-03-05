import { BaseModel } from '@commonbeans/BaseModel';
export class ProgramPaySettingsBean extends BaseModel {
    private _payFlag: string;
    private _paySystemCode: string;
    private _payCycleStartDay: string;
    private _instActDefaultAttCode: string;
    private _instActMaxScheduledHours: number;
    private _acpAttCode: string;
    private _instActAttCode: string;
    private _iepLevelCode: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _sealFlag: string;
    private _acpAttCodeValue: any[] = [];
    private _instActAttCodeValue: any[] = [];
    private _instActDelFlag: any;
    
   

    get payFlag(): string { return this._payFlag; }
    set payFlag(ppayFlag: string) { this._payFlag = ppayFlag; }

    get paySystemCode(): string { return this._paySystemCode; }
    set paySystemCode(ppaySystemCode: string) { this._paySystemCode = ppaySystemCode; }

    get payCycleStartDay(): string { return this._payCycleStartDay; }
    set payCycleStartDay(ppayCycleStartDay: string) { this._payCycleStartDay = ppayCycleStartDay; }

    get instActDefaultAttCode(): string { return this._instActDefaultAttCode; }
    set instActDefaultAttCode(pinstActDefaultAttCode: string) { this._instActDefaultAttCode = pinstActDefaultAttCode; }

    get instActMaxScheduledHours(): number { return this._instActMaxScheduledHours; }
    set instActMaxScheduledHours(pinstActMaxScheduledHours: number) { this._instActMaxScheduledHours = pinstActMaxScheduledHours; }

    get acpAttCode(): string { return this._acpAttCode; }
    set acpAttCode(pacpAttCode: string) { this._acpAttCode = pacpAttCode; }

    get instActAttCode(): string { return this._instActAttCode; }
    set instActAttCode(pinstActAttCode: string) { this._instActAttCode = pinstActAttCode; }

    get iepLevelCode(): string { return this._iepLevelCode; }
    set iepLevelCode(piepLevelCode: string) { this._iepLevelCode = piepLevelCode; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get acpAttCodeValue(): any { return this._acpAttCodeValue; }
    set acpAttCodeValue(pacpAttCodeValue: any) { this._acpAttCodeValue = pacpAttCodeValue; }

    get instActAttCodeValue(): any { return this._instActAttCodeValue; }
    set instActAttCodeValue(pinstActAttCodeValue: any) { this._instActAttCodeValue = pinstActAttCodeValue; }
    public get instActDelFlag(): any {  return this._instActDelFlag;    }
    public set instActDelFlag(value: any) { this._instActDelFlag = value;    }

   
    toJSON(): any {
        return {
            'payFlag': this._payFlag,
            'paySystemCode': this._paySystemCode,
            'payCycleStartDay': this._payCycleStartDay,
            'instActDefaultAttCode': this._instActDefaultAttCode,
            'instActMaxScheduledHours': this._instActMaxScheduledHours,
            'acpAttCode': this._acpAttCode,
            'instActAttCode': this._instActAttCode,
            'iepLevelCode': this._iepLevelCode,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'acpAttCodeValue': this._acpAttCodeValue,
            'instActAttCodeValue': this._instActAttCodeValue,
            'instActDelFlag':this._instActDelFlag
        };
    }
}