import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OcdleglsService } from '../service/ocdlegls.service';
import { OidhwdetService } from '../service/oidhwdet.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AppConstants } from '@core/classes/appConstants';
import { OivctmngService } from '@inst/victimmanagement/service/oivctmng.service';
import { Router } from '@angular/router';
import { EngineStatusService } from '@core/service/engine-status.service';

@Component({
  selector: 'app-ocdlegls',
  templateUrl: './ocdlegls.component.html',
  styleUrls: ['./ocdlegls.component.scss']
})
export class OcdleglsComponent implements OnInit, OnDestroy {

  @ViewChild('custgrid', {static: false}) custgrid: any;
  @ViewChild('holdsgrid', {static: true}) holdsgrid: any;
  @ViewChild('ncustgrid', {static: false}) ncustgrid: any;
  @ViewChild('additionalgrid', {static: false}) additionalgrid: any;
  message = ' Invalid.';
  INDEFINITE = 'Indefinite'
  msglist = [];
  type = 'error';
  keyDatesGridData: any[] = [];
  custGridData: any[] = [];
  holdsGridData: any[] = [];
  nonCustGridData: any[] = [];
  keyDatesReferenceCodes: any[] = [];
  keyDatesColDefs: any[];
  custColDef: any[];
  holdsColdef: any[];
  nonCustColDef: any[];
  msgs: any[];
  vHeaderBlockModel: any;
  dataId: any;
  screenName = 'ocdlegls';
  isSingleSaveBtnDisable: boolean = true;
  pageData: any;
  selectedRow: number;
  bailGridData: any[] = [];
  bailColdef: any[];
  operative = this.translateService.translate('ocdlegls.operativeterm');
  cusGridModel:any;
  private _sentenceDates: any;
  initSummaryData: any;
  checkBox1 = false;
  actionType: any;
  sentVerifier: boolean = false;
  sentOverrider: boolean = false;
  ocuverkdData: any[] = [];
  additionalDatesGridData: any[]=[];
  additionalDatesColDef: any[];
  initalBookingKeyDates: any[];
  orderStatus: any = [];
  releaseDate: Date;
  custodyStatus: any;
  exitLaunchBtn = false;
  vctRcrdIndexVal: number;
  linkedOffIndexVal : number;
  sentTypeList = [];
  resetGrid = true;
  engineStatusSubscription:any;
  isSentenceEngineOffline:boolean = false;
  isSenCalEventsPending = false;

  private spnRed: any;
  hideErd: boolean;
  @ViewChild('spnRed')

  get SpnRed(): any {
    return this.spnRed;
  }
  set SpnRed(elem: any) {
    this.spnRed = elem;
  }

  constructor(private OcdleglsFactory: OcdleglsService, public translateService: TranslateService,
    public loginService: LoginService, private dialogService: DialogService, public engineStatusService: EngineStatusService,
    private OidhwdetFactory: OidhwdetService, private sessionManager: UserSessionManager, private oivctmngFactory: OivctmngService, private router: Router) { 
    this.keyDatesColDefs = this.loadColDefData('keyDateSummary', 'OCDLEGLS');
    this.custColDef = this.loadColDefData('custOrders', 'OCDLEGLS','CUST');
    this.nonCustColDef = this.loadColDefData('nCustOrders', 'OCDLEGLS','NCUS');
    this.holdsColdef = this.loadColDefData('hwd', 'OCDLEGLS');
    this.bailColdef = this.loadColDefData('bailGrid', 'OCDLEGLS');
    this.additionalDatesColDef = this.loadColDefData('additionalKeyDatesGrid', 'OCDLEGLS');
  }

  ngOnInit(): void {
    this.getERDHideShowValue();
    this.getSystemStatusInfo();

    if ( this.oivctmngFactory.exitFlag) {
      this.exitLaunchBtn = true;
  }
  this.OcdleglsFactory.populateSentType('CUST').subscribe(data => {
        if (data && data.length > 0) {
            this.sentTypeList = data;
        } 
  });
    this.getStaffRoleDetails();

    if(this.vHeaderBlockModel == undefined){
      this.showHideKeyDatesGridColumn();
    }

  }

  onOffenderChange(offender) {
    this.custodyStatus = "";
    this.vHeaderBlockModel = offender;
    this.dataId = 0;

    this.isSenCalEventsPending = false;
    this.keyDatesGridData = [];
    this.custGridData = [];
    this.holdsGridData = [];
    this.nonCustGridData = [];
    this.bailGridData = [];
    this.additionalDatesGridData = [];
    this.custodyStatus = "";

    if (offender) {
      this.loadJsonData();
      this.fetchReleaseDate(this.vHeaderBlockModel.offenderBookId);
    } else {

      this.showHideKeyDatesGridColumn();
    }
  }


  getDescriptionfromCode(actualCode) {
    const refArr = this.keyDatesReferenceCodes.filter(ref => ref.code.toUpperCase() == actualCode.toUpperCase());
    if (refArr.length > 0) {
      return refArr[0].description;
    }
    return '';
  }

  replaceDateTypewithCode(bookingDates){
    let modifiedBookingDates = [];
    let custodialData=[];
    bookingDates.forEach(bookDate => {
      if(bookDate['overrideIndefinite'] == undefined){
        bookDate['overrideIndefinite'] = false;
      }
      const dateDesc = this.getDescriptionfromCode(bookDate.dateType);
      if (dateDesc) {
        bookDate.dateTypeDisplay = dateDesc;
        if (this.sentOverrider && (bookDate['overrideDateValue'] || bookDate['overrideIndefinite'])) {
          bookDate['clearBtn'] = 'assets/images/delete-icon.png';
        }
        modifiedBookingDates.push(bookDate);
      }
    });
    if(this.releaseDate){
      let bookDate ={};
      bookDate['dateType'] = 'BOOKING_CRD';
      const dateDesc = this.getDescriptionfromCode(bookDate['dateType']);
      bookDate['dateTypeDisplay'] = dateDesc;
      bookDate['dateValue'] = this.releaseDate;
      modifiedBookingDates.push(bookDate);
    }
   
    if (this.hideErd) {
      modifiedBookingDates = modifiedBookingDates.filter(obj => obj.dateType !== "booking_ERD");
  }
  
    this.keyDatesGridData = JSON.parse(JSON.stringify(modifiedBookingDates));
    custodialData= this.keyDatesGridData.filter(e=>  !['booking_PEXD',"booking_PCD"].includes(e.dateType) );
    this.additionalDatesGridData= this.keyDatesGridData.filter(e=>  ['booking_PEXD',"booking_PCD"].includes(e.dateType) );
    this.keyDatesGridData = custodialData;
    this.initalBookingKeyDates = JSON.parse(JSON.stringify(custodialData));
  }

  loadJsonData() {
    this.loadKeyDates();
    this.loadholdsData();
    if(this.orderStatus.length > 0){
      this.loadCustData();
      this.loadNCustData();
      this.loadBailData();
    }
    else{
      this.rgOrderStatusAll();
    }
    this.getOcdleglsHyt();
    this.getPendingSentenceCalculationEvents();
  }

  
  loadCustData() {
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    form_identifiers['orderType'] = 'CUST';
    const retData = {
      formName : 'OCDLEGLO',
      id : this.dataId?this.dataId : 0,
      searchString : JSON.stringify(form_identifiers)
    }
    this.OcdleglsFactory.loadData(retData).subscribe((data: any) => {
      if (data && data.formInfoJson) {
        const originalData = JSON.parse(data.formInfoJson).myJsonRowData;
        let custGridData = [];
        for (let i = 0; i < originalData.length; i++) {
          if (originalData[i].status) {
            const resultStatus = this.orderStatus.filter(ele => ele.updateReasonCode == originalData[i].status);
            if (resultStatus[0] && resultStatus[0].activeType != 'E') {
              originalData[i]['sentenceType'] =  this.sentTypeList?.filter(obj=> originalData[i].sentenceCalcType == obj.code)[0]?.sentType;
              custGridData.push(originalData[i]);
            }
          }
        }
        // const custGridData = originalData;
        if(this.hideErd){
          const index = this.custColDef.findIndex(obj => obj.fieldName === "ERD");
          if (index !== -1) {
              this.custColDef[index].hide = true;
          }

        }
        custGridData.sort((o1: any, o2: any) => this.dateComparator(o1.commenceDate, o2.commenceDate));
        custGridData.forEach(ord => {
          ord.overridebtn = "assets/images/legal-launch-btn-icon.png";
          if (ord.commenceDate && DateFormat.getDate(ord.commenceDate) + '' != 'Invalid Date') {
            ord.commenceDate = DateFormat.format(DateFormat.getDate(ord?.commenceDate));
          }
        });
        this.custGridData = JSON.parse(JSON.stringify(custGridData));
        this.setSentenceDatesForCust();
      } else {
        this.custGridData = [];
      }
    })
  }
  setSentenceDatesForCust() {
    if(!this.sentenceDates || !this.custGridData) return;
    let unModifiedCustGridData = JSON.parse(JSON.stringify(this.custGridData));
    unModifiedCustGridData.forEach(ord => {
      const keyDate = this.sentenceDates.filter(obj => (obj.orderNo == ord.orderNo && obj.sentenceOrderType == 'CUST'));
      ord['opTerm'] = keyDate[0] && keyDate[0]['sentenceOperativeTerm'] ? this.operative + ' ' + keyDate[0]['sentenceOperativeTerm'] : '';
      ord['sentOverrideCheck'] = false;
      const sentenceOrderDates = keyDate[0] && keyDate[0]["sentenceOrderDates"] ? keyDate[0]["sentenceOrderDates"] : [];
      var overrides = {};
      var originalDates = {};
      sentenceOrderDates.forEach(dateObj => {
        if(dateObj['indefinite']) {
          ord[dateObj['dateType']] = this.INDEFINITE;
          originalDates[dateObj['dateType']] = this.INDEFINITE;
          if (dateObj['overrideDateValue']) {
            ord[dateObj['dateType']] =  DateFormat.format(DateFormat.getDate(dateObj['overrideDateValue']));
            overrides[dateObj['dateType']] = DateFormat.getDate(dateObj['overrideDateValue']);
            ord['sentOverrideCheck'] = true;
          }
        } else {
          if(dateObj['dateValue']){
            originalDates[dateObj['dateType']] = DateFormat.format(DateFormat.getDate(dateObj['dateValue']));
          }
          if(dateObj['overrideDateValue']) {
            ord[dateObj['dateType']] = DateFormat.format(DateFormat.getDate(dateObj['overrideDateValue']));
            overrides[dateObj['dateType']] = DateFormat.getDate(dateObj['overrideDateValue']);
            ord['sentOverrideCheck'] = true;
          } else if(dateObj['dateValue']) {
            ord[dateObj['dateType']] = DateFormat.format(DateFormat.getDate(dateObj['dateValue']));
          } else {
            ord[dateObj['dateType']] = "";
          } 
        }
        ord['originalDates'] = originalDates;
        ord['overrides'] = overrides;

      });
    });
    this.custGridData = unModifiedCustGridData;
  }
  setSentenceDatesForNcus() {
    if(!this.sentenceDates || !this.nonCustGridData) return;
    this.nonCustGridData.forEach(ord => {
      const keyDate = this.sentenceDates.filter(obj => (obj.orderNo == ord.orderNo && obj.sentenceOrderType == 'NCUS'));
      const sentenceOrderDates = keyDate[0]["sentenceOrderDates"];
      sentenceOrderDates.forEach(dateObj => {
        if(dateObj['indefinite']) {
          ord[dateObj['dateType']] = this.INDEFINITE;
        } else {
          if(dateObj['dateValue']) {
            ord[dateObj['dateType']] = DateFormat.format(DateFormat.getDate(dateObj['dateValue']));
          }
        }
      });
    });
  }
  dateComparator = (date1, date2) => {
    if (!date1 && !date2) {
      return 0;
    }
    if (!date1) {
      return -1;
    }
    if (!date2) {
      return 1;
    }
    if (DateFormat.getDate(date1) + '' == 'Invalid Date') {
      return 1;
    }
    if (DateFormat.getDate(date2) + '' == 'Invalid Date') {
      return -1;
    }
    if (!(date1 instanceof Date)) {
      date1 = DateFormat.getDate(date1);
    }
    if (!(date2 instanceof Date)) {
      date2 = DateFormat.getDate(date2);
    }
    return DateFormat.compareDate(date1, date2);
  }

  loadNCustData() {
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    form_identifiers['orderType'] = 'NONCUST';
    const ncustRetData = {
      formName: 'OCDLEGLO',
      id: this.dataId ? this.dataId : 0,
      searchString: JSON.stringify(form_identifiers)
    }
    const par_form_identifiers = {};
    par_form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    par_form_identifiers['orderType'] = 'PAR';
    const paroleRetData = {
      formName: 'OCDLEGLO',
      id: this.dataId ? this.dataId : 0,
      searchString: JSON.stringify(par_form_identifiers)
    }
    this.OcdleglsFactory.loadData(ncustRetData).subscribe((nCustdata: any) => {
      this.OcdleglsFactory.loadData(paroleRetData).subscribe((paroledata: any) => {
        var nCustFormData = [];
        var parFormData = [];
        var nCustAndParFormData = [];
        if (nCustdata && nCustdata.formInfoJson) {
          nCustFormData = JSON.parse(nCustdata.formInfoJson).myJsonRowData;
        }
        if (paroledata && paroledata.formInfoJson) {
          parFormData = JSON.parse(paroledata.formInfoJson).myJsonRowData;
          parFormData.forEach(obj => {
            var relatedTo = '';
            if(obj.affectedOrders) {
              obj.affectedOrders.forEach(ord => {
                if(relatedTo != '') {
                  relatedTo = relatedTo + ', '
                }
                relatedTo = relatedTo + ord;
              });
            }
            obj.termTypeAndLength = obj.duration;
            obj.relatedTo = relatedTo;
          });
        }
        nCustAndParFormData = nCustFormData.concat(parFormData);

        if (nCustAndParFormData) {
          const originalNCusData = JSON.parse(JSON.stringify(nCustAndParFormData));
          let nonCustGridData = [];
          for (let i = 0; i < originalNCusData.length; i++) {
            if (originalNCusData[i].status) {
              const resultStatus = this.orderStatus.filter(ele => ele.updateReasonCode == originalNCusData[i].status);
              if (resultStatus[0] && resultStatus[0].activeType != 'E') {
                nonCustGridData.push(originalNCusData[i]);
              }
            }
          }
            nonCustGridData.sort((o1: any, o2: any) => this.dateComparator(o1.commenceDate, o2.commenceDate));
            nonCustGridData.forEach(ord => {
              if (ord.commenceDate && DateFormat.getDate(ord.commenceDate) + '' != 'Invalid Date') {
                ord.commenceDate = DateFormat.format(DateFormat.getDate(ord?.commenceDate));
              }
              if (ord.expiryDate && DateFormat.getDate(ord.expiryDate) + '' != 'Invalid Date') {
                ord.expiryDate = DateFormat.format(DateFormat.getDate(ord?.expiryDate));
              }
            });
            this.nonCustGridData = JSON.parse(JSON.stringify(nonCustGridData));
            this.setSentenceDatesForNcus();
        } else {
          this.nonCustGridData = [];
        }
      });
    });
  }

  loadholdsData() {
    this.holdsGridData = [];
    if (this.vHeaderBlockModel.offenderBookId != null) {
      const searchhwDet = this.OcdleglsFactory.searchHoldWarrentDetainer(this.vHeaderBlockModel.offenderBookId);
      searchhwDet.subscribe(list => {
        if (list && list.length) {
          this.holdsGridData = list.filter(holdObj => holdObj.holdWarrentDetainerTypeInfoIdStatus == 'A');
        } else {
          this.holdsGridData = [];
        }
      });
    }
  }
  loadBailData() {
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    form_identifiers['orderType'] = 'BAIL';
    const retData = {
      formName : 'OCDLEGLO',
      id : this.dataId?this.dataId : 0,
      searchString : JSON.stringify(form_identifiers)
    }
    this.OcdleglsFactory.loadData(retData).subscribe((data: any) => {
      if(data && data.formInfoJson){
        const originalBailData = JSON.parse(data.formInfoJson).myJsonRowData;
        let bailGridData = [];
        for (let i = 0; i < originalBailData.length; i++) {
          if (originalBailData[i].status) {
            const resultStatus = this.orderStatus.filter(ele => ele.updateReasonCode == originalBailData[i].status);
            if (resultStatus[0] && resultStatus[0].activeType != 'E') {
              bailGridData.push(originalBailData[i]);
            }
          }
        }
        bailGridData.sort((o1:any,o2:any)=>this.dateComparator(o1.commenceDate,o2.commenceDate));
        this.bailGridData = JSON.parse(JSON.stringify(bailGridData));
      } else {
        this.bailGridData = [];
      }
    })
  }

  loadKeyDates() {
    let form_identifiers = '"offenderBookId":"'+ this.vHeaderBlockModel.offenderBookId + '"';
    const retData = {
      formName: this.screenName,
      id: this.dataId ? this.dataId : 0,
      searchString: form_identifiers
    }
    this.OcdleglsFactory.loadData(retData).subscribe((data: any) => {
      if(data && data.custodyStatus) {
        this.custodyStatus = data.custodyStatus;
      }
      if (data && data.formInfoJson) {
        this.dataId = data.id;
        const keyDates = JSON.parse(data.formInfoJson);
        this.initSummaryData = JSON.parse(data.formInfoJson);
        const bookingDates = keyDates["bookingDates"];
        this.sentenceDates = keyDates["sentenceDates"];
        this.OcdleglsFactory.loadKeyDates(this.sessionManager.getId(),'OCDLEGLS').subscribe((data: any) => {
          if(data){
            this.keyDatesReferenceCodes = data;
            this.replaceDateTypewithCode(bookingDates);
          }
          this.showHideKeyDatesGridColumn();
        })
      } else {
        this.keyDatesGridData = [];
        this.additionalDatesGridData = [];
        this.showHideKeyDatesGridColumn();
      }
    })
  }
  set sentenceDates(data) {
    this._sentenceDates = data;
    this.setSentenceLevelDates();
  }
  get sentenceDates() {
    return this._sentenceDates;
  }
  loadColDefData(gridName, moduleName, orderType?) {
    const data = this.loginService.mainColDefData;
    let datatypeData = [];
      data.forEach(gridDef => {
        if(gridDef.grid_name == gridName && gridDef.module_name == moduleName){
            datatypeData = JSON.parse(gridDef.configData);
        }
    })
    return this.prepareColDef(datatypeData, moduleName, orderType)
  }
  prepareColDef(coldefJson, moduleName, orderType?) {
    const colDefs = [];
    coldefJson.forEach(type => {
        if(type.dataType === 'lov' && type.source === 'link') {
            let lovRendered = 'description';
            /* if (type.field == 'type' && orderType) {
              lovRendered = 'code'
            } */
            colDefs.push({datatype:type.dataType,fieldName:this.translateService.translate(type.fieldName),lovRender: lovRendered, link:type.url, field:type.field, editable: false, required: false, source:type.sourceType})
        } 
        else if(type.dataType === 'lov' && type.source === 'domain') {
            colDefs.push({datatype:type.dataType,fieldName:this.translateService.translate(type.fieldName), domain:type.url, field:type.field, editable: false})
        }
        else if(type.dataType === 'text') {
            colDefs.push({datatype:type.dataType,fieldName:this.translateService.translate(type.fieldName), field: type.field, editable: false,hide: type.hide,wrapText: true})
        }
        else if(type.dataType === 'number') {
          colDefs.push({ datatype:type.dataType,field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: false })
        }
        else if(type.dataType === 'launchbutton') {
          colDefs.push({ datatype: type.dataType, field: type.field, fieldName: this.translateService.translate(type.fieldName), link: type.link, updateField: 'row', modal: true, data: 'row', width: 200, dialogWidth: '80%', onLaunchClick: this.onLaunchClick, isDisable: this.disableBtn })
        }
        else if (type.dataType === 'hyperlink') {
          colDefs.push({ datatype: 'hyperlink', width: 50, displayas: 'image', suppressMenu: true, parentField: type.parentField, onLaunchClick: this.onLaunchClick, required: type.required, fieldName: type.fieldName ? this.translateService.translate(type.fieldName) : '', field: type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%', styleClass: 'ocdlegls-icon' })
        }
        else if(type.dataType === 'date' && type.field === 'orderedDate') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: false, required: false, width: 150, })
        }
        else if(type.dataType === 'date') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: true, width: 150, cellEditable: this.overrideEdit})
        } 
        else if (type.dataType === 'checkbox' && type.field === 'overrideIndefinite') {
          colDefs.push({
            datatype: type.dataType, field: type.field,
            fieldName: this.translateService.translate(type.fieldName), modal: true,
            data: 'row', width: 200, height: 'auto', editable: false,
            cellEditable: this.overrideEdit, cellVisible: this.shouldCellVisible
          })
        }
        else if(type.dataType === 'checkbox') {
          colDefs.push({ datatype: type.dataType, field: type.field, fieldName: this.translateService.translate(type.fieldName), modal: true, data: 'row', width: 200, height: 'auto', editable: false, cellEditable: this.overrideEdit })
        }
        else if(type.dataType === 'custom') {
          colDefs.push({datatype: type.dataType, fieldName: this.translateService.translate(type.fieldName), field: type.field, editable: false, hide: type.hide, wrapText: true, rendererSelector: (rowIndex, field, data)=> {return (field == 'indefinite' && data && [true, false, "true", "false"].includes(data.indefinite)) ?'checkbox' :''}})
        }
    })
    
    return colDefs;
  }
  overrideEdit = (data: any, index: number, field: string) => {
    if (!this.sentOverrider && (field == 'overrideIndefinite' || field == 'overrideDateValue')) {
      this.message = this.translateService.translate('ocdlegls.userdonthaveaccesstooverride');
      this.type = 'warn';
      this.show();
      return false;
    }
    if (field == 'overrideIndefinite') {
      if (data.dateType == "booking_RED" || data.dateType == "booking_HED") {
        this.message = this.translateService.translate('ocdlegls.thischeckboxcannotbeselectedforthiskey');
        this.type = 'warn';
        this.show();
        return false;
      }
      if (data['overrideDateValue'] !== '' && data['overrideDateValue'] !== undefined && data['overrideDateValue'] !== null &&  !data['overrideIndefinite']) {
        // Please enter either an override date or or an indefinite date
        this.message = this.translateService.translate('ocdlegls.pleaseenteroverride');
        this.type = 'warn';
        this.show();
        return false;
      }
    }
    if (data['indefinite'] && field == 'overrideIndefinite' && data['overrideIndefinite'] === false) {
      // This field cannot be updated when the key date is indefinite
      this.message = this.translateService.translate('ocdlegls.fieldcannotupdate');
      this.type = 'warn';
      this.show();
      return false;
    }
    if (data.dateType == 'booking_HED' || data.dateType ==  "BOOKING_CRD" || (field == 'overrideIndefinite' && data.dateType == "booking_RED")) {
      return false;
    }
    if (['OVERRIDEINDEFINITE', 'OVERRIDEDATEVALUE'].includes(field.toUpperCase())) {
      if (data.indefinite || data.dateValue) {
        return true;
      } else {
        if( data.dateType == "booking_RED") return true;
        if (this.custGridData && this.custGridData.length > 0) {
          for (let i = 0; i < this.custGridData.length; i++) {
            if (this.custGridData[i].sentenceType == 'CNCO') {
              return true;
            }
          }
        }
      }
    }  
    return false;
  }

  shouldCellVisible = (data: any, index: number, field: string): boolean => {
    if (field == 'overrideIndefinite') {
      if (data.dateType == "booking_RED" || data.dateType == "booking_HED") {
        return false;
      }
    }
    return true;
  }

  custom = (rowIndex, field, data) => {
    if (field == 'value') {
      if (typeof data?.value == 'boolean') {
        return 'checkbox';
      } else if (DateFormat.getDate(data?.value) + '' != 'Invalid Date') {
        return 'date';
      } else {
        return;
      }
    }
  }
  onKeyDatesGridInsert = () => {
    return true;
  }

  onMapsData(event,gridName?: string) {
    if(gridName == "keyDatesGrid") {}
  }

  onUpdatedMapsData(event,gridName?: string) { }

  onclearedData(event, gridName?: string) {
    if (gridName == "keyDatesGrid") {}
  }

  setSentenceLevelDates() {
    this.setSentenceDatesForCust();
    this.setSentenceDatesForNcus();
  }
  show() {
    this.msglist = [];
    this.msglist.push( { message: this.message, type: this.type } );
    this.msgs = [...this.msglist];
}
 
  onOverrideClick(event, calResult, grid) {
    if (grid == 'keydatesgrid') {
      this.initSummaryData['bookingDates'].forEach(bookingDate => {
        this.keyDatesGridData.forEach(keyDate => {
          if (bookingDate["dateType"] == keyDate['dateType']) {
            bookingDate["overrideDateValue"] = keyDate['overrideDateValue'];
            bookingDate["overrideIndefinite"] = keyDate['overrideIndefinite'];
          };
        });
      });
    } else if (grid == 'custodialgrid') {
      this.initSummaryData['sentenceDates'].forEach(sentDate => {
        this.custGridData.forEach(custData => {
          var overrides = custData['overrides'];
          if (sentDate.displayNo === custData.displayNo && sentDate['sentenceOrderDates'] && sentDate['sentenceOrderDates'].length) {
            sentDate['sentenceOrderDates'].forEach(sentOrdDate => {
              Object.keys(overrides).forEach(key => {
                if (sentOrdDate["dateType"] == key) {
                  sentOrdDate["overrideDateValue"] = overrides[key];
                };
              })
            })
          }
        });
      });
    }
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    const submissionData = {
      formName: this.screenName,
      id: this.dataId ? this.dataId : 0,
      formInfoJson: JSON.stringify(this.initSummaryData),
      formIdentifier: JSON.stringify(form_identifiers),
      actionType: AppConstants.MODIFICATION,
      calcReason: JSON.stringify(calResult),
      moduleName : 'OCDLEGLS'
    }
    this.OcdleglsFactory.saveData(submissionData).subscribe(data => {
      if (data) {
        this.spnRed.btnClearbtnDisable = true;
        this.spnRed.btnSavebtnDisable = true;
        this.custgrid.btnClearbtnDisable = true;
        this.custgrid.btnSavebtnDisable = true;
        setTimeout(() => {
          this.loadJsonData();
        }, 3000);
        if(data == 1) {
          this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
          this.type = 'success';
          this.show();
      } else if(data != 0){
          let dlgData = {};
          if (data == 2) {
              dlgData = {
                  heading: 'Warning',
                  label: this.translateService.translate('ocucalcr.userhaspendingcalcevents'),
                  yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('ocucalcr.warnok')
              };
          } else if (data == 3) {
              dlgData = {
                  heading: 'Warning',
                  label: this.translateService.translate('ocucalcr.applicationstatusdown'),
                  yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('ocucalcr.warnok')
              };
          }
          if (Object.keys(dlgData).length>0) {
              this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50).subscribe(result => {
              });
          }
          this.message = this.translateService.translate('ocdleglo.savedaspendingevent');
          this.type = 'warn';
          this.show();
      } 
        this.checkBox1 = false;
      } else {
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.type = 'error';
        this.show();
      }
    });
  }

  onVerifyClick = (event) => {
    if (this.sentVerifier) {

      const form_identifiers = {};
      form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
      const submissionData = {
        formName: this.screenName,
        id: this.dataId ? this.dataId : 0,
        formInfoJson: JSON.stringify(this.initSummaryData),
        formIdentifier: JSON.stringify(form_identifiers),
        actionType: AppConstants.VERIFICATION,
        htyData: this.ocuverkdData
      }

      this.dialogService.openLinkDialog('OCUVERKD', submissionData, 80).subscribe(result => {
        if (result) {
          this.getOcdleglsHyt();
        } 
      });

    } else {
      this.message = this.translateService.translate('ocdlegls.userdonthaveaccesstoverify');
      this.type = 'warn';
      this.show();
    }
  }

  onLaunchClick = (event) => {
     const data = { ...event, 'hideErd': this.hideErd  };
    if (this.sentOverrider) {
      if (event.___field === 'clearBtn') {
        let rowIndex = this.keyDatesGridData.findIndex(i => i.dateType === event.dateType);
        this.spnRed.setColumnData('overrideDateValue', rowIndex, '');
        this.spnRed.setColumnData('overrideIndefinite', rowIndex, '');
        this.spnRed.setColumnData('clearBtn', rowIndex, '');
        return;
      }
      this.dialogService.openLinkDialog('OCUOVKEY', data, 80).subscribe(result => {
        if (result) {
          const node = this.custgrid.gridOptions.api.getSelectedNodes().length && this.custgrid.gridOptions.api.getSelectedNodes()[0];
          if (node) {
            var overrides = node.data['overrides'] || {};
            Object.keys(result).forEach(key => {
              if (result[key] && DateFormat.getDate(result[key]) + '' != 'Invalid Date') {
                overrides[key] = DateFormat.getDate(result[key]);
              } else {
                overrides[key] = '';
              }
              if (result[key]) {
                node.setDataValue(key, DateFormat.format(DateFormat.getDate(result[key])));
              } else {
                node.setDataValue(key, '');
                node.setDataValue(key, node.data.originalDates[key]);
              }
            });
            node.setDataValue('overrides', overrides);
          }
        }
      });
    } else {
      this.message = this.translateService.translate('ocdlegls.userdonthaveaccesstooverride');
      this.type = 'warn';
      this.show();
    }
  }

  getStaffRoleDetails() {
    this.OcdleglsFactory.getStaffRoles().subscribe(data => {
      if (data) {
        data.forEach(ele => {
          if (ele.roleCode === 'SENT_VERIFIER') {
            this.sentVerifier = true;
          } else if (ele.roleCode === 'SENT_OVERRIDER') {
            this.sentOverrider = true;
          }
        })
      }
    });
  }

  getOcdleglsHyt() {
    const form_identifiers = {};
    form_identifiers['offenderBookId'] = this.vHeaderBlockModel.offenderBookId + '';
    const submissionData = {
      formName: this.screenName,
      id: this.dataId ? this.dataId : 0,
      formInfoJson: JSON.stringify(this.initSummaryData),
      formIdentifier: JSON.stringify(form_identifiers),
      actionType: AppConstants.VERIFICATION
    }
    const ocuverkdData: any = [];
    this.OcdleglsFactory.loadVerifiedData(submissionData).subscribe(data => {
      if (data && data.length > 0) {
        data.forEach(ele => {
          const keyDate = {};
          keyDate['actionType'] = ele['actionType'];
          keyDate['createDatetime'] = DateFormat.getDate(ele['createDatetime']);
          keyDate['time'] = DateFormat.getDate(ele['createDatetime']);
          keyDate['createUserId'] = ele['createUserId'];
          ocuverkdData.push(keyDate);
        })
      }
      let htyData = [];
      for (let i = 0; i < ocuverkdData.length; i++) {
        if (i != 0 && ocuverkdData[i].actionType === AppConstants.VERIFICATION) {
          htyData.push(ocuverkdData[i - 1]);
        }
        if (ocuverkdData[i].actionType === AppConstants.VERIFICATION) {
          htyData.push(ocuverkdData[i]);
        }
        if (i == ocuverkdData.length - 1) {
          htyData.push(ocuverkdData[i]);
        }
      }
      this.ocuverkdData = htyData;
      if (this.ocuverkdData && this.ocuverkdData.length > 0 && this.ocuverkdData[0].actionType === AppConstants.VERIFICATION) {
        this.checkBox1 = true;
      } else if (this.ocuverkdData && this.ocuverkdData.length === 0) {
        this.checkBox1 = true;
      } else {
        this.checkBox1 = false;
      }
    })
  }
  disableBtn = (data: any, index: number): boolean => {
    if (this.sentOverrider) {
      if (data.clearBtn && this.sentOverrider && (data.overrideDateValue || data.overrideIndefinite)) {
        return false;
      } else if (data.clearBtn) {
        return true;
      }
    } else if (data.clearBtn || data.overridebtn) {
      return true
    }
    return false;
  }
  bookingKeydateCommit(event) {
    this.dialogService.openLinkDialog('/OCUCALCR', this.vHeaderBlockModel, 80).subscribe(result => {
      if (result) {
        this.onOverrideClick(event, result, 'keydatesgrid');
      } else {
        this.spnRed.btnSavebtnDisable = false;
      }
    });
  }
  sentLevelCommit(event) {
    this.dialogService.openLinkDialog('/OCUCALCR', this.vHeaderBlockModel, 80).subscribe(result => {
      if (result) {
        this.onOverrideClick(event, result, 'custodialgrid');
      } else {
        this.custgrid.btnSavebtnDisable = false;
      }
    });
  }
  validateSentenceLevelData = (event) => {
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    return rowdata;
  }
  onKeyDatesClear = () => {
    this.keyDatesGridData = JSON.parse(JSON.stringify(this.initalBookingKeyDates));
    return true;
  }
  onCustGridClear = () => {
    this.loadCustData();
    return true;
  }
  rgOrderStatusAll() {
    this.OcdleglsFactory.rgOrderStatus().subscribe(data => {
      if (data) {
        this.orderStatus = data;
        this.loadCustData();
        this.loadNCustData();
        this.loadBailData();
      }
    });
  }

  fetchReleaseDate(offenderBookId) {
    this.OcdleglsFactory.fetchReleaseDate(offenderBookId).subscribe(data => {
      if (data==null) {
        this.releaseDate = null;
      }else{
        this.releaseDate = data;
      }
    });
  }

  onExitBtnClick = () => {
    if(this.oivctmngFactory.exitFlag){
        this.oivctmngFactory.exitFlag = false;
        this.OcdleglsFactory.vctRcrdIndexVal = this.oivctmngFactory.indexPos ;
        this.OcdleglsFactory.linkedOffIndexVal = this.oivctmngFactory.linkedOffIndexPos ;
        this.oivctmngFactory.tempFlag = true;
        this.oivctmngFactory.tempFlag2 = true;
        this.router.navigate(['/OIVCTMNG']);
    }
}

showHideKeyDatesGridColumn() {
  let needToShowColumn = false;
  for (let i = 0; i < this.keyDatesGridData.length; i++) {
    if (this.keyDatesGridData[i]['clearBtn'] && this.keyDatesGridData[i]['clearBtn'] !== '') {
      needToShowColumn = true;
      break;
    }
  }
  if (needToShowColumn) {
    this.keyDatesColDefs[this.keyDatesColDefs.length - 1]['hide'] = false;
  }
  else {
    this.keyDatesColDefs[this.keyDatesColDefs.length - 1]['hide'] = true;
  }
  this.resetGrid = false;
  setTimeout(() => {
    this.resetGrid = true;
  }, 0);
}


  getSystemStatusInfo() {
    this.engineStatusSubscription = this.engineStatusService.enginesStatus$.subscribe(res => {
      if (res && this.engineStatusService.isObject(res) && Object.keys(res).length > 0 &&
        res['sentenceEngineStatus'] && res['sentenceEngineStatus'] == 'U') {
        this.isSentenceEngineOffline = false;
      }
      else {
        this.isSentenceEngineOffline = true;
      }
    })
  }

  getPendingSentenceCalculationEvents() {
    if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
      let obj = { searchString: '"offenderBookId":"' + this.vHeaderBlockModel.offenderBookId }
      this.OcdleglsFactory.getOffenderPendingEvents(obj).subscribe(data => {
        if (data && data.length > 0) {
          this.isSenCalEventsPending = true;
        }
        else{
          this.isSenCalEventsPending = false;
        }
      });
    }
  }

  ngOnDestroy() {
    if(this.engineStatusSubscription){
        this.engineStatusSubscription.unsubscribe();
    }
  }

  getERDHideShowValue (){
    this.OcdleglsFactory.getERDHideShowValue("DERD").subscribe(data => {
      if(data==='YES'){
       this.hideErd=false;
      } else {
        this.hideErd=true;
      }
        });
  }

}
