import { GridApi } from '@ag-grid-enterprise/all-modules';
import { FileUploadCommitBean } from './../beans/FileUploadCommitBean';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TranslateService } from '@common/translate/translate.service';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { EoffenderService } from "./service/eoffender.service";
import { DialogService } from '@ui-components/dialog/dialog.service';
import { EoffenderDetails } from "../beans/EoffenderDetails";
import { EoffenderDocumentRequest } from "../beans/EoffenderDocumentRequest";
import { EoffenderTemplate } from "../beans/EoffenderTemplate";
import { saveAs } from 'file-saver';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { Fileupload } from "../beans/Fileupload";
import { Purpose } from "../../core/ui-components/button/purpose";
import { DatePipe } from '@angular/common';
import { MetaData } from "../beans/MetaData";
import { ActivatedRoute } from '@angular/router';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { SigndocService } from './service/signdoc.service';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { DocumentService } from '@core/ui-components/document-editor/document.service';
import { IWPPaneService } from '@core/ui-components/pane/iwppane.service';

@Component({
	selector: 'eoffender',
	templateUrl: './eoffender.component.html',
	styleUrls: ['./eoffender.component.scss'],
})
export class EoffenderComponent implements OnInit, OnDestroy {
	@ViewChild('documentGrid', { static: false }) documentGrid: any;
	dataModifiedInterval: any;
	documentMap: Map<string, string> = new Map<string, string>();
	documentName: string;
	http: any;
	type = 'error';
	msglist = [];
	message = ' Invalid.';
	msgs: any[] = [];
	eoffenderDocs: any = [];
	eOffenderDocsList: Fileupload[] = [];
	selectedEoffDoc:Fileupload=new Fileupload();
	private innerSearchParams: any = {};
	keyLogin: string = '';
	baseTemplateUrl: string = 'eoffender/getTemplates/';
	getTemplates: string = this.baseTemplateUrl;
	//templates: string =   getTemplates;  //'eoffender/getTemplates/OCDAMEND/9310';
	vHeaderBlockModel: VHeaderBlock;
	eOffenderDetailsVal: EoffenderDetails[] = [];
	eoffenderDocUpdateList: Fileupload[] = [];

	eoffenderDocCommitModel: FileUploadCommitBean = new FileUploadCommitBean();
	eOffenderTemplate: EoffenderTemplate[] = [];
	templateName: string;
	result: string;
	isShowGenerateIcon: boolean;
	eOffenderDetails: EoffenderDetails = new EoffenderDetails();
	eoffenderDocumentRequest: EoffenderDocumentRequest = new EoffenderDocumentRequest();
	metaDataInfo: MetaData[] = [];
	isShowMetaData: boolean;
	metaDataTitle: string;
	metaDataScreen: string = 'Document MetaData';
	moduleDescription: string;
	position = "right";
	screenId: string;
	lastActivatedScreenId: any;
	showHeader: boolean;
	isIncorrectToken: boolean = false;
	isUploadBtn: boolean = true;
	isTemplateList: boolean = false;
	btnTitle: string;
	finalbBtnTitle: string;
	generateDocumentparam: any;
	moduleName: string;
	objectId: string;
	templateList: any;
	allTemplateList: any;
	watcherConfigured: any;
	isGenerateBlock = false;
	showGridIcons = true;
	// ----------------
	greetings: string[] = [];
	showConversation: boolean = false;
	ws: any;
	name: string;
	disabled: boolean;
	backBtn: boolean;
	docEditInNewTab: boolean = false;
	title: any;
	paneTitle: any;
	commentText: String;
	deleteDoc = false;
	deleteDocRole=false;
	enhDelDocRole=false;
	constructor(private router: Router, private activatedRoute: ActivatedRoute, public translateService: TranslateService,
		private offenderSearchService: OffenderSearchService,
		private sessionManager: UserSessionManager,
		private signDocService: SigndocService,
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer, private eoffenderService: EoffenderService,
		public dialogService: DialogService, private redirectUtil: RedirectUtil, private datePipe: DatePipe,
		private documentService: DocumentService,
		public oumsysetService: OumsysetService,
		private iwpPaneService: IWPPaneService) {

	}

	ngOnDestroy() {
		if (this.dataModifiedInterval) {
			clearInterval(this.dataModifiedInterval);
		}
		if (!this.router.url.includes('/EDITDOC') && !this.router.url.includes('/SIGNDOC')) {
			this.eoffenderService.selectedRowData = null;
		}
	}

	ngOnInit() {
		this.getEliteDocInfo();
		this.commentText=undefined;
		this.eoffenderService.selectedTemplateType = null;
		this.deleteDocRole=false;
	    this.enhDelDocRole=false;
		this.templateList = [];
		this.getStaffEliteDocDeleteRoles();
		this.activatedRoute.queryParams.subscribe(params => {
			let screen;
			if (params.childScreen) {
				screen = params.childScreen;
				this.lastActivatedScreenId = params.lastActivatedScreen;
			}
			else {
				screen = params['SCREEN'];
			}
			if (screen == undefined || screen == 'OCIDOCUM') {

				this.showHeader = true;
				this.moduleName = 'OCIDOCUM';
				this.eoffenderService.moduleName = this.moduleName;
				this.getUserModuleAccess('OCIDOCUM');
				this.paneTitle = this.translateService.translate('eoffender.offenderalldoc');
				this.backBtn = false;
				this.screenId = this.moduleName.toUpperCase();
				this.prepareColDef();
				this.documentService.docObjectType = this.screenId;
				this.eoffenderService.showHeader = this.showHeader;
				this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
				this.getTemplateList();
				if (this.vHeaderBlockModel.offenderBookId) {
					this.getDocumentList();
				}
			}
			else if (screen) {
				this.getUserModuleAccess('EOFFENDER');
				this.paneTitle = this.translateService.translate('eoffender.offenderdoc');
				this.prepareColDef();
				this.backBtn = true;
				this.moduleName = screen;
				this.eoffenderService.moduleName = screen;
				if (this.moduleName.search('_')) {
					var str = this.moduleName.split('_');
					this.moduleName = str[0];
					this.eoffenderService.moduleName = this.moduleName;
					this.screenId = this.moduleName.toUpperCase();
				}
				if (this.moduleName.search('~')) {
					var str = this.moduleName.split('~');
					this.moduleName = str[0];
					this.eoffenderService.moduleName = this.moduleName;
					this.screenId = this.moduleName.toUpperCase();
					var showInmateHeader = str[1];
					if (str.length > 2 && str[2] != null) {
						this.objectId = str[2];
						// this.objectId=this.objectId.replace("/","_");
						this.eoffenderService.objectId = this.objectId;
					} else if (str != null && str.length == 2) {
						this.objectId = null;
						this.eoffenderService.objectId = this.objectId;
					} else {
						this.objectId = this.eoffenderService.objectId;
					}
					if (showInmateHeader == "false") {
						this.showHeader = false;
						this.paneTitle = this.translateService.translate('eoffender.documents');
						this.eoffenderService.showHeader = this.showHeader;
					} else if (showInmateHeader == "true") {
						this.showHeader = true;
						this.eoffenderService.showHeader = this.showHeader;
						this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
					} else if (!this.eoffenderService.showHeader) {
						this.showHeader = false;
					} else {
						this.showHeader = true;
						this.eoffenderService.showHeader = this.showHeader;
					}
				} else {
					this.screenId = this.moduleName;
				}


				this.documentService.docObjectType = this.screenId;
				this.getTemplates = this.baseTemplateUrl + this.moduleName;
				this.getTemplateList();
				this.getDocumentList();
			}
		});

		this.eoffenderService.getEditedDocNotification.subscribe(notification => {
			if (notification === 'SUCCESS') {
				this.type = 'warn';
				this.message = "File Edited successfully";
				this.show();
				this.getDocumentList();
			} else if (notification === 'ERROR') {
				this.type = 'warn';
				this.message = "File could not edited due to server error";
				this.show();
			}
		});

		this.eoffenderService.getWatcherInfo().subscribe(watcherInfo => {
			this.watcherConfigured = watcherInfo['profileValue'];
		});


		//this.sessionManager.userSessionDetails().eoffenderDetails.templateType="";
		/*this.eOffenderDetails = this.sessionManager.userSessionDetails().eoffenderDetails;
		if(this.eOffenderDetails == undefined){
			this.isIncorrectToken = true;
			this.type  =  'warn';
			this.message  =  this.translateService.translate('eoffender.incorrectToken');
			this.show();
			return;
		}*/
		//this.moduleName = "OCDCCASE";
		this.isShowGenerateIcon = true;
		//var moduleName = this.eOffenderDetails.moduleName;

		if (this.moduleDescription == null) {
			this.metaDataTitle = this.metaDataScreen + " - " + this.screenId;
		} else {
			this.metaDataTitle = this.metaDataScreen + " - " + this.moduleDescription;
		}
		if (this.eOffenderDetails.userRole == 'read') {
			this.isShowGenerateIcon = false;
			this.isUploadBtn = false;
			this.isTemplateList = true;
		}
		if (this.eOffenderDetails.moduleName == "OCIDOCUM") {
			this.isShowGenerateIcon = false;
			this.isUploadBtn = true;
			this.isTemplateList = true;
		}


		/*if ( this.sessionManager.userSessionDetails().selectedOffender == null || this.sessionManager.userSessionDetails().selectedOffender == undefined ) {

			this.offenderSearchService.selectedOffenderObservable.subscribe( selectedOffender => {
				if ( this.vHeaderBlockModel == undefined || this.vHeaderBlockModel == null ) {
					this.vHeaderBlockModel = selectedOffender;
					this.sessionManager.userSessionDetails().selectedOffender = this.vHeaderBlockModel;
					this.eOffenderDetails.offenderBookingNo = this.vHeaderBlockModel.bookingNo;
					this.eOffenderDetails.offenderId = this.vHeaderBlockModel.offenderId;
					this.eOffenderDetails.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
					this.getTemplates = "";
					this.getTemplates = this.baseTemplateUrl + moduleName + '/' + this.sessionManager.userSessionDetails().id.toUpperCase() + '/';

					this.getDocumentList();
				}
			} );
		} else {*/
		//this.getTemplates = "";


		//}

		this.getMetadataofScreens();
        this.getSpellCheckLangId();
		this.eoffenderService.messageObservable.subscribe(message => {
			this.type = this.eoffenderService.msgType ? this.eoffenderService.msgType : 'warn';
			this.message = message;
			this.show();
			this.eoffenderService.msgType = undefined;
		});

		/* Refreshing the grid data  after action performed by  action buttons */
		this.eoffenderService.rowUpdateObservable.subscribe(gridUpdate => {
			// this.eOffenderDocsList = [];
			this.getDocumentList();
		});

		/* Refreshing the grid data after action perform by other tabs */
		//this.dataModifyWatcher();
	}
	prepareColDef() {
		this.eoffenderDocs = [
			{
				fieldName: this.translateService.translate('eoffender.doctype'), field: 'documentType', datatype: 'text',
				editable: false, width: 220
			},
			{
				fieldName: this.translateService.translate('eoffender.view'), field: 'image', datatype: 'hyperlink', displayas: 'image', onLaunchClick: this.downloadDocument,
				editable: false, data: 'row', updateField: 'row', width: 80, label: 'fileTypeLabel'
			},
			{
				fieldName: this.translateService.translate('eoffender.docid'),
				field: 'documentId', datatype: 'text', editable: false, width: 200
			},
			{
				fieldName: this.translateService.translate('eoffender.objectType'),
				field: 'moduleDescription', datatype: 'text', editable: false, width: 200
			},
			/*  {
			   fieldName: this.translateService.translate('eoffender.view'),
			   field: 'viewButton', datatype: 'hyperlink',displayas: 'image',
			   editable: false ,width: 100, modal: true,
			   data: 'row',updateField: 'row',imageTitleField:'downloadBtnTitle',onLaunchClick:this.downloadDocument
			   }, 
			   */
			{
				fieldName: this.translateService.translate('eoffender.docname'),
				field: 'documentName', datatype: 'text', maxlength: '250', editable: true, width: 400,
				required: true, uppercase: 'false', cellEditable: this.canDocumentNameEdit
			},
			{
				fieldName: this.translateService.translate('eoffender.author'),
				field: 'documentAuthor', datatype: 'text', editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('eoffender.createDate'),
				field: 'crtDate', datatype: 'text', editable: false, width: 200
			},
			{
				fieldName: this.translateService.translate('eoffender.modifyDate'),
				field: 'modifiedDate', datatype: 'text', editable: false, width: 200
			},
			{
				fieldName: this.translateService.translate('eoffender.status'),
				field: 'statusdesc', datatype: 'text', editable: false, width: 150
			},
			{
				fieldName: this.translateService.translate('common.edit'),
				field: 'checkoutButton', datatype: 'hyperlink', displayas: 'image',
				editable: false, linkField: 'checkoutBtnLink', width: 100, modalField: 'checkoutBtnModal', dialogWidth: '80%',
				data: 'row', updateField: 'row', imageTitleField: 'checkoutBtnTitle', modal: true,
				onLaunchClick: this.manageDocTemplate
			},


			{
				fieldName: this.translateService.translate('eoffender.signature'),
				field: 'signatureButton', datatype: 'hyperlink', displayas: 'image',
				editable: false, linkField: 'signatureBtnLink', width: 100, modalField: 'signatureBtnModal', dialogWidth: '80%',
				data: 'row', updateField: 'row', imageTitleField: 'signatureBtnTitle', modal: true, onLaunchClick: this.onSignClick
			},
			{
				fieldName: this.translateService.translate('eoffender.Finalised'),
				field: 'secButton', datatype: 'hyperlink', displayas: 'image',
				editable: false, link: '/final', width: 100, modal: true,
				data: 'row', updateField: 'row', imageTitleField: 'finalBtnTitle'
			},
			
			{
                fieldName: '', field: 'commentText', hide: true
            },


		];


		setTimeout(() => {
			if (this.screenId == 'OCIDOCUM') {
				this.documentGrid.gridColumnApi.applyColumnState({
					state: [{ colId: 'moduleDescription', hide: false }],
				});
			} else {
				this.documentGrid.gridColumnApi.applyColumnState({
					state: [{ colId: 'moduleDescription', hide: true }],
				});
			}
		}, 10)


	}

	downloadDocument = (data) => {
		let documentId;
		if (data.documentId && data.documentId != null) {
			documentId = data.documentId;
		}
		const documentStatus = this.eoffenderService.viewDocument(documentId);
		documentStatus.subscribe(result => {
			// this.saveToFileSystem( result,data.templateName );
			if ((!data.image.includes('word_file') && !data.image.includes('doc_file')) || data.status == 'SIGNED' || data.status == 'COMPLETED') {
				this.saveToFileSystem(result, data);
				return;
			}
			if (result.size > 0) {
				//this.message = this.translateService.translate('File Downloaded successfully');
				//this.eoffenderService.showMessage = this.message;
				this.documentService.mode = 'RESTRICT';
				this.documentService.templateDoc = result;
				this.documentService.currentScreen = 'OCIDOCUM';
				
				this.redirectUtil.redirectToEditor();
			} else {
				this.message = this.translateService.translate('Unable to Download File');
				this.eoffenderService.showMessage = this.message;
			}
		});
	}
	getUserModuleAccess(moduleName) {
		const moduleAccess = this.eoffenderService.getUserModuleAccess(moduleName, this.sessionManager.userSessionDetails().id.toUpperCase());
		moduleAccess.subscribe(value => {
			if (value && value === 'Q') {
				this.showGridIcons = false;
				this.isGenerateBlock = false;
				/* for(let i=0;i<this.eOffenderDocsList.length;i++){

				} */
			} else {
				this.showGridIcons = true;
				this.isGenerateBlock = true;
			}

		});
	}
	getTemplateList() {
		const templateListSubs = this.eoffenderService.getTemplateList(this.moduleName, this.sessionManager.userSessionDetails().id.toUpperCase(), null);
		templateListSubs.subscribe(value => {
			this.templateList = value;
			this.allTemplateList = value;
			this.documentService.templateList = value;
			if (this.moduleName == 'OCIDOCUM') {
				this.getAllTemplateList();
			}

		});
	}

	getAllTemplateList() {
		const templateListSubs = this.eoffenderService.getTemplateList('ALL_OFF_DOC', this.sessionManager.userSessionDetails().id.toUpperCase(), null);
		templateListSubs.subscribe(value => {
			this.allTemplateList = value;
			this.documentService.templateList = value;
		});
	}
	saveEoffenderDocs(event) {
		this.eoffenderDocUpdateList = [];
		this.eoffenderDocUpdateList = event.updated;
		if (this.eoffenderDocUpdateList.length > 0) {
			this.eoffenderDocUpdateList.forEach(obj => {
				if (obj.documentName) {
					obj.documentName = obj.documentName.concat(obj["__fileExt"]);
				}
			})
		}
		this.eoffenderDocCommitModel.updateList = this.eoffenderDocUpdateList;
		const updateDocName = this.eoffenderService.documentDataUpdate(this.eoffenderDocCommitModel);
		updateDocName.subscribe(inResult => {
			if (inResult === 1) {
				this.showMessage(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.getDocumentList();
				return;
			} else {
				this.showMessage(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
				return;
			}
		});
	}

	getEliteDocInfo() {
		let addPayload = {
			settingProviderCode: "ELITE_DOC",
			settingType: "EliteDoc"
		};
		this.oumsysetService.loadJsonData(addPayload).subscribe((result) => {
			const rowData = JSON.parse(result.settingValue);
			if (rowData && rowData.length > 0) {
				for (let i = 0; i < rowData.length; i++) {
					if (rowData[i].KEY_CODE == "ENABLE_NEWTAB" && rowData[i].VALUE == "Y") {
						this.docEditInNewTab = true;
					}
				}
			}
		});
	}

	// dataModifyWatcher() {
	//     let that = this;
	//     that.dataModifiedInterval = setInterval(function () {
	//         let modify = JSON.parse(localStorage.getItem('modified'))
	//         if (modify && modify === true) {
	//             that.getDocumentList();
	//             localStorage.removeItem('modified');
	//         }
	//     }, 1000);
	// }


	manageDocTemplate = (data) => {
		if (this.docEditInNewTab) {
			this.newTabNext(data)
			return;
		}

		let documentId;
		if (data.documentId && data.documentId != null) {
			documentId = data.documentId;
		}
		const documentStatus = this.eoffenderService.viewDocument(documentId)
		documentStatus.subscribe(result => {
			this.documentService.templateDoc = result;
			this.documentService.templateName = data.templateName;
			this.documentService.templateType = data.objectType;
			this.documentService.docId = documentId;
			this.documentService.docName = data.documentName;
			this.documentService.mode = 'EDIT';
			this.documentService.currentScreen = this.screenId;
			this.redirectUtil.redirectToEditor();
		}, error => {
			this.documentService.templateName = data.templateName;
			this.documentService.templateId = data.documentId;
		});

	}

	newTabNext(event) {
		let url = window.location.href;
		url = url.split('#')[0];
		let bUrl = url + '/#' + '/EDITDOC';
		//let bUrl = this.eoffenderService.getBaseUrl() + '/#' + '/EDITDOC';
		let eoffenderDetails = this.sessionManager.userSessionDetails().eoffenderDetails;
		let selectedOffender = this.vHeaderBlockModel;

		let storedInfo = {
			"event": event,
			"eoffenderDetails": eoffenderDetails,
			"selectedOffender": selectedOffender,
			"currentScreen": this.screenId,
			"templateList": this.allTemplateList,
			"mode": 'EDIT',
			"languageId":this.eoffenderService.languageId
		}
		localStorage.setItem('storedInfo', JSON.stringify(storedInfo))
		window.open(bUrl);
	}

	completeButtonClick = (event) => {
		const index = this.eOffenderDocsList.indexOf(event);
		const documentStatus = this.eoffenderService.getCompletedStatusResult(event.documentId);
		documentStatus.subscribe(result => {
			if (result == "SUCCESS") {
				this.result = result;
				this.showMessage(this.translateService.translate('eoffender.completed'), 'success');
				this.documentGrid.setColumnData('statusdesc', index, 'COMPLETED');
				this.documentGrid.setColumnData('completeButton', index, 'completed');

				this.documentGrid.setColumnData('signatureButton', index, null);
			} else {
				this.showMessage(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
				this.eoffenderService.showMessage = this.message;
			}
		});
	}

	disableCompleteButton = (data: any, index: number): boolean => {
		if (data.statusdesc === 'COMPLETED') {
			return true;
		}
		return false;
	}

	onOffenderChange(offender) {
		this.eoffenderService.selectedTemplateType = null;
		this.eOffenderDocsList = [];
		this.vHeaderBlockModel = offender;
		this.commentText=undefined;
		if (offender) {
			if(this.moduleName === 'OCIDOCUM'){
				this.getUserModuleAccess('OCIDOCUM');
			}else{
				this.getUserModuleAccess('EOFFENDER');
			}
			
			this.getDocumentList();
		} else {
			this.isGenerateBlock = false;
			
		}
	}
	isReadOnly(event) {
        if (event && event.length > 0) {
            return false;
        }
        return true;
	}
	
	onRowClickDocument(event) {
        if (event) {
			this.deleteDoc=false;
			this.selectedEoffDoc = event;
			if((event.status == 'PUBLIC' ||event.status=='SIGNED') && (this.deleteDocRole || this.enhDelDocRole)){
			  this.deleteDoc=true;
			}else if(event.status == 'FROZEN' && this.enhDelDocRole){
				this.deleteDoc=true;
			}
			this.commentText=this.selectedEoffDoc.commentText;
        }
	}
	onGridDelete = (event) => {
		if (event) {
			this.dialogService.openLinkDialog('/deleteDocDialog', this.selectedEoffDoc, 50).subscribe(result => {
				if (result) { 
                   this.getDocumentList();
				}
			});
		}
		return false;
	  }
	onCommentBlur() {
        const index = this.eOffenderDocsList.indexOf(this.selectedEoffDoc);
        this.documentGrid.setColumnData('commentText', index, this.commentText);

    }
	generateDocumentDialog() {
		this.dialogService.openLinkDialog('/generateDialog', this.generateDocumentparam, 80).subscribe(result => {
			if (result) { }
		});
	}

	//    generateDialogParam() {
	//        this.generateDocumentparam = "" + new Date().getMilliseconds();
	//        return this.generateDocumentparam;
	//    }

	getDocumentList() {
		this.eoffenderDocumentRequest = new EoffenderDocumentRequest();
		if (this.vHeaderBlockModel && this.objectId) {
			this.eoffenderDocumentRequest.offenderBookingId = this.vHeaderBlockModel.offenderBookId;
			this.eoffenderDocumentRequest.objectId = this.objectId;
		}
		else if (this.vHeaderBlockModel) {
			this.eoffenderDocumentRequest.objectId = "";
			this.eoffenderDocumentRequest.offenderBookingId = this.vHeaderBlockModel.offenderBookId;
		} else {
			this.eoffenderDocumentRequest.objectId = this.objectId;
		}
		this.eoffenderDocumentRequest.moduleName = this.moduleName;
		const documentList = this.eoffenderService.getDocumentList(this.eoffenderDocumentRequest);
		documentList.subscribe(response => {
			if (response != null) {
				var temp = response;
				for (let i = 0; i < response.length; i++) {
					let doc: Fileupload = temp[i];
					let docName = doc.documentName;
					doc["__fileExt"] = this.getExtension(docName);
					doc.documentName = this.removeExtension(docName);
					doc.image = this.extensionImage(docName);
					doc.statusImage = this.getStatusIcon(doc.status);
					doc.fileTypeLabel = this.documentType(doc["__fileExt"]);
					doc.moduleName = this.eOffenderDetails.moduleName;
					let ext = doc.fileTypeLabel;
					if (doc.createdDate != null) {
						doc.crtDate = DateFormat.format(doc.createdDateAsDate); //this.transformDate(date);
					} else {
						doc.createdDate = null;
					}
					doc.modifiedDate = DateFormat.format(doc.modifiedDateAsDate);
					// if(doc.modifiedDate != null){
					//     doc.crtDat = doc.createdDate; //this.transformDate(date);
					// }else{
					//     doc.createdDate=null;
					// }
					///== && this.sessionManager.userRoles == 'full'

					if (temp.length > 0) {
						//for ( let i = 0; i < temp.length; i++ ) {
						temp[i].signButton = 'assets/icons/eoff_icons/FingerPrint.png';
						temp[i].viewButton = 'assets/icons/eoff_icons/download_24x24.png';
						if (temp[i].signatureAccess == 'Y' && temp[i].status !== 'FROZEN' && ['.docx', '.Docx', '.doc', '.DOC', '.DOCX', '.pdf'].includes(doc["__fileExt"])) {
							temp[i].signatureButton = 'assets/icons/eoff_icons/FingerPrint.png';
						}

						if (temp[i].signedDoc) {
							temp[i].image = 'assets/icons/eoff_icons/pdf_file_25x25.png';
						}
						temp[i].documentIdQuery = doc.documentId.replace("/", "~") + "," + doc.documentType + "," + doc.uri;
						if (temp[i].status == 'PUBLIC') {
							if (ext == 'Pdf File') {
								temp[i].button = '';
							} else {
								temp[i].button = 'assets/icons/eoff_icons/edit_24x24_sm.png';
							}
							temp[i].active = Purpose.PRIMARY;
							temp[i].secButton = 'assets/icons/eoff_icons/final_24x24.png'
							temp[i].btnTitle = this.translateService.translate("eoffender.editfile");
							temp[i].finalBtnTitle = this.translateService.translate("eoffender.finalfile");
							temp[i].checkoutBtnTitle = this.translateService.translate("eoffender.checkoutFile");
							if (temp[i]?.image?.includes('word_file') || temp[i]?.image?.includes('doc_file')) {
								temp[i].checkoutBtnLink = '/checkout';
								temp[i].checkoutButton = 'assets/icons/eoff_icons/edit_24x24_sm.png';
							}
							temp[i].checkoutBtnModal = true;
							temp[i].statusIconLabel = temp[i].status;
						}
						if (temp[i].status == 'PRIVATE') {
							temp[i].button = 'assets/icons/eoff_icons/cancel_24x24.png';
							temp[i].active = Purpose.PRIMARY;
							temp[i].secButton = '';
							temp[i].btnTitle = this.translateService.translate("eoffender.cancelfile");
							temp[i].statusIconLabel = temp[i].status;
							temp[i].checkoutBtnTitle = this.translateService.translate("eoffender.checkinFile");
							if (temp[i].image.includes('word_file')) {
								temp[i].checkoutBtnLink = '/checkout';
							}
							temp[i].checkoutBtnModal = false;
							temp[i].checkoutButton = 'assets/icons/eoff_icons/edit_24x24_sm.png';
						}
						if (temp[i].status == 'FROZEN') {
							temp[i].statusIconLabel = this.translateService.translate("eoffender.finalStatus");
							/* if(temp[i].signatureAccess == 'Y'){
							  temp[i].signatureButton = 'assets/icons/eoff_icons/FingerPrint.png';
							  temp[i].completeButton = 'complete';
							  
							} */

							temp[i].statusdesc = temp[i].status;
						} else if (temp[i].status == 'READY FOR SIGN' || temp[i].status == 'SIGNED') {
							temp[i].secButton = 'assets/icons/eoff_icons/final_24x24.png'
							temp[i].finalBtnTitle = this.translateService.translate("eoffender.finalfile");
							temp[i].statusdesc = temp[i].status;
						} else {
							temp[i].statusdesc = temp[i].status;
						}
					}
					//}
					temp[i] = doc;
				}
				this.eOffenderDocsList = temp;
				this.selectedEoffDoc=this.eOffenderDocsList[0];
				if (!this.showGridIcons) {
					this.eOffenderDocsList.forEach(obj => {
						obj['secButton'] = '';
						obj['signButton'] = '';
						obj['signatureButton'] = '';
						obj['checkoutButton'] = '';

					})
				}
			}

		});

		//this.getTemplates = "";
		//this.eOffenderDetails = this.sessionManager.userSessionDetails().eoffenderDetails;
		//this.eOffenderDetails.offenderBookingNo = this.sessionManager.userSessionDetails().selectedOffender.bookingNo; // this.vHeaderBlockModel.bookingNo;
		//this.getTemplates = this.baseTemplateUrl + this.eOffenderDetails.moduleName + '/' + this.eOffenderDetails.userId.toUpperCase() + '/' +this.eOffenderDetails.trimUser;

	}


	onSignClick = (event) => {
		this.signDocService.signDocRequiredInfo = {
			documentID: event.documentId,
			fileType: 'doc',
		}
		var fileName = event.documentName + '.pdf';
		this.signDocService.fileName = fileName;
		if ((event.__fileExt && event.__fileExt == ".pdf") || event.status == 'SIGNED') {
			this.signDocService.signDocRequiredInfo.fileType = 'pdf'
		}
		this.redirectUtil.redirectToSignDoc();
	}

	getExtension(fileName) {
		var lastDotPosition = fileName.lastIndexOf(".");
		var documentType = fileName.substr(lastDotPosition, fileName.length);
		return documentType;
	}


	canDocumentNameEdit = (data: any, index: number, field: string) => {
		if (field === 'documentName' && data.status !== 'SIGNED' && data.status !== 'FROZEN') {
			return true;
		}
		return false;
	}


	getMetadataofScreens() {
		if (this.eOffenderDetails.objectId !== null) {
			const metadata = this.eoffenderService.getScreenMetaData(this.eOffenderDetails);
			metadata.subscribe(value => {
				if (value.length > 0) {
					this.metaDataInfo = value;
					this.isShowMetaData = true;
				} else {
					this.isShowMetaData = false;
				}
			});
		}
	}


	createDocumentTypeMap() {
		this.documentMap.set('Office Open XML Document', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
		this.documentMap.set('DOTX File', 'application/vnd.openxmlformats-officedocument.wordprocessingml.template');
		this.documentMap.set('Adobe Acrobat Document', 'application/pdf');
		this.documentMap.set('DOC File', 'application/msword');
		this.documentMap.set('Png File', 'image/png');
		this.documentMap.set('Jpg File', 'image/jpg');
		this.documentMap.set('Jpeg File', 'image/jpeg');
		this.documentMap.set('Bmp File', 'image/bmp');
		this.documentMap.set('Gif File', 'image/gif');
		this.documentMap.set('Tiff File', 'image/tiff');
		this.documentMap.set('Tif File', 'image/tif');
		this.documentMap.set('Mp4 File', 'image/mp4');
	}

	openUploadDocDialog() {
		this.iwpPaneService.objectId = this.objectId;
		this.redirectUtil.redirectToUploadDoc(this.screenId);
	}

	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}

	makeDocument() {
		this.eOffenderDetails = new EoffenderDetails();
		if (this.vHeaderBlockModel != undefined && this.vHeaderBlockModel != null) {
			this.eOffenderDetails.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
			this.eOffenderDetails.lastName = this.vHeaderBlockModel.lastName;
			this.eOffenderDetails.firstName = this.vHeaderBlockModel.firstName;
			this.eOffenderDetails.middleName = this.vHeaderBlockModel.middleName;
			this.eOffenderDetails.birthDate = this.vHeaderBlockModel.birthDate;
			this.eOffenderDetails.offenderBookId = this.vHeaderBlockModel.offenderBookId;
			if(this.objectId){
				this.eOffenderDetails.objectId =Number(this.objectId);
			}
		} else if (this.eoffenderService.objectId) {
			this.eOffenderDetails.objectId = Number(this.eoffenderService.objectId);
			this.eOffenderDetails.objectType = this.moduleName;
		}
		if (this.templateName == null) {
			this.type = 'warn';
			this.message = this.translateService.translate('Please select template');
			this.show();
			return;
		}
		const documentName = this.eoffenderService.generateDocumentName(this.eOffenderDetails, this.templateName);
		documentName.subscribe(document => {
			this.documentName = document.documentName;
			this.generateDocumentparam = document.temproaryDocumentId + "-" + this.screenId;
			if (this.watcherConfigured && this.watcherConfigured === 'Y') {
				this.generateDocumentDialog();
			}
			this.eoffenderDocumentRequest.objectData = this.eoffenderService.selectedRowData;
			this.eoffenderDocumentRequest.docDetails = this.eOffenderDetails;
			const createDocumentResponse = this.eoffenderService.createEoffenderDocument(this.eoffenderDocumentRequest, this.generateDocumentparam);
			createDocumentResponse.subscribe((response) => {
				if (!this.watcherConfigured || this.watcherConfigured === 'N') {
					this.documentService.generatedDocBlob = response;
					this.documentService.templateName = this.templateName;
					this.documentService.generatedDocName = this.documentName;
					this.documentService.currentScreen = this.screenId;
					this.documentService.docName = this.documentName;
					this.documentService.mode = 'GENERATE';
					this.redirectUtil.redirectToEditor();
				}
			});
		}
		);
	}

	onOptionChange(event) {
		//this.launchBtn.disabled = false;
		//this.sessionManager.userSessionDetails().eoffenderDetails.templateType = event.code;
		this.eoffenderDocumentRequest.templateName = event.templateId;
		this.eoffenderDocumentRequest.templateType = event.code;
		this.eoffenderDocumentRequest.templateId = event.templateId;
		this.eoffenderService.selectedTemplateType = event.code;
		if (event.isGenTemplate == "FALSE") {
			this.isShowGenerateIcon = false;
			this.type = 'warn';
			this.message = this.translateService.translate('Template body is not attached with this template');
			this.show();
			return;
		} else {
			this.isShowGenerateIcon = true;
		}

	}

	saveToFileSystem(response, data) {
		if (response.status == 204) {
			this.type = 'warn';
			this.message = this.translateService.translate('Unsupported File Type');
			this.eoffenderService.showMessage = this.message;
			return;
		}
		if (response.size == 0) {
			this.type = 'warn';
			this.message = this.translateService.translate('No response');
			this.eoffenderService.showMessage = this.message;
			return;
		}
		if (data.documentName.includes('doc') || data.documentName.includes('docx') || data.documentName.includes('pdf')) {
			this.title = this.removeExtension(data.documentName);
		} else {
			this.title = data.documentName;
		}
		let file = response;
		var documentName;
		var fileURL = URL.createObjectURL(file);
		if (navigator.userAgent.indexOf('.NET4') != -1 || navigator.userAgent.indexOf('rv:11') != -1) {
			documentName = this.title + this.getExtensionFromImage(data, response.type);
		} else {
			documentName = this.title + this.getExtensionFromImage(data, response.type);
		}


		saveAs(response, documentName);
	}

	removeExtension(filename) {
		var lastDotPosition = filename.lastIndexOf(".");
		if (lastDotPosition === -1) return filename;
		else return filename.substr(0, lastDotPosition);
	}

	getExtensionFromImage(data, Type) {
		let imageUrl = data.image;
		let status = data.status;
		if (status == 'SIGNED' || status == 'COMPLETED' || data.signedDoc) {
			return '.pdf';
		}
		return data['__fileExt'];

	}

	extensionImage(fileName) {
		var lastDotPosition = fileName.lastIndexOf(".");
		var documentType = fileName.substr(lastDotPosition, fileName.length);
		documentType = documentType.toLowerCase();
		if (documentType == '.docx' || documentType == 'DOTX File' || documentType == 'Office Open XML Document') {
			return 'assets/icons/eoff_icons/word_file_25x25.png';
		} else if (documentType == 'Adobe Acrobat Document' || documentType == '.pdf') {
			return 'assets/icons/eoff_icons/pdf_file_25x25.png';
		} else if (documentType == '.doc' || documentType == 'application/msword') {
			return 'assets/icons/eoff_icons/doc_file_25x25.png';
		} else if (documentType == '.png' || documentType == 'image/png') {
			return 'assets/icons/eoff_icons/jpg_file_25x25.png';
		} else if (documentType == '.jpg' || documentType == 'image/jpg') {
			return 'assets/icons/eoff_icons/jpg_file_25x25.png';
		} else if (documentType == '.jpeg' || documentType == 'image/jpeg') {
			return 'assets/icons/eoff_icons/jpg_file_25x25.png';
		} else if (documentType == '.bmp' || documentType == 'image/bmp') {
			return 'assets/icons/eoff_icons/jpg_file_25x25.png';
		} else if (documentType == '.gif' || documentType == 'image/gif') {
			return 'assets/icons/eoff_icons/jpg_file_25x25.png';
		} else if (documentType == '.tiff' || documentType == 'image/tiff') {
			return 'assets/icons/eoff_icons/jpg_file_25x25.png';
		} else if (documentType == '.tif' || documentType == 'image/tif') {
			return 'assets/icons/eoff_icons/jpg_file_25x25.png';
		} else if (documentType == '.xls' || documentType == '.xlsx') {
			return 'assets/icons/eoff_icons/excel_icon.png';
		} else if (documentType == '.rtf') {
			return 'assets/icons/eoff_icons/rtf-file.png';
		} else if (documentType == '.txt') {
			return 'assets/icons/eoff_icons/txt-file.png';
		}  else if (documentType == '.msg') {
			return 'assets/icons/eoff_icons/msg-file.png';
		}else if (documentType == '.svg') {
			return 'assets/icons/eoff_icons/svg.png';
		}else if (documentType == '.html') {
			return 'assets/icons/eoff_icons/html_icon.png';
		}else {
			return 'assets/icons/eoff_icons/download_24x24.png';
		}
	}

	documentType(documentType) {
		if (documentType == '.docx' || documentType == 'Office Open XML Document') {
			return 'Docx File';
		} else if (documentType == 'Adobe Acrobat Document' || documentType == '.pdf') {
			return 'Pdf File';
		} else if (documentType == '.doc' || documentType == 'application/msword') {
			return 'Doc File';
		} else if (documentType == '.jpg' || documentType == 'image/jpg') {
			return 'Jpg File';
		} else if (documentType == '.jpeg' || documentType == 'image/jpeg') {
			return 'Jpeg File';
		} else if (documentType == '.bmp' || documentType == 'image/bmp') {
			return 'Bmp File';
		} else if (documentType == '.png' || documentType == 'image/png') {
			return 'Png File';
		} else if (documentType == '.bmp' || documentType == 'image/bmp') {
			return 'Bmp File';
		} else if (documentType == '.tiff' || documentType == 'image/tiff') {
			return 'Tiff File';
		} else if (documentType == '.tif' || documentType == 'image/tif') {
			return 'Tif File';
		} else if (documentType == '.gif' || documentType == 'image/gif') {
			return 'Gif File';
		}
		else if (documentType == 'rtf') {
			return 'Rtf File';
		} else if (documentType == 'txt') {
			return 'Txt File';
		} else if (documentType == 'msg') {
			return 'Msg File';
		} else if (documentType == 'svg') {
			return 'Svg File';
		} else if (documentType == 'html') {
			return 'HTML File';
		}else if (documentType == 'xls' || documentType == 'xlsx') {
			return 'Excel File';
		}
	}

	getStatusIcon(status) {
		if (status == "Checked Out") {
			return 'assets/icons/eoff_icons/checkedout_24x24.png';
		} else if (status == "PUBLIC") {
			return 'assets/icons/eoff_icons/checkedin_24x24.png';
		} else if (status == "FROZEN") {
			return 'assets/icons/eoff_icons/finalized_24x24.png';
		}
	}

	transformDate(value: string) {
		var datePipe = new DatePipe("en-US");
		return datePipe.transform(value, 'dd/MM/yyyy hh:mm:ss a');
	}
	openGenerateDialog() {
		//this.downloadDocument();
		this.redirectUtil.redirectToGenerateDialog();
	}

	onbackBtnClick() {
		if (this.lastActivatedScreenId) {
			this.router.navigate(['/' + this.lastActivatedScreenId]);
		}
		else {
			this.router.navigate(['/' + this.screenId]);
		}
	}

	// --------------------

	showMessage(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}
	getSpellCheckLangId(){
        this.eoffenderService.getSpellCheckLangId().subscribe(result=>{
			if(result){
				this.eoffenderService.languageId=result;
			}
        });
	}
	getStaffEliteDocDeleteRoles() {
		this.eoffenderService.getStaffEliteDocDeleteRoles().subscribe(data => {
		  if (data) {
			data.forEach(ele => {
			  if (ele.roleCode === 'DEL_EDOC') {
				this.deleteDocRole = true;
			  } else if (ele.roleCode === 'ENH_DEL_EDOC') {
				this.enhDelDocRole = true;
			  }
			})
		  }
		});
	  }
}
