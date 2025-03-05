import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { MenuSecurities } from '../../../sa/admin/beans/MenuSecurities';

@Injectable()
export class MenuService {

    selectedMenuLink: MenuSecurities = new MenuSecurities();

    constructor(private http: HttpService) {
    }
}
