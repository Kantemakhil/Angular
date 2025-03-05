import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSelectionListChange } from "@angular/material/list";
import { TranslateService } from "@common/translate/translate.service";
import { OimprostService } from "../service/oimprost.service";


@Component({
  selector: "app-oimprost",
  templateUrl: "./oimprost.component.html",
})
export class OimprostComponent implements OnInit {

  @ViewChild('managePropGrid', { static: false }) managePropGrid: any;
  @ViewChild('configs', { read: ElementRef, static: true }) configs: ElementRef;


  msgs: { message: any; type: any }[];
  defaultSelected: any;
  isSelectedTitle: string;
  settingConfigs: { titleName: string; code: string }[];
  managePropRowData: any[] = [];
  managePropColumnDef = [];
  defaultSelectedTitle: string;
  isSelectedCode: any;
  constructor(public translateService: TranslateService,
    public oimprostService: OimprostService) {

  }

  ngOnInit() {
    this.managePropColumnDef = [

      {
        fieldName: this.translateService.translate('Key Desc'),
        field: 'settingDescription', editable: true, width: 250, datatype: 'text', maxlength: 50,
        required: true, uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('Key Code'),
        field: 'settingCode', editable: false, width: 200,
      },
      {
        fieldName: this.translateService.translate('Value'),
        field: 'propertyValue', editable: true, width: 250, datatype: 'lov',
        link: 'oimprost/getPropertySettingLovValues', required: true
      },

    ];

    this.createPropertySettingConfigs();
  }
  createPropertySettingConfigs() {
    this.settingConfigs = [
      { titleName: this.translateService.translate('oimprost.manageproperty'), code: 'PROP_CON_ID' },
    ];
    this.defaultSelectedTitle = this.settingConfigs[0].titleName;
    this.defaultSelected = this.settingConfigs[0].code;
    this.isSelectedTitle = this.settingConfigs[0].titleName;
    this.isSelectedCode = this.settingConfigs[0].code;
    this.getManagePropConfigData(this.defaultSelected);
  }
  onSelectionChange(ev: MatSelectionListChange, v, sel) {
    if (v?.selected[0]?.value) {
      this.isSelectedTitle = this.settingConfigs.filter(e => e.code === v.selected[0].value)[0]?.titleName;
      this.isSelectedCode = v.selected[0].value;
      this.getManagePropConfigData(this.isSelectedCode);
    }

  }

  show(vldmsg, type?) {
    type = type ? type : "warn";
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }

  managePropConfigTitles = {
    module: this.translateService.translate('common.description')
  };


  getManagePropConfigData(propertyCode) {
    const propertySettings = { settingCode: propertyCode };
    this.oimprostService.getPropertySettingData(propertySettings).subscribe((result) => {

      if (result && result.length > 0) {
        result.forEach(e => {
          const propertyValue = JSON.parse(e.settingValueString);
          e['propertyValue'] = propertyValue.VALUE;
        });
        this.managePropRowData = result;
      } else {
        this.managePropRowData = [];
      }
    });
  }

  saveManagePropConfig(event) {
    const propertyUpdatedList = event.updated;
    if (propertyUpdatedList?.length > 0) {
      let propertySettings = propertyUpdatedList[0];
      if (!propertySettings.settingDescription || propertySettings.settingDescription.trim() == '') {
        this.show(this.translateService.translate("oimprost.keymustbeentered"), "warn");
      } else if (!propertySettings.propertyValue) {
        this.show(this.translateService.translate("oimprost.valuemustbeentered"), "warn");
      }
      const propertyValue = JSON.parse(propertySettings.settingValueString);
      propertyValue.VALUE = propertySettings.propertyValue;
      propertySettings.settingValueString = JSON.stringify(propertyValue);

      this.oimprostService.updatePropertySettingData(propertySettings).subscribe(result => {
        if (result === 1) {
          this.show(
            this.translateService.translate("oimprost.recordUpdatedSuccessfully"),
            "success"
          );
          this.getManagePropConfigData(this.isSelectedCode);
        } else {
          this.show(
            this.translateService.translate("oimprost.recordNotUpdated"),
            "warn"
          );
        }

      });
    }
  }

}