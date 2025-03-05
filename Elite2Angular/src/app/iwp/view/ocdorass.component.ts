import {
  Component, OnInit, ViewChild, OnDestroy
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderBookings } from '@inst/demographics-biometrics/beans/OffenderBookings';
import { OffenderBookingsCommitBean } from '@inst/demographics-biometrics/beans/OffenderBookingsCommitBean';
import { StaffLocationRoles } from '@sa/usersystemsecurity/beans/StaffLocationRoles';
import { ExtOwnershipTransfer } from '../beans/ExtOwnershipTransfer';
import { ExtOwnershipTransferCommitBean } from '../beans/ExtOwnershipTransferCommitBean';
import { VOmTeamMembers } from '../beans/VOmTeamMembers';
import { VOmTeamMembersCommitBean } from '../beans/VOmTeamMembersCommitBean';
import { OcdorassService } from '../service/ocdorass.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';

@Component({
  selector: 'app-ocdorass',
  templateUrl: './ocdorass.component.html'
})

export class OcdorassComponent implements OnInit, OnDestroy {
  @ViewChild('gridTwo',{ static: true }) gridTwo: any;
  @ViewChild('grid') grid: any;
  @ViewChild('gridOne') gridOne: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  offbkg1Data: OffenderBookings[] = [];
  offbkg1DataTemp: OffenderBookings[] = [];
  offbkg1Model: OffenderBookings = new OffenderBookings();
  offbkg1InsertList: OffenderBookings[] = [];
  offbkg1UpdatetList: OffenderBookings[] = [];
  offbkg1DeleteList: OffenderBookings[] = [];
  extotData: ExtOwnershipTransfer[] = [];
  extotDataTemp: ExtOwnershipTransfer[] = [];
  extotModel: ExtOwnershipTransfer = new ExtOwnershipTransfer();
  stafflrModel: StaffLocationRoles = new StaffLocationRoles();
  extotInsertList: ExtOwnershipTransfer[] = [];
  extotUpdatetList: ExtOwnershipTransfer[] = [];
  extotDeleteList: ExtOwnershipTransfer[] = [];
  voffdetData: VOmTeamMembers[] = [];
  voffdetDataTemp: VOmTeamMembers[] = [];
  voffdetModel: VOmTeamMembers = new VOmTeamMembers();
  voffdetInsertList: VOmTeamMembers[] = [];
  voffdetUpdatetList: VOmTeamMembers[] = [];
  voffdetDeleteList: VOmTeamMembers[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean = true;
  vOffDetColumnDef: any[];
  extOtColumnDef: any[];
  offBkg1ColumnDef: any[];
  staffLrReadOnly: boolean = false;
  offBkg1ReadOnly: boolean = false;
  extOtReadOnly: boolean = false;
  vOffDetReadOnly: boolean = false;
  rgagylocidRg: any[] = [];
  rgpositionRg: any[] = [];
  rgroleRg: any[] = [];
  rgscheduletypeRg: any[] = [];
  rgsexcodeRg: any[] = [];
  rgteamRg: any[] = [];
  voffdetCommitModel: VOmTeamMembersCommitBean = new VOmTeamMembersCommitBean();
  extotCommitModel: ExtOwnershipTransferCommitBean = new ExtOwnershipTransferCommitBean();
  offbkg1CommitModel: OffenderBookingsCommitBean = new OffenderBookingsCommitBean();
  count: any;
  nbtStaffIdflag: boolean;
  chkOffbkg1All: boolean;
  chkExtotAll: boolean;
  check: boolean;
  teamMembersTitles = { description: 'Description', code: 'Location ID' };
  tableIndex: number;
  saveFlag: boolean;
  clearDisable: boolean;
  lovReadonly: any;
  teamtitles = { description: 'Description', code: 'Team ID' };
  checkBoxdisabled: boolean;
  checkBoxTwodisabled: boolean;
  num: any;
  falseNum: number;
  teamEnableFlag: boolean;
  sealFlag: string;
  teamIdGroup = [];
  teamFlagMand: boolean;
  vHeaderBlockModelBean: VHeaderBlock = new VHeaderBlock();
  afterSaveFlag: boolean;
  indexNum:number=-1;
  staffMemberName: string;
  offRemainingWlUnits: number;
  constructor(private ocdorassFactory: OcdorassService, public translateService: TranslateService,
    public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService,  public osiosearFactory: OsiosearService) {
    this.vOffDetColumnDef = [];
    this.extOtColumnDef = [];
    this.offBkg1ColumnDef = [];
  }
  ngOnInit() {
    this.saveFlag = true;
    this.clearDisable = true;
    this.checkBoxdisabled = true;
    this.checkBoxTwodisabled = true;
    this.afterSaveFlag = true;
    this.offBkg1ColumnDef = [
      { fieldName: this.translateService.translate('common.select'), field: 'sealFlag', editable: true, width: 150, datatype: 'checkbox' },
      { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'pOffIdDisp', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.lastname'), field: 'dspLastName', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.firstname'), field: 'dspFirstName', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('ocdorass.intakedate'), field: 'bookingBeginDate', editable: false,
        width: 150, datatype: 'date'
      },
      {
        fieldName: this.translateService.translate('ocdorass.workloadunits'), field: 'workloadUnits', editable: false, width: 150,
        datatype: 'number',
    }
    ];
    this.extOtColumnDef = [
      { fieldName: this.translateService.translate('common.select'), field: 'chkSelect', editable: true, width: 150, datatype: 'checkbox' },
      { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'pOffIdDisp', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.lastname'), field: 'dspLastNameTwo', editable: false, width: 150 },
      { fieldName: this.translateService.translate('common.firstname'), field: 'dspFirstNameTwo', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocdorass.fromlocation'), field: 'sealFlag', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocdorass.frommemberofstaff'), field: 'dspLastName', editable: false, width: 150 },
      // { fieldName: this.translateService.translate(''), field: 'dspFirstName', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('ocdorass.transferdate'), field: 'transferDate', editable: false,
        width: 150, datatype: 'date'
      },
    ];
    this.vOffDetColumnDef = [
      {
        fieldName: this.translateService.translate('common.assign'), field: 'nbtStaffId', editable: true, width: 150,
        datatype: 'checkbox'
      },
      { fieldName: this.translateService.translate('common.name'), field: 'staffName', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('common.position'), field: 'position', editable: false, width: 150,
        datatype: 'lov', domain: 'STAFF_POS'
      },
      {
        fieldName: this.translateService.translate('system-profile.staff-role'), field: 'role', editable: false, width: 150,
        datatype: 'lov', domain: 'STAFF_ROLE'
      },
      {
        fieldName: this.translateService.translate('common.gender'), field: 'sexCode', editable: false, width: 150,
        datatype: 'lov', domain: 'SEX'
      },
      {
        fieldName: this.translateService.translate('common.schedule'), field: 'scheduleType', editable: false, width: 150,
        datatype: 'lov', domain: 'SCHEDULE_TYP'
      },
      {
        fieldName: this.translateService.translate('system-profile.no-prim-owns'), field: 'nbtNoOffender', editable: false, width: 150,
        datatype: 'number'
      },
      {
        fieldName: this.translateService.translate('ocdorass.remainingworkloadunits'), field: 'remainingWlUnits', editable: false, width: 150,
        datatype: 'number',
      },
      /* {
        fieldName: this.translateService.translate('common.team'), field: 'nbtTeamDesc', editable: true, width: 150, datatype: 'lov',
        link: 'ocdorass/rgTeamRecordGroup?sealFlag=', parentField: 'sealFlag',  titles: this.teamtitles,
        cellEditable : this.canFlagsEdit
      }, */
      {
        fieldName: this.translateService.translate('ocdorass.workedwithoffender'), field: 'subTypeFlag', editable: false,
        width: 150, datatype: 'checkbox',
      },

    ];
   
    // const checkResultOne = this.ocdorassFactory.getProfileTrustValueDisabled();
    // checkResultOne.subscribe(resultOne => {
    //   this.teamFlagMand = resultOne;
    //   if (this.teamFlagMand) {
    //     if (this.teamFlagMand === true) {
    //       this.gridTwo.setColumnHeader('nbtTeamDesc', this.translateService.translate('common.team') +
    //         this.translateService.translate('common.mandatory'));
    //     } 
    //     else {
    //       this.gridTwo.setColumnHeader('nbtTeamDesc', this.translateService.translate('common.team'));
    //     }
    //   }
    // });


  }

  /**
   * This function displays the messages
   */
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }

  canFlagsEdit = (data: any, index: number, field: string) => {
    if (data.count > 0) {
            return true;
        } else {
            return false;
        }
    }
  agylocChangeEvent(event) {
    if (event) {
      this.clearDisable = false;
    }
  }
  retriveData() {
    if (!this.stafflrModel.dspDescription) {
      this.show('ocdorass.pleaseenteralocation');
      return;
    }
    this.offbkg1Model = new OffenderBookings();
    this.offbkg1ExecuteQuery();
    this.saveFlag = true;
    this.clearDisable = false;
    this.lovReadonly = true;
  }
  clear() {
    this.stafflrModel.dspDescription = undefined;
    this.offbkg1Data = [];
    this.offbkg1Model = new OffenderBookings();
    this.extotData = [];
    this.extotModel = new ExtOwnershipTransfer();
    this.voffdetData = [];
    this.voffdetModel = new VOmTeamMembers();
    this.saveFlag = true;
    this.clearDisable = true;
    this.checkBoxdisabled = true;
    this.checkBoxTwodisabled = true;
    this.lovReadonly = false;
    this.chkOffbkg1All = undefined;
    this.chkExtotAll = undefined;
    this.afterSaveFlag = true;
    this.staffMemberName = undefined;
    this.offRemainingWlUnits = undefined;
  }
  onLovBlur() {
    if (!this.stafflrModel.dspDescription) {
      this.stafflrModel.dspDescription = this.stafflrModel.dspDescription === '' ? undefined : '';
      this.clearDisable = true;
    }
  }
  offbkg1ExecuteQuery() {
    if (!this.stafflrModel.dspDescription) {
      this.show('ocdorass.pleaseenteralocation');
      this.clearDisable = true;
      return;
    }
    if (this.stafflrModel.dspDescription) {
      this.offbkg1Model.intakeAgyLocId = this.stafflrModel.dspDescription;
    }
    const offbkg1Result = this.ocdorassFactory.offBkg1ExecuteQuery(this.offbkg1Model);
    offbkg1Result.subscribe(data => {
      this.extotExecuteQuery();
      if (data.length === 0) {
        this.offbkg1Data = [];
        this.checkBoxdisabled =  true;
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].sealFlag === 'N' || data[i].sealFlag === 'Y') {
            data[i].sealFlag = false;
          }
        }
        data.forEach(element => {
          for (let i = Number(String(element.pOffIdDisp).length); i < 10; i++) {
            element.pOffIdDisp = '0' + element.pOffIdDisp;
          }
        });
        this.offbkg1Data = data;
        this.offbkg1Model = data[0];
        this.tableIndex = 0;
        this.saveFlag = false;
        this.checkBoxdisabled = false;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocdorassSaveoffbkg1Form(event) {
    this.offbkg1InsertList = event.added;
    this.offbkg1UpdatetList = event.updated;
    this.offbkg1CommitModel.insertList = [];
    this.offbkg1CommitModel.updateList = [];
    this.offbkg1CommitModel.updateList = this.offbkg1UpdatetList;
    
    if (this.offbkg1UpdatetList.length >= 0) {

      for (let i = 0; i < this.offbkg1UpdatetList.length; i++) {
        this.offbkg1UpdatetList[i].sealFlag = this.offbkg1UpdatetList[i].sealFlag ? 'Y' : 'N';
        this.offbkg1UpdatetList[i].agyLocId = this.stafflrModel.dspDescription;
        this.offbkg1UpdatetList[i].staffId = this.voffdetModel.staffId;
        this.offbkg1UpdatetList[i].position = this.voffdetModel.position;
        this.offbkg1UpdatetList[i].role = this.voffdetModel.role;
        this.offbkg1CommitModel.updateList = this.offbkg1UpdatetList;
      }
    }
    const offbkg1SaveData = this.ocdorassFactory.offBkg1Commit(this.offbkg1CommitModel);
    offbkg1SaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.offbkg1ExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        this.offbkg1ExecuteQuery();
        return;
      }
    });
  }
  extotExecuteQuery() {
    this.extotModel = new ExtOwnershipTransfer();
    if (this.stafflrModel.dspDescription) {
      this.extotModel.agyLocIdTo = this.stafflrModel.dspDescription;
    }
    const extotResult = this.ocdorassFactory.extOtExecuteQuery(this.extotModel);
    extotResult.subscribe(data => {
      this.voffdetExecuteQuery();
      if (data.length === 0) {
        this.extotData = [];
        this.checkBoxTwodisabled = true;
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].chkSelect === 'N' || data[i].chkSelect === 'Y') {
            data[i].chkSelect = false;
          }
        }
        for(let i = 0; i < this.extOtColumnDef.length; i++){
          if (this.extOtColumnDef[i].field === 'dspLastName'){
            for (let j = 0; j < data.length; j++){
              data[j]['dspLastName'] = data[j].dspLastName + ', ' + data[j].dspFirstName
            }
          }
        }
        this.extotData = data;
        this.extotModel = data[0];
        this.tableIndex = 0;
        this.saveFlag = false;
        this.checkBoxTwodisabled = false;
      }
    });
  }
  //   /**
  //    *  This function will be executed when commit event is
  //   * fired
  //   */
  ocdorassSaveextotForm(event) {
    this.extotInsertList = event.added;
    this.extotUpdatetList = event.updated;
    this.extotCommitModel.insertList = [];
    this.extotCommitModel.updateList = [];
    this.extotCommitModel.updateList = this.extotUpdatetList;
    if (this.extotUpdatetList.length >= 0) {
      for (let i = 0; i < this.extotUpdatetList.length; i++) {
        this.extotUpdatetList[i].chkSelect = this.extotUpdatetList[i].chkSelect ? 'Y' : 'N';
        this.extotUpdatetList[i].offenderBookId = this.extotModel.offenderBookId;
        this.extotUpdatetList[i].rootOffenderId = this.offbkg1Model.rootOffenderId;
        this.extotUpdatetList[i].offenderId = this.offbkg1Model.offenderId;
        this.extotUpdatetList[i].agyLocIdTo = this.stafflrModel.dspDescription;
        this.extotUpdatetList[i].nbtStaffId = this.voffdetModel.nbtStaffId;
        this.extotUpdatetList[i].staffId = this.voffdetModel.staffId;
        this.extotUpdatetList[i].position = this.voffdetModel.position;
        this.extotUpdatetList[i].role = this.voffdetModel.role;
        this.extotUpdatetList[i].createUserId = this.sessionManager.getId();
        this.extotUpdatetList[i].caseLoadId = this.sessionManager.currentCaseLoad;

      }
    }

    const extotSaveData = this.ocdorassFactory.extOtCommit(this.extotCommitModel);
    extotSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.extotExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        this.extotExecuteQuery();
        return;
      }
    });
  }

  validateRowData = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    this.num = 0;
    this.falseNum = 0;
    this.offbkg1Data.forEach(ele => {
      if (ele.sealFlag) {
        this.num = this.num + 1;
      } else {
        this.falseNum = this.falseNum + 1;
      }
    });
    if (this.num > 0) {
      //   this.gridupdate = false;
    } else {
      //    this.gridupdate = true;
      this.chkOffbkg1All = undefined;
    }
    if (this.falseNum > 0) {
      this.chkOffbkg1All = undefined;
    } else {
      this.chkOffbkg1All = true;
    }

    rowdata.validated = true;
    this.handleWorkWithOffender();
    return rowdata;
  }
  validateRowDataTwo = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    this.num = 0;
    this.falseNum = 0;
    this.extotData.forEach(ele => {
      if (ele.chkSelect) {
        this.num = this.num + 1;
      } else {
        this.falseNum = this.falseNum + 1;
      }
    });
    if (this.num > 0) {
      //   this.gridupdate = false;
    } else {
      //    this.gridupdate = true;
      this.chkExtotAll = undefined;
    }
    if (this.falseNum > 0) {
      this.chkExtotAll = undefined;
    } else {
      this.chkExtotAll = true;
    }

    rowdata.validated = true;
    this.handleWorkWithOffender();
    return rowdata;
  }

  validateRowDataThree = (event) => {
    const rowdata = new ValidateRowReturn();
    const rowIndex = event.rowIndex;
    if (event.field === 'nbtStaffId') {
      if (event.data.nbtStaffId === true) {
        this.voffdetData.forEach((e, i) => {
          if (i != rowIndex) {
            this.gridTwo.setColumnData('nbtStaffId', i, false);
          }
        });
        this.staffMemberName = event.data.staffName;
        this.offRemainingWlUnits = event.data.remainingWlUnits;
        rowdata.validated = true;
        this.indexNum = event.rowIndex;
        return rowdata;
      }
    }
    rowdata.validated = true;
    return rowdata;
  }

  voffdetExecuteQuery() {
    this.voffdetModel = new VOmTeamMembers();
    if (this.stafflrModel.dspDescription) {
      this.voffdetModel.calAgyLocId = this.stafflrModel.dspDescription;
    }
    const voffdetResult = this.ocdorassFactory.vOffDetExecuteQuery(this.voffdetModel);
    voffdetResult.subscribe(data => {
      if (data.length === 0) {
        this.voffdetData = [];
      } else {
        this.voffdetData = data;
        this.voffdetModel = data[0];
        this.voffdetData.forEach(element => {
          element.sealFlag = element.position + '-' + element.role + '-' + element.staffId;
        });
        this.tableIndex = 0;
        this.saveFlag = false;
      }
      if (this.voffdetData.length === 0 && this.extotData.length === 0 && this.offbkg1Data.length === 0) {
        this.show('common.querycaused');
        return;
      }
    });
  }

  

  //     /**
  //      *  This function will be executed when commit event is
  //     * fired
  //     */
  ocdorassSavevoffdetForm(event) {
    this.voffdetInsertList = event.added;
    this.voffdetUpdatetList = event.updated;
    this.voffdetCommitModel.insertList = [];
    this.voffdetCommitModel.updateList = this.voffdetUpdatetList;
    this.voffdetCommitModel.updateList = this.voffdetData.filter(element => {
      if (element.nbtStaffId) {
        element.nbtStaffId = element.nbtStaffId ? 'Y' : 'N';
        element.offenderBookId = this.offbkg1Model.offenderBookId;
        element.calAgyLocId = this.stafflrModel.dspDescription;
        element.staffId = this.offbkg1Model.staffId;
        element.position = this.offbkg1Model.position;
        element.role = this.offbkg1Model.role;
        return;
      }
    });
    const voffdetSaveData = this.ocdorassFactory.vOffDetCommit(this.voffdetCommitModel);
    voffdetSaveData.subscribe(data => {
      
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.voffdetExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        this.voffdetExecuteQuery();
        return;
      }
    });

  }
  
  extOtChkboxChange(event) {
    const rowData = this.extotData;
    if (event) {
      for (let i = 0; i < rowData.length; i++) {
        this.gridOne.setColumnData('chkSelect', i, event.checked);
        this.check = true;
      }
    } else {
      this.check = false;
    }
    this.extotData = rowData;
  }

  offBkgChkboxChange(event) {
    const rowData = this.offbkg1Data;
    if (event) {
      for (let i = 0; i < rowData.length; i++) {
        this.grid.setColumnData('sealFlag', i, event.checked);
        this.check = true;
      }
    } else {
      this.check = false;
    }
    this.offbkg1Data = rowData;
  }

  onRowClickOffBkg(event) {
    if (event) {
      this.offbkg1Model = event;
      if (this.offbkg1Model.offenderBookId) {
        this.voffdetModel.offenderBookId = event.offenderBookId;
      }
    }

  }

  onRowClickextot(event) {
    if (event) {
      this.extotModel = event;
      if (this.extotModel.offenderBookId) {
        this.voffdetModel.offenderBookId = event.offenderBookId;
      }
    }

  }
 
  offdetValidate() {
    let countOne = 0;
    let countTwo = 0;
    let count = 0;
    for (let i = 0; i < this.offbkg1Data.length; i++) {
      if (this.offbkg1Data[i].sealFlag) {
        countOne = countOne + 1;
      }
    }
    for (let i = 0; i < this.extotData.length; i++) {
      if (this.extotData[i].chkSelect) {
        countTwo = countTwo + 1;
      }
    }
    for (let i = 0; i < this.voffdetData.length; i++) {
      if (this.voffdetData[i].nbtStaffId) {
        count = count + 1;
      }
      // if (!voffdetData[i].nbtTeamDesc && this.teamFlagMand === true) {
      //   this.show('ocdorass.omteamforselectedmemberofstaff');
      //   is.valid = false;
      //   return is.valid;
      // }
    }
    if (countOne === 0 && countTwo === 0) {
      this.show('ocdorass.youmustselectatleastoneoffenderbeforecommitting');
      return false;
    }
    else if ((countOne > 0 || countTwo > 0) && count === 0) {
      this.show('ocdorass.assigningflagfortheofficerbeforecommiting');
      return false;
    }
    else if (count > 1) {
      this.show('ocdorass.onlyoneofficercanbeassignedtoaparticularoffender');
      return false;
    }
    return true;
  }


  genoffbkg1Data() {
    this.offbkg1UpdatetList = [];

    this.grid.updatedMap.forEach(
      (v: any, k: number) => {
        
        if (v.sealFlag === true) {
          this.offbkg1UpdatetList.push(v);
        }
      }
    );
  }

 
  GenvoffdetData() {
    this.voffdetUpdatetList = [];
    this.gridTwo.updatedMap.forEach(
      (v: any, k: number) => {
        
        if (v.nbtStaffId === true) {
          this.voffdetUpdatetList.push(v);
        }
      }
    );
  }
  singleSave() {
    this.genoffbkg1Data();
    this.GenvoffdetData();
    let offWLCount = 0;
    this.offbkg1CommitModel.updateList = [];
    this.extotCommitModel.updateList = [];
    this.voffdetCommitModel.updateList = [];
    this.voffdetCommitModel.offbkg1UpdatetList = this.offbkg1UpdatetList;
    this.extotUpdatetList = this.extotData.filter(element => {
      if (element.chkSelect) {
          return true;
      }
    });
    this.voffdetCommitModel.extotUpdatetList = this.extotUpdatetList;
    this.voffdetCommitModel.updateList = this.voffdetUpdatetList;
    if (!this.offdetValidate()) {
      return;
    }
    if (this.offbkg1UpdatetList.length > 0) {
      for (let i = 0; i < this.offbkg1UpdatetList.length; i++) {
        this.offbkg1UpdatetList[i].sealFlag = this.offbkg1UpdatetList[i].sealFlag ? 'Y' : 'N';
        this.offbkg1UpdatetList[i].agyLocId = this.stafflrModel.dspDescription;
        this.offbkg1UpdatetList[i].intakeCaseloadId = this.offbkg1Model.intakeCaseloadId;
        offWLCount = offWLCount + this.offbkg1UpdatetList[i].workloadUnits;
        this.offbkg1CommitModel.updateList = this.offbkg1UpdatetList;
      }
    }

    if (this.extotUpdatetList.length > 0) {

      for (let i = 0; i < this.extotUpdatetList.length; i++) {
        this.extotUpdatetList[i].chkSelect = this.extotUpdatetList[i].chkSelect ? 'Y' : 'N';
        if (this.offbkg1Model.offenderBookId) {
          this.extotUpdatetList[i].pOffenderBookId = this.offbkg1Model.offenderBookId;
        } else {
          this.extotUpdatetList[i].offenderBookId = this.extotUpdatetList[i].offenderBookId;
        }
        this.extotUpdatetList[i].rootOffenderId = this.offbkg1Model.rootOffenderId;
        this.extotUpdatetList[i].agyLocIdTo = this.stafflrModel.dspDescription;
        this.extotUpdatetList[i].nbtStaffId = this.voffdetModel.nbtStaffId;
        this.extotUpdatetList[i].staffId = this.voffdetUpdatetList[0].staffId;
        this.extotUpdatetList[i].position = this.voffdetUpdatetList[0].position;
        this.extotUpdatetList[i].role = this.voffdetUpdatetList[0].role;
        this.extotUpdatetList[i].createUserId = this.sessionManager.getId();
        this.extotUpdatetList[i].caseLoadId = this.sessionManager.currentCaseLoad;
        this.extotCommitModel.updateList = this.extotUpdatetList;
      }
    }

    if (this.voffdetUpdatetList.length > 0) {
      for (let i = 0; i < this.voffdetUpdatetList.length; i++) {
        
        this.voffdetUpdatetList[i].nbtStaffId = this.voffdetUpdatetList[i].nbtStaffId ? 'Y' : 'N';
        this.voffdetUpdatetList[i].offenderBookId = this.offbkg1Model.offenderBookId;
        this.voffdetUpdatetList[i].calAgyLocId = this.stafflrModel.dspDescription;
        this.voffdetUpdatetList[i].agyLocId = this.stafflrModel.dspDescription;
        this.voffdetUpdatetList[i].createUserId = this.sessionManager.getId();
        this.voffdetUpdatetList[i].remainingWlUnits = this.voffdetUpdatetList[i].remainingWlUnits - offWLCount;
        
        this.voffdetCommitModel.updateList = this.voffdetUpdatetList;
      }    
      if (this.voffdetUpdatetList.length < 0 && this.extotUpdatetList.length < 0) {
        this.show('ocdorass.pleasechecktheassignflagofficerbeforecommiting');
        return;
      }
      const saveObj = this.ocdorassFactory.vOffDetCommit(this.voffdetCommitModel);
      saveObj.subscribe(data => {
        if (data.length === 0) {
          this.show('common.addupdateremoverecordfailed');
          this.offbkg1ExecuteQuery();
          this.chkOffbkg1All = undefined;
          return;
        } else {
          this.show('common.addupdateremoverecordsuccess', 'success');
          this.afterSaveFlag = false;
          this.offbkg1ExecuteQuery();
          this.chkOffbkg1All = undefined;
          this.chkExtotAll = undefined;
          this.staffMemberName = undefined;
          this.offRemainingWlUnits = undefined;
          return;
        }
      });
    }
  }
  ngOnDestroy() {
    if (this.offenderSearchService.selectedOffender && this.offenderSearchService.selectedOffender.offenderBookId !== undefined) {
      this.vHeaderBlockModelBean = new VHeaderBlock();
      this.vHeaderBlockModelBean.offenderIdDisplay = this.offenderSearchService.selectedOffender.offenderIdDisplay;
      this.vHeaderBlockModelBean.agyLocId = this.sessionManager.currentCaseLoad;
      this.vHeaderBlockModelBean.agyLocType = this.sessionManager.currentCaseLoadType;
      const searchResult = this.osiosearFactory.
        offbkgGlobalQuery(this.vHeaderBlockModelBean);
      searchResult.subscribe(vhbList => {
        if (vhbList.length > 0) {
          this.offenderSearchService.selectedOffender = vhbList[0];
        }
      });
    }
  }

  retriveDisable() {
    if (this.offbkg1Data.length > 0 || this.extotData.length > 0
      || this.voffdetData.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  OnGridClear = () => {
    this.staffMemberName = undefined;
    this.offRemainingWlUnits = undefined;
    return true;
  }

  handleWorkWithOffender() {
    let offStaffIdFirstGrid = [];
    let offStaffIdSecondGrid = [];

    if (this.voffdetData.length == 0 ) {
      return;
    }
    this.grid.gridApi.forEachNode((rowNode, index) => {
      if(rowNode.data.sealFlag && rowNode.data.workedStaffMembers){
        offStaffIdFirstGrid.push(...rowNode.data.workedStaffMembers);
      }
    })

    this.gridOne.gridApi.forEachNode((rowNode, index) => {
      if(rowNode.data.chkSelect && rowNode.data.workedStaffMembers){
        offStaffIdSecondGrid.push(...rowNode.data.workedStaffMembers);
      }
    })

    this.gridTwo.gridApi.forEachNodeAfterFilter((rowNode, index) => {
      let offStaffIdThirdGrid = rowNode.data.staffId;
      if (offStaffIdFirstGrid && offStaffIdThirdGrid && offStaffIdFirstGrid.includes(offStaffIdThirdGrid)) {
        this.gridTwo.setColumnData('subTypeFlag', index, true);
      }
      else if (offStaffIdSecondGrid && offStaffIdThirdGrid && offStaffIdSecondGrid.includes(offStaffIdThirdGrid)) {
        this.gridTwo.setColumnData('subTypeFlag', index, true);
      }
      else {
        this.gridTwo.setColumnData('subTypeFlag', index, false);
      }
    });
  }

}

