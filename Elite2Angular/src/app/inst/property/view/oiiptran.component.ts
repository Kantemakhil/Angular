import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiiptranService } from '../service/oiiptran.service';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';
import { OffenderPptyItemTxns } from '@instproperty/OffenderPptyItemTxns';
import { VPropertyHeaderBlock } from '@commonbeans/VPropertyHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { Images } from '@common/beans/Images';

@Component({
    selector: 'app-oiiptran',
    templateUrl: './oiiptran.component.html'
})

export class OiiptranComponent implements OnInit {
    activeFlag: string;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offpiData: OffenderPptyItems[] = [];
    offpiDataTemp: OffenderPptyItems[] = [];
    offpiModel: OffenderPptyItems = new OffenderPptyItems();
    selectedOffender: OffenderPptyItems = new OffenderPptyItems();
    vHeaderBlockModel: VPropertyHeaderBlock;
    offpiIndex: number;
    offpiInsertList: OffenderPptyItems[] = [];
    offpiUpdatetList: OffenderPptyItems[] = [];
    offpiDeleteList: OffenderPptyItems[] = [];
    itmtxData: OffenderPptyItemTxns[] = [];
    itmtxDataTemp: OffenderPptyItemTxns[] = [];
    itmtxModel: OffenderPptyItemTxns = new OffenderPptyItemTxns();
    itmtxIndex: number;
    itmtxInsertList: OffenderPptyItemTxns[] = [];
    itmtxUpdatetList: OffenderPptyItemTxns[] = [];
    itmtxDeleteList: OffenderPptyItemTxns[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    offPiColumnDef: any[];
    itmTxColumnDef: any[];
    offPiReadOnly: boolean;
    itmTxReadOnly: boolean;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    offPitemsIndex = -1;
    receivedOption: any[] = [];
    typeOption: any[] = [];
    colorOption: any[] = [];
    conditionOption: any[] = [];
    facilityOption: any[] = [];
    locationOption: any[] = [];
    cameraButton: boolean;
    imagesModel: Images = new Images();
    constructor(private oiiptranFactory: OiiptranService,
        private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService, private osiosearchService: OsiosearService, private dialogService: DialogService) {
        this.offPiColumnDef = [];
        this.itmTxColumnDef = [];
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.cameraButton = true;
        this.offpiIndex = 0;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.offPiColumnDef = [
            {
                fieldName: this.translateService.translate('oiiptran.received'), field: 'receivedFrom', editable: false,
                options: this.receivedOption, datatype: 'select', width: 150
            },
            {
                fieldName: this.translateService.translate('oiiptran.type'), field: 'propertyType', editable: false,
                options: this.typeOption, datatype: 'select', width: 100
            },
            {
                fieldName: this.translateService.translate('oiiptran.description'), field: 'propertyDescription',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oiiptran.color'), field: 'color',
                options: this.colorOption, datatype: 'select', editable: false, width: 100
            },
            {
                fieldName: this.translateService.translate('oiiptran.condition'), field: 'conditionCode',
                options: this.conditionOption, datatype: 'select', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oiiptran.value'), field: 'propertyValue', editable: false, width: 150,
                datatype: 'number', required: false, format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('oiiptran.size'), field: 'propertySize',
                editable: false, width: 150, datatype: 'text'
            },

            { fieldName: this.translateService.translate('oiiptran.make'), field: 'make', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiiptran.serialnumber'), field: 'serialNo', editable: false, width: 100 },
            { fieldName: this.translateService.translate('oiiptran.quantity'), field: 'quantity', editable: false, width: 100 },
            {
                fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'agyLocId',
                options: this.facilityOption, datatype: 'select', editable: false, width: 250
            },
            {
                fieldName: this.translateService.translate('oiiptran.location'), field: 'dspDescription',
                datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oiiptran.image'), field: 'imageFlag', datatype: 'checkbox',
                editable: false, width: 150
            },
        ];
        this.itmTxColumnDef = [
            {
                fieldName: this.translateService.translate('oiiptran.datetime'), field: 'make', editable: false, width: 200
            },
             { fieldName: this.translateService.translate('oiiptran.action'), field: 'actionCode', editable: false, width: 200 },
            { fieldName: this.translateService.translate('oiiptran.actionreason'), field: 'actionReason', editable: false, width: 200 },
            { fieldName: this.translateService.translate('common.status'), field: 'toStatusCode', editable: false, width: 200 },
           
            { fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: false, width: 200 },
            { fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'agyLocId', editable: false, width: 250 },
            { fieldName: this.translateService.translate('oiiptran.userid'), field: 'createUserId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiiptran.person'), field: 'disposedToPerson', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiiptran.agency'), field: 'disposedToCorpName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oiiptran.disposedtooffender'), field: 'disposedToOffenderFlag',
                datatype: 'checkbox', editable: false, width: 150
            },
            
        ];
        const recievedList = this.oiiptranFactory.findReceivedList();
        recievedList.subscribe(list => {
            list.forEach(listval => {
                this.receivedOption.push({ 'id': listval, 'text': listval });
            });
        });
        const typeList = this.oiiptranFactory.findTypeList();
        typeList.subscribe(list => {
            list.forEach(listval => {
                this.typeOption.push({ 'id': listval, 'text': listval });
            });
        });
        const colorList = this.oiiptranFactory.findColorList();
        colorList.subscribe(list => {
            list.forEach(listval => {
                this.colorOption.push({ 'id': listval, 'text': listval });
            });
        });
        const conditionList = this.oiiptranFactory.findConditionList();
        conditionList.subscribe(list => {
            list.forEach(listval => {
                this.conditionOption.push({ 'id': listval, 'text': listval });
            });
        });
        const facilityList = this.oiiptranFactory.findFacilityList();
        facilityList.subscribe(list => {
            list.forEach(listval => {
                this.facilityOption.push({ 'id': listval, 'text': listval });
            });
        });
        const locationList = this.oiiptranFactory.findagyLocationList();
        locationList.subscribe(list => {
            list.forEach(listval => {
                this.locationOption.push({ 'id': listval, 'text': listval });
            });
        });
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    onOffenderChange(offender) {
        this.offpiData = [];
        this.itmtxData = [];
        this.vHeaderBlockModel = offender;
       // this.cameraButton = false;
        if (offender) {
            this.oiiptranexecuteQuery();
        } else {
            this.offpiData = [];
            this.itmtxData = [];
        //    this.cameraButton = false;
        }
    }
    onRowClickoffpi(event) {
        if (event) {
            this.selectedOffender = event;
            this.offpiIndex = this.offpiData.indexOf(this.selectedOffender);
            this.itmtxModel = new OffenderPptyItemTxns();
            if (this.selectedOffender.offenderBookId || this.selectedOffender.propertyItemSeq) {
                this.itmtxModel.offenderBookId = this.selectedOffender.offenderBookId;
                this.itmtxModel.propertyItemSeq = this.selectedOffender.propertyItemSeq;
            }
            this.oiiptranPopulateDetails();
        }
    }
    onRowClickitmtx(event) {
    }
    oiiptranexecuteQuery() {
        this.offpiModel = new OffenderPptyItems();
        this.offpiModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.oiiptranFactory.offPiExecuteQuery(this.offpiModel);
        serviceObj.subscribe(offpiResultList => {
            if (offpiResultList.length === 0) {
                this.cameraButton = true;
            } else {
                this.cameraButton = false; 
                for (let i = 0; i < offpiResultList.length; i++) {
                    offpiResultList[i].confirmFlag = offpiResultList[i].confirmFlag === 'N' ? false : true;
                }
                this.offpiData = offpiResultList;
                this.offpiModel = this.offpiData[0];
                this.itmtxModel = new OffenderPptyItemTxns();
                this.itmtxModel.offenderBookId = this.offpiModel.offenderBookId;
                this.itmtxModel.propertyItemSeq = this.offpiModel.propertyItemSeq;
                this.offPitemsIndex = 0;
                this.oiiptranPopulateDetails();
            }
        });
    }

    oiiptranPopulateDetails() {
        if (this.itmtxModel.offenderBookId && this.itmtxModel.propertyItemSeq) {
            const serviceObj = this.oiiptranFactory.itmTxExecuteQuery(this.itmtxModel);
            serviceObj.subscribe(itmtxResultList => {
                if (itmtxResultList.length === 0) {
                    this.cameraButton = true;
                } else {
                    for (let i = 0; i < itmtxResultList.length; i++) {
                        itmtxResultList[i].disposedToOffenderFlag = itmtxResultList[i].disposedToOffenderFlag === 'Y' ? true : false;
                    }
                    this.itmtxData = itmtxResultList;
                    this.itmtxModel = this.itmtxData[0];
                    this.cameraButton = false;
                }
            });
        }
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    CallFormImage() {
        this.cameraButton = true;
            if (this.offpiModel.offenderBookId) {
                const captureImageData = this.osiosearchService.captureImageProcedure();
                captureImageData.subscribe(captureImage => {
                    if (captureImage === 'OIUIMAGE') {
                        this.oiiptranFactory.imagesDataTemp.imageObjectId = this.selectedOffender.offenderBookId;
                        this.oiiptranFactory.imagesDataTemp.imageObjectType = 'PPTY';
                        this.oiiptranFactory.imagesDataTemp.imageViewType = this.selectedOffender.propertyType;
                        this.oiiptranFactory.imagesDataTemp.imageObjectSeq = this.selectedOffender.propertyItemSeq;
                        this.oiiptranFactory.imagesDataTemp.orientationType = this.selectedOffender.propertyType;
                        this.oiiptranFactory.imagesDataTemp.screenName='OIIPTRAN'
                        this.dialogService.openLinkDialog('/propertyimagedialog', this.oiiptranFactory.imagesDataTemp, 80).subscribe(result => {
                            this.oiiptranexecuteQuery();
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
