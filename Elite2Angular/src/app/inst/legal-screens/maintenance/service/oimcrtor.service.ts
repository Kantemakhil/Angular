import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimcrtorService {
	constructor(private http: HttpService) { }
	/** This is description of the orderTypesExecuteQuery function*/
	orderTypesExecuteQuery(obj) {
		return this.http.post('oimcrtor/orderTypesExecuteQuery', obj);
	}
	/** This is description of the orderTypesCommit function*/
	orderTypesCommit(obj) {
		return this.http.post('oimcrtor/orderTypesCommit', obj);
	}
	/** This is description of the iwpTemplateObjectsExecuteQuery function*/
	iwpTemplateObjectsExecuteQuery(obj) {
		return this.http.post('oimcrtor/iwpTemplateObjectsExecuteQuery', obj);
	}
	/** This is description of the iwpTemplateObjectsCommit function*/
	iwpTemplateObjectsCommit(obj) {
		return this.http.post('oimcrtor/iwpTemplateObjectsCommit', obj);
	}
	/** This is description of the rgCategoryRecordGroup function*/
	rgCategoryRecordGroup(obj) {
		return this.http.get('oimcrtor/rgCategoryRecordGroup');
	}
	/** This is description of the rgTemplateRecordGroup function*/
	rgTemplateRecordGroup() {
		return this.http.get('oimcrtor/rgTemplateRecordGroup');
	}
	checkIwpTempObjDelete(templateId: number) {
		return this.http.get('oimcrtor/iwpTempOnCheckDeleteMaster?templateId=' + templateId);
	}
}
