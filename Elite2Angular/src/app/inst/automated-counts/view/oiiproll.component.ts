import {
  Component, OnInit
} from '@angular/core';
import { VIntLocSummaries } from '@automatedbeans/VIntLocSummaries';
import { VLivingUnitSummaries } from '@automatedbeans/VLivingUnitSummaries';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OiiprollService } from '@inst/automated-counts/service/oiiproll.service';

@Component({
  selector: 'app-oiiproll',
  templateUrl: './oiiproll.component.html'
})

export class OiiprollComponent implements OnInit {
  lvuntsTotalData: any[] = [];
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  lvuntsmData: VLivingUnitSummaries[] = [];
  lvuntsmDataTemp: VLivingUnitSummaries[] = [];
  lvuntsmModel: VLivingUnitSummaries = new VLivingUnitSummaries();
  lvuntsmModelTemp: VLivingUnitSummaries = new VLivingUnitSummaries();
  lvuntsmModelTempData: VLivingUnitSummaries = new VLivingUnitSummaries();
  lvuntsmIndex: number;
  lvuntsmInsertList: VLivingUnitSummaries[] = [];
  lvuntsmUpdatetList: VLivingUnitSummaries[] = [];
  lvuntsmDeleteList: VLivingUnitSummaries[] = [];
  itlcsmData: any[] = [];
  itlcsmDataTemp: VIntLocSummaries[] = [];
  itlcsmModel: VIntLocSummaries = new VIntLocSummaries();
  itlcsmModelTemp: VIntLocSummaries = new VIntLocSummaries();
  itlcsmIndex: number;
  itlcsmInsertList: VIntLocSummaries[] = [];
  itlcsmUpdatetList: VIntLocSummaries[] = [];
  itlcsmDeleteList: VIntLocSummaries[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  rollListColumnDef: any[];
  offCaseNrColumnDef: any[];
  teamsColumnDef: any[];
  perAddrColumnDef: any[];
  perIdentColumnDef: any[];
  profilesColumnDef: any[];
  perEmpColumnDef: any[];
  offNotesColumnDef: any[];
  offCntPerColumnDef: any[];
  bedAhColumnDef: any[];
  resBlColumnDef: any[];
  contactsColumnDef: any[];
  offCntPerReadOnly: boolean;
  perAddrReadOnly: boolean;
  perIdentReadOnly: boolean;
  perInfoReadOnly: boolean;
  perEmpReadOnly: boolean;
  contactsReadOnly: boolean;
  offCaseNoteReadOnly: boolean;
  amendNoteReadOnly: boolean;
  personsReadOnly: boolean;
  offCaseNrReadOnly: boolean;
  profilesReadOnly: boolean;
  srchCtrlReadOnly: boolean;
  teamsReadOnly: boolean;
  butCtrlReadOnly: boolean;
  crtMvTmpReadOnly: boolean;
  bedAhReadOnly: boolean;
  offNotesReadOnly: boolean;
  cntlReadOnly: boolean;
  vOffBkgReadOnly: boolean;
  sysPflReadOnly: boolean;
  subRemCntReadOnly: boolean;
  resBlReadOnly: boolean;
  cg$ctrlReadOnly: boolean;
  rollListReadOnly: boolean;
  estCtrlReadOnly: boolean;
  rgagylocRg: any[] = [];
  caseloadId: any;
  reasonLink: any;
  indexVal: number;
  intloIndex = -1;
  tableIndex = -1;
  msglist = [];
  message = ' Invalid.';
  type = 'error';
  livingUnitId: any;
  internalLocationId: any;
  livingUDesc: any;
  readonlyRelease: boolean;
  nextReadOnly: boolean;
  previousReadOnly: boolean;
  previousItlcsReadOnly: boolean;
  nextItlcsReadOnly: boolean;
  flag = false;
  clearReadOnly: boolean;
  releaseInsert: boolean;
  releaseItlcsInsert: boolean;
  facility: any;
  itlcsmTotalData: any[] = [];
  constructor(private oiiprollFactory: OiiprollService,
    public translateService: TranslateService,
    private sessionManager: UserSessionManager) {
    this.rollListColumnDef = [];
    this.offCaseNrColumnDef = [];
    this.teamsColumnDef = [];
    this.perAddrColumnDef = [];
    this.perIdentColumnDef = [];
    this.profilesColumnDef = [];
    this.perEmpColumnDef = [];
    this.offNotesColumnDef = [];
    this.offCntPerColumnDef = [];
    this.bedAhColumnDef = [];
    this.resBlColumnDef = [];
    this.contactsColumnDef = [];
  }
  onGridReady(event) {
  }
  ngOnInit() {
    this.nextReadOnly = true;
    this.readonlyRelease = true;
    this.previousReadOnly = true;
    this.previousItlcsReadOnly = true;
    this.clearReadOnly = true;
    this.nextItlcsReadOnly = true;
    this.flag = true;
    this.releaseInsert = false;
    this.releaseItlcsInsert = false;
    this.caseloadId = this.sessionManager.currentCaseLoad;
    this.reasonLink = 'oiiproll/rgAgyLocRecordGroup?caseloadId=' + this.caseloadId;
    this.rollListColumnDef = [
      { fieldName: this.translateService.translate('common.description'), field: 'livingUnitDesc', editable: false, width: 150 },
      { fieldName: this.translateService.translate('oiiproll.maximumcapacity'), field: 'capacity', editable: false, width: 120 },
      {
        fieldName: this.translateService.translate('oiiproll.currentlyassigned'), field: 'allocated',
        editable: false, width: 120
      },
      {
        fieldName: this.translateService.translate('oiiproll.view'), field: 'goButton', datatype: 'launchbutton', link: '/OIIUNROL', modal: true,
        data: 'calaunchbutton', editable: true, dialogWidth: 70, onLaunchClick: this.caGoBtnClick, width:100
      },
      {
        fieldName: this.translateService.translate('oiiproll.currentlyincell'), field: 'inLivingUnits',
        editable: false, width: 120
      },
      {
        fieldName: this.translateService.translate('oiiproll.view'), field: 'goButton1', datatype: 'launchbutton', link: '/OIIUNROL', modal: true,
        data: 'cclaunchbutton', editable: true, dialogWidth: 70, onLaunchClick: this.caGoBtnClick, width:100
      },
      {
        fieldName: this.translateService.translate('common.internallocations'), field: 'outOfLivingUnits',
        editable: false, width: 120
      },
      {
        fieldName: this.translateService.translate('oiiproll.view'), field: 'goButton2', datatype: 'launchbutton', link: '/OIIUNROL', modal: true,
        data: 'illaunchbutton', editable: true, dialogWidth: 70, onLaunchClick: this.caGoBtnClick, width:100
      },
      { fieldName: this.translateService.translate('oiiproll.currentlyout'), field: 'outOfAgy', editable: false, width: 120 },
      {
        fieldName: this.translateService.translate('oiiproll.view'), field: 'goButton3', datatype: 'launchbutton', link: '/OIIUNROL', modal: true,
        data: 'colaunchbutton', editable: true, dialogWidth: 70, onLaunchClick: this.caGoBtnClick, width:100
      },
      { fieldName: this.translateService.translate('oiiproll.reservedbeds'), field: 'reservedBeds', editable: false, width: 120 },
      { fieldName: this.translateService.translate('oiiproll.physicalvacancies'), field: 'vacancy', editable: false, width: 120 },
      {
        fieldName: this.translateService.translate('oiiproll.unitcapacity'), field: 'filledFlag',
        editable: false, datatype: 'checkbox', width: 100
      },
    ];
    this.teamsColumnDef = [
      {
        fieldName: this.translateService.translate('common.internallocation'), field: 'internalLocationDesc',
        editable: false, width: 150, datatype:'text'
      },
      { fieldName: this.translateService.translate('oiiproll.currentcount'), field: 'inLocations', editable: false, width: 150, datatype:'text' },
      {
        fieldName: this.translateService.translate('oiiproll.view'), field: 'goButton', datatype: 'launchbutton', link: '/OIIINROL', modal: true,
        data: 'row', editable: true, dialogWidth: 70, onLaunchClick: this.ilGoBtnClick, width: 200
      },
    ];
    this.oiiprollFactory.whenNewRecordInstance().subscribe(agyLocId => {
      if (agyLocId !== null && typeof agyLocId === 'string') {
        this.facility = agyLocId;
      } else {
        this.facility = '';
      }

    });
  }
  ok() {
  }
  no() {
  }
  cancel() {
    this.facility = '';
    this.lvuntsmModel = new VLivingUnitSummaries();
    this.itlcsmModel = new VIntLocSummaries();
    this.lvuntsmData = [];
    this.itlcsmData = [];
    this.lvuntsTotalData = [];
    this.itlcsmTotalData = [];
    this.previousReadOnly = true;
    this.nextReadOnly = true;
    this.previousItlcsReadOnly = true;
    this.nextItlcsReadOnly = true;
  }
  /**
  *  This function will be executed when we click on Currently Assigned Go button in grid
  *
  */
  caGoBtnClick = (event) => {
    if (event.allocated > 0) {
      return true;
    } else if (event.inLivingUnits > 0) {
      return true;
    } else if (event.outOfLivingUnits > 0) {
      return true;
    } else if (event.outOfAgy > 0) {
      return true;
    }
    return false;
  }
  ilGoBtnClick = (event) => {
    if (event.inLocations > 0) {
      return true;
    }
    return false;
  }
  onOffenderChange(offender) {
  }
  onRowClicklvuntsm(event) {
    if (event) {
      this.lvuntsmModel = event;
      if (event.nextButton === 'Y') {
        this.nextReadOnly = false;
      } else {
        this.nextReadOnly = true;
      }
    }
  }
  onRowClickitlcsm(event) {
    if (event) {
      this.itlcsmModel = event;
      if (event.nextButton === 'Y') {
        this.nextItlcsReadOnly = false;
      } else {
        this.nextItlcsReadOnly = true;
      }
    }
  }
  clickFacility() {
    if (this.flag === true) {
      this.type = 'warn';
      this.message = this.translateService.translate('oiiproll.facilitymustbeentered');
      this.show();
      return;
    }
  }
  onGridInsert = () => {
    this.type = 'warn';
    this.message = this.translateService.translate('oiiproll.youcannotcreaterecord');
    this.show();
    return;
  }
  onGridDelete = () => {
    this.type = 'warn';
    this.message = this.translateService.translate('oiiproll.youcannotdeleterecord');
    this.show();
    return;
  }
  lvuntsmTestExecuteQuery(type) {
    this.lvuntsmModelTempData.parentLivingUnitId = this.lvuntsmModelTempData.livingUnitId;
    const lvuntsmResult = this.oiiprollFactory.lvUntSmExecuteQuery(this.lvuntsmModelTempData, type);
    lvuntsmResult.subscribe(data => {
      if (data.length === 0) {
        this.nextReadOnly = true;
      } else {
        this.nextReadOnly = false;
      }
    });
  }
  lvuntsmExecuteQuery(type) {
    const lvuntsmResult = this.oiiprollFactory.lvUntSmExecuteQuery(this.lvuntsmModel, type);
    lvuntsmResult.subscribe(data => {
      if (data.length === 0) {
        this.lvuntsmData = [];
        this.releaseInsert = false;
        this.type = 'warn';
        this.message = this.translateService.translate('common.querycaused');
        this.show();
        this.lvuntsTotalData = [];
        return;
      } else {
        // goButton
        data.forEach(element => {
          element['goButton'] = 'Go';
          element['goButton1'] = 'Go';
          element['goButton2'] = 'Go';
          element['goButton3'] = 'Go';
          element['calaunchbutton'] = {
            'type': 'CA', Id: element.livingUnitId, agyLocId: element.agyLocId,
            bedLocation: element.agyLocId + '-' + element.livingUnitDesc, allocated: element.allocated
          };
          element['cclaunchbutton'] = {
            'type': 'CC', Id: element.livingUnitId, agyLocId: element.agyLocId,
            bedLocation: element.agyLocId + '-' + element.livingUnitDesc, allocated: element.inLivingUnits
          };
          element['illaunchbutton'] = {
            'type': 'IL', Id: element.livingUnitId, agyLocId: element.agyLocId,
            bedLocation: element.agyLocId + '-' + element.livingUnitDesc, allocated: element.outOfLivingUnits
          };
          element['colaunchbutton'] = {
            'type': 'CO', Id: element.livingUnitId, agyLocId: element.agyLocId,
            bedLocation: element.agyLocId + '-' + element.livingUnitDesc, allocated: element.outOfAgy
          };
          element.filledFlag = element.filledFlag === 'Y' ? 'Y' : null;
          if (element.outOfLivingUnits === 0) {
            element.outOfLivingUnits = '';
          }
          if (element.inLivingUnits === 0) {
            element.inLivingUnits = '';
          }
          if (element.outOfAgy === 0) {
            element.outOfAgy = '';
          }
        });
        this.lvuntsmData = data;
        this.lvuntsmModel = data[0];
        this.previousReadOnly = false;
        this.releaseInsert = true;
        this.tableIndex = 0;
        this.lvUntSmTotalCount(type);
      }
    });
  }
  lvUntSmTotalCount(type) {
    const lvuntsmResult = this.oiiprollFactory.lvUntSmTotalCount(this.lvuntsmModel, type);
    lvuntsmResult.subscribe(data => {
      if (!data) {
        this.lvuntsmData = [];
        this.lvuntsTotalData = [];
        this.type = 'warn';
        this.message = this.translateService.translate('common.querycaused');
        this.show();
        return;
      } else {
        this.lvuntsmModelTemp = new VLivingUnitSummaries();
        this.lvuntsmModelTemp = data;
        this.lvuntsmModelTemp['livingUnitDesc'] = 'Totals';
        const totalData = [];
        totalData.push(this.lvuntsmModelTemp);
        this.lvuntsTotalData = totalData;
        this.itlcsmModel = new VIntLocSummaries();
        this.itlcsmModel.agyLocId = this.lvuntsmModel.agyLocId;
      }
    });
  }
  itlcsmExecuteQuery(type) {
    const itlcsmResult = this.oiiprollFactory.itLcSmExecuteQuery(this.itlcsmModel, type);
    itlcsmResult.subscribe(itlcsmResultList => {
      if (itlcsmResultList.length === 0) {
        this.itlcsmData = [];
        this.itlcsmTotalData = [];
        this.releaseItlcsInsert = false;
      } else {
        itlcsmResultList.forEach(element => {
          element['goButton'] = 'Go';
          element['goButton1'] = 'Go';
          element['goButton2'] = 'Go';
          element['goButton3'] = 'Go';
          if (element.inLocations === 0) {
            element.inLocations = '';
          }
        });
        this.itlcsmData = itlcsmResultList;
        this.itlcsmModel = itlcsmResultList[0];
        this.intloIndex = 0;
        this.previousItlcsReadOnly = false;
        this.clearReadOnly = false;
        this.releaseItlcsInsert = true;
        this.itLcSmTotalCount(type);
      }
    });
  }
  itLcSmTotalCount(type) {
    const itlcsmResult = this.oiiprollFactory.itLcSmTotalCount(this.itlcsmModel, type);
    itlcsmResult.subscribe(itlcsmResultList => {
      if (!itlcsmResultList) {
        this.itlcsmData = [];
        this.itlcsmTotalData = [];
      } else {
        this.itlcsmModelTemp = new VIntLocSummaries();
        this.itlcsmModelTemp = itlcsmResultList;
        this.itlcsmModelTemp['internalLocationDesc'] = 'Totals';
        const itlcsTotalData = [];
        itlcsTotalData.push(this.itlcsmModelTemp);
        this.itlcsmTotalData = itlcsTotalData;
        itlcsTotalData.forEach(element => {
          if (element.inLocations === 0) {
            element.inLocations = '';
          }
        });
      }
    });
  }
  changeCenterType(event) {
    if (event && event.code) {
      this.flag = false;
      this.lvuntsmModel = new VLivingUnitSummaries();
      this.lvuntsmModel.agyLocId = event.code;
      this.lvuntsmExecuteQuery('E');
      this.itlcsmModel.agyLocId = event.code;
      this.itlcsmExecuteQuery('E');
    }
  }
  onPreviousButton() {
    if (this.lvuntsmModel.parentLivingUnitId) {
      this.lvuntsmExecuteQuery('P');
    } else {
      this.type = 'warn';
      this.message = this.translateService.translate('oiiproll.thesearethetoplevelunitrolls');
      this.show();
    }


  }
  onNextButton() {
    this.lvuntsmModel.parentLivingUnitId = this.lvuntsmModel.livingUnitId;
    this.lvuntsmExecuteQuery('N');
  }
  onItlcsmPrvsButton() {
    if (this.itlcsmModel.parentInternalLocationId) {
      this.itlcsmExecuteQuery('P');
    } else {
      this.type = 'warn';
      this.message = this.translateService.translate('oiiproll.thesearethetoplevelinternallocations');
      this.show();
    }
  }
  onItlcsmNxtButton() {
    this.itlcsmModel.parentInternalLocationId = this.itlcsmModel.internalLocationId;
    this.itlcsmExecuteQuery('N');
  }
  onClearButton() {
    this.type = 'warn';
    this.message = this.translateService.translate('oiiproll.cannotqueryrecordshere');
    this.show();
    return;
  }
  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }
  setClearDisale() {
    if (this.facility) {
            return false;
    } else {
            return true;
    }
}
}
