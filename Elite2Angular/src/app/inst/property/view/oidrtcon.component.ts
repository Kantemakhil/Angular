import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidrtconService } from '../service/oidrtcon.service';
import { OffenderPptyContainers } from '../beans/OffenderPptyContainers';
import { OffenderPptyContainersCommitBean } from '../beans/OffenderPptyContainersCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OidmpconService } from '../service/oidmpcon.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { AgencyInternalLocations } from '@inst/incidents-oic/beans/AgencyInternalLocations';

@Component({
    selector: 'app-oidrtcon',
    templateUrl: './oidrtcon.component.html'
})

export class OidrtconComponent implements OnInit {
    @ViewChild('grid') grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offconData: OffenderPptyContainers[] = [];
    offconDataTemp: OffenderPptyContainers[] = [];
    offconModel: OffenderPptyContainers = new OffenderPptyContainers();
    offconIndex = 0;
    offconInsertList: OffenderPptyContainers[] = [];
    offconUpdatetList: OffenderPptyContainers[] = [];
    offconDeleteList: OffenderPptyContainers[] = [];
    offconCommitModel: OffenderPptyContainersCommitBean = new OffenderPptyContainersCommitBean();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offConColumnDef: any[];
    offConReadOnly = false;
    saveEnable: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    locationValueList: AgencyInternalLocations = new AgencyInternalLocations();
    parentField: string;
    locationUrl: string;
    caseLoadId: string;
    locationMap: Map<string, number> = new Map<string, number>();
    message: string;
    constructor(private oidrtconFactory: OidrtconService,
                private sessionManager: UserSessionManager,
                public translateService: TranslateService,
                public dialogService: DialogService,
                private oidmpconFactory: OidmpconService,
                private offenderSearchService: OffenderSearchService) {
        this.offConColumnDef = [];
        this.caseLoadId= this.sessionManager.currentCaseLoad;
    }
    ngOnInit() {
        this.saveEnable = true;
        
        const agyLocIdLink = `oidmpcon/rgLocationAllRecordGroup?caseloadId=${this.caseLoadId}`;

        
        this.offConColumnDef = [
            { fieldName: this.translateService.translate('oidrtcon.confirm'), field: 'activeFlag', datatype: 'checkbox',
                editable: true, width: 130 },
          {
               fieldName: this.translateService.translate('oidrtcon.movedto'), field: 'moveTointernalLocation', editable: true, width: 150,
              datatype: 'lov', link: agyLocIdLink,source:'OIMILOCA',cellEditable: this.checkMoveLocationEditable
         },
         {  fieldName: this.translateService.translate('oidrtcon.reject'), field: 'rejectFlag', 
            width: 150, datatype: 'checkbox',editable:true
             },
             {
                fieldName: this.translateService.translate('oidrtcon.rejectreason'), field: 'rejectReason', cellEditable: this.checkRejectEditable, width: 150,
                datatype: 'lov', domain: 'P_TRN_REJ'
            },
            { fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidrtcon.name'), field: 'offenderName', editable: false, width: 250 },
            { fieldName: this.translateService.translate('oidrtcon.type'), field: 'containerCode', datatype: 'lov',
                domain: 'PPTY_CNTNR', editable: false, width: 250 },
            { fieldName: this.translateService.translate('common.sealmark'), field: 'sealMark', editable: false, width: 250 },
            { fieldName: this.translateService.translate('oidrtcon.receivedfrom'), field: 'trnFromAgyLocId', editable: false, width: 350,
            datatype: 'lov', link: 'oidrtcon/recievedFromLov' },
        ];

        const findRgDescriptionCode = this.oidmpconFactory.rgLocationAllRecordGroup(this.caseLoadId);
        findRgDescriptionCode.subscribe(rgContainerCodeList => {
            if (rgContainerCodeList.length === 0) {
            } else {
                for (let i = 0; i < rgContainerCodeList.length; i++) {
                    this.locationMap.set(rgContainerCodeList[i].code,rgContainerCodeList[i].internalLocationId);
                }
            }
        });
        //this.toGetLocationValue();
        this.offconExecuteQuery();

    }
    onGridReady(event) {
    }
    onRowClickoffcon(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    
    checkRejectEditable= (data: any, index: number, field: string): boolean => {
        if (field === 'rejectFlag' && data.moveTointernalLocation) {
            return false;
        }
        if (field === 'rejectReason' && !data.rejectFlag) {
            return false;
        }
        return true;

    }
    checkMoveLocationEditable= (data: any, index: number, field: string): boolean => {
        if (field === 'moveTointernalLocation' && data.rejectFlag ) {
            return false;
        }
        return true;

    }
    /*
  *  event is used to validate the row
  */
  validateActiveFlag = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
       rowdata.validated = true;
       if (event.data.activeFlag === true) {
             for (let i = 0; i < this.offconData.length; i++) {
                   if (this.offconData[i].activeFlag) {
                         this.saveEnable = true;
                   }

             }
       } else if (!event.data.activeFlag) {
             for (let i = 0; i < this.offconData.length; i++) {
                   if (this.offconData[i].activeFlag) {
                         this.saveEnable = true;
                         rowdata.validated = true;
                         return rowdata;
                   } else {
                         this.saveEnable = false;
                   }
             }
       }
		if (event.field === 'rejectFlag') {
			if (!event.data.rejectFlag) {
				this.grid.setColumnData('rejectReason', rowIndex, '');
				rowdata.validated = true;
				return rowdata;
			}else if(event.data.rejectFlag){
                this.grid.setColumnData('moveTointernalLocation', rowIndex, '');
				rowdata.validated = true;
				return rowdata;
            }
		}
       return rowdata;
 }
    offconExecuteQuery() {
        this.offconModel = new OffenderPptyContainers();
        this.offconModel.agyLocId = this.sessionManager.currentCaseLoad;
        const offconResult = this.oidrtconFactory.
            offConExecuteQuery(this.offconModel);
        offconResult.subscribe(offconResultList => {
            
            if (offconResultList.length === 0) {
                this.offconData = [];
            } else {
                offconResultList.forEach(element => {
                    element.activeFlag = (element.activeFlag === 'N') ? true : false;
                    element.rejectFlag = element.rejectFlag === 'Y' ? true : false;
                });
                this.offconData = offconResultList;
                this.offconModel = offconResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */

   gridValidation(data) {
    const is = { valid: true };
    if (data.length > 0) {
        data.forEach(obj=>{
            if(obj.rejectFlag){
                if(!obj.rejectReason){
                    this.show(this.translateService.translate('oidrtcon.rejectreasonmust'), 'warn'); 
                    is.valid = false;
                    return;
                }
            }else if(!obj.moveTointernalLocation){
                this.show(this.translateService.translate('oidrtcon.movetolocationmust'), 'warn'); 
                is.valid = false;
                return;
            }
        })
    }

    return is.valid;
 }
    oidrtconSaveoffconForm(event) {
        this.offconUpdatetList = [];
        for (let j = 0; j < event.updated.length ; j++) {
            if (event.updated[j].activeFlag) {
                this.offconUpdatetList.push(event.updated[j]);
            }

        }
        this.offconInsertList = event.added;
        this.offconDeleteList = event.removed;
        this.offconCommitModel.insertList = [];
        this.offconCommitModel.updateList = [];
        this.offconCommitModel.deleteList = [];
        
        this.offconCommitModel.updateList = this.offconUpdatetList;
        var count:number=0
        for (let index = 0; index < this.offconUpdatetList.length; index++) {
            if(this.offconUpdatetList[index].moveTointernalLocation){
                this.offconUpdatetList[index].internalLocationId=this.locationMap.get(this.offconUpdatetList[index].moveTointernalLocation);
            }
            
            if(this.offconUpdatetList[index].activeFlag){
                break;
            }else{
                 count++;
             }
        }
        if(count==this.offconUpdatetList.length){
            this.show(this.translateService.translate('oidrtcon.atleastselectonerecord'), 'warn');  
            return;
        }
        if(!this.gridValidation(this.offconUpdatetList)){
            return;
        }
        this.offconUpdatetList.forEach(data => {
            data.modifyDateTime = DateFormat.getDate();
            data.activeFlagTemp = false;
            data.rejectFlag = data.rejectFlag ? 'Y' : 'N';
        });
        this.offConCommit();
    }
    offConCommit() {
        const offconSaveData = this.oidrtconFactory.offConCommit(this.offconCommitModel);
        offconSaveData.subscribe(result => {
            
            if (result && result.sealFlag === '1') {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.offconExecuteQuery();
            } else if( result && result.sealFlag === '0'){
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.offconExecuteQuery();
            }else{
                 if(result && result.sealFlag){
                    this.message =this.translateService.translate('oidmpcon.trlocationnotpresent');
                this.message = this.message.replace('%agyLocId%', result.sealFlag);
                    this.show(this.message, 'warn');
                    this.offconExecuteQuery();
                 }
                
            }
        });
    }

    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
}
