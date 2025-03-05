import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidrhlocService } from '@inst/movements/housingchanges/service/oidrhloc.service';
import { ReserveBedLocations } from '@inst/movements/housingchanges/beans/ReserveBedLocations';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VNameSearch2 } from '@cmsearchassaignbeans/VNameSearch2';
import { OsinamesService } from '@cm/searchassaign/service/osinames.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { ReserveBedLocationsCommitBean } from '@inst/movements/housingchanges/beans/ReserveBedLocationsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { CaseLoadAgencyLocations } from '@sa/admin/beans/CaseLoadAgencyLocations';
import { OmuavlocService } from '../service/omuavloc.service';

@Component({
    selector: 'app-oidrhloc',
    templateUrl: './oidrhloc.component.html'
})

export class OidrhlocComponent implements OnInit {
    field: string;
    chkRootOffenderId: any;
    selectedRow: any;
    @ViewChild('grid') grid: any;
    lovModel: any[];
    msgs: any[] = [];
    resblData: ReserveBedLocations[] = [];
    resblDataTemp: ReserveBedLocations[] = [];
    resblModel: ReserveBedLocations = new ReserveBedLocations();
    resblIndex = 0;
    resblInsertList: ReserveBedLocations[] = [];
    resblUpdateList: ReserveBedLocations[] = [];
    resblDeleteList: ReserveBedLocations[] = [];
    minDate: Date;
    display: boolean;
    disabled: boolean;
    editable = true;
    resBlColumnDef: any[];
    resBlReadOnly = false;
    cgfkResblagylocidRg: any[] = [];
    namesrchModel: VNameSearch2 = new VNameSearch2();
    index: number;
    resblCommitModel: ReserveBedLocationsCommitBean = new ReserveBedLocationsCommitBean();
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    checkFacility: boolean;
    checkLocation: boolean;
    checkDate: boolean;
    checkValidateDate: boolean;
    rowIndex: number;
    caseLoadAgyModel: CaseLoadAgencyLocations = new CaseLoadAgencyLocations();
    livingUnitMap: Map<string, string> = new Map<string, string>();
    namesFlag: boolean;
    globalOffenderId: number;
    offenderIdTemp: number;
    resBLDelete: boolean;
    constructor(private oidrhlocFactory: OidrhlocService,
        public translateService: TranslateService, private sessionManager: UserSessionManager, private osinamesFactory: OsinamesService,
        public dialogService: DialogService,
        private omuavlocFactory: OmuavlocService) {
        this.resBlColumnDef = [];
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.resBLDelete = false;
        this.namesFlag = false;
        this.resblExecuteQuery();
        this.resBlColumnDef = [
            {
                fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay', editable: false, width: 130,
                maxlength: 11
            },
            {
                fieldName: '', field: 'button', datatype: 'launchbutton', link: '/osinamesdialog', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, cellEditable: this.canCellEdit, onLaunchClick: this.onIdClicked
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150

            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150

            },
            {
                fieldName: this.translateService.translate('oidrhloc.cb'), field: 'cbFlag', datatype: 'checkbox',
                width: 90, editable : true //, cellEditable: this.cbFlagEditable
            },
            {
                fieldName: this.translateService.translate('system-profile.inst-agency') + '*', field: 'agyLocId', editable: true,
                width: 150, datatype: 'lov', titles: { code: 'Inst', description: 'Description' }, optionwidth: 350,
                link: 'oidrhloc/cgfkResBlAgyLocIdRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad,source:'OUMAGLOC',
                cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.location') + '*', field: 'livingUnitDesc', editable: true, width: 150,
                cellEditable: this.canCellEdit
            },
            {
                fieldName: '', field: 'button1', datatype: 'launchbutton', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, dialogWidth: 80, onLaunchClick: this.omuavlocClick,
                 cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oidrhloc.untildate') + '*', field: 'reserveUntilDate', editable: true,
                width: 150, datatype: 'date', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: true, width: 150,
                datatype: 'text', maxlength: 240, uppercase: 'false', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oidrhloc.asn'), field: 'asnButton', datatype: 'launchbutton', link: '/OCUWARNG', editable: true, width: 130,
                data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.asnLaunchClick,
                cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oidrhloc.oc'), field: 'ocFlag', datatype: 'checkbox',
                editable: false, width: 100
            },
            {
                fieldName: this.translateService.translate(''), field: 'offenderId', hide:true,
                editable: false, width: 100
            },
            {
                fieldName: this.translateService.translate(''), field: 'livingUnitId', hide:true,
                editable: false, width: 100
            },
        ];
    }

    onIdClicked = (data) => {
        if ( !this.namesFlag) {
        this.dialogService.openLinkDialog('/osinamesdialog').subscribe(dlgData => {
            if (dlgData && dlgData.offenderIdDisplay) {
            this.grid.setColumnData('offenderIdDisplay', this.resblData.indexOf(this.selectedRow), dlgData.offenderIdDisplay);
            this.grid.setColumnData('lastName', this.resblData.indexOf(this.selectedRow), dlgData.lastName);
            this.grid.setColumnData('firstName', this.resblData.indexOf(this.selectedRow), dlgData.firstName);
            this.grid.setColumnData('offenderId',this.resblData.indexOf(this.selectedRow), dlgData.offenderId);
            this.grid.setColumnData('cbFlag',this.resblData.indexOf(this.selectedRow), true);
            this.grid.setColumnData('agyLocId',this.resblData.indexOf(this.selectedRow), dlgData.agyLocId);
            this.grid.setColumnData('livingUnitDesc',this.resblData.indexOf(this.selectedRow), dlgData.livingUnitDescription);
            

            // this.chkRootOffenderId = dlgData.offenderId;
            }
        });
      }
        return false;
    }
    omuavlocClick = (data) => {
        if(!data.agyLocId || (data.agyLocId && data.agyLocId.trim() === "")) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrhloc.pleaseselectagencylocationfirst');
            this.show();
            return false;
        }else{
		this.dialogService.openLinkDialog('/omuavbed', data, 80).subscribe(resData => {
			const index = this.resblData.indexOf(data);
			this.grid.setColumnData('livingUnitDesc', index, resData.dspDescription);
            this.grid.setColumnData('livingUnitId', index, resData.livingUnitId);
		});
        }
        this.field = 'livingUnitDesc';
        return true;
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        this.field = field;
        if (this.resblData.indexOf(data) === this.rowIndex) {
            if (field === 'ocFlag') {
                if (!data.reserveBedId) {
                    return false;
                } else {
                    return true;
                }

            }
            return true;
        }

        if (this.checkFacility) {
            if (field !== 'agyLocId') {
                this.type = 'info';
                this.message = this.translateService.translate('oidrhloc.facilityentered');
                this.show();
                return false;
            } else if (field === 'agyLocId' && data.agyLocId) {
                this.type = 'info';
                this.message = this.translateService.translate('oidrhloc.facilityentered');
                this.show();
                return false;
            } else {
                return true;
            }
        }
        if (this.checkLocation) {
            if (field !== 'livingUnitDesc') {
                this.type = 'info';
                this.message = this.translateService.translate('common.locationmust');
                this.show();
                return false;
            } else if (field === 'livingUnitDesc' && data.livingUnitDesc) {
                this.type = 'info';
                this.message = this.translateService.translate('common.locationmust');
                this.show();
                return false;
            } else {
                return true;
            }
        }
        if (this.checkDate) {
            if (field !== 'reserveUntilDate') {
                this.type = 'info';
                this.message = this.translateService.translate('oidrhloc.untildatevalidation');
                this.show();
                return false;
            } else if (field === 'reserveUntilDate' && data.reserveUntilDate) {
                this.type = 'info';
                this.message = this.translateService.translate('oidrhloc.untildatevalidation');
                this.show();
                return false;
            } else {
                return true;
            }
        }
        if (this.checkValidateDate) {
            if (field !== 'reserveUntilDate') {
                this.type = 'info';
                this.message = this.translateService.translate('oidrhloc.reservedatevalidation');
                this.show();
                return false;
            } else if (field === 'reserveUntilDate' && data.reserveUntilDate) {
                this.type = 'info';
                this.message = this.translateService.translate('oidrhloc.reservedatevalidation');
                this.show();
                return false;
            } else {
                return true;
            }
        }
        if (field === 'ocFlag') {
            if (!data.reserveBedId) {
                return false;
            } else {
                return true;
            }

        }
        return true;
    }
    onGridClear = () => {
        /* this.checkFacility = false;
        this.checkLocation = false;
        this.checkDate = false;
        this.checkValidateDate = false; */
        this.resblExecuteQuery();
        return true;
    }

    /**
     *To display messages
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    /**
     *  This function will be executed when we click on Asn button in grid
     *
     */
    asnLaunchClick = (event) => {
        if (!event.reserveBedId) {
            this.type = 'info';
            this.message = this.translateService.translate('oidrhloc.youmustsavethechanges');
            this.show();
            return false;
        }
        if (event.ocFlag) {
            this.type = 'info';
            this.message = this.translateService.translate('oidrhloc.ocvalidation');
            this.show();
            return false;
        }
        if (!event.warningFlag) {
            this.type = 'info';
            this.message = this.translateService.translate('oidrhloc.warnvalidation');
            this.show();
            return false;
        } else {
            return true;
        }
    }

    /**
      *  This function will be executed when Retrive event is
      * fired
      */
    resblExecuteQuery() {
        this.resblModel = new ReserveBedLocations();
        this.resblModel.agyLocId = this.sessionManager.currentCaseLoad;
        const resblResult = this.oidrhlocFactory.resBlExecuteQuery(this.resblModel);
        resblResult.subscribe(resblResultList => {
            if (resblResultList.length === 0) {
                this.resblData = [];
            } else {
                const seq = {val: 0};
                resblResultList.forEach(element => {
                    element['seq'] = seq.val;
                    seq.val ++;
                });
                this.resblData = resblResultList;
                // this.chkRootOffenderId = this.resblData[this.resblData.length - 1].offenderId;
                for (let i = 0; i < this.resblData.length; i++) {
                    this.resblData[i].button = '..';
                    this.resblData[i].button1 = '..';
                    this.resblData[i].asnButton = 'Asn';
                }
                this.globalOffenderId = this.resblData[this.resblData.length - 1].offenderId;
                this.resblModel = resblResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidrhlocSaveresblForm(event) {
        //  TODO declare commit bean and add insert list to that object.
        this.resblInsertList = [];
        this.resblUpdateList = [];
        this.resblDeleteList = [];
        this.resblCommitModel.insertList = [];
        this.resblCommitModel.updateList = [];
        this.resblCommitModel.deleteList = [];
        this.resblInsertList = event.added;
        this.resblUpdateList = event.updated;
        this.resblDeleteList = event.removed;
        if (this.resblInsertList.length > 0 || this.resblUpdateList.length > 0) {
            for (let i = 0; i < this.resblInsertList.length; i++) {
                if (!this.resblInsertList[i].agyLocId) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrhloc.facilityentered');
                    this.show();
                    return;
                }
                if (!this.resblInsertList[i].livingUnitDesc) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.locationmust');
                    this.show();
                    return;
                }
                if (!this.resblInsertList[i].reserveUntilDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrhloc.untildatevalidation');
                    this.show();
                    return;
                }
                if ((this.resblInsertList[i].reserveUntilDate) && ((DateFormat.compareDate(DateFormat.getDate(),
                    DateFormat.getDate(this.resblInsertList[i].reserveUntilDate)) !== -1))) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrhloc.reservedatevalidation');
                    this.show();
                    return;
                }
            }
            for (let i = 0; i < this.resblUpdateList.length; i++) {
                if (!this.resblUpdateList[i].agyLocId) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrhloc.facilityentered');
                    this.show();
                    return;
                }
                if (!this.resblUpdateList[i].livingUnitDesc) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.locationmust');
                    this.show();
                    return;
                }
                if (!this.resblUpdateList[i].reserveUntilDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrhloc.untildatevalidation');
                    this.show();
                    return;
                }
                if ((this.resblUpdateList[i].reserveUntilDate) && ((DateFormat.compareDate(DateFormat.getDate(),
                    DateFormat.getDate(this.resblUpdateList[i].reserveUntilDate)) !== -1))) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrhloc.reservedatevalidation');
                    this.show();
                    return;
                }
            }
            this.resblCommitModel.insertList = this.resblInsertList;
            this.resblCommitModel.updateList = this.resblUpdateList;
        }
        if (this.resblDeleteList.length > 0) {
            for (let i = 0; i < this.resblDeleteList.length; i++) {
            }
            this.resblCommitModel.deleteList = this.resblDeleteList;
        }
        const resblSaveData = this.oidrhlocFactory.resBlCommit(this.resblCommitModel);
        resblSaveData.subscribe(data => {
            if (data === 1) {
                this.resblExecuteQuery();
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

    idChangeEvent = (event) => {
        this.namesFlag = false;
        const rowdata = new ValidateRowReturn();
        this.checkFacility = false;
        this.checkLocation = false;
        this.checkDate = false;
        this.checkValidateDate = false;
        const index = event.rowIndex;
        if (event.data.sealFlag) {
            this.dialogService.openLinkDialog('/OMURMRES', event.data).subscribe(result => {
                if (result) {
                    this.resblExecuteQuery();
                    rowdata.validated = true;
                    return rowdata;
                } else {
                    this.resblExecuteQuery();
                }
            });
            rowdata.validated = true;
            return rowdata;
        }
/* 
        const index1=this.resblData.indexOf(event.data);
        if(event.field=='cbFlag'&& event.data.cbFlag){
            this.grid.setColumnData('agyLocId',index1,undefined);
            this.grid.setColumnData('livingUnitDesc',index1,undefined);
            rowdata.validated = true;
            return rowdata;
        } */
       /*  if (event.field === 'livingUnitDesc') {
            const ocData = this.oidrhlocFactory.getOcFlagValue(event.data);
            ocData.subscribe(ocValue => {
                this.grid.setColumnData('ocFlag', index, ocValue);
            });
        } */
        /* if (event.field === 'livingUnitDesc' && event.field === this.field ) {
            if (event.newValue) {
             this.grid.setColumnData('cbFlag', index, false);
            }
        } */
        if (event.field === 'cbFlag') {// && event.field === this.field
            if (event.data.cbFlag) {
                if (event.data.offenderId) {
                    this.offenderIdTemp = event.data.offenderId;
                } else {
                    this.offenderIdTemp = this.globalOffenderId;
                }
                const resblSaveData = this.oidrhlocFactory.getCbQuery(this.offenderIdTemp, this.sessionManager.currentCaseLoad);
                resblSaveData.subscribe(data => {
                    if (data !== undefined) {
                        this.grid.setColumnData('agyLocId', index, data.agyLocId);
                        setTimeout(() => {
                            this.grid.setColumnData('livingUnitDesc', index, data.description);
                        }, 500);
                        event.data.livingUnitId = data.livingUnitId;
                    } else {
                        this.grid.setColumnData('agyLocId', index, undefined);
                        this.grid.setColumnData('livingUnitDesc', index, undefined);
                    }
                });
            } else {
                this.grid.setColumnData('agyLocId', index, undefined);
                this.grid.setColumnData('livingUnitDesc', index, undefined);
                // event.data.agyLocId = undefined;
                // event.data.livingUnitDesc = undefined;
                // event.data.livingUnitId = undefined;
                rowdata.validated = true;
                // rowdata.data = {
                //     offenderIdDisplay: event.data.offenderIdDisplay, button: '..', lastName: event.data.lastName,
                //     eventDate: event.data.eventDate, firstName: event.data.firstName, cbFlag: event.data.cbFlag,
                //     agyLocId: event.data.agyLocId, livingUnitDesc: event.data.livingUnitDesc,
                //     reserveUntilDate: event.data.reserveUntilDate, commentText: event.data.commentText,
                //     asnButton: 'Asn', livingUnitId: event.data.livingUnitId, offenderId: event.data.offenderId
                // };
                // return rowdata;
            }
        }
        /* if (event.field === 'agyLocId' && event.field === this.field) {
            // event.data.livingUnitDesc = undefined;
            this.grid.setColumnData('cbFlag', index, undefined);
            this.grid.setColumnData('livingUnitDesc', index, undefined);
            // if (!event.data.agyLocId) {
            //    // event.data.livingUnitDesc = undefined;
            //     rowdata.validated = true;
            //     // rowdata.data = {
            //     //     offenderIdDisplay: event.data.offenderIdDisplay, button: '..', lastName: event.data.lastName,
            //     //     eventDate: event.data.eventDate, firstName: event.data.firstName, cbFlag: event.data.cbFlag,
            //     //     agyLocId: event.data.agyLocId, livingUnitDesc: event.data.livingUnitDesc,
            //     //     reserveUntilDate: event.data.reserveUntilDate, commentText: event.data.commentText,
            //     //     asnButton: 'Asn', livingUnitId: event.data.livingUnitId, offenderId: event.data.offenderId
            //     // };
            //     // return rowdata;
            // }
            // if (event.newValue) {
            //     this.grid.setColumnData('cbFlag', index, false);
            //     }
            rowdata.validated = true;
            // rowdata.data = {
            //     offenderIdDisplay: event.data.offenderIdDisplay, button: '..', lastName: event.data.lastName,
            //     eventDate: event.data.eventDate, firstName: event.data.firstName, cbFlag: event.data.cbFlag,
            //     agyLocId: event.data.agyLocId, livingUnitDesc: event.data.livingUnitDesc,
            //     reserveUntilDate: event.data.reserveUntilDate, commentText: event.data.commentText,
            //     asnButton: 'Asn', livingUnitId: event.data.livingUnitId, offenderId: event.data.offenderId
            // };
            // return rowdata;
        } */
       /*  for (let i = 0; i < this.resblData.length; i++) {
            this.rowIndex = this.resblData.indexOf(event.data);
            if (this.resblData[i].reserveBedId) {
                if (!this.resblData[i].agyLocId) {
                    this.checkFacility = true;
                    if (this.rowIndex === i) {
                        // event.data.livingUnitDesc = undefined;
                        rowdata.validated = true;
                        // this.grid.setColumnData('livingUnitDesc', this.rowIndex, undefined);
                        rowdata.data = {
                            offenderIdDisplay: event.data.offenderIdDisplay, button: '..',button1: '..', lastName: event.data.lastName,
                            eventDate: event.data.eventDate, firstName: event.data.firstName, cbFlag: event.data.cbFlag,
                            agyLocId: event.data.agyLocId, livingUnitDesc: event.data.livingUnitDesc,
                            reserveUntilDate: event.data.reserveUntilDate, commentText: event.data.commentText,
                            asnButton: 'Asn', livingUnitId: event.data.livingUnitId, offenderId: event.data.offenderId
                        };
                        return rowdata;
                    }
                    this.type = 'info';
                    this.message = this.translateService.translate('oidrhloc.facilityentered');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
                if (this.rowIndex === i) {
                if (!this.resblData[i].livingUnitDesc) {
                    this.checkLocation = true;
                    if (this.rowIndex === i) {
                        rowdata.validated = true;
                        return rowdata;
                    }
                    this.type = 'info';
                    this.message = this.translateService.translate('common.locationmust');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
                if (!this.resblData[i].reserveUntilDate) {
                    this.checkDate = true;
                    if (this.rowIndex === i) {
                        rowdata.validated = true;
                        return rowdata;
                    }
                    this.type = 'info';
                    this.message = this.translateService.translate('oidrhloc.untildatevalidation');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
                if ((this.resblData[i].reserveUntilDate) && ((DateFormat.compareDate(DateFormat.getDate(),
                    DateFormat.getDate(this.resblData[i].reserveUntilDate)) !== -1))) {
                    this.checkValidateDate = true;
                    if (this.rowIndex === i) {
                        rowdata.validated = true;
                        return rowdata;
                    }
                    this.type = 'info';
                    this.message = this.translateService.translate('oidrhloc.reservedatevalidation');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            }
        } */

      /*   if (event.field === 'offenderIdDisplay' && event.data.offenderIdDisplay) {
            this.namesFlag = true;
            this.namesrchModel.offenderIdDisplay = event.data.offenderIdDisplay;
            for (let i = Number(String(this.namesrchModel.offenderIdDisplay).length); i < 10; i++) {
                this.namesrchModel.offenderIdDisplay = '0' + this.namesrchModel.offenderIdDisplay;
            }
            const namesrchResult = this.osinamesFactory.
                nameSrchExecuteQuery(this.namesrchModel);
            namesrchResult.subscribe(data => {
                if (data.length === 0) {
                    this.dialogService.openLinkDialog('/osinamesdialog', this.namesrchModel).subscribe(result => {
                        if (result) {
                            this.grid.setColumnData('offenderIdDisplay', index, result.offenderIdDisplay);
                            this.grid.setColumnData('lastName', index, result.lastName);
                            this.grid.setColumnData('firstName', index, result.firstName);
                            event.data.offenderId = result.offenderId;
                        } else {
                            this.grid.setColumnData('offenderIdDisplay', index, undefined);
                            this.grid.setColumnData('lastName', index, undefined);
                            this.grid.setColumnData('firstName', index, undefined);
                        }
                    });
                } else {
                    for (let i = 0; i < data.length; i++) {
                        event.data.offenderId = data[i].offenderId;
                        event.data.livingUnitId = data[i].livingUnitId;
                        if (event.data.offenderIdDisplay === data[i].offenderIdDisplay &&
                            event.data.lastName === data[i].lastName &&
                            event.data.firstName === data[i].firstName) {
                            return;
                        }

                    }
                    this.grid.setColumnData('offenderIdDisplay', index, data[0].offenderIdDisplay);
                    this.grid.setColumnData('lastName', index, data[0].lastName);
                    this.grid.setColumnData('firstName', index, data[0].firstName);
                    event.data.offenderId = data[0].offenderId;
                }
            });
        } */
        /* if (event.field === 'livingUnitDesc' && event.data.livingUnitDesc) {
            this.caseLoadAgyModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.caseLoadAgyModel.agyLocId = event.data.agyLocId;
            const livunitResult = this.omuavlocFactory.livUnitExecuteQuery(this.caseLoadAgyModel);
            livunitResult.subscribe(livunitResultList => {
                if (livunitResultList.length === 0) {
                    this.livingUnitMap = new Map<string, string>();
                    event.data.livingUnitId = Number(this.livingUnitMap.get(event.data.livingUnitDesc));
                    if (event.data.livingUnitId) {
                    } else {
                        this.dialogService.openLinkDialog('/OMUAVLOC', this.caseLoadAgyModel).subscribe(result => {
                            if (result) {
                                this.grid.setColumnData('livingUnitDesc', index, result.livingUnitDesc);
                                event.data.livingUnitId = result.livingUnitId;
                            } else {
                                this.grid.setColumnData('livingUnitDesc', index, undefined);
                            }
                        });
                    }
                } else {
                    this.livingUnitMap = new Map<string, string>();
                    for (let i = 0; i < livunitResultList.length; i++) {
                        var livUnitDescValue = undefined;
                        livUnitDescValue = livunitResultList[i].agyLocId + '-' + livunitResultList[i].level1Code;
                        if (livunitResultList[i].level2Code) {
                            livUnitDescValue = livUnitDescValue + '-' + livunitResultList[i].level2Code;
                            if (livunitResultList[i].level3Code) {
                                livUnitDescValue = livUnitDescValue + '-' + livunitResultList[i].level3Code;
                                if (livunitResultList[i].level4Code) {
                                    livUnitDescValue = livUnitDescValue + '-' + livunitResultList[i].level4Code;
                                }
                            }
                        }
                        this.livingUnitMap.set(livUnitDescValue, livunitResultList[i].livingUnitId);
                    }
                    event.data.livingUnitId = Number(this.livingUnitMap.get(event.data.livingUnitDesc));
                    if (event.data.livingUnitId) {
                    } else {
                        this.dialogService.openLinkDialog('/OMUAVLOC', this.caseLoadAgyModel).subscribe(result => {
                            if (result) {
                                this.grid.setColumnData('livingUnitDesc', index, result.livingUnitDesc);
                                event.data.livingUnitId = result.livingUnitId;
                            } else {
                                this.grid.setColumnData('livingUnitDesc', index, undefined);
                            }
                        });
                    }
                }
            });
        } */
        if (event.field === 'agyLocId') {
            if (event.newValue !== event.oldValue) {
                this.grid.setColumnData('livingUnitDesc', index, undefined);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    /*
        *  This event is used to do the validations when click Add button in Schedules Block.
        */
    onGridInsert = () => {
        /* for (let i = 0; i < this.resblData.length; i++) {
            if (!this.resblData[i].agyLocId || this.resblData[i].agyLocId.replace(/\s/g, '').length === 0) {
                this.type = 'info';
                this.message = this.translateService.translate('oidrhloc.facilityentered');
                this.show();
                return;
            } 
            if (!this.resblData[i].livingUnitDesc || this.resblData[i].livingUnitDesc.replace(/\s/g, '').length === 0) {
                this.type = 'info';
                this.message = this.translateService.translate('common.locationmust');
                this.show();
                return;
            }
            if (!this.resblData[i].reserveUntilDate) {
                this.type = 'info';
                this.message = this.translateService.translate('oidrhloc.untildatevalidation');
                this.show();
                return;
            }
            if (this.checkValidateDate && this.resblData[i].reserveBedId) {
                if ((this.resblData[i].reserveUntilDate) && ((DateFormat.compareDate(DateFormat.getDate(),
                    DateFormat.getDate(this.resblData[i].reserveUntilDate)) !== -1))) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oidrhloc.reservedatevalidation');
                    this.show();
                    return;
                }
            }
            if (!this.resblData[i].reserveBedId) {
                if ((this.resblData[i].reserveUntilDate) && ((DateFormat.compareDate(DateFormat.getDate(),
                    DateFormat.getDate(this.resblData[i].reserveUntilDate)) !== -1))) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oidrhloc.reservedatevalidation');
                    this.show();
                    return;
                }
            }
        } */
        return {
            offenderIdDisplay: '', button: '..',button1: '..', lastName: '', eventDate: '', firstName: '', cgnbtOffenderId3: '', agyLocId: '',
            livingUnitDesc: '', reserveUntilDate: '', commentText: '', asnButton: 'Asn', livingUnitId: '', offenderId: '',
            seq: this.resblData.length
        };

    }
    gridRowClicked(event) {
        this.selectedRow = event;
        if (event.reserveBedId) {
            this.resBLDelete = true;
        } else {
            this.resBLDelete = false;
        }
    }

    cbFlagEditable = (data: any, index: number, field: string): boolean => {
        if (data.agyLocId && data.createDateTime) {
            return false;
        }
        return true;
    }

}
