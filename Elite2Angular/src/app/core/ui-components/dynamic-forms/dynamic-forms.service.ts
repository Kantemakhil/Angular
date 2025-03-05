import { HttpService } from '@core/service/http.service';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class DynamicFormsService {
    
    constructor(private http: HttpService ) {
    }
    
    saveFormbuilderData(formsBuilderBean){
        return this.http.post('dynamicForms/updateFormbuilderData', formsBuilderBean);
    }
    
    getIdentifierData(formIdentifier: string) {
        return this.http.post('dynamicForms/getIdentifierData', formIdentifier);
    }
    
    submitFormData(formData) {
        return this.http.post('ocmpconf/submitFormData', formData);
    }
    
    getFormData(formData) {
        return this.http.post('ocmpconf/getFormData', formData);
    }

    getFormDataBasedOnModName(formModuleName: any) {
        return this.http.post('ocmpconf/getFormDataBasedOnModName', formModuleName);
    }
}
