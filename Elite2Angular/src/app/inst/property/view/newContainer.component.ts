import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderPptyContainers } from '@instproperty/OffenderPptyContainers';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OidmpconService } from '../service/oidmpcon.service';
import { AgencyInternalLocations } from '@instoicbeans/AgencyInternalLocations';
import { OffenderPptyContainersCommitBean } from '@instproperty/OffenderPptyContainersCommitBean';
import { OidmpitmService } from '../service/oidmpitm.service';
@Component({
    selector: 'newContainer',
    templateUrl: './newContainer.component.html',
    styleUrls: ['./oidmpitm.component.scss']
    
})

export class NewContainerComponent implements OnInit {
    
    locationUrl:string;
    parentField:string;
    caseLoadId:string="";
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    rglocationallRg: any[] = [];
    flag: any;
    containerData: OffenderPptyContainers = new OffenderPptyContainers();
    offconModel: OffenderPptyContainers = new OffenderPptyContainers();
    offconInsertList: OffenderPptyContainers[] = [];
    offconData: OffenderPptyContainers[] = [];
    locationValueList: AgencyInternalLocations = new AgencyInternalLocations();
    offconCommitModel: OffenderPptyContainersCommitBean = new OffenderPptyContainersCommitBean();
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    locationMap: Map<string, string> = new Map<string, string>();
    constructor(public translateService: TranslateService,
            private sessionManager: UserSessionManager,private oidmpconFactory: OidmpconService, private oidmpitmFactory: OidmpitmService){
    }
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    ngOnInit() {
        this.dialog.data;
        this.vHeaderBlockModel=this.dialog.data;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.offconInsertList = [];
        this.offconCommitModel = new OffenderPptyContainersCommitBean();
        this.toGetLocationValue();
        this.containerData.activeFlag="true";
        const rglocationallServiceObj = this.oidmpconFactory.rgLocationAllRecordGroup(this.caseLoadId);
        rglocationallServiceObj.subscribe(rgLocationList => {
            if (rgLocationList.length === 0) {
                this.rglocationallRg = [];
            } else {
                for (let i = 0; i < rgLocationList.length; i++) {
                    this.rglocationallRg.push({
                        'text': rgLocationList[i].code, 'id': rgLocationList[i].internalLocationId,
                        'description': rgLocationList[i].description
                    });
                    this.locationMap.set(rgLocationList[i].code, rgLocationList[i].internalLocationId);
                }
            }
        });
       
    }
    
    
    toGetLocationValue() {
        const locationVal = this.oidmpconFactory.getLocationValue(this.vHeaderBlockModel.agyLocId);
        locationVal.subscribe(locationValue => {
           this.locationValueList = locationValue;
           this.getLocationLov();
        });
        
    }
    getLocationLov(){
        this.parentField= this.locationValueList.internalLocationId + ',' + this.vHeaderBlockModel.offenderBookId+ ',' + this.caseLoadId;
        this.locationUrl='oidmpcon/getLocationValuesOfLov?parentField='+this.parentField;
    }
    
    newSaveoffconForm(){
        this.offconInsertList=[];
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
        if (this.vHeaderBlockModel.inOutStatus === 'TRN') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidmpcon.offendertransit');
            this.show();
            return;
        }
        if (!this.containerData.containerCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.typemustbeentered');
            this.show();
            return;
        }
        if (this.containerData.proposedDisposalDate) {
            this.containerData.proposedDisposalDate = DateFormat.getDate(this.containerData.proposedDisposalDate);
            if ((DateFormat.compareDate(DateFormat.getDate(), this.containerData.proposedDisposalDate)) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
                this.show();
                return;
            }
        }
        if (this.containerData.expiryDate) {
            this.containerData.expiryDate = DateFormat.getDate(this.containerData.expiryDate);
            if ((DateFormat.compareDate(DateFormat.getDate(), this.containerData.expiryDate)) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
                this.show();
                return;
            }
        }
        this.flag = this.containerData.activeFlag;
        if (this.containerData.activeFlag) {
            if (!this.containerData.description || this.containerData.description === '') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.locationmust');
                this.show();
                return;
            }
        } 
        if (this.containerData.activeFlag) {
            this.containerData.activeFlag = 'Y';
        }
        if (!this.containerData.activeFlag) {
            this.containerData.activeFlag = 'N';
        }
        /*if (this.containerData.description) {
            this.containerData.internalLocationId = Number(this.locationMap.get(this.containerData.description));
        }*/
        
        if (this.containerData.activeFlag === 'Y') {
            if (!this.containerData.internalLocationId) {
                this.type = 'info';
                this.message = this.translateService.translate('oidmpcon.transactionroomproperty');
                this.show();
                return;
            }
        }
       // this.offconModel.parentField = this.containerData.internalLocationId+ ',' + this.vHeaderBlockModel.offenderBookId + ',' + this.caseLoadId;
        this.offconModel.caseLoadId = this.sessionManager.currentCaseLoad;
        this.offconModel.activeFlag = this.containerData.activeFlag;
        this.offconModel.containerCode = this.containerData.containerCode;
        this.offconModel.proposedDisposalDate =  this.containerData.proposedDisposalDate;
        this.offconModel.expiryDate =   this.containerData.expiryDate;
        this.offconModel.description = this.containerData.description;
        this.offconModel.internalLocationId = this.containerData.internalLocationId
        this.offconModel.createDateTime = DateFormat.getDate();
        this.offconModel.createUserId = this.sessionManager.getId();
        this.offconModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offconModel.agyLocId = this.vHeaderBlockModel.agyLocId;
        this.offconModel.propertyOnlyFlag = 'N';
        this.offconInsertList.push(this.offconModel);
        this.offconCommitModel.insertList = this.offconInsertList;
        this.offconCommitModel.updateList = [];
        
        const offconInsertData = this.oidmpitmFactory.offPiOIDMPITMContainerCommit(this.offconCommitModel);
        offconInsertData.subscribe(insertdata => {
            if (insertdata === 1) {
                
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.dialog.close(insertdata);
            } else if(insertdata === 5) {
                this.type = 'warn';
                this.message = this.translateService.translate('Selected location does not have capacity for new containers');
                this.show();
            } else{
                this.type = 'error';
                this.message = this.translateService.translate('common.recordunsuccess');
                this.show();
            }
           // this.cancel();
            
        });
        
    }
    
    changeLocation (event) {
        this.containerData.internalLocationId = event.internalLocationId;
    }
    
    cancel(): void {
        this.dialog.close(true);
       }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
}