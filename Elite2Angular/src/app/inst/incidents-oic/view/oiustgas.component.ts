import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiustgasService } from '../service/oiustgas.service';
import { AgencyIncidentAssoTostg } from '@instincidentsbeans/AgencyIncidentAssoTostg';
import { AgencyIncidentAssoTostgCommitBean } from '@instincidentsbeans/AgencyIncidentAssoTostgCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oiustgas',
    templateUrl: './oiustgas.component.html',
})

export class OiustgasComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    agencyincidentassotostgData: any[] = []; // AgencyIncidentAssoTostg[] = [];
    agencyincidentassotostgDataTemp: AgencyIncidentAssoTostg[] = [];
    agencyincidentassotostgModel: AgencyIncidentAssoTostg = new AgencyIncidentAssoTostg();
    agencyincidentassotostgIndex: number;
    agencyincidentassotostgCommitModel: AgencyIncidentAssoTostgCommitBean = new AgencyIncidentAssoTostgCommitBean();
    agencyincidentassotostgInsertList: AgencyIncidentAssoTostg[] = [];
    agencyincidentassotostgUpdatetList: AgencyIncidentAssoTostg[] = [];
    agencyincidentassotostgDeleteList: AgencyIncidentAssoTostg[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    agencyIncidentAssoTostgColumnDef: any[];
    cntlBlkReadOnly: boolean;
    rgstg2Rg: any[] = [];
    rgstg1Rg: any[] = [];
    rgstg3Rg: any[] = [];
    stggrpRg: any[] = [];
    type = 'error';
    msglist = [];
    exitflag: boolean;
    message = ' Invalid.';
    idValue: Map<string, string> = new Map();
    descValue: Map<string, string> = new Map();
    locked: boolean;
    checkDescriptionVal: boolean;
    constructor(private oiustgasFactory: OiustgasService, public translateService: TranslateService,
        private dialogService: DialogService) {

        this.agencyIncidentAssoTostgColumnDef = [];
    }
    onGridReady(event) {
    }

    ngOnInit() {
        this.locked = !this.dialog.data.locked;
        this.checkDescriptionVal = false;
        this.agencyIncidentAssoTostgColumnDef = [
            {
                fieldName: this.translateService.translate('oiustgas.securitythreatgroup'), field: 'description',
                datatype: 'text', editable: false, width: 700, optionWidth: 350
            },
            {
                fieldName: '', field: 'btn', datatype: 'hyperlink', displayas: 'href',
                link: '/oiustgaslov', updateField: 'row', styleClass: 'search', data: 'row',
                editable: true, width: 150, dialogWidth: '80%', modal: true, // onLaunchClick: this.onEditLaunchClick
            },
            {
                fieldName: '', field: 'stgId', hide: true
            }

        ];

        this.stgGrpRecordGroup();
    }
    onButExitclick(event) {
        this.dialog.close(null);
    }
    stgGrpRecordGroup() {
        const stggrpServiceObj = this.oiustgasFactory.
            stgGrpRecordGroup();
        stggrpServiceObj.subscribe(stggrpList => {
            if (stggrpList.length === 0) {
                this.stggrpRg = [];
            } else {
                stggrpList.forEach(data => {
                    this.idValue.set(data.stgId, data.description1);
                    this.descValue.set(data.description1, data.stgId);
                });
                this.agencyincidentassotostgExecuteQuery();
            }
        });
    }
    agencyincidentassotostgExecuteQuery() {
        this.agencyincidentassotostgModel = new AgencyIncidentAssoTostg();
        this.agencyincidentassotostgModel.agencyIncidentId = this.dialog.data.id;
        const agencyincidentassotostgResult = this.oiustgasFactory.
            agencyIncidentAssoTostgExecuteQuery(this.agencyincidentassotostgModel);
        agencyincidentassotostgResult.subscribe(agencyincidentassotostgResultList => {
            if (agencyincidentassotostgResultList.length === 0) {
                this.agencyincidentassotostgData = [];
            } else {
                for (const res of agencyincidentassotostgResultList) {
                    if (this.idValue.has(res.stgId)) {
                        res.description = this.idValue.get(res.stgId);
                        if (this.locked) {
                            res.btn = '';
                        }
                    }
                }
                this.agencyincidentassotostgData = agencyincidentassotostgResultList;

                this.agencyincidentassotostgModel = agencyincidentassotostgResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */

    oiustgasSaveagencyincidentassotostgForm(event) {
        if (event.added.length > 0 ) {
            for (let j = 0; j < event.added.length; j++) {
                if (!event.added[j].description) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oiustgas.nodatahasbeenmodifiedone');
                    this.show();
                    return;
                }
                if (event.added[j].description) {
                    this.checkDescriptionVal = true;
                }
            }
            if (!this.checkDescriptionVal) {
                this.type = 'warn';
                this.message = this.translateService.translate('oiustgas.Cantbeempty');
                this.show();
                return;
            }
        }
        this.agencyincidentassotostgInsertList = [];
        this.agencyincidentassotostgUpdatetList = [];
        this.agencyincidentassotostgDeleteList = [];
        const dupData = new Set();
        const dup = { duplicate: false };
        this.agencyincidentassotostgData.forEach(data => {
            if (dupData.has(data.stgId)) {
                dup.duplicate = true;
                return;
            } else {
                dupData.add(data.stgId);
            }

        });
        if (dup.duplicate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiustgas.duplicate');
            this.show();
            return;
        }

        for (const evntadd of event.added) {
            if (this.descValue.has(evntadd.description)) {
                this.agencyincidentassotostgModel = new AgencyIncidentAssoTostg();
                this.agencyincidentassotostgModel.stgId = evntadd.stgId;
                this.agencyincidentassotostgModel.agencyIncidentId = this.dialog.data.id;
                this.agencyincidentassotostgInsertList.push(this.agencyincidentassotostgModel);
            }

        }
        for (const evntupd of event.updated) {
            if (this.descValue.has(evntupd.description)) {
                this.agencyincidentassotostgModel = new AgencyIncidentAssoTostg();
                this.agencyincidentassotostgModel.stgId = evntupd.stgId;
                this.agencyincidentassotostgModel.agencyIncidentId = evntupd.agencyIncidentId;
                this.agencyincidentassotostgModel.seqNo = evntupd.seqNo;
                this.agencyincidentassotostgModel.createUserId = evntupd.createUserId;
                this.agencyincidentassotostgModel.createDatetime = evntupd.createDatetime;
                this.agencyincidentassotostgModel.modifyDatetime = DateFormat.getDate();
                this.agencyincidentassotostgUpdatetList.push(this.agencyincidentassotostgModel);
            }

        }
        for (const evntdlt of event.removed) {
            if (this.descValue.has(evntdlt.description)) {
                this.agencyincidentassotostgModel = new AgencyIncidentAssoTostg();
                this.agencyincidentassotostgModel.stgId = evntdlt.stgId;
                this.agencyincidentassotostgModel.seqNo = evntdlt.seqNo;
                this.agencyincidentassotostgModel.agencyIncidentId = this.dialog.data.id;
                this.agencyincidentassotostgDeleteList.push(this.agencyincidentassotostgModel);
            }

        }
        this.agencyincidentassotostgCommitModel.insertList = [];
        this.agencyincidentassotostgCommitModel.updateList = [];
        this.agencyincidentassotostgCommitModel.deleteList = [];
        this.agencyincidentassotostgCommitModel.insertList = this.agencyincidentassotostgInsertList;
        this.agencyincidentassotostgCommitModel.updateList = this.agencyincidentassotostgUpdatetList;
        this.agencyincidentassotostgCommitModel.deleteList = this.agencyincidentassotostgDeleteList;

        const agencyincidentassotostgSaveData = this.oiustgasFactory
            .agencyIncidentAssoTostgCommit(this.agencyincidentassotostgCommitModel);
        agencyincidentassotostgSaveData.subscribe(data => {
            if (data === 1) {
                this.checkDescriptionVal = false;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.agencyincidentassotostgExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.agencyincidentassotostgExecuteQuery();
            }
        });
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    addGas = () => {
    }

    onGridInsert = () => {
        if (this.agencyincidentassotostgData.length > 0) {
            if (!this.agencyincidentassotostgData[this.agencyincidentassotostgData.length - 1].description) {
                return;
            }

        }
        return { btn: '', stgId: '' };
    }

}
