import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidtpconService } from '@inst/property/service/oidtpcon.service';
import { OffenderPptyContainers } from '@instproperty/OffenderPptyContainers';
import { OffenderPptyContainersCommitBean } from '@instproperty/OffenderPptyContainersCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VPropertyHeaderBlock } from '@commonbeans/VPropertyHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OidmpconService } from '../service/oidmpcon.service';
import { OidmpitmService } from '../service/oidmpitm.service';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { AgencyInternalLocations } from '@inst/incidents-oic/beans/AgencyInternalLocations';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';

@Component({
    selector: 'app-oidtpcon',
    templateUrl: './oidtpcon.component.html'
})

export class OidtpconComponent implements OnInit {
    @ViewChild('penConfGrid', {static: true}) penConfGrid: any;
    msgs: any[] = [];
    offconData: OffenderPptyContainers[] = [];
    offPenPropData: OffenderPptyContainers[] = [];
    offconDataTemp: OffenderPptyContainers[] = [];
    offconMissCellData:OffenderPptyContainers[]=[];
    offconModel: OffenderPptyContainers = new OffenderPptyContainers();
    offpenPropModel: OffenderPptyContainers = new OffenderPptyContainers();
    offconIndex = -1;
    offconCommitModel: OffenderPptyContainersCommitBean = new OffenderPptyContainersCommitBean();
    offPenPropCommitModel: OffenderPptyContainersCommitBean = new OffenderPptyContainersCommitBean();

    offconInsertList: OffenderPptyContainers[] = [];
    offconUpdateList: OffenderPptyContainers[] = [];
    offconUpdateListTemp: OffenderPptyContainers[] = [];
    offconDeleteList: OffenderPptyContainers[] = [];

    
    offPenPropInsertList: OffenderPptyContainers[] = [];
    offPenPropUpdateList: OffenderPptyContainers[] = [];
    offPenPropTempUpdateList: OffenderPptyContainers[] = [];
    offPenPropDeleteList: OffenderPptyContainers[] = [];
    vPropertyHeaderBlockModel: VPropertyHeaderBlock = new VPropertyHeaderBlock();
    minDate: Date;
    display: boolean;
    disabled: boolean;
    editable: boolean;
    offConColumnDef: any[];
    offPenPropColumnDef: any[];
    offConReadOnly: boolean;
    cgfkOffcontrntoagylocidRg: any[] = [];
    rgAgyLocId: any[] = [];
    rgDescriptionCode: any[] = [];
    rgselectallRg: any[] = [];
    caseloadId: any;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    itemsDisabled: boolean;
    updateble: boolean;
    offpiModel: OffenderPptyItems = new OffenderPptyItems();
    itemsMissing: boolean;
    itemsInCell: boolean;
    itemsOut: boolean;
    offPenPropIndex: number;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    locationValueList: AgencyInternalLocations = new AgencyInternalLocations();
    parentField: string;
    locationUrl: string;
    locationLink: string;
    locationMap: Map<string, number> = new Map<string, number>();
    constructor(private oidtpconFactory: OidtpconService, private oidmpconFactory: OidmpconService,private oidmpitmFactory: OidmpitmService,
        private sessionManager: UserSessionManager,
        public translateService: TranslateService, private offenderSearchService: OffenderSearchService) {
        this.offConColumnDef = [];
    }
    ngOnInit() {
        this.updateble = true;
        this.itemsDisabled = true;
        //this.locationUrl='oidmpcon/getLocationValuesOfLov?parentField='+this.parentField;
        this.vPropertyHeaderBlockModel = new VPropertyHeaderBlock();
        this.vPropertyHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.offConColumnDef = [
            {
                fieldName: this.translateService.translate('common.type'), field: 'containerCode',
                datatype: 'select', options: this.rgAgyLocId,
                editable: false, width: 310
            },
            {
                fieldName: this.translateService.translate('common.location'), field: 'description',
                datatype: 'select', options: this.rgDescriptionCode, editable: false, width: 310
            },
            { fieldName: this.translateService.translate('common.sealmark'), field: 'sealMark', editable: false, width: 310 },
            {
                fieldName: this.translateService.translate('oidtpcon.transferto'), field: 'trnToAgyLocId',
                datatype: 'lov', link: 'oidtpcon/cgfkOffConTrnToAgyLocIdRecordGroup?agyLocId=',
                editable: true, codeTitle: 'Transfer To', parentField: 'gvAgyLocId', optionWidth: 300, width: 320, source: 'OUMAGLOC'
            }
           
        ];


        this.offPenPropColumnDef = [
            {
                fieldName: this.translateService.translate('common.type'), field: 'containerCode',
                datatype: 'select', options: this.rgAgyLocId,
                editable: false, width: 310
            },
            {
                fieldName: this.translateService.translate('common.location'), field: 'trnToAgyLocId',
                datatype: 'text', editable: false, width: 310
            },
            { fieldName: this.translateService.translate('common.sealmark'), field: 'sealMark', editable: false, width: 310 },
           /*  {
                fieldName: this.translateService.translate('oidtpcon.transferto'), field: 'trnToAgyLocId',
                datatype: 'lov', link: 'oidtpcon/cgfkOffConTrnToAgyLocIdRecordGroup?agyLocId=',
                editable: true, codeTitle: 'Transfer To', parentField: 'gvAgyLocId', optionWidth: 300, width: 320, source: 'OUMAGLOC'
            }, */
            {
                fieldName: this.translateService.translate('common.status') ,
                field: 'statusCode', editable: false, width: 150, datatype : 'text',
                uppercase: 'false',  maxlength: 50, 
             },
            {
                fieldName: this.translateService.translate('oidtpcon.canceltransfer'), field: 'cancelTransfer', editable: true,
                width: 150, datatype: 'checkbox'
              },
              {
                fieldName: this.translateService.translate('oidtpcon.cancelreason'), field: 'cancelReason', width: 150,
                datatype: 'lov', domain: 'P_TRN_CAN',cellEditable: this.checkEditable
            },
            {
                fieldName: this.translateService.translate('oidtpcon.cancellocation'), field: 'cancelLocation',  width: 150,
                datatype: 'lov', link: '/oidmpcon/getLocationValuesOfLov?parentField=', parentField: 'parentField',cellEditable: this.checkEditable,source: 'OIMULOCA'
            },
            {
                fieldName: '', field: 'parentField', hide: true
            },
        ];
        

        const cgfkOffcontrntoagylocidServiceObj = this.oidtpconFactory.
            cgfkOffcontrntoagylocidRecordGroup(this.sessionManager.currentCaseLoad);
        cgfkOffcontrntoagylocidServiceObj.subscribe(cgfkOffcontrntoagylocidList => {
            if (cgfkOffcontrntoagylocidList.length === 0) {
                this.cgfkOffcontrntoagylocidRg = [];
            } else {
                for (let i = 0; i < cgfkOffcontrntoagylocidList.length; i++) {
                    this.cgfkOffcontrntoagylocidRg.push({
                        'text': cgfkOffcontrntoagylocidList[i].code + ' - ' +
                            cgfkOffcontrntoagylocidList[i].description, 'id': cgfkOffcontrntoagylocidList[i].code
                    });
                }
            }
        });
        const findRgContainerCode = this.oidmpconFactory.findRgContainerCode();
        findRgContainerCode.subscribe(rgContainerCodeList => {
            if (rgContainerCodeList.length === 0) {
                this.rgAgyLocId = [];
            } else {
                rgContainerCodeList.forEach(listval => {
                    this.rgAgyLocId.push({ 'id': listval, 'text': listval });
                });
            }
        });
        this.caseloadId = this.sessionManager.currentCaseLoad;
        const findRgDescriptionCode = this.oidmpconFactory.rgLocationAllRecordGroup(this.caseloadId);
        findRgDescriptionCode.subscribe(rgContainerCodeList => {
            if (rgContainerCodeList.length === 0) {
                this.rgDescriptionCode = [];
            } else {
                for (let i = 0; i < rgContainerCodeList.length; i++) {
                    this.rgDescriptionCode.push({
                        'id': rgContainerCodeList[i].description,
                        'text': rgContainerCodeList[i].description
                    });
                    this.locationMap.set(rgContainerCodeList[i].code,rgContainerCodeList[i].internalLocationId);
                }
            }
        });
        const rgselectallServiceObj = this.oidtpconFactory.rgSelectAllRecordGroup();
        rgselectallServiceObj.subscribe(rgselectallList => {
            if (rgselectallList.length === 0) {
                this.rgselectallRg = [];
            } else {
                for (let i = 0; i < rgselectallList.length; i++) {
                    this.rgselectallRg.push({
                        'text': rgselectallList[i].code + ' - ' +
                            rgselectallList[i].description, 'id': rgselectallList[i].code
                    });
                }
            }
        });
        if (!this.vPropertyHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    onOffenderChange(offender) {
        this.itemsMissing = false;
        this.itemsInCell = false;
        this.itemsOut = false;
        this.vPropertyHeaderBlockModel = offender;
        if (offender) {
            this.offconModel.offenderBookId = this.vPropertyHeaderBlockModel.offenderBookId;
            this.offconModel.agyLocId = this.sessionManager.currentCaseLoad;
            this.offpiModel.offenderBookId = this.vPropertyHeaderBlockModel.offenderBookId;
            this.offpiModel.agyLocId = this.vPropertyHeaderBlockModel.agyLocId;
            this.caseloadId = this.sessionManager.currentCaseLoad;
        this.locationLink='oidmpcon/getAgyLocationValuesOfLov?agyLocId='+this.vPropertyHeaderBlockModel.agyLocId+ '&caseloadId=' + this.caseloadId;
    
          
            this.getItemStatus();
            this.offconExecuteQuery();
            this.offPenPropContExecuteQuery();
            this.offconexecuteMissCellQuery();
        } else {
            this.offconData = [];
        }
    }
    validatePenConfData =(event)=>{
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
         if (event.field === 'cancelTransfer') {
            if (!event.data.cancelTransfer) {
                this.penConfGrid.setColumnData('cancelReason', index, null);
                this.penConfGrid.setColumnData('cancelLocation', index, null);
         }
        }
        
        
        rowdata.validated = true;
        return rowdata;
     }
    onGridClear = () => {
        this.offPenPropContExecuteQuery();
        return true;
     }
    toGetLocationValue() {
        const locationVal = this.oidmpconFactory.getLocationValue(this.vPropertyHeaderBlockModel.agyLocId);
        locationVal.subscribe(locationValue => {
           this.locationValueList = locationValue;
            this.getLocationLov();
           
        });
        
    }

    checkEditable = (data: any, index: number, field: string): boolean => {
        if (data.cancelTransfer) {
            return true;
        }
        return false;

    }
    getLocationLov(){
        this.parentField= this.locationValueList.internalLocationId + ',' + this.vPropertyHeaderBlockModel.offenderBookId+ ',' + this.caseloadId;
        this.offPenPropData.forEach(obj=>{
            obj['parentField']=this.parentField;
        })
    }
    /**
     * event is fired when try to edit the Transfer To field in the grid.
     */
    transferToEdit = (data: any, index: number, field: string): boolean => {
        if (this.vPropertyHeaderBlockModel.offenderBookId) {
            if (this.cgfkOffcontrntoagylocidRg.length === 0) {
                return true;
            } else {
                return true;
            }

        } else {
            return true;
        }

    }
    onRowClickoffcon(event) {

    }
    onRowClickOffPenPropGrid(event){

    }
    /*
    * below method is used to check items are exists or not for CELL,OUT and MISSING.
    * Items avaliable the particular item will be checked else unchecked.
    */
    getItemStatus() {
        const serviceObjOfItem = this.oidtpconFactory.getItemStatus(this.offpiModel);
        serviceObjOfItem.subscribe(itemList => {
            if (itemList.length === 0) {
                this.itemsMissing = false;
                this.itemsInCell = false;
                this.itemsOut = false;
            } else {
                for(let i=0;i<itemList.length;i++){
                if (itemList[i].statusCode=='MISSING') {
                    this.itemsMissing = true;
                } /* else {
                    this.itemsMissing = false;
                }*/ 
                if (itemList[i].statusCode=='REGISTERED') {
                    this.itemsOut = true;
                }/*  else {                 
                    this.itemsOut = false;
                }*/
                if (itemList[i].statusCode=='CELL') {
                    this.itemsInCell = true;
                } /*  else {
                    this.itemsInCell = false;
                 }*/
                }
            }

        });
    }
    /*
    * This method is used to show popup messages.
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    offconExecuteQuery() {
        const offconResult = this.oidtpconFactory.offConExecuteQuery(this.offconModel);
        offconResult.subscribe(offconResultList => {
            if (offconResultList.length === 0) {
                this.offconData = [];
            } else {
                this.offconData = offconResultList;
                this.offconIndex = 0;
                //this.offconModel = 	this.offconData[0];
            }
        });
    }

    offPenPropContExecuteQuery() {
        const offconResult = this.oidtpconFactory.offPenPropContExecuteQuery(this.offconModel);
        offconResult.subscribe(resultList => {
            if (resultList.length === 0) {
                this.offPenPropData = [];
            } else {
                this.offPenPropData = resultList;
                this.offPenPropData.forEach(obj=>{
                    obj.statusCode='Pending';
                })
                this.toGetLocationValue();
                this.offPenPropIndex = 0;
                //this.offconModel = 	this.offconData[0];
            }
        });
    }
    offconexecuteMissCellQuery(){
  if(!this.offconMissCellData.length){
        for (let index = 0; index < 2; index++) {
            let OffenderPptyModel=new OffenderPptyContainers();
            if(index==0){
                OffenderPptyModel.activeFlag= "Y",
                OffenderPptyModel.agyLocId= this.sessionManager.currentCaseLoad;
                OffenderPptyModel.containerCode= "Missing";
                OffenderPptyModel. containerDescription="Missing";
                OffenderPptyModel. description= "MISSING";
                OffenderPptyModel.itemsForContainer= [];
                OffenderPptyModel.locationDescription= "MISSING";
                OffenderPptyModel.offenderBookId= this.vPropertyHeaderBlockModel.offenderBookId,
                OffenderPptyModel.statusCode= "MISSING";
            } else{
                OffenderPptyModel.activeFlag= "Y",
                OffenderPptyModel.agyLocId= this.sessionManager.currentCaseLoad;
                OffenderPptyModel.containerCode= "In Cell";
                OffenderPptyModel. containerDescription="In Cell";
                OffenderPptyModel. description= "In Cell";
                OffenderPptyModel.itemsForContainer= [];
                OffenderPptyModel.locationDescription= "In Cell";
                OffenderPptyModel.offenderBookId= this.vPropertyHeaderBlockModel.offenderBookId,
                OffenderPptyModel.statusCode= "CELL";
            }
            this.offconMissCellData.push(OffenderPptyModel);
            
        }
    }
        const pptyItemsForContainers = this.oidmpitmFactory.offPiSearchOffenderPptyItemsForcontainer( this.offconMissCellData );
        pptyItemsForContainers.subscribe( resultData => {
        
        for(let i=0;i<resultData.length;i++){
            if(resultData[i].statusCode=="MISSING" && resultData[i].itemsForContainer.length){
                this.itemsMissing=true;
            }
            if(resultData[i].statusCode=="CELL" && resultData[i].itemsForContainer.length) {
              this.itemsInCell=true;
            }
        }
        });

    }
    /**
     *  This function will be executed when commit event is
    * fired
    */

   penPropGridValidation() {
    const is = { valid: true };
    if (this.offPenPropData.length > 0) {
        this.offPenPropData.forEach(obj=>{
            if(obj.cancelTransfer){
                if(!obj.cancelReason){
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidtpcon.cancelreasonmust');
                    this.show();
                    is.valid = false;
                    return;
                }
                if(!obj.cancelLocation){
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidtpcon.cancellocationmust');
                    this.show();
                    is.valid = false;
                    return;
                }
            }
        })
    }

    return is.valid;
 }
   saveOffPenPropconData(event){
if(!this.penPropGridValidation()){
    return;
}
  this.offPenPropUpdateList = event.updated;
  this.offPenPropCommitModel.updateList = [];
  this.offPenPropUpdateList.forEach(obj=>{
    obj.agyLocId=this.vPropertyHeaderBlockModel.agyLocId;
    obj.internalLocationId=this.locationMap.get(obj.cancelLocation);
   
  })
this.offPenPropUpdateList= this.offPenPropUpdateList.filter(obj => obj.cancelTransfer);
if(this.offPenPropUpdateList.length == 0){
    this.type = 'warn';
    this.message = this.translateService.translate('oidtpcon.cancelrecordmust');
    this.show();
    return;
}
this.offPenPropCommitModel.updateList = this.offPenPropUpdateList;


const offconSaveData = this.oidtpconFactory.offPenPropConCommit(this.offPenPropCommitModel);
offconSaveData.subscribe(data => {
    if (data.length === 0) {
        this.type = 'warn';
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.show();
        this.offconExecuteQuery();
        this.offPenPropContExecuteQuery();
    } else {
        this.type = 'success';
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.show();
        this.offconExecuteQuery();
        this.offPenPropContExecuteQuery();
    }
});
}
   
   
    saveoffconForm(event) {
//        this.offconUpdateListTemp = [];
        this.offconUpdateList = event.updated;
        this.offconCommitModel.updateList = [];
        if (this.offconUpdateList.length > 0) {
            for (let i = 0; i < this.offconUpdateList.length; i++) {
                if (this.offconUpdateList[i].trnToAgyLocId == undefined) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidtpcon.transferTomustbeenter');
                    this.show();
                    return;
                }
            }
//            if (this.offconUpdateListTemp.length > 0) {
//                this.offconCommitModel.updateList = this.offconUpdateListTemp;
//            } else {
//                this.type = 'warn';
//                this.message = this.translateService.translate('oidtpcon.transferTomustbeenter');
//                this.show();
//                return;
//            }
        }
        this.offconCommitModel.updateList = this.offconUpdateList;
        const offconSaveData = this.oidtpconFactory.offConCommit(this.offconCommitModel);
        offconSaveData.subscribe(data => {
            if (data.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.offconData = data;
                this.offconExecuteQuery();
                this.offPenPropContExecuteQuery();
            } else {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offconData = data;
                this.offconExecuteQuery();
                this.offPenPropContExecuteQuery();
            }
        });
    }
}
