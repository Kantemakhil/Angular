import {  Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from "@common/translate/translate.service";
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
  selector: 'app-osuoicus',
  templateUrl: './osuoicus.component.html',
  styleUrls: ['./osuoicus.component.css']
})
export class OsuoicusComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    hearingclm:any[];
    resultClm :any[];
    penaltiesClm :any[];
  constructor(public translateService: TranslateService,private dialogService:DialogService ) { }

  ngOnInit() {
      this.hearingclm = [
                                     {
                                         fieldName: this.translateService.translate('Hearing Type') + '*', field: 'offenderIdDisplay',
                                         editable: true,  width: 150, filter: 'text', datatype: 'lov'
                                     },
                                     {
                                         fieldName:this.translateService.translate('Hearing Date'), field: 'button', datatype: 'date',
                                         editable: true, width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: '70%',
                                        
                                     },
                                     {
                                         fieldName: this.translateService.translate('Time'), field: 'lname',
                                         editable: false, width: 150, datatype: 'time'
                                     },
                                     {
                                         fieldName: this.translateService.translate('Location'), field: 'fname',
                                         editable: false, width: 150, datatype: 'text'
                                     },
                                     {
                                         fieldName: this.translateService.translate('Heard By') + '*', field: 'incidentRole',
                                         editable: true, width: 150, datatype: 'text', domain: 'INC_OFF_PAR', optionWidth: 500,
                                         
                                     },
                                     {
                                         fieldName: this.translateService.translate('Other Representatives') + '*', field: 'actionCode',
                                         editable: true, width: 150, datatype: 'text', domain: 'INC_DECISION', optionWidth: 500,
                                        
                                     },
                                     {
                                         fieldName: this.translateService.translate('Comments'), field: 'partyAddedDate',
                                         editable: false, width: 150, datatype: 'comment-text'
                                     },
                                 ];
      this.resultClm = [
                                     {
                                         fieldName: this.translateService.translate('charge') + '*', field: 'offenderIdDisplay',
                                         editable: true,  width: 150, filter: 'text', datatype: 'text'
                                     },
                                     {
                                         fieldName: this.translateService.translate('Type') , field: 'button', datatype: 'text',
                                         editable: true, width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: '70%',
                                        
                                     },
                                     {
                                         fieldName: this.translateService.translate('Charge Description'), field: 'lname',
                                         editable: false, width: 150, datatype: 'lov'
                                     },
                                     {
                                         fieldName: this.translateService.translate('category'), field: 'fname',
                                         editable: false, width: 150, datatype: 'text'
                                     },
                                     {
                                         fieldName: this.translateService.translate('Plea') + '*', field: 'incidentRole',
                                         editable: true, width: 150, datatype: 'text', domain: 'INC_OFF_PAR', optionWidth: 500,
                                         
                                     },
                                     {
                                         fieldName: this.translateService.translate('Finding') + '*', field: 'actionCode',
                                         editable: true, width: 150, datatype: 'text', domain: 'INC_DECISION', optionWidth: 500,
                                        
                                     },
                                     {
                                         fieldName: this.translateService.translate('Appeal'), field: 'partyAddedDate',
                                         editable: false, width: 150, datatype: 'text'
                                     },
                                 ];
      this.penaltiesClm = [
                                     {
                                         fieldName: this.translateService.translate('Line') + '*', field: 'offenderIdDisplay',
                                         editable: true,  width: 150, filter: 'text', datatype: 'text'
                                     },
                                     {
                                         fieldName: this.translateService.translate('Type'), field: 'button', datatype: 'lov', link: '/oiinamesdialog',
                                         editable: true, width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: '70%',
                                         
                                     },
                                     {
                                         fieldName: this.translateService.translate('months'), field: 'lname',
                                         editable: false, width: 150, datatype: 'number'
                                     },
                                     {
                                         fieldName: this.translateService.translate('Day'), field: 'fname',
                                         editable: false, width: 150, datatype: 'number'
                                     },
                                     {
                                         fieldName: this.translateService.translate('Effective Date') + '*', field: 'incidentRole',
                                         editable: true, width: 150, datatype: 'date', domain: 'INC_OFF_PAR', optionWidth: 500,
                                         
                                     },
                                     {
                                         fieldName: this.translateService.translate('Consecutive to') + '*', field: 'actionCode',
                                         editable: true, width: 150, datatype: 'text', domain: 'INC_DECISION', optionWidth: 500,
                                        
                                     },
                                     {
                                         fieldName: this.translateService.translate('OIC#'), field: 'partyAddedDate',
                                         editable: false, width: 150, datatype: 'text'
                                     },
                                     {
                                         fieldName: this.translateService.translate('Status'), field: 'oicIncidentId',
                                         editable: false, width: 150, datatype: 'text'
                                     },
                                     {
                                         fieldName: this.translateService.translate('Status Date'), field: 'commentText',
                                         editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 400,
                                         
                                     },
                                 ];
  }
  clear(){
      this.dialog.close(true);
  }
}
