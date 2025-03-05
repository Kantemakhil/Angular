import {
  Component,
  OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcipbeneService } from '../service/ocipbene.service';
import { Persons } from '@instdemographicsbeans/Persons';
import { PersonsCommitBean } from '@instdemographicsbeans/PersonsCommitBean';
import { OffenderBeneficiaries } from '@inmatetrustaccountsbeans/OffenderBeneficiaries';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
  selector: 'app-ocipbene',
  templateUrl: './ocipbene.component.html'
})

export class OcipbeneComponent implements OnInit {
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  perData: Persons[] = [];
  perDataTemp: Persons[] = [];
  perModel: Persons = new Persons();
  perIndex = 0;
  perInsertList: Persons[] = [];
  perUpdatetList: Persons[] = [];
  perDeleteList: Persons[] = [];
  offbncData: OffenderBeneficiaries[] = [];
  offbncDataTemp: OffenderBeneficiaries[] = [];
  offbncModel: OffenderBeneficiaries = new OffenderBeneficiaries();
  offbncIndex = 0;
  offbncInsertList: OffenderBeneficiaries[] = [];
  offbncUpdatetList: OffenderBeneficiaries[] = [];
  offbncDeleteList: OffenderBeneficiaries[] = [];
  syspflData: SystemProfiles[] = [];
  syspflDataTemp: SystemProfiles[] = [];
  syspflModel: SystemProfiles = new SystemProfiles();
  syspflIndex = 0;
  syspflInsertList: SystemProfiles[] = [];
  syspflUpdatetList: SystemProfiles[] = [];
  syspflDeleteList: SystemProfiles[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable = true;
  glTxn1ColumnDef: any[];
  perColumnDef: any[];
  offBncColumnDef: any[];
  vCorpColumnDef: any[];
  glTxnReadOnly = false;
  glTxn1ReadOnly = false;
  sysPflReadOnly = false;
  offTxnReadOnly = false;
  offBncReadOnly = false;
  vCorpReadOnly = false;
  perReadOnly = false;
  index: number;
  perCommitModel: PersonsCommitBean = new PersonsCommitBean();
  nbtBenOwing: any;
  nbtTotalPayChecks: any;
  total: any;
  total1: any;
  total2: any;
  lastName: any;
  firstName: any;
  personId: any;
  caseLoadId: any;
  tableIndex: any;
  totalOwing: any;
  totalDescription: any;
  totalCollected: any;
  totalOwingAmount: number;
  unlimitedFlag: boolean;
  voffBenDataPinnedData: any[] = [];
  fieldsReadOnly: boolean;
  retriveDisable: boolean;
  clearDisable: boolean;
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  transHistoryDisable: boolean;
  tableBncIndex = -1;
  constructor(private ocipbeneFactory: OcipbeneService,
    public translateService: TranslateService,
    private sessionManager: UserSessionManager) {
    this.glTxn1ColumnDef = [];
    this.perColumnDef = [];
    this.offBncColumnDef = [];
    this.vCorpColumnDef = [];
  }
  ngOnInit() {
    this.caseLoadId = this.sessionManager.currentCaseLoad;
    this.fieldsReadOnly = false;
    this.retriveDisable = false;
    this.clearDisable = true;
    this.transHistoryDisable = true;
    this.perColumnDef = [
      {
        fieldName: this.translateService.translate('ocipbene.lastname'), field: 'lastName', editable: false,
        width: 150, maxlength: 35, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.firstname'), field: 'firstName', editable: false,
        width: 150, maxlength: 35, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.id'), field: 'personId', editable: false,
        width: 150, maxlength: 11, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.suite'), field: 'suiteNumber', editable: false,
        width: 150, maxlength: 30, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.streetinfo'), field: 'streetInformation', editable: false,
        width: 150, maxlength: 200, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.city'), field: 'cityDesc', editable: false,
        width: 150, maxlength: 40, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.state'), field: 'stateDesc', editable: false,
        width: 150, maxlength: 40, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.zip'), field: 'zipPostalCode', editable: false,
        width: 150, maxlength: 12, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.country'), field: 'countryDesc', editable: false,
        width: 150, maxlength: 40, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.suspendeddate'), field: 'suspendedDate', editable: false,
        width: 100, maxlength: 10, datatype: 'date'
      },
      {
        fieldName: '', field: 'susButton', datatype: 'launchbutton',
        editable: true, width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: '70%',
        onLaunchClick: this.susLaunchClick
      },
    ];
    this.offBncColumnDef = [
      {
        fieldName: this.translateService.translate('ocipbene.offendername'), field: 'lastName', editable: false,
        width: 150, maxlength: 65, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false,
        width: 150, maxlength: 10, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.paymentstatus'), field: 'offenderDeductionId', editable: false,
        width: 150, maxlength: 11, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.type'), field: 'deductionType', editable: false, width: 150,
        maxlength: 6, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.totalamount'), field: 'totalDescription', editable: false, width: 150,
        maxlength: 16, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.totalcollected'), field: 'totalCollected', editable: false, width: 150,
        maxlength: 16, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocipbene.totalowing'), field: 'totalOwing', editable: false, width: 150,
        maxlength: 16, datatype: 'text'
      },
    ];
  }
  susLaunchClick = (event) => {
    if (event) {
      this.perModel = event;
      this.ocipbeneSaveperForm();
      return false;
    }
  }
  onRowClickper(event) {
    if (event) {
      this.perModel = event;
      if (this.perModel.personId) {
        this.transHistoryDisable = false;
        this.offbncExecuteQuery();
      } else {
        this.transHistoryDisable = true;
      }
      return true;
    }
  }
  onRowClickoffbnc(event) {
    if (event) {
      this.offbncModel = new OffenderBeneficiaries();
      this.offbncModel = event;
    }
  }
  onButProfileValueclick() {
  }
  allowNumbers(event) {
  }
  ok() {
  }
  no() {
  }
  cancel() {
    this.firstName = undefined;
    this.lastName = undefined;
    this.personId = undefined;
    this.perData = [];
    this.perModel = new Persons();
    this.offbncData = [];
    this.offbncModel = new OffenderBeneficiaries();
    this.totalDescription = undefined;
    this.totalCollected = undefined;
    this.totalOwingAmount = undefined;
    this.nbtTotalPayChecks = undefined;
    this.nbtBenOwing = undefined;
    this.voffBenDataPinnedData = [];
    this.fieldsReadOnly = false;
    this.retriveDisable = false;
    this.clearDisable = true;
    this.transHistoryDisable = true;
  }
  onGridReady(event) {
  }
  onOffenderChange(offender) {
  }
  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }
  /**
  * This function loads the data into the Master Record and its child records
  */
  ocipbenePopulateDetails() {
    const serviceObj = this.ocipbeneFactory.offBncExecuteQuery(this.perModel);
    serviceObj.subscribe(data => {
      if (data === null) {
      } else {
        this.offbncData = data;
      }
    });
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocipbeneSaveperForm() {
    this.perInsertList = [];
    this.perUpdatetList = [];
    this.perDeleteList = [];
    this.perCommitModel.insertList = [];
    this.perCommitModel.updateList = [];
    this.perCommitModel.deleteList = [];
    if (this.perModel != null && this.perModel.personId) {
      this.perUpdatetList.push(this.perModel);
    }
    if (this.perUpdatetList.length > 0) {
      this.perCommitModel.updateList = this.perUpdatetList;
    }
    if (this.perDeleteList.length > 0) {
      for (let i = 0; i < this.perDeleteList.length; i++) {
      }
      this.perCommitModel.deleteList = this.perDeleteList;
    }
    const perSaveData = this.ocipbeneFactory.perCommit(this.perCommitModel);
    perSaveData.subscribe(data => {
      if (data === 1) {
        this.type = 'success';
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.show();
        this.ocipbeneExecuteQuery();
        return;
      }
    });
  }
  ocipbeneExecuteQuery() {
    this.perModel = new Persons();
    this.perModel.globalCaseloadId = this.caseLoadId;
    if (this.lastName) {
      this.perModel.lastName = this.lastName;
    }
    if (this.personId) {
      this.perModel.personId = this.personId;
    }
    if (this.firstName) {
      this.perModel.firstName = this.firstName;
    }
    const serviceObj = this.ocipbeneFactory.perExecuteQuery(this.perModel);
    serviceObj.subscribe(personsResultData => {
      if (personsResultData.length > 0) {
        for (let i = 0; i < personsResultData.length; i++) {
          personsResultData[i].susButton = 'SUS';
        }
        this.perData = personsResultData;
        this.perModel = this.perData[0];
        this.tableIndex = 0;
        this.fieldsReadOnly = true;
        this.retriveDisable = true;
        this.clearDisable = false;
      } else {
        this.type = 'warn';
        this.message = this.translateService.translate('common.querycaused');
        this.show();
        return;
      }
    });
  }
  offbncExecuteQuery() {
    const unlimited = 'Unlimited';
    this.offbncModel = new OffenderBeneficiaries();
    this.offbncModel.personId = this.perModel.personId;
    const offbncResult = this.ocipbeneFactory.offBncExecuteQuery(this.offbncModel);
    offbncResult.subscribe(offbncResultList => {
      if (offbncResultList.length === 0) {
        this.offbncData = [];
      } else {
        const offPersonResult = this.ocipbeneFactory.sysPflExecuteQuery(this.perModel);
        offPersonResult.subscribe(systemProf => {
          if (systemProf != null) {
            this.totalDescription = 0;
            this.totalCollected = 0;
            this.totalOwing = 0;
            if (systemProf.totalDescriptionOne === unlimited) {
              this.totalDescription = systemProf.totalDescriptionOne;
            } else {
              this.totalDescription = Number(systemProf.totalDescriptionOne).toFixed(2);
            }
            if (systemProf.totalDescriptionOne === unlimited && systemProf.totalOwingOne === unlimited) {
              this.totalOwing = systemProf.totalOwingOne;
            } else {
              this.totalOwing = Number(this.totalDescription - systemProf.totalCollectedOne).toFixed(2);
              if (String(this.totalOwing).startsWith('-')) {
                this.totalOwing = '0.00';
              }
            }
            if (systemProf.profileValue) {
              if (this.totalDescription && String(this.totalDescription) !== unlimited) {
                this.nbtTotalPayChecks = systemProf.profileValue;
                this.nbtBenOwing = (Number(this.totalDescription) - Number(this.nbtTotalPayChecks)).toFixed(2);
              } else if (this.totalDescription && String(this.totalDescription) === unlimited) {
                this.nbtTotalPayChecks = '0.00';
                this.nbtBenOwing = unlimited;
              } else {
                this.nbtTotalPayChecks = '0.00';
                this.nbtBenOwing = '0.00';
              }
            }
            this.offbncData.forEach(element => {
              if (element.totalDescription === unlimited) {
                this.totalDescription = unlimited;
                this.totalOwing = unlimited;
                this.nbtBenOwing = unlimited;
              }
              if (element.totalCollected) {
                const amount = Number(element.totalCollected);
                this.totalCollected = (Number(this.totalCollected) + Number(amount)).toFixed(2);
              }
            });
            const finalTotal = {
              deductionType: this.translateService.translate('common.total'),
              totalDescription: this.totalDescription,
              totalCollected: this.totalCollected,
              totalOwing: this.totalOwing
            };
            const totbal = [];
            totbal.push(finalTotal);
            this.voffBenDataPinnedData = totbal;
          }
        });
        this.total = 0.00;
        this.total1 = 0.00;
        this.total2 = 0.00;
        for (let i = 0; i < offbncResultList.length; i++) {
          offbncResultList[i].totalDescription = offbncResultList[i].totalDescription !== unlimited ?
            Number(offbncResultList[i].totalDescription).toFixed(2) : unlimited;
          offbncResultList[i].totalCollected = offbncResultList[i].totalCollected !== unlimited ?
            Number(offbncResultList[i].totalCollected).toFixed(2) : this.total1;
          offbncResultList[i].totalOwing = offbncResultList[i].totalOwing !== unlimited ?
            Number(offbncResultList[i].totalOwing).toFixed(2) : unlimited;
        }

        this.offbncData = offbncResultList;
        this.tableBncIndex = 0;
      }
    });
  }
  syspflExecuteQuery() {
    const syspflResult = this.ocipbeneFactory.sysPflExecuteQuery(this.syspflModel);
    syspflResult.subscribe(syspflResultList => {
      if (syspflResultList.length === 0) {
        this.syspflData = [];
      } else {
        this.syspflData = syspflResultList;
        this.syspflModel = syspflResultList[0];
      }
    });
  }
  isInsertable() {
    if (this.lastName || this.firstName || this.personId) {
      this.clearDisable = false;
    } else {
      this.clearDisable = true;
    }
  }
}
