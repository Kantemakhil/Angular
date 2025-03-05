import {
    Component, OnInit, Injectable,Input,EventEmitter, Output
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidtpritService } from '../service/oidtprit.service';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderPptyItemsCommitBean } from '@instproperty/OffenderPptyItemsCommitBean';
import { OffenderPptyContainers } from '@instproperty/OffenderPptyContainers';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OidrpitmService } from '../service/oidrpitm.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OidmpitmService } from '../service/oidmpitm.service';
import { OidmpconService } from '../service/oidmpcon.service';
@Component( {
    templateUrl: './container.component.html',
    providers: [],
    styleUrls: ['./oidmpitm.component.scss'],
    selector: 'container-grid'
} )

@Injectable({providedIn: 'root'})
export class ContainerComponent implements OnInit {
    selectedFromStatus: string;
selectedStatus: any;
offpiUpdatetList: OffenderPptyItems[] = [];
offpiCommitModel: OffenderPptyItemsCommitBean = new OffenderPptyItemsCommitBean();
commentText: any;
selectedToLocation: any;
offpiDeleteList: OffenderPptyItems[] = [];
type = 'error';
msglist = [];
message = ' Invalid.';
msgs: any[] = [];
propetiesToContainer : OffenderPptyItems[] = [];
managePropColumnDef:any[];
isEditable:boolean=true;
showManagePropBtn:boolean=true;
showContainerPanel:boolean=false;
propertiesToselectedContainer:OffenderPptyItems[] = [];
propertyItemId:number=0;
vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
offconModel: OffenderPptyContainers = new OffenderPptyContainers();
@Output() showPreviousComponent: EventEmitter<any> = new EventEmitter<any>();
offpiData: OffenderPptyItems[] = [];
offBkId: any;
offpiModel: OffenderPptyItems = new OffenderPptyItems();
cameraButton: boolean;
showRegisteredPropGrid:boolean=false;
containerList:any;
butConInsert: boolean;
caseLoadId: any;
containerId:number=0;
offconData: OffenderPptyContainers[] = [];
constructor(private oidtpritFactory: OidtpritService,public translateService: TranslateService,
        public dialogService: DialogService,private offenderSearchService: OffenderSearchService,private oidmpitmFactory: OidmpitmService,
        private sessionManager: UserSessionManager,private oidrpitmFactory: OidrpitmService,private oidmpconFactory: OidmpconService) {
}
 ngOnInit(){
     this.populateRegisteredPropGrid();
     this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
 }
 
 @Input()
 set propertiesToContainer(v: any) {
     this.propetiesToContainer=v;
     for(let i=0;i<this.propetiesToContainer.length;i++) {
         this.propertyItemId=this.propertyItemId+1;
         this.propetiesToContainer[i].propertyItemId=this.propertyItemId;
     }
     
 }
     @Input()
     set containerData(v: any){
     this.containerList = v;
     }
 
 populateRegisteredPropGrid() {
     this.managePropColumnDef = [
                            {
                                fieldName: this.translateService.translate('comp.address.select'), field: 'primaryFlag',
                                datatype: 'checkbox', editable: this.isEditable,
                                width: 150
                               },
                               {
                                fieldName: this.translateService.translate('oiiptran.type') + '*', field: 'propertyType',
                                editable: false, width: 150, datatype: 'lov',domain:'PPTY_TYPE'/* link: 'oidrpitm/cgfkOffPiPropertyTypeRecordGroup'*/,
                                optionWidth: 350, codeTitle: 'Type'
                                },      
                               { fieldName: this.translateService.translate('common.description') + '*', field: 'propertyDescription',
                                editable: false, width: 150, datatype: 'text',  uppercase: 'false', maxlength: 40 },
                                
                               {
                                fieldName: this.translateService.translate('oiiptran.quantity') + '*', field: 'quantity',
                                editable: false, width: 150, datatype: 'text', mask: this.getMask
                               },
                               
                               {
                                fieldName: this.translateService.translate('oiiptran.received') + '*', field: 'receivedFrom',
                                editable: false, width: 150, datatype: 'lov',domain:'PPTY_REC_FRM'/* link: 'oidrpitm/cgfkOffPiReceivedFromRecordGroup'*/,
                                optionWidth: 500, codeTitle: 'R/F'
                               },
                               {
                                 fieldName: this.translateService.translate('oiiptran.color'), field: 'color',
                                 editable: true, width: 150, datatype: 'lov',domain:'PPTY_COLOR'/* link: 'oidrpitm/rgColorRecordGroup'*/, optionWidth: 350, codeTitle: 'Color'
                               },
                               {
                                 fieldName: this.translateService.translate('oiiptran.condition') + '*', field: 'conditionCode',
                                 editable: true, width: 150, datatype: 'lov',domain:'PPTY_CONDIT'/* link: 'oidrpitm/rgCondnRecordGroup'*/, optionWidth: 300, codeTitle: 'Color'
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.make'), field: 'make', editable: false, width: 150, datatype: 'text',
                                   uppercase: 'false', maxlength: 5
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.serialnumber'), field: 'serialNo',
                                   editable: false, width: 150, datatype: 'text', maxlength: 12, uppercase: 'false'
                               },
                                  {
                                 fieldName: this.translateService.translate( 'housingview.image' ),
                                 field: 'imageUrl', editable: true, width: 200, datatype:'image'
                             },
                           ];
 }

    addToContainer(event) {
        if(this.containerList.length == 0){
             this.openNewContainer();
         }
        this.propertiesToselectedContainer=[];
     this.selectedToLocation=event.propertyContainerId;
        for(let i = 0; i < this.propetiesToContainer.length; i++) {
            
            if(this.propetiesToContainer[i].primaryFlag) {
                this.propertiesToselectedContainer.push(this.propetiesToContainer[i]);
            }
        }
        this.changesCodesToDescription(this.propertiesToselectedContainer); 
    }
     
     changesCodesToDescription(propertiesTocontainer) {
     const propForContainer = this.oidmpitmFactory.setpropDescForPropertyAttr(propertiesTocontainer);
     propForContainer.subscribe(resultList => {
         for(let i = 0; i < resultList.length; i++) {
             resultList[i].primaryFlag=true;
         }
         this.propertiesToselectedContainer=[];
         this.propertiesToselectedContainer=resultList;
         
         this.oidtpritSaveoffpiForm(this.propertiesToselectedContainer);
         
         });
     }
    
    updatePropDataForContainer(event) {
        for(let i = 0; i < this.propetiesToContainer.length; i++) {
            if(event.updated.propertyItemId==this.propetiesToContainer[i].propertyItemId){
                this.propetiesToContainer[i]=event.updated;
            }
        }
    }
    
    openNewContainer() {
        this.dialogService.openLinkDialog( '/NEWCON', this.vHeaderBlockModel, 1024 ).subscribe( result => {
            if ( result ) {
            }
        });
    }
    
    /**
     *  This function will be executed when commit event is
    * fired
    */
       oidtpritSaveoffpiForm(event) {
        this.offpiUpdatetList = [];
        this.selectedStatus="STORED";
        
        for (let j = 0; j < event.length; j++) {
            if (event[j].primaryFlag) {
                this.offpiUpdatetList.push(event[j]);
            }
       
        }
        if(this.offpiUpdatetList.length==0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidmpitm.pleaseselectatleastonepropertyitem');
            this.show();
            return;
        }
        this.offpiCommitModel.insertList = [];
        this.offpiCommitModel.updateList = [];
        this.offpiCommitModel.deleteList = [];
       
        if (this.offpiUpdatetList.length > 0) {
            for (let i = 0; i < this.offpiUpdatetList.length; i++) {
                if (this.offpiUpdatetList[i].primaryFlag) {
                    this.offpiUpdatetList[i].confirmFlag = 'Y';
                } else {
                    this.offpiUpdatetList[i].confirmFlag = 'N';
                }
                this.offpiUpdatetList[i].statusCode = this.selectedStatus;
                this.offpiUpdatetList[i].commentText = this.commentText;
                this.offpiUpdatetList[i].propertyContainerId = this.selectedToLocation;
            }
        }
        if (this.offpiDeleteList.length > 0) {
            for (let i = 0; i < this.offpiDeleteList.length; i++) {
            }
            this.offpiCommitModel.deleteList = this.offpiDeleteList;
        }
        this.offpiCommitModel.updateList = this.offpiUpdatetList;
        const offpiSaveData = this.oidtpritFactory.offPiCommit(this.offpiCommitModel);
        offpiSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.showContainerPanel=true;
                this.showRegisteredPropGrid=true;
                this.offpiExecuteQuery();
            } else {
                return;
            }
        });
       }
 
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    getMask = (index, col, data) => {
        if (data) {
            return {
                mask: [/\d/, /\d/, /\d/, /\d/],
                placeholderChar: ' '
            };
        }
    }
    
    offpiExecuteQuery() {
        this.offpiData=[];
        this.offBkId = this.vHeaderBlockModel.offenderBookId;
        this.offpiModel.offenderBookId = this.offBkId;
        this.offpiModel.statusCode = 'REGISTERED';
        this.offpiModel.agyLocId = this.sessionManager.currentCaseLoad;
        this.propertyItemId=0;
        const offpiResult = this.oidrpitmFactory.offPiExecuteQuery(this.offpiModel);
        offpiResult.subscribe(offpiResultList => {
            if (offpiResultList.length === 0) {
                this.offpiData = [];
                this.propetiesToContainer=[];
                return;
            } else {
                this.offpiData = offpiResultList;
                this.propetiesToContainer=[];
                for(let i=0;i<this.offpiData.length;i++) {
                    this.propertyItemId=this.propertyItemId+1;
                    this.offpiData[i].propertyItemId=this.propertyItemId;
                    this.offpiData[i].dataFlag="E";
                    this.offpiData[i].primaryFlag=false;
                    this.propetiesToContainer.push(this.offpiData[i]);
                }
                this.offpiModel = offpiResultList[0];
                this.cameraButton = false;
            }
         });
    }
                
    backToRegisterPropertyPanel() {
        this.showPreviousComponent.emit({shoWPreviousComp : true});
        
    }
             
  }