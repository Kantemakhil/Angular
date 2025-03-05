import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidistatService } from '../service/oidistat.service';
import { OffenderImprisonStatuses } from '@instCaseManagementbeans/OffenderImprisonStatuses';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Offenders } from '@commonbeans/Offenders';
import { OffenderImprisonStatusesCommitBean } from '@instCaseManagementbeans/OffenderImprisonStatusesCommitBean';
import { OffenderExternalMovements } from '@instdemographicsbeans/OffenderExternalMovements';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';

@Component({
    selector: 'app-oidistat',
    templateUrl: './oidistat.component.html'
})

export class OidistatComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offimpsData: OffenderImprisonStatuses[] = [];
    offimpsDataTemp: OffenderImprisonStatuses[] = [];
    offimpsModel: OffenderImprisonStatuses = new OffenderImprisonStatuses();
    offimpsIndex = 0;
    offimpsInsertList: OffenderImprisonStatuses[] = [];
    offimpsUpdatetList: OffenderImprisonStatuses[] = [];
    offimpsDeleteList: OffenderImprisonStatuses[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offImpsColumnDef: any[];
    offImpsReadOnly = false;
    rgimprisonmentstaRg: any[] = [];
    rgagylocidRg: any[] = [];
    caseLoadId: any;
    offenderObj: Offenders = new Offenders();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    addFlag = false;
    tableIndex = 0;
    offImpsCommitModel: OffenderImprisonStatusesCommitBean = new OffenderImprisonStatusesCommitBean();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offemModel: OffenderExternalMovements = new OffenderExternalMovements();
    movementsFlag = false;
    statusFlag = false;
    timeFlag = false;
    constructor(private oidistatFactory: OidistatService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService) {
        this.offImpsColumnDef = [];
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;

    }
    ngOnInit() {
        this.caseLoadId = this.sessionManager.currentCaseLoad;

        this.offImpsColumnDef = [
            {
                fieldName: this.translateService.translate('oidistat.date'), field: 'effectiveDate',
                editable: true, width: 150, datatype: 'date', cellEditable: this.canEventDateEdit, maxlength: 11
            },
            {
                fieldName: this.translateService.translate('oidistat.time'), maxlength: 5,
                field: 'effectiveTime', editable: true, width: 150, datatype: 'time', cellEditable: this.canEventDateEdit
            },
            {
                fieldName: this.translateService.translate('oidistat.status'),
                field: 'imprisonmentStatus', editable: true, width: 300, datatype: 'lov', domain:'IMP_STS'/*link: 'oidistat/rgImprisonmentStaRecordGroup'*/,
                optionWidth: 350, maxlength: 40, cellEditable: this.canEventDateEdit
            },
            {
                fieldName: this.translateService.translate('system-profile.inst-agency') + '*',
                field: 'agyLocId', editable: true, width: 300, datatype: 'lov',
                 link: 'oidistat/rgAgyLocIdRecordGroup?caseloadId=' + this.caseLoadId, optionWidth: 350,
                cellEditable: this.canEventDateEdit, maxlength: 40,source:'OUMAGLOC'
            },
            {
                fieldName: this.translateService.translate('oidistat.comment'),
                field: 'commentText', editable: true, width: 300, datatype: 'text', maxlength: 240, uppercase: 'false',
                cellEditable: this.canEventDateEdit
            },
            {
                fieldName: this.translateService.translate('oidistat.active'), field: 'activeFlag',
                datatype: 'checkbox', editable: false, width: 200
            },
            {
                fieldName: this.translateService.translate('oidistat.error'), field: 'errorFlag',
                datatype: 'checkbox', editable: false, width: 200, cellEditable: this.canEventDateEdit
            },
            {
                fieldName: '', field: 'offenderBookId', hide: true
            },
            {
                fieldName: '', field: 'globalCaseloadId', hide: true
            },
            {
                fieldName: '', field: 'oldImprisonmentStatus', hide: true
            }
        ];
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
        }
        const rgimprisonmentstaServiceObj = this.oidistatFactory.rgImprisonmentStaRecordGroup();
        rgimprisonmentstaServiceObj.subscribe(rgimprisonmentstaList => {
            if (rgimprisonmentstaList.length === 0) {
                this.rgimprisonmentstaRg = [];
            } else {
                for (let i = 0; i < rgimprisonmentstaList.length; i++) {
                    this.rgimprisonmentstaRg.push({
                        'text': rgimprisonmentstaList[i].code + ' - ' +
                        rgimprisonmentstaList[i].description, 'id': rgimprisonmentstaList[i].code
                    });
                }
            }
        });
        const rgagylocidServiceObj = this.oidistatFactory.rgAgyLocIdRecordGroup(this.caseLoadId);
        rgagylocidServiceObj.subscribe(rgagylocidList => {
            if (rgagylocidList.length === 0) {
                this.rgagylocidRg = [];
            } else {
                for (let i = 0; i < rgagylocidList.length; i++) {
                    this.rgagylocidRg.push({
                        'text': rgagylocidList[i].code + ' - ' +
                        rgagylocidList[i].description, 'id': rgagylocidList[i].code
                    });
                }
            }
        });
    }
    canEventDateEdit = (data: any, index: number, field: string): boolean => {
        if (this.vHeaderBlockModel.offenderBookId && this.vHeaderBlockModel.activeFlag !== 'Y') {
            this.show(this.translateService.translate('oidistat.cannotchangestatus'), 'warn');
            return false;
        }
        if (field === 'imprisonmentStatus' || field === 'agyLocId' || field === 'commentText' || field === 'activeFlag' ||
         field === 'errorFlag') {
            if (this.movementsFlag) {
                this.show(this.translateService.translate('oidistat.datecannotoccur'), 'warn');
                return false;
            } else if (this.statusFlag) {
                this.show(this.translateService.translate('oidistat.datemustbevalid'), 'warn');
                return false;
            } else if (this.timeFlag) {
                this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
                return false;
            } else if (field === 'activeFlag' && !(data.imprisonStatusSeq)) {
                // this.show(this.translateService.translate('common.fieldisprotectedagainstupdated'), 'warn');
                return false;
            }
        }
       if ( field === 'effectiveTime' ) {
             if (this.movementsFlag) {
                this.show(this.translateService.translate('oidistat.datecannotoccur'), 'warn');
                return false;
           } else if (this.statusFlag) {
               this.show(this.translateService.translate('oidistat.datemustbevalid'), 'warn');
               return false;
           } else if (this.timeFlag) {
               this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
               return true;
           }
       }

        if ((field === 'imprisonmentStatus' || field === 'agyLocId' || field === 'activeFlag') &&
         data.imprisonStatusSeq != null && data.imprisonStatusSeq > 0) {
            // this.show(this.translateService.translate('oidistat.fieldisprotectedagainstupdate'), 'warn');
            return false;
        }

        if (field === 'effectiveDate' || field === 'effectiveTime' ) {
             if (data.expiryDate) {
            // this.show(this.translateService.translate('oidistat.fieldisprotectedagainstupdate'), 'warn');
            return false;
                 }
             }

        if (field === 'errorFlag') {
            if (data.imprisonStatusSeq != null && data.imprisonStatusSeq > 0) {
                if (!data.activeFlag) {
                    // this.show(this.translateService.translate('oidistat.errorcheckflag'), 'warn');
                    return false;
                }
            } else {
                // this.show(this.translateService.translate('oidistat.fieldisprotectedagainstupdate'), 'warn');
                return false;
            }
        }
        if (this.movementsFlag || this.statusFlag || this.timeFlag) {
            if (field === 'effectiveDate' && this.offimpsIndex !== this.offimpsData.indexOf(data)) {
                if (this.movementsFlag) {
                    this.show(this.translateService.translate('oidistat.datecannotoccur'), 'warn');
                    return false;
                } else if (this.statusFlag) {
                    this.show(this.translateService.translate('oidistat.datemustbevalid'), 'warn');
                    return false;
                } else if (this.timeFlag) {
                    this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
                    return false;
                }
            }
        } else if (field === 'effectiveDate' && this.timeFlag ) {
               this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
                    return false;
            }
         if (field === 'effectiveTime' && this.timeFlag && this.offimpsIndex !== this.offimpsData.indexOf(data) ) {
              this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
                    return false;
            }
        return true;
    }
    onRowClickoffimps(event) {
        if (event) {
              if (this.movementsFlag) {
                    this.show(this.translateService.translate('oidistat.datecannotoccur'), 'warn');
                    return false;
              } else if (this.statusFlag) {
                  this.show(this.translateService.translate('oidistat.datemustbevalid'), 'warn');
                  return false;
              } else if (this.timeFlag) {
                  this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
                  return false;
              }
                 this.offimpsModel = event;
                 this.offimpsIndex = this.offimpsData.indexOf(event);
                return true;
            }
        return false;
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
            this.vHeaderBlockOffender = this.vHeaderBlockModel;
            if (this.vHeaderBlockModel.rootOffenderId) {
                this.offimpsExecuteQuery();
            }
        } else {
            this.offimpsData = [];
            this.addFlag = false;
            this.movementsFlag = false;
            this.statusFlag = false;
            this.timeFlag = false;
            this.offimpsModel = new OffenderImprisonStatuses();
            this.offimpsIndex = 0;
            this.listToCompare = [];
        }
    }
     /*
     *  This event is used to do the validations when click Add button in Offender Imprisonment Status Block.
     */
    onGridInsert = () => {
        if (!this.vHeaderBlockModel.offenderBookId) {
            return;
        }
             if (this.vHeaderBlockModel.offenderBookId && this.vHeaderBlockModel.activeFlag !== 'Y') {
                  this.show(this.translateService.translate('oidistat.cannotchangestatus'), 'warn');
                  return;
             }
             if (this.movementsFlag) {
                 this.show(this.translateService.translate('oidistat.datecannotoccur'), 'warn');
                 return false;
             } else if (this.statusFlag) {
                 this.show(this.translateService.translate('oidistat.datemustbevalid'), 'warn');
                 return false;
             } else if (this.timeFlag) {
                 this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
                 return false;
             }
        if (this.offimpsData.length === 0 && this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
              this.offimpsIndex = 0;
                this.offemModel = new OffenderExternalMovements();
                this.offemModel.toAgyLocId = this.caseLoadId;
                this.offemModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offemModel.movementDate = DateFormat.getDate();
                const offfemDateResult = this.oidistatFactory.chkImpDate(this.offemModel);
                offfemDateResult.subscribe(offfemResultValue => {
                    if (offfemResultValue === 1) {
                        this.movementsFlag = true;
                         this.statusFlag = false;
                    } else if (offfemResultValue === 2) {
                        this.statusFlag = true;
                          this.movementsFlag = false;
                    } else {
                        this.movementsFlag = false;
                        this.statusFlag = false;
                    }
                });
            return {
                effectiveDate: DateFormat.parse(DateFormat.format(DateFormat.getDate())), effectiveTime:  DateFormat.getDate(),
                globalCaseloadId: this.caseLoadId,
                 imprisonmentStatus: '', agyLocId: '', commentText: '',  activeFlag: false, errorFlag: false,
                  offenderBookId: this.vHeaderBlockModel.offenderBookId
            };
        }
        // for (let i = 0; i < this.offimpsData.length; i++) {
        //     if (!this.offimpsData[i].effectiveDate) {
        //         this.show(this.translateService.translate('oidistat.datemustbeentered'), 'warn');
        //         return;
        //     }
        //     if (!this.offimpsData[i].effectiveTime) {
        //         this.show(this.translateService.translate('oidistat.timemustbeentered'), 'warn');
        //         return;
        //     }
        //     if (!this.offimpsData[i].imprisonmentStatus) {
        //          this.show(this.translateService.translate('oidistat.statusmustbeentered'), 'warn');
        //         return;
        //     }

        //     if (!this.offimpsData[i].agyLocId) {
        //          this.show(this.translateService.translate('oidistat.facilitymustbeentered'), 'warn');
        //         return;
        //     }
        // }
         this.offimpsIndex = this.offimpsData.length + 1;
                this.offemModel = new OffenderExternalMovements();
                this.offemModel.toAgyLocId = this.caseLoadId;
                this.offemModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offemModel.movementDate = DateFormat.getDate();
                const offfemResult = this.oidistatFactory.chkImpDate(this.offemModel);
                offfemResult.subscribe(offfemResultValue => {
                    if (offfemResultValue === 1) {
                        this.movementsFlag = true;
                         this.statusFlag = false;
                    } else if (offfemResultValue === 2) {
                        this.statusFlag = true;
                          this.movementsFlag = false;
                    } else {
                        this.movementsFlag = false;
                        this.statusFlag = false;
                    }
                });
        return {
           effectiveDate: DateFormat.parse(DateFormat.format(DateFormat.getDate())),
            effectiveTime:  DateFormat.getDate(), imprisonmentStatus: '',
            agyLocId: '', commentText: '',  activeFlag: false, errorFlag: false,
             offenderBookId: this.vHeaderBlockModel.offenderBookId, globalCaseloadId: this.caseLoadId
        };
    }

    offimpsExecuteQuery() {
        this.offimpsModel = new OffenderImprisonStatuses();
        this.offimpsModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const offimpsResult = this.oidistatFactory.offImpsExecuteQuery(this.offimpsModel);
        offimpsResult.subscribe(offimpsResultList => {
            if (offimpsResultList.length === 0) {
                this.offimpsData = [];
                this.listToCompare = [];
            } else {
                  for (let i = 0; i < offimpsResultList.length; i++) {
                    offimpsResultList[i].oldImprisonmentStatus = offimpsResultList[i].imprisonmentStatus;
                      if (offimpsResultList[i].expiryDate) {
                                   offimpsResultList[i].activeFlag =  false;
                            } else {
                          offimpsResultList[i].activeFlag =  true;
                          }
                    offimpsResultList[i].errorFlag = offimpsResultList[i].errorFlag === 'Y' ? true : false;
                     offimpsResultList[i].effectiveDate = DateFormat.getDate(offimpsResultList[i].effectiveDate);
                         if (offimpsResultList[i].effectiveTime) {
                                offimpsResultList[i].effectiveTime = DateFormat.getDate(offimpsResultList[i].effectiveTime);
                            }
                      }
                      this.offimpsDataTemp = JSON.parse(JSON.stringify(offimpsResultList));
                this.offimpsData = offimpsResultList;
                this.offimpsModel = offimpsResultList[0];
                this.listToCompare = offimpsResultList;
            }
        });
        this.addFlag = true;
    }
    updateImpriosnmentStatusValidator = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (this.vHeaderBlockModel.offenderBookId && this.vHeaderBlockModel.activeFlag !== 'Y') {
            this.show(this.translateService.translate('oidistat.cannotchangestatus'), 'warn');
            this.grid.setColumnData('errorFlag', rowIndex, this.offimpsDataTemp[rowIndex].errorFlag);
            rowdata.validated = true;
            return rowdata;
       }
        if (event.field === 'errorFlag' && !event.data.activeFlag) {
            this.show(this.translateService.translate('oidistat.errorcheckflag'), 'warn');
            this.grid.setColumnData('errorFlag', rowIndex, this.offimpsDataTemp[rowIndex].errorFlag);
            rowdata.validated = true;
            return rowdata;
        }
         if (this.movementsFlag &&  this.offimpsData.indexOf(event.data) !== this.offimpsIndex) {
               this.show(this.translateService.translate('oidistat.datecannotoccur'), 'warn');
                 rowdata.data = {
                    effectiveDate: event.data.effectiveDate, offenderBookId: event.data.offenderBookId,
                    effectiveTime: event.data.effectiveTime, imprisonmentStatus: event.data.imprisonmentStatus,
                    agyLocId: event.data.agyLocId, globalCaseloadId: this.caseLoadId,
                    commentText: event.data.commentText, activeFlag: event.data.activeFlag, errorFlag: event.data.errorFlag
                };
                rowdata.validated = true;
                return rowdata;
        } else if (this.statusFlag &&  this.offimpsData.indexOf(event.data) !== this.offimpsIndex) {
          this.show(this.translateService.translate('oidistat.datemustbevalid'), 'warn');
            rowdata.data = {
                    effectiveDate: event.data.effectiveDate, offenderBookId: event.data.offenderBookId,
                    effectiveTime: event.data.effectiveTime, imprisonmentStatus: event.data.imprisonmentStatus,
                    agyLocId: event.data.agyLocId,
                    commentText: event.data.commentText, activeFlag: event.data.activeFlag, errorFlag: event.data.errorFlag
                };
                rowdata.validated = true;
                return rowdata;
        }  else if (this.timeFlag &&  this.offimpsData.indexOf(event.data) !== this.offimpsIndex) {
          this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
            rowdata.data = {
                    effectiveDate: event.data.effectiveDate, offenderBookId: event.data.offenderBookId,
                    effectiveTime: event.data.effectiveTime, imprisonmentStatus: event.data.imprisonmentStatus,
                    agyLocId: event.data.agyLocId, globalCaseloadId: this.caseLoadId,
                    commentText: event.data.commentText, activeFlag: event.data.activeFlag, errorFlag: event.data.errorFlag
                };
                rowdata.validated = true;
                return rowdata;
        }
        if (event.field === 'effectiveDate') {
            if (event.data.effectiveDate) {
                this.offimpsIndex = this.offimpsData.indexOf(event.data);
                this.offemModel = new OffenderExternalMovements();
                this.offemModel.toAgyLocId = this.caseLoadId;
                this.offemModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offemModel.movementDate = event.data.effectiveDate;
                const offfemResult = this.oidistatFactory.chkImpDate(this.offemModel);
                offfemResult.subscribe(offfemResultValue => {
                    if (offfemResultValue === 1) {
                        this.show(this.translateService.translate('oidistat.datecannotoccur'), 'warn');
                        this.movementsFlag = true;
                         this.statusFlag = false;
                    } else if (offfemResultValue === 2) {
                        this.show(this.translateService.translate('oidistat.datemustbevalid'), 'warn');
                        this.statusFlag = true;
                          this.movementsFlag = false;
                    } else {
                        this.movementsFlag = false;
                        this.statusFlag = false;
                    }
                });
                rowdata.data = {
                    effectiveDate: event.data.effectiveDate, offenderBookId: event.data.offenderBookId,
                    effectiveTime: event.data.effectiveTime, imprisonmentStatus: event.data.imprisonmentStatus,
                    agyLocId: event.data.agyLocId, globalCaseloadId: this.caseLoadId,
                    commentText: event.data.commentText, activeFlag: event.data.activeFlag, errorFlag: event.data.errorFlag
                };
                rowdata.validated = true;
                return rowdata;
            }
        }
         if (event.field === 'effectiveTime') {
            if (event.data.effectiveDate) {
                this.offimpsIndex = this.offimpsData.indexOf(event.data);
                this.offemModel = new OffenderExternalMovements();
                this.offemModel.toAgyLocId = this.caseLoadId;
                this.offemModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offemModel.movementDate = event.data.effectiveDate;
                 this.offemModel.movementTime = DateFormat.getDate(event.data.effectiveTime);
                const offfemResult = this.oidistatFactory.chkImpDateEffectiveTime(this.offemModel);
                offfemResult.subscribe(offfemResultValue => {
                    if (offfemResultValue === 1) {
                      this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
                       this.timeFlag = true;
                    } else {
                        if (event.data.imprisonStatusSeq && event.data.imprisonStatusSeq > 0 ) {
                               event.data.effectiveTime = TimeFormat.parse(TimeFormat.format(event.data.effectiveTime),
                                DateFormat.getDate());
                          }
                        this.timeFlag = false;
                    }
                });
                rowdata.data = {
                    effectiveDate: event.data.effectiveDate, offenderBookId: event.data.offenderBookId,
                    effectiveTime: event.data.effectiveTime, imprisonmentStatus: event.data.imprisonmentStatus,
                    agyLocId: event.data.agyLocId, globalCaseloadId: this.caseLoadId,
                    commentText: event.data.commentText, activeFlag: event.data.activeFlag, errorFlag: event.data.errorFlag
                };
                rowdata.validated = true;
                return rowdata;
                  }
        }

        if (event.oldValue !== event.newValue) {
            rowdata.data = {
                effectiveDate: event.data.effectiveDate, offenderBookId: event.data.offenderBookId,
                effectiveTime: event.data.effectiveTime, imprisonmentStatus: event.data.imprisonmentStatus, agyLocId: event.data.agyLocId,
                commentText: event.data.commentText, activeFlag: event.data.activeFlag,
                errorFlag: event.data.errorFlag, globalCaseloadId: this.caseLoadId
            };
            rowdata.validated = true;
            return rowdata;
    }
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidistatSaveoffimpsForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.offImpsCommitModel.insertList = [];
        this.offImpsCommitModel.updateList = [];
        this.offImpsCommitModel.deleteList = [];
           if (this.movementsFlag) {
                    this.show(this.translateService.translate('oidistat.datecannotoccur'), 'warn');
                    return;
                }
             if (this.statusFlag) {
                  this.show(this.translateService.translate('oidistat.datemustbevalid'), 'warn');
                    return;
                } else if ( this.timeFlag ) {
                   this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
                 return;
                 }
                this.offimpsInsertList = event.added;
                this.offimpsUpdatetList = event.updated;
                this.offimpsDeleteList = event.removed;
        if (this.offimpsInsertList.length > 0) {
            for (let i = 0; i < this.offimpsInsertList.length; i++) {
                if (!this.offimpsInsertList[i].effectiveDate) {
                    this.offimpsInsertList[i].effectiveDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                    this.offimpsInsertList[i].effectiveTime = DateFormat.getDate();
                    this.show(this.translateService.translate('oidistat.datemustbeentered'), 'warn');
                    return;
                }
                if (!this.offimpsInsertList[i].effectiveTime) {
                    this.offimpsInsertList[i].effectiveDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                    this.offimpsInsertList[i].effectiveTime = DateFormat.getDate();
                    this.show(this.translateService.translate('oidistat.timemustbeentered'), 'warn');
                    return;
                }
                if (!this.offimpsInsertList[i].imprisonmentStatus) {
                    this.show(this.translateService.translate('oidistat.statusmustbeentered'), 'warn');
                    return;
                }

                if (!this.offimpsInsertList[i].agyLocId) {
                    this.show(this.translateService.translate('oidistat.facilitymustbeentered'), 'warn');
                    return;
                }
                        this.offimpsInsertList[i].effectiveTime = TimeFormat.parse(TimeFormat.format(
                            this.offimpsInsertList[i].effectiveTime),
                            this.offimpsInsertList[i].effectiveDate);
                    this.offimpsInsertList[this.offimpsInsertList.length - 1].expiryDate = undefined;
                }
            }
         if (this.offimpsUpdatetList.length > 0) {
                for (let i = 0; i < this.offimpsUpdatetList.length; i++) {
                   if (!this.offimpsUpdatetList[i].effectiveDate) {
                       for (let j = 0; j < this.listToCompare.length; j++ ) {
                           if ( this.listToCompare[i].imprisonStatusSeq === this.listToCompare[j].imprisonStatusSeq ) {
                                this.show(this.translateService.translate('oidistat.datemustbeentered'), 'warn');
                                return;
                               }
                           }
                }
                   if (!this.offimpsUpdatetList[i].effectiveTime) {
                       for (let j = 0; j < this.listToCompare.length; j++) {
                           if (this.listToCompare[i].imprisonStatusSeq === this.listToCompare[j].imprisonStatusSeq) {
                               this.show(this.translateService.translate('oidistat.timemustbeentered'), 'warn');
                               return;
                           }
                       }
                   }

                    if (this.offimpsUpdatetList[i].errorFlag && this.offimpsUpdatetList[i].activeFlag ) {
                          this.offimpsUpdatetList[i].expiryDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
                           this.show(this.translateService.translate('oidistat.automatedbilling'), 'warn');
                        }
                }

        }
        this.offImpsCommitModel.insertList = this.offimpsInsertList;
        this.offImpsCommitModel.updateList = this.offimpsUpdatetList;
        if (this.offimpsDeleteList.length > 0) {
            for (let i = 0; i < this.offimpsDeleteList.length; i++) {
            }
            this.offImpsCommitModel.deleteList = this.offimpsDeleteList;
        }
        const offimpsSaveData = this.oidistatFactory.offImpsCommit(this.offImpsCommitModel);
        offimpsSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.offimpsExecuteQuery();
                return false;
            } else if (data === 100) {
                this.show(this.translateService.translate('oidistat.datecannotoccur'), 'warn');
                return false;
            } else if (data === 101 || data === 102) {
                this.show(this.translateService.translate('oidistat.effectivedateandtime'), 'warn');
                return false;
            } else if (data === 103) {
                this.show(this.translateService.translate('oidistat.statusalreadybeenspecified'), 'warn');
                return false;
            } else if (data === 104) {
                this.show(this.translateService.translate('oidistat.statusalreadybeenspecified'), 'warn');
                return false;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }
onClearImprisonmentTrigger = () => {
        this.movementsFlag = false;
        this.statusFlag = false;
        this.timeFlag = false;
        this.offimpsData = [];
        this.offimpsExecuteQuery();
        return true;
        }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }


}
