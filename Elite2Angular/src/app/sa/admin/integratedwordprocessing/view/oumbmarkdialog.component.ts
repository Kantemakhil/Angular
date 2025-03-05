import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { IwpBookmarks } from '@sa/admin/integratedwordprocessing/beans/IwpBookmarks';
import { OumdtempService } from '@sa/admin/integratedwordprocessing/service/oumdtemp.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
    selector: 'app-oumbmarkdialog',
    templateUrl: './oumbmarkdialog.component.html'
})

export class OumbmarkdialogComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    nameOfLovPage: string;
    bookmarksData: IwpBookmarks[] = [];
    bookmarksModel: IwpBookmarks = new IwpBookmarks();
    bookmarksIndex: Number = 0;
    bookmarksColumnDef: any[];
    constructor(private oumdtempFactory: OumdtempService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.bookmarksColumnDef = [];

    }
    ngOnInit() {
        this.oumbmarkexecuteQuery();
        this.bookmarksColumnDef = [
            {
                fieldName: this.translateService.translate('common.name'), field: 'bookmarkName', editable: false, width: 150,
            },
            {
                fieldName: this.translateService.translate('common.description'), field: 'description', editable: false,
                width: 150,

            },
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
    oumbmarkexecuteQuery() {
        const serviceObj = this.oumdtempFactory.rgBmListRecordGroup();
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.bookmarksData = [];
                this.show('common.querycaused');
                return;
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.sqlVerifiedFlag = element.sqlVerifiedFlag === 'Y' ? true : false;
                });
                this.bookmarksData = data;

            }
        });
    }
    onRowClickEvent(event) {
        if (event) {
            this.bookmarksModel = new IwpBookmarks();
            this.bookmarksModel = event;
        }
    }

    processResult() {
        if ( this.bookmarksModel.bookmarkName ) {
                this.dialog.close({description: this.bookmarksModel.description, templateName: this.bookmarksModel.bookmarkName });
        } else {
            this.dialog.close(null);
        }

    }
    clearData() {
        this.dialog.close(null);
    }
}

