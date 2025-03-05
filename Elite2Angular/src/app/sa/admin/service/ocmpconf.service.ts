import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OcmpconfService {
    
    constructor(private http: HttpService) { }
 
    loadData(): Observable<any> {
        return this.http.get('ocmpconf/loadData');
    }
    saveData(data): Observable<any> {
        return this.http.post('ocmpconf/saveData', data);
    }
}
