import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtucpayeService } from '@inmate/trust/trustaccounts/service/otucpaye.service';
import { Corporates } from '@inmatetrustaccountsbeans/Corporates';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
//  import required bean declarations

@Component({
    selector: 'app-otucpaye',
    templateUrl: './otucpaye.component.html'
})

export class OtucpayeComponent implements OnInit {
    //  Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    corpData: Corporates[] = [];
    corpDataTemp: Corporates[] = [];
    corpModel: Corporates = new Corporates();
    corpIndex = 0;
    corpInsertList: Corporates[] = [];
    corpUpdatetList: Corporates[] = [];
    corpDeleteList: Corporates[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    corpColumnDef: any[];
    remColumnDef: any[];
    offBncColumnDef: any[];
    offBncReadOnly = false;
    sysPflReadOnly = false;
    offTxnReadOnly = false;
    remReadOnly = false;
    rem1ReadOnly = false;
    cg$ctrlReadOnly = false;
    corpReadOnly = false;
    corpModelTemp: Corporates = new Corporates();

    corporateModel: Corporates = new Corporates();
    selectedRowIndex: number;
    constructor(private otucpayeFactory: OtucpayeService,
        public translateService: TranslateService,
        public dialogService: DialogService) {
        //  TODO initilize data members here..!
        this.corpColumnDef = [];
        this.remColumnDef = [];
        this.offBncColumnDef = [];
    }
    ngOnInit() {
        this.selectedRowIndex = 0;
        this.corpModelTemp = new Corporates();
        this.corpColumnDef = [
            {
                fieldName: this.translateService.translate('common.name'), field: 'corporateName', editable: false, width: 150,
                maxlength: 40
            },
            {
                fieldName: this.translateService.translate('otucpaye.identifier'), field: 'corporateId', editable: false, width: 150,
                maxlength: 11
            },
            {
                fieldName: this.translateService.translate('common.telephone'), field: 'telephoneNo', editable: false, width: 150,
                maxlength: 40
            },
        ];
       const dlgData = this.dialog.data;
       if (dlgData) {
           if (dlgData.corporateName) {
               this.corpModelTemp.corporateName = dlgData.corporateName;
           }
           if (dlgData.corporateId) {
            this.corpModelTemp.corporateId = dlgData.corporateId;
           }
           if (this.corpModelTemp.corporateName || this.corpModelTemp.corporateId) {
           this.corpExecuteQuery();
           }
       }
       this.corpExecuteQuery();
    }
    get editFlag(): boolean {
        if (this.corpData.length > 0) {
            return false;
        } else {
            return true;
        }
    }
     /**
    *  This function will be executed when we click on New button
    */
    onCorpNewclick() {
        const dlgData = {model: this.corporateModel, mode: 'A'};
        this.dialogService.openLinkDialog('OUMAGENCDIALOG', dlgData, 80).subscribe(ele => {
            if (ele) {
                this.corpModelTemp = ele;
            } else {
                this.corpModelTemp = new Corporates();
            }
            this.corpExecuteQuery();
        });
    }
     /**
    *  This function will be executed when we click on Edit button
    */
    onCorpEditclick() {
        const dlgData = {model: this.corporateModel, mode: 'U'};
        this.dialogService.openLinkDialog('OUMAGENCDIALOG', dlgData, 80).subscribe(ele => {
            if (ele) {
                this.corpModelTemp = ele;
            } else {
                this.corpModelTemp = new Corporates();
            }
            this.corpExecuteQuery();
        });
    }
    /**
    *  This function will be executed when we click on Ok button
    */
    onOkclick() {
        this.dialog.close({ corporateId: this.corporateModel.corporateId, corpName: this.corporateModel.corporateName });
    }
    /**
    *  This function will be executed when we click on Cancel button
    */
    onCancelclick() {
        this.dialog.close(null);
    }
    /**
    *  This function will be executed when we select a record in the grid
    */
    onRowClickcorp(event) {
        if (event) {
            this.corporateModel = event;
        } else {
            this.corporateModel = new Corporates();
        }
    }
    /**
    *  This function will be executed when we click on Exit button
    */
    onExitButEvent() {
        this.corpModelTemp = new Corporates();
        this.corpData = [];
    }
    /**
   *  This function will be executed when we change the first block values
   */
    onKeyPressEvent() {
    }
    /**
    *  This function will be executed when we click on Retrieve button
    */
    corpExecuteQuery() {
        this.corpModel = new Corporates();
        if (this.corpModelTemp.corporateName) {
            this.corpModelTemp.corporateName = this.corpModelTemp.corporateName.trim();
            this.corpModelTemp.corporateName = this.corpModelTemp.corporateName === '' ? undefined : this.corpModelTemp.corporateName;
        }
        if (this.corpModelTemp.corporateId) {
            if (String(this.corpModelTemp.corporateId).replace(/\s/g, '').length === 0) {
                this.corpModelTemp.corporateId = undefined;
            }
        }
        if (this.corpModelTemp.corporateName || this.corpModelTemp.corporateId) {
            this.corpModel = this.corpModelTemp;
        } else {
        }
        const corpResult = this.otucpayeFactory.
            corpExecuteQuery(this.corpModel);
        corpResult.subscribe(corpResultList => {
            if (corpResultList.length === 0) {
                this.corpData = [];
                this.show('common.querycausednorecords');
            } else {
                this.selectedRowIndex = 0;
                this.corpData = corpResultList;
                this.corpModel = corpResultList[0];
            }
        });
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg) {
        return this.translateService.translate(msg);
    }

    get exitBtndisabled (): boolean {
        if (this.corpModelTemp.corporateName || this.corpModelTemp.corporateId ||
             this.corpModelTemp.telephoneNo || this.corpData.length > 0) {
            return false;
        } else {
            return true;
        }
    }


}
