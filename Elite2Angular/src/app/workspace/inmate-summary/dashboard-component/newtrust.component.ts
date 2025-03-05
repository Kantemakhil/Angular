import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
@Component({
  
  templateUrl: './newtrust.component.html',
  providers: [],
    selector: 'newtrustComponent'
})
export class NewtrustComponent implements OnInit {

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

}