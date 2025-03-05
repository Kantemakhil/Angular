import {
    Component, OnInit
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OiipctraService } from '../service/oiipctra.service';
import { OffenderPptyContainers } from '@instproperty/OffenderPptyContainers';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderPptyConTxns } from '@instproperty/OffenderPptyConTxns';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VPropertyHeaderBlock } from '@commonbeans/VPropertyHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component( {
    selector: 'app-oiipctra',
    templateUrl: './oiipctra.component.html'
} )

export class OiipctraComponent implements OnInit {

    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offconData: OffenderPptyContainers[] = [];
    offconDataTemp: OffenderPptyContainers[] = [];
    offconModel: OffenderPptyContainers = new OffenderPptyContainers();
    offconIndex = 0;
    offconInsertList: OffenderPptyContainers[] = [];
    offconUpdatetList: OffenderPptyContainers[] = [];
    offconDeleteList: OffenderPptyContainers[] = [];
    contxData: OffenderPptyConTxns[] = [];
    contxDataTemp: OffenderPptyConTxns[] = [];
    contxModel: OffenderPptyConTxns = new OffenderPptyConTxns();
    contxIndex = 0;
    contxInsertList: OffenderPptyConTxns[] = [];
    contxUpdatetList: OffenderPptyConTxns[] = [];
    contxDeleteList: OffenderPptyConTxns[] = [];
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
    contxColumnDefs: any[];
    offconColumnDefs: any[];
    offConReadOnly = false;
    conTxReadOnly = false;
    sysPflReadOnly = false;
    index: any;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    caseLoadId: any;
    vPropertyHeaderBlockModel: VPropertyHeaderBlock = new VPropertyHeaderBlock();
    selected = -1;
    selectedtrnhistory = -1;

    constructor( private oiipctraFactory: OiipctraService, public translateService: TranslateService,
        private sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService ) {
        this.vPropertyHeaderBlockModel = this.offenderSearchService.selectedOffender;
    }

    ngOnInit() {
        this.selected = -1;
        this.selectedtrnhistory = -1;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.contxColumnDefs = [
            {
                fieldName: this.translateService.translate( 'common.datetime' ), field: 'createDate',
                editable: false, width: 200
            },
            {
                fieldName: this.translateService.translate( 'common.action' ), field: 'actionCode',
                editable: false, width: 200
            },
            { fieldName: this.translateService.translate('oiiptran.actionreason'), field: 'actionReason', editable: false, width: 200 },
            
            {
                fieldName: this.translateService.translate( 'oidmpcon.sealmark' ), field: 'sealMark',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate( 'common.comment' ), field: 'commentText',
                editable: false, width: 150
            },
            
            {
                fieldName: this.translateService.translate( 'system-profile.inst-agency' ), field: 'agyLocId',
                editable: false, width: 200
            },
            {
                fieldName: this.translateService.translate( 'oiipctra.fromagency' ), field: 'trnFromAgyLocId',
                editable: false, width: 250
            },
            {
                fieldName: this.translateService.translate( 'oiipctra.toagency' ), field: 'trnToAgyLocId',
                editable: false, width: 250
            },
        ];
        this.offconColumnDefs = [
            {
                fieldName: this.translateService.translate( 'common.type' ), field: 'containerCode',
                datatype: 'lov', domain: 'PPTY_CNTNR', editable: false, width: 250
            },
            {
                fieldName: this.translateService.translate( 'system-profile.inst-agency' ), field: 'agyLocId',
                editable: false, width: 250
            },
            {
                fieldName: this.translateService.translate( 'common.location' ), field: 'description',
                editable: false, width: 250
                // datatype: 'lov', link: 'oiipctra/rgLocationAllRecordGroup?caseloadId=' + this.caseLoadId,
            },
            {
                fieldName: this.translateService.translate( 'common.proposeddisposal' ), field: 'proposedDisposalDate',
                editable: false, width: 250, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate( 'common.active' ), field: 'activeFlag', datatype: 'checkbox',
                editable: false, width: 200
            },
            {
                fieldName: this.translateService.translate( 'common.deactivationdate' ), field: 'expiryDate',
                editable: false, width: 250, datatype: 'date'
            },
        ];
        if ( !this.vPropertyHeaderBlockModel || this.vPropertyHeaderBlockModel.offenderBookId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
        }
    }

    onOffenderChange( offender ) {
        this.vPropertyHeaderBlockModel = offender;
        if ( offender ) {
            this.offconModel.offenderBookId = this.vPropertyHeaderBlockModel.offenderBookId;
            this.offconModel.agyLocId = this.sessionManager.currentCaseLoad;
            this.oiipctraExecuteQuery();
            this.contxData = [];
        } else {
            this.offconData = [];
            this.contxData = [];
        }
    }
    onRowClickoffCon( event ) {
        this.contxModel = new OffenderPptyConTxns();
        this.contxModel.propertyContainerId = event.propertyContainerId;
        this.oiipctraPopulateDetails();
    }
    onRowClickcontx( event ) {
    }
    allowNumbers( event ) {
    }

/**
	* This function loads the data into the Master Record and its child records
	*/
    oiipctraPopulateDetails() {
        const serviceObj = this.oiipctraFactory.conTxExecuteQuery( this.contxModel );
        serviceObj.subscribe( data => {
            if ( !data ) {
                this.contxData = [];
            } else {
                const datePipe = new DatePipe('en-US');
                for ( let i = 0; i < data.length; i++ ) {
                    data[i].createDate = new Date(data[i].createDate);
                    data[i].createDate = datePipe.transform(data[i].createDate, 'MM/dd/yyyy HH:mm');
                }
                this.contxData = data;
            }
            this.selectedtrnhistory = 0;
        } );
    }

    /**
	    * This function loads the data into the Master Record
	    */
    oiipctraExecuteQuery() {
        const serviceObj = this.oiipctraFactory.offConExecuteQuery( this.offconModel );
        serviceObj.subscribe( data => {
            if ( data.length === 0 ) {
            } else {
                for ( let i = 0; i < data.length; i++ ) {
                    if ( data[i].activeFlag === 'Y' ) {
                        data[i].activeFlag = true;
                    } else {
                        data[i].activeFlag = false;
                    }
                    if ( DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(data[i].expiryDate)) === 1) {
                            // data[i].activeFlag = false;
                            // data[i].description = '';
                            // data[i].internalLocationId = 0;
                        }
                }
                this.offconData = data;
            }
            this.selected = 0;
        } );
    }

    contxExecuteQuery() {
        const contxResult = this.oiipctraFactory.conTxExecuteQuery( this.contxModel );
        contxResult.subscribe( contxResultList => {
            if ( contxResultList.length === 0 ) {
                this.contxData = [];
            } else {
                this.contxData = contxResultList;
                this.contxModel = contxResultList[0];
            }
        } );
    }
    sysPflExecuteQuery() {
        const syspflResult = this.oiipctraFactory.sysPflExecuteQuery( this.syspflModel );
        syspflResult.subscribe( syspflResultList => {
            if ( syspflResultList.length === 0 ) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        } );
    }

    /*
      * This method is used to show popup messages.
      */
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }

}

