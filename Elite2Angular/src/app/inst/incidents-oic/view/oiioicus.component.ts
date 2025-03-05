import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { OcdmworkService } from '@common/workspace/service/ocdmwork.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { OiioicusService } from '@inst/incidents-oic/service/oiioicus.service';
import { VOffenderOicSanctions } from '@instoicbeans/VOffenderOicSanctions';
import { VOicHearingResults } from '@instoicbeans/VOicHearingResults';
import { VOicHearings } from '@instoicbeans/VOicHearings';
import { VOicIncidents } from '@instoicbeans/VOicIncidents';

@Component({
    selector: 'app-oiioicus',
    templateUrl: './oiioicus.component.html'
})

export class OiioicusComponent implements OnInit, OnDestroy {
    voicinciData: VOicIncidents[] = [];
    voicinciDataTemp: VOicIncidents[] = [];
    voicinciModel: VOicIncidents = new VOicIncidents();
    selectedOffender: VOicIncidents = new VOicIncidents();
    voicinciIndex = -1;
    voichearData: VOicHearings[] = [];
    voichearDataTemp: VOicHearings[] = [];
    voichearModel: VOicHearings = new VOicHearings();
    selectedHearings: VOicHearings = new VOicHearings();
    voichearIndex = -1;
    voichearresData: VOicHearingResults[] = [];
    voichearresDataTemp: VOicHearingResults[] = [];
    voichearresModel: VOicHearingResults = new VOicHearingResults();
    selectedHearRes: VOicHearingResults = new VOicHearingResults();
    voichearresIndex = -1;
    voffoicsanctData: VOffenderOicSanctions[] = [];
    voffoicsanctDataTemp: VOffenderOicSanctions[] = [];
    voffoicsanctModel: VOffenderOicSanctions = new VOffenderOicSanctions();
    voffoicsanctIndex = -1;
    disabled: boolean;
    rgoichearingtypeRg: any[] = [];
    rgincidenttypeRg: any[] = [];
    rgoffencetypeRg: any[] = [];
    rgsanctioncodeRg: any[] = [];
    vOicincidentsColumnDefs: any[];
    vOicHearingsColumnDefs: any[];
    vOicHearingresultsColumnDefs: any[];
    disciplinaryColumnDefs: any[];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    rginctypeRg: any[] = [];
    locationList: any[] = [];
    caseLoadId: string;
    rginternallocationsRg: any[] = [];
    hearByListValues: any[] = [];
    typeListOfValues: any[] = [];
    offenceDesValues: any[] = [];
    findingListOfValues: any[] = [];
    pleaListOfValues: any[] = [];
    discTypeValues: any[] = [];
    discStatusValues: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    msgs: any[] = [];
    exitLaunchBtn = false;
    constructor(private oiioicusFactory: OiioicusService, private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private ocdmworkFactory: OcdmworkService, private router: Router, private oidcnoteFactory: OidcnoteService) {

    }
    ngOnInit() {
        if (this.oidcnoteFactory.launchFlag ||  this.ocdmworkFactory.exitFlag) {
            this.exitLaunchBtn = true;
        }
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.vOicincidentsColumnDefs = [
            { fieldName: this.translateService.translate('common.incident'), field: 'agencyIncidentId', editable: true, width: 200 },
            { fieldName: this.translateService.translate('common.incidentdate'), datatype: 'date',
             field: 'incidentDate', editable: true, width: 200 },
            { fieldName: this.translateService.translate('common.time'), field: 'incidentTime',
             datatype: 'time', editable: true, width: 200 },
            {
                fieldName: this.translateService.translate('common.incidenttype'), field: 'incidentType',
                editable: true, width: 200, datatype: 'select', options: this.rgincidenttypeRg
            },
            { fieldName: this.translateService.translate('common.location'), field: 'intLocDescription',
             editable: true, width: 200,  datatype: 'select', options: this.locationList },
            { fieldName: this.translateService.translate('common.oic'), field: 'oicIncidentId', editable: true, width: 200 },
        ];

        this.vOicHearingsColumnDefs = [
            {
                fieldName: this.translateService.translate('common.hearingtype'), field: 'oicHearingType', datatype: 'select'
                , editable: true, width: 200, options: this.rgoichearingtypeRg
            },
            { fieldName: this.translateService.translate('common.hearingdate'), datatype: 'date',
             field: 'hearingDate', editable: true, width: 200 },
            { fieldName: this.translateService.translate('common.time'), field: 'hearingTime', datatype: 'time',
             editable: true, width: 200 },
            { fieldName: this.translateService.translate('common.location'), field: 'intLocDescription', editable: true, width: 200,
             datatype: 'select', options: this.rginternallocationsRg },
            { fieldName: this.translateService.translate('oiioicus.heardby'), field: 'hearingStaffName', editable: true, width: 200,
            datatype: 'select', options: this.hearByListValues },
            {
                fieldName: this.translateService.translate('oiioicus.otherrepresentatives'),
                field: 'representativeText', editable: true, width: 200
            },
            { fieldName: this.translateService.translate('common.comments'), field: 'commentText', editable: true, width: 200 },
        ];
        this.vOicHearingresultsColumnDefs = [
            { fieldName: this.translateService.translate('oiioicus.originalcharge'), field: 'oicOffenceCode', editable: true, width: 170 },
            { fieldName: this.translateService.translate('common.type'), field: 'oicOfnTypeDesc', editable: true, width: 170,
            datatype: 'select', options: this.typeListOfValues},
            {
                fieldName: this.translateService.translate('oiioicus.offenseDescription'),
                field: 'oicOffenceDescription', editable: true, width: 170,
                datatype: 'select', options: this.offenceDesValues
            },
            {
                fieldName: this.translateService.translate('oiioicus.resultingcharge'),
                field: 'resultOicOffenceCode', editable: true, width: 170
            },
            { fieldName: this.translateService.translate('common.type'), field: 'oicOfnTypeDesc',
             editable: true, width: 170, datatype: 'select', options: this.typeListOfValues },
            {
                fieldName: this.translateService.translate('oiioicus.offenseDescription'),
                field: 'resultOicOffenceDescription', editable: true, width: 170, datatype: 'select', options: this.offenceDesValues
            },
            {
                fieldName: this.translateService.translate('oiioicus.plea'),
                field: 'pleaDescription', editable: true, width: 170, datatype: 'select', options: this.pleaListOfValues
            },
            { fieldName: this.translateService.translate('oiioicus.finding'), field: 'findingDescription', editable: true, width: 170,
             datatype: 'select', options: this.findingListOfValues },
        ];
        this.disciplinaryColumnDefs = [
            { fieldName: this.translateService.translate('oiioicus.line'), field: 'sanctionSeq', editable: true, width: 130 },
            {
                fieldName: this.translateService.translate('common.type'), field: 'oicSanctionDesc'
                , editable: true, width: 130, datatype: 'select', options: this.discTypeValues
            },
            { fieldName: this.translateService.translate('oiioicus.months'), field: 'sanctionMonths', editable: true, width: 130 },
            { fieldName: this.translateService.translate('oiioicus.days'), field: 'sanctionDays', editable: true, width: 130 },
            { fieldName: this.translateService.translate('oiioicus.restitution'), field: 'compensationAmount', editable: true, width: 130 },
            { fieldName: this.translateService.translate('oiioicus.effectivedate'), datatype: 'date',
             field: 'effectiveDate', editable: true, width: 130 },
            {
                fieldName: this.translateService.translate('oiioicus.consecutivetoline'),
                field: 'consecutiveSanctionSeq', editable: true, width: 130
            },
            { fieldName: this.translateService.translate('common.oic'), field: 'oicIncidentId', editable: true, width: 130 },
            { fieldName: this.translateService.translate('common.status'), field: 'statusDescription', editable: true, width: 130,
             datatype: 'select', options: this.discStatusValues },
            { fieldName: this.translateService.translate('oiioicus.statusdate'), datatype: 'date',
             field: 'statusDate', editable: true, width: 130 },
        ];
        const serviceObj1 = this.oiioicusFactory.rgOicHearingTypeRecordGroup();
        serviceObj1.subscribe(list1 => {
            if (list1.length === 0) {
                return;
            } else {
                for (let i = 0; i < list1.length; i++) {
                    this.rgoichearingtypeRg.push({ 'id': list1[i].code, 'text': list1[i].description });
                }
        }
        });
        const serviceObj2 = this.oiioicusFactory.rgIncidentTypeRecordGroup();
        serviceObj2.subscribe(list2 => {
            if (list2.length === 0) {
                return;
            } else {
                for (let i = 0; i < list2.length; i++) {
                    this.rgincidenttypeRg.push({ 'id': list2[i].code, 'text': list2[i].description });
                }
            }
        });
        const serviceObj4 = this.oiioicusFactory.rgSanctionCodeRecordGroup();
        serviceObj4.subscribe(list4 => {
            if (list4.length === 0) {
                return;
            } else {
                for (let i = 0; i < list4.length; i++) {
                    this.rgsanctioncodeRg.push({ 'id': list4[i].code + ' - ' + list4[i].description, 'text': list4[i].description });
                }
            }
        });
        const optionList = this.oiioicusFactory.findLocationList();
        optionList.subscribe(list => {
            list.forEach(listval => {
                this.locationList.push({ 'id': listval, 'text': listval });
            });
        });
        const serviceObj3 = this.oiioicusFactory.
        rgInternalLocationsRecordGroup(this.caseLoadId);
    serviceObj3.subscribe(list3 => {
        list3.forEach(listval => {
            this.rginternallocationsRg.push({ 'id': listval.description, 'text': listval.description });
        });
    });
    const hearBy = this.oiioicusFactory.getHearingStaffNameList();
    hearBy.subscribe(hearByList => {
        hearByList.forEach(listval => {
            this.hearByListValues.push({ 'id': listval, 'text': listval });
        });
    });
    const offenceDes = this.oiioicusFactory.getHearingResultsOicOffenceDes();
    offenceDes.subscribe(offenceDesList => {
        offenceDesList.forEach(listval => {
            this.offenceDesValues.push({ 'id': listval, 'text': listval });
        });
    });
    const resType = this.oiioicusFactory.getHearingResultsType();
    resType.subscribe(typeValues => {
        typeValues.forEach(listval => {
            this.typeListOfValues.push({ 'id': listval, 'text': listval });
        });
    });
    const findingRes = this.oiioicusFactory.rgFindingRecordGroup();
    findingRes.subscribe(findingVal => {
        findingVal.forEach(listval => {
            this.findingListOfValues.push({ 'id': listval.description, 'text': listval.description });
        });
    });
    const pleaRes = this.oiioicusFactory.rgPleaRecordGroup();
    pleaRes.subscribe(pleaVal => {
        pleaVal.forEach(listval => {
            this.pleaListOfValues.push({ 'id': listval.description, 'text': listval.description });
        });
    });
    const discType = this.oiioicusFactory.getDiscOicSanctionDes();
    discType.subscribe(discTypeVal => {
        discTypeVal.forEach(listval => {
            this.discTypeValues.push({ 'id': listval, 'text': listval });
        });
    });
    const statusDes = this.oiioicusFactory.getDiscStatusDes();
    statusDes.subscribe(statusVal => {
        statusVal.forEach(listval => {
            this.discStatusValues.push({ 'id': listval, 'text': listval });
        });
    });
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.voicinciModel = new VOicIncidents();
            this.voicinciModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.executeQueryForVoicIncidents();
        } else {
            this.voicinciData = [];
            this.voichearData = [];
            this.voichearresData = [];
            this.voffoicsanctData = [];
        }
    }

    /*
    * This method used to get the data from VoicIncidents table
    * param offenderBookId
    */
    executeQueryForVoicIncidents() {
        this.voicinciModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        if (this.voicinciModel.offenderBookId) {
            const serviceObj = this.oiioicusFactory.vOicInciExecuteQuery(this.voicinciModel);
            serviceObj.subscribe(vidata => {
                if (vidata.length === 0) {
                    this.voicinciData = [];
                    this.voichearData = [];
                    this.voichearresData = [];
                    this.voffoicsanctData = [];
                    return;
                } else {
                    this.voicinciData = [];
                    this.voicinciData = vidata;
                    this.voicinciIndex = 0;
                    this.voicinciModel = vidata[0];
                    this.voichearModel = new VOicHearings();
                    this.voichearModel.oicIncidentId = this.voicinciModel.oicIncidentId;
                    this.executeQueryForOicHear();
                }
            });
        }
    }
    /*
    * This method used to get the data from VOicHearings table
    * param oicIncidentId
    */
    executeQueryForOicHear() {
        if (this.voichearModel.oicIncidentId) {
            const serviceObj4 = this.oiioicusFactory.vOicHearExecuteQuery(this.voichearModel);
            serviceObj4.subscribe(hearData => {
                if (hearData.length === 0) {
                    this.voichearData = [];
                    this.voichearresData = [];
                    this.voffoicsanctData = [];
                } else {
                    this.voichearData = [];
                    this.voichearData = hearData;
                    this.voichearIndex = 0;
                    this.voichearModel = this.voichearData[0];
                    this.voichearresModel = new VOicHearingResults();
                    this.voichearresModel.oicHearingId = this.voichearModel.oicHearingId;
                    this.executeQueryForRes();
                }
            });
        }
    }

    /*
    * This method used to get the data from VOicHearingResults table
    * param oicHearingId
    */
    executeQueryForRes() {
        if (this.voichearresModel.oicHearingId) {
            const serviceObj5 = this.oiioicusFactory.vOicHearResExecuteQuery(this.voichearresModel);
            serviceObj5.subscribe(resData => {
                if (resData.length === 0) {
                    this.voichearresData = [];
                    this.voffoicsanctData = [];
                } else {
                    this.voichearresData = [];
                    this.voichearresData = resData;
                    this.voichearresIndex = 0;
                    this.voichearresModel = this.voichearresData[0];
                    this.voffoicsanctModel = new VOffenderOicSanctions();
                    this.voffoicsanctModel.oicHearingId = this.voichearresModel.oicHearingId;
                    this.voffoicsanctModel.resultSeq = this.voichearresModel.resultSeq;
                    this.executeQueryForDis();
                }
            });
        }
    }
    /*
    * This method used to get the data from VOffenderOicSanctions table
    * param oicHearingId
    */
    executeQueryForDis() {
        if (this.voffoicsanctModel.oicHearingId && this.voffoicsanctModel.resultSeq) {
        const voffoicsanctResult = this.oiioicusFactory.vOffOicSanctExecuteQuery(this.voffoicsanctModel);
        voffoicsanctResult.subscribe(voffoicsanctResultList => {
            if (voffoicsanctResultList.length === 0) {
                this.voffoicsanctData = [];
            } else {
                for (let i = 0; i < voffoicsanctResultList.length; i++) {
                    if (!voffoicsanctResultList[i].consecutiveSanctionSeq) {
                        voffoicsanctResultList[i].oicIncidentId = null;
                    }
                    voffoicsanctResultList[i].compensationAmount = Number(voffoicsanctResultList[i].compensationAmount).toFixed(2);
                }
                this.voffoicsanctData = voffoicsanctResultList;
                this.voffoicsanctIndex = 0;
                this.voffoicsanctModel = voffoicsanctResultList[0];
            }
        });
    }
}
    /*
    * this event is fired when click on row in Incidents Block.
    */
    onRowClickvoicinci(event) {
        if (event) {
            this.voichearData = [];
            this.selectedOffender = event;
            this.voichearModel = new VOicHearings();
            this.voichearModel.oicIncidentId = this.selectedOffender.oicIncidentId;
            this.executeQueryForOicHear();
        }
    }
    /*
    * this event is fired when click on row in Schedule Hearing Block.
    */
    onRowClickvoichear(event) {
        if (event) {
            this.voichearresData = [];
            this.selectedHearings = event;
            this.voichearresModel = new VOicHearingResults();
            this.voichearresModel.oicHearingId = this.selectedHearings.oicHearingId;
            this.executeQueryForRes();
        }
    }
    /*
    * this event is fired when click on row in Results Block.
    */
    onRowClickvoichearres(event) {
        if (event) {
            this.voffoicsanctData = [];
            this.selectedHearRes = event;
            this.voffoicsanctModel = new VOffenderOicSanctions();
            this.voffoicsanctModel.oicHearingId = this.selectedHearRes.oicHearingId;
            this.voffoicsanctModel.resultSeq = this.selectedHearRes.resultSeq;
            this.executeQueryForDis();
        }
    }
    onRowClickoicsanc(event) {
        if (event) {
        this.voffoicsanctModel = event;
        this.voffoicsanctModel.commentText = event.commentText;
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */
    dateFormat(dateValue) {
        if (dateValue !== undefined && dateValue.length > 0) {
            const newdate = dateValue.split('/');
            return newdate[2] + '-' + newdate[0] + '-' + newdate[1];
        } else {
            return dateValue;
        }
    }
    onGridInciDelete = () => {
        for (let i = 0; i < this.voicinciData.length; i++) {
            if (this.voicinciData.length === 1 && !this.voicinciData[i].agencyIncidentId) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemasterrecord');
                this.show();
                return false;
            }
        }
        return true;
    }
    onGridHearDelete = () => {
        for (let i = 0; i < this.voichearData.length; i++) {
            if (this.voichearData.length === 1 && !this.voichearData[i].oicIncidentId) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemasterrecord');
                this.show();
                return false;
            }
        }
        return true;
    }
    onGridHearresDelete = () => {
        for (let i = 0; i < this.voichearresData.length; i++) {
            if (this.voichearresData.length === 1 && !this.voichearresData[i].oicHearingId) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemasterrecord');
                this.show();
                return false;
            }
        }
        return true;
    }
    onGridSanctDelete = () => {
        for (let i = 0; i < this.voffoicsanctData.length; i++) {
            if (this.voffoicsanctData.length === 1 && !this.voffoicsanctData[i].offenderBookId) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemasterrecord');
                this.show();
                return false;
            }
        }
        return true;
    }
    onExitBtnClick = () => {
        if (this.ocdmworkFactory.exitFlag) {
            this.ocdmworkFactory.exitFlag = false;
            this.router.navigate(['/OCDMWORK']);
        } else if (this.oidcnoteFactory.launchFlag) {
            this.oidcnoteFactory.launchFlag = false;
            this.router.navigate(['/OIDCNOTE']);
        }
        return true;
    }
    ngOnDestroy(): void {
        this.ocdmworkFactory.exitFlag = false;
        this.oidcnoteFactory.launchFlag = false;
    }
}
