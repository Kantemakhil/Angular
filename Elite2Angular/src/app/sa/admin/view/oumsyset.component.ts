import { SelectionModel } from "@angular/cdk/collections";
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatListOption, MatSelectionListChange } from "@angular/material/list";
import { SystemProfiles } from "@common/beans/SystemProfiles";
import { TranslateService } from "@common/translate/translate.service";
import { DateFormat } from "@core/ui-components/datepicker/dateFormat";
import { ValidateRowReturn } from "@core/ui-components/dynamic-alpine-grid/dynamic-alpine-grid.component";
import { OumsysetBean } from "../beans/OumsysetBean";
import { OumsypflService } from "../service/oumsypfl.service";
import { OumsysetService } from "../service/oumsyset.service";
import { Phones } from "@inst/demographics-biometrics/beans/Phones";
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
@Component({
  selector: "app-oumsyset",
  templateUrl: "./oumsyset.component.html",
})
export class OumsysetComponent implements OnInit {
  @ViewChild('emailConfigGrid', {static: false}) emailConfigGrid: any;
  @ViewChild('incedentConfigGrid', {static: false}) incedentConfigGrid: any;
  @ViewChild('emailSmsTestFooterGrid', {static: false}) emailSmsTestFooterGrid: any;
  @ViewChild('viewAuditLogGrid', {static: false}) viewAuditLogGrid: any;

  
  msgs: { message: any; type: any }[];
  systemSettingColdef = [];
  integrationSetColdef = [];
  lanPgConfigColDef = [];
  phoneMaskingSetColdef = [];
  systemSettingRowData = [];
  addressSystemSettingRowData = [];
  eliteSystemSettingRowData = [];
  integrationSetRowData = [];
  phoneMaskingSetRowData = [];
  lanPgConfigRowData = [];
  msglist: any[];
  message: any;
  type: any;
  selectedTabIndex: number = 0;
  serverConfigOptions: { code: string; description: string; settingType: string; }[]; // { [key: string]: Object }[] = [{ code: 'Setting Type', description: 'Provider Code' }]; 
  emailConfigOptions: { code: string; description: string; settingType: string;  }[];
  authenticationConfigOptions: { code: string; description: string; settingType: string;  }[];
  integrationConfigOptions: { code: string; description: string; settingType: string;  }[];
  smsConfigOptions: { code: string; description: string; settingType: string;  }[];
  addressConfigOptions: { code: string; description: string; settingType: string;  }[];
  insightsConfigOptions: { code: string; description: string; settingType: string;  }[];
  eliteDocOptions: { code: string; description: string; settingType: string;  }[];
  maskingConfigOptions: { code: string; description: string; settingType: string;  }[];
  incedentReportConfigOptions: { code: string; description: string; settingType: string;  }[];
  lanPgConfigOptions: { code: string; description: string; settingType: string; }[];
  settingConfigs: { titleName: string; }[];
  systemSettTitles = { description: "Setting Type" };
  oumsysetModelFirst: OumsysetBean = new OumsysetBean();
  oumsysetModelSecond: OumsysetBean = new OumsysetBean();
  oumsysetModelPhoneMask: OumsysetBean = new OumsysetBean();
  oumsysetModelLanPgConfig: OumsysetBean = new OumsysetBean();
  oumsysetModelIncedentReportConfig: OumsysetBean = new OumsysetBean();
  oumsysetModelEmailSmsTestFooterConfig: OumsysetBean = new OumsysetBean();
  oumsysetModelViewAuditLogConfig: OumsysetBean = new OumsysetBean();
  insightDisabled: boolean = true;
  sysPflModelTemp: SystemProfiles = new SystemProfiles();
  @ViewChild('configs', { read: ElementRef, static: true }) configs: ElementRef;
  @ViewChild('phoneMaskingGrid') phoneMaskingGrid: any;
  @Output() selectionChange: EventEmitter<MatSelectionListChange>
  selectedOptions: SelectionModel<MatListOption>
  defaultSelected: any;
  isSelectedTitle: string;
  isSticky: boolean = false;
  phoneTypeList:String[]=[];
  formatFlag: boolean = true;
  incedentReportingRowData: any[];
  incedentReportingColdef = [];
  emailSmsTestFooterColdef = [];
  emailSmsTestFooterRowData: any[];
  viewAuditLogRowData: any[];
  viewAuditLogColdef = [];
  phoneTempData=[];
  emailSmsTestFooterConfigOptions: { code: string; description: string; settingType: string;  }[];
  viewAuditLogConfigOptions: { code: string; description: string; settingType: string;  }[];
  constructor(
    public translateService: TranslateService,
    public oumsysetService: OumsysetService,
    private oumsypflFactory: OumsypflService,
  ) {
  
  }
  lanPgConfigTitles = {
    module: this.translateService.translate('common.description')
  };
  ngOnInit() {
    // code = SETTING_TYPE, // description = SETTING_PROVIDER_CODE
    this.getColDefs();
    this.getIntegColDef();
    this.getPhoneMaskingColDef();
    this.getlanPgConfigColDef();
    this.createSettingConfigs();
    this.getincedentReportingColDef();
    this.getEmailSmsTestFooterConfig();
    this.getViewAuditLogColDef();
    this.serverConfigOptions = [
      { 
        code: "AUTOMATION_USER", 
        description: "Automation User",
        settingType:"serverConfig"
      },
      { 
        code: "PRODUCT", 
        description: "Product" ,
        settingType:"serverConfig"
      }
    ];
    this.emailConfigOptions = [
      { code: "CLICKSEND", settingType: "eMail", description: "Clicksend" },
      { code: "SENDGRID", settingType: "eMail", description: "Sendgrid" },
      { code: "SMTP", settingType: "eMail", description: "Smtp" },
    ];
    this.authenticationConfigOptions = [
      { code: "AZUREAD", settingType: "AD", description: "Azure AD" }
    ];
    this.integrationConfigOptions = [
      { code: "ASB", settingType: "SBINTEGRATION", description: "ASB" }
    ];
    this.smsConfigOptions = [
      { code: "CLICKSEND_SMS", settingType: "SMS", description: "Clicksend SMS" }
    ];
    this.addressConfigOptions = [
      { code: "ADDRESSIFY_URL", settingType: "AddressConfig", description: "Addressify URL" }
    ];
    this.eliteDocOptions = [
      { code: "ELITE_DOC", settingType: "EliteDoc", description: "Elite Doc" }
    ];
    this.insightsConfigOptions = [
      { code: "AUTH", settingType: "INSIGHTS", description: "Auth" },
      { code: "INSIGHTS", settingType: "INSIGHTS", description: "Insights" }
    ];
    this.maskingConfigOptions = [
      { code: "PHONEMASKING", settingType: "PHONEFORMAT", description: "Phone Number Masking" },
    ];
    this.lanPgConfigOptions = [
      { code: "PAGE_CONFIG", settingType: "PAGE_CONFIG", description: "Select Dashboard" },
    ];

    this.incedentReportConfigOptions = [
      { code: "INCEDENT_REPORTING", settingType: "INCEDENT_REPORTING", description: "Incedent Reporting" },
    ];
    this.emailSmsTestFooterConfigOptions = [
      { code: "EMAIL_SMS_TEST_FOOTER_CONFIG", settingType: "EMAIL_SMS_TEST_FOOTER_CONFIG", description: "Email Sms Test Footer Config" },
    ];
    this.viewAuditLogConfigOptions = [
      { code: "VIEW_AUDIT_LOG", settingType: "VIEW_AUDIT_LOG", description: "View Audit Log Config" },
    ];

    this.oumsysetModelFirst.settingProviderCode = this.serverConfigOptions[0].code;
    this.oumsysetModelFirst.settingType = this.serverConfigOptions[0].settingType;
    this.oumsysetModelSecond.settingProviderCode = this.addressConfigOptions[0].code;
    this.oumsysetModelSecond.settingType = this.addressConfigOptions[0].settingType;
    this.sysPflExecuteQuery();
    this.getRowData();
    this.getAddressifyData();
    this.oumsysetService.getPhoneFormates().subscribe(phoneTypes=>{
      if(phoneTypes && phoneTypes.length>0){
        this.phoneTypeList=phoneTypes;
      }else{
        this.phoneTypeList=[];
      }
    })
  }
  createSettingConfigs(){
    this.settingConfigs = [
      { titleName: this.translateService.translate('oumsyset.serverConfig') },
      { titleName: this.translateService.translate('oumsyset.email') },
      { titleName: this.translateService.translate('oumsyset.authentication') },
      { titleName: this.translateService.translate('oumsyset.integration') },
      { titleName: this.translateService.translate('oumsyset.sms') },
      { titleName: this.translateService.translate('oumsyset.insights') },
      { titleName: this.translateService.translate('oumsyset.addressConfig') },
      { titleName: this.translateService.translate('oumsyset.eliteDoc') },
      { titleName: this.translateService.translate('oumsyset.phoneNumberMasking') },
      { titleName: this.translateService.translate('oumsyset.landingPageConfig') },
      { titleName: this.translateService.translate('oumsyset.incidentreporting') },
      { titleName: this.translateService.translate('oumsyset.sabrenotificationoverrides') },
      { titleName: this.translateService.translate('oumsyset.viewauditconfiguration') },
    ];
    this.defaultSelected = this.settingConfigs[0].titleName;
  }
  onSelectionChange(ev: MatSelectionListChange, v, sel){
    let selected = this.settingConfigs.find(x => x.titleName == v.selected[0].value);
    let selectedIndex = this.settingConfigs.findIndex(x => x.titleName == v.selected[0].value);
    const resultObject = this.search(selected, this.settingConfigs);
    this.subscribeGridData(selectedIndex);
  }
  subscribeGridData(index){
    this.systemSettingRowData = [];
    if(index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5){
      if (index === 0) {
        this.oumsysetModelFirst.settingType = this.serverConfigOptions[0].settingType;
        this.oumsysetModelFirst.settingProviderCode = this.serverConfigOptions[0].code;
      } else if (index === 1) {
        this.oumsysetService.getSelectedProvider('eMail').subscribe((result) => {
          this.oumsysetModelFirst.settingProviderCode = result.settingProviderCode;
          this.oumsysetModelFirst.settingType = result.settingType;
          this.getRowData();
        })
        // this.oumsysetModelFirst.settingProviderCode = this.emailConfigOptions[0].code;
        // this.oumsysetModelFirst.settingType = this.emailConfigOptions[0].settingType;
      } else if (index === 2) {
        this.oumsysetModelFirst.settingProviderCode = this.authenticationConfigOptions[0].code;
        this.oumsysetModelFirst.settingType = this.authenticationConfigOptions[0].settingType;
      } else if (index === 3) {
        this.oumsysetModelFirst.settingProviderCode = this.integrationConfigOptions[0].code;
        this.oumsysetModelFirst.settingType = this.integrationConfigOptions[0].settingType;
      } else if (index === 4) {
        this.oumsysetModelFirst.settingProviderCode = this.smsConfigOptions[0].code;
        this.oumsysetModelFirst.settingType = this.smsConfigOptions[0].settingType;
      } else if (index === 5) {
        this.oumsysetModelFirst.settingProviderCode = this.insightsConfigOptions[0].code;
        this.oumsysetModelFirst.settingType = this.insightsConfigOptions[0].settingType;
      }
      if(index!==1){
        this.getRowData();
      }
    }
     else if (index === 6) {
      this.addressSystemSettingRowData = [];
      this.oumsysetModelSecond.settingProviderCode = this.addressConfigOptions[0].code;
      this.oumsysetModelSecond.settingType = this.addressConfigOptions[0].settingType;
      this.getAddressifyData();
    } else if (index === 7) {
      this.eliteSystemSettingRowData = [];
      this.oumsysetModelSecond.settingProviderCode = this.eliteDocOptions[0].code;
      this.oumsysetModelSecond.settingType = this.eliteDocOptions[0].settingType;
      this.getEliteDocData();
    } else if (index === 8) {
      this.oumsysetModelPhoneMask.settingProviderCode = this.maskingConfigOptions[0].code;
      this.oumsysetModelPhoneMask.settingType = this.maskingConfigOptions[0].settingType;
      this.getPhoneMaskingData();
    } else if (index === 9) {
      this.oumsysetModelLanPgConfig.settingProviderCode = this.lanPgConfigOptions[0].code;
      this.oumsysetModelLanPgConfig.settingType = this.lanPgConfigOptions[0].settingType;
      this.getLanPgConfigData();
    }
    else if (index === 10) {
      this.oumsysetModelIncedentReportConfig.settingProviderCode = this.incedentReportConfigOptions[0].code;
      this.oumsysetModelIncedentReportConfig.settingType = this.incedentReportConfigOptions[0].settingType;
      this.getIncdentReportConfigData();
    }

    else if (index === 11) {
      this.oumsysetModelEmailSmsTestFooterConfig.settingProviderCode = this.emailSmsTestFooterConfigOptions[0].code;
      this.oumsysetModelEmailSmsTestFooterConfig.settingType = this.emailSmsTestFooterConfigOptions[0].settingType;
      this.getEmailSmsTestFooterConfigData();
    }
    else if (index === 12) {
      this.oumsysetModelViewAuditLogConfig.settingProviderCode = this.viewAuditLogConfigOptions[0].code;
      this.oumsysetModelViewAuditLogConfig.settingType = this.viewAuditLogConfigOptions[0].settingType;
      this.getViewAuditLogConfigData();
    }

  }
  search(index, arr){
    for (let i=0; i < arr.length; i++) {
      if (arr[i].titleName === index.titleName) {
        this.isSelectedTitle = index.titleName;
        return this.isSelectedTitle;
      } 
    }
  }
  show(vldmsg, type?) {
    type = type ? type : "warn";
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  prepareColDef(coldefJson) {
    let colDefs = [];
    coldefJson.forEach((type) => {
      if (type.dataType === "text") {
        colDefs.push({
          datatype: type.dataType,
          width: 100,
          suppressMenu: true,
          field: type.field,
          hide: type.hide,
          fieldName: this.translateService.translate(type.fieldName),
          cellEditable: this.isMaskFormatEditable,
          editable: ![undefined, null, 0].includes(type.editable)
            ? type.editable
            : true,
          required: type.required,
          uppercase: type.uppercase,
        });
      } else if(type.dataType === 'date' && type.field === 'expiryDate') {
        colDefs.push({
          datatype: 'custom',
          suppressMenu: true,
          field: type.field,
          fieldName: this.translateService.translate(type.fieldName),
          editable: ![undefined, null, 0].includes(type.editable)
            ? type.editable
            : true,
          required: type.required,
          // cellEditable: this.commenceDateEdit,
          editorSelector: (rowIndex, field, data) => {return 'date'}, 
          rendererSelector: this.custom,
          hide: type.hide,
        });
      } else if(type.dataType === 'date') {
        colDefs.push({
          datatype: type.dataType,
          suppressMenu: true,
          field: type.field,
          fieldName: this.translateService.translate(type.fieldName),
          // cellEditable: this.commenceTypeLovEdit,
          editable: ![undefined, null, 0].includes(type.editable)
            ? type.editable
            : true,
          required: type.required,
          hide: type.hide,
        });
      } else if(type.dataType === 'checkbox') {
          colDefs.push({
            datatype: type.dataType,
            width: 40,
            field: type.field,
            fieldName: this.translateService.translate(type.fieldName),
            suppressMenu: true,
            editable: ![undefined, null, 0].includes(type.editable)
              ? type.editable
              : true,
            required: type.required,
          });
      } else if(type.dataType === 'number') {
        colDefs.push({
          datatype: type.dataType,
          width: 40,
          suppressMenu: true,
          hide: type.hide,
          field: type.field,
          fieldName: this.translateService.translate(type.fieldName),
          editable: ![undefined, null, 0].includes(type.editable)
            ? type.editable
            : true,
          required: type.required,
        });
      } else if(type.dataType === 'lov') { //
        let lovRendered = 'module';
        if (type.field == 'VALUE') {
            lovRendered = 'module'
        }
        let a = {
          fieldName: this.translateService.translate(type.fieldName), field: type.field,
          datatype: type.dataType, link: type.link, parentField: 'KEY_CODE', lovRender: lovRendered,
          width: 150, titles: this.lanPgConfigTitles, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, hide: type.hide,
        };
        colDefs.push(a);
    }
    });
    return colDefs;
  }
  isPasswordOrText(key) {
    key.datatype = 'custom';
    key["rendererSelector"] = (rowIndex, field, data) => {
      if (data && data.KEY_CODE && (data.KEY_CODE.includes("PASSWORD") || data.KEY_CODE.includes("PWD") || data.KEY_CODE.includes("APIKEY"))) {
        return 'password'
      }
      return 'text'
    }
    key["editorSelector"] = (rowIndex, field, data) => {
      if (data && data.KEY_CODE && (data.KEY_CODE.includes("PASSWORD") || data.KEY_CODE.includes("PWD") || data.KEY_CODE.includes("APIKEY"))) {
        return 'password'
      }
      return 'text'
    }
    this.systemSettingColdef.push(key)
  }
  getColDefs() {
    this.oumsysetService.loadColDef().subscribe((result) => {
      this.prepareColDef(result).forEach((key) =>
      {
        if (key.field == "VALUE") {
          this.isPasswordOrText(key);
        }
        else {
          this.systemSettingColdef.push(key)
        }
      }
      );
    });
  }
  getIntegColDef() {
    this.oumsysetService.loadIntegColDef().subscribe((result) => {
      this.prepareColDef(result).forEach((key) =>
        this.integrationSetColdef.push(key)
      );
    });
  }
  getAddressifyData() {
    this.oumsysetService.getSysSettingPageData(this.oumsysetModelSecond).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      if(rowData && rowData.length > 0) {
        this.addressSystemSettingRowData = rowData;
      } 
    });
  }
  getEliteDocData() {
    this.oumsysetService.getSysSettingPageData(this.oumsysetModelSecond).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      if(rowData && rowData.length > 0){
        this.eliteSystemSettingRowData = rowData;
      } 
    });
  }
  getRowData() {
    this.oumsysetService.getSysSettingPageData(this.oumsysetModelFirst).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      if(rowData && rowData.length > 0) {
        this.systemSettingRowData = rowData;
        if(this.emailConfigGrid && this.emailConfigGrid.setColumnData){
          this.emailConfigGrid.setColumnData('TEMP', 0, '');
        }
      }
    });
  }
  getPhoneMaskingColDef() {
    this.oumsysetService.loadPhnMaskColDef().subscribe((result) => {
      this.prepareColDef(result).forEach((key) =>
        this.phoneMaskingSetColdef.push(key)
      );
    });
  }
  getincedentReportingColDef() {
    this.oumsysetService.incedentReportingColDef().subscribe((result) => {
      this.prepareColDef(result).forEach((key) =>
        this.incedentReportingColdef.push(key)
      );
    });
  }
  getPhoneMaskingData() {
    this.oumsysetService.getSysSettingPageData(this.oumsysetModelPhoneMask).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      if(rowData && rowData.length > 0) {
        this.phoneMaskingSetRowData = rowData;
        this.phoneTempData = JSON.parse(JSON.stringify(rowData));
      }
    });
  }
  getlanPgConfigColDef() {
    this.oumsysetService.loadLanPgColDef().subscribe((result) => {
      this.prepareColDef(result).forEach((key) =>
        this.lanPgConfigColDef.push(key)
      );
    });
  }
  getLanPgConfigData() {
    this.oumsysetService.getSysSettingPageData(this.oumsysetModelLanPgConfig).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      if(rowData && rowData.length > 0) {
        this.lanPgConfigRowData = rowData; 
        for(let i=0; i<this.lanPgConfigRowData.length; i++){
          if (i==0 || i==1){
            this.lanPgConfigRowData[i]['isOffenderSpecific'] = 'N';
          } else if (i==2){
            this.lanPgConfigRowData[i]['isOffenderSpecific'] = 'Y';
          }
        }
      }
    });
  }

  getIncdentReportConfigData() {
    this.oumsysetService.getSysSettingPageData(this.oumsysetModelIncedentReportConfig).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      console.log(rowData);
      if(rowData && rowData.length > 0) {
        this.incedentReportingRowData = rowData; 
        /* for(let i=0; i<this.lanPgConfigRowData.length; i++){
          if (i==0 || i==1){
            this.lanPgConfigRowData[i]['isOffenderSpecific'] = 'N';
          } else if (i==2){
            this.lanPgConfigRowData[i]['isOffenderSpecific'] = 'Y';
          }
        } */
      }
    });
  }

  isMaskFormatEditable = (data: any, index: number, field: string) => {
    if(field === 'maskFormat' && this.phoneTypeList.includes(data.maskingCode)){
      this.show(this.translateService.translate("oumsyset.numberinuse"));
      this.formatFlag=false;
      return false;
    }
    if (data.maskingCode == 'UNF') {
      if(field === 'maskFormat') {
          return false;
        } else {
          return true;
        }
    }
    if (field == 'KEY_CODE' || field == 'KEY_DESC') {
      return false;
    } else if (field === 'VALUE' || field === 'maskFormat') {
      return true;
    }

   
  }
  onRowClickedPhnMasking(event){
    if(event.maskingCode === 'UNF') {
      this.phoneMaskingGrid.requiredOff('maskFormat');
    } else {
      this.phoneMaskingGrid.requiredOn('maskFormat');
    }
  }
  validationCheck(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].VALUE == undefined || data[i].VALUE == "") {
        this.show(
          this.translateService.translate("oumsyset.ValueMustBeEnter"),
          "warn"
        );
        return false;
      }
    }
    return true;
  }
  validationIntegCheck(data) {
    for (let i = 0; i < data.length; i++) {
      if ((data[i].CONNECTION_URL == undefined || data[i].CONNECTION_URL == "") ||
          (data[i].QUEUE_NAME == undefined || data[i].QUEUE_NAME == "")) {
        this.show(
          this.translateService.translate("oumsyset.ValueMustBeEnter"),
          "warn"
        );
        return false;
      }
    }
    return true;
  }
  validationPhnMaskingCheck(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].maskingCode === "UNF"){
        if (!(data[i].maskFormat == undefined || data[i].maskFormat == "")){
          this.show(
            this.translateService.translate("oumsyset.unFormattedWillBeBlank"),
            "warn"
          );
          return false;
        } else {
          return true;
        }
      } else {
        if ((data[i].maskingCode == undefined || data[i].maskingCode == "") ||
            (data[i].maskingDescription == undefined || data[i].maskingDescription == "") || 
            (data[i].maskFormat == undefined || data[i].maskFormat == "") || 
            (data[i].sequence == undefined || data[i].sequence == "")) {
          this.show(
            this.translateService.translate("oumsyset.ValueMustBeEnter"),
            "warn"
          );
          return false;
        } 
      }
        if(!this.formatFlag){
          this.show(this.translateService.translate("oumsyset.numberinuse"));
          return false;
        }
    }
    return true;
  }
  saveSettingAddressConfig(event) {
    if (event.updated.length > 0) {
      if (!this.validationCheck(event.updated)) {
        return false;
      }
      this.updateAddressRowData(); // api call for update address row data
    }
  }
  saveSettingEliteDoc(event) {
    if (event.updated.length > 0) {
      if (!this.validationCheck(event.updated)) {
        return false;
      }
      this.updateEliteDocRowData(); 
    }
  }
  saveLanPgConfig(event) {
    if (event.updated.length > 0) {
      if (!this.validationCheck(event.updated)) {
        return false;
      }
      this.onCommitLanPgConfig(); // api call for update address row data
    }
  }
  onCommitLanPgConfig() {
    const instlpList = ['OSIOSEAR', 'OIINAMES', 'OIISCHED', 'OIIMYOFF', 'OIIPROLL'];
    const commlpList = ['OSIOSEAR', 'OCIMYOFF', 'OCINAMES', 'OCDORASS'];

    for (let i = 0; i < this.lanPgConfigRowData.length; i++) { 
      if (this.lanPgConfigRowData[i].KEY_CODE == 'INSTLP') { 
        this.lanPgConfigRowData[i].caseLoadSpefic = ((instlpList.find((element) => element == this.lanPgConfigRowData[i].VALUE))) ?'Y': 'N';      
      }
      if (this.lanPgConfigRowData[i].KEY_CODE == 'COMMLP') { 
        this.lanPgConfigRowData[i].caseLoadSpefic = ((commlpList.find((element) => element == this.lanPgConfigRowData[i].VALUE))) ?'Y': 'N';      
      }
    }
    let obj = {
      settingType: this.oumsysetModelLanPgConfig.settingType,
      settingProviderCode: this.oumsysetModelLanPgConfig.settingProviderCode,
      settingValue: JSON.stringify(this.lanPgConfigRowData),
    };
    this.oumsysetService.updateRowData(obj).subscribe((result) => {
      if (result === 1) {
        this.show(
          this.translateService.translate("oumsyset.RecordUpdatedSuccessfully"),
          "success"
        );
        this.getLanPgConfigData();
      } else {
        this.show(
          this.translateService.translate("oumsyset.RecordNotUpdated"),
          "warn"
        );
      }
    });
  }
  saveSettingConfig(event) {
    if (event.updated.length > 0) {
      if (!this.validationCheck(event.updated)) {
        return false;
      }
      this.updateRowData(); // api call for update
    }
  }
  saveIntegSetting(event){
    if (event.updated.length > 0) {
      if (!this.validationIntegCheck(event.updated)) {
        return false;
      }
      this.updateRowData(); // api call for update
    }
  }
  savePhnMaskingSetting(event){
    if (event.updated.length > 0) {
      if (!this.validationPhnMaskingCheck(event.updated)) {
        return false;
      }
      this.updatePhoneFormatRowData(); // api call for update
    }
  }
  updateRowData() {
    let obj = {
      settingType: this.oumsysetModelFirst.settingType,
      settingProviderCode: this.oumsysetModelFirst.settingProviderCode,
      settingValue: JSON.stringify(this.systemSettingRowData),
    };
    this.oumsysetService.updateRowData(obj).subscribe((result) => {
      if (result === 1) {
        this.show(
          this.translateService.translate("oumsyset.RecordUpdatedSuccessfully"),
          "success"
        );
        this.getRowData();
      } else {
        this.show(
          this.translateService.translate("oumsyset.RecordNotUpdated"),
          "warn"
        );
      }
    });
  }
  updatePhoneFormatRowData() {
    let obj = {
      settingType: this.oumsysetModelPhoneMask.settingType,
      settingProviderCode: this.oumsysetModelPhoneMask.settingProviderCode,
      settingValue: JSON.stringify(this.phoneMaskingSetRowData),
    };
    this.oumsysetService.updateRowData(obj).subscribe((result) => {
      if (result === 1) {
        this.show(
          this.translateService.translate("oumsyset.RecordUpdatedSuccessfully"),
          "success"
        );
        this.getFormatTypes();
        this.getPhoneMaskingData();
      } else {
        this.show(
          this.translateService.translate("oumsyset.RecordNotUpdated"),
          "warn"
        );
      }
    });
  }

   getFormatTypes(){
        let addPayload = {
            settingProviderCode: "PHONEMASKING",
            settingType: "PHONEFORMAT"
        };
        this.oumsysetService.getSysSettingPageData(addPayload).subscribe((result) => {
            PhoneNumberUtils.contactType = JSON.parse(result.settingValue);;
        });
    }
  whenTabChangedTriggerFirst(event) {
    this.systemSettingRowData = [];
    this.selectedTabIndex = event.index;
    if (this.selectedTabIndex === 0) {
      this.oumsysetModelFirst.settingType = this.serverConfigOptions[0].settingType;
      this.oumsysetModelFirst.settingProviderCode = this.serverConfigOptions[0].code;
    } else if (this.selectedTabIndex === 1) {
      this.oumsysetModelFirst.settingProviderCode = this.emailConfigOptions[0].code;
      this.oumsysetModelFirst.settingType = this.emailConfigOptions[0].settingType;
    } else if (this.selectedTabIndex === 2) {
      this.oumsysetModelFirst.settingProviderCode = this.authenticationConfigOptions[0].code;
      this.oumsysetModelFirst.settingType = this.authenticationConfigOptions[0].settingType;
    } else if (this.selectedTabIndex === 3) {
      this.oumsysetModelFirst.settingProviderCode = this.integrationConfigOptions[0].code;
      this.oumsysetModelFirst.settingType = this.integrationConfigOptions[0].settingType;
    } else if (this.selectedTabIndex === 4) {
      this.oumsysetModelFirst.settingProviderCode = this.smsConfigOptions[0].code;
      this.oumsysetModelFirst.settingType = this.smsConfigOptions[0].settingType;
    } else if (this.selectedTabIndex === 5) {
      this.oumsysetModelFirst.settingProviderCode = this.insightsConfigOptions[0].code;
      this.oumsysetModelFirst.settingType = this.insightsConfigOptions[0].settingType;
    }
    this.getRowData();
  }

  whenTabChangedTriggerSecond(event) {
    this.systemSettingRowData = [];
    let tabIndex = event.index;
    if (tabIndex === 0) {
      this.oumsysetModelSecond.settingProviderCode = this.addressConfigOptions[0].code;
      this.oumsysetModelSecond.settingType = this.addressConfigOptions[0].settingType;
      this.getAddressifyData();
    }
    else if (tabIndex === 1) {
      this.oumsysetModelSecond.settingProviderCode = this.eliteDocOptions[0].code;
      this.oumsysetModelSecond.settingType = this.eliteDocOptions[0].settingType;
      this.getEliteDocData();
    }
  }
  settingTypeChangeFirst(event) {
    if (event) {
      this.oumsysetModelFirst.settingType = event.settingType;
      this.oumsysetModelFirst.settingProviderCode = event.code;
      this.getRowData();
    } 
  }
  settingTypeChangeSecond(event) {
    if (event) {
      this.oumsysetModelSecond.settingType = event.settingType;
      this.oumsysetModelSecond.settingProviderCode = event.code;
      this.getAddressifyData();
    } 
  }
  sysPflExecuteQuery() {
    this.sysPflModelTemp = new SystemProfiles();
    const syspflResult = this.oumsypflFactory.sysPflGetInsightMode();
    syspflResult.subscribe(syspflResultList => {
      for(let i = 0; i < syspflResultList.length; i++) {
          if(syspflResultList[i].profileCode == 'INSIGHT_MODE'){
            if(syspflResultList[i].profileValue == 'Y'){
              this.insightDisabled = false;
            } else {
              this.insightDisabled = true;
            }
          }
      }
    });
  }
  custom = (rowIndex, field, data) => {
    if (field == 'expiryDate') {
      if (!data[field] || DateFormat.getDate(data[field]) + '' != 'Invalid Date') {
        return 'date';
      } else {
        return;
      }
    }
  }
  getFormatedDate(day) {
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0'); 
    var yyyy = day.getFullYear();
    return yyyy+ '-'+ mm + '-'+ dd;
  }
  validateRowData = (event) => {
    const index = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    this.formatFlag=true;
      if (event.field === 'formatStatus' &&  this.phoneTypeList && event.data.maskingCode &&  this.phoneTypeList.includes(event.data.maskingCode)  && !event.data.formatStatus === true || event.newValue === undefined) {
        this.formatFlag = false;
        this.show(this.translateService.translate("oumsyset.numberinuse"));
        rowdata.validated = true;
        return rowdata;
      }
      
    if(event && event.field === 'formatStatus' && event.data.formatStatus === event.newValue){
      if(!event.newValue && !event.data.formatStatus === true || event.newValue === undefined) {
        this.phoneMaskingGrid.setColumnData('formatStatus', index, false);
        this.phoneMaskingGrid.setColumnData('expiryDate', index, this.getFormatedDate(new Date()));
        rowdata.validated = true;
        return rowdata;
      } else if (event.newValue && event.data.formatStatus){
        this.phoneMaskingGrid.setColumnData('formatStatus', index, true);
        this.phoneMaskingGrid.setColumnData('expiryDate', index, '');
        rowdata.validated = true;
        return rowdata;
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  serverConfigInsert = () => {
    return { isNewRow: true };
  };
  integConfigInsert = () => {
    return { isNewRow: true };
  };
  smsConfigInsert = () => {
    return { isNewRow: true };
  };

  addressConfigInsert = () => {
    return { isNewRow: true };
  };

  eliteDocInsert = () => {
    return { isNewRow: true };
  };
  phoneMaskingInsert = () => {
    return { isNewRow: true };
  };
  insightsConfigInsert = () => {
    return { isNewRow: true };
  };
  lanPgConfigInsert = () => {
    return { isNewRow: true };
  };
  emailConfigInsert = () => {
    return { isNewRow: true };
  };

  updateAddressRowData() {
    let obj = {
      settingType: this.oumsysetModelSecond.settingType,
      settingProviderCode: this.oumsysetModelSecond.settingProviderCode,
      settingValue: JSON.stringify(this.addressSystemSettingRowData),
    };
    this.oumsysetService.updateRowData(obj).subscribe((result) => {
      if (result === 1) {
        this.show(
          this.translateService.translate("oumsyset.RecordUpdatedSuccessfully"),
          "success"
        );
        this.getAddressifyData();
      } else {
        this.show(
          this.translateService.translate("oumsyset.RecordNotUpdated"),
          "warn"
        );
      }
    });
  }
  updateEliteDocRowData() {
    let obj = {
      settingType: this.oumsysetModelSecond.settingType,
      settingProviderCode: this.oumsysetModelSecond.settingProviderCode,
      settingValue: JSON.stringify(this.eliteSystemSettingRowData),
    };
    this.oumsysetService.updateRowData(obj).subscribe((result) => {
      if (result === 1) {
        this.show(
          this.translateService.translate("oumsyset.RecordUpdatedSuccessfully"),
          "success"
        );
        this.getEliteDocData();
      } else {
        this.show(
          this.translateService.translate("oumsyset.RecordNotUpdated"),
          "warn"
        );
      }
    });
  }


  saveIncedentReportConfig(event) {
    if (event.updated.length > 0) {
      if (!this.validationCheck(event.updated)) {
        return false;
      }
      this.onCommitIncedentReportingConfig(); // api call for update address row data
    }
  }
  onCommitIncedentReportingConfig(){
    let obj = {
      settingType: this.oumsysetModelIncedentReportConfig.settingType,
      settingProviderCode: this.oumsysetModelIncedentReportConfig.settingProviderCode,
      settingValue: JSON.stringify(this.incedentReportingRowData),
    };
    this.oumsysetService.updateRowData(obj).subscribe((result) => {
      if (result === 1) {
        this.show(
          this.translateService.translate("oumsyset.RecordUpdatedSuccessfully"),
          "success"
        );
        this.getIncdentReportConfigData();
      } else {
        this.show(
          this.translateService.translate("oumsyset.RecordNotUpdated"),
          "warn"
        );
      }
    });
  }

  getEmailSmsTestFooterConfig() {
    this.oumsysetService.emailSmsTestFooterColDef().subscribe((result) => {
      this.prepareColDef(result).forEach((key) =>
        this.emailSmsTestFooterColdef.push(key)
      );
    });
  }
  
  getEmailSmsTestFooterConfigData() {
    this.oumsysetService.getSysSettingPageData(this.oumsysetModelEmailSmsTestFooterConfig).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      console.log(rowData);
      if(rowData && rowData.length > 0) {
        this.emailSmsTestFooterRowData = rowData; 
      }
    });
  }

  saveEmailSmsTestConfig(event) {
    if (event.updated.length > 0) {
      if (!this.validationCheckEmailSms(this.emailSmsTestFooterRowData)) {
        return false;
      }
      this.onCommitEmailTestConfig(); // api call for update address row data
    }
  }
  onCommitEmailTestConfig(){
    let obj = {
      settingType: this.oumsysetModelEmailSmsTestFooterConfig.settingType,
      settingProviderCode: this.oumsysetModelEmailSmsTestFooterConfig.settingProviderCode,
      settingValue: JSON.stringify(this.emailSmsTestFooterRowData),
    };
    this.oumsysetService.updateRowData(obj).subscribe((result) => {
      if (result === 1) {
        this.show(
          this.translateService.translate("oumsyset.RecordUpdatedSuccessfully"),
          "success"
        );
        this.getEmailSmsTestFooterConfigData();
      } else {
        this.show(
          this.translateService.translate("oumsyset.RecordNotUpdated"),
          "warn"
        );
      }
    });
  }

  validationCheckEmailSms(data) {
    for (let i = 0; i < data.length; i++) {
      if ((data[i].VALUE == undefined || data[i].VALUE == '' || data[i].VALUE == ' ') && (data[i].KEY_CODE=='SMS_FOOT' || data[i].KEY_CODE=='EM_FOOT')) {
        this.show(
          this.translateService.translate("oumsyset.pleaseenterafootermessage"),
          "warn"
        );
        return false;
      }
      if ((data[i].VALUE == undefined || data[i].VALUE == '' || data[i].VALUE == ' ') && (data[i].KEY_CODE=='TEST_SMS_OV')) {
        this.show(
          this.translateService.translate("oumsyset.pleaseenteravalidphonenumber"),
          "warn"
        );
        return false;
      }

      if (data[i].KEY_CODE=='TEST_EM_OV') {
        if(data[i].VALUE == undefined || data[i].VALUE == '' || data[i].VALUE == ' '){
          this.show(
            this.translateService.translate("oumsyset.pleaseenteraemailaddress"),
            "warn"
          );
          return false;
        }
        if(data[i].VALUE!='N'){
          let addresses = data[i].VALUE.split(',');
          var r = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          for(let j =0; j < addresses.length ; j++){
            if(!r.test(addresses[j])){
              this.show('oumsyset.pleaseenteravalidemailaddress');
              return false;     
              }
          }
      
        }    
      }

    }
    return true;
  }

  getViewAuditLogColDef() {
    this.oumsysetService.viewAuditLogColDef().subscribe((result) => {
      this.prepareColDef(result).forEach((key) =>
        this.viewAuditLogColdef.push(key)
      );
    });
  }

  getViewAuditLogConfigData() {
    this.oumsysetService.getSysSettingPageData(this.oumsysetModelViewAuditLogConfig).subscribe((result) => {
      const rowData = JSON.parse(result.settingValue);
      if(rowData && rowData.length > 0) {
        this.viewAuditLogRowData = rowData; 
      }
    });
  }

  saveViewAuditLogConfig(event) {
    if (event.updated.length > 0) {
      if (!this.validationCheckViewAuditLog(this.viewAuditLogRowData)) {
        return false;
      }
      this.onCommitViewAuditLogConfig(); // api call for update address row data
    }
  }
  onCommitViewAuditLogConfig(){
    let obj = {
      settingType: this.oumsysetModelViewAuditLogConfig.settingType,
      settingProviderCode: this.oumsysetModelViewAuditLogConfig.settingProviderCode,
      settingValue: JSON.stringify(this.viewAuditLogRowData),
    };
    this.oumsysetService.updateRowData(obj).subscribe((result) => {
      if (result === 1) {
        this.show(this.translateService.translate("oumsyset.RecordUpdatedSuccessfully"),"success");
        this.getViewAuditLogConfigData()
      } else {
        this.show(this.translateService.translate("oumsyset.RecordNotUpdated"),"warn");
      }
    });
  }

  validationCheckViewAuditLog(data) {
    for (let i = 0; i < data.length; i++) {
     if ((data[i].VALUE == undefined || data[i].VALUE == '' || data[i].VALUE == ' ')) {
        this.show(
          this.translateService.translate("oumsyset.pleaseentervalue"),
          "warn"
        );
        return false;
      }
    }
    return true;
  }
}
