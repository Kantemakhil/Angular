import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuoicinService } from '../service/ocuoicin.service';
import { AgyIncInvestigations } from '@instoicbeans/AgyIncInvestigations';
import { AgyIncInvStatements } from '@instoicbeans/AgyIncInvStatements';
import { OidoicusService } from '../service/oidoicus.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { AgyIncInvestigationsCommitBean } from '@instoicbeans/AgyIncInvestigationsCommitBean';
import { AgyIncInvStatementsCommitBean } from '@instoicbeans/AgyIncInvStatementsCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { Router } from '@angular/router';
// import required bean declarations

@Component( {
    selector: 'app-ocuoicin',
    templateUrl: './ocuoicin.component.html',
    styleUrls: []
} )

export class OcuoicinComponent implements OnInit {
    // Variable declaration
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    oicinvestData: AgyIncInvestigations[] = [];
    oicinvestDataTemp: AgyIncInvestigations[] = [];
    oicinvestModel: AgyIncInvestigations = new AgyIncInvestigations();
    vaddTemp: AgyIncInvestigations = new AgyIncInvestigations();
    vaddEviTemp: AgyIncInvStatements = new AgyIncInvStatements();
    oicinvestIndex = 0;
    oicinvestCommitModel: AgyIncInvestigationsCommitBean = new AgyIncInvestigationsCommitBean();
    oicinveststaCommitModel: AgyIncInvStatementsCommitBean = new AgyIncInvStatementsCommitBean();
    oicinvestInsertList: AgyIncInvestigations[] = [];
    oicinvestUpdatetList: AgyIncInvestigations[] = [];
    oicinvestDeleteList: AgyIncInvestigations[] = [];
    oicinveststaData: AgyIncInvStatements[] = [];
    oicinveststaDataTemp: AgyIncInvStatements[] = [];
    oicinveststaModel: AgyIncInvStatements = new AgyIncInvStatements();
    oicinveststaIndex: number;
    oicinveststaInsertList: AgyIncInvStatements[] = [];
    oicinveststaUpdateList: AgyIncInvStatements[] = [];
    oicinveststaDeleteList: AgyIncInvStatements[] = [];
    VHeaderBlockModel: VHeaderBlock;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    rgstatementtypeRg: any[] = [];
    rgagyincpstaffidRg: any[] = [];
    investigetionColumnDefs: any[] = [];
    evidenceColumnDefs: any[] = [];
    caseLoadId: string;
    dateValue: any;
    msgs: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    displayocuoicin: boolean;
    investigatorIdVal: any;
    oicinvestDeleteDataTemp: AgyIncInvStatements[] = [];
    oicinvestGridIndex = -1;
    oicinveststaGridIndex = -1;
    isEvidenceInsert = false;
    cameraButton: boolean;
    constructor( private ocuoicinFactory: OcuoicinService, private oidoicusFactory: OidoicusService,
        private sessionManager: UserSessionManager, public translateService: TranslateService, private dialogService: DialogService,
        private osiosearchService: OsiosearService,private eoffenderService: EoffenderService,
        private router: Router  ) {
        this.displayocuoicin = false;
    }
    ngOnInit() {
        this.cameraButton = true;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.oicinvestCommitModel = new AgyIncInvestigationsCommitBean();
        this.investigetionColumnDefs = [
            {
                fieldName: this.translateService.translate('ocuoicin.investigator') + '*', field: 'investigatorId',
                cellEditable: this.canInvestigatorEdit, datatype: 'lov', optionWidth: 300, codeTitle: 'ID#', descTitle: 'Name',source:'OUMPERSO',
                link: 'ocuoicin/rgAgyIncpStaffIdRecordGroup?caseloadId=' + this.caseLoadId, editable: true, width: 350 ,maxlength: 71
            },
            { fieldName: this.translateService.translate('ocuoicin.dateAssigned') + '*',
               field: 'assignedDate', datatype: 'date', editable: true, width: 350 },
            { fieldName: this.translateService.translate('common.comment'), field: 'commentText',
             editable: true, width: 350 , datatype: 'text',  uppercase: 'false', maxlength: 240 },
        ];
        this.evidenceColumnDefs = [
            {
                fieldName:  this.translateService.translate('common.type') + '*', field: 'statementType', datatype: 'lov',
                domain: 'OIC_STMT_TYP', editable: true, width: 300, optionWidth: 300,maxlength: 40
            },
            { fieldName:  this.translateService.translate('common.date') + '*', field: 'dateOfStatementTaken',
              datatype: 'date', editable: true, width: 300 },
              { fieldName: this.translateService.translate('common.detail') + '*', field: 'statementDetail', editable: true, width: 300 ,uppercase: 'false',
                  maxlength: 4000, datatype:'text'},
        ];

        // TODO all initializations here
        //                var serviceObj;
        //         this.VHeaderBlockModel = Global.offender;
        // this.caseLoadId = Global.caseload_id;
        //         this.caseLoadId = 'ITAG';
        //            const serviceObj1 = this.ocuoicinFactory.rgAgyIncpStaffIdRecordGroup(this.caseLoadId);
        //            serviceObj1.subscribe(list1=> {
        //         //  const list1 = JSON.parse(res.toString());
        //                   if (list1.length === 0) {
        //                        return;
        //                    } else {
        //                    for (let i = 0; i < list1.length; i++) {
        //                    this.rgagyincpstaffidRg.push({ 'label': list1[i].id + " - " + list1[i].name, 'value': list1[i].name });
        //               }
        //               }
        //           });
        //            const serviceObj2 = this.ocuoicinFactory. rgStatementTypeRecordGroup();
        //            serviceObj2.subscribe(list2=> {
        //            //const list2 = JSON.parse(res.toString());
        //                    if (list2.length === 0) {
        //                         return;
        //                     } else {
        //                    for (let i = 0; i < list2.length; i++) {
        //                   this.rgstatementtypeRg.push({ 'label': list2[i].id + " - " + list2[i].name, 'value': list2[i].name });
        //                }
        //                }
        //            });
        this.ocuoicinexecuteQuery();
        this.ocuoicinEviExecuteQuery();
    }

    /**
     *  This function will be executed when we select Investigation block record
     */
    onRowClickoicinvest( event ) {
        this.vaddTemp = new AgyIncInvestigations();
        if (event) {
            this.vaddTemp = event;
            if(event.createDatetime){
                this.eoffenderService.selectedRowData=event;
                this.eoffenderService.selectedRowData['oicIncidentId']=this.dialog.data.oicIncidentId;
            }
            else{
                this.eoffenderService.selectedRowData=null;
            }
            this.ocuoicinEviExecuteQuery();
        }else{
            this.eoffenderService.selectedRowData=null;
        }
    }

    /**
     *  This function will be executed when we select Evidence block record
     */
    onRowClickoicinveststa( event ) {
        this.vaddEviTemp = new AgyIncInvStatements();
        this.vaddEviTemp = event;

    }
    onCameraPcclick() {
        this.cameraButton = true;
        if (this.vaddTemp.agencyIncidentId) {
                const captureImageData = this.osiosearchService.captureImageProcedure();
                captureImageData.subscribe(captureImage => {
                    if (captureImage === 'OIUIMAGE') {
                        this.ocuoicinFactory.imagesDataTemp.imageObjectId = this.oidoicusFactory.oicIncidentId;
                        this.ocuoicinFactory.imagesDataTemp.imageObjectType = 'OIC';
                        this.ocuoicinFactory.imagesDataTemp.imageViewType = 'OIC';
                        this.ocuoicinFactory.imagesDataTemp.screenName = 'OIDOICUS';
                        this.dialogService.openLinkDialog('/oiuimagedialog', this.ocuoicinFactory.imagesDataTemp, 80).subscribe(result => {
                            this.cameraButton = false;
                        });
                    } else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidpiden.pleasecreate');
                        this.show();
                        this.cameraButton = false;
                        return;
                    }
                });

        }
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }

    /**
     *  This function will be executed when Exit button event is
     * fired
     */
    ocuoicinClose() {
        this.dialog.close( null );
    }
    /*
     * This function will be executed, when click event is fired
     * on Date Assigned*DateField.
    */
    //    ocuoicinOIC_INVESTASSIGNED_DATEDateopen($event) {
    //        this.closeMyDataPicker();
    //        this.preventDefault();
    //        $event.stopPropagation();
    //        this.OIC_INVESTASSIGNED_DATEDateopened = true;
    //    }

    /**
    * This function loads the data into the Master Record and its child records
    */
    //    ocuoicinPopulateDetails() {
    //        this.oICINVESTModel = this.oICINVESTData[this.index];
    //        const serviceObj = this.ocuoicinFactory.
    //        oicinveststaExecuteQuery(oICINVEST);
    //        //TODO add appropriate input varaibles
    //        serviceObj.then(res=>{
    //            const data = JSON.parse(res.toString());
    //        if(data != undefined && data.errorMessage.length > 0){
    //        }else{
    //            this.oicinveststaData = data;
    //        }
    //        });
    //    }

    /**
     *  This function will be executed when we click on save button of Investigation Block
     *  in this function save/update/delete functionalities are implemented
     */
    ocuoicinSaveoicinvestForm( event ) {
        // TODO declare commit bean and add insert list to that object.
        this.oicinvestInsertList = [];
        this.oicinvestUpdatetList = [];
        this.oicinvestDeleteList = [];
        this.oicinvestInsertList = event.added;
        this.oicinvestUpdatetList = event.updated;
        this.oicinvestDeleteList = event.removed;
        this.oicinvestCommitModel.insertList = [];
        this.oicinvestCommitModel.deleteList = [];
        this.oicinvestCommitModel.updateList = [];
        for ( let i = 0; i < this.oicinvestUpdatetList.length; i++ ) {
            if ( !this.oicinvestUpdatetList[i].investigatorId ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.investigatoridmustbeentered');
                this.show();
                return;
            }
            if ( !this.oicinvestUpdatetList[i].assignedDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.dateassignedmustbeentered');
                this.show();
                return;
            }
            this.oicinvestUpdatetList[i].assignedDate = DateFormat.getDate(this.oicinvestUpdatetList[i].assignedDate);
            if ((DateFormat.compareDate( this.oicinvestUpdatetList[i].assignedDate, DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.dateassignedmustbeinpast');
                this.show();
                return;
            }
        }
        for ( let i = 0; i < this.oicinvestInsertList.length; i++ ) {
            this.oicinvestInsertList[i].agencyIncidentId = this.oicinvestModel.agencyIncidentId;
            this.oicinvestInsertList[i].partySeq = this.oicinvestModel.partySeq;
            this.investigatorIdVal = this.oicinvestInsertList[i].investigatorId;
            this.oicinvestInsertList[i].investigatorId = this.investigatorIdVal;
            if ( !this.oicinvestInsertList[i].investigatorId ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.investigatoridmustbeentered');
                this.show();
                return;
            }
            if ( !this.oicinvestInsertList[i].assignedDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.dateassignedmustbeentered');
                this.show();
                return;
            }
            if ((DateFormat.compareDate( this.oicinvestInsertList[i].assignedDate, DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.dateassignedmustbeinpast');
                this.show();
                return;
            }
        }
        if ( this.oicinvestDeleteList.length > 0 ) {
            for ( let i = 0; i < this.oicinvestDeleteList.length; i++ ) {
                this.oicinvestDeleteList[i].agencyIncidentId = this.oicinvestModel.agencyIncidentId;
                this.oicinvestDeleteList[i].partySeq = this.oicinvestModel.partySeq;
                const oicinveststaResult = this.ocuoicinFactory.oicInvestStaExecuteQuery( this.oicinvestDeleteList[i] );
                oicinveststaResult.subscribe( oicinveststaResultList => {
                    if ( oicinveststaResultList !== undefined && oicinveststaResultList.length > 0 ) {
                        this.oicinvestDeleteDataTemp = oicinveststaResultList;
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.recordnotdeletedinchild');
                        this.show();
                        this.ocuoicinexecuteQuery();
                        return;
                    } else {
                        this.oicinvestDeleteDataTemp = oicinveststaResultList;
                        if ( i === ( this.oicinvestDeleteList.length - 1 ) && this.oicinvestDeleteDataTemp.length === 0 ) {
                            this.oicinvestCommitModel.insertList = this.oicinvestInsertList;
                            this.oicinvestCommitModel.deleteList = this.oicinvestDeleteList;
                            const oicinvestSaveData = this.ocuoicinFactory.oicInvestCommit( this.oicinvestCommitModel );
                            oicinvestSaveData.subscribe( oicinvestSaveResult => {
                                if ( oicinvestSaveResult === 1 ) {
                                    this.ocuoicinexecuteQuery();
                                    this.oicinvestData = oicinvestSaveResult;
                                    this.type = 'success';
                                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                    this.show();
                                } else {
                                    this.type = 'error';
                                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                    this.show();
                                    this.oicinvestData = oicinvestSaveResult;
                                    this.ocuoicinexecuteQuery();
                                }
                            } );
                        }
                    }

                } );
            }
        }
        if ( this.oicinvestDeleteList.length === 0 ) {
            this.oicinvestCommitModel.insertList = this.oicinvestInsertList;
            this.oicinvestCommitModel.updateList = this.oicinvestUpdatetList;
            const oicinvestSaveData = this.ocuoicinFactory.oicInvestCommit( this.oicinvestCommitModel );
            oicinvestSaveData.subscribe( oicinvestSaveResult => {
                if ( oicinvestSaveResult === 1 ) {
                    this.oicinvestData = oicinvestSaveResult;
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.ocuoicinexecuteQuery();
                } else {
                    this.oicinvestData = oicinvestSaveResult;
                    this.type = 'error';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    this.ocuoicinexecuteQuery();
                }
            } );
        }
    }

    /**
     *  This function will be executed when we click on Investigation button
     *  based on agencyIncidentId and partySeq of Offenses in custody block Investigation block data will be retrieved
     */
    ocuoicinexecuteQuery() {
        this.oicinvestModel = new AgyIncInvestigations();
        this.oicinvestModel.agencyIncidentId = this.dialog.data.agencyIncidentId;
        this.oicinvestModel.partySeq = this.dialog.data.partySeq;
        if ( this.oicinvestModel.agencyIncidentId != null ) {
            const serviceObj = this.ocuoicinFactory.oicInvestExecuteQuery( this.oicinvestModel );
            serviceObj.subscribe( data => {
                if ( data.length === 0 ) {
                    this.oicinvestData = [];
                    this.isEvidenceInsert = false;
                } else {
                    this.oicinvestData = data;
                    this.oicinvestIndex = this.oicinvestData.length;
                    this.oicinvestGridIndex = 0;
                    this.oicinvestModel = this.oicinvestData[0];
                    this.isEvidenceInsert = true;
                    this.cameraButton = false;
                }
            } );
        }
    }

    /**
     * To display the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }

    //   else {
    //            }
    //         else {
    //            if (this.isFormChanged()) {
    //                this.saveDialogue('EXECUTEQUERY');
    //            } else {
    //                const serviceObj = this.ocuoicinFactory.
    //           oicinvestExecuteQuery(null);
    //               serviceObj.then(res=>{
    //                const data = JSON.parse(res.toString());
    //                    if (data.length == 0) {
    //                    }else if(data != undefined && data.length > 0 && data.errorMessage.length > 0){
    //                    }else {
    //                        this.oICINVESTData = data;
    //                        this.oICINVESTModel = this.oICINVESTData[this.index];
    //                       this.populateDetails();
    //                    }
    //                });
    //            }
    //        }


    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    //    ocuoicindateFormat(dateValue) {
    //    if (dateValue != undefined && dateValue.length > 0) {
    //        let newdate = dateValue.split('/');
    //        return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
    //    } else {
    //        return dateValue;
    //    }
    // }
    /*
     * This function will be executed, when click event is fired
     * on Date*DateField.
    */
    //    ocuoicinOIC_INVEST_STADATE_OF_STATEMENT_TAKENDateopen($event) {
    //        this.closeMyDataPicker();
    //        this.preventDefault();
    //        $event.stopPropagation();
    //        this.OIC_INVEST_STADATE_OF_STATEMENT_TAKENDateopened = true;
    //    }

    /**
     *  This function will be executed when we select the Investigation block record
     *  based on investigationId evidence block data will be retrieved
     */
    ocuoicinEviExecuteQuery() {
        this.oicinveststaModel = new AgyIncInvStatements();
        this.oicinveststaModel.agyIncInvestigationId = this.vaddTemp.agyIncInvestigationId;
        if ( this.vaddTemp.agyIncInvestigationId != null ) {
            const oicinveststaResult = this.ocuoicinFactory.oicInvestStaExecuteQuery( this.oicinveststaModel );
            oicinveststaResult.subscribe( oicinveststaResultList => {
                if ( oicinveststaResultList.length === 0 ) {
                    this.oicinveststaData = [];
                } else {
                    this.oicinveststaData = oicinveststaResultList;
                    this.oicinveststaGridIndex = 0;
                    this.oicinveststaModel = oicinveststaResultList[0];
                    this.cameraButton = false;
                }
            } );
        }
    }
    /**
     *  This function will be executed when we click on save button of Evidence Block
     *  in this function save/update/delete functionalities are implemented
     */
    ocuoicinSaveoicinveststaForm( event ) {
        if ( !this.vaddTemp.agyIncInvestigationId ) {
            return;
        }
        // TODO declare commit bean and add insert list to that object.
        this.oicinveststaInsertList = event.added;
        this.oicinveststaUpdateList = event.updated;
        this.oicinveststaDeleteList = event.removed;
        for ( let i = 0; i < this.oicinveststaUpdateList.length; i++ ) {
            if ( !this.oicinveststaUpdateList[i].statementType ) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.typemustbeentered');
                this.show();
                return;
            }
            if ( !this.oicinveststaUpdateList[i].dateOfStatementTaken ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.datemustbeentered');
                this.show();
                return;
            }
            this.oicinveststaUpdateList[i].dateOfStatementTaken=DateFormat.getDate(this.oicinveststaUpdateList[i].dateOfStatementTaken);
            if ((DateFormat.compareDate( this.oicinveststaUpdateList[i].dateOfStatementTaken, DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.datemustbeinpast');
                this.show();
                return;
            }
            if ( !this.oicinveststaUpdateList[i].statementDetail ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.detailmustbeentered');
                this.show();
                return;
            }
        }
        this.oicinveststaCommitModel.insertList = [];
        this.oicinveststaCommitModel.deleteList = [];
        this.oicinveststaCommitModel.updateList = [];
        for ( let i = 0; i < this.oicinveststaInsertList.length; i++ ) {
            this.oicinveststaInsertList[i].agyIncInvestigationId = this.vaddTemp.agyIncInvestigationId;
            if ( !this.oicinveststaInsertList[i].statementType ) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.typemustbeentered');
                this.show();
                return;
            }
            if ( !this.oicinveststaInsertList[i].dateOfStatementTaken ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.datemustbeentered');
                this.show();
                return;
            }
            if ((DateFormat.compareDate( this.oicinveststaInsertList[i].dateOfStatementTaken , DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.datemustbeinpast');
                this.show();
                return;
            }
            if ( !this.oicinveststaInsertList[i].statementDetail ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.detailmustbeentered');
                this.show();
                return;
            }
        }
        this.oicinveststaCommitModel.insertList = this.oicinveststaInsertList;
        this.oicinveststaCommitModel.updateList = this.oicinveststaUpdateList;
        this.oicinveststaCommitModel.deleteList = this.oicinveststaDeleteList;
        const oicinveststaSaveData = this.ocuoicinFactory.oicInvestStaCommit( this.oicinveststaCommitModel );
        oicinveststaSaveData.subscribe( oicinveststaSaveResult => {
            if ( oicinveststaSaveResult === 1 ) {
                this.oicinveststaData = oicinveststaSaveResult;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.ocuoicinEviExecuteQuery();
                this.show();
            } else {
                this.oicinveststaData = oicinveststaSaveResult;
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        } );
        /**
         *  This function will be deleted when commit the event is
        * fired
        */

        //                    this.oicinveststaCommitModel.insertList = [];
        //                    this.oicinveststaCommitModel.deleteList = [];
        //                    this.oicinveststaModel.dateOfStatementTaken = new Date(this.oicinveststaModel.dateOfStatementTaken);
        //                    // this.oicinveststaDeleteList.push(this.oicinveststaModel);
        //                    this.oicinveststaCommitModel.deleteList = this.oicinveststaDeleteList;
        //                    const oicinveststaDeleteData = this.ocuoicinFactory.oicInvestStaCommit(this.oicinveststaCommitModel);
        //                    oicinveststaDeleteData.subscribe(oicinveststaDeleteResult => {
        //                        // const oicinveststaDeleteResult[0]= JSON.parse(res.toString());
        //                        if (oicinveststaDeleteResult[0] === 0) {
        //                        } else {
        //                        }
        //                    });


    }
    // this.OIC_INVESTASSIGNED_DATEDateopened = false;
    // this.OIC_INVEST_STADATE_OF_STATEMENT_TAKENDateopened = false;

    //    butInvestigatorIdWhenButtonPressedTrigger() {
    //          //TODO go_item('oic_invest.nbt_investigator_id');
    //          //TODO do_key('list_values');
    //    }

    //    assignedDateKeyListvalTrigger() {
    //         //TODO  this.displayCalendar();
    //    }

    //    oicInvestOnErrorTrigger() {
    // /* Trap errors returning from the server and report in a user
    //   friendly manner*/
    //         let err_code = error_code;
    //         let err_type = error_type;
    //         let server_err = abs (dbms_error_code);
    //         let server_msg = dbms_error_text;
    //         let constraint_name;
    //         let v_alert_no;
    //          //TODO
    //        if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
    // /* Remove recursive errors from the top of the stack */
    //        while (server_err = 604) {
    //          //TODO cgte$pop_error_stack (server_err, server_msg);
    //        }
    //          //TODO
    // /* Check and report the generic constraint violations */
    //        if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
    //           throw new Error('form_trigger_failure');
    //        }
    //          //TODO
    // /* Check and report the constraint violations specific to this
    //            block */
    //          //TODO constraint_name = cgte$strip_constraint (server_msg);
    //        }
    //          //TODO
    //        if ((errType==='frm' &&  errCode===40202) ){
    //          //TODO v_alert_no =
    //          //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things
    //     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.
    //     '*' character won't appear along with the prompt when mandatory value is not entered.replace
    // (substr(get_item_property(system.trigger_item, prompt_text), 1, instr(get_item_property
    // (system.trigger_item, prompt_text), '*') - 1 )||substr(error_text, 6), chr(10), ' '),null,null,null,null);
    //           throw new Error('form_trigger_failure');
    //        }
    //          //TODO
    //         //TODO  this.checkBlockErrors();
    //          //TODO
    //        if (instr(errorText, 'ora')===0 ){
    // /* If error not found, issue default message */
    //          //TODO v_alert_no =
    //          //TODO this.displayTheAlertCfgErrorerr_type|| '-'|| to_char (err_code)|| ' '|| error_text,null,null,null,null);
    //        } else {
    //          //TODO
    //         //TODO  this.showErrorForm();
    //          //TODO
    //        }
    //           throw new Error('form_trigger_failure');
    //    }
    //
    //    oicInvestPreInsertTrigger() {
    //          //TODO oic_invest.agy_inc_investigation_id = tag_adjudication.getnextagyincinvestigationseq;
    //          //TODO
    //          //TODO oic_invest.agency_incident_id = parameter.p_agency_incident_id;
    //          //TODO
    //         //-- @@@ D Rice - Defect 641 & 2131
    //          //TODO oic_invest.party_seq = parameter.p_party_seq;
    //    }
    //
    //    oicInvestPreQueryTrigger() {
    //          //TODO oic_invest.agency_incident_id = parameter.p_agency_incident_id;
    //          //TODO
    //        if (oicInvestModel.nbtInvestigatorId = null ){
    //          //TODO oic_invest.investigator_id = null;
    //        }
    //    }

    //    oicInvestPostQueryTrigger() {
    //          //TODO
    //          //TODO oic_invest.nbt_assigned_date = oic_invest.assigned_date;
    //          //TODO
    //          //TODO oic_invest.nbt_investigator_id =
    //          //TODO oms_utils.get_staff_name(oic_invest.investigator_id);
    //          //TODO
    //          //TODO set_record_property(to_char(system.trigger_record), 'oic_invest', status, query_status);
    //          //TODO
    //    }

    //    oicInvestOnPopulateDetailsTrigger() {
    //         //--
    //         //-- Begin default relation declare section
    //         //--
    //         let recstat = :system.record_status;
    //         let startitm = :system.cursor_item;
    //          //TODO rel_id      relation;
    //         //--
    //         //-- End default relation declare section
    //         //--
    //         //--
    //         //-- Begin default relation program section
    //         //--
    //        if (( recstat==='new' ||  recstat==='insert' ) ){
    //          //TODO return;
    //        }
    //         //--
    //         //-- Begin OIC_INVEST_STA detail program section
    //         //--
    //        if (( (oicInvestModel.agyIncInvestigationId !== null) ) ){
    //          //TODO rel_id = find_relation('oic_invest.oic_invest_oic_invest_sta');
    //          //TODO query_master_details(rel_id 'oic_invest_sta');
    //        }
    //         //--
    //         //-- End OIC_INVEST_STA detail program section
    //         //--
    //          //TODO
    //        if (( systemModel.cursorItem  !==  startitm ) ){
    //          //TODO go_item(startitm);
    //         //TODO  this.checkPackageFailure();
    //        }
    //         //--
    //         //-- End default relation program section
    //         //--
    //    }
    //
    //    oicInvestOnCheckDeleteMasterTrigger() {
    //         //--
    //         //-- Begin default relation declare section
    //         //--
    //          //TODO dummy_define char(1);
    //         let lv_alert;
    //         //--
    //         //-- Begin OIC_INVEST_STA detail declare section
    //         //--
    //        const serviceObj = this.ocuoicinFmbXmlFactory.
    //            oicInvestOnCheckDeleteMasteroic_invest_sta_cur(         this.oicInvestmodel
    //        );
    //        serviceObj.then(res=> {
    //        const data = JSON.parse(res.toString());
    //        //TODO
    // });
    //         //--
    //         //-- End OIC_INVEST_STA detail declare section
    //         //--
    //         //--
    //         //-- End default relation declare section
    //         //--
    //         //--
    //         //-- Begin default relation program section
    //         //--
    //         //--
    //         //-- Begin OIC_INVEST_STA detail program section
    //         //--
    //        //TODO open oic_invest_sta_cur;
    //        //TODO fetch oic_invest_sta_cur into dummy_define;
    //        if (( oicInvestStaCur%found ) ){
    //          //TODO lv_alert =  display_the_alert
    // ('cfg_error', 'cannot delete master record when matching detail records exist.', null, null, null, null );
    // replaced message by form api
    //        //TODO close oic_invest_sta_cur;
    //           throw new Error('form_trigger_failure');
    //        }
    //        //TODO close oic_invest_sta_cur;
    //         //--
    //         //-- End OIC_INVEST_STA detail program section
    //         //--
    //         //--
    //         //-- End default relation program section
    //         //--
    //    }

    //    butStatementTypeWhenButtonPressedTrigger() {
    //          //TODO go_item('oic_invest_sta.nbt_statement_type');
    //          //TODO do_key('list_values');
    //    }

    //    dateOfStatementTakenKeyListvalTrigger() {
    //         //TODO  this.displayCalendar();
    //    }

    //    cameraPcWhenButtonPressedTrigger() {
    //         let lv_alert;
    //          //TODO
    //        if (systemModel.formStatus='query' ){
    //         //-- @@@ Baharak 14-MAR-03: Called CAPTURE_IMAGE instead of IMAGING
    //        if (parameterModel.pOicIncidentId !== null ){
    //          //TODO capture_image(parameter.p_oic_incident_id,'oic','oic');
    //        } else {
    //         //TODO  this.alertNoNode();
    //        }
    //          //TODO
    //        } else {
    //          //TODO lv_alert =  display_the_alert  ('cfg_error', 'please commit the changes!',
    // null, null, null, null ); // replaced message by form api
    //        }
    //          //TODO
    //    }

    //    oicInvestStaPreInsertTrigger() {
    //          //TODO oic_invest_sta.agy_ii_statement_id = tag_adjudication.getnextagyiistatementseq;
    //    }

    //    oicInvestStaPreQueryTrigger() {
    //          //TODO block_id block = find_block('oic_invest');
    //         let sub_where;
    //         let def_where;
    //          //TODO
    //          //TODO function add_and(
    //          //TODO p_where in varchar2
    //          //TODO ) return varchar2 is
    //        if ((nvl( nvl(length(pWhere), 0), 0) != 0) ){
    //          //TODO return( p_where || ' and ');
    //        } else {
    //          //TODO return( p_where );
    //        }
    //          //TODO return null; end;
    //          //TODO
    //          //TODO
    //          //TODO sub_where = null;
    //          //TODO
    //        if ((oicInvestStaModel.nbtStatementType !== null) ){
    //          //TODO sub_where = add_and( sub_where ) || '(domain=''oic_stmt_typ'' and upper(description) like upper('''||
    //          //TODO oic_invest_sta.nbt_statement_type || ''')))';
    //        }
    //        if ((subWhere !== null) ){
    //          //TODO def_where = add_and( def_where ) || '((statement_type) in '||'(select
    //          //TODO code '||'from reference_codes where  '|| sub_where || ')';
    //        }
    //          //TODO
    //          //TODO set_block_property(block_id, default_where, def_where);
    //          //TODO
    //    }

    //    oicInvestStaPostQueryTrigger() {
    //          //TODO
    //          //TODO oic_invest_sta.nbt_statement_type =
    //          //TODO oms_miscellaneous.getdesccode('oic_stmt_typ', oic_invest_sta.statement_type);
    //          //TODO
    //          //TODO oic_invest_sta.nbt_date_of_statement_taken = oic_invest_sta.date_of_statement_taken;
    //          //TODO
    //          //TODO set_record_property(to_char(system.trigger_record), 'oic_invest_sta', status, query_status);
    //          //TODO
    //    }

    //    oicInvestStaOnErrorTrigger() {
    // /* Trap errors returning from the server and report in a user
    //   friendly manner*/
    //         let err_code = error_code;
    //         let err_type = error_type;
    //         let server_err = abs (dbms_error_code);
    //         let server_msg = dbms_error_text;
    //         let constraint_name;
    //         let v_alert_no;
    //          //TODO
    //        if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
    // /* Remove recursive errors from the top of the stack */
    //        while (server_err = 604) {
    //          //TODO cgte$pop_error_stack (server_err, server_msg);
    //        }
    //          //TODO
    // /* Check and report the generic constraint violations */
    //        if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
    //           throw new Error('form_trigger_failure');
    //        }
    //          //TODO
    // /* Check and report the constraint violations specific to this
    //            block */
    //          //TODO constraint_name = cgte$strip_constraint (server_msg);
    //        }
    //          //TODO
    //        if ((errType==='frm' &&  errCode===40202) ){
    //          //TODO v_alert_no =
    //          //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things
    //     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.
    //     '*' character won't appear along with the prompt when mandatory value is not entered.replace
    // (substr(get_item_property(system.trigger_item, prompt_text), 1, instr(get_item_property(
    // system.trigger_item, prompt_text), '*') - 1 )||substr(error_text, 6), chr(10), ' '),null,null,null,null);
    //           throw new Error('form_trigger_failure');
    //        }
    //          //TODO
    //         //TODO  this.checkBlockErrors();
    //          //TODO
    //        if (instr(errorText, 'ora')===0 ){
    // /* If error not found, issue default message */
    //          //TODO v_alert_no =
    //          //TODO this.displayTheAlertCfgErrorerr_type|| '-'|| to_char (err_code)|| ' '|| error_text,null,null,null,null);
    //        } else {
    //          //TODO
    //         //TODO  this.showErrorForm();
    //          //TODO
    //        }
    //           throw new Error('form_trigger_failure');
    //    }

    //    butSaveWhenButtonPressedTrigger() {
    //          //TODO
    //    }

    //    butExitWhenButtonPressedTrigger() {
    //          //TODO
    //    }

    //    butControlOnErrorTrigger() {
    // /* Trap errors returning from the server and report in a user
    //   friendly manner*/
    //         let err_code = error_code;
    //         let err_type = error_type;
    //         let server_err = abs (dbms_error_code);
    //         let server_msg = dbms_error_text;
    //         let constraint_name;
    //         let v_alert_no;
    //          //TODO
    //        if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
    // /* Remove recursive errors from the top of the stack */
    //        while (server_err = 604) {
    //          //TODO cgte$pop_error_stack (server_err, server_msg);
    //        }
    //          //TODO
    // /* Check and report the generic constraint violations */
    //        if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
    //           throw new Error('form_trigger_failure');
    //        }
    //          //TODO
    // /* Check and report the constraint violations specific to this
    //            block */
    //          //TODO constraint_name = cgte$strip_constraint (server_msg);
    //        }
    //          //TODO
    //        if ((errType==='frm' &&  errCode===40202) ){
    //          //TODO v_alert_no =
    //          //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things
    //     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.\
    //     '*' character won't appear along with the prompt when mandatory value is not entered.replace(
    // substr(get_item_property(system.trigger_item, prompt_text), 1, instr(get_item_property(
    // system.trigger_item, prompt_text), '*') - 1 )||substr(error_text, 6), chr(10), ' '),null,null,null,null);
    //           throw new Error('form_trigger_failure');
    //        }
    //          //TODO
    //         //TODO  this.checkBlockErrors();
    //          //TODO
    //        if (instr(errorText, 'ora')===0 ){
    // /* If error not found, issue default message */
    //          //TODO v_alert_no =
    //          //TODO this.displayTheAlertCfgErrorerr_type|| '-'|| to_char (err_code)|| ' '|| error_text,null,null,null,null);
    //        } else {
    //          //TODO
    //         //TODO  this.showErrorForm();
    //          //TODO
    //        }
    //           throw new Error('form_trigger_failure');
    //    }

    //    ocuoicinI___itemTrigger() {
    //        ;
    //    }

    //    ocuoicinKeyListvalTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_item_h.key_listval; // application hook
    //          //TODO
    //         //TODO  this.listValues();
    //          //TODO
    //          //TODO next_item ;
    //    }

    //    ocuoicinWhenButtonPressedTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_item_h.when_button_pressed; // application hook;
    //    }

    //    ocuoicinI_navigateTrigger() {
    //        ;
    //    }

    //    ocuoicinKeyExitTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_navigate_h.key_exit;    // application hook
    //          //TODO
    //         //TODO  this.exitForm();
    //          //TODO
    //         //-- new code from triggeradd --
    //         //--
    //         //-- @@@ Vipul on 28-SEP-2001 : Tracking# 8862 : Added call to procedure
    //         //--     in application library to handle coordination of menu and forms
    //         //--
    //         //TODO  this.undoPostFormInit();
    //          //TODO
    //         //-- end new code --;
    //    }

    //    ocuoicinKeyNxtblkTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_navigate_h.key_nxtblk;  // application hook
    //          //TODO
    //         //TODO  this.nextBlock();
    //    }

    //    ocuoicinKeyPrvblkTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_navigate_h.key_prvblk;  // application hook
    //          //TODO
    //         //TODO  this.previousBlock();
    //    }

    //    ocuoicinPostFormTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_navigate_h.post_form;   // application hook;
    //    }

    //    ocuoicinPreBlockTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_navigate_h.pre_block;   // application hook;
    //    }

    //    ocuoicinPreFormTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_navigate_h.pre_form;    // application hook;
    //    }

    //    ocuoicinWhenNewRecordInstanceTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_navigate_h.when_new_rec_instance;   // application hook
    //          //TODO
    //          //TODO populate_images ;
    //    }

    //    ocuoicinWhenNewFormInstanceTrigger() {
    //         let l_message_level = :system.message_level;
    //          //TODO
    //          //TODO
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //         //TODO  this.createLibraryGlobals();
    //          //TODO
    //         //TODO  this.createApplibGlobals();
    //          //TODO
    //          //TODO applib_navigate_h.w_new_form_instance; // application hook
    //          //TODO
    //        if (parameterModel.pAgencyIncidentId !== null ){
    //          //TODO system.message_level = '5';
    //         //TODO  this.executeQuery();
    //          //TODO system.message_level = l_message_level;
    //        } else {
    //         //TODO  this.enterQuery();
    //        }
    //          //TODO
    //    }

    //    ocuoicinWhenNewBlockInstanceTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_navigate_h.w_new_block_instance;    // application hook;
    //    }

    //    ocuoicinWhenNewItemInstanceTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_navigate_h.w_new_item_instance; // application hook;
    //    }

    //    ocuoicinI____queryTrigger() {
    //        ;
    //    }

    //    ocuoicinKeyEntqryTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_query_h.key_entqry; // application hook
    //          //TODO
    //          //TODO handle_images ;
    //          //TODO
    //         //TODO  this.enterQuery();
    //    }

    //    ocuoicinKeyExeqryTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_query_h.key_exeqry; // application hook
    //          //TODO
    //         //TODO  this.executeQuery();
    //    }

    //    ocuoicinPostQueryTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_query_h.post_query; // application hook;
    //    }

    //    ocuoicinPreQueryTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_query_h.pre_query;  // application hook
    //    }

    //    ocuoicinITransactionalTrigger() {
    //        ;
    //    }

    //    ocuoicinKeyCommitTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_transactional_h.key_commit; // application hook
    //          //TODO
    //         //TODO  this.commit();
    //    }

    //    ocuoicinOnInsertTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_transactional_h.on_insert;  // application hook
    //          //TODO
    //         //TODO  this.insertRecord();
    //          //TODO
    //         //-- @@@ Venu 07/Apr/2005, In CGTE$CHECK_CONSTRAINT_VIO program unit we check for Primary Key/Unique Key or Check constraint
    //         //--                       violations, if any such violation occurs when user tries to commit a record then it should
    //         //--                       RAISE FORM_TRIGGER_FAILURE before continuing further but it displays "Transaction complete...."
    //         //--                       message and as well as "Row already exists with....", fixed it by following call.
    //         //TODO  this.chkPackageFailure();
    //    }

    //    ocuoicinOnUpdateTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_transactional_h.on_update;  // application hook
    //          //TODO
    //         //TODO  this.updateRecord();
    //          //TODO
    //         //-- @@@ Venu 07/Apr/2005, In CGTE$CHECK_CONSTRAINT_VIO program unit we check for Primary Key/Unique Key or Check constraint
    //         //--                       violations, if any such violation occurs when user tries to commit a record then it should
    //         //--                       RAISE FORM_TRIGGER_FAILURE before continuing further but it displays "Transaction complete...."
    //         //--                       message and as well as "Row already exists with....", fixed it by following call.
    //         //TODO  this.chkPackageFailure();
    //    }

    //    ocuoicinPreInsertTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_transactional_h.pre_insert; // application hook;
    //    }

    //    ocuoicinPreUpdateTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_transactional_h.pre_update; // application hook;
    //    }

    //    ocuoicinIValidationTrigger() {
    //        ;
    //    }

    //    ocuoicinOnErrorTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_validation_h.on_error;  // application hook;
    //    }

    //    ocuoicinWhenValidateItemTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_validation_h.when_validate_item;    // application hook;
    //    }

    //    ocuoicinWhenValidateRecordTrigger() {
    //         let lv_alert;
    //          //TODO
    //         //-- ---------------------------------------------
    //         //--       Application Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_validation_h.when_validate_record;  // application hook
    //          //TODO
    //        if (systemModel.currentBlock==='oicInvest' ){
    //        if (nvl(oicInvestModel.nbtAssignedDate,sysdate) != oicInvestModel.assignedDate &&
    //  nvl(oicInvestModel.assignedDate,sysdate) > sysdate ){
    //          //TODO lv_alert =
    //          //TODO this.displayTheAlertCfgError'error date assigned must be in the past.',null, null, null, null );
    // replaced message by form api
    //           throw new Error('form_trigger_failure');
    //        }
    //        }
    //          //TODO
    //        if (systemModel.currentBlock==='oicInvestSta' ){
    //        if (nvl(oicInvestStaModel.nbtDateOfStatementTaken,sysdate) != oicInvestStaModel.dateOfStatementTaken &&
    //   nvl(oicInvestStaModel.dateOfStatementTaken,sysdate) > sysdate ){
    //          //TODO lv_alert =
    //          //TODO this.displayTheAlertCfgError'error date must be in the past.',null, null, null, null );
    // replaced message by form api
    //           throw new Error('form_trigger_failure');
    //        }
    //        }
    //          //TODO
    //    }

    //    ocuoicinI__variousTrigger() {
    //        ;
    //    }

    //    ocuoicinKeyHelpTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Event Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_various_h.key_help; // application hook;
    //    }

    //    ocuoicinOnMessageTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Event Hooks
    //         //-- ---------------------------------------------
    //         //-- @@@ Venu 26-April-2005, Not required.
    //         //-- APPLIB_Various_H.On_Message;  -- application hook
    //          //TODO
    //         let v_alert_no;
    //        if (messageCode===40400 ){
    //          //TODO set_alert_property ('cfg_information', alert_message_text,
    //          //TODO message_text);
    //          //TODO v_alert_no = show_alert ('cfg_information');
    //        } else {
    //          //TODO v_alert_no =
    //          //TODO this.displayTheAlertCfgErrormessage_type|| '-'|| to_char (message_code)|| ' '|| message_text,null,null,null,null);
    //        }
    //    }

    //    ocuoicinI__windowTrigger() {
    //        ;
    //    }

    //    ocuoicinWhenWindowActivatedTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Event Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_window_h.when_window_activated; // application hook;
    //    }

    //    ocuoicinWhenWindowClosedTrigger() {
    //         //-- ---------------------------------------------
    //         //--       Event Hooks
    //         //-- ---------------------------------------------
    //          //TODO
    //          //TODO applib_window_h.when_window_closed;    // application hook;
    //    }

    //    ocuoicinOnClearDetailsTrigger() {
    //         //--
    //         //-- Begin default relation program section
    //         //--
    //         //TODO  this.clearAllMasterDetails();
    //         //--
    //         //-- End default relation program section
    //         //--
    //    }

    //    ocuoicinPreTextItemTrigger() {
    //          //TODO applib_navigate_h.pre_text_item;   // application hook
    //    }

    //    ocuoicinPostTextItemTrigger() {
    //          //TODO applib_navigate_h.post_text_item;  // application hook
    //    }
    /*
     * This function executed when cgte$checkConstraintVio
    * fired
    */
    //    cgte$checkConstraintVio() {
    //         //TODO  function cgte$check_constraint_vio (
    //          let  p_server_err;//
    //         //TODO  p_server_msg   in   varchar2
    //          let  );//
    //         //TODO  return boolean
    //         //TODO  is
    // /* Check and report Primary/Unique Key, Check Constraint and User */
    // /* Defined Constraint violations                                  */
    //          string  constraint_name;//
    //          number  v_alert_no;//
    // /* Check if the error code is one we are interested in */
    //        if ((! (   p_server_err in (1, 2290) || (p_server_err >= 20000 & p_server_err <= 20999) ) ) ){
    //         //TODO  return (false);
    //        }
    //         //TODO
    // /* Deal with user defined errors */
    //        if ((p_server_err >= 20000 & p_server_err <= 20999) ){
    // /* If error not found, issue default message */
    //         //TODO  v_alert_no :=
    //         //TODO  this.displayTheAlertCfgError'error: ' || cgte$strip_first_error (p_server_msg),null,null,null,null);
    //         //TODO  return (true);
    //        }
    //         //TODO
    // /* Deal with Primary/Unique Key and Check Constraint violations */
    //           constraint_name = cgte$strip_constraint (p_server_msg);
    //         //TODO  v_alert_no :=
    //         //TODO  display_the_alert ('cfg_error', p_server_msg, null, null, null, null);
    //         //TODO  return (true);
    //    }

    /*
     * This function executed when createLibraryGlobals
    * fired
    */
    //    createLibraryGlobals() {
    //           global.library_version = '11.2.1.0';
    // /*
    //            VERSION HISTORY
    // -------------------------------------------------------------------------------------------------------------------
    // DATE          AUTHOR            VERSION              DESCRIPTION
    // -------------------------------------------------------------------------------------------------------------------
    // 10-Jul-2013  Niko Chu      11.2.1.0         Initial version
    // */
    //    }

    /*
     * This function executed when checkBlockErrors
    * fired
    */
    //    checkBlockErrors() {
    //          string  lv_block_name;//
    //          let  err_code;//
    //          let  err_type;//
    //          number  v_alert_no;//
    //        if (lv_block_name==='oic_invest_sta' ){
    //        if ((err_type==='frm' & err_code in (41105, 41106)) ){
    //        if ((err_code===41105) ){
    //         //TODO  v_alert_no :=
    //         //TODO  this.displayTheAlert('cfg_error','error: query of evidence must be in context of investigation',null,null,null,null);
    // throw new Error('form_trigger_failure');
    //        } else if ( (errCode===41106){
    //         //TODO  v_alert_no :=
    //         //TODO  this.displayTheAlert('cfg_error','error: insert of evidence must be in context of
    // investigation',null,null,null,null);
    // throw new Error('form_trigger_failure');
    //        }
    //        }
    //    }
    // }

    /*
     * This function executed when checkPackageFailure
    * fired
    */
    //    checkPackageFailure() {
    //        if (! ( form_success ) ){
    // throw new Error('form_trigger_failure');
    //        }
    //    }

    /*
     * This function executed when queryMasterDetails
    * fired
    */
    //    queryMasterDetails() {
    //          let  oldmsg;// Old Message Level Setting
    //          let  reldef;// Relation Deferred Setting
    //         //--
    //         //-- Initialize Local Variable(s)
    //         //--
    //           reldef = get_relation_property(rel_id, deferred_coordination);
    //           oldmsg = system.message_level;
    //         //--
    //         //-- If NOT Deferred, Goto detail and execute the query.
    //         //--
    //        if (reldef==='false' ){
    //         //TODO  go_block(detail);
    //         //TODO  check_package_failure;
    //           system.message_level = '10';
    //           executeQuery();;
    //           system.message_level = oldmsg;
    //        }else{
    //         //--
    //         //-- Relation is deferred, mark the detail block as un-coordinated
    //         //--
    //         //TODO  set_block_property(detail, coordination_status, non_coordinated);
    //        }
    //         //TODO
    //    }

    /*
     * This function executed when clearAllMasterDetails
    * fired
    */
    //    clearAllMasterDetails() {
    //          let  mastblk;// Initial Master Block Causing Coord
    //          let  coordop;// Operation Causing the Coord
    //          let  trigblk;// Cur Block On-Clear-Details Fires On
    //          let  startitm;// Item in which cursor started
    //          let  frmstat;// Form Status
    //          let  curblk;// Current Block
    //          let  currel;// Current Relation
    //          let  curdtl;// Current Detail Block
    //         //TODO
    //         //TODO  function first_changed_block_below(master varchar2)
    //         //TODO  return varchar2 is
    //          let  curblk;// Current Block
    //          let  currel;// Current Relation
    //          let  retblk;// Return Block
    //         //--
    //         //-- Initialize Local Vars
    //         //--
    //           curblk = master;
    //           currel = get_block_property(curblk,  first_master_relation);
    //         //--
    //         //-- While there exists another relation for this block
    //         //--
    //        while ( currel !== null ){
    //         //TODO  --
    //         //TODO  -- get the name of the detail block
    //         //TODO  --
    //           curblk = get_relation_property(currel, detail_name);
    //         //TODO  --
    //         //TODO  -- if this block has changes, return its name
    //         //TODO  --
    //         //TODO  if ( get_block_property(curblk, status) = 'changed' ) then
    //         //TODO  return curblk;
    //         //TODO  else
    //         //TODO  --
    //         //TODO  -- no changes, recursively look for changed blocks below
    //         //TODO  --
    //           retblk = first_changed_block_below(curblk);
    //         //TODO  --
    //         //TODO  -- if some block below is changed, return its name
    //         //TODO  --
    //         //TODO  if retblk is not null then
    //         //TODO  return retblk;
    //         //TODO  else
    //         //TODO  --
    //         //TODO  -- consider the next relation
    //         //TODO  --
    //           currel = get_relation_property(currel, next_master_relation);
    //         //TODO  end if;
    //         //TODO  end if;
    //        }
    //         //TODO
    //         //--
    //         //-- No changed blocks were found
    //         //--
    //         //TODO  return null;
    //         //TODO  end first_changed_block_below;
    //         //TODO
    //         //--
    //         //-- Init Local Vars
    //         //--
    //           mastblk  = system.master_block;
    //           coordop  = system.coordination_operation;
    //           trigblk  = system.trigger_block;
    //           startitm = system.cursor_item;
    //           frmstat  = system.form_status;
    //         //TODO
    //         //--
    //         //-- If the coordination operation is anything but CLEAR_RECORD or
    //         //-- SYNCHRONIZE_BLOCKS, then continue checking.
    //         //--
    //        if (coordop ! in ('clear_record', 'synchronize_blocks') ){
    //         //--
    //         //-- If we're processing the driving master block...
    //         //--
    //        if (mastblk===trigblk ){
    //         //--
    //         //-- If something in the form is changed, find the
    //         //-- first changed block below the master
    //         //--
    //        if (frmstat==='changed' ){
    //           curblk = first_changed_block_below(mastblk);
    //         //--
    //         //-- If we find a changed block below, go there
    //         //-- and Ask to commit the changes.
    //         //--
    //        if (curblk !== null ){
    //         //TODO  go_block(curblk);
    //         //TODO  check_package_failure;
    //         //TODO  clear_block(ask_commit);
    //         //--
    //         //-- If user cancels commit dialog, raise error
    //         //--
    //        if (! ( system.form_status==='query' || system.block_status==='new' ) ){
    // throw new Error('form_trigger_failure');
    //        }
    //        }
    //        }
    //        }
    //        }
    //         //TODO
    //         //--
    //         //-- Clear all the detail blocks for this master without
    //         //-- any further asking to commit.
    //         //--
    //           currel = get_block_property(trigblk, first_master_relation);
    //        while ( currel !== null ){
    //           curdtl = get_relation_property(currel, detail_name);
    //         //TODO  if get_block_property(curdtl, status) <> 'new'  then
    //         //TODO  go_block(curdtl);
    //         //TODO  check_package_failure;
    //         //TODO  clear_block(no_validate);
    //         //TODO  if :system.block_status <> 'new' then
    // throw new Error('form_trigger_failure');
    //         //TODO  end if;
    //         //TODO  end if;
    //           currel = get_relation_property(currel, next_master_relation);
    //        }
    //         //TODO
    //         //--
    //         //-- Put cursor back where it started
    //         //--
    //        if (system.cursor_item  !==  startitm ){
    //         //TODO  go_item(startitm);
    //         //TODO  check_package_failure;
    //        }
    //         //TODO
    //    }

    /*
     * This function executed when captureImage
    * fired
    */
    //    captureImage() {
    //         //--
    //         //-- Rajshree 07/03/2006 Modified procedure as per new data model changes.
    //         //--
    //          number  p_image_id;//
    //         //TODO  p_image_type   varchar2,
    //         //TODO  p_image_view   varchar2
    //         //TODO  )
    //         //TODO  is
    //          number  lv_alert;//
    //          string  v_command;//
    //          string  v_form;//
    //           v_has_image   integer       = 0;
    //         //TODO  v_alert_id    integer;
    //          List  pl_id;//
    //           pl_id = get_parameter_list ('tmpdata');
    //         //TODO
    //        if (! id_null (pl_id) ){
    //         //TODO  destroy_parameter_list (pl_id);
    //        }
    //         //TODO
    //           pl_id = create_parameter_list ('tmpdata');
    //         //TODO  add_parameter (pl_id, 'image_object_id', text_paramer, p_image_id);
    //         //TODO  add_parameter (pl_id, 'image_object_type', text_parameter, p_image_type);
    //         //TODO  add_parameter (pl_id, 'image_view_type', text_parameter, p_image_view);
    //           global.calling_form = 'oidoicus';
    //         //--CALL_FORM ('OIUIMAGE', NO_HIDE, NO_REPLACE, NO_QUERY_ONLY, PL_ID);
    //         //TODO  call_form ('oiuimage', hide, no_replace, no_query_only, pl_id);
    //         //TODO
    //    }

    /*
     * This function executed when alertNoNode
    * fired
    */
    //    alertNoNode() {
    //         //-- @@@ Baharak 21-JAN-03: Added ALERT_NO_NODE to show the proper alert message, depending on existence of the tree
    //         //TODO  al_id        alert:=find_alert('cfg_information');
    //          number  al_result;//
    //         //TODO  htree        item;
    //          number  htree_count;//
    //          string  al_msg;//
    //         //TODO  htree      :=find_item('tree_blk.a_tree');
    //         //TODO  htree_count:=ftree.get_tree_property(htree,ftree.node_count);
    //         //TODO
    //        if (htree_count=0 ){
    //         //TODO  al_msg:='there are no oic incidents for this offender.';
    //        }else{
    //         //TODO  al_msg:='please select an oic incident before attempting to view tabbed pages.';
    //        }
    //         //TODO
    //         //TODO  set_alert_property(al_id,alert_message_text,al_msg);
    //         //TODO  al_result:=show_alert(al_id);
    //    }

    /*
     * This function executed when createLibraryGlobalsBak
    * fired
    */
    //    createLibraryGlobalsBak() {
    //           global.library_version = '10.2.17.1.4';
    //         //TODO
    // /*
    // VERSION HISTORY
    // -------------------------------------------------------------------------------------------------------------------
    // DATE          AUTHOR            VERSION             DESCRIPTION
    // -------------------------------------------------------------------------------------------------------------------
    // 10-Jun-2013   Mohit         10.2.17.1.4     HPQC#19983 - Modified call_form statement in capture_image procedure
    // 20-Jan-2012   Sona          10.2.17.1.3
    // #5705:Increased the maximum length property value from 70 to 71 for OIC_INVEST.NBT_INVESTIGATOR_ID.
    // 27-Sep-2011   Abhishek      10.2.17.1.2     #6445: Set Modal property to Yes of OCUOICIN Window.
    // 22-Jun-2009   Erin          10.2.17.1.1     #417: set CAMERA_PC button to iconic = yes
    // 18-Jul-2007     Niko                10.2.17.1.0     Modified the Media button to call oiuimage
    // 14-Jun-2007     Manish              10.2.17         Modified the window title as per design doc
    // 30-Jan-2007   A.Adekoya         10.2.16         #5956: AT Compliance
    // 30-May-2006   D Rice        10.2.12         Defect# 641 & 2131 - Added parameter: p_party_seq.
    //                                                                                        Added WHERE clause to block: OIC_INVEST
    //  Added extra code to assign the party_seq to the relevant field in PRE-INSERT
    //                                                                                        trigger of block: OIC_INVEST
    // 29-MAR-2006   Rajshree      10.2.10         Modified screen fro image data model changes.
    // 27-OCT-2005     GJC                     10.2.9                  Use COMMENT_TEXT not ASSIGNED_COMMENT_TEXT Track+ 830
    // 19-SEP-2005   GJC           10.2.8          Removed exception handling from form level pre-query trigger
    // 15-SEP-2005   Neil          10.2.7          Added check block errors messages
    // 14-SEP-2005   Neil          10.2.5          Changed sizes of LOV's
    // 14-SEP-2005   Neil          10.2.5          Reset X coordinate after it was changed by API
    // 31-AUG-2008   GJC           10.2.0          Initial version.
    //
    // */
    //    }

    /*
     * This function executed to disable investigation Grid investigator column
     */
    canInvestigatorEdit = ( data: any, index: number, field: string ): boolean => {

        if ( data.investigatorIdDes && data.agencyIncidentId ) {
            return false;
        }
        return true;
    }

    /*
     * This function executed when we click on add button in Evidence Block on that
     * generate current date value in date column and verify the investigator is exists or not
     */
    onGridInsertEvidence = () => {
        if ( this.oicinvestData.length === 0 ) {
            this.oicinveststaData = [];
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoicin.insertofevidence');
            this.show();
            return;
        }
        if ( this.vaddTemp.agencyIncidentId === undefined ) {
            this.oicinveststaData = [];
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoicin.pleaseselectrecordfrominvest');
            this.show();
            return;
        }
        if ( this.oicinvestData.length > 0 &&  this.vaddTemp.agencyIncidentId === undefined ) {
            this.oicinveststaData = [];
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoicin.insertofevidence');
            this.show();
            return;
        }
        if ( this.oicinvestData.length === 0 ) {
            this.oicinveststaData = [];
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoicin.queryofevidence');
            this.show();
            return;
        }
        for ( let i = 0; i < this.oicinveststaData.length; i++ ) {
            if ( !this.oicinveststaData[i].statementType ) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.typemustbeentered');
                this.show();
                return;
            }
            if ( !this.oicinveststaData[i].dateOfStatementTaken ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.datemustbeentered');
                this.show();
                return;
            }
            if ( !this.oicinveststaData[i].statementDetail ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.detailmustbeentered');
                this.show();
                return;
            }
        }
        return { assignedDate: DateFormat.getDate(), dateOfStatementTaken: DateFormat.getDate() };
    }
    /*
     * This function executed when we click on add button in Investigation Block on that
     * generate current date value in date column
     */
    onGridInsertCol = () => {
       /*  for ( let i = 0; i < this.oicinvestData.length; i++ ) {
            if (!(this.oicinvestData[i].investigatorIdDes && this.oicinvestData[i].assignedDate)) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.recordmustbeentered' );
                this.show();
                return ;
            }
            if ( !this.oicinvestData[i].investigatorId ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.investigatoridmustbeentered');
                this.show();
                return;
            }
            if ( !this.oicinvestData[i].assignedDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.dateassignedmustbeentered');
                this.show();
                return;
            }
        } */
        return { assignedDate: DateFormat.getDate(), dateOfStatementTaken: DateFormat.getDate() };
    }
    /*
    * This event is fired when click on Remove button in Investigation block.
    * it throws a validation message when Evidence block contains data.
    */
    onGridDeleteInv = () => {
        if (this.oicinveststaData.length > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.cannotdeletemasterrecord');
            this.show();
            return false;
        }
        {
            return true;
        }
    }
    ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }

}
