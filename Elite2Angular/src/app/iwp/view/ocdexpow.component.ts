import {
    Component, OnInit,ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdexpowService } from '../service/ocdexpow.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderAssigned } from '../beans/VOffenderAssigned';
import { VOffenderAssignedCommitBean } from '../beans/VOffenderAssignedCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

// import required bean declarations

@Component({
    selector: 'app-ocdexpow',
    templateUrl: './ocdexpow.component.html'
    // styleUrls: ['./ocdexpow.component.css']
})

export class OcdexpowComponent implements OnInit {
    falseNum: number;
    num: number;
    @ViewChild('TransferOffendersGrid') TransferOffendersGrid: any;
    check: boolean;

    // Variable declaration
    msgs: any[] = [];
    voffenderassignedData: VOffenderAssigned[] = [];
    voffenderassignedDataTemp: VOffenderAssigned[] = [];
    voffenderassignedModel: VOffenderAssigned = new VOffenderAssigned();
    voffenderassignedCommitModel: VOffenderAssignedCommitBean = new VOffenderAssignedCommitBean();
    voffenderassignedInsertList: VOffenderAssigned[] = [];
    voffenderassignedUpdatetList: VOffenderAssigned[] = [];
    voffenderassignedDeleteList: VOffenderAssigned[] = [];
    disabled: boolean;
    editable: boolean = true;
    vOffenderAssignedColumnDef: any[];
    vOffenderAssignedReadOnly: boolean = false;
    fromLov: string;
    toLov: string;
    staffMemembers: string;
    firstName: string;
    toReadOnly: boolean;
    staffReadOnly: boolean;
    fromLocation: string;
    toLocation: string;
    staffMemeber: string;
    staffId: any;
    select = -1;
    searchDisabled: boolean;
    clearDisabled: boolean;
    fromReadOnly: boolean;
    chkExtotAll: boolean;
    //  gridupdate: boolean;
    checkDisabled: boolean;
    fromTitle = {
        'description': this.translateService.translate('common.description'),
        'code': this.translateService.translate('From Location')
    };
    toTitle = {
        'description': this.translateService.translate('common.description'),
        'code': this.translateService.translate('To Location')
    };
    stfMembTitle = {
        'description': this.translateService.translate('ocdexpow.surname'),
        'firstName': this.translateService.translate('ocdexpow.firstname')
    };
    constructor(private ocdexpowFactory: OcdexpowService, public translateService: TranslateService,
         public sessionManager: UserSessionManager) {
        // TODO initilize data members here..!
        this.vOffenderAssignedColumnDef = [];

    }
    ngOnInit() {
        this.toReadOnly = true;
        this.staffReadOnly = true;
        this.searchDisabled = false;
        this.clearDisabled = true;
        this.fromReadOnly = false;
        //   this.gridupdate = true;
        this.checkDisabled = true;
        this.fromLov = '/ocdexpow/cgfkExtOtAgyLocIdFromRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.vOffenderAssignedColumnDef = [
            { fieldName: this.translateService.translate('ocdexpow.transfer'), field: 'transferFlag', editable: true, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdexpow.lastname'), field: 'offenderLastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdexpow.firstname'), field: 'offenderFirstName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdexpow.assstaffname'), field: 'staffLastName', editable: false, width: 150 },
            // { fieldName: this.translateService.translate('ocdexpow.firstname'), field: 'staffFirstName', editable: false, width: 150 },
        ];
    }

    /**
  * This function displays the messages
  */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
      *  when option changes This event will fire
     */
    reasonCodeChange(event) {
        if (event && event.code) {
            this.toLov = '/ocdexpow/cgfkExtOtAgyLocIdToRecordGroup?agyLocIdFrom=' + event.code;
            this.staffMemembers = '/ocdexpow/rgStaffMembersRecordGroup?agyLocIdFrom=' + event.code;
            this.toReadOnly = false;
            this.staffReadOnly = false;
            this.clearDisabled = false;
        } else {
            this.toLocation = undefined;
            this.staffMemeber = undefined;
            this.toReadOnly = true;
            this.staffReadOnly = true;
            this.clearDisabled = true;
        }
    }
    /**
      *  when option changes This event will fire 
     */
    staffmemberChange(event) {
        if (event && event.firstName) {
            this.firstName = event.firstName;
            this.staffId = event.code;
        } else {
            this.firstName = undefined;
            this.staffId = undefined;
        }
    }

    onGridClear = () => {
        this.voffenderassignedExecuteQuery();
        //   this.gridupdate = true;
        this.chkExtotAll = undefined;
        return true;
    }

    /**
      *  This function will fetch records from database
     */
    voffenderassignedExecuteQuery() {

        if (!this.fromLocation) {
            this.show('ocdexpow.pleaseenterfromlocation');
            return; //  ocdexpow.
        }
        if (!this.toLocation) {
            this.show('ocdexpow.pleaseentertolocation');
            return;
        }

        if (!this.fromLocation || !this.toLocation) {
            // this.show('ocdexpow.fromandtolocations');
            return;
        }
        if (!this.staffMemeber) {
            this.show('Staff Last Name must be entered.');
            return;
        }
        this.voffenderassignedModel.agyLocId = this.fromLocation;
        this.voffenderassignedModel.sacStaffId = this.staffId;
        const voffenderassignedResult = this.ocdexpowFactory.
            vOffenderAssignedExecuteQuery(this.voffenderassignedModel);
        voffenderassignedResult.subscribe(data => {
            if (data.length === 0) {
                this.voffenderassignedData = [];
                this.checkDisabled = true;
                this.show('common.querycaused');
                return;
            } else {
                for(let i = 0; i < this.vOffenderAssignedColumnDef.length; i++){
                    if (this.vOffenderAssignedColumnDef[i].field === 'staffLastName'){
                      for (let j = 0; j < data.length; j++){
                        data[j]['staffLastName'] = data[j].staffLastName + ', ' + data[j].staffFirstName
                      }
                    }
                  }
                this.voffenderassignedData = data;
                this.voffenderassignedDataTemp = data;
                this.voffenderassignedModel = data[0];
                this.searchDisabled = true;
                this.clearDisabled = false;
                this.toReadOnly = true;
                this.staffReadOnly = true;
                this.fromReadOnly = true;
                this.checkDisabled = false;
                this.select = 0;
            }
        });
    }

    /**
      *  This function is used to clear the grid data
     */
    onClear() {
        this.fromLocation = undefined;
        this.toLocation = undefined;
        this.staffMemeber = undefined;
        this.toReadOnly = true;
        this.staffReadOnly = true;
        this.voffenderassignedData = [];
        this.firstName = undefined;
        this.staffId = undefined;
        this.searchDisabled = false;
        this.clearDisabled = true;
        this.fromReadOnly = false;
        this.checkDisabled = true;
        this.chkExtotAll = false;
    }

    /**
      *  This function will be executed when commit event is
     * fired
     */
    ocdexpowSavevoffenderassignedForm(event) {
        this.voffenderassignedInsertList = event.added;
        this.voffenderassignedUpdatetList = event.updated;
        this.voffenderassignedDeleteList = event.removed;
        this.voffenderassignedCommitModel.insertList = [];
        this.voffenderassignedCommitModel.updateList = [];
        this.voffenderassignedCommitModel.deleteList = [];
        if (this.num === 0) {
            this.show('Please select atleast one offender');
            return;
        }
        if (this.voffenderassignedUpdatetList.length > 0) {
            this.voffenderassignedCommitModel.updateList = this.voffenderassignedData.filter(ele => {
                if (ele.transferFlag) {
                    ele.transferFlag = ele.transferFlag ? 'Y' : 'N';
                    ele.agyLocIdFrom = this.fromLocation;
                    ele.agyIocIdTo = this.toLocation;
                    ele.assStaffId = this.staffId;
                    ele.transferDate = DateFormat.getDate();
                    return true;
                }
            });
        }
        if (this.voffenderassignedDeleteList.length > 0) {
            for (let i = 0; i < this.voffenderassignedDeleteList.length; i++) {
            }
            this.voffenderassignedCommitModel.deleteList = this.voffenderassignedDeleteList;
        }
        const voffenderassignedSaveData = this.ocdexpowFactory.vOffenderAssignedCommit(this.voffenderassignedCommitModel);
        voffenderassignedSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.chkExtotAll = undefined;
                this.voffenderassignedExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.voffenderassignedExecuteQuery();
                return;
            }
        });
    }

    extOtChkboxChange(event) {
        const rowData = this.voffenderassignedData;
        if (event) {
            for (let i = 0; i < rowData.length; i++) {
                this.TransferOffendersGrid.setColumnData('transferFlag', i, event.checked);
                this.check = true;
            }
        } else {
            this.check = false;

            // this.chkExtotAll = null;

        }
        this.voffenderassignedData = rowData;
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = this.voffenderassignedData.indexOf(event.data);
        this.num = 0;
        this.falseNum = 0;
        this.voffenderassignedData.forEach(ele => {
            if (ele.transferFlag) {
                this.num = this.num + 1;
            } else {
                this.falseNum = this.falseNum + 1;
            }
        });
        if (this.num > 0) {
            //   this.gridupdate = false;
        } else {
            //    this.gridupdate = true;
            this.chkExtotAll = undefined;
        }
        if (this.falseNum > 0) {
            this.chkExtotAll = undefined;
        } else {
            this.chkExtotAll = true;
        }

        rowdata.validated = true;
        return rowdata;
    }

    /**
*  This function will be used to when enterd the data in tranaction fee details lov
* fired
*/
    onDeductionBlur() {
        if (!this.fromLocation) {
            this.fromLocation = this.fromLocation === '' ? undefined : '';
        }
    }

    /**
*  This function will be used to when enterd the data in tranaction fee details lov
* fired
*/
    onDeductionBlurOne() {
        if (!this.toLocation) {
            this.toLocation = this.toLocation === '' ? undefined : '';
        }
    }

    /**
*  This function will be used to when enterd the data in tranaction fee details lov
* fired
*/
    onDeductionBlurTwo() {
        if (!this.staffMemeber) {
            this.staffMemeber = this.staffMemeber === '' ? undefined : '';
        }
    }

    // isInsertable() {
    //     if (this.fromLocation) {
    //         this.clearDisabled = false;
    //     } else {
    //         this.clearDisabled = true;
    //     }
    //     if (date || dateOne) {
    //         this.clearDisabled = false;
    //     }
    // }
}
