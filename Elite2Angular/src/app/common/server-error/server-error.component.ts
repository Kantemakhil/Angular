import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';

@Component({
  selector: 'server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {

  msg = 'Server is down. Please close the tab/browser and open in new tab/browser again. if still not working then contact administrator.';

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    sessionStorage.removeItem('504');
    let configureMsg = sessionStorage.getItem('langmsgs');
    if(configureMsg && JSON.parse(configureMsg).msgs['common.504.msg']){
       this.msg = JSON.parse(configureMsg).msgs['common.504.msg'];
    }
  }

 

}
