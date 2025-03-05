import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service'

@Injectable({ providedIn: 'root' })

export class OimsglenService {
	constructor(private http: HttpService) {}
	/** This is description of the agencySegmentLengthsExecuteQuery function*/
	agencysegmentlengthsExecuteQuery(obj) {
		return this.http.post('oimsglen/agencySegmentLengthsExecuteQuery',obj);
	}
	/** This is description of the agencySegmentLengthsCommit function*/
	agencysegmentlengthsCommit(obj) {
		return this.http.post('oimsglen/agencySegmentLengthsCommit',obj);
	}
}
