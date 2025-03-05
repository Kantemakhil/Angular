import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';

import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OffenderObservationInquiry } from '../beans/OffenderObservationInquiry';
import { OidoffobService } from '../service/oidoffob.service';
import { OiioffobService } from '../service/oiioffob.service';

@Component({
    selector: 'app-oiioffob',
    templateUrl: './oiioffob.component.html'
})

export class OiioffobComponent implements OnInit {
    // Variable declaration
    msgs: any[] = [];
    offenderObsPerDataColumnDef: any[];
    selected = -1;
    agyLocId: any;
    zoneId: any;
    observationType: any;
    overdueFlag: any;

    offenderObsPerData: OffenderObservationInquiry[] = [];
    offenderObsPerModel: OffenderObservationInquiry = new OffenderObservationInquiry();
    offenderObsPerSearchModel: OffenderObservationInquiry = new OffenderObservationInquiry();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    imageModel: Images = new Images();
    requiredValue: boolean;
    constructor(
        public oiioffobFactory: OiioffobService,
        public sessionManager: UserSessionManager,
        public translateService: TranslateService,
        public offenderSearchService: OffenderSearchService,
        public router: Router,
        private osiosearchService: OsiosearService, private oidoffobFactory: OidoffobService) {
        this.offenderObsPerDataColumnDef = [];
    }
    ngOnInit() {
        this.requiredValue =false;
        this.offenderObsPerSearchModel =new OffenderObservationInquiry();
        this.offenderObsPerSearchModel.zoneId=undefined;
        if (this.oidoffobFactory.backButton) {
            //this.showBackbutton=true;
            this.oidoffobFactory.backButton = false;
            setTimeout(() => {
                this.offenderObsPerSearchModel = this.oidoffobFactory.searchParam;
                this.oidoffobFactory.searchParam = undefined;
                this.getOffenderPeriodInquiryQuery();
            }, 500);

        } else {

        }

        this.offenderObsPerDataColumnDef = [
            {
                fieldName: this.translateService.translate('oiioffob.id'), field: 'offenderIdDisplay', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiioffob.lastname'), field: 'lastName', editable: false, width: 150,
                datatype: 'text',
            },

            {
                fieldName: this.translateService.translate('oiioffob.firstname'), field: 'firstName', editable: false, width: 150,
                datatype: 'text',
            },

            {
                fieldName: this.translateService.translate('oiioffob.housinglocation'), field: 'livingUnitDescription', editable: false, width: 150,
                datatype: 'text',
            },

            {
                fieldName: this.translateService.translate('oiioffob.observationtype'), field: 'observationType', datatype: 'text',
                editable: false, width: 150
            },

            {
                fieldName: this.translateService.translate('oiioffob.frequency'), field: 'frequency', datatype: 'text',
                editable: false, width: 150
            },

            {
                fieldName: this.translateService.translate('oiioffob.lastdheckdate'),
                field: 'checkDate', datatype: 'date', editable: false, width: 150
            },


            {
                fieldName: this.translateService.translate('oiioffob.time'),
                field: 'checkTime', editable: true, width: 150, datatype: 'time'
            },

            {
                fieldName: this.translateService.translate('oiioffob.nextchecktime'),
                field: 'nextCheckTime', editable: true, width: 150, datatype: 'time'
            },

            {
                fieldName: this.translateService.translate('oiioffob.details'), field: 'idbutton', datatype: 'launchbutton', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, onLaunchClick: this.onDetailsClick
            },


        ];



    }
    onRowClickoffenderObsPerData(event) {
        if (event) {
            this.offenderObsPerModel = event;
        }
    }

    onDetailsClick = (event) => {
        this.updateOffenderInContext(event.offenderId);
    }

    rowHighlight = (row) => {
        if (row && row.overDueFlag && row.overDueFlag == "Y") {
            return true;
        }
        return false;
    }

    updateOffenderInContext(offenderid) {
        if (offenderid) {
            let vHead = new VHeaderBlock();
            vHead.offenderId = offenderid;
            vHead.agyLocId = this.sessionManager.currentCaseLoad;
            const offbkGlobal = this.osiosearchService.offbkgGlobalQuery(vHead);
            offbkGlobal.subscribe(list => {
                if (list.length > 0) {
                    this.vHeaderBlockModel = list[0];
                    if (list[0].imageId != null) {
                        this.imageModel.imageId = list[0].imageId;
                        this.osiosearchService.imageExecuteQuery(this.imageModel).subscribe(imageData => {
                            this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                        });
                    }
                    this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                    this.oidoffobFactory.backButton = true;
                    this.oidoffobFactory.searchParam = this.offenderObsPerSearchModel;
                    this.router.navigate(['/OIDOFFOB']);
                    //emit event to update header
                } else {
                    this.offenderSearchService.selectedOffender = undefined;
                }
            });

        }
    }

    clear() {
        this.offenderObsPerData = [];
        this.offenderObsPerSearchModel = new OffenderObservationInquiry();
    }
    clearDisableFun() {
        return true;
    }
    getOffenderPeriodInquiryQuery() {
        if(!this.offenderObsPerSearchModel.agyLocId){
            this.show(this.translateService.translate('oiioffob.custodialfacilitymustbeselected'),'warn');
            return;
        } else if(!this.offenderObsPerSearchModel.zoneId){
            this.show(this.translateService.translate('oiioffob.zonemustbeselected'),'warn');
            return;
        }else{
            const serviceObj = this.oiioffobFactory.getOffenderPeriodInquiryQuery(this.offenderObsPerSearchModel).subscribe(data => {
                if (data && data.length > 0) {
                    data.forEach((element,index) => {
                        element.idbutton = 'Details';
                        if (element.checkTime && element.frequency && element.checkDate) {
                            let hours = DateFormat.getDate(element.checkTime).getHours();
                            let min = DateFormat.getDate(element.checkTime).getMinutes();
                            let tempMin = Number(element.frequency);
                            let data = Number(min) + Number(tempMin);
                            element.nextCheckTime = DateFormat.getDate(DateFormat.getDate(element.checkDate).setHours(hours, data, 0));
                        }
                    });
                    this.offenderObsPerData = data;
                    this.offenderObsPerModel = data[0];
                    this.selected = 0;
                } else {
                    this.offenderObsPerData = [];
                    this.show('common.querycaused');
                    return;
                }
    
            });
        }
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /* trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    } */

   

    get retriveDisable (){
        if(this.offenderObsPerData.length > 0){
            return true;
        } else {
            return false;
        }
    }

    get clearDisable(){
        if(!this.offenderObsPerSearchModel.agyLocId 
            && !this.offenderObsPerSearchModel.zoneId &&
             !this.offenderObsPerSearchModel.observationType &&
             !this.offenderObsPerSearchModel.overDueFlag) {
                return true;
             } else {
                return false;
             }
    }

    agyLocChangeEvent = (event) => {
        if(event){
            this.requiredValue=true;
        } else {
            this.requiredValue=false;
        }
    }

    onSagencyBlur() {
        if (!this.offenderObsPerSearchModel.agyLocId) {
            this.offenderObsPerSearchModel.agyLocId = this.offenderObsPerSearchModel.agyLocId === '' ? undefined : '';
        }
    }

    

    onZoneBlur() {
        if (!this.offenderObsPerSearchModel.zoneId) {
            this.offenderObsPerSearchModel.zoneId = this.offenderObsPerSearchModel.zoneId === '' ? undefined : '';
        }
    }


    onObservationTypeBlur() {
        if (!this.offenderObsPerSearchModel.observationType) {
            this.offenderObsPerSearchModel.observationType = this.offenderObsPerSearchModel.observationType === '' ? undefined : '';
        }
    }

    
}
