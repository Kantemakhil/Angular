import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumsyslabService {
   constructor(private http: HttpService) {}
   /** This is description of the rleInarcExecuteQuery function*/
   rleInarcExecuteQuery(obj) {
      return this.http.post('oumsylab/rleInarcExecuteQuery', obj);
   }
   /** This is description of the rleInarcCommit function*/
  
   
   labelExecuteQuery(obj) {
       return this.http.post('oumsylab/labelExecuteQuery', obj);
    }
   updateSystemlabel(obj){
       return this.http.post('oumsylab/updateSystemlabel', obj);
   }
   
   setSystemLables(){
       return this.http.get('/oumsylab/setSystemLables'); 
   }
   
   setSystemProfilesIntoSystemLables(){
       return this.http.get('/oumsylab/setSystemProfilesLables');
   }
   
   countOfLabel(){
       return this.http.get('/oumsylab/countOfLabel'); 
   }
   
   countOfProfile(){
       return this.http.get('/oumsylab/countOfProfile'); 
   }

   labelCacheUpdate(){
    return this.http.get('/updateLabelCache'); 
   }
  
}
