import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OlisetService {
   constructor(private http: HttpService) {}
   /** This is description of the rleInarcExecuteQuery function*/
  
   /** This is description of the rleInarcCommit function*/
   getNextImageId() {
       return this.http.get('oiuimage/getNextImageId');
   }
   
   loginLabelExecuteQuery(obj) {
       return this.http.post('oliset/labelExecuteQuery', obj);
    }
   headerLabelExecuteQuery(obj) {
       return this.http.post('oliset/headerLabelExecuteQuery', obj);
   }
   
   updateSystemlabel(obj){
       return this.http.post('oliset/updateSystemlabel', obj);
   }
//   oiuimage/imagesCommit
   insertContainerImg(obj){
       return this.http.post('oumsylab/imagesCommit', obj);
       }
   imagesExecuteQuery(obj) {
       return this.http.post('oumsylab/imagesExecuteQuery', obj);
   }
   
   inactiveImage(obj){
       return this.http.get('/oumsylab/inactiveImage', obj);
   }
  
}
