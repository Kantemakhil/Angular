import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { OsiosearService } from '../service/osiosear.service';
import { TagSearchGetOffenderRecords } from '@commonbeans/TagSearchGetOffenderRecords';
import { TagSearchGetPartialRecords } from '@commonbeans/TagSearchGetPartialRecords';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { Router } from '@angular/router';
import { OsipsearService } from '@inst/visits-management/service/osipsear.service';

@Component({
    selector: 'app-osioseadialog',
    templateUrl: './osioseardialog.component.html'
})

export class OsioseardialogComponent implements OnInit {
    title: string;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    searchresultsModel: TagSearchGetOffenderRecords = new TagSearchGetOffenderRecords();
    psoffnameModel: TagSearchGetPartialRecords = new TagSearchGetPartialRecords();
    psoffnameData: TagSearchGetPartialRecords[] = [];
    dlgColumnDefs: any[] = [];
    rowData: any[] = [];
    data: any;
    msgs: any[] = [];
    selectedRow = -1;
    constructor(private osiosearFactory: OsiosearService, public translateService: TranslateService ,private router: Router,private osipsearFactory: OsipsearService) { }
    ngOnInit() {
        this.searchresultsModel = this.dialog.data;
        // if (this.dialog.data.length > 0) {
        /*if  (this.dialog.data.title) {
            this.title = this.dialog.data.title;
            this.rowData = this.dialog.data.data;

        } else {
            this.title = 'Search Result';
            this.rowData = this.dialog.data;
        }*/
        
        //     } else {
        // }
        this.dlgColumnDefs = [
            { fieldName: this.translateService.translate('osiosear.lastname'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('osiosear.hits'), field: 'hits', editable: false, width: 150 },
            { fieldName: this.translateService.translate('osiosear.secondmiddlename'), field: 'secondMiddleName', editable: false, width: 150 },
        ];

            if(this.router.url === '/OSIPSEAR' || this.router.url=== '/OCDPERSO' || this.router.url=== '/OIDVISIT'){
                this.pspersonnameExecuteQuery();
            }else{
                 this.osiosearPsOffNameExecuteQuery();
            }
        
    }
    osiosearPsOffNameExecuteQuery() {
        const psoffnameResult = this.osiosearFactory.
            psOffNameExecuteQuery(this.searchresultsModel);
        psoffnameResult.subscribe(psoffnameResultList => {
            if (psoffnameResultList.length === 0) {
                this.psoffnameData = [];
                //this.dialog.close(null);
                this.show(this.translateService.translate('common.querycaused'), 'warn');
            } else {
                this.psoffnameData = psoffnameResultList;
                 this.psoffnameModel = psoffnameResultList[0];
                this.rowData = this.psoffnameData;
                this.selectedRow = 0;

            }
        });
    }
    cancel(): void {
        this.dialog.close(null);
    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowSelectOffender(event) {
        this.psoffnameModel = event;
    }
    display() {
        this.dialog.close(this.psoffnameModel);
    }

    pspersonnameExecuteQuery() {
        const pspersonnameResult = this.osipsearFactory.
           psPersonNameExecuteQuery(this.searchresultsModel);
        pspersonnameResult.subscribe(psoffnameResultList => {
            if (psoffnameResultList.length === 0) {
                this.psoffnameData = [];
                this.show(this.translateService.translate('common.querycaused'), 'warn');
            } else {
                this.psoffnameData = psoffnameResultList;
                 this.psoffnameModel = psoffnameResultList[0];
                this.rowData = this.psoffnameData;
                this.selectedRow = 0;

            }
        });
    }
}
