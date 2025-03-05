import {Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';

@Component({
  selector: 'app-oidincdepopup',
  templateUrl: './oidincdepopup.component.html',
  styleUrls: ['./oidincdepopup.component.css']
})
export class OidincdepopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    aincidentDetails:string;
    incidentDetailsDisable:boolean;
  constructor(public translateService: TranslateService) { }

  ngOnInit() {
      
   }
   appendDetail(){
       this.dialog.close(this.aincidentDetails);
   }
   
   exit(){
       this.dialog.close("Y");
   }

}
