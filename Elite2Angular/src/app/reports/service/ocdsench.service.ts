import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class OcdsenchService {
	
	constructor(private http: HttpService) { }
	
	loadSentHistoryData(data) {
    return this.http.post('ocdsench/getSentenceHisData',data);
  }
	
	
}