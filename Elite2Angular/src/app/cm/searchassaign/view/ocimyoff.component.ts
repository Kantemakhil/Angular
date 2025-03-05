import {
    Component, OnInit,  Input,Output, EventEmitter
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcimyoffService } from '../service/ocimyoff.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VPimsNameSearch } from '@cm/searchassaign/beans/VPimsNameSearch';
import { Router } from '@angular/router';
import { VNameSearch } from '@commonbeans/VNameSearch';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
    selector: 'app-oiishlog',
    templateUrl: './ocimyoff.component.html'
})

export class OcimyoffComponent implements OnInit {
    myOffendersColumnDef: any[];
    msgs: { message: any; type: any; }[];
    myOffenderRetDataModel: any;
    myOffenderRetData: never[];
    tableIndex: number;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockSearchModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockData: VHeaderBlock[] = [];
    vnsearchModelData: VPimsNameSearch = new VPimsNameSearch();
    dialogFlag: boolean;
    @Input() isDialog: any;
    @Output() afterDialogClosed: EventEmitter<any> = new EventEmitter<any>();
    routUrl: any;
    shouldRedirect = false;
    offenderRowData: any[] = [];
    namesrchModelTemp: VHeaderBlock = new VHeaderBlock();
    namesrchModelTempRetrive: VHeaderBlock = new VHeaderBlock();
    constructor(private ocimyoffFactory: OcimyoffService,
        public translateService: TranslateService, private sessionManager: UserSessionManager,
            private osiosearFactory: OsiosearService, private offenderSearchService: OffenderSearchService,
          private router: Router, public dialogService: DialogService) {
        this.myOffendersColumnDef = [];

    }
    ngOnInit() {
        this.dialogFlag = false;
        this.myOffendersColumnDef = [
            {
                fieldName: this.translateService.translate('ocimyoff.lastname'), field: 'lastName',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocimyoff.firstname'),
                field: 'firstName', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocimyoff.middlename'),
                field: 'middleName', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocimyoff.pid'),
                field: 'offenderIdDisplay', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocimyoff.intakenumber'),
                field: 'bookingNo', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocimyoff.communityoffice'),
                field: 'livingUnitDescription', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocimyoff.primaryownership'), field: 'casePlanFlag', datatype: 'checkbox',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocimyoff.conditionallocated'), field: 'conditionsFlag', datatype: 'checkbox',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate(' '), field: 'cBtn', datatype: 'hyperlink', displayas: 'href', styleClass: 'launch',
                width: 150,  modal: true, data: 'row', onLaunchClick: this.onconditionallocated
            },
            {
                fieldName: this.translateService.translate('ocimyoff.courtreport'), field: 'courtReportFlag', datatype: 'checkbox',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate(' '), field: 'sBtn', datatype: 'hyperlink', displayas: 'href', styleClass: 'launch',
                width: 150,  modal: true, data: 'row', onLaunchClick: this.onEditLaunchClickRep
            },
            {
                fieldName: this.translateService.translate('ocimyoff.courtaction'), field: 'courtActionFlag', datatype: 'checkbox',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate(' '), field: 'gBtn', datatype: 'hyperlink', displayas: 'href', styleClass: 'launch',
                width: 150, modal: true, data: 'row', onLaunchClick: this.onEditLaunchClick
            },
        ];
        this.getMyOffendersList();

    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    onEditLaunchClick = (data) => {
        if (data) {
            if(!data.courtActionFlag || data.courtActionFlag === 'N'){
                this.show(this.translateService.translate('ocimyoff.nocourtactiondataissavedforthisoffender'), 'warn');
                return true;
            } else {
                this.namesrchModelTempRetrive=new VHeaderBlock();
                this.namesrchModelTempRetrive.agyLocId = this.sessionManager.currentCaseLoad;
                this.namesrchModelTempRetrive.offenderBookId = data.offenderBookId;
                const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.namesrchModelTempRetrive);
                offbkGlobal.subscribe(list => {
                    if (list.length > 0) {
                        this.vHeaderBlockModel = list[0];
                        if (this.osiosearFactory.selectOffender) {
                            this.osiosearFactory.selectOffender.offenderId = null;
                        }
                        this.offenderSearchService.selectedOffender = null;
                        this.ocimyoffFactory.oiinamesflag = true;
                        this.ocimyoffFactory.agencyIncidentsModeldataTemp;
                        this.ocimyoffFactory.ctrEveModelTemp;
                        this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                        this.ocimyoffFactory.offsearch = {
                            'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
                            'fname': this.namesrchModelTemp.firstName,
                            'offenderBookId': this.namesrchModelTemp.offenderBookId
                        };
                    }
                    this.router.navigate(['/OCDENFOR']);
                });
            }
        }
    }
    
    onEditLaunchClickRep= (data) => {
        if (data) {
            if(!data.courtReportFlag || data.courtReportFlag === 'N'){
                this.show(this.translateService.translate('ocimyoff.nocourtreportdataissavedforthisoffender'), 'warn');
                return true;
            } else {
            this.namesrchModelTempRetrive=new VHeaderBlock();
            this.namesrchModelTempRetrive.agyLocId = this.sessionManager.currentCaseLoad;
            this.namesrchModelTempRetrive.offenderBookId = data.offenderBookId;
            const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.namesrchModelTempRetrive);
            offbkGlobal.subscribe(list => {
                if (list.length > 0) {
                    this.vHeaderBlockModel = list[0];
                    if (this.osiosearFactory.selectOffender) {
                        this.osiosearFactory.selectOffender.offenderId = null;
                    }
                    this.offenderSearchService.selectedOffender = null;
                    this.ocimyoffFactory.oiinamesflag = true;
                    this.ocimyoffFactory.agencyIncidentsModeldataTemp;
                    this.ocimyoffFactory.ctrEveModelTemp;
                    this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                    this.ocimyoffFactory.offsearch = {
                        'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
                        'fname': this.namesrchModelTemp.firstName,
                        'offenderBookId': this.namesrchModelTemp.offenderBookId
                    };
                }
                this.router.navigate(['/OCDPSREP']);
            });
        }
    }
    }
    getMyOffendersList() {
        this.vHeaderBlockSearchModel.caseLoadId = this.sessionManager.currentCaseLoad;
        const namesrchResult = this.ocimyoffFactory.
            getMyOffendersList(this.vHeaderBlockSearchModel);
        namesrchResult.subscribe(data => {
            if (data.length === 0) {
                this.vHeaderBlockData = [];
                return;
            } else {
                data.forEach(element => {                  
                    element.casePlanFlag = element.casePlanFlag === 'Y' ? true : false;
                    element.conditionsFlag = element.conditionsFlag === 'Y' ? true : false;                   
                    element.courtReportFlag = element.courtReportFlag === 'Y' ? true : false;
                    element.courtActionFlag = element.courtActionFlag === 'Y' ? true : false;  
                    element['sBtn'] = '';
                    element['gBtn'] = ''; 
                    element['cBtn'] = '';         
                });
                this.vHeaderBlockData = data;
                this.vHeaderBlockModel = data[0];
                this.namesrchModelTemp = data[0];
                this.tableIndex = 0;
            }
        });
    }


    gettingHeaderData() {
        this.namesrchModelTempRetrive=new VHeaderBlock();
        this.namesrchModelTempRetrive.agyLocId = this.sessionManager.currentCaseLoad;
        this.namesrchModelTempRetrive.offenderBookId = this.namesrchModelTemp.offenderBookId;
        const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.namesrchModelTempRetrive);
        offbkGlobal.subscribe(list => {
            if (list.length > 0) {
                this.vHeaderBlockModel = list[0];
                if (this.osiosearFactory.selectOffender) {
                    this.osiosearFactory.selectOffender.offenderId = null;
                }
                this.offenderSearchService.selectedOffender = null;
                this.ocimyoffFactory.oiinamesflag = true;
                this.ocimyoffFactory.agencyIncidentsModeldataTemp;
                this.ocimyoffFactory.ctrEveModelTemp;
                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                this.ocimyoffFactory.offsearch = {
                    'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
                    'fname': this.namesrchModelTemp.firstName,
                    'offenderBookId': this.namesrchModelTemp.offenderBookId
                };
                if (this.routUrl) {
                    this.router.navigate([this.routUrl]);
                    return;
                }
                if (this.ocimyoffFactory.oiiflag) {
                    this.router.navigate(['/OIDINCDE']);
                    return;
                }
                if (!this.ocimyoffFactory.oiiflag) {
                    this.ocimyoffFactory.oiinamesflag = false;
                    this.router.navigate(['/OWHEADER']);
                    return;
                }
            }
        });
    }


    onOffenderChange() {
        if (this.osiosearFactory.selectOffender) {
            this.osiosearFactory.selectOffender.offenderId = null;
        }
        this.offenderSearchService.selectedOffender = null;
        this.ocimyoffFactory.oiinamesflag = true;
        this.ocimyoffFactory.agencyIncidentsModeldataTemp;
        this.ocimyoffFactory.ctrEveModelTemp;
        this.vHeaderBlockModel.movementReason = this.vHeaderBlockModel.agyLocId;
        this.vHeaderBlockModel.prisonLocation = this.vHeaderBlockModel.livingUnitDescription;
        this.vHeaderBlockModel.status1 = this.vHeaderBlockModel.inOutStatus;
        this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
        /* if (this.namesrchModelTemp.activeFlag.localeCompare('A') === 0) {
            this.vHeaderBlockModel.statusDisplay = 'Active';
        } else {
            this.vHeaderBlockModel.statusDisplay = 'Inactive';
        } */
        this.ocimyoffFactory.offsearch = {
            'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
            'fname': this.namesrchModelTemp.firstName,
            'offenderBookId': this.namesrchModelTemp.offenderBookId, 'nbtInst': this.namesrchModelTemp.agyLocId
        };
        if (this.routUrl) {
            this.router.navigate([this.routUrl]);
            return;
        }
        if (this.ocimyoffFactory.oiiflag) {
            this.router.navigate(['/OIDINCDE']);
            return;
        }
        if (!this.ocimyoffFactory.oiiflag) {
            this.ocimyoffFactory.oiinamesflag = false;
            this.router.navigate(['/home']);
            return;
        }

    }

  
   
    onRowClickmyOffender(event, redirect?) {
        if(event){
            this.vHeaderBlockModel = event;
            this.namesrchModelTemp = event;
        }
    }
    onDetailsLauchEdit = (event) => {
        if (!event.observationDetails) {
            this.show(this.translateService.translate('oiishlog.detailsarenotentered'), 'warn');
            return false;
        } else {

            return true;
        }

    }

    onOffenderChangeData() {
    this.gettingHeaderData();
    this.onOffenderChange();
}

onconditionallocated= (data) => {
    if (data) {
        if(!data.conditionsFlag || data.conditionsFlag === 'N'){
            this.show(this.translateService.translate('ocimyoff.noconditionisassignforthisoffender'), 'warn');
           return true;
        } else {        
        const event = {
            offenderBookId:  data.offenderBookId,
            agyLocId : this.sessionManager.currentCaseLoad
        };
        this.dialogService.openLinkDialog('/OCUALLCO', event, 80).subscribe(result => {
          if (result) {
            
          }
       });
      
    }
}
}

}
