import {
      Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimtgngsService } from '../service/oimtgngs.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SecurityThreatGroups } from '@instincidentsbeans/SecurityThreatGroups';
import { SecurityThreatGroupsCommitBean } from '@instincidentsbeans/SecurityThreatGroupsCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
      selector: 'app-oimtgngs',
      templateUrl: './oimtgngs.component.html',
})

export class OimtgngsComponent implements OnInit {
      @ViewChild('grid') grid: any;
      @ViewChild('gangsGrid') gangsGrid: any;
      @ViewChild('setGrid') setGrid: any;
      msgs: any[] = [];
      secgrpData: SecurityThreatGroups[] = [];
      secgrpDataTemp: SecurityThreatGroups[] = [];
      secgrpModel: SecurityThreatGroups = new SecurityThreatGroups();
      secgrpModelGridOne: SecurityThreatGroups = new SecurityThreatGroups();
      secgrpInsertList: SecurityThreatGroups[] = [];
      secgrpUpdatetList: SecurityThreatGroups[] = [];
      secgrpDeleteList: SecurityThreatGroups[] = [];
      secgrp1Data: SecurityThreatGroups[] = [];
      secgrp1DataTemp: SecurityThreatGroups[] = [];
      secgrpCommitModel: SecurityThreatGroupsCommitBean = new SecurityThreatGroupsCommitBean();
      secgrp1Model: SecurityThreatGroups = new SecurityThreatGroups();
      secgrp1InsertList: SecurityThreatGroups[] = [];
      secgrp1UpdatetList: SecurityThreatGroups[] = [];
      secgrp1DeleteList: SecurityThreatGroups[] = [];
      secgrp2Data: SecurityThreatGroups[] = [];
      secgrp2DataTemp: SecurityThreatGroups[] = [];
      secgrp1CommitModel: SecurityThreatGroupsCommitBean = new SecurityThreatGroupsCommitBean();
      secgrp2Model: SecurityThreatGroups = new SecurityThreatGroups();
      secgrp2InsertList: SecurityThreatGroups[] = [];
      secgrp2UpdatetList: SecurityThreatGroups[] = [];
      secgrp2DeleteList: SecurityThreatGroups[] = [];
      secgrp2CommitModel: SecurityThreatGroupsCommitBean = new SecurityThreatGroupsCommitBean();
      errorMessage: string;
      headerMessage: string;
      disabled: boolean;
      offenderStgAffiliationsColumnDef: any[];
      offenderStgDetailsColumnDef: any[];
      secGrp2ColumnDef: any[];
      offenderStgAssociationsColumnDef: any[];
      secGrp1ColumnDef: any[];
      formAccessibleFormsColumnDef: any[];
      secGrpColumnDef: any[];
      tableIndex = -1;
      tableIndexGang = -1;
      tableIndexSet = -1;
      retrieveButton: boolean;
      clearButton: boolean;
      code: string;
      description: string;
      sequence: number;
      gangsGridInsert: boolean;
      onSetsGridInsert: boolean;
      secgrpValidateBean: SecurityThreatGroups = new SecurityThreatGroups();
      constructor(private oimtgngsFactory: OimtgngsService, public translateService: TranslateService,
            public sessionManager: UserSessionManager, private dialogService: DialogService) {
            this.offenderStgAffiliationsColumnDef = [];
            this.offenderStgDetailsColumnDef = [];
            this.secGrp2ColumnDef = [];
            this.offenderStgAssociationsColumnDef = [];
            this.secGrp1ColumnDef = [];
            this.formAccessibleFormsColumnDef = [];
            this.secGrpColumnDef = [];
      }
      ngOnInit() {
            this.retrieveButton = true;
            this.clearButton = true;
            this.oimtgngsexecuteQuery();
            this.secGrpColumnDef = [
                  {
                        fieldName: this.translateService.translate('common.code') + '*', field: 'stgCode', editable: true,
                        width: 150, datatype: 'text', cellEditable: this.canOffInvEdit, maxlength: 20
                  },
                  {
                        fieldName: this.translateService.translate('common.description') + '*', field: 'description',
                        editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 100
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.sequence'), field: 'listSeq', editable: true,
                        width: 150, datatype: 'number', maxValue: 999999, whole: true
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.effdate') + '*', field: 'effectiveDate', editable: false,
                        width: 150, datatype: 'date'
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.active'), field: 'activeFlag', editable: true,
                        width: 150, datatype: 'checkbox'
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.expirydate'), field: 'expiryDate', editable: false,
                        width: 150, datatype: 'date'
                  },
                  {
                        fieldName: '', field: 'butDetail', editable: true, width: 150, datatype: 'launchbutton', link: '/OIITGDETDIALOG',
                        dialogWidth: 80, data: 'row', updateField: 'row', modal: true, isDisable: this.secGrpbtndetailDisabled
                  },
            ];
            this.secGrp1ColumnDef = [
                  {
                        fieldName: this.translateService.translate('common.code') + '*', field: 'stgCode', editable: true,
                        width: 150, datatype: 'text', cellEditable: this.canOffInvEdit, maxlength: 20
                  },
                  {
                        fieldName: this.translateService.translate('common.description') + '*', field: 'description', editable: true,
                        width: 150, datatype: 'text', uppercase: 'false', maxlength: 100
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.sequence'), field: 'listSeq', editable: true, width: 150,
                        datatype: 'number', maxValue: 999999, whole: true
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.effdate') + '*', field: 'effectiveDate', editable: false,
                        width: 150, datatype: 'date'
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.active'), field: 'activeFlag', editable: true, width: 150,
                        datatype: 'checkbox'
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.expirydate'), field: 'expiryDate', editable: false,
                        width: 150, datatype: 'date'
                  },
                  {
                        fieldName: '', field: 'butDetail1', editable: true, width: 150, datatype: 'launchbutton',
                        link: '/OIITGDETDIALOG', isDisable: this.secGrpbtndetailOneDisabled,
                        dialogWidth: 80, data: 'row', updateField: 'row', modal: true
                  },
                  {
                        fieldName: '', field: 'butRealign', editable: true, width: 150, datatype: 'launchbutton',
                        onLaunchClick: this.openReAlignBtn, dialogWidth: 80, data: 'row', updateField: 'row', modal: true,
                        isDisable: this.secGrpReAlignOneDisabled
                  },
            ];
            this.secGrp2ColumnDef = [
                  {
                        fieldName: this.translateService.translate('common.code') + '*', field: 'stgCode', editable: true, width: 150,
                        datatype: 'text', cellEditable: this.canOffInvEdit, maxlength: 20
                  },
                  {
                        fieldName: this.translateService.translate('common.description') + '*', field: 'description',
                        editable: true, width: 150, maxlength: 100,
                        datatype: 'text', uppercase: 'false',cellEditable: this.canOffInvEdit
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.sequence'), field: 'listSeq', editable: true, width: 150,
                        datatype: 'number', maxValue: 999999, whole: true,cellEditable: this.canOffInvEdit,
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.effdate') + '*', field: 'effectiveDate', editable: false,
                        width: 150,
                        datatype: 'date'
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.active'), field: 'activeFlag', editable: true, width: 150,
                        datatype: 'checkbox'
                  },
                  {
                        fieldName: this.translateService.translate('oimtgngs.expirydate'), field: 'expiryDate', editable: false, width: 150,
                        datatype: 'date'
                  },
                  {
                        fieldName: '', field: 'butDetail2', editable: true, width: 150, datatype: 'launchbutton',
                        link: '/OIITGDETDIALOG', dialogWidth: 80, data: 'row', updateField: 'row', modal: true,
                        isDisable: this.secGrpbtndetailTwoDisabled
                  },
                  {
                        fieldName: '', field: 'butRealign2', editable: true, width: 150, datatype: 'launchbutton',
                        onLaunchClick: this.openReAlignBtnTwo, dialogWidth: 80, data: 'row', updateField: 'row', modal: true,
                        isDisable: this.secGrpRelalignbtnTwodetailDisabled
                  },
            ];
      }
      onButRetrieveclick() {
            this.oimtgngsexecuteQuery();
      }
      onClearClick() {
            this.code = null;
            this.description = null;
            this.sequence = null;
            this.secgrpData = [];
            this.secgrp1Data = [];
            this.secgrp2Data = [];
            this.secgrpModelGridOne = new SecurityThreatGroups();
            this.retrieveButton = false;
            this.clearButton = true;
            this.gangsGridInsert = false;
            this.onSetsGridInsert = false;
      }
      blur(code) {
            if (code.readonly) {
             return;
            }
            if (code) {
                  this.retrieveButton = false;
                  this.clearButton = false;

            }

      }
      blurDesc(desc) {
            if (desc.readonly) {
                  return;
                 }
            if (desc) {
                  this.retrieveButton = false;
                  this.clearButton = false;

            }

      }
      blurSeq(seq) {
            if (seq.readonly) {
                  return;
                 }
            if (seq) {
                  this.retrieveButton = false;
                  this.clearButton = false;

            }
      }
      /**
       * This function displays the messages
       */
      openReAlignBtn = (event) => {
            if (event.activeFlag === null || event.activeFlag === 'N') {
                  this.show(this.translateService.translate('oimtgngs.cannotpromotedemote'));
                  return;
            } else {
                  this.dialogService.openLinkDialog('/OIMTGOPTDIALOG', event, 70).subscribe(result => {
                        this.oimtgngsPopulateDetails();

                  });
            }
            return false;

      }
      openReAlignBtnTwo = (event) => {
            if (event.activeFlag === null || event.activeFlag === 'N') {
                  this.show(this.translateService.translate('oimtgngs.cannotpromotedemote'));
                  return;
            } else {
                  this.dialogService.openLinkDialog('/OIMTGOPTDIALOG', event, 70).subscribe(result => {
                        this.oimtgngsPopulateDetails();
                  });
            }
            return false;

      }
      show(vldmsg, type?) {
            type = type ? type : 'warn';
            vldmsg = this.translateService.translate(vldmsg);
            const msgval = [{ message: vldmsg, type: type }];
            this.msgs = [...msgval];
      }
      secGrpbtndetailDisabled = (data, index) => {
            if (data.lpValue === 1) {
                  return true;
            } else if (data.lpValue === 2) {
                  return true;
            } else if (data.lpValue === 3) {
                  return false;

            } else {
                  return false;
            }
      }
      secGrpbtndetailOneDisabled = (data, index) => {
            if (!data.createDatetime) {
                  return true;
            }
            if (this.secgrp1Model.lpGang === 0) {
                  return true;
            } else if (data.lpValue === 1) {
                  return true;
            } else if (data.lpValue === 2) {
                  return false;

            } else if (data.lpValue === 3) {
                  return false;

            } else {
                  return false;
            }
      }
      secGrpbtndetailTwoDisabled = (data, index) => {
            if (!data.createDatetime) {
                  return true;
            }
            if (this.secgrp1Model.lpGang === 0) {
                  return true;
            } else if (data.lpValue === 1) {
                  return false;
            } else if (data.lpValue === 2) {
                  return false;

            } else if (data.lpValue === 3) {
                  return false;
            }
            if (this.secgrp2Model.lpSet === 0) {
                  return true;

            } else {
                  return false;
            }
      }
      secGrpReAlignOneDisabled = (data, index) => {
            if (!data.createDatetime) {
                  return true;
            }
            if (this.secgrp1Model.lpGang === 0) {
                  return true;
            } else if (data.lpValue === 1) {
                  return false;
            } else if (data.lpValue === 2) {
                  return false;

            } else if (data.lpValue === 3) {
                  return false;

            } else {
                  return false;
            }
      }
      secGrpRelalignbtnTwodetailDisabled = (data, index) => {
            if (!data.createDatetime) {
                  return true;
            }
            if (this.secgrp1Model.lpGang === 0) {
                  return true;

            } else if (data.lpValue === 1) {
                  return false;
            } else if (data.lpValue === 2) {
                  return false;

            } else if (data.lpValue === 3) {
                  return false;

            }
            if (this.secgrp2Model.lpSet === 0) {
                  return true;

            } else {
                  return false;
            }

      }
      canOffInvEdit = (data: any, index: number, field: string): boolean => {
            if (!data.stgId) {
                  return true;
            }
            return false;
      }
      onGridInsert = () => {
            if (this.secgrpData.length > 0) {
                  for (let i = 0; i < this.secgrpData.length; i++) {
                        if (!this.secgrpData[i].stgId) {
                              if (!this.secgrpData[i].stgCode) {
                                    this.show(this.translateService.translate('oimtgngs.nationscodemustbe'));
                                    return;
                              }
                              if (!this.secgrpData[i].description) {
                                    this.show(this.translateService.translate('oimtgngs.nationsdescriptionmustbe'));
                                    return;
                              }
                              if (!this.secgrpData[i].effectiveDate) {
                                    this.show(this.translateService.translate('oimtgngs.nationseffmustbe'));
                                    return;
                              }
                        }
                  }
            }
            return {
                  stgCode: '', description: '', listSeq: '', effectiveDate: '', activeFlag: 'true', expiryDate: '',
                  butDetail: this.translateService.translate('oimtgngs.detail')
            };

      }
      onGangsInsert = () => {
            if (!this.secgrpModel.stgCode) {
                  this.show(this.translateService.translate('oimtgngs.nationscodemustbe'));
                  return;
            }
            if (!this.secgrpModel.description) {
                  this.show(this.translateService.translate('oimtgngs.nationsdescriptionmustbe'));
                  return;
            }
            if (!this.secgrpModel.effectiveDate) {
                  this.show(this.translateService.translate('oimtgngs.nationseffmustbe'));
                  return;
            }
            if (this.secgrpModel.activeFlag === null || this.secgrpModel.activeFlag === 'N'
                  || this.secgrpModel.activeFlag === 'false') {
                  this.show(this.translateService.translate('oimtgngs.cannotaddchild'));
                  return;

            }
            if (this.secgrp1Data.length > 0) {
                  for (let i = 0; i < this.secgrp1Data.length; i++) {
                        if (!this.secgrp1Data[i].stgId) {
                              if (!this.secgrp1Data[i].stgCode) {
                                    this.show(this.translateService.translate('oimtgngs.gangscodemustbe'));
                                    return;
                              }
                              if (!this.secgrp1Data[i].description) {
                                    this.show(this.translateService.translate('oimtgngs.gangsdescriptionmustbe'));
                                    return;
                              }
                              if (!this.secgrp1Data[i].effectiveDate) {
                                    this.show(this.translateService.translate('oimtgngs.gangseffdatemustbe'));
                                    return;
                              }
                        }
                  }
            }

            return {
                  stgCode: '', description: '', listSeq: '', effectiveDate: '', activeFlag: 'true', expiryDate: '',
                  butDetail1: this.translateService.translate('oimtgngs.detail'),
                  butRealign: this.translateService.translate('oimtgngs.realign')
            };
      }
      onSetsInsert = () => {
            if (!this.secgrp1Model.stgCode) {
                  this.show(this.translateService.translate('oimtgngs.gangscodemustbe'));
                  return;
            }
            if (!this.secgrp1Model.description) {
                  this.show(this.translateService.translate('oimtgngs.gangsdescriptionmustbe'));
                  return;
            }
            if (!this.secgrp1Model.effectiveDate) {
                  this.show(this.translateService.translate('oimtgngs.gangseffdatemustbe'));
                  return;
            }

            if (this.secgrp1Model.activeFlag === null || this.secgrp1Model.activeFlag === 'N' ||
                  this.secgrp1Model.activeFlag === 'false') {
                  this.show(this.translateService.translate('oimtgngs.cannotaddchild'));
                  return;

            }


            if (this.secgrp2Data.length > 0) {
                  for (let i = 0; i < this.secgrp2Data.length; i++) {
                        if (!this.secgrp2Data[i].stgId) {
                              if (!this.secgrp2Data[i].stgCode) {
                                    this.show(this.translateService.translate('oimtgngs.setsscodemustbe'));
                                    return;
                              }
                              if (!this.secgrp2Data[i].description) {
                                    this.show(this.translateService.translate('oimtgngs.setsdescriptionemustbe'));
                                    return;
                              }
                              if (!this.secgrp2Data[i].effectiveDate) {
                                    this.show(this.translateService.translate('oimtgngs.setsseffdatemustbe'));
                                    return;
                              }
                        }
                  }

            }

            return {
                  stgCode: '', description: '', listSeq: '', effectiveDate: '', activeFlag: 'true', expiryDate: '',
                  butDetail2: this.translateService.translate('oimtgngs.detail'),
                  butRealign2: this.translateService.translate('oimtgngs.realign')
            };
      }
      onRowClicksecgrp(event) {
            if (event) {
                  if (event.stgId) {
                        this.gangsGridInsert = true;
                  } else {
                        this.gangsGridInsert = false;
                  }
                  this.secgrpModel = event;
                  this.oimtgngsPopulateDetails();
            } else {
                  this.secgrpModel = new SecurityThreatGroups();
            }
      }
      onRowClicksecgrp1(event) {
            if (event) {
                  if (event.stgId) {
                        this.onSetsGridInsert = true;
                  } else {
                        this.onSetsGridInsert = false;
                  }
                  this.secgrp1Model = event;
                  this.secgrp2ExecuteQuery();
            } else {
                  this.secgrp1Model = new SecurityThreatGroups();
            }
      }
      onRowClicksecgrp2(event) {
            if (event) {
                  this.secgrp2Model = event;
            } else {
                  this.secgrp2Model = new SecurityThreatGroups();
            }
      }
      validateRowData = (event) => {
            const rowdata = new ValidateRowReturn();
            const rowIndex = event.rowIndex;
            if (event.field === 'stgCode' && event.data.stgCode) {
                  const duplicate = this.oimtgngsFactory.getDuplicateStgCode(event.data.stgCode);
                  duplicate.subscribe(dup => {
                        if (dup > 0) {
                              this.show(this.translateService.translate('oimtgngs.rowalreadyexists'));
                              this.grid.setColumnData('stgCode', rowIndex, null);
                        } else {
                              this.grid.setColumnData('effectiveDate', rowIndex, DateFormat.getDate());
                        }
                  });

            }
            if (event.data.stgId) {
                  if (event.field === 'activeFlag' && event.data.activeFlag === false) {
                        const returnValue = this.oimtgngsFactory.offStgCur(event.data.stgId);
                        returnValue.subscribe(countValue => {
                              if (countValue > 0) {
                                    this.show(this.translateService.translate('oimtgngs.youcannotdeactivate'));
                                    this.grid.setColumnData('activeFlag', rowIndex, true);
                                    this.grid.setColumnData('expiryDate', rowIndex, null);
                              } else {
                                    this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate());
                                    this.grid.setColumnData('activeFlag', rowIndex, false);
                              }
                        });
                  } else if (event.field === 'activeFlag' && event.data.activeFlag === true) {
                        this.grid.setColumnData('expiryDate', rowIndex, null);
                  }
            } else {
                  if (event.field === 'activeFlag' && event.data.activeFlag === false) {
                        this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate());
                  } else if (event.field === 'activeFlag' && event.data.activeFlag === true) {
                        this.grid.setColumnData('expiryDate', rowIndex, null);
                  }
            }

            rowdata.validated = true;
            return rowdata;

      }
      validateGangsRowData = (event) => {
            const gangsrowdata = new ValidateRowReturn();
            const rowIndexGang = event.rowIndex;
            if (event.field === 'stgCode' && event.data.stgCode) {
                  const duplicate = this.oimtgngsFactory.getDuplicateGangsStgCode(event.data.stgCode);
                  duplicate.subscribe(dup => {
                        if (dup > 0) {
                              this.show(this.translateService.translate('oimtgngs.rowalreadyexists'));
                              this.gangsGrid.setColumnData('stgCode', rowIndexGang, null);
                        } else {
                              this.gangsGrid.setColumnData('effectiveDate', rowIndexGang, DateFormat.getDate());
                        }
                  });
                  gangsrowdata.validated = true;
                  return gangsrowdata;
            }
            if (event.field === 'activeFlag' && event.data.activeFlag === false && event.newValue !== event.oldValue && event.data.stgId) {
                  const returnValue = this.oimtgngsFactory.offStgCurSecGrp(event.data.stgId);
                  returnValue.subscribe(countValue => {
                        if (countValue > 0) {
                              this.show(this.translateService.translate('oimtgngs.youcannotdeactivate'));
                              this.gangsGrid.setColumnData('activeFlag', rowIndexGang, event.oldValue);
                              this.gangsGrid.setColumnData('expiryDate', rowIndexGang, null);
                        } else {
                              this.gangsGrid.setColumnData('expiryDate', rowIndexGang, DateFormat.getDate());
                        }
                  });
            } else if (event.field === 'activeFlag' && event.data.activeFlag === true) {
                  this.secgrpValidateBean = new SecurityThreatGroups();
                  this.secgrpValidateBean.stgId = this.secgrpModel.stgId;
                  const serviceObj = this.oimtgngsFactory.secGrpExecuteQuery(this.secgrpValidateBean);
                  serviceObj.subscribe(data => {
                        if (data[0].activeFlag === 'N' && data[0].stgCode) {
                              this.show(this.translateService.translate('oimtgngs.cannotreactivatedtherecord'));
                              this.gangsGrid.setColumnData('activeFlag', rowIndexGang, false);
                        } else {
                              this.gangsGrid.setColumnData('expiryDate', rowIndexGang, null);
                        }
                  });
            } else if (event.field === 'activeFlag' && event.data.activeFlag === false && event.newValue !== event.oldValue
                  && !event.data.stgId) {
                  this.gangsGrid.setColumnData('expiryDate', rowIndexGang, DateFormat.getDate());
            }
            gangsrowdata.validated = true;
            return gangsrowdata;

      }
      validateSetssRowData = (event) => {
            const rowdata = new ValidateRowReturn();
            const rowIndex = event.rowIndex;
            if (event.field === 'stgCode' && event.data.stgCode) {
                  const duplicate = this.oimtgngsFactory.getDuplicateSetsStgCode(event.data.stgCode);
                  duplicate.subscribe(dup => {
                        if (dup > 0) {
                              this.show(this.translateService.translate('oimtgngs.rowalreadyexists'));
                              this.setGrid.setColumnData('stgCode', rowIndex, null);
                        } else {
                              this.setGrid.setColumnData('effectiveDate', rowIndex, DateFormat.getDate());
                        }
                  });

                  rowdata.validated = true;
                  return rowdata;
            }
            if (event.field === 'activeFlag' && event.data.activeFlag === false && event.newValue !== event.oldValue) {
                  this.setGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate());
            } else if (event.field === 'activeFlag' && event.data.activeFlag === true) {
                  this.secgrpValidateBean = new SecurityThreatGroups();
                  this.secgrpValidateBean.parentStgId = this.secgrpModel.stgId;
                  const serviceObj = this.oimtgngsFactory.secGrp1ExecuteQuery(this.secgrpValidateBean);
                  serviceObj.subscribe(data => {
                        if (data[0].activeFlag === 'N' && data[0].stgCode) {
                              this.show(this.translateService.translate('oimtgngs.cannotreactivatedtherecord'));
                              this.setGrid.setColumnData('activeFlag', rowIndex, false);
                        } else {
                              this.setGrid.setColumnData('expiryDate', rowIndex, null);
                        }
                  });
            }


            rowdata.validated = true;
            return rowdata;
      }

      oimtgngsexecuteQuery() {
            this.secgrpModelGridOne = new SecurityThreatGroups();
            if (this.code) {
                  this.secgrpModelGridOne.stgCode = this.code;
            }
            if (this.description) {
                  this.secgrpModelGridOne.description = this.description;
            }
            if (this.sequence || this.sequence === 0) {
                  this.secgrpModelGridOne.listSeq = this.sequence;
            }
            const serviceObj = this.oimtgngsFactory.secGrpExecuteQuery(this.secgrpModelGridOne);
            serviceObj.subscribe(data => {
                  if (data.length === 0) {
                        this.secgrpData = [];
                        this.clearButton = false;
                        this.retrieveButton = true;
                        this.gangsGridInsert = false;
                        this.onSetsGridInsert = false;
                        this.show(this.translateService.translate('common.querycaused'));
                  } else {
                        data.forEach(element => {
                              element.butDetail = this.translateService.translate('oimtgngs.detail');
                              element.stgLevel = 'NATION';
                              element.activeFlag = element.activeFlag === 'Y' ? 'true' : null;


                        });
                        this.secgrpData = data;
                        this.tableIndex = 0;
                        this.retrieveButton = true;
                        this.clearButton = false;
                        this.gangsGridInsert = true;
                        this.onSetsGridInsert = true;

                  }

            });
      }
      /**
      * This function loads the data into the Master Record and its child records
      */
      oimtgngsPopulateDetails() {
            this.secgrp1Model = new SecurityThreatGroups();
            this.secgrp1Model.parentStgId = this.secgrpModel.stgId;
            const serviceObj = this.oimtgngsFactory.secGrp1ExecuteQuery(this.secgrp1Model);
            serviceObj.subscribe(data => {
                  if (data.length === 0) {
                        this.secgrp1Data = [];
                        this.onSetsGridInsert = false;
                        this.secgrp2ExecuteQuery();
                  } else {
                        data.forEach(element => {
                              element.butDetail1 = this.translateService.translate('oimtgngs.detail');
                              element.butRealign = this.translateService.translate('oimtgngs.realign');
                              element.stgLevel = 'GANG';
                              element.activeFlag = element.activeFlag === 'Y' ? 'true' : null;
                        });
                        this.secgrp1Data = data;
                        this.tableIndexGang = 0;
                        this.onSetsGridInsert = true;
                  }
            });
      }


      secgrp2ExecuteQuery() {
            this.secgrp2Model = new SecurityThreatGroups();
            this.secgrp2Model.parentStgId = this.secgrp1Model.stgId;
            const secgrp2Result = this.oimtgngsFactory.secGrp2ExecuteQuery(this.secgrp2Model);
            secgrp2Result.subscribe(data => {
                  if (data.length === 0) {
                        this.secgrp2Data = [];
                  } else {
                        data.forEach(element => {
                              element.butDetail2 = this.translateService.translate('oimtgngs.detail');
                              element.butRealign2 = this.translateService.translate('oimtgngs.realign');
                              element.stgLevel = 'SET';
                              element.activeFlag = element.activeFlag === 'Y' ? 'true' : null;
                        });
                        this.secgrp2Data = data;
                        this.tableIndexSet = 0;
                  }
            });
      }

      /**
       *  This function will be executed when commit event is
      * fired
      */
      oimtgngsSavesecgrpForm(event) {
            this.secgrpInsertList = event.added;
            this.secgrpUpdatetList = event.updated;
            this.secgrpDeleteList = event.removed;
            this.secgrpCommitModel.insertList = [];
            this.secgrpCommitModel.updateList = [];
            this.secgrpCommitModel.deleteList = [];
            if (this.secgrpInsertList.length > 0) {
                  for (let i = 0; i < this.secgrpInsertList.length; i++) {

                        if (!this.secgrpInsertList[i].stgCode) {
                              this.show(this.translateService.translate('oimtgngs.nationscodemustbe'));
                              return;
                        }
                        if (!this.secgrpInsertList[i].description) {
                              this.show(this.translateService.translate('oimtgngs.nationsdescriptionmustbe'));
                              return;
                        }
                        if (!this.secgrpInsertList[i].effectiveDate) {
                              this.show(this.translateService.translate('oimtgngs.nationseffmustbe'));
                              return;
                        }
                        this.secgrpInsertList[i].stgLevel = 'NATION';
                        this.secgrpInsertList[i].createDatetime = DateFormat.getDate();
                        this.secgrpInsertList[i].createUserId = this.sessionManager.getId();
                        if (this.secgrpInsertList[i].activeFlag) {
                              this.secgrpInsertList[i].activeFlag = 'Y';
                        } else {
                              this.secgrpInsertList[i].activeFlag = 'N';
                        }
                  }
                  this.secgrpCommitModel.insertList = this.secgrpInsertList;
            }
            if (this.secgrpUpdatetList.length > 0) {
                  for (let i = 0; i < this.secgrpUpdatetList.length; i++) {

                        if (!this.secgrpUpdatetList[i].stgCode) {
                              this.show(this.translateService.translate('oimtgngs.nationscodemustbe'));
                              return;
                        }
                        if (!this.secgrpUpdatetList[i].description) {
                              this.show(this.translateService.translate('oimtgngs.nationsdescriptionmustbe'));
                              return;
                        }
                        if (!this.secgrpUpdatetList[i].effectiveDate) {
                              this.show(this.translateService.translate('oimtgngs.nationseffmustbe'));
                              return;
                        }

                        if (this.secgrpUpdatetList[i].activeFlag) {
                              this.secgrpUpdatetList[i].activeFlag = 'Y';
                        } else {
                              this.secgrpUpdatetList[i].activeFlag = 'N';
                        }
                  }
                  this.secgrpCommitModel.updateList = this.secgrpUpdatetList;
            }

            if (this.secgrpDeleteList.length > 0) {
                  for (let i = 0; i < this.secgrpDeleteList.length; i++) {
                  }
                  this.secgrpCommitModel.deleteList = this.secgrpDeleteList;
            }
            const secgrpSaveData = this.oimtgngsFactory.secGrpCommit(this.secgrpCommitModel);
            secgrpSaveData.subscribe(data => {
                  if (data === 1) {
                        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                        this.oimtgngsexecuteQuery();
                  } else {
                        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                  }
            });
      }




      /**
       *  This function will be executed when commit event is
      * fired
      */
      oimtgngsSavesecgrp1Form(event) {
            this.secgrp1InsertList = event.added;
            this.secgrp1UpdatetList = event.updated;
            this.secgrp1DeleteList = event.removed;
            this.secgrp1CommitModel.insertList = [];
            this.secgrp1CommitModel.updateList = [];
            this.secgrp1CommitModel.deleteList = [];
            if (this.secgrp1InsertList.length > 0) {
                  for (let i = 0; i < this.secgrp1InsertList.length; i++) {

                        if (!this.secgrp1InsertList[i].stgCode) {
                              this.show(this.translateService.translate('oimtgngs.gangscodemustbe'));
                              return;
                        }

                        const index=this.secgrp1Data.indexOf(this.secgrp1InsertList[i]);
                        for(let j=0;j<this.secgrp1Data.length;j++){
                            if(index != j && this.secgrp1Data[j].stgCode === this.secgrp1InsertList[i].stgCode){
                              this.show(this.translateService.translate('oimtgngs.rowalreadyexists'));
                                return; 
                            }
                        }

                        if (!this.secgrp1InsertList[i].description) {
                              this.show(this.translateService.translate('oimtgngs.gangsdescriptionmustbe'));
                              return;
                        }
                        if (!this.secgrp1InsertList[i].effectiveDate) {
                              this.show(this.translateService.translate('oimtgngs.gangseffdatemustbe'));
                              return;
                        }


                        this.secgrp1InsertList[i].stgLevel = 'GANG';
                        this.secgrp1InsertList[i].parentStgId = this.secgrpModel.stgId;
                        this.secgrp1InsertList[i].createDatetime = DateFormat.getDate();
                        this.secgrp1InsertList[i].createUserId = this.sessionManager.getId();
                        if (this.secgrp1InsertList[i].activeFlag) {
                              this.secgrp1InsertList[i].activeFlag = 'Y';
                        } else {
                              this.secgrp1InsertList[i].activeFlag = 'N';
                        }
                  }
                  this.secgrp1CommitModel.insertList = this.secgrp1InsertList;
            }
            if (this.secgrp1UpdatetList.length > 0) {
                  for (let i = 0; i < this.secgrp1UpdatetList.length; i++) {

                        if (!this.secgrp1UpdatetList[i].stgCode) {
                              this.show(this.translateService.translate('oimtgngs.gangscodemustbe'));
                              return;
                        }
                        if (!this.secgrp1UpdatetList[i].description) {
                              this.show(this.translateService.translate('oimtgngs.gangsdescriptionmustbe'));
                              return;
                        }
                        if (!this.secgrp1UpdatetList[i].effectiveDate) {
                              this.show(this.translateService.translate('oimtgngs.gangseffdatemustbe'));
                              return;
                        }

                        if (this.secgrp1UpdatetList[i].activeFlag) {
                              this.secgrp1UpdatetList[i].activeFlag = 'Y';
                        } else {
                              this.secgrp1UpdatetList[i].activeFlag = 'N';
                        }
                  }
                  this.secgrp1CommitModel.updateList = this.secgrp1UpdatetList;
            }
            if (this.secgrp1DeleteList.length > 0) {
                  for (let i = 0; i < this.secgrp1DeleteList.length; i++) {
                  }
                  this.secgrp1CommitModel.deleteList = this.secgrp1DeleteList;
            }
            const secgrp1SaveData = this.oimtgngsFactory.secGrp1Commit(this.secgrp1CommitModel);
            secgrp1SaveData.subscribe(data => {
                  if (data === 1) {
                        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                        this.oimtgngsPopulateDetails();
                  } else {
                        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                        return;
                  }
            });
      }
      /**
       *  This function will be executed when commit event is
      * fired
      */
      oimtgngsSavesecgrp2Form(event) {
            this.secgrp2InsertList = event.added;
            this.secgrp2UpdatetList = event.updated;
            this.secgrp2DeleteList = event.removed;
            this.secgrp2CommitModel.insertList = [];
            this.secgrp2CommitModel.updateList = [];
            this.secgrp2CommitModel.deleteList = [];
            if (this.secgrp2InsertList.length > 0) {
                  for (let i = 0; i < this.secgrp2InsertList.length; i++) {
                        if (!this.secgrp2InsertList[i].stgCode) {
                              this.show(this.translateService.translate('oimtgngs.setsscodemustbe'));
                              return;
                        }
                        const index=this.secgrp2Data.indexOf(this.secgrp2InsertList[i]);
                        for(let j=0;j<this.secgrp2Data.length;j++){
                            if(index != j && this.secgrp2Data[j].stgCode === this.secgrp2InsertList[i].stgCode){
                              this.show(this.translateService.translate('oimtgngs.rowalreadyexists'));
                                return; 
                            }
                        }
                        if (!this.secgrp2InsertList[i].description) {
                              this.show(this.translateService.translate('oimtgngs.setsdescriptionemustbe'));
                              return;
                        }
                        if (!this.secgrp2InsertList[i].effectiveDate) {
                              this.show(this.translateService.translate('oimtgngs.setsseffdatemustbe'));
                              return;
                        }

                        this.secgrp2InsertList[i].stgLevel = 'SET';
                        this.secgrp2InsertList[i].parentStgId = this.secgrp1Model.stgId;
                        this.secgrp2InsertList[i].createDatetime = DateFormat.getDate();
                        this.secgrp2InsertList[i].createUserId = this.sessionManager.getId();
                        if (this.secgrp2InsertList[i].activeFlag) {
                              this.secgrp2InsertList[i].activeFlag = 'Y';
                        } else {
                              this.secgrp2InsertList[i].activeFlag = 'N';
                        }
                  }
                  this.secgrp2CommitModel.insertList = this.secgrp2InsertList;
            }
            if (this.secgrp2UpdatetList.length > 0) {
                  for (let i = 0; i < this.secgrp2UpdatetList.length; i++) {
                        if (!this.secgrp2UpdatetList[i].stgCode) {
                              this.show(this.translateService.translate('oimtgngs.setsscodemustbe'));
                              return;
                        }
                        const index=this.secgrp2Data.indexOf(this.secgrp2UpdatetList[i]);
                        for(let j=0;j<this.secgrp2Data.length;j++){
                            if(index != j && this.secgrp2Data[j].stgCode === this.secgrp2UpdatetList[i].stgCode){
                              this.show(this.translateService.translate('oimtgngs.rowalreadyexists'));
                                return; 
                            }
                        }
                        if (!this.secgrp2UpdatetList[i].description) {
                              this.show(this.translateService.translate('oimtgngs.setsdescriptionemustbe'));
                              return;
                        }
                        if (!this.secgrp2UpdatetList[i].effectiveDate) {
                              this.show(this.translateService.translate('oimtgngs.setsseffdatemustbe'));
                              return;
                        }
                        if (this.secgrp2UpdatetList[i].activeFlag) {
                              this.secgrp2UpdatetList[i].activeFlag = 'Y';
                        } else {
                              this.secgrp2UpdatetList[i].activeFlag = 'N';
                        }
                  }
                  this.secgrp2CommitModel.updateList = this.secgrp2UpdatetList;
            }
            if (this.secgrp2DeleteList.length > 0) {
                  for (let i = 0; i < this.secgrp2DeleteList.length; i++) {
                  }
                  this.secgrp2CommitModel.deleteList = this.secgrp2DeleteList;
            }
            const secgrp2SaveData = this.oimtgngsFactory.secGrp2Commit(this.secgrp2CommitModel);
            secgrp2SaveData.subscribe(data => {
                  if (data === 1) {
                        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                        this.secgrp2ExecuteQuery();
                  } else {
                        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                  }
            });
      }
      get readeOnlyFields() {
            if (this.secgrpData.length === 0) {
                  return false;
            } else {
                  return true;
            }
      }
      onSetGridClear = () => {
            this.secgrp2ExecuteQuery();
		return true;
	}
}
