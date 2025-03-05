import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OuimtlogService {
constructor(private http: HttpService) {}
/** This is description of the mergeLogExecuteQuery function*/
mergeLogExecuteQuery(obj) {
return this.http.post('ouimtlog/mergeLogExecuteQuery',obj);
}
}
