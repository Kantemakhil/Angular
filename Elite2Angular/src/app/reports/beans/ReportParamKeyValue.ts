export class ReportParamKeyValue {

	private _paramKey: string;
	private _paramType: string;
	private _paramValue: any;

	get paramKey(): string { return this._paramKey; }

	set paramKey(parameterKey: string) { this._paramKey = parameterKey; }
	
	get paramType(): string { return this._paramType; }

	set paramType(paramType: string) { this._paramType = paramType; }

	get paramValue(): any { return this._paramValue; }

	set paramValue(parameterValue: any) { this._paramValue = parameterValue; }
	
	toJSON(): any {
        return {
            'paramKey': this._paramKey,
            'paramValue': this._paramValue,
            'paramType': this._paramType,
        };
    }
}
