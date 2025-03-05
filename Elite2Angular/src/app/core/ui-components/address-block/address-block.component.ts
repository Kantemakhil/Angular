import {
    Component,
    Input,
    Output,
    forwardRef,
    EventEmitter,
    AfterViewInit,
    OnInit,
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
import { AddressDetails } from "./address-block.detail";
import { TranslateService } from '@common/translate/translate.service';
import { Router } from '@angular/router';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OumsypflService } from '@sa/admin/service/oumsypfl.service';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
enum PostalCodePattern {
    UK = "UK",
    US = "US",
    AU = "AU",
    CDN = "CDN"
}
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressblockComponent ),
    multi: true
};
const noop = () => {
};
@Component( {
    selector: 's4-address-block',
    templateUrl: './address-block.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
} )
export class AddressblockComponent implements OnInit,AfterViewInit,ControlValueAccessor {

    addressDetails: AddressDetails = new AddressDetails();
    isAddOperation: boolean = true; // default add, if not add then it will edit
    isPostalRequired:boolean = true;
    isStreetAddRequired:boolean = true;
    avalableLatitude:boolean = false;
    avalableLongitude:boolean = false;
    avalableMeshblock:boolean = false;
    enableAddressify:boolean = false;
    countryCode = 'AUS';
    allCities = [];
    allStates = []
    //Placeholders displays default text provided below when the field is empty
    @Input() placeholder: string = "";
    // represents readonly 
    @Input() readonly: boolean = false;
    // represents disable of the date
    @Input() disabled: boolean = false;
    // id of the control
    @Input() id: string;
    // required in textbox
    @Input() required: boolean = true;
    
    @Input() enableAddTypeChip: boolean = true;
    @Output() onNFAChange: EventEmitter<any> = new EventEmitter<any>(); 
    //fields property
    disableNFACheckbox:boolean=false;
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: ( _: any ) => void = noop;
    showService = false;
    constructor(public translateService: TranslateService, private router: Router, public oumsysetService: OumsysetService) {
        this.addressDetails = new AddressDetails();
    }
    ngOnInit() {
        this.getAllCities();
        this.getAllStates();
        this.getCountryCode();
        this.getAddressifyInfo();
        if (this.router.url === '/OUMAGENC') {
            this.showService = true;
            }
           
    }

    ngAfterViewInit(): void {}

    getCountryCode(){
        this.oumsysetService.getCountryList('COUNTRY','OCDADDRE').subscribe(cl=>{
         for (let i = 0; i < cl.length; i++) {
            if(cl[i] && cl[i]['description'] && cl[i]['description'].toUpperCase().trim() == 'AUSTRALIA' && cl[i]['canDisplay'] === true){
                this.countryCode = cl[i]['code'];
            }
         }
        })
    }

    getAddressifyInfo() {
        let addPayload = {
            settingProviderCode: "ADDRESSIFY_URL",
            settingType: "AddressConfig"
        };
        this.oumsysetService.loadJsonData(addPayload).subscribe((result) => {
            const rowData = JSON.parse(result.settingValue);
            if (rowData && rowData.length > 0) {
                for (let i = 0; i < rowData.length; i++) {
                    if (rowData[i].KEY_CODE == "ENABLE_ADDRESSIFY" && rowData[i].VALUE == "Y") {
                        this.enableAddressify = true;
                    }
                    else if (rowData[i].KEY_CODE == "ENABLE_LATITUDE" && rowData[i].VALUE == "Y") {
                        this.avalableLatitude = true;
                    }
                    else if (rowData[i].KEY_CODE == "ENABLE_LONGITUDE" && rowData[i].VALUE == "Y") {
                        this.avalableLongitude = true;
                    }
                    else if (rowData[i].KEY_CODE == "ENABLE_MESHBLOCK" && rowData[i].VALUE == "Y") {
                        this.avalableMeshblock = true;
                    }
                }
            }
        });
    }

    // get accessor for ngModel
    get value(): any {
        return this.addressDetails;
    };

    // set accessor including call the onchange callback
    set value( v: any ) {
        if ( v !== this.addressDetails ) {
            this.addressDetails = v;
            this.onChangeCallback( this.addressDetails );
        }
    }
    // From ControlValueAccessor interface
    writeValue( value: any ) {
        if ( value !== this.addressDetails && value != null) {
            setTimeout(() => {
                this.checkOperation();
            }, 2000);
            this.addressDetails = value;
            if(this.addressDetails.cityLov == undefined || this.addressDetails.stateLov == undefined){
                setTimeout(() => {
                    this.textOrLovForCityState();
                }, 3000);
            }
        }
    }

    // From ControlValueAccessor interface
    registerOnChange( fn: any ) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched( fn: any ) {
        this.onTouchedCallback = fn;
    }

    //Validation pattern for postal code on the basis of selected country
    get patternPostal(): string {
        if ( this.addressDetails.selectedCountry == PostalCodePattern.US ) {
            return this.postalCodeMaskUS();
        } else if ( this.addressDetails.selectedCountry == PostalCodePattern.UK ) {
            return this.postalCodeMaskUK();
        } else if ( this.addressDetails.selectedCountry == PostalCodePattern.AU ) {
            return this.postalCodeMaskAUS();
        } else if ( this.addressDetails.selectedCountry == PostalCodePattern.CDN ) {
            return this.postalCodeMaskCDN();
        }
    }

    private postalCodeMaskUK(): any {
        return "^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])([0-9][a-zA-z][a-zA-z]){1}$";
    }
    private postalCodeMaskAUS(): any {
        return "[0-9]{4}";
    }
    private postalCodeMaskUS(): any {
        return "[0-9]{5}";
    }
    private postalCodeMaskCDN(): any {
        return "[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]";
    }
    
    get patternMonthYear(): string {
    	return "[0-9]{2}/[0-9]{4}";
    }
    
   checkValidator(){
    this.addressDetails.chkValidated = false;
    this.addressDetails.cityLov = true;
    this.addressDetails.stateLov=true;
    this.addressDetails.latitude = null;
    this.addressDetails.longitude =  null;
    this.addressDetails.meshBlock = null;
    this.cityStateBinding();
   }

   

    noAddressifyStreetAddressChanged(val){}

    changedPrimaryCheck(v){}

    changedMailCheck(v){}

    onAddAddressType(v){
        if(this.addressDetails.addressType){
            this.addressDetails.addressType.push(v);
        }
        else{
            this.addressDetails["addressType"] = [v]
        }
    }
    
    onRemoveAddressType(v){
        for(let i=0;i<this.addressDetails.addressType.length;i++){
            if(this.addressDetails.addressType[i].code == v.code){
                this.addressDetails.addressType.splice(i, 1);
                return;
            }
        }
    }

    //disabled fields on NFA checked
    changedNfaCheck( nfaChk: boolean ) {
        this.addressDetails.chkValidated = false;
        if ( nfaChk == false ) {
            this.addressDetails.streetAddressDisable=false;
            this.addressDetails.postalCodeDisable=false;
            this.isStreetAddRequired = true;
            this.isPostalRequired = true;
            /* this.addressDetails.stateLov=false;
            this.addressDetails.cityLov=false; */
           // this.onClickOfNFA();
        }else{
            this.isStreetAddRequired = false;
            this.isPostalRequired = false;
            this.addressDetails.streetAddressDisable=true;
            this.addressDetails.postalCodeDisable=true;
            this.addressDetails.stateLov=true;
            this.addressDetails.cityLov=true;
            this.onClickOfNFA();
        }
        this.onNFAChange.emit(nfaChk);
    }


getStreetAddress(value){
    let stAdd = '';
    if(value.Number){
        stAdd += value.Number + ' ';
    }
    if(value.Street){
        stAdd += value.Street + ' ';
    }
    if(value.StreetType){
        stAdd += value.StreetType+ ' ';
    }
    if(value.StreetSuffix){
        stAdd += value.StreetSuffix;
    }
    
    return stAdd;
}

    getAddress(value) {
        if(typeof(value) !== 'object'){
            this.addressDetails.fullValidatedAddress = '';
            this.addressDetails.streetAddress = value;
            this.addressDetails.chkValidated = false;
            this.addressDetails.cityLov = true;
             this.addressDetails.stateLov=true;
            this.addressDetails.latitude = null;
            this.addressDetails.longitude =  null;
            this.addressDetails.meshBlock = null;
            //this.assignBlanK();
            this.cityStateBinding();
            return;
        }
        
        if(value && value.Valid){
            this.addressDetails.fullValidatedAddress = value;
        }
        else{
            this.addressDetails.fullValidatedAddress = '';
        }
        
        this.addressDetails.streetAddress = this.getStreetAddress(value);
        this.addressDetails.suite = value.UnitNumber;
        this.addressDetails.streetNumber = value.Number;
        this.addressDetails.street = value.Street + ' ' + value.StreetType;
        this.addressDetails.selectedDirection = '';
        this.addressDetails.selectedCity = value.Suburb;
        this.addressDetails.selectedState = value.State;
        this.addressDetails.postalCode = value.Postcode;
        this.addressDetails.streetDirection = value.StreetSuffix;
        
        this.addressDetails.selectedCountry = this.countryCode;

        if (this.avalableLatitude) {
            this.addressDetails.latitude = value.Latitude;
        }

        if (this.avalableLongitude) {
            this.addressDetails.longitude = value.Longitude;
        }

        if (this.avalableMeshblock) {
            this.addressDetails.meshBlock = value.Meshblock;
        }

        setTimeout(() => {
            this.textOrLovForCityState()
            this.addressDetails.chkValidated = value.Valid;
        }, 0)
    }


    
    onClickOfNFA(){
        this.addressDetails.streetAddress = "" ;
        this.addressDetails.suite = "" ;
        this.addressDetails.streetNumber = "";
        this.addressDetails.street = "";
        this.addressDetails.selectedDirection =  "";
        this.addressDetails.postalCode = "";
        this.addressDetails.selectedCity = "";
        this.addressDetails.selectedState = this.addressDetails.defaultState;
        this.addressDetails.selectedCountry=this.addressDetails.defaultCountry;
        this.addressDetails.latitude = null;
    this.addressDetails.longitude =  null;
    this.addressDetails.meshBlock = null;
    }
    
    assignBlanK() {
        this.addressDetails.suite = "" ;
        this.addressDetails.streetNumber = "";
        this.addressDetails.street = "";
        this.addressDetails.selectedDirection =  "";
        this.addressDetails.postalCode = "";
        this.addressDetails.selectedCity = ""
        this.addressDetails.selectedState = "" 
    }

    isValidNFA() {
        if(this.addressDetails.suite || this.addressDetails.streetNumber || 
                this.addressDetails.street ||this.addressDetails.selectedDirection) {
            
            this.disableNFACheckbox =true;
        }
        else
            this.disableNFACheckbox =false;
     }

    directionChange(){
        if(!this.addressDetails.noFixedAddressFlag){
            this.isValidNFA();
        }
    }

    changedState(e){
        if(this.addressDetails.chkValidated){
            this.getAddress('')
        } 
    }

    getAllStates(){
        this.oumsysetService.getCountryList('PROV_STATE','OCDADDRE').subscribe(cl=>{
           if(cl && cl.length > 0){
              this.allStates = cl;
           }
        })
    }
    
    getAllCities(){
        this.oumsysetService.getCountryList('CITY','OCDADDRE').subscribe(cl=>{
            if(cl && cl.length > 0){
                this.allCities = cl;
             }
        })
    }

    cityStateBinding(){
        let cityStateArr = this.isCityStateExistinLov();
        let cityExist = cityStateArr[0];
        let stateExist = cityStateArr[1];
        if(cityExist === false){
            this.addressDetails.selectedCity = '';
        }
        if(stateExist === false){
            this.addressDetails.selectedState = '';
        }
    }

    isCityStateExistinLov(){
        let cityExist = false;
        let stateExist = false;
        for(let i=0;i<this.allCities.length;i++){
              if(this.allCities[i] && this.allCities[i]['activeFlag'] == 'Y' && this.allCities[i]['code'] == this.addressDetails.selectedCity){
                cityExist = true;
              } 
        }
        for(let j=0;j<this.allStates.length;j++){
            if(this.allStates[j] && this.allStates[j]['activeFlag'] == 'Y' && this.allStates[j]['code'] == this.addressDetails.selectedState){
                stateExist = true;
              } 
        }
        return [cityExist,stateExist]
    }

    textOrLovForCityState() {
        let cityStateArr = this.isCityStateExistinLov();
        let cityExist = cityStateArr[0];
        let stateExist = cityStateArr[1];
        if (cityExist) {
            this.addressDetails.cityLov = true;
        }
        else {
            this.addressDetails.cityLov = false;
        }
        if (stateExist) {
            this.addressDetails.stateLov = true;
        }
        else {
            this.addressDetails.stateLov = false;
        }
    }

    checkOperation(){
        let data = JSON.parse(JSON.stringify(this.addressDetails))
        if(data && data['addressId'] && data['addressId'] !== ''){
            this.isAddOperation = false;
        }
        else{
            this.isAddOperation = true;
        }
    }

    get serviceFlagDisable() {
        if(this.addressDetails.noFixedAddressFlag) {
        return true;
        }else if (!this.addressDetails.endDate) {
        return false;
        } else if (this.addressDetails.endDate &&
        (DateFormat.compareDate(DateFormat.getDate(this.addressDetails.endDate), DateFormat.getDate()) === 1)) {
        return false;
        }
        return true;
        }

        toDateChange(event){
            if(event == undefined){
                this.addressDetails.toDate=null;
            }
        }
}
