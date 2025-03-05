import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffHealthRecordsData } from '@inst/demographics-biometrics/beans/OffHealthRecordsData';
import { HealthRecordDetails } from '@inst/demographics-biometrics/beans/HealthRecordDetails';
import { OcdhealtService } from '../service/ocdhealt.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { HealthRecordDetailsCommitBean } from '@inst/demographics-biometrics/beans/HealthRecordDetailsCommitBean';
import { OffHealthRecordsDataCommitBean } from '@inst/demographics-biometrics/beans/OffHealthRecordsDataCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
@Component({
    selector: 'app-ocdhealt',
    templateUrl: './ocdhealt.component.html'
})
export class OcdhealtComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    @ViewChild('gridOne', {static: true}) gridOne: any;
    offenderHealthRecordColumnDefs: any[];
    healthRecordDetailsColumnDefs: any[];
    offenderRowData: OffHealthRecordsData[]=[];
    offenderRowDataModel: OffHealthRecordsData = new OffHealthRecordsData();
    offenderRowDataSearchModel: OffHealthRecordsData = new OffHealthRecordsData();
    healthRowData:HealthRecordDetails[]=[];
    healthRowDataModel: HealthRecordDetails = new HealthRecordDetails();
    healthRowDataSearchModel: HealthRecordDetails = new HealthRecordDetails();
    userRoleHealData: any;
    userRoleHealAdvData: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    msgs: { message: any; type: any; }[];
    offenderHealthDetIndex: number;
    offenderHealthRowIndex: number;
    healthRecordDetailInsertList: HealthRecordDetails[] = [];
    healthRecordDetailUpdatetList: HealthRecordDetails[] = [];
    healthRecordDetailDeleteList: HealthRecordDetails[] = [];
    healthRecordDetailsCommitBean: HealthRecordDetailsCommitBean = new HealthRecordDetailsCommitBean();

    offRowDataHealthRecordInsertList: OffHealthRecordsData[] = [];
    offRowDataHealthRecordUpdatetList: OffHealthRecordsData[] = [];
    offRowDataHealthRecordDeleteList: OffHealthRecordsData[] = [];
    offHealthRecordsDataCommitBean: OffHealthRecordsDataCommitBean = new OffHealthRecordsDataCommitBean();

    constructor(
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private ocdhealtFactory: OcdhealtService) {
    }
    ngOnInit() {
        //This is for first grid columns
        this.offenderHealthRecordColumnDefs = [
            { fieldName: this.translateService.translate('ocdhealt.type'), field: 'healthType', datatype: 'lov', editable: true, required: true, domain: 'HEALTH' },
            { fieldName: this.translateService.translate('ocdhealt.subtype'), field: 'healthSubType', datatype: 'lov', editable: true, required: true, domain: 'HEALTH_PBLM', parentField: 'healthType' },
            { fieldName: this.translateService.translate('ocdhealt.description'), field: 'description', datatype: 'text', editable: true, uppercase: 'false', maxlength: 240  },
            { fieldName: this.translateService.translate('ocdhealt.fromdate'), field: 'fromDate', datatype: 'date', editable: true, required: true },
            { fieldName: this.translateService.translate('ocdhealt.todate'), field: 'toDate', datatype: 'date', editable: true, },
            { fieldName: this.translateService.translate('ocdhealt.status'), field: 'healthStatus', datatype: 'lov', editable: true, domain: 'HEALTH_STS' },
            
        ];

        //This is for second grid columns
        this.healthRecordDetailsColumnDefs =[
            { fieldName: this.translateService.translate('ocdhealt.type'), field: 'healthTreatType', datatype: 'lov', editable: true, required: true, domain: 'HEALTH_TREAT' }, 
            { fieldName: this.translateService.translate('ocdhealt.provider'), field: 'healthProvider', datatype: 'lov', editable: true, required: true, domain: 'HEALTH_PROV' }, 
            { fieldName: this.translateService.translate('ocdhealt.description'), field: 'description', datatype: 'text', editable: true, uppercase: 'false', maxlength: 240 }, 
            { fieldName: this.translateService.translate('ocdhealt.fromdate'), field: 'fromDate', datatype: 'date', editable: true, required: true }, 
            { fieldName: this.translateService.translate('ocdhealt.todate'), field: 'toDate', datatype: 'date', editable: true }, 
            { fieldName: this.translateService.translate('ocdhealt.comment'), field: 'commentText', datatype: 'text', editable: true, uppercase: 'false', maxlength: 4000 }, 
        ]



        this.getUserRoleForHealUser();
        this.getUserRoleForHealAdvUser();
    }
  
    getUserRoleForHealUser(){
        const userRoleHealData = this.ocdhealtFactory.getUserRoleForHealUser();
        userRoleHealData.subscribe(data => {
            console.log('getUserRoleForHealUser'+data)
            this.userRoleHealData= data;
           
        });
   }

   getUserRoleForHealAdvUser(){
    const userRoleHealAdvData = this.ocdhealtFactory.getUserRoleForHealAdvUser();
    userRoleHealAdvData.subscribe(data => {
        console.log('getUserRoleForHealAdvUser'+data)
        this.userRoleHealAdvData= data;
    });
   }

   onOffenderChange(offender) {
    if (offender) {
        this.offenderRowData = [];
        this.offenderRowData = [];
        this.vHeaderBlockModel = offender;
        this.getOffenderRowHealthExecuteQuery();

    } else {
        this.offenderRowData = [];
        this.offenderRowData = [];
        this.vHeaderBlockModel = new VHeaderBlock();
    }
}
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    onRowClickoffenderRowData(event) {
        if(event){
            this.offenderRowDataModel=event;
            this.getHealthDetailExecuteQuery();
        } else {
            this.healthRowDataModel =new HealthRecordDetails();
            this.healthRowData =[];
        }

    }

    onRowClickhealthRowData(event) {
        if(event){
            this.healthRowDataModel=event;
        }

    }

    getHealthDetailExecuteQuery() {
        this.healthRowDataSearchModel = new HealthRecordDetails();
        this.healthRowDataSearchModel.offHealthRecId = this.offenderRowDataModel.offHealthRecId;
        const serviceObj = this.ocdhealtFactory.getHealthDetailExecuteQuery(this.healthRowDataSearchModel).subscribe(data => {
            if (data && data.length > 0) {
                this.healthRowData = data;
                this.healthRowDataModel = data[0];
                this.offenderHealthDetIndex = 0;
            } else {
                this.healthRowData = [];
                this.healthRowDataModel =new HealthRecordDetails();
            }

        });
    }

    getOffenderRowHealthExecuteQuery() {
        this.offenderRowDataSearchModel = new OffHealthRecordsData();
        this.offenderRowDataSearchModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdhealtFactory.getOffenderRowHealthExecuteQuery(this.offenderRowDataSearchModel).subscribe(data => {
            if (data && data.length > 0) {
                this.offenderRowData = data;
                this.offenderRowDataModel = data[0];
                this.offenderHealthRowIndex = 0;
            } else {
                this.offenderRowData = [];
                this.offenderRowDataModel =new OffHealthRecordsData();
            }

        });
    }

    healthRecordDetailDataCommit(event) {
        this.healthRecordDetailInsertList = event.added;
        this.healthRecordDetailUpdatetList = event.updated;
        this.healthRecordDetailDeleteList = event.removed;
        this.healthRecordDetailsCommitBean.insertList = [];
        this.healthRecordDetailsCommitBean.updateList = [];
        this.healthRecordDetailsCommitBean.deleteList = [];
        if (this.healthRecordDetailInsertList.length > 0 || this.healthRecordDetailUpdatetList.length > 0) {          
            for (let i = 0; i < this.healthRecordDetailInsertList.length; i++) {
                if(this.healthRecordDetailInsertList[i].fromDate && this.healthRecordDetailInsertList[i].toDate){
                    if (DateFormat.compareDate(DateFormat.getDate(this.healthRecordDetailInsertList[i].toDate),
                    DateFormat.getDate(this.healthRecordDetailInsertList[i].fromDate)) === -1) {
                    this.show(this.translateService.translate('ocdhealt.fromdatemustbebeforethetodate'), 'warn');
                    return false;
                    }
                
                }
                this.healthRecordDetailInsertList[i].offHealthRecId = this.offenderRowDataModel.offHealthRecId;          
                this.healthRecordDetailsCommitBean.insertList = this.healthRecordDetailInsertList;
            }
        
            for (let i = 0; i < this.healthRecordDetailUpdatetList.length; i++) {
                if(this.healthRecordDetailUpdatetList[i].fromDate && this.healthRecordDetailUpdatetList[i].toDate){
                    if (DateFormat.compareDate(DateFormat.getDate(this.healthRecordDetailUpdatetList[i].toDate),
                    DateFormat.getDate(this.healthRecordDetailUpdatetList[i].fromDate)) === -1) {
                    this.show(this.translateService.translate('ocdhealt.fromdatemustbebeforethetodate'), 'warn');
                    return false;
                }      
            }
                this.healthRecordDetailUpdatetList[i].fromDate = DateFormat.getDate(this.healthRecordDetailUpdatetList[i].fromDate); 
                if(this.healthRecordDetailUpdatetList[i].toDate){
                    this.healthRecordDetailUpdatetList[i].toDate = DateFormat.getDate(this.healthRecordDetailUpdatetList[i].toDate);
                }
                this.healthRecordDetailsCommitBean.updateList = this.healthRecordDetailUpdatetList;

        }
    }

        if (this.healthRecordDetailDeleteList.length > 0) {
            for (let i = 0; i < this.healthRecordDetailDeleteList.length; i++) {
                this.healthRecordDetailDeleteList[i].fromDate = DateFormat.getDate(this.healthRecordDetailDeleteList[i].fromDate); 
                this.healthRecordDetailDeleteList[i].toDate = DateFormat.getDate(this.healthRecordDetailDeleteList[i].toDate);
                this.healthRecordDetailsCommitBean.deleteList = this.healthRecordDetailDeleteList;
            }
        }

        const omsroleSaveData = this.ocdhealtFactory.healthRecordDetailDataCommit(this.healthRecordDetailsCommitBean);
        omsroleSaveData.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.show(this.translateService.translate('oimoffob.rowalreadyexistswithsamedata'), 'warn');
                this.getHealthDetailExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.getHealthDetailExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.getHealthDetailExecuteQuery();
                return;
            }
        });
    }

    offenderRowHealthDataCommit(event) {
        this.offRowDataHealthRecordInsertList = event.added;
        this.offRowDataHealthRecordUpdatetList = event.updated;
        this.offRowDataHealthRecordDeleteList = event.removed;
        this.offHealthRecordsDataCommitBean.insertList = [];
        this.offHealthRecordsDataCommitBean.updateList = [];
        this.offHealthRecordsDataCommitBean.deleteList = [];
        if (this.offRowDataHealthRecordInsertList.length > 0 || this.offRowDataHealthRecordUpdatetList.length > 0) {          
            for (let i = 0; i < this.offRowDataHealthRecordInsertList.length; i++) {
                
                if(this.offRowDataHealthRecordInsertList[i].fromDate && this.offRowDataHealthRecordInsertList[i].toDate){
                    if (DateFormat.compareDate(DateFormat.getDate(this.offRowDataHealthRecordInsertList[i].toDate),
                    DateFormat.getDate(this.offRowDataHealthRecordInsertList[i].fromDate)) === -1) {
                    this.show(this.translateService.translate('ocdhealt.fromdatemustbebeforethetodate'), 'warn');
                    return false;
                    }
                
                }

                this.offRowDataHealthRecordInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;          
                this.offHealthRecordsDataCommitBean.insertList = this.offRowDataHealthRecordInsertList;
            }
            for (let i = 0; i < this.offRowDataHealthRecordUpdatetList.length; i++) { 
                if(this.offRowDataHealthRecordUpdatetList[i].fromDate && this.offRowDataHealthRecordUpdatetList[i].toDate){
                    if (DateFormat.compareDate(DateFormat.getDate(this.offRowDataHealthRecordUpdatetList[i].toDate),
                    DateFormat.getDate(this.offRowDataHealthRecordUpdatetList[i].fromDate)) === -1) {
                    this.show(this.translateService.translate('ocdhealt.fromdatemustbebeforethetodate'), 'warn');
                    return false;
                    }
                
                }        
                this.offRowDataHealthRecordUpdatetList[i].fromDate = DateFormat.getDate(this.offRowDataHealthRecordUpdatetList[i].fromDate); 
                if(this.offRowDataHealthRecordUpdatetList[i].toDate){
                    this.offRowDataHealthRecordUpdatetList[i].toDate = DateFormat.getDate(this.offRowDataHealthRecordUpdatetList[i].toDate);
                }      
                this.offHealthRecordsDataCommitBean.updateList = this.offRowDataHealthRecordUpdatetList;

        }
    }
        if (this.offRowDataHealthRecordDeleteList.length > 0) {
            for (let i = 0; i < this.offRowDataHealthRecordDeleteList.length; i++) {
                this.offRowDataHealthRecordDeleteList[i].fromDate = DateFormat.getDate(this.offRowDataHealthRecordDeleteList[i].fromDate); 
                this.offRowDataHealthRecordDeleteList[i].toDate = DateFormat.getDate(this.offRowDataHealthRecordDeleteList[i].toDate);
                this.offRowDataHealthRecordDeleteList[i].createDatetime = DateFormat.getDate(this.offRowDataHealthRecordDeleteList[i].createDatetime);
                this.offRowDataHealthRecordDeleteList[i].modifyDatetime = DateFormat.getDate(this.offRowDataHealthRecordDeleteList[i].modifyDatetime);               
                this.offHealthRecordsDataCommitBean.deleteList = this.offRowDataHealthRecordDeleteList;
            }
        }

        const omsroleSaveData = this.ocdhealtFactory.offenderRowHealthDataCommit(this.offHealthRecordsDataCommitBean);
        omsroleSaveData.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.show('common.cannotdeletemaster', 'warn');
                this.getOffenderRowHealthExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.getOffenderRowHealthExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.getOffenderRowHealthExecuteQuery();
                return;
            }
        });
    }

    get insertHealthRecord(){
        if(this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && (this.userRoleHealData > 0 || this.userRoleHealAdvData > 0)){
            return true;
        } else {
            return false;
        }
    }

    get insertTreatmentRecord(){
        if(this.offenderRowDataModel && this.offenderRowDataModel.offHealthRecId && (this.userRoleHealData > 0 || this.userRoleHealAdvData > 0)){
            return true;
        } else {
            return false;
        }
    }
    get deleteHealthRecord(){
        if(this.userRoleHealAdvData > 0 && this.offenderRowDataModel.createDatetime){
            return true;
        } else {
            return false;
        }
    }
    get deleteHealthRecordDetail(){
        if(this.userRoleHealAdvData > 0 && this.healthRowDataModel.createDatetime){
            return true;
        } else {
            return false;
        }
    }
    
    gridHeInsert = () => {
        this.offenderRowDataModel =new OffHealthRecordsData();
        this.healthRowData=[];
        return this.offenderRowDataModel;
    }
    gridHeDetInsert = () => {
        this.healthRowDataModel =new HealthRecordDetails();
        return this.healthRowDataModel;
    }
}
