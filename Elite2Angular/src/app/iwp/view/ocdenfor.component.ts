import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { OcdenforService } from '../service/ocdenfor.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { LoginService } from '@common/login/service/login.service';
import { OcdlegloService } from '@inst/legal/service/ocdleglo.service';
import { OffenderProceedings } from '@inst/legal/beans/OffenderProceedings';
import { OffenderProceedingsCommitBean } from '@inst/legal-screens/sentenceadministration/beans/OffenderProceedingsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { AppConstants } from '@core/classes/appConstants';
import { OffenderSentConditionsCommitBean } from '@inst/legal/beans/OffenderSentConditionsCommitBean';
import { OffenderSentConditions } from '@inst/legal/beans/OffenderSentConditions';
import { EoffenderService } from '@common/iwp/service/eoffender.service';

@Component({
  selector: 'app-ocdenfor',
  templateUrl: './ocdenfor.component.html'
})

export class OcdenforComponent implements OnInit {
  @ViewChildren('actionsGrid') actionsGrid: any;
  @ViewChild('conditGrid', { static: true }) conditGrid: any;

  msgs: any[] = [];
  msglist: any[];
  message: any;
  type: any;

  vHeaderBlockModel: any;
  myColDefs: any[];
  selectedRow: number;
  myJsonRowData: any[];
  myJsonRowDataOriginal: any[];
  screenName = 'ocdleglo';
  dataId: any;
  courtOrdersModel: any;

  actionsData: OffenderProceedings[] = [];
  actionsDataTemp: OffenderProceedings[] = [];
  actionsColumnDef: any[];
  actionsModel: OffenderProceedings = new OffenderProceedings();
  actionsIndex: number = 0;
  actionsInsertList: OffenderProceedings[] = [];
  actionsUpdateList: OffenderProceedings[] = [];
  actionsDeleteList: OffenderProceedings[] = [];
  actionsCommitModel: OffenderProceedingsCommitBean = new OffenderProceedingsCommitBean();
  actionsInsert: boolean;
  agylocId:string;
  myJsonRowDataTemp: any[];
  orderStatusData = [];
  screenId='OCDENFOR';
  actionCommentText : String = '';
  commentReadOnly: boolean = true;
  conditionColdef = [];
  conditionRowData: OffenderSentConditions[] = [];
  conditionRowDataModel: OffenderSentConditions = new OffenderSentConditions();
  selectedRowofConditionGrid: number;
  offenderSentConditionsCommitBean: OffenderSentConditionsCommitBean = new OffenderSentConditionsCommitBean();
  offProceedUpdateList: OffenderSentConditions[] = [];
  offProceedUpdateListTemp: OffenderSentConditions[] = [];
  showPersuetToFieldValue: boolean;
  resetGrid:boolean = true;
  condCategory: any;
  isSingleSaveBtnDisable: boolean = true;
  programIdMap: Map<string, number> = new Map<string, number>();
  constructor(private ocdenforFactory: OcdenforService, public translateService: TranslateService, public loginService: LoginService,
    public sessionManager: UserSessionManager, private ocdlegloFactory: OcdlegloService, private router: Router,private OcdlegloFactory: OcdlegloService,
    private eoffenderService: EoffenderService) {
    this.actionsColumnDef = [];
  }

  ngOnInit() {
    this.getOrderStatus();
    this.getPersutHideShowValue();
    this.actionsColumnDef = [
      {
        fieldName: this.translateService.translate('ocdenfor.proceeding'), field: 'proceedingType', editable: true, width: 150,
        datatype: 'lov', domain: 'PROCEEDING', required: true, cellEditable: this.canProceedingEdit
      },
      {
        fieldName: this.translateService.translate('ocdenfor.startdate'), field: 'startDate', editable: true, width: 150,
        datatype: 'date', required: true
      },
      {
        fieldName: this.translateService.translate('ocdenfor.hearingbody'), field: 'proceedingAgyLocId', editable: true, width: 150, datatype: 'lov',
        required: true, parentField: 'proceedingType', link: 'ocdenfor/rgAgyLocsRecordGroup?proceedingType=', source: 'OUMAGLOC'
      },
      {
        fieldName: this.translateService.translate('ocdenfor.persuantto'), field: 'proceedingPursuantAct', editable: true, width: 150, datatype: 'lov',
        domain: 'CRT_ACT_PUR',hide: true , parentField: 'proceedingType'
      },


      {
        field: 'commentText', hide: true
      },
      {
        fieldName: this.translateService.translate('ocdenfor.teamresponsible'), field: 'teamResponsible', editable: true, width: 150, source:'OCMTEAMMAIN',
        datatype: 'lov', parentField: 'agylocId', link: 'ocdenfor/rgTeamResponsibleRecordGroup?agylocId='
      },
      {
        fieldName: this.translateService.translate('ocdenfor.staffresponsible'), field: 'staffId', editable: true, width: 150, source:'OUMPERSO', 
        datatype: 'lov', parentField: 'teamResponsible', link: 'ocdenfor/rgStaffResponsibleRecordGroup?caseloadId='+this.sessionManager.currentCaseLoad+'&teamResponsible='
      },
      {
        fieldName: this.translateService.translate('ocdenfor.status'), field: 'proceedingStatus', width: 150, editable: true,
        datatype: 'lov',  domain: 'PROCEED_STS', required: true, cellEditable: this.canProceedingStatusEdit 
      },
      {
        fieldName: this.translateService.translate('ocdenfor.outcomedate'), field: 'outcomeDate', width: 150, editable: true,
        datatype: 'date' 
      },

      {
        fieldName: this.translateService.translate('ocdenfor.recommendationdocuments'), field: 'crtActionRecommendation', editable: true, width: 150, datatype: 'lov',
        domain: 'CRT_ACT_REC'
      },
      {
        fieldName: this.translateService.translate('ocdenfor.iwpdocument')
        , field: 'butIwp', datatype: 'hyperlink', link: '/EOFFENDER',
        editable: true, displayas: 'href', styleClass: 'file_copy',
        width: 50, data: 'row', updateField: 'row', modal: false, queryparam: 'SCREEN'
      },
      {
        fieldName: '', field: 'agylocId', hide: true
      },
    ];
    this.conditionColdef = [
      {
        fieldName: this.translateService.translate('common.select'), field: 'linkFlag', width: 150, datatype: 'checkbox', editable: true,cellEditable: this.canEditWhenOffProceedId
      },
      {
        fieldName: this.translateService.translate('ocdleglo.conditionCategory'), required: false,
        field: 'categoryType', editable: false, width: 150, datatype: 'lov', domain: 'COM_CON_CAT'
      },
      {
        fieldName: this.translateService.translate('ocdleglo.description'), required: false,
        field: 'requirement', editable: false, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocdleglo.length'), required: false,
        field: 'length', editable: false, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocdleglo.unit'),
        field: 'lengthUnit', editable: false, width: 150, datatype: 'lov', domain: 'COND_UNIT'
        , titles: {
          code: this.translateService.translate('ocmcondi.lovUnitType'),
          description: this.translateService.translate('ocmcondi.lovDescription')
        }
      },
      {
        fieldName: this.translateService.translate('ocdleglo.startDate'), required: false,
        field: 'startDate', editable: false, width: 150, datatype: 'date'
      },
      {
        fieldName: this.translateService.translate('ocdleglo.endDate'), required: false,
        field: 'expiryDate', editable: false, width: 150, datatype: 'date'
      },
      {
        fieldName: this.translateService.translate('ocdleglo.programreferral'),
        field: 'program', editable: false, width: 150, datatype: 'text'
      },
      {
        fieldName: '',
        field: 'programMethod', editable: false, width: 150, datatype: 'text', hide: true
      },
      {
        fieldName: this.translateService.translate('ocdleglo.status'), required: false, source: 'OCMSTATS',
        field: 'conditionStatus', editable: false, width: 150, datatype: 'lov', link: 'ocmpconf/rgOrderStatus?orderType=COND'
      },
      {
        fieldName: this.translateService.translate('ocdparor.staff'), required: false,
        field: 'assignedOfficer', editable: false, width: 150,
      },
      {
        fieldName: this.translateService.translate('ocdleglo.legalTextofCondition'),
        field: 'longCommentText', editable: false, width: 150, datatype: 'text',
        hide: true, externalColumn: true
      },
      {
        field: 'activeType', hide: true
      },
      {
        field: 'offenderProceedingId', hide: true
      }

    ];
    this.myJsonRowDataOriginal = [];
    this.courtOrdersModel = {}
    this.actionsInsert = false;
    this.myJsonRowDataOriginal = [];
    this.loadColDefData();
    this.getProgramId()
    this.getCondCategory();

  }

  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }

  canProceedingEdit = (data: any, index: number, field: string): boolean => {
    if (data.createDatetime) {
      return false;
    } else {
      return true;
    }
  }

  getCondCategory() {
    this.ocdenforFactory.getCondCategory(this.sessionManager.getId(),'OCDENFOR').subscribe(data=>{
        if(data) {
            this.condCategory = data
            this.conditionRowData.forEach(obj=>{
                if(obj["programMethod"] != 'ACP'){
                    const fiteredCat = this.condCategory.filter(obj=>obj.code == obj["programMethod"]);
                    if(fiteredCat && fiteredCat.length > 0){
                        obj['program'] = fiteredCat[0].description;
                    }
                }
            });
        }
    });
}

  canProceedingStatusEdit = (data: any, index: number, field: string): boolean => {
    if(data.createDatetime === "" || data.createDatetime === undefined) {
      return false;
    } else {
      if (data.proceedingStatus !== 'UNALLOCATED') {
        return true;
      } else {
        return false;
      }
    }
  }

  onOffenderChange(offender) {
    this.actionCommentText = '';
    this.commentReadOnly = true;
    if (offender) {
      this.vHeaderBlockModel = offender;
      this.agylocId = this.vHeaderBlockModel.intakeAgyLocId;
      this.myJsonRowDataOriginal = [];
      this.courtOrdersModel = {};
      this.actionsData =[];
      this.loadJsonData();
    } else {
      this.myJsonRowDataOriginal = [];
      this.courtOrdersModel = {};
      this.actionsData =[];
      this.actionsInsert = false;
    }
  }

  loadColDefData() {
    const data = this.loginService.mainColDefData;
    let datatypeData = [];
    data.forEach(gridDef => {
      if (gridDef.grid_name == 'crtOrders' && gridDef.module_name == 'OCDENFOR') {
        datatypeData = JSON.parse(gridDef.configData);
      }
    })
    this.myColDefs = [];
    this.prepareColDef(datatypeData).forEach(key => this.myColDefs.push(key));
  }

  onRowClickCrtAct(event) {
    if(event !== undefined){
      this.actionsInsert = event.activeType === 'A' ? true : false;
      this.courtOrdersModel = event;
      this.eoffenderService.selectedRowData = event;
      if(event.orderType && event.orderType =='NCUS'){
        this.eoffenderService.selectedRowData['orderCategory']='NONCUST';
      }else{
        this.eoffenderService.selectedRowData['orderCategory']=event.orderType;
      }
    }
    this.actionsModel=new OffenderProceedings();
    this.actionsData = [];
    this.actionsDataTemp = [];
    this.actionsExecuteQuery();
  }

  prepareColDef(coldefJson) {
    let colDefs = [];
    coldefJson.forEach(type => {
      if (type.dataType === 'lov' && type.source === 'link') {
        let lovRendered = 'description';
        colDefs.push({ datatype: type.dataType, lovRender: lovRendered, source: type.sourceType, suppressMenu: true, link: type.url, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required, parentFields: type.parentFields,parentField: type.parentField })
      }
      else if (type.dataType === 'lov' && type.source === 'domain') {
        colDefs.push({ datatype: type.dataType, domain: type.url, suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
      }
      else if (type.dataType === 'text') {
        colDefs.push({ datatype: type.dataType, wrapText: true, width: 80, suppressMenu: true, hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
      }
      else if (type.dataType === 'number') {
        colDefs.push({ datatype: type.dataType, whole: type.whole ? type.whole : false, maxValue: type.maxValue ? type.maxValue : undefined, width: 40, suppressMenu: true, hide: type.hide, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
      }
      else if (type.dataType === 'launchbutton') {
        colDefs.push({ datatype: type.dataType, width: 100, parentField: type.parentField, suppressMenu: true, field: type.field, fieldName: '', required: type.required, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' })
      }
      else if (type.dataType === 'hyperlink') {
        colDefs.push({ datatype: 'hyperlink', width: 50, displayas: 'image', suppressMenu: true, parentField: type.parentField, required: type.required, fieldName: '', field: type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' })
      }
      else if (type.dataType === 'date' && type.field === 'orderedDate') {
        colDefs.push({ datatype: type.dataType, field: type.field, fieldName: this.translateService.translate(type.fieldName), width: 100, suppressMenu: true, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
      }
      else if (type.dataType === 'date') {
        colDefs.push({ datatype: type.dataType, suppressMenu: true, field: type.field, fieldName: this.translateService.translate(type.fieldName), editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
      }
      else if (type.dataType === 'checkbox') {
        colDefs.push({ datatype: type.dataType, width: 40, field: type.field, fieldName: this.translateService.translate(type.fieldName), suppressMenu: true, editable: ![undefined, null, 0].includes(type.editable) ? type.editable : true, required: type.required })
      }
    });
    return colDefs;
  }

  loadJsonData() {
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    form_identifiers['orderType'] = 'PAR';
    const retDatapar = {
      formName: this.screenName,
      id: this.dataId ? this.dataId : 0,
      searchString: JSON.stringify(form_identifiers)
    }
      this.ocdlegloFactory.loadData(retDatapar).forEach(e => {
        if (e && e.formInfoJson) {
          this.myJsonRowDataTemp = (JSON.parse(e.formInfoJson).myJsonRowData);
          this.myJsonRowDataTemp.forEach(e=>{
            const resultStatus = this.orderStatusData.filter(ele=>ele.updateReasonCode === e.status);
            if (resultStatus && resultStatus.length > 0) {
              e['activeType'] = resultStatus[0].activeType;
            }
          });
        } else {
          this.myJsonRowDataTemp = [];
        }
      });
    
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    form_identifiers['orderType'] = 'NONCUST';
    const retData = {
      formName: this.screenName,
      id: this.dataId ? this.dataId : 0,
      searchString: JSON.stringify(form_identifiers)
    }
    setTimeout(() => {
    this.ocdlegloFactory.loadData(retData).subscribe((data: any) => {
      if (data && data.formInfoJson) {
        this.selectedRow = 0;
        this.myJsonRowData = (JSON.parse(data.formInfoJson).myJsonRowData);
        if (this.myJsonRowDataTemp && this.myJsonRowDataTemp.length > 0) {
          this.myJsonRowDataTemp.forEach(ele=>{
            ele['orderedDate'] = ele.hearingDate;
            ele['court'] = ele.authority;
            ele['type'] = ele.type;
            ele['commenceType'] = ele.commenceType; 
            ele['termTypeAndLength'] = ele.duration;
            ele['status'] = ele.status;
            var affectedOrders = null;
            if(ele.affectedOrders && ele.affectedOrders.length>0){
              ele.affectedOrders.forEach(bo=>{
                if (ele.affectedOrders.length === 1) {
                  affectedOrders = bo;
                } else if(ele.affectedOrders.length > 1){
                  affectedOrders = !affectedOrders ? bo + ',' : affectedOrders + bo;
                }
              });
            }
            ele['relatedTo'] = affectedOrders;
            this.myJsonRowData.push(ele);
          });
        }
        this.myJsonRowData.forEach(e=>{
          const resultStatus = this.orderStatusData.filter(ele=>ele.updateReasonCode === e.status);
          if (resultStatus && resultStatus.length > 0) {
            e['activeType'] = resultStatus[0].activeType;
          }
        });
        this.myJsonRowDataOriginal = this.myJsonRowData;
        this.courtOrdersModel = this.myJsonRowDataOriginal[0];
        this.actionsInsert = true;
        this.isSingleSaveBtnDisable = true; 
      } else if (!this.myJsonRowData && this.myJsonRowDataTemp && this.myJsonRowDataTemp.length > 0) {
        this.selectedRow = 0;
        this.myJsonRowData = this.myJsonRowDataTemp;
        if(this.myJsonRowDataTemp.length>0){
          this.myJsonRowDataTemp.forEach(ele=>{
            ele['orderedDate'] = ele.hearingDate;
            ele['court'] = ele.authority;
            ele['type'] = ele.type;
            ele['commenceType'] = ele.commenceType; 
            ele['termTypeAndLength'] = ele.duration;
            ele['status'] = ele.status;
            var affectedOrders = null;
            if(ele.affectedOrders && ele.affectedOrders.length>0){
              ele.affectedOrders.forEach(bo=>{
                if (ele.affectedOrders.length === 1) {
                  affectedOrders = bo;
                } else if(ele.affectedOrders.length > 1){
                  affectedOrders = !affectedOrders ? bo + ',' : affectedOrders + bo;
                }
              });
            }
            ele['relatedTo'] = affectedOrders;
            //this.myJsonRowData.push(ele);
          });
        }
        this.myJsonRowData.forEach(e=>{
          const resultStatus = this.orderStatusData.filter(ele=>ele.updateReasonCode === e.status);
          if (resultStatus && resultStatus.length > 0) {
            e['activeType'] = resultStatus[0].activeType;
          }
        });
        this.myJsonRowDataOriginal = this.myJsonRowData;
        this.courtOrdersModel = this.myJsonRowDataOriginal[0];
        this.actionsInsert = true;
        this.isSingleSaveBtnDisable = false; 
      } else {
        this.selectedRow = -1;
        this.myJsonRowData = [];
        this.myJsonRowDataOriginal = [];
        this.courtOrdersModel = {};
        this.actionsInsert = false;
      }
    });
  }, 5);
  }

  onactionsRowClick(event) {
    if (event !== undefined) {
      this.commentReadOnly = false;
      this.actionsModel = event;
      this.getConditionTypeGridData();
      this.actionCommentText = event.commentText;
    } else {
      this.actionsModel = undefined;
      this.actionCommentText = '';
      this.commentReadOnly = true;
    }
  }
   
  validateRowDataAct = (event) => {
    const rowdata = new ValidateRowReturn();
    const rowIndex = event.rowIndex;
    if (event.field === 'proceedingStatus') {
      if (event.data.proceedingStatus === AppConstants.ALLOCATED && (event.data.teamResponsible === undefined || event.data.teamResponsible === null) &&
       (event.data.staffId === undefined || event.data.staffId === null)) {
        this.actionsGrid.last.setColumnData('proceedingStatus', rowIndex, undefined);
        this.type = 'warn';
        this.message = this.translateService.translate('ocdenfor.cantsetallocated'); //Cant allow to set the status to Allocated.
        this.show();
        rowdata.validated = true;
        this.isSingleSaveBtnDisable = false;
        return rowdata;
      } else if(event.data.proceedingStatus === AppConstants.UNALLOCATED && ((event.data.teamResponsible != undefined  && event.data.teamResponsible != null)||
       (event.data.staffId != undefined && event.data.staffId != null))) {
        this.actionsGrid.last.setColumnData('proceedingStatus', rowIndex, undefined);
        this.type = 'warn';
        this.message = this.translateService.translate('ocdenfor.cantsetunallocated'); //Cant allow to set the status to Unallocated.
        this.show();
        rowdata.validated = true;
        this.isSingleSaveBtnDisable = false;
        return rowdata;
      } 
    } 
    else if(event.field === 'teamResponsible') {
      if (event.data.teamResponsible === null || event.data.teamResponsible === undefined) {
        if(event.data.staffId === null || event.data.staffId === undefined) {
          if(event.data.proceedingStatus === AppConstants.ALLOCATED) {
            this.actionsGrid.last.setColumnData('proceedingStatus', rowIndex, AppConstants.UNALLOCATED);
          }
        } else {
          if(event.data.proceedingStatus === AppConstants.UNALLOCATED) {
            this.actionsGrid.last.setColumnData('proceedingStatus', rowIndex, AppConstants.ALLOCATED);
          }
        }
      } else {
        if(event.data.proceedingStatus === AppConstants.UNALLOCATED) {
          this.actionsGrid.last.setColumnData('proceedingStatus', rowIndex, AppConstants.ALLOCATED);
        }
      }
      if(event.oldValue != event.newValue){
        this.actionsGrid.last.setColumnData('staffId', rowIndex, undefined);
      }
      rowdata.validated = true;
      this.isSingleSaveBtnDisable = false;
      return rowdata;
    } else if(event.field === 'staffId') {
      if (event.data.staffId === null || event.data.staffId === undefined) {
        if(event.data.teamResponsible === null || event.data.teamResponsible === undefined) {
          if(event.data.proceedingStatus === AppConstants.ALLOCATED) {
            this.actionsGrid.last.setColumnData('proceedingStatus', rowIndex, AppConstants.UNALLOCATED);
          }
        } else {
          if(event.data.proceedingStatus === AppConstants.UNALLOCATED) {
           this.actionsGrid.last.setColumnData('proceedingStatus', rowIndex, AppConstants.ALLOCATED);
          }
        }
      } else {
        if(event.data.proceedingStatus === AppConstants.UNALLOCATED && (event.data.staffId === '')) {
        } else {
          this.actionsGrid.last.setColumnData('proceedingStatus', rowIndex, AppConstants.ALLOCATED);
        }
      }
      rowdata.validated = true;
      this.isSingleSaveBtnDisable = false;
      return rowdata;
    }
    rowdata.validated = true;
    this.isSingleSaveBtnDisable = false;
    return rowdata;
  }
  onUpdatedMapsData(e){
    if(e.field === 'staffId' && e.updated.staffId === ''){
      this.isSingleSaveBtnDisable = true;
    } else {
      this.isSingleSaveBtnDisable = false;
    }
  }
  actionsExecuteQuery() {
    this.commentReadOnly = true;
    this.actionCommentText = '';
    this.courtOrdersModel['sentenceSeq'] = this.courtOrdersModel.orderNo;
    this.courtOrdersModel['offenderBookId'] = this.vHeaderBlockModel.offenderBookId;
    const serviceObj = this.ocdenforFactory.actionsExecuteQuery(this.courtOrdersModel);
    serviceObj.subscribe(data => {
      this.isSingleSaveBtnDisable = true;
      if (data.length === 0) {
        this.actionsData = [];
        this.actionsIndex = -1;
        this.getConditionTypeGridData();
      } else {
        this.actionsIndex = 0;
        data.forEach(element => {
          element['agylocId'] = this.agylocId;
          element['butIwp'] = '';
          element['SCREEN'] = this.screenId + "~" + "true" + "~" + element['offenderProceedingId'];
        });
        this.actionsData = data;
        this.actionsDataTemp = JSON.parse(JSON.stringify(data));
        this.actionsModel = data[0];
      }
    });
  }

  actionsCommit(event) {
    this.actionsInsertList = event.added
    this.actionsUpdateList = event.updated
    this.actionsDeleteList = event.removed
    this.actionsCommitModel.insertList = [];
    this.actionsCommitModel.updateList = [];
    this.actionsCommitModel.deleteList = [];
    if (this.actionsInsertList.length > 0) {
      this.actionsInsertList.forEach(obj => {
        obj.createUserId = this.sessionManager.getId();
        obj.createDatetime = DateFormat.getDate();
        obj.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        obj.orderType = this.courtOrdersModel.orderType;
        obj.sentenceSeq = Number(this.courtOrdersModel.orderNo);
        if(obj.teamResponsible){
        obj.teamId=Number(obj.teamResponsible);
        }
        obj.staffResponsible=Number(obj.staffId);


        if((obj.teamResponsible != null &&  obj.teamResponsible != "" && obj.teamResponsible != undefined) || 
          (obj.staffId != null &&  obj.staffId != ""  && obj.staffId != undefined)) {
            if(obj.proceedingStatus === AppConstants.UNALLOCATED) {
              obj.proceedingStatus = AppConstants.ALLOCATED;
            }
        } else {
          if(obj.proceedingStatus === AppConstants.ALLOCATED) {
            obj.proceedingStatus = AppConstants.UNALLOCATED;
          }
        }
        obj.staffUpdateFlag = 'Y';
      })
      if (!this.actionsValidate(this.actionsInsertList)) {
        return;
      }
      this.actionsCommitModel.insertList = this.actionsInsertList;
    }
    if (this.actionsUpdateList.length > 0) {
      this.actionsUpdateList.forEach(obj => {
        obj.modifyUserId = this.sessionManager.getId();
        obj.modifyDatetime = DateFormat.getDate();
        if(obj.teamResponsible){
          obj.teamId=Number(obj.teamResponsible);
        }
        obj.staffResponsible=Number(obj.staffId);
        if((obj.teamResponsible != null &&  obj.teamResponsible != "" && obj.teamResponsible != undefined) || 
          (obj.staffId != null &&  obj.staffId != ""  && obj.staffId != undefined)) {
            if(obj.proceedingStatus === AppConstants.UNALLOCATED) {
              obj.proceedingStatus = AppConstants.ALLOCATED;
            }
        } else {
          if(obj.proceedingStatus === AppConstants.ALLOCATED) {
            obj.proceedingStatus = AppConstants.UNALLOCATED;
          }
        }

        this.actionsDataTemp.forEach(element => {
          if(element.offenderProceedingId === obj.offenderProceedingId && element.staffId != obj.staffId) {
            obj.staffUpdateFlag = 'Y';
          }
        });
      })
      if (!this.actionsValidate(this.actionsUpdateList)) {
        return;
      }
      this.actionsCommitModel.updateList = this.actionsUpdateList;
    }
    if (this.actionsDeleteList.length > 0) {
      this.actionsCommitModel.deleteList = this.actionsDeleteList;
    }
    const processSaveData = this.ocdenforFactory.actionsCommit(this.actionsCommitModel);
    processSaveData.subscribe(data => {
      if (data === 1) {
        this.actionsExecuteQuery();
        this.isSingleSaveBtnDisable = true; 
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

  onGridInsert = () => {
    this.actionsModel=new OffenderProceedings(); 
    this.actionCommentText = '';
    this.commentReadOnly = false;
    this.isSingleSaveBtnDisable = false; 
    return {
      agylocId : this.agylocId,
      proceedingStatus: 'UNALLOCATED'
    };
  }

  actionsValidate(actionsList: any) {
    try {
      actionsList.forEach(element => {
        
        if (!element.proceedingType) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocdenfor.enterproceedingtype');
          this.show();
          throw new Error();
        } else if (!element.startDate) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocdenfor.enterstartdate');
          this.show();
          throw new Error();
        } else if (!element.proceedingAgyLocId) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocdenfor.enterhearingbody');
          this.show();
          throw new Error();
        } else if (!element.proceedingStatus) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocdenfor.enterproceedingStatus');
          this.show();
          throw new Error();
        } else if (element.outcomeDate && DateFormat.compareDate(DateFormat.getDate(element.outcomeDate),
        DateFormat.getDate(element.startDate)) === -1) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocdenfor.notearliertthanstartdate');
          this.show();
          throw new Error();
        } else if (element.outcomeDate && DateFormat.compareDate(DateFormat.getDate(element.outcomeDate),
        DateFormat.getDate()) === 1) {
          this.type = 'warn';
          this.message = this.translateService.translate('ocdenfor.notlaterthansysdate');
          this.show();
          throw new Error();
        }
      });
    } catch (e) {
      return false;
    }
    return true;
  }
  courtEvRedirect(){
    this.ocdenforFactory.backButton = true;
    this.router.navigate(['/OIDCRTEV']);
  }
  nonCustRedirect(){
    this.ocdenforFactory.backButton = true;
    this.router.navigate(['/OCDNCODE']);
  }
  custOrderRedirect(){
    this.ocdenforFactory.backButton = true;
    this.router.navigate(['/OCDCORDS']);
  }
  paroleOrderRedirect(){
    this.ocdenforFactory.backButton = true;
    this.router.navigate(['/OCDPAROR']);
  }

  // focusIn(event){
  //   console.log(event)
  //   if(event.cellField === 'teamResponsible') {
  //     this.actionsGrid.last.setColumnData('staffResponsible', event.rowIndex, undefined);
  //     this.actionsGrid.last.setColumnData('proceedingStatus', event.rowIndex,  AppConstants.UNALLOCATED);
  //   }
  // }

  focusOut(event){
    console.log(event)
    if(event.cellField === 'teamResponsible') {
      if(event.rowData.teamResponsible != undefined || event.rowData.staffId != undefined ) {
        this.actionsGrid.last.setColumnData('proceedingStatus', event.rowIndex,  AppConstants.ALLOCATED);
      } else {
        this.actionsGrid.last.setColumnData('proceedingStatus', event.rowIndex,  AppConstants.UNALLOCATED);
      }
    }
  }

  getOrderStatus() {
    this.OcdlegloFactory.rgOrderStatus().subscribe(data => {
        if (data) {
            this.orderStatusData = data;
        }
    });
}

  isCommentChanged(event) {
    const index = this.actionsData.indexOf(this.actionsModel);
    this.actionsGrid.last.setColumnData('commentText', index, event);
  }

  onActionsClear = () => {
    this.actionCommentText = '';
    this.commentReadOnly = true;
    this.isSingleSaveBtnDisable = true;
    this.actionsData = JSON.parse(JSON.stringify(this.actionsDataTemp));
    return true;
  }
  onConditionsClear = () => {
    this.getConditionTypeGridData();
    this.isSingleSaveBtnDisable = true;
  }

  onSave() {
    const actionsGridEvent = { added: [], updated: [], removed: [] };
    const conditGridEvent = { added: [], updated: [], removed: [] };
    if (this.actionsGrid.last) {
      if(this.actionsGrid.last.addedMap.size > 0 || this.actionsGrid.last.updatedMap.size > 0 || this.actionsGrid.last.removedMap.size > 0 ) {
        const added = [];
        this.actionsGrid.last.addedMap.forEach(key => {
            added.push(key);
        });
        const updated = [];
        this.actionsGrid.last.updatedMap.forEach(value => {
            updated.push(value);
        });
        const removed = [];
        this.actionsGrid.last.removedMap.forEach((value, keys) => {
            removed.push(value);
        });
        actionsGridEvent.added = JSON.parse(JSON.stringify(added));
        actionsGridEvent.updated = JSON.parse(JSON.stringify(updated));
        actionsGridEvent.removed = JSON.parse(JSON.stringify(removed));
        this.actionsCommit(actionsGridEvent);
      }
    }
    if (this.conditGrid.addedMap.size > 0 || this.conditGrid.updatedMap.size > 0 || this.conditGrid.removedMap.size > 0) {
      const added = [];
      this.conditGrid.addedMap.forEach(key => {
          added.push(key);
      });
      const updated = [];
      this.conditGrid.updatedMap.forEach(value => {
          updated.push(value);
      });
      const removed = [];
      this.conditGrid.removedMap.forEach((value, keys) => {
          removed.push(value);
      });
      conditGridEvent.added = JSON.parse(JSON.stringify(added));
      conditGridEvent.updated = JSON.parse(JSON.stringify(updated));
      conditGridEvent.removed = JSON.parse(JSON.stringify(removed));
      this.conditionProceedSave(conditGridEvent);
    }
  }

  // get isSingleSaveBtnDisable() {
  //   if(this.actionsData && this.actionsDataTemp && JSON.stringify(this.actionsData) ==  JSON.stringify(this.actionsDataTemp)){
  //     return true;
  //   }
  //   return false;
  // }

  onRowClickedCondition(event) {
    if (event) {
      this.conditionRowDataModel = event;
    }
    else {
      // this.condiLegalText = '';
    }
  }


  getConditionTypeGridData() {
    let obj = {
      offenderBookId: this.vHeaderBlockModel.offenderBookId,
      commConditionType: this.courtOrdersModel.orderType,
      sealFlag: 'Y',
      offenderProceedingId: this.actionsModel.offenderProceedingId,
      sentenceSeq: this.courtOrdersModel.orderNo,
      orderType: this.courtOrdersModel.orderType
    }
    this.ocdenforFactory.getConditionTypeGridData(obj).subscribe(data => {
      if (data && data.length > 0) {
        data.forEach(ele => {
          let activeType = this.orderStatusData.filter(i => i.updateReasonCode == ele.conditionStatus);
          ele['activeType'] = activeType[0] ? activeType[0].activeType : '';
          ele['linkFlag'] = ele.linkFlag === 'Y' ? true : false;
          if (ele.programId) {
            ele.program = this.programIdMap.get(ele.programId);
        } else{   
          var fiteredCat = this.condCategory.filter(obj => obj.code == ele["programMethod"]);
          if (fiteredCat && fiteredCat.length > 0) {
            ele.program = fiteredCat[0].description;
          }
          }
          if (ele["programMethod"] !== 'ACP' && ele["programMethod"] !== 'UW') {
            ele.program = '';
        }
          
        });
        this.conditionRowData = data;
        this.conditionRowDataModel = data[0];
        this.selectedRowofConditionGrid = 0;
      } else {
        this.conditionRowData = [];
      }
    });
  }

  getProgramId() {
    const serviceObj = this.ocdenforFactory.getProgram();
    serviceObj.subscribe(data => {
        if (data.length === 0) {
        } else {
            data.forEach(ele => {
                this.programIdMap.set(ele.id, ele.description);
            });
        }
    });
}


  conditionProceedSave(event) {
    this.offProceedUpdateList = [];
    this.offenderSentConditionsCommitBean.updateList = [];
    this.offProceedUpdateListTemp = event.updated;
    if (this.conditionRowData.length > 0) {
      for (let i = 0; i < this.conditionRowData.length; i++) {
        this.offProceedUpdateList.push(this.conditionRowData[i]);
      }
      for (let i = 0; i < this.offProceedUpdateList.length; i++) {
        this.offProceedUpdateList[i].offenderProceedingId = this.actionsModel.offenderProceedingId;
        this.offProceedUpdateList[i].linkFlag = this.offProceedUpdateList[i].linkFlag ? 'Y' : 'N';
      }
      this.offenderSentConditionsCommitBean.updateList = this.offProceedUpdateList;
    }
    const processSaveData = this.ocdenforFactory.conditionProceedSave(this.offenderSentConditionsCommitBean);
    processSaveData.subscribe(data => {
      if (data === 1) {
        this.getConditionTypeGridData();
        this.isSingleSaveBtnDisable = true;
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

  validateRowDataCond = (event) => {
    const rowdata = new ValidateRowReturn();
    const rowIndex = event.rowIndex;
    if (event.field === 'linkFlag') {
      if (event.data.linkFlag) {
        this.conditGrid.setColumnData('offenderProceedingId', rowIndex, this.actionsModel.offenderProceedingId);
        rowdata.validated = true;
        return rowdata;
      } else {
        this.conditGrid.setColumnData('offenderProceedingId', rowIndex, this.actionsModel.offenderProceedingId);
        rowdata.validated = true;
        return rowdata;
      }
    }
    rowdata.validated = true;
    if(rowdata.validated){
      this.isSingleSaveBtnDisable = false; 
    }
    return rowdata;
  }

  getPersutHideShowValue (){
    this.ocdenforFactory.getPersutHideShowValue("HIDPURSUANT").subscribe(data => {
      if(data==='YES'){
       this.showPersuetToFieldValue=true;
       this.actionsColumnDef[3]['hide'] = true;
      } else {
        this.showPersuetToFieldValue=false;
        this.actionsColumnDef[3]['hide'] = false;
      }
      this.resetGrid = false;
      setTimeout(() => {
        this.resetGrid = true;
      }, 0);
    });
  }

  canEditWhenOffProceedId = (data: any, index: number, field: string): boolean => {
    if(this.actionsModel.offenderProceedingId) {
      return true;
    } else { 
      this.type = 'warn';
      this.message = this.translateService.translate('ocdenfor.savetheactionsdatafirst');
      this.show();    
      return false;
    }
  }

  ngOnDestroy(){
    if(!this.router.url.includes('/EOFFENDER')){
        this.eoffenderService.selectedRowData=null;
    }
   
}
}


