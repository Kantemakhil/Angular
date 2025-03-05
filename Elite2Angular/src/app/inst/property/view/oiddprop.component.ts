import {
      Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiddpropService } from '@inst/property/service/oiddprop.service';
import { OffenderPptyItemTxns } from '@instproperty/OffenderPptyItemTxns';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';
import { OffenderPptyItemTxnsCommitBean } from '@instproperty/OffenderPptyItemTxnsCommitBean';
import { OffenderPptyItemsCommitBean } from '@instproperty/OffenderPptyItemsCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VPropertyHeaderBlock } from '@commonbeans/VPropertyHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffenderPptyContainers } from '@instproperty/OffenderPptyContainers';
import { OidtpritService } from '../service/oidtprit.service';
import { OidrpitmService } from '../service/oidrpitm.service';

@Component({
      selector: 'app-oiddprop',
      templateUrl: './oiddprop.component.html',
      styleUrls: ['./oiddprop.component.scss']
})

export class OiddpropComponent implements OnInit {
      @ViewChild('grid', {static: true}) grid: any;
      person = { 'pSearchType': 'N' };
      actionName: string;
      lovModel: any[];
      msgs: any[] = [];
      nameOfLovPage: string;
      listToCompare: any[] = [];
      toMoveSealUpdate= new OffenderPptyContainers ;
      offPpItmtxData: OffenderPptyItemTxns[] = [];
      offPpItmtxDataTemp: OffenderPptyItemTxns[] = [];
      offPpItmtxModel: OffenderPptyItemTxns = new OffenderPptyItemTxns();
      offPpItmtxIndex: number;
      offPpItmtxCommitModel: OffenderPptyItemTxnsCommitBean = new OffenderPptyItemTxnsCommitBean();
      offPpItmtxInsertList: OffenderPptyItemTxns[] = [];
      offPpItmtxUpdateList: OffenderPptyItemTxns[] = [];
      offPpItmtxDeleteList: OffenderPptyItemTxns[] = [];
      offpiData: OffenderPptyItems[] = [];
      offpiDataTemp: OffenderPptyItems[] = [];
      offpiModel: OffenderPptyItems = new OffenderPptyItems();
      offpiIndex = -1;
      offpiCommitModel: OffenderPptyItemsCommitBean = new OffenderPptyItemsCommitBean();
      offpiInsertList: OffenderPptyItems[] = [];
      offpiUpdateList: OffenderPptyItems[] = [];
      offpiDeleteList: OffenderPptyItems[] = [];
      minDate: Date;
      display: boolean;
      errorMessage: string;
      headerMessage: string;
      disabled: boolean;
      editable: boolean;
      offPiColumnDef: any[];
      itmTxReadOnly: boolean;
      offPiReadOnly: boolean;
      sysPflReadOnly: boolean;
      cgfkItmtxpropertycontainerRg: any[] = [];
      rgdspcorporatenameRg: any[] = [];
      rgdisposedtopersonRg: any[] = [];
      cgfkItmtxfromstatuscodeRg: any[] = [];
      msglist = [];
      message = ' Invalid.';
      type = 'error';
      vPropertyHeaderBlockModel: VPropertyHeaderBlock = new VPropertyHeaderBlock();
      locationLink: any;
      agencyLink: any;
      caseLoadId: string;
      offId: any;
      locationDisable: boolean;
      deActivelocationDisable: boolean;
      lockFlag: boolean;
      deActiveLoc: boolean;
      fromSatusDisable: boolean;
      fromStatusLink: any;
      checkflag: boolean;
      confirmAllDisable: boolean;
      lockFlagDisable: boolean;
      saveEnable: any;
      saveDisable: any;
      locationFlag: boolean;
      verificationFlag: boolean;
      offconModel: OffenderPptyContainers = new OffenderPptyContainers();
      typeRecordGroupValues: any[] = [];
      colorRecordGroupValues: any[] = [];
      conditionRecordGroupValues: any[] = [];
      toPersonLink: any;
      launchBtnFlag: boolean;
      toAgyFlag: boolean;
      locationTitles = { description: 'Description', dspDescription: 'Container Description' };
      showActions: boolean;
      constructor(private oiddpropFactory: OiddpropService, private sessionManager: UserSessionManager,
            public translateService: TranslateService, private offenderSearchService: OffenderSearchService,
            public dialogService: DialogService, private oidtpritFactory: OidtpritService, private oidrpitmFactory: OidrpitmService) {
            this.offPiColumnDef = [];
      }
      ngOnInit() {
            this.showActions = false;
            this.vPropertyHeaderBlockModel = new VPropertyHeaderBlock();
            this.vPropertyHeaderBlockModel = this.offenderSearchService.selectedOffender;
           
            
            this.checkflag = false;
            this.fromSatusDisable = true;
            this.disabled = true;
            this.locationDisable = true;
            this.deActivelocationDisable = true;
            this.lockFlag = false;
            this.deActiveLoc = false;
            this.confirmAllDisable = true;
            this.saveEnable = true;
            this.saveDisable = true;
            this.locationFlag = true;
            this.caseLoadId = this.sessionManager.currentCaseLoad;
            this.offPiColumnDef = [
                  {
                        fieldName: this.translateService.translate('common.select'), field: 'confirmFlag',
                        datatype: 'checkbox', editable: true, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('commomn.container'), field: 'contdes',
                        options: this.typeRecordGroupValues, editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('common.location'), field: 'locdes',
                        options: this.typeRecordGroupValues, editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('common.propertytype'), field: 'propertyType', datatype: 'lov',domain:'PPTY_TYPE', /*link: 'oidrpitm/cgfkOffPiPropertyTypeRecordGroup',*/
                        options: this.typeRecordGroupValues, editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('common.description'), field: 'propertyDescription',
                        editable: false, width: 150
                  },
                  { fieldName: this.translateService.translate('common.quantity'), field: 'quantity', editable: false, width: 150 },
                  {
                        fieldName: this.translateService.translate('common.color'), field: 'color',datatype:'lov',domain:'PPTY_COLOR',
                        options: this.colorRecordGroupValues, editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('common.condition'), field: 'conditionCodeDesc',
                        options: this.conditionRecordGroupValues, editable: false, width: 150
                  },

                  {
                        fieldName: this.translateService.translate('oiiptran.value'), field: 'propertyValue', editable: false, width: 150,
                        datatype: 'number', required: false, format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true
                  },
                  {
                        fieldName: this.translateService.translate('oiiptran.size'), field: 'propertySize',
                        editable: false, width: 150, datatype: 'text'
                  },

                  { fieldName: this.translateService.translate('common.make'), field: 'make', editable: false, width: 150 },
                  { fieldName: this.translateService.translate('common.serialnumber'), field: 'serialNo', editable: false, width: 150 },
            ];
            //     const rgdspcorporatenameServiceObj = this.oiddpropFactory.rgDspCorporateNameRecordGroup();
            //     rgdspcorporatenameServiceObj.subscribe(rgdspcorporatenameList => {
            //          if (rgdspcorporatenameList.length === 0) {
            //               this.rgdspcorporatenameRg = [];
            //          } else {
            //               for (let i = 0; i < rgdspcorporatenameList.length; i++) {
            //                    this.rgdspcorporatenameRg.push({
            //                         'text': rgdspcorporatenameList[i].code + ' - ' +
            //                  rgdspcorporatenameList[i].description, 'id': rgdspcorporatenameList[i].code
            //                    });
            //               }
            //          }
            //     });
            //     const rgdisposedtopersonServiceObj = this.oiddpropFactory.
            //          rgDisposedToPersonRecordGroup();
            //     rgdisposedtopersonServiceObj.subscribe(rgdisposedtopersonList => {
            //          if (rgdisposedtopersonList.length === 0) {
            //               this.rgdisposedtopersonRg = [];
            //          } else {
            //               for (let i = 0; i < rgdisposedtopersonList.length; i++) {
            //                    this.rgdisposedtopersonRg.push({
            //                         'text': rgdisposedtopersonList[i].code + ' - ' +
            //                              rgdisposedtopersonList[i].description, 'id': rgdisposedtopersonList[i].code
            //                    });
            //               }
            //          }
            //     });
            //     const colorServiceObj = this.oidrpitmFactory.rgColorRecordGroup();
            //     colorServiceObj.subscribe(colorList => {
            //           if (colorList.length === 0) {
            //                 this.colorRecordGroupValues = [];

            //           } else {
            //                 for (let i = 0; i < colorList.length; i++) {
            //                       this.colorRecordGroupValues.push({ 'id': colorList[i].description, 'text': colorList[i].description });
            //                 }
            //           }
            //     });
            //     const typeServiceObj = this.oidrpitmFactory.cgfkOffpipropertytypeRecordGroup();
            //     typeServiceObj.subscribe(typeList => {
            //           if (typeList.length === 0) {
            //                 this.typeRecordGroupValues = [];

            //           } else {
            //                 for (let i = 0; i < typeList.length; i++) {
            //                       this.typeRecordGroupValues.push({ 'id': typeList[i].code, 'text': typeList[i].description });
            //                 }
            //           }
            //     });
            //     const conditionServiceObj = this.oidrpitmFactory.rgCondnRecordGroup();
            //     conditionServiceObj.subscribe(conditionList => {
            //           if (conditionList.length === 0) {
            //                 this.conditionRecordGroupValues = [];

            //           } else {
            //                 for (let i = 0; i < conditionList.length; i++) {
            //                       this.conditionRecordGroupValues.push({ 'id': conditionList[i].description,
            //                        'text': conditionList[i].description });
            //                 }
            //           }
            //     });
            if (!this.vPropertyHeaderBlockModel) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                  this.show();
            }
      }
      onOffenderChange(offender) {
            if (offender) {
                  this.vPropertyHeaderBlockModel = offender;
                  this.fromStatusLink = 'oiddprop/cgfkItmTxFromStatusCodeRecordGroup';
                  this.toPersonLink = 'oiddprop/getDisposedToPersonsGroup?offenderBookId=' + this.vPropertyHeaderBlockModel.offenderBookId;
            
                  this.offpiData = [];
                  this.offpiIndex = -1;
                  this.offPpItmtxModel = new OffenderPptyItemTxns();
                  this.offPiExecuteQuery();
                  if (this.vPropertyHeaderBlockModel.offenderBookId) {
                        this.launchBtnFlag = false;
                        this.toAgyFlag = false;
                        this.fromSatusDisable = false;
                        this.lockFlagDisable = false;
                        this.offpiData = [];
                        this.agencyLink = 'oiddprop/cgfkOffConTrnToAgyLocIdRecordGroup?agyLocId=' + this.vPropertyHeaderBlockModel.agyLocId;
                        this.locationLink = 'oiddprop/cgfkItmTxPropertyContainerRecordGroup?caseloadId=' + this.caseLoadId +
                              '&offenderBookId=' + this.vPropertyHeaderBlockModel.offenderBookId;
                  }
            } else {
                  this.offpiData = [];
                  this.offpiIndex = -1;
                  this.offPpItmtxModel = new OffenderPptyItemTxns();
                  this.verificationFlag = false;
                  this.deActiveLoc = false;
                  this.locationDisable = true;
                  this.fromSatusDisable = true;
                  this.lockFlagDisable = true;
                  this.confirmAllDisable = true;
                  this.lockFlag = false;
                  this.offPpItmtxModel.commentText = '';
                  this.launchBtnFlag = true;
                  this.toAgyFlag = true;
            }

      }
      /**
       * set the person id and Person name from OSIPSEAR dialog.
       * @param event
       */
      setPersonNameAndId(event) {
            if (event) {
                  this.offpiData = [];
                  this.offpiIndex = -1;
                  this.lockFlagDisable = true;
                  this.offPpItmtxModel.disposedToPerson = event.personName;
                  this.offPpItmtxModel.disposedToPersonId = event.personId;
                  this.offPpItmtxModel.disposedToPersonIdDes = event.personId;
                  this.person.pSearchType = event.disposedToPersonIdDes ? 'I' : 'N';
                  if (event.personId) {
                        this.person['pPersonId'] = event.personId;
                  }
            } else {
                  this.lockFlagDisable = false;
            }

      }
      /**
       * event is fired when click on field in the block of Disposal Information.
       */
      commonClick() {
            if (this.vPropertyHeaderBlockModel) {
                  if (!this.offPpItmtxModel.disposedToPersonIdDes) {
                        this.person.pSearchType = undefined;
                        this.person['pPersonId'] = undefined;
                        this.lockFlagDisable = false;
                  } else {
                        this.lockFlagDisable = true;
                  }
                  //     if (!this.offPpItmtxModel.disposedToPersonIdDes && !this.lockFlag) {
                  //           this.offpiData = [];
                  //           this.offpiIndex = -1;
                  //     }
            }
      }
      /**
       * event is fired when change the LOV of To Person.
       * @param event
       */
      changeTheValueOfToPerson(event) {
            if (event) {
                  this.offpiData = [];
                  this.offpiIndex = -1;
                  this.lockFlagDisable = true;
                  this.offPpItmtxModel.disposedToPerson = event.description;
                  this.offPpItmtxModel.disposedToPersonId = event.code;
                  this.person.pSearchType = event.code ? 'I' : 'N';
                  if (event.code) {
                        this.person['pPersonId'] = event.code;
                  }
            } else {
                  this.lockFlagDisable = false;
            }

      }

      dialogData() {
            return { person: this.person, forwardToDialog: true };
      }

      /**
      *  This function will be executed when we click on launch button of To Person field in Disposal Information Block.
      *
      */
      onLaunchBtnClick = () => {
            return true;
      }
      /*
      * This event is fired when click on Confirm All Item check box
      * If event is true, confirm check box column will be true in grid
      * If event is false, confirm check box column will be false in grid
      */
      clickOnConfirmAll(event) {
            const rowData = this.offpiData;
            if (event) {
                  for (let i = 0; i < rowData.length; i++) {
                        this.grid.setColumnData('confirmFlag', i, event.checked);
                        this.saveEnable = true;
                        this.saveDisable = false;
                  }
                  if (!event.checkflag) {
                        this.deActiveLoc = false;
                  }
            } else {
                  this.saveEnable = false;
            }
            this.offpiData = rowData;
      }
      /*
      * This event is fired when click on Deactive Location Check Box
      * If event is true ,confirm All Item and confirm field in grid will be true
      */
      onDeactiveChange(event) {
            const rowData = this.offpiData;
            if (event.checked) {
                  this.verificationFlag = event.checked;
                  for (let i = 0; i < this.offpiData.length; i++) {
                        this.grid.setColumnData('confirmFlag', i, event.checked);
                  }
            }
            if (!event.checked) {
                  this.verificationFlag = true;
                  for (let i = 0; i < this.offpiData.length; i++) {
                        this.grid.setColumnData('confirmFlag', i, 'true');
                  }
            }
            this.offpiData = rowData;

      }
      /*
      * This event is fired when select a value from From Status LOV
      */

      lovsBlur(){
            if(!this.offPpItmtxModel.disposedToPersonIdDes){
                  this.offPpItmtxModel.disposedToPersonIdDes = this.offPpItmtxModel.disposedToPersonIdDes === undefined ? '' : undefined;
            }

            if(!this.offPpItmtxModel.disposedToCorpName){
                  this.offPpItmtxModel.disposedToCorpName = this.offPpItmtxModel.disposedToCorpName === undefined ? '':undefined;
            }
      }

      changeFromStatus(event) {
            if (event) {
                  if (!this.offPpItmtxModel.disposedToPersonIdDes) {
                        this.person.pSearchType = undefined;
                        this.person['pPersonId'] = undefined;
                        this.lockFlagDisable = false;
                  } else {
                        this.lockFlagDisable = true;
                  }
                  this.confirmAllDisable = false;
                  this.offpiData = [];
                  this.offpiIndex = -1;
                  if (event.code === 'STORED') {
                        this.locationFlag = false;
                        this.locationDisable = false;
                        this.deActivelocationDisable = false;
                  } else {
                        this.locationFlag = true;
                        this.offPpItmtxModel.nbtDspDescription = '';
                        this.locationDisable = true;
                        this.deActivelocationDisable = true;
                  }
            } else {
                  this.confirmAllDisable = true;
            }
      }
      /*
      * This event is fired when click on To Offender check box
      */
      onToOffenderChange(event) {
            if (event.checked) {
                  //     this.offpiData = [];
                  //     this.offpiIndex = -1;
                  this.launchBtnFlag = true;
            } else {
                  this.launchBtnFlag = false;
                  // this.offpiData = [];
                  // this.offpiIndex = -1;
            }

      }
      /*
      * This event is fired when select a value from Location
      */
      changeLoation(event) {
            if (event) {
                  this.offpiModel = new OffenderPptyItems();
                  this.offpiModel.propertyContainerId = event.code;
                  this.offpiData = [];
                  this.offpiIndex = -1;
            }

      }
      canEdit = (data: any, index: number, field: string): boolean => {
            if (!this.deActiveLoc) {
                  return true;
            } else {
                  return false;
            }
      }
      /*
      *  event is used to validate the row
      */
      validateConfirmFlag = (event) => {
            const rowIndex = event.rowIndex;
            const rowdata = new ValidateRowReturn();
            rowdata.validated = true;
            let isSelectAll = true;
            for (let i = 0; i < this.offpiData.length; i++) {
                  isSelectAll = this.offpiData[i].confirmFlag && isSelectAll;
            }
            this.verificationFlag = isSelectAll;
            if (event.data.confirmFlag === true) {
                  for (let i = 0; i < this.offpiData.length; i++) {
                        if (this.offpiData[i].confirmFlag) {
                              this.saveEnable = true;
                              this.saveDisable = false;
                        }

                  }
            } else if (!event.data.confirmFlag) {
                  for (let i = 0; i < this.offpiData.length; i++) {
                        if (this.offpiData[i].confirmFlag) {
                              this.saveEnable = true;
                              this.saveDisable = false;
                              this.verificationFlag = false;
                              rowdata.validated = true;
                              return rowdata;
                        } else {
                              this.saveEnable = false;
                              this.verificationFlag = false;
                        }
                  }
            }
            return rowdata;
      }
      onRowClickoffpi(event) {
            if (!this.offPpItmtxModel.fromStatusCode) {
                  this.offpiData = [];
                  this.type = 'warn';
                  this.message = this.translateService.translate('oiddprop.selecttheromtatus');
                  this.show();
                  return;
            }
            if (this.offPpItmtxModel.fromStatusCode === 'STORED' && !this.offPpItmtxModel.nbtDspDescription) {
                  this.offpiData = [];
                  this.type = 'warn';
                  this.message = this.translateService.translate('oiddprop.selectthelocation');
                  this.show();
                  return;
            }
            if (!this.offPpItmtxModel.disposedToPersonIdDes && !this.lockFlag) {
                  this.offpiData = [];
                  this.type = 'warn';
                  this.message = this.translateService.translate('oiddprop.youmustdisposeitems');
                  this.show();
                  return;
            }
            this.offconModel = new OffenderPptyContainers();
            this.offconModel.propertyContainerId = this.offpiModel.propertyContainerId;
            this.offconModel.agyLocId = this.sessionManager.currentCaseLoad;
            if (!this.offpiData[0].offenderBookId) {
                  this.getSealMarkValueOfProp();
            }
      }
      /*
      * if sealMark value is exists in OffenderPptyConatiners table ,dialog will be open.
      * params propertyContainerId, agyLocId
      * if click Yes or No offPiExecuteQuery method will be called
      */
      getSealMarkValueOfProp() {
            const sealMarkValue = this.oidtpritFactory.itmTxWhenValidateRecordregItems(this.offconModel);
            sealMarkValue.subscribe(sealMarkList => {
                  this.offconModel.sealMark = sealMarkList.sealMark;
                  if (this.offconModel.sealMark) {
                        const data = {
                              label: this.translateService.translate('oidtprit.transactwillresult'), yesBtn: true,
                              yesLabel: 'OK', noBtn: false
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                              if (result) {
                                    this.offPiExecuteQuery();
                              } else {
                                    this.offPiExecuteQuery();
                              }
                        });
                  } else {
                        this.offPiExecuteQuery();
                  }

            });
      }
      /*
      * This method is used to show popup messages.
      */
      show() {
            this.msglist = [];
            this.msglist.push({ message: this.message, type: this.type });
            this.msgs = [...this.msglist];
      }
      itmtxExecuteQuery() {
            const itmtxResult = this.oiddpropFactory.itmTxExecuteQuery(this.offPpItmtxModel);
            itmtxResult.subscribe(itmtxResultList => {
                  if (itmtxResultList.length === 0) {
                        this.offPpItmtxData = [];
                  } else {
                        this.offPpItmtxData = itmtxResultList;
                        this.offPpItmtxModel = this.offPpItmtxData[0];
                  }
            });
      }
      /**
       *  This function will be executed when commit event is
      * fired
      */
      oiddpropSaveitmtxForm(event) {
            this.offPpItmtxInsertList = event.added;
            this.offPpItmtxUpdateList = event.updated;
            this.offPpItmtxDeleteList = event.removed;
            this.offPpItmtxCommitModel.insertList = [];
            this.offPpItmtxCommitModel.updateList = [];
            this.offPpItmtxCommitModel.deleteList = [];
            if (this.offPpItmtxInsertList.length > 0 || this.offPpItmtxUpdateList.length > 0) {
                  for (let i = 0; i < this.offPpItmtxInsertList.length; i++) {
                  }
                  for (let i = 0; i < this.offPpItmtxUpdateList.length; i++) {
                  }
                  this.offPpItmtxCommitModel.insertList = this.offPpItmtxInsertList;
                  this.offPpItmtxCommitModel.updateList = this.offPpItmtxUpdateList;
            }
            if (this.offPpItmtxDeleteList.length > 0) {
                  for (let i = 0; i < this.offPpItmtxDeleteList.length; i++) {
                  }
                  this.offPpItmtxCommitModel.deleteList = this.offPpItmtxDeleteList;
            }
            const itmtxSaveData = this.oiddpropFactory.itmTxCommit(this.offPpItmtxCommitModel);
            itmtxSaveData.subscribe(data => {
                  if (data === 1) {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                  } else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                  }
            });
      }

      offPiExecuteQuery() {
            // if (!this.offpiModel.propertyContainerId) {
            //       this.offpiModel = new OffenderPptyItems();
            // }
            this.offPpItmtxModel = new OffenderPptyItemTxns();
            this.lockFlag = false;
            this.verificationFlag = false;
            this.offpiModel.offenderBookId = this.vPropertyHeaderBlockModel.offenderBookId;
            this.offpiModel.agyLocId = this.sessionManager.currentCaseLoad;
            //  this.offpiModel.statusCode = 'REGISTERED';
            const offpiResult = this.oiddpropFactory.offConPiExecuteQuery(this.offpiModel);
            offpiResult.subscribe(offpiResultList => {
                  if (offpiResultList.length === 0) {
                        this.showActions = false;
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.querycaused');
                        this.offpiIndex = -1;
                        // this.show();
                        this.offpiData = [];
                        this.confirmAllDisable = true;
                        this.deActivelocationDisable = true;
                        this.toAgyFlag = true;
                  } else {
                        this.showActions = true;
                        this.confirmAllDisable = false;
                        this.deActivelocationDisable = false;
                        for (let i = 0; i < offpiResultList.length; i++) {
                              offpiResultList[i].confirmFlag = offpiResultList[i].confirmFlag === 'N' ? false : false;
                              if(offpiResultList[i].contdes){
                              offpiResultList[i].contdes = offpiResultList[i].statusCode + "_" + offpiResultList[i].contdes;
                              } else {
                                    offpiResultList[i].contdes = offpiResultList[i].statusCode;
                              }
                        }
                        this.offpiData = offpiResultList;
                        this.toAgyFlag = false;
                        this.lockFlagDisable = false;
                        this.launchBtnFlag = false;
                        this.offpiIndex = 0;
                        this.offpiModel = this.offpiData[0];
                        if (!this.offpiData[0].propertyItemSeq && this.checkflag === false) {
                              const confirmFlagValidate = null;
                              this.offpiIndex = -1;
                              this.offpiData[0].confirmFlag = confirmFlagValidate;
                              this.type = 'warn';
                              this.message = this.translateService.translate('common.querycaused');
                              // this.show();
                        }
                  }
            });
      }
      /**
      *  This function will be executed when commit event is
      * fired
      */
       saveoffpiForm() {
             this.offpiUpdateList = []; 
             let sealedContainerNamesObj = {}
             let sealedContainerNames = [];
             let dataForApi = [];
             for (let i = 0; i < this.offpiData.length; i++) {
                   let eachItem = this.offpiData[i];
                   if (eachItem.confirmFlag) {
                         this.offpiUpdateList.push(eachItem);
                         if (eachItem.sealMark) {
                               if (!sealedContainerNames.includes(eachItem.contdes)) {
                                     sealedContainerNames.push(eachItem.contdes)
                               }
                               this.toMoveSealUpdate = new OffenderPptyContainers;
                               this.toMoveSealUpdate.offenderBookId = eachItem.offenderBookId;
                               this.toMoveSealUpdate.sealMark = null;
                               this.toMoveSealUpdate.propertyContainerId = eachItem.propertyContainerId;
                               dataForApi.push(this.toMoveSealUpdate)
                         }

                   }
             }
             sealedContainerNamesObj["contdes"] = sealedContainerNames.join(", ");

             let selectedDisposer = !(this.lockFlag || this.offPpItmtxModel.disposedToCorpName || this.offPpItmtxModel.disposedToPersonIdDes);
             let isUpdateList = (this.offpiUpdateList.length === 0) ? true : false;
             this.message = (selectedDisposer) ? this.translateService.translate('oiddprop.youmustdisposeitems') : ((isUpdateList) ? this.translateService.translate('oiddprop.youmustselectitems') : "");
             if(selectedDisposer || isUpdateList){
                  this.type = 'warn';
                  this.show();
                  return;
             }

             if (sealedContainerNames.length > 0) {
                   this.dialogService.openLinkDialog('/WARNDIALOG', sealedContainerNamesObj, 55, 25).subscribe(result => {
                         if (result == "Yes") {
                               let offconInsertData = (sealedContainerNames.length === 1) ? this.oiddpropFactory.offConUpdateSeal(dataForApi[0]) : this.oiddpropFactory.offConUpdateMultipleSeal(dataForApi);
                               offconInsertData.subscribe(insertdata => {
                                    this.commonProcessForDispose();
                               });
                         }
                   });
             }
             else{
                  this.commonProcessForDispose();  
             }               
        }


      commonProcessForDispose(){
            this.offpiCommitModel.updateList = [];
            for (let j = 0; j < this.offpiUpdateList.length; j++) {    
                  if (this.offpiUpdateList[j].sealMark) {
                        this.offpiUpdateList[j].sealMark = null;
                  }
                  
                  if (this.offPpItmtxModel.disposedToPersonIdDes && +this.offPpItmtxModel.disposedToPersonIdDes) {
                        this.offpiUpdateList[j].disposedToPersonId = +this.offPpItmtxModel.disposedToPersonIdDes;
                  }
                  this.offpiUpdateList[j].disposedToPerson = this.offPpItmtxModel.disposedToPerson;
                  if (this.offPpItmtxModel.disposedToCorpName && +this.offPpItmtxModel.disposedToCorpName) {
                        this.offpiUpdateList[j].disposedToCorpId = +this.offPpItmtxModel.disposedToCorpName;
                  }
                  this.offpiUpdateList[j].commentText = this.offPpItmtxModel.commentText;
                  
                  this.offpiUpdateList[j].disposedToOffenderFlag = this.lockFlag ? "Y" : "N"
            }

            this.offpiCommitModel.updateList = this.offpiUpdateList;
            const offpiSaveData = this.oiddpropFactory.offPiCommit(this.offpiCommitModel);
            offpiSaveData.subscribe(data => {
                  this.message = (data === 0) ? this.translateService.translate('common.addupdateremoverecordfailed') : this.translateService.translate('common.addupdateremoverecordsuccess');
                  this.type = (data === 0) ? 'warn' : "success";
                  this.show();
                  this.checkflag = true;
                  this.offPiExecuteQuery();
            });
      }

      toOffClicked(event) {
            if (event.checked) {
                  this.toAgyFlag = true;
                  this.launchBtnFlag = true;
            } else {
                  this.toAgyFlag = false;
                  this.lockFlagDisable = false;
                  this.launchBtnFlag = false;
            }
            this.offPpItmtxModel.disposedToCorpName = undefined;
            this.offPpItmtxModel.disposedToPersonIdDes = undefined;

      }
      agencyChange(event) {
            if (event && event.code) {
                  this.lockFlagDisable = true;
                  this.launchBtnFlag = true;
            } else {
                  this.toAgyFlag = false;
                  this.lockFlagDisable = false;
                  this.launchBtnFlag = false;
            }
            this.offPpItmtxModel.disposedToPersonIdDes = undefined;
            this.lockFlag = false;
      }
      personChange(event) {
            if (event && event.code) {
                  this.toAgyFlag = true;
                  this.lockFlagDisable = true;
                  this.offPpItmtxModel.disposedToPerson = event.description;
                  this.offPpItmtxModel.disposedToPersonId = event.code;
                  this.offPpItmtxModel.disposedToPersonIdDes = event.code;
            } else {
                  this.toAgyFlag = false;
                  this.lockFlagDisable = false;
                  this.launchBtnFlag = false;
            }
            this.offPpItmtxModel.disposedToCorpName = undefined;
            this.lockFlag = false;
      }
}
