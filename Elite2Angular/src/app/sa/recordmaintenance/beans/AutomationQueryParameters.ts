import { BaseModel } from '@common/beans/BaseModel';

export class AutomationQueryParameters extends BaseModel {
    private _apiId: string;
    private _parameterId: number;
    private _queryKey: string;
    private _parameterCode: string;
    private _parameterDescription: string;
    private _parameterType: string;
    private _createDatetime: Date;
    private _modifyDatetime: Date;
    private _createUserId: string;
    private _modifyUserId: string;

    get apiId(): string { return  this._apiId; }
    set apiId(papiId: string) { this._apiId = papiId; }

    get parameterId(): number { return  this._parameterId; }
    set parameterId(pparameterId: number) { this._parameterId = pparameterId; }

    get queryKey(): string { return  this._queryKey; }
    set queryKey(pqueryKey: string) { this._queryKey = pqueryKey; }

    get parameterCode(): string { return  this._parameterCode; }
    set parameterCode(pparameterCode: string) { this._parameterCode = pparameterCode; }

    get parameterDescription(): string { return  this._parameterDescription; }
    set parameterDescription(pparameterDescription: string) { this._parameterDescription = pparameterDescription; }

    get parameterType(): string { return  this._parameterType; }
    set parameterType(pparameterType: string) { this._parameterType = pparameterType; }

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
            'parameterId': this._parameterId,
            'queryKey': this._queryKey,
            'parameterCode': this._parameterCode,
            'parameterDescription': this._parameterDescription,
            'parameterType': this._parameterType,
            'createDatetime': this._createDatetime,
            'modifyDatetime': this._modifyDatetime,
		    'modifyUserId': this._modifyUserId,
            'createUserId': this._createUserId,
            'apiId': this._apiId
        };
    }
}