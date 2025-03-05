import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenceDomains } from '@common/beans/ReferenceDomains';
import { TranslateService } from '@common/translate/translate.service';
import { ActivatedRoute } from '@angular/router';
import { ReferenceCodes } from '@common/beans/ReferenceCodes';
import { ReferenceCodesCommitBean } from '@common/beans/ReferenceCodesCommitBean';
import { OimsrlucService } from '../service/oimsrluc.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oimsrluc',
    templateUrl: './oimsrluc.component.html'

})
export class OimsrlucComponent implements OnInit {
    @ViewChild('refcodegrid') refcodegrid: any;

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
    refcodeDataTemp: ReferenceCodes[] = [];

    refcodeDataCond: ReferenceCodes[] = [];
    refcodeModel: ReferenceCodes = new ReferenceCodes();
    refcodeModelCond: ReferenceCodes = new ReferenceCodes();
    refcodeInsertList: ReferenceCodes[] = [];
    refcodeUpdateList: ReferenceCodes[] = [];
    refcodeCommitModel: ReferenceCodesCommitBean = new ReferenceCodesCommitBean();
    condUnit: string;
  


    constructor(private oimsrlucFactory: OimsrlucService, public translateService: TranslateService, private activatedRoute: ActivatedRoute) {
        this.refDomainColumnDef = [];
        this.refCodeColumnDef = [];
        this.refCondColumnDef = [];
    }

    ngOnInit() {
        this.condUnit= 'COND_UNIT';
        this.refDomainColumnDef = [
            { fieldName: this.translateService.translate('oumrcode.domain') , field: 'domain', editable: false, width: 290, datatype: 'text', maxlength: 12 },
            { fieldName: this.translateService.translate('oumrcode.descriptions') , field: 'description', editable: false, width: 380, maxlength: 40, datatype: 'text', uppercase: 'false' },
            { fieldName: this.translateService.translate('oumrcode.status') , field: 'domainStatus', editable: false, maxlength: 12, width: 190, datatype: 'text' },
            { fieldName: this.translateService.translate('oumrcode.owner') , field: 'ownerCode', editable: false, maxlength: 12, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('oumrcode.application') , field: 'applnCode', editable: false, width: 150, maxlength: 12, datatype: 'text' },
            { fieldName: this.translateService.translate('oumrcode.parent'), field: 'parentDomain', datatype: 'text', editable: false, maxlength: 12, width: 245 },
        ];

        this.refCodeColumnDef = [
            { fieldName: this.translateService.translate('oimsrluc.reporttype'), field: 'reportType', editable: false, width: 290, datatype: 'text', maxlength: 12 },
            { fieldName: this.translateService.translate('oimsrluc.descriptionfield'), field: 'description', editable: false, width: 380, maxlength: 40, datatype: 'text', uppercase: 'false' },
            { fieldName: this.translateService.translate('oimsrluc.automatic'), field: 'automaticFlag', editable: true, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('oimsrluc.length'), field: 'length', editable: true, width: 190, datatype: 'number', maxlength: 4, whole: true ,cellEditable: this.canCellEditFee},
            { fieldName: this.translateService.translate('oimsrluc.lengthunits'), field: 'lengthUnit', editable: true, width: 190, datatype: 'lov', maxlength: 4, whole: true  ,link: 'oimsrluc/unitLovExecuteQuery',cellEditable: this.canCellEditFee , source:"OUMRCODE", sourceDomain:"COND_UNIT"}

        ];

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
        if(event){
            if(event.automaticFlag){
                this.refcodegrid.requiredOn('length');
                this.refcodegrid.requiredOn('lengthUnit');

            }
            else{
                this.refcodegrid.requiredOff('length');
                this.refcodegrid.requiredOff('lengthUnit');
            }
        }
    }
    oumrcodeExecuteQuery() {
        const serviceObj = this.oimsrlucFactory.refDmnExecuteQuery();
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
        const refcodeResultList = this.oimsrlucFactory.refCodeExecuteQuery(this.refcodeModel);
        refcodeResultList.subscribe(refCodeData => {
            if (refCodeData && refCodeData.length === 0) {
                this.refcodeData = [];

            } else {
                refCodeData.forEach(refCode => {
                    refCode.automaticFlag = (refCode.automaticFlag === 'Y') ? true : false;
                });
                this.refcodeData = refCodeData;
                    this.refcodeDataTemp = JSON.parse(JSON.stringify(refCodeData));
                this.refcodeModel = this.refcodeData[0];
            }
        });
    }

    refCodeCondExecuteQuery() {
        const obj = this.oimsrlucFactory.refCodeCondExecuteQuery(this.refcodeModel.reportType);
        obj.subscribe(data => {
            if (data && data.length === 0) {
                this.refcodeDataCond = [];
            } else {
                data.forEach(e => {
                    e.automaticFlag = e.automaticFlag === 'Y' ? true : false;
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

    oimsrlucCondSave(event) {
        if (!this.lengthValidations()) {
            return;
         }
        this.refcodeInsertList = event.added
        this.refcodeUpdateList = event.updated

        if (this.refcodeInsertList.length > 0 || this.refcodeUpdateList.length > 0) {
            this.refcodeUpdateList.forEach(data => {
                data.automaticFlag = (data.automaticFlag) ? 'Y' : 'N';
            });

            this.refcodeCommitModel.insertList = this.refcodeInsertList;
            this.refcodeCommitModel.updateList = this.refcodeUpdateList;
        }
        const refcodeSaveData = this.oimsrlucFactory.refCodeCondCommit(this.refcodeCommitModel);
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

canCellEditFee = (data: any, index: number, field: string) => {
    if (data.automaticFlag) {
        return true;
    } else {
        return false;
    }

}
validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'automaticFlag') {
        if (event.data.automaticFlag) {
            this.refcodegrid.setColumnData('length', rowIndex, this.refcodeDataTemp[rowIndex].length)
        this.refcodegrid.setColumnData('lengthUnit', rowIndex, this.refcodeDataTemp[rowIndex].lengthUnit);

           this.refcodegrid.requiredOn('length');
           this.refcodegrid.requiredOn('lengthUnit');

           rowdata.validated = true;
           return rowdata;
       } else {
        this.refcodegrid.setColumnData('length', rowIndex, undefined);
            this.refcodegrid.setColumnData('lengthUnit', rowIndex, undefined);
           this.refcodegrid.requiredOff('length');
           this.refcodegrid.requiredOff('lengthUnit');


           rowdata.validated = true;
           return rowdata;
       } 
   }
   
    
   
    rowdata.validated = true;
    return rowdata;
}
lengthValidations = () => {
    const is = { valid: true };
    if (this.refcodeData && this.refcodeData) {
       this.refcodeData.forEach(element => {
        if(element.automaticFlag){
          if (!element.length) {
            this.type = 'warn';
            this.message = this.translateService.translate('oimsrluc.lengthmustbeentered');
            this.show();
             is.valid = false;
             return is.valid;
          }
          
          if (element.lengthUnit === undefined || !element.lengthUnit) {
            this.type = 'warn';
            this.message = this.translateService.translate('oimsrluc.unitmustbeentered');
            this.show();
             is.valid = false;
             return is.valid;
          
          }
    }
});
    }
    return is.valid;
 }

 onrefCodeGridClear = () => {

    this.refcodegrid.requiredOff('length');
    this.refcodegrid.requiredOff('lengthUnit');
    this.refcodeExecuteQuery()
    return true;
}

}