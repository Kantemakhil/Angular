import { ReportParamKeyValue } from '@report/beans/ReportParamKeyValue';

export class OirreportModuleParameters {
   
    private _moduleName: string;
    private _reportType: string;
    
    private _paramValues: Array<ReportParamKeyValue>;

 
    get moduleName(): string { return this._moduleName; }
    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }
    
    get reportType(): string { return this._reportType; }
    set reportType(reportType: string) { this._reportType = reportType; }
    
    
    get paramValues(): Array<ReportParamKeyValue> { return this._paramValues; }
    set paramValues(paramValues: Array<ReportParamKeyValue>) { this._paramValues = paramValues; }

    toJSON(): any {
        return {
            'moduleName': this._moduleName,
            'reportType': this._reportType,
            'paramValues': this._paramValues,
        };
    }
}