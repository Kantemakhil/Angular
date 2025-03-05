import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { OiustgasService } from '../service/oiustgas.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { SecurityThreatGroups } from '@instincidentsbeans/SecurityThreatGroups';
@Component({
    selector: 'app-oiustgaslov',
    templateUrl: './oiustgaslov.component.html'
})

export class OiustgaslovComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    lovColumnDef = [];
    lovData = [];
    lovModel : SecurityThreatGroups = new SecurityThreatGroups();
    tableIndex: number;
    constructor(private oiustgasFactory: OiustgasService,
        public translateService: TranslateService) { }
    ngOnInit() {
        this.lovColumnDef = [
            {
                fieldName: this.translateService.translate('oiustgas.description'), field: 'description', datatype: 'text',
                editable: false, width: 300
            },
            {
                fieldName: this.translateService.translate('common.code'), field: 'stgCode', datatype: 'text',
                editable: false, width: 200
            },
            {
                fieldName: this.translateService.translate('oiustgas.group'), field: 'description1', datatype: 'text',
                editable: false, width: 240
            },
        ];
        const stggrpServiceObj = this.oiustgasFactory.
            stgGrpRecordGroup();
        stggrpServiceObj.subscribe(stggrpList => {
            if (stggrpList.length === 0) {
                this.lovData = [];
                this.lovModel = new SecurityThreatGroups();
            } else {
                this.lovData = stggrpList;
                this.tableIndex = 0;
            }
        });

    }
    onRowClickLov(event) {
        if(event){
            this.lovModel = event;
        }else{
            this.lovModel = new SecurityThreatGroups ();
        }
    }
    onButExitclick(event) {
        this.dialog.close(null);
    }
    onButSelectclick(){
        if(this.lovModel){
            this.dialog.close({ description: this.lovModel.description1, stgId: this.lovModel.stgId });
        }else{
            this.dialog.close(null);
        }
    }

    get selectBtnDisable(){
        if(this.lovData && this.lovData.length > 0){
            return false;
        }
        return true;
    }

}
