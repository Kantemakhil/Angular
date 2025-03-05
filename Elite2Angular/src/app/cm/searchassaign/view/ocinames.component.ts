import {
    Component,
    Input,
    OnInit,
    ViewChild,
    Output, EventEmitter
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcinamesService } from '../service/ocinames.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VPimsNameSearch } from '@cm/searchassaign/beans/VPimsNameSearch';
import { Router } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';

@Component({
    selector: 'app-ocinames',
    templateUrl: './ocinames.component.html'
})

export class OcinamesComponent implements OnInit {
    @ViewChild('ocinamesForm', {static: true}) form: any;
    @Input() namesearch: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    @Input() isDialog: any;
    @Output() afterDialogClosed: EventEmitter<any> = new EventEmitter<any>();
    nameOfLovPage: string;
    listToCompare: any[] = [];
    vnsearchData: VPimsNameSearch[] = [];
    vnsearchDataTemp: VPimsNameSearch[] = [];
    vnsearchModel: VPimsNameSearch = new VPimsNameSearch();
    vnsearchModelData: VPimsNameSearch = new VPimsNameSearch();
    ocittaskSharedData: VPimsNameSearch = new VPimsNameSearch();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vnsearchIndex: number;
    vnsearchInsertList: VPimsNameSearch[] = [];
    vnsearchUpdatetList: VPimsNameSearch[] = [];
    vnsearchDeleteList: VPimsNameSearch[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    vNSearchColumnDef: any[];
    offagyColumnDef: any[];
    offagyReadOnly: boolean;
    offagy1ReadOnly: boolean;
    vNSearchReadOnly: boolean;
    tableIndex = -1;
    clearDisable: boolean;
    selectDisable: boolean;
    retriveDisable: boolean;
    cancelDisable: boolean;
    namesReadOnly: boolean;
    dialogFlag: boolean;
    routUrl: any;
    @Input() enableQuerySearch: boolean = false;
    @Output() assignRecord: EventEmitter<any> = new EventEmitter<any>();
    constructor(private ocinamesFactory: OcinamesService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private router: Router,
        private osiosearFactory: OsiosearService,
        private offenderSearchService: OffenderSearchService,
        public dialogService: DialogService) {
        this.vNSearchColumnDef = [];
        this.offagyColumnDef = [];
    }
    ngOnInit() {
        this.selectDisable = true;
        this.cancelDisable = false;
        this.retriveDisable = false;
        this.namesReadOnly = false;
        this.clearDisable = true;
        this.dialogFlag = false;
        this.vNSearchColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('system-profile.birth-date'), field: 'birthDate', datatype: 'date',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.location'), field: 'prisonLocation',
                editable: false, width: 150
            },
        ];
        if(!this.enableQuerySearch){
            this.vnsearchExecuteQuery();
        if (this.namesearch) {
            this.vnsearchModel = this.namesearch;
            this.dialogFlag = true;
            this.vnsearchExecuteQuery();
        } else {
            this.dialogFlag = false;
        }
        }
        this.form.valueChanges.subscribe(data => {
            const keys = Object.keys(data);
            const count = { i: 0 };
            if (this.vnsearchData.length === 0) {
                do {
                    if (!data[keys[count.i]]) {
                        this.clearDisable = true;
                    } else {
                        this.clearDisable = false;
                    }
                    count.i++;
                } while (this.clearDisable && count.i < keys.length);
            }
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
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    onRowClickvnsearch(event) {
        this.vHeaderBlockModel = new VHeaderBlock();
        if (event) {
            if(!this.enableQuerySearch){
                this.vnsearchModelData = event;
               this.ocittaskSharedData = JSON.parse(JSON.stringify(this.vnsearchModelData));
                this.vnsearchModelData.agyLocId = this.sessionManager.currentCaseLoad;
                this.vnsearchModelData.offenderBookId = null;
            }else{
                this.assignRecord.emit(event);
            }
           // this.ok();
        }
    }
    ok() {
        const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vnsearchModelData);
        offbkGlobal.subscribe(list => {
            if (list.length > 0) {
                this.vHeaderBlockModel = list[0];
                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                if (this.dialogFlag) {
                    this.ocinamesFactory.offsearch = {
                        'offenderIdDisplay': this.vHeaderBlockModel.offenderIdDisplay, 'lname': this.vHeaderBlockModel.lastName,
                        'fname': this.vHeaderBlockModel.firstName,
                        'offenderBookId': this.vHeaderBlockModel.offenderBookId, 'nbtInst': this.vHeaderBlockModel.agyLocId,
                        'offenderId': this.vHeaderBlockModel.offenderId
                  };
                }
                if (this.isDialog) {
                    const dialogData = JSON.parse(JSON.stringify(this.vHeaderBlockModel));
                    this.afterDialogClosed.emit(dialogData);
                    return;
              }
                if (this.routUrl) {
                    this.router.navigate([this.routUrl]);
                    return;
                  }
                if (!this.ocinamesFactory.oiiflag) {
                    this.ocinamesFactory.oiinamesflag = false;
                    this.router.navigate(['/OWHEADER']);
                    return;
                }
            }else{
                this.router.navigate(['/OWHEADER']);
                return;
            }
        });
    }
    no() {
    }
    clearQuery() {
        this.vnsearchData = [];
        this.vnsearchModel = new VPimsNameSearch();
        this.vnsearchModelData = new VPimsNameSearch();
        this.clearDisable = true;
        this.selectDisable = true;
        this.retriveDisable = false;
        this.cancelDisable = false;
        this.namesReadOnly = false;
        if(this.enableQuerySearch){
            this.assignRecord.emit(null);
        }
    }
    cancel() {
        if (this.isDialog) {
            this.afterDialogClosed.emit(null);
            return null;
      }
        if (this.routUrl) {
            this.router.navigate([this.routUrl]);
            return;
          }
          if (!this.ocinamesFactory.oiiflag) {
            this.ocinamesFactory.oiinamesflag = false;
            this.router.navigate(['/home']);
            return;
        }
    }
    onOffenderChange() {
        this.ocinamesFactory.ocittaskSharedData = JSON.parse(JSON.stringify(this.ocittaskSharedData));
        if (this.osiosearFactory.selectOffender) {
            this.osiosearFactory.selectOffender.offenderId = null;
        }
        this.offenderSearchService.selectedOffender = null;
        this.ok();
    }
   
    vnsearchExecuteQuery() {
        if (this.vnsearchModel.offenderIdDisplay) {
            for (let i = Number(String(this.vnsearchModel.offenderIdDisplay).length); i < 10; i++) {
                this.vnsearchModel.offenderIdDisplay = '0' + this.vnsearchModel.offenderIdDisplay;
            }
        }
        const vnsearchResult = this.ocinamesFactory.
            vNSearchExecuteQuery(this.vnsearchModel);
        vnsearchResult.subscribe(vnsearchResultList => {
            if (vnsearchResultList.length === 0) {
                this.vnsearchData = [];
                this.show('common.querycaused');
            } else {
                this.vnsearchData = vnsearchResultList;
                this.tableIndex = 0;
                this.clearDisable = false;
                this.namesReadOnly = true;
                this.selectDisable = false;
                this.retriveDisable = true;
                this.cancelDisable = true;
            }
        });
    }
    isInsertable() {
        if (this.vnsearchModel.lastName || this.vnsearchModel.firstName || this.vnsearchModel.middleName
            || this.vnsearchModel.offenderIdDisplay) {
            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }
}
