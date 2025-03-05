import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiiemoveService } from '@inst/offenderspecific/service/oiiemove.service';
import { OffenderExternalMovements } from '@instdemographicsbeans/OffenderExternalMovements';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Offenders } from '@commonbeans/Offenders';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { OcdmworkService } from '@common/workspace/service/ocdmwork.service';
import { Router } from '@angular/router';
// import required bean declarations

@Component({
    selector: 'app-oiiemove',
    templateUrl: './oiiemove.component.html'
})

export class OiiemoveComponent implements OnInit, OnDestroy {
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offemData: OffenderExternalMovements [] = [];
    offemDataTemp: OffenderExternalMovements[] = [];
    offemModel: OffenderExternalMovements = new OffenderExternalMovements();
    offemIndex = 0;
    offemInsertList: OffenderExternalMovements[] = [];
    offemUpdateList: OffenderExternalMovements[] = [];
    offemDeleteList: OffenderExternalMovements[] = [];
    offem1Data: OffenderExternalMovements [] = [];
    offem1DataTemp: OffenderExternalMovements[] = [];
    offem1Model: OffenderExternalMovements = new OffenderExternalMovements();
    offem1Index = 0;
    offem1InsertList: OffenderExternalMovements[] = [];
    offem1UpdatetList: OffenderExternalMovements[] = [];
    offem1DeleteList: OffenderExternalMovements[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable  = true;
    vhbColumnDef: any[];
    agyPhonesColumnDef: any[];
    crtEveColumnDef: any[];
    othPhonesColumnDef: any[];
    ctlLstColumnDef: any[];
    offAllSchColumnDef: any[];
    offSchedulesColumnDef: any[];
    offEmColumnDef: any[];
    busPhonesColumnDef: any[];
    offEm1ColumnDef: any[];
    ctlUnColumnDef: any[];
    offSchColumnDef: any[];
    ctlBlkReadOnly = false;
    ctlLstReadOnly  = false;
    ctlUnReadOnly  = false;
    titleBlockReadOnly  = false;
    offRelDetailsReadOnly  = false;
    queryCtrlReadOnly  = false;
    batchAddReadOnly  = false;
    offAllSchReadOnly  = false;
    cancelReadOnly  = false;
    qryBlkReadOnly  = false;
    vhbReadOnly  = false;
    commonBlkReadOnly  = false;
    dummyBlkReadOnly  = false;
    offEscReadOnly  = false;
    sysPflReadOnly  = false;
    movementReadOnly  = false;
    offSchReadOnly  = false;
    ctrlReadOnly  = false;
    crtEveReadOnly  = false;
    offSchedulesReadOnly  = false;
    agyAdrReadOnly  = false;
    agyPhonesReadOnly  = false;
    busAdrReadOnly  = false;
    busPhonesReadOnly  = false;
    othAdrReadOnly  = false;
    othPhonesReadOnly  = false;
    offSwlReadOnly  = false;
    offEmReadOnly  = false;
    crtEventsReadOnly  = false;
    btnCtrl1ReadOnly  = false;
    mymenuReadOnly  = false;
    offEm1ReadOnly  = false;
    btnCtrl2ReadOnly  = false;
    rgoffemmovementreasoncoRg: any[] = [];
    rgoffemmovementtypeRg: any[] = [];
    rgoffem1directioncodeRg: any[] = [];
    rgoffem1movementtypeRg: any[] = [];
    rgoffem1movementreasoncRg: any[] = [];
    rgoffemdirectioncodeRg: any[] = [];
    isshowing = false;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    offenderObj: Offenders = new Offenders();
    disabledIdentifiers = false;
    offenderTemp: Offenders = new Offenders();
    exitLaunchBtn = false;
    constructor(private oiiemoveFactory: OiiemoveService, public translateService: TranslateService,
     private offenderSearchService: OffenderSearchService, private oidcnoteFactory: OidcnoteService,
     private ocdmworkFactory: OcdmworkService, private router: Router) {
        // TODO initilize data members here..!
    this.offEmColumnDef = [];
    this.offEm1ColumnDef = [];
    }
    ngOnInit() {
        if (this.oidcnoteFactory.launchFlag || this.ocdmworkFactory.exitFlag) {
            if (this.ocdmworkFactory.vHeaderBlockServiceObj.offenderBookId) {
            this.offenderSearchService.selectedOffender = this.ocdmworkFactory.vHeaderBlockServiceObj;
            this.ocdmworkFactory.vHeaderBlockServiceObj = new VHeaderBlock();
            }
            this.exitLaunchBtn = true;
        }
        this.disabled = true;
    this.offEmColumnDef = [
        { fieldName: this.translateService.translate('oiiemove.date'), field: 'movementDate',
         editable: false, width: 150, datatype: 'date'
        },
        { fieldName: this.translateService.translate('oiiemove.time'), field: 'movementTime',
         editable: false, width: 120,  datatype: 'time'
         },
        { fieldName: this.translateService.translate('oiiemove.type'), field: 'movementType',
         editable: false, width: 150, datatype: 'lov', domain:'MOVE_TYPE'/*link: 'oiiemove/rgOffEmMovementTypeRecordGroup'*/
         },
        { fieldName: this.translateService.translate('oiiemove.reason'), field: 'movementReasonCode',
         editable: false, width: 150,  datatype: 'lov',domain:'MOVE_RSN'// link: 'oiiemove/rgOffEmMovementReasonCoRecordGroup'
         },
        { fieldName: this.translateService.translate('oiiemove.comment'), field: 'commentText', editable: false, width: 150
        },
        { fieldName: this.translateService.translate('oiiemove.direction'), field: 'directionCode', editable: false, width: 120
        },
        { fieldName: this.translateService.translate('oiiemove.from'), field: 'fromAgyLocId', editable: false, width: 180,
         datatype: 'text'
        },
        { fieldName: this.translateService.translate('oiiemove.to'), field: 'toAgyLocId', editable: false, width: 180,
        datatype: 'text'
        }

    ];
    this.offEm1ColumnDef = [
       { fieldName: this.translateService.translate('oiiemove.date'), field: 'movementDate', editable: false, width: 150, datatype: 'date'
       },
       { fieldName: this.translateService.translate('oiiemove.time'), field: 'movementTime', editable: false,
         width: 120,  datatype: 'time'
       },
       { fieldName: this.translateService.translate('oiiemove.type'), field: 'movementType', editable: false,
         width: 150, datatype: 'lov', domain:'MOVE_TYPE'/*link: 'oiiemove/rgOffEmMovementTypeRecordGroup'*/
        },
        { fieldName: this.translateService.translate('oiiemove.reason'), field: 'movementReasonCode',
         editable: false, width: 150,  datatype: 'lov', domain:'MOVE_RSN'//link: 'oiiemove/rgOffEmMovementReasonCoRecordGroup'
         },
        { fieldName: this.translateService.translate('oiiemove.comment'), field: 'commentText', editable: false, width: 150
        },
        { fieldName: this.translateService.translate('oiiemove.direction'), field: 'directionCode', editable: false, width: 120
        },
        { fieldName: this.translateService.translate('oiiemove.from'), field: 'fromAgyLocId', editable: false, width: 160,
         datatype: 'text'
        },
        { fieldName: this.translateService.translate('oiiemove.to'), field: 'toAgyLocId', editable: false, width: 160,
        datatype: 'text'
        },
        { fieldName: this.translateService.translate('oiiemove.bookingid'), field: 'nbtBookNo', editable: false, width: 150
       }

    ];
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
            if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
        }

    }
     show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onAllBookingsclick() {
        this.isshowing = true;
        this.disabledIdentifiers = true;
         this.offem1ExecuteQuery();
    }
    onRowClickoffem(event) {
    }
    onGoBackclick() {
        this.isshowing = false;
        this.disabledIdentifiers = false;
        this.offemData = this.offemDataTemp;
    }
     ok() {
    }
     no() {
    }
     cancel() {
    }
      onGridReady(event) {
    }
   /**
     * This function loads the data into the header
     */
    onOffenderChange( offender ) {
        this.vHeaderBlockModel = offender;
        if ( offender ) {
            this.offemData = [];
            this.offem1Data = [];
            this.offemDataTemp = [];
            this.offemExecuteQuery();
        } else {
            this.offemData = [];
            this.offem1Data = [];
            this.disabled = true;
            this.offemDataTemp = [];
        }
    }
    offemExecuteQuery() {
        this.offemModel = new OffenderExternalMovements();
        this.offemModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                 const offemResult = this.oiiemoveFactory.offEmExecuteQuery(this.offemModel);
                     offemResult.subscribe(offemResultList => {
                    if (offemResultList.length === 0) {
                        this.offemData = [];
                         this.offemDataTemp = [];
                          this.show(this.translateService.translate('oiiemove.querycaused'), 'warn');
                    } else {
                        this.isshowing = false;
                         for (let i = 0; i < offemResultList.length; i++) {
                        if (offemResultList[i].effectiveDate) {
                            offemResultList[i].effectiveDate = DateFormat.getDate(offemResultList[i].effectiveDate);
                        }
                        if (offemResultList[i].effectiveTime) {
                            offemResultList[i].effectiveTime = DateFormat.getDate(offemResultList[i].effectiveTime);
                        }
                             }
                        this.offemData = offemResultList;
                        this.offemDataTemp = this.offemData;
                        this.offemModel = offemResultList[0];
                        this.disabled = false;
                    }
                });
            }
    offem1ExecuteQuery() {
         this.offem1Model = new OffenderExternalMovements();
         this.offem1Model.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
                 const offem1Result = this.oiiemoveFactory.offEm1ExecuteQuery(this.offem1Model);
                     offem1Result.subscribe(offem1ResultList => {
                    if (offem1ResultList.length === 0) {
                        this.offem1Data = [];
                        this.show(this.translateService.translate('oiiemove.querycaused'), 'warn');
                    } else {
                        for (let i = 0; i < offem1ResultList.length; i++) {
                        if (offem1ResultList[i].effectiveDate) {
                            offem1ResultList[i].effectiveDate = DateFormat.getDate(offem1ResultList[i].effectiveDate);
                        }
                        if (offem1ResultList[i].effectiveTime) {
                            offem1ResultList[i].effectiveTime = DateFormat.getDate(offem1ResultList[i].effectiveTime);
                        }
                        this.offem1Data = offem1ResultList;
                        this.offem1Model = offem1ResultList[0];
                    }
                        }
                });
            }
    onExitBtnClick = () => {
        if (this.ocdmworkFactory.exitFlag) {
            this.ocdmworkFactory.exitFlag = false;
            this.router.navigate(['/OCDMWORK']);
        } else if (this.oidcnoteFactory.launchFlag) {
            this.oidcnoteFactory.launchFlag = false;
            this.router.navigate(['/OIDCNOTE']);
        }
        return true;
    }
    ngOnDestroy(): void {
        this.ocdmworkFactory.exitFlag = false;
        this.oidcnoteFactory.launchFlag = false;
    }

}
