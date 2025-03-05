import {
      Component,
      OnInit,
      ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OidissueService } from '@inst/offender-issues-tracking/service/oidissue.service';
import { OffenderGrievanceTxns } from '@instoffenderissuestrackingbeans/OffenderGrievanceTxns';
import { OffenderGrievanceTxnsCommitBean } from '@instoffenderissuestrackingbeans/OffenderGrievanceTxnsCommitBean';
import { OffenderGrievances } from '@instoffenderissuestrackingbeans/OffenderGrievances';
import { OffenderGrievancesCommitBean } from '@instoffenderissuestrackingbeans/OffenderGrievancesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OffenderGrievStaffs } from '../beans/OffenderGrievStaffs';
import { GrievanceTypes } from '../maintenance/beans/GrievanceTypes';


@Component({
      selector: 'app-oidissue',
      templateUrl: './oidissue.component.html'
})

export class OidissueComponent implements OnInit {
      @ViewChild('grid') grid: any;
      @ViewChild('issueGrid') issueGrid: any;
      serviceData: any;
      actionName: string;
      lovModel: any[];
      msgs: any[] = [];
      nameOfLovPage: string;
      listToCompare: any[] = [];
      offendergrievancesData: OffenderGrievances[] = [];
      offendergrievancesModel: OffenderGrievances = new OffenderGrievances();
      offendergrievancesIndex: number;
      offendergrievancesInsertList: OffenderGrievances[] = [];
      offendergrievancesUpdateList: OffenderGrievances[] = [];
      offendergrievancesDeleteList: OffenderGrievances[] = [];
      offendergrievancesCommitModel: OffenderGrievancesCommitBean = new OffenderGrievancesCommitBean();
      offendergrievancetxnsData: OffenderGrievanceTxns[] = [];
      offendergrievancetxnsModel: OffenderGrievanceTxns = new OffenderGrievanceTxns();
      offgrievanceTxnsCommitModel: OffenderGrievanceTxns = new OffenderGrievanceTxns();
      offendergrievancetxnsIndex: number;
      offendergrievancetxnsInsertList: OffenderGrievanceTxns[] = [];
      offendergrievancetxnsUpdateList: OffenderGrievanceTxns[] = [];
      offendergrievancetxnsDeleteList: OffenderGrievanceTxns[] = [];
      offendergrievancetxnsCommitModel: OffenderGrievanceTxnsCommitBean = new OffenderGrievanceTxnsCommitBean();
      vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
      listdata: GrievanceTypes[]=[];
      obj:GrievanceTypes = new GrievanceTypes();
      minDate: Date;
      display: boolean;
      errorMessage: string;
      headerMessage: string;
      disabled: boolean;
      editable: boolean;
      vOffAuthVisColumnDef: any[];
      offCaseNrColumnDef: any[];
      teamsColumnDef: any[];
      perIdentColumnDef: any[];
      profilesColumnDef: any[];
      perEmpColumnDef: any[];
      perAddrColumnDef: any[];
      offenderGrievancesColumnDef: any[];
      offenderGrievanceTxnsColumnDef: any[];
      offNotesColumnDef: any[];
      offCntPerColumnDef: any[];
      bedAhColumnDef: any[];
      contactsColumnDef: any[];
      offCntPerReadOnly: boolean;
      perAddrReadOnly: boolean;
      perIdentReadOnly: boolean;
      perInfoReadOnly: boolean;
      perEmpReadOnly: boolean;
      vOffAuthVisReadOnly: boolean;
      contactsReadOnly: boolean;
      offCaseNoteReadOnly: boolean;
      amendNoteReadOnly: boolean;
      personsReadOnly: boolean;
      offCaseNrReadOnly: boolean;
      profilesReadOnly: boolean;
      srchCtrlReadOnly: boolean;
      teamsReadOnly: boolean;
      butCtrlReadOnly: boolean;
      crtMvTmpReadOnly: boolean;
      bedAhReadOnly: boolean;
      offNotesReadOnly: boolean;
      cntlReadOnly: boolean;
      vOffBkgReadOnly: boolean;
      sysPflReadOnly: boolean;
      offenderGrievancesReadOnly: boolean;
      offenderGrievanceTxnsReadOnly: boolean;
      rgagylocRg: any[] = [];
      rgagylocallRg: any[] = [];
      rggrievtypeRg: any[] = [];
      rggrievreasonRg: any[] = [];
      rggrievreasonallRg: any[] = [];
      rgtxntypeRg: any[] = [];
      rgtxntypeallRg: any[] = [];
      rgstaffRg: any[] = [];
      rgstaffallRg: any[] = [];
      rgfindingRg: any[] = [];
      rgfindingallRg: any[] = [];
      rglevelRg: any[] = [];
      rglevelallRg: any[] = [];
      rgstatusRg: any[] = [];
      tableIndex = -1;
      tableTxnsIndex = -1;
      transaction: any;
      grievType: any;
      type = 'error';
      msglist = [];
      message = ' Invalid.';
      agyLocId: any;
      grievanceInsert: boolean;
      grievanceTxnsInsert: boolean;
      createUserId: any;
      claim: any;
      savedisabled: boolean;
      saveTxnsDisabled: boolean;
      commentText: string;
      proposedResponse: string;
      officialResponse: string;
      modalData: any;
      grievanceDelete: boolean;
      grievanceTxnsDelete: boolean;
      rootOffenderId: any;
      codeTitle = { 'description': 'Description', 'code': 'Issue Type' };
      reasonTitle = { 'description': 'Description', 'code': 'Issue Reason' };
      assignedTitle = { 'description': 'Name', 'code': 'ID#' };
      offResponsedisabled: boolean;
      commentDisabled: boolean;
      daysLeftValue: string;
      daysLesftTemp: any;
      daysLeftBind: any;
      startDate: any;
      appendReadOnly: boolean;
      flag: boolean;
      daysFlag: boolean;
      proposeRspDisabled: boolean;
      grievanceId: any;
      startDateTemp: Date;
      transactionFlag: boolean;
      defaultRowFlag: boolean;
      clearDisale: boolean;
      clearOffDisable: boolean;
      daysLeft: any;
      grievUpdate: boolean;
      rowFlag: boolean;
      daysLeftFlag: boolean;
      staffInvBut: boolean;
      enablePropertyRole: boolean;
      staffInvlovedFlag: boolean = false;
      staffFlag:string;
      userName: any;
      OffenderGrievStaffs :OffenderGrievStaffs=new OffenderGrievStaffs();
      childRecordCount:number=0;
      screenId ='OIDISSUE';
      activeRecordCount: number;
      constructor(private oidissueFactory: OidissueService,
            public translateService: TranslateService,
            private offenderSearchService: OffenderSearchService,
            private sessionManager: UserSessionManager,
            private router: Router,
            public dialogService: DialogService,
            private eoffenderService: EoffenderService) {
            this.vOffAuthVisColumnDef = [];
            this.offCaseNrColumnDef = [];
            this.teamsColumnDef = [];
            this.perIdentColumnDef = [];
            this.profilesColumnDef = [];
            this.perEmpColumnDef = [];
            this.perAddrColumnDef = [];
            this.offenderGrievancesColumnDef = [];
            this.offenderGrievanceTxnsColumnDef = [];
            this.offNotesColumnDef = [];
            this.offCntPerColumnDef = [];
            this.bedAhColumnDef = [];
            this.contactsColumnDef = [];
      }
      onGridReady(event) {
      }
      ngOnInit() {
            const user =  this.sessionManager.getId();
            this.serviceData = this.oidissueFactory.serviceData ? this.oidissueFactory.serviceData : undefined;
            this.oidissueFactory.serviceData = undefined;
            this.savedisabled = true;
            this.saveTxnsDisabled = true;
            this.grievanceInsert = false;
            this.grievanceTxnsInsert = false;
            this.offResponsedisabled = true;
            this.commentDisabled = true;
            this.appendReadOnly = true;
            this.daysFlag = false;
            this.proposeRspDisabled = true;
            this.transactionFlag = false;
            this.clearDisale = true;
            this.clearOffDisable = true;
            this.grievanceDelete = true;
            this.grievUpdate = true;
            this.staffInvBut = true;
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
            this.enablePropertyRole = false;
            this.getUserName();
            this.offenderGrievancesColumnDef = [
                  { fieldName: this.translateService.translate('oidissue.issueid'), field: 'grievanceId', editable: false, width: 150 },
                  {
                        fieldName: this.translateService.translate('common.datemandatory'), field: 'reportDate', datatype: 'date',
                        editable: true, width: 150, cellEditable: this.canGrievanceDateEdit
                  },
                  {
                        fieldName: this.translateService.translate('oidissue.issuetype'), field: 'grievType', datatype: 'lov',
                        link: 'oidissue/rgGrievTypeRecordGroup?user='+user , editable: true, width: 200, cellEditable: this.canGrievanceEdit,
                        titles: this.codeTitle,source:'OIMISSUE'
                  },
                  {
                        fieldName: this.translateService.translate('oidissue.issuereason'), field: 'grievReasonCode', datatype: 'lov',
                         editable: true,link: 'oidissue/rgGrievReasonRecordGroup?user=' +user + '&grievType=', parentField: 'grievType',
                        width: 150, titles: this.reasonTitle, cellEditable: this.canGrievanceEdit,source:'OIMISSUE'
                  },
            
                  {
                        fieldName: this.translateService.translate('common.incident'), field: 'agencyIncidentId', editable: false,
                        width: 100, maxlength: 10
                  },
                  {
                        fieldName: '', field: 'goButton', datatype: 'launchbutton', link: '/OIUINCRE', modal: true,
                        data: 'row', updateField: 'row', editable: true, dialogWidth: 40,isDisable: this.isDialogDisable
                  },
                  {
                        fieldName: this.translateService.translate('oidissue.claim'), field: 'claimAmount',
                        editable: true, width: 150, datatype: 'number', format: '1.2-2', maxValue: 999.99,whole: true,strictFP: true,cellEditable: this.canFielddEdit
                  },
                  {
                        fieldName: this.translateService.translate('oidissue.filed'), field: 'agyLocId', datatype: 'lov',
                        link: 'oidissue/rgAgyLocRecordGroup', editable: true, width: 150, maxlength: 40,source:'OUMAGLOC',cellEditable: this.canFielddEdit
                  },
                  {
                        fieldName: this.translateService.translate('oidissue.currentlevel'), field: 'currLevel',
                        datatype: 'lov', domain:'GRIEV_LEVEL'/*link: 'oidissue/rgLevelRecordGroup'*/, editable: false, width: 200
                  },
                  {
                        fieldName: this.translateService.translate('common.status'), field: 'currStatus', editable: false,
                        width: 150, datatype: 'lov',domain:'GRIEV_STATUS'/* link: 'oidissue/rgStatusRecordGroup'*/
                  },
                  {
				fieldName: this.translateService.translate('common.iwpdocument')
				, field: 'butIwp', datatype: 'hyperlink',onLaunchClick: this.onEoffenderClick,
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
			},
                  {
                        fieldName: '', field: 'commentText', hide: true
                  },
                  {
                        fieldName: '', field: 'staffInvolvedFlag', hide: true
                  },

            ];
            this.offenderGrievanceTxnsColumnDef = [
                  {
                        fieldName: this.translateService.translate('common.datemandatory'), field: 'startDate', datatype: 'date',
                        editable: true, width: 150,cellEditable: this.canFieldOneEdit
                  },
                  {
                        fieldName: this.translateService.translate('common.transaction'), field: 'txnType', datatype: 'lov',
                        link: 'oidissue/rgTxnTypeAllRecordGroup?grievType=', parentField: 'parentGrievType',
                        editable: true, width: 150, cellEditable: this.canGrievanceTxnsEdit,source:'OIMISSUE'
                  },
                  {
                        fieldName: this.translateService.translate('common.finding'), field: 'finding', datatype: 'lov',
                        domain:'GRIEV_FINDIN'/*link: 'oidissue/rgFindingRecordGroup'*/, editable: true, width: 150, maxlength: 12,cellEditable: this.canFieldOneEdit
                  },
                  {
                        fieldName: this.translateService.translate('oidissue.assignedto'), field: 'assignedStaffId', datatype: 'lov',
                        link: 'oidissue/rgStaffRecordGroup', editable: true, width: 150, descTitle: 'Name',
                        codeTitle: 'ID#', maxlength: 71, titles: this.assignedTitle,source:'OUMPERSO',cellEditable: this.canFieldOneEdit
                  },
                  {
                        fieldName: this.translateService.translate('oidissue.level'), field: 'grievLevel', datatype: 'lov',
                        domain:'GRIEV_LEVEL'/*link: 'oidissue/rgLevelRecordGroup'*/, editable: true, width: 150,cellEditable: this.canFieldOneEdit
                  },
                  {
                        fieldName: this.translateService.translate('oidissue.daysleft'), field: 'daysLeft',
                        editable: false, width: 150, datatype: 'number'
                  },
                  {
                        fieldName: this.translateService.translate('oidissue.user'), field: 'createUserId',
                        editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('common.statusmandatory'), field: 'status', datatype: 'lov',
                        domain:'GRIEV_STATUS'/*link: 'oidissue/rgStatusRecordGroup'*/, editable: true, width: 150,cellEditable: this.canFieldOneEdit
                  },
                  {
                        fieldName: '', field: 'officialResponse', hide: true
                  },
            ];
            this.onloadRoleBasedEnableCall();
            if (!this.vHeaderBlockModel) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                  this.show();
                  return;
            }

      }
      isDialogDisable(data) {
            if (data.createFlag === 'N') {
                  return true;
            } else {
                  return false;
            }
        }
      canFielddEdit  = (data: any, index: number, field: string): boolean => {
            if (data.createFlag === 'N') {
                  return false;
            } else {
                  return true;
            }
      }
      canFieldOneEdit = (data: any, index: number, field: string): boolean => {
            if (this.offendergrievancesModel.createFlag === 'N') {
                  return false;
            } else {
                  return true;
            }
      }
      onloadRoleBasedEnableCall() {
            const serviceObj = this.oidissueFactory.oidissueWhenNewFormInstance();
            serviceObj.subscribe(data => {
                  if (data > 0) {
                        this.enablePropertyRole = true;
                  } else {
                        this.enablePropertyRole = false;
                  }
            });
      }
      
      onOffenderChange(offender) {
            this.offendergrievancesData = [];
            this.offendergrievancetxnsData = [];
            this.commentText = '';
            this.proposedResponse = '';
            this.officialResponse = '';
            this.staffInvBut = true;
            if (offender) {
                  if (offender.rootOffenderId) {
                        this.rootOffenderId = offender.rootOffenderId;
                  }
                  this.vHeaderBlockModel = offender;
                  this.daysFlag = false;
                  this.grievanceInsert = true;
                  if (this.vHeaderBlockModel.agyLocId) {
                        this.agyLocId = '';
                        this.agyLocId = this.vHeaderBlockModel.agyLocId;
                  }

                  this.oidissueexecuteQuery();
            } else {
                  this.offendergrievancesData = [];
                  this.offendergrievancetxnsData = [];
                  this.offendergrievancesModel = new OffenderGrievances();
                  this.offendergrievancetxnsModel = new OffenderGrievanceTxns();
                  this.offendergrievancesModel.commentText = '';
                  this.grievanceInsert = false;
                  this.grievanceTxnsInsert = false;
                  this.commentText = '';
                  this.proposedResponse = '';
                  this.officialResponse = '';
                  this.offResponsedisabled = true;
                  this.appendReadOnly = true;
                  this.daysFlag = false;
                  this.proposeRspDisabled = true;
                  this.clearDisale = true;
                  this.savedisabled = true;
                  this.clearOffDisable = true;
                  this.saveTxnsDisabled = true;
                  this.grievanceDelete = true;
            }
      }
      onRowClickoffendergrievances(event) {
            if (event) {
                  this.offendergrievancesModel = event;
                  this.OffenderGrievStaffs.grievanceId=event.grievanceId;
                  this.countChildForGrivences();
                 
                  if (event && event.staffInvolvedFlag && event.staffInvolvedFlag === 'Y' && event.grievanceIdCur) {
                        this.staffInvBut = false;
                  } else {
                        this.staffInvBut = true;
                  }
                  
                  if (event.grievType && event.createFlag==='Y' ) {
                        this.grievanceTxnsInsert = true;
                  } else {
                        this.grievanceTxnsInsert = false;
                  }
                  if (this.offendergrievancesModel.commentText) {
                        this.clearDisale = false;
                  } else {
                        this.clearDisale = true;
                  }
                  this.commentDisabled = false;
                  this.offendergrievancesModel = event;
                  this.commentText = this.offendergrievancesModel.commentText;
                  this.offendergrievancetxnsModel = new OffenderGrievanceTxns();
                  if (this.offendergrievancesModel.grievanceId) {
                        this.eoffenderService.selectedRowData=event;
                        this.offendergrievancetxnsExecuteQuery();
                        this.validationStaff();
                  }else{
                        this.eoffenderService.selectedRowData=null; 
                  }
                  if (event.grievType) {
                        this.grievType = event.grievType;
                  }
      
                  if (event.grievanceId) {
                        this.grievanceId = event.grievanceId;
                        this.savedisabled = true;
                        this.grievanceDelete = true;
                        this.appendReadOnly = false;
                        this.flag = false;
                  } else {
                        this.offendergrievancetxnsData = [];
                        this.offendergrievancetxnsModel = new OffenderGrievanceTxns();
                        this.savedisabled = true;
                        this.grievanceDelete = false;
                        this.offendergrievancesModel.commentText = '';
                        this.proposedResponse = '';
                        this.officialResponse = '';
                        this.appendReadOnly = true;
                        this.flag = true;
                  }
            } else {
                  this.offendergrievancetxnsData = [];
                  this.offendergrievancetxnsModel = new OffenderGrievanceTxns();
                  this.grievanceTxnsInsert = false;
                  this.commentDisabled = true;
                  this.appendReadOnly = false;
                  this.staffInvBut = true;
            }
      }
      validationStaff() {
            const offbkGlobal = this.oidissueFactory.validationStaff(this.offendergrievancesModel.grievanceId);
            offbkGlobal.subscribe(data => {
                  this.offendergrievancesModel.staffExists = data;
            });
      }
      setDescriptionData() {
            this.validationStaff();
      }
      vHeadDataInst() {
            const offbkGlobal = this.oidissueFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
            offbkGlobal.subscribe(list => {
                  if (list.length > 0) {
                        this.vHeaderBlockModel = list;
                  }
            });
      }
      vHeadDataComm() {
            const offbkGlobal = this.oidissueFactory.offbkgCommGlobalQuery(this.vHeaderBlockModel);
            offbkGlobal.subscribe(list => {
                  if (list.length > 0) {
                        this.vHeaderBlockModel = list;
                  }
            });
      }
      allowNumbers(event) {
      }
      onStaffInvButclick() {
      }
      onRowClickoffendergrievancetxns(event) {
            if (event) {
                  this.offendergrievancetxnsModel = event;
                  if (this.offendergrievancetxnsModel.officialResponse) {
                        this.clearOffDisable = false;
                  } else {
                        this.clearOffDisable = true;
                  }
                  if (this.enablePropertyRole) {
                        this.offResponsedisabled = false;
                  } else {
                        this.offResponsedisabled = true;
                  }
                  this.proposeRspDisabled = false;
                  if (event.grievanceId) {
                        this.saveTxnsDisabled = true;
                        this.grievanceTxnsDelete = true;
                        this.proposeRspDisabled = true;
                  } else {
                        this.saveTxnsDisabled = true;
                        this.grievanceTxnsDelete = false;
                        this.proposeRspDisabled = false;
                        this.offendergrievancetxnsModel.proposedResponse = '';
                        this.offendergrievancetxnsModel.officialResponse = '';
                  }
                  this.offendergrievancetxnsModel = event;
                  this.proposedResponse = this.offendergrievancetxnsModel.proposedResponse;
                  this.officialResponse = this.offendergrievancetxnsModel.officialResponse;
            } else {
                  this.offResponsedisabled = true;
                  this.proposeRspDisabled = true;
            }

      }
      onAppendButclick() {
      }
      ok() {
      }
      no() {
      }
      cancel() {
            this.commentText = '';
            this.clearDisale = true;
            if (this.offendergrievancesModel.commentText) {
                  this.savedisabled = false;
            } else {
                  this.savedisabled = false;
            }
      }
      clear() {
            this.officialResponse = '';
            this.clearOffDisable = true;
            if (this.offendergrievancetxnsModel.officialResponse) {
                  this.saveTxnsDisabled = false;
            } else {
                  this.saveTxnsDisabled = true;
            }
      }
      validateRowData = (event) => {
            this.grievanceTxnsInsert = true;
            const rowdata = new ValidateRowReturn();
            rowdata.validated = true;
            if (event.data.grievType) {
                  this.grievanceTxnsInsert = true;
                  if (!this.offendergrievancetxnsData[0]) {
                        this.defaultRowFlag = true;
                        this.rowFlag = true;
                  }
            } else {
                  this.grievanceTxnsInsert = false;
            }
            if (event.field === 'grievType' && event.data.grievType && event.newData !== event.oldData && !event.oldData) {
                  if (event.data.grievType === 'GRV_STAFF') {
                        event.data.grievReasonCode = 'DSC';
                        this.issueGrid.setColumnData('grievType', this.offendergrievancesData.indexOf(event.data),
                              event.data.grievReasonCode);
                  }
            }
            const listdata = this.oidissueFactory.rgGrievTypeRecordGroup(this.obj);
            listdata.subscribe(data => {
                  if (data) {
                        data.forEach(lovRecord => {
                              if (lovRecord.code === event.data.grievType) {
                                    this.issueGrid.setColumnData('staffInvolvedFlag', event.rowIndex, lovRecord.staffInvolvedFlag);
                              }
                        });
                  }
            });
            if (event.data.reportDate && event.newData !== event.oldData && !event.oldData) {
                  if (DateFormat.compareDate(event.data.reportDate, DateFormat.getDate()) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidissue.issuereportdatecannotbefuture');
                        this.show();
                        return;
                  }
            }
            /* if (event.data.claimAmount) {
                  var r=/^[a-zA-Z.?\:?\s]*$/;
                  if (event.data.claimAmount > 1000 || r.test(event.data.claimAmount) || event.data.claimAmount.includes(':')) {
                        this.issueGrid.setColumnData('claimAmount', this.offendergrievancesData.indexOf(event.data),undefined);
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidissue.filedmustbeform');
                        this.show();
                        return;
                  }
                  if (event.field === 'claimAmount' && Number(event.newValue) !== Number(event.oldValue)) {
                        if (event.newValue) {
                              this.issueGrid.setColumnData('claimAmount', this.offendergrievancesData.indexOf(event.data),
                                    Number(event.newValue).toFixed(2));
                        }
                  }
            } */
            return rowdata;
      }

      validateRowGrieveTxnsData = (event) => {
            const rowIndex = event.rowIndex;
            const rowdata = new ValidateRowReturn();
            rowdata.validated = true;
            if (event.field === 'txnType' && event.data.txnType && event.newValue !== event.oldValue && !event.oldValue) {
                  const txnTypeData = this.oidissueFactory.daysRespondData(this.offendergrievancesModel.grievType, event.data.txnType);
                  txnTypeData.subscribe(daysLeftdata => {
                        if (daysLeftdata > 0) {
                              event.daysLeft = null;
                              for (let i = 0; i < this.offendergrievancetxnsData.length; i++) {
                                    if (this.offendergrievancetxnsData[i].txnSeq) {
                                          this.daysLeftFlag = true;
                                    }
                              }
                              if (!this.daysLeftFlag) {
                                    if (event.data.startDate && daysLeftdata) {
                                          this.startDate = DateFormat.getDate(event.data.startDate);
                                          this.startDate = String(this.startDate);
                                          const startDateTemp = this.startDate.split(' ');
                                          const dateTemp = startDateTemp[2];
                                          this.daysLeftValue = daysLeftdata;
                                          this.daysLesftTemp = Number(dateTemp) + this.daysLeftValue;
                                          const index = rowIndex;
                                          const currentDate = DateFormat.getDate().getDate();
                                          const daysLeftNumber = this.daysLesftTemp - currentDate;
                                          if (daysLeftNumber > 99) {
                                                this.daysLeftBind = 99;
                                          } else if (daysLeftNumber < -99) {
                                                this.daysLeftBind = -99;
                                          } else {
                                                this.daysLeftBind = daysLeftNumber;
                                          }
                                          this.grid.setColumnData('daysLeft', index, this.daysLeftBind);
                                          this.offendergrievancetxnsData[index].endDate =
                                                DateFormat.getDate(DateFormat.getDate(this.startDate).getTime()
                                                      + (24 * 60 * 60 * 1000 * this.daysLeftBind));
                                    }
                              }
                        }
                  });

            }
            if (event.field === 'startDate' && event.data.startDate && event.newValue !== event.oldValue) {
                  /* if ((event.data.startDate) && ((event.data.startDate < DateFormat.getDate(this.offendergrievancesModel.reportDate))
                        || (event.data.startDate > DateFormat.getDate()))
                        || (event.data.startDate < DateFormat.getDate(this.startDateTemp))) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidissue.transactiondatecurrentdate');
                        this.show();
                        rowdata.validated = true;
                        return rowdata;
                  } */

                  if (event.data.startDate) {
                        if (DateFormat.compareDate(DateFormat.getDate(event.data.startDate),
                              DateFormat.getDate(DateFormat.getDate())) === 1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.transactiondatecurrentdate');
                              this.show();
                              rowdata.validated = true;
                              return rowdata;
                        } else if (DateFormat.compareDate(DateFormat.getDate(event.data.startDate),DateFormat.getDate(this.offendergrievancesModel.reportDate)) === -1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.transactiondatecurrentdate');
                              this.show();
                              rowdata.validated = true;
                              return rowdata;
                        } else if (event.rowIndex > 0 && DateFormat.compareDate(DateFormat.getDate(event.data.startDate),
                              DateFormat.getDate(this.offendergrievancetxnsData[event.rowIndex - 1].startDate)) === -1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.transactiondatecurrentdate');
                              this.show();
                              rowdata.validated = true;
                              return rowdata;
                        }
                  }
            }
            return rowdata;
      }

      /**
       *  This function will be executed when commit event is
      * fired
      */
      oidissueSaveoffendergrievancesForm(event) {
            this.offendergrievancesInsertList = event.added;
            this.offendergrievancesUpdateList = event.updated;
            this.offendergrievancesDeleteList = event.removed;
            this.offendergrievancesCommitModel.insertList = [];
            this.offendergrievancesCommitModel.updateList = [];
            this.offendergrievancesCommitModel.deleteList = [];
            this.offendergrievancesCommitModel.offenderGrievanceTxnsList = [];
            if (this.offendergrievancesInsertList.length > 0 || this.offendergrievancesUpdateList.length > 0) {
                  for (let i = 0; i < this.offendergrievancesInsertList.length; i++) {
                        if (!this.offendergrievancesInsertList[i].reportDate) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('common.datemustbeentereddate');
                              this.show();
                              return;
                        }
                        if (this.offendergrievancesInsertList[i].reportDate) {
                              const reportDate = DateFormat.getDate(this.offendergrievancesInsertList[i].reportDate);
                              if (DateFormat.compareDate(reportDate,
                                    DateFormat.getDate()) === 1) {
                                    this.type = 'warn';
                                    this.message = this.translateService.translate('oidissue.issuereportdatecannotbefuture');
                                    this.show();
                                    return;
                              }
                        }
                        if (!this.offendergrievancesInsertList[i].grievType) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.issuetypemustbeentered');
                              this.show();
                              return;
                        }
                        if (!this.offendergrievancesInsertList[i].grievReasonCode) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.issuereasonmustbeentered');
                              this.show();
                              return;
                        }
                        if (this.offendergrievancesInsertList[i].claimAmount > 1000) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.filedmustbeform');
                              this.show();
                              return;
                        }
                        if (!this.offendergrievancesInsertList[i].agyLocId) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.filedatmustbeentered');
                              this.show();
                              return;
                        }
                        if (this.offendergrievancesInsertList[i].agyLocId === 'TRN'
                              || this.offendergrievancesInsertList[i].agyLocId === 'OUT') {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.invalidvalue');
                              this.show();
                              return;
                        }
                        if (this.offendergrievancesInsertList[i].staffInvolvedFlag === 'Y') {
                              this.staffInvlovedFlag = true;
                        }
                        this.offendergrievancesInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                        this.offendergrievancesInsertList[i].claimAmount = Number(this.offendergrievancesInsertList[i].claimAmount);
                        this.offendergrievancesCommitModel.insertList = this.offendergrievancesInsertList;
                  }
                  for (let i = 0; i < this.offendergrievancesUpdateList.length; i++) {
                        if (!this.offendergrievancesUpdateList[i].agyLocId) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.filedatmustbeentered');
                              this.show();
                              return;
                        }
                  }
            }
            if (this.offendergrievancesInsertList.length > 0) {
                  if (this.offendergrievancetxnsData.length > 0) {
                        for (let i = 0; i < this.offendergrievancetxnsData.length; i++) {
                              if (!this.offendergrievancetxnsData[i].startDate) {
                                    this.type = 'warn';
                                    this.message = this.translateService.translate('common.datemustbeentereddate');
                                    this.show();
                                    return;
                              }
                              if (!this.offendergrievancetxnsData[i].status) {
                                    this.type = 'warn';
                                    this.message = this.translateService.translate('common.statusmustbeentered');
                                    this.show();
                                    return;
                              }
                              if (this.offendergrievancetxnsData[i].startDate) {
                                    if ((this.offendergrievancetxnsData[i].startDate) &&
                                          (DateFormat.compareDate(DateFormat.getDate(this.offendergrievancetxnsData[i].startDate),
                                                DateFormat.getDate(this.offendergrievancesModel.reportDate)) === -1)
                                          || (DateFormat.compareDate(DateFormat.getDate(this.offendergrievancetxnsData[i].startDate), DateFormat.getDate()) === 1) ||
                                                (DateFormat.compareDate(DateFormat.getDate(this.offendergrievancetxnsData[i].startDate),
                                                      DateFormat.getDate(this.offendergrievancesModel.reportDate)) === -1)) {
                                          this.type = 'warn';
                                          this.message = this.translateService.translate('oidissue.transactiondatecurrentdate');
                                          this.show();
                                          return;
                                    }
                              }
                              if (this.offendergrievancetxnsData[i].txnType) {
                                    this.transactionFlag = true;
                                    this.offendergrievancesCommitModel.offenderGrievanceTxnsList = this.offendergrievancetxnsData;
                              }
                              if (!this.transactionFlag) {
                                    this.type = 'warn';
                                    this.message = this.translateService.translate('oidissue.transactionmustbeentered');
                                    this.show();
                                    return;
                              }
                              this.offendergrievancetxnsData[i].proposedResponse = this.proposedResponse;
                              this.offendergrievancetxnsData[i].officialResponse = this.officialResponse;
                        }
                  }
            }
            // if (!this.offendergrievancetxnsModel.startDate) {
            //       this.type = 'warn';
            //       this.message = this.translateService.translate('oidissue.pleaseaddrecordinblock');
            //       this.show();
            //       return;
            // }
            for (let i = 0; i < this.offendergrievancesUpdateList.length; i++) {
                  if (this.offendergrievancesUpdateList[i].reportDate) {
                        this.offendergrievancesUpdateList[i].reportDate =
                              DateFormat.getDate(this.offendergrievancesUpdateList[i].reportDate);
                  }
                  if (this.offendergrievancesUpdateList[i].claimAmount) {
                        this.offendergrievancesUpdateList[i].claimAmount =
                              Number(this.offendergrievancesUpdateList[i].claimAmount);
                  }
                  if (this.offendergrievancesUpdateList[i].staffInvolvedFlag === 'Y') {
                        this.staffInvlovedFlag = true;
                  }
                  this.offendergrievancesCommitModel.updateList = this.offendergrievancesUpdateList;
            }
            if (this.offendergrievancesDeleteList.length > 0) {
                  for (let i = 0; i < this.offendergrievancesDeleteList.length; i++) {
                        this.offendergrievancesCommitModel.deleteList = this.offendergrievancesDeleteList;
                  }
            }
            if (this.staffInvlovedFlag) {
                  const Dialogdata = {
                        label: this.translateService.translate('This issue requires Staff Involved. "Please add prior to exiting." '),
                        yesBtn: true, noBtn: false, allowLineGap: true,
                        yesLabel: this.translateService.translate('common.ok')
                  };
                  this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(result => {
                        if (result) {
                              this.staffInvlovedFlag = false;
                              this.finalSave();
                        }
                  });
            }else{
                  this.staffInvlovedFlag = false;
                  this.finalSave();
            }
           
      }

      finalSave(){
            const offendergrievancesSaveData = this.oidissueFactory.offenderGrievancesCommit(this.offendergrievancesCommitModel);
            offendergrievancesSaveData.subscribe(data => {
                  if (data > 0) {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                        this.oidissueexecuteQuery();
                        this.transactionFlag = false;
                        this.defaultRowFlag = false;
                        this.rowFlag = false;
                        return;
                  } else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                        this.oidissueexecuteQuery();
                        return;
                  }
            });
      }
      onButSave() {
            this.offendergrievancesUpdateList = [];
            this.offendergrievancesCommitModel.updateList = [];
            this.offendergrievancesCommitModel.insertList = [];
            this.offendergrievancesModel.commentText = this.commentText;
            this.offendergrievancesModel.claimAmount = Number(this.offendergrievancesModel.claimAmount);
            this.offendergrievancesUpdateList.push(this.offendergrievancesModel);
            this.offendergrievancesCommitModel.updateList = this.offendergrievancesUpdateList;
            if (!this.savedisabled) {
                  const offendergrievancesSaveData = this.oidissueFactory.offenderGrievancesCommit(this.offendergrievancesCommitModel);
                  offendergrievancesSaveData.subscribe(data => {
                        if (data > 0) {
                              this.type = 'success';
                              this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                              this.show();
                              this.savedisabled = true;
                              return;
                        } else {
                              this.type = 'warn';
                              this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                              this.show();
                              return;
                        }
                  });
            }
      }
      oidissueexecuteQuery() {
            if (this.vHeaderBlockModel.offenderBookId != null) {
                  const queryParams = {
                        offenderBookId: this.vHeaderBlockModel.offenderBookId
                  };
                  const serviceObj = this.oidissueFactory.offenderGrievancesExecuteQuery(queryParams);
                  serviceObj.subscribe(data => {
                        if (data.length === 0) {
                              this.offendergrievancesData=[];
                              this.staffInvBut=true;
                              this.grievanceTxnsInsert=false;

                        } else {
                              data.forEach(element => {
                                    element.rootOffenderId = this.rootOffenderId;
                                          element['goButton'] = '...';
                                    element['calaunchbutton'] = {
                                          'type': 'CA', rootOffenderId: element.rootOffenderId
                                    };
                                    if (element.claimAmount === null) {
                                          element.claimAmount = '';
                                    } else {
                                          element.claimAmount = Number(element.claimAmount).toFixed(2);
                                    }
                                    element['butIwp'] = '';
                                    element['SCREEN'] = this.screenId + "~" + "true" + "~" + element['grievanceId'];
                                         
                              });
                              this.offendergrievancesData = data;
                              this.offendergrievancesModel = this.offendergrievancesData[0];
                              this.tableIndex = 0;
                              this.grievanceInsert = true;
                              this.staffInvBut=false;
                        }
                  });
            }
      }
      offendergrievancetxnsExecuteQuery() {
            this.offendergrievancetxnsModel.grievanceId = this.offendergrievancesModel.grievanceId;
            const offendergrievancetxnsResult = this.oidissueFactory.offenderGrievanceTxnsExecuteQuery(this.offendergrievancetxnsModel);
            offendergrievancetxnsResult.subscribe(offendergrievancetxnsResultList => {
                  if (offendergrievancetxnsResultList.length === 0) {
                        this.offendergrievancetxnsData = [];
                        this.daysLeftFlag = false;
                  } else {
                        offendergrievancetxnsResultList.forEach(element => {
                              element['parentGrievType'] = this.offendergrievancesModel.grievType;
                              if (element.daysLeft) {
                                    const daysLesftTemp = this.getDays(element.endDate, DateFormat.getDate());
                                    const daysLeftDayssplit = String(daysLesftTemp);
                                    const startDate = daysLeftDayssplit.split('.');
                                    const daysLeftVal = Number(startDate[0]);
                                    const endDate = DateFormat.getDate(element.endDate);
                                    if (DateFormat.compareDate(endDate, DateFormat.getDate()) === 1) {
                                          this.daysLeft = daysLeftVal;
                                    } else {
                                          this.daysLeft = '-' + daysLeftVal;
                                    }
                                    if (this.daysLeft > 99) {
                                          element.daysLeft = 99;
                                    } else if (this.daysLeft < -99) {
                                          element.daysLeft = -99;
                                    }
                                    if (element.daysLeft === '0' || element.daysLeft === '-0') {
                                          element.daysLeft = '';
                                    }
                              }
                        });
                        this.offendergrievancetxnsData = offendergrievancetxnsResultList;
                        this.offendergrievancetxnsModel = offendergrievancetxnsResultList[0];
                        this.tableTxnsIndex = 0;
                  }
            });
      }
      /**
       *  This function will be executed when commit event is
      * fired
      */
      oidissueSaveoffendergrievancetxnsForm(event) {
            this.offendergrievancetxnsInsertList = event.added;
            this.offendergrievancetxnsUpdateList = event.updated;
            this.offendergrievancetxnsDeleteList = event.removed;
            this.offendergrievancetxnsCommitModel.insertList = [];
            this.offendergrievancetxnsCommitModel.updateList = [];
            this.offendergrievancetxnsCommitModel.deleteList = [];
            this.offendergrievancesCommitModel.offenderGrievanceTxnsList = [];
            if (this.offendergrievancetxnsInsertList.length > 0 || this.offendergrievancetxnsUpdateList.length > 0) {
                  for (let i = 0; i < this.offendergrievancetxnsInsertList.length; i++) {
                        if (!this.offendergrievancesModel.grievanceId) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('Please save the Parent Record');
                              this.show();
                              return;
                        }
                        if (!this.offendergrievancetxnsInsertList[i].startDate) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('common.datemustbeentereddate');
                              this.show();
                              return;
                        }
                        if (this.offendergrievancetxnsInsertList[i].startDate) {
                              /* if ((this.offendergrievancetxnsInsertList[i].startDate) &&
                                    ((this.offendergrievancetxnsInsertList[i].startDate <
                                          DateFormat.getDate(this.offendergrievancesModel.reportDate))
                                          || (this.offendergrievancetxnsInsertList[i].startDate > DateFormat.getDate())) ||
                                    (this.offendergrievancetxnsInsertList[i].startDate <
                                          DateFormat.getDate(this.offendergrievancesModel.reportDate))) {
                                    this.type = 'warn';
                                    this.message = this.translateService.translate('oidissue.transactiondatecurrentdate');
                                    this.show();
                                    return;
                              } */
                              if (DateFormat.compareDate(DateFormat.getDate(this.offendergrievancetxnsInsertList[i].startDate),
                              DateFormat.getDate(DateFormat.getDate())) === 1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.transactiondatecurrentdate');
                              this.show();
                              return;
                        } else if (DateFormat.compareDate(DateFormat.getDate(this.offendergrievancetxnsInsertList[i].startDate),
                              DateFormat.getDate(this.offendergrievancesModel.reportDate)) === -1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.transactiondatecurrentdate');
                              this.show();
                              return;
                        } else if (this.offendergrievancetxnsData.length > 1 && DateFormat.compareDate(DateFormat.getDate(this.offendergrievancetxnsInsertList[i].startDate),
                              DateFormat.getDate(this.offendergrievancetxnsData[this.offendergrievancetxnsData.length - 2].startDate)) === -1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.transactiondatecurrentdate');
                              this.show();
                              return;
                        }
                        }
                        if (!this.offendergrievancetxnsInsertList[i].txnType) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oidissue.transactionmustbeentered');
                              this.show();
                              return;
                        }
                        if (!this.offendergrievancetxnsInsertList[i].status) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('common.statusmustbeentered');
                              this.show();
                              return;
                        }
                        this.offendergrievancetxnsInsertList[i].proposedResponse = this.proposedResponse;
                        this.offendergrievancetxnsInsertList[i].grievanceId = this.offendergrievancesModel.grievanceId;
                        this.offendergrievancetxnsInsertList[i].grievType = this.offendergrievancesModel.grievType;
                        this.offendergrievancetxnsCommitModel.insertList = this.offendergrievancetxnsInsertList;
                  }
                  for (let i = 0; i < this.offendergrievancetxnsUpdateList.length; i++) {
                        if (!this.offendergrievancetxnsUpdateList[i].status) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('common.statusmustbeentered');
                              this.show();
                              return;
                        }
                        this.activeRecordCount =0;
                        for (let i = 0; i < this.offendergrievancetxnsData.length; i++) {
                                  if(this.offendergrievancetxnsData[i].status === 'A'){
                                    this.activeRecordCount = this.activeRecordCount+1;
                              }
                          }
                        if (this.activeRecordCount > 1) {
                                    this.type = 'warn';
                                    this.message = this.translateService.translate('oidissue.itcannothave2activetxns');
                                    this.show();
                                    return;
                        }
                        this.offendergrievancetxnsCommitModel.updateList = this.offendergrievancetxnsUpdateList;
                  }
            }
            if (this.offendergrievancetxnsDeleteList.length > 0) {
                  for (let i = 0; i < this.offendergrievancetxnsDeleteList.length; i++) {
                        this.offendergrievancetxnsCommitModel.deleteList = this.offendergrievancetxnsDeleteList;
                  }
            }
            if(this.grid.addedMap.size === 0 && this.grid.updatedMap.size === 0 && this.grid.removedMap.size>0){
                  this.txnsFinalSave();
            }
            else if (this.offendergrievancetxnsInsertList.length > 0 || this.offendergrievancetxnsUpdateList.length > 0 || this.offendergrievancetxnsDeleteList.length > 0) {
                  if (this.offendergrievancesModel.staffExists === 0 &&
                        this.offendergrievancesModel.staffInvolvedFlag === 'Y') {
                        const Dialogdata = {
                              label: this.translateService.translate('This issue requires Staff Involved. "Please add prior to exiting." '),
                              yesBtn: true, noBtn: false, allowLineGap: true,
                              yesLabel: this.translateService.translate('common.ok')
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(result => {
                              if (result) {
                                   this.txnsFinalSave();
                              }
                        });
                  } else {
                        this.txnsFinalSave();
                  }
            }
            
      }
      txnsFinalSave(){
            const offendergrievancetxnsSaveData = this.oidissueFactory.offenderGrievanceTxnsCommit(this.offendergrievancetxnsCommitModel);
            offendergrievancetxnsSaveData.subscribe(data => {
                  if (data === 1) {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                        this.oidissueexecuteQuery();
                        return;
                  } else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                        this.oidissueexecuteQuery();
                        return;
                  }
            });
      }
      onButGrievanceTxnsSave() {
            this.offendergrievancetxnsUpdateList = [];
            this.offendergrievancetxnsCommitModel.updateList = [];
            this.offendergrievancetxnsCommitModel.insertList = [];
            this.offendergrievancetxnsModel.proposedResponse = this.proposedResponse;
            this.offendergrievancetxnsModel.officialResponse = this.officialResponse;
            this.offendergrievancetxnsUpdateList.push(this.offendergrievancetxnsModel);
            this.offendergrievancetxnsCommitModel.updateList = this.offendergrievancetxnsUpdateList;
            if (!this.saveTxnsDisabled) {
                  const offendergrievancetxnsSaveData =
                        this.oidissueFactory.offenderGrievanceTxnsCommit(this.offendergrievancetxnsCommitModel);
                  offendergrievancetxnsSaveData.subscribe(data => {
                        if (data > 0) {
                              this.type = 'success';
                              this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                              this.show();
                              this.saveTxnsDisabled = true;
                              return;
                        } else {
                              this.type = 'warn';
                              this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                              this.show();
                              return;
                        }
                  });
            }
      }
      show() {
            this.msglist = [];
            this.msglist.push({ message: this.message, type: this.type });
            this.msgs = [...this.msglist];
      }
      onGridInsert = () => {
            for (let i = 0; i < this.offendergrievancesData.length; i++) {
                  if (!this.offendergrievancesData[i].reportDate) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.datemustbeentereddate');
                        this.show();
                        return;
                  }
                  if (!this.offendergrievancesData[i].grievType) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidissue.issuetypemustbeentered');
                        this.show();
                        return;
                  }
                  if (!this.offendergrievancesData[i].grievReasonCode) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidissue.issuereasonmustbeentered');
                        this.show();
                        return;
                  }
                  if (!this.offendergrievancesData[i].agyLocId) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidissue.filedmustbeform');
                        this.show();
                        return;
                  }
                  if (this.offendergrievancesData[i].grievanceId && this.offendergrievancesData[i].currStatus === null) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidissue.pleaseaddchildrecord');
                        this.show();
                        return;
                  }
            }
            if (this.offendergrievancesData.length > 0) {
                  if (this.offendergrievancetxnsData.length === 0) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidissue.pleaseaddchildrecord');
                        this.show();
                        return;
                  }
            }
            this.grievanceTxnsInsert = true;
            this.grievanceInsert = false;
            return {
                  reportDate: DateFormat.getDate(), agyLocId: this.agyLocId, 'goButton': '...',
                  rootOffenderId: this.vHeaderBlockModel.rootOffenderId, agencyIncidentId: ''
            };
      }
      onGrievanceTxnsInsert = () => {
            for (let i = 0; i < this.offendergrievancetxnsData.length; i++) {
                  if (!this.offendergrievancetxnsData[i].startDate) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.datemustbeentereddate');
                        this.show();
                        return;
                  }
                  if (!this.offendergrievancetxnsData[i].txnType) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidissue.transactionmustbeentered');
                        this.show();
                        return;
                  }
                  if (!this.offendergrievancetxnsData[i].status) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.statusmustbeentered');
                        this.show();
                        return;
                  }
            }
            if (this.offendergrievancesModel.grievType) {
                  this.createUserId = this.userName;
            }
            return {
                  startDate: DateFormat.getDate(), 'parentGrievType': this.offendergrievancesModel.grievType,
                  createUserId: this.createUserId, status: 'A'
            };
      }
      onGrievanceTxnsClear = () => {
            this.offendergrievancetxnsModel = new OffenderGrievanceTxns();
            this.offendergrievancetxnsExecuteQuery();
            return true;
      }
      onGrievanceClear = () => {
            if (!this.offendergrievancesModel.grievanceId) {
                  this.grievanceTxnsInsert = false;
            }
            if (this.rowFlag) {
                  this.offendergrievancetxnsData = [];
                  this.offendergrievancetxnsModel = new OffenderGrievanceTxns();
            }
            this.grievanceInsert = true;
            return true;
      }
      canGrievanceEdit = (data: any, index: number, field: string): boolean => {
            if ((data.grievType || field === 'grievType') && !data.grievanceId) {
                  return true;
            } else {
                  return false;
            }
      }
      canGrievanceDateEdit = (data: any, index: number, field: string): boolean => {
            if (data.grievanceId && data.reportDate) {
                  return false;
            } else {
                  return true;
            }
      }
      canGrievanceTxnsEdit = (data: any, index: number, field: string): boolean => {
            if (data.txnType && data.grievanceId) {
                  return false;
            } else {
                  return true;
            }
      }
      onGridDelete = () => {
            for (let i = 0; i < this.offendergrievancetxnsData.length; i++) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.cannotdeletemasterrecord');
                  this.show();
                  return;
            }
            if (this.childRecordCount !== 0) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.cannotdeletemasterrecord');
                  this.show();
                  return;
            }

            return true;
      }
    
      isInsertable() {
            if (this.commentText) {
                  this.savedisabled = false;
                  this.clearDisale = false;
            } else {
                  this.savedisabled = false;
                  this.clearDisale = true;
            }
      }
      isInsertableOne(event) {
            const index = this.offendergrievancesData.indexOf(this.offendergrievancesModel);
            this.issueGrid.setColumnData('commentText', index, event);
      }
      isTxnsInsertable(event) {
            const index = this.offendergrievancetxnsData.indexOf(this.offendergrievancetxnsModel);
            this.grid.setColumnData('officialResponse', index, event);
      }
      setDescription(event) {
            if (event) {
                  this.offendergrievancetxnsExecuteQuery();
            }

      }
      /**
  *  This function will be executed when we click on launch button in bed assignmnets block
  *
  */
      onLaunchBtnClick = () => {
            if(this.offendergrievancesModel.createFlag === 'N'){
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidissue.youdonothavepermissionstoamendthisissuetype');
                  this.show();
                  return false;
            }
            
            if (this.flag) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.recordmustbeenteredordeleted');
                  this.show();
                  return;
            }
            if (this.offendergrievancetxnsModel.txnSeq && this.offendergrievancetxnsModel.grievanceId) {
                  return true;
            } else {
                  return false;
            }
      }
      onLaunchOiustinvBtnClick = () => {
            if (!this.staffInvBut && !this.savedisabled) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidissue.staffinvolvedbtnmsg');
                  this.show();
                  return;
            }
            return true;
      }
      onExitClicked() {
            this.oidissueFactory.serviceData = this.serviceData;
            this.router.navigate(['/OIIGRIEV']);
      }
      getDays(fromDate, toDate) {
            fromDate = DateFormat.getDate(fromDate);
            toDate = DateFormat.getDate(toDate);
            if (fromDate && toDate) {
                  const hours = Math.abs(toDate.getTime() - fromDate.getTime()) / 36e5;
                  const days = hours / 24;
                  return days;
            }
      }
      onButSingleSave() {
            const csldDEvent = { added: [], updated: [], removed: [] };
            if (this.issueGrid) {
                  const added = [];
                  this.issueGrid.addedMap.forEach((value, keys) => { added.push(value); });
                  const removed = [];
                  this.issueGrid.removedMap.forEach((value, keys) => { removed.push(value); });
                  const updated = [];
                  this.issueGrid.updatedMap.forEach((value, keys) => { updated.push(value); });
                  csldDEvent.added = JSON.parse(JSON.stringify(added));
                  csldDEvent.updated = JSON.parse(JSON.stringify(updated));
                  csldDEvent.removed = JSON.parse(JSON.stringify(removed));
                  if (csldDEvent.added.length > 0 || csldDEvent.updated.length>0 || csldDEvent.removed.length>0 ) {
                        this.oidissueSaveoffendergrievancesForm(csldDEvent);
                  }
                  /* if (csldDEvent.added.length > 0 || csldDEvent.updated.length > 0 || csldDEvent.removed.length > 0) {
                        const Dialogdata = {
                              label: this.translateService.translate('This issue requires Staff Involved. "Please add prior to exiting." '),
                              yesBtn: true, noBtn: false, allowLineGap: true,
                              yesLabel: this.translateService.translate('common.ok')
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(result => {
                              if (result) {
                                    this.oidissueSaveoffendergrievancesForm(csldDEvent);
                              }
                        });
                  } */
            }
            if (csldDEvent.added.length === 0) {
                  const csldDEventBen = { added: [], updated: [], removed: [] };
                  if (this.grid) {
                        const added = [];
                        this.grid.addedMap.forEach((value, keys) => { added.push(value); });
                        const removed = [];
                        this.grid.removedMap.forEach((value, keys) => { removed.push(value); });
                        const updated = [];
                        this.grid.updatedMap.forEach((value, keys) => { updated.push(value); });
                        csldDEventBen.added = JSON.parse(JSON.stringify(added));
                        csldDEventBen.updated = JSON.parse(JSON.stringify(updated));
                        csldDEventBen.removed = JSON.parse(JSON.stringify(removed));
                        this.oidissueSaveoffendergrievancetxnsForm(csldDEventBen);
                        /* if (csldDEventBen.added.length > 0 || csldDEventBen.updated.length > 0 || csldDEventBen.removed.length > 0) {
                              if (this.offendergrievancesModel.staffExists === 0 &&
                                    this.offendergrievancesModel.staffInvolvedFlag === 'Y') {
                                    const Dialogdata = {
                                          label: this.translateService.translate('This issue requires Staff Involved. "Please add prior to exiting." '),
                                          yesBtn: true, noBtn: false, allowLineGap: true,
                                          yesLabel: this.translateService.translate('common.ok')
                                    };
                                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(result => {
                                          if (result) {
                                                this.oidissueSaveoffendergrievancetxnsForm(csldDEventBen);
                                          }
                                    });
                              } else {
                                    this.oidissueSaveoffendergrievancetxnsForm(csldDEventBen);
                              }
                        } */
                  }
            }
      }

      get waitsavBtnflag() {
            if ((this.issueGrid && (this.issueGrid.addedMap.size > 0 || this.issueGrid.updatedMap.size > 0 ||
                  this.issueGrid.removedMap.size > 0)) || (this.grid && (this.grid.addedMap.size > 0 ||
                        this.grid.updatedMap.size > 0 || this.grid.removedMap.size > 0))) {
                  return false;
            }
            return true;
      }

      getUserName() {
            this.oidissueFactory.getUserNameByCreatedUserId(this.sessionManager.getId()).subscribe(data => {
                this.userName = data;
                this.createUserId = data;
            });
        }
        countChildForGrivences(){
            this.oidissueFactory.offenderGrievStaffsExecuteQuery(this.OffenderGrievStaffs).subscribe(data=>{
                  this.childRecordCount=(data.length===0)?0:1;
            });
        }
        ngOnDestroy(){
            if(!this.router.url.includes('/EOFFENDER')){
                this.eoffenderService.selectedRowData=null;
            }
           
        }
        onEoffenderClick = (data) => {
            this.eoffenderService.selectedRowData=data;
            this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : data['SCREEN'] } } );
         }
}
