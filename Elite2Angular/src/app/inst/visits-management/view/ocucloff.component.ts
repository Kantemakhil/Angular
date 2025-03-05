import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcucloffService } from '@inst/visits-management/service/ocucloff.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { VDistinctLinkedOffenders } from '@visitsbeans/VDistinctLinkedOffenders';

@Component({
    selector: 'app-ocucloff',
    templateUrl: './ocucloff.component.html'
})

export class OcucloffComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    contactsData: VDistinctLinkedOffenders[] = [];
    contactsDataTemp: VDistinctLinkedOffenders[] = [];
    contactsModel: VDistinctLinkedOffenders = new VDistinctLinkedOffenders();
    contactsIndex: number;
    contactsInsertList: VDistinctLinkedOffenders[] = [];
    contactsUpdatetList: VDistinctLinkedOffenders[] = [];
    contactsDeleteList: VDistinctLinkedOffenders[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    perAddrColumnDef: any[];
    perIdentColumnDef: any[];
    perEmpColumnDef: any[];
    offCntPerColumnDef: any[];
    contactsColumnDef: any[];
    offCntPerReadOnly: boolean;
    perAddrReadOnly: boolean;
    perIdentReadOnly: boolean;
    perInfoReadOnly: boolean;
    perEmpReadOnly: boolean;
    contactsReadOnly: boolean;
    rgrelationshiptypeRg: any[] = [];
    rgcontacttypeRg: any[] = [];
    constructor(public ocucloffFactory: OcucloffService,
        public translateService: TranslateService,
        public dialogService: DialogService) {
        this.perAddrColumnDef = [];
        this.perIdentColumnDef = [];
        this.perEmpColumnDef = [];
        this.offCntPerColumnDef = [];
        this.contactsColumnDef = [];
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.contactsColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName',
                editable: false, width: 120
            },
            {
                fieldName: this.translateService.translate('ocucloff.contacttype'), field: 'contactType', editable: false,
                domain: 'CONTACTS', datatype: 'lov', width: 150
            },
            {
                fieldName: this.translateService.translate('ocucloff.relationship'), field: 'relationshipType', editable: false,
                domain: 'RELATIONSHIP', datatype: 'lov', width: 120
            },
        ];
        this.contactsExecuteQuery();
    }
    onRowClickcontacts(event) {
    }
    onButExitClick() {
        this.dialog.close(null);
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    contactsExecuteQuery() {
        this.contactsModel.personId = this.dialog.data.personId;
        const contactsResult = this.ocucloffFactory.contactsExecuteQuery(this.contactsModel);
        contactsResult.subscribe(contactsResultList => {
            if (contactsResultList.length === 0) {
                this.contactsData = [];
            } else {
                this.contactsData = contactsResultList;
                this.contactsModel = contactsResultList[0];
            }
        });
    }

}
