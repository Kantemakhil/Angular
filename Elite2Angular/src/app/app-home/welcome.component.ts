import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';

@Component({
  selector: 'app-welcome',
  template: `
<div fxLayout fxLayout.xs="column">
  <div fxFlex="100%" fxFlex.xs="fixed" fxLayout="row">
  <div fxFlex="25%" class="pp">
<h3>{{translate.loginTranslate('home.welcome-msg')}} Syscon {{translate.loginTranslate('common.syscon.version')}}</h3> </div>
 <div fxFlex="75%" class="pp">
    </div>`
})
export class WelcomeComponent implements OnInit {
  constructor(public translate: TranslateService) { }
  ngOnInit() {
  }
}
