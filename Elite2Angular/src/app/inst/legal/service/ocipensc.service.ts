import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class OcipenscService {
  constructor(private http: HttpService) { }

  loadData(data) {
    return this.http.post('ocipensc/getPendingSentenceCalcEvents', data);
  }
}
