import { Component, OnInit } from '@angular/core';
import { ReferenceDomains } from '@common/beans/ReferenceDomains';
import { TranslateService } from '@common/translate/translate.service';
import { ActivatedRoute } from '@angular/router';
import { OcmxpstmService } from '../service/ocmxpstm.service';
import { ReferenceCodes } from '@common/beans/ReferenceCodes';
import { ReferenceCodesCommitBean } from '@common/beans/ReferenceCodesCommitBean';



@Component({
    selector: 'app-ocmxpstm',
    templateUrl: './Ocmxpstm.component.html',
    styleUrls: [],
})

export class OcmxpstmComponent implements OnInit {
    refDomainColumnDef: any[];
    refCodeColumnDef: any[];
    refCondColumnDef: any[];
    refdmnData: ReferenceDomains[] = [];
    selectedIndex = 0;
    refdmnModel: ReferenceDomains = new ReferenceDomains();
    msgs: any[] = [];
    refdmnExecuteModel: ReferenceDomains = new ReferenceDomains();
    message = ' Invalid.';
    type = 'error';
    index: number;
    msglist = [];
    refcodeData: ReferenceCodes[] = [];
    refcodeDataCond: ReferenceCodes[] = [];
    refcodeModel: ReferenceCodes = new ReferenceCodes();
    refcodeModelCond: ReferenceCodes = new ReferenceCodes();
    refcodeInsertList: ReferenceCodes[] = [];
    refcodeUpdateList: ReferenceCodes[] = [];
    refcodeCommitModel: ReferenceCodesCommitBean = new ReferenceCodesCommitBean();


    constructor(private ocmxpstmFactory: OcmxpstmService, public translateService: TranslateService, private activatedRoute: ActivatedRoute) {
        this.refDomainColumnDef = [];
        this.refCodeColumnDef = [];
        this.refCondColumnDef = [];
    }

    ngOnInit() {
        this.refDomainColumnDef = [
            { fieldName: this.translateService.translate('oumrcode.domain') + '*', field: 'domain', editable: false, width: 290, datatype: 'text', maxlength: 12 },
            { fieldName: this.translateService.translate('oumrcode.descriptions') + '*', field: 'description', editable: false, width: 380, maxlength: 40, datatype: 'text', uppercase: 'false' },
            { fieldName: this.translateService.translate('oumrcode.status') + '*', field: 'domainStatus', editable: false, maxlength: 12, width: 190, datatype: 'text' },
            { fieldName: this.translateService.translate('oumrcode.owner') + '*', field: 'ownerCode', editable: false, maxlength: 12, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('oumrcode.application') + '*', field: 'applnCode', editable: false, width: 150, maxlength: 12, datatype: 'text' },
            { fieldName: this.translateService.translate('oumrcode.parent'), field: 'parentDomain', datatype: 'text', editable: false, maxlength: 12, width: 245 },
        ];

        this.refCodeColumnDef = [
            { fieldName: this.translateService.translate('oumrcode.code'), field: 'code', editable: false, width: 290, datatype: 'text', maxlength: 12 },
            { fieldName: this.translateService.translate('oumrcode.descriptionfield'), field: 'description', editable: false, width: 380, maxlength: 40, datatype: 'text', uppercase: 'false' },
            { fieldName: this.translateService.translate('oumrcode.sequence'), field: 'listSeq', editable: false, width: 190, datatype: 'number', maxlength: 4, whole: true },
            { fieldName: this.translateService.translate('oumrcode.active'), field: 'activeFlag', editable: false, width: 150, datatype: 'checkbox' },
            // { fieldName: this.translateService.translate('oumrcode.systemdata'), field: 'systemDataFlag', editable: false, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('oumrcode.expirydate'), field: 'expiredDate', datatype: 'date', editable: false, width: 245 },
            { fieldName: this.translateService.translate('oumrcode.parentcode'), field: 'parentCode', editable: false, width: 245, datatype: 'text', maxlength: 12 },
            { fieldName: this.translateService.translate('ocmxpstm.updateallowflag'), field: 'updateFlag', editable: true, width: 190, datatype: 'checkbox', maxlength: 4, whole: true },
            { fieldName: this.translateService.translate('ocmxpstm.updatereasonflag'), field: 'updateReasonFlag', editable: true, width: 150, datatype: 'checkbox' },
       
        ];

        /*this.refCondColumnDef = [
            { fieldName: this.translateService.translate('oumrcode.code'), field: 'code', editable: false, width: 290, datatype: 'text', maxlength: 12 },
            { fieldName: this.translateService.translate('oumrcode.descriptionfield'), field: 'description', editable: false, width: 380, maxlength: 40, datatype: 'text', uppercase: 'false' },
            { fieldName: this.translateService.translate('Update Allow Flag'), field: 'updateFlag', editable: true, width: 190, datatype: 'checkbox', maxlength: 4, whole: true },
            { fieldName: this.translateService.translate('Update Reason Flag'), field: 'updateReasonFlag', editable: true, width: 150, datatype: 'checkbox' },
        ]; */

        this.refdmnExecuteModel = new ReferenceDomains();
        this.activatedRoute.queryParams.subscribe(params => {
            let domain = params['domain'];
            if (domain) {
                this.refdmnExecuteModel.domain = domain;
            }
        });

        this.oumrcodeExecuteQuery();

    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onDomainRowClick(event) {
        this.refdmnModel = event;
        this.refcodeExecuteQuery();
    }


    onRowClick(event) {
        if (event && event.code) {
            this.refcodeModelCond.code = event.code;
            this.refcodeModelCond.description = event.description;
            //this.refCodeCondExecuteQuery();
        }
    }
    oumrcodeExecuteQuery() {
        this.refdmnExecuteModel.domain='PS_PRG_STAT';
        const serviceObj = this.ocmxpstmFactory.refDmnExecuteQuery(this.refdmnExecuteModel);
        serviceObj.subscribe(data => {
            if (data.length == 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
            }
            else {
                this.refdmnData = data;
                this.refdmnModel = this.refdmnData[0];
                this.selectedIndex = 0;
                this.index = 0;
            }

        });
    }


    refcodeExecuteQuery() {
        this.refcodeModel.domain = this.refdmnModel.domain;
        const refcodeResultList = this.ocmxpstmFactory.refCodeExecuteQuery(this.refcodeModel);
        refcodeResultList.subscribe(refCodeData => {
            if (refCodeData && refCodeData.length === 0) {
                this.refcodeData = [];

            } else {
                refCodeData.forEach(refCode => {
                    refCode.updateFlag = (refCode.updateFlag === 'Y') ? true : false;
                    refCode.activeFlag = (refCode.activeFlag === 'Y') ? true : false;
                    refCode.updateReasonFlag =(refCode.updateReasonFlag === 'Y') ? true : false;
                });
                this.refcodeData = refCodeData;
                this.refcodeModel = this.refcodeData[0];
            }
        });
    }

    refCodeCondExecuteQuery() {
        const obj = this.ocmxpstmFactory.refCodeCondExecuteQuery(this.refcodeModel.code);
        obj.subscribe(data => {
            if (data && data.length === 0) {
                this.refcodeDataCond = [];
            } else {
                data.forEach(e => {
                    e.updateFlag = e.updateFlag === 'Y' ? true : false;
                })
                this.refcodeDataCond = data;
            }
        });

    }

    onGridInsert = () => {
        if (this.refcodeDataCond && this.refcodeDataCond.length <= 0) {
            return { code: this.refcodeModelCond.code, description: this.refcodeModelCond.description };
        } else {
            return
        }
    }

    oumrcodeCondSave(event) {
        this.refcodeInsertList = event.added
        this.refcodeUpdateList = event.updated

        if (this.refcodeInsertList.length > 0 || this.refcodeUpdateList.length > 0) {
            this.refcodeUpdateList.forEach(data => {
                data.updateFlag = (data.updateFlag) ? 'Y' : 'N';
                data.updateReasonFlag = (data.updateReasonFlag) ? 'Y' : 'N';
            });

            this.refcodeCommitModel.insertList = this.refcodeInsertList;
            this.refcodeCommitModel.updateList = this.refcodeUpdateList;
        }
        const refcodeSaveData = this.ocmxpstmFactory.refCodeCondCommit(this.refcodeCommitModel);
        refcodeSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.refcodeExecuteQuery();
            } else {
                // success
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.refcodeExecuteQuery();
            }
        });
    }
}
