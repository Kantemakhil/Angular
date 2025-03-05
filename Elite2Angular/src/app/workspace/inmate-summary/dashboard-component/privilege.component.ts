import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
@Component({
  
  templateUrl: './privilege.component.html',
  providers: [],
    selector: 'privilegeComponent'
})
export class PrivilegeComponent implements OnInit {

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

}