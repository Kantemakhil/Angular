import { Component, OnInit, Injectable, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { BedAssignmentHistories } from '@instdemographicsbeans/BedAssignmentHistories';
import { OidchlocService } from '@inst/movements/housingchanges/service/oidchloc.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
@Component( {
    templateUrl: './housing_action.component.html',
    providers: [],
    styleUrls: ['./housing_action.component.scss'],
    selector: 'housing-action'
} )

@Injectable({providedIn: 'root'})
export class HousingActionComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
   
    @Output() closeDialog = new EventEmitter();
  
    @Output() allocationPlace: EventEmitter<any> = new EventEmitter<any>();
    
    private innerHouseAction: any = {};
    count=0;
    bedahModel: BedAssignmentHistories = new BedAssignmentHistories();
    constructor(public translateService: TranslateService,public dialogService: DialogService,private oidchlocFactory: OidchlocService) {
    }
    ngOnInit(){

    }
    
    get houseAction(): any {
        return this.innerHouseAction;
    }
    
    @Input()
    set houseAction(v: any) {
        this.innerHouseAction=v;
    }
    
    allocationBed(){
        this.bedahModel = new BedAssignmentHistories();
        this.bedahModel.dspDescription = this.innerHouseAction.description;
        this.bedahModel.livingUnitId = this.innerHouseAction.internalLocationId;
        this.bedahModel['noOfAvailable'] = this.innerHouseAction.availBeds; 
        if(this.innerHouseAction.offenderBookId!=undefined || this.innerHouseAction.offenderBookId!=null ) {
            this.bedahModel.offenderBookId = this.innerHouseAction.offenderBookId;
        }
        this.validateAllConflict(this.bedahModel);
    }
    
    validateAllConflict(bedahModel) {
        if (this.innerHouseAction.conflict!=null) {
            /**
             * below code used to check whether warning message exists or not for offenderBookId and agyLocId
             * params this.bedahModel
             * if warningDetails.warningMsg is not null then warning screen will be open.
             * if click on yes data will be bind or else warning screen will be closed.
             * if warningDetails.warningMsg is null then bed screen will be closed.
             */
            const checkWarningService = this.oidchlocFactory.checkAllConficts(this.bedahModel);
            checkWarningService.subscribe(warningDetails => {
                if (warningDetails.warningMsg !== 'null') {
                    warningDetails.warningMsg = warningDetails.warningMsg.replaceAll('omuavbed.selectedOffender', this.translateService.translate('omuavbed.selectedOffender'));
                    warningDetails.warningMsg = warningDetails.warningMsg.replaceAll('omuavbed.housedinsameunit', this.translateService.translate('omuavbed.housedinsameunit'));
                    const data = {
                        warningMsg: warningDetails.warningMsg, warningPrompt: warningDetails.warningPrompt,
                        yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/OCUWARNG', data, 80).subscribe(result => {
                        if (typeof result === 'boolean' && result) {
                            this.allocationPlace.emit({
                                allocated: this.innerHouseAction.description,
                                internalLocationId: this.innerHouseAction.internalLocationId,
                                warningMsg: warningDetails.warningMsg
                            });
                        } else {
                        }
                    });
                } else {
                    this.allocationPlace.emit({
                        allocated: this.innerHouseAction.description,
                        internalLocationId: this.innerHouseAction.internalLocationId, warningMsg: null
                    });
                }
            });
        }
       } 

    cancelAllocation(){
        this.closeDialog.emit(this.count);
    }
}