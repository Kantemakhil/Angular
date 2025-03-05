import {
    Component, OnInit,
    Input,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmcfeesService } from '../service/otmcfees.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { TransactionFeeDetails } from '../beans/TransactionFeeDetails';
import { CaseloadDeductionProfiles } from '../beans/CaseloadDeductionProfiles';
import { TieredTransactionFeeAmounts } from '../beans/TieredTransactionFeeAmounts';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { CaseloadDeductionProfilesCommitBean } from '../beans/CaseloadDeductionProfilesCommitBean';
import { TransactionFeeDetailsCommitBean } from '../beans/TransactionFeeDetailsCommitBean';
import { TieredTransactionFeeAmountsCommitBean } from '../beans/TieredTransactionFeeAmountsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OtucpayeService } from '@inmate/trust/trustaccounts/service/otucpaye.service';
import { Corporates } from '@inmatetrustaccountsbeans/Corporates';
// import required bean declarations

@Component({
    selector: 'app-otmcfees',
    templateUrl: './otmcfees.component.html'
})

export class OtmcfeesComponent implements OnInit {
    saveEnableFlag: boolean;
    @Input() dlgData: any;
    @ViewChild('grid', {static: false}) grid: any;
    @ViewChild('cslddpDataGrid', {static: true}) cslddpDataGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    cslddpData: CaseloadDeductionProfiles[] = [];
    cslddpDataDbCheck: CaseloadDeductionProfiles[] = [];
    cslddpDataTemp: CaseloadDeductionProfiles[] = [];
    cslddpModel: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    cslddpModelGetCorpName: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    cslddpIndex: Number = 0;
    cslddpInsertList: CaseloadDeductionProfiles[] = [];
    cslddpUpdatetList: CaseloadDeductionProfiles[] = [];
    cslddpDeleteList: CaseloadDeductionProfiles[] = [];
    tranfdData: TransactionFeeDetails[] = [];
    tranfdDataTemp: TransactionFeeDetails[] = [];
    tranfdModel: TransactionFeeDetails = new TransactionFeeDetails();
    tranfdIndex: Number = 0;
    tranfdInsertList: TransactionFeeDetails[] = [];
    tranfdUpdatetList: TransactionFeeDetails[] = [];
    tranfdDeleteList: TransactionFeeDetails[] = [];
    tiertfaData: TieredTransactionFeeAmounts[] = [];
    tiertfaDataTemp: TieredTransactionFeeAmounts[] = [];
    tiertfaModel: TieredTransactionFeeAmounts = new TieredTransactionFeeAmounts();
    tiertfaIndex: Number = 0;
    tiertfaInsertList: TieredTransactionFeeAmounts[] = [];
    tiertfaUpdatetList: TieredTransactionFeeAmounts[] = [];
    tiertfaDeleteList: TieredTransactionFeeAmounts[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    cslddpColumnDef: any[];
    tierTfaColumnDef: any[];
    tranFdColumnDef: any[];
    csldDpReadOnly: Boolean = false;
    tranFdReadOnly: Boolean = false;
    tierTfaReadOnly: Boolean = false;
    cgfkCslddppayeecorporateiRg: any[] = [];
    cgfkTranfdreceiptdeductionRg: any[] = [];
    cgfkCslddpdeductiontypeRg: any[] = [];
    cgfkCslddpaccountcodeRg: any[] = [];
    cslddpCommitModel: CaseloadDeductionProfilesCommitBean = new CaseloadDeductionProfilesCommitBean();
    tranfdCommitModel: TransactionFeeDetailsCommitBean = new TransactionFeeDetailsCommitBean();
    tiertfaCommitModel: TieredTransactionFeeAmountsCommitBean = new TieredTransactionFeeAmountsCommitBean();
    transFeeTypeLov: string;
    creditDeductionLov: string;
    mode: string;
    cslddpModelDup: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    cropIndex = -1;
    deductObliTypeLov: string;
    tableIndex: number;
    tableIndexFeeAmount: number;
    deductionReadOnly: boolean;
    accountReadOnly: boolean;
    reciptDedField: boolean;
    launchBtnFlag: boolean;
    namesReadOnly: boolean;
    enableIfRowDataExist: boolean;
    tranFdDalete: boolean;
    tranFaDelete: boolean;
    fieldItem: boolean;
    validateItem: boolean;
    cslddpDeleteBtn: boolean;
    cslddpValidation:boolean;

    corporatesModel: Corporates = new Corporates();
    corpIdMap: Map<number, string> = new Map<number, string>();
    lovTitles = {
        'code': this.translateService.translate('otmcfees.transactionfeetypenamae'),
        'description': this.translateService.translate('common.deductiondesc')
    };
    creditTitles = {
        'code': this.translateService.translate('otmcfees.creditdeductionto'),
        'description': this.translateService.translate('common.accountname')
    };
    constructor(private otmcfeesFactory: OtmcfeesService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService,
        private otucpayeFactory: OtucpayeService) {
        this.tierTfaColumnDef = [];
        this.tranFdColumnDef = [];
        this.cslddpColumnDef=[];
    }
    ngOnInit() {
        this.cslddpValidation = true;
        this.deductionReadOnly = true;
        this.accountReadOnly = false;
        this.reciptDedField = true;
        this.launchBtnFlag = false;
        this.namesReadOnly = false;
        this.enableIfRowDataExist = false;
        this.tranFdDalete = false;
        this.tranFaDelete = false;
        this.saveEnableFlag = true;
        this.cslddpDeleteBtn = false;
        this.transFeeTypeLov = 'otmcfees/cgfkCsldDpDeductionTypeRecordGroup?caseLoadType=' + this.sessionManager.currentCaseLoadType;
        this.creditDeductionLov = 'otmcfees/cgfkCsldDpAccountCodeRecordGroup?caseLoadType=' + this.sessionManager.currentCaseLoadType;
        this.deductObliTypeLov = 'otmcfees/cgfkTranFdReceiptDeductionRecordGroup?caseLoadType=' + this.sessionManager.currentCaseLoadType;
       
        this.cslddpColumnDef = [
            {
                fieldName: this.translateService.translate( 'otmcfees.transactionfeetype' ),required : true,link:this.transFeeTypeLov,
                field: 'deductionType', editable: true, width: 150, datatype: 'lov',titles:this.lovTitles, cellEditable: this.deductionTypeEdit
            },

            {
                fieldName: this.translateService.translate( 'otmcfees.creditdeduction' ),required : true,link:this.creditDeductionLov,
                field: 'nbtAccountCode', editable: true, width: 150, datatype: 'lov',titles:this.creditTitles, cellEditable: this.nbtAccountCodeEdit
            },
            
            {
                fieldName: this.translateService.translate('otmcfees.effectivedate'),required:true,field: 'effectiveDate', editable: true, width: 150, 
                 datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('otmcfees.active'), field: 'activeFlag', editable: true,
                width: 150,  datatype: 'checkbox',
                 
            },
            {
                fieldName: this.translateService.translate('otmcfees.expiry'), field: 'expiryDate', editable: false,
                width: 150,  datatype: 'date',
                 
            },

            {
                fieldName: this.translateService.translate('otmcfees.foralloffenders'), field: 'foAlAllOffenderFlag', editable: true,
                width: 150,  datatype: 'checkbox',
                 
            },
            {
                fieldName: this.translateService.translate('otmcfees.clearpayleto'), field: 'payeeCorporateId',  width: 150,required: true,
                 maxValue: 999999999.99, whole: true, datatype: 'number',  editable: true,
            },

            {
                fieldName: '', field: 'launchButton', editable: true, width: 220,
                datatype: 'launchbutton', onLaunchClick: this.launchClick,
                modal: true, updateField: 'row', data: 'row', dialogWidth: '80%', height: '80%', 
            },
            {
                fieldName:'',field: 'corporateName', editable: false, width: 250, 
                 datatype: 'string'
            },
        ];
       
       
        this.tierTfaColumnDef = [
            {
                fieldName: this.translateService.translate('otmcfees.from') + this.translateService.translate('common.mandatory'),
                field: 'fromAmount', editable: true, width: 150, format: '1.2-2', minValue: 0.00, maxValue: 999999999.99, whole: true,
                 datatype: 'number', cellEditable: this.canCellEdit
            },
            { fieldName: '', field: 'hideValue', hide: true },
            {
                fieldName: this.translateService.translate('otmcfees.to') + this.translateService.translate('common.mandatory'),
                field: 'toAmount', editable: true, width: 150, format: '1.2-2', minValue: 0.00, maxValue: 999999999.99, whole: true,
                 datatype: 'number', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('otmcfees.percentage'), field: 'percentage', editable: true,
                width: 150, minValue: 1, maxValue: 999, strictFP: true, whole: true, datatype: 'number',
                 cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('otmcfees.feeamount'), field: 'feeAmount', editable: true, width: 150,
                format: '1.2-2', minValue: 0.00, maxValue: 999999999.99, whole: true, datatype: 'number', cellEditable: this.canCellEdit
            },
            { fieldName: '', field: 'frmOverlapFlag', hide: true },
            { fieldName: '', field: 'toOverlapFlag', hide: true },
        ];
        this.tranFdColumnDef = [
            { fieldName: '', field: 'hideValue', hide: true },
            {
                fieldName: this.translateService.translate('otmcfees.types') + this.translateService.translate('common.mandatory'),
                field: 'receiptDeductionType', editable: this.reciptDedField, width: 150, link: this.deductObliTypeLov, datatype: 'lov',
                titles: { code: this.translateService.translate('common.types'),
                description: this.translateService.translate('common.description') }
            },
        ];
        if (this.dlgData) {
            if (this.dlgData.mode === this.ADDEDMODE) {
                this.addRecord();
            } else {
                const model = JSON.parse(JSON.stringify(this.dlgData.model));
                model.activeFlag = model.activeFlag === 'Y' ? 'Y' : null;
                this.cslddpModel = model;
                this.cslddpModelDup = JSON.parse(JSON.stringify(this.dlgData.model));
                this.cslddpModelDup.activeFlag = this.cslddpModelDup.activeFlag === 'Y' ? 'true' : undefined;
            }
        } else {
            this.addRecord();
        }
        this.otmcfeesexecuteQuery();
        this.transctionTypeLovGetList();
        this.creditDeductionLovGetList();
        this.deductOblicTypeLovGetList();
        this.mode = this.QUERYMODE;
        this.corpExecuteQuery();
    }
    /*
 *  This event is used to do the validations in the Grid in Schedules Block.
 */
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if ((data.feeAmount || data.feeAmount === 0) && field === 'percentage') {
            return false;
        }
        if ((data.percentage ||  data.percentage === 0) && field === 'feeAmount') {
            return false;
        }
        return true;
    }

    deductionTypeEdit = () =>{
        return !this.deductionReadOnly;
    }

    nbtAccountCodeEdit=()=>{
        return !this.accountReadOnly;
    }

    launchClick = (event) => {
        this.dialogService.openLinkDialog('/OTUCPAYE', 80).subscribe(result => {
            if (result) {
                const rowIndex=this.cslddpData.indexOf(event);
                this.cslddpDataGrid.setColumnData('payeeCorporateId',rowIndex,result.corporateId);
                this.cslddpDataGrid.setColumnData('corporateName',rowIndex,result.corpName);
            }else {
                this.cslddpModel.payeeCorporateId = undefined;
                this.cslddpModel.corporateName = undefined;
            }
        });
    }
    /**
     *  This function will be called when clicked on the row tansfd grid
    * fired
    */
    onRowClicktranfd(event) {
        if (event) {
            this.tranfdModel = event;
            this.tranfdModel.deductionType = this.cslddpModel.deductionType;
            if (this.tranfdModel.createDatetime) {
                this.tranFdDalete = true;
            } else {
                this.tranFdDalete = false;
            }
        }

    }
    /**
     *  This function will be called when clicked on the row tansfa grid
    * fired
    */
    onRowClicktiertfa(event) {
        if (event) {
            this.tiertfaModel = event;
            this.tiertfaModel.deductionType = this.cslddpModel.deductionType;
            if (this.tiertfaModel.createDatetime) {
                this.tranFaDelete = true;
            } else {
                this.tranFaDelete = false;
            }
        }
    }
    /**
     *  This function will be called when enterd the data in clearpayble field
    * fired
    */
    getCorporateName() {
        if (this.cslddpModel.payeeCorporateId) {
            const corpname = this.corpIdMap.get(this.cslddpModel.payeeCorporateId);
            if (!corpname) {
                this.cslddpModel.payeeCorporateId = undefined;
                this.cslddpModel.corporateName = undefined;
                this.show(this.translateService.translate('otmcfees.invldpyee'), 'warn');
                return;
            } else if (this.cslddpModel.payeeCorporateId === 0) {
                this.cslddpModel.payeeCorporateId = undefined;
                this.cslddpModel.corporateName = undefined;
                this.show(this.translateService.translate('otmcfees.invldpyee'), 'warn');
                return;
            } else {
                this.cslddpModel.corporateName = corpname;
            }
       }
        // setTimeout(ele => {
        //     this.cslddpModelGetCorpName = new CaseloadDeductionProfiles();
        //     this.cslddpModelGetCorpName.payeeCorporateId = this.cslddpModel.payeeCorporateId;
        //     const serviceObj = this.otmcfeesFactory.getCorporateName(this.cslddpModel);
        //     serviceObj.subscribe(data => {
        //         if (data && data.corporateName) {
        //             this.cslddpModel.corporateName = data.corporateName;
        //         } else {
        //             // this.cslddpModel.corporateName = undefined;
        //             // this.cslddpModel.payeeCorporateId = undefined;
        //         }
        //     });
        // });
    }
    /**
     *  This function will be called in onload to enable or disable lov field
    * fired
    */
    transctionTypeLovGetList() {
        const serviceObj = this.otmcfeesFactory.cgfkCslddpdeductiontypeRecordGroup(this.sessionManager.currentCaseLoadType);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.deductionReadOnly = true;
            } else {
                this.deductionReadOnly = false;
            }
        });
    }
    /**
      *  This function will be called in onload to enable or disable lov field
     * fired
     */
    creditDeductionLovGetList() {
        const serviceObj = this.otmcfeesFactory.cgfkCslddpaccountcodeRecordGroup(this.sessionManager.currentCaseLoadType);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.accountReadOnly = true;
            } else {
                this.accountReadOnly = false;
            }
        });
    }
    /**
      *  This function will be called in onload to enable or disable lov field
     * fired
     */
    deductOblicTypeLovGetList() {
        const serviceObj = this.otmcfeesFactory.cgfkTranfdreceiptdeductionRecordGroup(this.sessionManager.currentCaseLoadType);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.reciptDedField = false;
            } else {
                this.reciptDedField = true;
            }
        });
    }
    /**
     *  This function will be called when clicked on retrive button
    * fired
    */
    search() {
        this.cropIndex = 0;
        this.otmcfeesexecuteQuery();
    }
    /**
     *  This function will be called when entered the data in tranfa grid to validate the row data
    * fired
    */

     validateRowDataCslddpData =(event)=>{
        const index = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'deductionType') {
            this.cslddpData.forEach(data => {
                for (let i = 0; this.cslddpData.length > i; i++) {
                    if (index !== i && this.cslddpData[i].deductionType === data.deductionType) {
                        this.show('otmcfees.samerowvalidationcldd', 'warn');
                        rowdata.validated = true;
                        return rowdata;
                    }
                }
            });
        }

         if (event.field === 'effectiveDate') {
            const sysdate = DateFormat.getDate();
            const effDate = DateFormat.getDate(event.data.effectiveDate);
            if (DateFormat.compareDate(effDate, sysdate) < 0) {
                this.show(this.translateService.translate('otmcfees.effectivedatecannotbeearlierthantodaysdate'), 'warn');
                this.cslddpDataGrid.setColumnData('effectiveDate', index, undefined);
                rowdata.validated = true;
                return rowdata;
            }
         }
        
         if (event.field === 'activeFlag') {
            if (!event.data.activeFlag) {
                this.cslddpDataGrid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            } else {
                this.cslddpDataGrid.setColumnData('expiryDate', index, undefined);
            }
         }

         if (event.field === 'payeeCorporateId') {
            if (this.cslddpModel.payeeCorporateId || this.cslddpModel.payeeCorporateId == 0) {
                const corpname = this.corpIdMap.get(Number(event.data.payeeCorporateId));
                if (!corpname) {
                    this.cslddpDataGrid.setColumnData('payeeCorporateId', index, undefined);
                    this.cslddpDataGrid.setColumnData('corporateName', index, undefined);
                    this.show(this.translateService.translate('otmcfees.invldpyee'), 'warn');
                    rowdata.validated = true;
                    return rowdata;
                } else if (event.data.payeeCorporateId == 0) {
                    this.cslddpDataGrid.setColumnData('payeeCorporateId', index, undefined);
                    this.cslddpDataGrid.setColumnData('corporateName', index, undefined);
                    this.show(this.translateService.translate('otmcfees.invldpyee'), 'warn');
                    rowdata.validated = true;
                    return rowdata;
                } else {
                    this.cslddpDataGrid.setColumnData('corporateName', index, corpname);
                }
           } else {
                this.cslddpDataGrid.setColumnData('corporateName', index, undefined);
           }

         }
        
        rowdata.validated = true;
        return rowdata;
     }

     onRowClickCslddp= (event) => {
        this.cslddpModel=event;
        if(event){
            this.tranfdExecuteQuery();
        }
         if(event.createDatetime){
            if (event.corporateName === null || event.corporateName === undefined) {
                this.show(this.translateService.translate('otmcfees.clearpaynotexist'), 'warn');
            }
            this.cslddpDeleteBtn=true;
            this.enableIfRowDataExist=true;
         } else {
            this.cslddpDeleteBtn=false;
            this.enableIfRowDataExist=false;
         }
     }




    validateRowDataFeeAmount = (event) => {
        this.tiertfaModel.pFlag = undefined;
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'fromAmount') {
            if (event.newValue && String(event.newValue).startsWith('-')) {
                this.show(this.translateService.translate('ocdpayob.mustbeinrange'), 'warn');
                this.validateItem = true;
            } else if (event.data.fromAmount && isNaN(Number(event.data.fromAmount))) {
                this.show(this.translateService.translate('common.fieldmustbeofform'), 'warn');
                this.fieldItem = true;
            } else {
                if (event.data.fromAmount || event.data.fromAmount === 0) {
                    if (Number(event.data.fromAmount) >= 1000000000) {
                        this.show(this.translateService.translate('common.fieldmustbeofform'), 'warn');
                        this.grid.setColumnData('fromAmount', this.tiertfaData.indexOf(event.data), undefined);
                    } else {
                        this.grid.setColumnData('fromAmount', this.tiertfaData.indexOf(event.data),
                            Number(event.data.fromAmount).toFixed(2));
                    }
                    this.validateItem = false;
                    this.fieldItem = false;
                }
            }
            this.tiertfaModel.pFlag = 'F';
            if (event.data.toAmount && event.data.fromAmount) {
                if (Number(event.data.toAmount) <= Number(event.data.fromAmount)) {
                    this.show(this.translateService.translate('otmcfees.fromamountvalidation'), 'warn');
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            this.getOverLapCount(event);
        }
        if (event.field === 'toAmount') {
            if (event.newValue && String(event.newValue).startsWith('-')) {
                this.show(this.translateService.translate('ocdpayob.mustbeinrange'), 'warn');
                this.validateItem = true;
            } else if (event.data.toAmount && isNaN(Number(event.data.toAmount))) {
                this.show(this.translateService.translate('common.fieldmustbeofform'), 'warn');
                this.fieldItem = true;
            } else {
                if (event.data.toAmount || event.data.toAmount === 0) {
                    if (Number(event.data.toAmount) >= 1000000000) {
                        this.show(this.translateService.translate('common.fieldmustbeofform'), 'warn');
                        this.grid.setColumnData('toAmount', this.tiertfaData.indexOf(event.data), undefined);
                    } else {
                        this.grid.setColumnData('toAmount', this.tiertfaData.indexOf(event.data),
                            Number(event.data.toAmount).toFixed(2));
                    }
                    this.validateItem = false;
                    this.fieldItem = false;
                }
            }
            this.tiertfaModel.pFlag = 'F';
            if (event.data.fromAmount && event.data.toAmount) {
                if (Number(event.data.toAmount) <= Number(event.data.fromAmount)) {
                    this.show(this.translateService.translate('otmcfees.toamountvalidation'), 'warn');
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            this.getOverLapCount(event);
        }
        rowdata.validated = true;
        return rowdata;
    }
    /**
     *  This function will be called when when validate ro from and to fields entered to validate overlap amount
    * fired
    */
    getOverLapCount(event) {
        // this.overLapCount = false;
        this.tiertfaModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.tiertfaModel.deductionType = this.cslddpModel.deductionType;
        const serviceObj = this.otmcfeesFactory.getOverLapCount(this.tiertfaModel);
        serviceObj.subscribe(data => {
            if (data > 0) {
                if (event.field === 'fromAmount') {
                    this.grid.setColumnData('frmOverlapFlag', this.tiertfaData.indexOf(event.data), true);
                } else if (event.field === 'toAmount') {
                    this.grid.setColumnData('toOverlapFlag', this.tiertfaData.indexOf(event.data), true);
                }
                this.show(this.translateService.translate('otmcfees.overlapvalidation'), 'warn');
                return;
            }
        });

    }
    /**
  * This function displays the messages
  */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
     *  This function will be called when clicked on previous button
    * fired
    */
    previous() {
        this.cropIndex--;
        this.changeIndex();
    }
    /**
     *  This function will be called when clicked on next button
    * fired
    */
    next() {
        this.cropIndex++;
        this.changeIndex();
    }
    /**
    *  This function will be used to set the values when closed the dilogue box
   * fired
   */
    setCorpId(event) {
        if (event) {
            this.cslddpModel.payeeCorporateId = event.corporateId;
            this.cslddpModel.corporateName = event.corpName;
        } else {
            this.cslddpModel.payeeCorporateId = undefined;
            this.cslddpModel.corporateName = undefined;
        }
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    /**
     *  This function will be used to validate add button mode to return
    * fired
    */
    get ADDEDMODE(): string {
        return 'A';
    }
    /**
     *  This function will be used to validate update button mode to return
    * fired
    */
    get UPDATEDMODE(): string {
        return 'U';
    }
    /**
     *  This function will be used to validate Query mode
    * fired
    */
    get QUERYMODE(): string {
        return 'Q';
    }
    /**
    *  This function will be used to validate fetch mode
   * fired
   */
    get FETCHMODE(): string {
        return 'F';
    }
    /**
    *  This function will be used to validate subupdate mode
   * fired
   */
    get SUBUPDATEMODE(): string {
        return 'SU';
    }
    get CLEARADDEDMODE(): string {
        return 'QA';
    }
    /**
      *  This function will be used to validate add button flag to show or hid
     * fired
     */
    get addFlag(): boolean {
        return !(this.mode === this.FETCHMODE);
    }
    /**
     *  This function will be used to validate retrive button flag to show or hid
    * fired
    */
    get retreveFlag(): boolean {
        if (this.cslddpData.length === 0 || !this.cslddpModel.caseloadId) {
            return false;
        } else if (!this.cslddpModel.caseloadId && (this.cslddpModel.deductionType ||
            this.cslddpModel.nbtAccountCode || this.cslddpModel.payeeCorporateId ||
            this.cslddpModel.payeeCorporateId === 0)) {
            return false;
        } else {
            return true;
        }
    }
    /**
     *  This function will be called when clicked on add button to validate the add button fields
    * fired
    */
    addRecord() {
        this.clear();
        this.cslddpModel.activeFlag = 'Y';
        this.mode = this.ADDEDMODE;
        this.deductionReadOnly = false;
        this.launchBtnFlag = false;
        this.namesReadOnly = false;
    }
    /**
     *  This function will be used to validate previous button flag to show or hide property
    * fired
    */
    get preFlag(): boolean {
        if (this.cslddpData.length <= 0 || this.mode !== this.FETCHMODE) {
            return true;
        }
        if (this.cropIndex <= 0) {
            return true;
        }
        return false;
    }
    /**
    *  This function will be used to validate next button flag to show or hide property
   * fired
   */
    get nxtFlag(): boolean {
        if (this.cslddpData.length <= 0 || this.mode !== this.FETCHMODE) {
            return true;
        }
        if (this.cropIndex >= this.cslddpData.length - 1) {
            return true;
        }
        return false;
    }
    /**
     *  This function will be used to validate save button flag to show or hide property
    * fired
    */
    get saveFlag(): boolean {
        this.changetoUpdateMode();
        const modes = [this.ADDEDMODE, this.UPDATEDMODE, this.SUBUPDATEMODE];
        const isValidSave = !modes.includes(this.mode);
        if (!this.cslddpModel.caseloadId && (this.cslddpModel.deductionType ||
            this.cslddpModel.nbtAccountCode || this.cslddpModel.payeeCorporateId ||
            this.cslddpModel.payeeCorporateId === 0 || this.cslddpModel.effectiveDate)) {
            return false;
        }
        return isValidSave;
    }
    /**
     *  This function will be used to validate if any data changed in the saved data
    * fired
    */
    changetoUpdateMode() {
        if (this.mode !== this.QUERYMODE) {
            Object.keys(this.cslddpModelDup).forEach(ele => {
                if (this.cslddpModelDup[ele] !== this.cslddpModel[ele]) {
                    this.mode = this.UPDATEDMODE;
                }
            });
        }
    }
    get isAddDis(): boolean {
        return !(this.mode === this.FETCHMODE || this.mode === this.CLEARADDEDMODE);
    }
    get isRetrieveDis(): boolean {
        if (this.mode === this.QUERYMODE) {
            return false;
        }
        return true;
    }
    /**
     *  This function will be called when clicked on  the save button
    * fired
    */
    save() {
        const event = { added: [], updated: [], removed: [] };
        this.saveEnableFlag = true;
        if (this.cslddpModel.createDatetime) {
            event.updated.push(JSON.parse(JSON.stringify(this.cslddpModel)));
        } else {
            event.added.push(JSON.parse(JSON.stringify(this.cslddpModel)));
        }
        this.otmcfeesSavecslddpForm(event);
    }
    /**
     *  This function will be called when clicked on  the Delete button
    * fired
    */
    delete() {
        const event = { added: [], updated: [], removed: [] };
        event.removed.push(this.cslddpModel);
        this.otmcfeesSavecslddpForm(event);
    }
    /**
     *  This function will be called when clicked on  the clear button
    * fired
    */
    clear() {
        this.cslddpData = [];
        this.cslddpDataDbCheck = [];
        this.cslddpModel = new CaseloadDeductionProfiles();
        this.cslddpModel.activeFlag = 'Y';
        this.cslddpModelDup = JSON.parse(JSON.stringify(this.cslddpModel));
        this.tiertfaData = [];
        this.tranfdData = [];
        this.mode = this.QUERYMODE;
        this.enableIfRowDataExist = false;
        this.deductionReadOnly = false;
        this.namesReadOnly = false;
        this.launchBtnFlag = false;
        this.saveEnableFlag = false;
    }
    /**
     *  This function will be called when changed the data in active field checkbox
    * fired
    */
    setExpiryDate() {
        if (!this.cslddpModel.activeFlag) {
            this.cslddpModel.expiryDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
        } else {
            this.cslddpModel.expiryDate = undefined;
        }

    }
    /**
    *  This function will be called when changed the data in effective date field
   * fired
   */
    effectDateValidation(event) {
        setTimeout(ele => {
            if (event) {
                const sysdate = DateFormat.getDate();
                const effDate = DateFormat.getDate(event);
                if (DateFormat.compareDate(effDate, sysdate) < 0) {
                    this.show(this.translateService.translate('otmcfees.effectivedatecannotbeearlierthantodaysdate'), 'warn');
                    this.cslddpModel.effectiveDate = this.cslddpModel.effectiveDate === undefined ? null : undefined;
                }
            }
        });
    }

    /**
     *  This function will be when inserting new record in fee details grid
    * fired
    */

     cslddpInsert =() =>{
         return {activeFlag:true ,launchButton : 'D'};
     }
    transFdOnInsert = () => {
        if (!this.tranFdMand()) {
            return;
        }
        return {};
    }
    /**
     *  This function will be when inserting new record in fee amount grid
    * fired
    */
    onGridInsert = () => {
        if (!this.tranFiAmountMand()) {
            return;
        }
        return {};
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmcfeesSavecslddpForm(event) {
        this.cslddpInsertList = event.added;
        this.cslddpUpdatetList = event.updated;
        this.cslddpDeleteList = event.removed;
        this.cslddpCommitModel.insertList = [];
        this.cslddpCommitModel.updateList = [];
        this.cslddpCommitModel.deleteList = [];
        if (this.cslddpInsertList.length > 0 || this.cslddpUpdatetList.length > 0) {
            for (let i = 0; i < this.cslddpInsertList.length; i++) {
                if (!this.cslddpInsertList[i].deductionType) {
                    this.show(this.translateService.translate('otmcfees.tranfeemandatory'), 'warn');
                    return;
                }
                const index=this.cslddpData.indexOf(this.cslddpData[i]);
                for (let j = 0; this.cslddpData.length > j; j++) {
                    if (index !== j && this.cslddpData[i].deductionType === this.cslddpData[j].deductionType) {
                        this.show('otmcfees.samerowvalidationcldd', 'warn');
                         return ;
                    }
                }
                if (!this.cslddpInsertList[i].nbtAccountCode) {
                    this.show(this.translateService.translate('otmcfees.creddedmandtory'), 'warn');
                    return;
                }
                if (!this.cslddpInsertList[i].effectiveDate) {
                    this.show(this.translateService.translate('otmcfees.effectdatemandtory'), 'warn');
                    return;
                }
                if (this.cslddpInsertList[i].payeeCorporateId == 0) {
                    this.cslddpModel.payeeCorporateId = undefined;
                    this.cslddpModel.corporateName = undefined;
                    this.show(this.translateService.translate('otmcfees.invldpyee'), 'warn');
                    return;
                } 
                if (!this.cslddpInsertList[i].payeeCorporateId) {
                    this.show(this.translateService.translate('otmcfees.clearpayblemandtory'), 'warn');
                    return;
                } 
                // else if (this.cslddpInsertList[i].payeeCorporateId === 0) {
                //     this.cslddpModel.payeeCorporateId = undefined;
                //     this.cslddpModel.corporateName = undefined;
                //     this.show(this.translateService.translate('otmcfees.invldpyee'), 'warn');
                //     return;
                // } 
                else if (this.cslddpInsertList[i].payeeCorporateId) {
                    const corpname = this.corpIdMap.get(Number(this.cslddpInsertList[i].payeeCorporateId));
                    if (!corpname) {
                        this.cslddpModel.payeeCorporateId = undefined;
                        this.cslddpModel.corporateName = undefined;
                        this.show(this.translateService.translate('otmcfees.invldpyee'), 'warn');
                        return;
                    }
               }
                this.cslddpInsertList[i].modifyUserId = this.sessionManager.getId();
                this.cslddpInsertList[i].listSeq = 1;
                this.cslddpInsertList[i].coCreditWhenIndigentFlag = 'Y';
                this.cslddpInsertList[i].modifyDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
                this.cslddpInsertList[i].internalPriorityNo = 1;
                this.cslddpInsertList[i].percentage = 0;
                this.cslddpInsertList[i].fifoFlag = 'Y';
                this.cslddpInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
                this.cslddpInsertList[i].accountCode = Number(this.cslddpInsertList[i].nbtAccountCode);
                this.cslddpInsertList[i].activeFlag = this.cslddpInsertList[i].activeFlag ? 'Y' : 'N';
                this.cslddpInsertList[i].foAlAllOffenderFlag = this.cslddpInsertList[i].foAlAllOffenderFlag ? 'Y' : 'N';
                this.cslddpCommitModel.insertList = this.cslddpInsertList;
            }
            for (let i = 0; i < this.cslddpUpdatetList.length; i++) {
                if (!this.cslddpUpdatetList[i].deductionType) {
                    this.show(this.translateService.translate('otmcfees.tranfeemandatory'), 'warn');
                    return;
                }
                const index=this.cslddpData.indexOf(this.cslddpData[i]);
                for (let j = 0; this.cslddpData.length > j; j++) {
                    if (index !== j && this.cslddpData[i].deductionType === this.cslddpData[j].deductionType) {
                        this.show('otmcfees.samerowvalidationcldd', 'warn');
                         return ;
                    }
                }
                if (!this.cslddpUpdatetList[i].nbtAccountCode) {
                    this.show(this.translateService.translate('otmcfees.creddedmandtory'), 'warn');
                    return;
                }
                if (!this.cslddpUpdatetList[i].effectiveDate) {
                    this.show(this.translateService.translate('otmcfees.effectdatemandtory'), 'warn');
                    return;
                }

                if (this.cslddpUpdatetList[i].payeeCorporateId == 0) {
                    this.cslddpModel.payeeCorporateId = undefined;
                    this.cslddpModel.corporateName = undefined;
                    this.show(this.translateService.translate('otmcfees.invldpyee'), 'warn');
                    return;
                }
                if (!this.cslddpUpdatetList[i].payeeCorporateId ) {
                    this.show(this.translateService.translate('otmcfees.clearpayblemandtory'), 'warn');
                    return;
                } 
                // else if (this.cslddpUpdatetList[i].payeeCorporateId === 0) {
                //     this.cslddpModel.payeeCorporateId = undefined;
                //     this.cslddpModel.corporateName = undefined;
                //     this.show(this.translateService.translate('otmcfees.invldpyee'), 'warn');
                //     return;
                // }
                 else if (this.cslddpUpdatetList[i].payeeCorporateId) {
                     const corpname = this.corpIdMap.get(Number(this.cslddpUpdatetList[i].payeeCorporateId));
                     if (!corpname) {
                        this.cslddpModel.payeeCorporateId = undefined;
                        this.cslddpModel.corporateName = undefined;
                        this.show(this.translateService.translate('otmcfees.invldpyee'), 'warn');
                        return;
                    }
                }
                this.cslddpUpdatetList[i].caseloadId = this.sessionManager.currentCaseLoad;
                this.cslddpUpdatetList[i].accountCode = Number(this.cslddpUpdatetList[i].nbtAccountCode);
                this.cslddpUpdatetList[i].activeFlag = this.cslddpUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.cslddpUpdatetList[i].foAlAllOffenderFlag = this.cslddpUpdatetList[i].foAlAllOffenderFlag ? 'Y' : 'N';
                this.cslddpCommitModel.updateList = this.cslddpUpdatetList;
            }


        }
        if (this.cslddpDeleteList.length > 0) {
            for (let i = 0; i < this.cslddpDeleteList.length; i++) {
                this.cslddpCommitModel.deleteList = this.cslddpDeleteList;
            }

        }
        const cslddpSaveData = this.otmcfeesFactory.csldDpCommit(this.cslddpCommitModel);
        cslddpSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('DEDUCTION_PROFILES_PK') > 0) {
                this.show(this.translateService.translate('otmcfees.clddprimarykeyviolation'), 'warn');
                // this.search();
                this.otmcfeesexecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('CASELOAD_DEDUCTION_PROFILES_U1') > 0) {
                this.show(this.translateService.translate('otmcfees.cldduniquekeyviolation'), 'warn');
                // this.search();
                this.otmcfeesexecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('CSLD_DD_CSLD_DP_F1') > 0) {
                this.show(this.translateService.translate('otmcfees.clddf1forienkeyviolation'), 'warn');
                // this.search();
                this.otmcfeesexecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('TRAN_FD_CSLD_DP_FK1') > 0) {
                this.show(this.translateService.translate('otmcfees.tranfdOndelvalid'), 'warn');
                this.otmcfeesexecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('TIER_TFA_CSLD_DP_FK1') > 0) {
                this.show(this.translateService.translate('otmcfees.tranfaOndelvalid'), 'warn');
                this.otmcfeesexecuteQuery();
                return;
            } 
            
            // if (data && data[0] && data[0].returnValue && data[0].returnValue === 1 && this.cslddpCommitModel.deleteList.length > 0) {
            //     this.show(this.translateService.translate('common.recordDeleted'), 'success');
            //     this.cslddpModel = new CaseloadDeductionProfiles();
            //     this.otmcfeesexecuteQuery();
            //     return;
            // }

            if (data && data[0] && data[0].returnValue && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.cslddpModel = new CaseloadDeductionProfiles();
                this.otmcfeesexecuteQuery();
                return;
            } else if (data && data[0] && data[0].returnValue && data[0].returnValue === 0) {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.cslddpModel = new CaseloadDeductionProfiles();
                this.otmcfeesexecuteQuery();
                return;
            }

        });
    }
    /**
     *  This function will be used to validate the mandatory filelds of caseload deduction profiles data
    * fired
    */
    cfddValidationsMand = () => {
        const is = { valid: true };
        if (this.cslddpData && this.cslddpData) {
            this.cslddpData.forEach(element => {
                if (!element.deductionType) {
                    this.show(this.translateService.translate('otmcfees.tranfeemandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (!element.accountCode) {
                    this.show(this.translateService.translate('otmcfees.creddedmandtory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (!element.effectiveDate) {
                    this.show(this.translateService.translate('otmcfees.effectdatemandtory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (!element.payeeCorporateId) {
                    this.show(this.translateService.translate('otmcfees.clearpayblemandtory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }

            });
        }
        return is.valid;
    }

    cslddpClear =() => {
        this.otmcfeesexecuteQuery();
         return true;
    }

    // execute query
    otmcfeesexecuteQuery() {
        this.saveEnableFlag = true;
        this.cslddpModel = new CaseloadDeductionProfiles();
        const reqData = JSON.parse(JSON.stringify(this.cslddpModel));
        reqData.activeFlag = reqData.activeFlag ? 'Y' : null;
        reqData.caseloadId = this.sessionManager.currentCaseLoad;
        reqData.caseloadType = this.sessionManager.currentCaseLoadType;
        if (this.cslddpModel.nbtAccountCode) {
            reqData.accountCode = this.cslddpModel.nbtAccountCode;
        }
        if (this.cslddpModel.deductionType) {
            reqData.deductionType = this.cslddpModel.deductionType;
        }
        if (this.cslddpModel.payeeCorporateId) {
            reqData.payeeCorporateId = this.cslddpModel.payeeCorporateId;
        }
        const serviceObj = this.otmcfeesFactory.csldDpExecuteQuery(reqData);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.cslddpData = [];
                if(this.cslddpValidation) {
                     this.show('common.querycaused');
                }
                this.clear();
            } else {
                data.forEach(ele => {
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
                    ele.foAlAllOffenderFlag = ele.foAlAllOffenderFlag === 'Y' ? true : false;
                    ele.launchButton='D';
                    // if (ele.corpNameNotFound === 'Y') {
                    //     this.show(this.translateService.translate('otmcfees.clearpaynotexist'), 'warn');
                    // }
                });
                this.cslddpData = data;
                this.cslddpDataDbCheck = data;
                this.tableIndex = 0;
                //this.changeIndex();
            }
            this.cslddpValidation = false;
        });
    }
    /**
         *  This function will be used to when option changed the data in tranaction fee details lov
        * fired
        */
    checkAlreadyDeductionOrNot(event) {
        this.cslddpDataDbCheck.forEach(element => {
            if ( element.deductionType === this.cslddpModel.deductionType) {
                this.show('otmcfees.samerowvalidationcldd', 'warn');
            }
        });
    }
    /**
     *  This function will be used to when enterd the data in tranaction fee details lov
    * fired
    */
    onDeductionBlur() {
        if (!this.cslddpModel.deductionType) {
            this.cslddpModel.deductionType = this.cslddpModel.deductionType === '' ? undefined : '';
        }
    }
    /**
     *  This function will be used to when enterd the data in credit deductions to lov
    * fired
    */
    onAccountBlur() {
        if (!this.cslddpModel.nbtAccountCode) {
            this.cslddpModel.nbtAccountCode = this.cslddpModel.nbtAccountCode === '' ? undefined : '';
        }
    }
    /**
     *  This function will be used to change the index of a caseload deduction profile grid
    * fired
    */
    changeIndex() {
        this.mode = this.FETCHMODE;
        this.cslddpModel = this.cslddpData[this.cropIndex];
        if (this.cslddpModel.createDatetime) {
            this.deductionReadOnly = true;
            this.launchBtnFlag = true;
            this.namesReadOnly = true;
            this.enableIfRowDataExist = true;
        } else {
            this.deductionReadOnly = false;
            this.launchBtnFlag = false;
            this.namesReadOnly = false;
            this.enableIfRowDataExist = false;
        }
        this.cslddpModelDup = JSON.parse(JSON.stringify(this.cslddpModel));
        this.tranfdExecuteQuery();
    }
    /**
     *  This function will be used to retrive the transaction fee Details grid
    * fired
    */
    tranfdExecuteQuery() {
        this.tranfdModel.caseloadId = this.cslddpModel.caseloadId;
        this.tranfdModel.deductionType = this.cslddpModel.deductionType;
        const tranfdResult = this.otmcfeesFactory.tranFdExecuteQuery(this.tranfdModel);
        tranfdResult.subscribe(tranfdResultList => {
            if (tranfdResultList.length === 0) {
                this.tranfdData = [];
            } else {
                this.tranfdData = tranfdResultList;
                this.tranfdModel = tranfdResultList[0];
                this.tableIndex = 0;

            }
            this.tiertfaExecuteQuery();
        });
    }
    /**
     *  This function will be used to validate the mandatory filelds transaction fee Details grid
    * fired
    */
    tranFdMand = () => {
        const is = { valid: true };
        if (this.tranfdData && this.tranfdData) {
            this.tranfdData.forEach(element => {
                if (!element.receiptDeductionType) {
                    this.show(this.translateService.translate('otmcfees.typesmandtory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }

            });
        }
        return is.valid;
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmcfeesSavetranfdForm(event) {
        if (!this.tranFdMand()) {
            return;
        }
        // TODO declare commit bean and add insert list to that object.
        this.tranfdInsertList = event.added;
        this.tranfdUpdatetList = event.updated;
        this.tranfdDeleteList = event.removed;
        this.tranfdCommitModel.insertList = [];
        this.tranfdCommitModel.updateList = [];
        this.tranfdCommitModel.deleteList = [];
        if (this.tranfdInsertList.length > 0 || this.tranfdUpdatetList.length > 0) {
            for (let i = 0; i < this.tranfdInsertList.length; i++) {
                this.tranfdInsertList[i].modifyDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
                this.tranfdInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
                this.tranfdInsertList[i].deductionType = this.cslddpModel.deductionType;
                this.tranfdCommitModel.insertList = this.tranfdInsertList;
            }
            for (let i = 0; i < this.tranfdUpdatetList.length; i++) {
                this.tranfdCommitModel.updateList = this.tranfdUpdatetList;
            }
        }
        if (this.tranfdDeleteList.length > 0) {
            for (let i = 0; i < this.tranfdDeleteList.length; i++) {
                this.tranfdCommitModel.deleteList = this.tranfdDeleteList;
            }

        }
        const tranfdSaveData = this.otmcfeesFactory.tranFdCommit(this.tranfdCommitModel);
        tranfdSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('TRANSACTION_FEE_DETAILS_PK') > 0) {
                this.show(this.translateService.translate('otmcfees.tranfdprimarykey'), 'warn');
                this.tranfdExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnValue && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.tranfdExecuteQuery();
                return;
            } else if (data && data[0] && data[0].returnValue && data[0].returnValue === 0) {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.tranfdExecuteQuery();
                return;
            }
        });
    }
    /**
         *  This function will be used to retrive the transaction fee amount grid
        * fired
        */
    tiertfaExecuteQuery() {
        this.tiertfaModel.caseloadId = this.cslddpModel.caseloadId;
        this.tiertfaModel.deductionType = this.cslddpModel.deductionType;
        const tiertfaResult = this.otmcfeesFactory.tierTfaExecuteQuery(this.tiertfaModel);
        tiertfaResult.subscribe(tiertfaResultList => {
            if (tiertfaResultList.length === 0) {
                this.tiertfaData = [];
            } else {
                this.tiertfaData = tiertfaResultList;
                this.tiertfaModel = tiertfaResultList[0];
                this.tableIndexFeeAmount = 0;
            }
        });
    }
    /**
     *  This function will be executed to validate Mandtry fields
    * fired
    */
    tranFiAmountMand = () => {
        const is = { valid: true };
        if (!this.cslddpModel.caseloadId && !this.cslddpModel.deductionType) {

        }
        if (this.tiertfaData && this.tiertfaData) {
            this.tiertfaData.forEach(element => {
                if (element.fromAmount === undefined) {
                    this.show(this.translateService.translate('otmcfees.frommandtory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (element.toAmount === undefined) {
                    this.show(this.translateService.translate('otmcfees.tomandtory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            });
        }
        return is.valid;
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmcfeesSavetiertfaForm(event) {
        if (!this.tranFiAmountMand()) {
            return;
        }
        this.tiertfaInsertList = event.added;
        this.tiertfaUpdatetList = event.updated;
        this.tiertfaDeleteList = event.removed;
        this.tiertfaCommitModel.insertList = [];
        this.tiertfaCommitModel.updateList = [];
        this.tiertfaCommitModel.deleteList = [];
        if (this.tiertfaInsertList.length > 0 || this.tiertfaUpdatetList.length > 0) {
            for (let i = 0; i < this.tiertfaInsertList.length; i++) {
                if (this.tiertfaInsertList[i].toAmount && this.tiertfaInsertList[i].fromAmount) {
                    if (this.tiredGridValidations(this.tiertfaInsertList[i])) {
                        return;
                    }
                }
                this.tiertfaInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
                this.tiertfaInsertList[i].deductionType = this.cslddpModel.deductionType;
                this.tiertfaCommitModel.insertList = this.tiertfaInsertList;
            }
            for (let i = 0; i < this.tiertfaUpdatetList.length; i++) {
                if (this.tiertfaUpdatetList[i].toAmount && this.tiertfaUpdatetList[i].fromAmount) {
                    if (this.tiredGridValidations(this.tiertfaUpdatetList[i])) {
                        return;
                    }
                }
                this.tiertfaCommitModel.updateList = this.tiertfaUpdatetList;
            }
        }
        if (this.tiertfaDeleteList.length > 0) {
            for (let i = 0; i < this.tiertfaDeleteList.length; i++) {
                if (this.tiredGridValidations(this.tiertfaDeleteList[i])) {
                    return;
                }
                this.tiertfaCommitModel.deleteList = this.tiertfaDeleteList;
            }

        }
        const tiertfaSaveData = this.otmcfeesFactory.tierTfaCommit(this.tiertfaCommitModel);
        tiertfaSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('TIERED_TXN_FEE_AMOUNTS_PK') > 0) {
                this.show(this.translateService.translate('otmcfees.tranfaprimarykeyviolation'), 'warn');
                this.tiertfaExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnValue && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.tiertfaExecuteQuery();
                return;
            } else if (data && data[0] && data[0].returnValue && data[0].returnValue === 0) {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.tiertfaExecuteQuery();
                return;
            }
        });
    }
    tiredGridValidations(event) {
        if (this.validateItem) {
            this.show(this.translateService.translate('ocdpayob.mustbeinrange'), 'warn');
            return true;
        }
        if (this.fieldItem) {
            this.show(this.translateService.translate('common.fieldmustbeofform'), 'warn');
            return true;
        }
        if (event.overLapCount) {
            this.show(this.translateService.translate('otmcfees.overlapvalidation'), 'warn');
            return true;
        }
        if (Number(event.toAmount) <= Number(event.fromAmount)) {
            this.show(this.translateService.translate('otmcfees.fromamountvalidation'), 'warn');
            return true;
        }
        if (!(event.percentage >= 0) && !(event.feeAmount >= 0)) {
            this.show(this.translateService.translate('otmcfees.eitherpercentageorfeeamount'), 'warn');
            return true;
        }
        return false;
    }
    corpExecuteQuery() {
        this.corporatesModel = new Corporates();
        const corpResult = this.otucpayeFactory.
            corpExecuteQuery(this.corporatesModel);
        corpResult.subscribe(corpResultList => {
            if (corpResultList.length === 0) {
            } else {
                corpResultList.forEach(ele => {
                    this.corpIdMap.set(ele.corporateId, ele.corporateName);
                  });
            }
        });
    }

    clearDisable() {
        if (this.cslddpModel.deductionType || this.cslddpModel.nbtAccountCode || this.cslddpModel.effectiveDate
            || this.cslddpModel.payeeCorporateId || this.cslddpModel.corporateName) {
                return false;
            } else {
                return true;
        }
    }
}
