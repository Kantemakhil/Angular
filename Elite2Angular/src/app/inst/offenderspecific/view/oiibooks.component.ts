import {
	Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiibooksService } from '../service/oiibooks.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderBookings } from '../../demographics-biometrics/beans/OffenderBookings';
import { FormAccessibleForms } from '@instSecurityThreatGroupsbeans/FormAccessibleForms';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { Router } from '@angular/router';



@Component({
	selector: 'app-oiibooks',
	templateUrl: './oiibooks.component.html'
})

export class OiibooksComponent implements OnInit {
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	offbooksData: OffenderBookings[] = [];
	offbooksModel: OffenderBookings = new OffenderBookings();
	bookdetailData: FormAccessibleForms[] = [];
	bookdetailDataTemp: FormAccessibleForms[] = [];
	bookdetailModel: FormAccessibleForms = new FormAccessibleForms();
	routerChild: any[] = [];
	editable: boolean = true;
	offBooksColumnDef: any[];
	bookDetailColumnDef: any[];
	vHeaderBlockModel: VTrustHeader = new VTrustHeader();
	vHeaderBlockObject: VTrustHeader = new VTrustHeader();
	tableIndex: number;
	routerpath: string[] = [];
	isButtonSwitched: boolean = false;
	disableSwitchButton: boolean;
	type: string;
	message: string;
	constructor(private oiibooksFactory: OiibooksService, public translateService: TranslateService, public sessionManager: UserSessionManager, private router: Router, private offenderSearchService: OffenderSearchService, private dialogService: DialogService,) {
		this.offBooksColumnDef = [];
		this.bookDetailColumnDef = [];
	}

	ngOnInit() {
		const routerComponets = this.router.config;
		this.routerpath = routerComponets.map(ele => ele.path);
		this.isButtonSwitched = false;
		this.disableSwitchButton = true;
		this.offBooksColumnDef = [
			{ fieldName: this.translateService.translate('oiibooks.intakenumber'), field: 'bookingNo', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('common.begindate'), field: 'bookingBeginDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('common.enddate'), field: 'bookingEndDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('oiibooks.activeFacility'), field: 'activeFlag', editable: false, width: 150, datatype: 'checkbox' },
			{ fieldName: this.translateService.translate('oiibooks.activeAgency'), field: 'communityActiveFlag', editable: false, width: 150, datatype: 'checkbox' },
		];
		this.bookDetailColumnDef = [
			{ fieldName: this.translateService.translate('oiibooks.screen'), field: 'description', editable: true, width: 150 },
			{ fieldName: this.translateService.translate('common.data'), field: 'chkData', editable: false, width: 150, datatype: 'checkbox' },
			{
				fieldName: '', field: 'Go', datatype: 'launchbutton', editable: false, width: 150,
				modal: true, updateField: 'row', onLaunchClick: this.viewLaunchClick, isDisable: this.disableCell,
				data: 'row'

			},



		];
		routerComponets.filter(ele => {
			if (ele.children && Array.isArray(ele.children)) {
				return true;
			} else {
				return false;
			}
		}).forEach(ele => ele.children.forEach(data => this.routerChild.push(data.path)));
		this.routerpath.push(...this.routerChild);

	}


	validateRow = () => {
		const rowdata = new ValidateRowReturn();
		return rowdata;
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
	onRowClickoffbooks(event) {

		if (event) {
			this.offbooksModel = event;
			const rowIndex = this.offbooksData.indexOf(event);
			if (rowIndex == 0) {
				this.bookdetailExecuteQuery();
			}


		}
	}


	onOffenderChange(offender) {
		if (offender) {
			this.vHeaderBlockModel = offender;
			if (!this.isButtonSwitched)
				this.offbooksExecuteQuery();
		} else {
			this.offbooksData = [];
			this.bookdetailData = [];
			this.disableSwitchButton = true;
		}
	}
	offbooksExecuteQuery() {
		this.offbooksModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
		const offbooksResult = this.oiibooksFactory.
			offBooksExecuteQuery(this.offbooksModel);
		offbooksResult.subscribe(offbooksResultList => {
			if (offbooksResultList.length === 0) {
				this.offbooksData = [];
				this.disableSwitchButton = true;
			} else {

				offbooksResultList.forEach(element => {
					element.activeFlag = element.activeFlag === 'Y' ? true : false;
					element.communityActiveFlag = element.communityActiveFlag === 'Y' ? true : false;
				});
				this.offbooksData = offbooksResultList;
				this.offbooksModel = offbooksResultList[0];
				this.tableIndex = 0;
				this.disableSwitchButton = false;
			}
		});
	}
	bookdetailExecuteQuery() {
		this.bookdetailModel.bookId = this.vHeaderBlockModel.offenderBookId;
		this.bookdetailModel.offenderId = this.vHeaderBlockModel.offenderId;

		const bookdetailResult = this.oiibooksFactory.
			bookDetailExecuteQuery(this.bookdetailModel);
		bookdetailResult.subscribe(bookdetailResultList => {
			if (bookdetailResultList.length === 0) {
				this.bookdetailData = [];
			} else {

				bookdetailResultList.forEach(element => {
					element.chkData = element.chkData === 'Y' ? true : false;
					element.Go = this.translateService.translate('oiibooks.go');
					if (element.chkData) {

					}
				});


				this.bookdetailData = bookdetailResultList;
				this.bookdetailModel = bookdetailResultList[0];


			}
		});
	}
	viewLaunchClick = (data) => {
		const offbooksResult = this.oiibooksFactory.
			checkFormAccess(data);
		offbooksResult.subscribe(previlagedata => {

			if (!(previlagedata[0]) || previlagedata.length === 0) {
				this.show(this.translateService.translate('oiibooks.displayalert'), 'warn');
			} else {

				data.destinationForm = previlagedata[0];


				const childScreen = this.routerChild.includes(data.destinationForm) ? true : false;
				const parentScreen = this.routerpath.includes(data.destinationForm) ? true : false;
				const suffix = this.routerChild.includes(data.destinationForm) ? 'DIALOG' : '';
				data['offenderBookId'] = this.vHeaderBlockModel.offenderBookId;
				data['offenderId'] = this.vHeaderBlockModel.offenderId;
				data['rootOffenderId'] = this.vHeaderBlockModel.rootOffenderId;

				if (!childScreen && !parentScreen) {
					this.show(this.translateService.translate('oiibooks.developmentScope'), 'warn');
				}
				else if (suffix !== 'DIALOG') {

					this.dialogService.openLinkDialog(data.destinationForm, data, 80).subscribe(result => {

					});

				} else {

					this.router.navigate(['/' + data.destinationForm]);
				}
				return false;

			}
		});
	}

	disableCell = (data: any, index: number): boolean => {
		if (!data.chkData) {
			return true;
		} else {
			return false;
		}
	}
	onButSwitchclick = () => {
		this.isButtonSwitched = true;
		if (this.vHeaderBlockModel.offenderBookId != this.offbooksModel.offenderBookId) {
			this.vHeaderBlockObject.bookingNo = this.offbooksModel.bookingNo;
			this.vHeaderBlockObject.offenderBookId = this.offbooksModel.offenderBookId;
			const bookdetailResult = this.oiibooksFactory.
				onButSwitchclick(this.vHeaderBlockObject);
			bookdetailResult.subscribe(bookdetailResultList => {
				this.vHeaderBlockModel = bookdetailResultList;
				this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
				this.isButtonSwitched = false;
				this.bookdetailExecuteQuery();
			});
		}





	}

}
