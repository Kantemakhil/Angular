import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuprestService } from '@inst/visits-management/service/ocuprest.service';
import { VOffenderRestrictions } from '@inst/visits-management/beans/VOffenderRestrictions';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { Router } from '@angular/router';
//  import required bean declarations

@Component({
    selector: 'app-ocuprest',
    templateUrl: './ocuprest.component.html'
})

export class OcuprestComponent implements OnInit {
    //  Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offData: VHeaderBlock[] = [];
    offDataTemp: VHeaderBlock[] = [];
    offModel: VHeaderBlock = new VHeaderBlock();
    vheaderblockModel: VHeaderBlock = new VHeaderBlock();
    offIndex = 0;
    offInsertList: VHeaderBlock[] = [];
    offUpdatetList: VHeaderBlock[] = [];
    offDeleteList: VHeaderBlock[] = [];
    voffrestData: VOffenderRestrictions[] = [];
    voffrestDataTemp: VOffenderRestrictions[] = [];
    voffrestModel: VOffenderRestrictions = new VOffenderRestrictions();
    voffrestIndex = -1;
    voffrestInsertList: VOffenderRestrictions[] = [];
    voffrestUpdatetList: VOffenderRestrictions[] = [];
    voffrestDeleteList: VOffenderRestrictions[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    vOffRestColumnDef: any[];
    rpOtherOccupantsColumnDef: any[];
    personsReadOnly = false;
    rpOtherOccupantsReadOnly = false;
    offReadOnly = false;
    vOffRestReadOnly = false;
    buttonReadOnly = false;
    rgauthorisedbyRg: any[] = [];
    rgrestrictiontypeRg: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist: any[] = [];
    constructor(private ocuprestFactory: OcuprestService,
        public translateService: TranslateService,
        private router: Router) {
        //  TODO initilize data members here..!
        this.vOffRestColumnDef = [];
        this.rpOtherOccupantsColumnDef = [];
    }
    ngOnInit() {
        this.voffrestIndex = -1;
        this.ocuprestexecuteQuery();
        this.vOffRestColumnDef = [
            {
                fieldName: this.translateService.translate('ocuprest.restrictiondate'), field: 'effectiveDate', editable: false, width: 180,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.type'), field: 'restrictionType', editable: false,
                width: 150, datatype: 'lov',
                domain: 'VST_RST_TYPE'
            },
            { fieldName: this.translateService.translate('common.enteredby'), field: 'enteredStaffName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocuprest.authorisedby'), field: 'authroisedStaffName',
                 editable: false, width: 180,
            },
        ];
    }
    onRowClickvoffrest(event) {
        if (event) {
            this.voffrestModel = event;
        }
    }
    onButExitclick() {
        this.dialog.close(null);
    }
    /**
	* This function loads the data into the Master Record and its child records
	*/
    ocuprestPopulateDetails() {
        const serviceObj = this.ocuprestFactory.
            vOffRestExecuteQuery(this.offModel);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                this.voffrestData = data;
            } else {
                this.voffrestData = [];
            }
        });
    }

    // execute query
    ocuprestexecuteQuery() {
        this.offModel = new VHeaderBlock();
        if (this.router.url === '/OIDVIRES') {
            this.offModel.rootOffenderId = this.dialog.data.contactRootOffenderId;
        } else {
            this.offModel.rootOffenderId = this.dialog.data.visitorOffenderId;
        }
        const serviceObj = this.ocuprestFactory.
            offExecuteQuery(this.offModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                this.voffrestIndex = 0;
                this.offData = data;
                this.vheaderblockModel = this.offData[0];
                this.voffrestExecuteQuery();
            }
        });
    }

    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    ocuprestdateFormat(dateValue) {
        if (dateValue !== undefined && dateValue.length > 0) {
            const newdate = dateValue.split('/');
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }
    voffrestExecuteQuery() {
        this.voffrestModel = new VOffenderRestrictions();
        this.voffrestModel.offenderBookId = this.vheaderblockModel.offenderBookId;
        const voffrestResult = this.ocuprestFactory.
            vOffRestExecuteQuery(this.voffrestModel);
        voffrestResult.subscribe(voffrestResultList => {
            if (voffrestResultList.length === 0) {
                this.voffrestData = [];
            } else {
                voffrestResultList.forEach(element => {
                    element.authorisedStaffId = String(element.authorisedStaffId);
                });
                this.voffrestData = voffrestResultList;
                this.voffrestModel = voffrestResultList[0];
            }
        });
    }
    onKeyPressEvent() {
        // this.type = 'info';
        // this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
        // this.show();
    }
   /*
    * To display messages
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

}
