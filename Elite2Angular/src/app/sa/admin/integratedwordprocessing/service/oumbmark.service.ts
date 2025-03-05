import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { IwpBookmarks } from '../beans/IwpBookmarks';

@Injectable({providedIn: 'root'})
export class OumbmarkService {
	constructor(private http: HttpService) { }
	/** This is description of the aIwpBookmarksExecuteQuery function*/
	aIwpBookmarksExecuteQuery(obj) {
		return this.http.post('oumbmark/aIwpBookmarksExecuteQuery', obj);
	}
	/** This is description of the aIwpBookmarksCommit function*/
	aIwpBookmarksCommit(obj) {
		return this.http.post('oumbmark/aIwpBookmarksCommit', obj);
	}
	/** This is description of the aIwpParametersExecuteQuery function*/
	aIwpParametersExecuteQuery(obj) {
		return this.http.post('oumbmark/aIwpParametersExecuteQuery', obj);
	}
	/** This is description of the aIwpParametersCommit function*/
	aIwpParametersCommit(obj) {
		return this.http.post('oumbmark/aIwpParametersCommit', obj);
	}
	/** This is description of the rgBmTypeRecordGroup function*/
	rgBmTypeRecordGroup() {
		return this.http.get('oumbmark/rgBmTypeRecordGroup');
	}
	/** This is description of the rgParamDataTypeRecordGroup function*/
	rgParamDataTypeRecordGroup() {
		return this.http.get('oumbmark/rgParamDataTypeRecordGroup');
	}
	/** This is description of the rgParamTypeRecordGroup function*/
	rgParamTypeRecordGroup() {
		return this.http.get('oumbmark/rgParamTypeRecordGroup');
	}
	/** This is description of the oumbmarkIwpBookmarksSqlText function*/
	oumbmarkIwpBookmarksSqlText(obj) {
		return this.http.post('oumbmark/oumbmarkIwpBookmarksSqlText', obj);
	}
	getOutParamLov(aiwpbookmarksModel: IwpBookmarks) {
		return this.http.post('oumbmark/getOutParamLov', aiwpbookmarksModel);
	}
	getOutParams(bookmarkName) {
		return this.http.post('oumbmark/getOutParams', bookmarkName);
	}
	iwpOutparametersUpdate(obj) {
		return this.http.post('oumbmark/outParametersUpdate', obj);
	}
}
