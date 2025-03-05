import {Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
@Component({
  selector: 'app-warndialog',
  templateUrl: './warndialog.component.html'
})
export class WarndialogComponent implements OnInit {
    @ViewChild('dialog',{static: true}) dialog: DialogComponent;
    sealMark:string;
    incidentDetailsDisable:boolean;
    message:string;
    ContinerName:string;
  constructor(public translateService: TranslateService) { }

  ngOnInit() {
     this.ContinerName=this.dialog.data.contdes;
     if(this.dialog.data.message){
      this.message=this.dialog.data.message;
     }else{
       this.message= "container is sealed and your activity will break the seal of container. Do you want to continue the process?";

     }
  }
  yes(){
      this.dialog.close("Yes");
  }
  
  no(){
      this.dialog.close("No");
  }
  
}
