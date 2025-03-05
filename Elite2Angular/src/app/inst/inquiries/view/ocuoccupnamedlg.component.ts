import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcuoccupService } from '@inst/inquiries/service/ocuoccup.service';
import { OffenderContactPersons } from '@inst/demographics-biometrics/beans/OffenderContactPersons';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
    selector: 'app-ocuoccupnamedlg',
    templateUrl: './ocuoccupnamedlg.component.html'
//    styleUrls: ['./ocuoiche.component.css']

})
export class OcuoccupnamedlgComponent implements OnInit {
    namesDataColumnDef: any[];
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    contactPersonsData: OffenderContactPersons[] = [];
    contactPersonsModel: OffenderContactPersons = new OffenderContactPersons();
    namesData: any[];
    partySeq: any;
    translateLabel: any;
    incidentDate: any;
    caseLoadId: any;
    contactPersonsIndex = -1;

    constructor(private ocuoccupFactory: OcuoccupService, private sessionManager: UserSessionManager,
            public translateService: TranslateService,
            public dialogService: DialogService) {
    }

    ngOnInit() {
        this.namesDataColumnDef = [
            { fieldName: this.translateService.translate('common.name'), field: 'lastName', editable: true, width: 200 },
            { fieldName: this.translateService.translate('ocuoccup.contacttype'), field: 'createUserId', editable: true, width: 200 },
            { fieldName: this.translateService.translate('ocuoccup.relationship'), field: 'modifyUserId', width: 250, editable: true },
            { fieldName: this.translateService.translate('common.age'), field: 'age', editable: true, width: 200 }
        ];

        const serviceObj = this.ocuoccupFactory.rgPersonNameRecordGroup( this.dialog.data.offenderBookId );
        serviceObj.subscribe( list1 => {
            if ( list1 ) {
                list1.forEach ( element => {
                    if (!element.age || element.age === 0) {
                        element.age = undefined;
                    }
                });
                this.contactPersonsIndex = 0;
                this.contactPersonsData = list1;
                this.contactPersonsModel = list1[0];
            } else {
                // this.contactPersonsIndex = -1;
                this.contactPersonsData = [];
                this.contactPersonsModel = new OffenderContactPersons();
            }
        } );
    }

    onRowClickEvent(event) {
        if (event) {
        this.contactPersonsModel = new OffenderContactPersons();
        this.contactPersonsModel = event;
        // if ( this.contactPersonsModel.lastName === '<NEW OCCUPANT>') {
        //     this.dialogService.openLinkDialog('/osipserdialog').subscribe( result => {
        //         this.dialog.close({personName: result.personName,
        //             personId:  result.personId,
        //             age: result.age});
        //     });

        // }
    }
    }
    getData() {
        if ( this.contactPersonsModel.lastName === 'NEW OCCUPANT') {
            this.dialogService.openLinkDialog('/osipserdialog').subscribe( result => {
                this.dialog.close({personName: result.personName,
                    personId:  result.personId,
                    age: result.age});
            });

        } else {
        this.dialog.close({
            personId: this.contactPersonsModel.personId,
            personName: this.contactPersonsModel.lastName,
            contactType: this.contactPersonsModel.contactType,
            age: this.contactPersonsModel.age,
            offenderContactPersonId: this.contactPersonsModel.offenderContactPersonId,
            relationshipType: this.contactPersonsModel.relationshipType});
        }
    }
    clearData() {
        this.dialog.close( null );
    }
}
