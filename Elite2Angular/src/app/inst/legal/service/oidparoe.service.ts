import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class OidparoeService {
	
	constructor(private http: HttpService) { }
	
	
	deepEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = this.isObject(val1) && this.isObject(val2);
            if (
                areObjects && !this.deepEqual(val1, val2) ||
                !areObjects && val1 !== val2
            ) {
                return false;
            }
        }
        return true;
    }
    
 	isObject(object) {
        return object != null && typeof object === 'object';
    }
    
	 isGridDataModified(initialData,CurrentData) {
        if (CurrentData.length !== initialData.length) {
          return true;
        }
        for (let i = 0; i < initialData.length; i++) {
          if (!this.deepEqual(initialData[i], CurrentData[i])) {
            return true;
          }
        }
        return false;
    }
	
	getEventData(offenderBookId) {
    	return this.http.get('parol/event?offender_book_id='+offenderBookId);
  	}
  	
  	getAdjustmentData(offernderBookId,objectId,objectType){
		return this.http.get('parol/event/adjusment?offender_book_id='+offernderBookId +'&object_id='+objectId+'&object_type='+objectType);
	}
		
	paroleEventCommit(commitModel){
		return this.http.post('parol/events',commitModel);
	}	
	
	getAllExistingAdjustment(offenderBookId){
		return this.http.get('parole/adjustments?offender_book_id='+offenderBookId);
	}
	
}