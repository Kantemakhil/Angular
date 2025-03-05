import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumbundlService } from '../service/oumbundl.service';
import { PropertyBundles } from '../beans/PropertyBundles';
import { PropertyBundleItems } from '../beans/PropertyBundleItems';
import { PropertyBundlesCommitBean } from '../beans/PropertyBundlesCommitBean';
import { PropertyBundleItemsCommitBean} from '../beans/PropertyBundleItemsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';

@Component({
  selector: 'app-oumbundl',
  templateUrl: './oumbundl.component.html',
})
export class OumbundlComponent implements OnInit {
	
	msgs: any[] = [];
	trueFlag:boolean = true;
	type = 'error';
	msglist = [];
	message = ' Invalid.';
	selectedGroupId:string;
	propertyColumnDef:any[];
	propertyItemColumnDef:any[];
	propertyBundleInsertList:PropertyBundles[]=[];
	propertyBundleUpdateList:PropertyBundles[]=[];
	propertyBundleDeleteList:PropertyBundles[]=[];
	propertyItemsInsertList:PropertyBundleItems[]=[];
	propertyItemsUpdateList:PropertyBundleItems[]=[];
	propertyItemsDeleteList:PropertyBundleItems[]=[];
	propertyItemData:PropertyBundleItems[] = [];
	propertyBundleData:any[]=[];
	propertyBundleCommitModel: PropertyBundlesCommitBean = new PropertyBundlesCommitBean();
	propertyItemsCommitModel: PropertyBundleItemsCommitBean = new PropertyBundleItemsCommitBean();
	
	constructor(public translateService: TranslateService, private oumbundlService: OumbundlService,  private sessionManager: UserSessionManager) { }
    ngOnInit() {
       this.propertyColumnDef = [
      {
        fieldName: this.translateService.translate('oumbundl.code'), field: 'groupId',
        datatype: 'text',editable: true, required: true
      },
      {
        fieldName: this.translateService.translate('oumbundl.description'), field: 'groupName',
        editable: true, width: 150, datatype: 'text', uppercase: 'false',maxlength: 12,required: true
      },
      {
        fieldName: this.translateService.translate('oumbundl.sequence'), field: 'propertySeq',
        datatype: 'text',editable: true,required: true
      },
      {
        fieldName: this.translateService.translate('oumbundl.caseload'), field: 'caseloadId',
        datatype: 'lov',editable: true, link:'oumbundl/getCaseLoads'
      },
      {
        fieldName: this.translateService.translate('oumbundl.active'), field: 'activeFlag',
        datatype: 'checkbox',editable: true
      },
      {
        fieldName: this.translateService.translate('oumbundl.expiryDate'), field: 'expiryDate', editable: false, width: 150,
        datatype: 'date'
      },
    ];
    
     this.propertyItemColumnDef = [
      {
        fieldName: this.translateService.translate('oumbundl.proprtyType'), field: 'propertyTypeCode',
        datatype: 'lov',editable: true, domain:'PPTY_TYPE', required: true
      },
      {
        fieldName: this.translateService.translate('oumbundl.propertyDescription'), field: 'propertyDescription',
        editable: true, width: 150, datatype: 'text', uppercase: 'false', required: true
      },
      {
        fieldName: this.translateService.translate('oumbundl.quantity'), field: 'quantity',
        datatype: 'text',editable: true, required: true
      },
      {
        fieldName: this.translateService.translate('oumbundl.condition'), field: 'conditionCode',
        datatype: 'lov',editable: true, domain:'PPTY_CONDIT', required: true
      },
      {
        fieldName: this.translateService.translate('oumbundl.sequence'), field: 'sequence',
        datatype: 'text',editable: true, required: true
      },
     
    ];
    
    this.fetchPropertyGroup();
    }
    
    fetchPropertyGroup(){
	const serviceObj = this.oumbundlService.getPropertyBundles();
		serviceObj.subscribe(data => {
			for(const propertyBundle of data) {
				if(propertyBundle.activeFlag === 'Y') {
					propertyBundle.activeFlag = true;
				} else {
					propertyBundle.activeFlag = false;
				}
			}
			this.propertyBundleData = data;
		});
	}
	
	onRowClicked(event){
	 this.selectedGroupId = event.groupId
	 this.fetchPropertyItems(event.groupId);
	}
	
	fetchPropertyItems(groupId){
		const serviceObj = this.oumbundlService.getPropertyItems(groupId);
		serviceObj.subscribe(data => {
			this.propertyItemData = data;
			});
	}
	
	onGridInsert(){
		this.propertyItemData = null;
		return { activeFlag: true };
	}
	
	onDelete = (event) => {
		console.log(event);
		let deletedRow = event[0];
		if(this.propertyItemData && this.propertyItemData.length>0) {
			this.type = 'warn';
            this.message = this.translateService.translate('oumbundle.propertyBundleCannotbeDeleted');
            this.show();
            return false;
		} else {
			return true;
		}
		
	}
	/*onGridItemInsert(){		
		//return{property}
	}*/
	
	onItemDelete = () => {
		return true;
	}
    
	submitPropertyBundles(event){
		this.propertyBundleCommitModel.insertList = [];
		this.propertyBundleCommitModel.deleteList = [];
		this.propertyBundleCommitModel.updateList = [];
		
		for (let i = 0; i< this.propertyBundleData.length-1; i++) {
            for (let j = 0; j< this.propertyBundleData.length; j++) {
					if(j!==i && this.propertyBundleData[i].groupId === this.propertyBundleData[j].groupId){
						this.type = 'warn';
            			this.message = this.translateService.translate('oumbundle.cannotcreatepropertywithsamecodename');
            			this.show();
            			//this.propertyBundleData.push(added);
            			return;
					}
			}
		}
		this.propertyBundleInsertList = event.added;
		this.propertyBundleUpdateList = event.updated;
		this.propertyBundleDeleteList = event.removed;
		if (this.propertyBundleInsertList.length > 0) {
			for (let i = 0; i < this.propertyBundleInsertList.length; i++) {
				this.propertyBundleInsertList[i].activeFlag = 'Y';
                this.propertyBundleInsertList[i].createUserId = this.sessionManager.getId();
                this.propertyBundleInsertList[i].modifyUserId = this.sessionManager.getId();
                this.propertyBundleInsertList[i].createDateTime = DateFormat.getDate();
                this.propertyBundleInsertList[i].modifyDateTime = DateFormat.getDate();
			}
		}
		if(this.propertyBundleUpdateList.length > 0){
			for (let i = 0; i < this.propertyBundleUpdateList.length; i++) {
				if(this.propertyBundleUpdateList[i].activeFlag) {
					this.propertyBundleUpdateList[i].activeFlag = 'Y';
				} else {
					this.propertyBundleUpdateList[i].activeFlag = 'N';
				}
				this.propertyBundleUpdateList[i].createUserId = this.sessionManager.getId();
                this.propertyBundleUpdateList[i].modifyUserId = this.sessionManager.getId();
                this.propertyBundleUpdateList[i].createDateTime = DateFormat.getDate();
                this.propertyBundleUpdateList[i].modifyDateTime = DateFormat.getDate();
			}
		}
		
		
		this.propertyBundleCommitModel.insertList = this.propertyBundleInsertList;
		this.propertyBundleCommitModel.deleteList = this.propertyBundleDeleteList;
		this.propertyBundleCommitModel.updateList = this.propertyBundleUpdateList;
		
		const propertyBundleData = this.oumbundlService.updatePropertyBundles(this.propertyBundleCommitModel);
			propertyBundleData.subscribe(saveResult => {
				if(saveResult > 0){
					this.type = 'success';
            			this.message = this.translateService.translate('oumbundle.propertyBundleUpdatedSuccessfully');
            			this.show();
            			this.fetchPropertyGroup();
				}
				});
		}
	
	
	submitPropertyBundlesItem(event){
		this.propertyItemsCommitModel.insertList = [];
		this.propertyItemsCommitModel.deleteList = [];
		this.propertyItemsCommitModel.updateList = [];
		this.propertyItemsInsertList = event.added;
		this.propertyItemsUpdateList = event.updated;
		this.propertyItemsDeleteList = event.removed;
		
		if (this.propertyItemsInsertList.length > 0) {
			for (let i = 0; i < this.propertyItemsInsertList.length; i++) {
				this.propertyItemsInsertList[i].groupId = this.selectedGroupId;
				this.propertyItemsInsertList[i].receivedFrom = 'OFF';
                this.propertyItemsInsertList[i].createUserId = this.sessionManager.getId();
                this.propertyItemsInsertList[i].modifyUserId = this.sessionManager.getId();
                this.propertyItemsInsertList[i].createDateTime = DateFormat.getDate();
                this.propertyItemsInsertList[i].modifyDateTime = DateFormat.getDate();
			}
		}
		if (this.propertyItemsUpdateList.length > 0) {
			for (let i = 0; i < this.propertyItemsUpdateList.length; i++) {
				this.propertyItemsUpdateList[i].receivedFrom = 'OFF';
                this.propertyItemsUpdateList[i].createUserId = this.sessionManager.getId();
                this.propertyItemsUpdateList[i].modifyUserId = this.sessionManager.getId();
                this.propertyItemsUpdateList[i].createDateTime = DateFormat.getDate();
                this.propertyItemsUpdateList[i].modifyDateTime = DateFormat.getDate();
			}
		}
		
		this.propertyItemsCommitModel.insertList = this.propertyItemsInsertList;
		this.propertyItemsCommitModel.deleteList = this.propertyItemsDeleteList;
		this.propertyItemsCommitModel.updateList = this.propertyItemsUpdateList;
		
		const propertyItemsData = this.oumbundlService.updatePropertyItems(this.propertyItemsCommitModel);
			propertyItemsData.subscribe(saveResult => {
				if(saveResult > 0){
					this.type = 'success';
            			this.message = this.translateService.translate('oumbundle.propertyBundleUpdatedSuccessfully');
            			this.show();
            			this.fetchPropertyGroup();
				}
				});
	}
	
	
	expiryDateGenerator = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (!event.newValue) {
                rowdata.data = { expiryDate: new Date() }
            } else {
                rowdata.data = { expiryDate: null }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
	
	 show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
	
	}