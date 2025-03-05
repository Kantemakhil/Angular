import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({providedIn: 'root'})
export class DynamicCompLoaderService {
    moduleName : any;
   constructor(private http: HttpService) { }
   
}
