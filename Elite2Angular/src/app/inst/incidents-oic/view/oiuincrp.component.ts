import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiuincrpService } from '../service/oiuincrp.service';
import { AgencyIncidentRepairs } from '@instincidentsbeans/AgencyIncidentRepairs';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
    selector: 'app-oiuincrp',
    templateUrl: './oiuincrp.component.html'
})
export class OiuincrpComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    agyincData: AgencyIncidentRepairs[] = [];
    agyincDataTemp: AgencyIncidentRepairs[] = [];
    agyincModel: AgencyIncidentRepairs = new AgencyIncidentRepairs();
    agyincIndex = 0;
    agyincInsertList: AgencyIncidentRepairs[] = [];
    agyincUpdatetList: AgencyIncidentRepairs[] = [];
    agyincDeleteList: AgencyIncidentRepairs[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    repairColumnDef: any[] = [];
    columnDefs: any[] = [];
    constructor(private oiuincrpFactory: OiuincrpService,
            public translateService: TranslateService) {
        this.repairColumnDef = [

            { fieldName: this.translateService.translate('oiuincrp.repair'), field: 'repairType', datatype: 'lov', domain: 'REPAIR_TYPE', editable: true, width: 200 },
            { fieldName: this.translateService.translate('oiuincrp.cost'), field: 'repairCost' , datatype: 'textbox', editable: true, width: 200 },
            { fieldName: this.translateService.translate('oiuincrp.comment'), field: 'commentText', datatype: 'text', editable: true, width: 400 }
        ];
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.oiuincrpExecuteQuery();
    }
    onRowClickagyinc(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
        this.dialog.close(null);
    }
    oiuincrpExecuteQuery() {
        this.agyincModel = new AgencyIncidentRepairs();
        this.agyincModel.agencyIncidentId = this.dialog.data.agencyIncidentId;
        const agyincResult = this.oiuincrpFactory.
            agyincExecuteQuery(this.agyincModel);
        agyincResult.subscribe(agyincResultList => {
            if (agyincResultList.length === 0) {
                this.agyincData = [];
            } else {
                agyincResultList.forEach(data => {
                    if (data.repairCost && String(data.repairCost).indexOf('.') < 0) {
                        data.repairCost = data.repairCost + '.00';
                    }
                });
                this.agyincData = agyincResultList;
                this.agyincModel = agyincResultList[0];
            }
        });
    }



}


