import {
    Component, OnInit,ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiivisitService } from '../service/oiivisit.service';
import { VOffenderVisitDetails } from '@visitsbeans/VOffenderVisitDetails';
import { VOffenderAllVisitors } from '@visitsbeans/VOffenderAllVisitors';
import { VOffenderAllVisitorsCommitBean } from '@visitsbeans/VOffenderAllVisitorsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { VOffenderVisitsCommitBean } from '@visitsbeans/VOffenderVisitsCommitBean';
import { VOffenderVisits } from '@visitsbeans/VOffenderVisits';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';


@Component({
    selector: 'app-oiivisit',
    templateUrl: './oiivisit.component.html'
})

export class OiivisitComponent implements OnInit {
    @ViewChild('visitsGrid', { static: true }) visitsGrid: any;
    readOnlyFlag = true;
    offvisModelTemp: VOffenderVisitDetails = new VOffenderVisitDetails();
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offvisData: VOffenderVisitDetails[] = [];
    offvisDataTemp: VOffenderVisitDetails[] = [];
    offvisModel: VOffenderVisitDetails = new VOffenderVisitDetails();
    offvisIndex = -1;
    offvisInsertList: VOffenderVisitDetails[] = [];
    //offvisUpdatetList: VOffenderVisitDetails[] = [];
    offvisDeleteList: VOffenderVisitDetails[] = [];
    offimpData: VOffenderAllVisitors[] = [];
    offimpDataTemp: VOffenderAllVisitors[] = [];
    offimpModel: VOffenderAllVisitors = new VOffenderAllVisitors();
    offimpIndex = -1;
    offimpInsertList: VOffenderAllVisitors[] = [];
    offimpUpdateList: VOffenderAllVisitors[] = [];
    offimpDeleteList: VOffenderAllVisitors[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offVisColumnDef: any[];
    offImpColumnDef: any[];
    offVstOffColumnDef: any[];
    offVstColumnDef: any[];
    offVstPersColumnDef: any[];
    offVstReadOnly = false;
    remVisitReadOnly = false;
    offVstPersReadOnly = false;
    images1ReadOnly = false;
    offVstOffReadOnly = false;
    images2ReadOnly = false;
    offVisReadOnly = false;
    offImpReadOnly = false;
    offimpCommitModel: VOffenderAllVisitorsCommitBean = new VOffenderAllVisitorsCommitBean();
    msglist = [];
    message = ' Invalid.';
    type = 'error';

    agyLovData: Map<string, string> = new Map<string, string>();
    facilityList: any;
    public fields: Object = { text: 'description', value: 'code' };
    mode: any;
    facility: any;
    toDate: any;
    fromDate: any;
    facilityLink: string;
    caseloadType: string;
    caseloadId: string;
    dayOfTheWeekLink: string;
    timeSlotLink: string;
    visitLocationLink: string;
    visitStatus: any;
    outcomeReasonCode: any;
    commentText: any;
    applyToAllDisable: boolean;
    selectAll: boolean;
    offvstCommitModel: VOffenderVisitsCommitBean = new VOffenderVisitsCommitBean();
    vOffenderVisitDetailsObj: VOffenderVisits=new VOffenderVisits();
    offvisUpdatetList: VOffenderVisits[] = [];
    clearDisabled: boolean;
    namesReadOnly: boolean;
    retriveDisabled: boolean;
    timeSlotTitles: { description: string; stimetemp:string; weekDay:string };
    dayOfWeekTitles: { description: string; };
    visitLocationTitles: { description: string; };
    visitLocationLovData: Map<string, string>;
    dayOfTheWeekLovLovData: Map<string, string>;
    timeSlotLovData: Map<string, string>;
    applyAllClicked: boolean;
    constructor(private oiivisitFactory: OiivisitService,
            public translateService: TranslateService, public sessionManager: UserSessionManager) {
        this.offVisColumnDef = [];
        this.offImpColumnDef = [];
        this.offVstOffColumnDef = [];
        this.offVstColumnDef = [];
        this.offVstPersColumnDef = [];
    }
    ngOnInit() {
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.caseloadType = this.sessionManager.currentCaseLoadType;
        this.offvisModelTemp.fromDate= DateFormat.getDate();
        this.clearDisabled = false;
        this.namesReadOnly = false;
        this.retriveDisabled = false;
        this.applyToAllDisable = true;
        this.applyAllClicked = false;
        this.facilityLink = 'oiivisit/rgAgencyLocationsRecordGroup?caseloadId=' + this.caseloadId + '&caseloadType='
            + this.caseloadType;
        this.mode = 'CheckBox';
        
        

          this.timeSlotTitles= { description: 'Time Slot', stimetemp: 'Start Time', weekDay: 'End Time'};
          this.dayOfWeekTitles= { description: 'Day of the Week'};
          this.visitLocationTitles= { description: 'Visit Location'}
       /*  this.timeSlotTitles = { code: this.translateService.translate('ocmcondi.lovUnitType'),
      description: this.translateService.translate('ocmcondi.lovDescription')}; */
        this.offVisColumnDef = [
            {
                fieldName: this.translateService.translate('Select'), field: 'selectFlag', editable: true, width: 150, datatype: 'checkbox'
            },

            { fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('common.housinglocation'), field: 'livingUnitDesc', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.date'), field: 'visitDate', editable: false,
                datatype: 'date', width: 100
            },
            {
                fieldName: this.translateService.translate('oiivisit.start'), field: 'startTime', editable: false,
                datatype: 'time', width: 150
            },
            {
                fieldName: this.translateService.translate('oiivisit.end'), field: 'endTime', editable: false,
                datatype: 'time', width: 100
            },
            { fieldName: this.translateService.translate('common.type'), field: 'visitType', editable: false, width: 150,domain: 'VISIT_TYPE',datatype: 'lov' },
            {
                fieldName: this.translateService.translate('oiivisit.visitlocation'), field: 'internalLocationDesc',
                editable: false, width: 150
            },

            {
                fieldName: this.translateService.translate('oiivisit.status'), field: 'visitStatus', datatype: 'lov',
               domain:'VIS_COMPLETE',
                editable: true, width: 150
              },

              {
                fieldName: this.translateService.translate('oiivisit.cancelreason'), field: 'outcomeReasonCode',
                datatype: 'lov',domain:'MOVE_CANC_RS',
                editable: true, width: 150
              },

              {
                fieldName: this.translateService.translate('oiivisit.comment'), 
                field: 'commentText', datatype: 'text', uppercase: 'false' ,editable: true, pinned: true, width:200 , maxlength: 240,tooltip: true
              },
        ];
        this.offImpColumnDef = [
            {
                fieldName: this.translateService.translate('oiivisit.visitorid'), field: 'visitorId',
                editable: false, width: 200
            },
            {
                fieldName: this.translateService.translate('oiivisit.visitortype'), field: 'visitorType',
                editable: false, width: 250
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
                editable: false, width: 250
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
                editable: false, width: 250
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName',
                editable: false, width: 220
            },
            { fieldName: this.translateService.translate('oiivisit.relation'), field: 'relationship', editable: false, width: 230 },
        ];

        this.oiivisitFactory.rgAgyLocationsRecordGroup(this.sessionManager.currentCaseLoad).subscribe(data => {
			if (data.length === 0) {
                this.agyLovData = new Map<string, string>();
			} else {
				this.agyLovData = data;
			}
		});
    }
    onRowClickoffvis(event) {
        this.offimpData = [];
        if ( event ) {
            this.offvisModel = new VOffenderVisitDetails();
            this.offvisModel = event;
            this.applyAllClicked =false;
            this.offImpExecuteQuery();
        }
    }
    onRowClickoffimp(event) {
    }
    ok() {
    }
    no() {
    }
   
    onButClearClick() {
        this.offvisModelTemp = new VOffenderVisitDetails();
        this.offvisModelTemp.fromDate= DateFormat.getDate();
        this.readOnlyFlag = true;
        this.clearDisabled =true;
        this.namesReadOnly = false;
        this.retriveDisabled = false;
        this.applyToAllDisable = true;
        this.selectAll = false;
        this.offimpData = [];
        this.offvisData = [];
    }

    onModelClick(event) {
    if ( this.offvisModelTemp.offenderIdDisplay ) {
     this.readOnlyFlag = false;
    } else if ( this.offvisModelTemp.lastName ) {
        this.readOnlyFlag = false;
    } else {
        this.readOnlyFlag = true;
    }
    }

    onButRetrieveClick() {
    if ( !this.offvisModelTemp.offenderIdDisplay && !this.offvisModelTemp.lastName && !this.offvisModelTemp.livingUnitDesc &&
        !this.offvisModelTemp.visitDate && !this.offvisModelTemp.internalLocationDesc ) {
        this.type = 'warn';
        this.message = this.translateService.translate('oiivisit.pleasequeryonatleastoneofthefollowing') + ' ' +
         this.translateService.translate('common.Orca2') +
        ' , ' + this.translateService.translate('oiivisit.lastnamehousinglocationvisitlocationordate');
        this.show();
        return;
    }
    this.offvisData = [];
    this.offVisExecuteQuery();
    }

    /**
     * To display the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];

    }

    /**
    * This function loads the data into the Master Record and its child records
    */
    offImpExecuteQuery() {
        const serviceObj = this.oiivisitFactory. offImpExecuteQuery(this.offvisModel);
        serviceObj.subscribe(offimpResultList => {
            if (offimpResultList.length === 0) {
                this.offimpData = [];
                this.offimpIndex = -1;
            } else {
                this.offimpData = offimpResultList;
                this.offimpModel = offimpResultList[0];
                this.offimpIndex = 0;
            }
        });
    }

    //  execute query
    offVisExecuteQuery() {
        if(!this.offvisModelTemp.facility){
            this.type = 'warn';
            this.message = this.translateService.translate('oiivisit.facilitymustbeentered');
            this.show();
            return;
        }

        if(!this.offvisModelTemp.fromDate){
            this.type = 'warn';
            this.message = this.translateService.translate('oiivisit.datefrommustbeentered');
            this.show();
            return;
        }

        if(this.offvisModelTemp.toDate){
            if(DateFormat.compareDate(DateFormat.getDate(this.offvisModelTemp.toDate),DateFormat.getDate(this.offvisModelTemp.fromDate)) === -1 ){
                this.type = 'warn';
                this.message = this.translateService.translate('oiivisit.datetomustbeequaltoorlaterthandatefrom');
                this.show();
                return;
            }
        }
        if(this.offvisModelTemp.timeSlotSeq && !this.offvisModelTemp.dayOfTheWeek){
            this.type = 'warn';
            this.message = this.translateService.translate('oiivisit.dayoftheweekmustbeselected');
            this.show();
            return;
        }
        if(this.offvisModelTemp.visitLocation){
            this.offvisModelTemp.visitInternalLocationId=Number(this.offvisModelTemp.visitLocation);
        }
        this.offvisModelTemp.caseloadId=this.sessionManager.currentCaseLoad;
        const serviceObj = this.oiivisitFactory.
            offVisExecuteQuery(this.offvisModelTemp);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oidscexm.querycausednorecords' );
                this.show();
                this.offvisData = [];
                this.offimpData = [];
                this.offvisIndex = -1;
                this.namesReadOnly = false;
                this.retriveDisabled = false;
                this.applyToAllDisable = true;
                this.clearDisabled =false;
            } else {
                // selectFlag
                data.forEach(e => {
                    e['selectFlag'] = false;
                });
                this.offvisData = data;
                this.offvisDataTemp = data;
                this.offvisModel = this.offvisData[0];
                this.offvisIndex = 0;
                this.clearDisabled =false;
                this.namesReadOnly = true;
                this.retriveDisabled = true;
                this.applyToAllDisable = false;
            }
        });
    }

    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    oiivisitdateFormat(dateValue) {
        if (dateValue !== undefined && dateValue.length > 0) {
            const newdate = dateValue.split('/');
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oiivisitSaveoffimpForm(event) {
        this.offimpInsertList = event.added;
        this.offimpUpdateList = event.updated;
        this.offimpDeleteList = event.removed;
        this.offimpCommitModel.insertList = [];
        this.offimpCommitModel.updateList = [];
        this.offimpCommitModel.deleteList = [];
        if (this.offimpInsertList.length > 0 || this.offimpUpdateList.length > 0) {
            for (let i = 0; i < this.offimpInsertList.length; i++) {
            }
            for (let i = 0; i < this.offimpUpdateList.length; i++) {
            }
            this.offimpCommitModel.insertList = this.offimpInsertList;
            this.offimpCommitModel.updateList = this.offimpUpdateList;
        }
        if (this.offimpDeleteList.length > 0) {
            for (let i = 0; i < this.offimpDeleteList.length; i++) {
            }
            this.offimpCommitModel.deleteList = this.offimpDeleteList;
        }
        const offimpSaveData = this.oiivisitFactory.offImpCommit(this.offimpCommitModel);
        offimpSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }


    seOffenderIdDisplay(event) {
        if (event) {
            this.offvisModelTemp.offenderIdDisplay = event.offenderIdDisplay;
            this.offvisModelTemp.offenderBookId = event.offenderBookId;
            this.offvisModelTemp.lastName = event.lastName;
        } else {
            this.offvisModelTemp.offenderIdDisplay = undefined;
            this.offvisModelTemp.offenderBookId = undefined;
            this.offvisModelTemp.lastName = undefined;
        }
    }


    
    onFacilitySelected(event) {
        if (event) {
            this.facilityList = event;
        }
    }

    agyLocChangeEvent(event) {
        if (event && event.code) {
           this.offvisModelTemp.facility = event.code;

           //this.oiivisitFactory.

           this.oiivisitFactory.rgVisitLocationWithoutDay(event.code).subscribe(data => {
			if (data.length === 0) {
                this.visitLocationLovData = new Map<string, string>();
			} else {
				this.visitLocationLovData = data;
			}
		    });

            this.oiivisitFactory.rgAgyVisitDayOfWeekRecordGroup(event.code).subscribe(data => {
                if (data.length === 0) {
                    this.dayOfTheWeekLovLovData = new Map<string, string>();
                } else {
                    this.dayOfTheWeekLovLovData = data;
                }
            });       
        } else {
            this.visitLocationLovData = undefined;
            this.dayOfTheWeekLovLovData = undefined;
            this.timeSlotLink = undefined;
        }
     }

     dayOfTheWeekChangeEvent(event) {
        if (event && event.code) {
           this.offvisModelTemp.dayOfTheWeek = event.code;

           this.oiivisitFactory.rgAgyVisitTimesRecRecordGroup(this.offvisModelTemp.facility,this.offvisModelTemp.dayOfTheWeek).subscribe(data => {
			if (data.length === 0) {
                this.timeSlotLovData = new Map<string, string>();
			} else {
				this.timeSlotLovData = data;
			}
		    });

           //this.timeSlotLink='oiivisit/rgAgyVisitTimesRecRecordGroup?agyLocId=' + this.offvisModelTemp.facility + '&weekDay=' + this.offvisModelTemp.dayOfTheWeek;
        } else {
            this.timeSlotLovData=undefined;
        }
     }

     timeSlotChangeEvent(event) {
        if (event && event.code) {
           this.offvisModelTemp.timeSlotSeq = event.code;

           this.oiivisitFactory.rgAgyVisitSlotsRecRecordGroup(this.offvisModelTemp.facility,this.offvisModelTemp.dayOfTheWeek,this.offvisModelTemp.timeSlotSeq).subscribe(data => {
			if (data.length === 0) {
                this.visitLocationLovData = new Map<string, string>();
			} else {
				this.visitLocationLovData = data;
			}
		    });

           //this.visitLocationLink='oiivisit/rgAgyVisitSlotsRecRecordGroup?agyLocId=' + this.offvisModelTemp.facility + '&weekDay=' + this.offvisModelTemp.dayOfTheWeek + '&timeSlotSeq=' + this.offvisModelTemp.timeSlotSeq ;
        } else {
            
            this.oiivisitFactory.rgVisitLocationWithoutDay(this.offvisModelTemp.facility).subscribe(data => {
                if (data.length === 0) {
                    this.visitLocationLovData = new Map<string, string>();
                } else {
                    this.visitLocationLovData = data;
                }
                });
            //this.visitLocationLink='oiivisit/rgVisitLocationWithoutDay?agyLocId=' + this.offvisModelTemp.facility;
        }
     }

     selectAllChkboxChange(event) {
        if (event.checked) {
            this.offvisData.forEach((e, i) => {
                this.visitsGrid.setColumnData('selectFlag', i, event.checked);
            });
        } else {
            this.offvisData.forEach((e, i) => {
                this.visitsGrid.setColumnData('selectFlag', i, undefined);
            });
        }
    }

    onApplyToAllClick() {
        this.applyAllClicked = true;
        let selectedCondCount = 0;
        this.offvisData.forEach((e, i) => {
            if (e.selectFlag) {   
                selectedCondCount += 1;
                    this.visitsGrid.setColumnData('visitStatus', i, this.visitStatus);
                    this.visitsGrid.setColumnData('outcomeReasonCode', i, this.outcomeReasonCode);
                    this.visitsGrid.setColumnData('commentText', i, this.commentText);
            }
            
        });
        if (selectedCondCount === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiivisit.selectatleastonevisitrecordbeforeapply');
            this.show();
            return;
        }
        this.applyToAllDisable = true;
    }

    offenderVisitsSaveForm(event) {
        this.offvisInsertList = event.updated;
        this.offvisUpdatetList = [];
        this.offvstCommitModel.updateList = [];
        let selectedCondCount = this.offvisData.filter(e => e.selectFlag).length;
        if (selectedCondCount === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiivisit.selectatleaseonevisitrecordbeforesave');
            this.show();
            return;
        }

        if (this.offvisInsertList.length > 0) {
            for (let i = 0; i < this.offvisInsertList.length; i++) {
                if (this.offvisInsertList[i].selectFlag) {
                    this.vOffenderVisitDetailsObj = new VOffenderVisits();
                    this.vOffenderVisitDetailsObj.offenderBookId = this.offvisInsertList[i].offenderBookId;
                    this.vOffenderVisitDetailsObj.offenderIdDisplay = this.offvisInsertList[i].offenderIdDisplay;
                    this.vOffenderVisitDetailsObj.offenderVisitId = this.offvisInsertList[i].offenderVisitId;
                    this.vOffenderVisitDetailsObj.outcomeReasonCode = this.offvisInsertList[i].outcomeReasonCode;
                    this.vOffenderVisitDetailsObj.visitStatus = this.offvisInsertList[i].visitStatus;
                    this.vOffenderVisitDetailsObj.commentText = this.offvisInsertList[i].commentText;
                    this.offvisUpdatetList.push(this.vOffenderVisitDetailsObj);
                }

            }
        }
        if (this.offvisUpdatetList.length > 0) {
            for (let i = 0; i < this.offvisInsertList.length; i++) {
                if(!this.offvisInsertList[i].visitStatus){
                    this.type = 'warn';
                    this.message = this.translateService.translate('oiivisit.visitstatusmustbeentered');
                    this.show();
                    return;
                }
                if(this.offvisInsertList[i].visitStatus === 'CANC' && !this.offvisInsertList[i].outcomeReasonCode){
                    this.type = 'warn';
                    this.message = this.translateService.translate('oiivisit.cancelreasonmustbeentered');
                    this.show();
                    return;
                };
            } 
            this.offvstCommitModel.updateList = this.offvisUpdatetList;
            const sencalcSaveData = this.oiivisitFactory.offenderVisitsSaveForm(this.offvstCommitModel);
            sencalcSaveData.subscribe(data => {
                if (data === 1) {
                    this.visitStatus = undefined;
                    this.outcomeReasonCode = undefined;
                    this.commentText = undefined;
                    this.selectAll = false;
                    this.type = 'success'
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.offVisExecuteQuery();
                    return;
                } else {
                    this.type = 'warn'
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                }
            });
        }
    }


    isInsertable() {
        if(this.offvisModelTemp){
            const value = DateFormat.parse(DateFormat.format(this.offvisModelTemp.fromDate));
            this.offvisModelTemp.fromDate = value;
        }
        if(this.offvisModelTemp.toDate){
            const value = DateFormat.parse(DateFormat.format(this.offvisModelTemp.toDate));
            this.offvisModelTemp.toDate = value;
        }
        if (this.offvisModelTemp.facility || this.offvisModelTemp.fromDate || this.offvisModelTemp.toDate 
            || this.offvisModelTemp.dayOfTheWeek
            || this.offvisModelTemp.timeSlotSeq || this.offvisModelTemp.visitLocation || 
            this.offvisModelTemp.visitStatus || this.offvisModelTemp.offenderIdDisplay) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
      
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event && event.field === 'selectFlag') {

            let transferFlagCount = this.offvisData.filter(e => e.selectFlag).length;
            if (transferFlagCount === this.offvisData.length) {
                this.selectAll = true;
            } else {
                this.selectAll = false;
            }
            rowdata.validated = true;
            return rowdata;
        }
        if (event && event.field === 'visitStatus' && event.data.visitStatus) {
            if(!this.applyAllClicked){
                this.visitsGrid.setColumnData('commentText', event.rowIndex, undefined);  
                this.visitsGrid.setColumnData('outcomeReasonCode', event.rowIndex, undefined);               
            }
            rowdata.validated = true;
            return rowdata;
        }

        rowdata.validated = true;
        return rowdata;
    }

    onGridClear = () => {
        this.selectAll = false;
        this.applyToAllDisable = false;
        this.visitStatus = undefined;
        this.outcomeReasonCode = undefined;
        this.commentText = undefined;
        this.applyAllClicked = false;
        this.offVisExecuteQuery();
        return true;
    }

    isStatusChange() {
        this.commentText = undefined;
        this.outcomeReasonCode   = undefined;
    }
}
