import {
            Component, OnInit,
            ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcumultiService } from '../service/ocumulti.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderAllSchedules } from '@instschedulebeans/VOffenderAllSchedules';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
            selector: 'app-ocumulti',
            templateUrl: './ocumulti.component.html'
})

export class OcumultiComponent implements OnInit {
            // Variable declaration
            @ViewChild('dialog', { static: true }) dialog: DialogComponent;
            actionName: string;
            lovModel: any[];
            msgs: any[] = [];
            nameOfLovPage: string;
            listToCompare: any[] = [];
            offblockData: VOffenderAllSchedules[] = [];
            offblockDataTemp: VOffenderAllSchedules[] = [];
            // TODO angular.copy(this.offblockData, thisoffblockDataTemp);
            offblockModel: VOffenderAllSchedules = new VOffenderAllSchedules();
            offblockIndex: 0;
            offblockInsertList: VOffenderAllSchedules[] = [];
            offblockUpdatetList: VOffenderAllSchedules[] = [];
            offblockDeleteList: VOffenderAllSchedules[] = [];
            minDate: Date;
            display: boolean;
            errorMessage: string;
            headerMessage: string;
            disabled: boolean;
            editable: true;
            offBlockColumnDef: any[];
            offBlockReadOnly = false;
            ctrlBlockReadOnly = false;
            rgynflagRg: any[] = [];
            tableIndex: number;
            offblockCommitModel: any;
            type: string;
            message: string;
            msglist: any[];
            select: any;
            constructor(private ocumultiFactory: OcumultiService, public translateService: TranslateService, public sessionManager:
                        UserSessionManager) {
                        // TODO initilize data members here..!
                        this.offBlockColumnDef = [];
            }
            ngOnInit() {
                        this.offBlockColumnDef = [
               { fieldName: this.translateService.translate('common.date'), field: 'eventDate', editable: false, width: 150, datatype: 'date' },
               {
                           fieldName: this.translateService.translate('common.startTime'), field: 'startTime', editable: false, width: 150,
                           datatype: 'time'
               },
               {
                           fieldName: this.translateService.translate('common.endTime'), field: 'endTime', editable: false, width: 150,
                           datatype: 'time'
               },
               { fieldName: this.translateService.translate('common.location'), field: 'toLocDesc', editable: false, width: 150 },
               { fieldName: this.translateService.translate('common.scheduletype'), field: 'eventTypeDesc', editable: false, width: 150 },
               { fieldName: this.translateService.translate('ocumulti.schedulesubtype'), field: 'eventSubTypeDesc', editable: false, width: 150 },
               { fieldName: this.translateService.translate('ocumulti.outcome'), field: 'eventOutcome', editable: false, width: 150 },
               {
                           fieldName: this.translateService.translate('ocumulti.counted'), field: 'count', editable: false, width: 150,
                           datatype: 'checkbox'
               },
                        ];
                        this.select = 'No';
                        // TODO all initializations here
                        this.offblockExecuteQuery();
            }
            Insert = () => { // TODO implement on grid insert 
            }
            validateRow = (event) => {
                        const rowdata = new ValidateRowReturn();
                        return rowdata;
            }     /** 
     * This function displays the messages
     */
            show() {
                        this.msglist = [];
                        this.msglist.push({ message: this.message, type: this.type });
                        this.msgs = [...this.msglist];
            }
            onRowClickoffblock(event) {
            }
            ok() {
            }
            no() {
            }
            cancel() {
            }
            onButExitclick() {
                        this.dialog.close(null);
            }
          
            offblockExecuteQuery() {
                        this.offblockModel.eventDate = DateFormat.getDate(this.dialog.data.eventDate);
                        this.offblockModel.eventId = this.dialog.data.eventId;
                        this.offblockModel.offenderBookId = this.dialog.data.offenderBookId;
                        this.offblockModel.eventOutcome = this.dialog.data.eventOutcome;

                        const offblockResult = this.ocumultiFactory.
               offBlockExecuteQuery(this.offblockModel);
                        offblockResult.subscribe(data => {
               if (data.length === 0) {
                           this.offblockData = [];
                           if (this.offblockData.length === 0) {
                                       this.type = 'warn';
                                       this.message = this.translateService.translate('common.querycaused');
                                       this.show();
                                       return;
                           }
               } else {
                           data.forEach(elemnt => {
                                       elemnt.count = elemnt.unexcusedAbsenceFlag === 'Y' ? true : false;
                                       this.offblockData = data;
                                       this.offblockModel = data[0];
                                       this.tableIndex = 0;
                           })
               }
                        });
            }


            onSave() {
                        if (this.select && this.select === 'Yes') {
               this.dialog.close('TRUE');
                        } else {
               this.dialog.close('FALSE');
                        }
            }

            /**
             *  This function will be executed when commit event is
            * fired
            */
            /* ocumultiSaveoffblockForm(event) {
 
 
 
               // TODO declare commit bean and add insert list to that object.
               this.offblockInsertList = event.added;
               this.offblockUpdatetList = event.updated;
               this.offblockDeleteList = event.removed;
               this.offblockCommitModel.insertList = [];
               this.offblockCommitModel.updateList = [];
               this.offblockCommitModel.deleteList = [];
               if (this.offblockInsertList.length > 0) {
                          for (let i = 0; i < this.offblockInsertList.length; i++) {
                this.offblockCommitModel.insertList = this.offblockInsertList;
                          }
                          for (let i = 0; i < this.offblockUpdatetList.length; i++) {
 
                          }
 
                          this.offblockCommitModel.updateList = this.offblockUpdatetList;
               }
               if (this.offblockDeleteList.length > 0) {
                          for (let i = 0; i < this.offblockDeleteList.length; i++) {
                          }
                          this.offblockCommitModel.deleteList = this.offblockDeleteList;
               }
               const offblockSaveData = this.ocumultiFactory.offBlockCommit(this.offblockCommitModel);
               offblockSaveData.subscribe(data => {
                          if (data === 1) {
                this.type = 'info';
                this.message = 'Add/ Update/ Remove record sucess';
                this.show();
                          } else {
                this.type = 'warn';
                this.message = 'Add/ Update/ Remove record Failed';
                this.show();
                          }
               }); 
 
            } */


}
