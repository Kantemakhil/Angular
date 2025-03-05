
import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OimrouteService {
   constructor(private http: HttpService) { }

   getrouteExecuteQuery() {
      return this.http.get('oimroute/routesExecuteQuery');
   }
   routesCommit(obj) {
      return this.http.post('oimroute/routesCommit',obj);
   }
   getroutestopdetailsExecuteQuery(routeName){
      return this.http.post('oimroute/routeStopDetailsExecuteQuery',routeName);
   }
   routestopdetailsCommit(obj) {
		return this.http.post('oimroute/routeStopDetailsCommit',obj);
	}
   getfeeddetailsExecuteQuery(obj){
      return this.http.post('oimroute/agyLocFeedDetailsExecuteQuery',obj);
   }
   getAgyLocDesc(obj){
      return this.http.post('oimroute/getAgyLocDesc',obj);
   }

}