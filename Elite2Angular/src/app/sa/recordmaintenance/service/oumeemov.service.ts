import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable()
export class OumeemovService {
	constructor(private http: HttpService) { }
	/** This is description of the offEmExecuteQuery function*/
	offEmExecuteQuery(obj) {
		return this.http.post('oumeemov/offEmExecuteQuery', obj);
	}
	/** This is description of the offEmCommit function*/
	offEmCommit(obj) {
		return this.http.post('oumeemov/offEmCommit', obj);
	}
	/** This is description of the cgfkOffemfromcityRecordGroup function*/
	cgfkOffemfromcityRecordGroup(obj) {
		return this.http.get('oumeemov/cgfk$offEmFromCityRecordGroup');
	}
	/** This is description of the cgfkOffemfromagylocidRecordGroup function*/
	cgfkOffemfromagylocidRecordGroup(obj) {
		return this.http.get('oumeemov/cgfk$offEmFromAgyLocIdRecordGroup');
	}
	/** This is description of the cgfkOffemtoagylocidRecordGroup function*/
	cgfkOffemtoagylocidRecordGroup(obj) {
		return this.http.get('oumeemov/cgfk$offEmToAgyLocIdRecordGroup');
	}
	/** This is description of the cgfkOffemmovementtypeRecordGroup function*/
	cgfkOffemmovementtypeRecordGroup(obj) {
		return this.http.get('oumeemov/cgfk$offEmMovementTypeRecordGroup');
	}
	/** This is description of the cgfkOffemdirectioncodeRecordGroup function*/
	cgfkOffemdirectioncodeRecordGroup(obj) {
		return this.http.get('oumeemov/cgfk$offEmDirectionCodeRecordGroup');
	}
	/** This is description of the cgfkOffemmovementreasoncoRecordGroup function*/
	cgfkOffemmovementreasoncoRecordGroup(obj) {
		return this.http.get('oumeemov/cgfk$offEmMovementReasonCoRecordGroup');
	}
	/** This is description of the cgfkOffemtocityRecordGroup function*/
	cgfkOffemtocityRecordGroup(obj) {
		return this.http.get('oumeemov/cgfk$offEmToCityRecordGroup');
	}

	/** This is description of the validateSeqNum function*/
	validateSeqNum(obj) {
		return this.http.get('oumeemov/validateSeqNum');
	}
}
