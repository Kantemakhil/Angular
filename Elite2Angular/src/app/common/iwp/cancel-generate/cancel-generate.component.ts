import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { TranslateService } from "../../translate/translate.service";
import { RedirectUtil } from "../../../core/classes/redirectUtil";

@Component({
  selector: 'app-cancel-generate',
  templateUrl: './cancel-generate.component.html',
  styleUrls: ['./cancel-generate.component.css']
})
export class CancelGenerateComponent implements OnInit {

  constructor( public translateService: TranslateService, private redirectUtil: RedirectUtil) { }
  @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
  ngOnInit() {
  }
  
  yes()
  {
      this.dialog.close("Y");
  }
  
  no()
  {
      this.dialog.close("N"); 
  }

}
