import { Component, OnInit, Injectable, Input } from '@angular/core';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderPhysicalAttributes } from '@commonbeans/OffenderPhysicalAttributes';
import { TranslateService } from '@common/translate/translate.service';
import { OidpidenService } from '@inst/demographics-biometrics/service/oidpiden.service';
import { OcdaddreService } from '@inst/demographics-biometrics/service/ocdaddre.service';
import { VAddresses } from '@instdemographicsbeans/VAddresses';
import { Addresses } from '@instdemographicsbeans/Addresses';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component( {
    templateUrl: './personal.component.html',
    providers: [],
    selector: 'personalComponent'
} )
@Injectable({providedIn: 'root'})
export class PersonalComponent implements OnInit {
    
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offenderModify: string;
    offenderCreate: string;
    //Personal Information Variable
    offenderAddress = "";
    offenderEthinicity = "";
    offenderHeight = "";
    offenderWeight = "";
    disabledBooking: Boolean = true;
    offpaModel: OffenderPhysicalAttributes = new OffenderPhysicalAttributes();
    vaddData: VAddresses[] = [];
    dateFormat = DateFormat.dateFormat; //TODO - DateFormat.dateFormat is returning wrong date format;
    link="/OIDPIDEN";
    link2="/OCDADDRE";
    address="";
    
    constructor( private oidpidenFactory: OidpidenService, private ocdaddreFactory: OcdaddreService, public translateService: TranslateService) {
    }
    ngOnInit() {}
    
    ocdaddreVaddExecuteQuery(rootOffenderId) {
        let vADDModel = new Addresses();
        vADDModel.ownerId = rootOffenderId;
        const serviceObj = this.ocdaddreFactory.vAddExecuteQuery( vADDModel );
        serviceObj.subscribe( data => {
            if (data.length === 0) {
                this.vaddData = [];
            }
            for ( let i = 0; i < data.length; i++ ) {
                data[i].primaryFlag = data[i].primaryFlag === 'Y' ? true : false;
                data[i].mailFlag = data[i].mailFlag === 'Y' ? true : false;
                data[i].activeFlag = data[i].activeFlag === 'Y' ? true : false;
                
            }
            this.vaddData = data;

        } );

    }
    
    addSeperator(obj) {
        if(obj!=null && obj != "Undefined" && obj !="") {
            if(this.address!=""){
                this.address=this.address+", "+obj;
            }else{
                this.address=obj;
            }
        } 
        return this.address;
    }
    
     



    /**
    * This function loads the primary address for an offender
    */
    populateAddressDetails(offenderId) {
        let vADDModel = new Addresses();
        vADDModel.ownerId = offenderId;
        
        const serviceObj = this.ocdaddreFactory.vAddExecuteQuery(vADDModel);
        serviceObj.subscribe(list1 => {
            if (list1.length === 0) {
                this.vaddData = [];
                this.address='';
            } else {
                this.vaddData = list1;
                for (let i = 0; i < list1.length; i++) {
                    //check if primary address exists
                    if(list1[i].primaryFlag === 'Y'){
                        //check if there is  No fixed address
                        this.address='';
                        if(list1[i].house === 'No fixed address' || list1[i].streetInformation === 'No fixed address'){
                            this.address='No Fixed Address';
                            this.offenderAddress = this.addSeperator(list1[i].cityName)+this.addSeperator(list1[i].provStateDesc)+this.addSeperator(list1[i].countryDesc)+this.addSeperator(list1[i].zipPostalCode);
                        }else{
                            this.offenderAddress = this.addSeperator(list1[i].suiteNumber)+this.addSeperator(list1[i].streetAddress)+this.addSeperator(list1[i].cityName)+this.addSeperator(list1[i].provStateDesc)+this.addSeperator(list1[i].countryDesc)+this.addSeperator(list1[i].zipPostalCode);
                        }
                        break;
                    } else{
                        this.address = 'None';   
                    }
                }
            }
        });
    }
    

    
    ngOnDestroy() {

    }
    @Input()
    set selectedOffender(v:any) {
        if (v !== undefined && v !== this.vHeaderBlockModel) {
            this.vHeaderBlockModel = v;
            this.offenderAddress = "";
            this.offenderEthinicity = this.vHeaderBlockModel.ethnicity;
            this.offenderHeight = "";
            this.offenderWeight = "";
            this.oidpidenpaExecuteQuery();
            this.populateAddressDetails(this.vHeaderBlockModel.rootOffenderId);
        }
    }
    oidpidenpaExecuteQuery() {
        this.offpaModel = new OffenderPhysicalAttributes();
        if(this.vHeaderBlockModel.offenderBookId) {
            this.offpaModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            if ( this.vHeaderBlockModel.offenderBookId != null ) {
                     const offpaResult = this.oidpidenFactory.offPaExecuteQuery(this.offpaModel);
                         offpaResult.subscribe(offpaResultList => {
                        if (offpaResultList.length === 0) {
                            //this.offpaData = [];
                        } else {
                            this.offpaModel = offpaResultList[0];
                            if(offpaResultList[0].heightFt !== null && offpaResultList[0].heightIn !== null){
                                this.offenderHeight = offpaResultList[0].heightFt+'\''+ offpaResultList[0].heightIn+'\"'+ '/'+ offpaResultList[0].heightCm+ 'cm';
                            }else{
                                this.offenderHeight = '';
                            }
                            if(offpaResultList[0].weightLbs !== null && offpaResultList[0].weightKg!=null) {
                                this.offenderWeight = offpaResultList[0].weightLbs+'lbs'+ '/'+ offpaResultList[0].weightKg+ 'kg';
                            } else {
                                this.offenderWeight = '';
                            }
                            // const datePipe = new DatePipe('en-US');
                            this.offenderCreate = DateFormat.format(offpaResultList[0].createDatetime);
                            this.offenderModify = DateFormat.format(offpaResultList[0].modifyDatetime);
                        }
                    });
                }
        }
    }
}
