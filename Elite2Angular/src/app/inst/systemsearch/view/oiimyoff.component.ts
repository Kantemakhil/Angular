import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OiimyoffService } from '../service/oiimyoff.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { VNameSearch } from '@commonbeans/VNameSearch';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-oiishlog',
    templateUrl: './oiimyoff.component.html'
})

export class OiimyoffComponent implements OnInit {
    myOffendersColumnDef: any[];
    msgs: { message: any; type: any; }[];
    myOffenderRetDataModel: any;
    myOffenderRetData: never[];
    tableIndex: number;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockSearchModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockData: VHeaderBlock[] = [];
    namesrchModelTemp: VNameSearch = new VNameSearch();
    offenderRowData: any[] = [];
    shouldRedirect = false;
    routUrl: string;
    constructor(private oiimyoffFactory: OiimyoffService,
        public translateService: TranslateService, private sessionManager: UserSessionManager,
        private osiosearFactory: OsiosearService, private offenderSearchService: OffenderSearchService,
        private router: Router) {
        this.myOffendersColumnDef = [];

    }
    ngOnInit() {
        this.myOffendersColumnDef = [
            {
                fieldName: this.translateService.translate('oiimyoff.lastname'), field: 'lastName',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiimyoff.firstname'),
                field: 'firstName', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiimyoff.middlename'),
                field: 'middleName', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiimyoff.pid'),
                field: 'offenderIdDisplay', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiimyoff.intakenumber'),
                field: 'bookingNo', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiimyoff.facility'),
                field: 'agyLocId', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiimyoff.housinglocation'),
                field: 'livingUnitDescription', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiimyoff.myCasePlanRole'),
                field: 'casePlanFlag', editable: false, width: 150, datatype: 'text'
            },
        ];

        this.getMyOffendersList();
    }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickmyOffender(event, redirect?) {
        if (event && redirect == true) {
            this.namesrchModelTemp = event;
            this.oiimyoffFactory.offenderRowData.push(this.namesrchModelTemp);         
        }
        this.shouldRedirect = true;
    }
    selectButton (){
        this.gettingHeaderData();
        this.onOffenderChange();
    }

    gettingHeaderData() {
        this.namesrchModelTemp.agyLocId = this.sessionManager.currentCaseLoad;
        const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.namesrchModelTemp);
        offbkGlobal.subscribe(list => {
            if (list.length > 0) {
                this.vHeaderBlockModel = list[0];
                if (this.osiosearFactory.selectOffender) {
                    this.osiosearFactory.selectOffender.offenderId = null;
                }
                this.offenderSearchService.selectedOffender = null;
                this.oiimyoffFactory.oiinamesflag = true;
                this.oiimyoffFactory.agencyIncidentsModeldataTemp;
                this.oiimyoffFactory.ctrEveModelTemp;
                this.vHeaderBlockModel.movementReason = this.vHeaderBlockModel.agyLocId;
                this.vHeaderBlockModel.prisonLocation = this.vHeaderBlockModel.livingUnitDescription;
                this.vHeaderBlockModel.status1 = this.vHeaderBlockModel.inOutStatus;
                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                this.oiimyoffFactory.offsearch = {
                    'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
                    'fname': this.namesrchModelTemp.firstName,
                    'offenderBookId': this.namesrchModelTemp.offenderBookId, 'nbtInst': this.namesrchModelTemp.agyLocId
                };
                if (this.routUrl) {
                    this.router.navigate([this.routUrl]);
                    return;
                }
             /*    if (this.oiimyoffFactory.oiiflag) {
                    this.router.navigate(['/OIDINCDE']);
                    return;
                } */
                if (!this.oiimyoffFactory.oiiflag) {
                    this.oiimyoffFactory.oiinamesflag = false;
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
        this.oiimyoffFactory.oiinamesflag = true;
        this.oiimyoffFactory.agencyIncidentsModeldataTemp;
        this.oiimyoffFactory.ctrEveModelTemp;
        this.vHeaderBlockModel.movementReason = this.vHeaderBlockModel.agyLocId;
        this.vHeaderBlockModel.prisonLocation = this.vHeaderBlockModel.livingUnitDescription;
        this.vHeaderBlockModel.status1 = this.vHeaderBlockModel.inOutStatus;
        this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
         if (this.namesrchModelTemp.activeFlag.localeCompare('A') === 0) {
            this.vHeaderBlockModel.statusDisplay = 'Active';
        } else {
            this.vHeaderBlockModel.statusDisplay = 'Inactive';
        } 
        this.oiimyoffFactory.offsearch = {
            'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
            'fname': this.namesrchModelTemp.firstName,
            'offenderBookId': this.namesrchModelTemp.offenderBookId, 'nbtInst': this.namesrchModelTemp.agyLocId
        };
        if (this.routUrl) {
            this.router.navigate([this.routUrl]);
            return;
        }
        /* if (this.oiimyoffFactory.oiiflag) {
            this.router.navigate(['/OIDINCDE']);
            return;
        } */
        if (!this.oiimyoffFactory.oiiflag) {
            this.oiimyoffFactory.oiinamesflag = false;
            this.router.navigate(['/home']);
            return;
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



    getMyOffendersList() {
        this.vHeaderBlockSearchModel.caseLoadId = this.sessionManager.currentCaseLoad;
        const namesrchResult = this.oiimyoffFactory.
            getMyOffendersList(this.vHeaderBlockSearchModel);
        namesrchResult.subscribe(data => {
            if (data.length === 0) {
                this.vHeaderBlockData = [];
                return;
            } else {
                this.vHeaderBlockData = data;
                this.vHeaderBlockModel = data[0];
                this.tableIndex = 0;
            }
        });
    }

}
