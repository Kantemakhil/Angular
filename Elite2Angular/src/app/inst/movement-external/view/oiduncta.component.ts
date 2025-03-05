import {
      Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidunctaService } from '../service/oiduncta.service';
import { OffenderExternalMovements } from '@commonbeans/OffenderExternalMovements';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderExternalMovementsCommitBean } from '@commonbeans/OffenderExternalMovementsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OidbutabService } from '@inst/movement-external/service/oidbutab.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import {InjectOffenderService} from '@core/service/inject-offender.service';

@Component({
      selector: 'app-oiduncta',
      templateUrl: './oiduncta.component.html'
})

export class OidunctaComponent implements OnInit {
      toDisabled: boolean;
      toTaDisabled: boolean;
      direction: string;
      executeFlag: boolean;
      fromTaLink: string;
      fromLink: string;
      offTypeReadonly: boolean;
      youcannotcreateflag = false;
      offDirReadonly: boolean;
      lastMovementDateTime: Date;
      reqDirection: boolean;
      offTextReadonly: boolean;
      offReaReadonly: boolean;
      flag: boolean;
      toAgyLocId: string;
      fromAgyLocId: String;
      offEmReadonly: boolean;
      reqType: boolean;
      tocity: String;
      OffemfromagylocidRg: any[] = [];
      toLink: string;
      fromCity: String;
      rginstitutionRg: any[] = [];
      caseLoadId: string;
      offemCommitModel: OffenderExternalMovementsCommitBean = new OffenderExternalMovementsCommitBean();
      movementReasonCode: any;
      movReasonLink: string;
      movementType: any;
      movementTypeLink: string;
      reqto: boolean;
      reqtota: boolean;
      reqReasonCode: boolean;
      totaLink: string;
      vHeaderBlockModel: VHeaderBlock;
      vHeaderBlockModelTemp: VHeaderBlock;
      actionName: string;
      lovModel: any[];
      msgs: any[] = [];
      nameOfLovPage: string;
      listToCompare: any[] = [];
      offemData: OffenderExternalMovements[] = [];
      offemDataTemp: OffenderExternalMovements[] = [];
      offemModel: OffenderExternalMovements = new OffenderExternalMovements();
      offemModelTemp: OffenderExternalMovements = new OffenderExternalMovements();
      offemIndex = 0;
      offemInsert = new OffenderExternalMovements();
      offemInsertList: OffenderExternalMovements[] = [];
      offemUpdatetList: OffenderExternalMovements[] = [];
      offemDeleteList: OffenderExternalMovements[] = [];
      syspflData: SystemProfiles[] = [];
      syspflDataTemp: SystemProfiles[] = [];
      syspflModel: SystemProfiles = new SystemProfiles();
      syspflIndex = 0;
      syspflInsertList: SystemProfiles[] = [];
      syspflUpdatetList: SystemProfiles[] = [];
      syspflDeleteList: SystemProfiles[] = [];
      display: boolean;
      errorMessage: string;
      headerMessage: string;
      disabled: boolean;
      editable = true;
      vhbColumnDef: any[];
      offSchColumnDef: any[];
      qryBlkReadOnly = false;
      vhbReadOnly = false;
      commonBlkReadOnly = false;
      dummyBlkReadOnly = false;
      movementReadOnly = false;
      offSchReadOnly = false;
      offEmReadOnly = false;
      cgfkOffemfromcityRg: any[] = [];
      cgfkOffemfromagylocidRg: any[] = [];
      cgfkOffemtoagylocidRg: any[] = [];
      cgfkOffemmovementtypeRg: any[] = [];
      cgfkOffemmovementreasoncoRg: any[] = [];
      cgfkOffemtocityRg: any[] = [];
      movementDateRead: boolean;
      message = ' Invalid.';
      type = 'error';
      msglist = [];
      savebtn: boolean;

      constructor(private oidunctaFactory: OidunctaService, public translateService: TranslateService,
            private sessionManager: UserSessionManager,
            private osiosearFactory: OsiosearService, private offenderSearchService: OffenderSearchService, private injectOffenderService: InjectOffenderService) {
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
      }
      ngOnInit() {
            this.reqDirection = true;
            this.reqType = true;
            this.reqReasonCode = true;
            this.disabled = true;
            this.savebtn = true;
            this.flag = true;
            this.toDisabled = true;
            this.toTaDisabled = true;
            this.vhbColumnDef = [
                  { fieldName: 'Location', field: 'location', editable: false, width: 150 },
                  { fieldName: '', field: 'btnReason', editable: false, width: 150 },
                  { fieldName: '', field: 'btnToCity', editable: false, width: 150 },
                  { fieldName: 'Last Move', field: 'lastMove', editable: false, width: 150 },
                  { fieldName: '', field: 'btnToLocation', editable: false, width: 150 },
                  { fieldName: '', field: 'offenderIdDisplay', editable: false, width: 150 },
                  { fieldName: 'C', field: 'confirmMove', editable: false, width: 150 },
                  { fieldName: 'To Location', field: 'toLocation', editable: false, width: 150 },
                  { fieldName: 'Name', field: 'offName', editable: false, width: 150 },
                  { fieldName: 'To TA', field: 'toCity', editable: false, width: 150 },
                  { fieldName: 'Reason', field: 'reason', editable: false, width: 150 },
                  { fieldName: '', field: 'btnOffIdDisplay', editable: false, width: 150 },
                  { fieldName: 'Housing Location', field: 'livingUnitDescription', editable: false, width: 150 },
            ];
            this.offSchColumnDef = [
                  { fieldName: 'system-profile.off-id-code', field: 'offenderIdDisplay', editable: false, width: 150 },
                  { fieldName: 'Date', field: 'eventDate', editable: false, width: 150 },
                  { fieldName: 'Comment', field: 'commentText', editable: false, width: 150 },
                  { fieldName: 'system-profile.name-last', field: 'offenderLastName', editable: false, width: 150 },
                  { fieldName: 'In/Out', field: 'directionCode', editable: false, width: 150 },
                  { fieldName: 'system-profile.name-given-1', field: 'offenderFirstName', editable: false, width: 150 },
                  { fieldName: 'Type', field: 'eventTypeDesc', editable: false, width: 150 },
                  { fieldName: 'Reason', field: 'eventSubTypeDesc', editable: false, width: 150 },
                  { fieldName: 'To', field: 'nbtLocation', editable: false, width: 150 },
                  { fieldName: 'Time', field: 'scheduleMovementTime', editable: false, width: 150 },
                  { fieldName: 'Location', field: 'livingUnitDesc', editable: false, width: 150 },
            ];

            this.caseLoadId = this.sessionManager.currentCaseLoad;
            const rginstitutionServiceObj = this.oidunctaFactory.rgInstitutionRecordGroup(this.caseLoadId);
            rginstitutionServiceObj.subscribe(rginstitutionList => {
                  if (rginstitutionList.length === 0) {
                        this.rginstitutionRg = [];
                  } else {
                        for (let i = 0; i < rginstitutionList.length; i++) {
                              this.rginstitutionRg.push({
                                    'text': rginstitutionList[i].description,
                                    'id': rginstitutionList[i].code
                              });
                        }
                  }
            });
            const cgfkOffemmovementtypeServiceObj = this.oidunctaFactory.cgfkOffemmovementtypeRecordGroup();
            cgfkOffemmovementtypeServiceObj.subscribe(cgfkOffemmovementtypeList => {
                  if (cgfkOffemmovementtypeList.length === 0) {
                        this.cgfkOffemmovementtypeRg = [];
                  } else {
                        for (let i = 0; i < cgfkOffemmovementtypeList.length; i++) {
                              this.cgfkOffemmovementtypeRg.push({
                                    'text': cgfkOffemmovementtypeList[i].description
                                    , 'id': cgfkOffemmovementtypeList[i].code
                              });
                        }
                  }
            });

            const cgfkchkOffEmOffEmAgyLocServiceObj = this.oidunctaFactory.cgfkchkOffEmOffEmAgyLoc();
            cgfkchkOffEmOffEmAgyLocServiceObj.subscribe(chkOffEmOffEmAgyLocList => {
                  if (chkOffEmOffEmAgyLocList.length === 0) {
                        this.OffemfromagylocidRg = [];
                  } else {
                        for (let i = 0; i < chkOffEmOffEmAgyLocList.length; i++) {
                              this.OffemfromagylocidRg.push({
                                    'text': chkOffEmOffEmAgyLocList[i].code
                                    , 'id': chkOffEmOffEmAgyLocList[i].description
                              });
                        }
                  }
            });

            const cgfkOffemtocityServiceObj = this.oidunctaFactory.cgfkOffemtocityRecordGroup();
            cgfkOffemtocityServiceObj.subscribe(cgfkOffemtocityList => {
                  if (cgfkOffemtocityList.length === 0) {
                        this.cgfkOffemtocityRg = [];
                  } else {
                        for (let i = 0; i < cgfkOffemtocityList.length; i++) {
                              this.cgfkOffemtocityRg.push({
                                    'text': cgfkOffemtocityList[i].code,
                                    'id': cgfkOffemtocityList[i].description
                              });
                        }
                  }
            });
            if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                  this.show();
            }
            const cgfkOffemfromagylocidServiceObj = this.oidunctaFactory.cgfkOffemfromagylocidRecordGroup();
            cgfkOffemfromagylocidServiceObj.subscribe(cgfkOffemfromagylocidList => {
                  if (cgfkOffemfromagylocidList.length === 0) {
                        this.cgfkOffemfromagylocidRg = [];
                  } else {
                        for (let i = 0; i < cgfkOffemfromagylocidList.length; i++) {
                              this.cgfkOffemfromagylocidRg.push({
                                    'text': cgfkOffemfromagylocidList[i].code,
                                    'id': cgfkOffemfromagylocidList[i].description
                              });
                        }
                  }
            });
      }
      allowNumbers(event) {
      }
      ok() {
      }
      no() {
      }
      cancel() {
      }
      onOffenderChange(offender) {
            this.vHeaderBlockModel = offender;
            if (offender) {
                  this.executeFlag = false;
                  this.youcannotcreateflag = false;
                  this.flag = true;
                  this.offemModel = new OffenderExternalMovements();
                  this.fromCity = '';
                  this.tocity = '';
                  this.toAgyLocId = '';
                  this.fromAgyLocId = '';
                  //this.savebtn = false;
                  this.disabled = false;
                  this.offEmReadonly = false;
                  this.offTypeReadonly = false;
                  this.offDirReadonly = false;
                  this.offReaReadonly = false;
                  this.offTextReadonly = false;
                  this.reqDirection = true;
                  this.reqType = false;
                  this.reqReasonCode = false;
                  this.reqto = false;
                  this.reqtota = false;
                  this.toDisabled = true;
                  this.toTaDisabled = true;
            } else {
                  this.flag = true;
                  this.fromCity = '';
                  this.tocity = '';
                  this.toAgyLocId = '';
                  this.fromAgyLocId = '';
                  this.offemModel = new OffenderExternalMovements();
                  this.savebtn = true;
                  this.disabled = true;
                  this.offEmReadonly = false;
                  this.offTypeReadonly = false;
                  this.offDirReadonly = false;
                  this.offReaReadonly = false;
                  this.offTextReadonly = false;
            }
      }

      get disabledFlag() {
            if ((this.offemModel.movementDate || this.offemModel.movementTime || this.offemModel.directionCode || this.offemModel.movementType || this.offemModel.movementReasonCode ||
                  this.fromAgyLocId || this.fromCity || this.offemModel.toAgyLocId || this.offemModel.toCity || this.offemModel.commentText) && !((this.vHeaderBlockModel.activeFlag !== 'Y' || this.youcannotcreateflag) && !this.disabled)) {
                  this.savebtn = false;
            } else {
                  this.savebtn = true;
            }
            return false;
      }

      clickTime() {
            if (this.offemModel.movementDate) {
                  if (DateFormat.compareDate(this.offemModel.movementDate,
                        DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === 1) {
                        this.type = 'info';
                        this.message = this.translateService.translate('oiduncta.datemustbelessthanorequaltocurrentdate');
                        this.show();
                        return;
                  }
            }
            if (this.offemModel.movementTime) {
                  if (DateFormat.compareDate(this.offemModel.movementDate,
                        DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) !== -1) {
                        if (DateFormat.compareTime(this.offemModel.movementTime, DateFormat.getDate()) === 1) {
                              this.type = 'info';
                              this.message = this.translateService.translate('oiduncta.movementtimecannotbelaterthancurrenttime');
                              this.show();
                              return;
                        }
                  }
            }
            if (this.vHeaderBlockModel.activeFlag !== 'Y' || this.youcannotcreateflag) {
                  if (!this.disabled) {
                        this.offEmReadonly = true;
                        this.offTypeReadonly = true;
                        this.offDirReadonly = true;
                        this.offReaReadonly = true;
                        this.movementDateRead = true;
                        this.offTextReadonly = true;
                        this.savebtn = true;
                        this.reqType = false;
                        this.reqReasonCode = false;
                        this.reqto = false;
                        this.reqtota = false;
                        this.reqDirection = false;
                        this.type = 'warn';
                        if (!this.offemModel.movementTime && !this.offemModel.movementDate) {
                              this.message = this.translateService.translate('oiduncta.onlyactiveoffenderscanhaveunscheduledmovements');
                              this.offemModel.movementTime = DateFormat.getDate();
                              this.offemModel.movementDate = DateFormat.getDate(DateFormat.getDate(this.offemModel.movementDate).setHours(this.offemModel.movementTime.getHours(),this.offemModel.movementTime.getSeconds(),0,0));
                        } else {
                              this.message = this.translateService.translate('oiduncta.youcannotcreaterecordshere');
                        }
                        this.show();
                        return;
                  }
            } else {
                  if (this.flag) {
                        this.flag = false;
                        if (!this.disabled) {
                              if (!this.offemModel.movementTime) {
                                    this.offemModel.movementTime = DateFormat.getDate();
                              }
                              if (!this.offemModel.movementDate) {
                                    this.offemModel.movementDate = DateFormat.getDate(DateFormat.getDate(this.offemModel.movementDate).setHours(this.offemModel.movementTime.getHours(),this.offemModel.movementTime.getSeconds(),0,0));
                              }
                              if (DateFormat.compareDate(this.offemModel.movementDate,
                                    DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === 1) {
                                    this.type = 'info';
                                    this.message = this.translateService.translate('oiduncta.datemustbelessthanorequaltocurrentdate');
                                    this.show();
                                    return;
                              }
                              if (DateFormat.compareDate(this.offemModel.movementDate,
                                    DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) !== -1) {
                                    if (DateFormat.compareTime(this.offemModel.movementTime, DateFormat.getDate()) === 1) {
                                    this.type = 'info';
                                    this.message = this.translateService.translate('oiduncta.movementtimecannotbelaterthancurrenttime');
                                    this.show();
                                    return;
                                    }
                              }
                              this.offemExecuteQuery();
                        }
                  }
            }
      }

      offemExecuteQuery() {
            this.offemModelTemp = new OffenderExternalMovements();
            this.fromAgyLocId = '';
            this.fromCity = '';
            this.offemModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const offemResult = this.oidunctaFactory.offEmExecuteQuery(this.offemModel);
            offemResult.subscribe(offemResultList => {
                  if (offemResultList) {
                        /* booking date validation */
                        if (this.vHeaderBlockModel.status1 === 'Out') {
                              if (offemResultList.movementType !== 'CRT' && offemResultList.movementType !== 'INTER' &&
                                    offemResultList.movementType !== 'TAP') {
                                    this.offemModel.directionCode = offemResultList.directionCode;
                                    this.offDirReadonly = true;
                                    this.type = 'info';
                                    this.message = this.translateService.translate('oidbutab.activeoutmessage');
                                    this.show();
                                    this.youcannotcreateflag = true;
                                    return;
                              }
                        }
                        this.youcannotcreateflag = false;
                        this.lastMovementDateTime = offemResultList.movementDate;
                        if (this.vHeaderBlockModel.status1 === 'In') {
                              if (offemResultList.directionCode === 'IN') {
                                    this.offDirReadonly = true;
                                    this.offemModelTemp.directionCode = offemResultList.directionCode;
                                    this.offemModelTemp.fromAgyLocId = offemResultList.toAgyLocId;
                                    if (this.offemModelTemp.fromAgyLocId) {
                                          this.fromLink = 'oiduncta/cgfkOffEmFromAgyLocIdRecordGroup?toagyLocId=' +
                                           this.offemModelTemp.fromAgyLocId;
                                    } else {
                                          this.offemModelTemp.fromCity = offemResultList.toCity;
                                          this.reqtota = false;
                                          this.fromTaLink = 'oiduncta/cgfkOffEmToCityRecordGroup';
                                    }
                                    this.offemModelTemp.movementTime = DateFormat.getDate();
                                    this.offemModelTemp.movementDate = DateFormat.getDate(DateFormat.getDate(this.offemModelTemp.movementDate).setHours(this.offemModelTemp.movementTime.getHours(),this.offemModelTemp.movementTime.getSeconds(),0,0));
                                    this.offemModel = this.offemModelTemp;
                                    this.offEmReadonly = true;
                                    this.offTypeReadonly = true;
                                    this.offReaReadonly = true;
                                    this.reqType = true;
                                    this.reqReasonCode = true;
                                    return;
                              }
                              if (offemResultList.directionCode === 'OUT') {
                                    this.offDirReadonly = true;
                                    this.reqType = true;
                                    this.reqReasonCode = true;
                                    this.offemModelTemp.directionCode = offemResultList.directionCode;
                                    this.offemModelTemp.fromAgyLocId = offemResultList.toAgyLocId;
                                    this.executeFlag = false;
                                    this.offEmReadonly = true;
                                    this.toDisabled = false;
                                    this.toTaDisabled = false;
                                    this.movementTypeLink = 'oiduncta/cgfkOffEmMovementTypeRecordGroup';
                                    this.toLink = 'oiduncta/cgfkOffEmToAgyLocIdRecordGroup?directionCode=' +
                                     this.offemModelTemp.directionCode +
                                          '&fromAgyLocId=' + offemResultList.fromAgyLocId;
                                    this.totaLink = 'oiduncta/cgfkOffEmToCityRecordGroup';
                                    if (this.offemModelTemp.fromAgyLocId) {
                                          this.fromLink = 'oiduncta/cgfkOffEmFromAgyLocIdRecordGroup?toagyLocId=' +
                                           this.offemModelTemp.fromAgyLocId;
                                    } else {
                                          this.offemModelTemp.fromCity = offemResultList.toCity;
                                          this.fromTaLink = 'oiduncta/cgfkOffEmToCityRecordGroup';
                                    }
                                    this.offemModelTemp.movementTime = DateFormat.getDate();
                                    this.offemModelTemp.movementDate = DateFormat.getDate(DateFormat.getDate(this.offemModelTemp.movementDate).setHours(this.offemModelTemp.movementTime.getHours(),this.offemModelTemp.movementTime.getSeconds(),0,0));
                                    this.offemModel = this.offemModelTemp;
                                    return;
                              }
                        }
                        if (offemResultList.directionCode === 'OUT') {
                              this.reqReasonCode = true;
                              this.offDirReadonly = true;
                              this.offEmReadonly = true;
                              this.offTypeReadonly = false;
                              this.reqType = true;
                              this.offemModelTemp.directionCode = offemResultList.directionCode;
                              this.offemModelTemp.fromAgyLocId = offemResultList.toAgyLocId;
                              if (this.offemModelTemp.fromAgyLocId) {
                                    this.fromLink = 'oiduncta/cgfkOffEmFromAgyLocIdRecordGroup?toagyLocId=' +
                                     this.offemModelTemp.fromAgyLocId;
                              } else {
                                    this.offemModelTemp.fromCity = offemResultList.toCity;
                                    this.reqtota = false;
                                    this.fromTaLink = 'oiduncta/cgfkOffEmToCityRecordGroup';
                              }
                              this.offemModelTemp.movementType = offemResultList.movementType;
                              this.executeFlag = true;
                              this.movementTypeLink = 'oiduncta/cgfkOffEmMovementTypeRecordGroup';
                              this.offemModelTemp.movementReasonCode = offemResultList.movementReasonCode;
                              if (this.offemModelTemp.movementType) {
                                    this.movementTypeLink = 'oiduncta/cgfkOffEmMovementTypeRecordGroup';
                                    this.offemModelTemp.toAgyLocId = offemResultList.fromAgyLocId;
                                    this.toLink = 'oiduncta/cgfkOffEmToAgyLocIdRecordGroup?directionCode=' +
                                     this.offemModelTemp.directionCode +
                                          '&fromAgyLocId=' + this.offemModelTemp.toAgyLocId;
                              }
                              this.movReasonLink = 'oiduncta/cgfkOffEmMovementReasonCoRecordGroup?movementType='
                                    + this.offemModelTemp.movementType;
                              this.totaLink = null;
                              if (!this.offemModelTemp.toAgyLocId) {
                                    this.offemModelTemp.toCity = offemResultList.fromCity;
                                    this.totaLink = 'oiduncta/cgfkOffEmToCityRecordGroup';
                              }
                        } else if (offemResultList.directionCode === 'IN') {
                              this.offDirReadonly = true;
                              this.offemModelTemp.directionCode = offemResultList.directionCode;
                              this.offemModelTemp.fromAgyLocId = offemResultList.toAgyLocId;
                              if (this.offemModelTemp.fromAgyLocId) {
                                    this.fromLink = 'oiduncta/cgfkOffEmFromAgyLocIdRecordGroup?toagyLocId=' +
                                    this.offemModelTemp.fromAgyLocId;
                              } else {
                                    this.offemModelTemp.fromCity = offemResultList.toCity;
                                    this.reqtota = false;
                                    this.fromTaLink = 'oiduncta/cgfkOffEmToCityRecordGroup';
                              }
                              this.offemModelTemp.movementType = offemResultList.movementType;
                              if (this.offemModelTemp.movementType) {
                                    this.executeFlag = true;
                                    this.reqType = true;
                                    this.offEmReadonly = true;
                                    this.offTypeReadonly = true;
                                    this.movementTypeLink = 'oiduncta/cgfkOffEmMovementTypeRecordGroup';
                                    this.offemModelTemp.movementReasonCode = offemResultList.movementReasonCode;
                                    this.movReasonLink = 'oiduncta/cgfkOffEmMovementReasonCoRecordGroup?movementType='
                                          + this.offemModelTemp.movementType;
                                    this.offemModelTemp.toAgyLocId = offemResultList.fromAgyLocId;
                                    this.toDisabled = false;
                                    this.toLink = 'oiduncta/cgfkOffEmToAgyLocIdRecordGroup?directionCode=' +
                                     this.offemModelTemp.directionCode +
                                          '&fromAgyLocId=' + this.offemModelTemp.toAgyLocId;
                                    this.reqtota = false;
                                    this.totaLink = null;
                                    if (!this.offemModelTemp.toAgyLocId) {
                                          this.toTaDisabled = false;
                                          this.offemModelTemp.toCity = offemResultList.fromCity;
                                          this.totaLink = 'oiduncta/cgfkOffEmToCityRecordGroup';
                                    }
                              } else {
                                    this.offEmReadonly = true;
                                    this.offReaReadonly = true;
                                    this.offTypeReadonly = true;
                              }
                              this.fromAgyLocId = this.offemModelTemp.fromAgyLocId;
                              this.fromCity = this.offemModelTemp.fromCity;
                        }
                        if (!offemResultList.directionCode) {
                              this.reqType = true;
                              this.reqDirection = true;
                              this.reqReasonCode = true;
                        }
                  } else {
                        this.offemModelTemp.movementTime = DateFormat.getDate();
                        this.offemModelTemp.movementDate = DateFormat.getDate(DateFormat.getDate(this.offemModelTemp.movementDate).setHours(this.offemModelTemp.movementTime.getHours(),this.offemModelTemp.movementTime.getSeconds(),0,0));
                  }
                  this.offemModelTemp.movementTime = DateFormat.getDate();
                  this.offemModelTemp.movementDate = DateFormat.getDate(DateFormat.getDate(this.offemModelTemp.movementDate).setHours(this.offemModelTemp.movementTime.getHours(),this.offemModelTemp.movementTime.getSeconds(),0,0));
                  this.offemModel = this.offemModelTemp;
            });
      }
      /**
             *  This event is fired when reason is clicked
            */
      onMovementReasonClick(event) {
            const reasonValue = this.offemModel.movementReasonCode === undefined ? '' : undefined;
            this.offemModel.movementReasonCode = reasonValue;
      }
      onMovementTypeChange(event) {
            const typeValue = this.offemModel.movementType === undefined ? '' : undefined;
            this.offemModel.movementType = typeValue;
            this.offemModel.movementReasonCode = null;
            this.offemModel.toCity = null;
            this.offemModel.toAgyLocId = null;
            this.executeFlag = false;
      }
      /**
       *  This event is fired when type is clicked
      */
      onMovementTypeClick(event) {
            if (!this.executeFlag) {
                  this.movementType = this.offemModel.movementType;
                  this.movReasonLink = 'oiduncta/cgfkOffEmMovementReasonCoRecordGroup?movementType=' + this.offemModel.movementType;
                  if (this.movementType === 'CRT') {
                        this.reqReasonCode = true;
                        this.reqtota = false;
                        this.reqto = true;
                        this.toDisabled = false;
                        this.toLink = 'oiduncta/cgfkOffEmToAgyLocIdRecordGroup?directionCode=' + this.offemModel.directionCode +
                              '&fromAgyLocId=' + this.offemModel.toAgyLocId;
                        this.totaLink = null;
                        this.toTaDisabled = true;
                  }
                  if (this.movementType === 'TAP') {
                        this.reqReasonCode = true;
                        this.reqto = false;
                        this.reqtota = true;
                        this.toLink = null;
                        this.toTaDisabled = false;
                        this.toDisabled = true;
                        this.totaLink = 'oiduncta/cgfkOffEmToCityRecordGroup';
                  }
                  if (this.movementType === 'INTER') {
                        this.reqto = false;
                        this.reqtota = false;
                        this.reqReasonCode = true;
                        this.toLink = null;
                        this.toTaDisabled = false;
                        this.toDisabled = true;
                        this.totaLink = 'oiduncta/cgfkOffEmToCityRecordGroup';
                  }
            } else {
                  this.executeFlag = false;
            }
            if (this.offemModel) {
                  this.fromAgyLocId = this.offemModel.fromAgyLocId;
                  this.fromCity = this.offemModel.fromCity;
            }
      }
      /**
       *  This event is fired when to is clicked
      */
      onMovementToClick(event) {
            const agylocIdValue = this.offemModel.toAgyLocId === undefined ? '' : undefined;
            this.offemModel.toAgyLocId = agylocIdValue;
      }
      /**
       *  This event is fired when tota is clicked
      */
      onMovementToTaClick(event) {
            const agylocIdValue = this.offemModel.toCity === undefined ? '' : undefined;
            this.offemModel.toCity = agylocIdValue;
      }

      /**
       *  This event is fired when tota is clicked
      */
      clearForm() {
            this.offemExecuteQuery();
      }
      /**
      *  This function will be executed when commit event is
      * fired
      */
      oidunctaSaveoffemForm() {
            this.offemCommitModel = new OffenderExternalMovementsCommitBean();
            this.offemInsert = this.offemModel;
            if (!this.offemModel.movementDate) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('ocustfas.datemustentered');
                  this.show();
                  return;
            }
            if (!this.offemModel.movementTime) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidscmov.timeentered');
                  this.show();
                  return;
            }else{
                  this.offemModel.movementDate = DateFormat.getDate(DateFormat.getDate(this.offemModel.movementDate).setHours(this.offemModel.movementTime.getHours(),this.offemModel.movementTime.getSeconds(),0,0));
            }
            if (DateFormat.compareDate(this.offemModel.movementDate,
                  DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === 1) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oiduncta.datemustbelessthanorequaltocurrentdate');
                  this.show();
                  return;
            }
            if (DateFormat.compareDate(this.offemModel.movementDate,
                  DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) !== -1) {
                  if (DateFormat.compareTime(this.offemModel.movementTime, DateFormat.getDate()) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oiduncta.movementtimecannotbelaterthancurrenttime');
                        this.show();
                        return;
                  }
            }
            if (this.reqType && !this.offemModel.movementType) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.typemustbeentered');
                  this.show();
                  return;
            }
            if (this.reqReasonCode && !this.offemModel.movementReasonCode) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('common.reasonmustbeentered');
                  this.show();
                  return;
            }
            if (this.reqto && !this.offemModel.toAgyLocId) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oiduncta.tomustbeentered');
                  this.show();
                  return;
            }
            if (this.reqtota && !this.offemModel.toCity) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oiduncta.totamustbeentered');
                  this.show();
                  return;
            }
            if (DateFormat.compareDate(DateFormat.getDate(this.lastMovementDateTime), this.offemModel.movementDate) === 1) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidscexm.movementdatetimecheck');
                  this.show();
                  return;
            }
            if (DateFormat.compareDate(DateFormat.getDate(this.lastMovementDateTime), this.offemModel.movementDate) === 0) {
                  if (DateFormat.compareTime(DateFormat.getDate(this.lastMovementDateTime), this.offemModel.movementTime) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidscexm.movementdatetimecheck');
                        this.show();
                        return;
                  }
            }
            this.offemInsert.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offemInsert.createDatetime = DateFormat.getDate();
            this.offemInsert.createUserId = this.sessionManager.getId();
            this.offemInsert.modifyDatetime = DateFormat.getDate();
            this.offemInsert.modifyUserId = this.sessionManager.getId();
            if (this.offemInsert.directionCode === 'OUT' && (this.offemInsert.movementType === 'CRT' ||
                  this.offemInsert.movementType === 'TAP')) {
                  this.offemInsert.activeFlag = 'Y';
            } else {
                  this.offemInsert.activeFlag = 'N';
            }
            this.offemInsertList = [];
            this.offemInsertList.push(this.offemInsert);
            this.offemCommitModel.insertList = this.offemInsertList;
            const offemSaveData = this.oidunctaFactory.offEmCommit(this.offemCommitModel);
            offemSaveData.subscribe(data => {
                  if (data === 1) {
                      
                        this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                        /*this.vHeaderBlockModelTemp = new VHeaderBlock();
                        this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                        this.vHeaderBlockModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                        const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                        offbkGlobal.subscribe(list => {
                              if (list.length > 0) {
                                    this.vHeaderBlockModel = list[0];
                              }
                        });*/
                        this.type = 'success';
                        this.flag = true;
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.offemModel = new OffenderExternalMovements();
                        this.fromCity = '';
                        this.tocity = '';
                        this.toAgyLocId = '';
                        this.fromAgyLocId = '';
                        this.offReaReadonly = false;
                        this.reqType = false;
                        this.reqReasonCode = false;
                        this.reqto = false;
                        this.reqtota = false;
                        this.show();
                        this.offemModel.movementDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
                        this.offemModel.movementTime = DateFormat.getDate();
                  } else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                  }
            });
      }
      syspflExecuteQuery() {
            const syspflResult = this.oidunctaFactory.sysPflExecuteQuery(this.syspflModel);
            syspflResult.subscribe(syspflResultList => {
                  if (syspflResultList.length === 0) {
                        this.syspflData = [];
                  } else {
                        this.syspflData = syspflResultList;
                        this.syspflModel = syspflResultList[0];
                  }
            });
      }

      onDateClick(event) {
            if (this.offemModel.movementDate) {
                  if (DateFormat.compareDate(this.offemModel.movementDate,
                        DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === 1) {
                        this.type = 'info';
                        this.message = this.translateService.translate('oiduncta.datemustbelessthanorequaltocurrentdate');
                        this.show();
                        return;
                  }
            }
            if (this.offemModel.movementTime) {
                  if (DateFormat.compareDate(this.offemModel.movementDate,
                        DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) !== -1) {
                        if (DateFormat.compareTime(this.offemModel.movementTime, DateFormat.getDate()) === 1) {
                              this.type = 'info';
                              this.message = this.translateService.translate('oiduncta.movementtimecannotbelaterthancurrenttime');
                              this.show();
                              return;
                        }
                  }
            }
      }

      show() {
            this.msglist = [];
            this.msglist.push({ message: this.message, type: this.type });
            this.msgs = [...this.msglist];
      }

      checkVal(event) {
            if (event && event.innerOptions) {
                  if (event.innerOptions.length === 0) {
                        this.type = 'info';
                        this.message = 'List of Values contains no entries.';
                        this.show();
                  }
            }
      }

}
