import { BaseModel } from '@common/beans/BaseModel';
import { AutomationQueryParameters } from './AutomationQueryParameters';

export class ActionApi extends BaseModel {
    private _apiId: string;
    private _apiDescription: string;
    private _queryKey: string;
    private _requestType: string;
    private _url: string;
    private _queryId: number
    private _queryText: string;
    private _queryDesc: string;
    private _activeFlag: string;
    private _verifiedBy: string;
    private _verifiedDate: Date;
    private _paramList: Array<AutomationQueryParameters>;
    private _createDatetime: Date;
    private _modifyDatetime: Date;
    private _createUserId: string;
    private _modifyUserId: string;

    get queryId(): number { return  this._queryId; }
    set queryId(pqueryId: number) { this._queryId = pqueryId; }

    get queryText(): string { return  this._queryText; }
    set queryText(pqueryText: string) { this._queryText = pqueryText; }

    get queryDesc(): string { return  this._queryDesc; }
    set queryDesc(pqueryDesc: string) { this._queryDesc = pqueryDesc; }

    get activeFlag(): string { return  this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get verifiedBy(): string { return  this._verifiedBy; }
    set verifiedBy(pverifiedBy: string) { this._verifiedBy = pverifiedBy; }

    get verifiedDate(): Date { return  this._verifiedDate; }
    set verifiedDate(pverifiedDate: Date) { this._verifiedDate = pverifiedDate; }

    get paramList(): Array<AutomationQueryParameters> { return this._paramList; }
    set paramList(pparamList: Array<AutomationQueryParameters>) { this._paramList = pparamList; }

    get apiId(): string{ return this._apiId; }
    set apiId(papiId: string){ this._apiId = papiId ;}

    get apiDescription(): string{ return this._apiDescription; }
    set apiDescription(papiDescription: string){ this._apiDescription = papiDescription ;}

    get queryKey(): string{ return this._queryKey; }
    set queryKey(pqueryKey: string){ this._queryKey = pqueryKey ;}

    get requestType(): string{ return this._requestType; }
    set requestType(prequestType: string){ this._requestType = prequestType ;}

    get url(): string{ return this._url; }
    set url(purl: string){ this._url = purl ;}

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
            'queryId': this._queryId,
            'queryText': this._queryText,
            'queryDesc': this._queryDesc,
            'activeFlag': this._activeFlag,
            'verifiedBy': this._verifiedBy,
            'verifiedDate': this._verifiedDate,
            'paramList': this._paramList,
            'apiId': this._apiId,
            'apiDescription': this._apiDescription,
            'queryKey': this._queryKey,
            'requestType': this._requestType,
            'url': this._url,
            'createDatetime': this._createDatetime,
            'modifyDatetime': this._modifyDatetime,
		    'modifyUserId': this._modifyUserId,
            'createUserId': this._createUserId,
        };
    }
}