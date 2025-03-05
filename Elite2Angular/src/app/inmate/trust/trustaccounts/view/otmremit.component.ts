import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmremitService } from '../service/otmremit.service';
import { Remitters } from '@inmatetrustaccountsbeans/Remitters';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { SystemProfilesCommitBean } from '@saadminbeans/SystemProfilesCommitBean';
import { RemittersCommitBean } from '@inmatetrustaccountsbeans/RemittersCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
//  import required bean declarations

@Component({
    selector: 'app-otmremit',
    templateUrl: './otmremit.component.html'
})

export class OtmremitComponent implements OnInit {
    countryCode: any;
    proveCode: any;
    //  Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid') grid: any;
    actionName: string;
    msgs: any[] = [];
    remData: Remitters[] = [];
    remDataTemp: Remitters[] = [];
    remModel: Remitters = new Remitters();
    remInsertList: Remitters[] = [];
    remUpdateList: Remitters[] = [];
    remDeleteList: Remitters[] = [];
    rem1Data: Remitters[] = [];
    rem1DataTemp: Remitters[] = [];
    rem1Model: Remitters = new Remitters();
    rem1ModelTemp: Remitters = new Remitters();
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdateList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    remColumnDef: any[];
    remReadOnly = false;
    rem1ReadOnly = false;
    remCommitModel: RemittersCommitBean = new RemittersCommitBean();
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    syspflCommitModel: SystemProfilesCommitBean = new SystemProfilesCommitBean();
    selectedRowndex: number;
    remModelTemp: Remitters = new Remitters();
    isRetrieveDis:boolean;
    lastNameReadOnly:boolean;
    firstNameReadOnly:boolean;
    middleNameReadOnly:boolean;
    rowIndex: any;
    constructor(private otmremitFactory: OtmremitService,
        public translateService: TranslateService,
        public dialogService: DialogService) {
        //  TODO initilize data members here..!
        this.remColumnDef = [];
    }
    ngOnInit() {
        this.selectedRowndex = 0;
        this.remColumnDef = [
            {
                fieldName: this.translateService.translate('common.lastname') + ' * ', field: 'lastName', editable: true, width: 150,
                maxlength: 35, datatype: 'text', required: true
            },
            {
                fieldName: this.translateService.translate('common.firstname') + ' * ', field: 'firstName', editable: true, width: 150,
                maxlength: 35, datatype: 'text', required: true
            },
            {
                fieldName: this.translateService.translate('common.middlename'), field: 'middleName', editable: true, width: 150,
                maxlength: 30, datatype: 'text'
            },
            { fieldName: this.translateService.translate('common.Orca2'), field: 'remitterId', editable: false, width: 150 },
            { fieldName:" ", field: 'isedited', hide: true },            
        ];
        const serviceData = this.otmremitFactory.
        getCodes();
        serviceData.subscribe(data => {
        if (data) {
            this.proveCode = data[0].code;
            this.countryCode = data[0].description;
        } else {
            this.proveCode = undefined;
            this.countryCode = undefined;
        }
    });
    this.otmremitexecuteQuery();
    }
    /**
   *  This function will be executed when we select a record in Remitters block
   */
    onRowClickrem(event) {
        const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
		this.rowIndex = node.rowIndex;
        if (event) {
            // this.remModelTemp = event;
            // if (this.grid.updatedMap.size > 0 || this.grid.addedMap.size > 0 || this.grid.removedMap.size > 0) {
            //     const data = {
            //         label: this.translateService.translate('common.doyouwanttosavechanges'), yesBtn: true, noBtn: true
            //     };
            //     this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
            //         if (result) {
            //             this.grid.onSave(null);
            //         } else {
            //         }
            //     });
            // }
            // this.otmremitsexecuteQuery();
            this.rem1Model = event;
            this.rem1ModelTemp = JSON.parse(JSON.stringify(event));
            if (!event.remitterId) {
                this.rem1Model.provStateCode = this.proveCode;
                this.rem1Model.countryCode = this.countryCode;
            }
        } else {
            this.rem1Model = new Remitters();
        }
    }
    /**
     *  This function will be executed when we click on Ok button
     */
    onOkclick() {
        if (this.grid.updatedMap.size > 0 || this.grid.addedMap.size > 0 || this.grid.removedMap.size > 0) {
            const data = {
                label: this.translateService.translate('common.doyouwanttosavechanges'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                if (result) {
                    this.grid.onSave(null);
                    this.dialog.close({
                        name: this.rem1Model.firstName + ' ' + this.rem1Model.lastName,
                        remitterId: this.rem1Model.remitterId,
                        firstName: this.rem1Model.firstName,
                        lastName: this.rem1Model.lastName,
                    });
                } else {
                    this.dialog.close({
                        name: this.rem1Model.firstName + ' ' + this.rem1Model.lastName,
                        remitterId: this.rem1Model.remitterId,
                        firstName: this.rem1Model.firstName,
                        lastName: this.rem1Model.lastName,
                    });
                }
            });
        } else {
            this.dialog.close({ name: this.rem1Model.firstName + ' ' + this.rem1Model.lastName,
                                remitterId: this.rem1Model.remitterId,
                                firstName: this.rem1Model.firstName,
                                lastName: this.rem1Model.lastName,
                             });
        }
    }
    /**
   *  This function will be executed when we click on Cancel button
   */
    onCancelclick() {
        if (this.grid.updatedMap.size > 0 || this.grid.addedMap.size > 0 || this.grid.removedMap.size > 0) {
            const data = {
                label: this.translateService.translate('common.doyouwanttosavechanges'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                if (result) {
                    this.grid.onSave(null);
                    this.dialog.close(null);
                } else {
                    this.dialog.close(null);
                }
            });
        } else {
            this.dialog.close(null);
        }
    }
    /**
    *  This function will be executed when we click on Clear button
    */
    onclear() {
        this.remModel = new Remitters();
        this.remData = [];
        this.isRetrieveDis=false;
        this.lastNameReadOnly=false;
        this.firstNameReadOnly=false;
        this.middleNameReadOnly=false;

    }
    /**
    *  This function will be executed when we change the values in rem1 block
    */
    onChange(event) {
        if(this.rem1ModelTemp[event] != this.rem1Model[event]){
            this.grid.setColumnData('isedited', this.rowIndex, true);
        }
    }
    /**
     *  This function will be executed to display messages
     */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg) {
        return this.translateService.translate(msg);
    }
    /**
    *  This function will be executed to Retrieve Remitters block data
    */
    otmremitexecuteQuery() {
        if (this.remModel.lastName) {
            this.remModel.lastName = this.remModel.lastName.trim();
            this.remModel.lastName = this.remModel.lastName === '' ? undefined : this.remModel.lastName;
        }
        if (this.remModel.firstName) {
            this.remModel.firstName = this.remModel.firstName.trim();
            this.remModel.firstName = this.remModel.firstName === '' ? undefined : this.remModel.firstName;
        }
        if (this.remModel.middleName) {
            this.remModel.middleName = this.remModel.middleName.trim();
            this.remModel.middleName = this.remModel.middleName === '' ? undefined : this.remModel.middleName;
        }
        if (this.remModel.lastName || this.remModel.firstName || this.remModel.middleName) {
        } else {
            this.remModel = new Remitters();
        }
        const serviceObj = this.otmremitFactory.
            remExecuteQuery(this.remModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.remData = [];
                this.show('common.querycausednorecords');
            } else {
                this.remData = data;
                this.selectedRowndex = 0;
                this.isRetrieveDis=true;
                this.lastNameReadOnly=true;
                this.firstNameReadOnly=true;
                this.middleNameReadOnly=true;
            }
        });
    }
    otmremitsexecuteQuery() {
        const serviceObj = this.otmremitFactory.
            remitExecuteQuery(this.remModelTemp);
        serviceObj.subscribe(data => {
            if (data === 0) {
            } else {
                this.rem1Model = data;
            }
        });
    }
   
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmremitSaveremForm(event) {
        this.remInsertList = [];
        this.remUpdateList = [];
        this.remDeleteList = [];
        this.remInsertList = event.added;
        this.remUpdateList = event.updated;
        this.remDeleteList = event.removed;
        this.remCommitModel.insertList = [];
        this.remCommitModel.updateList = [];
        this.remCommitModel.deleteList = [];
        if (this.remInsertList.length > 0 || this.remUpdateList.length > 0) {
            for (let i = 0; i < this.remInsertList.length; i++) {
                if (!this.remInsertList[i].lastName || this.remInsertList[i].lastName.replace(/\s/g, '').length === 0) {
                    this.show('common.lastnamemustbeentered');
                    return;
                } else {
                    this.remInsertList[i].lastName = this.remInsertList[i].lastName.trim();
                }
                if (!this.remInsertList[i].firstName || this.remInsertList[i].firstName.replace(/\s/g, '').length === 0) {
                    this.show('common.firstnamemustbeentered');
                    return;
                }
            }
            for (let i = 0; i < this.remUpdateList.length; i++) {
                if (!this.remUpdateList[i].lastName || this.remUpdateList[i].lastName.replace(/\s/g, '').length === 0) {
                    this.type = 'info';
                    this.show('common.lastnamemustbeentered');
                    return;
                } else {
                    this.remUpdateList[i].lastName = this.remUpdateList[i].lastName.trim();
                }
                if (!this.remUpdateList[i].firstName || this.remUpdateList[i].firstName.replace(/\s/g, '').length === 0) {
                    this.show('common.firstnamemustbeentered');
                    return;
                }
            }
            this.remCommitModel.insertList = this.remInsertList;
            this.remCommitModel.updateList = this.remUpdateList;
        }
        if (this.remDeleteList.length > 0) {
            for (let i = 0; i < this.remDeleteList.length; i++) {
            }
            this.remCommitModel.deleteList = this.remDeleteList;
        }
        const remSaveData = this.otmremitFactory.remCommit(this.remCommitModel);
        remSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.otmremitexecuteQuery();
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });
    }
    syspflExecuteQuery() {
        const syspflResult = this.otmremitFactory.
            sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmremitSavesyspflForm(event) {
        //  TODO declare commit bean and add insert list to that object.
        this.syspflInsertList = event.added;
        this.syspflUpdateList = event.updated;
        this.syspflDeleteList = event.removed;
        this.syspflCommitModel.insertList = [];
        this.syspflCommitModel.updateList = [];
        this.syspflCommitModel.deleteList = [];
        if (this.syspflInsertList.length > 0 || this.syspflUpdateList.length > 0) {
            for (let i = 0; i < this.syspflInsertList.length; i++) {
            }
            for (let i = 0; i < this.syspflUpdateList.length; i++) {
            }
            this.syspflCommitModel.insertList = this.syspflInsertList;
            this.syspflCommitModel.updateList = this.syspflUpdateList;
        }
        if (this.syspflDeleteList.length > 0) {
            for (let i = 0; i < this.syspflDeleteList.length; i++) {
            }
            this.syspflCommitModel.deleteList = this.syspflDeleteList;
        }
        const syspflSaveData = this.otmremitFactory.sysPflCommit(this.syspflCommitModel);
        syspflSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });
    }

    get clearBtndisabled (): boolean {
        if ((this.remModel && (this.remModel.lastName || this.remModel.firstName || this.remModel.middleName)) || this.remData.length > 0) {
            return false;
        }
        return true;
    }

    get readOnlyFlag (): boolean {
        if (this.remData && this.remData.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    onGridInsert =  () => {
        if (this.onSaveValid(this.remData)) {
            return {};
        } else {
            return null;
        }

    }

    onSaveValid(dataList: any[]) {
        const isValidate = {valid: true};
        dataList.forEach(ele => {
            if (!ele.lastName) {
                this.show('common.lastnamemustbeentered');
                isValidate.valid = false;
                return;
            }
            if (!ele.firstName) {
                this.show('common.firstnamemustbeentered');
                isValidate.valid = false;
                return;
            }
        });
        return isValidate.valid;
    }

}
