import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { saveAs } from 'file-saver';
import { TranslateService } from '@common/translate/translate.service';
import { ManageReportService } from './service/managereport.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OirreportModuleParameters } from '@report/beans/OirreportModuleParameters';
import { ReportParamKeyValue } from './beans/ReportParamKeyValue';
import { LoginService } from '@common/login/service/login.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';


@Component({
  selector: 'app-oirreport',
templateUrl: './oirreportdialog.component.html',
	styleUrls: ['./oirreportdialog.component.scss']
})
export class OirreportdialogComponent implements OnInit{
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  @ViewChildren('reportUiComp') reportEelementRef: QueryList<any>;
  actionName: string;
  msgs: any[] = [];
  msglist: any[];
  message: any;
  type: any;
  lovDataFlag: boolean;
  startDate: boolean;
  endDate: boolean;
  pDate: boolean;
  indTrans: boolean;
  description: any;
  lovData: any;
  oirreportData:any[] = [];
  oirreportRowData:any[] = [];
  oirreportColumnDef: any[];
  isReportParamsValid: boolean = false;
  public mode: string;
  refCodeList:any=[];
  oirreprtModel: OirreportModuleParameters = new OirreportModuleParameters(); 
  refCodeTitles = { 'description': this.trMsg('osurepor.description'), 'code': this.trMsg('osurepor.code') };
  muiltiLovTitles: Object = { text: 'description', value: 'code' };
  validationFlag: Boolean = false;
  reportTitle: string;
  constructor(public translateService: TranslateService, private oirreportFactory: ManageReportService, private sessionManager: UserSessionManager, private logService: LoginService,private dialogService: DialogService) {

   }
   

  ngOnInit() {
	this.mode = 'CheckBox';
 	this.oirreportColumnDef = [
      {
        fieldName: this.translateService.translate('oirreport.parameterName'), field: 'parameter_name',
        editable: false, width: 150, datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oirreport.parameterSource'), field: 'source',
        editable: false, width: 150, datatype: 'text', uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oirreport.conflict'), field: 'conflict',
        editable: false, width: 150, datatype: 'text', uppercase: 'false'
      },
    ];
 	this.reportTitle = this.dialog.data.description;
 	this.validateConflictReport();
  }
  
	closeDialog() {
		this.dialog.close(null);
	}
	
	validateConflictReport(){
		const serviceObj = this.oirreportFactory.conflictReport(this.dialog.data.moduleName);
		serviceObj.subscribe(data => {
			if(Object.keys(data).length > 0){
				let objectValue:any[] = Object.values(data);
				this.oirreportRowData = objectValue[0];
				if(this.oirreportRowData.length>0) {
					this.oirreportRowData.forEach(element=>{
					if(element.conflict === "Y"){
						this.isReportParamsValid = true;
						return;
					}
					});
					if(!this.isReportParamsValid){
						this.populateParams();
					}
				
				} else {
					this.oirreprtModel.moduleName = this.dialog.data.moduleName;	
                	this.openReport();
                	this.dialog.close(null);
				}
			}else{
                this.oirreprtModel.moduleName = this.dialog.data.moduleName;	
                this.openReport();
                this.dialog.close(null);
            }
		});
	}
	
	
	populateParams(){		
		this.oirreportData = [];
		this.oirreprtModel.moduleName = this.dialog.data.moduleName;		
		const serviceObj = this.oirreportFactory.getReportParameters(this.dialog.data.moduleName);
		serviceObj.subscribe(data => {
			if(data.length > 0){	
				 data.forEach(element => {
					element.optionalFlag = element.optionalFlag === 'N' ? true : false;	
					 if (element.parameterName === 'CASELOAD') {
						 element.description = this.sessionManager.currentCaseLoad;
					 } else if (element.parameterName === 'USER_ID') {
						 element.description = this.sessionManager.userSessionDetails().id;
					 } else if (element.parameterName === 'P_USER') {
						 this.logService.getCurrentStaffDetail().subscribe(
							 (staff) => {
								 const getFullName = staff.firstName + ' ' + staff.lastName;
								 element.description = getFullName;
							 },
						 );
					 } else if (element.parameterName === 'P_CASELOAD') {
						 //element.description = this.sessionManager.currentCaseLoadName;
						 element.description = this.sessionManager.currentCaseLoad;
					 }
					 else if (element.parameterName === 'P_FROM_DATE') {
						 element.createDatetime = DateFormat.getDate();;
					 }
					 else if (element.parameterName === 'P_TO_DATE') {
						 element.createDatetime = DateFormat.getDate();;
					 }
					 else if (element.parameterName === 'OID' && element.parameterType === 'FORM') { 
						 element.parameterLovSelect='SELECT  offender_id_display as CODE ,offender_id_display as DESCRIPTION from v_header_block'
					 }
					});
 		
				this.oirreportData = data;	
				const temp = {
					commentText: "OFFENDER_ID_DISPLAY",
					createDatetime
						:
						null,
					createUserId
						:
						null,
					errorMessage
						:
						null,
					modifyDatetime
						:
						null,
					modifyUserId
						:
						null,
					moduleName
						:
						this.dialog.data.moduleName,
					multivalueFlag
						:
						null,
					optionalFlag
						:
						false,
					parameterCode
						:
						null,
					parameterDomain
						:
						null,
					parameterLovGroup
						:
						null,
					parameterLovSelect
						:
						"SELECT  booking_no as CODE ,booking_no as DESCRIPTION from v_header_block where offender_id_display = :OID",
					parameterLovTitle
						:
						null,
					parameterName
						:
						"OID",
					parameterSeq
						:
						1,
					parameterType
						:
						"LOV",
					parentLov
						:
						null,
					reportApplnCode
						:
						null,
					sealFlag
						:
						null
				}
				let count = 0;
				this.oirreportData.forEach(ele => { 
					ele.lovDataList = [];
					if (ele.type = 'FORM' && ele.parameterName=='OID') { 
						count = 1;
					}
					
				})
				if(count===1)
				this.oirreportData.push(temp);
			}
		});
	}
	
	 onkeyDown(event, paramType) {
        if (paramType === 'INTEGER' && (event.key === '.' || event.key === '0')) {
            event.stopPropagation();
            return false;
        } else if (paramType === 'NUMBER' && event.key === '0') {
            event.stopPropagation();
            return false;
        }
    }
    
     setDisable(event) {
        if (event === 'CASELOAD' || event === 'P_USER' || event === 'P_CASELOAD' || event === 'USER_ID') {
            return true;
        } else {
            return false;
        }
    }
    
     isInsertable(date, event, i) {
        if (event === 'START_DATE') {
            this.startDate = !(date);
        }
        if (event === 'END_DATE') {
            this.endDate = !(date);
        }
        if (event === 'P_DATE') {
            this.pDate = !(date);
        }
    }
    
    
    textBlurEvent(event, i) {
        this.indTrans = false;
        if ((event === 'ALL_FLAG' || event === 'IND_TRNS')
            && !['Y', 'N'].includes(this.oirreportData[i]['description']) &&
            this.oirreportData[i]['description']) {
            this.oirreportData[i]['description'] = 'Y';
            this.show('osurepor.youmustenteryorn');
            this.indTrans = false;
            return;
        } else if (event === 'IND_TRNS' && !this.oirreportData[i]['description']) {
            this.indTrans = true;
        } else if (event === 'P_ZEROFLAG' && !['N'].includes(this.oirreportData[i]['description']) &&
            this.oirreportData[i]['description']) {
            this.oirreportData[i]['description'] = 'N';
            this.show('osurepor.youmustentern');
            return;
        }
    }
    
     show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    
    
	lovLink(data) {
		let parentFieldValue: any;
		if (data.parentLov !== null) {
			this.reportEelementRef.forEach(element => {
				if (element.id == data.parentLov && element.innerValue !== null) {
					parentFieldValue = element.innerValue;
				}
			});
			if (parentFieldValue !== undefined) {
				return 'report/parameterCodeList?moduleName=' + data.moduleName + '&parameterName=' + data.parameterName + '&parameterSeq=' + data.parameterSeq
					+ '&parentLov=' + data.parentLov + ':' + parentFieldValue;
			}
		} else {
			return 'report/parameterCodeList?moduleName=' + data.moduleName + '&parameterName=' + data.parameterName + '&parameterSeq=' + data.parameterSeq;
		}
	} 
    
     textBoxBlurEvent(model, event, desc, moduleName, i) {
	//TODO --
	}
	
	setLaunchDisable(moduleName) {
        if (moduleName === 'OIRALERT' || moduleName === 'OTRTASTA' || moduleName === 'OTRBSTAT' || moduleName === 'OTRSSTAT') {
            return false;
        } else {
            return false;
        }
    }
    
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    
    get lovTitles(): any {
        if (this.description === 'Print Trust Fund Receipts' || this.description === 'Disbursement Receipt') {
            return { 'domain': this.trMsg('osurepor.description'), 'code': this.trMsg('osurepor.code') };
        }
        return { 'description': this.trMsg('osurepor.description') };
    }
    
    openReport(){
		let reportParamsValue = []
		this.validationFlag = false;
	this.oirreportData.forEach(element=>{
		let dataObj:ReportParamKeyValue = new ReportParamKeyValue();
		if (element.parameterType === "TEXT" || element.parameterType === "FORM") {
			if (element.optionalFlag && !element.description) { 
				this.show(element.commentText +" "+ this.translateService.translate("oirreport.manditoryfield"), 'warn');
				this.validationFlag = true;
				return;
			}
			dataObj.paramValue = element.description;
		} else if (element.parameterType === "REF_CODE") {
			if (element.optionalFlag && !element.sealFlag) { 
				this.show(element.commentText +" "+ this.translateService.translate("oirreport.manditoryfield"), 'warn');
				this.validationFlag = true;
				return;
			}
			dataObj.paramValue = element.sealFlag;
		}else if(element.parameterType === "FLOAT_POINT" || element.parameterType === "NUMBER" || element.parameterType === "INTEGRE" ){
			if (element.optionalFlag && !element.serialVersionUID) { 
				this.show(element.commentText +" "+ this.translateService.translate("oirreport.manditoryfield"), 'warn');
				this.validationFlag = true;
				return;
			}
			dataObj.paramValue = element.serialVersionUID;
		} else if (element.parameterType === "DATE") {
			if (element.optionalFlag && !element.createDatetime) { 
				this.show(element.commentText +" "+ this.translateService.translate("oirreport.manditoryfield"), 'warn');
				this.validationFlag = true;
				return;
			}
			dataObj.paramValue = element.createDatetime;
		}
		else if (element.parameterType === "LOV") {
			if (element.optionalFlag && !element.description) { 
				this.show(element.commentText +" "+ this.translateService.translate("oirreport.manditoryfield"), 'warn');
				this.validationFlag = true;
				return;
			}
			dataObj.paramValue = element.description;
		}
		else if (element.parameterType === "MULTI_LOV") {
			if (element.optionalFlag && !element.lovDataList) { 
				this.show(element.commentText +" "+ this.translateService.translate("oirreport.manditoryfield"), 'warn');
				this.validationFlag = true;
				return;
			}
			dataObj.paramValue = element.lovDataList;
		}
		else if (element.parameterType === "MULTI_REF") {
			if (element.optionalFlag && !this.refCodeList) { 
				this.show(element.commentText +" "+ this.translateService.translate("oirreport.manditoryfield"), 'warn');
				this.validationFlag = true;
				return;
			}
			dataObj.paramValue = this.refCodeList;
		}
		if (element.parameterName == "P_FROM_DATE" || element.parameterName == 'P_TO_DATE') { 
			var fromDate = null;
			var toDate = null;
			this.oirreportData.forEach(ele => { 
			if (ele.parameterName === 'P_FROM_DATE') { 
				fromDate = ele.createDatetime;
			}
			if (ele.parameterName === 'P_TO_DATE') { 
				toDate = ele.createDatetime;
			}
		});
			if (fromDate!=null && toDate!=null &&  DateFormat.compareDate(DateFormat.getDate(fromDate), DateFormat.getDate(toDate)) === 1) { 
				this.show(this.translateService.translate("oirreport.fromdatelessthantodate"), 'warn');
				this.validationFlag = true;
				return;
			}
		}
		dataObj.paramKey = element.parameterName;
		dataObj.paramType = element.parameterType;
		
		reportParamsValue.push(dataObj);
	});
	this.oirreprtModel.paramValues = reportParamsValue;
	this.oirreprtModel.reportType = this.dialog.data.reportType;
	if (this.validationFlag) {
		return;
	}
	if(this.oirreprtModel.reportType === 'EXCEL' || this.oirreprtModel.reportType === 'HTML' || this.oirreprtModel.reportType === 'CSV'){
		const nonPdfService = this.oirreportFactory.openNonPdfReport(this.oirreprtModel);
		
		nonPdfService.subscribe((data: any) => {
			if (data.status == 400) {
				let message = this.translateService.translate("oirreport.errorMsg");
				this.oirreportFactory.messageSubject.next(message);
				return;
			} else {
				if (this.oirreprtModel.reportType === 'EXCEL') {
					saveAs(data, this.oirreprtModel.moduleName + ".xls");
				} else if (this.oirreprtModel.reportType === 'HTML') {
					saveAs(data, this.oirreprtModel.moduleName + ".html");
				} else if (this.oirreprtModel.reportType === 'CSV') {
					saveAs(data, this.oirreprtModel.moduleName + ".csv");
				}
			}

		});
	} else {
		const serviceObj = this.oirreportFactory.openReport(this.oirreprtModel);
		serviceObj.subscribe((data: any) => {
			if(data.status == 400){
			 let message = this.translateService.translate("oirreport.errorMsg");
             this.oirreportFactory.messageSubject.next(message);
             return;
			}else{
             this.openPdf(data);
			}
		});
	}
	
	}
	
    openPdf(base64str) {      
        var url = URL.createObjectURL(base64str);
        window.open(url, "_blank");
	}
	
	onClear() { 
		this.validateConflictReport();
	}
	
	openForm = () => { 
        this.dialogService.openLinkDialog('/oiinamesdialog', 80).subscribe(result => {
			this.oirreportData.forEach(ele => { 
				if (ele.type = 'FORM' && ele.parameterName=='OID') { 
					ele.description= result.offenderIdDisplay;
				}
				if (ele.type = 'LOV' && ele.parameterName=='OID') { 
					ele.description= result.offenderIdDisplay;
				}
			})
		});
    }
}
