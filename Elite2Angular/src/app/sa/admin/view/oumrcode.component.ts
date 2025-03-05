import { ActivatedRoute } from '@angular/router';
import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumrcodeService } from '../service/oumrcode.service';
import { ReferenceDomains } from '@commonbeans/ReferenceDomains';
import { ReferenceCodes } from '@commonbeans/ReferenceCodes';
import { ReferenceCodesCommitBean } from '@commonbeans/ReferenceCodesCommitBean';
import { ReferenceDomainsCommitBean } from '@commonbeans/ReferenceDomainsCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import {ReferenceDomainService} from '@core/ui-components/lov/reference-domain.service';
import {LovService} from '@core/ui-components/lov/lov.service'
import { OumsyslabService } from '../service/oumsyslab.service';
import { LoginService } from '@common/login/service/login.service';
// import required bean declarations

@Component({
    selector: 'app-oumrcode',
    templateUrl: './oumrcode.component.html',
    styleUrls: [],
})

export class OumrcodeComponent implements OnInit {
    // Variable declaration
    @ViewChild('refdomaingrid', {static: true}) refdomaingrid: any;
    @ViewChild('refcodegrid', {static: true}) refcodegrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;

    listToCompare: any[] = [];
    refdmnData: ReferenceDomains[] = [];
    refdmnDataTemp: ReferenceDomains[] = [];
    saveflag: boolean;

    refdmnModel: ReferenceDomains = new ReferenceDomains();
    refdmnModelTemp: ReferenceDomains = new ReferenceDomains();
    refdmnIndex: number = 0;
    refdmnInsertList: ReferenceDomains[] = [];
    refdmnUpdateList: ReferenceDomains[] = [];
    refdmnDeleteList: ReferenceDomains[] = [];
    refdmnCommitModel: ReferenceDomainsCommitBean;
    refcodeCommitModel: ReferenceCodesCommitBean = new ReferenceCodesCommitBean();
    selectedIndex = 0;
    refcodeData: ReferenceCodes[] = [];
    refcodeDataTemp: ReferenceCodes[] = [];

    refcodeModel: ReferenceCodes = new ReferenceCodes();
    refcodeIndex: number = 0;
    refcodeInsertList: ReferenceCodes[] = [];
    refcodeUpdateList: ReferenceCodes[] = [];
    refcodeDeleteList: ReferenceCodes[] = [];
    refcodeResultList: ReferenceCodes[] = [];
    isinsert = false;

    minDate: Date;
    offProfDetailsColumnDefs: any[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    cleardisabled: boolean;
    previous: boolean;


    editable: boolean = true;
    refCodeColumnDef: any[];
    refDomainColumnDef: any[];
    refDmnReadOnly: boolean = false;
    refCodeReadOnly: boolean = false;
    previousReadOnly: boolean;
    nextReadOnly: boolean;

    index: number;
    indexVal: number;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    refdmnExecuteModel: ReferenceDomains = new ReferenceDomains();
    constructor(private oumrcodeFactory: OumrcodeService,
        public translateService: TranslateService, private activatedRoute: ActivatedRoute,  private referenceDomainService: ReferenceDomainService,
        private lovService: LovService,private oumrestaFactory: OumsyslabService, private loginService: LoginService) {

        this.refCodeColumnDef = [];
        this.refDomainColumnDef = [];
    }
    onGridReady(event) {
    }
    
    canCellEdit = (data: any, index: number, field: string) => {
        if (data.code && !data.isNewRow) {
          return false;
        }
        return true;
    }

    canCellEditOne = (data: any, index: number, field: string) => {
        if (data.createDatetime) {
          return false;
        }
        return true;
    }
    
    canDomainCellEdit = (data: any, index: number, field: string) => {
        if (data.domain && !data.isNewRow) {
          return false;
        }
        return true;
    }
    
    ngOnInit() {
        // this.type = 'info';
        // this.message = this.translateService.translate('oumrcode.clearcacheinfo');
        // this.show();
        this.previousReadOnly = true;
        this.nextReadOnly = true;
        this.cleardisabled = true;
        this.refCodeColumnDef = [
            { fieldName: this.translateService.translate('oumrcode.code'), field: 'code', editable: true, cellEditable: this.canCellEdit, width: 290, datatype: 'text', maxlength: 12},
            { fieldName: this.translateService.translate('oumrcode.descriptionfield'), field: 'description', editable: true, width: 380, maxlength: 40 , datatype: 'text', uppercase: 'false'},
            { fieldName: this.translateService.translate('oumrcode.sequence'), field: 'listSeq', editable: true, width: 190, datatype: 'number', maxlength: 4,whole:true },
            { fieldName: this.translateService.translate('oumrcode.active'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('oumrcode.systemdata'), field: 'systemDataFlag', editable: false, width: 150, datatype: 'checkbox', hide: true },
            { fieldName: this.translateService.translate('oumrcode.expirydate'), field: 'expiredDate', datatype: 'date', editable: false, width: 245 },
            { fieldName: this.translateService.translate('oumrcode.parentcode'), field: 'parentCode', editable: true, width: 245, datatype: 'text', maxlength: 12 },


        ];
        
        this.refDomainColumnDef = [
            { fieldName: this.translateService.translate('oumrcode.domain') + '*', field: 'domain', editable: true, cellEditable: this.canDomainCellEdit, width: 290, datatype: 'text', maxlength: 12},
            { fieldName: this.translateService.translate('oumrcode.descriptions') + '*', field: 'description', editable: true, width: 380, maxlength: 40 , datatype: 'text',uppercase: 'false'},
            { fieldName: this.translateService.translate('oumrcode.status') + '*', field: 'domainStatus', editable: true, maxlength: 12, width: 190, datatype: 'text'},
            { fieldName: this.translateService.translate('oumrcode.owner') + '*', field: 'ownerCode', editable: true, maxlength: 12 ,width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('oumrcode.application') + '*', field: 'applnCode', editable: true, width: 150, maxlength: 12 , datatype: 'text', cellEditable: this.canCellEditOne },
            { fieldName: this.translateService.translate('oumrcode.parent'), field: 'parentDomain', datatype: 'text',  editable: true, maxlength: 12 , width: 245 },

                 ];
        this.refdmnExecuteModel = new ReferenceDomains();
        this.activatedRoute.queryParams.subscribe(params => {
            let domain = params['domain']; 
                if(domain){
                    this.refdmnExecuteModel.domain = domain;
                }
        });
        this.oumrcodeExecuteQuery();

    }
    allowNumbers(event) {
    }
    onRowClickrefcode(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
        this.refdmnData = [];
        this.refdmnModel = new ReferenceDomains();
        this.refcodeData = [];
        this.refcodeModel = new ReferenceCodes();
        this.previousReadOnly = true;
        this.nextReadOnly = true;
        this.cleardisabled = true;
        this.isinsert = false;
    }
    get rettBtnFlg() {
        if (this.refcodeData.length > 0) {
            return true;
        } else if(this.refcodeData.length === 0) {
           return false;
        } else if (this.refdmnModel.domain || this.refdmnModel.description || this.refdmnModel.domainStatus 
            || this.refdmnModel.ownerCode || this.refdmnModel.applnCode || this.refdmnModel.parentDomain ) {
            return false;
        } else {
            return true;
        }
    }
	/**
	* This function loads the data into the Master Record and its child records
	*/
    oumrcodePopulateDetails() {
        this.refdmnModel = this.refdmnData[this.index];
        const serviceObj = this.oumrcodeFactory.
            refCodeExecuteQuery(this.refdmnModel);
        //TODO add appropriate input varaibles
        serviceObj.subscribe(data => {
            if (data != undefined && data.errorMessage.length > 0) {
            } else {
                this.refcodeData = data;
            }
        });
    }
    oumrcodeExecuteQuery() {
        const serviceObj = this.oumrcodeFactory.refDmnExecuteQuery(this.refdmnExecuteModel);
        serviceObj.subscribe(data => {
            if (data.length == 0) {
                this.isinsert = false
                this.previousReadOnly = true;
                this.nextReadOnly = true;
                this.cleardisabled = true;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                this.cancel();
            }
            else {
                this.refdmnData = data;
                this.refdmnModel = this.refdmnData[0];
                this.selectedIndex = 0;
//                if (!this.refdmnModel.parentDomain) {
//                    this.type = 'warn';
//                    this.message = this.translateService.translate('oumrcode.parentdoesnotexist');
//                    this.show();
//                    return;
//                }
                this.index = 0;
                this.isinsert = true;
                this.nextReadOnly = false;
                this.refcodeExecuteQuery();
                // this.oumrcodePopulateDetails();
            }
            if (data.length === 1) {
                this.nextReadOnly = true;
                } else  {
                
                
            }
            this.saveflag = true;


        });
    }
    dataCheck() {
        this.indexVal = 0;
        //        this.refdmnModelTemp = this.refdmnModel;
        //        const domain = this.refdmnModel.domain;
        //        this.refdmnModel = new ReferenceDomains()
        this.refdmnModelTemp.domain = this.refdmnModel.domain;
        const serviceObj = this.oumrcodeFactory.refDmnExecuteQuery(this.refdmnModelTemp);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                this.type = 'warn';
                this.indexVal = 1;
                this.message = this.translateService.translate('oumrcode.duplicates');
                this.show();
                return;
            }
        });
    }

    saveQuery(event) {
        if ( event.added.length > 0) {
            if (!this.refdmnValidate(event.added)) {
                return;
            }
        }

        if ( event.updated.length> 0) {
            if (!this.refdmnValidate(event.updated)) {
             return;
            }
        }
      //  this.dataCheck();
        this.refdmnCommitModel = new ReferenceDomainsCommitBean();
        this.refdmnCommitModel.insertList = event.added;
        this.refdmnCommitModel.updateList = event.updated;

        
        for (let i = 0; i < this.refdmnCommitModel.insertList.length; i++) {
            this.refdmnCommitModel.insertList[i].domain = this.refdmnCommitModel.insertList[i].domain.trim();
            this.refdmnCommitModel.insertList[i].description = this.refdmnCommitModel.insertList[i].description.trim();
        }

        for (let i = 0; i < this.refdmnCommitModel.updateList.length; i++) {
            this.refdmnCommitModel.updateList[i].description = this.refdmnCommitModel.updateList[i].description.trim();
        }

        /*if (this.refdmnModel.createDatetime) {
            this.refdmnCommitModel.updateList = [];
            this.refdmnCommitModel.updateList.push(this.refdmnModel);
        } else {
            this.refdmnCommitModel.insertList = [];
            this.refdmnCommitModel.insertList.push(this.refdmnModel);
        }*/
     //   if (this.indexVal === 0) {
            const servobj = this.oumrcodeFactory.refDmnCommit(this.refdmnCommitModel);
            servobj.subscribe(data => {
                if (data === 0) {
                    // Fail  
                    this.type = 'warn';
                    // if (this.indexVal > 0) {
                    //     return;
                    // }
                    // if (this.indexVal === 0) {
                    //     this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    // }
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    this.refdmnModel = new ReferenceDomains();
                    this.oumrcodeExecuteQuery();
                } else if (data === 3) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumrcode.duplicates');
                    this.show();

                } else {
                    // success
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.oumrcodeExecuteQuery();
                }

            });
       // }
    }

    refdmnValidate(refdmnList: any) {
        try {
            refdmnList.forEach((element) => {
            if ((element.domain && element.domain.trim() === '') || !element.domain) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.enterdomain');
                this.show();
                throw new Error();
            }
            if ((element.description && element.description.trim() === '') || !element.description ) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.enterdescription');
                this.show();
                throw new Error();
            }
            if ((element.domainStatus && element.domainStatus.trim() === '') || !element.domainStatus) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.enterdomainStatus');
                this.show();
                throw new Error();
            }
            if ((element.ownerCode && element.ownerCode.trim() === '') || !element.ownerCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.enterownerCode');
                this.show();
                throw new Error();
            }
            if ((element.applnCode && element.applnCode.trim() === '') || !element.applnCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.enterapplnCode');
                this.show();
                throw new Error();
            }
        });
    } catch (e) {
        return false;
    }
        return true;
    }

    oumrcodeSaverefdmnForm(event) {

        this.refdmnInsertList = event.added
        this.refdmnUpdateList = event.updated
        this.refdmnDeleteList = event.removed
        this.refdmnCommitModel.insertList = [];
        this.refdmnCommitModel.updateList = [];
        this.refdmnCommitModel.deleteList = [];
        if (this.refdmnInsertList.length > 0 || this.refdmnUpdateList.length > 0) {
            this.refdmnCommitModel.insertList = this.refdmnInsertList;
            this.refdmnCommitModel.updateList = this.refdmnUpdateList;
        }
        if (this.refdmnDeleteList.length > 0) {
            for (let i = 0; i < this.refdmnDeleteList.length; i++) {
            }
            this.refdmnCommitModel.deleteList = this.refdmnDeleteList;
        }
        const refdmnSaveData = this.oumrcodeFactory.refDmnCommit(this.refdmnCommitModel);
        refdmnSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            } else {
                // success
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');

                this.show();
            }
        });
    }
    //execute query
    nextRecord() {
        this.index++;
        if (this.index < this.refdmnData.length) {
            this.refdmnModel = this.refdmnData[this.index];
            this.refcodeExecuteQuery();
            this.previousReadOnly = false;
        } else {
            this.index = this.refdmnData.length -1;
            // print next msg

        }
        if (this.index === this.refdmnData.length - 1) {
            this.nextReadOnly = true;
        }

    }
    refcodeExecuteQuery() {
        /*   this.previous = false;
           this.next = false;*/
        this.cleardisabled = false;
        this.refcodeModel.domain = this.refdmnModel.domain;
        const refcodeResultList = this.oumrcodeFactory.refCodeExecuteQuery(this.refcodeModel);
        refcodeResultList.subscribe(refCodeData => {
            if (refCodeData.length === 0) {
                this.refcodeData = [];

            } else {
                refCodeData.forEach(refCode => {
                    refCode.activeFlag = (refCode.activeFlag === 'Y') ? true : false;
                    refCode.systemDataFlag = (refCode.systemDataFlag === 'Y') ? true : false;
                    if (refCode.expiredDate) {
                        refCode.expiredDate = new Date(refCode.expiredDate);
                    } else {
                        refCode.expiredDate = null;
                    }

                });
                this.refcodeData = refCodeData;
                //                        this.refcodeData.push(new ReferenceCodes());
                //                        this.totalVal = this.refcodeData.length;
                this.refcodeModel = this.refcodeData[0];
                this.cleardisabled = false;
            }
        });
    }

    previousRecord() {
        this.index--;
        if (this.index >= 0) {
            this.refdmnModel = this.refdmnData[this.index];
            this.refcodeExecuteQuery();
            this.nextReadOnly = false;
        } else {
            this.index = 0;
            // pring previes msg 

            this.type = 'warn';
            this.message = this.translateService.translate('oumrcode.previousrecordunavailable');
            this.show();
        }

        if (this.index === 0) {
            this.previousReadOnly = true;
        }

    }


    oumrcodeSaverefcodeForm(event) {
        for (let x = 0; x < this.refcodeData.length; x++) {
            for (let y = 0; y < this.refcodeData.length; y++) {
                if (x !== y) {
                    if (this.refcodeData[x].code == this.refcodeData[y].code &&
                        this.refcodeData[x].description == this.refcodeData[y].description) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumrcode.duplicate');
                        this.show();
                        this.refdmnModel = new ReferenceDomains();
                        this.oumrcodeExecuteQuery();
                        return;
                    }
                }
            }
        }
        for (let i = 0; i < this.refcodeData.length; i++) {
            if ((this.refcodeData[i].code && this.refcodeData[i].code.trim() === '') || !this.refcodeData[i].code) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.codemustbeenter');
                this.show();
                return;
            }
            if ((this.refcodeData[i].description && this.refcodeData[i].description.trim() === '') || !this.refcodeData[i].description) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.descriptionmustbeenter');
                this.show();
                return;
            }
            if (this.refcodeData[i].domain === 'CASE_PREFIX' ) {
                if (this.refcodeModel.code.length > 4) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumrcode.codecannothavemorecharacters');
                    this.show();
                    return;
                }
            }
        }

        // TODO declare commit bean and add insert list to that object.
        this.refcodeInsertList = event.added
        this.refcodeUpdateList = event.updated
        this.refcodeDeleteList = event.removed
        // this.refcodeCommitModel = new ReferenceCodeCommitBean();
        this.refcodeCommitModel.insertList = [];
        this.refcodeCommitModel.updateList = [];
        this.refcodeCommitModel.deleteList = [];
        if (this.refcodeInsertList.length > 0 || this.refcodeUpdateList.length > 0) {
            this.refcodeInsertList.forEach(data => {
                data.code =data.code.trim();
                data.description=data.description.trim();
                data.domain = this.refdmnModel.domain;
                data.activeFlag = (data.activeFlag) ? 'Y' : 'N';
                data.systemDataFlag = (data.systemDataFlag) ? 'Y' : 'N';
                if (data.activeFlag === 'Y' || data.activeFlag === 'N' || data.systemDataFlag === 'Y' || data.systemDataFlag === 'N') {
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumrcode.invalidentry');
                    this.show();
                    return;
                }
            });
            this.refcodeUpdateList.forEach(data => {
                data.description=data.description.trim();
                data.activeFlag = (data.activeFlag) ? 'Y' : 'N';
                data.systemDataFlag = (data.systemDataFlag) ? 'Y' : 'N';
            });

            this.refcodeCommitModel.insertList = this.refcodeInsertList;
            this.refcodeCommitModel.updateList = this.refcodeUpdateList;
        }
        if (this.refcodeDeleteList.length > 0) {
            for (let i = 0; i < this.refcodeDeleteList.length; i++) {
            }
            this.refcodeCommitModel.deleteList = this.refcodeDeleteList;
        }
        const refcodeSaveData = this.oumrcodeFactory.refCodeCommit(this.refcodeCommitModel);
        refcodeSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.refcodeExecuteQuery();
               
            } else if (data === 3) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.rowalreadyexists');
                this.show();

            } else {
                // success
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.refcodeExecuteQuery();
            }
        });
    }

    isInsertable() {
        if (this.refdmnModel.domain || this.refdmnModel.description || this.refdmnModel.domainStatus
                || this.refdmnModel.ownerCode || this.refdmnModel.applnCode || this.refdmnModel.parentDomain) {
            this.cleardisabled = false;
        } else {
            this.cleardisabled = true;
        }
        this.saveflag = false;
    }
  
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    expDateGenerator = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (!event.newValue) {
                rowdata.data = { expiredDate: new Date() }
            } else {
                rowdata.data = { expiredDate: null }
            }
        }
        if (event.data.domain === 'CASE_PREFIX' ) {
            if (this.refcodeModel.code.length > 4) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.codecannothavemorecharacters');
                this.show();
                return;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    
    onDomainRowClick(event) {
        this.refdmnModel = event;
        this.refcodeExecuteQuery();    
    }
    
    onRowClick(event) {
        
    }
    addDomainCode = () => {
        this.refcodeData = [];
        return { isNewRow:true}; 
    }
    addCode = () => {
        let selectedRow = this.refdomaingrid.gridOptions.api.getSelectedRows();
        if (!this.refdmnValidate(selectedRow)) {
            return;
        }
        if(selectedRow[0] && selectedRow[0].isNewRow && selectedRow[0].isNewRow == true){
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesaveparentrecord');
            this.show();
            return;
        }

        if (this.refcodeData.length > 0) {
            if (!this.refcodeData[this.refcodeData.length - 1].code) {
                //code m
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.addcode');
                this.show();
                return null;

            }
            if (!this.refcodeData[this.refcodeData.length - 1].description) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumrcode.description');
                this.show();
                return null;
            }
            return { activeFlag: true, expiredDate: null , isNewRow:true};
        }
        return { activeFlag: true, expiredDate: null , isNewRow:true};
    }

    updateCache(){
        //Reference Codes Cache Call
        this.referenceDomainService.clearCache();
        this.lovService.clearCache();

        //System Lables Cache Call
        const serviceObj=this.oumrestaFactory.labelCacheUpdate();
      serviceObj.subscribe(data=>{
          if(data==1){
          this.reloadLanguage();
          }
      });
        this.type = 'success';
        this.message = this.translateService.translate('oumrcode.cacheclearedsuccessful');
        this.show();
      }


      reloadLanguage() {
        this.loginService.getLoginMsgs(this.translateService.currentLang)
            .subscribe((data) => {
                this.translateService.loginmsgs = data.msgs;
                if (typeof (Storage) !== 'undefined') {
                    sessionStorage.setItem('langmsgs', JSON.stringify(data));
                }
            });
            this.loginService.getAppMsgs(this.translateService.currentLang).subscribe(data => {
              this.translateService.appmsgs = data;
              this.type = 'success';
              this.message = this.translateService.translate('oumsylab.cacheupdatesuccess');
               this.show();
          });
    }
}
