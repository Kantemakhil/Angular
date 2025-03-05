import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdpersoService } from '../service/ocdperso.service';
import { OffenderContactPersons } from '@inst/demographics-biometrics/beans/OffenderContactPersons';
import { VPersonAddress } from '@inst/demographics-biometrics/beans/VPersonAddress';
import { PersonIdentifiers } from '@inst/demographics-biometrics/beans/PersonIdentifiers';
import { Persons } from '@inst/demographics-biometrics/beans/Persons';
import { PersonEmployments } from '@inst/demographics-biometrics/beans/PersonEmployments';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { PersonIdentifiersCommitBean } from '@inst/demographics-biometrics/beans/PersonIdentifiersCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OffenderContactPersonsCommitBean } from '@inst/demographics-biometrics/beans/OffenderContactPersonsCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { PersonEmploymentsCommitBean } from '@inst/demographics-biometrics/beans/PersonEmploymentsCommitBean';
import { PersonsCommitBean } from '@inst/demographics-biometrics/beans/PersonsCommitBean';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';

@Component({
  selector: 'app-ocdperso',
  templateUrl: './ocdperso.component.html'
})

export class OcdpersoComponent implements OnInit {
  insertgrid: boolean;
  identGridInsert: boolean;
  addEditAddressModel: any;
  offcntperIndexTemp: number;
  @ViewChild('grid', {static: true}) grid: any;
  @ViewChild('peremptab', {static: true}) peremptabGrid: any;
  returnFlag: boolean;
  perinfoCommitModel: PersonsCommitBean = new PersonsCommitBean();
  perempCommitModel: PersonEmploymentsCommitBean = new PersonEmploymentsCommitBean();
  offcntperCommitModel: OffenderContactPersonsCommitBean = new OffenderContactPersonsCommitBean();
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  relationShipLink: string;
  vHeaderBlockModel: VHeaderBlock;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  offcntperData: OffenderContactPersons[] = [];
  offcntperRowData: OffenderContactPersons[] = [];
  offcntperDataTemp: OffenderContactPersons[] = [];
  offcntperModel: OffenderContactPersons = new OffenderContactPersons();
  offcntperIndex = -1;
  offcntperInsertList: OffenderContactPersons[] = [];
  offcntperUpdatetList: OffenderContactPersons[] = [];
  offcntperDeleteList: OffenderContactPersons[] = [];
  peraddrData: VPersonAddress[] = [];
  peraddrDataTemp: VPersonAddress[] = [];
  peraddrModel: VPersonAddress = new VPersonAddress();
  peraddrIndex = -1;
  peraddrInsertList: VPersonAddress[] = [];
  peraddrUpdatetList: VPersonAddress[] = [];
  peraddrDeleteList: VPersonAddress[] = [];
  peridentData: PersonIdentifiers[] = [];
  peridentDataTemp: PersonIdentifiers[] = [];
  peridentModel: PersonIdentifiers = new PersonIdentifiers();
  peridentIndex = -1;
  peridentInsertList: PersonIdentifiers[] = [];
  peridentUpdatetList: PersonIdentifiers[] = [];
  peridentDeleteList: PersonIdentifiers[] = [];
  peridentCommitModel: PersonIdentifiersCommitBean = new PersonIdentifiersCommitBean();
  perinfoData: Persons[] = [];
  perinfoDataTemp: Persons[] = [];
  perinfoModel: Persons = new Persons();
  perinfoIndex = -1;
  perinfoInsertList: Persons[] = [];
  perinfoUpdatetList: Persons[] = [];
  perinfoDeleteList: Persons[] = [];
  perempData: PersonEmployments[] = [];
  perempDataTemp: PersonEmployments[] = [];
  perempModel: PersonEmployments = new PersonEmployments();
  perempIndex = -1;
  perempInsertList: PersonEmployments[] = [];
  perempUpdatetList: PersonEmployments[] = [];
  perempDeleteList: PersonEmployments[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  sexReadOnly:boolean;
  disabledChkBox:boolean;
  disabledChkBox1:boolean;
  disabledComment: boolean;
  perAddrColumnDef: any[];
  perIdentColumnDef: any[];
  perEmpColumnDef: any[];
  offCntPerColumnDef: any[];
  rgcontacttypeRg: any[] = [];
  rgreltypeRg: any[] = [];
  rglanguagecodeRg: any[] = [];
  rgmaritalstatusRg: any[] = [];
  rgsexcodeRg: any[] = [];
  rgsearchtypeRg: any[] = [];
  rgidentifiertypeRg: any[] = [];
  personData = { 'forwardToDialog': true, 'person': undefined };
  isvalid = false;
  savebtn = true;
  gridInsBtn = false;
  gridDelBtn = false;
  perinfoModelTemp: Persons = new Persons();
  middleNameTemp;
  sexTemp;
  birthdateTemp;
  maritalStatusTemp;
  languageCodeTemp;
  interpreterRequiredTemp;
  deceasedDateTemp;
  staffFlagTemp;
  disCount: any;
  selectedFormat: any;
  constructor(private ocdpersoFactory: OcdpersoService,
    public translateService: TranslateService, public dialogService: DialogService,
    private offenderSearchService: OffenderSearchService, private sessionManager: UserSessionManager, ) {
    this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    this.perAddrColumnDef = [];
    this.perIdentColumnDef = [];
    this.perEmpColumnDef = [];
    this.offCntPerColumnDef = [];
  }
  ngOnInit() {
    this.disCount = 1;
    this.perinfoModelTemp = new Persons();
    this.gridInsBtn = false;
    this.gridDelBtn = false;
    this.disabled = true;
    this.disabledChkBox=true;
    this.disabledChkBox1=true;
    this.sexReadOnly=true;
    this.identGridInsert=false;
    this.disabledComment = true;
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
    this.perIdentColumnDef = [
      {
        fieldName: this.translateService.translate('ocdperso.typeofid'), field: 'identifierType', editable: true,
        datatype: 'lov',domain:'ID_TYPE'/* link: 'ocdperso/rgIdentifierTypeRecordGroup'*/, width: 150, maxlength: 40,
        titles: { code: 'Identifier', description: 'Description' }
      },
      {
        fieldName: this.translateService.translate('common.numbers'), field: 'identifier', editable: true,
        datatype: 'text', mask: this.getMask, width: 150,  maxlength: 20
      },
      {
        fieldName: this.translateService.translate('ocdperso.issuingauthority'), field: 'issuedAuthorityText',
        datatype: 'text', editable: true, width: 150,  maxlength: 40, uppercase: 'false'
      },
    ];
    this.perEmpColumnDef = [
      {
        fieldName: this.translateService.translate('ocdedemp.employer') + '*', field: 'employerName',
        editable: true, width: 150,  maxlength: 40, datatype: 'text', uppercase: 'false'
      },
      { fieldName: this.translateService.translate('owheader.address'), field: 'address', editable: true,
       width: 150,  maxlength: 240, datatype: 'text', uppercase: 'false', },
      {
        fieldName: this.translateService.translate('oumagenc.phoneFormat'), field: 'format', editable: true, width: 200,
        datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true,source:'OUMSYSET'
      },
      {
        fieldName: this.translateService.translate('ocdperso.telephone'), field: 'contactNumber', required: true,
        datatype: 'phone', editable: true, width: 150,  maxlength: 32, formatType: this.selectedFormat,
      },
      { fieldName: this.translateService.translate('ocdperso.ext'), field: 'phoneExt', editable: true,
       width: 150,  maxlength: 6, datatype: 'text', uppercase: 'false', },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
        datatype: 'checkbox', width: 150
      }
    ];
    this.offCntPerColumnDef = [
      {
        fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false,
        width: 150 , required: true

      },
      {
        fieldName: '', field: 'button', displayas: 'image', datatype:'hyperlink', link: '/osipserdialog', editable: false, width: 100,
        data: 'row', updateField: 'row', modal: true, dialogWidth: 100, height: 90, onLaunchClick: this.osipserdialogClick,
        isDisable: this.isLaunchDisable
      },
      { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
      { fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('ocdperso.contacttype'), field: 'contactType', editable: true,
        datatype: 'lov', domain: 'CONTACTS', width: 150
      },
      {
        fieldName: this.translateService.translate('ocdperso.relationship'), field: 'relationshipType', editable: true,
        datatype: 'lov', link: 'ocdperso/rgRelTypeRecordGroup?contactType=', parentField: 'contactType',
        width: 150, source: 'OIMCTACT'
      },
      {
        fieldName: this.translateService.translate('ocdperso.emergencycontact'), field: 'emergencyContactFlag',
        datatype: 'checkbox', editable: true, width: 150
      },
      {
        fieldName: this.translateService.translate('ocdperso.nextofkin'), field: 'nextOfKinFlag', editable: true,
        datatype: 'checkbox', width: 150
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
        width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('common.comments'), field: 'commentText', editable: true,
        width: 150, datatype: 'text', maxlength: 240, uppercase: 'false'
      },
      { fieldName: '', field: 'personId', hide: true },
      { fieldName: '', field: 'activeFlag', hide: true },
      { fieldName: '', field: 'approvedVisitorFlag', hide: true },
    ];
    if (!this.vHeaderBlockModel) {
      this.type = 'warn';
      this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
      this.show();
      this.insertgrid = false;
      this.disabledComment = true;
    } else {
      this.insertgrid = true;
    }
  }
  isLaunchDisable = (event) => {
    if (event.personId) {
        return true;
    } else {
        return false;
    }
}
  osipserdialogClick = (event) => {
    if (event.personId) {
      return;
    }
    const index = this.offcntperData.indexOf(event);
    this.dialogService.openLinkDialog('/osipserdialog', event, 90).subscribe(result => {
      if (result.personId) {
        for (let i = 0; i < this.offcntperData.length; i++) {
          if (this.offcntperData[i].personId === result.personId) {
            this.type = 'info';
            this.message = this.translateService.translate('ocdperso.thiscontactisalreadyaddedtothisoffenderplzselect');
            this.show();
             return;
          }
      }
      this.grid.setColumnData('lastName', index, result.lastName);
      this.grid.setColumnData('firstName', index, result.firstName);
      this.grid.setColumnData('middleName', index, result.middleName);
      this.grid.setColumnData('personId', index, result.personId);
      this.grid.setColumnData('activeFlag', index, 'true');
      this.grid.setColumnData('approvedVisitorFlag', index, 'N');
      this.offcntperModel.personId = result.personId;
      this.offcntperModel.activeFlag = 'true';
      this.offcntperModel.emergencyContactFlag = undefined;
      this.offcntperModel.nextOfKinFlag = undefined;
      this.offcntperModel.approvedVisitorFlag = 'N';
      } else {

      }
    });
  }
  onRowClickoffcntper(event) {
    this.offcntperIndexTemp = this.offcntperData.indexOf(event);
    this.offcntperModel = new OffenderContactPersons();
    this.perinfoModel = new Persons();
    if(this.offcntperData.length>0){
//        this.identGridInsert=true
        this.disabled = false;
        }
    this.perinfoData = [];
    this.peridentData = [];
    this.perempData = [];
    this.peraddrData = [];
    if (event) {
      this.sexReadOnly=false;
      this.disabledChkBox=false;
      this.disabledChkBox1=false;
      this.identGridInsert=true;
      if (event.personId) {
        this.gridDelBtn = true;
      } else {
        this.gridDelBtn = false;
        this.sexReadOnly=true;
        this.disabledChkBox=true;
        this.disabledChkBox1=true;
        this.identGridInsert=false;
      }
      this.offcntperModel = event;
      this.peraddrExecuteQuery();
      this.perinfoExecuteQuery();
      this.peridentExecuteQuery();
      this.perempExecuteQuery();
      if (this.offcntperData.length > 0) {
        //this.identGridInsert = true;
        this.disabled = false;
      }
      this.addEditAddressModel = { person: event, address: { ownerId: event.persponId }, class: 'PER' };
      const person = { 'pSearchType': 'I', 'pPersonId': event.personId };
      this.personData.person = person;
    } else {
      this.gridDelBtn = false;
    }
    const checkChildData = this.ocdpersoFactory.checkChildRecords(this.vHeaderBlockModel.offenderBookId, this.offcntperModel.personId);
    checkChildData.subscribe(data => {
      if (data === 0) {
        this.returnFlag = true;
      } else {
        this.returnFlag = false;
      }
    });
  }

  isCntPerCommentText() {
    if (this.offcntperModel.commentText) {
      this.grid.setColumnData('nextOfKinFlag', this.offcntperIndexTemp, this.offcntperModel.nextOfKinFlag === 'true' ? 'Y' : 'false');
      this.grid.setColumnData('nextOfKinFlag', this.offcntperIndexTemp, this.offcntperModel.nextOfKinFlag === 'Y' ? 'true' : undefined);
      this.grid.setColumnData('commentText', this.offcntperIndexTemp, this.offcntperModel.commentText);
    }
  }
  allowNumbers(event) {
  }

  getMask = (index, col, data) => {
    if (data['identifierType'] === 'SSN') {
      return {
        mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        placeholderChar: ' '
      };
    }
  }
  onButCallOsipsearclick(event) {
    if (event.personId) {
      for (let i = 0; i < this.offcntperData.length; i++) {
        if (this.offcntperData[i].personId === event.personId) {
          this.type = 'info';
          this.message = this.translateService.translate('ocdperso.thiscontactisalreadyaddedtothisoffenderplzselect');
          this.show();
          this.offcntperExecuteQuery();
          // return;
        }
      }
      this.grid.addRecord(event);
      this.grid.setColumnData('lastName', this.offcntperData.length - 1, event.lastName);
      this.grid.setColumnData('firstName', this.offcntperData.length - 1, event.firstName);
      this.grid.setColumnData('middleName', this.offcntperData.length - 1, event.middleName);
      this.grid.setColumnData('personId', this.offcntperData.length - 1, event.personId);
      this.grid.setColumnData('activeFlag', this.offcntperData.length - 1, 'true');
      this.grid.setColumnData('approvedVisitorFlag', this.offcntperData.length - 1, 'N');
      this.offcntperModel.personId = event.personId;
      this.offcntperModel.activeFlag = 'true';
      this.offcntperModel.emergencyContactFlag = undefined;
      this.offcntperModel.nextOfKinFlag = undefined;
      this.offcntperModel.approvedVisitorFlag = 'N';
    } else {
      this.offcntperExecuteQuery();
    }
  }
  onRowClickperaddr(event) {
    this.peraddrModel = new VPersonAddress();
    this.peraddrModel = event;
    this.addEditAddressModel.address = event;
  }
  onButCopyAddressclick() {
    if (!this.vHeaderBlockModel.offenderBookId) {
      return;
    }
    if (this.offcntperModel.personId) {
      const copyAddressObj = this.ocdpersoFactory.copyOffAddr(this.vHeaderBlockModel.rootOffenderId, this.offcntperModel.personId);
      copyAddressObj.subscribe(returnVal => {
        if (returnVal === 0) {
          this.type = 'info';
          this.message = this.translateService.translate('ocdperso.offenderdoesnothaveanyprimaryaddress');
          this.show();
          this.peraddrExecuteQuery();
        } else {
          this.type = 'success';
          this.message = this.translateService.translate('ocdperso.offenderaddressiscopiedandsaved');
          this.show();
          this.peraddrExecuteQuery();
        }
      });
    } else {
      this.type = 'info';
      this.message = this.translateService.translate('ocdperso.pleaseenterthepersoninfobeforecopyoffenderaddress');
      this.show();
      return;
    }
  }
  onButAddQueryAfterDialaugeclick() {
    this.peraddrExecuteQuery();
  }
  onButAddQueryclick = () => {
    if (!this.vHeaderBlockModel.offenderBookId) {
      return false;
    }
    if (this.offcntperModel.personId) {
      return true;
    } else {
      this.type = 'info';
      this.message = this.translateService.translate('ocdperso.pleaseenterthepersoninformationbeforecallingocdapop');
      this.show();
      return false;
    }
  }

  onButAddNewContactClick = () => {
    if (!this.vHeaderBlockModel.offenderBookId) {
      return false;
    }
    const rowLength = this.offcntperData.length;
    for (let i = 0; i < this.offcntperData.length; i++) {
      if (!this.offcntperModel.personId) {
        const person = { 'pSearchType': 'N' };
        this.personData.person = person;
        return true;
      } else if (!this.offcntperData[i].contactType) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdperso.contacttypemust');
        this.show();
        return false;
      } else if (!this.offcntperData[i].relationshipType) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdperso.relationshipmust');
        this.show();
        return false;
      }
    }
    if (this.offcntperModel.personId) {
      const person = { 'pSearchType': 'I', 'pPersonId': this.offcntperModel.personId };
      this.personData.person = person;
      return true;
    } else {
      const person = { 'pSearchType': 'N' };
      this.personData.person = person;
      this.type = 'info';
      this.message = 'Click on Add button to add the new record';
      this.show();
      return false;
    }
  }

  onButSpecificNumbersclick = () => {
    if (!this.vHeaderBlockModel.offenderBookId) {
      return false;
    }
    if (this.peraddrModel.addressId) {
      return true;
    } else {
      this.type = 'info';
      this.message = this.translateService.translate('ocdperso.pleaseenterthepersonaddressinformationbeforecallingadderspecinum');
      this.show();
      return false;
    }
  }
  onButGlobalNumbersclick = () => {
    if (!this.vHeaderBlockModel.offenderBookId) {
      return false;
    }
    if (this.offcntperModel.personId) {
      return true;
    } else {
      this.type = 'info';
      this.message = this.translateService.translate('ocdperso.pleaseenterthepersonbeforecallingaglobalnumbers');
      this.show();
      return false;
    }
  }

  onButPersonProfileclick = () => {
    if (!this.vHeaderBlockModel.offenderBookId) {
      return false;
    }
    if (this.offcntperModel.personId) {
      return true;
    } else {
      this.type = 'info';
      this.message = this.translateService.translate('ocdperso.pleaseenterthepersoninformationbeforecallingcreatepersonprofile');
      this.show();
      return false;
    }
  }

  onButLinkedOffenderClick = () => {
    if (!this.vHeaderBlockModel.offenderBookId) {
      return false;
    }
    if (this.offcntperModel.personId) {
      return true;
    } else {
      this.type = 'info';
      this.message = this.translateService.translate('ocdperso.pleasecreateapersonbeforecallingaoffenderlinkedtoperson');
      this.show();
      return false;
    }
  }
  onRowClickperident(event) {
    this.peridentModel = new PersonIdentifiers();
    this.peridentModel = event;
  }

  numValidate = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.data.identifierType === 'SSN' && event.oldValue !== event.newValue && event.field === 'identifier') {
      const identifierNumber = { ssnNumber: String(event.newValue).trim() };
      if (identifierNumber.ssnNumber.length > 11) {
        this.type = 'info';
        this.message = this.translateService.translate('ocucoffe.ssnvalidation');
        this.show();
      }
      while (String(identifierNumber.ssnNumber).indexOf('-') >= 0 || String(identifierNumber.ssnNumber).indexOf(' ') >= 0) {
        identifierNumber.ssnNumber = String(identifierNumber.ssnNumber).replace('-', '');
        identifierNumber.ssnNumber = String(identifierNumber.ssnNumber).replace(' ', '');
      }
      if (String(identifierNumber.ssnNumber).length < 9) {
        this.type = 'info';
        this.message = this.translateService.translate('ocucoffe.ssnformatvalidation');
        this.show();
      }
    }
    if (event.data.identifierType === 'PNC' && event.oldValue !== event.newValue && event.field === 'identifier') {
      this.type = 'info';
      this.message = this.translateService.translate('ocdperso.thisisnotalegitimatepncnumber');
      this.show();
    }
    rowdata.validated = true;
    return rowdata;
  }

  onRowClickperemp(event) {
  }
  ok() {
  }
  no() {
  }
  cancel() {
  }
  onOffenderChange(offender) {
    this.vHeaderBlockModel = new VHeaderBlock();
    if (offender) {
      this.vHeaderBlockModel = offender;
      this.offcntperIndex = -1;
      this.offcntperData = [];
      this.peridentData = [];
      this.perempData = [];
      this.peraddrData = [];
      this.perinfoModel = new Persons();
      this.disabled = false;
      this.insertgrid = true;
     // this.identGridInsert = false;
      this.offcntperExecuteQuery();
      if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
        this.gridInsBtn = true;
      } else {
        this.gridInsBtn = false;
        this.gridDelBtn = false;
      }
    } else {
      this.insertgrid = false;
      this.disabled = true;
      this.disabledComment = true;
      this.vHeaderBlockModel = new VHeaderBlock();
      this.offcntperData = [];
      this.peridentData = [];
      this.perempData = [];
      this.peraddrData = [];
      this.identGridInsert = false;
      this.perinfoModel = new Persons();
      this.gridInsBtn = false;
      this.gridDelBtn = false;
    }
  }

  validateOffcntperRowChange = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    if (event.field === 'contactType') {
      if (event.field === 'contactType' && event.newValue !== event.oldValue) {
        this.grid.setColumnData("relationshipType", index, undefined)
      }
      rowdata.validated = true;
      return rowdata;
    } else if (event.field === 'activeFlag') {
      if (event.field === 'activeFlag' && String(event.oldValue) !== String(event.newValue)) {
        if (String(event.data.activeFlag) === 'false' || event.data.activeFlag === 'N') {
          const checkFutureVisitsData = this.ocdpersoFactory.checkFutureVisits(this.vHeaderBlockModel.offenderBookId,
            this.offcntperModel.personId);
          checkFutureVisitsData.subscribe(data => {
            if (data > 0) {
              /*
               *  confirmation dialauge for checkFutureVisits
               */
              const data = {
                label: this.translateService.translate('ocdperso.therearefuturevisits'), yesBtn: true, noBtn: true
              };
              this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                if (result) {
                  const cancelVisitsObj = this.ocdpersoFactory.cancelFutureVisits(this.vHeaderBlockModel.offenderBookId,
                    this.offcntperModel.personId);
                  cancelVisitsObj.subscribe(cancel => {
                  });
                } else {
                  rowdata.data = { activeFlag: true };
                }
                rowdata.validated = true;
                this.offcntperData[index]['expiryDate'] = DateFormat.getDate();
                return rowdata;
              });
            } else {
              rowdata.validated = true;
              this.offcntperData[index]['expiryDate'] = DateFormat.getDate();
              rowdata.data = { activeFlag: event.data.activeFlag };
              return rowdata;
            }
          });
        } else {
          rowdata.validated = true;
          this.offcntperData[index]['expiryDate'] = undefined;
          rowdata.data = { activeFlag: event.data.activeFlag };
          return rowdata;
        }
      }
      rowdata.validated = true;
      return rowdata;
    } else {
      rowdata.validated = true;
      return rowdata;
    }
  }

  canRelationEdit = (data: any, index: number, field: string): boolean => {
    if (field === 'relationshipType') {
      // this.relationShipLink = 'ocdperso/rgRelTypeRecordGroup?contactType=' + data.contactType;
    }
    return true;
  }

  /**
    * This function displays the messages
    */
  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }

  /**
  * This function loads the data into the Master Record and its child records
  */
  /*ocdpersoPopulateDetails() {
    this.offcntperModel = this.offcntperData[this.index];
    const serviceObj = this.ocdpersoFactory.
    perempExecuteQuery(offcntper);
    // TODOadd appropriate input varaibles
    serviceObj.subscribe(data=>{
    if(data != undefined && data.errorMessage.length > 0){
    }else{
      this.perempData = data;
    }
    });
  }*/

  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocdpersoSaveoffcntperForm(event) {
    // TODO declare commit bean and add insert list to that object.
    this.offcntperInsertList = event.added;
    this.offcntperUpdatetList = event.updated;
    this.offcntperDeleteList = event.removed;
    this.offcntperCommitModel.insertList = [];
    this.offcntperCommitModel.updateList = [];
    this.offcntperCommitModel.deleteList = [];
    for (let i = 0; i < this.offcntperData.length; i++) {
      if (!this.offcntperData[i].contactType) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdperso.contacttypemust');
        this.show();
        return;
      }
      if (!this.offcntperData[i].relationshipType) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdperso.relationshipmust');
        this.show();
        return;
      }
      if (!this.offcntperData[i].personId) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdperso.pleaseaddapersonbypressingtheaddnewcontact');
        this.show();
        return;
      }
      if (this.offcntperData[i].emergencyContactFlag) {
        this.offcntperData[i].emergencyContactFlag = 'Y';
      } else {
        this.offcntperData[i].emergencyContactFlag = 'N';
      }
      if (this.offcntperData[i].nextOfKinFlag) {
        this.offcntperData[i].nextOfKinFlag = 'Y';
      } else {
        this.offcntperData[i].nextOfKinFlag = 'N';
      }
      if (this.offcntperData[i].activeFlag) {
        this.offcntperData[i].activeFlag = 'Y';
      } else {
        this.offcntperData[i].activeFlag = 'N';
      }
    }
    if (this.offcntperInsertList.length > 0 || this.offcntperUpdatetList.length > 0) {
      for (let i = 0; i < this.offcntperInsertList.length; i++) {
        if (!this.offcntperInsertList[i].offenderBookId) {
          this.offcntperInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
        }
        if (!this.offcntperInsertList[i].createUserId) {
          this.offcntperInsertList[i].createUserId = this.sessionManager.getId();
          this.offcntperInsertList[i].createDatetime = DateFormat.getDate();
          this.offcntperInsertList[i].modifyDatetime = DateFormat.getDate();
        }


      }
      for (let i = 0; i < this.offcntperUpdatetList.length; i++) {
        this.offcntperUpdatetList[i].modifyUserId = this.sessionManager.getId();
        this.offcntperUpdatetList[i].modifyDatetime = DateFormat.getDate();
      }
      this.offcntperCommitModel.insertList = this.offcntperInsertList;
      this.offcntperCommitModel.updateList = this.offcntperUpdatetList;
    }
    if (this.offcntperDeleteList.length > 0) {
      for (let i = 0; i < this.offcntperDeleteList.length; i++) {
      }
      this.offcntperCommitModel.deleteList = this.offcntperDeleteList;
    }
    const offcntperSaveData = this.ocdpersoFactory.offCntPerCommit(this.offcntperCommitModel);
    offcntperSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'success';
        this.offcntperData = data;
        this.offcntperIndex = 0;
        this.disabled = false;
        this.offcntperExecuteQuery();
        this.peraddrData=[];
        this.peridentData=[];
        this.perinfoModel.lastName='';
        this.perinfoModel.firstName='';
        this.perinfoModel.middleName='';
        this.perinfoModel.sex='';
        this.perinfoModel.birthdate=null;
        this.perinfoModel.personId=null;
        this.perinfoModel.maritalStatus='';
        this.perinfoModel.languageCode='';
        this.perinfoModel.deceasedDate=null;
        this.perinfoModel.staffFlag=null;

        this.perempData=[];
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.show();
      } else {
        this.disabled = true;
        this.offcntperData = [];
         this.offcntperIndex = -1;
        this.type = 'warn';
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.offcntperExecuteQuery();
        this.show();
      }
    });
  }

  /*
  * off_cnt_per execute query
  */
  offcntperExecuteQuery() {
    this.offcntperModel = new OffenderContactPersons();
    this.offcntperModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    if (this.offcntperModel.offenderBookId) {
      const serviceObj = this.ocdpersoFactory.offCntPerExecuteQuery(this.offcntperModel);
      serviceObj.subscribe(data => {
        if (data.length === 0) {
          this.disabledChkBox = true;
          this.sexReadOnly = true;
          this.disabled = true;
          this.disabledChkBox1 = true;
          this.offcntperIndex = -1;
          this.offcntperData = [];
          this.identGridInsert = false;
        } else {
          for (let i = 0; i < data.length; i++) {
            data[i].emergencyContactFlag = data[i].emergencyContactFlag === 'Y' ? 'true' : undefined;
            data[i].nextOfKinFlag = data[i].nextOfKinFlag === 'Y' ? 'true' : undefined;
            data[i].activeFlag = data[i].activeFlag === 'Y' ? 'true' : undefined;
            data[i].button = 'assets/icons/eoff_icons/person_search_black_24dp.png';
          }
         // this.identGridInsert = true;
          this.offcntperData = data;
          this.offcntperModel = this.offcntperData[0];
          this.offcntperIndex = 0;
        }
      });
    }
  }

  peraddrExecuteQuery() {
    this.peraddrModel = new VPersonAddress();
    this.peraddrModel.personId = this.offcntperModel.personId;
    if (this.peraddrModel.personId) {
      const peraddrResult = this.ocdpersoFactory.perAddrExecuteQuery(this.peraddrModel);
      peraddrResult.subscribe(peraddrResultList => {
        if (peraddrResultList.length === 0) {
          this.peraddrData = [];
          this.peraddrIndex = -1;
        } else {
          for (let i = 0; i < peraddrResultList.length; i++) {
            peraddrResultList[i].primaryFlag = peraddrResultList[i].primaryFlag === 'Y' ? 'true' : undefined;
            peraddrResultList[i].mailFlag = peraddrResultList[i].mailFlag === 'Y' ? 'true' : undefined;
            peraddrResultList[i].activeFlag = peraddrResultList[i].activeFlag === 'Y' ? 'true' : undefined;
            peraddrResultList[i].isAddressValid = peraddrResultList[i].isAddressValid === 'Y' ? true : false;
          }
          this.peraddrData = peraddrResultList;
          this.peraddrIndex = 0;
          this.peraddrModel = peraddrResultList[0];
        }
      });
    }
  }
  peridentExecuteQuery() {
    this.peridentModel = new PersonIdentifiers();
    this.peridentModel.personId = this.offcntperModel.personId;
    if (this.offcntperModel.personId) {
      const peridentResult = this.ocdpersoFactory.perIdentExecuteQuery(this.peridentModel);
      peridentResult.subscribe(peridentResultList => {
        if (peridentResultList.length === 0) {
          this.peridentData = [];
          this.peridentIndex = -1;
        } else {
          this.peridentIndex = 0;
          this.peridentData = peridentResultList;
          this.peridentModel = peridentResultList[0];
        }
      });
    }
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocdpersoSaveperidentForm(event) {
    this.peridentInsertList = event.added;
    this.peridentUpdatetList = event.updated;
    this.peridentDeleteList = event.removed;
    this.peridentCommitModel.insertList = [];
    this.peridentCommitModel.updateList = [];
    this.peridentCommitModel.deleteList = [];
    for (let i = 0; i < this.peridentData.length; i++) {
      if (!this.peridentData[i].identifierType) {
        this.type = 'info';
        this.message = this.translateService.translate('ocdperso.typeofidmustbeentered');
        this.show();
        return;
      }
      if (!this.peridentData[i].identifier) {
        this.type = 'info';
        this.message = this.translateService.translate('ocdperso.numbermustbeentered');
        this.show();
        return;
      }
      if (this.peridentData[i].identifierType === 'SSN' && this.peridentData[i].identifier.toString().length > 11) {
        this.type = 'info';
        this.message = this.translateService.translate('ocucoffe.ssnvalidation');
        this.show();
        this.isvalid = true;
        return;
      }
      if (this.peridentData[i].identifierType === 'SSN' && this.peridentData[i].identifier.toString().length === 11) {
        this.peridentData[i].identifier = this.peridentData[i].identifier = String(this.peridentData[i].identifier).trim();
        while (String(this.peridentData[i].identifier).indexOf('-') >= 0 || String(this.peridentData[i].identifier).indexOf(' ') >= 0) {
          this.peridentData[i].identifier = String(this.peridentData[i].identifier).replace('-', '');
          this.peridentData[i].identifier = String(this.peridentData[i].identifier).replace(' ', '');
        }
      }

      if (this.peridentData[i].identifierType === 'SSN' && this.peridentData[i].identifier.toString().length !== 9) {
        this.type = 'info';
        this.message = this.translateService.translate('ocucoffe.ssnformatvalidation');
        this.show();
        this.isvalid = true;
        return;
      }
      if (this.peridentData[i].identifierType === 'PNC') {
        this.type = 'info';
        this.message = this.translateService.translate('ocdperso.thisisnotalegitimatepncnumber');
        this.show();
        return;
      }
      if (this.peridentData.length > 0) {
                const updCount = { repeat: 0, invalid: false };
                this.peridentData.forEach(element => {
                    if ((this.peridentData[i].identifierType === element.identifierType) &&
                        (this.peridentData[i].identifier === element.identifier)) {
                        updCount.repeat++;
                    }
                    if (updCount.repeat > 1) {
                        updCount.invalid = true;
                        return;
                    }
                });
                if (updCount.invalid) {
                       this.type = 'warn';
                       this.message = this.translateService.translate( 'ocdperso.rowexistswithidentifiertype' );
                       this.show();
                        return;
                      }
                }
    }
    if (this.peridentInsertList.length > 0 || this.peridentUpdatetList.length > 0) {
      for (let i = 0; i < this.peridentInsertList.length; i++) {
        this.peridentInsertList[i].createDatetime = DateFormat.getDate();
        this.peridentInsertList[i].createUserId = this.sessionManager.getId();
        if (!this.peridentInsertList[i].personId) {
          this.peridentInsertList[i].personId = this.offcntperModel.personId;
        }
      }
      for (let i = 0; i < this.peridentUpdatetList.length; i++) {
        this.peridentUpdatetList[i].modifyDatetime = DateFormat.getDate();
        this.peridentUpdatetList[i].modifyUserId = this.sessionManager.getId();
      }
      this.peridentCommitModel.insertList = this.peridentInsertList;
      this.peridentCommitModel.updateList = this.peridentUpdatetList;
    }
    if (this.peridentDeleteList.length > 0) {
      for (let i = 0; i < this.peridentDeleteList.length; i++) {
      }
      this.peridentCommitModel.deleteList = this.peridentDeleteList;
    }
    const peridentSaveData = this.ocdpersoFactory.perIdentCommit(this.peridentCommitModel);
    peridentSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'success';
        this.peridentData = data;
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.peridentExecuteQuery();
        this.show();
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
      }
    });
  }
  get saveDisable() {
    if (this.disCount > 1) {
      const temp = this.perinfoModel.middleName === "" ? null : this.perinfoModel.middleName;
      const temp1 = this.perinfoModel.sex ? this.perinfoModel.sex : null;
      const temp2 = this.perinfoModel.maritalStatus ? this.perinfoModel.maritalStatus : null;
      const temp3 = this.perinfoModel.languageCode ? this.perinfoModel.languageCode : null;
      if ((this.middleNameTemp !== temp) ||
        (this.sexTemp !== temp1) ||
        (this.birthdateTemp == null && this.perinfoModel.birthdate != null) || 
        (DateFormat.compareDate(DateFormat.getDate(this.birthdateTemp), DateFormat.getDate(this.perinfoModel.birthdate)) !== 0) ||
        (this.maritalStatusTemp !== temp2) ||
        (this.languageCodeTemp !== temp3) ||
        (this.interpreterRequiredTemp != this.perinfoModel.interpreterRequired) ||
        (this.deceasedDateTemp == null && this.perinfoModel.deceasedDate != null) || 
        (DateFormat.compareDate(DateFormat.getDate(this.deceasedDateTemp), DateFormat.getDate(this.perinfoModel.deceasedDate)) !== 0) ||
        (this.staffFlagTemp != this.perinfoModel.staffFlag)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  perinfoExecuteQuery() {
    this.perinfoModel = new Persons();
    this.perinfoModel.personId = this.offcntperModel.personId;
    if (this.offcntperModel.personId) {
      const perinfoResult = this.ocdpersoFactory.perInfoExecuteQuery(this.perinfoModel);
      perinfoResult.subscribe(perinfoResultList => {
        if (perinfoResultList.length === 0) {
          this.perinfoData = [];
          this.disCount++;
        } else {
          for (let i = 0; i < perinfoResultList.length; i++) {
            perinfoResultList[i].staffFlag = perinfoResultList[i].staffFlag === 'Y' ? true : false;
            perinfoResultList[i].interpreterRequired = perinfoResultList[i].interpreterRequired === 'Y' ? true : false;
          }
          this.perinfoData = perinfoResultList;
          this.perinfoModel = perinfoResultList[0];
          this.middleNameTemp = this.perinfoModel.middleName;
          this.sexTemp = this.perinfoModel.sex;
          this.birthdateTemp = this.perinfoModel.birthdate;
          this.maritalStatusTemp = this.perinfoModel.maritalStatus;
          this.languageCodeTemp = this.perinfoModel.languageCode;
          this.interpreterRequiredTemp = this.perinfoModel.interpreterRequired;
          this.deceasedDateTemp = this.perinfoModel.deceasedDate;
          this.staffFlagTemp = this.perinfoModel.staffFlag;
          this.disCount++;
        }
      });
    }
  }

  ocdpersoClearperinfoForm() {
    this.perinfoExecuteQuery();
  }

  onCntPerInsert = () => {
    for (let i = 0; i < this.offcntperData.length; i++) {
      if (!this.offcntperData[i].contactType) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdperso.contacttypemust');
        this.show();
        return;
      }
      if (!this.offcntperData[i].relationshipType) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdperso.relationshipmust');
        this.show();
        return;
      }
      if (!this.offcntperData[i].personId) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdperso.pleaseaddapersonbypressingtheaddnewcontact');
        this.show();
        return;
      }
    }
    this.disabledComment = false;
    return {
      personId: null, activeFlag: 'true',
      lastName: null, firstName: null, middleName: null
    };
  }

  onPerIdentInsert = () => {
    if ( this.offcntperData.length === 0 ) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdaddre.youcannotcreatearecordwithoutaparentrecord');
        this.show();
        return;
    } return { };
  }

  onPerEmpInsert = () => {
    if ( this.offcntperData.length === 0 ) {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdaddre.youcannotcreatearecordwithoutaparentrecord');
        this.show();
        return;
    }
    return { activeFlag: true };
  }

  validatePerEmpRow = (event) => {
    const formattedNumber=PhoneNumberUtils.getFormattedNumber(event.data.format, event.data.contactNumber).replace(/[- )(]/g,'');
    const selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    if (event.field === 'contactNumber' && event.newValue !== event.oldValue) {
      if (event.data.contactNumber === 'format') {
        this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
        PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
        this.peremptabGrid.setColumnData('contactNumber', index, null);
      }
      if (event.data.contactNumber) {
        if (!(String(event.data.contactNumber).length === formattedNumber.length)) {
          this.type = 'warn';
          this.message = this.translateService.translate
          ('common.fieldmustbeform').replace('%format%', selectedFormat.maskFormat);
          this.show();
        }
      }
    }
    
    rowdata.validated = true;
    return rowdata;
  }

  /**
  *  This function will be executed when commit event is
  * fired
  */
  ocdpersoSaveperinfoForm(date?,descdate?) {
    if (date) {
      if (date.lastValue === '0_/__/____') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.leapyearnotallowed');
        this.show();
        return;
      }
      if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.datemustbeentervalidformat');
        this.show();
        return;
      }
    }
    if (descdate) {
      if (descdate.lastValue === '0_/__/____') {
        this.type = 'warn';
        this.message = this.translateService.translate('common.leapyearnotallowed');
        this.show();
        return;
      }
      if (String(descdate.lastValue).indexOf('_') >= 0 && descdate.value === null) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.datemustbeentervalidformat');
        this.show();
        return;
      }
    }
    this.perinfoUpdatetList = [];
    if ( !this.offcntperModel && this.offcntperData.length > 0) {
      return;
    }
    this.perinfoUpdatetList.push(this.perinfoModel);
    this.perinfoCommitModel.insertList = [];
    this.perinfoCommitModel.updateList = [];
    this.perinfoCommitModel.deleteList = [];
    if (this.perinfoInsertList.length > 0 || this.perinfoUpdatetList.length > 0) {
      for (let i = 0; i < this.perinfoUpdatetList.length; i++) {
        if (!this.perinfoUpdatetList[i].lastName) {
          return;
        }
        if (!this.perinfoUpdatetList[i].firstName) {
          return;
        }
      }
      for (let i = 0; i < this.perinfoUpdatetList.length; i++) {
        this.perinfoUpdatetList[i].modifyDatetime = DateFormat.getDate();
        this.perinfoUpdatetList[i].modifyUserId = this.sessionManager.getId();
        const staffFlag = String(this.perinfoUpdatetList[i].staffFlag);
        if (this.perinfoUpdatetList[i].staffFlag && (staffFlag === 'true' || staffFlag === 'Y')) {
          this.perinfoUpdatetList[i].staffFlag = 'Y';
        } else {
          this.perinfoUpdatetList[i].staffFlag = 'N';
        }
        const interpreterRequired = String(this.perinfoUpdatetList[i].interpreterRequired);
        if (this.perinfoUpdatetList[i].interpreterRequired && (interpreterRequired === 'true' || interpreterRequired === 'Y')) {
          this.perinfoUpdatetList[i].interpreterRequired = 'Y';
        } else {
          this.perinfoUpdatetList[i].interpreterRequired = 'N';
        }
        if (this.perinfoUpdatetList[i].deceasedDate) {
          if (DateFormat.compareDate(DateFormat.getDate(this.perinfoUpdatetList[i].deceasedDate), DateFormat.getDate()) === 1) {
            this.type = 'info';
            this.message = this.translateService.translate('ocdperso.deceasedcannotbelaterthancurrentdate');
            this.show();
            return;
          }
        }
        if (this.perinfoUpdatetList[i].birthdate) {
          if (DateFormat.compareDate(DateFormat.getDate(this.perinfoUpdatetList[i].birthdate),
           DateFormat.getDate()) === 1) {
            this.type = 'info';
            this.message = this.translateService.translate('ocdperso.birthdatecannotbelaterthancurrentdate');
            this.show();
            return;
          }
        }
        if (this.perinfoUpdatetList[i].deceasedDate && this.perinfoUpdatetList[i].birthdate) {
          if (DateFormat.compareDate(DateFormat.getDate(this.perinfoUpdatetList[i].birthdate),
            DateFormat.getDate(this.perinfoUpdatetList[i].deceasedDate)) === 1) {
            this.type = 'info';
            this.message = this.translateService.translate('ocdperso.deceasedcannotbepriorthancurrentdate');
            this.show();
            return;
          }
        }
      }
      this.perinfoCommitModel.updateList = this.perinfoUpdatetList;
    }
    if (this.perinfoDeleteList.length > 0) {
      for (let i = 0; i < this.perinfoDeleteList.length; i++) {
      }
    }
    const perinfoSaveData = this.ocdpersoFactory.perInfoCommit(this.perinfoCommitModel);
    perinfoSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'success';
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.perinfoExecuteQuery();
        this.show();
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
      }
    });
  }
  perempExecuteQuery() {
    this.perempModel = new PersonEmployments();
    this.perempModel.personId = this.offcntperModel.personId;
    if (this.offcntperModel.personId) {
      const perempResult = this.ocdpersoFactory.perEmpExecuteQuery(this.perempModel);
      perempResult.subscribe(perempResultList => {
        if (perempResultList.length === 0) {
          this.perempData = [];
          this.perempIndex = -1;
        } else {
          for (let i = 0; i < perempResultList.length; i++) {
            perempResultList[i].activeFlag = perempResultList[i].activeFlag == 'Y' ? 'true' : undefined;
          }
          this.perempData = perempResultList;
          this.perempIndex = 0;
          this.perempModel = perempResultList[0];
        }
      });
    }
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocdpersoSaveperempForm(event) {
    this.perempInsertList = event.added;
    this.perempUpdatetList = event.updated;
    this.perempDeleteList = event.removed;
    this.perempCommitModel.insertList = [];
    this.perempCommitModel.updateList = [];
    this.perempCommitModel.deleteList = [];
    for (let i = 0; i < this.perempData.length; i++) {
      if (!this.perempData[i].employerName) {
        this.type = 'info';
        this.message = this.translateService.translate('ocdperso.employermustbeentered');
        this.show();
        return;
      }
      if (!this.perempData[i].format) {
        this.type = 'info';
        this.message = this.translateService.translate('common.formatmustbeentered');
        this.show();
        return;
      }
      if (!this.perempData[i].contactNumber) {
        this.type = 'info';
        this.message = this.translateService.translate('common.numbermustbeentered');
        this.show();
        return;
      }
      if (this.perempData[i].activeFlag) {
        this.perempData[i].activeFlag = 'Y';
      } else {
        this.perempData[i].activeFlag = 'N';
      }
      if (this.perempData[i].contactNumber) {
        const phoneNo = this.perempData[i].contactNumber;
        const formattedNumber=PhoneNumberUtils.getFormattedNumber(this.perempData[i].format, phoneNo).replace(/[- )(]/g,'');
        const selectedFormat = PhoneNumberUtils.contactType.find(x => this.perempData[i].format === x.maskingCode);
        if (!(phoneNo.length === formattedNumber.length) && this.perempData[i].format != 'UNF' ) {
          if(String(phoneNo).length >= 1 && formattedNumber.length) {
              this.type = 'warn';
              this.message = this.translateService.translate
              ('common.fieldmustbeform').replace('%format%', selectedFormat.maskFormat);
              this.show();
              // is.valid = false;
              return;
          }  else if (((String(phoneNo).length > 0 && !formattedNumber))){
              return true;
          }
        }
      }
    }
    if (this.perempInsertList.length > 0 || this.perempUpdatetList.length > 0) {
      for (let i = 0; i < this.perempInsertList.length; i++) {
        this.perempInsertList[i].personId = this.offcntperModel.personId;
        this.perempInsertList[i].createDatetime = DateFormat.getDate();
        this.perempInsertList[i].modifyDatetime = DateFormat.getDate();
        this.perempInsertList[i].createUserId = this.sessionManager.getId();

      }
      for (let i = 0; i < this.perempUpdatetList.length; i++) {
        this.perempUpdatetList[i].modifyDatetime = DateFormat.getDate();
        this.perempUpdatetList[i].modifyUserId = this.sessionManager.getId();
      }
      this.perempCommitModel.insertList = this.perempInsertList;
      this.perempCommitModel.updateList = this.perempUpdatetList;
    }
    if (this.perempDeleteList.length > 0) {
      for (let i = 0; i < this.perempDeleteList.length; i++) {
      }
      this.perempCommitModel.deleteList = this.perempDeleteList;
    }
    const perempSaveData = this.ocdpersoFactory.perEmpCommit(this.perempCommitModel);
    perempSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'success';
        this.perempData = data;
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.perempExecuteQuery();
        this.show();
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
      }
    });
  }

  onCntPerDelete = () => {
    if (this.offcntperModel.personId) {
      if (this.returnFlag) {
        return this.returnFlag;
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('ocdperso.cannotdeletemasterplzdezctivate');
        this.show();
      }
    } else {
      return true;
    }
  }

  onBirthDateClick(event) {
    if (this.perinfoModel.birthdate) {
      if (DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.birthdate), DateFormat.getDate()) === 1) {
        this.type = 'info';
        this.message = this.translateService.translate('ocdperso.birthdatecannotbelaterthancurrentdate');
        this.show();
        return;
      }
    }
    if (this.perinfoModel.deceasedDate && this.perinfoModel.birthdate) {
      if (DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.birthdate),
       DateFormat.getDate(this.perinfoModel.deceasedDate)) === 1) {
        this.type = 'info';
        this.message = this.translateService.translate('ocdperso.deceasedcannotbepriorthancurrentdate');
        this.show();
        return;
      }
    }
  }


  onDeceasedDateClick(event) {
    if (this.perinfoModel.deceasedDate) {
      if (this.perinfoModel.birthdate) {
        if (DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.birthdate),
         DateFormat.getDate(this.perinfoModel.deceasedDate)) === 1) {
          this.type = 'info';
          this.message = this.translateService.translate('ocdperso.deceasedcannotbepriorthancurrentdate');
          this.show();
          return;
        }
      }
      if (DateFormat.compareDate(DateFormat.getDate(this.perinfoModel.deceasedDate), DateFormat.getDate()) === 1) {
        this.type = 'info';
        this.message = this.translateService.translate('ocdperso.deceasedcannotbelaterthancurrentdate');
        this.show();
        return;
      }
    }
  }
/*
      *  This event is used to insert the data in HousingLocations Block.
      */
      onGridInsert = () => {
        for (let i = 0; i < this.offcntperData.length; i++) {
          if (!this.offcntperData[i].lastName) {  
            this.type = 'warn';
            this.message = this.translateService.translate('ocdperso.lastnamemust');
            this.show();
            return;
          }
           else if (!this.offcntperData[i].contactType) {  
            this.type = 'warn';
            this.message = this.translateService.translate('ocdperso.contacttypemust');
            this.show();
            return;
          } else if (!this.offcntperData[i].relationshipType) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdperso.relationshipmust');
            this.show();
            return ;
          }
        }

        let addedData = { button: 'assets/icons/eoff_icons/person_search_black_24dp.png', activeFlag: true };
        return addedData;
      }


      onMapsData(ev){
        this.onRowClickoffcntper(ev)
      }


      // get gridInsBtn() {
      //   if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
      //     return true;
      //   }
      //   return false;
      // }


  genderBlur() {
		if (!this.perinfoModel.sex) {
			this.perinfoModel.sex = this.perinfoModel.sex === '' ? undefined : '';
		}
  }
  
  maritalstatusBlur() {
		if (!this.perinfoModel.maritalStatus) {
			this.perinfoModel.maritalStatus = this.perinfoModel.maritalStatus === '' ? undefined : '';
		}
  }
  
  firstlanguageBlur() {
		if (!this.perinfoModel.languageCode) {
			this.perinfoModel.languageCode = this.perinfoModel.languageCode === '' ? undefined : '';
		}
	}	

  onGridClear = () => {
     this.offcntperExecuteQuery();
    return true;
  }
}
