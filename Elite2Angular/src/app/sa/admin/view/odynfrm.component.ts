import { OdynfrmService } from './../service/odynfrm.service';
import { TranslateService } from '@common/translate/translate.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsBuilderBean } from '@core/ui-components/dynamic-forms/forms-builder-bean';
import { OdynfrmCommitBean } from '../beans/OdynfrmCommitBean';
@Component({
    selector: 'app-odynfrm',
    templateUrl: './odynfrm.component.html'
})

export class OdynfrmComponent implements OnInit {
    @ViewChild('grid') grid;
    msgs: any;
    dynamicFormsDef: any[];
    dynamicFormsList: Array<FormsBuilderBean> = [];
    selectedIdx = 0;
    odynfrmCommitModel: OdynfrmCommitBean = new OdynfrmCommitBean();
    selectedRow: any;
    msglist: any[];
    constructor(public translateService: TranslateService, private odynfrmService: OdynfrmService) {

    }
    ngOnInit() {
        this.loadFormbuilderData();
        this.dynamicFormsDef = [
            {
                fieldName: this.translateService.translate('Module'),
                field: 'moduleName', datatype: 'text', editable: true, width: 150,
                cellEditable: this.isNewRecord
            },
            {
                fieldName: this.translateService.translate('Form Name'),
                field: 'formName', datatype: 'text', editable: true, width: 150,
                cellEditable: this.isNewRecord
            },
            {
                fieldName: this.translateService.translate('Form Identifier(s)'),
                uppercase: 'false', field: 'formIdentifier', datatype: 'text', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('Edit'),
                field: 'checkoutButton', datatype: 'hyperlink',displayas: 'image',
                editable: false, link: '/FRMBLDR' ,width: 100,
                data: 'row',modal: false, onLaunchClick: this.onEditLaunchClick

            },
            {
                fieldName: this.translateService.translate('Preview'),
                field: 'viewButton', datatype: 'hyperlink',displayas: 'image',
                editable: false, link: '/FRMRENDER' ,width: 100,
                data: 'row',modal: false, onLaunchClick: this.onEditLaunchClick
            },
        ]
    }
    onEditLaunchClick = (data) => {
        if (data) {
            this.selectedRow = data;
            this.odynfrmService.formData = data;
        }
        return true;
    }
    isNewRecord = (data: any, index: number, field: string): boolean => {
        if (data.formId) {
            return false;
        } else {
            return true;
        }
    }
    loadFormbuilderData(){
        this.odynfrmService.loadFormbuilderData().subscribe(data => {
            if(data.length>0){
                this.dynamicFormsList = data;
                this.dynamicFormsList.forEach(obj=>{
                    // obj['checkoutBtnTitle']=this.translateService.translate("Edit");
                    // obj['link'] = '/OCMPCONF';
                    obj['checkoutButton'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
                    obj['viewButton'] = 'assets/icons/eye_view_24dp.svg';
                    // obj['checkoutBtnModal'] = true;
                })
            } else {
                //No Data Found
            }
        });
    }
    ocdbreciSavealertForm(event, moduleName) {
        /* const isValid = this.validateRowsData(this.dynamicFormsList);
        if (!isValid) {
            return;
        } */
        this.odynfrmCommitModel.insertList = event.added;
        this.odynfrmCommitModel.updateList = event.updated;
        this.odynfrmCommitModel.deleteList = event.removed;
        this.odynfrmService.commitformData(this.odynfrmCommitModel)
        .subscribe(data => {
            if(data > 0){
                this.show('success','Data Saved Successfully');
                this.loadFormbuilderData();
            } else {
                this.show('error','Unable to save Data');
                // fail
            }
        });
    }
    onGridClear = () => {
        const res = this.grid.gridOptions.api.applyTransaction({ remove: [this.selectedRow] });
        const index = this.dynamicFormsList.indexOf(this.selectedRow);
        this.dynamicFormsList.splice(index, 1);
        this.grid.btnSavebtnDisable = this.grid.isSaveDisabled();
        if (this.dynamicFormsList.length === 0) {
            return true;
        } if (this.dynamicFormsList[index]) {
            this.selectedIdx = index;
        } else {
            this.selectedIdx = index - 1;
        }
        return false;
    }
    
    show(type, message) {
        this.msglist = [];
        this.msglist.push({ message: message, type: type });
        this.msgs = [...this.msglist];
    }
}