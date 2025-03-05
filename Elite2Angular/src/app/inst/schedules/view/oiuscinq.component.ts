import { OidcrtevService } from '@inst/legal/service/oidcrtev.service';
import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiuscinqService } from '@instschedules/service/oiuscinq.service';
import { VOffenderAllSchedules } from '@instschedulebeans/VOffenderAllSchedules';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OidbsiapService } from '../service/oidbsiap.service';
import { Router } from '@angular/router';
import { OidscmovService } from '@inst/schedules/service/oidscmov.service';
//   import required bean declarations

@Component({
    selector: 'app-oiuscinq',
    templateUrl: './oiuscinq.component.html'
})

export class OiuscinqComponent implements OnInit {
    //   Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid') grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offschData: VOffenderAllSchedules[] = [];
    offschDataTemp: VOffenderAllSchedules[] = [];
    offschModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    offschIndex = 0;
    offschInsertList: VOffenderAllSchedules[] = [];
    offschUpdatetList: VOffenderAllSchedules[] = [];
    offschDeleteList: VOffenderAllSchedules[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    crtEveColumnDef: any[];
    othPhonesColumnDef: any[];
    vTwlColumnDef: any[];
    offAllSchColumnDef: any[];
    offSchedulesColumnDef: any[];
    offEm1ColumnDef: any[];
    vOffenderAllSchedulesColumnDef: any[];
    vhbColumnDef: any[];
    agyPhonesColumnDef: any[];
    ctlLstColumnDef: any[];
    offEmColumnDef: any[];
    busPhonesColumnDef: any[];
    ctlUnColumnDef: any[];
    offSchColumnDef: any[];
    ctlBlkReadOnly = false;
    ctlLstReadOnly = false;
    ctlUnReadOnly = false;
    titleBlockReadOnly = false;
    offRelDetailsReadOnly = false;
    queryCtrlReadOnly = false;
    batchAddReadOnly = false;
    offAllSchReadOnly = false;
    cancelReadOnly = false;
    qryBlkReadOnly = false;
    vhbReadOnly = false;
    commonBlkReadOnly = false;
    dummyBlkReadOnly = false;
    offEscReadOnly = false;
    sysPflReadOnly = false;
    movementReadOnly = false;
    offSchReadOnly = false;
    ctrlReadOnly = false;
    crtEveReadOnly = false;
    offSchedulesReadOnly = false;
    agyAdrReadOnly = false;
    agyPhonesReadOnly = false;
    busAdrReadOnly = false;
    busPhonesReadOnly = false;
    othAdrReadOnly = false;
    othPhonesReadOnly = false;
    offSwlReadOnly = false;
    offEmReadOnly = false;
    crtEventsReadOnly = false;
    btnCtrl1ReadOnly = false;
    mymenuReadOnly = false;
    offEm1ReadOnly = false;
    btnCtrl2ReadOnly = false;
    cntrlBlkReadOnly = false;
    vOffenderAllSchedulesReadOnly = false;
    vTwlReadOnly = false;
    conflictFlagInList: any[];
    isRecurr:boolean = false;
    proceedBtnDisabled : boolean = false;
    constructor(private oiuscinqFactory: OiuscinqService, public translateService: TranslateService, private router: Router,
        private oidbsiapFactory: OidbsiapService, private oidscmovFactory: OidscmovService,
        private oidcrtevService:OidcrtevService) {
        //   TODO initilize data members here..!
        this.crtEveColumnDef = [];
        this.othPhonesColumnDef = [];
        this.vTwlColumnDef = [];
        this.offAllSchColumnDef = [];
        this.offSchedulesColumnDef = [];
        this.offEm1ColumnDef = [];
        this.vOffenderAllSchedulesColumnDef = [];
        this.vhbColumnDef = [];
        this.agyPhonesColumnDef = [];
        this.ctlLstColumnDef = [];
        this.offEmColumnDef = [];
        this.busPhonesColumnDef = [];
        this.ctlUnColumnDef = [];
        this.offSchColumnDef = [];
    }
    ngOnInit() {
        if (this.router.url === '/OIDBSIAP' && (this.dialog.data.confirmFlag === 'true')) {
            this.offschData.push(this.dialog.data);
            this.offschData[0].eventTypeDesc = 'Appointment';
            const rgschinternalscheduleServiceObj = this.oidbsiapFactory.
                rgSchInternalScheduleRecordGroup();
            rgschinternalscheduleServiceObj.subscribe(rgschinternalscheduleList => {
                for (let i = 0; i < rgschinternalscheduleList.length; i++) {
                    if (this.dialog.data.eventSubType === rgschinternalscheduleList[i].code) {
                        this.grid.setColumnData('eventSubTypeDesc', 0, rgschinternalscheduleList[i].description);
                        this.offschData[0].eventSubTypeDesc = rgschinternalscheduleList[i].description;
                    }
                }
            });
        } else if (this.router.url === '/OIDSTOJU' || this.router.url === '/OWEACPLN') {
            if (this.dialog.data instanceof Array) {
                this.conflictFlagInList = this.dialog.data;
                this.offschModel = new VOffenderAllSchedules();
                this.offschModel.offenderBookId = this.dialog.data[0].offenderBookId;
                this.offschModel.eventDate = DateFormat.getDate(this.dialog.data[0].eventDate);
                const offschResult = this.oiuscinqFactory.offSchExecuteQuery(this.offschModel);
                offschResult.subscribe(offschResultList => {
                    if (offschResultList.length === 0) {
                        this.offschData = [];
                        for (let i = 0; i < this.conflictFlagInList.length; i++) {
                            if (i < 2 && (!this.conflictFlagInList[i].eventId)) {
                                this.offschData.push(this.conflictFlagInList[i]);
                            }
                        }
                    } else {
                        this.offschData = [];
                        for (let i = 0; i < this.conflictFlagInList.length; i++) {
                            if (i < 2 && (!this.conflictFlagInList[i].eventId)) {
                                this.offschData.push(this.conflictFlagInList[i]);
                            }
                        }
                        for (let i = 0; i < offschResultList.length; i++) {
                            this.offschData.push(offschResultList[i]);
                        }
//                     this.offschData = offschResultList;
                        this.offschModel = offschResultList[0];
                    }
                });
            } else {
                this.offschExecuteQuery();
            }
        } else if (this.router.url === '/OIDSCMOV' && (this.dialog.data.conflictFlag === true)) {
            this.offschData.push(this.dialog.data);
            this.offschData[0].eventTypeDesc = 'Court';
            const rgCtrlReasonServiceObj = this.oidscmovFactory.
                rgCtrlReasonRecordGroup();
            rgCtrlReasonServiceObj.subscribe(ctrlReasonRgList => {
                for (let i = 0; i < ctrlReasonRgList.length; i++) {
                    if (this.dialog.data.courtEventType === ctrlReasonRgList[i].code) {
                        this.grid.setColumnData('eventSubTypeDesc', 0, ctrlReasonRgList[i].description);
                        this.offschData[0].eventSubTypeDesc = ctrlReasonRgList[i].description;
                    }
                }
            });
        } else if (this.router.url === '/OIDCRTEV' ) {
              if(this.dialog.data && this.dialog.data.conflictList && this.dialog.data.conflictList.length>0){
                this.dialog.data.conflictList.forEach(obj=>{
                    obj.eventTypeDesc ='Court';
                    obj.eventSubTypeDesc=obj.hearingReasonDesc;
                })
              }
            if(this.dialog.data.scheduleModel && this.dialog.data.scheduleModel.conflictFlag === true){
                this.scheduleExecuteQuery();
            }else if(this.dialog.data.conflictList.length>0 ){
                this.offschData =this.dialog.data.conflictList;
                this.offschModel = this.offschData[0];
            }
                

            } else if (this.router.url === '/OCDCCASE') {
                this.offschData=[];
               
                const hearingTypeData = this.oiuscinqFactory.hearingData();
                hearingTypeData.subscribe(hearingResult => {
                    for ( let i = 0; i < this.offschData.length; i++ ) {
                         for(let j = 0; j < hearingResult.length; j++){
                             if ( this.dialog.data[i].hearingType === hearingResult[j].code) {
                                  this.offschData[i].eventSubTypeDesc = hearingResult[j].description;
                             }
                         } 
                    }
                    
                    
                });
                
                for ( let i = 0; i < this.dialog.data.length; i++ ) {
                    this.offschData.push(this.dialog.data[i]);
                    this.offschData[i].eventTypeDesc = 'Court';
                    //this.offschData[i].eventSubTypeDesc = this.dialog.data[i].hearingType;
                }
                
        }else if(this.dialog.data.moduelName === 'CALSCH'){
            this.isRecurr = true;
            if(this.dialog.data.proceedBtnDisabled){
                this.proceedBtnDisabled = true;
            }
            this.offschData = this.dialog.data.data;
        }else if(this.router.url === '/OIDSIAPP'){
            this.offschExecuteQuery();
        } else {
            this.offschExecuteQuery();
        }
        this.offSchColumnDef = [
            { fieldName: this.translateService.translate( 'oiuscinq.eventdate' ), field: 'eventDate',
                          editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate( 'oiuscinq.eventtime' ), field: 'startTime',
                          editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate( 'common.scheduletype' ), field: 'eventTypeDesc',
                         editable: false, width: 150 },
            { fieldName: this.translateService.translate( 'oiuscinq.schedulereason' ), field: 'eventSubTypeDesc',
                         editable: false, width: 200 },
        ];
    }
    onRowClickoffsch(event) {
    }
    onButProceedclick() {
    }
    onButStopclick() {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    offschExecuteQuery() {
        this.offschModel = new VOffenderAllSchedules();
        this.offschModel.offenderBookId = this.dialog.data.offenderBookId;
        this.offschModel.eventDate = DateFormat.getDate(this.dialog.data.eventDate);
        this.offschModel.moduleName = this.router.url.replace('/', '');
        this.offschModel.returnDate = DateFormat.getDate(this.dialog.data.returnDate);


        const offschResult = this.oiuscinqFactory.offSchExecuteQuery(this.offschModel);
        offschResult.subscribe(offschResultList => {
            if (offschResultList.length === 0) {
                this.offschData = [];
            } else {
                this.offschData = offschResultList;
                this.offschModel = offschResultList[0];
                if (this.router.url === '/OIDSTOJU') {
                    this.offschData.push(this.dialog.data);
                }
            }
        });
    }
    scheduleExecuteQuery() {
        this.offschModel = new VOffenderAllSchedules();
        this.offschModel.offenderBookId = this.dialog.data.scheduleModel.offenderBookId;
        this.offschModel.eventDate = DateFormat.getDate(this.dialog.data.scheduleModel.eventDate);
        this.offschModel.moduleName = this.router.url.replace('/', '');
        const offschResult = this.oiuscinqFactory.offSchExecuteQuery(this.offschModel);
        offschResult.subscribe(offschResultList => {
            if (offschResultList.length === 0) {
                this.offschData = [];
            } else {
                //this.offschData = offschResultList;
                this.offschData =offschResultList.concat(this.dialog.data.conflictList);
                this.offschModel = offschResultList[0];
            }
        });
    }
    eventDateKeyListvalTrigger() {
        //  TODO  this.displayCalendar();
    }

    butProceedWhenButtonPressedTrigger() {
        this.dialog.close({ eventId: this.dialog.data.eventId });
        //  TODO global.allow_schedule = 'y';
        //  TODO
        //  TODO do_key('exit_form');
    }

    butStopWhenButtonPressedTrigger() {
        this.dialog.close(null);
        //  TODO global.allow_schedule = 'n';
        //  TODO
        //  TODO do_key('exit_form');
    }
    proceedWithNoConflicts(){
        this.dialog.close('WITH_NO_CONFLICTS');
    }

    
}
