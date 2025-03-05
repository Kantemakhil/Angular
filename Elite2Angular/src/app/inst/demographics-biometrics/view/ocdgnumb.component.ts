import {
    Component,
    ViewChild,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdgnumbService } from '../service/ocdgnumb.service';
import { Phones } from '@instdemographicsbeans/Phones';
import { InternetAddresses } from '@instdemographicsbeans/InternetAddresses';
import { InternetAddressesCommitBean } from '@instdemographicsbeans/InternetAddressesCommitBean';
import { PhonesCommitBean } from '@instdemographicsbeans/PhonesCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
// import required bean declarations

@Component({
    selector: 'app-ocdgnumb',
    templateUrl: './ocdgnumb.component.html'
})

export class OcdgnumbComponent implements OnInit {
    // Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('phoneGrid', {static: true}) phoneGrid: any;
    @ViewChild('emailGrid', {static: true}) emailGrid: any;
    actionName: string;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    phonesData: Phones[] = [];
    phonesDataTemp: Phones[] = [];
    phonesModel: Phones = new Phones();
    phonesIndex = 0;
    phonesInsertList: Phones[] = [];
    phonesUpdatetList: Phones[] = [];
    phonesDeleteList: Phones[] = [];
    phonesCommitModel: PhonesCommitBean = new PhonesCommitBean();
    internetaddrData: InternetAddresses[] = [];
    internetaddrDataTemp: InternetAddresses[] = [];
    internetaddrModel: InternetAddresses = new InternetAddresses();
    internetaddrIndex = 0;
    internetaddrInsertList: InternetAddresses[] = [];
    internetaddrUpdatetList: InternetAddresses[] = [];
    internetaddrDeleteList: InternetAddresses[] = [];
    internetaddrCommitModel: InternetAddressesCommitBean = new InternetAddressesCommitBean();
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
    rgphonetypeRg: any[] = [];
    tableIndex = -1;
    phGridDelBtn = true;
    intGridDelBtn = true;
    selectedFormat: any;
    emailDomainsData: string[] = [];
    constructor(private ocdgnumbFactory: OcdgnumbService,
                public translateService: TranslateService) {
        this.internetAddrColumnDef = [];
        this.phonesColumnDef = [];
    }
    ngOnInit() {
        this.internetAddrColumnDef = [
            { fieldName: this.translateService.translate('ocdgnumb.emailaddresses') + '*', field: 'internetAddress',
                editable: true, width: 1100, datatype: 'email' },
        ];
        this.phonesColumnDef = [
            {
                fieldName: this.translateService.translate('ocdgnumb.phoneFormat'), field: 'format', editable: true, width: 200,
                datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true,source:'OUMSYSET'
            },
            {
                fieldName: this.translateService.translate('common.type') + '*', field: 'phoneType', datatype: 'lov',
                domain: 'PHONE_USAGE', editable: true, width: 300, optionWidth: 300
            },
            { fieldName: this.translateService.translate('common.phonenumber') + '*', field: 'phoneNo', datatype : 'phone',
                editable: true, width: 600, formatType: this.selectedFormat },
            { fieldName: this.translateService.translate('common.extension'), field: 'extNo', editable: true, width: 200, maxlength: 7,
                    datatype : 'text'},
        ];
        const rgphonetypeServiceObj = this.ocdgnumbFactory.rgPhoneTypeRecordGroup(null);
        rgphonetypeServiceObj.subscribe(rgphonetypeList => {
            if (rgphonetypeList.length === 0) {
                this.rgphonetypeRg = [];
            } else {
                for (let i = 0; i < rgphonetypeList.length; i++) {
                    this.rgphonetypeRg.push({
                        'text': rgphonetypeList[i].code + ' - ' +
                            rgphonetypeList[i].description, 'id': rgphonetypeList[i].code
                    });
                }
            }
        });
        this.phonesExecuteQuery();
        this.internetaddrExecuteQuery();

        const emailDomainData = this.ocdgnumbFactory.gettingEmailDomains();
        emailDomainData.subscribe(data => {
        if (data.length === 0) {
            this.emailDomainsData = [];
        } else {
            this.emailDomainsData = data;
        }
    });

    }
    onGridReady(event) {
    }
    onRowClickphones(event) {
        if (event) {
            if (event.phoneId) {
                this.phGridDelBtn = true;
            } else {
                this.phGridDelBtn = false;
            }

        } else {
            this.phGridDelBtn = false;
        }
    }
    validateRowPhonesData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'format') {
            this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
            PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
            this.phoneGrid.setColumnData('phoneNo', rowIndex, null);
        }

        rowdata.validated = true;
        return rowdata;
      }

    validateEmailAddressesData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'internetAddress') {
            const myArray = event.data.internetAddress.split('@')
            let word = myArray[1];
            if (this.emailDomainsData.includes(word)) {
                rowdata.validated = true;
                return rowdata;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.enteremailaddressval');
                this.showmsg();
                this.emailGrid.setColumnData('internetAddress', rowIndex, null);

            }
            if (this.emailDomainsData.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.enteremailaddressval');
                this.showmsg();
                this.emailGrid.setColumnData('internetAddress', rowIndex, null);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }


    onRowClickinternetaddr(event) {
        if (event) {
            if (event.internetAddressId) {
                this.intGridDelBtn = true;
            } else {
                this.intGridDelBtn = false;
            }

        } else {
            this.intGridDelBtn = false;
        }
    }
    onButSaveclick() {
    }
    onButExitclick() {
        this.dialog.close(null);
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    phonesExecuteQuery() {
        if (this.dialog.data ) {
           
            if ( this.dialog.data.education) {
             this.phonesModel.ownerId =  this.dialog.data.education.offenderBookId;
             this.phonesModel.ownerClass = this.dialog.data.class;
                } else if (this.dialog.data.employment) {
                this.phonesModel.ownerId =  this.dialog.data.employment.offenderBookId;
                this.phonesModel.ownerClass = this.dialog.data.class;
                } else if (this.dialog.data.agency) {
                this.phonesModel.ownerCode =  this.dialog.data.agency.agyLocId;
                } else if ( this.dialog.data.addressId ) {
                    this.phonesModel.ownerId = this.dialog.data.personId;
                    this.phonesModel.ownerClass = this.dialog.data.class;
                } else if (this.dialog.data.person) {
                    this.phonesModel.ownerId = this.dialog.data.person.personId;
                    this.phonesModel.ownerClass = this.dialog.data.class;
                   
                } else {
                return;
            }
        }
        const phonesResult = this.ocdgnumbFactory.
            phonesExecuteQuery(this.phonesModel);
        phonesResult.subscribe(phonesResultList => {
            if (phonesResultList.length === 0) {
                this.phonesData = [];
            } else {
                this.phonesData = phonesResultList;
                this.phonesModel = phonesResultList[0];
                this.tableIndex = 0;
            }
        });
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
        for(let i=0;i<this.phonesData.length;i++){
          for(let j=i+1;j<this.phonesData.length;j++){
            if(this.phonesData[i].format===this.phonesData[j].format && this.phonesData[i].phoneNo===this.phonesData[j].phoneNo){
              this.show(this.translateService.translate('ocdaddre.phonenumberduplicate'));
              return false;
            }
          }
        }
        return validation.validate;
      }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdgnumbSavephonesForm(event) {

        this.phonesInsertList = event.added;
        this.phonesUpdatetList = event.updated;
        this.phonesDeleteList = event.removed;
        this.phonesCommitModel.insertList = [];
        this.phonesCommitModel.updateList = [];
        this.phonesCommitModel.deleteList = [];
        if (this.phonesInsertList && this.phonesInsertList.length > 0 && !this.PhonesValidation(this.phonesInsertList)) {
            return false;
          }
          if ( this.dialog.data) {
            for (let i = 0; i < this.phonesInsertList.length; i++) {
            this.phonesInsertList[i].ownerClass = this.dialog.data.class;
            if ( this.dialog.data.education ) {
                this.phonesInsertList[i].ownerId =  this.dialog.data.education.offenderBookId;
                this.phonesInsertList[i].ownerSeq = this.dialog.data.education.educationSeq;
                } else if (this.dialog.data.employment) {
                    this.phonesInsertList[i].ownerId =  this.dialog.data.employment.offenderBookId;
                    this.phonesInsertList[i].ownerSeq = this.dialog.data.employment.employSeq;
                } else if (this.dialog.data.agency) {
                    this.phonesInsertList[i].ownerCode =  this.dialog.data.agency.agyLocId;
                } else if (this.dialog.data.person) {
                    this.phonesInsertList[i].ownerId =  this.dialog.data.person.personId;
                     }  else {
                return;
            }
        }
        }
          if (this.phonesUpdatetList && this.phonesUpdatetList.length > 0 && !this.PhonesValidation(this.phonesUpdatetList)) {
            return false;
          }
        this.phonesCommitModel.insertList = this.phonesInsertList;
        this.phonesCommitModel.updateList = this.phonesUpdatetList;
        this.phonesCommitModel.deleteList = this.phonesDeleteList;
        const phonesSaveData = this.ocdgnumbFactory.phonesCommit(this.phonesCommitModel);
        phonesSaveData.subscribe(data => {
            if (data !== 0) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.showmsg();
                this.phonesModel = new Phones();
                this.phonesExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.showmsg();
                this.phonesModel = new Phones();
            }
        });
    }
    onClearNumber = () => {
        this.phonesExecuteQuery();
        return true;
    }
    internetaddrExecuteQuery() {
        if ( this.dialog.data ) {
            if ( this.dialog.data.education) {
             this.internetaddrModel.ownerId =  this.dialog.data.education.offenderBookId;
             this.internetaddrModel.ownerClass = this.dialog.data.class;
                } else if (this.dialog.data.employment) {
                this.internetaddrModel.ownerId =  this.dialog.data.employment.offenderBookId;
                this.internetaddrModel.ownerClass = this.dialog.data.class;
                } else if (this.dialog.data.agency) {
                this.internetaddrModel.ownerCode =  this.dialog.data.agency.agyLocId;
                } else if ( this.dialog.data.addressId ) {
                    this.internetaddrModel.ownerId = this.dialog.data.personId;
                    this.internetaddrModel.ownerClass = this.dialog.data.class;
                } else if (this.dialog.data.person) {
                    this.internetaddrModel.ownerId = this.dialog.data.person.personId;
                    this.internetaddrModel.ownerClass = this.dialog.data.class;
                } else {
                return;
            }
            }
        const internetaddrResult = this.ocdgnumbFactory.
            internetAddrExecuteQuery(this.internetaddrModel);
        internetaddrResult.subscribe(internetaddrResultList => {
            if (internetaddrResultList.length === 0) {
                this.internetaddrData = [];
            } else {
                this.internetaddrData = internetaddrResultList;
                this.internetaddrModel = internetaddrResultList[0];
            }
        });
    }
      showmsg() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
      }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdgnumbSaveinternetaddrForm(event) {
        this.internetaddrInsertList = event.added;
        this.internetaddrUpdatetList = event.updated;
        this.internetaddrDeleteList = event.removed;
        this.internetaddrCommitModel.insertList = [];
        this.internetaddrCommitModel.updateList = [];
        this.internetaddrCommitModel.deleteList = [];
        if (!this.emailValidation(event.added)) {
            return;
        }
  
        if (!this.emailValidation(event.updated)) {
          return;
      }
        
        this.internetaddrInsertList.forEach(element => {
             if (this.dialog.data) {
                element.ownerClass = this.dialog.data.class;
                element.internetAddressClass = 'EMAIL';
            if (this.dialog.data.education) {
             element.ownerId =  this.dialog.data.education.offenderBookId;
             element.ownerSeq = this.dialog.data.education.educationSeq;
             element.ownerClass = this.dialog.data.class;
                } else if (this.dialog.data.employment) {
             element.ownerId =  this.dialog.data.employment.offenderBookId;
             element.ownerSeq = this.dialog.data.employment.employSeq;
             element.ownerClass = this.dialog.data.class;
                }  else if (this.dialog.data.agency) {
                element.ownerCode =  this.dialog.data.agency.agyLocId;
                } else if (this.dialog.data.person) {
                    element.ownerId =  this.dialog.data.person.personId;
                     } else {
                return;
            }
        }
            });
        this.internetaddrCommitModel.insertList = this.internetaddrInsertList;
        this.internetaddrCommitModel.updateList = this.internetaddrUpdatetList;
        this.internetaddrCommitModel.deleteList = this.internetaddrDeleteList;
        const internetaddrSaveData = this.ocdgnumbFactory.internetAddrCommit(this.internetaddrCommitModel);
        internetaddrSaveData.subscribe(data => {
            if (data !== 0) {
                this.internetaddrData = data;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.showmsg();
                this.internetaddrExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.showmsg();
            }
        });
    }
     onphoneInsert = () => {
        if (!this.PhonesValidation(this.phonesData)) {
            return false;
          }
        return {
            date: DateFormat.getDate()
        };
    }
    validateRowEmails= (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        let dupEmailData = this.internetaddrData.filter(e => e['internetAddress'] === event.data.internetAddress);
        if(dupEmailData && dupEmailData.length>1){
          this.message = this.translateService.translate('ocdaddre.emailalreadyexist');
          this.emailGrid.setColumnData('internetAddress', rowIndex, undefined);
          this.show(this.message, 'warn');
        }
        rowdata.validated = true;
        return rowdata;
      }
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
      
        for(let i=0;i<this.internetaddrData.length;i++){
          for(let j=i+1;j<this.internetaddrData.length;j++){
            if(this.internetaddrData[i].internetAddress===this.internetaddrData[j].internetAddress){
              this.show(this.translateService.translate('ocdaddre.emailduplicate'));
              return false;
            }
          }
        }
        return validation.validate;
      }
   onGridInsert = () => {
        if (this.internetaddrData.length > 0) {
            if (!this.emailValidation(this.internetaddrData)) {
                return null;
              }
            }
        return {
            date: DateFormat.getDate()
        };
   
}
}
