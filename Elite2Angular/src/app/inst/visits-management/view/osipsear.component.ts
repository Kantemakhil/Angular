import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OsipsearService } from '../service/osipsear.service';
import { TagPersonSearchGetPersons } from '@inst/visits-management/beans/TagPersonSearchGetPersons';
import { VPersonAddress } from '@inst/demographics-biometrics/beans/VPersonAddress';
import { PersonIdentifiers } from '@inst/demographics-biometrics/beans/PersonIdentifiers';
import { Persons } from '@inst/demographics-biometrics/beans/Persons';
import { PersonEmployments } from '@inst/demographics-biometrics/beans/PersonEmployments';
import { Images } from '@common/beans/Images';
import { TagPersonSearchGetPartialSoundexPersons } from '@inst/visits-management/beans/TagPersonSearchGetPartialSoundexPersons';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { PersonEmploymentsCommitBean } from '@instdemographicsbeans/PersonEmploymentsCommitBean';
import { PersonIdentifiersCommitBean } from '@inst/demographics-biometrics/beans/PersonIdentifiersCommitBean';
import { PersonsCommitBean } from '@inst/demographics-biometrics/beans/PersonsCommitBean';
import { Router } from '@angular/router';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
import { Addresses } from '@inst/demographics-biometrics/beans/Addresses';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OivctmngService } from '@inst/victimmanagement/service/oivctmng.service';
import { OumsypflService } from '@sa/admin/service/oumsypfl.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { LoaderService } from '@core/loader/loader.service';

@Component({
   selector: 'app-osipsear',
   templateUrl: './osipsear.component.html'
})

export class OsipsearComponent implements OnInit, AfterViewInit {
 @ViewChild('addrGrid') addrGrid: any;
 @ViewChild('idfrGrid') idfrGrid: any;
 @ViewChild('empGrid') empGrid: any;
 @ViewChild('personsave', {static: true}) personsave: any;
 @ViewChild('personGrid', {static: true}) personGrid: any;
  selectedTabIndex: number;
  headerId: string;
  headerTitle: string;
   msgs: any[] = [];
   InnerPersonData: any;
   @Input() isDialog: boolean;
   @Output() addRecord: EventEmitter<any> = new EventEmitter<any>();
   personsData: TagPersonSearchGetPersons[] = [];
   searchparamModel: TagPersonSearchGetPersons = new TagPersonSearchGetPersons();
   searchparamRowDataModel: TagPersonSearchGetPersons = new TagPersonSearchGetPersons();
   peraddrData: any[] = [];
   peraddrModel: VPersonAddress = new VPersonAddress();
   peridentData: any[] = [];
   peridentModel: PersonIdentifiers = new PersonIdentifiers();
   peridentInsertList: PersonIdentifiers[] = [];
   peridentUpdatetList: PersonIdentifiers[] = [];
   peridentDeleteList: PersonIdentifiers[] = [];
   peridentCommitModel: PersonIdentifiersCommitBean = new PersonIdentifiersCommitBean();
   imageData: Images[] = [];
   imageModel: Images = new Images();
   perinfoData: Persons[] = [];
   perinfoModel: Persons = new Persons();
   perInfoBean: Persons = new Persons();
   perinfoCommitModel: PersonsCommitBean = new PersonsCommitBean();
   perempData: any[] = [];
   perempModel: PersonEmployments = new PersonEmployments();
   perempInsertList: PersonEmployments[] = [];
   perempUpdatetList: PersonEmployments[] = [];
   perempDeleteList: PersonEmployments[] = [];
   perempCommitModel: PersonEmploymentsCommitBean = new PersonEmploymentsCommitBean();
   pspersonnameData: TagPersonSearchGetPartialSoundexPersons[] = [];
   perIdentColumnDef: any[];
   perEmpColumnDef: any[];
   personsColumnDef: any[];
   perAddrColumnDef: any[];
   lastSearchType = 'N';
   selectAddr = -1;
   image: any;
   isModifible = false;
   selected : number = -1;
   isCreatable = true;
   isCreateAccess: boolean = true;
   contactModalData = { 'class': 'PER', 'person': undefined, 'address': undefined };
   cameraButton: boolean;
   selectIdentifiers: number;
   selectProf: number;
   identifierGridDelete: boolean;
   ProfGridDelete: boolean;
   message = ' Invalid.';
   selectedFormat: any;
   identificationOption:any =[];
   psGenderOptions:any =[];
   aiGenderOptions:any =[];
   sysPflModelTemp: SystemProfiles = new SystemProfiles();
   pinFlag: boolean = false;
   personsDataTemp: TagPersonSearchGetPersons[] = [];
   pinValue: boolean = false;
   private generatedNumbers: Set<number> = new Set<number>();
   public uniqueRandomNumber: number;
   detailsFlag : boolean = false;
   searchparamModelTemp: TagPersonSearchGetPersons = new TagPersonSearchGetPersons();
   verifyFlag : boolean = true;

   constructor(private osipsearFactory: OsipsearService,
      private translateService: TranslateService,
      public dialogService: DialogService,
      private router: Router, private osiosearchService: OsiosearService , private sessionManager: UserSessionManager,private oivctmngFactory: OivctmngService,
      private oumsypflFactory: OumsypflService,private loaderService: LoaderService) {
      this.perIdentColumnDef = [];
      this.perEmpColumnDef = [];
      this.personsColumnDef = [];
      this.perAddrColumnDef = [];
   }

   ngOnInit() {
      this.systemProfileForPin();
      this.identifierGridDelete = false;
      this.ProfGridDelete = false;
      this.cameraButton = true;
      this.perIdentColumnDef = [
         {
      fieldName: this.trMsg('osiperso.typeofid', '*'), field: 'identifierType', datatype: 'lov',
      domain:'ID_TYPE', codeTitle: 'Identifier', editable: true, width: 150,
         },
     { fieldName: this.trMsg('common.number', '*'), field: 'identifier', datatype: 'text', editable: true, width: 150,
        mask: this.getMask, maxlength: 20 },
         { fieldName: this.trMsg('osiperso.issueauthority'), field: 'issuedAuthorityText', editable: true, uppercase: 'false',
         datatype: 'text', width: 150, maxlength: 40  },
      ];
      this.perEmpColumnDef = [
         { fieldName: this.trMsg('osiperso.employer', '*'), field: 'employerName', datatype: 'text', uppercase: 'false',
           maxlength: 40, editable: true, width: 150 },
         { fieldName: this.trMsg('osiperso.address'), field: 'address', datatype: 'text', uppercase: 'false',
           maxlength: 240, editable: true, width: 150 },
         {
            fieldName: this.translateService.translate('oumagenc.phoneFormat'), field: 'format', editable: true, width: 200,
            datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true
          },
         { fieldName: this.trMsg('osiperso.telephone'), field: 'contactNumber', datatype: 'phone', editable: true, width: 150, 
            formatType: this.selectedFormat, required: true
         },
         { fieldName: this.trMsg('osiperso.ext'), field: 'phoneExt', datatype: 'text', uppercase: 'false', 
           maxlength: 6, editable: true, width: 150 },
         { fieldName: this.trMsg('common.active'), field: 'activeFlag', datatype: 'checkbox', editable: true, width: 150 },
      ];
      this.personsColumnDef = [
         { fieldName: this.trMsg('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
         { fieldName: this.trMsg('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
         { fieldName: this.trMsg('system-profile.name-given-2'), field: 'middleName', editable: false, width: 150 },
         { fieldName: this.trMsg('osipsear.secondmiddlename'), field: 'secondMiddleName', editable: false, width: 150 },
         { fieldName: this.trMsg('system-profile.birth-date'), field: 'birthDate', datatype: 'date', editable: false, width: 150 },
         { fieldName: this.trMsg('osiperso.personid'), field: 'personId', editable: false, width: 150 },
         { fieldName: this.trMsg('osiperso.pin'), field: 'pin', editable: false, width: 150, hide: true },
         { fieldName: this.trMsg('osiperso.fingerprintenrolled'), field: 'enrollFlag', datatype: 'checkbox', editable: false, width: 150 },
         { fieldName: this.trMsg('osipsear.additionalnames'), field: 'addNamesBtn', datatype: 'hyperlink', displayas: 'href', styleClass: 'launch', width: 150, link: '/OSIPSEARIDIALOG', dialogWidth: '70%', modal: true, data: 'row' },
      ];
      this.perAddrColumnDef = [
         {
           fieldName: this.translateService.translate('common.unitnumber'), field: 'suiteNumber',
           editable: false, width: 150
         },
         {
           fieldName: this.translateService.translate('common.streetaddress'), field: 'streetAddress',
           editable: false, width: 150
         },
         {
           fieldName: this.translateService.translate('common.city'), field: 'cityName',
           editable: false, width: 150
         },
         {
           fieldName: this.translateService.translate('common.state'), field: 'provStateDesc',
           editable: false, width: 150
         },
         {
           fieldName: this.translateService.translate('common.postalcode'), field: 'zipPostalCode',
           editable: false, width: 150
         },
         {
           fieldName: this.translateService.translate('common.country'), field: 'country',
           editable: false, width: 150
         },
         {
           fieldName: this.translateService.translate('common.type'), field: 'addressTypeDesc',
           editable: false, width: 150
         },
         {
           fieldName: this.translateService.translate('comp.address.primary'), field: 'primaryFlag',
           datatype: 'checkbox', editable: false, width: 150
         },
         {
           fieldName: this.translateService.translate('comp.address.mail'), field: 'mailFlag',
           datatype: 'checkbox', editable: false, width: 150
         },
         {
           fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
           datatype: 'checkbox', editable: false, width: 150
         },
         {
           fieldName: this.translateService.translate('common.isvalidated'),
           field: 'isAddressValid', datatype: 'checkbox', editable: false, width: 150
         }
       ];


      this.searchparamModel.pSearchType = this.lastSearchType;
      this.headerTitle =  this.isDialog ? '' : this.trMsg('osiperso.screenname');
      this.headerId =  this.isDialog ? '' : this.trMsg('osiperso.screenid');
      this.identifirGroupsLov();
      this.getGenderLov();
   }
   
   getGenderLov(){
	   let userId = this.sessionManager.getId();
	   this.osiosearchService.getGenderLov('SEX',userId,'OSIPSEAR')
	   .subscribe(data =>{ 
		   let AddInfoGender = data;
		   this.aiGenderOptions = AddInfoGender;
		   for (let i = 0; i < data.length; i++) {
			  data[i].canDisplay = true;
			}
			this.psGenderOptions = data;
	   });  
   }
   
   identifirGroupsLov(){
	   this.osiosearchService.identifierTypeRecordGroup()
	   .subscribe(data =>{ 
		   for (let i = 0; i < data.length; i++) {
			  data[i].canDisplay = true;
			}
			this.identificationOption = data;
	   });   
   }
   
   checkCreateOffAccess(){
        if(this.sessionManager && this.sessionManager['innerUserRoles'] && this.sessionManager['innerUserRoles']['roles']){
           let accessObj = this.sessionManager['innerUserRoles']['roles'];
           if(accessObj['OCUCNPER'] == 'full'){
            this.isCreateAccess = false;
           } else {
            this.isCreateAccess = true;
           }
        }
   }
   ngAfterViewInit() {
     if (this.isDialog) {
       const tag = document.getElementById('osipsearpane');
       if (tag) {
         const classList = document.getElementsByClassName('pane-title-no-header');
         if (classList && classList.length > 0) {
           const element = classList.item(0);
           if (element) {
             element['hidden'] = true;
           }
         }
         const child = tag.firstElementChild;
         if (child) {
         child['style']['marginTop'] = '-20px';
         }
       }
     }
  }

   @Input()
   set personData(pData: any) {
      if (this.InnerPersonData !== pData) {
         this.InnerPersonData = pData;
         if (this.personData.pSearchType) {
            this.lastSearchType = this.InnerPersonData.pSearchType;
         }
         this.searchparamModel = this.InnerPersonData;
         if(pData.personId && pData['sealFlag']){
             this.searchparamModel.pSearchType = 'I';
             this.lastSearchType = 'I';
             this.searchparamModel.pPersonId = pData.personId;
            this.osipsearexecuteQuery();
         }
         if (this.searchparamModel.pLastName || this.searchparamModel.pPersonId) {
            this.osipsearexecuteQuery();
         }
      }
   }
   get personData(): any {
      return this.InnerPersonData;
   }
   allowNumbers(event) {
   }
   onButSearchclick() {
      if (this.searchparamModel.pSearchType) {
         if (this.searchparamModel.pSearchType !== this.lastSearchType) {
            const nameType = ['N', 'P', 'S'];
            if (nameType.includes(this.searchparamModel.pSearchType) && !nameType.includes(this.lastSearchType) ||
               !nameType.includes(this.searchparamModel.pSearchType) && nameType.includes(this.lastSearchType)) {
               const searchType = this.searchparamModel.pSearchType;
               this.searchparamModel = new TagPersonSearchGetPersons();
               this.searchparamModel.pSearchType = searchType;

            }
            this.lastSearchType = this.searchparamModel.pSearchType;
         }
      }
   }
   onButPersonProfileclick = () => {
      if (!this.searchparamRowDataModel.personId) {
         this.show('ocdperso.pleaseenterthepersoninformationbeforecallingcreatepersonprofile');
         return;
      }
      return true;
   }
   searchTypeBlur() {
      if (!this.searchparamModel.pSearchType) {
         this.searchparamModel.pSearchType = this.searchparamModel.pSearchType === undefined ? '' : undefined;
      }
   }
   identifierTypeBlur() {
      if (!this.searchparamModel.pIdentifierType) {
         this.searchparamModel.pIdentifierType = this.searchparamModel.pIdentifierType === undefined ? '' : undefined;
      }
   }
   pGenderBlur() {
      if (!this.searchparamModel.pSex) {
         this.searchparamModel.pSex = this.searchparamModel.pSex === undefined ? '' : undefined;
      }
   }
   genderBlur() {
      if (!this.perinfoModel.sex) {
         this.perinfoModel.sex = this.perinfoModel.sex === undefined ? '' : undefined;
      }
   }
   maritalStatusBlur() {
      if (!this.perinfoModel.maritalStatus) {
         this.perinfoModel.maritalStatus = this.perinfoModel.maritalStatus === undefined ? '' : undefined;
      }
   }
   languageCodeBlur() {
      if (!this.perinfoModel.languageCode) {
         this.perinfoModel.languageCode = this.perinfoModel.languageCode === undefined ? '' : undefined;
      }
   }
   pDobBlur() {
      if (!this.searchparamModel.pBirthDate) {
         this.searchparamModel.pBirthDate = this.searchparamModel.pBirthDate === undefined ? null : undefined;
      }
   }
   birthDate() {
      if (!this.perinfoModel.birthdate) {
         this.perinfoModel.birthdate = this.perinfoModel.birthdate === undefined ? null : undefined;
      }
      if (this.perinfoModel.birthdate &&
        DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.birthdate), DateFormat.getDate()) > 0) {
          this.show('Birth Date cannot be later than the current date');
          return;

     }

     if (this.perinfoModel.deceasedDate && this.perinfoModel.birthdate) {
      if (DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.deceasedDate), DateFormat.getDate(this.perinfoModel.birthdate)) < 0) {
        this.show('Deceased date cannot be prior to the Birth Date');
      }
     }
   }
   deceasedDateBlur() {
      if (!this.perinfoModel.deceasedDate) {
         this.perinfoModel.deceasedDate = this.perinfoModel.deceasedDate === undefined ? null : undefined;
      }
      if (this.perinfoModel.deceasedDate &&
        DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.deceasedDate), DateFormat.getDate()) > 0) {
          this.show('Deceased Date cannot be later than the current date');
          return;
     }

     if (this.perinfoModel.deceasedDate && this.perinfoModel.birthdate) {
      if (DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.deceasedDate), DateFormat.getDate(this.perinfoModel.birthdate)) < 0) {
        this.show('Deceased date cannot be prior to the Birth Date');
      }
     }
   }


   // Search Result Row Click
   onRowClickpersons(event) {
      if (event) {
         this.detailsFlag = event.personId ? true : false;
         if(!event.personId && this.verifyFlag){
            this.show(this.translateService.translate('osipsear.pleasecreateanelitepersonrecordtoregisterthisperson'), 'warn');
            this.isCreatable = false;
         } // else{
         //    this.isCreatable = true;
         // }

         // Person Address Execute Query
         this.peraddrExecuteQuery(event);

         // Person Identifier Execute Query
         this.peridentExecuteQuery(event);

         // Person Execute Query
         this.perinfoExecuteQuery(event);

         // Person Employment Execute Query
         this.perempExecuteQuery(event);

         // Image Execute Query
         this.imageExecuteQuery(event);


         this.searchparamRowDataModel = event;
         this.contactModalData.person = event;
         this.contactModalData.address = { ownerId: event.personId };
      }else{
         this.detailsFlag = false;
      }
   }
   onButCreatePersonclick() {
   }
   onButAddToOffenderclick() {
   }

   // address row click
   onRowClickperaddr(event) {

      this.contactModalData.address = event;
   }

   onButAddQueryclick() {
      if(this.peraddrData && this.peraddrData.length > 0 && this.searchparamRowDataModel && this.contactModalData.address){
         this.searchparamRowDataModel.address = this.contactModalData.address;
         //this.searchparamRowDataModel.sex = this.contactModalData.person.sexDescription;
      }
      else{
         this.searchparamRowDataModel.address = new Addresses();
      }
      this.addRecord.emit(this.searchparamRowDataModel);
   }
   onButSpecificNumbersclick() {
   }
   onButGlobalNumbersclick() {
   }
   onRowClickperident(event) {
      if(event && event.createDatetime){
         this.identifierGridDelete = true;
      }else{
         this.identifierGridDelete = false;
      }
   }
   onCameraPcclick() {
   }
   onFingerPrintclick() {
   }
   onButLinkedOffendersclick() {
   }
   onRowClickperemp(event) {
      if(event && event.createDatetime){
         this.ProfGridDelete = true;
      }else{
         this.ProfGridDelete = false;
      }
   }
   onRowClickpspersonname(event) {
   }
   onButDisplayclick() {
   }
   onButCancelclick() {
      if (this.isDialog) {
         this.addRecord.emit(null);
      } else {
         this.router.navigate(['/home']);
      }


   }

   afterPersonCreated(event) {
      if (event) {
        /*  if( this.pinValue && this.isCreatable){
            this.searchparamModel = this.searchparamRowDataModel;
         } */
         if (event.lastName) {
            this.searchparamModel.pLastName = event.lastName;
         }
         if (event.firstName) {
            this.searchparamModel.pFirstName = event.firstName;
         }
         this.ok(event);
      }
   }
   ok(event) {
      if(event === 'Y'){
         this.verifyFlag = true;
      }
      if (this.searchparamModel.pSearchType) {
         const type = ['N', 'P', 'S'];
         if (type.includes(this.searchparamModel.pSearchType)) {
            if (this.searchparamModel.pLastName && this.searchparamModel.pLastName.trim()) {
               if (this.searchparamModel.birthDate && this.searchparamModel.pBirthYear) {
                  // bitrh date or range validation
                  this.show('osiperso.plaseselecteitherbirthdateorbirthyearrange');
                  return;
               }

               if (this.searchparamModel.pBirthYear && (!this.searchparamModel.pBirthRange && this.searchparamModel.pBirthRange !== 0)) {
                  // enter range validation
                  this.show('osiperso.pleaseenterarangevaluebetween0to99');
                  return;
               }
               if (!this.searchparamModel.pBirthYear && this.searchparamModel.pBirthRange) {
                  // enter range validation
                  this.show('osiperso.pleaseenterthevalidyearofbirth');
                  return;
               }
               if (this.searchparamModel.pSearchType === 'N') {
                  // name search execution query
                  this.osipsearexecuteQuery();
               } else {
                  // sondex and partial name execution query
                  this.pspersonnameExecuteQuery();
               }
            } else {
               // last name validation
               this.show('osiperso.surnameparameterisrequiredaspartofsearch');
               return;
            }
         } else {
            if (this.searchparamModel.pSearchType === 'I') {
               if (!this.searchparamModel.pPersonId && !this.searchparamModel.pIdentifierType && !this.searchparamModel.pIdentifierValue) {
                  // identifiers id , type and value validation
                  this.show('osipsear.pleaseenterapersonid');
                  return;
               } else {
                  if (this.searchparamModel.pIdentifierType && !this.searchparamModel.pIdentifierValue) {
                     // identifiers type validation
                     this.show('Please enter an identifier Number');
                     return;
                  }
                  if (!this.searchparamModel.pIdentifierType && this.searchparamModel.pIdentifierValue) {
                     // identifiers value validation
                     this.show('osipsear.pleaseenteranidentifiertype');
                     return;
                  }
                  // name search execution query
                  this.osipsearexecuteQuery();

               }


            }
         }
      } else {
        this.show('osiperso.searchtypemustbeentered');
      }
      this.checkCreateOffAccess();

   }
   no() {
      this.searchparamRowDataModel = new TagPersonSearchGetPersons();
      this.searchparamModel = new TagPersonSearchGetPersons();
      this.lastSearchType = 'N';
      this.searchparamModel.pSearchType = 'N';
      this.personsData = [];
      this.peraddrData = [];
      this.peridentData = [];
      this.image = null;
      this.perinfoModel = new Persons();
      this.perempData = [];
      this.isCreatable = true;
      this.isCreateAccess = true;
      this.detailsFlag = false
   }
   cancel() {

   }
   onOffenderChange(offender) {
   }

   nameReadOnly(event) {
      const eventVal = event ? event : this.lastSearchType;
      if (eventVal === 'I') {
         return true;
      } else {
         return false;
      }
   }
   identifierReadOnly(event) {
      const eventVal = event ? event : this.lastSearchType;
      if (eventVal !== 'I') {
         return true;
      } else {
         return false;
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
   commonAddValidation() {
      if (this.personsData.length > 0) {
         return true;
      } else {
         this.show('osiperso.youcannotcreaterecordswithoutaparentrecord');
         return false;
      }
   }

   onIdentifiersInsert = () => {
      if (!this.commonAddValidation()) {
         return null;
      } else {
         return {};
      }
   }

   addressLaunchClick = () => {
      if (this.personsData && this.personsData.length <= 0) {
         this.show('osiperso.pleaseenterthepersoninformationbeforecalingamoduleocdoapop');
         return false;
      } else {
         return true;
      }
   }

   addressNumberLaunchClick = () => {
      if (this.peraddrData && this.peraddrData.length <= 0) {
         this.show('osiperso.pleaseenterthepersonaddressinfobeforecallingaaddressspecificnumberform');
         return false;
      } else {
         return true;
      }
   }
   globalNumberLaunchClick = () => {
      if (this.personsData && this.personsData.length <= 0) {
         this.show('osiperso.pleaseselectapersonbeforecallingaglobalnumber');
         return false;
      } else {
         return true;
      }
   }

   onEmployerInsert = () => {
      if (!this.commonAddValidation() || !this.PersonDetailValidation(this.perempData)) {
         return null;
      } else {
         return { 'activeFlag': true };
      }

   }

   PersonDetailValidation(arrData: any[]) {
     const validator = {valid: true};
     arrData.forEach(element => {
      const formattedNumber=PhoneNumberUtils.getFormattedNumber(element.format, element.contactNumber).replace(/[- )(]/g,'');
      const selectedFormat = PhoneNumberUtils.contactType.find(x => element.format === x.maskingCode);
      if (!element.employerName) {
        this.show('Employer must be entered.');
        validator.valid = false;
        return;
      }
      if (!element.format) {
         this.show('common.formatmustbeentered');
         validator.valid = false;
         return;
       }
      if (!(element.contactNumber.length === formattedNumber.length) && element.format != 'UNF' ) {
         if(String(element.contactNumber).length >= 1 && formattedNumber.length) {
            //  this.type = 'warn';
             this.message = this.translateService.translate
             ('common.fieldmustbeform').replace('%format%', selectedFormat.maskFormat);
             this.show(this.message, 'warn');
             validator.valid = false;
             return;
         }  else if (((String(element.contactNumber).length > 0 && !formattedNumber))){
             return true;
         }
       }
     });
    return validator.valid;
   }

   selectedTabChange(event) {
      if (!this.searchparamModel.pSearchType) {
         this.show('osiperso.searchtypemustbeentered');
      }
      setTimeout(() => {
        if (event.index === 0) {
          this.addrGrid.resizeColumns();
        }
        if (event.index === 1) {
          this.idfrGrid.resizeColumns();
                }
        if (event.index === 3) {
          this.empGrid.resizeColumns();
                       }
      }, 1000);
   }


   // execute query
   osipsearexecuteQuery() {
      this.searchparamModel.moduleName = 'OSIPSEAR';
      const correlIdResult = this.osiosearchService.getCorrelationId();
         correlIdResult.subscribe(data => {
            this.searchparamModel.intCorrelationId = data;
            this.osipsearFactory.personsExecuteQuery(this.searchparamModel)
            .subscribe(data => {
               if (data && data.length > 0 && !data[0].errorMessage) {
                  this.personsData = data; 
                  this.personsData.forEach(e=>{
                     e['addNamesBtn'] = '';
                  });
                  this.personsDataTemp = JSON.parse(JSON.stringify(this.personsData));
                  this.isModifible = true;
                  this.selected = 0;
               } else {
                  this.personsData = [];
                  this.isModifible = false;
                  if (!this.pinValue) {
                     this.show('common.querycaused');
                  }
                  this.isCreatable = false;
                  this.peraddrData = [];
                  this.peridentData = [];
                  this.perinfoModel = new Persons();
                  this.image = null;
                  this.perempData = [];
                  this.personsDataTemp = [];
                  //If elite data not found, then it will search into the JIS Common.
                  if (this.pinValue && this.verifyFlag) {
                     const serachDetails = { searchType: this.searchparamModel.pSearchType, pinSequence: this.searchparamModel.intCorrelationId, moduleName: this.searchparamModel.moduleName };
                     this.searchparamModel.intCorrelationId = serachDetails.pinSequence;
                     this.dialogService.openLinkDialog('/JISCOMMONCONFIRMBOX', serachDetails, 40).subscribe(result => {
                        if (result) {
                           //this.grid.prepareAgColumnDef();
                           this.personsData = [];
                           result.forEach(e => {
                              if (this.searchparamModel.pSearchType === 'I') {
                                 //Asssining respected PIN fom ngModel
                                 e.pin = this.searchparamModel.pIdentifierValue;
                              }
                              this.personsDataTemp.push(e);
                           });
                           this.personsData = this.personsDataTemp;
                           this.selected = 0;
                           this.loaderService.hideLoader();
                        } else {
                           this.isCreatable = false;
                        }
                     });
                  }
                  this.selected = -1;
               }
               if (this.searchparamModel.pLastName) {
                  this.isCreatable = false;
               }
            });
         });
   }

   getMask = (index, col, data) => {

      if (data['identifierType'] === 'SSN') {
         return {
            mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            placeholderChar: ' '
         };
      }
      if (data['identifierType'] === 'PNC') {
         const reg = /.*/;
         return {
            mask: [reg, reg, '/', reg, reg, reg, reg, reg, reg, reg, reg, reg, reg, reg, reg, reg, reg, reg, reg, reg],
            placeholderChar: ' '
         };
      }
   }

   peraddrExecuteQuery(event) {
      this.selectAddr = -1;
      this.peraddrModel.personId = event.personId;
      const peraddrResult = this.osipsearFactory.
         perAddrExecuteQuery(this.peraddrModel);
      peraddrResult.subscribe(peraddrResultList => {
         if (peraddrResultList.length === 0) {
            this.peraddrData = [];
         } else {
            peraddrResultList.forEach(element => {
               element.primaryFlag = element.primaryFlag === 'Y' ? 'Y' : null;
               element.mailFlag = element.mailFlag === 'Y' ? 'Y' : null;
               element.activeFlag = element.activeFlag === 'Y' ? 'Y' : null;
               element.isAddressValid = element.isAddressValid === 'Y' ? 'Y' : null;
               
            });
            this.peraddrData = peraddrResultList;
            this.selectAddr = 0;
         }
      });
   }
   peridentExecuteQuery(event) {
      this.peridentModel.personId = event.personId;
      const peridentResult = this.osipsearFactory.
         perIdentExecuteQuery(this.peridentModel);
      peridentResult.subscribe(peridentResultList => {
         if (peridentResultList.length === 0) {
            this.peridentData = [];
         } else {
            this.peridentData = peridentResultList;
            this.cameraButton = false;
            this.selectIdentifiers = 0;
            this.isCreatable = false;
         }
      });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   osipsearSaveperidentForm(event) {
      this.peridentInsertList = event.added;
      this.peridentUpdatetList = event.updated;
      this.peridentDeleteList = event.removed;
      this.peridentCommitModel.insertList = [];
      this.peridentCommitModel.updateList = [];
      this.peridentCommitModel.deleteList = [];

      const validator = { validate: true };
      this.peridentInsertList.forEach(element => {
         validator.validate = this.identifiersValidation(element);
         if (!validator.validate) {
            return;
         }
         element['personId'] = this.searchparamRowDataModel.personId;
         this.peridentCommitModel.insertList.push(element);
      });
      this.peridentUpdatetList.forEach(element => {
         if (validator.validate) {
            validator.validate = this.identifiersValidation(element);
         } else {
            return;
         }
         if (!validator.validate) {
            return;
         }
         this.peridentCommitModel.updateList.push(element);
      });
      this.peridentDeleteList.forEach(element => {
         if (validator.validate) {
            validator.validate = this.identifiersValidation(element);
         } else {
            return;
         }
         if (!validator.validate) {
            return;
         }
         this.peridentCommitModel.deleteList.push(element);
      });
      const dupData = new Set();
      this.peridentData.forEach(data => {
         const dataval = data.identifierType + ' ' + data.identifier;
         if (dupData.has(dataval)) {
            this.show('osiperso.rowexistsalreadyinthetable');
            validator.validate = false;
            return;
         } else {
            dupData.add(dataval);
         }
      });
      if (!validator.validate) {
         return;
      }
      const peridentSaveData = this.osipsearFactory.perIdentCommit(this.peridentCommitModel);
      peridentSaveData.subscribe(data => {
         if (data === 1) {
            this.show('common.addupdateremoverecordsuccess', 'success');
         } else {
            this.show('common.addupdateremoverecordfailed', 'error');
         }
         this.osipsearexecuteQuery();
      });
   }
   identifiersValidation(element, row?): boolean {
      if (!row && !element.identifierType || String(element.identifierType).trim() === '') {
         this.show('osiperso.typeofidmustbeentered');
         return false;
      }
      if (!row && !element.identifier || String(element.identifier).trim() === '') {
         this.show('osiperso.numbermustbeentered');
         return false;
      }
      if (element.identifierType === 'SSN') {
         if (element.identifier.trim().length !== 11 || String(element.identifier).includes(' ')) {
            this.show('osiperso.validformatforsocialsecuritynumber');
            return false;
         }

      }
      if (element.identifierType === 'PNC') {
         if (!this.pNCValidation(element.identifier.trim())) {
            this.show('osiperso.thisnumberisnotalegitimatepncnumber');
            return false;
         }

      }
      return true;
   }
   pNCValidation(pncNumber) {
      const vPncTable = new Map();
      try {
         vPncTable.set('A', 1);
         vPncTable.set('B', 2);
         vPncTable.set('C', 3);
         vPncTable.set('D', 4);
         vPncTable.set('E', 5);
         vPncTable.set('F', 6);
         vPncTable.set('G', 7);
         vPncTable.set('H', 8);
         vPncTable.set('J', 9);
         vPncTable.set('K', 10);
         vPncTable.set('L', 11);
         vPncTable.set('M', 12);
         vPncTable.set('N', 13);
         vPncTable.set('P', 14);
         vPncTable.set('Q', 15);
         vPncTable.set('R', 16);
         vPncTable.set('T', 17);
         vPncTable.set('U', 18);
         vPncTable.set('V', 19);
         vPncTable.set('W', 20);
         vPncTable.set('X', 21);
         vPncTable.set('Y', 22);
         vPncTable.set('Z', 23);
         const vPncNumber = pncNumber.substr(0, pncNumber.indexOf('/')) + '' + pncNumber.substr(pncNumber.indexOf('/') + 1).padStart(8, 0);
         const vNumericValue = Number(vPncNumber.substr(0, 9));
         const vCharValue = vPncNumber.substr(9, 1);
         if (['I', 'O', 'S'].includes(vCharValue)) {
            return false;
         }
         const vReminder = vNumericValue % 23;
         if (vReminder) {
            if (vPncTable.get(vCharValue) === vReminder) {
               return true;
            } else {
               return false;
            }
         } else {
            return false;
         }
      } catch (e) {
         return false;
      }

   }
   identifierValidate = (event) => {
      const rowdata = new ValidateRowReturn();
      if (event.oldValue !== event.newValue) {
         this.identifiersValidation(event.data, 'Row');
      }
      rowdata.validated = true;
      return rowdata;
   }
   imageExecuteQuery(event) {
      this.imageModel.imageObjectId = event.personId;
      const imageResult = this.osipsearFactory.
         imageExecuteQuery(this.imageModel);
      imageResult.subscribe(imageResultList => {
         if (imageResultList.length === 0) {
            this.imageData = [];
            this.image = null;
         } else {
            this.imageData = imageResultList;
            this.imageModel = imageResultList[0];
            if (this.imageModel && this.imageModel.imageThumbnail) {
               this.image = 'data:image/JPEG;base64,' + this.imageModel.imageThumbnail;
            }
         }
      });
   }
   perinfoExecuteQuery(event) {
      this.perinfoModel.personId = event.personId;
      const perinfoResult = this.osipsearFactory.
         perInfoExecuteQuery(this.perinfoModel);
      perinfoResult.subscribe(perinfoResultList => {
        if (this.personsave) {
          this.personsave.reset();
        }
         if (perinfoResultList.length === 0) {
            this.perinfoData = [];
         } else {
            perinfoResultList.forEach(element => {
               element.interpreterRequired = element.interpreterRequired === 'Y' ? 'Y' : null;
               element.staffFlag = element.staffFlag === 'Y' ? 'Y' : null;
            });
            this.perinfoData = perinfoResultList;
            setTimeout(() => {
              this.perinfoModel = perinfoResultList[0];
              this.perInfoBean = JSON.parse(JSON.stringify(perinfoResultList[0]));
            }, 100);
         }
      });
   }
   //    /**
   //     *  This function will be executed when commit event is
   //    * fired
   //    */
   osipsearSaveperinfoForm() {
      this.perinfoCommitModel.insertList = [];
      this.perinfoCommitModel.updateList = [];
      this.perinfoCommitModel.deleteList = [];
      if (!this.perinfoModel.lastName || String(this.perinfoModel.lastName).trim() === '') {
         this.show('osiperso.lastnamemustbeentered');
         return;
      }
      if (!this.perinfoModel.firstName || String(this.perinfoModel.firstName).trim() === '') {
         this.show('osiperso.firstnamemustbeenterd');
         return;
      }
      if (this.perinfoModel.birthdate &&
         DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.birthdate), DateFormat.getDate()) > 0) {
           this.show('Birth Date cannot be later than the current date');
           return;

      }
      if (this.perinfoModel.deceasedDate &&
        DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.deceasedDate), DateFormat.getDate()) > 0) {
          this.show('Deceased Date cannot be later than the current date');
          return;
     }

     if (this.perinfoModel.deceasedDate && this.perinfoModel.birthdate) {
      if (DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.deceasedDate), DateFormat.getDate(this.perinfoModel.birthdate)) < 0) {
        this.show('Deceased date cannot be prior to the Birth Date');
        return;
      }
     }
      this.perinfoCommitModel.updateList.push(this.perinfoModel);

    const perinfoSaveData = this.osipsearFactory.perInfoCommit(this.perinfoCommitModel);
    perinfoSaveData.subscribe(data => {
      if (this.personsave) {
        this.personsave.reset();
    }
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
      } else {
        this.show('common.addupdateremoverecordfailed', 'error');
      }
      setTimeout(() => {
        this.osipsearexecuteQuery();
      }, 100);
    });
  }
   perempExecuteQuery(event) {
      this.perempModel.personId = event.personId;
      const perempResult = this.osipsearFactory.
         perEmpExecuteQuery(this.perempModel);
      perempResult.subscribe(perempResultList => {
         if (perempResultList.length === 0) {
            this.perempData = [];
         } else {
            perempResultList.forEach(element => {
               element.activeFlag = element.activeFlag === 'Y' ? 'Y' : null;
            });
            this.perempData = perempResultList;
            this.perempModel = perempResultList[0];
            this.selectProf = 0;
         }
      });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   osipsearSaveperempForm(event) {
     if (!this.PersonDetailValidation(this.perempData)) {
      return;
     }
      this.perempInsertList = event.added;
      this.perempUpdatetList = event.updated;
      this.perempDeleteList = event.removed;
      this.perempCommitModel.insertList = [];
      this.perempCommitModel.updateList = [];
      this.perempCommitModel.deleteList = [];

      this.perempInsertList.forEach(element => {
         element.activeFlag = element.activeFlag ? 'Y' : 'N';
         element.personId = this.searchparamRowDataModel.personId;
         this.perempCommitModel.insertList.push(element);
      });
      this.perempUpdatetList.forEach(element => {
         element.activeFlag = element.activeFlag ? 'Y' : 'N';
         this.perempCommitModel.updateList.push(element);
      });
      this.perempDeleteList.forEach(element => {
         this.perempCommitModel.deleteList.push(element);
      });
      const perempSaveData = this.osipsearFactory.perEmpCommit(this.perempCommitModel);
      perempSaveData.subscribe(data => {
        if (data === 1) {
            this.show('common.addupdateremoverecordsuccess', 'success');
         } else {
            this.show('common.addupdateremoverecordfailed', 'error');
         }
         this.osipsearexecuteQuery();
      });
   }
   pspersonnameExecuteQuery() {
      const pspersonnameResult = this.osipsearFactory.
         psPersonNameExecuteQuery(this.searchparamModel);
      pspersonnameResult.subscribe(pspersonnameResultList => {
         if (pspersonnameResultList.length === 0) {
            this.pspersonnameData = [];
            if (this.pinValue) {
               this.osipsearexecuteQuery();
            } else {
               this.show('common.querycaused');
               this.isCreatable = false;
            }
         } else {
            this.pspersonnameData = pspersonnameResultList;
            const dialogData = {'title': 'Person Search Hits', 'data': pspersonnameResultList};
            this.dialogService.openLinkDialog('/osioseardialog', this.searchparamModel, 30).subscribe(result => {
               if (result) {
                  this.lastSearchType = 'N';
                  this.searchparamModel.pSearchType = this.lastSearchType;
                  this.searchparamModel.pLastName =  result.lastName;
                  this.osipsearexecuteQuery();
               }
            });

         }
      });
   }

   onLinkedOffenderClick = () => {
      if (this.personsData.length > 0) {
         return true;
      } else {
         this.show('osiperso.pleasecreateapersonbeforecallingaoffenderslinkedtoform');
         return false;
      }
   }
   noSymbol(event) {
    if (event.key === '.' || event.key === '+') {
      event.stopPropagation();
      return false;
    }
   }
   isRetrieveDisable(): boolean {
     if (!this.searchparamModel.pSearchType) {
      return true;
     } else {
       if (this.searchparamModel.pSearchType !== 'I' && !this.searchparamModel.pLastName) {
        return true;
       }
       if (this.searchparamModel.pSearchType === 'I' &&
       (!this.searchparamModel.pPersonId && !this.searchparamModel.pIdentifierType && !this.searchparamModel.pIdentifierValue)) {
        return true;
       }
     }
     return false;
   }

   isClearDisable(): boolean {
      if (this.searchparamModel.pLastName || this.searchparamModel.pFirstName || this.searchparamModel.pMiddleName
         || this.searchparamModel.pPersonId || this.searchparamModel.pIdentifierType || this.searchparamModel.pIdentifierValue
         || this.searchparamModel.pSex || this.searchparamModel.pBirthDate || this.searchparamModel.pBirthYear
         || this.searchparamModel.pBirthRange || (this.personsData.length > 0)) {
            return false;
      }
      return true;
   }

   isAdditionalInformationDisabled(personsave) {
     if (personsave.touched && personsave.dirty) {
      return false;
     } else if (this.perinfoModel.birthdate !== this.perInfoBean.birthdate ||
        this.perinfoModel.deceasedDate !== this.perInfoBean.deceasedDate ||
        this.perinfoModel.staffFlag !== this.perInfoBean.staffFlag ||
        this.perinfoModel.interpreterRequired !== this.perInfoBean.interpreterRequired
     ) {
        return false;
     } else {
       return true;
     }
   }
   isImageContent(): boolean {
    return this.image ? true : false;
   }
  clickCamera() {
    this.cameraButton = true;
    if (this.searchparamRowDataModel.personId) {
      const captureImageData = this.osiosearchService.captureImageProcedure();
      captureImageData.subscribe(captureImage => {
        if (captureImage === 'OIUIMAGE') {
          this.osipsearFactory.imagesDataTemp.imageObjectId = this.searchparamRowDataModel.personId;
          this.osipsearFactory.imagesDataTemp.imageObjectType = 'PERSON';
          this.osipsearFactory.imagesDataTemp.imageViewType = 'FACE';
          this.osipsearFactory.imagesDataTemp.personId = this.searchparamRowDataModel.personId;
          this.osipsearFactory.imagesDataTemp.lastName = this.searchparamRowDataModel.lastName;
          this.osipsearFactory.imagesDataTemp.firstName = this.searchparamRowDataModel.firstName;
          this.osipsearFactory.imagesDataTemp.birthDate = this.searchparamRowDataModel.birthDate;
          this.dialogService.openLinkDialog('/oiuimagedialog', this.osipsearFactory.imagesDataTemp, 80).subscribe(result => {
            this.osipsearexecuteQuery();
            this.cameraButton = false;
          });
        } else {
          return;
        }
      });
    }


  }
  get identifierNum() {
    if(this.searchparamModel.pSearchType === 'I' && this.searchparamModel.pIdentifierType) {
      return true;
    } else {
      return false;
    }
  }
  get personReq() {
   if (this.searchparamModel.pSearchType === 'I' && !this.searchparamModel.pIdentifierType && !this.searchparamModel.pIdentifierValue) {
      return true;
    } else {
      return false;
    }
  }

   systemProfileForPin() {
      this.sysPflModelTemp.profileCode = 'PIN';
      this.sysPflModelTemp.profileType = 'CLIENT';
      const syspflResult = this.oumsypflFactory.getSystemProfileRecords(this.sysPflModelTemp);
      syspflResult.subscribe(data => {
         if (data.length > 0) {
            if (data[0].profileValue === "Y" || data[0].profileValue === "y") {
               this.personsColumnDef[6].hide = 'false';
               this.personGrid.prepareAgColumnDef();
               this.pinValue = true;
            } else {
               this.personsColumnDef[6].hide = 'true';
               this.personGrid.prepareAgColumnDef();
               this.pinValue = false;
            }
         }
      });
   }


   createNewPerson = () => {
      if (this.pinValue && this.searchparamRowDataModel.pin && !this.searchparamRowDataModel.personId) {
         this.searchparamModelTemp = this.searchparamRowDataModel;
         this.searchparamModelTemp.pLastName = this.searchparamRowDataModel.lastName;
         this.searchparamModelTemp.pFirstName = this.searchparamRowDataModel.firstName;
         this.searchparamModelTemp.pMiddleName = this.searchparamRowDataModel.middleName;
         this.searchparamModelTemp.pBirthDate = this.searchparamRowDataModel.birthDate;
         this.searchparamModelTemp.secondMiddleName = this.searchparamRowDataModel.secondMiddleName;
         this.searchparamModelTemp['pinValue'] = this.pinValue;
         this.searchparamModelTemp.pIdentifierType = this.searchparamModel.pIdentifierType ? this.searchparamModel.pIdentifierType : 'PIN';
         this.searchparamModelTemp.pIdentifierValue = this.searchparamModel.pIdentifierValue ? this.searchparamModel.pIdentifierValue : this.searchparamRowDataModel.pin;
         if(this.searchparamRowDataModel.pnin != null && this.searchparamRowDataModel.pnin != undefined && this.searchparamRowDataModel.pnin != '') {
            this.searchparamModelTemp['pninValue'] = this.searchparamRowDataModel.pnin;
         } else {
            this.searchparamModelTemp['pninValue'] = '';
         }
      } else {
         this.searchparamModelTemp = this.searchparamModel;
      }
      this.dialogService.openLinkDialog('/OCUCNPER', this.searchparamModelTemp, 85).subscribe(result => {
         if (result) {
            if (result.lastName && this.searchparamModel.pSearchType !== 'I') {
               this.searchparamModel.pLastName = result.lastName;
            }
            if (result.firstName && this.searchparamModel.pSearchType !== 'I') {
               this.searchparamModel.pFirstName = result.firstName;
            }
            this.verifyFlag = false;
            this.ok('N');
         }
      });
   }

}
