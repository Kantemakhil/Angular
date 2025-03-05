import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcucondiService } from '../service/ocucondi.service';


@Component({
    selector: 'ocucondidialog-progref',
    templateUrl: './ocucondidialog-progref.component.html',
})

export class OcucondiDialogProgref implements OnInit {
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    offencesResultCodeColumndef: any[];
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    offensesResultCodeData: any;
    offensesDataModel = {};
    specificTitle: String;
    constructor(private service: OcucondiService,
        public translateService: TranslateService) {
        this.offencesResultCodeColumndef = [];
    }

    ngOnInit() {
        this.offensesResultCodeGridData();
        if (this.dialog.data) { 
            this.specificTitle = this.dialog.data.description;
        }
        this.offencesResultCodeColumndef = [
            {
                fieldName: this.translateService.translate('ocuacond.code'),
                field: 'code', editable: true, width: 180
            },
            {
                fieldName: this.translateService.translate('ocuacond.description'),
                field: 'description', editable: false, width: 180
            },
            {
                fieldName: '',
                field: 'id', editable: false, width: 180, hide: true
            }
        ];
    }
    offensesResultCodeGridData() {
        const programCodeData = this.service.getProgram();
        programCodeData.subscribe(list => {
            this.offensesResultCodeData = list;
        });
    }
    onDialogRowClickEvent(event) {
        this.offensesDataModel['description'] = event.description;
        this.offensesDataModel['code'] = event.code;
        this.offensesDataModel['programId'] = event.id;
    }
    processSelectedData() {
        if (this.offensesDataModel['programId']) {
            this.dialog.close({
                code: this.offensesDataModel['code'],
                description: this.offensesDataModel['description'],
                programId: this.offensesDataModel['programId']
            });
        } else {
            this.message = this.translateService.translate('Please select a record');
            this.type = 'warn';
            this.show()
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    exit(): void {
        this.dialog.close(null);
    }
}
