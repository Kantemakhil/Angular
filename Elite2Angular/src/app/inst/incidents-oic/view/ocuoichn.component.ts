import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuoichnService } from '@inst/incidents-oic/service/ocuoichn.service';
import { OicHearingNotices } from '@instoicbeans/OicHearingNotices';
import { OicHearings } from '@instoicbeans/OicHearings';
import { AgencyInternalLocations } from '@instoicbeans/AgencyInternalLocations';
import { OicHearingsCommitBean } from '@instoicbeans/OicHearingsCommitBean';
import { OicHearingNoticesCommitBean } from '@instoicbeans/OicHearingNoticesCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ocuoichn',
    templateUrl: './ocuoichn.component.html'
})

export class OcuoichnComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    oichearData: OicHearings[] = [];
    oichearDataTemp: OicHearings[] = [];
    oichearModel: OicHearings = new OicHearings();
    oichearModelTemp: OicHearings = new OicHearings();
    selectedHearings: OicHearings = new OicHearings();
    oichearIndex = -1;
    oichearInsertList: OicHearings[] = [];
    oichearUpdatetList: OicHearings[] = [];
    oichearDeleteList: OicHearings[] = [];
    oichearnotiData: OicHearingNotices[] = [];
    oichearnotiDataTemp: OicHearingNotices[] = [];
    oichearnotiModel: OicHearingNotices = new OicHearingNotices();
    agencyInternalLocations: AgencyInternalLocations = new AgencyInternalLocations();
    oichearCommitModel: OicHearingsCommitBean = new OicHearingsCommitBean();
    oichearnotiCommitModel: OicHearingNoticesCommitBean = new OicHearingNoticesCommitBean();
    oichearnotiIndex = -1;
    oichearnotiInsertList: OicHearingNotices[] = [];
    oichearnotiUpdatetList: OicHearingNotices[] = [];
    oichearnotiDeleteList: OicHearingNotices[] = [];
    index: any;
    closeMyDataPicker: any;
    oicHearingDateOpened: any;
    oicHearNotiDeliveryDateOpened: any;
    preventDefault: any;
    display: boolean;
    disabled: boolean;
    oicHearingsColumnDefs: any[] = [];
    oicHearingNoticesColumnDefs: any[] = [];
    editable: boolean;
    rgagyincpstaffidRg: any[] = [];
    rghearingtypeRg: any[] = [];
    rginternallocationsRg: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    caseLoadId: string;
    msgs: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    date: Date;
    time: Date;
    oicHearingIdTemp: number;
    checkTime: boolean;
    isInsert = false;
    isDelete = false;
    isOicHearDelete = false;
    checkHearingDate: boolean;
    checkDeliveryDate: boolean;
    checkConfict: boolean;
    constructor(private ocuoichnFactory: OcuoichnService, private sessionManager: UserSessionManager,
         public translateService: TranslateService, public dialogService: DialogService,private eoffenderService: EoffenderService,
         private router: Router) {
    }
    ngOnInit() {
        this.checkConfict = false;
        this.checkHearingDate = false;
        this.checkDeliveryDate = false;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.oicHearingsColumnDefs = [
            {
                fieldName: this.translateService.translate('common.hearingdate') + '*',
                field: 'hearingDate', datatype: 'date', editable: true, width: 200
            },
            {
                fieldName: this.translateService.translate('common.time') + '*', field: 'hearingTime', datatype: 'time',
                editable: true, width: 200, cellEditable: this.canCheckConfict
            },
            {
                fieldName: this.translateService.translate('ocuoichn.hearinglocation') + '*',
                field: 'internalLocationIdDes', datatype: 'lov', codeTitle: 'Location ID',source:'OIMULOCA',
                link: 'ocuoichn/rgInternalLocationsRecordGroup?caseloadId=' + this.caseLoadId, optionWidth: 300, editable: true, width: 200,
                cellEditable: this.canCheckConfict
            },
            {
                fieldName: this.translateService.translate('common.hearingtype'),
                field: 'oicHearingType', datatype: 'lov', domain: 'OIC_HEAR', optionWidth: 250, cellEditable: this.canCheckConfict,
                editable: true, width: 200
            },
            { fieldName: this.translateService.translate('common.comment'), field: 'commentText',
            datatype: 'text', uppercase: 'false', maxlength: 240, editable: true, width: 200, cellEditable: this.canCheckConfict }
        ];
        this.oicHearingNoticesColumnDefs = [
            {
                fieldName: this.translateService.translate('ocuoichn.deliverydate') + '*', field: 'deliveryDate',
                datatype: 'date', editable: true, width: 200
            },
            {
                fieldName: this.translateService.translate('common.time') + '*', field: 'deliveryTime', datatype: 'time',
                editable: true, width: 200
            },
            {
                fieldName: this.translateService.translate('ocuoichn.deliveredby') + '*', field: 'deliveryStaffId', datatype: 'lov',
                link: 'ocuoichn/rgAgyIncpStaffIdRecordGroup?caseloadId=' + this.caseLoadId, descTitle: 'Name', codeTitle: 'ID#',
                optionWidth: 300, editable: true, width: 200,source:'OUMPERSO'
            },
            { fieldName: this.translateService.translate('common.comment'), field: 'commentText',
            datatype: 'text', uppercase: 'false', maxlength: 240, editable: true, width: 200 }
        ];
        const serviceObj2 = this.ocuoichnFactory.
            rgHearingTypeRecordGroup();
        serviceObj2.subscribe(list2 => {
            if (list2.length === 0) {
                return;
            } else {
                for (let i = 0; i < list2.length; i++) {
                    this.rghearingtypeRg.push({
                        'text': list2[i].id + ' - ' +
                            list2[i].name, 'id': list2[i].name
                    });
                }
            }
        });
        const serviceObj3 = this.ocuoichnFactory.
            rgInternalLocationsRecordGroup(this.caseLoadId);
        serviceObj3.subscribe(list3 => {
            if (list3.length === 0) {
                return;
            } else {
                for (let i = 0; i < list3.length; i++) {
                    this.rginternallocationsRg.push({
                        'text': list3[i].id + ' - ' +
                            list3[i].name, 'id': list3[i].name
                    });
                }
            }
        });
        this.executeQueryForOicHear();
    }
    
    canCheckConfict = (data: any, index: number, field: string): boolean => {
      if (this.checkConfict) {
        const data1 = {'eventDate': this.oichearModelTemp.hearingDate, 'offenderBookId': this.dialog.data.offenderBookId};
        this.dialogService.openLinkDialog('/oiuscinq', data1).subscribe(result => {
            if (result) {
                this.checkConfict = false;
                return false;
            } else {
                this.checkConfict = true;
                return true;
            }
        });
      } else {
          return true;
      }
    }
    /*
    *  This event is used to do the validations when click Add button in Shedule Hearing Block.
    */
    onOicHearInsert = () => {
        if (this.oichearData.length > 0) {
            if (!this.oichearData[this.oichearData.length - 1].hearingDate &&
                !this.oichearData[this.oichearData.length - 1].hearingTime &&
                 !this.oichearData[this.oichearData.length - 1].internalLocationIdDes ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.recordmustbeenteredordeletedfirst');
                this.show();
                return;
            }
            if (!this.oichearData[this.oichearData.length - 1].hearingDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.hearingdatemustbeentered');
                this.show();
                return;
            }
            if (!this.oichearData[this.oichearData.length - 1].hearingTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.timemustbeentered');
                this.show();
                return;
            }
            if (this.oichearData[this.oichearData.length - 1].hearingTime) {
                if (!this.oichearData[this.oichearData.length - 1].hearingDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoichn.enterahearidatetoqueryonthehearingtime');
                    this.show();
                    return;
                }
            }
            if (!this.oichearData[this.oichearData.length - 1].internalLocationIdDes) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.hearinglocationmustbeentered');
                this.show();
                return;
            }
        }
        return {
            oicHearingIdTemp: 0
            };
    }
    onOicHearClear = () => {
        this.checkConfict = false;
        return true;
    }
    /*
    * To get current date and time in the Grid.
    * Used to show validation messages,when click on Add button more than once with out giving mandatory fields in Notification Block.
    */
    onOicHearNoticeInsert = () => {
        if (this.oichearnotiData.length > 0) {
            if (!this.oichearnotiData[this.oichearnotiData.length - 1].deliveryDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliverydatemustbeentered');
                this.show();
                return;
            }
            if (!this.oichearnotiData[this.oichearnotiData.length - 1].deliveryTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.timemustbeentered');
                this.show();
                return;
            }
            if (this.oichearnotiData[this.oichearnotiData.length - 1].deliveryTime) {
                if (!this.oichearnotiData[this.oichearnotiData.length - 1].deliveryDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoichn.enteradeliverydatetoqueryonthedeliverytime');
                    this.show();
                    return;
                }
            }
            if (!this.oichearnotiData[this.oichearnotiData.length - 1].deliveryStaffId) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliveredbymustbeentered');
                this.show();
                return;
            }
        }
        if ( !this.oichearData || this.oichearData.length === 0) {
            this.oichearnotiData = [];
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoichn.insertofnotificationmustbeincontextofshedulehearing');
            this.show();
            return;
        }
        if ( !this.oichearData || this.oichearData.length === 0) {
            this.oichearnotiData = [];
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoichn.queryofnotificationmustbeincontextofscheduledhearing');
            this.show();
            return;
        }
        if ( !this.selectedHearings.oicHearingId ) {
            this.oichearnotiData = [];
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoichn.pleaseselecttherecordinshedulehearingblock');
            this.show();
            this.executeQueryForOicHear();
            return;
        }
        return {
            deliveryDate: DateFormat.getDate(),
            deliveryTime: DateFormat.getDate()
        };
    }
     /**
     * This function executes when click on remove and do some validations.
     */
    onOicHearDelete = () => {
        this.checkConfict = false;
        if (this.oichearnotiData.length > 0) {
            if (!this.oichearData[this.oichearData.length - 1].hearingDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.hearingdatemustbeentered');
                this.show();
                return false;
            }
            if (!this.oichearData[this.oichearData.length - 1].hearingTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.timemustbeentered');
                this.show();
                return false;
            }
            if (!this.oichearData[this.oichearData.length - 1].internalLocationIdDes) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.hearinglocationmustbeentered');
                this.show();
                return false;
            }
        }
        if (this.oichearnotiData.length > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.cannotdeletemasterrecord');
            this.show();
            return false;
        }
        {
            return true;
        }
    }
    /*
    * this event is used to do the validations when click on remove button in grid in Notification Block.
    */
    onOicHearNoticeDelete = () => {
        if (this.oichearnotiData.length > 0) {
            if (!this.oichearnotiData[this.oichearnotiData.length - 1].deliveryDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliverydatemustbeentered');
                this.show();
                return false;
            }
            if (!this.oichearnotiData[this.oichearnotiData.length - 1].deliveryTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.timemustbeentered');
                this.show();
                return false;
            }
            if (!this.oichearnotiData[this.oichearnotiData.length - 1].deliveryStaffId) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliveredbymustbeentered');
                this.show();
                return false;
            }
        }
        {
            return true;
        }

    }
    /*
    * This event is fired when click on row in Schedule Hearing block
    */
    onRowClickoichear(event) {
        if ( event ) {
            this.oichearnotiData = [];
            this.selectedHearings = new OicHearings();
            this.selectedHearings = event;
            if(event && event.createDateTime){
                this.isOicHearDelete = true;
                this.eoffenderService.selectedRowData=event;
                this.eoffenderService.selectedRowData['agencyIncidentId']=this.dialog.data.agencyIncidentId;
                
            }
            else{
                this.isOicHearDelete = false;
                this.eoffenderService.selectedRowData=null;
            }
            this.oichearnotiModel = new OicHearingNotices();
            this.oichearnotiModel.oicHearingId = this.selectedHearings.oicHearingId;
            this.executeQueryForOicHearNotices();
            }else{
                this.eoffenderService.selectedRowData=null;
            }
    }
    onRowClickoichearnoti(event) {
        if (event && event.createDateTime) {
            this.isDelete = true;
        } else {
            this.isDelete = false;
        }
    }

    /*
    * This event is fired when click on Exit button
    */
    ocuoichnClose() {
        this.dialog.close(null);
    }
    /*
     * This function will be executed, when click event is fired
     * on Hearing Date*DateField.
    */
    oicHearingDateOpen(event) {
        this.closeMyDataPicker();
        this.preventDefault();
        event.stopPropagation();
        this.oicHearingDateOpened = true;
    }

    /**
    * This method is used to get the data from OicHearings
    * param oicIncidentId
    */
    executeQueryForOicHear() {
        this.oichearModel = new OicHearings();
        this.oichearModelTemp = new OicHearings();
        this.oichearModel.oicIncidentId = this.dialog.data.oicIncidentId;
        const serviceObj = this.ocuoichnFactory.oicHearExecuteQuery(this.oichearModel);
        serviceObj.subscribe(oicHearData => {
            if (oicHearData.length === 0) {
                this.oichearData = [];
                this.isInsert = false;
            } else {
                this.oichearData = oicHearData;
                this.oichearIndex = 0;
                this.oichearModel = this.oichearData[0];
                this.isInsert = true;
            }
        });
    }
    /**
    * This method is used to get the data from OicHearingNotices
    * param oicHearingId
    */
    executeQueryForOicHearNotices() {
        if (this.oichearnotiModel.oicHearingId) {
            const oichearnotiResult = this.ocuoichnFactory.oicHearNotiExecuteQuery(this.oichearnotiModel);
            oichearnotiResult.subscribe(oichearnotiResultList => {
                if (oichearnotiResultList.length === 0) {
                    this.oichearnotiData = [];
                } else {
                    this.oichearnotiData = oichearnotiResultList;
                    this.oichearnotiIndex = 0;
                }
            });
        }
    }
 /*
  *  event is used to validate the row
  */
  validateHearingDate = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    this.checkHearingDate = false;
    if ( event.oldValue !== event.newValue ) {
        if (event.field === 'hearingDate') {
            if (event.data.hearingDate) {
                if ((DateFormat.compareDate(DateFormat.getDate(), event.data.hearingDate)) === 1) {
                    this.checkHearingDate = true;
                    rowdata.validated = true;
                    return rowdata;
                }
                this.oichearModelTemp = new OicHearings();
            this.oichearModelTemp.hearingDate = event.data.hearingDate;
            this.oichearModelTemp.offenderBookId = this.dialog.data.offenderBookId;
            const schConflictServiceObj = this.ocuoichnFactory.
            oicHearCheckScheduleConflict(this.oichearModelTemp);
        schConflictServiceObj.subscribe(schConflictList => {
            if (schConflictList === 0) {
                this.checkConfict = false;
            } else {
                const data = {'eventDate': event.data.hearingDate, 'offenderBookId': this.dialog.data.offenderBookId};
                this.dialogService.openLinkDialog('/oiuscinq', data).subscribe(result => {
                    if (result !== null) {
                        this.checkConfict = false;
                    } else {
                        this.checkConfict = true;
                    }
                });
            }
        });
            }
        }
         rowdata.validated = true;
             return rowdata;
           }

 }
    /**
    * this function is used to save,update and delete the data in OicHearings
    * This function will be executed when commit event is
    * fired
    */
    saveOichearForm(event) {
        if (this.checkConfict) {
            const data2 = {'eventDate': this.oichearModelTemp.hearingDate, 'offenderBookId': this.dialog.data.offenderBookId};
            this.dialogService.openLinkDialog('/oiuscinq', data2).subscribe(result => {
                if (result) {
                    this.checkConfict = false;
                    return false;
                } else {
                    this.checkConfict = true;
                    return true;
                }
            });
          }
        this.oichearInsertList = event.added;
        this.oichearUpdatetList = event.updated;
        this.oichearDeleteList = event.removed;
        this.oichearCommitModel.insertList = [];
        this.oichearCommitModel.updateList = [];
        this.oichearCommitModel.deleteList = [];
        for (let i = 0; i < this.oichearInsertList.length; i++) {
            this.oichearInsertList[i].oicIncidentId = this.oichearModel.oicIncidentId;
            this.oichearInsertList[i].eventStatus = 'SCH';
            if (!this.oichearInsertList[i].hearingDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.hearingdatemustbeentered');
                this.show();
                return;
            }
            if (!this.oichearInsertList[i].hearingTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.timemustbeentered');
                this.show();
                return;
            }
            if (!this.oichearInsertList[i].internalLocationIdDes) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.hearinglocationmustbeentered');
                this.show();
                return;
            }
            if (this.oichearInsertList[i].hearingTime) {
                if (!this.oichearInsertList[i].hearingDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoichn.enterahearidatetoqueryonthehearingtime');
                    this.show();
                    return;
                }
            }
            if ((DateFormat.compareDate(DateFormat.getDate(), this.oichearInsertList[i].hearingDate)) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.hearingdatemustbeinfuture');
                this.show();
                return;
            }
            const hearingTime = this.oichearInsertList[i].hearingTime.getHours() + ':' + this.oichearInsertList[i].hearingTime.getMinutes();
            this.oichearInsertList[i].hearingTime = TimeFormat.parse(hearingTime,
                this.oichearInsertList[i].hearingDate);

                const incidentTime = (DateFormat.getDate(this.dialog.data.incidentTime).getHours()) + ':' + (DateFormat.getDate(this.dialog.data.incidentTime).getMinutes()) ;

                const incedentDateTime = TimeFormat.parse(incidentTime,DateFormat.getDate(this.dialog.data.incidentDate));
            
            if ((DateFormat.compareDateTime( this.oichearInsertList[i].hearingTime,DateFormat.getDate(incedentDateTime))) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.hearingdatetimecannotbeforetheincidentdatetime');
                this.show();
                return;

            }
            this.oichearCommitModel.insertList = this.oichearInsertList;

        }
        for (let i = 0; i < this.oichearUpdatetList.length; i++) {
           
                if (!this.oichearUpdatetList[i].hearingDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoichn.hearingdatemustbeentered');
                    this.show();
                    return;
                }
                if (!this.oichearUpdatetList[i].hearingTime) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoichn.timemustbeentered');
                    this.show();
                    return;
                }
                if (!this.oichearUpdatetList[i].internalLocationIdDes) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoichn.hearinglocationmustbeentered');
                    this.show();
                    return;
                }
                this.oichearUpdatetList[i].internalLocationId = Number(this.oichearUpdatetList[i].internalLocationIdDes);
                this.oichearUpdatetList[i].hearingDate = DateFormat.getDate(this.oichearUpdatetList[i].hearingDate);
                const dateHearingTime = DateFormat.getDate(this.oichearUpdatetList[i].hearingTime);
                const hearingTime = dateHearingTime.getHours() + ':' + dateHearingTime.getMinutes();
                this.oichearUpdatetList[i].hearingTime = TimeFormat.parse(hearingTime,
                    this.oichearUpdatetList[i].hearingDate);
            const incidentTime = (DateFormat.getDate(this.dialog.data.incidentTime).getHours()) + ':' + (DateFormat.getDate(this.dialog.data.incidentTime).getMinutes()) ;
            const incedentDateTime = TimeFormat.parse(incidentTime,DateFormat.getDate(this.dialog.data.incidentDate));
        
        if ((DateFormat.compareDateTime( this.oichearUpdatetList[i].hearingTime,incedentDateTime)) === -1) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoichn.hearingdatetimecannotbeforetheincidentdatetime');
            this.show();
            return;

        }
            this.oichearCommitModel.updateList = this.oichearUpdatetList;
        }
        for (let i = 0; i < this.oichearDeleteList.length; i++) {
            this.oichearnotiModel = new OicHearingNotices();
            this.oichearnotiModel.oicHearingId = this.oichearDeleteList[i].oicHearingId;
            const serviceObj = this.ocuoichnFactory.oicHearNotiExecuteQuery(this.oichearnotiModel);
            serviceObj.subscribe(data => {
                if (data && data.length > 0) {
                    this.oichearnotiDataTemp = data;
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.cannotdeletemasterrecord');
                    this.show();
                    this.executeQueryForOicHear();
                } else {
                    this.oichearCommitModel.deleteList = this.oichearDeleteList;
                    const oicHearSave = this.ocuoichnFactory.oicHearCommit(this.oichearCommitModel);
                    oicHearSave.subscribe(oicHearSaveResult => {
                        if (oicHearSaveResult === 1) {
                            this.type = 'success';
                            this.checkConfict = false;
                            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                            this.show();
                            this.oichearData = oicHearSaveResult;
                            this.executeQueryForOicHear();
                        } else {
                            this.type = 'warn';
                            this.checkConfict = false;
                            this.message = this.translateService.translate('ocuoichn.integrityconstraintviolated');
                            this.oichearData = oicHearSaveResult;
                            this.show();
                            this.executeQueryForOicHear();
                        }
                    });
                }
            });

        }
        if (this.oichearDeleteList.length === 0) {
            const crtEveSaveData = this.ocuoichnFactory.nonAssocationOffendersData(this.oichearCommitModel);
    crtEveSaveData.subscribe(data => {
      if (data === "EMPTYDATA") {
      this.oicHearCommitMethod();
      }
      else {
        const msgOne  = this.translateService.translate('ocuoichn.hearingSchedule');
        const msgTwo  = this.translateService.translate('ocuoichn.indinonassocconflict');
        const msgThree  = this.translateService.translate('ocuoichn.gangnonassocconflict');
        data = data.replaceAll('ocuoichn.hearingSchedule',msgOne);
        data = data.replaceAll('ocuoichn.indinonassocconflict',msgTwo);
        data = data.replaceAll('ocuoichn.gangnonassocconflict',msgThree);
        const labelMsg = {
          label: this.translateService.translate(data), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
          proceedBtnDisabled: true
        };
        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
          if (result) {
          this.oicHearCommitMethod();
          } else {
            return;
          }
        });
      }

    });

           
        }
    }
    oicHearCommitMethod(){
        if(this.oichearCommitModel.insertList.length > 0 || this.oichearCommitModel.updateList.length > 0 
            || this.oichearCommitModel.deleteList.length > 0) {
                const oichearSaveData = this.ocuoichnFactory.oicHearCommit(this.oichearCommitModel);
                oichearSaveData.subscribe(oichearSaveResult => {
                    if (oichearSaveResult === 0) {
                        this.type = 'error';
                        this.checkConfict = false;
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.oichearData = oichearSaveResult;
                        this.show();
                        this.executeQueryForOicHear();
                    } else {
                        this.type = 'success';
                        this.checkConfict = false;
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.oichearData = oichearSaveResult;
                        this.show();
                        this.executeQueryForOicHear();
        
                    }
                });
            }
                        this.type = 'success';
                        this.checkConfict = false;
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        //this.oichearData = oichearSaveResult;
                        this.show();
                        this.executeQueryForOicHear();
    }
    /*
  *  event is used to validate the row
  */
  validateDeliveryDate = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    this.checkDeliveryDate = false;
    if ( event.oldValue !== event.newValue ) {
        if (event.field === 'deliveryDate') {
            if (event.data.deliveryDate) {
                if ((DateFormat.compareDate(event.data.deliveryDate, DateFormat.getDate())) === 1) {
                    this.checkDeliveryDate = true;
                    rowdata.validated = true;
                    return rowdata;
                }
            }
        }
         rowdata.validated = true;
             return rowdata;
           }

 }
    /**
    * this function is used to do save,update and delete the data in OicHearingNotices
    * This function will be executed when commit event is
    * fired
    */
    saveOichearnotiForm(event) {
        this.oichearnotiInsertList = event.added;
        this.oichearnotiUpdatetList = event.updated;
        this.oichearnotiDeleteList = event.removed;
        this.oichearnotiCommitModel.insertList = [];
        this.oichearnotiCommitModel.updateList = [];
        this.oichearnotiCommitModel.deleteList = [];
        for (let i = 0; i < this.oichearnotiInsertList.length; i++) {
            this.oichearnotiInsertList[i].oicHearingId = this.selectedHearings.oicHearingId;
            if (!this.oichearnotiInsertList[i].deliveryDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliverydatemustbeentered');
                this.show();
                return;
            }
            if (!this.oichearnotiInsertList[i].deliveryTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.timemustbeentered');
                this.show();
                return;
            }
            if (!this.oichearnotiInsertList[i].deliveryStaffId) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliveredbymustbeentered');
                this.show();
                return;
            }
            if (this.oichearnotiInsertList[i].deliveryTime) {
                if (!this.oichearnotiInsertList[i].deliveryDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoichn.enteradeliverydatetoqueryonthedeliverytime');
                    this.show();
                    return;
                }
            }
            if ((DateFormat.compareDate( this.oichearnotiInsertList[i].deliveryDate, DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliverydatemustbeinfast');
                this.show();
                return;
            }
            const deliveryTime = this.oichearnotiInsertList[i].deliveryTime.getHours()
             + ':' + this.oichearnotiInsertList[i].deliveryTime.getMinutes();
            this.oichearnotiInsertList[i].deliveryTime = TimeFormat.parse(deliveryTime,
                this.oichearnotiInsertList[i].deliveryDate);
            if ((DateFormat.compareDateTime(this.oichearnotiInsertList[i].deliveryTime, DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliverydateTimemustbeinfast');
                this.show();
                return;
            }
        }
        for (let i = 0; i < this.oichearnotiUpdatetList.length; i++) {
            if (!this.oichearnotiUpdatetList[i].deliveryDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliverydatemustbeentered');
                this.show();
                return;
            }
            if (!this.oichearnotiUpdatetList[i].deliveryTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.timemustbeentered');
                this.show();
                return;
            }
            if (!this.oichearnotiUpdatetList[i].deliveryStaffId) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliveredbymustbeentered');
                this.show();
                return;
            }
            if (this.oichearnotiUpdatetList[i].deliveryTime) {
                if (!this.oichearnotiUpdatetList[i].deliveryDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocuoichn.enteradeliverydatetoqueryonthedeliverytime');
                    this.show();
                    return;
                }
            }
            if (this.checkDeliveryDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliverydatemustbeinfast');
                this.show();
                return;
            }
            const dateDeliveryTime = DateFormat.getDate(this.oichearnotiUpdatetList[i].deliveryTime);
            const deliveryTimeTemp = dateDeliveryTime.getHours() + ':' + dateDeliveryTime.getMinutes();
            this.oichearnotiUpdatetList[i].deliveryTime = TimeFormat.parse(deliveryTimeTemp,
                this.oichearnotiUpdatetList[i].deliveryDate);
                if ((DateFormat.compareDateTime(this.oichearnotiUpdatetList[i].deliveryTime, DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoichn.deliverydatemustbeinfast');
                this.show();
                return;
            }
        }
        this.oichearnotiCommitModel.insertList = this.oichearnotiInsertList;
        this.oichearnotiCommitModel.updateList = this.oichearnotiUpdatetList;
        this.oichearnotiCommitModel.deleteList = this.oichearnotiDeleteList;
        const oichearnotiSaveData = this.ocuoichnFactory.oicHearNotiCommit(this.oichearnotiCommitModel);
        oichearnotiSaveData.subscribe(oichearnotiSaveResult => {
            if (oichearnotiSaveResult === 0) {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.oichearnotiData = oichearnotiSaveResult;
                this.show();
                this.executeQueryForOicHearNotices();
            } else {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.oichearnotiData = oichearnotiSaveResult;
                this.show();
                this.executeQueryForOicHearNotices();

            }
        });
    }
    /*
    * This method is used to show popup messages.
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    /*
    * This method is used to check Time pattern
    * This method not used any where because of Time component
    */
    checkValidTimePattern(hearTime) {
        const time = String(hearTime).split(':');
        if (String(hearTime).length >= 6 || !String(hearTime).includes(':')) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.datetimeformat');
            this.show();
            return false;
        } else if (isNaN(Number(time[0])) || isNaN(Number(time[1])) || String(hearTime).includes('+') ||
            String(hearTime).includes('-')) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.enteronlynumber');
            this.show();
            return false;

        } else if (Number(time[0]) >= 24) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.hoursmust');
            this.show();
            return false;
        } else if (Number(time[1]) >= 60) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.minutesmust');
            this.show();
            return false;
        } else {
            return true;
        }
    }
    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    dateFormat(dateValue) {
        if (dateValue !== undefined && dateValue.length > 0) {
            const newdate = dateValue.split('/');
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }
    /*
     * This function will be executed, when click event is fired
     * on Delivery Date*DateField.
    */
    oicHearNotiDeliveryDateOpen(event) {
         this.closeMyDataPicker();
         this.preventDefault();
         event.stopPropagation();
         this.oicHearNotiDeliveryDateOpened = true;
     }
     ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }
}


