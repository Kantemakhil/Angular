import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderSearchService } from '@core/ui-components/search-block/offender-search.service';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { LegalUpdateReasons } from '../beans/LegalUpdateReasons';
import { LegalUpdateReasonsCommitBean } from '../beans/LegalUpdateReasonsCommitBean';
import { LegalUpdateUsages } from '../beans/LegalUpdateUsages';
import { LegalUpdateUsagesCommitBean } from '../beans/LegalUpdateUsagesCommitBean';
import { OcmstatsService } from '../service/ocmstats.service';


@Component({
    selector: 's4-ocmstats',
    templateUrl: './ocmstats.component.html'
})

export class OcmstatsComponent implements OnInit {
    @ViewChild('orders', { static: true }) ordersGrid: any;
    @ViewChild('status', { static: true }) statuesGrid: any;
    vHeaderBlockModel: VTrustHeader = new VTrustHeader();
    ordersData: LegalUpdateUsages[];
    statuesData: LegalUpdateReasons[];
    ordersColumnDef: any[] = [];
    statuesColumnDef: any[] = [];
    ordersInsertList: LegalUpdateUsages[] = [];
    ordersUpdateList: LegalUpdateUsages[] = [];
    ordersCommitModel: LegalUpdateUsagesCommitBean = new LegalUpdateUsagesCommitBean();
    msgs: any[] = [];
    statuesUpdateList: LegalUpdateReasons[];
    statuesCommitModel: LegalUpdateReasonsCommitBean = new LegalUpdateReasonsCommitBean();
    code: any;
    constructor(private ocmstatsFactory: OcmstatsService, private offenderSearchService: OffenderSearchService, public translateService: TranslateService) { }
    ngOnInit() {
        this.ordersData = [];
        this.statuesData = [];
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.ordersColumnDef = [
            {
                fieldName: this.translateService.translate('ocmstats.code'), field: 'updateReasonCode',
                editable: true, width: 100, datatype: 'text', cellEditable: this.canCodeCellEdit, required: true
            },
            {
                fieldName: this.translateService.translate('ocmstats.description'), field: 'description', editable: true, width: 80,
                datatype: 'text', required: true,uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('ocmstats.resultingstatus'), field: 'activeType', editable: true, width: 120,
                domain: 'ACTIVE_TYPE', datatype: 'lov', required: true
            },
            {
                fieldName: this.translateService.translate('ocmstats.seq'), field: 'listSeq',
                editable: true, width: 190, datatype: 'number', maxValue: '999999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('ocmstats.active'), field: 'activeFlag', editable: true, width: 40, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocmstats.expiryDate'), field: 'expiryDate', datatype: 'date', editable: false
            }

        ];

        this.statuesColumnDef = [
            {
                fieldName: this.translateService.translate('ocmstats.apply'), field: 'activeFlag', editable: true, width: 120,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocmstats.code'), field: 'legalClass',
                editable: false, width: 100, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocmstats.description'), field: 'description', editable: false, width: 80,
                datatype: 'text'
            },


        ];

        this.ordersExecuteQuery();
    }


    ordersExecuteQuery() {
        this.ocmstatsFactory.ordersExecuteQuery().subscribe(data => {
            if (data.length > 0) {
                data.forEach(ele => {
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
                })
                this.ordersData = data;
            } else {
                this.ordersData = [];
            }
        })
    }

    statusExecuteQuery(updateReasonCode) {
        this.ocmstatsFactory.statusExecuteQuery(updateReasonCode).subscribe(data => {
            if (data.length > 0) {
                data.forEach(ele => {
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
                })
                this.statuesData = data;
            } else {
                this.statuesData = [];
            }
        })
    }

    onGridInsert = () => {
        return { activeFlag: true };
    }

    save() {
        const ordersEvent = { added: [], updated: [], removed: [] };
        if (this.ordersGrid) {
            const added = [];
            this.ordersGrid.addedMap.forEach((value, keys) => { added.push(value); });
            const updated = [];
            this.ordersGrid.updatedMap.forEach((value, keys) => { updated.push(value); });
            ordersEvent.added = JSON.parse(JSON.stringify(added));
            ordersEvent.updated = JSON.parse(JSON.stringify(updated));
        }

        const statusEvent = { added: [], updated: [], removed: [] };
        if (this.statuesGrid) {
            const added = [];
            this.ordersGrid.addedMap.forEach((value, keys) => { added.push(value); });
            const updated = [];
            this.statuesGrid.updatedMap.forEach((value, keys) => { updated.push(value); });
            statusEvent.updated = JSON.parse(JSON.stringify(updated));
        }

        if (ordersEvent.added.length > 0 || ordersEvent.updated.length > 0 || ordersEvent.removed.length > 0) {
            this.ordersCommit(ordersEvent);
        }

        if (statusEvent.added.length > 0 || statusEvent.updated.length > 0 || statusEvent.removed.length > 0) {
            this.statuesCommit(statusEvent);
        }
    }

    onRowClickorders(event) {
        if (event) {
            this.code = event.updateReasonCode;
            this.statusExecuteQuery(this.code);
        } else {
            this.ordersData = [];
            this.statuesData = [];
        }
    }

    ordersCommit(event) {
        this.ordersInsertList = event.added;
        this.ordersUpdateList = event.updated;
        this.ordersCommitModel.insertList = [];
        this.ordersCommitModel.updateList = [];
        this.ordersCommitModel.deleteList = [];

        if (this.ordersInsertList.length > 0) {
            for (let i = 0; i < this.ordersInsertList.length; i++) {
                if (!this.ordersInsertList[i].updateReasonCode) {
                    this.show(this.translateService.translate('ocmstats.codemustbeentered'), 'warn');
                    return;
                }
                if (!this.ordersInsertList[i].description) {
                    this.show(this.translateService.translate('ocmstats.descriptionmustenter'), 'warn');
                    return;
                }

                if (!this.ordersInsertList[i].activeType) {
                    this.show(this.translateService.translate('ocmstats.resultingstatusmustenter'), 'warn');
                    return;
                }
                this.ordersInsertList[i].activeFlag = this.ordersInsertList[i].activeFlag ? 'Y' : 'N';
            }
        }

        if (this.ordersUpdateList.length > 0) {
            for (let i = 0; i < this.ordersUpdateList.length; i++) {
                if (!this.ordersUpdateList[i].updateReasonCode) {
                    this.show(this.translateService.translate('ocmstats.codemustbeentered'), 'warn');
                    return;
                }
                if (!this.ordersUpdateList[i].description) {
                    this.show(this.translateService.translate('ocmstats.descriptionmustenter'), 'warn');
                    return;
                }

                if (!this.ordersUpdateList[i].activeType) {
                    this.show(this.translateService.translate('ocmstats.resultingstatusmustenter'), 'warn');
                    return;
                }
                this.ordersUpdateList[i].activeFlag = this.ordersUpdateList[i].activeFlag ? 'Y' : 'N';
            }
        }
        this.ordersCommitModel.insertList = this.ordersInsertList;
        this.ordersCommitModel.updateList = this.ordersUpdateList;
        this.ocmstatsFactory.ordersCommit(this.ordersCommitModel).subscribe(data => {
            if (data == 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.ordersExecuteQuery();
            } else if (data === 18) {
                this.show(this.translateService.translate('ocmstats.rowalreadyexists'));
                this.ordersExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                this.ordersExecuteQuery();
            }
        })
    }


    statuesCommit(event) {
        this.statuesUpdateList = event.updated;
        this.statuesCommitModel.updateList = [];

        if (this.statuesUpdateList.length > 0) {
            if (this.statuesUpdateList.length > 0) {
                for (let i = 0; i < this.statuesUpdateList.length; i++) {
                    this.statuesUpdateList[i].activeFlag = this.statuesUpdateList[i].activeFlag ? 'Y' : 'N';
                }
            }
            this.statuesCommitModel.updateList = this.statuesUpdateList;
        }
        this.ocmstatsFactory.statusCommit(this.statuesCommitModel).subscribe(data => {
            if (data == 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.statusExecuteQuery(this.code);
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                this.statusExecuteQuery(this.code);
            }
        })
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    orderClear = () => {
        const updatedData = this.ordersData.filter(ele => ele['updated'] === 'Y', []);
        if (updatedData && updatedData.length > 0) {
            this.ordersGrid.clearRecords(this.ordersGrid.gridOptions);
        }
        return true;
    }

    statusClear = () => {
        const updatedData = this.statuesData.filter(ele => ele['updated'] === 'Y', []);
        if (updatedData && updatedData.length > 0) {
            this.ordersGrid.clearRecords(this.ordersGrid.gridOptions);
        }
        return true;
    }

    expDateGenerator = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (!event.newValue) {
                rowdata.data = { expiryDate: new Date() }
            } else {
                rowdata.data = { expiryDate: null }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    canCodeCellEdit = (data: any, index: number, field: string) => {
        if (data.createDatetime) {
            return false;
        }
        return true;
    }

    get affDisableFlag() {
        if (this.ordersGrid.addedMap.size > 0 || this.ordersGrid.updatedMap.size > 0 ||
            this.statuesGrid.updatedMap.size > 0) {
            return false;
        }
        return true;
    }
}
