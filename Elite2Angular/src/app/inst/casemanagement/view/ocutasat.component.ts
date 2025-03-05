import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcutasatService } from '../service/ocutasat.service';
import { Teams } from '@instCaseManagementbeans/Teams';
import { Router } from '@angular/router';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcunotcmService } from '@inst/casemanagement/service/ocunotcm.service';
// import required bean declarations

@Component({
    selector: 'app-ocutasat',
    templateUrl: './ocutasat.component.html'
    //  styleUrls: ['./ocutasat.component.css']
})

export class OcutasatComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    teamsData: Teams[] = [];
    teamsDataTemp: Teams[] = [];
    teamsModel: Teams = new Teams();
    teamsSelectModel: Teams = new Teams();
    teamsIndex: number;
    teamsInsertList: Teams[] = [];
    teamsUpdatetLis: Teams[] = [];
    teamsDeleteList: Teams[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    offCaseNrColumnDef: any[];
    teamsColumnDef: any[];
    offCaseNoteReadOnly: boolean;
    amendNoteReadOnly: boolean;
    offCaseNrReadOnly: boolean;
    srchCtrlReadOnly: boolean;
    teamsReadOnly: boolean;
    butCtrlReadOnly: boolean;
    rgareatypeRg: any[] = [];
    rgareaRg: any[] = [];
    locationLink: string;
    areaTypeLink: string;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    caseLoadId: string;
 caseLoadType: string;
  selectBtnFlag = true;
  readeOnlyFields:boolean;
  areaField: boolean;
    constructor(private ocutasatFactory: OcutasatService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private router: Router, public dialogService: DialogService,
        private ocunotcmFactory: OcunotcmService) {
        this.offCaseNrColumnDef = [];
        this.teamsColumnDef = [];
        // onGridReady(event){
        // }
    }
    ngOnInit() {
        this.readeOnlyFields = false;
        this.areaField = false;
        this.areaTypeLink = 'ocutasat/rgAreaTypeRecordGroup';
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.caseLoadType = this.sessionManager.currentCaseLoadType;
        this.teamsColumnDef = [
            { fieldName: this.translateService.translate('ocutasat.teamname'), field: 'teamCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocutasat.description'), field: 'description', editable: false, width: 150 },
        ];
        //  var serviceObj;
        const rgareatypeServiceObj = this.ocutasatFactory.rgAreaTypeRecordGroup();
        rgareatypeServiceObj.subscribe(rgareatypeList => {
            if (rgareatypeList.length === 0) {
                this.rgareatypeRg = [];
            } else {
                for (let i = 0; i < rgareatypeList.length; i++) {
                    this.rgareatypeRg.push({
                        'text': rgareatypeList[i].code + ' - ' +
                            rgareatypeList[i].description, 'id': rgareatypeList[i].code
                    });
                }
            }
        });

        if (this.dialog && this.dialog.data) {
            const data = this.dialog.data;
            this.teamsModel.functionType = data.functionType;

        }

    }
    onRowClickteams(event) {
        if (event) {
            this.teamsSelectModel = new Teams();
            this.teamsSelectModel = event;
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    select()   {
        if (!this.teamsModel.nbtAtDesc) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocutasat.pleaseenterarea');
            this.show();
            return;
        }
        if (!this.teamsSelectModel.description) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocutasat.selecterror');
            this.show();
            return;
        }
        this.dialog.data = undefined;
        this.dialog.close({ teamIdDesc: this.teamsSelectModel.description, teamId: this.teamsSelectModel.teamId,
             teamCode: this.teamsSelectModel.teamCode});
    }
    clear() {
      this.teamsData = [];
        this.teamsModel = new Teams ();
        this.selectBtnFlag = false;
        this.readeOnlyFields = false;
        this.areaField = true;
    }
    get selectButtontnFlag() {
        if ((!this.teamsModel.nbtAtDesc ) || (this.teamsData.length > 0)) {
            return false;
        } else {
            return true;
        }
    }
    onAreaTypeChnage() {
        if (!this.teamsModel.nbtAtDesc) {
            this.teamsModel.nbtAtDesc = this.teamsModel.nbtAtDesc === '' ? undefined : '';
		}
    }

    

   
    get clrBtnFlag() {
        if (this.teamsData.length === 0 && !this.teamsModel.nbtAtDesc) {
        return true;
        } else {
        return false;
        }
        }
    cancel() {
        this.dialog.close(null);
    }
    changeCenterType(event) {
        if (event) {
            this.teamsModel.agyLocId = event.code;
            this.teamsExecuteQuery();
    }
}
   

    teamsExecuteQuery() {
        this.teamsModel.activeFlag = 'Y';
        if (this.dialog && this.dialog.data) {
            const data = this.dialog.data;
            this.teamsModel.functionType = data.functionType;
        }
        const teamsResult = this.ocutasatFactory.teamsExecuteQuery(this.teamsModel);
        teamsResult.subscribe(data => {
            if (data.length === 0) {
                this.teamsData = [];
                this.selectBtnFlag = true;
                this.areaField = false;
                this.readeOnlyFields = false;
                this.type = 'warn';
            this.message = this.translateService.translate('common.querycaused');
            this.show();
            } else {
                this.teamsData = data;
                this.selectBtnFlag = false;
                this.areaField = true;
                this.readeOnlyFields = true;
                // this.teamsModel = data[0];
            }
        });
    }
}

