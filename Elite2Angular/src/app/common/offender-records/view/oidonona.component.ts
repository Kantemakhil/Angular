import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidononaService } from '../service/oidonona.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderNonAssociations } from '@commonbeans/OffenderNonAssociations';
import { OffenderNaDetails } from '@commonbeans/OffenderNaDetails';
import { StgRelationships } from '@commonbeans/StgRelationships';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderNonAssociationsCommitBean } from '@common/beans/OffenderNonAssociationsCommitBean';
import { OffenderNaDetailsCommitBean } from '@common/beans/OffenderNaDetailsCommitBean';
import { StgRelationshipsCommitBean } from '@common/beans/StgRelationshipsCommitBean';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { VNameSearch2 } from '@cmsearchassaignbeans/VNameSearch2';
import { OsinamesService } from '@cm/searchassaign/service/osinames.service';
import { OffenderSearchService } from '../service/offender-search.service';
import { OidmbrdtService } from '@inst/securitythreatgroups/service/oidmbrdt.service';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-oidonona',
  templateUrl: './oidonona.component.html'
})

export class OidononaComponent implements OnInit, OnDestroy {
  @ViewChild('grid', {static: true}) grid: any;
  @ViewChild('offnadGrid', {static: true}) offnadGrid: any;
  msgs: any[] = [];
  vthaData: VNameSearch2[] = [];
  offnaData: OffenderNonAssociations[] = [];
  namesrchModel: VNameSearch2 = new VNameSearch2();
  offnaDataTemp: OffenderNonAssociations[] = [];
  offnaModel: OffenderNonAssociations = new OffenderNonAssociations();
  offnaInsertList: OffenderNonAssociations[] = [];
  offnaUpdatetList: OffenderNonAssociations[] = [];
  offnaDeleteList: OffenderNonAssociations[] = [];
  offnaCommitModel: OffenderNonAssociationsCommitBean = new OffenderNonAssociationsCommitBean();
  offnadData: OffenderNaDetails[] = [];
  offnadDataTemp: OffenderNaDetails[] = [];
  offnadModel: OffenderNaDetails = new OffenderNaDetails();
  offnadModelRetrive: OffenderNaDetails = new OffenderNaDetails();
  savebtnupdatedModel: OffenderNaDetails = new OffenderNaDetails();
  offnadInsertList: OffenderNaDetails[] = [];
  offnadUpdateList: OffenderNaDetails[] = [];
  offnadDeleteList: OffenderNaDetails[] = [];
  offnadCommitModel: OffenderNaDetailsCommitBean = new OffenderNaDetailsCommitBean();
  stgrelationshipsData: StgRelationships[] = [];
  stgrelationshipsDataTemp: StgRelationships[] = [];
  stgrelationshipsModel: StgRelationships = new StgRelationships();
  stgrelationshipsInsertList: StgRelationships[] = [];
  stgrelationshipsUpdatetList: StgRelationships[] = [];
  stgrelationshipsDeleteList: StgRelationships[] = [];
  stgrelationshipCommitModel: StgRelationshipsCommitBean = new StgRelationshipsCommitBean();
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  errorMessage: string;
  headerMessage: string;
  editable: boolean;
  stgRelationshipsColumnDef: any[];
  offNaColumnDef: any[];
  offNadColumnDef: any[];
  offNaIndex = -1;
  offNadIndex = -1;
  typeLink: string;
  relationIndex = -1;
  dspOffenderBookId: number;
  nsOffenderId: number;
  btnSave: boolean;
  insertFlag: boolean;
  rowAlready: boolean;
  btnAdd: boolean;
  lengtcal: boolean;
  prisonLocation: string;
  btnClear: boolean;
  selectedValidation = -1;
  isRetrieveDis: boolean;
  modelClear = false;
  mode: any;
  gridTitles = {
    description: this.translateService.translate('common.reason'),
    code: this.translateService.translate('common.code')
  };
  typeTitles = {
    description: this.translateService.translate('common.type'),
    code: this.translateService.translate('oidonona.nstype')
  };
  nsType: string;
  offenderId: number;
  nsOffenderBookId: number;
  backBtn = false;
  offnaModelTemp: OffenderNonAssociations = new OffenderNonAssociations();
  commitFlag: boolean;
  clearFlag: boolean;
  clearDisable: boolean;
  offNadinsertFlag: boolean;
  nonAssocRowInd: any = -1;
  constructor(private oidononaFactory: OidononaService, public translateService: TranslateService,
    public sessionManager: UserSessionManager, private dialogService: DialogService, private osinamesFactory: OsinamesService,
    private offenderSearchService: OffenderSearchService, private oidmbrdtFactory: OidmbrdtService,
    private router: Router) {
    this.stgRelationshipsColumnDef = [];
    this.offNaColumnDef = [];
    this.offNadColumnDef = [];
  }
  ngOnInit() {
    if (this.oidmbrdtFactory.viewBtnFlag) {
      this.backBtn = true;
  }
    this.offNadinsertFlag = false;
    this.btnAdd = true;
    this.insertFlag = false;
    this.btnSave = true;
    this.btnClear = true;
    this.isRetrieveDis = true;
    this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    this.typeLink = 'oidonona/cgfkOffNadDspDescriptionRecordGroup';
    this.offNaColumnDef = [
      { fieldName: this.translateService.translate('common.id'), field: 'offenderIdDisplay', editable: false, width: 150,
      /* cellEditable: this.canOffnaEdit */ },
      {
        fieldName: '', field: 'launchbtn', editable: false, width: 150, datatype: 'launchbutton', onLaunchClick: this.openOsinames,
        dialogWidth: 80, data: 'row', updateField: 'row', modal: true, isDisable: this.displaybtn
      },
      {
        fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
        editable: false, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
        editable: false, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'prisionLocation',
        editable: false, width: 150, datatype: 'text', uppercase: true
      },
      {
        fieldName: this.translateService.translate('oidonona.reciprocal'), field: 'recipNsReasonCode',
        editable: true, width: 150, datatype: 'lov', domain: 'NON_ASSO_RSN',
        optionWidth: 300, titles: this.gridTitles
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: false,
        width: 150, datatype: 'checkbox'
      },
      {
        field: 'updateStatus',datatype: 'checkbox', hide: true
      }
    ];
    this.stgRelationshipsColumnDef = [
      { fieldName: this.translateService.translate('common.group'), field: 'description', editable: false, width: 150, datatype: 'text' },
      {
        fieldName: '', field: 'butViewMembers', editable: true, width: 150, datatype: 'launchbutton',
        dialogWidth: 80, data: 'row', modal: true, updateField: 'row', onLaunchClick: this.openOiistgmi
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
        editable: false, width: 150, datatype: 'checkbox'
      },
    ];
    this.offNadColumnDef = [
      { 
        fieldName: this.translateService.translate('common.type'), field: 'nsType',required:true,
         editable: true, width: 150, datatype: 'lov',domain:'NON_ASSO_TYP',titles:this.typeTitles 
      },
      { 
        fieldName: this.translateService.translate('common.reason'), field: 'nsReasonCode',required:true, 
        editable: true, width: 150, datatype: 'lov',domain:'NON_ASSO_RSN',titles:this.gridTitles
      },
      { 
        fieldName: this.translateService.translate('common.effectivedate'), field: 'nsEffectiveDate',required:true, 
        editable: true, width: 150, datatype: 'date'
      },
      { 
        fieldName: this.translateService.translate('common.expirydate'), field: 'nsExpiryDate', 
        editable: true, width: 150, datatype: 'date'
      },
      { 
        fieldName: this.translateService.translate('ocuprest.authorisedby'), field: 'authorizedStaff', source:'OUMPERSO',
        editable: true, width: 150, datatype: 'lov',maxlength: 60 ,link:'oidonona/getActiveStaffMembers',required:true
      },
      { 
        fieldName: this.translateService.translate('common.comment'), field: 'commentText',
        editable: true, width: 150, maxlength: 240
      },
    ];
    if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
      this.show(this.translateService.translate('common.pleasesearchforvalidoffender'));
      return;
    }
  }

  onOffenderChange(offender) {
    this.vHeaderBlockModel = offender;
    if (this.vHeaderBlockModel) {
      this.btnSave = false;
      this.btnAdd = false;
      this.insertFlag = true;
      this.btnClear = false;
      this.offNadinsertFlag = true;
      this.oidononaexecuteQuery();
      this.stgrelationshipsExecuteQuery();
    } else {
      this.offnaData = [];
      this.offnadData = [];
      this.offnadModel = new OffenderNaDetails();
      this.stgrelationshipsData = [];
      this.btnSave = true;
      this.btnAdd = true;
      this.insertFlag = false;
      this.btnClear = true;
      this.offNadinsertFlag = false;
    }
  }
  displaybtn = (data, index) => {
    if (data.createDatetime) {
      return true;

    }
    return false;

  }
  canOffnaEdit = (data: any, index: number, field: string): boolean => {
    if (data.offenderId) {
          return false;
    }
    return true;
}
  openOiistgmi = (event) => {
    this.stgrelationshipsModel.stgId = event.relatedStgId;
    this.dialogService.openLinkDialog('/OIISTGMI', this.stgrelationshipsModel, 80).subscribe(result => {
    });
    return false;

  }
  openOsinames = (event) => {
    const index = this.offnaData.indexOf(event);
    if (event) {
      this.dialogService.openLinkDialog('/osinamesdialog', event, 80).subscribe(result => {
        if (result) {
          if (!this.isDuplicate(result.offenderIdDisplay)) {
            return;
          }
          if (this.vHeaderBlockModel.offenderIdDisplay === result.offenderIdDisplay) {
            this.show(this.translateService.translate('oidonona.cannotcreatenonasso'));
            this.btnSave = true;
            this.grid.setColumnData('offenderIdDisplay', index, null);
            this.grid.setColumnData('lastName', index, null);
            this.grid.setColumnData('firstName', index, null);
            this.grid.setColumnData('prisionLocation', index, null);
            return false;

          } else {
            // Get Offender Details from when osinames dialog close
            this.nameSrchExecuteQuery(index, result);
          }

        }

      });

    }
    return false;


  }
  onGridInsert = (event) => {
    if (this.grid.addedMap.size > 0 ) {
      return;
    }
    this.offnadData=[];
    this.offnadModel = new OffenderNaDetails();
    return { offenderIdDisplay: '', launchbtn: '...', recipNsReasonCode: '',naDetailsList:[] };

  }
  validateRowData = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    if (event.field === 'offenderIdDisplay' && event.newValue && event.newValue !== this.offnaModel.offenderIdDisplay) {
      this.btnSave = false;
      this.btnAdd = false;
      this.offnaModel = JSON.parse(JSON.stringify(event.data));
      /* while (this.offnaModel.offenderIdDisplay.length < 10) {
        this.offnaModel.offenderIdDisplay = '0' + this.offnaModel.offenderIdDisplay;
      } */
      if (!this.isDuplicate(this.offnaModel.offenderIdDisplay)) {
        rowdata.validated = true;
        this.grid.setColumnData('offenderIdDisplay', index, null);
        this.grid.setColumnData('lastName', index, null);
        this.grid.setColumnData('firstName', index, null);
        this.grid.setColumnData('prisionLocation', index, null);
        return rowdata;
      }
      if (this.vHeaderBlockModel.offenderIdDisplay === this.offnaModel.offenderIdDisplay) {
        this.show(this.translateService.translate('oidonona.cannotcreatenonasso'));
        this.btnSave = true;
        this.grid.setColumnData('offenderIdDisplay', index, null);
        this.grid.setColumnData('lastName', index, null);
        this.grid.setColumnData('firstName', index, null);
        this.grid.setColumnData('prisionLocation', index, null);
        } else {
        // Get Offender details when Id# typed
        this.nameSrchExecuteQuery(index, this.offnaModel);
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  nameSrchExecuteQuery(index, reqData) {

    const namesrchResult = this.oidononaFactory.getlastFirstName(reqData.offenderIdDisplay, this.vHeaderBlockModel.rootOffenderId);
    namesrchResult.subscribe(data => {
      if (data.length === 0) {
        this.vthaData = [];
        this.offnaModel = new OffenderNonAssociations();
        this.show(this.translateService.translate('oidonona.thisoffenderdoesnotexist'), 'warn');
        this.grid.setColumnData('offenderIdDisplay', index, null);
        this.grid.setColumnData('lastName', index, null);
        this.grid.setColumnData('firstName', index, null);
        this.grid.setColumnData('prisionLocation', index, null);
        return;
      } else {
        this.vthaData = data;
        this.grid.setColumnData('offenderIdDisplay', index, data[0].offenderIdDisplay);
        this.grid.setColumnData('lastName', index, data[0].lastName);
        this.grid.setColumnData('firstName', index, data[0].firstName);
        this.grid.setColumnData('prisionLocation', index, data[0].prisonLocation);
        this.dspOffenderBookId = data[0].offenderBookId;
        this.nsOffenderId = data[0].rootOffenderId;
        this.offnaData[index].nsOffenderBookId = data[0].offenderBookId;
          this.offnaData[index].nsOffenderId = data[0].offenderId;
          this.offnaModel = JSON.parse(JSON.stringify(this.offnaData[index]));
      }
    });
  }
  isDuplicate(offenderIdDisplay) {
    const rowData = this.offnaData;
    const repeat = rowData.filter(dup => offenderIdDisplay === dup.offenderIdDisplay);
    if (repeat && repeat.length > 1) {
      this.show(this.translateService.translate('oidonona.rowexists'));
      this.btnSave = true;
      return false;
    } else {
      return true;
    }
  }

  get isOffenderAvaliable(): boolean {
    if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId || this.offnaData.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  onNonGridClear = () => {

    if (this.offnaData === undefined) {
         this.offnadModel = new OffenderNaDetails();
    }
    this.btnSave = true;
    this.oidononaexecuteQuery();
    return true;
  }
  change(event) {
    if (event && event.code) {
      this.clearDisable = false;
      this.btnSave = false;
    } else {
      this.btnSave = true;
    }

  }
  changeReason(event) {
    if (event && event.code) {
      this.clearDisable = false;
      this.btnSave = false;
    } else {
      this.btnSave = true;
    }

  }
  compareNsEffectiveDate(event) {
    if (event) {
      this.clearDisable = false;
      this.btnSave = false;
    } else {
      this.btnSave = true;
    }
  }
  compareExpDate(event) {
    if (event) {
      this.offnaModel.expDateFlag = true;
      this.btnSave = false;
      this.clearDisable = false;
    } else {
      this.btnSave = true;
    }
  }
  compareEff(eff) {
    if (eff) {
      if (this.offnadModel.nsType && this.offnadModel.nsReasonCode && this.offnadModel.nsExpiryDate) {
        this.btnAdd = false;

      }
      this.btnSave = false;
    } else {
      this.btnSave = true;
    }
  }
  compareExp(exp) {
    if (exp) {
      this.btnSave = false;
    } else {
      this.btnSave = true;
    }
  }
  authoriseKeyDown(event) {
    if (event) {
      this.btnSave = false;
      this.clearDisable = false;
    } else {
      this.btnSave = true;
    }
  }
  commentKeyDown(event) {
    if (event) {
      this.btnSave = false;
      this.clearDisable = false;
    } else {
      this.btnSave = true;
    }
  }
  /**
     * This function displays the messages
     */
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }

  onRowClickoffna(event) {
    this.mode = this.queryFlag;
    if(this.nonAssocRowInd != -1 && this.offnadData.length>0){
      this.offnaData[this.nonAssocRowInd].naDetailsList = this.offnadData; 
    }
    this.offnaModelTemp = event;
    this.nonAssocRowInd = this.offnaData.indexOf(event);
    if (event && event.createDatetime) {
      this.offnaModel.expDateFlag = false;
      this.offnadModel = new OffenderNaDetails();
      this.offnaModel = JSON.parse(JSON.stringify(event));
      this.offenderId = this.offnaModel.offenderId;
      this.nsOffenderBookId = this.offnaModel.nsOffenderBookId;
     // this.offnadExecuteQuery();
      this.offnadData = this.offnaModel.naDetailsList;
      this.offNadIndex = 0;
    } else {
      // Clear Non Association Details Block
      this.offnadModel = new OffenderNaDetails();
      this.savebtnupdatedModel = new OffenderNaDetails();
      this.offenderId = null;
      this.nsOffenderBookId = null;
      this.offnadData = [];
    }
  }

  /**
  * This function loads the data into the Master Record and its child records
  */
  // execute query
  oidononaexecuteQuery() {
    this.nonAssocRowInd = -1;
    this.offnaModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
    this.offnaModel.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
    this.offnaModel.lastName = this.vHeaderBlockModel.lastName;
    this.offnaModel.firstName = this.vHeaderBlockModel.firstName;
    this.offnaModel.livingUnitDescription = this.vHeaderBlockModel.livingUnitDescription;
    const serviceObj = this.oidononaFactory.offNaExecuteQuery(this.offnaModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.offnaData = [];
        this.offnadData =[];
        this.btnSave = true;
        this.btnAdd = true;
        this.offnadModel = new OffenderNaDetails();
      } else {
        data.forEach(element => {
          element.launchbtn = '...';
          element.activeFlag = element.activeFlag === 'Y' ? true : null;
        });
        this.offnaData = data;
        this.offNaIndex = 0;
        this.btnSave = true;
      }
    });

  }
  offnadExecuteQuery() {
    this.selectedValidation = 0;
    this.offnadModel = new OffenderNaDetails();
    this.offnadModel.offenderId = this.offnaModel.offenderId;
    this.offnadModel.nsOffenderBookId = this.offnaModel.nsOffenderBookId;

    const offnadResult = this.oidononaFactory.offNadExecuteQuery(this.offnadModel);
    offnadResult.subscribe(data => {
      if (data.length === 0) {
        this.commitFlag = true;
        this.offnadData = [];
        this.btnClear = false;
        this.offnadModel = new OffenderNaDetails();
        this.mode = this.queryFlag;
      } else {
        this.offnadData = data;
        this.offNadIndex = 0;
        this.btnSave = true;
        this.btnClear = false;
        this.isRetrieveDis = true;
        this.offnadModel = this.offnadData[this.selectedValidation];
        this.savebtnupdatedModel = JSON.parse(JSON.stringify(this.offnadModel));
        this.mode = this.retrieveFlag;
      }
    });

  }
  clickRetrieve() {
    this.selectedValidation = 0;
    this.commitFlag = false;
    this.clearFlag  = false;
    this.clearDisable = false;
    this.offnadModelRetrive = new OffenderNaDetails();
    if (this.offenderId) {
      this.offnadModelRetrive.offenderId = this.offenderId;
    }
    if (this.nsOffenderBookId) {
      this.offnadModelRetrive.nsOffenderBookId = this.nsOffenderBookId;
    }
    if (this.offnadModel) {
      if (this.offnadModel.nsType) {
        this.offnadModelRetrive.nsType = this.offnadModel.nsType;
        this.offnadModelRetrive.nsOffenderBookId = null;

      }
      if (this.offnadModel.nsReasonCode) {
        this.offnadModelRetrive.nsReasonCode = this.offnadModel.nsReasonCode;
        this.offnadModelRetrive.nsOffenderBookId = null;

      }
      if (this.offnadModel.nsEffectiveDate) {
        this.offnadModelRetrive.nsEffectiveDate = this.offnadModel.nsEffectiveDate;
        this.offnadModelRetrive.nsOffenderBookId = null;

      }
      if (this.offnadModel.nsExpiryDate) {
        this.offnadModelRetrive.nsExpiryDate = this.offnadModel.nsExpiryDate;
        this.offnadModelRetrive.nsOffenderBookId = null;

      }
      if (this.offnadModel.authorizedStaff) {
        this.offnadModelRetrive.authorizedStaff = this.offnadModel.authorizedStaff;
        this.offnadModelRetrive.nsOffenderBookId = null;

      }
      if (this.offnadModel.commentText) {
        this.offnadModelRetrive.commentText = this.offnadModel.commentText;
        this.offnadModelRetrive.nsOffenderBookId = null;

      }
    }
    const offnadResult = this.oidononaFactory.offNadRetriveExecuteQuery(this.offnadModelRetrive);
    offnadResult.subscribe(data => {
      if (data.length === 0) {
        this.offnadData = [];
        this.btnClear = false;
        this.offnadModel = new OffenderNaDetails();
        this.mode = this.queryFlag;
        this.show('common.querycaused');
      } else {
        this.offnadData = data;
        this.btnSave = true;
        this.btnClear = false;
        this.isRetrieveDis = true;
        if (this.offnadData.length === 1) {
          this.offnadModel = this.offnadData[0];
        } else {
          this.offnadModel = this.offnadData[this.selectedValidation];
        }
         this.savebtnupdatedModel = JSON.parse(JSON.stringify(this.offnadModel));
        this.mode = this.retrieveFlag;
      }
    });
  }
  no() {
    this.btnAdd = true;
    this.btnSave = true;
    this.isRetrieveDis = false;
    this.btnClear = true;
    this.modelClear = true;
    this.offnadModel = new OffenderNaDetails();
    this.offnadData = [];
    this.mode = this.queryFlag;
    this.selectedValidation = -1;
    this.commitFlag = true;
    this.clearFlag = true;
    this.clearDisable = true;
  }
  next() {
    this.isRetrieveDis = true;
    this.selectedValidation++;
    this.offnadModel = this.offnadData[this.selectedValidation];
    this.savebtnupdatedModel = JSON.parse(JSON.stringify(this.offnadModel));

  }
  previous() {
    this.isRetrieveDis = true;
    this.btnSave = true;
    this.selectedValidation--;
    this.offnadModel = this.offnadData[this.selectedValidation];
    this.savebtnupdatedModel = JSON.parse(JSON.stringify(this.offnadModel));
  }
  get nextbtnFlag() {
    if (this.offnadData.length === 0) {
      return true;
    }
    if (this.mode !== this.retrieveFlag) {
      return true;
    }
    if (this.selectedValidation >= this.offnadData.length - 1) {
      return true;
    }
    return false;
  }
  get prebtnFlag() {
    if (this.offnadData.length === 0) {
      return true;
    }
    if (this.mode !== this.retrieveFlag) {
      return true;
    }
    if (this.selectedValidation <= 0) {
      return true;
    }
    return false;
  }
  get btnSaveFlag(): boolean {
    /* if(this.clearFlag){
      return true;
    }
    if (this.mode === this.addedFlag) {
      return false;
    } */
    if (this.grid) {
      if (this.grid.addedMap.size > 0 || this.grid.removedMap.size > 0 || this.grid.updatedMap.size > 0) {
        this.mode = this.updatedFlag;
        return false;
      }
      /* if (this.savebtnupdatedModel.nsType !== this.offnadModel.nsType ||
        this.savebtnupdatedModel.nsReasonCode !== this.offnadModel.nsReasonCode ||
        this.savebtnupdatedModel.nsExpiryDate !== this.offnadModel.nsExpiryDate ||
        this.savebtnupdatedModel.nsEffectiveDate !== this.offnadModel.nsEffectiveDate ||
        this.savebtnupdatedModel.authorizedStaff !== this.offnadModel.authorizedStaff ||
        this.savebtnupdatedModel.commentText !== this.offnadModel.commentText) {
        this.mode = this.updatedFlag;
        return false;
      } */
    }
    if (this.offnadGrid) {
      if (this.offnadGrid.addedMap.size > 0 || this.offnadGrid.removedMap.size > 0 || this.offnadGrid.updatedMap.size > 0) {
        return false;
      }
    }
    return true;
  }
  get btnAddFlag() {
    if (this.offnaData.length === 0) {
      return true;
    }
    if (this.mode === this.retrieveFlag) {
      return false;
    }
    return true;
  }

  btnRetrieveFlag(): boolean {
    if (this.offnaData.length > 0) {
      if (this.mode === this.queryFlag && this.offnaModel.createDatetime) {
        return false;
      }
    }
    return true;
  }

  get addedFlag(): string {
    return 'ADDED';
  }
  get queryFlag(): string {
    return 'QUERY';
  }
  get retrieveFlag(): string {
    return 'RETRIEVE';
  }
  get updatedFlag(): string {
    return 'UPDATED';
  }

  stgrelationshipsExecuteQuery() {
    this.stgrelationshipsModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    const stgrelationshipsResult = this.oidononaFactory.stgRelationshipsExecuteQuery(this.stgrelationshipsModel);
    stgrelationshipsResult.subscribe(data => {
      if (data.length === 0) {
        this.stgrelationshipsData = [];
      } else {
        data.forEach(element => {
          element.butViewMembers = this.translateService.translate('oidonona.viewmembers');
          element.activeFlag = element.activeFlag === 'Y' ? true : null;
        });
        this.stgrelationshipsData = data;
        this.relationIndex = 0;
        this.btnSave = true;
      }
    });
  }
  add() {
    this.btnAdd = true;
    this.btnClear = false;
    if (this.offnaModel.activeFlag) {
      this.show(this.translateService.translate('oidonona.cannotcreatenewdetail'));
      return;
      
    }
    if (!this.offnaModel.activeFlag) {
      this.offnadModel = new OffenderNaDetails();
      this.savebtnupdatedModel = new OffenderNaDetails();
    }
    this.mode = this.addedFlag;
    this.commitFlag = true;
  }
  Save() {
    if (!this.offnaModelTemp.offenderIdDisplay) {
      this.show(this.translateService.translate('oidonona.addparentgriddetails'));
      return;
    }
    this.saveData();

   }
   saveData() {
          const csldDEvent = { added: [], updated: [], removed: [],offNadAdded: [], offNadUpdated: [] };
          if (this.grid) {
            const added = [];
            this.grid.addedMap.forEach((value, keys) => { added.push(value); });
            const removed = [];
            this.grid.removedMap.forEach((value, keys) => { removed.push(value); });
            const updated = [];
            this.grid.updatedMap.forEach((value, keys) => { updated.push(value); });
            csldDEvent.added = added;
            csldDEvent.updated = updated;
            csldDEvent.removed = removed;
            for (let i = 0; i < this.offnaData.length; i++) { 
              for (let j = 0; j < this.offnaData.length; j++) {
                if (i !== j && this.offnaData[i].offenderIdDisplay === this.offnaData[j].offenderIdDisplay) { 
                        this.show(this.translateService.translate('oidonona.duplicateoffender'));
                        return;
                }
              }
            }

          }
          if(this.offnadGrid){
            const added = [];
            this.offnadGrid.addedMap.forEach((value, keys) => { added.push(value); });
            const updated = [];
            this.offnadGrid.updatedMap.forEach((value, keys) => { updated.push(value); });
            csldDEvent.offNadAdded = added;
            csldDEvent.offNadUpdated = updated;
          }
          this.offnaModel.commitBean = new OffenderNonAssociations();
          this.oidononaExternalSave(csldDEvent);
   }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  oidononaSaveoffnaForm(event) {
    this.offnaInsertList = event.added;
    this.offnaUpdatetList = event.updated;
    this.offnaDeleteList = event.removed;
    this.offnaCommitModel.insertList = [];
    this.offnaCommitModel.updateList = [];
    this.offnaCommitModel.deleteList = [];
    if (this.offnaInsertList.length > 0) {
      for (let i = 0; i < this.offnaInsertList.length; i++) {
        if (!this.offnaInsertList[i].offenderIdDisplay) {
          this.show(this.translateService.translate('oidonona.youcannotcreate'));
          return;

        }
        if (this.dspOffenderBookId) {
        this.offnaInsertList[i].offenderBookId = this.dspOffenderBookId ;
        }
      
          this.offnaInsertList[i].nsOffenderBookId = this.vHeaderBlockModel.offenderBookId;
          this.offnaInsertList[i].nsOffenderId =  this.vHeaderBlockModel.rootOffenderId;
        if (this.nsOffenderId) {
          this.offnaInsertList[i].offenderId =this.nsOffenderId ;
         
        }
        this.offnaInsertList[i].createDatetime = DateFormat.getDate();
        this.offnaInsertList[i].createUserId = this.sessionManager.getId();
        this.offnaInsertList[i].nsType = this.offnadModel.nsType;
        this.offnaInsertList[i].nsReasonCode = this.offnadModel.nsReasonCode;
        this.offnaInsertList[i].nsEffectiveDate = this.offnadModel.nsEffectiveDate;
        this.offnaInsertList[i].authorizedStaff = this.offnadModel.authorizedStaff;
        this.offnaInsertList[i].nsExpiryDate = this.offnadModel.nsExpiryDate;
        this.offnaInsertList[i].commentText = this.offnadModel.commentText;
        this.offnaInsertList[i].transportFlag = 'N';
        this.offnaInsertList[i].recipNsReasonCode = this.offnaInsertList[i].recipNsReasonCode ?
         this.offnaInsertList[i].recipNsReasonCode : this.offnadModel.nsReasonCode;
      }
      this.offnaCommitModel.insertList = this.offnaInsertList;
    }
    this.lengtcal = false;
    if (this.offnaUpdatetList.length === 0) {
      this.lengtcal = true;
      this.offnaModel.nsType = this.offnadModel.nsType;
      this.offnaModel.nsReasonCode = this.offnadModel.nsReasonCode;
      this.offnaModel.nsEffectiveDate = this.offnadModel.nsEffectiveDate;
      this.offnaModel.authorizedStaff = this.offnadModel.authorizedStaff;
      this.offnaModel.nsExpiryDate = this.offnadModel.nsExpiryDate;
      this.offnaModel.commentText = this.offnadModel.commentText;
      this.offnaModel.typeSeq = this.offnadModel.typeSeq;
      this.offnaModel.updateNonAssociation = 'Y';
      this.offnaModel.transportFlag = 'N';
      if (this.offnadModel.typeSeq) {

        this.offnaUpdatetList.push(this.offnaModel);
      } else {
        this.offnaModel.updateNonAssociation = 'N';
       /*  this.offnaInsertList.push(this.offnaModel);
        this.offnaCommitModel.insertList = this.offnaInsertList; */
      }
      this.offnaCommitModel.updateList = this.offnaUpdatetList;

    }
    if (!this.lengtcal) {
      if (this.offnaUpdatetList.length > 0) {
        for (let i = 0; i < this.offnaUpdatetList.length; i++) {
          this.offnaUpdatetList[i].nsType = this.offnadModel.nsType;
          this.offnaUpdatetList[i].nsReasonCode = this.offnadModel.nsReasonCode;
          this.offnaUpdatetList[i].nsEffectiveDate = this.offnadModel.nsEffectiveDate;
          this.offnaUpdatetList[i].authorizedStaff = this.offnadModel.authorizedStaff;
          this.offnaUpdatetList[i].nsExpiryDate = this.offnadModel.nsExpiryDate;
          this.offnaUpdatetList[i].commentText = this.offnadModel.commentText;
          this.offnaUpdatetList[i].typeSeq = this.offnadModel.typeSeq;
          this.offnaUpdatetList[i].transportFlag = 'N';
          this.offnaUpdatetList[i].updateNonAssociation = 'N';
          this.offnaModel.updateNonAssociation = 'N';
        }
        this.offnaCommitModel.updateList = this.offnaUpdatetList;
      }
    }
    if (this.offnaDeleteList.length > 0) {
      for (let i = 0; i < this.offnaDeleteList.length; i++) {
      }
      this.offnaCommitModel.deleteList = this.offnaDeleteList;
    }
    const offnaSaveData = this.oidononaFactory.offNaCommit(this.offnaCommitModel);
    offnaSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.oidononaexecuteQuery();
        this.offnadExecuteQuery();
        this.checkUpdatedAllowed();
      } else if (data === 2) {
        this.show('oidonona.morethanoneactivedetailrecords');
       } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });
  }
  checkUpdatedAllowed() {
    const check = this.oidononaFactory.getMaxVal(this.vHeaderBlockModel.rootOffenderId, this.nsOffenderId);
    check.subscribe(seqCur => {
      if (seqCur && seqCur !== this.offnadModel.typeSeq) {

      } else if (seqCur && seqCur !== this.offnadModel.typeSeq) {

      }

    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oidononaSaveoffnadForm(event) {
    this.offnadInsertList = event.offNadAdded;
    this.offnadUpdateList = event.offNadUpdated;
    this.offnadCommitModel.insertList = [];
    this.offnadCommitModel.updateList = [];
    if (this.offnadInsertList.length > 0) {
      if(!this.nonAssociationDetailsValid(this.offnadInsertList)){
        return;
      }
      for (let i = 0; i < this.offnadInsertList.length; i++) {
        this.offnadInsertList[i].offenderId =this.vHeaderBlockModel.rootOffenderId;
        this.offnadInsertList[i].nsOffenderId =  this.offnaModelTemp.nsOffenderId;
        this.offnadInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offnadInsertList[i].nsOffenderBookId = this.offnaModelTemp.nsOffenderBookId;
        this.offnadInsertList[i].recipNsReasonCode = this.offnadInsertList[i].recipNsReasonCode ?
         this.offnadInsertList[i].recipNsReasonCode : this.offnadInsertList[i].nsReasonCode;
      }
      this.offnadCommitModel.insertList = this.offnadInsertList;
    }
    if (this.offnadUpdateList.length > 0) {
      this.offnadCommitModel.updateList = this.offnadUpdateList;
    }
    const offnadSaveData = this.oidononaFactory.offNadCommit(this.offnadCommitModel);
    offnadSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.oidononaexecuteQuery();
        this.offnadExecuteQuery();
      } else if (data === 2) {
        this.show('oidonona.morethanoneactivedetailrecords');
       } else if (data === 3) {
        this.show('oidonona.rowalreadyexists');
       } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });
  }
  /**
  *  This function will be executed when commit event is
 * fired
 */
  oidononaSaveoffStgForm(event) {
    this.stgrelationshipsInsertList = event.added;
    this.stgrelationshipsUpdatetList = event.updated;
    this.stgrelationshipsDeleteList = event.removed;
    this.offnadCommitModel.insertList = [];
    this.offnadCommitModel.updateList = [];
    this.offnadCommitModel.deleteList = [];
    if (this.offnadInsertList.length > 0) {
      for (let i = 0; i < this.offnadInsertList.length; i++) {
      }
      this.offnadCommitModel.insertList = this.offnadInsertList;
    }
    if (this.offnadUpdateList.length > 0) {
      for (let i = 0; i < this.offnadUpdateList.length; i++) {
      }

      this.offnadCommitModel.updateList = this.offnadUpdateList;
    }
    if (this.offnadDeleteList.length > 0) {
      for (let i = 0; i < this.offnadDeleteList.length; i++) {
      }
      this.offnadCommitModel.deleteList = this.offnadDeleteList;
    }
    const offnadSaveData = this.oidononaFactory.offNadCommit(this.offnadCommitModel);
    offnadSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
      } else if (data === 2) {
        this.show('oidonona.morethanoneactivedetailrecords');
       } else if (data === 3) {
        this.show('oidonona.rowalreadyexists');
       } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });
  }
  onbackBtnClick = () => {
    if (this.oidmbrdtFactory.viewBtnFlag) {
      this.oidmbrdtFactory.viewBtnFlag = false;
      this.backBtn = false;
      this.router.navigate(['/OIDMBRDT']);
    }
  }
  ngOnDestroy() {
    this.oidmbrdtFactory.viewBtnFlag = false;
  }

  get offNadinsert(): boolean {
    if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
      return false;
    } 
    if (this.offnadGrid.addedMap.size > 0 || this.offnadGrid.updatedMap.size > 0) {
      return false;
    }
    if (this.grid.updatedMap.size > 0) {
      return false;
    }
    return true;
  }
  get offNainsertFlag(): boolean {
    if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
      return false;
    } 
    if (this.grid.addedMap.size > 0 || this.grid.removedMap.size > 0 || this.grid.updatedMap.size > 0) {
      return false;
    }
    if (this.offnadGrid.addedMap.size > 0 || this.offnadGrid.updatedMap.size > 0) {
      return false;
    }
    return true;
  }

  offNadvalidateRowData = (event) =>{
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    if (event.field === 'nsExpiryDate') {
        this.offnaModel.expDateFlag = true;
    } 

    //let index1 = this.offnaData.indexOf(this.offnaModel);
    this.offnaData[this.nonAssocRowInd].naDetailsList = this.offnadData; 
    this.grid.setColumnData('updateStatus',this.nonAssocRowInd,true);
    rowdata.validated = true;
    return rowdata;
  }

  onoffNadGridInsert = (event) =>{
    if (!this.offnaModelTemp.offenderIdDisplay) {
      this.show(this.translateService.translate('oidonona.addparentgriddetails'));
      return;
    }
    if (this.offnaModelTemp.activeFlag) {
      this.show(this.translateService.translate('oidonona.cannotcreatenewdetail'));
      return;
    }
    this.offNadinsertFlag = false;
    return {};
  }

  onRowClickoffnad(event){
    if(event){
      this.offnadModel = event;
    }
  }

  onOffNadGridClear = () =>{
    this.offNadinsertFlag = true;
    this.offnadExecuteQuery();
    return true;
  }
  nonAssociationDetailsValid(offnadData){
    const is = { valid: true }
    offnadData.forEach(data => {

        if (!data.nsType) {
          this.show(this.translateService.translate('oidonona.typemustbe'));
          is.valid = false;
          return is.valid;
        }
        if (!data.nsReasonCode) {
          this.show(this.translateService.translate('oidonona.reasonmustbe'));
          is.valid = false;
          return is.valid;
        }
        if (!data.nsEffectiveDate) {
          this.show(this.translateService.translate('oidonona.effectivemustbe'));
          is.valid = false;
          return is.valid;
        }
        if (!data.authorizedStaff) {
          this.show(this.translateService.translate('oidonona.authorisedbymustbe'));
          is.valid = false;
          return is.valid;
        }
        // if (data.nsExpiryDate && !data.createDatetime) {
        //   const effDate = DateFormat.format(data.nsExpiryDate);
        //   const date = this.oidononaFactory.compareEffectiveDate(effDate);
        //   date.subscribe(number => {
        //     if (number === 0) {
        //       this.show(this.translateService.translate('oidonona.expirydateisequal'));
        //       is.valid = false;
        //       return is.valid;
        //     }
        //   });
        // }
        const nsDate = DateFormat.getDate(data.nsEffectiveDate);
        const nsExpiry = DateFormat.getDate(data.nsExpiryDate);

          if (data.nsEffectiveDate && data.nsExpiryDate) {
            // if (DateFormat.compareDate(nsDate, nsExpiry) === 1) {
            //   this.show(this.translateService.translate('oidonona.expirydatemustbegreater'));
            //   is.valid = false;
            //   return is.valid;
            // }
            if (this.offnaModel.expDateFlag && DateFormat.compareDate(nsExpiry, DateFormat.getDate()) < 0) {
              this.show(this.translateService.translate('oidonona.expirydatemustbegreaterthan'));
              is.valid = false;
              return is.valid;
            }
            if (DateFormat.compareDate(nsDate, nsExpiry) == 1) {
              this.show(this.translateService.translate('oidonona.expirydatemustbegreaterthan'));
              is.valid = false;
              return is.valid;
            }
            // if (DateFormat.compareDate(nsDate, nsExpiry) == 0) {
            //   this.show(this.translateService.translate('oidonona.expirydateisequal'));
            //   is.valid = false;
            //   return is.valid;
            // }
          }
    });
    return is.valid;
  }
  nonAssociationDetailsValidUpdate(){
    const is = { valid: true }
    this.offnadData.forEach(data => {

        if (!data.nsType) {
          this.show(this.translateService.translate('oidonona.typemustbe'));
          is.valid = false;
          return is.valid;
        }
        if (!data.nsReasonCode) {
          this.show(this.translateService.translate('oidonona.reasonmustbe'));
          is.valid = false;
          return is.valid;
        }
        if (!data.nsEffectiveDate) {
          this.show(this.translateService.translate('oidonona.effectivemustbe'));
          is.valid = false;
          return is.valid;
        }
        if (!data.authorizedStaff) {
          this.show(this.translateService.translate('oidonona.authorisedbymustbe'));
          is.valid = false;
          return is.valid;
        }
        // if (data.nsExpiryDate && !data.createDatetime) {
        //   const effDate = DateFormat.format(data.nsExpiryDate);
        //   const date = this.oidononaFactory.compareEffectiveDate(effDate);
        //   date.subscribe(number => {
        //     if (number === 0) {
        //       this.show(this.translateService.translate('oidonona.expirydateisequal'));
        //       is.valid = false;
        //       return is.valid;
        //     }
        //   });
        // }
        const nsDate = DateFormat.getDate(data.nsEffectiveDate);
        const nsExpiry = DateFormat.getDate(data.nsExpiryDate);

          if (data.nsEffectiveDate && data.nsExpiryDate) {
            // if (DateFormat.compareDate(nsDate, nsExpiry) === 1) {
            //   this.show(this.translateService.translate('oidonona.expirydatemustbegreater'));
            //   is.valid = false;
            //   return is.valid;
            // }
            if (this.offnaModel.expDateFlag && DateFormat.compareDate(nsExpiry, DateFormat.getDate()) < 0) {
              this.show(this.translateService.translate('oidonona.expirydatemustbegreaterthan'));
              is.valid = false;
              return is.valid;
            }
            //  if (DateFormat.compareDate(nsExpiry,nsDate) == 1) {
            //   this.show(this.translateService.translate('oidonona.expirydatemustbegreaterthan'));
            //   is.valid = false;
            //   return is.valid;
            // } 
            if (DateFormat.compareDate(nsDate, nsExpiry) == 1) {
              this.show(this.translateService.translate('oidonona.expirydatemustbegreaterthan'));
              is.valid = false;
              return is.valid;
            }
          }
    });
    return is.valid;
  }
  oidononaExternalSave(event) {
    this.offnadInsertList=[];
    this.offnaInsertList = event.added;
    this.offnaUpdatetList = event.updated;
    this.offnaDeleteList = event.removed;
    this.offnaCommitModel.insertList = [];
    this.offnaCommitModel.updateList = [];
    this.offnaCommitModel.deleteList = [];
    this.offnaCommitModel.offNadInsertList = [];
    this.offnaCommitModel.offNadUdateList = [];
    if (this.offnaInsertList.length > 0) {
      for (let i = 0; i < this.offnaInsertList.length; i++) {
        if (!this.offnaInsertList[i].offenderIdDisplay) {
          this.show(this.translateService.translate('oidonona.youcannotcreate'));
          return;

        }
        if (this.dspOffenderBookId) {
          this.offnaInsertList[i].offenderBookId = this.dspOffenderBookId;
        }

        if(this.offnaInsertList[i].naDetailsList.length == 0){
          this.show(this.translateService.translate('oidonona.typemustbe'));
          return;
        } else {
          if(!this.nonAssociationDetailsValid(this.offnaInsertList[i].naDetailsList)){
            return;
         }
         this.offnadInsertList.push(...this.offnaInsertList[i].naDetailsList);
        }

        this.offnaInsertList[i].nsOffenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offnaInsertList[i].nsOffenderId = this.vHeaderBlockModel.rootOffenderId;
        if (this.nsOffenderId) {
          this.offnaInsertList[i].offenderId = this.nsOffenderId;

        }
        this.offnaInsertList[i].createDatetime = DateFormat.getDate();
        this.offnaInsertList[i].createUserId = this.sessionManager.getId();
        this.offnaInsertList[i].nsType = this.offnadInsertList[i].nsType;
        this.offnaInsertList[i].nsReasonCode = this.offnadInsertList[i].nsReasonCode;
        this.offnaInsertList[i].nsEffectiveDate = this.offnadInsertList[i].nsEffectiveDate;
        this.offnaInsertList[i].authorizedStaff = this.offnadInsertList[i].authorizedStaff;
        this.offnaInsertList[i].nsExpiryDate = this.offnadInsertList[i].nsExpiryDate;
        this.offnaInsertList[i].commentText = this.offnadInsertList[i].commentText;
        this.offnaInsertList[i].transportFlag = 'N';
        this.offnaInsertList[i].recipNsReasonCode = this.offnaInsertList[i].recipNsReasonCode ?
          this.offnaInsertList[i].recipNsReasonCode : this.offnadInsertList[i].nsReasonCode;
      }
      this.offnaCommitModel.insertList = this.offnaInsertList;
    } 
    if (this.offnaUpdatetList.length > 0) {
      for (let i = 0; i < this.offnaUpdatetList.length; i++) {
        this.offnaUpdatetList[i].updateNonAssociation = 'N';
        this.offnaUpdatetList[i].naDetailsList.forEach(ele => {
          if(ele.createDatetime){
            this.offnadUpdateList.push(ele);
          }else {
            this.offnadInsertList.push(ele);
          }
        })
        if(!this.nonAssociationDetailsValid( this.offnaUpdatetList[i].naDetailsList)){
        return;
     }
      }
      this.offnaCommitModel.updateList = this.offnaUpdatetList;
    }
    if (this.offnaUpdatetList.length > 0 && this.offnadUpdateList.length > 0) {
      for (let i = 0; i < this.offnaUpdatetList.length; i++) {
        this.offnaUpdatetList[i].updateNonAssociation = 'Y';
      }
      this.offnaCommitModel.updateList = this.offnaUpdatetList;
      this.offnaCommitModel.offNadUdateList = this.offnadUpdateList;
    }
    const offnaSaveData = this.oidononaFactory.offNaCommit(this.offnaCommitModel);
    offnaSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.oidononaexecuteQuery();
        this.checkUpdatedAllowed();
      } else if (data === 2) {
        this.show('oidonona.morethanoneactivedetailrecords');
      } else if (data === 3) {
        this.show('oidonona.rowalreadyexists');
       } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });

  }
}
