import { OcmteamMainService } from './../service/ocmteamMain.service';
import { Teams } from '@inst/casemanagement/beans/Teams';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { TeamsCommitBean } from '../beans/TeamsCommitBean';


@Component({
	selector: 'app-teamDailog',
	templateUrl: './teamDialog.component.html'
})
export class teamDialogComponent implements OnInit {
	@ViewChild('teamDialog', { static: true }) dialog: DialogComponent;
	teamModel: Teams = new Teams();
	teamModelSaveData: Teams = new Teams();
	teamData : Teams = new Teams();
	teamsCommitModel: TeamsCommitBean = new TeamsCommitBean();
	public fields: Object = { text: 'description', value: 'code' };
	public roleLovFields: Object = { text: 'roleName', value: 'roleId' };
	public waterMark: string = 'User Group Access';
	public default: string = 'CheckBox';
	public placeholder: string = 'Case Load Access';
	mode: any;
	clrBtnFlag = false;
	readonly = false;
	msgs: any;
	agyLocList = new Array<any>();
	agyLovData: Map<string, string> = new Map<string, string>();

	functionLovData: Map<string, string> = new Map<string, string>();
	savedisabled: boolean;
	emailRefCodeData = [];
	constructor(
		public translateService: TranslateService,
		public sessionManager: UserSessionManager,
		public dialogService: DialogService,
		private ocmteamMainService: OcmteamMainService
	) {

	}
	ngOnInit() {
		this.getEmailRefCode();
		this.savedisabled = false;
		this.mode = 'CheckBox';
		/* const areaData = this.ocmteamMainService.getAgyLocRecords();
		areaData.subscribe(data => {
			if (data.length === 0) {
			} else {
				this.agyLovData = data;
			}
			this.loadFunctionLovData();
		}); */
		this.readonly=false;
		this.loadDailogData()

	}

	getEmailRefCode(){
		this.ocmteamMainService.getEmailRefCode().subscribe(data => {
			if (data && data.length > 0) {
				for(let i=0;i<data.length;i++){
                   if(data[i]['description']){
					this.emailRefCodeData.push(data[i]['description'].toUpperCase());
				   }
				}
			}
		})
	}

	loadFunctionLovData() {
		const functionData = this.ocmteamMainService.getFunctioTypeRecords();
		functionData.subscribe(data => {
			if (data.length === 0) {
			} else {
				this.functionLovData = data;
			}

			this.loadDailogData()

		})
	}


	loadDailogData() {
		if (this.dialog.data) {
			this.agyLovData=this.dialog.data.agyLocData;
		    this.functionLovData=this.dialog.data.functionLovData;
			if (this.dialog.data.teamId) {
				this.teamModel = this.dialog.data;
				this.teamModel.agyLocList = this.dialog.data.agyLocList;
				this.teamModel.functionList = this.dialog.data.functionList;
				this.teamData = JSON.parse(JSON.stringify(this.teamModel));
                if(this.teamModel.activeFlag){
                    this.readonly=false;
				}else{
					this.readonly=true;
				}
				
			}else {
				this.dialog.data =this.teamModel;
				this.dialog.data.activeFlag = true;
				this.teamModel = this.dialog.data;
				this.teamData = JSON.parse(JSON.stringify(this.teamModel));
			}
		} 
	}
	onButExitclick() {
		this.dialog.close(false);
	}
	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}
	onAgencyChange(event) {
		if (event) {
			this.teamModel.agyLocList = event;
		}

	}
	onFunctionChange(event) {
		if (event) {
			this.teamModel.functionList = event;
		}

	}
	onSave() {
		if (!this.teamDataValidation()) {
			return;
		}
		this.teamsCommitModel.insertList = [];
		this.teamModel.activeFlag = this.teamModel.activeFlag ? 'Y' : 'N';
		this.teamModel.createUserId = this.sessionManager.getId();
		this.teamModel.modifyUserId = this.sessionManager.getId();
		this.teamModel.createDatetime = DateFormat.getDate();
		this.teamModel.modifyDatetime = DateFormat.getDate();
		this.teamModel.teamEmail = this.teamModel.teamEmail;
		this.teamModelSaveData = JSON.parse(JSON.stringify(this.teamModel));
		this.teamsCommitModel.insertList[0] = this.teamModelSaveData;
		if (this.teamModel.activeFlag === 'N') {
			this.teamModel.activeFlag = undefined;
		}
		if (!this.savedisabled) {
			this.savedisabled = true;
			const teamSave = this.ocmteamMainService.teamDataCommit(this.teamsCommitModel);
			teamSave.subscribe(data => {
				if (data) {
					this.teamModel = data[0];
					this.show('common.addupdateremoverecordsuccess', 'success');
					this.dialog.close(true);
				} else {
					this.show('common.addupdateremoverecordfailed');
				}

			})
		}

	}

	onClear() {
		this.teamModel = JSON.parse(JSON.stringify(this.teamData));
		this.teamModel['teamEmail'] = '';
	}

	teamDataValidation() {
		if (!this.teamModel.teamCode) {
			this.show(this.translateService.translate('ocmteams.teamcodemandatory'), 'warn');
			return false;
		}
		if (!this.teamModel.description) {
			this.show(this.translateService.translate('ocmteams.teamnamemandatory'), 'warn');
			return false;
		}
		if ((!this.teamModel.agyLocList) || this.teamModel.agyLocList.length <= 0) {
			this.show(this.translateService.translate('ocmteammain.teamAgyLocmandatory'), 'warn');
			return false;
		}
		if ((!this.teamModel.functionList) || this.teamModel.functionList.length <= 0) {
			this.show(this.translateService.translate('ocmteammain.teamFuncmandatory'), 'warn');
			return false;
		}

		let isEmailMandatory = true;
		if(this.teamModel.teamEmail === undefined || this.teamModel.teamEmail === null || this.teamModel.teamEmail.trim() === ''){
            isEmailMandatory = false;
		}

		if(isEmailMandatory && !this.validateEmail(this.teamModel.teamEmail)){
			this.show(this.translateService.translate('ocmteammain.validemail'), 'warn');
			return false;
		}
		if(isEmailMandatory && !this.emailRefCodeData.includes(this.teamModel.teamEmail.split('@')[1].toUpperCase())){
			this.show(this.translateService.translate('ocmteammain.invaliddomain'), 'warn');
			return false;
		}
		return true;
	}

	onActiveFlagChange(event) {
		if (event && event.checked) {
			this.teamModel.expiryDate = undefined;
		} else if (event && !event.checked) {
			this.teamModel.expiryDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
		}

	}

	get teamIdDisbaleFlag() {
		if(this.teamData.createDatetime){
			return true;
		}
		return false;
	  }

	   validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	  };

}