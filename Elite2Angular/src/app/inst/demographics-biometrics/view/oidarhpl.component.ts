import {Component, OnInit,ViewChild
} from '@angular/core';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderAttributes } from '@inst/demographics-biometrics/beans/OffenderAttributes';
import { OidarfplService } from '@inst/demographics-biometrics/service/oidarfpl.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { BedAssignmentHistories } from '@instdemographicsbeans/BedAssignmentHistories';
import { OmuavbedLivUnitsQuery } from '@instdemographicsbeans/OmuavbedLivUnitsQuery';
import { OidchlocService } from '@inst/movements/housingchanges/service/oidchloc.service';
import { FindHousingExecuteQueryBean } from '@inst/demographics-biometrics/beans/FindHousingExecuteQueryBean';

@Component({
    selector: 'app-oidarhpl',
    templateUrl: './oidarhpl.component.html',
    styleUrls: ['./oidarfpl.component.scss']
})
export class OidarhplComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    facility:string;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offenderAttributesList:OffenderAttributes[]=[];
    offenderPerAttList:OffenderAttributes[]=[];
    offenderAttributesTmpList:OffenderAttributes[]=[];
    offenderPersonalTmpList:OffenderAttributes[]=[];
    offenderAttributeLabel:string;
    pesonalInfoColumnDefs:any[];
    cellBedColumnDefs:any[];
    disabled:boolean;
    newheader :String;
    modalData:any;
    offenderHousingList:OmuavbedLivUnitsQuery[]=[];
    searchDisablrd:boolean;
    bedahModel: BedAssignmentHistories = new BedAssignmentHistories();
    agyLocId:string;
    offenderBookId:number;
    isHideBtn:boolean;
    constructor( public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService,private oidarfplFactory: OidarfplService,private oidchlocFactory: OidchlocService,
        public dialogService: DialogService){}
    ngOnInit(){
        this.isHideBtn = false;
        this.dialog.data;
        this.searchDisablrd=true;
        this.vHeaderBlockModel=this.dialog.data;
        if(this.dialog.data.toAgyLocId){
           this.facility=this.dialog.data.toAgyLocId;
           this.agyLocId=this.dialog.data.toAgyLocId;
       }else{
           this.facility=this.dialog.data.prisonLocation;
           this.agyLocId=this.vHeaderBlockModel.agyLocId;
       }
        if (this.dialog.data.bookingId) {
            this.offenderBookId = this.dialog.data.bookingId;
        } else if (this.dialog.data.offenderBookId) {
            this.offenderBookId = this.dialog.data.offenderBookId;
        } else {
            this.offenderBookId = null;
        }
        this.modalData = { bookingId: this.vHeaderBlockModel.offenderBookId, agyLocId: this.vHeaderBlockModel.agyLocId };
      //  this.offenderAttributeExecuteQuery();
      this.offenderProfileDetails();
        // this.pesonalInfoColumnDefs =[
        //                              {fieldName: this.translateService.translate('oidarfpl.description'), field: 'personalAttributes', datatype: 'text',
        //                                 editable: false, width: 220},
        //                              {fieldName:'Required',field: 'required',datatype: 'text',editable: false, width: 220}
        //                              ]
        this.cellBedColumnDefs =[
                                     {fieldName: 'Available Locations', field: 'description', datatype: 'text',editable: false, width: 220},
                                     /*{fieldName: 'Weight', field: 'noOfOccupant', datatype: 'number',editable: false, width: 220},*/
                                     ]
                    this.newheader=this.translateService.translate('oidarhpl.title')+" For "+this.facility;
    }

    offenderProfileDetails(){
        const offenderAttributes = this.oidarfplFactory.offenderPersonalDetails(this.vHeaderBlockModel.offenderBookId,this.sessionManager.currentCaseLoadType);
        offenderAttributes.subscribe(data => {
            if(!data){
                this.offenderAttributesTmpList=[];
                this.offenderPerAttList=[];
            }else{
                this.offenderAttributesTmpList=data.offenderNonAssociationsByInd;
                this.offenderPerAttList=data.offenderNonAssociationsByGang;
            }
        });
    }

    offenderAttributeExecuteQuery(){
        const offenderAttributes = this.oidarfplFactory.offenderAttributeExecuteQuery(this.vHeaderBlockModel);
        offenderAttributes.subscribe(offenderAttributesList => {
            if(offenderAttributesList.length==0){
                this.offenderAttributesList=[];
                this.offenderPerAttList=[];
            }else{
                this.offenderAttributesList=offenderAttributesList;
                for(let i=0;i<this.offenderAttributesList.length;i++){
                if(this.offenderAttributesList[i].attDescription!=null){
                this.offenderAttributesList[i].offenderBookId = this.offenderBookId;
                this.offenderAttributesList[i].agyLocId = this.agyLocId;
                this.offenderAttributesTmpList.push(this.offenderAttributesList[i]);
                }
                if(this.offenderAttributesList[i].personalAttributes!=null && this.offenderAttributesList[i].personalAttributes!=''){
                this.offenderPersonalTmpList.push(this.offenderAttributesList[i]);
                }
                }
                this.offenderPerAttList=this.offenderPersonalTmpList;
            }
        });
    }
    findHousingExecutequery() {

                let findHousingExecuteQueryBean:FindHousingExecuteQueryBean = new FindHousingExecuteQueryBean();
                findHousingExecuteQueryBean.personalAttributeList = this.offenderAttributesTmpList;
                findHousingExecuteQueryBean.offenderBookId = String(this.offenderBookId);
                findHousingExecuteQueryBean.agencyLocId = this.agyLocId;

        const livingUnits = this.oidarfplFactory.offenderHousingExecuteQuery(findHousingExecuteQueryBean);
                livingUnits.subscribe( offenderHousingList => {
            if ( offenderHousingList.length == 0 ) {
                this.offenderHousingList = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                this.offenderHousingList = offenderHousingList;
            }
        } );
    }
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
      }
      setDescription( event ) {
        if ( event ) {
            this.bedahModel.dspDescription = event.dspDescription;
            this.bedahModel.livingUnitId = event.livingUnitId;
            this.bedahModel.isNonAssocOverriddenWarn=event.isNonAssocOverriddenWarn;
            this.bedahModel.warningMsg=event.warningMsg;
			this.searchDisablrd=false;
        }
    }

    select() {
        if (this.dialog.data && this.dialog.data.offenderBookId) {
            this.bedahModel.offenderBookId = this.dialog.data.offenderBookId;
        }
        
        const rData={
                dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId ,
                isNonAssocOverriddenWarn : this.bedahModel.isNonAssocOverriddenWarn,warningMsg:this.bedahModel.warningMsg
        };

        if (this.dialog.data && this.dialog.data.offenderBookId) {
            this.bedahModel.offenderBookId = this.dialog.data.offenderBookId;
        }
        const checkWarningService = this.oidchlocFactory.checkAllConficts(this.bedahModel);
        checkWarningService.subscribe(warningDetails => {
            if (warningDetails.warningMsg !== 'null') {
                warningDetails.warningMsg = warningDetails.warningMsg.replaceAll('omuavbed.selectedOffender', this.translateService.translate('omuavbed.selectedOffender'));
                warningDetails.warningMsg = warningDetails.warningMsg.replaceAll('omuavbed.housedinsameunit', this.translateService.translate('omuavbed.housedinsameunit'));
               
                const data = {
                    warningMsg: warningDetails.warningMsg, warningPrompt: warningDetails.warningPrompt,
                    yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/OCUWARNG', data, 50).subscribe(result => {
                    if (typeof result === 'boolean' && result) {
                        this.dialog.close({
                            dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                            noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId,
                            isNonAssocOverriddenWarn : 'Y',warningMsg:warningDetails.warningMsg
                        });
                    } else {
                    }
                });
            } else {
                this.dialog.close({
                    dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                    noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId,
                    isNonAssocOverriddenWarn : 'N',warningMsg:null
                });
            }
        }); 
//        const checkWarningService = this.oidchlocFactory.checkAllConficts(this.bedahModel);
//        checkWarningService.subscribe(warningDetails => {
//            if (warningDetails.warningMsg !== 'null') {
//                const data = {
//                    warningMsg: warningDetails.warningMsg, warningPrompt: warningDetails.warningPrompt,
//                    yesBtn: true, noBtn: true
//                };
//                this.dialogService.openLinkDialog('/OCUWARNG', data, 80).subscribe(result => {
//                    if (typeof result === 'boolean' && result) {
//                        this.dialog.close({
//                            dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
//                            noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId
//                        });
//                    } else {
//                    }
//                });
//            } else {
//                this.dialog.close({
//                    dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
//                    noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId
//                });
//            }
//        });
               // this.dialog.close(rData);
    }
    cancel(){
        this.dialog.close(true);
   }
    onRowClickHousing( event ) {
        this.bedahModel = new BedAssignmentHistories();
        this.searchDisablrd = false;
        this.bedahModel.dspDescription = event.description;
        this.bedahModel.livingUnitId = event.livingUnitId;
        this.bedahModel['noOfAvailable'] = event.noOfAvailable;
        if (this.offenderBookId) {
            this.bedahModel.offenderBookId = this.offenderBookId;
        }
      }
}