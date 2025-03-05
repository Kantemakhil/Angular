import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OsinamesService } from '../service/osinames.service';
import { VNameSearch2 } from '@cmsearchassaignbeans/VNameSearch2';
import { Router } from '@angular/router';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
// import required bean declarations

@Component({
  selector: 'app-osinamesdialog',
  templateUrl: './osinamesdialog.component.html'
})


export class OsinamesdialogComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;

  msgs: any[] = [];
  nameOfLovPage: string;
  namesrchData: VNameSearch2[] = [];
  namesrchDataTemp: VNameSearch2[] = [];
  namesrchModel: VNameSearch2 = new VNameSearch2();
  namesrchIndex: number;
  namesrchModelTemp: VNameSearch2 = new VNameSearch2();
  namesrchModelTempBean: VNameSearch2 = new VNameSearch2();
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  nameSrchColumnDef: any[];
  crtMvTmpReadOnly: boolean;
  bedAhReadOnly: boolean;
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
  constructor(private osinamesFactory: OsinamesService, public translateService: TranslateService, private router: Router,
  ) {
    this.nameSrchColumnDef = [];
  }
  ngOnInit() {
    this.namesrchModelTempBean.moduleName = this.router.url;
    this.clearDisable = false;
    this.selectDisable = true;
    this.retriveDisable = false;
    this.nameSrchColumnDef = [
      {
        fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
        editable: true, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
        editable: true, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay',
        editable: true, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'agyLocId',
        editable: true, width: 150
      },
      { fieldName: this.translateService.translate('common.status'), field: 'activeFlag', editable: true, width: 150 },

      {
        fieldName: this.translateService.translate('oiinames.housinglocation'), field: 'livingUnitDescription',
        editable: true, width: 150
      },
      {
        fieldName: this.translateService.translate('system-profile.comm-agency'), field: 'communityAgyLocId',
        editable: true, width: 150
      },
      { fieldName: this.translateService.translate('common.status'), field: 'communityActiveFlag', editable: true, width: 150 }
    ];
  }
  onOffenderChange() {
    this.dialog.close({
      offenderIdDisplay: this.namesrchModelTemp.offenderIdDisplay, lastName: this.namesrchModelTemp.lastName,
      firstName: this.namesrchModelTemp.firstName,
      offenderBookId: this.namesrchModelTemp.offenderBookId,
      offenderId: this.namesrchModelTemp.offenderId, livingUnitDescription: this.namesrchModelTemp.livingUnitDescription,
      agyLocId : this.namesrchModelTemp.agyLocId, description : this.namesrchModelTemp.description
    });
  }
  clear() {
    this.namesrchData = [];
    this.namesrchModel = new VNameSearch2();
    this.namesrchModelTemp = new VNameSearch2();
    this.namesrchModelTempBean = new VNameSearch2();
    this.clearDisable = false;
    this.selectDisable = true;
    this.retriveDisable = false;
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
    this.namesrchModelTempBean.moduleName = this.router.url.replace('/', '');
    if (this.namesrchModelTempBean.activeFlag || this.namesrchModelTempBean.communityActiveFlag) {
      this.namesrchModelTempBean.activeFlag = undefined;
      this.namesrchModelTempBean.communityActiveFlag = undefined;
    }
    const namesrchResult = this.osinamesFactory.
      nameSrchExecuteQuery(this.namesrchModelTempBean);
    namesrchResult.subscribe(data => {
      if (data.length === 0) {
        this.namesrchData = [];
        this.type = 'warn';
        this.message = this.translateService.translate('common.querycaused');
        this.show();
        return;
      } else {
        for (let i = 0; i < data.length; i++) {
          data[i].activeFlag = data[i].activeFlag === 'Y' ? 'A' : 'I';
          data[i].communityActiveFlag = data[i].communityActiveFlag === 'Y' ? 'A' : 'I';
        }
        this.namesrchData = data;
        this.namesrchModel = data[0];
        this.clearDisable = false;
        this.selectDisable = false;
        this.retriveDisable = true;
        this.tableIndex = 0;

      }
    });
  }
  butCancelWhenButtonPressedTrigger() {
    this.dialog.close(null);
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


