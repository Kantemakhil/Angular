import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class CmdhistService {
	bpmnRowData: any;
	bpmnViewer = true;
	dmnViewer = false;
	cmnBpmnViewer = false;
	
	constructor(private http: HttpService) { }
	gerVersionHistory(obj) {
		return this.http.post('prosmain/gerVersionHistory', obj);
	}
	gerDmnVersionHistory(obj) {
		return this.http.post('dmnmain/gerVersionHistory', obj);
	}
}
