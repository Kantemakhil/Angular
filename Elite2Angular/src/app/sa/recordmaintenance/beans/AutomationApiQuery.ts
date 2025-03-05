import { BaseModel } from '@common/beans/BaseModel';

export class AutomationApiQuery extends BaseModel {
    private _apiId: string;
	private _queryId: number;
	private _queryKey: string;
	private _queryText: string; 
	private _queryDesc: string;
	private _activeFlag: string; 
	private _verifiedBy: string;
    private _verifiedDate: Date; 
    private _createDatetime: Date;
    private _modifyDatetime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _active: boolean;
    private _category: string;
    get apiId(): string { return  this._apiId; }
    set apiId(papiId: string) { this._apiId = papiId; }

    get queryId(): number { return  this._queryId; }
    set queryId(pqueryId: number) { this._queryId = pqueryId; }

    get queryKey(): string { return  this._queryKey; }
    set queryKey(pqueryKey: string) { this._queryKey = pqueryKey; }

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

    get createDatetime(): Date{ return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}

    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
         
	get modifyUserId(): string{ return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}

    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}

    get active(): boolean{ return this._active; }
    set active(pactive: boolean){ this._active = pactive ;}

    get category(): string { return  this._category; }
    set category(pcategory: string) { this._category = pcategory; }
    toJSON(): any {
        return {
            'queryId': this._queryId,
	        'queryKey': this._queryKey,
	        'queryText': this._queryText, 
	        'queryDesc': this._queryDesc,
	        'activeFlag': this._activeFlag, 
	        'verifiedBy': this._verifiedBy,
            'verifiedDate': this._verifiedDate,
            'createDatetime': this._createDatetime,
            'modifyDatetime': this._modifyDatetime,
		    'modifyUserId': this._modifyUserId,
            'createUserId': this._createUserId,
            'active': this._active,
            'apiId': this._apiId,
            'category':this._category
        };
    }
}