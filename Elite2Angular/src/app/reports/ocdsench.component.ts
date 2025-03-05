import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcdsenchService } from './service/ocdsench.service';
import { OcdleglsService } from '@inst/legal/service/ocdlegls.service';

@Component({
  selector: 'app-ocdsench',
  templateUrl: './ocdsench.component.html',
 
})
export class OcdsenchComponent implements OnInit {
	
  msgs: any[] = [];
  msglist: any[];
  message: any;
  type: any;
  vHeaderBlockModel: any;
  dataId: any;
  screenName = 'ocdlegls';
  calculationEventColDefs:any[];
  keyDatesColDefs: any[];
  custColDef: any[];
  bailColdef: any[];
  nonCustColDef: any[]; 
  calculationEventGridData:any[] = [];
  keyDatesGridData: any[] = [];
  custGridData: any[] = [];
  nonCustGridData: any[] = [];
  bailGridData: any[] =[];
  keyDatesReferenceCodes: any[] = [];
  private _sentenceDates: any;
  initSummaryData: any;
  calcEventKeyDates: any;
  INDEFINITE = 'Indefinite';
	hideErd: boolean;
	resetGrid: boolean;
	
 constructor(public translateService:TranslateService, public loginService : LoginService,
    private sessionManager: UserSessionManager,private OcdleglsFactory: OcdleglsService, private ocdsenchService: OcdsenchService){
	 this.getERDHideShowValue();
	 this.calculationEventColDefs = this.loadColDefData('calcEventgrid', 'OCDSENCH');
	 this.keyDatesColDefs = this.loadColDefData('keyDategrid', 'OCDSENCH');
     this.custColDef = this.loadColDefData('custOrdergrid', 'OCDSENCH','CUST');
     this.nonCustColDef = this.loadColDefData('nonCustgrid', 'OCDSENCH','NCUS');
     this.bailColdef = this.loadColDefData('bailGrid', 'OCDSENCH');
} 
    ngOnInit(): void {
       this.OcdleglsFactory.loadKeyDates(this.sessionManager.getId(),'OCDSENCH').subscribe((data: any) => {
          if(data){
            this.keyDatesReferenceCodes = data;
          }
		})
    }
    
    onOffenderChange( offender ) {
	    this.vHeaderBlockModel = offender;
	    this.dataId = 0;

		this.calculationEventGridData = [];    
	    this.keyDatesGridData = [];
	    this.custGridData = [];
	    this.nonCustGridData = [];
		this.bailGridData = [];

	    if ( offender ) {
			this.loadJsonData();  
	    }
  }
  
  loadColDefData(gridName, moduleName, orderType?) {
    const data = this.loginService.mainColDefData;
    let datatypeData = [];
      data.forEach(gridDef => {
        if(gridDef.grid_name == gridName && gridDef.module_name == moduleName){
            datatypeData = JSON.parse(gridDef.configData);
        }
    })
	    return this.prepareColDef(datatypeData, moduleName, orderType)
  }
  
  prepareColDef(coldefJson, moduleName, orderType?) {
    const colDefs = [];
    coldefJson.forEach(type => {
        if(type.dataType === 'lov' && type.source === 'link') {
            let lovRendered = 'description';
            /* if (type.field == 'type' && orderType) {
              lovRendered = 'code'
            } */
            colDefs.push({datatype:type.dataType,fieldName:this.translateService.translate(type.fieldName),lovRender: lovRendered, link:type.url, field:type.field, editable: false, required: false,parentField: type.parentField,source: type.sourceType});
        } 
        else if(type.dataType === 'lov' && type.source === 'domain') {
            colDefs.push({datatype:type.dataType,fieldName:this.translateService.translate(type.fieldName), domain:type.url, field:type.field, editable: false});
        }
        else if(type.dataType === 'text') {
            colDefs.push({datatype:type.dataType,fieldName:this.translateService.translate(type.fieldName), field: type.field, editable: false,hide: type.hide,wrapText: true});
        }
        else if(type.dataType === 'number') {
          colDefs.push({ datatype:type.dataType,field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: false });
        }
        else if(type.dataType === 'launchbutton') {
          colDefs.push({ datatype: type.dataType, field: type.field, fieldName: this.translateService.translate(type.fieldName), link: type.link, updateField: 'row', modal: true, data: 'row', width: 200, dialogWidth: '80%'});
        }
        else if (type.dataType === 'hyperlink') {
          colDefs.push({ datatype: 'hyperlink', width: 50, displayas: 'image', suppressMenu: true, parentField: type.parentField,  required: type.required, fieldName: type.fieldName ? this.translateService.translate(type.fieldName) : '', field: type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%' });
        }
        else if(type.dataType === 'date' && type.field === 'orderedDate') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: false, required: false, width: 150, });
        }
        else if(type.dataType === 'date') {
            colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: true, width: 150});
        } 
        else if(type.dataType === 'checkbox') {
          colDefs.push({ datatype: type.dataType, field: type.field, fieldName: this.translateService.translate(type.fieldName), modal: true, data: 'row', width: 200, height: 'auto', editable: false});
        }
        else if(type.dataType === 'time') {
           colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName), editable: true, width: 150});
        }
        else if(type.dataType === 'custom') {
          colDefs.push({datatype: type.dataType, fieldName: this.translateService.translate(type.fieldName), field: type.field, editable: false, hide: type.hide, wrapText: true, rendererSelector: (rowIndex, field, data)=> {return (field == 'indefinite' && data && [true, false, "true", "false"].includes(data.indefinite)) ?'checkbox' :''}});
        }
    })
    
    return colDefs;
  }
  
  /* load grid Data */
  	loadJsonData(){
	 this.loadKeyDates();
	}
	
	 loadKeyDates() {
	    let form_identifiers = '"offenderBookId":"'+ this.vHeaderBlockModel.offenderBookId + '"';
	    const retData = {
	      formName: this.screenName,
	      id: this.dataId ? this.dataId : 0,
	      searchString: form_identifiers
	    }
	    this.calcEventKeyDates = new Map();
	    this.ocdsenchService.loadSentHistoryData(retData).subscribe((dataList: any) => {
		let calculationArray = [];
	      if (dataList) {
			dataList.forEach(data => {
		        this.dataId = data.id;
		        this.initSummaryData = JSON.parse(data.formInfoJson);
		        const keyDates = JSON.parse(data.formInfoJson);
		        this.calcEventKeyDates.set(this.dataId, keyDates);
		        //const bookingDates = keyDates["booking_dates"];
		        
		        const calculationEvents = keyDates["calcReason"];
				let calcEvent = this.calculationEventsGridData(calculationEvents);
				if(calcEvent) {
					calcEvent["dataId"] =  this.dataId;
					calculationArray.push(calcEvent);
				}
		        //this.sentenceDates = keyDates["sentence_dates"];
		        //this.replaceDateTypewithCode(bookingDates);
		        
		     });
			 this.calculationEventGridData = calculationArray;
		  } 
		  else {
		        this.keyDatesGridData = []; 
		  }
	    })
  }
  
  calculationEventsGridData(calculationEvents){
	/*calculationEvents.forEach(event => {
		var date = new Date(event.sentTime);		
		event.sentTime = date.getHours() + ":" + date.getMinutes();
	})*/
	return JSON.parse(JSON.stringify(calculationEvents));
   }
   
   populateCalcReasonOrders(event) {
	 this.keyDatesGridData = [];
	 let keyDates = this.calcEventKeyDates.get(event.dataId);
	 const bookingDates = keyDates["bookingDates"];
	 this.sentenceDates = keyDates["sentenceDates"];
	 if(!this.sentenceDates) {
		this.sentenceDates = keyDates["sentences"];
	}
	 this.replaceDateTypewithCode(bookingDates);
   }
  
  replaceDateTypewithCode(bookingDates){
    let modifiedBookingDates = [];
    bookingDates.forEach(bookDate => {
      const dateDesc = this.getDescriptionfromCode(bookDate.dateType);
      if (dateDesc) {
        bookDate.dateTypeDisplay = dateDesc;
        modifiedBookingDates.push(bookDate);
      }
    });
	if (this.hideErd) {
		modifiedBookingDates = modifiedBookingDates.filter(obj => obj.dateType !== "booking_ERD");
	}
    this.keyDatesGridData = JSON.parse(JSON.stringify(modifiedBookingDates));
  }
  
   getDescriptionfromCode(actualCode) {
    const refArr = this.keyDatesReferenceCodes.filter(ref => ref.code.toUpperCase() == actualCode.toUpperCase());
    if (refArr.length > 0) {
      return refArr[0].description;
    }
    return '';
  }
  
   set sentenceDates(data) {
    this._sentenceDates = data;
    this.setSentenceLevelDates();
  }
  get sentenceDates() {
    return this._sentenceDates;
  }
  
	setSentenceLevelDates(){
		var tempCustorderGrid =[];
		var tempNonCustorderGrid =[];
		var tempBailGrid =[];
		 if(!this.sentenceDates) return;
		 this.sentenceDates.forEach(sentence => {
			var custorderGrid ={};
			var noncustorderGrid ={};
			var bailGrid ={};
			if(sentence.sentenceOrderType === 'CUST'){
				custorderGrid['displayNo'] = sentence.displayNo;
				if(sentence.sentenceCommenceDate == this.INDEFINITE) {
          			custorderGrid['sentenceCommenceDate']  = this.INDEFINITE;
          		} else {
		            custorderGrid['sentenceCommenceDate']  = DateFormat.format(DateFormat.getDate(sentence.sentenceCommenceDate));
		        }
				custorderGrid['sentenceCalcType'] = sentence.sentenceCalcType;
				custorderGrid['status'] = sentence.status;  
				let sentOrderDates = sentence.sentenceOrderDates;
				sentOrderDates.forEach(date => {
					custorderGrid[date['dateType']] = date['indefinite']? this.INDEFINITE:date.dateValue?DateFormat.format(DateFormat.getDate(date.dateValue)):undefined;
							if(date.dateType === 'erd'){
								if(date.overrideDateValue) {
									custorderGrid['erdOverride'] = DateFormat.format(DateFormat.getDate(date.overrideDateValue));
								}
							}else if(date.dateType === 'red'){
								if(date.overrideDateValue) {
									custorderGrid['redOverride'] = DateFormat.format(DateFormat.getDate(date.overrideDateValue));
								}
							}else if(date.dateType === 'lrd'){
								if(date.overrideDateValue) {
									custorderGrid['lrdOverride'] = DateFormat.format(DateFormat.getDate(date.overrideDateValue));
								}
							}else if(date.dateType === 'ped'){
								if(date.overrideDateValue) {
									custorderGrid['pedOverride'] = DateFormat.format(DateFormat.getDate(date.overrideDateValue));
								}
							}else if(date.dateType === 'hed'){
								if(date.overrideDateValue) {
									custorderGrid['hedOverride'] = DateFormat.format(DateFormat.getDate(date.overrideDateValue));
								}
							}
						
				});
				tempCustorderGrid.push(custorderGrid);
			}else if(sentence.sentenceOrderType === 'PAR' || sentence.sentenceOrderType === 'NCUS'){
				noncustorderGrid['displayNo'] = sentence.displayNo;
				noncustorderGrid['sentenceOrderType'] = sentence.sentenceOrderType;
				if(sentence.sentenceCommenceDate == this.INDEFINITE) {
          			noncustorderGrid['sentenceCommenceDate']  = this.INDEFINITE;
          		} else {
		            noncustorderGrid['sentenceCommenceDate']  = DateFormat.format(DateFormat.getDate(sentence.sentenceCommenceDate));
		        }
				noncustorderGrid['sentenceCalcType'] = sentence.sentenceCalcType;
				 
				noncustorderGrid['status'] = sentence.status; 
				if(sentence.sentenceExpiryDate){
					if(sentence.sentenceExpiryDate['indefinite']) {
						noncustorderGrid['expirydate']  = this.INDEFINITE;
					} else {
					  if(sentence.sentenceExpiryDate['dateValue']) {
						  noncustorderGrid['expirydate']  = DateFormat.format(DateFormat.getDate(sentence.sentenceExpiryDate['dateValue']));
					  }
					}
				}
				
				tempNonCustorderGrid.push(noncustorderGrid);			
			}else if(sentence.sentenceOrderType === 'BAIL' || sentence.orderType == 'BAIL' ){
				let commenceDate = sentence.commenceDate;
				if(!commenceDate) {
					commenceDate = sentence.sentenceCommenceDate;
				}
				let sentenceCalcType = sentence.sentenceCalcType;
				if(!sentenceCalcType) {
					sentenceCalcType = sentence.sentenceType;
				}
				bailGrid['displayNo'] = sentence.displayNo;
				bailGrid['sentenceCommenceDate'] = commenceDate;
				bailGrid['sentenceCommenceType'] = sentenceCalcType;
				if(sentence.sentenceExpiryDate){
					if(sentence.sentenceExpiryDate['indefinite']) {
						bailGrid['sentenceExpiryDate']  = this.INDEFINITE;
					} else {
					  if(sentence.sentenceExpiryDate['dateValue']) {
						bailGrid['sentenceExpiryDate']  = DateFormat.getDate(sentence.sentenceExpiryDate['dateValue']);
					  }
					}
				}
				bailGrid['status'] = sentence.status; 
				tempBailGrid.push(bailGrid);			
			}	
		});
		this.custGridData = tempCustorderGrid;
		this.nonCustGridData = tempNonCustorderGrid;
		this.bailGridData = tempBailGrid;
	}
	  
	

getERDHideShowValue() {
    this.OcdleglsFactory.getERDHideShowValue("DERD").subscribe(data => {
        if (data === 'YES') {
            this.hideErd = false;
        } else {
            this.hideErd = true;
        }
        const erdColumnIndex = this.custColDef.findIndex(column => column.field === 'erd');
        if (erdColumnIndex !== -1) {
            this.custColDef[erdColumnIndex]['hide'] = this.hideErd;
        }
        this.resetGrid = false;
        setTimeout(() => {
            this.resetGrid = true;
        }, 0);
    });
}

}