import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OcucoffeService } from '../service/ocucoffe.service';
import { Offenders } from '@commonbeans/Offenders';
import { OffenderIdentifier } from '@instdemographicsbeans/OffenderIdentifier';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Global } from '@core/classes/Global';
import { OffendersCommitBean } from '@instdemographicsbeans/OffendersCommitBean';
import { OffenderIdentifiersCommitBean } from '@instdemographicsbeans/OffenderIdentifiersCommitBean';
import { TagSearchGetOffenderRecords } from '@commonbeans/TagSearchGetOffenderRecords';
import { TranslateService } from '@common/translate/translate.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VHeaderBlock2 } from '@commonbeans/VHeaderBlock2';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ocucoffe',
  templateUrl: './ocucoffe.component.html',
})

export class OcucoffeComponent implements OnInit, OnDestroy {
  @ViewChild('grid', { static: true }) grid: any;
  // Variable declaration
  selectedIdentifier = -1;
  offData: Offenders[] = [];
  offModel: Offenders = new Offenders();
  offInsertList: Offenders[] = [];
  offUpdatetList: Offenders[] = [];
  offDeleteList: Offenders[] = [];
  aliasData: Offenders[] = [];
  aliasModel: Offenders = new Offenders();
  aliasClickModel: Offenders = new Offenders();
  offidData: OffenderIdentifier[] = [];
  offidModel: OffenderIdentifier = new OffenderIdentifier();
  offenModel: Offenders = new Offenders();
  offidCommitModel: OffenderIdentifiersCommitBean = new OffenderIdentifiersCommitBean();
  offidInsertList: OffenderIdentifier[] = [];
  offidUpdatetList: OffenderIdentifier[] = [];
  offidDeleteList: OffenderIdentifier[] = [];
  msgs: any[] = [];
  msglist = [];
  message = ' Invalid.';
  type = 'error';
  aliascolumnDefs: any[];
  offidDataColumnDefs: any[];
  allOffidDataColumnDefs: any[] = [];
  VHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  offCommitModel: OffendersCommitBean = new OffendersCommitBean();
  translateLabel: any;
  offenderidflag: boolean;
  readonly: boolean;
  shwBtnLbl: string;
  shwBtnToggle: boolean;
  identifierTitle: string;
  isvalid = false;
  isLastName: boolean;
  isFirstName: boolean;
  isMiddleName: boolean;
  isgender: boolean;
  isSex: boolean;
  isdob: boolean;
  ishowId: boolean;
  israce = false;
  minValidAge: number;
  repeat = true;
  aliasAge: number;
  changed: number;
  SystemDate: Date = DateFormat.getDate();
  global = { firstName: null };
  selectedAlias = -1;
  sysprofModel = new SystemProfiles();
  isSecondMiddleName: boolean;
  offenderIdentifier : OffenderIdentifier = new OffenderIdentifier();
  offenderIdentifierInsertList : OffenderIdentifier [] = [];
  constructor(private ocucoffeFactory: OcucoffeService,
    private osiosearservice: OsiosearService,
    public translateService: TranslateService,
    private offenderSearchService: OffenderSearchService,
    private sessionManager: UserSessionManager,
    public dialogService: DialogService,
    private router: Router) {
  }
  ngOnInit() {

    this.translateLabel = JSON.parse(sessionStorage.getItem('i18data'));
    this.VHeaderBlockModel = Global.offender;
    this.offModel.lastName = this.osiosearservice.data.pLastName;
    this.offModel.middleName = this.osiosearservice.data.pMiddleName;
    this.offModel.firstName = this.osiosearservice.data.pFirstName;
    this.offModel.birthDate = this.osiosearservice.data.pBirthDate;
    if (this.offModel.birthDate) {
      if(!(this.offModel.birthDate instanceof Date)) {
        this.offModel.birthDate = DateFormat.getDate(this.offModel.birthDate);
      } 
      this.setAge(this.offModel.birthDate);
    }
    this.offModel.sexCode = this.osiosearservice.data.pSexCode;
    this.offModel.genderCode = this.osiosearservice.data.pGenderCode;
    this.offModel.idSourceCode = 'SEQ';
    this.offModel.secondMiddleName = this.osiosearservice.data.secondMiddleName;
    this.isLastName = (this.osiosearservice.data.pLastName) ? true : false;
    this.isFirstName = (this.osiosearservice.data.pFirstName) ? true : false;
    this.isMiddleName = (this.osiosearservice.data.pMiddleName) ? true : false;
    this.isgender = (this.osiosearservice.data.pGenderCode) ? true : false;
    this.isSex = (this.osiosearservice.data.pSexCode) ? true : false;
    this.isdob = (this.osiosearservice.data.pBirthDate) ? true : false;
    this.isSecondMiddleName = (this.osiosearservice.data.secondMiddleName) ? true : false;
    if (this.isLastName) {
      this.ocucoffeFactory.data.pLastName = this.offModel.lastName;
    }
    if (this.isFirstName) {
      this.ocucoffeFactory.data.pFirstName = this.offModel.firstName;
    }
    if (this.isMiddleName) {
      this.ocucoffeFactory.data.pMiddleName = this.offModel.middleName;
    }
    if (this.isgender) {
      this.ocucoffeFactory.data.pGenderCode = this.offModel.genderCode;
    }
    if (this.isSex) {
      this.ocucoffeFactory.data.pSexCode = this.offModel.sexCode;
    }
    if (this.isdob) {
      this.offModel.birthDate = DateFormat.getDate(this.offModel.birthDate);
      this.ocucoffeFactory.data.pBirthDate = DateFormat.getDate(this.offModel.birthDate);
    }
    if (this.isSecondMiddleName) {
      this.ocucoffeFactory.data.secondMiddleName = this.offModel.secondMiddleName;
    }
    this.ocucoffeFactory.data.offenderIdDisplay = this.offModel.offenderIdDisplay;
    this.shwBtnLbl = this.translateService.translate('ocucoffe.Showallid');
    this.identifierTitle = this.translateService.translate('ocucoffe.identifiers');
    this.shwBtnToggle = false;
    this.ishowId = true;

    this.aliascolumnDefs = [
      {
        fieldName: this.translateService.translate('system-profile.name-last') + '*', field: 'lastName', id: 'cfegrdlastname',
        maxlength: 35, required: true, datatype: 'text', editable: true, cellEditable: this.canAliasEdit, width: 160
      },
      {
        fieldName: this.translateService.translate('system-profile.name-given-1') + '*', field: 'firstName',
        id: 'cfegrdfname', maxlength: 35, required: true, datatype: 'text', cellEditable: this.canAliasEdit, editable: true,
        width: 160
      },
      {
        fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName',
        id: 'cfegrdmname', maxlength: 35, datatype: 'text', cellEditable: this.canAliasEdit, editable: true, width: 160
      },
      {
        fieldName: this.translateService.translate('ocucoffe.secondmiddlename'), field: 'secondMiddleName',
        id: 'cfegrdsmname', maxlength: 35,  datatype: 'text', cellEditable: this.canAliasEdit, editable: true,
        width: 160
      },
      {
        fieldName: this.translateService.translate('system-profile.birth-date') + '*', field: 'birthDate',
        id: 'cfegrddob', datatype: 'date', cellEditable: this.canAliasEdit, editable: true, width: 160
      },
      {
        fieldName: this.translateService.translate('common.age'), field: 'age',
        id: 'cfegrdage', cellEditable: this.canAliasEdit, editable: true, width: 160
      },
      {
        fieldName: this.translateService.translate('ocucoffe.sex') + '*', field: 'sexCode',
        id: 'cfegrdsex', datatype: 'lov', domain: 'SEX', cellEditable: this.canAliasEdit, editable: true, width: 160
      },
      {
        fieldName: this.translateService.translate('ocucoffe.gender'), field: 'genderCode',
        id: 'cfegrdgen', datatype: 'lov', domain: 'GENDER', cellEditable: this.canAliasEdit, editable: true, width: 160
      },
      {
        fieldName: this.translateService.translate('system-profile.pers-id-race'), field: 'raceCode',
        id: 'cfegrdrac', datatype: 'lov', domain: 'ETHNICITY',
        editable: true, width: 160, cellEditable: this.canAliasEdit, optionWidth: 300
      },
      {
        fieldName: this.translateService.translate('ocucoffe.suffix'), field: 'suffix', id: 'cfegrdsfx',
        datatype: 'lov', domain: 'SUFFIX', cellEditable: this.canAliasEdit, editable: true, width: 160,
        optionWidth: 300
      },
      {
        fieldName: '', field: 'test', hide: true
      }
    ];

    this.offidDataColumnDefs = [
      {
        fieldName: this.translateService.translate('common.type') + '*', id: 'cfegrdtype', field: 'identifierType',
        required: true, datatype: 'lov', domain: 'ID_TYPE', cellEditable: this.canOIdenEdit, editable: true, width: 300,
        optionWidth: 350
      },
      {
        fieldName: this.translateService.translate('common.number') + '*', id: 'cfegrdnumb', field: 'identifier',
        editable: true, width: 300, maxlength: 20, datatype: 'text', cellEditable: this.canOIdenEdit, required: true,
        mask: this.getMask
      },
      {
        fieldName: this.translateService.translate('common.comment'), id: 'cfegrdcmt', field: 'issuedAuthorityText',
        editable: true, width: 300, datatype: 'text', uppercase: 'false', cellEditable: this.canOIdenEdit, maxlength: 40
      },
      {
        fieldName: this.translateService.translate('common.verify'), id: 'cfegrdviry', field: 'verifiedFlag',
        datatype: 'checkbox', editable: true, cellEditable: this.canOIdenEdit, width: 300
      },
    ];

    this.allOffidDataColumnDefs = [
      {
        fieldName: this.translateService.translate('common.type'), id: 'allcfegrdtype', field: 'identifierType',
        required: true, datatype: 'lov', domain: 'ID_TYPE', cellEditable: this.canOIdenEdit, editable: true, width: 300
      },
      {
        fieldName: this.translateService.translate('common.number'), id: 'cfegrdnumb', field: 'identifier',
        editable: true, width: 300, maxlength: 20, datatype: 'text', cellEditable: this.canOIdenEdit, required: true,
        mask: this.getMask
      },
      {
        fieldName: this.translateService.translate('common.comment'), id: 'cfegrdcmt', field: 'issuedAuthorityText',
        editable: true, width: 300, datatype: 'text', cellEditable: this.canOIdenEdit, maxlength: 40
      },
      {
        fieldName: this.translateService.translate('common.verify'), id: 'cfegrdviry', field: 'verifiedFlag',
        datatype: 'checkbox', editable: true, cellEditable: this.canOIdenEdit, width: 300
      },
    ];

    this.offenderidflag = true;
    const validAge = this.ocucoffeFactory.getOffenderMinAge(this.sessionManager.currentCaseLoad);
    validAge.subscribe(age => {
      this.minValidAge = age;
    });

    const sysDate = this.ocucoffeFactory.ocucoffeGetCurrentDate();
    sysDate.subscribe(dbDate => {
      this.SystemDate = DateFormat.getDate(dbDate);
    });

    const sysProfileData = this.ocucoffeFactory.ageValidationvsRangecur();
    sysProfileData.subscribe(dataObj => {
      this.sysprofModel = dataObj;
    });
  }
  onRowClickoffid(event) {
    this.offidModel = new OffenderIdentifier();
    this.offidModel = event.data;

  }
  onShowAllclick() {
    if (this.offidData.length < 1) {
      this.show(this.translateService.translate('ocucoffe.offmustexit'), 'warn');
    }
    if (!this.shwBtnToggle && this.changed !== this.offidData.length) {
      this.show(this.translateService.translate('ocucoffe.commitformfirst'), 'warn');
      return;
    }
    this.shwBtnToggle = !this.shwBtnToggle;
    if (this.shwBtnToggle) {
      this.ocucoffeIdentifiersPopulateDetails(null, this.offModel.rootOffenderId);
      this.shwBtnLbl = this.translateService.translate('common.close');
      this.identifierTitle = this.translateService.translate('ocucoffe.allidentifiers');
    } else {
      this.ocucoffeIdentifiersPopulateDetails(this.aliasClickModel.offenderId, null);
      this.shwBtnLbl = this.translateService.translate('ocucoffe.Showallid');
      this.identifierTitle = this.translateService.translate('ocucoffe.identifiers');
    }
  }
  ocucoffePopulateDetails(rootOffenderId) {
    if (rootOffenderId) {
      this.offenModel = new Offenders();
      this.offenModel.rootOffenderId = rootOffenderId;
      const serviceObj = this.ocucoffeFactory.
        aliasExecuteQuery(this.offenModel);
      serviceObj.subscribe(data => {
        if (data) {
          this.aliasData = data;
          this.selectedAlias = 0;
          if (!this.offModel.offenderId) {
            this.offModel = this.aliasData[0];
            this.offenderSearchService.selectedOffender = this.offModel;
            this.osiosearservice.selectOffender = new VHeaderBlock2();
            this.osiosearservice.selectOffender.offenderId = this.offModel.offenderId;
            this.osiosearservice.selectOffender.offenderIdDisplay = this.offModel.offenderIdDisplay;
            this.osiosearservice.selectOffender.rootOffenderId = this.offModel.rootOffenderId;
            this.osiosearservice.selectOffender.lastName = this.offModel.lastName;
            this.osiosearservice.selectOffender.firstName = this.offModel.firstName;
            this.osiosearservice.selectOffender.middleName = this.offModel.middleName;
            this.osiosearservice.selectOffender.suffix = this.offModel.suffix;
            this.osiosearservice.selectOffender.birthDate = this.offModel.birthDate;
            this.osiosearservice.selectOffender.age = this.offModel.age;
            this.osiosearservice.selectOffender.gender = this.offModel.sexCode;
            this.osiosearservice.selectOffender.offenderBookId = 0;
            this.osiosearservice.selectOffender.sex = this.offModel.sexCodeDesc;

            
            this.offenderSearchService.selectedOffender['gender'] = this.offModel.sexCode;
            this.osiosearservice.selectOffender.offenderIdDisplay = this.offModel.offenderIdDisplay;
          }
          this.offModel.birthDate = DateFormat.getDate(this.offModel.birthDate);
          if (this.osiosearservice.data['pinFlag']) {
            this.offenderIdentifierInsertList = [];
            this.offenderIdentifier.rootOffenderId = this.osiosearservice.selectOffender.rootOffenderId ;
            this.offenderIdentifier.identifier =  this.osiosearservice.data.pin;
            this.offenderIdentifier.identifierType = 'PIN';
            this.offenderIdentifier.offenderId = this.osiosearservice.selectOffender.offenderId;
            this.offenderIdentifier.verifiedFlag = 'N'; 
            this.offenderIdentifierInsertList.push(JSON.parse(JSON.stringify(this.offenderIdentifier)));

            if(this.osiosearservice.data.pnin != null && this.osiosearservice.data.pnin != undefined && this.osiosearservice.data.pnin != '') {
              this.offenderIdentifier.rootOffenderId = this.osiosearservice.selectOffender.rootOffenderId ;
              this.offenderIdentifier.identifier =  this.osiosearservice.data.pnin;
              this.offenderIdentifier.identifierType = 'PNIN';
              this.offenderIdentifier.offenderId = this.osiosearservice.selectOffender.offenderId;
              this.offenderIdentifier.verifiedFlag = 'N'; 
              this.offenderIdentifierInsertList.push(JSON.parse(JSON.stringify(this.offenderIdentifier)));
            }

            this.offidCommitModel.insertList = this.offenderIdentifierInsertList;
            const offidSaveData = this.ocucoffeFactory.offIdCommit(this.offidCommitModel);
            offidSaveData.subscribe(data => {
              if(data === 1){
                this.ocucoffeIdentifiersPopulateDetails(this.osiosearservice.selectOffender.offenderId,this.osiosearservice.selectOffender.rootOffenderId);
                this.osiosearservice.data['pinFlag'] = false;
                //this.router.navigate(['/OSIOSEAR']); 
                this.osiosearservice.navigationFlag = false;
                this.offenderSearchService.selectedOffender = this.aliasData[0];
              }
             });
          }
        } else {
          this.aliasData = [];
        }
      });
    }
  }
  onRowClickoff(event) {
    if (event) {
      this.aliasModel = new Offenders();
      this.aliasModel = event;
      this.aliasClickModel = event;
      this.shwBtnToggle = false;
      if (this.aliasClickModel.offenderId) {
        this.ocucoffeIdentifiersPopulateDetails(this.aliasClickModel.offenderId, null);
      } else {
        this.offidData = [];
      }

    }
  }
  ocucoffeSaveoffForm(event) {
    this.offInsertList = [];
    this.offInsertList = event.added;
    if (this.offAliasCommitValidation(this.offInsertList)) {
      return;
    }
    this.offUpdatetList = event.updated;
    this.offDeleteList = event.removed;
    this.isvalid = false;
    if (this.offModel.idSourceCode === 'SEQ') {
      this.offenderidflag = true;

    }
    this.offCommitModel.insertList = [];
    this.offCommitModel.deleteList = [];
    if (event.added.length === 0) {
      if (this.offModel.offenderId) {
        this.offModel.offenderIdDisplay = String(this.offModel.offenderId);
      }
      this.offInsertList.push(this.offModel);
    }
    const ageLimit = { validAge: false };
    this.offInsertList.forEach(offInsert => {
      const vageFrom = (this.sysprofModel.profileValue) ? this.sysprofModel.profileValue : 0;
      const vageTo = (this.sysprofModel.profileValue) ? this.sysprofModel.profileValue2 : 0;
      if (offInsert.age === 0) {
        ageLimit.validAge = true;
      } else if (offInsert.age > 0 && (offInsert.age < Number(vageFrom) || offInsert.age > Number(vageTo))) {
        ageLimit.validAge = true;
      }
      // if (offInsert.age < this.minValidAge || offInsert.age > 99) {
      //   ageLimit.validAge = true;
      //   return;
      // }
    });
    if (ageLimit.validAge) {
      const data = {
        label: this.translateService.translate('ocucoffe.datelimit'), yesBtn: true, noBtn: true
      };
      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
        if (result) {
          this.offAliasCommit();
        } else {
          this.grid.setColumnData('test', 0, undefined);
          this.grid.setColumnData('test', 0, result);
        }

      });
    } else {
      this.offAliasCommit();
    }

  }
  offAliasCommitValidation(arrData: any[]) {
    this.isvalid = false;
    if (arrData && arrData.length > 0) {
      arrData.forEach(offInsert => {
        if (!offInsert.lastName) {
          this.show(this.translateService.translate('common.lastnamemustbeentered'), 'warn');
          this.isvalid = true;
          return true;
        }
        if (!offInsert.firstName) {
          this.show(this.translateService.translate('ocucoffe.firstnamemustbeentered'), 'warn');
          this.isvalid = true;
          return true;
        }
        if (!offInsert.birthDate) {
          this.show(this.translateService.translate('common.birthdatemustbeselect'), 'warn');
          this.isvalid = true;
          return true;
        }
        if (DateFormat.compareDate(DateFormat.getDate(offInsert.birthDate), DateFormat.getDate()) > 0) {
          this.show(this.translateService.translate('common.birthdatemustbeless'), 'warn');
          this.isvalid = true;
          return true;
        }
        if (!offInsert.sexCode) {
          this.show(this.translateService.translate('common.sexmustbeselect'), 'warn');
          this.isvalid = true;
          return true;
        }
        if (offInsert === this.global.firstName) {
          this.show(this.translateService.translate('ocucoffe.plzenterfirst') + this.global.firstName, 'warn');
          return true;
        }
        const cDate = DateFormat.getDate(this.SystemDate);
        cDate.setHours(0, 0, 0, 0);
        if ((DateFormat.compareDate(offInsert.birthDate, DateFormat.getDate(cDate))) >= 0) {
          this.show(this.translateService.translate('common.birthdatemustbeless'), 'warn');
          this.isvalid = true;
          return true;
        }
      });
      return this.isvalid;
    }
  }
  dateBlur() {
    if (this.offModel.birthDate && (DateFormat.compareDate(this.offModel.birthDate, DateFormat.getDate())) >= 0) {
      //  this.show(this.translateService.translate('common.birthdatemustbeless'), 'warn');
      return true;
    }
  }
  offAliasCommit() {
    this.offInsertList.forEach(offInsert => {
      offInsert.lastNameKey = this.offModel.lastName;
      offInsert.offenderIdDisplay = this.offModel.offenderIdDisplay;
      offInsert.idSourceCode = this.offModel.idSourceCode;
      offInsert.rootOffenderId = this.offModel.rootOffenderId;
      offInsert.idSourceCode = this.offModel.idSourceCode;
      offInsert.aliasNameType = (this.aliasData.length > 0) ? 'A' : 'WORKING';
      offInsert.aliasOffenderId = (this.aliasData.length > 0) ? this.offModel.offenderId : null;
      offInsert.offenderNameSeq = (this.aliasData.length > 0) ? null : 1;
    });
    if (this.isvalid) {
      return;
    }
    this.offCommitModel.insertList = this.offInsertList;
    const offSaveData = this.ocucoffeFactory.offCommit(this.offCommitModel);
    offSaveData.subscribe(offSaveResult => {
      if (offSaveResult) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.ocucoffePopulateDetails(offSaveResult);
        this.offenderidflag = true;
        this.readonly = true;
        this.isLastName = true;
        this.isFirstName = true;
        this.isMiddleName = true;
        this.isdob = true;
        this.israce = true;
        this.isgender = true;
        this.isSex = true;
        this.offenderidflag = true;
        this.isSecondMiddleName = true;
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
        this.ocucoffePopulateDetails(offSaveResult);
      }
    });
  }

  // execute query
  ocucoffeexecuteQuery() {
    this.offModel.lastName = this.VHeaderBlockModel.lastName;
    const serviceObj = this.ocucoffeFactory.offExecuteQuery(this.offModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
      } else if (data !== undefined && data.length > 0 && data.errorMessage.length > 0) {
      } else {
        this.offData = data;
        this.offModel = this.offData[0];
      }
    });
  }


  ocucoffeIdentifiersPopulateDetails(offenderId, rootOffenderId) {
    if (offenderId || rootOffenderId) {
      this.offidModel = new OffenderIdentifier();
      this.offidModel.offenderId = offenderId;
      this.offidModel.rootOffenderId = rootOffenderId;
      const serviceObj = this.ocucoffeFactory.
        offidExecuteQuery(this.offidModel);
      serviceObj.subscribe(data => {
        if (data.length > 0) {
          data.forEach(verify => {
            verify.verifiedFlag = (verify.verifiedFlag === 'Y') ? true : false;
          });
          this.offidData = data;
          this.selectedIdentifier = 0;
          this.ishowId = false;
          this.changed = this.offidData.length;
        } else {
          this.offidData = data;

        }
      });
    }
  }

  ocucoffeIdentifiersExecuteQuery() {
    this.aliasModel.offenderId = this.VHeaderBlockModel.offenderId;

    const offidResult = this.ocucoffeFactory.offidExecuteQuery(this.aliasModel);
    offidResult.subscribe(data => {
      const offidResultList = JSON.parse(data.toString());
      if (offidResultList.length === 0) {
        this.offidData = [];
      } else {
        this.offidData = offidResultList;
        this.offidData = offidResultList[0];
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocucoffeidentifiersSaveoffidForm(event) {
    this.isvalid = false;
    if (this.aliasClickModel.offenderId) {
      this.offidInsertList = event.added;
      this.offidUpdatetList = event.updated;
      this.offidDeleteList = event.removed;
      for (let i = 0; i < this.offidData.length; i++) {
        for (let j = 0; j < this.offidData.length; j++) {
          if (i !== j) {
            if (this.offidData[i].identifierType === this.offidData[j].identifierType &&
              this.offidData[i].identifier.trim() === this.offidData[j].identifier.trim()) {
              this.show(this.translateService.translate('ocucoffe.duplicateidentifiers'), 'warn');
              return;
            }
          }
        }
      }
      this.offidInsertList.forEach(offIdInsert => {
        if (!offIdInsert.identifierType) {
          this.show(this.translateService.translate('ocucoffe.typemustbeentered'), 'warn');
          this.isvalid = true;
          return;
        }
        if (!offIdInsert.identifier) {
          this.show(this.translateService.translate('common.numbermustbeentered'), 'warn');
          this.isvalid = true;
          return;
        }
        if (offIdInsert.identifierType === 'SSN' && offIdInsert.identifier.toString().length > 11) {
          this.show(this.translateService.translate('ocucoffe.ssnvalidation'), 'warn');
          this.isvalid = true;
          return;
        }
        if (offIdInsert.identifierType === 'SSN' && offIdInsert.identifier.toString().length === 11) {
          offIdInsert.identifier = offIdInsert.identifier = String(offIdInsert.identifier).trim();
          while (String(offIdInsert.identifier).indexOf('-') >= 0 || String(offIdInsert.identifier).indexOf(' ') >= 0) {
            offIdInsert.identifier = String(offIdInsert.identifier).replace('-', '');
            offIdInsert.identifier = String(offIdInsert.identifier).replace(' ', '');
          }
        }

        if (offIdInsert.identifierType === 'SSN' && offIdInsert.identifier.toString().length !== 9) {
          this.show(this.translateService.translate('ocucoffe.ssnformatvalidation'), 'warn');
          this.isvalid = true;
          return;
        }

        offIdInsert.verifiedFlag = (offIdInsert.verifiedFlag) ? 'Y' : 'N';
        offIdInsert.rootOffenderId = this.aliasClickModel.rootOffenderId;
        offIdInsert.offenderId = this.aliasClickModel.offenderId;
      });
      if (this.isvalid) {
        return;
      }
      this.offidUpdatetList.forEach(offIdUpdate => {
        offIdUpdate.verifiedFlag = (offIdUpdate.verifiedFlag) ? 'Y' : 'N';
      });
      this.offidDeleteList = [];
      this.offidCommitModel.insertList = [];
      this.offidCommitModel.deleteList = [];
      this.offidCommitModel.insertList = this.offidInsertList;
      this.offidCommitModel.updateList = this.offidUpdatetList;

      const offidSaveData = this.ocucoffeFactory.offIdCommit(this.offidCommitModel);
      offidSaveData.subscribe(offidSaveResult => {
        if (offidSaveResult && String(offidSaveResult).indexOf('ORA-00001') > 0) {
          if (String(offidSaveResult).indexOf('OFFENDERS_PK') > 0) {
            this.show(this.translateService.translate('ocucoffe.duplicateoffendername'), 'warn');
            return;
          }
          if (String(offidSaveResult).indexOf('OFFENDER_IDENTIFIERS_UK1') > 0) {
            this.show(this.translateService.translate('ocucoffe.duplicateidentifiers'), 'warn');
            return;
          }
          if (String(offidSaveResult).indexOf('OFFENDER_NAME_IDENTIFIERS_PK') > 0) {
            this.show(this.translateService.translate('ocucoffe.rowalredywithseq'), 'warn');
            return;
          }
        }
        if (offidSaveResult && String(offidSaveResult).indexOf('ORA-02290') > 0) {
          const serverError = String(offidSaveResult).split(':');
          this.show(serverError[1], 'warn');
          return;
        }
        if (offidSaveResult && String(offidSaveResult) === 'Invalid PNC') {
          this.show(this.translateService.translate('ocucoffe.invalidpnc'), 'warn');
        }
        if (offidSaveResult && String(offidSaveResult) === 'PNC Exist') {
          this.show(this.translateService.translate('ocucoffe.duplicatepnc'), 'warn');
        }
        this.offidData.forEach(element => {
          element.verifiedFlag = (element.verifiedFlag === 'N') ? null : element.verifiedFlag;
        });
        if (String(offidSaveResult) === '1') {
          this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
          this.ocucoffeIdentifiersPopulateDetails(this.aliasClickModel.offenderId, null);
        } else {
          this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
          this.ocucoffeIdentifiersPopulateDetails(this.aliasClickModel.offenderId, null);
        }
      });
    }
  }
  show(vldmsg, type) {
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  setAge(event) {
    if (!event) {
      this.offModel.age = 0;
    } else {
      if (this.offModel.birthDate && this.offModel.birthDate instanceof Date && !this.dateBlur()) {
        const ageData = this.ocucoffeFactory.agevalidationvsagecur(this.offModel);
        ageData.subscribe(age => {

          this.offModel.age = age;
        });
      }
    }
  }
  setAliasAge() {
    const ageData = this.ocucoffeFactory.agevalidationvsagecur(this.offModel);
    ageData.subscribe(age => {

      this.aliasAge = age;
    });
  }


  saveOffender() {
    const validateData = [];
    validateData.push(this.offModel);
    if (!this.offAliasCommitValidation(validateData)) {
      if (!this.offModel.rootOffenderId) {
        if (!this.offModel.idSourceCode) {
          this.show(this.translateService.translate('ocucoffe.idsouorcemustbeentered'), 'warn');
          return;
        }
        if (this.offModel.idSourceCode === 'USER' && !this.offModel.offenderIdDisplay) {
          this.show(this.translateService.translate('ocucoffe.idmustbeentered'), 'warn');
          return;
        }
        if (Number(this.offModel.birthDate.getFullYear()) <= 0) {
          this.show(this.translateService.translate('ocucoffe.dateformat'), 'warn');
          return;
        }
        const serOffIdDisplay = this.ocucoffeFactory.checkOffenderIdDisplay(this.offModel.offenderIdDisplay);
        serOffIdDisplay.subscribe(check => {
          if (check && String(check).indexOf('Exception') > 0) {
            this.show(this.translateService.translate('ocucoffe.whilegather'), 'warn');
            return;
          }
          if (Number(check) > 0 && (this.offModel.idSourceCode === 'USER' || this.repeat)) {
            if (this.offModel.idSourceCode !== 'USER' && this.repeat) {
              this.repeat = false;
            }
            this.show(this.translateService.translate('ocucoffe.uniqueid'), 'warn');
            return;
          }
          const event = { added: [], updated: [], removed: [] };
          if (this.offModel.lastName && this.offModel.birthDate) {
            const serObj = this.ocucoffeFactory.validatealiasescheckdupnamecur(this.offModel);
            serObj.subscribe(data => {
              if (data > 0) {
                const Dialogdata = {
                  label: this.translateService.translate('ocucoffe.lastnamedob'), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 30).subscribe(result => {
                  if (result) {
                    this.ocucoffeSaveoffForm(event);
                  }

                });
              } else {
                this.ocucoffeSaveoffForm(event);
              }
            });
          } else {

            this.ocucoffeSaveoffForm(event);
          }
        });
      }
    }

  }


  onIdSourceChange() {
    if (this.offModel.idSourceCode === 'USER') {
      this.offenderidflag = false;
    } else {
      this.offModel.offenderIdDisplay = null;
      this.offenderidflag = true;
    }
  }
  addAlies = () => {

    if (this.aliasData.length > 0) {
      const rowData = this.aliasData[this.aliasData.length - 1];
      if (!rowData.lastName) {
        this.show(this.translateService.translate('common.lastnamemustbeentered'), 'warn');
        return null;
      }
      if (!rowData.firstName) {
        this.show(this.translateService.translate('ocucoffe.firstnamemustbeentered'), 'warn');
        return null;
      }
      if (!rowData.sexCode) {
        this.show(this.translateService.translate('common.sexmustbeselect'), 'warn');
        return null;
      }
      if (!rowData.birthDate) {
        this.show(this.translateService.translate('common.birthdatemustbeselect'), 'warn');
        return null;
      }
      if (DateFormat.compareDate(DateFormat.getDate(rowData.birthDate), DateFormat.getDate()) > 0) {
        this.show(this.translateService.translate('common.birthdatemustbeless'), 'warn');
        return null;
      }
    }
    if (this.offModel.rootOffenderId) {
      return { birthDate: this.offModel.birthDate, age: this.offModel.age, sexCode: this.offModel.sexCode, genderCode: this.offModel.genderCode };
    } else {
      this.show(this.translateService.translate('ocucoffe.pleasecreatethe'), 'warn');
      return null;
    }
  }
  addIdentifiers = () => {
    if (this.aliasClickModel.offenderId) {
      if (this.offidData.length > 0) {
        if (!this.offidData[this.offidData.length - 1].identifierType) {
          this.show(this.translateService.translate('ocucoffe.typemustbeentered'), 'warn');
          return null;
        } if (!this.offidData[this.offidData.length - 1].identifier) {
          this.show(this.translateService.translate('ocucoffe.numbermustbeentered'), 'warn');
          return null;
        }
        if (this.offidData[this.offidData.length - 1].identifierType === 'SSN') {
          const identifierNumber = { ssnNumber: this.offidData[this.offidData.length - 1].identifier.trim() };
          if (String(identifierNumber.ssnNumber).length > 11) {
            this.show(this.translateService.translate('ocucoffe.ssnvalidation'), 'warn');
            return null;
          }
          while (String(identifierNumber.ssnNumber).indexOf('-') >= 0 || String(identifierNumber.ssnNumber).indexOf(' ') >= 0) {
            identifierNumber.ssnNumber = String(identifierNumber.ssnNumber).replace('-', '');
            identifierNumber.ssnNumber = String(identifierNumber.ssnNumber).replace(' ', '');
          }
          if (String(identifierNumber.ssnNumber).length < 9) {
            this.show(this.translateService.translate('ocucoffe.ssnformatvalidation'), 'warn');
            return null;
          }
        }
        return new OffenderIdentifier();
      } else {
        return new OffenderIdentifier();
      }

    } else {
      this.show(this.translateService.translate('ocucoffe.pleaseselectalias'), 'warn');
      return null;
    }
  }
  validatealiasescheckdupnamecur() {
    const serviceObj = this.ocucoffeFactory.validatealiasescheckdupnamecur(this.offenModel);
    serviceObj.subscribe(data => {
      if (data) {

      } else {

      }
    });

  }
  canAliasEdit = (data: any, index: number, field: string): boolean => {
    if (!data.offenderId && field !== 'age') {
      return true;
    } else {
      return false;
    }
  }
  canOIdenEdit = (data: any, index: number, field: string): boolean => {
    this.offidData.forEach(element => {
      element.verifiedFlag = (element.verifiedFlag === 'N') ? null : element.verifiedFlag;
    });
    if (!data.offenderId || !data.offenderIdSeq) {
      return true;
    } else {
      return false;
    }
  }
  ageGenerator = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.oldValue !== event.newValue) {
      const validAge = { age: 0 };
      const birthDate = DateFormat.getDate(event.data.birthDate);
      if (!event.data.birthDate) {
        rowdata.validated = false;
        validAge.age = 0;
      } else if ((DateFormat.compareDate(birthDate, this.SystemDate)) === 1) {
        rowdata.validated = true;
        this.show(this.translateService.translate('common.birthdatemustbeless'), 'warn');
        validAge.age = 0;
      } else {
        validAge.age = this.SystemDate.getFullYear() - birthDate.getFullYear();
        const month = this.SystemDate.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && this.SystemDate.getDate() < birthDate.getDate())) {
          validAge.age--;
        }
        rowdata.validated = true;
        rowdata.data = { age: validAge.age };
      }
      return rowdata;
    }
  }
  getMask = (index, col, data) => {
    if (data['identifierType'] === 'SSN') {
      return {
        mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        placeholderChar: ' '
      };
    }
  }
  numValidate = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.data.identifierType === 'SSN' && event.oldValue !== event.newValue && event.field === 'identifier') {
      const identifierNumber = { ssnNumber: String(event.newValue).trim() };
      if (identifierNumber.ssnNumber.length > 11) {
        this.show(this.translateService.translate('ocucoffe.ssnvalidation'), 'warn');
      }
      while (String(identifierNumber.ssnNumber).indexOf('-') >= 0 || String(identifierNumber.ssnNumber).indexOf(' ') >= 0) {
        identifierNumber.ssnNumber = String(identifierNumber.ssnNumber).replace('-', '');
        identifierNumber.ssnNumber = String(identifierNumber.ssnNumber).replace(' ', '');
      }
      if (String(identifierNumber.ssnNumber).length < 9) {
        this.show(this.translateService.translate('ocucoffe.ssnformatvalidation'), 'warn');
      }
    }
    rowdata.validated = true;
    return rowdata;
  }

  onGridDelete = () => {
    if (this.offidData.length > 0) {
      this.show(this.translateService.translate('common.cannotdeletemasterrecord'), 'warn');
      return false;
    } else {
      return true;
    }
  }
  onCheckDeleteMaster() {
    if (this.offidData.length > 0) {
      this.show(this.translateService.translate('common.cannotdeletemasterrecord'), 'warn');
      return false;
    } else {
      this.offDeleteList = [];
      this.offDeleteList.push(this.offModel);
      this.offCommitModel = new OffendersCommitBean();
      this.offCommitModel.deleteList = this.offDeleteList;
      const offSaveData = this.ocucoffeFactory.offCommit(this.offCommitModel);
      offSaveData.subscribe(offSaveResult => {
        this.ocucoffePopulateDetails(offSaveResult);
      });
    }

  }
  nameKeyDown(event, name) {
    if (!name) {
      if ((event.keyCode >= 0 && event.keyCode <= 31) && (event.keyCode >= 112 && event.keyCode <= 123)) {
        return true;
      } else {
        const reg = /[A-Z a-z]/;
        if (!reg.test(event.key) || event.keyCode === 32) {
          event.stopPropagation();
          return false;
        }
      }
    }
  }

  isOffenderGenerated(): boolean {
    if (this.aliasData && this.aliasData.length > 0) {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.osiosearservice.data = new TagSearchGetOffenderRecords();
  }

  onlyAlphabetallowed(event: any) {
    let charcode = event.keyCode;
    if (charcode == 39 || charcode == 32 || charcode == 45 || (charcode >= 65 && charcode <= 90) || (charcode >= 97 && charcode <= 122)) {
      return true; //validation for " ' , a-z , A-Z "
    }
    return false;
  }

}
