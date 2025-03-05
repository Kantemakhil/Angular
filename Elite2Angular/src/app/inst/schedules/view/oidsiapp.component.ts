import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VOffenderAllSchedules } from '@instschedulebeans/VOffenderAllSchedules';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Offenders } from '@commonbeans/Offenders';
import { OidsiappService } from '@inst/schedules/service/oidsiapp.service';
import { VOffenderAllSchedulesCommitBean } from '@instschedulebeans/VOffenderAllSchedulesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';

@Component({
selector: 'app-oidsiapp',
templateUrl: './oidsiapp.component.html'
})

export class OidsiappComponent implements OnInit {
msgs: any[] = [];
offschData: VOffenderAllSchedules [] = [];
offschDataTemp: VOffenderAllSchedules[] = [];
offschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
voffschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
offschIndex = 0;
offschInsertList: VOffenderAllSchedules[] = [];
offschUpdateList: VOffenderAllSchedules[] = [];
offschDeleteList: VOffenderAllSchedules[] = [];
minDate: Date;
display: boolean;
errorMessage: string;
headerMessage: string;
disabled: boolean;
editable = true;
offBlkColumnDef: any[];
offSchColumnDef: any[];
ctlSearchReadOnly = false;
offSchReadOnly = false;
intMoveCtrlReadOnly = false;
offBlkReadOnly = false;
titleBlockReadOnly = false;
rginternalmovelocationsRg: any[] = [];
rgschinternalscheduleRg: any[] = [];
vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
offenderObj: Offenders = new Offenders();
offschCommitModel: VOffenderAllSchedulesCommitBean = new VOffenderAllSchedulesCommitBean();
agyLocId = null;
tableIndex: any;
@ViewChild('grid', {static: true}) grid: any;
conflictFlag = false;
addFlag = false;
datesFlag = false;
dateTimeFlag = false;
eventId: number;
editableFlag: boolean;
intLocIdMap: Map<string, number> = new Map<string, number>();
lovTitles = {
   'internalScheduleType': this.translateService.translate('common.description'),
   'code': this.translateService.translate('oidsiapp.reasoncode'),
};
constructor(private oidsiappFactory: OidsiappService, public translateService: TranslateService,
   private offenderSearchService: OffenderSearchService, public dialogService: DialogService) {
this.offBlkColumnDef = [];
this.offSchColumnDef = [];

}
ngOnInit() {
   this.vHeaderBlockModel = new VHeaderBlock();
   this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
   this.editableFlag = false;
   if (this.vHeaderBlockModel && this.vHeaderBlockModel.agyLocId) {
       this.agyLocId = this.vHeaderBlockModel.agyLocId;
   }
   if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
       this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
   }

    if (this.vHeaderBlockModel) {
       this.offschExecuteQuery();
   }
this.offBlkColumnDef = [
   { fieldName: '', field: 'butOffenderIdDisplay', editable: false, width: 150},
   { fieldName: 'Schedule&#10;Time', field: 'startTime', editable: false, width: 150},
   { fieldName: '', field: 'butEventSubType', editable: false, width: 150},
   { fieldName: 'To Internal&#10;Location*', field: 'toInternalLocationDesc', editable: false, width: 150},
   { fieldName: '', field: 'offenderFirstName', editable: false, width: 150},
   { fieldName: '', field: 'butEventType', editable: false, width: 150},
   { fieldName: 'Housing &#10;Location', field: 'livingUnitDesc', editable: false, width: 150},
   { fieldName: '', field: 'offenderIdDisplay', editable: false, width: 150},
   { fieldName: 'Internal &#10;Location', field: 'agencyImlDesc', editable: false, width: 150},
   { fieldName: '', field: 'offenderLastName', editable: false, width: 150},
   { fieldName: 'Schedule&#10;Type', field: 'eventTypeDesc', editable: false, width: 150},
   { fieldName: 'Confirm', field: 'confirm', editable: false, width: 150},
   { fieldName: 'Schedule &#10;Reason', field: 'eventSubTypeDesc', editable: false, width: 150},
   { fieldName: '', field: 'butToInternalLocation', editable: false, width: 150},
];
this.offSchColumnDef = [
      {
           fieldName: this.translateService.translate('oidsiapp.date'), field: 'eventDate', editable: true, width: 150,
           datatype: 'date', maxlength: 10, cellEditable: this.canEventDateEdit
       },
       {
           fieldName: this.translateService.translate('oidsiapp.time'), field: 'startTime',
           editable: true, width: 150, datatype: 'time', required: true, maxlength: 5, cellEditable: this.canEventDateEdit
       },
       {
           fieldName: this.translateService.translate('oidsiapp.schedulereason'), field: 'eventSubType', editable: true, width: 300,
           datatype: 'lov', required: true, link: 'oidsiapp/rgSchInternalScheduleRecordGroup', maxlength: 40, titles:this.lovTitles,
            cellEditable: this.canEventDateEdit,source:'OIMISREA' , 
       },
       {
           fieldName: this.translateService.translate('oidsiapp.location'), field: 'toIntLocLevel1Code', editable: true, width: 300,
           datatype: 'lov', required: true, link: 'oidsiapp/rgInternalMoveLocationsRecordGroup?agyLocId=' + this.agyLocId,
           maxlength: 40,  cellEditable: this.canEventDateEdit,source:'OIMULOCA'
       },

       {
           fieldName: this.translateService.translate('oidsiapp.comment'), field: 'commentText', width: 320,
           editable: true, maxlength:3600,  datatype: 'text', cellEditable: this.canEventDateEdit,  uppercase: 'false'
       },

    {
        fieldName: this.translateService.translate('oidsiapp.cancelflag'), field: 'cancelFlag', editable: false, width: 150,
        datatype: 'checkbox',cellEditable: this.canActiveEdit
    },
    {
        fieldName: this.translateService.translate('oidsiapp.cancelreason'), field: 'eventOutcome', editable: false, width: 150,
        datatype: 'lov', domain: 'APT_CAN_REA',cellEditable: this.outcomeEdit
    },
];
const rginternalmovelocationsServiceObj = this.oidsiappFactory.
                   rgInternalMoveLocationsRecordGroup(this.agyLocId);
rginternalmovelocationsServiceObj.subscribe(rginternalmovelocationsList => {
       if (rginternalmovelocationsList.length === 0) {
            this.rginternalmovelocationsRg = [];
        } else {
       for (let i = 0; i < rginternalmovelocationsList.length; i++) {
           this.intLocIdMap.set(rginternalmovelocationsList[i].code, rginternalmovelocationsList[i].internalLocationId);
       this.rginternalmovelocationsRg.push({ 'text': rginternalmovelocationsList[i].code + ' - ' +
                       rginternalmovelocationsList[i].description, 'id': rginternalmovelocationsList[i].code });
   }
   }
});
const rgschinternalscheduleServiceObj = this.oidsiappFactory.
                   rgSchInternalScheduleRecordGroup();
rgschinternalscheduleServiceObj.subscribe(rgschinternalscheduleList => {
       if (rgschinternalscheduleList.length === 0) {
            this.rgschinternalscheduleRg = [];
        } else {
       for (let i = 0; i < rgschinternalscheduleList.length; i++) {
       this.rgschinternalscheduleRg.push({ 'text': rgschinternalscheduleList[i].code + ' - ' +
                       rgschinternalscheduleList[i].description, 'id': rgschinternalscheduleList[i].code });
   }
   }
});
}

    canActiveEdit = (data: any, index: number, field: string): boolean => {
        if (data.eventId) {
            return true;
        } else {
            return false;
        }
    }

    outcomeEdit = (data: any, index: number, field: string): boolean => {
        if (data.eventId && data.cancelFlag) {
            return true;
        } else {
            return false;
        }
    }


canEventDateEdit = (data: any, index: number, field: string): boolean => {
    if (field === 'eventSubType') {

        if (this.datesFlag) {
            this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
            return false;
        } else if (this.dateTimeFlag) {
            this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
            return false;
        }
       
        if (this.conflictFlag) {
            if (!this.editableFlag) {
                this.editableFlag = true;
                this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                    if (!result) {
                        this.editableFlag = false;
                        this.conflictFlag = true;
                        return false;
                    } else {
                        this.editableFlag = false;
                        this.conflictFlag = false;
                       data.toIntLocLevel1Code = undefined;
                        return true;
                    }
                });
            } else {
                return false;
            }
        } else {
           //data.toIntLocLevel1Code = undefined;
            return true;
        }
    }  else if (field === 'commentText') {

        if (this.datesFlag) {
            this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
            return false;
        } else if (this.dateTimeFlag) {
            this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
            return false;
        }
         if (this.conflictFlag) {
             if ( !this.editableFlag ) {
            this.editableFlag = true;
            this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                if (!result) {
                     this.editableFlag = false;
                    this.conflictFlag = true;
                    return false;
                } else {
                     this.editableFlag = false;
                    this.conflictFlag = false;
                    return true;
                }
            });
             } else {
                  return false;
                 }
        } else {
            return true;
        }
    } else if (field === 'toIntLocLevel1Code') {
        if (this.datesFlag) {
            this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
            return false;
        } else if (this.dateTimeFlag) {
            this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
            return false;
        }
        if (this.conflictFlag) {
            if ( !this.editableFlag ) {
            this.editableFlag = true;
            this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                if (!result) {
                     this.editableFlag = false;
                    this.conflictFlag = true;
                    return false;
                } else {
                     this.editableFlag = false;
                    this.conflictFlag = false;
                    if (this.rginternalmovelocationsRg.length === 0) {
                        this.show(this.translateService.translate('oidsiapp.listofvalues'), 'warn');
                        return false;
                    }
                    return true;
                }
            });
        } else {
                   return false;
                }
           } else {
            if (this.rginternalmovelocationsRg.length === 0) {
                this.show(this.translateService.translate('oidsiapp.listofvalues'), 'warn');
                return false;
            }
            return true;
        }

    } else if (field === 'startTime') {
        if (this.datesFlag) {
            this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
            return false;
        }
     if (this.conflictFlag) {
            if ( !this.editableFlag ) {
            this.editableFlag = true;
            this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                     this.editableFlag = false;
                    return false;
                } else {
                     this.editableFlag = false;
                    this.conflictFlag = false;
                    return true;
                }
            });
        } else {
                return false;
                }
         } else {
            return true;
        }

    } else if (field === 'eventDate') {

        if (this.offschIndex !== this.offschData.indexOf(data)) {
            if (this.datesFlag) {
                this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
                return false;
            } else if (this.dateTimeFlag) {
                this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
                return false;
            }

            if (this.conflictFlag) {
                this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                    if (!result) {
                        this.conflictFlag = true;
                        return false;
                    } else {
                        this.conflictFlag = false;
                        return true;
                    }
                });
            } else {
                return true;
            }

        } else {
            if (this.dateTimeFlag) {
                this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
                return false;
            }
            return true;

        }
    }
   return false;
}

rgInternalMoveLocationsRecordGroup () {
 this.rginternalmovelocationsRg = [];
const rginternalmovelocationsServiceObj = this.oidsiappFactory.
                   rgInternalMoveLocationsRecordGroup(this.agyLocId);
rginternalmovelocationsServiceObj.subscribe(rginternalmovelocationsList => {
       if (rginternalmovelocationsList.length === 0) {
            this.rginternalmovelocationsRg = [];
        } else {
       for (let i = 0; i < rginternalmovelocationsList.length; i++) {
           if ( rginternalmovelocationsList[i].canDisplay ) {
       this.rginternalmovelocationsRg.push({ 'text': rginternalmovelocationsList[i].code + ' - ' +
                       rginternalmovelocationsList[i].description, 'id': rginternalmovelocationsList[i].code });
               }
   }
   }
});
}

updateOffenderSchValidator = (event) => {
   const rowIndex = event.rowIndex;
   const rowdata = new ValidateRowReturn();
    if (this.datesFlag && this.offschIndex !== rowIndex) {
       this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
        rowdata.data = {
              eventDate: event.data.eventDate, 
                  startTime: event.data.startTime,
                  eventSubType: event.data.eventSubType, toIntLocLevel1Code: event.data.toIntLocLevel1Code,
                  commentText: event.data.commentText
           };
           rowdata.validated = true;
           return rowdata;
   } else if (this.dateTimeFlag && this.offschIndex !== rowIndex) {
       this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
      rowdata.data = {
              eventDate: event.data.eventDate, 
                  startTime: event.data.startTime,
                  eventSubType: event.data.eventSubType, toIntLocLevel1Code: event.data.toIntLocLevel1Code,
                  commentText: event.data.commentText
           };
           rowdata.validated = true;
           return rowdata;
   }
   if ( event.field === 'eventDate' ) {
   if ( event.data.eventDate) {
           if ( DateFormat.compareDate( DateFormat.getDate(event.data.eventDate), DateFormat.getDate()) < 0) {
           this.datesFlag = true;
           this.offschIndex = rowIndex;
           this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
           rowdata.data = {
              eventDate: event.data.eventDate, 
                  startTime: event.data.startTime,
                  eventSubType: event.data.eventSubType, toIntLocLevel1Code: event.data.toIntLocLevel1Code,
                  commentText: event.data.commentText
           };
           rowdata.validated = true;
           return rowdata;
       }

       if (!event.data.eventId ||
            DateFormat.compareDate(DateFormat.getDate(event.oldValue), DateFormat.getDate(event.newValue)) !== 0 ) {
       this.voffschModel = new VOffenderAllSchedules();
       this.offschIndex = this.offschData.indexOf(event.data);
       this.voffschModel.eventDate = event.data.eventDate;
       this.voffschModel.offenderBookId = event.data.offenderBookId;
            const offschCheckConflit = this.oidsiappFactory.checkScheduleConflict(this.voffschModel);
                       offschCheckConflit.subscribe(checkConflict => {
                           if (checkConflict > 0) {
                               this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                                   if (!result) {
                                       this.conflictFlag = true;
                                       return false;
                                   } else {
                                       this.conflictFlag = false;
                                   }
                               });
                           } else {
                               this.conflictFlag = false;
                               }
                       });
           }
   }
}
   if (event.field === 'startTime' ) {  
       if (event.data.eventDate && event.data.startTime) {
           if ( DateFormat.compareDate( DateFormat.getDate(event.data.eventDate), DateFormat.getDate()) < 0) {
                 this.datesFlag = true;
              this.offschIndex = this.offschData.indexOf(event.data);
               this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
               }
           //     else if ( DateFormat.compareDate( DateFormat.getDate(event.data.eventDate), DateFormat.getDate()) === 0)  {
           //         const schTime = DateFormat.getDate(DateFormat.getDate(event.data.startTime).setSeconds(0, 0));
           //         const currentTime =  DateFormat.getDate(DateFormat.getDate(DateFormat.getDate()).setSeconds(0, 0));
           //     if ( DateFormat.compareTime(schTime, currentTime) < 0 ) {
           //      this.dateTimeFlag = true;
           //       this.offschIndex = this.offschData.indexOf(event);
           //     this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
           // }
           //     }
              rowdata.data = {
                  eventDate: event.data.eventDate, 
                  startTime: event.data.startTime, eventSubType: event.data.eventSubType,
                   toIntLocLevel1Code: event.data.toIntLocLevel1Code,
                  commentText: event.data.commentText
               };
               rowdata.validated = true;
              return rowdata;
       }
     }

     if ( event.field === 'eventSubType' ) {
        if (event.oldValue !== event.newValue) {
                      event.toIntLocLevel1Code = undefined;
     
     rowdata.data = {
        eventDate: event.data.eventDate, 
        startTime: event.data.startTime, eventSubType: event.data.eventSubType,
         toIntLocLevel1Code: undefined,
        commentText: event.data.commentText
     };
    }
     rowdata.validated = true;
    return rowdata;
    }

    if (event.oldValue !== event.newValue) {
       rowdata.data = {
           eventDate: event.data.eventDate, 
                  startTime: event.data.startTime, eventSubType: event.data.eventSubType,
                   toIntLocLevel1Code: event.data.toIntLocLevel1Code,
                  commentText: event.data.commentText
       };
       rowdata.validated = true;
       this.dateTimeFlag = false;
       this.datesFlag = false;
       return rowdata;
}

}

onGridReady = () => {
   if (this.datesFlag) {
       this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
       return false;
   } else if (this.dateTimeFlag) {
       this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
       return false;
   }
    if (this.vHeaderBlockModel.statusDisplay == 'Inactive') {
        this.show(this.translateService.translate('oidsiapp.inactiveoffenderscannotbeassignedtointernalappointment'), 'warn');
        return;
    }
   if (this.conflictFlag) {
       this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
           if (!result) {
               this.conflictFlag = true;
               return false;
           } else {
               this.conflictFlag = false;

               for (let i = 0; i < this.offschData.length; i++) {
                   if (!this.offschData[i].eventDate) {
                       this.show(this.translateService.translate('oidsiapp.scheduledate'), 'warn');
                       return false;
                   }
                   if (!this.offschData[i].startTime) {
                       this.show(this.translateService.translate('oidsiapp.schedulestarttime'), 'warn');
                       return false;
                   }
                   if (!this.offschData[i].eventSubType) {
                       this.show(this.translateService.translate('oidsiapp.schedulereasonrequired'), 'warn');
                       return false;
                   }
                   if (!this.offschData[i].toIntLocLevel1Code) {
                       this.show(this.translateService.translate('oidsiapp.schedulelocation'), 'warn');
                       return false;
                   }
               }

               return {
                   offenderBookId: this.vHeaderBlockModel.offenderBookId,
                   agyLocId: this.vHeaderBlockModel.agyLocId, offenderIdDisplay: this.vHeaderBlockModel.offenderIdDisplay
               };
           }
       });
   } else {
       for (let i = 0; i < this.offschData.length; i++) {
           if (!this.offschData[i].eventDate) {
               this.show(this.translateService.translate('oidsiapp.scheduledate'), 'warn');
               return false;
           }
           if (!this.offschData[i].startTime) {
               this.show(this.translateService.translate('oidsiapp.schedulestarttime'), 'warn');
               return false;
           }
           if (!this.offschData[i].eventSubType) {
               this.show(this.translateService.translate('oidsiapp.schedulereasonrequired'), 'warn');
               return false;
           }
           if (!this.offschData[i].toIntLocLevel1Code) {
               this.show(this.translateService.translate('oidsiapp.schedulelocation'), 'warn');
               return false;
           }
       }
       return {
           offenderBookId: this.vHeaderBlockModel.offenderBookId,
           agyLocId: this.vHeaderBlockModel.agyLocId, offenderIdDisplay: this.vHeaderBlockModel.offenderIdDisplay
       };
   }
}
offSchOnDeleteTrigger = () => {
    if ( this.offschModel.eventId ) {
   if (this.datesFlag) {
       this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
       return false;
   } else if (this.dateTimeFlag) {
       this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
       return false;
   }
   if (this.conflictFlag) {
         this.dialogService.openLinkDialog('/oiuscinq', this.offschModel).subscribe(result => {
             if (!result) {
                 this.conflictFlag = true;
                 return false;
             } else {
                 this.conflictFlag = false;
                 return true;
             }
         });
     } else {
   return true;
       }
        } else {
        this.conflictFlag = false;
        this.datesFlag = false;
        this.dateTimeFlag = false;
        return true;
        }
}

onRowClickoffsch(event) {
    if (event) {
          this.offschModel = event;
        if (event.cancelFlag) {
            this.grid.requiredOn('eventOutcome');
        } else {
            this.grid.requiredOff('eventOutcome')
            event.eventOutcome=undefined;
        }
        if (this.datesFlag) {
            this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
            return false;
        } else if (this.dateTimeFlag) {
            this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
            return false;
        }
        if (this.conflictFlag && this.offschData.indexOf(event) !== this.offschIndex) {
            this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                    return true;
                }
            });
        }
        if (!this.conflictFlag) {
            if (event) {
                this.offschModel = event;
                this.offschIndex = this.offschData.indexOf(event);
                return true;
            }
        }
       
            }
        return false;
}
show(vldmsg, type) {
   const msgval = [{ message: vldmsg, type: type }];
   this.msgs = [...msgval];
}
onOffenderChange(offender) {
       this.vHeaderBlockModel = offender;
       if (offender) {
           this.offschData=[]
           this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
           this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
           this.vHeaderBlockOffender = this.vHeaderBlockModel;
           this.editableFlag = false;
           if (this.vHeaderBlockModel.rootOffenderId) {
               this.agyLocId = this.vHeaderBlockModel.agyLocId;
               this.offSchColumnDef[3].link = 'oidsiapp/rgInternalMoveLocationsRecordGroup?agyLocId=' + this.agyLocId;
               this.grid.prepareAgColumnDef();
               this.rgInternalMoveLocationsRecordGroup();
               this.offschExecuteQuery();
               this.getLocations();
           }
       } else {
           this.offschData = [];
           this.addFlag = false;
           this.datesFlag = false;
           this.dateTimeFlag = false;
           this.editableFlag = false;
       }
}
offschExecuteQuery() {
   this.editableFlag = false;
   this.offschModel = new VOffenderAllSchedules();
   this.offschModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const offschResult = this.oidsiappFactory.offSchExecuteQuery(this.offschModel);
                offschResult.subscribe(offschResultList => {
               if (offschResultList.length === 0) {
                   this.offschData = [];
                    this.addFlag = true;
               } else {
                   for (let i = 0; i < offschResultList.length; i++) {
                       if (offschResultList[i].startTime) {
                           offschResultList[i].startTime = DateFormat.getDate(offschResultList[i].startTime);
                       }
                   }
                   this.offschData = offschResultList;
                   this.offschModel = offschResultList[0];
                   this.addFlag = true;
                   this.tableIndex = 0;
               }
           });
   }
/**
*  This function will be executed when commit event is
* fired
*/
oidsiappSaveoffschForm(event) {
   this.offschInsertList = event.added;
   this.offschUpdateList = event.updated;
   this.offschDeleteList = event.removed;
   this.offschCommitModel.insertList = [];
   this.offschCommitModel.updateList = [];
   this.offschCommitModel.deleteList = [];
   if (this.offschInsertList.length > 0) {
       for (let i = 0; i < this.offschInsertList.length; i++) {
           if (!this.offschInsertList[i].eventDate) {
               this.show(this.translateService.translate('oidsiapp.scheduledate'), 'warn');
               return false;
           }
           if (!this.offschInsertList[i].startTime) {
               this.show(this.translateService.translate('oidsiapp.schedulestarttime'), 'warn');
               return false;
           }
           if (!this.offschInsertList[i].eventSubType) {
               this.show(this.translateService.translate('oidsiapp.schedulereasonrequired'), 'warn');
               return false;
           }
           if (!this.offschInsertList[i].toIntLocLevel1Code) {
               this.show(this.translateService.translate('oidsiapp.schedulelocation'), 'warn');
               return false;
           }
           if (this.offschInsertList[i].toIntLocLevel1Code) {
               this.offschInsertList[i].toInternalLocationId = Number(this.offschInsertList[i].toIntLocLevel1Code);
           }
           this.offschInsertList[i].eventDate = DateFormat.getDate(this.offschInsertList[i].eventDate);

           if (DateFormat.compareDate(this.offschInsertList[i].eventDate, DateFormat.getDate()) < 0) {
               this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
               return false;
           } else if (DateFormat.compareDate(this.offschInsertList[i].eventDate, DateFormat.getDate()) === 0) {
               const schTime = DateFormat.getDate(DateFormat.getDate(this.offschInsertList[i].startTime).setSeconds(0, 0));
               const currentTime =  DateFormat.getDate(DateFormat.getDate(DateFormat.getDate()).setSeconds(0, 0));
               if (DateFormat.compareTime(schTime, currentTime)  < 0 ) {
                   this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
                   return false;
               }
           }

           this.offschInsertList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offschInsertList[i].startTime),
               this.offschInsertList[i].eventDate);

       }
       this.offschCommitModel.insertList = this.offschInsertList;
   }
   if (this.offschUpdateList.length > 0) {
       for (let i = 0; i < this.offschUpdateList.length; i++) {
           if (!this.offschUpdateList[i].eventDate) {
               this.show(this.translateService.translate('oidsiapp.scheduledate'), 'warn');
               return false;
           }
           if (!this.offschUpdateList[i].startTime) {
               this.show(this.translateService.translate('oidsiapp.schedulestarttime'), 'warn');
               return false;
           }
           if (!this.offschUpdateList[i].eventSubType) {
               this.show(this.translateService.translate('oidsiapp.schedulereasonrequired'), 'warn');
               return false;
           }
           if (!this.offschUpdateList[i].toIntLocLevel1Code) {
               this.show(this.translateService.translate('oidsiapp.schedulelocation'), 'warn');
               return false;
           }
           if (this.offschUpdateList[i].toIntLocLevel1Code) {
                this.offschUpdateList[i].toInternalLocationId = Number(this.offschUpdateList[i].toIntLocLevel1Code);
           }
           this.offschUpdateList[i].eventDate = DateFormat.getDate(this.offschUpdateList[i].eventDate);

           if (DateFormat.compareDate(this.offschUpdateList[i].eventDate, DateFormat.getDate()) < 0) {
               this.show(this.translateService.translate('oidsiapp.eventdatevalidation'), 'warn');
               return false;
           } else if (DateFormat.compareDate(this.offschUpdateList[i].eventDate, DateFormat.getDate()) === 0) {
               const schTime = DateFormat.getDate(DateFormat.getDate(this.offschUpdateList[i].startTime).setSeconds(0, 0));
               const currentTime =  DateFormat.getDate(DateFormat.getDate(DateFormat.getDate()).setSeconds(0, 0));
               if (DateFormat.compareTime(schTime, currentTime)  < 0) {
                   this.show(this.translateService.translate('oidsiapp.eventdatetime'), 'warn');
                   return false;
               }
           }

           this.offschUpdateList[i].startTime = TimeFormat.parse(TimeFormat.format(this.offschUpdateList[i].startTime),
               this.offschUpdateList[i].eventDate);

              

           if (this.offschUpdateList[i].cancelFlag) {
               if (!this.offschUpdateList[i].eventOutcome) {
                   this.show(this.translateService.translate('oidsiapp.cancelreasonmustbeentered'), 'warn');
                   return false;
               }
           }
           
            this.offschUpdateList[i].cancelFlag=(this.offschUpdateList[i].cancelFlag) ? 'Y' : 'N';  

       }
       this.offschCommitModel.updateList = this.offschUpdateList;
   }

   if (this.offschDeleteList.length > 0 && this.offschInsertList.length <= 0) {

       for (let i = 0; i < this.offschDeleteList.length; i++) {
       }
       this.offschCommitModel.deleteList = this.offschDeleteList;
   }
    if (this.conflictFlag) {
       this.dialogService.openLinkDialog('/oiuscinq', this.voffschModel).subscribe(result => {
           if (!result) {
               this.conflictFlag = true;
               return false;
           } else {
               this.conflictFlag = false;
                this.oidsiappNonAssociationCheck();
               }
           });
        } else {
       this.oidsiappNonAssociationCheck();
        }
}

    oidsiappNonAssociationCheck() {
        //call nonassociation check API
        this.oidsiappFactory.oidsiappNonAssociationCheck(this.offschCommitModel).subscribe(data => {
                if(data && data != 'EMPTYDATA'){
					const msgOne  = this.translateService.translate('oidsiapp.nonassociationconflictmsg');
					const msgTwo = this.translateService.translate('oidsiapp.doyouwanttocontinue');
					const msgThree  = this.translateService.translate('oidsiapp.indinonassocconflict');
					const msgFour = this.translateService.translate('oidsiapp.gangnonassocconflict');
					data = data.replaceAll('oidsiapp.nonassociationconflictmsg',msgOne);
					data = data.replaceAll('oidsiapp.doyouwanttocontinue',msgTwo);
					data = data.replaceAll('oidsiapp.indinonassocconflict',msgThree);
					data = data.replaceAll('oidsiapp.gangnonassocconflict',msgFour);
					const labelMsg = {
						label: this.translateService.translate(data),  yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
					};
					this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
						if(result){
							this.oidsiappSaveOffEscRecords();
						}else{
							return;
						}
					});
				}else{
					this.oidsiappSaveOffEscRecords();
                }
              });
    }
    //if (non message exists
        //display non assication messages
        //if agree to proceed 
        // oidsiappSaveOffEscRecords();
        //else
        //clear data
    //} else {
        // oidsiappSaveOffEscRecords();
        //}


oidsiappSaveOffEscRecords() {
    const offschSaveData = this.oidsiappFactory.offSchCommit(this.offschCommitModel);
   offschSaveData.subscribe(data => {
       if (data === 1) {
           this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
           this.offschExecuteQuery();
       } else {
           this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            this.offschExecuteQuery();
       }
   });
   }
 oidsiappOnClearDetailsTrigger = () => {
     this.conflictFlag = false;
     this.datesFlag = false;
     this.dateTimeFlag = false;
     this.editableFlag = false;
     this.offschExecuteQuery();
     return true;
}
getLocations() {
   const rginternalmovelocationsServiceObj = this.oidsiappFactory.
       rgInternalMoveLocationsRecordGroup(this.vHeaderBlockModel.agyLocId);
   rginternalmovelocationsServiceObj.subscribe(rginternalmovelocationsList => {
       if (rginternalmovelocationsList.length === 0) {
           this.rginternalmovelocationsRg = [];
       } else {
           for (let i = 0; i < rginternalmovelocationsList.length; i++) {
               this.intLocIdMap.set(rginternalmovelocationsList[i].code, rginternalmovelocationsList[i].internalLocationId);
           }
       }
   });
}
}
