import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
import { Addresses } from '@inst/demographics-biometrics/beans/Addresses';
import { OffenderContactPersons } from '@inst/demographics-biometrics/beans/OffenderContactPersons';
import { RpOtherOccupants } from '@inst/inquiries/beans/RpOtherOccupants';
import { RpOtherOccupantsCommitBean } from '@inst/inquiries/beans/RpOtherOccupantsCommitBean';
import { OidrplanService } from '@inst/movement-external/service/oidrplan.service';
import { GridComponent, ValidateRowReturn } from '@ui-components/grid/grid.component';

@Component({
selector: 'app-ocuoccup',
templateUrl: './ocuoccup.component.html'
})

export class OcuoccupComponent implements OnInit {
checkDataFlag: boolean;
personId: any;
contactPersonsData: OffenderContactPersons[] = [];
checkFlag: boolean;
rpotheroccupantsCommitModel: RpOtherOccupantsCommitBean = new RpOtherOccupantsCommitBean();
rowLength: number;
actionName: string;
@ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
@ViewChild('grid', {static: true}) grid: GridComponent;
lovModel: any[];
msgs: any[] = [];
nameOfLovPage: string;
listToCompare: any[] = [];
rpotheroccupantsData: RpOtherOccupants [] = [];
rpotheroccupantsDataTemp: RpOtherOccupants[] = [];
rpotheroccupantsModel: RpOtherOccupants = new RpOtherOccupants();
rpotheroccupantsIndex = -1;
rpotheroccupantsInsertList: RpOtherOccupants[] = [];
rpotheroccupantsUpdatetList: RpOtherOccupants[] = [];
rpotheroccupantsDeleteList: RpOtherOccupants[] = [];
display: boolean;
errorMessage: string;
headerMessage: string;
disabled: boolean;
type = 'error';
msglist = [];
message = ' Invalid.';
rpOtherOccupantsColumnDef: any[];
rgcontactedRg: any[] = [];
rgpersonnameRg: any[] = [];
rgcontacttypesRg: any[] = [];
rgrelationshipsRg: any[] = [];
contactPersonTitles = { offenderContactPersonId: 'code', /* description: 'description',*/ lastName: 'Name' ,
               contactType: 'contactType', relationshipType: 'relationshipType', age: 'age', contactPhone: 'contactPhone', format: 'format'};
contactPersonMap: Map<number, any> = new Map();
option = [{ id: 'Y', text: 'Yes' }, { id: 'N', text: 'No' }];
selectedFormat: any;
constructor(private oidrplanFactory: OidrplanService,
    public dialogService: DialogService, public translateService: TranslateService,
    private sessionManager: UserSessionManager) {
this.rpOtherOccupantsColumnDef = [];
}
ngOnInit() {
        this.rpOtherOccupantsColumnDef = [
            {
                fieldName: this.translateService.translate( 'common.name' ) + '*', field: 'personName', width: 150
            },
            {
                fieldName: '', field: 'button', datatype: 'launchbutton', data: 'row',
                width: 100, updateField: 'row', dialogWidth: 70, modal: true, editable: true, onLaunchClick: this.viewLaunchClick
            },
            {
                fieldName: this.translateService.translate( 'ocuoccup.contacttype' ) + '*', field: 'contactType',
                editable: true, width: 150, required: true,
                datatype: 'lov', link: 'oidrplan/rgContactTypesRecordGroup', cellEditable: this.canNameEdit
            },
            {
                fieldName: this.translateService.translate( 'ocuoccup.relationship' ) + '*' , field: 'relationshipType',
                editable: true, width: 150, required: true,
                datatype: 'lov', /* domain:'CONTACTS' */link: 'oidrplan/rgRelationshipsRecordGroup?contactCode=', parentField: 'contactType',
                cellEditable: this.canNameEdit
            },
            {
                fieldName: this.translateService.translate( 'common.age' ), field: 'age', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate( 'ocuoccup.contacted' ), field: 'contactedFlag',
                datatype: 'lov', link: 'oidrplan/rgContactedRecordGroup', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate( 'ocuoccup.phoneFormat' ), field: 'format', editable: true, width: 200,
                datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true
            },
            {
                fieldName: this.translateService.translate( 'ocuoccup.contactphone' ), field: 'contactPhone',
                datatype: 'phone', editable: true, width: 150, formatType: this.selectedFormat, required: true
            },
            { fieldName: this.translateService.translate( 'ocuoccup.ext' ), field: 'extNo', editable: true, width: 150,datatype:'text', maxlength: 7 },
            { fieldName: this.translateService.translate( 'common.comment' ), field: 'rpComment', editable: true, width: 150,datatype:'text', maxlength: 240 },
            {
                fieldName: this.translateService.translate( 'ocuoccup.primary' ), field: 'primaryFlag', editable: true,
                 datatype: 'checkbox', cellEditable: this.canPrimaryEdit, width: 150
            },
            {
                fieldName: '', field: 'personId', hide: true
            },
        ];
        this.contactPersonValue();
        // this.rpotheroccupantsExecuteQuery();
        const rgPersonNameObj = this.oidrplanFactory.rgPersonNameRecordGroup( this.dialog.data.offenderBookId );
        rgPersonNameObj.subscribe( list1 => {
            if ( list1 ) {
                this.contactPersonsData = list1;
            } else {
                this.contactPersonsData = [];
            }
        } );
    }
    onRowClickrpotheroccupants(event) {
        this.rpotheroccupantsModel = event;
    }
     ok() {
    }
     no() {
    }
     cancel() {
        this.dialog.close( null );
    }
    contactPersonValue() {
        this.oidrplanFactory.rgPersonNameRecordGroup(this.dialog.data.offenderBookId)
        .subscribe(listValue => {
            if (listValue && listValue.length > 0) {
                listValue.forEach ( element => {
                    this.contactPersonMap.set(element.offenderContactPersonId, {'personName': element.lastName,
                    'contactType': element.contactType, 'format': element.format, 'contactPhone': element.contactPhone,
                    'relationshipType': element.relationshipType, 'age': element.age, 'personId': element.personId} );
                });
                this.rpotheroccupantsExecuteQuery();
            }
        });
    }
    canNameEdit = ( data: any, index: number, field: string, originalIndex: number ): boolean => {
        if ( this.rowLength <= originalIndex ) {
            if ( !data.personId && field === 'contactType' ) {
                return false;
            }
            return true;
        } /* else {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.fieldisprotectedagainstupdate' );
            this.show();
            return false;
        } */

    }

    canPrimaryEdit = ( data: any, index: number, field: string, originalIndex: number ): boolean => {
        for ( let i = 0; i < this.rpotheroccupantsData.length; i++ ) {
            if (index !== i ) {
                this.rpotheroccupantsData[i]['primaryFlag'] = undefined;
            }
        }
        return true;
    }

    /*
    * this method is called when checkBox is changed.
    */
    whenCheckBoxChange = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = this.rpotheroccupantsData.indexOf(event.data);
        if (event.field === 'primaryFlag' && event.newValue !== event.oldValue) {
            if (event.data) {
                if (event.data.primaryFlag) {
                    for ( let i = 0; i < this.rpotheroccupantsData.length; i++ ) {
                        if ( index !== i && event.data.primaryFlag === true ) {
                            this.rpotheroccupantsData[i]['primaryFlag'] = undefined;
                        }
                    }
                    rowdata.validated = true;
                } else {
                    this.rpotheroccupantsData[index]['primaryFlag'] = undefined;
                    event.data.primaryFlag = undefined;
                }
                return rowdata;
            }
            return rowdata;
        }
    }

    onOccupentsInsert = () => {
        for (let i = 0; i < this.rpotheroccupantsData.length; i++) {
            if (!this.rpotheroccupantsData[i].personId) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoccup.namemustbeentered');
                this.show();
                return;
            }
        }
        return { button: '..', contactedFlag: 'N', 'personName' : '', offenderContactPersonId: undefined,
                'contactType': undefined, 'relationshipType': undefined,
                'age': undefined, offenderBookId: this.dialog.data.offenderBookId, 'personId': undefined };
    }

    onOffenderChange(offender) {
    }
    rpotheroccupantsExecuteQuery() {
        this.rowLength = 0;
        this.rpotheroccupantsModel = new RpOtherOccupants();
        this.rpotheroccupantsModel.releasePlanId = this.dialog.data.releasePlanId;
        if ( this.rpotheroccupantsModel.releasePlanId ) {
                 const rpotheroccupantsResult = this.oidrplanFactory.rpOtherOccupantsExecuteQuery(this.rpotheroccupantsModel);
                     rpotheroccupantsResult.subscribe(rpotheroccupantsResultList => {
                    if (rpotheroccupantsResultList.length === 0) {
                        this.rpotheroccupantsData = [];
                    } else {
                        rpotheroccupantsResultList.forEach(data => {
                            const dataval = this.contactPersonMap.get(data.offenderContactPersonId);
                            data['personName'] = dataval.personName;
                            data['contactType'] = dataval.contactType;
                            data['relationshipType'] = dataval.relationshipType;
                            data['age'] = dataval.age;
                            data['format'] = data.format;
                            data['contactPhone'] = data.contactPhone;
                            data['personId'] = dataval.personId;
                            data['button'] = '';
                            data.primaryFlag = data.primaryFlag === 'Y' ? 'true' : undefined;
                        });
                        this.rowLength = rpotheroccupantsResultList.length;
                        this.rpotheroccupantsData = rpotheroccupantsResultList;
                        this.rpotheroccupantsIndex = 0;
                        this.rpotheroccupantsModel = rpotheroccupantsResultList[0];
                    }
            });
        }
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */

     gridClear =() =>{
        this.contactPersonValue();
        this.rpotheroccupantsExecuteQuery();
        return true;
     }
    ocuoccupSaverpotheroccupantsForm(event) {
// TODO declare commit bean and add insert list to that object.
        this.checkFlag = false;
        this.rpotheroccupantsInsertList = event.added;
        this.rpotheroccupantsUpdatetList = event.updated;
        this.rpotheroccupantsDeleteList = event.removed;
        this.rpotheroccupantsCommitModel.insertList = [];
        this.rpotheroccupantsCommitModel.updateList = [];
        this.rpotheroccupantsCommitModel.deleteList = [];
        this.rpotheroccupantsCommitModel.addressesBean = new Addresses();
        this.rpotheroccupantsCommitModel.addressesBean.addressId = this.dialog.data.addressId;
        const formattedNumber = PhoneNumberUtils.phoneFormat.replace(/[- )(]/g,'');
        for (const gridrow of this.rpotheroccupantsData ) {
            if ( !gridrow.personName ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoccup.namemustbeentered');
                this.show();
                return;
            }
            // if ( !gridrow.personId ) {
            //         this.type = 'warn';
            //         this.message = this.translateService.translate('ocuoccup.namemustbeentered');
            //         this.show();
            //         return;
            // }
            if ( !gridrow.contactType ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdperso.contacttypemust');
                this.show();
                return;
            }
            if ( !gridrow.relationshipType ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdperso.relationshipmust');
                this.show();
                return;
            }
            if (gridrow.primaryFlag &&  String(gridrow.primaryFlag) === 'true') {
                this.checkFlag = true;
            }
        }
        if ( !this.checkFlag ) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocuoccup.atleastoneoccupantshouldbechecked');
            this.show();
            return;
        }
        if ( this.rpotheroccupantsInsertList.length > 0 || this.rpotheroccupantsUpdatetList.length > 0 ) {
            for ( let i = 0; i < this.rpotheroccupantsInsertList.length; i++ ) {
            if ( !this.rpotheroccupantsInsertList[i].format ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoccup.namemustbeentered');
                this.show();
                return;
            }
            if ( !this.rpotheroccupantsInsertList[i].personName ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoccup.namemustbeentered');
                this.show();
                return;
            }
            // if ( !this.rpotheroccupantsInsertList[i].personId ) {
            //         this.type = 'info';
            //         this.message = this.translateService.translate('ocuoccup.namemustbeentered');
            //         this.show();
            //         return;
            // }
            if ( this.rpotheroccupantsInsertList[i].contactPhone ) {
                const phoneNo = this.rpotheroccupantsInsertList[i].contactPhone;
                const formattedNumber=PhoneNumberUtils.getFormattedNumber(this.rpotheroccupantsInsertList[i].format, phoneNo).replace(/[- )(]/g,'');
                const selectedFormat = PhoneNumberUtils.contactType.find(x => this.rpotheroccupantsInsertList[i].format === x.maskingCode);
                if (!(phoneNo.length === formattedNumber.length) && this.rpotheroccupantsInsertList[i].format != 'UNF' ) {
                    if (String(phoneNo).length >= 1 && formattedNumber.length) {
                      this.message = this.translateService.translate
                          ('common.fieldmustbeform').replace('%format%', selectedFormat.maskFormat);
                      this.show();
                      return false;
                    } else if (((String(phoneNo).length > 0 && !formattedNumber))){
                        return true;
                    }
                  }
                // if (!(String(phoneNo).length === formattedNumber.length)) {
                //     this.type = 'warn';
                //     this.message = this.translateService.translate
                //     ('common.fieldmustbeform').replace('%format%', PhoneNumberUtils.phoneFormat);
                //     this.show();
                //     return;
                // }
            }
            if ( !this.rpotheroccupantsInsertList[i].offenderContactPersonId ) {
                this.rpotheroccupantsCommitModel.addressesBean.commentText = 'NEW_CONTACT';
                this.rpotheroccupantsCommitModel.addressesBean.offenderBookId = this.dialog.data.offenderBookId;
            }
            if ( !this.rpotheroccupantsInsertList[i].createDatetime ) {
                this.rpotheroccupantsInsertList[i].createDatetime =  DateFormat.getDate();
                }
            if ( !this.rpotheroccupantsInsertList[i].createUserId ) {
                this.rpotheroccupantsInsertList[i].createUserId =  this.sessionManager.getId();
                }
            if ( !this.rpotheroccupantsInsertList[i].releasePlanId ) {
                this.rpotheroccupantsInsertList[i].releasePlanId = this.dialog.data.releasePlanId;
            }
            if ( String(this.rpotheroccupantsInsertList[i].primaryFlag) === 'true' ) {
                this.rpotheroccupantsInsertList[i].primaryFlag =  'Y';
               } else {
                    this.rpotheroccupantsInsertList[i].primaryFlag =  'N';
                }
            }
             for ( let i = 0; i < this.rpotheroccupantsUpdatetList.length; i++ ) {
                 if (this.rpotheroccupantsUpdatetList[i].contactPhone) {
                    const phoneNo = this.rpotheroccupantsUpdatetList[i].contactPhone;
                    const formattedNumber=PhoneNumberUtils.getFormattedNumber(this.rpotheroccupantsUpdatetList[i].format, phoneNo).replace(/[- )(]/g,'');
                    const selectedFormat = PhoneNumberUtils.contactType.find(x => this.rpotheroccupantsUpdatetList[i].format === x.maskingCode);
                    if (!(phoneNo.length === formattedNumber.length) && this.rpotheroccupantsUpdatetList[i].format != 'UNF' ) {
                        if (String(phoneNo).length >= 1 && formattedNumber.length) {
                        this.message = this.translateService.translate
                            ('common.fieldmustbeform').replace('%format%', selectedFormat.maskFormat);
                        this.show();
                        return false;
                        } else if (((String(phoneNo).length > 0 && !formattedNumber))){
                            return true;
                        }
                    }
                    //  if (!(String(phoneNo).length === formattedNumber.length)) {
                    //      this.type = 'warn';
                    //      this.message = this.translateService.translate
                    //      ('common.fieldmustbeform').replace('%format%', PhoneNumberUtils.phoneFormat);
                    //      this.show();
                    //      return;
                    //  }
                 }
                this.rpotheroccupantsUpdatetList[i].modifyUserId = this.sessionManager.getId();
                this.rpotheroccupantsUpdatetList[i].modifyDatetime = DateFormat.getDate();
                if ( String(this.rpotheroccupantsUpdatetList[i].primaryFlag) === 'true' ) {
                    this.rpotheroccupantsUpdatetList[i].primaryFlag =  'Y';
                    } else {
                        this.rpotheroccupantsUpdatetList[i].primaryFlag =  'N';
                    }
                }
        this.rpotheroccupantsCommitModel.insertList = this.rpotheroccupantsInsertList;
        this.rpotheroccupantsCommitModel.updateList = this.rpotheroccupantsUpdatetList;
            }
        if ( this.rpotheroccupantsDeleteList.length !== 0 ) {
             for ( let i = 0; i < this.rpotheroccupantsDeleteList.length; i++ ) {
             }
        this.rpotheroccupantsCommitModel.deleteList = this.rpotheroccupantsDeleteList;
        }
        const rpotheroccupantsSaveData = this.oidrplanFactory.rpOtherOccupantsCommit( this.rpotheroccupantsCommitModel );
        rpotheroccupantsSaveData.subscribe( data => {
         if ( data === 1 ) {
            this.type = 'success';
            this.rpotheroccupantsData = data;
            this.contactPersonValue();
            this.rpotheroccupantsExecuteQuery();
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
        }
            });
    }

    validateRpOtherOccupants = (event) => {
        const formattedNumber = PhoneNumberUtils.phoneFormat.replace(/[- )(]/g,'');
        const rowdata = new ValidateRowReturn();
        const personId = event.data.personId;
        this.checkDataFlag = false;
        const index = event.rowIndex;
        // if (event.field === 'contactPhone' && event.newValue !== event.oldValue) {
        //     if (event.data.contactPhone) {
        //         if (!(String(event.data.contactPhone).length === formattedNumber.length)) {
        //             this.type = 'warn';
        //             this.message = this.translateService.translate
        //             ('common.fieldmustbeform').replace('%format%', PhoneNumberUtils.phoneFormat);
        //             this.show();
        //         }
        //     }
        // }
        if (event && event.newValue !== event.oldValue && event.newValue){
            if (event.field === 'format') {
                this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
                PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
                this.grid.setColumnData('contactPhone', index, null);
            }
        }
        if ( event.field === 'personName' ) {
            // for ( let i = 0; i < this.contactPersonsData.length; i++ ) {
            //     if ( event.newValue === this.contactPersonsData[i].lastName ) {
            //         rowdata.validated = true;
            //         this.checkDataFlag = true;
            //         if ( !this.personId ) {
            //             this.personId = this.contactPersonsData[i].personId;
            //         }
            //         rowdata.data = {
            //             personName: this.contactPersonsData[i].lastName,
            //             contactType: this.contactPersonsData[i].contactType,
            //             personId: this.personId,
            //             relationshipType: this.contactPersonsData[i].relationshipType,
            //             age: this.contactPersonsData[i].age
            //         };
            //         return rowdata;
            //     }
            // }
           /*  if ( !event.data.personId ) {
                this.dialogService.openLinkDialog( '/ocuoccupnamedlg', event.data ).subscribe( result => {
                    this.grid.setColumnData('personName', index, result.personName);
                    this.grid.setColumnData('contactType', index, result.contactType);
                    this.grid.setColumnData('relationshipType', index, result.relationshipType);
                    this.grid.setColumnData('age', index, result.age);
                    this.grid.setColumnData('personId', index, result.personId);
                } );
                rowdata.validated = true;
                return rowdata;
            } */
        }
        rowdata.validated = true;
        return rowdata;
    }
    /**
    * This function displays the messages
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    viewLaunchClick = (event) => {
        this.dialogService.openLinkDialog( '/ocuoccupnamedlg', event, 80 ).subscribe( result => {
            const rowIndx = this.rpotheroccupantsData.indexOf(event);
            if (event && result && event.personId != result.personId) {
                this.grid.setColumnData('format', rowIndx, result.format);
                this.grid.setColumnData('personName', rowIndx, result.personName);
                this.grid.setColumnData('contactType', rowIndx, result.contactType);
                this.grid.setColumnData('relationshipType', rowIndx, result.relationshipType);
                this.grid.setColumnData('age', rowIndx, result.age);
                this.grid.setColumnData('personId', rowIndx, result.personId);
            }
        } );
    }
}
