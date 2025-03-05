
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { LivingUnits } from '@inst/demographics-biometrics/beans/LivingUnits';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OimoffobService } from '../service/oimoffob.service';

@Component({
  selector: 'app-oiuzohos',
  templateUrl: './oiuzohos.component.html',
})
export class OiuzohosComponent implements OnInit {

  @ViewChild('offcrsattGrid', { static: true }) offcrsattGrid: any;
  @ViewChild('dialog', { static: true }) dialog: DialogComponent;
  @ViewChild('housongSelection', { static: true }) housongSelection: any;
  unitType: any;
  msgs: any[] = [];
  unitTypeValue: any;
  facility: any;
  Level1Lov: any;
  level1Value: any;
  Level2Lov: any;
  level2Value: any;
  Level3Lov: any;
  level3Value: any;
  Level4Lov: any;
  level4Value: any;
  livunitsModel: LivingUnits = new LivingUnits();
  selectedRowModel: LivingUnits = new LivingUnits();
  housingSelectionRowData: LivingUnits[] = [];
  housingSelectionColumnDef: any[];
  wingLivingUnitId: number;
  cellLivingUnitId: number;
  tableIndex = -1;
  level1ReadOnly: boolean;
  level2ReadOnly: boolean;
  level3ReadOnly: boolean;
  level4ReadOnly: boolean;
  unitTypeReadOnly: boolean;
  disableSearchbutton: boolean;
  disableClearbutton: boolean;
  disableSelectbutton: boolean;
  checkFlag: boolean;
  disableSelectAll: boolean;
  selectAll: boolean;
  indexNum:number=-1;
  selectValue: any;
  housingLevel1Name: any;
  housingLevel2Name: any;
  housingLevel3Name: any;
  housingLevel4Name: any;
  constructor(public translateService: TranslateService,
    public dialogService: DialogService, private oimoffobFactory: OimoffobService) {
    this.housingSelectionColumnDef = [];

  }
  ngOnInit() {
    this.unitType = 'oimoffob/rgunitTypeLov';
    this.facility = this.dialog.data.agyLocId;
    this.level1ReadOnly = true;
    this.level2ReadOnly = true;
    this.level3ReadOnly = true;
    this.level4ReadOnly = true;
    this.unitTypeReadOnly = false;
    this.disableSearchbutton = false;
    this.disableClearbutton = true;
    this.disableSelectAll = true;
    this.disableSelectbutton = true;
    //this.Level1Lov = 'oiuzohos/rgLevel1LovData?unitTypeValue=' + this.unitTypeValue + '&facility=' + this.facility;
    this.housingSelectionColumnDef = [
      {
        fieldName: this.translateService.translate('oiuzohos.select'), field: 'selectFlag', editable: true,
        width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('oiuzohos.housinglocations'), field: 'description', editable: false,
        width: 150, datatype: 'text'
      }
    ];
    this.getHousingLevelLabels();
  }

  onUnitTypeBlur() {
    if (!this.unitTypeValue) {
      this.unitTypeValue = this.unitTypeValue === '' ? undefined : '';
    }
  }

  onButExitclick() {
    this.dialog.close(null);
  }

  onUnitTypeEvent(event) {
    this.level1Value = undefined;
    this.level2Value = undefined;
    this.level3Value = undefined;
    this.level4Value = undefined;
    if (event) {
      this.Level1Lov = 'oimoffob/rgLevel1LovData?unitTypeValue=' + this.unitTypeValue + '&facility=' + this.facility;
      this.level1ReadOnly = false;
    }else{
      this.level1ReadOnly = true;
      this.level2ReadOnly = true;
      this.level3ReadOnly = true;
      this.level4ReadOnly = true;
    }
  }

  onLevel1Event(event) {
    this.level2Value = undefined;
    this.level3Value = undefined;
    this.level4Value = undefined;
    if (event) {
      this.Level2Lov = 'oimoffob/rgLevel2LovData?livigUnitId=' + event.livingUnitId;
      // this.level1ReadOnly = true;
      this.livunitsModel.listSeq = event.livingUnitId;
      this.level3Value = null;
      this.livunitsModel.parentLivingUnitId = null;
      this.Level3Lov = null;
      this.level2ReadOnly = false;
    }else{
      this.level2ReadOnly = true;
      this.level3ReadOnly = true;
      this.level4ReadOnly = true;
    }
  }

  onLevel2Event(event) {
    this.level3Value = undefined;
    this.level4Value = undefined;
    if (event) {

      this.Level3Lov = 'oimoffob/rgLevel3LovData?parentLivigUnitId=' + event.livingUnitId;
      this.livunitsModel.livingUnitId = event.livingUnitId;
      this.wingLivingUnitId = event.livingUnitId;
      this.livunitsModel.agencyImlId = null;
      this.livunitsModel.parentLivingUnitId = null;
      this.level4Value = null;
      this.level3ReadOnly = false;
    }else{
      this.level3ReadOnly = true;
      this.level4ReadOnly = true;
    }
  }
  onLevel3Event(event) {
    this.level4Value = undefined;
    if (event) {
      this.Level4Lov = 'oimoffob/rgLevel4LovData?parentLivigUnitId=' + event.livingUnitId;
      this.livunitsModel.parentLivingUnitId = event.livingUnitId;
      this.livunitsModel.agencyImlId = null;
      this.level4ReadOnly = false;
    }else{
      this.level4ReadOnly = true;
    }
  }

  onLevel4Event(event) {
    if (event) {
      this.livunitsModel.agencyImlId = event.livingUnitId;
    }
  }
  show(validmsg, type?) {
    type = type ? type : 'warn';
    validmsg = this.translateService.translate(validmsg);
    const msgval = [{ message: validmsg, type: type }];
    this.msgs = [...msgval];
  }

  oiuzohosZoneHouSelExecuteQuery() {
    /* if (!this.unitTypeValue) {
      this.show('oiuzohos.unittypemustbeentered', 'warn');
      return;
    }

    if (!this.level1Value) {
      this.show('oiuzohos.level1mustbeentered', 'warn');
      return;
    } */

    const payLoad = {};
    if(this.dialog.data && this.dialog.data.agyLocId){
      payLoad['agyLocId'] = this.dialog.data.agyLocId;
    }
    let searchLevel = 0;
    if(this.unitType){
      payLoad['housingUnitType'] = this.unitTypeValue;
          // searchLevel = 4;
    }
    if(this.level4Value){
      payLoad['livingUnitId'] = this.livunitsModel.agencyImlId;
      searchLevel = 4;
    } else if(this.level3Value){
      payLoad['livingUnitId'] = this.livunitsModel.parentLivingUnitId;
      searchLevel = 3;
    } else if(this.level2Value){
      payLoad['livingUnitId'] = this.livunitsModel.livingUnitId;
      searchLevel = 2;
    } else {
      payLoad['livingUnitId'] = this.livunitsModel.listSeq;
      searchLevel = 1;
    } 
    const cslddbenResult = this.oimoffobFactory.oiuzohosExecuteQuery(payLoad);
    cslddbenResult.subscribe(cslddbenResultList => {
      if (cslddbenResultList.length === 0) {
        this.housingSelectionRowData = [];
        this.show('common.querycausednorecords', 'warn');
        this.disableSelectbutton = true;
      } else {
        let levelCode = 0;
        cslddbenResultList.forEach(e => {
          if(e.level4Code){
            levelCode = 4;
          }else if(e.level3Code){
            levelCode = 3;
          }else if(e.level2Code){
            levelCode = 2;
          }else{
            levelCode = 1;
          }
        });
        if(levelCode === searchLevel){
          if(payLoad['livingUnitId']){
            cslddbenResultList = cslddbenResultList.filter(e => e.livingUnitId === payLoad['livingUnitId'] );
          }
        }
        this.housingSelectionRowData = cslddbenResultList;
        this.tableIndex = 0;
        this.level1ReadOnly = true;
        this.level2ReadOnly = true;
        this.level3ReadOnly = true;
        this.level4ReadOnly = true;
        this.unitTypeReadOnly = true;
        this.disableSearchbutton = true;
        this.disableClearbutton = false;
        this.disableSelectAll = false;
      }
    });
  }

  onClickOnSelect() {
    this.housingSelectionRowData.forEach((e,i)=>{
      if(e.selectFlag){
        this.checkFlag =true;
      }
    })

    if (!this.checkFlag) {
      this.show(this.translateService.translate('Please select housing location'), 'warn');
      return;
    }
    const closedData = [];
    this.housingSelectionRowData.forEach(element => {
      if (element.selectFlag) {
        const PayLoad = {};
        PayLoad['zoneCode'] = this.dialog.data.zoneCode;
        PayLoad['internalLocationId'] = element.livingUnitId;
        const sentermsResult = this.oimoffobFactory.getZoneAssignedCount(PayLoad);
        sentermsResult.subscribe(data => {
            if(data > 0){
              this.show(this.translateService.translate('oimoffob.thedelectedhousinglocationisalreadyassignedtoanotherzone'), 'warn');
              return;
            } else {
              closedData.push(element);
              this.dialog.close(closedData);
            }
        });

      }
    });
    if(closedData.length > 0){
      this.dialog.close(closedData);
    }
  }

  selectAllChkboxChange(event) {
    if (event.checked) {
      this.disableSelectbutton = false;
      this.housingSelectionRowData.forEach((e, i) => {
        this.housongSelection.setColumnData('selectFlag', i, event.checked);
      });
    } else {
      this.disableSelectbutton = true;
      this.housingSelectionRowData.forEach((e, i) => {
        this.housongSelection.setColumnData('selectFlag', i, event.checked);
      });
    }
  }

  onClear() {
    this.level1ReadOnly = false;
    this.level2ReadOnly = false;
    this.level3ReadOnly = false;
    this.level4ReadOnly = false;
    this.unitTypeValue = undefined;
    this.level1Value = undefined;
    this.level2Value = undefined;
    this.level3Value = undefined;
    this.level4Value = undefined;
    this.housingSelectionRowData = [];
    this.unitTypeReadOnly = false;
    this.disableClearbutton = true;
    this.disableSearchbutton = false;
    this.disableSelectAll = true;
    this.selectAll = false;
    this.disableSelectbutton = true;
  }

  validateHousingLocation = (event) => {
    const rowdata = new ValidateRowReturn();
    const rowIndex = event.rowIndex;
    if (event.field === 'selectFlag') {
      /* if (event.data.selectFlag === true) {
        this.checkFlag = true;
        this.disableSelectbutton = false;
        this.housingSelectionRowData.forEach((e,i)=>{
          if(i != rowIndex){
            this.housongSelection.setColumnData('selectFlag', i, false);
          }
        })
        rowdata.validated = true;
        this.indexNum=event.rowIndex;
        return rowdata;
      }  */
      
      let transferFlagCount = this.housingSelectionRowData.filter(e => e.selectFlag).length;
      if (transferFlagCount === this.housingSelectionRowData.length) {
          this.selectAll = true;
      } else {
          this.selectAll = false;
      }
      rowdata.validated = true;
      return rowdata;
      
    }
  }
   get disableClearbuttonFunc(){
    if(!this.unitTypeValue && !this.level1Value && !this.level2Value && !this.level3Value && !this.level4Value && this.housingSelectionRowData.length <= 0){
      return true;
    } else {
      return false;
    }
 
  } 

  onRowClickLocation(event){
    if(event){
    this.selectValue=event.selectFlag;
    }
    }

    get disableSelectbuttonSeclect(){

      let transferFlagCount = this.housingSelectionRowData.filter(e => e.selectFlag).length;
      if (transferFlagCount > 0) {
        return false;
      } else {
        return true;
      }
    }
 
    getHousingLevelLabels() {
    const getData = this.oimoffobFactory.getHousingLevels(this.dialog.data.agyLocId);
    getData.subscribe(lableNames => {
        if (lableNames) {
            this.housingLevel1Name = lableNames.housingLev1Code;
            this.housingLevel2Name = lableNames.housingLev2Code;
            this.housingLevel3Name = lableNames.housingLev3Code;
            this.housingLevel4Name = lableNames.housingLev4Code;
        } else {
        }
    });
  }
}