import { AddressDetails } from './../../../core/ui-components/address-block/address-block.detail';
import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { Phones } from '@inst/demographics-biometrics/beans/Phones';
import { InternetAddresses } from '@inst/demographics-biometrics/beans/InternetAddresses';
import { TranslateService } from '@common/translate/translate.service';
import { OcdaddreService } from '@inst/demographics-biometrics/service/ocdaddre.service';
import { VAddresses } from '@inst/demographics-biometrics/beans/VAddresses';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { PhonesCommitBean } from '@inst/demographics-biometrics/beans/PhonesCommitBean';
import { InternetAddressesCommitBean } from '@inst/demographics-biometrics/beans/InternetAddressesCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { Addresses } from '@inst/demographics-biometrics/beans/Addresses';
import { AddressCommitBean } from '@inst/demographics-biometrics/beans/AddressCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { AddressUsages } from '@inst/demographics-biometrics/beans/AddressUsages';
import { AddressUsagesCommitBean } from '@inst/demographics-biometrics/beans/AddressUsagesCommitBean';
import { Location } from '@angular/common';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { GridComponent } from '@core/ui-components/grid/grid.component';

@Component({
  selector: 'app-ocdaddre',
  templateUrl: './ocdaddre.component.html',
  styleUrls: ['./ocdaddre.component.scss']
})
export class OcdaddreComponent implements OnInit {
  firstVal: boolean;
  tempAddressData: VAddresses = new VAddresses();
  @ViewChild('chips') chips: any;
  @ViewChildren('addressSpecific') addressSpecific: any;
  @ViewChild('addressSpecificGrid') addressSpecificGrid: any;
  @ViewChild('phoneglobalAddre') phoneglobalAddre: any;
  @ViewChild('globalemails') globalemails: any;
  // @ViewChild('phoneAddSpecGrid', {static: true}) phoneAddSpecGrid: GridComponent;
  isNodDataPaneVisible = false;
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  msgs: any[] = [];
  addressDetails: AddressDetails = new AddressDetails();
  addressDetailsTemp: AddressDetails = new AddressDetails();
  phoneaddrData: Phones[] = [];
  columnDefsPhones: any[];
  phoneglobalData: Phones[] = [];
  columnDefsGphones: any[];
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  emailData: InternetAddresses[] = [];
  vAddressData: VAddresses[] = [];
  columnDefsEmail: any[];
  phonesGridIndex = 0;
  phonesGlobalGridIndex = 0;
  emailsGridIndex = 0;
  isGlobalContactVisiable = false;
  isAddNewAddressVisiable = false;
  isWaringMessage = true;
  dateFormat = DateFormat.dateFormat;
  vAddressStoredData: any[] = [];
  phoneaddrInsertList: Phones[] = [];
  phoneaddrUpdatetList: Phones[] = [];
  phoneaddrDeleteList: Phones[] = [];
  phoneglobalInsertList: Phones[] = [];
  phoneglobalUpdatetList: Phones[] = [];
  phoneglobalDeleteList: Phones[] = [];
  phoneglobalCommitModel: PhonesCommitBean = new PhonesCommitBean;
  emailInsertList: InternetAddresses[] = [];
  emailUpdatetList: InternetAddresses[] = [];
  emailDeleteList: InternetAddresses[] = [];
  addressUsageInsertList: AddressUsages[] = [];
  addressUsageDeleteList: AddressUsages[] = [];
  addressUsageCommitBean: AddressUsagesCommitBean = new AddressUsagesCommitBean();
  emailCommitModel: InternetAddressesCommitBean = new InternetAddressesCommitBean;
  addrCommitModel: AddressCommitBean = new AddressCommitBean();
  phoneaddrCommitModel: PhonesCommitBean = new PhonesCommitBean;
  activeAddressFlag = true;
  inActiveAddressFlag = true;
  addressTypeData: any[] = [];
  addedAddressType: any[] = [];
  removeAddressType: any[] = [];
  isSaveble = true;
  defaultState: string;
  defaultCountry: string;
  cityMap: Map<string, string> = new Map<string, string>();
  stateMap: Map<string, string> = new Map<string, string>();
  selectedFormat: any;

  isAddAdressAllow:boolean = false;
  isGlobalContactAllow:boolean = false;
  isFilterByAllow:boolean = false;

  constructor(private ocdaddreFactory: OcdaddreService,
              private location: Location,
              public translateService: TranslateService,
              public dialogService: DialogService,
              private offenderSearchService: OffenderSearchService) {
                this.firstVal = true;
               }

  ngOnInit() {
    this.columnDefsPhones = [
      {
        fieldName: this.translateService.translate('ocdaddre.phoneFormat'), field: 'format', editable: true, width: 200,
        datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true
      },
      {
          fieldName: this.translateService.translate('ocdaddre.phonetype'), field: 'phoneType', editable: true, width: 230,
          datatype: 'lov', domain: 'PHONE_USAGE', optionWidth: 230, titles: { code: 'Code', description: 'Description' }
      },
      {
          fieldName: this.translateService.translate('ocdaddre.phonenumber'), field: 'phoneNo', editable: true, width: 230,
          datatype: 'phone', formatType: this.selectedFormat
      },
      {
          fieldName: this.translateService.translate('ocdaddre.extension'), datatype: 'text', field: 'extNo', editable: true,
          width: 230, maxlength: 7, uppercase: false
      },
  ];

  this.columnDefsGphones = [
    {
      fieldName: this.translateService.translate('ocdaddre.phoneFormat'), field: 'format', editable: true, width: 200,
      datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true,source:'OUMSYSET'
    },
    {
        fieldName: this.translateService.translate('ocdaddre.phonetype'), field: 'phoneType', editable: true, width: 230,
        datatype: 'lov', domain: 'PHONE_USAGE', optionWidth: 230, titles: { code: 'Code', description: 'Description' }
    },
    {
        fieldName: this.translateService.translate('ocdaddre.phonenumber'), field: 'phoneNo', editable: true, width: 230,
        datatype: 'phone', formatType: this.selectedFormat
    },
    {
        fieldName: this.translateService.translate('ocdaddre.extension'), field: 'extNo', editable: true, width: 230,
        datatype: 'text', maxlength: 7, uppercase: false
    },
];

  this.columnDefsEmail = [
    {
        fieldName: this.translateService.translate('ocdaddre.email'), field: 'internetAddress', editable: true, width: 650,
        datatype: 'email'
    }

];
if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
    this.show('common.pleasesearchforvalidoffender');
}
const state = this.ocdaddreFactory.rgStateRecordGroup();
    state.subscribe(data => {
      data.forEach(obj => {
        this.stateMap.set(obj.code, obj.description);
        if (obj.listSeq === 1) {
          this.defaultState = obj.code;
        }
      });

    });
    const city = this.ocdaddreFactory.rgTownRecordGroup();
    city.subscribe(data => {
      data.forEach(obj => {
        this.cityMap.set(obj.code, obj.description);
       
      });

    });
    const country = this.ocdaddreFactory.rgCountryRecordGroup();
    country.subscribe(data => {
      data.forEach(obj => {
        if (obj.listSeq === 1) {
          this.defaultCountry = obj.code;
        }
      });

    });
  }

  /*
  Event is trigger whenever offender is changed from header-block
  */
  onOffenderChange(event) {
    this.setEnableDisable(event)
    this.addressDetails=new AddressDetails();
    if (event && event.offenderBookId) {
      this.vHeaderBlockModel = event;
      this.vAddressAndPhoneExecuteQuery();
      this.ocdaddrePhoneGlobalExecuteQuery();
      this.ocdaddreEmailExecuteQuery();
    } else {
      if (typeof event !== 'object') {
        this.vHeaderBlockModel = new VHeaderBlock();
      }
      this.vAddressData = [];
      this.phoneglobalData = [];
      this.emailData = [];
      this.isGlobalContactVisiable = false;
      this.isAddNewAddressVisiable = false;
      this.isNodDataPaneVisible = false;
    }
  }

  /*
   Address Specific Number execute method
    invoked after Address Specific save, update or delete
    */
  ocdaddrePhoneAddressExecuteQuery(addressId) {
    const phoneaddrModel = new Phones();
    phoneaddrModel.ownerId = addressId;
    const phoneaddrResult = this.ocdaddreFactory.phoneAddrExecuteQuery(phoneaddrModel);
    phoneaddrResult.subscribe(phoneaddrResultList => {
      const data = {index: -1};
      this.vAddressData.forEach(ele => {
        if (ele.addressId === addressId) {
          data.index = this.vAddressData.indexOf(ele);
          return;
        }
      });
      if (phoneaddrResultList && phoneaddrResultList.length > 0) {
        if (data.index >= 0) {
          this.vAddressData[data.index].phones = phoneaddrResultList;
        }
      } else {
        this.vAddressData[data.index].phones = [];
      }

    });
}

  onRowClickphoneaddr(event) {
  }
  validateRowGlobalPhones = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event && event.newValue !== event.oldValue && event.newValue){
      if (event.field === 'format') {
        this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
        PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
        this.phoneglobalAddre.setColumnData('phoneNo', rowIndex, null);
      }

    }
    rowdata.validated = true;
    return rowdata;
  }
  validateRowGlobalEmails= (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    let dupEmailData = this.emailData.filter(e => e['internetAddress'] === event.data.internetAddress);
    if(dupEmailData && dupEmailData.length>1){
      this.message = this.translateService.translate('ocdaddre.emailalreadyexist');
      this.globalemails.setColumnData('internetAddress', rowIndex, undefined);
      this.show(this.message, 'warn');
    }
    rowdata.validated = true;
    return rowdata;
  }
  validateRowaddressSpecNum = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event && event.newValue !== event.oldValue && event.newValue){
      if (event.field === 'format') {
        this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
        PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
        this.addressSpecificGrid.setColumnData('phoneNo', rowIndex, null);
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  /*
  OnInsert call back for Address Specific Number
  */
  onGridInsertPhoneAddr = () => {
    const grids = this.addressSpecific._results;
    const gridindex = {id: 0};
    grids.forEach(ele => {
      if (ele.addedMap && ele.updatedMap && ele.removedMap) {
        if (ele.addedMap.size > 0 || ele.updatedMap.size > 0 || ele.removedMap.size > 0) {
            gridindex.id = ele.id;
            return;
        }
      }
    });
    const index = {no: -1};
    if (gridindex.id !== 0) {
        this.vAddressData.forEach(ele => {
          if (String(ele.addressId) === String(gridindex.id)) {
            index.no = this.vAddressData.indexOf(ele);
            return;
          }
        });
    }
    if (index.no >= 0) {
      if (!this.PhonesValidation(this.vAddressData[index.no].phones)) {
        return null;
      }
    }
    const addData = new Phones();
    addData.ownerClass = 'ADDR';
    return addData;
    }
    /*
      Address Specific Number onCommit Event
    */
    ocdaddreSavephoneaddrForm(event, addressId) {

      this.phoneaddrInsertList = [];
      this.phoneaddrUpdatetList = [];
      this.phoneaddrDeleteList = [];
      this.phoneaddrCommitModel.insertList = [];
      this.phoneaddrCommitModel.deleteList = [];
      this.phoneaddrCommitModel.updateList = [];
      if (!this.PhonesValidation(event.added) || !this.PhonesValidation(event.updated)) {
        return;
      }
      this.phoneaddrInsertList = event.added.length > 0 ? event.added : [];
      this.phoneaddrInsertList.forEach(ele => {
        ele.ownerId = addressId;
      });
      this.phoneaddrUpdatetList = event.updated.length > 0 ? event.updated : [];
      this.phoneaddrDeleteList = event.removed.length > 0 ? event.removed : [];


      this.phoneaddrCommitModel.insertList = this.phoneaddrInsertList;
      this.phoneaddrCommitModel.deleteList = this.phoneaddrDeleteList;
      this.phoneaddrCommitModel.updateList =  this.phoneaddrUpdatetList;

      this.ocdaddreFactory.phoneAddrCommit(this.phoneaddrCommitModel).subscribe(data => {
        if (data === 1) {
          this.show('common.addupdateremoverecordsuccess', 'success');
        } else {
          this.show('common.addupdateremoverecordfailed', 'error');
        }
        this.ocdaddrePhoneAddressExecuteQuery(addressId);
      });


    }
    /*
    Global Phone Number Row Click
    */
    onRowClickphoneglobal(event) {
    }
    onClearNumber = () => {
      this.ocdaddrePhoneGlobalExecuteQuery();
      return true;
    }
    /**
     *  This function will be executed when we click on save button of Global Numbers block
     */
    ocdaddreSavephoneglobalForm(event) {
      this.phoneglobalInsertList = [];
      this.phoneglobalUpdatetList = [];
      this.phoneglobalDeleteList = [];

      this.phoneglobalCommitModel.insertList = [];
      this.phoneglobalCommitModel.updateList = [];
      this.phoneglobalCommitModel.deleteList = [];

      if (event.added && event.added.length > 0 && !this.PhonesValidation(event.added)) {
        return false;
      }
      if (event.updated && event.updated.length > 0 && !this.PhonesValidation(event.updated)) {
        return false;
      }

      this.phoneglobalInsertList = event.added && event.added.length > 0 ? event.added : [];
      this.phoneglobalUpdatetList = event.updated && event.updated.length > 0 ? event.updated : [];
      this.phoneglobalDeleteList = event.removed && event.removed.length > 0 ? event.removed : [];

      this.phoneglobalCommitModel.insertList = this.phoneglobalInsertList;
      this.phoneglobalCommitModel.updateList = this.phoneglobalUpdatetList;
      this.phoneglobalCommitModel.deleteList = this.phoneglobalDeleteList;

      this.ocdaddreFactory.phoneGlobalCommit(this.phoneglobalCommitModel).subscribe(data => {
        if (data === 1) {
          this.show('common.addupdateremoverecordsuccess', 'success');
        } else {
          this.show('common.addupdateremoverecordfailed', 'error');
        }
        this.ocdaddrePhoneGlobalExecuteQuery();
      });
    }

    /*
      OnInsert call back for Global Phone Number
    */
    onGridInsertGlobalPhones = () => {
      if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderId) {
        if (!this.PhonesValidation(this.phoneglobalData)) {
          return null;
        }
          const phoneRecord = new Phones();
          phoneRecord.ownerId = this.vHeaderBlockModel.rootOffenderId;
          phoneRecord.ownerClass = 'OFF';
          return phoneRecord;
      } else {
        return null;
      }

    }
    onRowClickemail(event) {}
    showmsg() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    /**
     *  This function will be executed when we click on save button of Global Emails block
     */
    ocdaddreSaveEmailForm(event) {

      this.emailInsertList = [];
      this.emailDeleteList = [];
      this.emailUpdatetList = [];

      this.emailCommitModel.insertList = [];
      this.emailCommitModel.updateList = [];
      this.emailCommitModel.deleteList = [];
   
      if (!this.emailValidation(event.added)) {
          return;
      }

      if (!this.emailValidation(event.updated)) {
        return;
    }

      this.emailInsertList = event.added && event.added.length > 0 ? event.added : [];
      this.emailUpdatetList = event.updated && event.updated.length > 0 ? event.updated : [];
      this.emailDeleteList = event.removed && event.removed.length > 0 ? event.removed : [];
      // var r=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      
      
     /*  if(this.emailInsertList.length>0){
          for(let i=0;i<this.emailInsertList.length;i++){
          if(!r.test(this.emailInsertList[i].internetAddress)){
          this.type = 'warn';
          this.message = this.translateService.translate('common.enteremailaddressval');
          this.showmsg();
          return;     
          }
          this.emailCommitModel.insertList = this.emailInsertList;
      }
      }
          if(this.emailUpdatetList.length>0){
              for(let i=0;i<this.emailUpdatetList.length;i++){
              if(!r.test(this.emailUpdatetList[i].internetAddress)){
              this.type = 'warn';
              this.message = this.translateService.translate('common.enteremailaddressval');
              this.showmsg();
              return;     
              }
              this.emailCommitModel.updateList = this.emailUpdatetList;
          }
          }
              if(this.emailDeleteList.length>0){
                  for(let i=0;i<this.emailDeleteList.length;i++){
                  if(!r.test(this.emailDeleteList[i].internetAddress)){
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.enteremailaddressval');
                  this.showmsg();
                  return;     
                  }
                  this.emailCommitModel.deleteList = this.emailDeleteList;
              }
              } */
              
     this.emailCommitModel.insertList = this.emailInsertList;
     this.emailCommitModel.updateList = this.emailUpdatetList;
     this.emailCommitModel.deleteList = this.emailDeleteList;

      this.ocdaddreFactory.
      emailCommit(this.emailCommitModel).subscribe(data => {
        if (data === 1) {
          this.show('common.addupdateremoverecordsuccess', 'success');
        } else {
          this.show('common.addupdateremoverecordfailed', 'error');
        }

        this.ocdaddreEmailExecuteQuery();

      });
    }

    onGridInsertGlobalEmails = () => {
      if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderIdDisplay) {
        if (!this.emailValidation(this.emailData)) {
          return null;
        }
        const emailRecord = new InternetAddresses();
        emailRecord.ownerClass = 'OFF';
        emailRecord.internetAddressClass = 'EMAIL';
        emailRecord.ownerId = this.vHeaderBlockModel.rootOffenderId;
        return emailRecord;
      } else {
        return null;
      }
    }
    onbackBtnClick = () => {
      this.location.back();
    }
    toggleGlobalContactDetail(event) {
      if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
        this.show('common.pleasesearchforvalidoffender');
        return;
    }
      this.isGlobalContactVisiable = event;
      if (this.isGlobalContactVisiable) {
        this.isAddNewAddressVisiable = false;
      }
      this.isWaringMessage = false;
    }

    setAddNewAddressVisible(event) {
      if (!this.offenderSearchService.selectedOffender || this.offenderSearchService.selectedOffender.offenderBookId === undefined) {
        this.show('common.pleasesearchforvalidoffender');
        return;
      }
      this.isAddNewAddressVisiable = event;
      if (this.isAddNewAddressVisiable) {
        this.isAddAdressAllow = false;
        this.isGlobalContactAllow = false;
        this.isFilterByAllow = false;
        this.isNodDataPaneVisible = false;
        this.isGlobalContactVisiable = false;
        const address = new VAddresses();
        if(this.defaultState){
          address.provStateCode = this.defaultState;
          address.defaultState=this.defaultState;
          
        }
        if(this.defaultCountry){
          address.countryCode=this.defaultCountry;
          address.defaultCountry=this.defaultCountry;
        }
       
       
        address.startDate = DateFormat.getDate();
        address.primaryFlag = 'Y';
        this.onAddressUpdate(address);
      } 
      else {
        this.isAddAdressAllow = true;
        this.isGlobalContactAllow = true;
        this.isFilterByAllow = true;
        if (this.vAddressStoredData.length <= 0) {
          this.isNodDataPaneVisible = false;
        }
      }
      this.isWaringMessage = false;

    }

    /*Global Phone Number Execute Query*/
    ocdaddrePhoneGlobalExecuteQuery() {
      const phoneglobalModel = new Phones();
      phoneglobalModel.ownerId = this.vHeaderBlockModel.rootOffenderId;
      const phoneglobalResult = this.ocdaddreFactory.phoneGlobalExecuteQuery(phoneglobalModel);
      phoneglobalResult.subscribe(phoneglobalResultList => {
          if (phoneglobalResultList && phoneglobalResultList.length > 0) {
          this.phoneglobalData = phoneglobalResultList;
          } else {
            this.phoneglobalData = [];
          }
      });
  }

  /*Global Email Address Execute Query*/
  ocdaddreEmailExecuteQuery() {
    const emailModel = new InternetAddresses();
    emailModel.ownerId = this.vHeaderBlockModel.rootOffenderId;
    const emailResult = this.ocdaddreFactory.emailExecuteQuery(emailModel);
    emailResult.subscribe(emailResultList => {
      if (emailResultList) {
        this.emailData = emailResultList;
      } else {
        this.emailData = [];
      }
    });
}

/*Address Block and Address Specific Number Execute Query*/
vAddressAndPhoneExecuteQuery() {
  this.vAddressData = [];
  this.isNodDataPaneVisible = false;
  this.vAddressStoredData = [];
  this.activeAddressFlag = true;
  this.inActiveAddressFlag = true;
  const addressModel = new VAddresses();
  addressModel.ownerId = this.vHeaderBlockModel.rootOffenderId;
  const addressandNumbers =  this.ocdaddreFactory.vAddressAndPhoneExecuteQuery(addressModel);
  addressandNumbers.subscribe(data => {
    if (data && data.length > 0) {
      const indexValue = {value: 1};
      data.forEach(element => {
        element['addressIndex'] = 'Address ' + indexValue.value++;
        if(element.streetAddress){
          element['streetAddress']=element.streetAddress.trim();
        }
      });
        this.vAddressData = data;
        this.vAddressStoredData = JSON.parse(JSON.stringify(data));
        this.isNodDataPaneVisible = false;
    } else {
      this.isNodDataPaneVisible = true;
      this.vAddressData = [];
      this.vAddressStoredData = [];
    }
    this.isSaveble = true;
  });
}
onPanelToggle(event, addressPanel, address) {

if (event) {
  addressPanel.title = event.expanded ? address.addressIndex : address.fullAddress;
}
}

onAddressUpdate(address) {

  this.isAddNewAddressVisiable = true;
  this.isGlobalContactVisiable = false;

  setTimeout(ele => {
    this.tempAddressData = address;
    this.addressDetails = JSON.parse(JSON.stringify(this.addAddressValues(address)));
    if(address.addressUsages){
      this.addressDetails.addressType=address.addressUsages;
    }
    this.addressDetailsTemp = JSON.parse(JSON.stringify(this.addressDetails));
  }, 1);
}

addAddressValues(address) {
  const addressTmpDtl = {};
  addressTmpDtl['noFixedAddressFlag'] = address.noFixedAddressFlag === 'Y' ? true : false;
  addressTmpDtl['suite'] = address.suiteNumber;
  addressTmpDtl['streetNumber'] = address.streetNumber;
  addressTmpDtl['street'] = address.street;
  addressTmpDtl['selectedDirection'] = address.streetDirection;
  addressTmpDtl['selectedCity'] = address.cityCode;
  addressTmpDtl['selectedState'] = address.provStateCode;
  addressTmpDtl['postalCode'] = address.zipPostalCode;
  addressTmpDtl['selectedCountry'] = address.countryCode;
  addressTmpDtl['fromDate'] = DateFormat.formatMY(address.startDate);
  addressTmpDtl['toDate'] = DateFormat.formatMY(address.endDate);
  addressTmpDtl['comment'] = address.commentText;
  addressTmpDtl['chkPrimary'] = address.primaryFlag === 'Y' ? true : false;
  addressTmpDtl['chkMail'] = address.mailFlag === 'Y' ? true : false;
  addressTmpDtl['latitude'] = address.latitude;
  addressTmpDtl['addressId'] = address.addressId;
  addressTmpDtl['longitude'] = address.longitude;
  addressTmpDtl['meshBlock'] = address.meshBlock;
  addressTmpDtl['mailCareOf'] = address.mailCareOf;
  addressTmpDtl['chkValidated'] = address.isAddressValid=== 'Y' ? true : false;
  addressTmpDtl['streetAddress'] = address.streetAddress;
  addressTmpDtl['addressType'] = address.addressUsages;
  addressTmpDtl['streetAddressDisable']=false;
    addressTmpDtl['postalCodeDisable']=false;
  if(address.noFixedAddressFlag === 'Y'){
    addressTmpDtl['streetAddressDisable']=true;
    addressTmpDtl['postalCodeDisable']=true;
  }
  if(!address.addressId){
    addressTmpDtl['cityLov']=true;
    addressTmpDtl['stateLov']=true;
  }else{
       if(this.cityMap.get(address.cityCode)!= null&& this.cityMap.get(address.cityCode)!=undefined ){
          addressTmpDtl['cityLov']=true;
    }
       if(this.stateMap.get(address.provStateCode)!= null &&  this.stateMap.get(address.provStateCode)!= ''){
          addressTmpDtl['stateLov']=true;
      }
       
  }
  
  addressTmpDtl['defaultState']=this.defaultState;
  addressTmpDtl['defaultCountry']=this.defaultCountry;
  return addressTmpDtl;
}

PhonesValidation(DataList: any[]) {
  const formattedNumber = PhoneNumberUtils.getFormatType.replace(/[- )(]/g,'');
  const validation =  {validate: true};
  DataList.forEach(ele => {
    if (!ele.format) {
      this.show('ocdaddre.enterphoneformat');
      validation.validate = false;
      return false;
    }
    if (!ele.phoneType) {
      this.show('ocdaddre.enterphonetype');
      validation.validate = false;
      return false;
    }
    if (!ele.phoneNo) {
      this.show('ocdaddre.enterphonenumber');
      validation.validate = false;
      return false;
    }
    const formattedNumber=PhoneNumberUtils.getFormattedNumber(ele.format,ele.phoneNo).replace(/[- )(]/g,'');
    const selectedFormat = PhoneNumberUtils.contactType.find(x => ele.format === x.maskingCode);
    if (!(ele.phoneNo.length === formattedNumber.length) && ele.format != 'UNF' ) {
      if (String(ele.phoneNo).length >= 1 && formattedNumber.length) {
        this.message = this.translateService.translate
            ('common.fieldmustbeform').replace('%format%', selectedFormat.maskFormat);
        this.show(this.message);
        validation.validate = false;
        return false;
      } else if (((String(ele.phoneNo).length > 0 && !formattedNumber))){
          return true;
      }
    }
  });
  for(let i=0;i<this.phoneglobalData.length;i++){
    for(let j=i+1;j<this.phoneglobalData.length;j++){
      if(this.phoneglobalData[i].format===this.phoneglobalData[j].format && this.phoneglobalData[i].phoneNo===this.phoneglobalData[j].phoneNo){
        this.show(this.translateService.translate('ocdaddre.phonenumberduplicate'));
        return false;
      }
    }
  }
  return validation.validate;
}

getFormatedDate(day) {
  var dd = String(day.getDate()).padStart(2, '0');
  var mm = String(day.getMonth() + 1).padStart(2, '0'); 
  var yyyy = day.getFullYear();
  return yyyy+ '-'+ mm + '-'+ dd;
}


  checkAddressValidation(addressDetails, addressBlock) {
    let fromDate = addressDetails.fromDate;
    let streetAddress = addressDetails.streetAddress;
    let city = addressDetails.selectedCity;
    let state = addressDetails.selectedState;
    let postCode = addressDetails.postalCode;
    let country = addressDetails.selectedCountry;
    if (!addressDetails.noFixedAddressFlag && (streetAddress == undefined || streetAddress == null || streetAddress == '')) {
      this.isSaveble = true;
      this.show('ocdaddre.enterstreetaddress');
      return false;
    }
    else if (city == undefined || city == null || city == '') {
      this.isSaveble = true;
      this.show('ocdaddre.entercity');
      return false;
    }
    else if (state == undefined || state == null || state == '') {
      this.isSaveble = true;
      this.show('ocdaddre.enterstate');
      return false;
    }
    else if (!addressDetails.noFixedAddressFlag && (postCode == undefined || postCode == null || postCode == '')) {
      this.isSaveble = true;
      this.show('ocdaddre.enterpostalcode');
      return false;
    }
    else if (country == undefined || country == null || country == '') {
      this.isSaveble = true;
      this.show('ocdaddre.entercountry');
      return false;
    }
    else if (fromDate == undefined || fromDate == null || fromDate == '') {
      this.isSaveble = true;
      this.show('ocdaddre.enterfromdate');
      return false;
    }
    else if (fromDate != null && typeof fromDate == 'object') {
      let newFromDate = this.getFormatedDate(fromDate)
      if (newFromDate > this.getFormatedDate(new Date())) {
        this.isSaveble = true;
        this.show('ocdaddre.fromdatecannotgreaterthancurrentdate');
        return false;
      }
    }
    return true;
  }

onAddressCommit(addressDetails, addressBlock){
  
  if(!this.checkAddressValidation(addressDetails, addressBlock)){
    return;
  }
  
  if(addressDetails.addressId && this.addressDetailsTemp.chkValidated &&!addressDetails.chkValidated){
  const data = {
    label: this.trMsg('ocdaddre.addressvalidornot'), yesBtn: true, noBtn: true
  };
  this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
    if (result) {
      this.onAddressSave(addressDetails, addressBlock);
    } else {
      this.addressDetails = JSON.parse(JSON.stringify(this.addressDetailsTemp));
      return;
    }
  });
}else{
  this.onAddressSave(addressDetails, addressBlock);
}
  /* if(!addressDetails.chkValidated){
    this.show('ocdaddre.selectvalidaddress');
    return;
  } */
}
onAddressSave(addressDetails, addressBlock) {
  /* if(!addressDetails.chkValidated){
    this.show('ocdaddre.selectvalidaddress');
    return;
  } */
 
  if (this.isSaveble) {
    this.isSaveble = false;
  } else {
    return;
  }
  this.addedAddressType = [];
  if (this.addressDetails && this.addressDetails.addressType &&this.addressDetails.addressType.length>0) {
    this.addressDetails.addressType.forEach(element => {
      const chipValue =  {'addressId': addressDetails.addressId, 'addressUsage' : element.code};
      this.addedAddressType.push(chipValue);
    });
  }

  const a = this.addressTypeData;

  if (addressDetails) {
    if (!addressDetails.selectedCity) {
      this.isSaveble = true;
      this.show('ocdaddre.cityvalidation');
      return;
    }
    if (!addressDetails.fromDate) {
      this.isSaveble = true;
      this.show('ocdaddre.formdatevalidation');
      return;
    }
    const contryCode = ['ENG', 'WAL', 'SCOT'];
    if (addressDetails.postalCode && addressDetails.postalCode.length > 8 && contryCode.includes(addressDetails.selectedCountry)) {
      const msg = this.trMsg('ocdoapop.postalcodeformat') + ' ' + addressDetails.selectedCountry + ' ' +
       this.trMsg('ocdoapop.postalcodemorethanchar');
       this.isSaveble = true;
      this.show(msg);
      return;
    }
    if (addressDetails.fromDate && addressDetails.toDate) {
      const fromDate = DateFormat.parseMY(addressDetails.fromDate);
      const toDate = DateFormat.parseMY(addressDetails.toDate);
      if (DateFormat.compareDate(fromDate, toDate) > 0) {
        this.show('common.fromdatevalidation');
        this.isSaveble = true;
        return;
      }
    }
    if (addressDetails.chkPrimary && (!this.tempAddressData.primaryFlag || !this.tempAddressData.addressId) ) {
      const data = {
        label: this.trMsg('common.primaryflag'), yesBtn: true, noBtn: true
      };
      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
        if (result) {
          addressDetails.chkPrimary = true;
          addressBlock.addressDetails.chkPrimary = true;
          this.mailFlagConfirmation(addressDetails, addressBlock);
        } else {
          addressDetails.chkPrimary = false;
          addressBlock.addressDetails.primaryFlag = false;
          this.isSaveble = true;
        }
      });
      return;
    } else {
      this.mailFlagConfirmation(addressDetails, addressBlock);
    }
  }
}

mailFlagConfirmation(addressDetails, addressBlock) {
  if (addressDetails.chkMail && (!this.tempAddressData.mailFlag || !this.tempAddressData.addressId)) {
  const data = {
    label: this.trMsg('common.mailflag'), yesBtn: true, noBtn: true
  };

  this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(mailresult => {
    if (mailresult) {
        addressDetails.chkMail = true;
        addressBlock.addressDetails.chkMail = true;
        this.saveAddressRecord(addressDetails);
    } else {
        addressDetails.chkMail = false;
        addressBlock.addressDetails.chkMail = false;
        this.isSaveble = true;
    }


});
  return;
} else {
  this.saveAddressRecord(addressDetails);
}
}


cancelAddressRecord(addressDetails){
   this.addressDetails = new AddressDetails();
   this.setAddNewAddressVisible(false);
}


saveAddressRecord(addressDetails, isDelete?) {

  if (isDelete && addressDetails.addressId) {
    const addressData = {forDelete : {}};
    this.vAddressData.forEach(ele => {
      if (addressDetails.addressId === ele.addressId) {
        addressData.forDelete = ele;
        return;
      }
    });
    const deleteData = JSON.parse(JSON.stringify(addressData.forDelete));
    if (deleteData && deleteData.phones && deleteData.addressUsages &&
        (deleteData.phones.length > 0 || this.chips.chips.length > 0)) {
          this.isSaveble = true;
        this.show('common.recordnotdeletedinchild');
        return;
    }
    const data = {
      label: this.trMsg('common.youwanttodeleterecord'), yesBtn: true, noBtn: true
    };
    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
      if (result) {
        this.commitAddressRecord (addressDetails, isDelete);
      } else {
        this.isSaveble = true;
      }
    });

  } else {
    this.commitAddressRecord (addressDetails);
  }

}

commitAddressRecord (addressDetails, isDelete?) {
  this.addressUsageCommitBean.insertList = [];
  this.addressUsageCommitBean.updateList = [];
  this.addressUsageCommitBean.deleteList = [];
  this.addrCommitModel.insertList = [];
  this.addrCommitModel.deleteList = [];
  this.addrCommitModel.updateList = [];
  const commitData = new Addresses();
  const addrUsgCommitData = new AddressUsages();
  const addrUsgDeltetData  = [];
  commitData.addressId = addressDetails.addressId ? addressDetails.addressId : null;
  addrUsgCommitData.addressId = commitData.addressId;
  addrUsgDeltetData.push(addrUsgCommitData);
  if(addressDetails.fullValidatedAddress){
    commitData.fullValidatedAddress = JSON.stringify(addressDetails.fullValidatedAddress);
  }
  commitData.ownerClass = 'OFF';
  commitData.ownerId = this.vHeaderBlockModel.rootOffenderId;
  commitData.noFixedAddressFlag = addressDetails.noFixedAddressFlag ? 'Y' : 'N';
  commitData.suiteNumber = addressDetails.suite;
  commitData.streetNumber = addressDetails.streetNumber;
  commitData.street = addressDetails.street;
  commitData.streetDirection = addressDetails.streetDirection;
  commitData.cityCode = addressDetails.selectedCity;
  commitData.provStateCode = addressDetails.selectedState;
  commitData.zipPostalCode = addressDetails.postalCode;
  commitData.countryCode = addressDetails.selectedCountry;
  commitData.startDate = addressDetails.fromDate ? DateFormat.parseMY(addressDetails.fromDate) : null;
  commitData.endDate = addressDetails.toDate ? DateFormat.parseMY(addressDetails.toDate) : null;
  commitData.commentText = addressDetails.comment;
  commitData.primaryFlag = addressDetails.chkPrimary ? 'Y' : 'N';
  commitData.mailFlag = addressDetails.chkMail ? 'Y' : 'N';
  commitData.mailFlag = addressDetails.chkMail ? 'Y' : 'N';
  commitData.latitude = addressDetails.latitude;
  commitData.longitude = addressDetails.longitude;
  commitData.mailCareOf = addressDetails.mailCareOf;
  commitData.meshBlock = addressDetails.meshBlock;
  commitData.isAddressValid = addressDetails.chkValidated ? 'Y' : 'N';
  commitData.streetAddress = addressDetails.streetAddress;
  if (!isDelete) {
  if (commitData.addressId) {
    this.addrCommitModel.updateList.push(commitData);
  } else {
    this.addrCommitModel.insertList.push(commitData);
  }
  } else {
    this.addrCommitModel.deleteList.push(commitData);
  }
  if (this.addrCommitModel.insertList.length === 0)  {
    this.addressUsageCommitBean.deleteList = addrUsgDeltetData;
    this.ocdaddreFactory.addrusageCommit(this.addressUsageCommitBean).subscribe(usageData => {
      if (usageData !== 0) {
        this.ocdaddreFactory.addrCommit(this.addrCommitModel).subscribe(data => {
          if (data !== 0) {
            if (this.addedAddressType && this.addedAddressType.length > 0) {
              this.addressUsageCommitBean.insertList = [];
              this.addressUsageCommitBean.updateList = [];
              this.addressUsageCommitBean.deleteList = [];
              this.addressUsageCommitBean.insertList = this.addedAddressType;
              this.ocdaddreFactory.addrusageCommit(this.addressUsageCommitBean).subscribe(usageAddedData => {
                if (usageAddedData === 1) {
                  this.vAddressAndPhoneExecuteQuery();
                  this.addressDetailsTemp = JSON.parse(JSON.stringify(this.addressDetails));
                  this.show('common.addupdateremoverecordsuccess', 'success');
                  this.setAddNewAddressVisible(false)
                } else {
                  this.show('common.addupdateremoverecordfailed', 'error');
                }
              });
            } 
            else {
              this.vAddressAndPhoneExecuteQuery();
              this.show('common.addupdateremoverecordsuccess', 'success');
              this.addressDetailsTemp = JSON.parse(JSON.stringify(this.addressDetails));
              this.setAddNewAddressVisible(false)
            }
          } else {
            this.show('common.addupdateremoverecordfailed', 'error');
            // this.isAddNewAddressVisiable = false;
          }
          
        });
      } else {
        this.show('common.addupdateremoverecordfailed', 'error');
        this.vAddressAndPhoneExecuteQuery();
      }
    });
  } 
  else {
  this.ocdaddreFactory.addrCommit(this.addrCommitModel).subscribe(data => {
    if (data !=0) {
      if (this.addedAddressType && this.addedAddressType.length > 0) {
        this.addressUsageCommitBean.insertList = [];
        this.addressUsageCommitBean.updateList = [];
        this.addressUsageCommitBean.deleteList = [];
        this.addressUsageCommitBean.insertList = this.addedAddressType;
        this.addressUsageCommitBean.insertList.forEach(obj=>{
          obj.addressId=data;
        })
       // this.addressUsageCommitBean.insertList[0].addressId=data;
        this.ocdaddreFactory.addrusageCommit(this.addressUsageCommitBean).subscribe(usageAddedData => {
          if (usageAddedData === 1) {
            this.vAddressAndPhoneExecuteQuery();
            this.addressDetailsTemp = JSON.parse(JSON.stringify(this.addressDetails));
            this.show('common.addupdateremoverecordsuccess', 'success');
            this.setAddNewAddressVisible(false)
            //this.isAddNewAddressVisiable = true;
          } else {
            this.show('common.addupdateremoverecordfailed', 'error');
          }
        });
      }
      else {
        this.vAddressAndPhoneExecuteQuery();
        this.addressDetailsTemp = JSON.parse(JSON.stringify(this.addressDetails));
        this.setAddNewAddressVisible(false)
        this.show('common.addupdateremoverecordsuccess', 'success');
      }
      // this.show('common.addupdateremoverecordsuccess', 'success');
      // this.isAddNewAddressVisiable = false;
    } else {
      this.show('common.addupdateremoverecordfailed', 'error');
    }
  });
  }
}

/*
Validate Row call back for Email Grid
*/
emailValidation(DataList: any[]) {
  const validation =  {validate: true};
  var r = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  DataList.forEach(ele => {
    if (!ele.internetAddress) {
        this.show('ocdaddre.enteremailaddress');
        validation.validate = false;
        return false;
    }
    if(!r.test(ele.internetAddress)){
      this.show('common.enteremailaddressval');
      return false;     
      }
  });

  for(let i=0;i<this.emailData.length;i++){
    for(let j=i+1;j<this.emailData.length;j++){
      if(this.emailData[i].internetAddress===this.emailData[j].internetAddress){
        this.show(this.translateService.translate('ocdaddre.emailduplicate'));
        return false;
      }
    }
  }
  return validation.validate;
}

/*
  enable / disable Address Specific Number's action buttons
*/
enableAddressSpecficDML(id) {

  // -2 add new add & global contact number
  // -1 active inactive
  // 0 edit

  const disableValues = [0, -1, -2];

  if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.bookingNo) {
    return true;
  }

  if (this.isAddNewAddressVisiable || (!this.activeAddressFlag || !this.inActiveAddressFlag) && id > 0) {
    return disableValues.includes(id) ? true : false;
  }

  if (this.isAddNewAddressVisiable && id === -1 && id !== -2 || (this.vAddressStoredData.length === 0 && id === -1)) {
    return true;
  }

  if (this.addressSpecific && this.addressSpecific._results && this.addressSpecific._results.length) {
      const grids = this.addressSpecific._results;
      const enable = {isEnable : true};
      grids.forEach(grid => {
        if ( grid.addedMap && grid.removedMap && grid.updatedMap) {
            if (grid.addedMap.size > 0 || grid.removedMap.size > 0 || grid.updatedMap.size > 0) {
                enable.isEnable =  String(id) === String(grid.id);
                if (enable.isEnable) {
                  // grid.enableUpdate = true;
                  // grid.prepareAgColumnDef();
                  return;
                }
            }
        }
      });
      if (disableValues.includes(id)) {
        return disableValues.includes(id) ? !enable.isEnable : enable.isEnable;
      } else {
        return enable.isEnable;
      }

  } 
  else {
    if (!disableValues.includes(id)) {
    return true;
  }

  }
}


/*
  event triggered whenever Offender Address Active Filter changed
*/
activeFlagChange(event) {

  if (this.activeAddressFlag && !this.inActiveAddressFlag) {
  this.vAddressData = this.vAddressStoredData.filter(element => {
    return element.activeFlag === 'Y';
  });
} else if (!this.activeAddressFlag && this.inActiveAddressFlag) {
  this.vAddressData = this.vAddressStoredData.filter(element => {
    return !element.activeFlag;
  });
} else if (this.activeAddressFlag && this.inActiveAddressFlag) {
  this.vAddressData = this.vAddressStoredData;
} else {
  this.vAddressData = [];
}

}
/*
  event triggered whenever Offender Address Inactive Filter changed
*/
inActiveFlagChange(event) {

  if (!this.activeAddressFlag && this.inActiveAddressFlag) {
    this.vAddressData = this.vAddressStoredData.filter(element => {
      return !element.activeFlag;
    });
  } else if (this.activeAddressFlag && !this.inActiveAddressFlag) {
    this.vAddressData = this.vAddressStoredData.filter(element => {
      return element.activeFlag === 'Y';
    });
  }  else if (this.activeAddressFlag && this.inActiveAddressFlag) {
    this.vAddressData = this.vAddressStoredData;
  } else {
    this.vAddressData = [];
  }

}



show(vldmsg, type?) {
  type = type ? type : 'warn';
  vldmsg = this.translateService.translate(vldmsg);
  const msgval = [{ message: vldmsg, type: type }];
  this.msgs = [...msgval];
}
trMsg(msg, astr?) {
  return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
}


setEnableDisable(offndr){
  //console.log(offndr)
  //enableAddressSpecficDML
  if(offndr && offndr.bookingNo){
     this.isAddAdressAllow = true;
     this.isGlobalContactAllow = true;
     this.isFilterByAllow = true;
  }
  else{
    this.isAddAdressAllow = false;
    this.isGlobalContactAllow = false;
    this.isFilterByAllow = false;
  }
}

}
