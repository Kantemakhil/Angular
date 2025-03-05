import {
    Component,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OidmpitmService } from '../service/oidmpitm.service';
import { OidrpitmService } from '../service/oidrpitm.service';
import { OffenderPptyItemsCommitBean } from '@instproperty/OffenderPptyItemsCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { InjectOffenderService } from '@core/service/inject-offender.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OiiptranService } from '../service/oiiptran.service';
@Component({
    selector: 'app-oidmpitm',
    templateUrl: './oidmpitm.component.html',
    styleUrls: ['./oidmpitm.component.scss']
})

export class OidmpitmComponent implements OnInit {

    singleSaveBtnText = this.translateService.translate('oidmpitm.saveandproceed');
    selectedGroup: any;
    type = 'error';
    msglist = [];
    msgs: any[] = [];
    message = ' Invalid.';
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offPiColumnDef: any[];
    offpiData: OffenderPptyItems[] = [];
    propetiesToContainer : OffenderPptyItems[] = [];
    offBkId: any;
    addFlag: boolean =false;
    enableUpdate: boolean;
    enableDelete: boolean;
    cameraButton: boolean;
    isEditable:boolean=true;
    offpiModel: OffenderPptyItems = new OffenderPptyItems();
    offpiIndex = -1;
    showProperties:boolean=true;
    grp1:string="Common";
    grp2:string="Jewellery";
    currentRowDataLength:number=0;
    rowDataLength:number=0;
    isDataSaved:boolean=true;
    screenTitle:any;
    showManagePropBtn:boolean=false;
    showgroups:boolean=true;
    groupsData:any[];
    isProceed:boolean=true;
    isInActive :boolean;
    addedGroups:string[]=[];
    propertyItemId=0;
    selectedOffender:any;
    offpiInsertList: OffenderPptyItems[] = [];
    offpiUpdatetList: OffenderPptyItems[] = [];
    offpiDeleteList: OffenderPptyItems[] = [];
    pyUpdatetList: OffenderPptyItems[] = [];
    offpiCommitModel: OffenderPptyItemsCommitBean = new OffenderPptyItemsCommitBean();
    showSaveAndProceed:boolean=true;
    showContainerGrid:boolean=false;
    managePropColumnDef:any[];
    showRegisteredPropGrid:boolean=false;
    showPreviousComp:boolean=false;
    imageUrl:any;
    imgSource:any;
    successResposnce:boolean=false;
    containerList:any;
    currentSelectedOffender:any;
    btnClearItems: boolean = false;
    constructor(private offenderSearchService: OffenderSearchService,
        private osiosearchService: OsiosearService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private oidmpitmFactory: OidmpitmService,
        private oidrpitmFactory: OidrpitmService,
        private oiiptranFactory: OiiptranService,
        public dialogService: DialogService, private injectOffenderService: InjectOffenderService, private activatedRoute: ActivatedRoute
    ) {
    }
    onGridReady(event) {
    }

    deleteRowTrigger = (event) => {
        this.offpiDeleteList.push(event[0]);
        this.showSaveAndProceed = true;
        this.isProceed = false;
        return true;
    }   
    
    ngOnInit() {
        this.screenTitle=this.translateService.translate('oidmpitm.registerpropertyitem');
        this.vHeaderBlockModel = new VHeaderBlock();
        this.injectOffenderService.injectOffenderInService(this.activatedRoute);
        this.populateGrid();
        this.fetchGroupData();
    }

    onOffenderChange(offender) {
        this.addedGroups=[];
        this.propetiesToContainer=[];
        this.selectedGroup = undefined;
        this.btnClearItems = false;
        this.offpiData = [];
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.vHeaderBlockModel = offender;
            this.currentSelectedOffender = JSON.parse(JSON.stringify(offender));
            this.offBkId = this.vHeaderBlockModel.offenderBookId;
            if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === '[Closed]' ||
            this.vHeaderBlockModel.statusDisplay === 'Closed' ||
            this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic' ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === undefined) {
                this.isInActive=false; 
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordsnotallowed');
                this.show();
                this.cameraButton = false;
            } else {
                this.isInActive=true;
                this.cameraButton = true;
            }
            this.offpiExecuteQuery();
        } else {
            this.offpiData = [];
            this.isProceed=true;
            this.showSaveAndProceed=true;
            this.showRegisteredPropGrid=false;
            this.propetiesToContainer=[];
            this.addedGroups=[];
        }
    }
    
    fetchGroupData() {
        const groupNames = this.oidmpitmFactory.fetchGroupData(this.sessionManager.currentCaseLoad);
        groupNames.subscribe(groupList => {
        if (groupList.length === 0) {
            
            this.offpiData = [];
            return;
        } else {
            this.groupsData=groupList;
            this.btnClearItems = false;
            for(let i=0;i<this.groupsData.length;i++) {
                if(this.groupsData[i].images && this.groupsData[i].images.length>0) {
                    this.groupsData[i].imgSource='data:image/png;base64,' +this.groupsData[i].images[0].imageThumbnail;
                }
            }
       }
    });
    }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    
    populateGrid() {
        this.offPiColumnDef = [
                               {
                                fieldName: this.translateService.translate('comp.address.select'), field: 'primaryFlag',
                                datatype: 'checkbox', editable: this.isEditable,
                                width: 150
                               },
                               {
                                fieldName: this.translateService.translate('oiiptran.type') + '*', field: 'propertyType',
                                editable: true, width: 150, datatype: 'lov',domain:'PPTY_TYPE' /*link: 'oidrpitm/cgfkOffPiPropertyTypeRecordGroup'*/,
                                optionWidth: 350, codeTitle: 'Type'
                                },      
                               { fieldName: this.translateService.translate('common.description') + '*', field: 'propertyDescription',
                                editable: true, width: 150, datatype: 'text',  uppercase: 'false', maxlength: 40 },
                                
                               {
                                fieldName: this.translateService.translate('oiiptran.quantity') + '*', field: 'quantity',
                                editable: true, width: 150, datatype: 'text', mask: this.getMask,
                               },
                               
                               {
                                fieldName: this.translateService.translate('oiiptran.received') + '*', field: 'receivedFrom',
                                editable: true, width: 150, datatype: 'lov', domain:'PPTY_REC_FRM'/* link: 'oidrpitm/cgfkOffPiReceivedFromRecordGroup'*/,
                                optionWidth: 500, codeTitle: 'R/F'
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.color'), field: 'color',
                                   editable: true, width: 150, datatype: 'lov',domain:'PPTY_COLOR'/* link: 'oidrpitm/rgColorRecordGroup'*/, optionWidth: 350, codeTitle: 'Code'
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.condition') + '*', field: 'conditionCode',
                                   editable: true, width: 150, datatype: 'lov',domain:'PPTY_CONDIT'/*' link: 'oidrpitm/rgCondnRecordGroup'*/, optionWidth: 300, codeTitle: 'Code'
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.value'), field: 'propertyValue', editable: true, width: 150,
                                   datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true
                               },
                               {   fieldName: this.translateService.translate('oiiptran.size'), field: 'propertySize',
                                   editable: true, width: 150, datatype: 'text' 
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.make'), field: 'make',
                                   editable: true, datatype: 'text', width: 150, uppercase: 'false', maxlength: 40, wrapText: true, maxWidth: 200
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.serialnumber'), field: 'serialNo',
                                   editable: true, width: 150, datatype: 'text', maxlength: 12, uppercase: 'false'
                               },
                               {
                                   fieldName: this.translateService.translate('oidmpitm.imageflag'), field: 'imagesFlag', datatype: 'checkbox',
                                   editable: false, width: 150
                               },
                               {
                                   fieldName: this.translateService.translate( 'housingview.image' ),
                                   field: 'imageUrl', styleClass: 'thumbImg', data: 'row', editable: true, width: 200, datatype: 'hyperlink',
                                   displayas: 'image'
                               }, 
                               
                               {
                                   fieldName: '',
                                   field: 'cameraLaunchButton', editable: true, width: 220,datatype:'hyperlink',link:'/CAMDLG', modal:true,
                                   data: 'row',dialogWidth: '100%', height: '80%',updateField:'row',displayas:''
                               },
                               
                           ];
    }
    
    getMask = (index, col, data) => {
        if (data) {
            return {
                mask: [/\d/, /\d/, /\d/, /\d/],
                placeholderChar: ' '
            };
        }
    }
    
    fetchPropertyForGroup(event) {
        if(!this.isInActive){
            return ;
        }
       if(this.addedGroups.includes(event.groupId, 0)) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidmpitm.selectedgroupisalreadyadded');
            this.show();
            return;
        }else{
            //this.selectedGroup = event;
            if (!this.vHeaderBlockModel) {
                this.type = 'warn';
                this.selectedGroup = undefined;
                this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                this.show();
                return;
            }else {
                this.selectedGroup = event;
                this.offpiModel.groupId = event.groupId;
                this.getDefaultValuesForSelecteGroup(event.groupId);
                return;
            }
        } 
    }
    
    getDefaultValuesForSelecteGroup(groupId) {
        this.addedGroups.push(groupId);
        this.isProceed=false;
        let temOffPidata : OffenderPptyItems[]=[];
        const values = this.oidmpitmFactory.getDefaultValuesForSelecteGroup(groupId);
        values.subscribe(resultSet => {
            if (this.offpiData.length > 0) {
                for (let i = 0; i < this.offpiData.length; i++) {
                    this.offpiData[i]['navOfCamera'] = '/oiuimagedialog';
                    this.offpiData[i]['imageObjectType'] = 'PPTY';
                    temOffPidata.push(this.offpiData[i]);
                }
                this.offpiData = temOffPidata;
            } else {
                this.btnClearItems = false;
                this.offpiData = [];
            }
            for (let i = 0; i < resultSet.length; i++) {
                this.propertyItemId = this.propertyItemId + 1;
                resultSet[i].propertyItemId = this.propertyItemId;
                resultSet[i].dataFlag = "N";
                resultSet[i].primaryFlag = true;
                resultSet[i]['imageObjectType'] = 'PPTY';
                resultSet[i]['navOfCamera'] = '/oiuimagedialog';
                this.offpiData.push(resultSet[i]);
            }
            if(this.offpiData.length>0){
                this.isProceed=false;
                this.btnClearItems = true;
            }else{
                this.btnClearItems = false;
                this.isProceed=true;
            }
        });
        if(this.offpiData.length>0){
            this.isProceed=false;
        }else{
            this.isProceed=true;
        }
    }
    
    offpiExecuteQuery() {
        this.offpiData=[];
        this.propetiesToContainer=[];
        this.offBkId = this.vHeaderBlockModel.offenderBookId;
        this.offpiModel.offenderBookId = this.offBkId;
        this.offpiModel.statusCode = 'REGISTERED';
        this.offpiModel.agyLocId = this.sessionManager.currentCaseLoad;
        this.propertyItemId=0;
        const offpiResult = this.oidrpitmFactory.offPiExecuteQuery(this.offpiModel);
        offpiResult.subscribe(offpiResultList => {
            this.rowDataLength=offpiResultList.length;
            if (offpiResultList.length === 0) {
                this.offpiData = [];
                this.showgroups=true;
                this.isProceed=true;
                const existingContainerResult = this.oidmpitmFactory.getExistingContainer(this.offpiModel.offenderBookId);
                existingContainerResult.subscribe(containerResult => {
                    if (containerResult) {
                        this.showRegisteredPropGrid = true;
                        this.screenTitle = this.translateService.translate('oidmpitm.manageproperties');
                    } else {
                        this.showRegisteredPropGrid = false;
                        this.screenTitle = this.translateService.translate('oidmpitm.registerpropertyitem');
                    }
                });
               
                return;
            } else {
                this.offpiData = offpiResultList;
                this.isProceed=false;
                this.propetiesToContainer = [];
                for (let i = 0; i < this.offpiData.length; i++) {
                    this.propertyItemId = this.propertyItemId + 1;
                    this.offpiData[i].propertyItemId = this.propertyItemId;
                    this.offpiData[i].dataFlag = "E";
                    this.offpiData[i].primaryFlag = true;
                    this.offpiData[i].cameraLaunchButton = 'assets/icons/eoff_icons/add_a_photo_black_24x24.png';
                    this.offpiData[i]['navOfCamera'] = '/oiuimagedialog';
                    this.offpiData[i]['imageObjectType'] = 'PPTY';
                    this.propetiesToContainer.push(this.offpiData[i]);
                    if (this.offpiData[i].images.length > 0) {
                        this.offpiData[i].imageUrl = 'data:image/png;base64,' + this.offpiData[i].images[0].imageThumbnail;
                        this.offpiData[i].imagesFlag = true;
                    }
                }
                
                this.showRegisteredPropGrid=true;
                this.screenTitle=this.translateService.translate('oidmpitm.manageproperties');
                this.offpiIndex = 0;
                this.offpiModel = offpiResultList[0];
                this.cameraButton = false;
            }
        });
        if(this.offpiData.length){
            this.isProceed=false;
        }else{
            this.isProceed=true;
        }
    }
    
    addedProperty(event) {
        this.currentRowDataLength = this.offpiData.length;
        this.isProceed=false;
    }
    
    updatedProperty(event) {
        
        for(let i=0;i<this.offpiData.length;i++) {
                if(event.updated.propertyItemId==this.offpiData[i].propertyItemId) {
                    this.offpiData[i]=event.updated;
                }
        }
        this.isProceed=false;
    }
        
        
    checkFlagQuantity = ( event ) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if ( event.field === 'primaryFlag' ) {
                if ( event.data.primaryFlag == false ) {
                    rowdata.validated = true;
                    event.data.quantity = 0;
                    rowdata.data = {
                        quantity: event.data.quantity,
                    };
                } else {
                    rowdata.validated = true;
                    event.data.quantity = 1;
                    rowdata.data = {
                        quantity: event.data.quantity,
                    };
                }
                return rowdata;
        } else if ( event.field === 'quantity' ) {
                    if ( event.data.quantity >= 1 ) {
                        rowdata.validated = true;
                        event.data.primaryFlag = true;
                        rowdata.data = {
                            primaryFlag: event.data.primaryFlag,
                        };
                    } else {
                        rowdata.validated = true;
                        event.data.primaryFlag = false;
                        rowdata.data = {
                            primaryFlag: event.data.primaryFlag,
                        };
                    }
                    return rowdata;
            }
       rowdata.validated = true;
       return rowdata;
        }
        
    
    offpiDataInsert = () => {
        
        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
        }
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
        this.isDataSaved=false;
        this.isEditable=false;
        const tempStr = 'test';
        
        var propertyItemId;
        
        for (let i=0;i<this.offpiData.length;i++){
            propertyItemId = this.offpiData[i].propertyItemId;
        }
        
        propertyItemId++;
        
        return { primaryFlag: true,quantity: 1, dataFlag:"N",imageUrl: this.imageUrl, propertyItemId:propertyItemId};
    }
    
    proceedToManageProperties(event) {
        this.isProceed = true;
        this.offpiInsertList=[];
        this.pyUpdatetList=[];
        //this.offpiDeleteList=[];
        for(let i=0;i<this.offpiData.length;i++){
            if(this.offpiData[i].primaryFlag==true && this.offpiData[i].dataFlag=="N") {
                this.offpiInsertList.push(this.offpiData[i]);
            }else if(this.offpiData[i].primaryFlag==true && this.offpiData[i].dataFlag=="E") {
                    this.pyUpdatetList.push(this.offpiData[i]);
            }else if(this.offpiData[i].primaryFlag == false && this.offpiData[i].dataFlag=="E"&& this.offpiData[i].quantity==0){
                 this.offpiDeleteList.push( this.offpiData[i]);
            }
        }
        
        this.oidrpitmSaveoffpiForm();
    }
    
    dispose(event) {
        
    }
    
    onRowClickEvent(event) {
        if (event) {
            this.offpiModel = new OffenderPptyItems();
            this.offpiModel = event;
            this.selectedOffender = event;
        }
    }

    CallFormImage() {
        const captureImageData = this.osiosearchService.captureImageProcedure();
        captureImageData.subscribe(captureImage => {
            if (captureImage === 'OIUIMAGE') {
                this.oiiptranFactory.imagesDataTemp.imageObjectId = this.selectedOffender.offenderBookId;
                this.oiiptranFactory.imagesDataTemp.imageObjectType = 'PPTY';
                this.oiiptranFactory.imagesDataTemp.imageViewType = this.selectedOffender.propertyType;
                this.oiiptranFactory.imagesDataTemp.imageObjectSeq = this.selectedOffender.propertyItemSeq;
                this.oiiptranFactory.imagesDataTemp.orientationType = this.selectedOffender.propertyType;
                this.dialogService.openLinkDialog('/oiuimagedialog', this.oiiptranFactory.imagesDataTemp, 80).subscribe(result => {
                    //  this.oiiptranexecuteQuery();
                    this.cameraButton = false;
                });
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('oidpiden.pleasecreate');
                this.show();
                this.cameraButton = false;
                return;
            }
    });
    }
    
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidrpitmSaveoffpiForm() {
        this.offBkId =this.vHeaderBlockModel.offenderBookId;
        this.offpiUpdatetList=[];
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === '[Closed]' ||
            this.vHeaderBlockModel.statusDisplay === 'Closed' ||
            this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic' ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrpitm.releaseoffender');
            this.show();
            return;
        }
        this.offpiCommitModel.insertList = [];
        this.offpiCommitModel.updateList = [];
       // this.offpiCommitModel.deleteList = [];
        for (let i = 0; i < this.pyUpdatetList.length; i++) {
            if (!this.pyUpdatetList[i].propertyItemSeq) {
                this.offpiInsertList.push(this.pyUpdatetList[i]);

            } else {
                this.offpiUpdatetList.push(this.pyUpdatetList[i]);
            }
        }

        if (this.offpiInsertList.length > 0 ) {
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
                if(!this.checkValidation(this.offpiInsertList[i])){
                   return;
                }
            }
        }

        if(this.offpiUpdatetList.length > 0){
            for (let i = 0; i < this.offpiUpdatetList.length; i++) {
                if(!this.checkValidation(this.offpiUpdatetList[i])){
                    return;
                 }
            }
        }


        if (!this.offpiDeleteList.length && !this.offpiInsertList.length && !this.offpiUpdatetList.length) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidmpitm.selectaleastOne');
            this.show();
            return;
        }

            this.offpiCommitModel.deleteList = this.offpiDeleteList;
            this.offpiCommitModel.insertList = this.offpiInsertList;
            this.offpiCommitModel.updateList = this.offpiUpdatetList;
            const offpiSaveData = this.oidmpitmFactory.offPiOIDMPITMCommit(this.offpiCommitModel);
            offpiSaveData.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                   //  this.propertiesForContainer();
                    this.successResposnce= true;
                    this.offpiDeleteList = [];
                    this.offpiExecuteQuery();

                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    //this.offpiExecuteQuery();
                }
            });

    }
 


    checkValidation(list){
        
        if (!list.propertyType) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrpitm.typedmustbe');
            this.show();
            return false;
        }
        if (!list.propertyDescription || list.propertyDescription.trim().length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrpitm.descriptionmustbe');
            this.show();
            return false;
        }
        if (!list.quantity) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrpitm.quanititydmustbe');
            this.show();
            return false;
        }
        if (list.quantity ==0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidmpitm.quanititydmustbegreaterzero');
            this.show();
            return false;
        }
        if (!list.receivedFrom) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrpitm.recevicedmustbe');
            this.show();
            return false;
        }
        if (!list.conditionCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrpitm.conditiondmustbe');
            this.show();
            return false;
        }
       /*  if (!list.propertyValue) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidmpitm.valuemustbeentered');
            this.show();
            return false;
        } */
        return true;
    }


    propertiesForContainer() {
        this.propetiesToContainer=[];
        for(let i = 0; i < this.offpiData.length; i++) {
            if(this.offpiData[i].primaryFlag == true){
                this.propetiesToContainer.push(this.offpiData[i]);
            }
        }
        const propForContainer = this.oidmpitmFactory.setpropDescForPropertyAttr(this.propetiesToContainer);
        propForContainer.subscribe(resultList => {
            for(let i = 0; i < resultList.length; i++) {
                resultList[i].primaryFlag=true;
            }
            //this.screenTitle=this.translateService.translate('oidmpitm.manageproperties');
            this.propetiesToContainer=[];
            this.propetiesToContainer=resultList;
            this.showRegisteredPropGrid=true;
            this.showgroups=false;
            this.showSaveAndProceed=false;
        });
    }
    
    containerData(event){
        this.containerList = event;
    }
    clearedProperty(event){
        if(event && event.currentData){
            this.offpiData = event.currentData
        }
        this.isProceed=true;
        if(this.offpiData.length>0){
            this.isProceed=false;
        }
    }
    clearPropertyGrid(){
        let temOffPidata : OffenderPptyItems[]=[];
        if(this.offpiData){
            this.selectedGroup = undefined;
            this.addedGroups=[];
            temOffPidata = [];
            this.offpiData = [];
            this.btnClearItems = false;
        }
    }
    showComponent(event) {
        this.screenTitle=this.translateService.translate('oidmpitm.registerpropertyitem');
        this.addedGroups=[];
        this.showPreviousComp=true;
        if(this.propetiesToContainer.length>0){
            this.offpiModel.agyLocId = this.sessionManager.currentCaseLoad;
            const offpiResult = this.oidrpitmFactory.
                offPiExecuteQuery(this.offpiModel);
            offpiResult.subscribe(offpiResultList => {
                this.rowDataLength = offpiResultList.length;
                this.offpiData = offpiResultList;
                this.isProceed = false;
                for (let i = 0; i < this.offpiData.length; i++) {
                    this.propertyItemId = this.propertyItemId + 1;
                    this.offpiData[i].propertyItemId = this.propertyItemId;
                    this.offpiData[i].dataFlag = "E";
                    this.offpiData[i].primaryFlag = true;
                    this.offpiData[i].cameraLaunchButton = '';
                    this.offpiData[i]['imageObjectType'] = 'PPTY';
                    this.offpiData[i]['navOfCamera'] = '/oiuimagedialog';
                    this.propetiesToContainer.push(this.offpiData[i]);
                    if (this.offpiData[i].images.length > 0) {
                        this.offpiData[i].imageUrl = 'data:image/png;base64,' + this.offpiData[i].images[0].imageThumbnail;
                        this.offpiData[i].imagesFlag = true;
                    }
                }
            });
        }
        if(this.offpiData.length==0){
            this.isProceed=true;
        }
        this.showRegisteredPropGrid=false;
        this.showgroups=true;
        this.showSaveAndProceed=true;
        this.successResposnce=false;
    }
    reloadPropertyGrid(){
        const data = {
			label: this.translateService.translate('oidmpitm.allunsavedchangeslost'), yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
			if (result) {
                this.btnClearItems = false;
                this.offpiExecuteQuery();
			} else {
                this.btnClearItems = true;
			}
		});
    }
}
