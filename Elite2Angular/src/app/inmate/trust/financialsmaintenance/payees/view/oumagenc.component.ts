import { PhonesCommitBean } from '@inst/demographics-biometrics/beans/PhonesCommitBean';
import { AddressCommitBean } from '@inst/demographics-biometrics/beans/AddressCommitBean';
import { Addresses } from '@inst/demographics-biometrics/beans/Addresses';
import { InternetAddresses } from '@inst/demographics-biometrics/beans/InternetAddresses';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumagencService } from '../service/oumagenc.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Phones } from '@inst/demographics-biometrics/beans/Phones';
import { VCorporateAddresses } from '@inst/schedules/beans/VCorporateAddresses';
import { Corporates } from '@inmate/trust/trustaccounts/beans/Corporates';
import { InternetAddressesCommitBean } from '@inst/demographics-biometrics/beans/InternetAddressesCommitBean';
import { CorporatesCommitBean } from '@inmate/trust/financialsmaintenance/payees/beans/CorporatesCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn, GridComponent } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
@Component({
    selector: 'app-oumagenc',
    templateUrl: './oumagenc.component.html'
})

export class OumagencComponent implements OnInit {
    @Input() dlgData: any;
    @Input() onSelect: (event: any) => any;
    selectgl: Phones = new Phones();
    selectadph: Phones = new Phones();
    selectInter: InternetAddresses = new InternetAddresses();
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    corpData: Corporates[] = [];
    corpDataTemp: Corporates[] = [];
    corpModel: Corporates = new Corporates();
    corpModelDup: Corporates = new Corporates();
    corpCommitModel: CorporatesCommitBean = new CorporatesCommitBean();
    corpIndex: number;
    corpInsertList: Corporates[] = [];
    corpUpdatetList: Corporates[] = [];
    corpDeleteList: Corporates[] = [];
    addrData: VCorporateAddresses[] = [];
    addrDataTemp: VCorporateAddresses[] = [];
    addrModel: VCorporateAddresses = new VCorporateAddresses();
    addrIndex = -1;
    cropIndex = -1;
    addrInsertList: VCorporateAddresses[] = [];
    addrUpdatetList: VCorporateAddresses[] = [];
    addrDeleteList: VCorporateAddresses[] = [];
    addphData: Phones[] = [];
    addphDataTemp: Phones[] = [];
    addphCommitModel: PhonesCommitBean = new PhonesCommitBean();
    addphModel: Phones = new Phones();
    addphIndex: number;
    addphInsertList: Phones[] = [];
    addphUpdatetList: Phones[] = [];
    addphDeleteList: Phones[] = [];
    corphoneData: Phones[] = [];
    corphoneDataTemp: Phones[] = [];
    corphoneModel: Phones = new Phones();
    corphoneIndex: number;
    corphoneInsertList: Phones[] = [];
    corphoneUpdatetList: Phones[] = [];
    corphoneDeleteList: Phones[] = [];
    iaddCommitModel: InternetAddressesCommitBean = new InternetAddressesCommitBean();
    iaddData: InternetAddresses[] = [];
    iaddDataTemp: InternetAddresses[] = [];
    iaddModel: InternetAddresses = new InternetAddresses();
    iaddIndex: number;
    iaddInsertList: InternetAddresses[] = [];
    iaddUpdatetList: InternetAddresses[] = [];
    iaddDeleteList: InternetAddresses[] = [];
    addressesCommitModel: AddressCommitBean = new AddressCommitBean();
    addressesData: Addresses[] = [];
    addressesDataTemp: Addresses[] = [];
    addressesModel: Addresses = new Addresses();
    addressesIndex: number;
    addressesInsertList: Addresses[] = [];
    addressesUpdatetList: Addresses[] = [];
    addressesDeleteList: Addresses[] = [];
    addrColumnDef: any[];
    agyPhonesColumnDef: any[];
    iaddColumnDef: any[];
    mode: string;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    @ViewChild('addSpecGrid', {static: true}) addSpecGrid: GridComponent;
    @ViewChild('cropSpecGrid', {static: true}) cropSpecGrid: GridComponent;
    @ViewChild('mailGrid', {static: true}) mailGrid: GridComponent;
    @ViewChild('corpInfocGrid', {static: true}) corpInfocGrid: any;
    paneTitle = this.trMsg('oumagenc.title');
    corporateInfoColumnDef: any[];
    tableIndex: number;
    delRecVar: boolean;
    deleteCorpGrid: boolean;
    selectedFormat: any;
    constructor(private oumagencFactory: OumagencService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private dialogService: DialogService) {
        this.addrColumnDef = [];
        this.agyPhonesColumnDef = [];
        this.iaddColumnDef = [];
        this.corporateInfoColumnDef = [];
    }
    ngOnInit() {
        this.delRecVar = false;
        this.deleteCorpGrid = false;
        this.iaddColumnDef = [
            {
                fieldName: this.trMsg('common.type', '*'), field: 'internetAddressClass', datatype: 'lov', domain: 'IADDR_CLASS',
                editable: true
            },
            { fieldName: this.trMsg('oumagenc.addresses'), field: 'internetAddress', required: true, editable: true },
        ];
   
        this.addrColumnDef = [
            { fieldName: this.trMsg('common.unitnumber'), field: 'suiteNumber', editable: false, width: 150 },
            { fieldName: this.trMsg('common.streetaddress'), field: 'streetAddress', editable: false, width: 150 },
            { fieldName: this.trMsg('common.city'), field: 'cityName', editable: false, width: 150 },
            { fieldName: this.trMsg('common.state'), field: 'provStateDesc', editable: false, width: 150 },
            { fieldName: this.trMsg('common.postalcode'), field: 'zipPostalCode', editable: false, width: 150 },
            { fieldName: this.trMsg('common.country'), field: 'country', editable: false, width: 150 },
            { fieldName: this.trMsg('common.type'), field: 'addressType', editable: false, width: 150 },
            { fieldName: this.trMsg('oumagenc.splneeds'), field: 'specialNeedsCode', editable: false, width: 150 },
            { fieldName: this.trMsg('oumagenc.service'), field: 'servicesFlag', editable: false, datatype: 'checkbox', width: 150 },
            { fieldName: this.trMsg('comp.address.primary'), field: 'primaryFlag', editable: false, datatype: 'checkbox', width: 150 },
            { fieldName: this.trMsg('comp.address.mail'), field: 'mailFlag', editable: false, datatype: 'checkbox', width: 150 },
            { fieldName: this.trMsg('common.active'), field: 'activeFlag', editable: false, datatype: 'checkbox', width: 150 },
            {
                fieldName: this.translateService.translate('common.isvalidated'),
                field: 'isAddressValid', datatype: 'checkbox', editable: false, width: 150
            }
        ];

        this.agyPhonesColumnDef = [
            {
                fieldName: this.translateService.translate('oumagenc.phoneFormat'), field: 'format', editable: true, width: 200,
                datatype: 'lov', link: 'oumsyset/getPhoneFormatTypes', optionWidth: 300, required: true,source:'OUMSYSET'
            },
            {
                fieldName: this.trMsg('common.phonetype', '*'), field: 'phoneType', datatype: 'lov', domain: 'PHONE_USAGE',
                editable: true, width: 150
            },
            { fieldName: this.trMsg('common.phonenumber', '*'), field: 'phoneNo', datatype: 'phone', formatType: this.selectedFormat, editable: true, width: 150 },
            {
                fieldName: this.trMsg('common.extension'), field: 'extNo', datatype: 'text', uppercase: 'false',
                maxlength: 7, editable: true, width: 150
            },
        ];
        this.corporateInfoColumnDef = [
            { fieldName: this.trMsg('oumagenc.cropname') + '*', field: 'corporateName', editable: true, width: 150 ,datatype: 'text', maxlength:40},
            {
                fieldName: this.trMsg('common.caseload'), field: 'caseloadId',
                editable: true, width: 300, datatype: 'lov', link: 'oumagenc/rgCaseloadRecordGroup',source:'OUMACASE'
            },
            { fieldName: this.trMsg('system-profile.agency-no'), field: 'feiNumber', editable: true, width: 150 },
            { fieldName: this.trMsg('oumagenc.txnno'), field: 'taxNo', editable: true, width: 150 },
            { fieldName: this.trMsg('oumagenc.cropid'), field: 'corporateId', editable: false, width: 150,datatype: 'text',
              cellEditable: this.corporateIdEdit },
            {
                fieldName: '', field: 'button', datatype: 'launchbutton', link: '/OCUCORPT', editable: true,
                width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.caGoBtnClick,
                isDisable: this.disableCell
            },
            { fieldName: this.trMsg('common.comment'), field: 'commentText', editable: true, width: 150 ,datatype: 'text', maxlength:240},
            {
                fieldName: this.translateService.translate('common.active'),
                field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                datatype: 'date', editable: false, width: 150
            },
        ];
    
        if (this.dlgData) {
            this.paneTitle = '';
            if (this.dlgData.mode === this.ADDEDMODE) {
                this.addRecord();
            } else {
                const model = JSON.parse(JSON.stringify(this.dlgData.model));
                model.activeFlag = model.activeFlag === 'Y' ? 'Y' : null;
                this.corpModel = model;
                this.corpModelDup = JSON.parse(JSON.stringify(this.dlgData.model));
                this.corpModelDup.activeFlag = this.corpModelDup.activeFlag === 'Y' ? 'true' : undefined;
            }
        } else {
            this.addRecord();
        }
        this.mode = this.QUERYMODE;
        this.search();
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

    search() {
        this.cropIndex = 0;
        this.oumagencexecuteQueryOne();
    }

    addressesAdded(ev){
        this.addCorpRowClick(ev);
      }

    disableCell = (data: any, index: number): boolean => {
        if (data.createDatetime) {
            return false;
        } else {
            return true;
        }
    }

    addCorpValidtor = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.corpInfocGrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.corpInfocGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate());
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    /* onGridClear = () => {
        this.corpModel.activeFlag = this.corpModel.activeFlag ? 'Y' : null ;
        this.search();
        return true;
      } */
    onAddCorpInsert = () => {
        if (!this.oumagencValidations()) {
            return;
        }
        return {
            button: 'Corporate Types', activeFlag: true,
        };
    }
    onClear = () => {
        this.corpData = [];
        this.corpModel = new Corporates();
        this.addRecord();
        this.oumagencexecuteQueryOne();
        return true;
    }
    addCorpRowClick(event) {
        if (event) {
            this.corpModel = event;
            if (this.corpModel.createDatetime) {
                this.oumagencexecuteQuery();
                this.corphoneExecuteQuery();
                this.iAddExecuteQuery();
                this.corpValidateDelRec();
                this.deleteCorpGrid = true;
            } else {
                this.addrData = [];
                this.addrModel = new VCorporateAddresses();
                this.addphData = [];
                this.corphoneData = [];
                this.iaddData = [];
                this.deleteCorpGrid = false;
                this.corpModel = new Corporates();
                this.corpModel.addrData = new VCorporateAddresses();
                // this.sentermsDeleteEnable = false;
            }
        }
    }
    corpValidateDelRec() {
        this.oumagencFactory.getCorporateChilds(this.corpModel.corporateId).subscribe(data => {
            this.deleteCorpGrid = true;
            if (data > 0) {
                this.delRecVar = true;
            } else {
                this.delRecVar = false;
            }
        });

    }
    corpDelete = () => {
        if (this.delRecVar) {
            this.show('common.cannotdeletemaster', 'warn');
            return false;
        }
        return true;
    }
    oumagencValidations() {
        const is = { valid: true };
        if (this.corpData && this.corpData) {
            this.corpData.forEach(element => {
                if (!element.corporateName) {
                    this.show(this.translateService.translate('oumagenc.corpmustbenter'), 'warn');
                    is.valid = false;
                }
            });
        }
        return is.valid;
    }

    caGoBtnClick = (data) => {
        if (this.corpModel.corporateId) {
            this.dialogService.openLinkDialog('/OCUCORPT', this.corpModel, 80).subscribe(res => {
        });
        }
    }
    clear() {
        this.corpData = [];
        this.corpModel = new Corporates();
        this.corpModel.activeFlag = 'Y';
        this.corpModelDup = JSON.parse(JSON.stringify(this.corpModel));
        this.addrData = [];
        this.addrModel = new VCorporateAddresses();
        this.addphData = [];
        this.corphoneData = [];
        this.iaddData = [];
        this.mode = this.QUERYMODE;
    }

    previous() {
        this.cropIndex--;
        this.changeIndex();
    }

    next() {
        this.cropIndex++;
        this.changeIndex();
    }

    addRecord() {
        this.clear();
        this.corpModel.activeFlag = 'Y';
        this.mode = this.ADDEDMODE;
    }
    /*  delete() {
         this.oumagencFactory.getCorporateChilds(this.corpModel.corporateId).subscribe(childCount => {
             if (childCount > 0) {
                 this.show('common.cannotdeletemaster');
             } else {
                 const event = { added: [], updated: [], removed: [] };
                 event.removed.push(this.corpModel);
                 this.oumagencSavecorpForm(event);
             }
         });
     } */

    save() {
        if (!this.corpModel.corporateName) {
            this.show('oumagenc.corpmustbenter');
            return;
        } else {
            const event = { added: [], updated: [], removed: [] };
            if (this.corpModel.corporateId) {
                event.updated.push(JSON.parse(JSON.stringify(this.corpModel)));
            } else {
                event.added.push(JSON.parse(JSON.stringify(this.corpModel)));
            }
            this.oumagencSavecorpForm(event);
        }
    }

    onOffenderChange(offender) {
    }
    /**
          * This function loads the data into the Master Record and its child records
          */
    oumagencPopulateDetailsOne() {
        const serviceObj = this.oumagencFactory.iAddExecuteQuery(this.corpModel);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                this.iaddData = data;
            }
        });
    }

    // /**
    //  *  This function will be executed when commit event is
    // * fired
    // */
    oumagencSavecorpForm(event) {
        if (!this.oumagencValidations()) {
            return;
        }
        this.corpInsertList = event.added;
        this.corpUpdatetList = event.updated;
        this.corpDeleteList = event.removed;
        this.corpCommitModel.insertList = [];
        this.corpCommitModel.updateList = [];
        this.corpCommitModel.deleteList = [];
        if (this.corpInsertList.length > 0) {
            this.corpInsertList.forEach(ele => {
                ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
            });
            this.corpCommitModel.insertList = this.corpInsertList;
        }
        if (this.corpUpdatetList.length > 0) {
            this.corpUpdatetList.forEach(ele => {
                ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
            });
            this.corpCommitModel.updateList = this.corpUpdatetList;
        }
        if (this.corpDeleteList.length > 0) {
            this.corpCommitModel.deleteList = this.corpDeleteList;
        }
        const cropId = this.corpModel.corporateId;
        const activeFlg = this.corpModel.activeFlag ? 'Y' : null;
        this.corpModel = new Corporates();
        const corpSaveData = this.oumagencFactory.corpCommit(this.corpCommitModel);
        corpSaveData.subscribe(data => {
            if (String(data) === '2') {
                this.corpModel.activeFlag = activeFlg;
                this.show('oumagenc.youcannotdeletethisrecordchildrecordexistsincorporatetypes', 'warn');
            } else if (String(data) === '3') {
                this.corpModel.activeFlag = activeFlg;
                this.show('oumagenc.youcannotdeletethisrecordchildrecordexistsinoffendretranaction', 'warn');
            } 
            else if (String(data) !== '0') {
                this.corpModel.activeFlag = activeFlg;
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                if (event.removed.length > 0) {
                    this.show('oumagenc.unbltodelete');
                } else {
                    this.show('common.addupdateremoverecordfailed', 'error');
                }
                this.corpModel.activeFlag = activeFlg;
            }
            this.search();
        });
    }
    //   //execute query
    oumagencexecuteQueryOne() {
        const reqData = JSON.parse(JSON.stringify(this.corpModel));
        // reqData.activeFlag = reqData.activeFlag ? 'Y' : null;
        const serviceObj = this.oumagencFactory.corpExecuteQuery(reqData);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                data.forEach(ele => {
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
                    ele['button'] = 'Corporate Types';
                    //git clone https://naveenkarkin@bitbucket.org/cool_syscon_team/ui-components.git
                });
                this.corpData = data;
                this.corpModel = this.corpData[0];
                this.tableIndex = 0;
                // this.changeIndex();
            } else {
                this.corpData = [];
                this.corpModel = new Corporates();
                this.corpModel.addrData = new VCorporateAddresses();
                this.show('common.querycaused');
            }
        });
    }
    /*
    * This function loads the data into the Master Record and its child records
    */
    oumagencPopulateDetails() {
        const serviceObj = this.oumagencFactory.addressesExecuteQuery(this.addrModel);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                this.addressesData = data;
            }
        });
    }

    // //execute query
    oumagencexecuteQuery() {
        this.addphData = [];
        this.addrIndex = -1;
        this.addrModel = new VCorporateAddresses();
        this.addrModel.corporateId = this.corpModel.corporateId;
        const serviceObj = this.oumagencFactory.addrExecuteQuery(this.addrModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.addrData = [];
                this.corpModel.addrData = new VCorporateAddresses();
            } else {
                data.forEach(ele => {
                    ele.servicesFlag = ele.servicesFlag === 'Y' ? true : false;
                    ele.primaryFlag = ele.primaryFlag === 'Y' ? true : false;
                    ele.mailFlag = ele.mailFlag === 'Y' ? true : false;
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
                    ele.isAddressValid = ele.isAddressValid === 'Y' ? true : false;
                });
                this.addrData = data;
                this.addrModel = data[0];
                this.addrIndex = 0;
            }
        });
    }
    addphExecuteQuery() {
        this.addphModel = new Phones();
        this.addphModel.ownerId = this.addrModel.addressId;
        const addphResult = this.oumagencFactory.addPhExecuteQuery(this.addphModel);
        addphResult.subscribe(data => {
            if (data.length === 0) {
                this.addphData = [];
            } else {
                this.addphData = data;
                this.addphModel = data[0];
            }
        });
    }
    // /**
    //  *  This function will be executed when commit event is
    // * fired
    // */
    oumagencSaveaddphForm(event) {

        if (!this.phoneValidation(this.addphData)) {
            return;
        }

        this.addphInsertList = event.added;
        this.addphUpdatetList = event.updated;
        this.addphDeleteList = event.removed;
        this.addphCommitModel.insertList = [];
        this.addphCommitModel.updateList = [];
        this.addphCommitModel.deleteList = [];
        if (this.addphInsertList.length > 0) {
            this.addphInsertList.forEach(ele => {
                ele.ownerId = this.addrModel.addressId;
                ele.ownerClass = 'ADDR';
            });
            this.addphCommitModel.insertList = this.addphInsertList;
        }
        if (this.addphUpdatetList.length > 0) {
            this.addphCommitModel.updateList = this.addphUpdatetList;
        }
        if (this.addphDeleteList.length > 0) {
            this.addphCommitModel.deleteList = this.addphDeleteList;
        }
        const addphSaveData = this.oumagencFactory.addPhCommit(this.addphCommitModel);
        addphSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
            this.addphExecuteQuery();
        });
    }

    onAddSpecInsert = () => {
        if (!this.phoneValidation(this.addphData)) {
            return null;
        } else {
            return new Phones();
        }
    }

    // /**
    //  *  This function will be executed when commit event is
    // * fired
    // */
    oumagencSaveCropphForm(event) {

        if (!this.phoneValidation(this.corphoneData)) {
            return;
        }

        this.addphInsertList = event.added;
        this.addphUpdatetList = event.updated;
        this.addphDeleteList = event.removed;
        this.addphCommitModel.insertList = [];
        this.addphCommitModel.updateList = [];
        this.addphCommitModel.deleteList = [];
        if (this.addphInsertList.length > 0) {
            this.addphInsertList.forEach(ele => {
                ele.ownerId = this.corpModel.corporateId;
                ele.ownerClass = 'CORP';
            });
            this.addphCommitModel.insertList = this.addphInsertList;
        }
        if (this.addphUpdatetList.length > 0) {
            this.addphCommitModel.updateList = this.addphUpdatetList;
        }
        if (this.addphDeleteList.length > 0) {
            this.addphCommitModel.deleteList = this.addphDeleteList;
        }
        const addphSaveData = this.oumagencFactory.addPhCommit(this.addphCommitModel);
        addphSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
            this.corphoneExecuteQuery();
        });
    }
    onCropFrmInsert = () => {
        if (!this.phoneValidation(this.corphoneData)) {
            return null;
        } else {
            return new Phones();
        }
    }
    corphoneExecuteQuery() {
        this.corphoneModel = new Phones();
        this.corphoneModel.ownerId = this.corpModel.corporateId;
        const corphoneResult = this.oumagencFactory.corPhoneExecuteQuery(this.corphoneModel);
        corphoneResult.subscribe(data => {
            if (data.length === 0) {
                this.corphoneData = [];
            } else {
                this.corphoneData = data;
                this.corphoneModel = data[0];
            }
        });
    }
    //   /**
    //    *  This function will be executed when commit event is
    //   * fired
    //   */
    oumagencSavecorphoneForm(event) {

        this.corphoneInsertList = event.added;
        this.corphoneUpdatetList = event.updated;
        this.corphoneDeleteList = event.removed;
        this.addphCommitModel.insertList = [];
        this.addphCommitModel.updateList = [];
        this.addphCommitModel.deleteList = [];
        if (this.corphoneInsertList.length > 0) {
            for (let i = 0; i < this.corphoneInsertList.length; i++) {
            }
            this.addphCommitModel.insertList = this.corphoneInsertList;
        }
        if (this.corphoneUpdatetList.length > 0) {
            for (let i = 0; i < this.corphoneUpdatetList.length; i++) {
            }
            this.addphCommitModel.updateList = this.corphoneUpdatetList;
        }
        if (this.corphoneDeleteList.length > 0) {
            for (let i = 0; i < this.corphoneDeleteList.length; i++) {
            }
            this.addphCommitModel.deleteList = this.corphoneDeleteList;
        }
        const corphoneSaveData = this.oumagencFactory.corPhoneCommit(this.addphCommitModel);
        corphoneSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });
    }
    iAddExecuteQuery() {
        this.iaddModel = new InternetAddresses();
        this.iaddModel.ownerId = this.corpModel.corporateId;
        const iaddResult = this.oumagencFactory.iAddExecuteQuery(this.iaddModel);
        iaddResult.subscribe(data => {
            if (data.length === 0) {
                this.iaddData = [];
            } else {
                this.iaddData = data;
                this.iaddModel = data[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oumagencSaveiaddForm(event) {
        if (!this.internetValidation(this.iaddData)) {
            return;
        }
        this.iaddInsertList = event.added;
        this.iaddUpdatetList = event.updated;
        this.iaddDeleteList = event.removed;
        this.iaddCommitModel.insertList = [];
        this.iaddCommitModel.updateList = [];
        this.iaddCommitModel.deleteList = [];
        if (this.iaddInsertList.length > 0) {
            this.iaddInsertList.forEach(ele => {
                ele.ownerId = this.corpModel.corporateId;
                ele.ownerClass = 'CORP';
            });
            this.iaddCommitModel.insertList = this.iaddInsertList;
        } if (this.iaddUpdatetList.length > 0) {

            this.iaddCommitModel.updateList = this.iaddUpdatetList;
        }
        if (this.iaddDeleteList.length > 0) {

            this.iaddCommitModel.deleteList = this.iaddDeleteList;
        }
        const iaddSaveData = this.oumagencFactory.iAddCommit(this.iaddCommitModel);
        iaddSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
            this.iAddExecuteQuery();
        });
    }
    emlInsert = () => {
        if (!this.internetValidation(this.iaddData)) {
            return null;
        } else {
            return new InternetAddresses();
        }
    }
    addressesExecuteQuery() {
        const addressesResult = this.oumagencFactory.addressesExecuteQuery(this.addressesModel);
        addressesResult.subscribe(data => {
            if (data.length === 0) {
                this.addressesData = [];
            } else {
                this.addressesData = data;
                this.addressesModel = data[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oumagencSaveaddressesForm(event) {
        this.addressesInsertList = event.added;
        this.addressesUpdatetList = event.updated;
        this.addressesDeleteList = event.removed;
        this.addressesCommitModel.insertList = [];
        this.addressesCommitModel.updateList = [];
        this.addressesCommitModel.deleteList = [];
        if (this.addressesInsertList.length > 0) {
            for (let i = 0; i < this.addressesInsertList.length; i++) {
            }
            this.addressesCommitModel.insertList = this.addressesInsertList;
        } if (this.addressesUpdatetList.length > 0) {
            for (let i = 0; i < this.addressesUpdatetList.length; i++) {
            }
            this.addressesCommitModel.updateList = this.addressesUpdatetList;
        }
        if (this.addressesDeleteList.length > 0) {
            for (let i = 0; i < this.addressesDeleteList.length; i++) {
            }
            this.addressesCommitModel.deleteList = this.addressesDeleteList;
        }
        const addressesSaveData = this.oumagencFactory.addressesCommit(this.addressesCommitModel);
        addressesSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });

    }
    addressRowClick(event) {
        if (event) {
            this.addrModel = event;
            this.corpModel.addrData = event;
            this.addphExecuteQuery();
        } else {
            this.addrModel = new VCorporateAddresses();
            this.corpModel.addrData = new VCorporateAddresses();
        }
    }

    ocdoapopDialog() {
        const indata = {
            address: JSON.parse(JSON.stringify(this.addrModel)), class: 'CORP', addressId: this.addrModel.addressId,
            personId: this.corpModel.corporateId,
            person: { personId: this.corpModel.corporateId }
        };
        if (this.addrData.length <= 0) {
            indata.address = { length: 0 };
        }
        this.dialogService.openLinkDialog('/OCDOAPOP', indata, 80).subscribe(result => {
            this.deleteCorpGrid = false;
            this.corpValidateDelRec();
            this.oumagencexecuteQuery();
        });
    }

    phoneValidation(list: any[]) {
        const formattedNumber = PhoneNumberUtils.getFormatType.replace(/[- )(]/g,'');
        const is = { valid: true };
        if (list && Array.isArray(list)) {
            list.forEach(ele => {
                if (!ele.format) {
                    this.show('oumagenc.formatmstbentr');
                    is.valid = false;
                    return;
                }
                if (!ele.phoneType) {
                    this.show('oumagenc.phnmstbentr');
                    is.valid = false;
                    return;
                }
                if (!ele.phoneNo) {
                    this.show('oumagenc.phnmstbeenter');
                    is.valid = false;
                    return;
                }
        const formattedNumber=PhoneNumberUtils.getFormattedNumber(ele.format,ele.phoneNo).replace(/[- )(]/g,'');
        const selectedFormat = PhoneNumberUtils.contactType.find(x => ele.format === x.maskingCode);
                if (!(ele.phoneNo.length === formattedNumber.length) && ele.format != 'UNF' ) {
                    if(String(ele.phoneNo).length >= 1 && formattedNumber.length) {
                        this.type = 'warn';
                        this.message = this.translateService.translate
                        ('common.fieldmustbeform').replace('%format%', selectedFormat.maskFormat);
                        this.show(this.message);
                        is.valid = false;
                        return;
                    }  else if (((String(ele.phoneNo).length > 0 && !formattedNumber))){
                        return true;
                    }
                    
                }
            });
        }
        return is.valid;
    }

    internetValidation(list: any[]) {
        const is = { valid: true };
        if (list && Array.isArray(list)) {
            list.forEach(ele => {
                if (!ele.internetAddressClass) {
                    this.show('oumagenc.typemstbentr');
                    is.valid = false;
                    return;
                }
                if (!ele.internetAddress) {
                    this.show('oumagenc.addrmstbeentr');
                    is.valid = false;
                    return;
                }
                if (ele.internetAddress &&
                    ele.internetAddress.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') === null) {
                    this.show(this.translateService.translate('common.invalidinternetaddress'));
                    is.valid = false;
                    return;
                 }
            });
        }
        return is.valid;
    }

    get corpChildFlag(): boolean {
        if (this.corpModel.createDatetime) {
            return true;
        }
        return false;
    }
    get addrChildFlag(): boolean {
        if (this.addphModel.createDatetime) {
            return true;
        }
        return false;
    }

    changeIndex() {
        this.mode = this.FETCHEDMODE;
        this.corpModel = this.corpData[this.cropIndex];
        this.corpModelDup = JSON.parse(JSON.stringify(this.corpModel));
        this.oumagencexecuteQuery();
        this.corphoneExecuteQuery();
        this.iAddExecuteQuery();
    }


    get preFlag(): boolean {
        if (this.corpData.length <= 0 || this.mode !== this.FETCHEDMODE) {
            return true;
        }
        if (this.cropIndex <= 0) {
            return true;
        }
        return false;
    }

    get nxtFlag(): boolean {
        if (this.corpData.length <= 0 || this.mode !== this.FETCHEDMODE) {
            return true;
        }
        if (this.cropIndex >= this.corpData.length - 1) {
            return true;
        }
        return false;
    }

    get saveFlag(): boolean {
        this.changetoUpdateMode();
        const modes = [this.ADDEDMODE, this.UPDATEDMODE, this.SUBUPDATEMODE];
        const isValidSave = !modes.includes(this.mode);
        return isValidSave;
    }

    changetoUpdateMode() {
        if (this.mode !== this.QUERYMODE) {
            Object.keys(this.corpModelDup).forEach(ele => {
                if (this.corpModelDup[ele] !== this.corpModel[ele]) {
                    this.mode = this.UPDATEDMODE;
                }
            });
        }
    }

    get ADDEDMODE(): string {
        return 'A';
    }
    get UPDATEDMODE(): string {
        return 'U';
    }
    get QUERYMODE(): string {
        return 'Q';
    }
    get FETCHEDMODE(): string {
        return 'F';
    }
    get SUBUPDATEMODE(): string {
        return 'SU';
    }

    get addFlag(): boolean {
        return !(this.mode === this.FETCHEDMODE);
    }
    get retreveFlag(): boolean {
        return !(this.mode === this.QUERYMODE);
    }

    addSpecValidtor = (event) => {
        const formattedNumber = PhoneNumberUtils.getFormatType.replace(/[- )(]/g,'');
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event && event.newValue !== event.oldValue && event.newValue) {
            if (event.field === 'format') {
                this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
                PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
                this.addSpecGrid.setColumnData('phoneNo', index, null);
            }
          /*   if (event.field === 'phoneNo') {
                if (!(String(event.newValue).length === formattedNumber.length)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate
                    ('common.fieldmustbeform').replace('%format%', PhoneNumberUtils.getFormatType);
                    this.show(this.message);
                    this.addSpecGrid.setColumnData('phoneNo', index, null);
                }
            } */
        }
        rowdata.validated = true;
        return rowdata;
    }

    cropSpecValidtor = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event && event.newValue !== event.oldValue && event.newValue) {
            if (event.field === 'format') {
                this.selectedFormat = PhoneNumberUtils.contactType.find(x => event.data.format === x.maskingCode);
                PhoneNumberUtils.getFormatType = this.selectedFormat.maskFormat;
                 this.cropSpecGrid.setColumnData('phoneNo', index, null);
            }
           /*  if (event.field === 'phoneNo') {
                const formattedNumber = PhoneNumberUtils.getFormatType.replace(/[- )(]/g,'');
                if (!(String(event.newValue).length === formattedNumber.length)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate
                    ('common.fieldmustbeform').replace('%format%', PhoneNumberUtils.getFormatType);
                    this.show(this.message);
                    this.addSpecGrid.setColumnData('phoneNo', index, null);
                }
            } */
        }
        rowdata.validated = true;
        return rowdata;
    }

    internetRowClick(event) {
        if (event) {
            this.selectInter = event;
        } else {
            this.selectInter = new InternetAddresses();
        }
    }
    gblPhntRowClick(event) {
        if (event) {
            this.selectgl = event;
        } else {
            this.selectgl = new Phones();
        }
    }
    addPhnRowClick(event) {
        if (event) {
            this.selectadph = event;
        } else {
            this.selectadph = new Phones();
        }
    }
    get contactFlag(): boolean {
        if (this.addrData.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    onActiceChange(event) {
        if (!event.checked) {
            this.corpModel.expiryDate = DateFormat.getDate();
        } else {
            this.corpModel.expiryDate = null;
        }
    }
    onDateBlur() {
        if (!this.corpModel.expiryDate) {
            this.corpModel.expiryDate = this.corpModel.expiryDate === null ? undefined : null;
        }
    }
    tabChange(event) {
        if (event) {
            if (event.index === 0) {
                this.refreashGrid(this.cropSpecGrid);
            }
            if (event.index === 1) {
                this.refreashGrid(this.mailGrid);
            }
        }
    }

    refreashGrid(grid) {
        if (grid.gridOptions && grid.gridOptions.api) {
            grid.gridOptions.api.clearFocusedCell();
            grid.gridOptions.api.setHeaderHeight(40);
            grid.gridOptions.rowHeight = 40;
            grid.resizeColumns();
        }
    }
    corporateIdEdit = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime) {
            return false;
        }
        return true;
    }
}






