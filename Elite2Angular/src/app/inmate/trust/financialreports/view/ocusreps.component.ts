import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcusrepsService } from '../service/ocusreps.service';
import { OmsModules } from '@sa/usersystemsecurity/beans/OmsModules';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
  selector: 'app-ocusreps',
  templateUrl: './ocusreps.component.html'
})

export class OcusrepsComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  omsmodulesData: OmsModules[] = [];
  omsmodulesDataTemp: OmsModules[] = [];
  omsmodulesModel: OmsModules = new OmsModules();
  omsmodulesIndex: number;
  omsmodulesInsertList: OmsModules[] = [];
  omsmodulesUpdatetList: OmsModules[] = [];
  omsmodulesDeleteList: OmsModules[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  offDrColumnDef: any[];
  offDedColumnDef: any[];
  omsModulesColumnDef: any[];
  offBncColumnDef: any[];
  offDedReadOnly: boolean;
  offBncReadOnly: boolean;
  offDrReadOnly: boolean;
  sysPflReadOnly: boolean;
  offDed1ReadOnly: boolean;
  cg$ctrlReadOnly: boolean;
  omsModulesReadOnly: boolean;
  tableIndex = -1;
  description: any;
  butSelectDisable: boolean;
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  constructor(private ocusrepsFactory: OcusrepsService,
    public translateService: TranslateService,
    public dialogService: DialogService) {
    this.offDrColumnDef = [];
    this.offDedColumnDef = [];
    this.omsModulesColumnDef = [];
    this.offBncColumnDef = [];
  }
  onGridReady(event) {
  }
  ngOnInit() {
    this.butSelectDisable = true;
    this.description = this.dialog.data;
    if (this.description) {
      this.omsmodulesExecuteQuery();
    }
    this.omsModulesColumnDef = [
      { fieldName: this.translateService.translate('ocusreps.reportname'), field: 'description', editable: false, width: 150 },
      { fieldName: this.translateService.translate('ocusreps.reportcode'), field: 'moduleName', editable: false, width: 150 },
    ];
  }
  allowNumbers(event) {
  }
  onButSearchclick() {
  }
  onRowClickomsmodules(event) {
    if (event) {
      this.omsmodulesModel = event;
      if (this.omsmodulesModel.moduleName) {
        this.butSelectDisable = false;
      } else {
        this.butSelectDisable = true;
      }
      if (this.omsmodulesModel.moduleName === 'OTRTASTA' || this.omsmodulesModel.moduleName === 'OTRBALAN'
        || this.omsmodulesModel.moduleName === 'OTRBNRCN' || this.omsmodulesModel.moduleName === 'OTRDRECE'
        || this.omsmodulesModel.moduleName === 'OTRRECEI' || this.omsmodulesModel.moduleName === 'OTRBSTAT'
        || this.omsmodulesModel.moduleName === 'OTRSSTAT') {
        this.butSelectDisable = false;
      } else {
        this.butSelectDisable = true;
      }
    } else {
      this.butSelectDisable = true;
    }
  }
  ok() {
    this.dialog.close({
      description: this.omsmodulesModel.description, code: this.omsmodulesModel.moduleName
    });
  }
  no() {
  }
  cancel() {
    this.dialog.close(null);
  }
  onOffenderChange(offender) {
  }
  omsmodulesExecuteQuery() {
    if (this.description) {
      this.omsmodulesModel.description = this.description;
    } else {
      this.omsmodulesModel.description = null;
    }
    const omsmodulesResult = this.ocusrepsFactory.omsModulesExecuteQuery(this.omsmodulesModel);
    omsmodulesResult.subscribe(omsmodulesResultList => {
      if (omsmodulesResultList.length === 0) {
        this.omsmodulesData = [];
        this.butSelectDisable = true;
        this.type = 'warn';
        this.message = this.translateService.translate('common.querycaused');
        this.show();
        return;
      } else {
        this.omsmodulesData = omsmodulesResultList;
        this.butSelectDisable = false;
        this.tableIndex = 0;
      }
    });
  }
  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }
  clearQuery() {
    this.description = undefined;
    this.omsmodulesData = [];
  }
  get clearBtn() {
    if ((this.description && this.description !== ' ') || this.omsmodulesData.length > 0) {
      return false;
    }
    return true;
  }
}
