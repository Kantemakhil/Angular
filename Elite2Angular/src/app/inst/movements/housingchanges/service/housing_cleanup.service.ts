import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class HousingCleanUpService {
    constructor(private http: HttpService) { }
cleanUpHousingData(){
        return this.http.get('housing/cleanUpHousingData');
    }

checkAgyLocationExist() {
    return this.http.get('housingDataCreation/checkAgyLocationExist');
}

assignDefaultLocation() {
    return this.http.get('housingCleanUp/assignDefaultLocation');
}

createAndAdmitOffender() {
    return this.http.get('housingDataCreation/createAndAdmitOffender');
}


}