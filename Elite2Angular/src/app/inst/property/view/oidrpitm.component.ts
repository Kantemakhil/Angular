import {
    Component,
    OnInit
} from '@angular/core';
import { OidrpitmService } from '../service/oidrpitm.service';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OffenderPptyItemsCommitBean } from '@instproperty/OffenderPptyItemsCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { ActivatedRoute } from '@angular/router';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
    selector: 'app-oidrpitm',
    templateUrl: './oidrpitm.component.html'
})

export class OidrpitmComponent implements OnInit {
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offpiData: OffenderPptyItems[] = [];
    offpiDataTemp: OffenderPptyItems[] = [];
    offpiModel: OffenderPptyItems = new OffenderPptyItems();
    offpiIndex = -1;
    offpiInsertList: OffenderPptyItems[] = [];
    offpiUpdatetList: OffenderPptyItems[] = [];
    offpiDeleteList: OffenderPptyItems[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    offpiCommitModel: OffenderPptyItemsCommitBean = new OffenderPptyItemsCommitBean();
    syspflIndex: number;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    display: boolean;
    disabled: boolean;
    editable: boolean;
    offPiColumnDef: any[];
    offPiReadOnly: boolean;
    sysPflReadOnly: boolean;
    cg$ctrlReadOnly: boolean;
    rgcolorRg: any[] = [];
    offRecForm: any;
    rgcondnRg: any[] = [];
    cgfkOffpireceivedfromRg: any[] = [];
    cgfkOffpipropertytypeRg: any[] = [];
    offBkId: any;
    addfalg: boolean;
    enableUpdate: boolean;
    enableDelete: boolean;
    imageModel: Images = new Images();
    cameraButton: boolean;
    constructor(private oidrpitmFactory: OidrpitmService, private sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService,
        private osiosearchService: OsiosearService,
         private osiosearService: OsiosearService,
         public translateService: TranslateService,
         private activatedRoute: ActivatedRoute,
         private injectOffenderService: InjectOffenderService, private dialogService: DialogService) {
    }
    onGridReady(event) {
    }

    ngOnInit() {
        this.cameraButton = true;
        this.enableUpdate = true;
        this.enableDelete = true;
            this.activatedRoute.queryParams.subscribe(params => {
            let offenderid = +params['offenderId'];
                 if (offenderid) {
                             let vHead = new VHeaderBlock();
                             vHead.offenderId = offenderid;
                             vHead.agyLocId = this.sessionManager.currentCaseLoad;
                             this.offenderSearchService.selectedOffender = undefined;
                             const offbkGlobal = this.osiosearchService.offbkgGlobalQuery(vHead);
                             offbkGlobal.subscribe(list => {
                                 if (list.length > 0) {
                                     this.vHeaderBlockModel = list[0];
                                     if ( list[0].imageId != null ) {
                                         this.imageModel.imageId = list[0].imageId;
                                         this.osiosearService.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                                             this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                                     });
                                     }
                                     this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                                     this.offpiExecuteQuery();
                                 } else {
                                     this.offenderSearchService.selectedOffender = undefined;
                                 }
                                 if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
                                     this.type = 'warn';
                                     this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                                     this.show();
                                 }
                             });
                 } else {
                     this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
                     if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
                         this.type = 'warn';
                         this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                         this.show();
                     }
                 }
             });
        this.offPiColumnDef = [
            {
                fieldName: this.translateService.translate('oiiptran.received') + '*', field: 'receivedFrom',
                editable: true, width: 150, datatype: 'lov',domain:'PPTY_REC_FRM'/* link: 'oidrpitm/cgfkOffPiReceivedFromRecordGroup'*/,
                optionWidth: 500, codeTitle: 'R/F'
            },
            {
                fieldName: this.translateService.translate('oiiptran.type') + '*', field: 'propertyType',
                editable: true, width: 150, datatype: 'lov',domain:'PPTY_TYPE'/* link: 'oidrpitm/cgfkOffPiPropertyTypeRecordGroup'*/,
                optionWidth: 350, codeTitle: 'Type'
            },
            { fieldName: this.translateService.translate('common.description') + '*', field: 'propertyDescription',
             editable: true, width: 150, datatype: 'text',  uppercase: 'false', maxlength: 40 },
            {
                fieldName: this.translateService.translate('oiiptran.color'), field: 'color',
                editable: true, width: 150, datatype: 'lov',domain:'PPTY_COLOR'/* link: 'oidrpitm/rgColorRecordGroup'*/, optionWidth: 350, codeTitle: 'Color'
            },
            {
                fieldName: this.translateService.translate('oiiptran.condition') + '*', field: 'conditionCode',
                editable: true, width: 150, datatype: 'lov',domain:'PPTY_CONDIT'/*link: 'oidrpitm/rgCondnRecordGroup'*/ , optionWidth: 300, codeTitle: 'Color'
            },
            {
                fieldName: this.translateService.translate('oiiptran.make'), field: 'make', editable: true, width: 150, datatype: 'text',
                uppercase: 'false', maxlength: 5
            },
            {
                fieldName: this.translateService.translate('oiiptran.serialnumber'), field: 'serialNo',
                editable: true, width: 150, datatype: 'text', maxlength: 12, uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('oiiptran.quantity') + '*', field: 'quantity',
                editable: true, width: 150, datatype: 'text', mask: this.getMask
            },
        ];
        const offenderRecForm = this.oidrpitmFactory.offRecForm();
        offenderRecForm.subscribe(offRecieveForm => {
            if (offRecieveForm.length === 0) {
                   this.offRecForm = null;
               } else {
               this.offRecForm = {code: offRecieveForm[0].code, description: offRecieveForm[0].description};
               }
        });
    }
    onOffenderChange(event) {
        this.offpiData = [];
        if (event) {
            this.vHeaderBlockModel = event;
            this.offBkId = this.vHeaderBlockModel.offenderBookId;
            if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
                this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
                this.vHeaderBlockModel.statusDisplay === 'Historic' ||
                this.vHeaderBlockModel.statusDisplay === null ||
                this.vHeaderBlockModel.statusDisplay === undefined) {
                this.addfalg = false;
                this.enableUpdate = false;
                this.enableDelete = false;
                this.cameraButton = true;
            } else {
                this.enableUpdate = true;
                this.enableDelete = true;
                this.addfalg = true;
                this.cameraButton = true;
            }
            this.offpiExecuteQuery();
        } else {
            this.offpiData = [];
            this.cameraButton = true;
        }
    }

    onGridInsert = () => {
        return { quantity: 1 };

    }
    offpiDataInsert = () => {
        if (this.offpiData.length > 0) {
            if (!this.offpiData[this.offpiData.length - 1].receivedFrom) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrpitm.recevicedmustbe');
                this.show();
                return;

            }
            if (!this.offpiData[this.offpiData.length - 1].propertyType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrpitm.typedmustbe');
                this.show();
                return;

            }
            if (!this.offpiData[this.offpiData.length - 1].propertyDescription) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrpitm.descriptionmustbe');
                this.show();
                return;

            }
            if (!this.offpiData[this.offpiData.length - 1].conditionCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrpitm.conditiondmustbe');
                this.show();
                return;

            }
            if (!this.offpiData[this.offpiData.length - 1].quantity) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrpitm.quanititydmustbe');
                this.show();
                return;

            }
        }
        const tempStr = 'test';
        return { quantity: 1, receivedFrom: this.offRecForm.code };
    }
    offpiExecuteQuery() {
        this.offBkId = this.vHeaderBlockModel.offenderBookId;
        this.offpiModel.offenderBookId = this.offBkId;
        this.offpiModel.statusCode = 'REGISTERED';
        this.offpiModel.agyLocId = this.sessionManager.currentCaseLoad;
        const offpiResult = this.oidrpitmFactory.
            offPiExecuteQuery(this.offpiModel);
        offpiResult.subscribe(offpiResultList => {
            if (offpiResultList.length === 0) {
                this.offpiData = [];
                this.cameraButton = true;
                return;
            } else {
                this.offpiData = offpiResultList;
                this.offpiIndex = 0;
                this.offpiModel = offpiResultList[0];
                this.cameraButton = false;
            }
        });
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    /**
	 *  This function will be executed when commit event is
	* fired
	*/
    oidrpitmSaveoffpiForm(event) {

        this.offBkId = this.vHeaderBlockModel.offenderBookId;
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic' ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrpitm.releaseoffender');
            this.show();
            return;
        }

        this.offpiInsertList = event.added;
        this.offpiDeleteList = event.removed;
        this.offpiCommitModel.insertList = [];
        this.offpiCommitModel.updateList = [];
        this.offpiCommitModel.deleteList = [];
        for (let i = 0; i < event.updated.length; i++) {
            if (!event.updated[i].propertyItemSeq) {
                this.offpiInsertList = event.updated;

            } else {
                this.offpiUpdatetList = event.updated;
            }
        }
        if (this.offpiInsertList.length > 0 || this.offpiUpdatetList.length > 0 || this.offpiDeleteList.length > 0) {
            for (let i = 0; i < this.offpiInsertList.length; i++) {
                if (this.offpiInsertList[i].confirmFlag === null || this.offpiInsertList[i].confirmFlag === undefined) {
                    this.offpiInsertList[i].confirmFlag = 'N';
                }
                this.offpiInsertList[i].statusCode = 'REGISTERED';
                this.offpiInsertList[i].offenderBookId = this.offBkId;
                this.offpiInsertList[i].createUserId = this.sessionManager.getId();
                this.offpiInsertList[i].createDatetime = new Date();
                this.offpiInsertList[i].modifyUserId = this.sessionManager.getId();
                this.offpiInsertList[i].modifyDatetime = new Date();
                this.offpiInsertList[i].agyLocId = this.vHeaderBlockModel.agyLocId;
                if (!this.offpiInsertList[i].receivedFrom) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrpitm.recevicedmustbe');
                    this.show();
                    return;
                }
                if (!this.offpiInsertList[i].propertyType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrpitm.typedmustbe');
                    this.show();
                    return;
                }
                if (!this.offpiInsertList[i].propertyDescription || this.offpiInsertList[i].propertyDescription.trim().length === 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrpitm.descriptionmustbe');
                    this.show();
                    return;
                }
                if (!this.offpiInsertList[i].quantity) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrpitm.quanititydmustbe');
                    this.show();
                    return;
                }

                if (!this.offpiInsertList[i].conditionCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrpitm.conditiondmustbe');
                    this.show();
                    return;
                }
            }
            for (let i = 0; i < this.offpiUpdatetList.length; i++) {
                if (!this.offpiUpdatetList[i].propertyDescription || this.offpiUpdatetList[i].propertyDescription.trim().length === 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrpitm.descriptionmustbe');
                    this.show();
                    return;
                }
            }
        }
            this.offpiCommitModel.deleteList = this.offpiDeleteList;
            this.offpiCommitModel.insertList = this.offpiInsertList;
            this.offpiCommitModel.updateList = this.offpiUpdatetList;
            const offpiSaveData = this.oidrpitmFactory.offPiCommit(this.offpiCommitModel);
            offpiSaveData.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.offpiExecuteQuery();

                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    this.offpiExecuteQuery();
                }
            });

    }
    /**
         * This function displays the ssn format
         */
    getMask = (index, col, data) => {
        if (data) {
            return {
                mask: [/\d/, /\d/, /\d/, /\d/],
                placeholderChar: ' '
            };
        }
    }
    /**
     * event is fired when click on row in the grid.
     * @param event
     */
    onRowClickEvent(event) {
        if (event) {
            this.offpiModel = new OffenderPptyItems();
            this.offpiModel = event;
        }

    }
    CallFormImage() {
        this.cameraButton = true;
        if (this.offpiModel.offenderBookId) {
            const captureImageData = this.osiosearchService.captureImageProcedure();
            captureImageData.subscribe(captureImage => {
                if (captureImage === 'OIUIMAGE') {
                    this.oidrpitmFactory.imagesDataTemp.imageObjectId = this.offpiModel.offenderBookId;
                    this.oidrpitmFactory.imagesDataTemp.imageObjectType = 'PPTY';
                    this.oidrpitmFactory.imagesDataTemp.imageViewType = this.offpiModel.propertyType;
                    this.oidrpitmFactory.imagesDataTemp.imageObjectSeq = this.offpiModel.propertyItemSeq;
                    this.oidrpitmFactory.imagesDataTemp.orientationType = this.offpiModel.propertyType;
                    this.oidrpitmFactory.imagesDataTemp.pptyDescription = this.offpiModel.pptyDescription;
                    this.dialogService.openLinkDialog('/oiuimagedialog', this.oidrpitmFactory.imagesDataTemp, 80).subscribe(result => {
                        this.cameraButton = false;
                    });
                }  else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidpiden.pleasecreate');
                    this.show();
                    this.cameraButton = false;
                    return;
                    }
                });
                }
            }
}
