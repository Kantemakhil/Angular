import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OcurwarnService {
    constructor(private http: HttpService) { }
}
