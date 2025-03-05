import { FormsBuilderBean } from '@core/ui-components/dynamic-forms/forms-builder-bean';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable } from 'rxjs';
import { OdynfrmCommitBean } from '../beans/OdynfrmCommitBean';

@Injectable({providedIn: 'root'})
export class OdynfrmService {
    formData= new FormsBuilderBean();
    
    constructor(private http: HttpService) { }
    
    loadFormbuilderData(): Observable<any> {
        return this.http.get('ocmpconf/loadFormbuilderData');
    }
    saveFormbuilderData(data): Observable<any> {
        return this.http.post('ocmpconf/saveFormbuilderData', data);
    }
    commitformData(odynfrmCommitModel: OdynfrmCommitBean): Observable<any>  {
        return this.http.post('ocmpconf/commitformData', odynfrmCommitModel);
    }
}
