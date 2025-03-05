import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuavlocService } from '@inst/visits-management/service/ocuavloc.service';
import { VOcuavlocAvailable } from '@visitsbeans//VOcuavlocAvailable';
import { VOcuavlocUnavailable } from '@visitsbeans//VOcuavlocUnavailable';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OidvisitService } from '../service/oidvisit.service';

@Component({
    selector: 'app-ocuavloc',
    templateUrl: './ocuavloc.component.html'
})

export class OcuavlocComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    nameOfLovPage: string;
    avllocData: VOcuavlocAvailable[] = [];
    avllocModel: VOcuavlocAvailable = new VOcuavlocAvailable();
    avllocModelTemp: VOcuavlocAvailable = new VOcuavlocAvailable();
    avllocIndex = -1;
    avllocInsertList: VOcuavlocAvailable[] = [];
    avllocUpdatetList: VOcuavlocAvailable[] = [];
    avllocDeleteList: VOcuavlocAvailable[] = [];
    fbolocData: VOcuavlocUnavailable[] = [];
    fbolocDataTemp: VOcuavlocUnavailable[] = [];
    fbolocModel: VOcuavlocUnavailable = new VOcuavlocUnavailable();
    fbolocModelTemp: VOcuavlocUnavailable = new VOcuavlocUnavailable();
    fbolocIndex = -1;
    fbolocInsertList: VOcuavlocUnavailable[] = [];
    fbolocUpdatetList: VOcuavlocUnavailable[] = [];
    fbolocDeleteList: VOcuavlocUnavailable[] = [];
    disabled: boolean;
    fboLocColumnDef: any[];
    avlLocColumnDef: any[];
    avlLocReadOnly: boolean;
    butCtrl1ReadOnly: boolean;
    fboLocReadOnly: boolean;
    butCtrl2ReadOnly: boolean;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    fullyBookedDisable:  boolean;
    availbleVisitDisable: boolean;
    constructor(private ocuavlocFactory: OcuavlocService,
                 public translateService: TranslateService,
                 public dialogService: DialogService,private oidvisitFactory: OidvisitService) {
        this.fboLocColumnDef = [];
        this.avlLocColumnDef = [];

    }
    ngOnInit() {
        this.fullyBookedDisable = true;
        this.availbleVisitDisable = true;
        this.fboLocColumnDef = [
            { fieldName: this.translateService.translate('common.location'), field: 'description', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.maxgroups'), field: 'maxGroups', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.maxadultvisitors'), field: 'maxAdults', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.maxcapacity'), field: 'capacity', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.groupsbooked'), field: 'groupsBooked', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.adultsbooked'), field: 'adultsBooked', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.totalbooked'), field: 'totalBooked', editable: false, width: 150 },
        ];
        this.avlLocColumnDef = [
            { fieldName: this.translateService.translate('common.location'), field: 'description', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.maxgroups'), field: 'maxGroups', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.maxadultvisitors'), field: 'maxAdults', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.maxcapacity'), field: 'capacity', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.groupsbooked'), field: 'groupsBooked', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.adultsbooked'), field: 'adultsBooked', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavloc.totalbooked'), field: 'totalBooked', editable: false, width: 150 },
        ];

        this.getOcuavlocAvailable();
        this.getOcuavlocUnAvailable();
    }
    /**
     * eventn is fired when click on row in the grid in the block of Available Vist locations
     * @param event
     */
    onRowClickOnAvailbleVist(event) {
        if (event) {
        this.avllocModel = new VOcuavlocAvailable();
        this.avllocModel = event;
        this.avllocModelTemp.agencyVisitSlotId = event.agencyVisitSlotId;
        }
    }
    /**
     * event is fired when click on Select button in the block of Fully Booked Visit locations.
     */
    onFullyBookedVistSelect() {
        if (!this.fbolocModelTemp.agencyVisitSlotId) {
        this.dialog.close({description: this.fbolocModel.description, visitInternalLocationId: this.fbolocModel.internalLocationId,
            agencyVisitSlotId: this.fbolocModel.agencyVisitSlotId});
        } else  {
            const data = {
                label: this.translateService.translate('ocuavloc.locationslotisfullybooked'), yesBtn: true,
                 yesLabel: 'Yes', noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                if (typeof result === 'boolean' && result) {
                    this.dialog.close({description: this.fbolocModel.description,
                         visitInternalLocationId: this.fbolocModel.internalLocationId,
                        agencyVisitSlotId: this.fbolocModel.agencyVisitSlotId});
                } else {
                }
            });
        }
    }
    /**
     * event is fired when click on Select button in the block of Available Visit locations.
     */
    onAvailbleVisitSelect() {
        if ( this.avllocModelTemp.agencyVisitSlotId ) {
        const serviceObj1 = this.oidvisitFactory.reCheckTimeSlot(this.avllocModelTemp);
        serviceObj1.subscribe(data => {
            if (data === 0) {
                const availbleVisitdata = {
                    label: this.translateService.translate('ocuavloc.locationslotisfullybooked'), yesBtn: true,
                     yesLabel: 'Yes', noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', availbleVisitdata, 50).subscribe(result => {
                    if (typeof result === 'boolean' && result) {
                        this.dialog.close({description: this.avllocModel.description,
                            visitInternalLocationId: this.avllocModel.internalLocationId,
                             agencyVisitSlotId: this.avllocModel.agencyVisitSlotId });
                    } else {
                    }
                });

            } else {
                this.dialog.close({description: this.avllocModel.description,
                    visitInternalLocationId: this.avllocModel.internalLocationId,
                     agencyVisitSlotId: this.avllocModel.agencyVisitSlotId });
                                }

        });
    } else {
        this.dialog.close({description: this.avllocModel.description, visitInternalLocationId: this.avllocModel.internalLocationId,
             agencyVisitSlotId: this.avllocModel.agencyVisitSlotId});
    }
    }
    /**
     * event is fired when click on Cancel button in the block of Available Visit locations.
     */
    onAvailbleVistCancel() {
        this.dialog.close(null);
    }
     /**
     * event is fired when click on Select button in the block of Fully Booked Visit locations.
     */
    onFullyBookedVistCancel() {
        this.dialog.close(null);
    }
    /**
     * event is fired when click on row in the grid in the block of Fully Booked Visit locations.
     */
    onRowClickfboloc(event) {
        if (event) {
            this.fbolocModel = new VOcuavlocUnavailable();
            this.fbolocModel = event;
            this.fbolocModelTemp.agencyVisitSlotId = event.agencyVisitSlotId;
        }
    }
     /*
    * This method is used to show popup messages.
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    /**
     * method calls while screen is loading.
     * used to get the data from DB and dispaly the data in the block of vailable Visit locations.
     */
    getOcuavlocAvailable() {
        this.avllocModelTemp = new VOcuavlocAvailable();
        this.avllocModelTemp.visitDate = DateFormat.getDate(this.dialog.data.visitDate);
        this.avllocModelTemp.agyLocId = this.dialog.data.agyLocId;
        this.avllocModelTemp.startTime = this.dialog.data.originalTimeSlot;
        if (this.dialog.data.offenderVisitId) {
        this.avllocModelTemp.offenderVisitId = this.dialog.data.offenderVisitId;
        }

        const avllocResult = this.oidvisitFactory.
        getOcuavlocAvailable(this.avllocModelTemp);
        avllocResult.subscribe(avllocResultList => {
            if (avllocResultList.length === 0) {
                this.avllocData = [];
                this.availbleVisitDisable = true;
            } else {
                this.availbleVisitDisable = false;
                for (let i = 0; i < avllocResultList.length; i++) {
                    avllocResultList[i].maxGroups = avllocResultList[i].maxGroups === 0 ? undefined : avllocResultList[i].maxGroups;
                    avllocResultList[i].maxAdults = avllocResultList[i].maxAdults === 0 ? undefined : avllocResultList[i].maxAdults;
                    avllocResultList[i].capacity = avllocResultList[i].capacity === 0 ? undefined : avllocResultList[i].capacity;
                    avllocResultList[i].groupsBooked = avllocResultList[i].groupsBooked === 0 ?
                     undefined : avllocResultList[i].groupsBooked;
                    avllocResultList[i].adultsBooked = avllocResultList[i].adultsBooked === 0 ?
                     undefined : avllocResultList[i].adultsBooked;
                    avllocResultList[i].totalBooked = avllocResultList[i].totalBooked === 0 ? undefined : avllocResultList[i].totalBooked;
                }
                this.avllocData = [];
                this.avllocData = avllocResultList;
                this.avllocModel = this.avllocData[0];
                this.avllocIndex = 0;
            }
        });
    }
    /**
     * method calls while screen is loading.
     * used to get the data from DB and dispaly the data in the block of Fully Booked Visit locations.
     */
    getOcuavlocUnAvailable() {
        this.fbolocModelTemp = new VOcuavlocUnavailable();
        this.fbolocModelTemp.visitDate = DateFormat.getDate(this.dialog.data.visitDate);
        this.fbolocModelTemp.agyLocId = this.dialog.data.agyLocId;
        this.fbolocModelTemp.startTime = this.dialog.data.originalTimeSlot;
        this.fbolocModelTemp.offenderVisitId = this.dialog.data.offenderVisitId;
        const fbolocResult = this.oidvisitFactory.
        getOcuavlocUnAvailable(this.fbolocModelTemp);
        fbolocResult.subscribe(fbolocResultList => {
            if (fbolocResultList.length === 0) {
                this.fbolocData = [];
                this.fullyBookedDisable = true;
            } else {
                this.fullyBookedDisable = false;
                for (let i = 0; i < fbolocResultList.length; i++) {
                    fbolocResultList[i].maxGroups = fbolocResultList[i].maxGroups === 0 ? undefined : fbolocResultList[i].maxGroups;
                    fbolocResultList[i].maxAdults = fbolocResultList[i].maxAdults === 0 ? undefined : fbolocResultList[i].maxAdults;
                    fbolocResultList[i].capacity = fbolocResultList[i].capacity === 0 ? undefined : fbolocResultList[i].capacity;
                    fbolocResultList[i].groupsBooked = fbolocResultList[i].groupsBooked === 0 ?
                     undefined : fbolocResultList[i].groupsBooked;
                     fbolocResultList[i].adultsBooked = fbolocResultList[i].adultsBooked === 0 ?
                     undefined : fbolocResultList[i].adultsBooked;
                     fbolocResultList[i].totalBooked = fbolocResultList[i].totalBooked === 0 ? undefined : fbolocResultList[i].totalBooked;
                }
                this.fbolocData = [];
                this.fbolocData = fbolocResultList;
                this.fbolocModel =  this.fbolocData[0];
                this.fbolocIndex = 0;
            }
        });
    }
}
