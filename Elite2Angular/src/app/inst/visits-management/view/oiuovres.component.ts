import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiuovresService } from '../service/oiuovres.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OffenderPersonRestricts } from '@inst/visits-management/beans/OffenderPersonRestricts';
import { OffenderPersonRestrictsCommitBean } from '@inst/visits-management/beans/OffenderPersonRestrictsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

@Component({
    selector: 'app-oiuovres',
    templateUrl: './oiuovres.component.html'
})

export class OiuovresComponent implements OnInit {
    selectedOffender: any;
    actualRowData: any;
    middleName: string;
    firstName: string;
    personId: string;
    lastName: string;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid') grid: any;
    msgs: any[] = [];
    offconrestData: any[] = [];
    offconrestInsertList: OffenderPersonRestricts[] = [];
    offconrestUpdatetList: OffenderPersonRestricts[] = [];
    offconrestDeleteList: OffenderPersonRestricts[] = [];
    offconrestCommitModel: OffenderPersonRestrictsCommitBean = new OffenderPersonRestrictsCommitBean();
    offConRestColumnDef: any[];
    rgoffrestrictiontypeRg: Map<string, string> = new Map();
    tableIndex = -1;
    isgridEditable: boolean;
    constructor(private oiuovresFactory: OiuovresService,
                private translateService: TranslateService,
                private offenderSearchService: OffenderSearchService) {
    this.offConRestColumnDef = [];

    }
    ngOnInit() {
       this.selectedOffender =  this.offenderSearchService.selectedOffender;
    const titles = {code : 'Restriction Type', domain: 'Description', parentCode: 'Parent Code'};
    const restrictScreen =  ['/OIDVISIT'];
    this.isgridEditable = !this.dialog.data.screen || !restrictScreen.includes(this.dialog.data.screen) ? true : false;
    this.offConRestColumnDef = [
        { fieldName: this.trMsg('common.restrictionDate'), field: 'restrictionEffectiveDate', datatype: 'date', editable: true, width: 150},
        { fieldName: this.trMsg('common.expirydate'), field: 'restrictionExpiryDate', datatype: 'date', editable: true,
         width: 150},
        { fieldName: this.trMsg('common.type', '*'), field: 'restrictionType', datatype: 'lov',
         /*domain:'VST_RST_TYPE'*/ source: 'OUMRCODE', link: 'oiuovres/rgOffRestrictionTypeRecordGroup', editable: true, width: 150, titles: titles},
        { fieldName: this.trMsg('common.description'), field: 'description', editable: false, width: 150},
        { fieldName: this.trMsg('common.comment'), field: 'commentText', editable: true, width: 150, datatype: 'text',
         uppercase: 'false', maxlength: 255 },
        { fieldName: this.trMsg('common.enteredby'), field: 'stringEnteredStaffId',  datatype: 'text', link: 'oiuovres/rgStaffIdRecordGroup',
         editable: false, width: 150},
    ];
    const rgoffrestrictiontypeServiceObj = this.oiuovresFactory.
    rgOffRestrictionTypeRecordGroup(null);
    rgoffrestrictiontypeServiceObj.subscribe(rgoffrestrictiontypelist => {
            if (rgoffrestrictiontypelist.length === 0) {
                 this.rgoffrestrictiontypeRg.clear();
             } else {
                rgoffrestrictiontypelist.forEach(element => {
                    this.rgoffrestrictiontypeRg.set(element.code, element.domain);
                });
        }
    });
    this.perExecuteQuery();

    }
    allowNumbers( event ) {
    }
    onRowClickoffconrest(event) {
    }
     ok() {
    }
     no() {
    }
     cancel() {
    }
    onOffenderChange(offender) {
    }
    // Functionality not yet implemented
    perExecuteQuery() {
        const reqData = {personId: this.dialog.data.personId };
                 const perResult = this.oiuovresFactory.
            perExecuteQuery(reqData);
                     perResult.subscribe(perResultList => {
                    if (perResultList.length === 0) {

                            this.personId = undefined;
                            this.lastName = undefined;
                            this.firstName = undefined;
                            this.middleName = undefined;
                    } else {
                        const resData = perResultList[0];
                        this.personId = resData.personId;
                        this.lastName = resData.lastName;
                        this.firstName = resData.firstName;
                        this.middleName = resData.middleName;
                        this.offconrestExecuteQuery();
                    }
                });
            }

    offconrestExecuteQuery() {
                const data = {'personId': Number(this.personId),
                'offenderBookId': this.selectedOffender.offenderBookId };
                 const offconrestResult = this.oiuovresFactory.
                 offConRestExecuteQuery(data);
                     offconrestResult.subscribe(offconrestResultList => {
                    if (offconrestResultList.length === 0) {
                        this.offconrestData = [];
                    } else {
                        this.offconrestData = offconrestResultList;
                        this.actualRowData = offconrestResultList;
                        this.tableIndex = 0;
                    }
                });
            }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oiuovresSaveoffconrestForm(event) {
        if (  !this.offenderPersonRestictSaveValidation(event.added)) {
            return;
        }
        if (  !this.offenderPersonRestictSaveValidation(event.updated)) {
            return;
        }
        this.offconrestInsertList = event.added;
        this.offconrestUpdatetList = event.updated;
        this.offconrestDeleteList = event.removed;
        this.offconrestCommitModel.insertList = [];
        this.offconrestCommitModel.updateList = [];
        this.offconrestCommitModel.deleteList = [];
        if (this.offconrestData.length > 0) {
            for (let i = 0; i < this.offconrestData.length; i++) {
                let dupList = this.offconrestData.filter(x => x.restrictionType === this.offconrestData[i].restrictionType && x.restrictionExpiryDate == undefined && this.offconrestData[i].restrictionExpiryDate == undefined);
                if (dupList.length > 1) {
                    this.show(this.translateService.translate('oiuovres.arestrictionofthistypealreadyexistsfortheoffender'), 'warn');
                    return;
                }
            }
        }

        this.offconrestInsertList.forEach(element => {
            element.offenderBookId = this.selectedOffender ? this.selectedOffender.offenderBookId : null;
            element.personId = Number(this.personId);
        });
        if (  this.offconrestInsertList.length > 0) {
        this.offconrestCommitModel.insertList = this.offconrestInsertList;
        }
        if (  this.offconrestUpdatetList.length > 0) {
        this.offconrestCommitModel.updateList = this.offconrestUpdatetList;
        }
        const offconrestSaveData = this.oiuovresFactory.offConRestCommit( this.offconrestCommitModel );
        offconrestSaveData.subscribe( data => {
         if ( data === 1 ) {
            this.show('common.addupdateremoverecordsuccess', 'success');
        } else {
            this.show('common.addupdateremoverecordfailed');
        }

        this.offconrestExecuteQuery();
            });
    }

    onGridInsert = () => {
        return this.offenderPersonRestictSaveValidation(this.offconrestData) ? {} : null;
    }

    offenderPersonRestictSaveValidation(arrData, isInsert?) {
        const validator = {valid: true};
        arrData.forEach(data => {
            if (isInsert && !data.restrictionEffectiveDate && !data.restrictionEffectiveDate &&
                 !data.restrictionType && !data.commentText) {
                    this.show('Record must be enter or deleted first.');
                    validator.valid = false;
                    return false;
            }

            if (  !data.restrictionEffectiveDate) {
                this.show('oiuovres.restrictiondatemustbeentered');
                validator.valid = false;
                return false;
            }
            if (  data.restrictionEffectiveDate && data.restrictionExpiryDate &&
                 DateFormat.compareDate(DateFormat.getDate(data.restrictionEffectiveDate),
                  DateFormat.getDate(data.restrictionExpiryDate)) > 0) {
                this.show('oiuovres.restrictionexpirydatemustbeentered');
                validator.valid = false;
                return false;
            }
            if (  !data.restrictionType) {
                this.show('oiuovres.typedatemustbeentered');
                validator.valid = false;
                return false;
            }
        });
        return validator.valid;
    }

    validateRestriction = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (  event.field === 'restrictionType') {
            this.grid.setColumnData('description', rowIndex,
            this.rgoffrestrictiontypeRg.get(event.newValue));
        }
        rowdata.validated = true;
        return rowdata;
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
}
