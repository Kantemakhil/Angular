import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderCipDetails } from '../beans/OffenderCipDetails';
import { OiiciponService } from '../service/oiicipon.service';
import { Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OidciponService } from '../service/oidcipon.service';

@Component({
    selector: 'app-oiicipon',
    templateUrl: './oiicipon.component.html'
})

export class OiiciponComponent implements OnInit {

    // Variable declaration
    msgs: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offenderCipDetailsModel: OffenderCipDetails = new OffenderCipDetails();
    placementColumnDef: any[] = [];
    placementData: any[] = [];
    placementIndex: number;
    facilityValue: any;
    facilityLovLink: any;
    placementType: any;
    CipReason: any;

    constructor(public translateService: TranslateService, private sessionManager: UserSessionManager,
        private oiiciponService: OiiciponService, private router: Router, private offenderSearchService: OffenderSearchService,
        private osiosearService: OsiosearService, private oidciponFactory: OidciponService) {
        this.placementColumnDef = [];
    }
    ngOnInit() {
        this.placementData = [];
        this.facilityLovLink = 'oiicipon/rgAgyLocsRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        if (this.oidciponFactory && this.oidciponFactory.oiicponServiceModel && this.oidciponFactory.oiicponServiceModel.agyLocId) {
            this.facilityValue = this.oidciponFactory.oiicponServiceModel.agyLocId;
            this.placementType = this.oidciponFactory.oiicponServiceModel.placementType;
            this.CipReason = this.oidciponFactory.oiicponServiceModel.placementReasonCode;
            this.oidciponFactory.oiicponServiceModel = new OffenderCipDetails();
            this.getPlacmentData();
        }
        this.placementColumnDef = [
            {
                fieldName: this.translateService.translate('oiicipon.pid'), field: 'offenderIdDisplay', width: 150, editable: false,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiicipon.lastname'), field: 'lastName', width: 150, editable: false,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiicipon.firstname'), field: 'firstName', width: 150, editable: false,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiicipon.typeofcip'), field: 'placementType', width: 150, editable: false,
                datatype: 'lov', domain: 'PLACE_TYPE'
            },

            {
                fieldName: this.translateService.translate('oiicipon.reason'), field: 'placementReasonCode', width: 150, editable: false,
                datatype: 'lov', domain: 'PLACE_RSN', parentField: 'placementType'
            },
            {
                fieldName: this.translateService.translate('oiicipon.timeservedhours'), field: 'nbtHoursServed', width: 150, editable: false,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiicipon.timeserveddays'), field: 'nbtDaysServed', width: 150, editable: false,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oiicipon.reviewdate'), field: 'reviewDate', width: 150, editable: false,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oiicipon.expirydate'), field: 'expiryDate', width: 150, editable: false,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oiicipon.details'), field: 'idbutton', datatype: 'launchbutton', link: '/OIDCIPON', editable: true, width: 150,
                data: 'row', updateField: 'row', modal: true, dialogWidth: 50, onLaunchClick: this.onDetailsLauchEdit
            },
        ];
    }

    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    getPlacmentData() {
        if (!this.facilityValue) {
            this.show(this.translateService.translate('oiicipon.faclitymustbeentered'), 'warn');
            return;
        }
        const payLoad = {};
        payLoad['agyLocId'] = this.facilityValue;
        if (this.placementType) {
            payLoad['placementType'] = this.placementType;
        }
        if (this.CipReason) {
            payLoad['placementReasonCode'] = this.CipReason;
        }
        const serviceObj = this.oiiciponService.offCipDetailsExecuteQuery(payLoad);
        serviceObj.subscribe(data => {
            if (data && data.length == 0) {
                this.placementData = [];
                this.show(this.translateService.translate('common.querycaused'), 'warn');
                return;
            } else {
                data.forEach(e => {
                    e['idbutton'] = this.translateService.translate('oiicipon.details');
                });
                this.placementData = data;
                this.placementIndex = 0;
            }
        });
    }

    onClear() {
        this.placementData = [];
        this.offenderCipDetailsModel = new OffenderCipDetails();
        this.placementType = undefined;
        this.CipReason = undefined;
        this.facilityValue = undefined;
    }

    placementRowClicked(event) {
        if (event) {
            this.offenderCipDetailsModel = event;
        } else {
            this.offenderCipDetailsModel = new OffenderCipDetails();
        }
    }

    get searchDisabled() {
        if (this.placementData && this.placementData.length > 0) {
            return true;
        }
        return false;
    }

    FacilityCodeChange(event) {

    }

    onFacilityBlur() {
        if (!this.facilityValue) {
            this.facilityValue = this.facilityValue === undefined ? '' : undefined;
        }
    }

    onCipTypeBlur() {
        if (!this.placementType) {
            this.placementType = this.placementType === undefined ? '' : undefined;
        }
    }

    onCipReasonBlur() {
        if (!this.CipReason) {
            this.CipReason = this.CipReason === undefined ? '' : undefined;
        }
    }

    onDetailsLauchEdit = (event) => {
        if (event) {
            this.vHeaderBlockModel = new VHeaderBlock();
            this.vHeaderBlockModel.offenderIdDisplay = event.offenderIdDisplay;
            this.vHeaderBlockModel.offenderBookId = event.offenderBookId;
            this.vHeaderBlockModel.offenderId = event.offenderId;
            this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
            const offbkGlobal = this.osiosearService.offbkgGlobalQuery(this.vHeaderBlockModel);
            offbkGlobal.subscribe(list => {
                if (list.length > 0) {
                    this.vHeaderBlockModel = list[0];
                    if (list[0].imageId != null) {
                        const imageModel = { imageId: list[0].imageId };
                        this.osiosearService.imageExecuteQuery(imageModel).subscribe(imageData => {
                            this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                        });
                    }
                    this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                } else {
                    this.offenderSearchService.selectedOffender = undefined;
                }
                this.oidciponFactory.oiicponServiceModel = new OffenderCipDetails();
                this.oidciponFactory.oiicponServiceModel.agyLocId = this.facilityValue;
                this.oidciponFactory.oiicponServiceModel.placementType = this.placementType;
                this.oidciponFactory.oiicponServiceModel.placementReasonCode = this.CipReason;
                this.oidciponFactory.exitFlag = true;
                return this.router.navigate(['/OIDCIPON']);
            });
        }
    }

    get clearDisabled() {
        if (this.facilityValue || this.placementType || this.CipReason) {
            return false;
        }
        return true;
    }

}
