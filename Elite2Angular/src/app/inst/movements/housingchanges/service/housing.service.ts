import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class HousingService {
    constructor(private http: HttpService) { }
    
    populateAllHousing(obj){        
        return this.http.post('housing/getAllRecords',obj);
    }
    
    populateBedInfo(obj){ 
        return this.http.post('housing/getAllocatedBedInfo',obj);
    }
    
    populateConflictsInfo(obj){ 
        return this.http.post('housing/getConflictInfo',obj);
    }
    populateAllImages(){
        return this.http.get('housing/getAllImages');
    }
    
    populateAllocatedOffDetails(obj){
        return this.http.post('housing/getAllocatedOffenderInfo',obj);
    }
    getBreadCrumbs(obj){
        return this.http.post('housing/getBreadCrumbs',obj);
    }
    searchBaseImageForLocation(agyLocId) {           
        return this.http.get('housing/findBaseImageArch?agyLocId='+agyLocId);
    }
    populateBedInfoForSelectedHotSpot(obj){ 
        return this.http.post('housing/populateBedInfoForSelectedHotSpot',obj);
    }
    populateDataForFloorPlan(obj){
        return this.http.post('housing/populateDataForFloorPlan',obj);
    }
    
    isEverParentNode(internalLocationId) {
        return this.http.get('housing/isEverParentNode?internalLocationId='+internalLocationId);
    }

    updateHotSpotDetails(obj){
        return this.http.post('housing/updateHotSpotDetails',obj);
    }
}