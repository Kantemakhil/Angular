import {
    Component,
    OnInit,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OsistgkwService } from '../service/osistgkw.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StgSearchV1CommitBean } from '@instSecurityThreatGroupsbeans/StgSearchV1CommitBean';
import { StgSearchV1 } from '@instSecurityThreatGroupsbeans/StgSearchV1';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
    selector: 'app-osistgkw',
    templateUrl: './osistgkw.component.html'
})

export class OsistgkwComponent implements OnInit {
    msgs: any[] = [];
    stgSearchV1Data: StgSearchV1[] = [];
    stgSearchV1Model: StgSearchV1 = new StgSearchV1();
    stgSearchV1CommitModel: StgSearchV1CommitBean = new StgSearchV1CommitBean();
    stgSearchV1Index = -1;
    stgsearchv1InsertList: StgSearchV1[] = [];
    stgsearchv1UpdatetList: StgSearchV1[] = [];
    stgsearchv1DeleteList: StgSearchV1[] = [];
    disabled: boolean;
    options: any[];
    optTile: any;
    stgSearchV1ColumnDef: any[];
    identifierText: string;
    keywordText: string;
    isClearDis: boolean;
    namesReadOnly: boolean;
    isRetBtnFlg: boolean;
    gobtnflag: boolean;
    constructor(private osistgkwFactory: OsistgkwService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        public dialogService: DialogService) {
        this.stgSearchV1ColumnDef = [];
    }
    ngOnInit() {
        this.isRetBtnFlg = false;
        this.namesReadOnly = false;
        this.gobtnflag = false;
        this.isClearDis = true;
        this.options = [
            { code: 'IDENTIFYING WORDS', description: 'IDENTIFYING WORDS', listSeq: 1, },
            { code: 'GROUP CHARACTERISTICS', description: 'GROUP CHARACTERISTICS', listSeq: 2, },
        ];
        this.optTile = { code: this.trMsg('osistgkw.identifiers') };
        this.stgSearchV1ColumnDef = [
            { fieldName: this.trMsg('common.group'), field: 'nbtStgDescp', editable: false, width: 150 },
            { fieldName: this.trMsg('common.code'), field: 'code', editable: false, width: 150 },
            { fieldName: this.trMsg('common.description'), field: 'description', editable: false, width: 150 },
            {
                fieldName: this.trMsg('common.goButton'), field: 'goPushbutton', datatype: 'launchbutton', editable: false, width: 150,
                data: 'row', updateField: 'row', modal: true, onLaunchClick: this.openGo, dialogWidth: 80
            },
        ];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    /**
     * This function navigate to another screen
     */
    openGo = (event) => {
        this.dialogService.openLinkDialog('/OIDSTGID', event, 80).subscribe(result => {
            this.gobtnflag = true;
            this.stgsearchv1ExecuteQuery();
        });

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
* This function displays the Go text
 */
    onGridInsert = () => {
        return { goPushbutton: this.trMsg('common.goButton') };
    }
    /**
*  This function will be executed when execute query call
*/
    stgsearchv1ExecuteQuery(index?) {
        if (!this.keywordText  || !this.keywordText.replace(/\s/g, '')) {
            this.show('osistgkw.keywordtext');
            return;
        }
        this.stgSearchV1Model.identifier = this.identifierText;
        this.stgSearchV1Model.keywordText = this.keywordText;
        const stgsearchv1Result = this.osistgkwFactory.
            stgSearchV1ExecuteQuery(this.stgSearchV1Model);
        stgsearchv1Result.subscribe(data => {
            if (data.length === 0) {
                this.stgSearchV1Data = [];
                if (!this.gobtnflag) {
                    this.show('common.querycaused');
                }
                this.gobtnflag = false;
                this.namesReadOnly = false;
                return;
            } else {
                this.gobtnflag = false;
                data.forEach(element => {
                    element['goPushbutton'] = this.trMsg('common.goButton');
                });
                this.stgSearchV1Data = data;
                this.stgSearchV1Index = index && index > -1 ? index : 0;
                this.namesReadOnly = true;
                this.isRetBtnFlg = true;
            }
        });
    }
    /**
*  This function will be executed when lov data changes
 */
    identifierTextBlur() {
        if (!this.stgSearchV1Model.identifier) {
            this.stgSearchV1Model.identifier = this.stgSearchV1Model.identifier === '' ? undefined : '';
        }
    }
    /**
     * This function will be executed when keyword text is enterd
    */
    onStgGroupChange() {
        if (this.keywordText) {
            this.isClearDis = false;
        } else {
            this.isClearDis = true;
        }
    }
    /**
 *  This function will be executed when Exit event is
 * fired
 */
    cancel() {
        this.keywordText = null;
        this.identifierText = null;
        this.stgSearchV1Data = [];
        this.stgSearchV1Model = new StgSearchV1();
        this.namesReadOnly = false;
        this.isClearDis = true;
        this.isRetBtnFlg = false;
    }
}
