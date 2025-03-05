import {
    Component, ViewChild, OnInit
    } from '@angular/core';
    import { TranslateService } from '@common/translate/translate.service';
    import { OcdoapopService } from '../service/ocdoapop.service';
    import { Addresses } from '@instdemographicsbeans/Addresses';
    import { AddressCommitBean } from '@instdemographicsbeans/AddressCommitBean';
    import { DialogComponent } from '@ui-components/dialog/dialog.component';
    import { LaunchbuttonComponent } from '@ui-components/launchbutton/launchbutton.component';
    import { AddressDetails } from '@ui-components/address-block/address-block.detail';
    import { DialogService } from '@ui-components/dialog/dialog.service';
    import { DateFormat } from '@ui-components/datepicker/dateFormat';
    import { Phones } from '@instdemographicsbeans/Phones';
import { OcdaddreService } from '../service/ocdaddre.service';
    
    // import required bean declarations
    
    @Component({
    selector: 'app-ocdoapop',
    templateUrl: './ocdoapop.component.html',
    styleUrls: []
    })
    
    export class OcdoapopComponent implements OnInit {
    // Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('lnchbtn') box: LaunchbuttonComponent;
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    addressData: Addresses[] = [];
    addressDataTemp: Addresses[] = [];
    // TODO angular.copy(this.addressData, thisaddressDataTemp);
    addressModel: Addresses = new Addresses();
    addressModelTemp: Addresses = new Addresses();
    addressIndex = 0;
    addressInsertList: Addresses[] = [];
    addressUpdatetList: Addresses[] = [];
    addressDeleteList: Addresses[] = [];
    addressCommitModel: AddressCommitBean = new AddressCommitBean;
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    internetAddrColumnDef: any[];
    phonesColumnDef: any[];
    phonesReadOnly = false;
    internetAddrReadOnly = false;
    ctrlReadOnly = false;
    addressReadOnly = false;
    rgcityRg: any[] = [];
    rgcountyRg: any[] = [];
    rgcountryRg: any[] = [];
    rgtypeRg: any[] = [];
    rgspecialneedsRg: any[] = [];
    rgprovstatecodeRg: any[] = [];
    rgstreetdirRg: any[] = [];
    nfa: boolean;
    primary: boolean;
    mail: boolean;
    data: any;
    disNfa = false;
    addressDetails: AddressDetails = new AddressDetails();
    addressDetailsTemp: AddressDetails = new AddressDetails();
    startDate: any;
    endDate: any;
    addrDataTemp: Addresses[] = [];
    insertFlag: boolean;
    msgs = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    phonesModel: Phones = new Phones();
    addressIdVal: any;
    addresTypeDisabled = false;
    screenTitle = '';
    cityMap: Map<string, string> = new Map<string, string>();
  stateMap: Map<string, string> = new Map<string, string>();
        defaultCountry: any;
        defaultState: any;
    constructor(private ocdoapopFactory: OcdoapopService, public translateService: TranslateService, 
        public dialogService: DialogService,
        private ocdaddreFactory: OcdaddreService,) {
    // TODO initilize data members here..!
    this.internetAddrColumnDef = [];
    this.phonesColumnDef = [];
    const state = this.ocdoapopFactory.rgStateRecordGroup();
    state.subscribe(data => {
      data.forEach(obj => {
        if (obj.listSeq === 1) {
            this.defaultState = obj.code;
          }
        this.stateMap.set(obj.code, obj.description);
      });

    });
    const city = this.ocdoapopFactory.rgTownRecordGroup();
    city.subscribe(data => {
      data.forEach(obj => {
        this.cityMap.set(obj.code, obj.description);
       
      });

    });
    
  
    }


    getStateDetails(action){
        const state = this.ocdoapopFactory.rgStateRecordGroup();
        state.subscribe(data => {
          data.forEach(obj => {
            if (obj.listSeq === 1) {
                this.defaultState = obj.code;
              }
            this.stateMap.set(obj.code, obj.description);
          });
    this.getCountryDetails(action);
        });
    }
    getCountryDetails(action){
        const country = this.ocdoapopFactory.rgCountryRecordGroup1();
        country.subscribe(data => {
          data.forEach(obj => {
            if (obj.listSeq === 1) {
              this.defaultCountry = obj.code;
            }
          });
          if(action=='NEW' && this.data.address.length <= 0){
            this.onButAddclick();
          }else if(action == 'UPDATE'){
            this.addressExecuteQuery();
          }
        });
     }

        ngOnInit() {
            this.insertFlag = false;
            this.data = this.dialog.data;
            
            if (this.data.addressId) {
                this.screenTitle = this.translateService.translate('ocdedemp.updateaddress');
                this.getStateDetails('UPDATE');
            } 
            else if (!this.data.address) {
                this.addressDetails = new AddressDetails();
                this.getStateDetails('NEW');
            } 
            else {
                if (this.data.address.length <= 0) {
                    this.addressDetails.noFixedAddressFlag = false;
                    this.getStateDetails('NEW');
                } else {
                    if (this.data.address.noFixedAddressFlag === undefined) {
                        if (this.data.address.streetInformation === 'No fixed address') {
                            this.addressDetails.noFixedAddressFlag = true;
                            this.addresTypeDisabled = true;
                        } else {
                            this.addressDetails.noFixedAddressFlag = false;
                            this.addresTypeDisabled = false;
                        }
                    } else {
                        this.addressDetails.noFixedAddressFlag = this.data.address.noFixedAddressFlag;
                    }
                    this.screenTitle = this.translateService.translate('ocdedemp.updateaddress');
                    this.getStateDetails('UPDATE');
                }
            }
        }


    onGridReady(event) {
    }


    allowNumbers(event) {
    }


    getFormatedDate(day) {
        var dd = String(day.getDate()).padStart(2, '0');
        var mm = String(day.getMonth() + 1).padStart(2, '0'); 
        var yyyy = day.getFullYear();
        return yyyy+ '-'+ mm + '-'+ dd;
    }

        checkAddressValidation(addressDetails) {
            let fromDate = addressDetails.fromDate;
            let streetAddress = addressDetails.streetAddress;
            let city = addressDetails.selectedCity;
            let state = addressDetails.selectedState;
            let postCode = addressDetails.postalCode;
            let country = addressDetails.selectedCountry;
            if (!addressDetails.noFixedAddressFlag && (streetAddress == undefined || streetAddress == null || streetAddress == '')) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdaddre.enterstreetaddress');
                this.show();
                return false;
            }
            else if (city == undefined || city == null || city == '') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdaddre.entercity');
                this.show();
                return false;
            }
            else if (state == undefined || state == null || state == '') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdaddre.enterstate');
                this.show();
                return false;
            }
            else if (!addressDetails.noFixedAddressFlag&& (postCode == undefined || postCode == null || postCode == '')) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdaddre.enterpostalcode');
                this.show();
                return false;
            }
            else if (country == undefined || country == null || country == '') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdaddre.entercountry');
                this.show();
                return false;
            }
            else if (fromDate == undefined || fromDate == null || fromDate == '') {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdaddre.enterfromdate');
                this.show();
                return false;
            }
            else if (fromDate != null && typeof fromDate == 'object') {
                let newFromDate = this.getFormatedDate(fromDate)
                if (newFromDate > this.getFormatedDate(new Date())) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdaddre.fromdatecannotgreaterthancurrentdate');
                    this.show();
                    return false;
                }
            }
            return true;
        }

checkValidatedFlag(){
    if(this.addressDetails.addressId &&  this.addressDetailsTemp.chkValidated &&!this.addressDetails.chkValidated){
        const data = {
          label: this.translateService.translate('ocdaddre.addressvalidornot'), yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
          if (result) {
            this.onButSaveclick();
          } else {
            this.addressExecuteQuery();
            return false;
          }
        });
      }else{
        this.onButSaveclick();
      }
     
}
onAddressSave(){
    if(!this.checkAddressValidation(this.addressDetails)){
        return;
    }
   this.checkValidatedFlag();
}
    onButSaveclick() {
    /* if ((this.addressDetails.street || this.addressDetails.suite || this.addressDetails.selectedDirection
    || this.addressDetails.streetNumber) && this.addressDetails.noFixedAddressFlag === true) {
    this.type = 'warn';
    this.message = this.translateService.translate('ocdoapop.nfavalidation');
    this.show();
    return;
    } */
    if(this.addressDetails.comment && this.addressDetails.comment.length>240){
    this.type = 'warn';
    this.message = this.translateService.translate('ocdoapop.commentLimitexceed');
    this.show();
    return; 
    }
    if (!this.addressDetails.selectedCity) {
    this.type = 'warn';
    this.message = this.translateService.translate('common.cityvalidation');
    this.show();
    return;
    }
    if (!this.addressDetails.fromDate) {
    this.type = 'warn';
    this.message = this.translateService.translate('common.formdatevalidation');
    this.show();
    return;
    }
    if (this.addressDetails.toDate) {
    this.addressModel.startDate = DateFormat.parseMY(this.addressDetails.fromDate);
    this.addressModel.endDate = DateFormat.parseMY(this.addressDetails.toDate);
    if ( (DateFormat.compareDate(this.addressModel.startDate, this.addressModel.endDate)) === 1) {
    this.type = 'warn';
    this.message = this.translateService.translate('common.toDateValidation');
    this.show();
    return;
    }
    if ((DateFormat.compareDate(this.addressModel.startDate, this.addressModel.endDate)) === 1) {
    this.type = 'warn';
    this.message = this.translateService.translate('common.fromdatevalidation');
    this.show();
    return;
    }
    }
    if (this.addressDetails.postalCode) {
    if ((this.addressDetails.postalCode.length > 8 ) && (this.addressDetails.selectedCountry === 'ENG' ||
    this.addressDetails.selectedCountry === 'WAL' || this.addressDetails.selectedCountry === 'SCOT')) {
    this.type = 'warn';
    this.message = this.translateService.translate('ocdoapop.postalcodeformat') + ' ' + this.addressDetails.selectedCountry
    + ' ' + this.translateService.translate('ocdoapop.postalcodemorethanchar');
    this.show();
    return;
    }
    }
    if (this.addressDetails.chkPrimary && this.addressDetails.chkMail ) {
    const data = {
    label: this.translateService.translate( 'common.primaryflag' ), yesBtn: true, noBtn: true
    };
    this.dialogService.openLinkDialog( '/ocucoffeconfirmbox', data, 60 ).subscribe( result => {
    if ( result ) {
    this.addressDetails.chkPrimary = true;
    } else {
    this.addressDetails.chkPrimary = false;
    }
    const data = {
    label: this.translateService.translate( 'common.mailflag' ), yesBtn: true, noBtn: true
    };
    this.dialogService.openLinkDialog( '/ocucoffeconfirmbox', data, 60 ).subscribe( chkMailResult => {
    if ( chkMailResult ) {
    this.addressDetails.chkMail = true;
    } else {
    this.addressDetails.chkMail = false;
    }
    this.ocdoapopSaveaddressForm(null, !(this.addressDetails.chkPrimary && this.addressDetails.chkMail));
    } );
    } );
    } else if ( this.addressDetails.chkPrimary ) {
    const data = {
    label: this.translateService.translate( 'common.primaryflag' ), yesBtn: true, noBtn: true
    };
    this.dialogService.openLinkDialog( '/ocucoffeconfirmbox', data, 60 ).subscribe(chkPrimaryResult => {
    if ( chkPrimaryResult ) {
    this.addressDetails.chkPrimary = true;
    } else {
    this.addressDetails.chkPrimary = false;
    }
    this.ocdoapopSaveaddressForm(null, !this.addressDetails.chkPrimary);
    } );
    } else if ( this.addressDetails.chkMail ) {
    const data = {
    label: this.translateService.translate( 'common.mailflag' ), yesBtn: true, noBtn: true
    };
    this.dialogService.openLinkDialog( '/ocucoffeconfirmbox', data, 60 ).subscribe( MailResult => {
    if ( MailResult ) {
    this.addressDetails.chkMail = true;
    } else {
    this.addressDetails.chkMail = false;
    }
    this.ocdoapopSaveaddressForm(null, !this.addressDetails.chkMail);
    } );
    } else {
    this.ocdoapopSaveaddressForm();
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


        onButExitclick() {
            this.dialog.close(null);
            if (this.addressData.length === 0) {
                // this.type = 'info';
                // this.message = this.translateService.translate('common.querycausednorecords');
                // this.show();
            }
        }


    /**
    * This function will be executed when Add New button event is
    * fired
    */
    onButAddclick() {
    this.screenTitle = this.translateService.translate('ocdedemp.addaddress');   
    this.addressDetails = new AddressDetails();
    this.addressDetails.selectedCountry =this.defaultCountry;
    this.addressDetails.selectedState =this.defaultState;
    this.addressDetails.defaultCountry=this.defaultCountry;
    this.addressDetails.defaultState=this.defaultState;
    this.addressDetails.fromDate = DateFormat.formatMY(DateFormat.getDate());
    this.addressDetails.chkPrimary = true;
    this.addressDetails.stateLov = true;
    this.addressDetails.cityLov = true;
    this.addressModel = new Addresses();
    this.addressModel.countryCode = this.defaultCountry;
    this.addressModel.startDate = DateFormat.getDate();
    this.addressModel.primaryFlag = 'true';
    this.addressModelTemp = new Addresses();
    }
    /**
    * This function will be executed when Remove event is
    * fired
    */
    onButRemoveClick() {
    const data = {
    label: this.translateService.translate( 'common.youwanttodeleterecord' ), yesBtn: true, noBtn: true
    };
    this.dialogService.openLinkDialog( '/ocucoffeconfirmbox', data, 30 ).subscribe( deleteResult => {
    if ( deleteResult ) {
    this.phonesModel = new Phones();
    this.phonesModel.ownerId = this.addressModel.addressId;
    const phoneList = this.ocdoapopFactory.
    addressKeyDelrec(this.phonesModel);
    phoneList.subscribe(phonessResultList => {
    if (phonessResultList.length > 0) {
    this.type = 'warn';
    this.message = this.translateService.translate('ocdoapop.deletereleatedphonenumbers');
    this.show();
    } else {
    this.ocdoapopSaveaddressForm(true);
    }
    });
    }
    } );
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    /**
    * This function will be executed to retrieve data
    * fired
    */
    addressExecuteQuery() {
    this.addressModelTemp = new Addresses();
    // this.addressModel.addressId = this.data.address.addressId;
    if( this.data.addressId ){
    this.addressModel.addressId = this.data.addressId;
    this.addressModel.ownerId = this.data.personId;
    } else {
    if (this.data.class === 'AGY') {
    this.addressModel.ownerCode = this.data.address.agyLocId;
    this.addressModel.ownerId = undefined;
    } else if (this.data.class === 'PER') {
    this.addressModel.ownerCode = undefined;
    this.addressModel.ownerId = this.data.person.personId;
    } else if (this.data.class === 'STF') {
        if(this.data.address && this.data.address.addressId){
            this.addressModel.addressId = this.data.address.addressId;
        }
        if(this.data.staff && this.data.staff.staffId){
            this.addressModel.ownerId = this.data.staff.staffId;
        }
        
        } else if (!this.insertFlag) {
    this.addressModel.ownerId = this.data.address.offenderBookId;
    }
    }
    const addressResult = this.ocdoapopFactory.
    addressExecuteQuery(this.addressModel);
    addressResult.subscribe(addressResultList => {
    if (addressResultList.length === 0) {
    this.addressData = [];
    this.addressDetails = new AddressDetails();
    this.addressDetails.fromDate = DateFormat.formatMY(DateFormat.getDate());
    this.addressDetails.selectedCountry =this.defaultCountry;
    this.addressDetails.defaultCountry=this.defaultCountry;
    this.addressDetails.defaultState=this.defaultState;
    this.addressDetails.selectedState =this.defaultState;
    this.addressDetails.chkPrimary = true;
    this.addressModelTemp = new Addresses();
    this.addressModel = new Addresses();
    } else {
    this.addressData = addressResultList;
    for ( let i = 0; i < addressResultList.length; i++ ) {
    if (!this.insertFlag) {
    if(this.data.address){
    if ( addressResultList[i].addressId === this.data.address.addressId ) {
    this.addressModel = addressResultList[i];
    this.addressModelTemp = this.addressModel;
    }
    } else {
    if ( addressResultList[i].addressId === this.data.addressId ) {
    this.addressModel = addressResultList[i];
    this.addressModelTemp = this.addressModel;
    }
    }
    } else if ( addressResultList[i].addressId === this.addressModel.addressId ) {
    this.addressModel = new Addresses();
    this.addressModel = addressResultList[i];
    
    this.addressModelTemp = this.addressModel;
    }
    }
    if (this.addressModelTemp.addressId) {
        this.addressDetails.addressId=this.addressModelTemp.addressId
     this.addressDetails.addrType = this.addressModel.addressType;
    this.addressDetails.streetAddress = this.addressModel.streetAddress;
    this.addressDetails.mailCareOf = this.addressModel.mailCareOf;
    this.addressDetails.latitude = this.addressModel.latitude;
    this.addressDetails.longitude = this.addressModel.longitude;
    this.addressDetails.meshBlock = this.addressModel.meshBlock;
    this.addressDetails.chkValidated = this.addressModel.isAddressValid === 'Y' ? true : false;

    this.addressDetails.suite = this.addressModel.suiteNumber;
    this.addressDetails.streetNumber = this.addressModel.streetNumber;
    this.addressDetails.street = this.addressModel.street;
    this.addressDetails.streetDirection = this.addressModel.streetDirection;
    this.addressDetails.selectedCity = this.addressModel.cityCode;
    this.addressDetails.selectedCountry = this.addressModel.countryCode;
    this.addressDetails.defaultCountry=this.defaultCountry;
    this.addressDetails.defaultState=this.defaultState;
    this.addressDetails.selectedState = this.addressModel.provStateCode;
    this.addressDetails.fromDate = DateFormat.formatMY(this.addressModel.startDate);
    if (this.addressModel.endDate) {
    this.addressDetails.toDate = DateFormat.formatMY(this.addressModel.endDate);
    this.addressDetails.endDate = DateFormat.getDate(this.addressModel.endDate);
    } else {
    this.addressDetails.toDate = undefined;
    }
    this.addressDetails.comment = this.addressModel.commentText;
    this.addressDetails.postalCode = this.addressModel.zipPostalCode;
    this.addressDetails.chkPrimary = (this.addressModel.primaryFlag === 'Y') ? true : false;
    this.addressDetails.chkMail = (this.addressModel.mailFlag === 'Y') ? true : false;
    this.addressDetails.noFixedAddressFlag = (this.addressModel.noFixedAddressFlag === 'Y') ? true : false;
    this.addressDetails.chkService = (this.addressModel.servicesFlag === 'Y') ? true : false;
    this.addressDetails.cityLov=false;
    this.addressDetails.stateLov=false;
    this.addressDetails.streetAddressDisable=false;
    this.addressDetails.postalCodeDisable=false;
    if(this.addressDetails.noFixedAddressFlag){
        this.addressDetails.streetAddressDisable=true;
        this.addressDetails.postalCodeDisable=true;
    }

    if(this.addressModel.addressId){
        if(this.cityMap.get(this.addressModel.cityCode)!= null&& this.cityMap.get(this.addressModel.cityCode)!=undefined ){
            this.addressDetails.cityLov=true;
        }
        if(this.stateMap.get(this.addressModel.provStateCode)!= null &&  this.stateMap.get(this.addressModel.provStateCode)!= ''){
         this.addressDetails.stateLov=true;
        }
   }
   this.addressDetailsTemp = JSON.parse(JSON.stringify(this.addressDetails))
    } else {
    this.addressModel = new Addresses();
    this.addressDetails = new AddressDetails();
    this.addressDetailsTemp = new AddressDetails();
    this.addressDetails.fromDate = DateFormat.formatMY(DateFormat.getDate());
    this.addressDetails.selectedCountry =this.defaultCountry;
    this.addressDetails.defaultCountry=this.defaultCountry;
    this.addressDetails.defaultState=this.defaultState;
    this.addressDetails.selectedState =this.defaultState;
    this.addressDetails.chkPrimary = true;
    }
    
    }
    });
    }
    /**
    * This function will be executed when commit event is
    * fired
    */
    ocdoapopSaveaddressForm(event?, showSaveMsg?) {
    this.addressIdVal = undefined;
    try {
    this.addressInsertList = [];
    this.addressUpdatetList = [];
    this.addressDeleteList = [];
    if (!this.addressModel.addressId) {
    this.addressModel = new Addresses();
    }
    if(this.addressDetails.fullValidatedAddress){
        this.addressModel.fullValidatedAddress = JSON.stringify(this.addressDetails.fullValidatedAddress);
      }
    this.addressModel.streetAddress = this.addressDetails.streetAddress;
    this.addressModel.latitude = this.addressDetails.latitude;
    this.addressModel.longitude = this.addressDetails.longitude;
    this.addressModel.meshBlock = this.addressDetails.meshBlock;
    this.addressModel.isAddressValid  = this.addressDetails.chkValidated ? 'Y' : 'N';
    this.addressModel.mailCareOf = this.addressDetails.mailCareOf;

    this.addressModel.suiteNumber = this.addressDetails.suite;
    this.addressModel.streetNumber = this.addressDetails.streetNumber;
    this.addressModel.street = this.addressDetails.street;
    this.addressModel.streetDirection = this.addressDetails.streetDirection;
    this.addressModel.cityCode = this.addressDetails.selectedCity;
    this.addressModel.provStateCode = this.addressDetails.selectedState;
    this.addressModel.zipPostalCode = this.addressDetails.postalCode;
    this.addressModel.countryCode = this.addressDetails.selectedCountry;
    this.addressModel.startDate = DateFormat.parseMY(this.addressDetails.fromDate);
    if ( this.addressDetails.toDate ) {
    this.addressModel.endDate = DateFormat.parseMY( this.addressDetails.toDate );
    } else {
    this.addressModel.endDate = undefined;
    }
    this.addressModel.commentText = this.addressDetails.comment;
    if ( this.addressDetails.chkPrimary ) {
    this.addressModel.primaryFlag = 'Y';
    } else {
    this.addressModel.primaryFlag = 'N';
    }
    if (this.addressDetails.chkMail) {
    this.addressModel.mailFlag = 'Y';
    } else {
    this.addressModel.mailFlag = 'N';
    }
    if (this.addressDetails.noFixedAddressFlag) {
    this.addressModel.noFixedAddressFlag = 'Y';
    } else {
    this.addressModel.noFixedAddressFlag = 'N';
    }
    if (this.addressDetails.chkService) {
    this.addressModel.servicesFlag = 'Y';
    } else {
    this.addressModel.servicesFlag = 'N';
    }
    this.addressModel.mailCareOf = this.addressDetails.mailCareOf;
    this.addressModel.addressType = this.addressDetails.addrType;
    this.addrDataTemp = [];
    for ( let i = 0; i < this.addressData.length; i++ ) {
    if ( ( this.addressModel.primaryFlag === 'Y' || this.addressModel.mailFlag === 'Y' ) &&
    this.addressModel.addressId === this.addressData[i].addressId ) {
    if ( this.addressModel.primaryFlag === 'Y' && this.addressModel.mailFlag === 'Y' ) {
    this.addrDataTemp.push( this.addressModel );
    } else if ( this.addressModel.primaryFlag === 'Y' ) {
    this.addrDataTemp.push( this.addressModel );
    } else if ( this.addressModel.mailFlag === 'Y' ) {
    this.addrDataTemp.push( this.addressModel );
    }
    } else {
    if ( this.addressModel.primaryFlag === 'Y' ) {
    this.addressData[i].primaryFlag = 'N';
    }
    if ( this.addressModel.mailFlag === 'Y' ) {
    this.addressData[i].mailFlag = 'N';
    }
    this.addrDataTemp.push( this.addressData[i] );
    }
    }
    
    this.addressUpdatetList = this.addrDataTemp;
    if (!this.addressModel.addressId) {
    this.addressModel.ownerClass = this.data.class;
    if (this.data.education) {
    this.addressModel.ownerId = this.data.education.offenderBookId;
    this.addressModel.ownerSeq = this.data.education.educationSeq;
    }
    if (this.data.employment) {
    this.addressModel.ownerId = this.data.employment.offenderBookId;
    this.addressModel.ownerSeq = this.data.employment.employSeq;
    }
    if (this.data.person) {
    this.addressModel.ownerId = this.data.person.personId;
    }
    if (this.data.agency) {
    this.addressModel.ownerCode = this.data.agency.agyLocId;
    }
    if (this.data.staff) {
    this.addressModel.ownerId = this.data.staff.staffId;
    }
    this.addressInsertList.push(this.addressModel);
    } else {
    this.addressIdVal = this.addressModel.addressId;
    }
    this.addressCommitModel.insertList = [];
    this.addressCommitModel.updateList = [];
    this.addressCommitModel.deleteList = [];
    if (event) {
    this.addressDeleteList.push(this.addressModel);
    this.addressCommitModel.deleteList = this.addressDeleteList;
    } else {
    this.addressCommitModel.insertList = this.addressInsertList;
    this.addressCommitModel.updateList = this.addressUpdatetList;
    }
    
    if (this.addressDeleteList.length > 0) {
    for (let i = 0; i < this.addressDeleteList.length; i++) {
    }
    }

        const addressSaveData = this.ocdoapopFactory.addressCommit(this.addressCommitModel);
        addressSaveData.subscribe(data => {
            if(data!=null && data.errorMessage && data.errorMessage.includes('crs_acty_addr_fk')){
                this.type = 'warn';
                this.message = this.translateService.translate('ocdoapop.dataexistincourseactivity');
                this.show();
            }
            else if(data!=null && data.errorMessage && data.errorMessage.includes('off_ml_logs_addr_fk1')){
                this.type = 'warn';
                this.message = this.translateService.translate('ocdoapop.dataexistinoffendermail');
                this.show();
            }
           else if (data!=null && data.addressId !== 0) {
                if (this.addressIdVal) {
                    this.addressModel.addressId = this.addressIdVal;
                } else {
                    this.addressModel.addressId = data.addressId;
                }
                /**
                * if the record is inserted insertedFlag is true using this flag
                * we have to retrive the insert/update record data based on addressId.
                */
                this.insertFlag = true;
                this.addressExecuteQuery();
                this.type = 'success';
                
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                if (!showSaveMsg) {
                    this.show();
                }
                this.onButExitclick();
            }
            else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                if (!showSaveMsg) {
                    this.show();
                }
            }
        });
    
    } catch (e) {
    
    }
    }



        valueChange() {
            if (this.addressModel.suiteNumber || this.addressModel.streetNumber
                || this.addressModel.street || this.addressModel.streetDirection) {
                this.disNfa = true;

            } else {
                this.disNfa = false;
            }
        }
    
        changeAddressType($event) {
            if ($event) {
                this.addresTypeDisabled = true;
            } else {
                this.addresTypeDisabled = false;
            }
        }


    }