import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OsinamesService } from '../service/osinames.service';
import { VNameSearch2 } from '@cmsearchassaignbeans/VNameSearch2';
import { Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';

// import required bean declarations

@Component({
  selector: 'app-osinames',
  templateUrl: './osinames.component.html'
})

export class OsinamesComponent implements OnInit {
  // Variable declaration
  @ViewChild('grid') grid: any;
  actionName: string;
  msgs: any[] = [];
  namesrchData: VNameSearch2[] = [];
  namesrchDataTemp: VNameSearch2[] = [];
  namesrchModel: VNameSearch2 = new VNameSearch2();
  namesrchIndex: number;
  namesrchInsertList: VNameSearch2[] = [];
  namesrchUpdatetList: VNameSearch2[] = [];
  namesrchDeleteList: VNameSearch2[] = [];
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  namesrchModelTemp: VNameSearch2 = new VNameSearch2();
  display: boolean;
  disabled: boolean;
  nameSrchColumnDef: any[];
  bedAhColumnDef: any[];
  resBlColumnDef: any[];
  crtMvTmpReadOnly: boolean;
  bedAhReadOnly: boolean;
  vOffBkgReadOnly: boolean;
  sysPflReadOnly: boolean;
  resBlReadOnly: boolean;
  nameSrchReadOnly: boolean;
  routUrl: string;
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  tableIndex = -1;
  clearDisable: boolean;
  selectDisable: boolean;
  retriveDisable: boolean;
  onaddflag = true;
  clearFlag: boolean;
  @ViewChild('osinamesForm', {static: true}) form: any;
  cancelDisable: boolean;

  constructor(private osinamesFactory: OsinamesService, public translateService: TranslateService,
    private offenderSearchService: OffenderSearchService, private sessionManager: UserSessionManager,
    private osiosearFactory: OsiosearService,
    private router: Router) {
    this.nameSrchColumnDef = [];
    this.bedAhColumnDef = [];
    this.resBlColumnDef = [];
  }
  ngOnInit() {
    this.clearDisable = true;
    this.selectDisable = true;
    this.retriveDisable = false;
    this.cancelDisable = false;
    this.nameSrchColumnDef = [
      {
        fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
        editable: true, width: 150, datatype: 'text', cellEditable: this.canNameSearchEdit,
      },
      {
        fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
        editable: true, width: 150, datatype: 'text', cellEditable: this.canNameSearchEdit
      },
      {
        fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay',
        editable: true, width: 150, datatype: 'hyperlink', link: '/INSDSBVW', displayas: 'href',
        queryparam: 'offenderIdDisplay', data: 'row', cellEditable: this.canNameSearchEdit
      },
      {
        fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'agyLocId',
        editable: true, width: 150, cellEditable: this.canNameSearchEdit
      },
      {
        fieldName: this.translateService.translate('common.status'), field: 'activeFlag', editable: true, width: 150,
        cellEditable: this.canNameSearchEdit
      },

      {
        fieldName: this.translateService.translate('oiinames.housinglocation'), field: 'livingUnitDescription',
        editable: true, width: 150, cellEditable: this.canNameSearchEdit
      },
      {
        fieldName: this.translateService.translate('system-profile.comm-agency'), field: 'communityAgyLocId',
        editable: true, width: 150, cellEditable: this.canNameSearchEdit
      },
      {
        fieldName: this.translateService.translate('common.status'), field: 'communityActiveFlag', editable: true, width: 150,
        cellEditable: this.canNameSearchEdit
      }
    ];
    this.form.valueChanges.subscribe(data => {
      const keys = Object.keys(data);
      const count = { i: 0 };
      if (this.namesrchData.length === 0) {
        do {
          if (!data[keys[count.i]]) {
            this.clearDisable = true;
          } else {
            this.clearDisable = false;
          }
          count.i++;
        } while (this.clearDisable && count.i < keys.length);
      }
    });
  }
  onOffenderChange() {
    // this.osiosearFactory.selectOffender.offenderId = null;
    // this.offenderSearchService.selectedOffender = null;
    this.osinamesFactory.oiinamesflag = true;
    this.vHeaderBlockModel.middleName = this.namesrchModelTemp.middleName;
    this.vHeaderBlockModel.lastName = this.namesrchModelTemp.lastName;
    this.vHeaderBlockModel.firstName = this.namesrchModelTemp.firstName;
    this.vHeaderBlockModel.offenderIdDisplay = this.namesrchModelTemp.offenderIdDisplay;
    this.vHeaderBlockModel.bookingNo = this.namesrchModelTemp.bookingNo;
    this.vHeaderBlockModel.movementReason = this.namesrchModelTemp.agyLocId;
    this.vHeaderBlockModel.prisonLocation = this.namesrchModelTemp.livingUnitDescription;
    this.vHeaderBlockModel.birthDate = this.namesrchModelTemp.birthDate;
    this.vHeaderBlockModel.status1 = this.namesrchModelTemp.inOutStatus;
    this.vHeaderBlockModel.age = this.namesrchModelTemp.age;
    this.vHeaderBlockModel.gender = this.namesrchModelTemp.gender;
    this.vHeaderBlockModel.offAlerts = this.namesrchModelTemp.offAlerts;
    this.vHeaderBlockModel.offSupLevel = this.namesrchModelTemp.offSupLevel;
    this.vHeaderBlockModel.offenderBookId = this.namesrchModelTemp.offenderBookId;
    this.vHeaderBlockModel.offenderId = this.namesrchModelTemp.offenderId;
    this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
    if (this.namesrchModelTemp.activeFlag.localeCompare('A') === 0) {
      this.vHeaderBlockModel.statusDisplay = 'Active';
    } else {
      this.vHeaderBlockModel.statusDisplay = 'Inactive';
    }
    this.osinamesFactory.offsearch = {
      'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
      'fname': this.namesrchModelTemp.firstName,
      'offenderBookId': this.namesrchModelTemp.offenderBookId, 'nbtInst': this.namesrchModelTemp.agyLocId,
      'offenderId': this.namesrchModelTemp.offenderId
    };
    this.getSelectedRow();
    // if (this.routUrl) {
    //   this.router.navigate([this.routUrl, {queryparam: this.vHeaderBlockModel.offenderIdDisplay}]);
    //   return;
    // }
    // if (!this.osinamesFactory.oiiflag) {
    //   this.osinamesFactory.oiinamesflag = false;
    //   this.router.navigate(['/home']);
    //   return;
    // }

  }
  getSelectedRow(){
    let selectedNode = this.grid.gridApi.getSelectedRows();
    let routeUrl;
    for (let i=0; i<this.nameSrchColumnDef.length; i++){
      if (this.nameSrchColumnDef[i].field === 'offenderIdDisplay'){
        routeUrl = this.nameSrchColumnDef[i].link.replace(/"/g, "'");
      }
    }
    if (selectedNode){
      this.router.navigate([routeUrl], { queryParams: { 'offenderIdDisplay': this.vHeaderBlockModel.offenderIdDisplay }});
    }
  }
  ok(event?) {
    this.namesrchExecuteQuery();
  }
  clear() {
    this.namesrchData = [];
    this.namesrchModel = new VNameSearch2();
    this.onaddflag = true;
    this.clearDisable = true;
    this.selectDisable = true;
    this.retriveDisable = false;
    this.cancelDisable = false;
  }

  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }
  canNameSearchEdit = (data: any, index: number, field: string): boolean => {
    return this.onaddflag;
  }
  onRowClickagyincpartiesoffender(event) {
    if (event) {
      this.namesrchModelTemp = event;
      this.osinamesFactory.offenderRowData.push(this.namesrchModelTemp);
    }
  }
  namesrchExecuteQuery() {
    this.namesrchModelTemp.moduleName = this.sessionManager.currentCaseLoad;
    if (this.namesrchModel.activeFlag || this.namesrchModel.communityActiveFlag) {
      this.namesrchModel.activeFlag = undefined;
      this.namesrchModel.communityActiveFlag = undefined;
    }
    const namesrchResult = this.osinamesFactory.
      nameSrchExecuteQuery(this.namesrchModel);
    namesrchResult.subscribe(data => {
      if (data.length === 0) {
        this.namesrchData = [];
        this.type = 'warn';
        this.retriveDisable = false;
        this.message = this.translateService.translate('common.querycaused');
        this.show();
        return;
      } else {

        for (let i = 0; i < data.length; i++) {
          data[i].activeFlag = data[i].activeFlag === 'Y' ? 'A' : 'I';
          data[i].communityActiveFlag = data[i].communityActiveFlag === 'Y' ? 'A' : 'I';
        }
        this.namesrchData = data;
        this.namesrchModel = data;
        this.onaddflag = false;
        this.clearDisable = false;
        this.selectDisable = false;
        this.retriveDisable = true;
        this.clearFlag = false;
        this.cancelDisable = true;
        this.tableIndex = 0;

      }
    });
  }

  butCancelWhenButtonPressedTrigger() {
    if (this.routUrl) {
      this.router.navigate([this.routUrl]);
      return;
    }
    if (!this.osinamesFactory.oiiflag) {
      this.osinamesFactory.oiinamesflag = false;
      this.router.navigate(['/home']);
    }
  }

  onlyAlphabetallowed(event:any){
    let charcode = event.keyCode;
    if (charcode == 39  || charcode == 32 || charcode == 45 || (charcode >= 65 && charcode <= 90) || (charcode >= 97 && charcode <= 122)){
        return true; //validation for " ' , a-z , A-Z "
    }  
    return false;
}

onPaste(event){
    let str = event.clipboardData.getData('text');
    for (let i = 0; i < str.length; i++) {
        let kC = str.charAt(i).charCodeAt(0);
        let ev = { keyCode : kC}
        if(!this.onlyAlphabetallowed(ev)){
           return false;
        }
    }
    return true;
}
}


