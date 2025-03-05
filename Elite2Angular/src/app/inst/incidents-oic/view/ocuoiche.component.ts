import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuoicheService } from '../service/ocuoiche.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidoicusService } from '../service/oidoicus.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { Global } from '@core/classes/Global';
import { OicHearingsCommitBean } from '@instincidentsbeans/OicHearingsCommitBean';
import { OicHearings } from '@instincidentsbeans/OicHearings';
import { OicHearingResults } from '@instincidentsbeans/OicHearingResults';
import { OicHearingResultsCommitBean } from '@instincidentsbeans/OicHearingResultsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OcuoicchService } from '../service/ocuoicch.service';
import { OicOffences } from '@instincidentsbeans/OicOffences';
import { StaffMembers } from '@instincidentsbeans/StaffMembers';
import { VOicIncidents } from '@instoicbeans/VOicIncidents';
import { OffenderOicSanctions } from '@instoicbeans/OffenderOicSanctions';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { Router } from '@angular/router';
import { EoffenderService } from '@common/iwp/service/eoffender.service';

@Component( {
    selector: 'app-ocuoiche',
    templateUrl: './ocuoiche.component.html'
} )

export class OcuoicheComponent implements OnInit {
    checkHearingDate: boolean;
    @ViewChild('oicHearingGrid') oicHearingGrid: any;
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    oichearData: OicHearings[] = [];
    oichearDataTemp: OicHearings[] = [];
    oichearModel: OicHearings = new OicHearings();
    oichearIndex = -1;
    oichearInsertList: OicHearings[] = [];
    oichearUpdateList: OicHearings[] = [];
    oichearDeleteList: OicHearings[] = [];
    oichearDeleteListTemp: OicHearings[] = [];
    oichearresData: OicHearingResults[] = [];
    oichearresDataTemp: any[] = [];
    oichearresModel: OicHearingResults = new OicHearingResults();
    oichearresModelTemp: OicHearingResults = new OicHearingResults();
    oichearresIndex = -1;
    oichearresInsertList: OicHearingResults[] = [];
    oichearresUpdateList: OicHearingResults[] = [];
    oichearresDeleteList: OicHearingResults[] = [];
    checkTime: boolean;
    display: boolean;
    resBool: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: true;
    rgoffencecodeRg: any[] = [];
    rgagyincpstaffidRg: any[] = [];
    rghearingtypeRg: any[] = [];
    rginternallocationsRg: any[] = [];
    rgincidentchargesRg: any[] = [];
    rgfindingRg: any[] = [];
    rgpleaRg: any[] = [];
    hearColumnDefs: any[] = [];
    hearReultsColumnDefs: any[] = [];
    vHeaderBlockModel: VHeaderBlock;
    index: number;
    translateLabel: any;
    hearResultsTemp: OicHearingResults = new OicHearingResults();
    oichearCommitModel: OicHearingsCommitBean = new OicHearingsCommitBean();
    oichearresCommitModel: OicHearingResultsCommitBean = new OicHearingResultsCommitBean();
    type = 'error';
    staffData: StaffMembers[] = [];
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    incidentDateValue: any;
    agencyIncidentId: any;
    caseLoadId: any;
    checkFlag: boolean;
    checkFlagRow: boolean;
    checkResultFlag: boolean;
    vOicIncidentsModel: VOicIncidents = new VOicIncidents();
    oicOffenceId: any;
    time: any;
    oicHearingId: any;
    oicOffencesData: OicOffences[] = [];
    oicOffencesTempData: OicOffences[] = [];
    oicsancModel: OffenderOicSanctions = new OffenderOicSanctions();
    butHearInsert: boolean;
    butResInsert = false;
    chargeSeq: any;
    staffModel: StaffMembers = new StaffMembers();
    locationOptions: any[] = [];
    resultGridDelete= false;
    hearingsGridDelete = false;

    constructor( private oidoicusFactory: OidoicusService, private ocuoicheFactory: OcuoicheService,
        public translateService: TranslateService, private sessionManager: UserSessionManager,
        public dialogService: DialogService, private ocuoicchFactory: OcuoicchService,private eoffenderService: EoffenderService,
        private router: Router  ) {
    }
    ngOnInit() {
        this.checkHearingDate = false;
        this.agencyIncidentId = this.dialog.data.agencyIncidentId;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.incidentDateValue = DateFormat.getDate( this.dialog.data.incidentDate );
        this.hearColumnDefs = [
            {
                fieldName: this.translateService.translate( 'ocuoiche.hearingtype' ) + '*', field: 'oicHearingType',
                datatype: 'lov', domain: 'OIC_HEAR', editable: true, width: 150, optionWidth: 300
            },
            {
                fieldName: this.translateService.translate( 'ocuoiche.hearingdate' ) + '*', field: 'hearingDate',
                datatype: 'date', maxlength: 11, editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate( 'common.time' ) + '*', field: 'hearingTime', maxlength: 5,
                datatype: 'time', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate( 'common.location' ) + '*', field: 'internalLocationIdDes',
                datatype: 'lov', optionWidth: 300, editable: true, width: 150, titles: {description: 'Description'},
                link: 'ocuoiche/rgInternalLocationsRecordGroup?caseloadId=' + this.caseLoadId,source:'OIMULOCA'
            },
            {
                fieldName: this.translateService.translate( 'ocuoiche.heardby' ), field: 'hearingStaffIdDes', datatype: 'text',
                editable: true, width: 200, optionWidth: 300, /*link: 'ocuoiche/rgAgyIncpStaffIdRecordGroup?caseloadId=' + this.caseLoadId,
                codeTitle: 'Staff ID', descTitle: 'Last Name, First Name' , field: 'hearingStaffIdDes'*/
            },
            { fieldName: '', field: 'hearByBtn', datatype: 'hyperlink', displayas: 'href', styleClass: 'search', link: '/oimuheby', data: 'row',
                modal: true, width: 50, dialogWidth: '80' , updateField: 'row'
            },
            {
                fieldName: this.translateService.translate( 'ocuoiche.otherrepresentatives' ), field: 'representativeText',
                datatype: 'text', uppercase: 'false', maxlength: 240, editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate( 'common.comment' ), field: 'commentText', editable: true,
                datatype: 'text', uppercase: 'false', maxlength: 240, width: 150
            },
            {
                fieldName: 'Hearing Id', field: 'hearingStaffId', 
                datatype: 'number', hide:true
              },
        ];

        this.hearReultsColumnDefs = [
            {
                fieldName: this.translateService.translate( 'ocuoiche.originalcharge' ) + '*', field: 'oicOffenceCode', datatype: 'text',
                editable: true, width: 150
            },
            {
                fieldName: '', field: 'button', datatype: 'hyperlink', displayas: 'href', styleClass: 'search', link: '/ocuoicpe', data: 'row',
                updateField: 'row', modal: true, width: 150, dialogWidth: '70', onLaunchClick: this.originalChargeClick
            },
            { fieldName: this.translateService.translate( 'common.type' ), field: 'type', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate( 'ocuoiche.offensedescription' ), field: 'chargeDescription',
                editable: false, width: 180, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate( 'ocuoiche.resultingcharge' ), field: 'resultOicOffenceCode',
                editable: true, width: 150,required : true,datatype: 'text'
            },
            {
                fieldName: '', field: 'button1',datatype: 'hyperlink', displayas: 'href', styleClass: 'search', link: '/oimoicoidialog', data: 'row',
                updateField: 'row', modal: true, width: 150, dialogWidth: '70'
            },
            { fieldName: this.translateService.translate( 'common.type' ), field: 'typeResult', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate( 'ocuoiche.offensedescription' ), field: 'chargeDescriptionResult',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate( 'ocuoiche.plea' ) + '*', field: 'pleaFindingCode', datatype: 'lov',
                domain: 'OIC_PLEA', editable: true, width: 150, optionWidth: 550
            },
            {
                fieldName: this.translateService.translate( 'ocuoiche.finding' ) + '*', field: 'findingCode',
                datatype: 'lov', domain: 'OIC_FINDING', editable: true, width: 150, optionWidth: 400
            },
            { fieldName: '', field: 'disp', datatype: 'launchbutton', link: '/ocuoicaw', data: 'row',
             modal: true, width: 150, dialogWidth: '80' },
            { fieldName: '', field: 'oicOffenceId', hide: true },
            { fieldName: '', field: 'oicResultOffenceId', hide: true },
        ];

        this.staffModel = new StaffMembers();
        this.staffModel.workingCaseloadId = this.caseLoadId;
        const serviceObj = this.ocuoicheFactory.rgAgyIncpStaffIdRecordGroup( this.staffModel );
        serviceObj.subscribe( list1 => {
            this.staffData = list1;
        } );
        const locationValues = this.ocuoicheFactory.rgInternalLocationsRecordGroup( this.caseLoadId );
        locationValues.subscribe( locationList => {
            locationList.forEach(listval => {
                this.locationOptions.push({ 'text': listval.description, 'id': listval.code });
            });
        } );

        this.vOicIncidentsModel = new VOicIncidents;
        this.vOicIncidentsModel.incidentDate = DateFormat.getDate( this.dialog.data.incidentDate );
        this.vOicIncidentsModel.agencyIncidentId = this.dialog.data.agencyIncidentId;
        this.vOicIncidentsModel.partySeq = this.dialog.data.partySeq;
        const serviceObj1 = this.ocuoicchFactory.rgOffenceCodeRecordGroup( this.vOicIncidentsModel );
        serviceObj1.subscribe( list1 => {
            this.oicOffencesData = list1;
        } );

        const incidentChargesResult = this.ocuoicheFactory.rgIncidentChargesRecordGroup( this.vOicIncidentsModel );
        incidentChargesResult.subscribe( incichgResultList => {
            this.oicOffencesTempData = incichgResultList;
        } );
        this.vHeaderBlockModel = new VHeaderBlock();
        if ( Global.offender !== undefined ) {
            this.vHeaderBlockModel = Global.offender;
        }
        this.checkFlag = true;
        this.ocuoicheExecuteQuery();
    }

    ocuoicheExecuteQuery() {
        this.oichearModel = this.dialog.data;
        this.oichearModel.hearingDate = DateFormat.getDate();
        if ( this.oichearModel.oicIncidentId != null ) {
            const serviceObj = this.ocuoicheFactory.oicHearExecuteQuery( this.oichearModel );
            serviceObj.subscribe( data => {
                if ( data.length === 0 ) {
                    this.butHearInsert = true;
                    this.oichearData = [];
                this.butResInsert = false;
                } else {
                    for ( let i = 0; i < data.length; i++ ) {
                        data[i].hearByBtn = '...';
                    }
                    this.oichearData = data;
                    this.oichearIndex = 0;
                    this.butHearInsert = true;
                this.butResInsert = true;
                }
            } );
        }
    }

    /**
       * This function loads the data into the Master Record and its child records
       */
      oicHearResExecuteQuery() {
        const serviceObj = this.ocuoicheFactory.oicHearResExecuteQuery( this.oichearresModel );
        serviceObj.subscribe( data => {
            if (data.length === 0) {
                this.oichearresData = [];
                this.oichearresDataTemp = [];
            } else {
                for (let i = 0; i < data.length; i++) {
                    //data[i].button = '..';
                   // data[i].button1 = '..';
                    data[i].disp = this.translateService.translate('ocuoiche.disciplines'); 
                    data[i].incidentDate = DateFormat.getDate(this.dialog.data.incidentDate);
                    this.oichearresDataTemp.push( data[i].oicOffenceId );
                    data[i].partySeq = this.dialog.data.partySeq;
                    data[i].oicIncidentId=this.dialog.data.oicIncidentId;
                }
                this.oichearresIndex = 0;
                this.oichearresData = data;
            }
        } );
    }

    onRowClickOicHear( event ) {
        if (event) {
            if (event.createDateTime) {
                this.hearingsGridDelete = true;
                this.eoffenderService.selectedRowData=event;
                this.eoffenderService.selectedRowData['agencyIncidentId']=this.dialog.data.agencyIncidentId;
            } else {
                this.hearingsGridDelete = false;
                this.eoffenderService.selectedRowData=null;
            }
        this.ocuoicheFactory.hearingdata = event;
        this.ocuoicheFactory.hearingdate = event.hearingDate;
        this.oicHearingId = event.oicHearingId;
        this.oichearresModel = new OicHearingResults();
        this.oichearresModel.oicHearingId = event.oicHearingId;
        this.oicHearResExecuteQuery();
        }else{
            this.eoffenderService.selectedRowData=null;
        }

    }

    saveHearings( event ) {
        this.oichearInsertList = event.added;
        this.oichearUpdateList = event.updated;
        this.oichearDeleteList = event.removed;

        this.oichearCommitModel.insertList = [];
        this.oichearCommitModel.deleteList = [];

        for ( let i = 0; i < this.oichearInsertList.length; i++ ) {
            if ( !this.oichearInsertList[i].oicHearingType ) {
                this.message = this.translateService.translate( 'ocuoiche.hearingtypemust' );
                this.type = 'warn';
                this.show();
                return null;
            }
             if ( !this.oichearInsertList[i].hearingDate ) {
                this.message = this.translateService.translate( 'ocuoiche.datemust' );
                 this.type = 'warn';
                this.show();
                return null;
            }        
            if ( !this.oichearInsertList[i].hearingTime ) {
                this.message = this.translateService.translate( 'ocuoiche.hearingtimemust' );
                 this.type = 'warn';
                this.show();
                return null;
            }
            const hearingTime = DateFormat.getDate(this.oichearInsertList[i].hearingTime).getHours() + ':' + DateFormat.getDate(this.oichearInsertList[i].hearingTime).getMinutes();

           // this.oichearInsertList[i].hearingTime = TimeFormat.parse(hearingTime,
              //  this.oichearInsertList[i].hearingDate);
               
            if (this.oichearInsertList[i].hearingTime) {
                if ( !this.oichearInsertList[i].hearingDate ) {
                this.message = this.translateService.translate('ocuoichn.enterahearidatetoqueryonthehearingtime');
                 this.type = 'warn';
                this.show();
                return;
                }
            }
             if ( !this.oichearInsertList[i].internalLocationIdDes ) {
                this.message = this.translateService.translate( 'ocuoiche.locationmust' );
                 this.type = 'warn';
                this.show();
                return null;
            }
            if ( this.oichearInsertList[i].createUserId === undefined ) {
                this.oichearInsertList[i].createUserId = this.sessionManager.getId();
                this.oichearInsertList[i].oicIncidentId = this.dialog.data.oicIncidentId;
                this.oichearInsertList[i].createDatetime = DateFormat.getDate();
            }
        }
        for (let i = 0; i < this.oichearUpdateList.length; i++) {
            //this.oichearUpdateList[i].hearingDate = DateFormat.getDate(this.oichearUpdateList[i].hearingDate);
            // const dateHearingTime = DateFormat.getDate(this.oichearUpdateList[i].hearingTime);
            // const hearingTime = dateHearingTime.getHours() + ':' + dateHearingTime.getMinutes();
            // this.oichearUpdateList[i].hearingTime = TimeFormat.parse(hearingTime,
            //     this.oichearUpdateList[i].hearingDate);
             if ( !this.oichearUpdateList[i].oicHearingType ) {
                this.message = this.translateService.translate( 'ocuoiche.hearingtypemust' );
                this.type = 'warn';
                this.show();
                return null;
            }
             if ( !this.oichearUpdateList[i].hearingDate ) {
                this.message = this.translateService.translate( 'ocuoiche.datemust' );
                 this.type = 'warn';
                this.show();
                return null;
            }
                     
            if ( !this.oichearUpdateList[i].hearingTime ) {
                this.message = this.translateService.translate( 'ocuoiche.hearingtimemust' );
                 this.type = 'warn';
                this.show();
                return null;
            }
           const hearingTime = DateFormat.getDate(this.oichearUpdateList[i].hearingTime).getHours() + ':' + DateFormat.getDate(this.oichearUpdateList[i].hearingTime).getMinutes();

            this.oichearUpdateList[i].hearingTime = TimeFormat.parse(hearingTime,
                this.oichearUpdateList[i].hearingDate);            

            if (this.oichearUpdateList[i].hearingTime) {
                if ( !this.oichearUpdateList[i].hearingDate ) {
                this.message = this.translateService.translate('ocuoichn.enterahearidatetoqueryonthehearingtime');
                 this.type = 'warn';
                this.show();
                return;
                }
            }
             if ( !this.oichearUpdateList[i].internalLocationIdDes ) {
                this.message = this.translateService.translate( 'ocuoiche.locationmust' );
                 this.type = 'warn';
                this.show();
                return null;
            }
           
        }
        this.oichearCommitModel.insertList = this.oichearInsertList;
        this.oichearCommitModel.updateList = this.oichearUpdateList;
        if(this.oichearDeleteList.length>0 ) {
            // this.oichearDeleteListTemp.push( new OicHearings() );
            // this.oichearDeleteListTemp[i].oicHearingId = this.oichearDeleteList[i].oicHearingId;
            this.oichearCommitModel.deleteList = this.oichearDeleteList;
        }
        const oichearSaveData = this.ocuoicheFactory.oicHearCommit( this.oichearCommitModel );
        oichearSaveData.subscribe( data => {

            if (String(data[0].errorMessage).indexOf('OIC_HEARING_RESULTS_UK') > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('This result of this offence has already been entered for the hearing.');
                this.show();
                this.ocuoicheExecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('OIC_OS_OIC_HR_FK1') > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('There is an Award for this result, unable to delete Result.');
                this.show();
                this.ocuoicheExecuteQuery();
                return;
            }
            if (data[0] && data[0].listSeq === 1) {
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                //this.oichearData = oichearSaveResult;
                this.show();
                this.ocuoicheExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                //this.oichearData = oichearSaveResult;
                this.show();
                this.ocuoicheExecuteQuery();
                return;
            }


            // if ( oichearSaveResult === 1 ) {
            //     this.type = 'success';
            //     this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
            //     this.oichearData = oichearSaveResult;
            //     this.show();
            //     this.ocuoicheExecuteQuery();
            // } else {
            //     this.type = 'warn';
            //     this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
            //     this.oichearData = oichearSaveResult;
            //     this.show();
            //     this.ocuoicheExecuteQuery();
            // }
        } );

    }

    saveHearingResults( event ) {
        this.oichearresInsertList = event.added;
        this.oichearresUpdateList = event.updated;
        this.oichearresDeleteList = event.removed;

        this.oichearresCommitModel.insertList = [];
        this.oichearresCommitModel.updateList = [];
        this.oichearresCommitModel.deleteList = [];

        
        for ( let i = 0; i < this.oichearresInsertList.length; i++ ) {
            this.oichearresInsertList[i].createDatetime = DateFormat.getDate();
            this.oichearresInsertList[i].createUserId = this.sessionManager.getId();
            this.oichearresInsertList[i].oicHearingId = this.oicHearingId;
            if ( !this.oicHearingId ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocuoiche.savehearingsfirst' );
                this.show();
                return;
            } else if ( !this.oichearresInsertList[i].oicHearingId ) {
                this.oichearresInsertList[i].oicHearingId = this.oicHearingId;
            }
            if ( !this.oichearresInsertList[i].oicOffenceCode ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocuoiche.originalchargemust' );
                this.show();
                return;
            }
            if ( !this.oichearresInsertList[i].resultOicOffenceCode ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocuoiche.resultingchargemust' );
                this.show();
                return;
            }
            if ( !this.oichearresInsertList[i].pleaFindingCode ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocuoiche.pleamust' );
                this.show();
                return;
            }
            if ( !this.oichearresInsertList[i].findingCode ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocuoiche.findingmust' );
                this.show();
                return;
            }

        }
        if(this.oichearresUpdateList.length>0){
            for ( let i = 0; i < this.oichearresUpdateList.length; i++ ) {
                if ( !this.oichearresUpdateList[i].oicOffenceCode ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocuoiche.originalchargemust' );
                    this.show();
                    return;
                }
                if ( !this.oichearresUpdateList[i].resultOicOffenceCode ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocuoiche.resultingchargemust' );
                    this.show();
                    return;
                }
                if ( !this.oichearresUpdateList[i].pleaFindingCode ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocuoiche.pleamust' );
                    this.show();
                    return;
                }
                if ( !this.oichearresUpdateList[i].findingCode ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocuoiche.findingmust' );
                    this.show();
                    return;
                }
                }
        }
        
        for ( let i = 0; i < this.oichearresData.length; i++ ) {
            for ( let j = 0; j < this.oichearresData.length; j++ ) {
                if ( i !== j ) {
                    if ( this.oichearresData[i].chargeSeq === this.oichearresData[j].chargeSeq ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'ocuoiche.duplicateresultforhearing' );
                        this.show();
                        return null;
                    }
                }
            }
        }

        this.oichearresCommitModel.insertList = this.oichearresInsertList;
        this.oichearresCommitModel.updateList = this.oichearresUpdateList;
        this.oichearresCommitModel.deleteList = this.oichearresDeleteList;
        const oichearresSaveData = this.ocuoicheFactory.oicHearResCommit( this.oichearresCommitModel );
        oichearresSaveData.subscribe( oichearresSaveResult => {
            if ( !oichearresSaveResult ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.oichearresData = oichearresSaveResult;
                this.show();
                this.oicHearResExecuteQuery();
            } else {
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.oichearresData = oichearresSaveResult;
                this.show();
                this.oicHearResExecuteQuery();
            }
        } );
    }

    onRowClickOicHearRes( event ) {
        this.ocuoicheFactory.offenderBookId  =   this.dialog.data.offenderBookId;
        this.ocuoicheFactory.partySeq =  this.dialog.data.partySeq;
        this.oichearresModel = event;
        this.ocuoicheFactory.data = event;
        if (event && event.createDatetime) {
            this.resultGridDelete = true;
        } else {
            this.resultGridDelete = false;
        }
        if ( this.oichearresModel ) {
            this.oicsancModel.oicHearingId = this.oichearresModel.oicHearingId;
            this.oicsancModel.resultSeq = this.oichearresModel.resultSeq;
            const oicsancResult = this.ocuoicheFactory.oicSancExecuteQuery(this.oicsancModel);
            oicsancResult.subscribe(oicsancResultList => {
                if (oicsancResultList.length > 0 ) {
                    this.resBool =  false;
                } else {
                    this.resBool =  true;
                }
            });
        } else {
            this.resBool = true;
        }
    }

    /**
    * This function auto generates .., disp
    */
    onResultsInsert = () => {
        for ( let i = 0; i < this.oichearData.length; i++ ) {
        if (this.oichearData && this.oichearData[i].oicHearingId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoiche.insertofresults');
            this.show();
            return;
        }

    }
        if (!this.oichearData && this.oichearData.length === 0) {
            this.oichearresData = [];
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoiche.insertofresults');
            this.show();
            return;

        }
        if (!this.oichearData && this.oichearData.length === 0) {
            this.oichearresData = [];
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoiche.queryofresults');
            this.show();
            return;

        }
        if (this.oichearresData.length > 0) {
            if ( !this.oichearresData[this.oichearresData.length - 1].oicOffenceId ) {
                this.message = this.translateService.translate( 'ocuoiche.originalchargemust' );
                this.show();
                return null;
            }
            if ( !this.oichearresData[this.oichearresData.length - 1].oicResultOffenceId ) {
                this.message = this.translateService.translate( 'ocuoiche.resultingchargemust' );
                this.show();
                return null;
            }
            if ( !this.oichearresData[this.oichearresData.length - 1].pleaFindingCode ) {
                this.message = this.translateService.translate( 'ocuoiche.pleamust' );
                this.show();
                return null;
            }
            if ( !this.oichearresData[this.oichearresData.length - 1].findingCode ) {
                this.message = this.translateService.translate( 'ocuoiche.findingmust' );
                this.show();
                return null;
            }
        }
        for ( let i = 0; i < this.oichearresData.length; i++ ) {
            for ( let j = 0; j < this.oichearresData.length; j++ ) {
                if ( i !== j ) {
                    if ( this.oichearresData[i].chargeSeq === this.oichearresData[j].chargeSeq ) {
                        this.message = this.translateService.translate( 'ocuoiche.duplicateresultforhearing' );
                        this.show();
                        return null;
                    }
                }
            }
        }
        this.oichearresModelTemp = new OicHearingResults();
        this.oichearresModelTemp.incidentDate = this.dialog.data.incidentDate;
        this.oichearresModelTemp.partySeq = this.dialog.data.partySeq;
        this.oichearresModelTemp.chargeSeq = 0;
        return {
            button: '',button1:'', scription:'',agencyIncidentId: this.agencyIncidentId, incidentDate: this.incidentDateValue,
            chargeSeq: this.oichearresModelTemp.chargeSeq, oicOffenceCode: undefined, type: undefined, dspCategory: '', chargeDescription: undefined,
            oicOffenceId: this.oichearresModelTemp.oicOffenceId, resultOicOffenceCode: undefined, typeResult: undefined,
            chargeDescriptionResult: undefined, oicResultOffenceId: this.oichearresModelTemp.oicResultOffenceId,
            oicHearingId: this.oichearresModelTemp.oicHearingId, incidentdate: this.oichearresModelTemp.incidentDate,
            partySeq: this.oichearresModelTemp.partySeq
        };
    }

    chargesEvent = ( event ) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.checkFlag = false;
        this.checkResultFlag = false;
        // this.chargeSeq = event.data.chargeSeq;
        if ( event.field === 'oicOffenceCode' ) {
            for ( let i = 0; i < this.oicOffencesTempData.length; i++ ) {
                if ( event.newValue === this.oicOffencesTempData[i].oicOffenceCode ) {
                    rowdata.validated = true;
                    this.checkFlag = true;
                    // if ( !this.chargeSeq ) {
                        this.chargeSeq = this.oicOffencesTempData[i].chargeSeq;
                    // }
                    this.index = this.oichearresData.indexOf( event.data );
                    this.oichearresData[this.index].oicOffenceId = this.oicOffencesTempData[i].oicOffenceId;
                    this.oichearresData[this.index].chargeSeq = this.oicOffencesTempData[i].chargeSeq;
                    rowdata.data = {
                        chargeDescription: this.oicOffencesTempData[i].description,
                        type: this.oicOffencesTempData[i].oicOffenceType,
                        chargeSeq: this.chargeSeq,
                        oicOffenceCode: this.oicOffencesTempData[i].oicOffenceCode,
                        oicOffenceId: this.oicOffencesTempData[i].oicOffenceId
                    };
                    return rowdata;
                }
            }
            if ( !this.checkFlag ) {
                this.index = 0;
                this.index = rowIndex;
                if ( this.oicOffencesTempData.length > 0 ) {
                    this.dialogService.openLinkDialog( '/ocuoicpe', event.data ).subscribe( result => {
                        this.oichearresData[this.index].oicOffenceCode = result.oicOffenceCode;
                        this.oichearresData[this.index].type = result.type;
                        this.oichearresData[this.index].chargeDescription = result.chargeDescription;
                        this.oichearresData[this.index].oicOffenceId = result.oicOffenceId;
                        this.oichearresData[this.index].chargeSeq = result.chargeSeq;
                    } );
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.listofvalues');
                    this.show();
                    rowdata.validated = true;
                    rowdata.data = { oicOffenceCode : undefined };
                }
                rowdata.validated = true;
            }
        }
        if ( event.field === 'resultOicOffenceCode' ) {
            for ( let i = 0; i < this.oicOffencesData.length; i++ ) {
                if ( event.newValue === this.oicOffencesData[i].oicOffenceCode ) {
                    rowdata.validated = true;
                    this.checkResultFlag = true;
                    rowdata.data = {
                        typeResult: this.oicOffencesData[i].oicOffenceType, chargeDescriptionResult: this.oicOffencesData[i].description,
                        oicResultOffenceId: this.oicOffencesData[i].oicOffenceId
                    };
                    return rowdata;
                }
            }
            if ( !this.checkResultFlag ) {
                this.index = 0;
                this.index = rowIndex;
                this.dialogService.openLinkDialog( '/oimoicoidialog', event.data ).subscribe( result => {
                    this.oichearresData[this.index].resultOicOffenceCode = result.resultOicOffenceCode;
                    this.oichearresData[this.index].typeResult = result.typeResult;
                    this.oichearresData[this.index].chargeDescriptionResult = result.chargeDescriptionResult;
                    this.oichearresData[this.index].oicResultOffenceId = result.oicResultOffenceId;
                } );
                rowdata.validated = true;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridDelete = () => {
        if ( this.oichearresData.length > 0 ) {
            this.type='warn'
            this.message = this.translateService.translate( 'ocuoiche.hearingdelete' );
            this.show();
            return false;
        } else {
            return true;
        }
    }

    onHearResDelete = () => {
        if ( this.resBool ===  false ) {
            this.type='warn'
            this.message = this.translateService.translate( 'ocuoiche.hearingresdelete' );
            this.show();
        }
        return this.resBool;
    }

    onHearingsInsert = () => {
            if ( this.oichearData.length > 0 ) {
                if ( !this.oichearData[this.oichearData.length - 1].oicHearingType ) {
                    this.message = this.translateService.translate( 'ocuoiche.hearingtypemust' );
                    this.show();
                    return null;
                }
                if ( !this.oichearData[this.oichearData.length - 1].internalLocationIdDes ) {
                    this.message = this.translateService.translate( 'ocuoiche.locationmust' );
                    this.show();
                    return null;
                }
                if ( !this.oichearData[this.oichearData.length - 1].hearingDate ) {
                    this.message = this.translateService.translate( 'ocuoiche.locationmust' );
                    this.show();
                    return null;
                }
                if ( !this.oichearData[this.oichearData.length - 1].hearingDate ) {
                    this.message = this.translateService.translate( 'ocuoiche.datemust' );
                    this.show();
                    return null;
                }

                if (!this.oichearData[this.oichearData.length - 1].hearingTime) {
                    this.message = this.translateService.translate('ocuoiche.hearingtimemust');
                    this.show();
                    return null;
                }
                if (this.oichearData[this.oichearData.length - 1].hearingTime) {
                    if ( !this.oichearData[this.oichearData.length - 1].hearingDate ) {
                    this.message = this.translateService.translate('ocuoichn.enterahearidatetoqueryonthehearingtime');
                    this.show();
                    return null;
                    }
                }
        }
        return { hearByBtn: '', hearingStaffIdDes: '',
            hearingStaffId: '',
            hearingDate: DateFormat.getDate(), hearingTime: DateFormat.getDate() };

    }

    ocuoicheResExecuteQueryTemp() {
        const oichearresResult = this.ocuoicheFactory.oicHearResExecuteQuery( this.oichearresModel );
        oichearresResult.subscribe( oichearresResultList => {
            if ( oichearresResultList.length === 0 ) {
                this.oichearresData = [];
            } else {
                this.oichearresData = oichearresResultList;
                this.oichearresModel = oichearresResultList[0];
            }
        } );
    }
    /*
     * This method is used to check Time pattern
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

     staffIdEvent = ( event ) => {
         const rowIndex = event.rowIndex;
         const rowdata = new ValidateRowReturn();
         this.checkFlag = false;
         this.checkHearingDate = false;
         this.checkResultFlag = false;
         if ( event.oldValue !== event.newValue ) {
            if (event.field === 'hearingDate') {
                if (event.data.hearingDate) {
                    if ((DateFormat.compareDate(DateFormat.getDate(event.data.hearingDate), DateFormat.getDate() )) === 1) {
                        this.checkHearingDate = true;
                        rowdata.validated = true;
                        return rowdata;
                    } else if ((DateFormat.compareDate( DateFormat.getDate(event.data.hearingDate), DateFormat.getDate())) === 0) {
                        if (DateFormat.compareTime(DateFormat.getDate(), DateFormat.getDate(event.data.hearingTime)) === 1) {
                            this.checkHearingDate = true;
                            }
                    }
                }}}
                if ( event.oldValue !== event.newValue ) {
                    if (event.field === 'hearingTime') {
                        if (event.data.hearingTime) {
                            const dateHearingTime = DateFormat.getDate(event.data.hearingTime);
                            const hearingTime = dateHearingTime.getHours() + ':' + dateHearingTime.getMinutes();
                            event.data.hearingTime =  TimeFormat.parse(hearingTime,
                                DateFormat.getDate(event.data.hearingDate));
                            if ((DateFormat.compareDateTime( DateFormat.getDate(event.data.hearingTime), DateFormat.getDate() )) === 1) {
                                this.checkHearingDate = true;
                                rowdata.validated = true;
                                return rowdata;
                            }
                        }}}
         if ( event.field === 'hearingStaffIdDes' ) {
             for ( let i = 0; i < this.staffData.length; i++ ) {
                const firstLastName = this.staffData[i].lastName + ', ' + this.staffData[i].firstName;
                 if ( event.newValue === firstLastName ) {
                     rowdata.validated = true;
                     this.checkFlag = true;
                     const rowIndex = this.oicHearingGrid.indexOf(event.data);
                     this.oicHearingGrid.setColumnData('hearingStaffIdDes',rowIndex,this.staffData[i].lastName + ', ' + this.staffData[i].firstName)
                     this.oicHearingGrid.setColumnData('hearingStaffId',rowIndex,this.staffData[i].staffId)
                     rowdata.data = {
                             hearingStaffIdDes:  this.staffData[i].lastName + ', ' + this.staffData[i].firstName,
                             hearingStaffId: this.staffData[i].staffId,
                     };
                    this.oichearData[event.rowIndex].hearingStaffIdDes = this.staffData[i].lastName + ', ' + this.staffData[i].firstName;
                    this.oichearData[event.rowIndex].hearingStaffId = this.staffData[i].staffId;
                     return rowdata;
                 }
             }
             if ( !this.checkFlag ) {
                 this.index = 0;
                 this.index = rowIndex;
                 this.dialogService.openLinkDialog( '/oimuheby', event.data ).subscribe( result => {
                     this.oichearData[this.index].hearingStaffIdDes = result.hearingStaffIdDes;
                     this.oichearData[this.index].hearingStaffId = result.hearingStaffId;
                 } );
                 rowdata.validated = true;
             }
         }
         rowdata.validated = true;
         return rowdata;
     }
    onExitFormclick() {
        this.dialog.close( null );
    }

    originalChargeClick = (event) => {
        if ( this.oicOffencesTempData.length > 0 ) {
            return true;
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.listofvalues');
            this.show();
            return false;
        }
    }

    ngOnDestroy() {
        this.translateService = null;
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
    }

    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }

}
