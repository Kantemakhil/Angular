import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OffenderBookings } from '../../demographics-biometrics/beans/OffenderBookings';
import { OcsprogrService } from '../service/ocsprogr.service';

@Component({
    selector: 'S4-ocsprogr',
    templateUrl: './ocsprogr.component.html'
})
export class OcsprogrComponent implements OnInit {

    OffenderDetailsColumnDef: any[];
    OffenderDetailsData: OffenderBookings[] = [];

    prgrmType: string;
    providerType: string;
    provider: string;
    programStatus: string;
    providerLovLink: string;
    statusList: any[] = [];

    reqProvider: boolean;
    retrieveDis: boolean;
    clearDis: boolean;
    disProvider: boolean;
    disLovValues: boolean;
    currentCaseload: string;
    mode: string;
    statusLovFields: Object = { text: 'description', value: 'code' };
    legalOrderButton : boolean;
    msgs: any[] = [];
    OffenderDetailsModelData: OffenderBookings= new OffenderBookings ;
  
    constructor(private sessionManager: UserSessionManager, public translateService: TranslateService, public ocsprogrService: OcsprogrService ,
        public dialogService: DialogService) {
        this.OffenderDetailsColumnDef = [];
    }


    ngOnInit(): void {
        this.mode = 'CheckBox';
        this.legalOrderButton= true;
        this.reqProvider = false;
        this.retrieveDis = false;
        this.clearDis = true;
        this.disLovValues = false;
        this.disProvider = true;
        this.currentCaseload = this.sessionManager.currentCaseLoad;
        this.OffenderDetailsColumnDef = [
            { fieldName: this.translateService.translate('common.lastname'), field: 'dspLastName', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('common.firstname'), field: 'dspFirstName', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150, },
            { fieldName: this.translateService.translate('common.status'), field: 'bookingStatus', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('ocsprogr.referraldate'), field: 'referralDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocsprogr.ordercommencementdate'), field: 'offenderStartDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocsprogr.expectedcompletiondate'), field: 'offenderEndDate', editable: false, width: 150, datatype: 'date' }
        ]
    }
    prgrmTypeChange(event) {
        if (event) {
            this.prgrmType = event;
            this.clearDis = false;
        }
    }

    providerTypeChange(event) {
        this.provider = undefined;
        if (event) {
            this.providerType = event;
            this.disProvider = false;
            this.clearDis = false;
            this.reqProvider = true;
            if (event === "INT") {
                this.providerLovLink = 'ocsprogr/rgRefCodeProviderGroup?userId=' + this.sessionManager.getId();
            } else { 
                this.providerLovLink = 'ocsprogr/rgProviderRecordGroupTeam?'
            }
        } else {
            this.disProvider = true;
            this.reqProvider = false;
        }
    }

    providerChange(event) {
        this.provider = event;
    }

    statusChange(event) {
        if (event) {
            this.programStatus = event;
            this.clearDis = false;
            this.statusList = event;
        }
    }

    onRetrieve() {
        if (this.reqProvider) {
            if (!this.provider) {
                this.show(this.translateService.translate('ocsprogr.pleaseselectheprovidervalue'), 'warn');
                return;
            }
        }
            let intProviderPartyId = " ";
            let extProviderPartyId = " ";
            if (this.providerType && this.providerType === 'INT') {
                intProviderPartyId = this.provider;
            } else if (this.providerType && this.providerType === 'EXT') {
                extProviderPartyId = this.provider;
            }
        this.programStatus = this.programStatus ? this.programStatus : ' ';
        let programType = this.prgrmType ? this.prgrmType : ' ';
        const resultSet = this.ocsprogrService.offExecQuery(this.statusList, programType, intProviderPartyId, extProviderPartyId, this.currentCaseload);
            resultSet.subscribe(data => {
                if (data && data.length == 0) {
                    this.show(this.translateService.translate('common.querycausednorecords'), 'warn');
                    return;
                } else if (data && data.length > 0) {
                    this.OffenderDetailsData = data;
                    this.disLovValues = true;
                    this.disProvider = true;
                    this.retrieveDis = true;
                    this.clearDis = false;
                    this.legalOrderButton= false;
                }
            });

    }

    onClear() {
        this.OffenderDetailsData = [];
        this.prgrmType = undefined;
        this.providerType = undefined;
        this.provider = undefined;
        this.programStatus = undefined;
        this.statusList = [];
        this.disProvider = true;
        this.disLovValues = false;
        this.clearDis = true;
        this.retrieveDis = false;
        this.reqProvider = false;
        this.legalOrderButton= true;
    }

    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    OffenderDetailsRowClick(event){
       
		if (event) {
			
			this.OffenderDetailsModelData = event;
            }
    }

    onScheduleClick = () => {
        if (this.OffenderDetailsModelData.offenderBookId) {
            this.dialogService.openLinkDialog('/OCDLODET', this.OffenderDetailsModelData,60).subscribe(result => {
              if (result) {
                
              }
            });
          }
        } 
    }
   
