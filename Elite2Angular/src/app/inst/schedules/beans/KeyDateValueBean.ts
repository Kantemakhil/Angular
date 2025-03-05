import { BaseModel } from '@commonbeans/BaseModel';
export class KeyDateValueBean extends BaseModel {

    private _dateType: string;
   
    private _dateValue: string;

    get dateType(): string { return this._dateType; }

    set dateType(pdateType: string) { this._dateType = pdateType; }

    get dateValue(): string { return this._dateValue; }

    set dateValue(pdateValue: string) { this._dateValue = pdateValue; }

    toJSON(): any {
        return {
            'dateValue': this._dateValue,
            'dateType': this._dateType,
        };
    }
}