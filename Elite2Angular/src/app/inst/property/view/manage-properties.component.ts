import {
    Component, OnInit, Injectable, ViewChild,Input,Output,EventEmitter, SimpleChanges, OnChanges
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidmpconService } from '../service/oidmpcon.service';
import { OffenderPptyContainers } from '@instproperty/OffenderPptyContainers';
import { OffenderPptyContainersCommitBean } from '@instproperty/OffenderPptyContainersCommitBean';
import { VPropertyHeaderBlock } from '@commonbeans/VPropertyHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OidtpritService } from '../service/oidtprit.service';
import { Router } from '@angular/router';
import { AgencyInternalLocations } from '@instoicbeans/AgencyInternalLocations';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';
import { OidmpitmService } from '../service/oidmpitm.service';
import { OffenderPptyItemsCommitBean } from '@instproperty/OffenderPptyItemsCommitBean';
import { OidrpitmService } from '../service/oidrpitm.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { DragImage } from 'ng2-dnd';
import { OimprostService } from '../service/oimprost.service';
@Component( {
    templateUrl: './manage-properties.component.html',
    providers: [],
    styleUrls: ['./oidmpitm.component.scss'],
    selector: 'manage-properties'
} )

@Injectable({providedIn: 'root'}) 
export class ManagePropertiesComponent implements OnInit,OnChanges {

selectedTotalValue = 0;    
selectedPropertyContId: number;
selectedPropertyContStatusCode:string;
@ViewChild('grid') grid: any;
dragImage : DragImage;
registerdAndContainerDragDrop: boolean;
toDragLoc: any;
toRegisteredDragLoc: string;
addToContainerFlag = false;
toContainerItemsTemp: OffenderPptyItems[] = [];
fromContainerItemsTemp: OffenderPptyItems[] = [];
fromLoc: any;
toContainerProperty: string;
fromContainerProperty: string;
actionName: string;
lovModel: any[];
type = 'error';
msglist = [];
message = ' Invalid.';
msgs: any[] = [];
nameOfLovPage: string;
listToCompare: any[] = [];
offconData: OffenderPptyContainers[] = [];
offconModel: OffenderPptyContainers = new OffenderPptyContainers();
offconCommitModel: OffenderPptyContainersCommitBean = new OffenderPptyContainersCommitBean();
offconIndex = 0;
offconInsertList: OffenderPptyContainers[] = [];
offconUpdateList: OffenderPptyContainers[] = [];
offconDeleteList: OffenderPptyContainers[] = [];
selectedContainerData: OffenderPptyContainers[] = [];
countFalse = 0;
display: boolean;
errorMessage: string;
headerMessage: string;
disabled: boolean;
editable = true;
offconColumnDefs: any[];
offconActiveColumnDefs: any[];
offConReadOnly = false;
rgcontainercodeRg: any[] = [];
rglocationallRg: any[] = [];
rgstorelocationRg: any[] = [];
rgdescription2Rg: any[] = [];
caseLoadId: any;
isshowing = false;
flag: any;
index: any;
vHeaderBlockModel: VPropertyHeaderBlock;
insertDate: any;
propDate: any;
butConInsert: boolean;
exitflag: boolean;
checkPptyItemLength: number;
agencyInternalLocations: AgencyInternalLocations = new AgencyInternalLocations();
agencyInternalLocTemp: AgencyInternalLocations = new AgencyInternalLocations();
sealMarkValue: any;
containerValue: any;
enableUpdate: boolean;
changedIndex: number;
checkSealFlag: boolean;
locationValueList: AgencyInternalLocations = new AgencyInternalLocations();
checkProposalDate: boolean;
checkExpiryDate: boolean;
canNotBeDeactiveFlag: boolean;
sealMarkValues: any[] = [];
checkMultpleChangeSealVal: boolean;
checkLocValue: boolean;
checkLocValue1: boolean;
checkLocValue2: boolean;
locationMap: Map<string, string> = new Map<string, string>();
showSavenProceed:boolean=true;
isProceed:boolean=true;
containerId:number=0;
showSelectedContainerData:boolean=false;
propertiesToselectedContainer:OffenderPptyItems[] = [];
showContainerPanel:boolean=false;
managePropColumnDef:any[];
isEditable:boolean=true;
testColumnDefs:any[];
offpiData: OffenderPptyItems[] = [];
containerDataList: OffenderPptyContainers[] = [];
selectedContainer:any;
ispanelClicked:boolean=false;
parentField:string;
locationUrl:string;
moveToContainerLoc:string='';
imageUrl:any;
showSeal:boolean=true;
containerPptyList:OffenderPptyItems[] = [];
propertiesSelectedForMoving:OffenderPptyItems[] = [];
propertiesMoveToselectedContainer:OffenderPptyItems[] = [];
selectedToLocation: number;
selectedStatus: any;
offpiUpdatetList: OffenderPptyItems[] = [];
offpiCommitModel: OffenderPptyItemsCommitBean = new OffenderPptyItemsCommitBean();
offBkId: any;
commentText: any;
offpiModel: OffenderPptyItems = new OffenderPptyItems();
propertyItemId:number=0;
cameraButton: boolean;
disableMoveToLov:boolean=true;
moveToShow: boolean;
propetiesToContainer = [];
propetiesToContainerTemp = [];
imageInserted:number=0;
containerImage:OffenderPptyContainers= new OffenderPptyContainers;
showManagePropBtn:boolean=false;
openNewconaflag:boolean=false;
availcontainer:boolean=false;
updatePropertyStatus:string=''
selectedConatinerValue:any;
sealMark:any;
offenderPptyUpdateSeal= new OffenderPptyContainers ;
offConMoveToSealUpdate= new OffenderPptyContainers ;
moveTobtnSealUpdate= new  OffenderPptyContainers ;
toMoveSealUpdate= new OffenderPptyContainers ;
noItemChecked:boolean=true;
offenderPptyContainerForMissing:OffenderPptyContainers=new OffenderPptyContainers;
offenderPptyContainerForCell:OffenderPptyContainers=new OffenderPptyContainers;
showSeparator:boolean=false;
disableSaveButton:boolean=true;
tempContainer:any;
containerLocTitles:any;
sealmarkTemp: any;
@Input() currentSelectedOffender:any;
@Output() containerData: EventEmitter<any> = new EventEmitter<any>();
@Output() showPreviousComponent: EventEmitter<any> = new EventEmitter<any>();
@ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
conatinerLocationLink: string;
    msg: string;
    warnMessage: string;
    propertyDisplayValue: any;
    locationData: any;
    constructor(private oidmpconFactory: OidmpconService, 
        public translateService: TranslateService, private sessionManager: UserSessionManager,
        private oidtpritFactory: OidtpritService, private router: Router, public dialogService: DialogService, private oidmpitmFactory: OidmpitmService, private oidrpitmFactory: OidrpitmService,
        public oimprostService: OimprostService,) {

    }


    ngOnInit() {
        this.getPropertySettingValues();
        this.checkLocValue1 = false;
        this.checkMultpleChangeSealVal = true;
        this.checkSealFlag = false;
        this.enableUpdate = true;
        this.butConInsert = true;
        this.canNotBeDeactiveFlag = false;
        this.checkProposalDate = false;
        this.checkExpiryDate = false;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.parentField = undefined + ',' + 'test' + ',' + this.caseLoadId;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.locationUrl = 'oidmpcon/getLocationValuesOfLov?parentField=' + this.parentField;
        this.containerLocTitles = { description: this.translateService.translate('common.description'), internalLocationCode: this.translateService.translate('common.intloccode'), code: this.translateService.translate('common.intlocid') };
	
        //this.conatinerLocationLink='oidmpcon/getAgyLocationValuesOfLov?agyLocId='+this.vHeaderBlockModel.agyLocId+ '&caseloadId=' + this.caseLoadId;
        this.conatinerLocationLink = `oidmpcon/getAllLocations?caseloadId=${this.caseLoadId}`;
        this.offconColumnDefs = [
            {
                fieldName: this.translateService.translate('common.type1'), field: 'containerCode',
                datatype: 'lov', domain: 'PPTY_CNTNR', editable: true, width: 250, optionWidth: 300, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.proposeddisposal'), field: 'proposedDisposalDate',
                datatype: 'date', editable: true, width: 200, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.deactivationdate'), field: 'expiryDate',
                datatype: 'date', editable: true, width: 200, cellEditable: this.canDeactiveDateEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.sealmark'), field: 'sealMark', editable: true,
                width: 200, datatype: 'text', maxlength: 20, cellEditable: this.canSealEdit
            },
            {
                fieldName: this.translateService.translate('common.location') + '*', field: 'description',
                datatype: 'lov', link: 'oidmpcon/getLocationValuesOfLov?parentField=', parentField: 'parentField',
                editable: true, width: 250, optionWidth: 500, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                datatype: 'checkbox', editable: true, width: 150, cellEditable: this.canLocationEdit
            }
        ];
        this.offconActiveColumnDefs = [
            {
                fieldName: this.translateService.translate('common.type1'), field: 'containerCode',
                datatype: 'lov', domain: 'PPTY_CNTNR', editable: true, width: 250, optionWidth: 200, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.proposeddisposal'), field: 'proposedDisposalDate',
                datatype: 'date', editable: true, width: 200, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.deactivationdate'), field: 'expiryDate',
                datatype: 'date', editable: true, width: 200, cellEditable: this.canDeactiveDateEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.sealmark'), field: 'sealMark', editable: true,
                width: 200, datatype: 'text', maxlength: 20, cellEditable: this.canSealEdit
            },
            {
                fieldName: this.translateService.translate('common.location'), field: 'description',
                datatype: 'lov', link: 'oidmpcon/getLocationValuesOfLov?parentField=', parentField: 'parentField',
                editable: true, width: 250, optionWidth: 500, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                datatype: 'checkbox', editable: true, width: 150, cellEditable: this.canLocationEdit
            }
        ];
        const rglocationallServiceObj = this.oidmpconFactory.rgLocationAllRecordGroup(this.caseLoadId);
        rglocationallServiceObj.subscribe(rgLocationList => {
            if (rgLocationList.length === 0) {
                this.rglocationallRg = [];
            } else {
                for (let i = 0; i < rgLocationList.length; i++) {
                    this.rglocationallRg.push({
                        'text': rgLocationList[i].code, 'id': rgLocationList[i].internalLocationId,
                        'description': rgLocationList[i].description
                    });
                    this.locationMap.set(rgLocationList[i].code, rgLocationList[i].internalLocationId);
                }
            }
        });
        if (this.oidtpritFactory.flag && this.oidtpritFactory.checkExitFlag) {
            this.exitflag = true;
            this.oidtpritFactory.flag = false;
        } else {
            this.exitflag = false;
        }
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
        // Drag image
        var dragImageElemnt = new Image();
        dragImageElemnt.src = '/assets/images/dragicon4.png';
        this.dragImage = new DragImage(dragImageElemnt, 0, 0);

        this.offconExecuteQuery();
        this.populateRegisteredPropGrid();
    }

    getPropertySettingValues() {
        const propertySettings = { settingCode: 'PROP_CON_ID' };
        this.oimprostService.getPropertySettingData(propertySettings).subscribe((result) => {

            if (result && result.length > 0) {

                const propertyValue = JSON.parse(result[0].settingValueString);
                this.propertyDisplayValue = propertyValue.VALUE;

            } else {

            }
        });
    }

 @Input()
 set propertiesToContainer(v: any) {
     this.propetiesToContainer=[];
     this.selectedTotalValue = 0;
     this.propetiesToContainer=v;
     if(!this.propetiesToContainer.length){
         this.disabled=true;
     }else{
         this.disabled=false;
     }
     for(let i=0;i<this.propetiesToContainer.length;i++) {
         this.propertyItemId=this.propertyItemId+1;
         this.propetiesToContainer[i].propertyItemId=this.propertyItemId;
         if(this.propetiesToContainer[i].primaryFlag){
            this.selectedTotalValue += Number(this.propetiesToContainer[i].propertyValue)
          }
     }
     this.vHeaderBlockModel = JSON.parse(JSON.stringify(this.currentSelectedOffender));
     this.offconExecuteQuery()
 }

 ngOnChanges(changes: SimpleChanges) {}

 populateRegisteredPropGrid() {
     this.managePropColumnDef = [
                               {
                                fieldName: this.translateService.translate('comp.address.select'), field: 'primaryFlag',
                                datatype: 'checkbox', editable: this.isEditable, width: 150
                               },
                               {
                                fieldName: this.translateService.translate('oiiptran.type') + '*', field: 'propertyType',
                                editable: false, width: 150, datatype: 'lov',domain:'PPTY_TYPE' /* link: 'oidrpitm/cgfkOffPiPropertyTypeRecordGroup'*/,
                                optionWidth: 350, codeTitle: 'Type'
                                },
                               { fieldName: this.translateService.translate('common.description') + '*', field: 'propertyDescription',
                                editable: false, width: 150, datatype: 'text',  uppercase: 'false', maxlength: 40 },

                               {
                                fieldName: this.translateService.translate('oiiptran.quantity') + '*', field: 'quantity',
                                editable: false, width: 150, datatype: 'text'
                               },

                               {
                                fieldName: this.translateService.translate('oiiptran.received') + '*', field: 'receivedFrom',
                                editable: false, width: 150, datatype: 'lov',domain:'PPTY_REC_FRM'/* link: 'oidrpitm/cgfkOffPiReceivedFromRecordGroup'*/,
                                optionWidth: 500, codeTitle: 'R/F'
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.color'), field: 'color',
                                   editable: false, width: 150, datatype: 'lov', optionWidth: 350, codeTitle: 'Color',domain:'PPTY_COLOR'/* link: 'oidrpitm/rgColorRecordGroup'*/
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.condition') + '*', field: 'conditionCode', domain:'PPTY_CONDIT',
                                   editable: false, width: 150, datatype: 'lov', optionWidth: 300
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.value'), field: 'propertyValue', 
                                   editable: false, width: 150, datatype: 'text'
                               },
                               {   
                                fieldName: this.translateService.translate('oiiptran.size'), field: 'propertySize',
                                editable: true, width: 150, datatype: 'text' 
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.make'), field: 'make', 
                                   editable: false, width: 150, datatype: 'text', uppercase: 'false', maxlength: 40, wrapText: true, maxWidth: 200
                               },
                               {
                                   fieldName: this.translateService.translate('oiiptran.serialnumber'), field: 'serialNo',
                                   editable: false, width: 150, datatype: 'text', maxlength: 12, uppercase: 'false'
                               },
                                 {
                                 fieldName: this.translateService.translate('housingview.image'),
                                 field: 'imageUrl', editable: true, width: 100, datatype: 'hyperlink', link: '/propertyimagedialog', displayas: 'image', modal: true,
                                 data: 'row', dialogWidth: '30%', styleClass: 'thumbImg'
                             },
                             {
                                 fieldName: '',
                                 field: 'cameraLaunchButton', editable: false, width: 220, datatype: 'hyperlink', link: '/oiuimagedialog', displayas: 'image', modal: true,
                                 data: 'row', dialogWidth: '80%', updateField: 'row'
                             },

                           ];

 }

 @Input()
 set propertyItems(v : any) {
     if(v) {
         this.propertiesToselectedContainer=v;
         this.showContainerPanel=true;
     }
 }

 removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }
 onLocationChange(event,container){
    //container.internalLocationCode=event.internalLocationCode;
    if(event && container.code !=container.internalLocationIdTemp){
     this.msg= this.translateService.translate('oidmpcon.containermoveconfirm');
     const data = {
        label: this.msg, yesBtn: true, noBtn: true
      };
      this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
        if (result) {
           container.internalLocationId = event.internalLocationId;
           
           const offconInsertData = this.oidmpconFactory.updateConatinerIntLocation(container);
           offconInsertData.subscribe(returnValue => {
               if (returnValue === 1) {
                container.internalLocationCodeTemp= container.internalLocationCode;
                container.internalLocationIdTemp= container.internalLocationId.toString();
                   this.type = 'success';
                   this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                   this.show();
                   this.offconExecuteQuery();
               } else {
                   this.type = 'warn';
                   this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                   this.show();
                   container.internalLocationCode=container.internalLocationCodeTemp;
                   container.internalLocationId= container.internalLocationIdTemp;
               }
           });
        } else {
           container.code=container.internalLocationIdTemp;
        }
   
      });
   }
    }
 movePosition( container ) {
         if ( container.propertyContainerId == undefined || container.propertyContainerId == null )
             this.toDragLoc = container.statusCode;
         else
             this.toDragLoc = container.propertyContainerId;

         if ( this.registerdAndContainerDragDrop ) {
             this.fromLoc = 'REGISTERED';
             this.selectedToLocation=container.propertyContainerId;
                if(container.sealMark ){
                    this.toMoveSealUpdate.offenderBookId=container.offenderBookId;
                    this.toMoveSealUpdate.sealMark=null;
                    this.toMoveSealUpdate.sealFlag="N";
                    this.toMoveSealUpdate.propertyContainerId=container.propertyContainerId;
            const selectedContainerDesc=container.containerDescription+"("+container.propertyContainerId+")";
                   this.warnMessage = this.translateService.translate('oidmpitm.containersealwarn');
                       this.warnMessage = String(this.warnMessage).replace('%name%', selectedContainerDesc);
                       container.message=this.warnMessage;
            this.dialogService.openLinkDialog( '/WARNDIALOG',container, 55 ).subscribe( result => {
                if(result=="Yes"){     
                const offconInsertData = this.oidmpconFactory.offConUpdateSeal(this.toMoveSealUpdate);
                offconInsertData.subscribe(insertdata => {
                for(let i=0;i< this.offconData.length;i++){
                    if(this.offconData[i].propertyContainerId && this.offconData[i].propertyContainerId==container.propertyContainerId){
                       this.offconData[i].sealMark=null;
                       this.offconData[i].sealShow=true;
                    }
                }
            if (insertdata === 1) {
                    this.checkMultpleChangeSealVal = true;
                    this.sealMarkValues = [];
                }
                this.addToContainer( this.propetiesToContainer );
         });
        }else{
            return;
        }
        });
                
             }else{
                this.addToContainer( this.propetiesToContainer );
             }
            
         } else {
             if(container.propertyContainerId){
                this.selectedContainerData[0].moveToContainerLov=container.propertyContainerId;
             }else{
                  this.selectedContainerData[0].moveToContainerLov=container.statusCode;
             }
            
            this.selectedContainerData[0].moveToContainer.forEach(obj=>{
                if(obj.code == container.propertyContainerId){
                    this.selectedContainerData[0].moveToContainerSeal=obj.sealMark;
                    this.selectedContainerData[0].moveToContainerDesc=obj.description;
                }
            })
            container=this.selectedContainerData[0]
            this.moveToContainer(container);
         }
    // }
     
    
     
 }

 movePositionProperties( event ) {
    this.registerdAndContainerDragDrop= true;
    const container=this.selectedContainerData[0];
    container.moveToContainerLov='REGISTERED';
    this.moveToContainer(container);   // move from container to registered items
 }

 dragStartProperties( event ) {
     this.registerdAndContainerDragDrop= true;
     

 }

 dragStart( container ) {
     this.selectedContainerData[0]=container;

 }
 dragEnd( container ) {
     //
 }

 canLocationEdit = (data: any, index: number, field: string): boolean => {
     var internalLocationId;
     if (!data.description) {
        internalLocationId = null;
     } else {
         internalLocationId = Number(this.locationMap.get(data.description));
        // internalLocationId = data.internalLocationId;
     }
     this.offconData[index]['parentField'] = internalLocationId
     + ',' + this.vHeaderBlockModel.offenderBookId
     + ',' + this.caseLoadId;
     if (this.canNotBeDeactiveFlag) {
         this.type = 'warn';
         this.message = this.translateService.translate('oidmpcon.containermustbeempty');
         this.show();
         return false;
     }
     if (this.checkLocValue && this.checkLocValue1 && this.checkLocValue2) {
         if (data.activeFlag && !data.description) {
             return true;
         } else {
             this.type = 'warn';
             this.message = this.translateService.translate('common.locationmust');
             this.show();
             return false;
         }
     }
     if (field === 'description' || field === 'sealMark') {
         if (data.activeFlag === 'Y' || data.activeFlag === true) {
             data.activeFlag = true;
             return true;
         }
         if (data.activeFlag === false || data.activeFlag === 'N') {
             data.description = '';
             data.internalLocationId = 0;
             this.type = 'warn';
             this.message = this.translateService.translate('oidmpcon.locationcannotupdated');
             this.show();
             return false;
         }
     } else {
         return true;
     }

 }

 show() {
     this.msglist = [];
     this.msglist.push({ message: this.message, type: this.type });
     this.msgs = [...this.msglist];
 }

 /*
  * This event is fired when try to edit the deactivation date in grid
  */
  canDeactiveDateEdit = (data: any, index: number, field: string): boolean => {
      if (this.checkLocValue && this.checkLocValue1 && this.checkLocValue2) {
          if (data.activeFlag && !data.description) {
              return true;
          } else {
              this.type = 'warn';
              this.message = this.translateService.translate('common.locationmust');
              this.show();
              return false;
          }
      }
      if (field === 'description' || field === 'sealMark') {
          if (data.activeFlag === 'Y' || data.activeFlag === true) {
              data.activeFlag = true;
              return true;
          }
          if (data.activeFlag === false || data.activeFlag === 'N') {
              data.description = '';
              data.internalLocationId = 0;
              this.type = 'warn';
              this.message = this.translateService.translate('oidmpcon.locationcannotupdated');
              this.show();
              return false;
          }
      } else {
          return true;
      }

  }

  canSealEdit = (data: any, index: number, field: string): boolean => {
      if (this.checkLocValue && this.checkLocValue1 && this.checkLocValue2) {
          if (data.activeFlag && !data.description) {
              return true;
          } else {
              this.type = 'warn';
              this.message = this.translateService.translate('common.locationmust');
              this.show();
              return false;
          }
      }
      if (this.canNotBeDeactiveFlag) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidmpcon.containermustbeempty');
          this.show();
          return false;
      }
      if (field === 'sealMark' && this.changedIndex === index && data.pptyItemLength > 0) {
          return true;

      } else if (data) {
          this.type = 'info';
          this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
          this.show();
          return false;
      }
  }

  /**
   *  This function will be executed when offender is selected
  * fired
  */
  offconExecuteQuery() {
      
      this.offconModel = new OffenderPptyContainers();
      if(this.vHeaderBlockModel){
        this.offenderPptyContainerForCell.offenderBookId=this.vHeaderBlockModel.offenderBookId;
    }
      this.offenderPptyContainerForCell.agyLocId=this.sessionManager.currentCaseLoad;
      this.offenderPptyContainerForCell.activeFlag='Y';
      this.offenderPptyContainerForCell.statusCode=this.translateService.translate('oidmpitm.incellstatus').trim();
      this.offenderPptyContainerForCell.locationDescription=this.translateService.translate('oidmpitm.incell').trim();
      this.offenderPptyContainerForCell.containerDescription= this.translateService.translate('oidmpitm.incell').trim();
      this.offenderPptyContainerForCell.description=this.translateService.translate('oidmpitm.incell').trim();
      this.offenderPptyContainerForCell.containerCode= this.translateService.translate('oidmpitm.incellstatus').trim();

      if(this.vHeaderBlockModel){
        this.offenderPptyContainerForMissing.offenderBookId=this.vHeaderBlockModel.offenderBookId;
    }
      this.offenderPptyContainerForMissing.agyLocId=this.sessionManager.currentCaseLoad;
      this.offenderPptyContainerForMissing.statusCode=this.translateService.translate('oidmpitm.missingstatus').trim();
      this.offenderPptyContainerForMissing.locationDescription=this.translateService.translate('oidmpitm.missing').trim();
      this.offenderPptyContainerForMissing.containerDescription=this.translateService.translate('oidmpitm.missing').trim();
      this.offenderPptyContainerForMissing.description=this.translateService.translate('oidmpitm.missingstatus').trim();
      this.offenderPptyContainerForMissing.containerCode= this.translateService.translate('oidmpitm.missingstatus').trim();
      this.offenderPptyContainerForMissing.activeFlag='Y';
      var propertyItemLength=0;
      if(!this.propetiesToContainer.length){
        this.disabled=true; 
      }else{
        this.disabled=false;
      }
      if (!this.vHeaderBlockModel) {
          this.offconData = [];
          return;
      }
      if(this.vHeaderBlockModel){
        this.offconModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    }
      this.offconModel.agyLocId = this.sessionManager.currentCaseLoad;
      const offconResult = this.oidmpconFactory.offConExecuteQuery(this.offconModel);
      offconResult.subscribe(data => {
          if (!data) {
              this.butConInsert = true;
              this.offconData = [];
          } else {
              for (let i = 0; i < data.length; i++) {
                  data[i]['parentField'] = undefined
                  + ',' + 'test'
                  + ',' + this.caseLoadId;
                  if (data[i].activeFlag === 'Y') {
                      data[i].activeFlag = true;
                  } else {
                      data[i].activeFlag = false;
                  }
                  this.containerId=this.containerId+1;
                  data[i].containerId=this.containerId;
                  if( data[i].internalLocationId){
                    data[i]['code'] = data[i].internalLocationId.toString();
                  }
                 
                  data[i].internalLocationCodeTemp= data[i].internalLocationCode;
                  if(data[i].internalLocationId){
                    data[i].internalLocationIdTemp= data[i].internalLocationId.toString();
                  }
                  
                  
                  data[i].agyLocId = this.sessionManager.currentCaseLoad;
                  data[i]['imageObjectType'] = 'PPTY_CONT';
              }

              this.butConInsert = true;
              //data.push(this.offenderPptyContainerForMissing);
              //data.push(this.offenderPptyContainerForCell);
              this.offconData=data;
              if(this.openNewconaflag && data.length>0){
                  if(data[0].propertyContainerId > 0 && !this.availcontainer){
                      this.availcontainer=true;
                      this.addToContainer(this.offconData[0]);
                  }
              }

              for(let i=0;i<this.offconData.length;i++) {


               

                  if ( this.offconData[i].propertyContainerId === 1 ) {

                      /* if ( this.offconData[i].images && this.offconData[i].images.length > 0 ) {
                          this.offenderPptyContainerForMissing.imageUrl = 'data:image/png;base64,' + this.offconData[i].images[0].imageThumbnail;
                      } */

                      this.offconData[i] = this.offenderPptyContainerForMissing;
                  } else if ( this.offconData[i].propertyContainerId === 2 ) {


                      /* if ( this.offconData[i].images && this.offconData[i].images.length > 0 ) {
                          this.offenderPptyContainerForCell.imageUrl = 'data:image/png;base64,' + this.offconData[i].images[0].imageThumbnail;
                      } */

                      this.offconData[i] = this.offenderPptyContainerForCell;
                  } else {

                      if ( this.offconData[i].images && this.offconData[i].images.length > 0 ) {
                          this.offconData[i].imageUrl = 'data:image/png;base64,' + this.offconData[i].images[0].imageThumbnail;
                      }
                  }



//                  if(this.offconData[i].images && this.offconData[i].images.length>0){
//                          this.offconData[i].imageUrl='data:image/png;base64,' +this.offconData[i].images[0].imageThumbnail;
//                      }
              }


      //remove Missing and IN Cell Container
      let tempArray = new Array<OffenderPptyContainers>();
      tempArray = this.offconData;

      this.offconData = [];

              for (let i = 0; i < tempArray.length; i++) {

                  if (tempArray[i].propertyContainerId === 1 && tempArray[i].propertyContainerId === 2) {

                      //skip such container

                  } else {

                      this.offconData[i] = tempArray[i];
                  }

              }
              this.offconModel = data[0];
              this.containerData.emit(this.offconData);
              this.getPptyItemsinContainer(this.offconData);
              this.selectedConatinerValue = undefined;
          }
      });
  }

  getPptyItemsinContainer( containersList ) {
      const pptyItemsForContainers = this.oidmpitmFactory.offPiSearchOffenderPptyItemsForcontainer( containersList );
      pptyItemsForContainers.subscribe( resultData => {
          this.offconData = [];
          
          this.offconData = resultData;
          let options: any[] = [];
          let propertyContainerId = '';

          for ( let j = 0; j < this.offconData.length; j++ ) {
              this.offconData[j]["selectedTotalValue"] = 0;
              if (this.offconData[j].activeFlag) {
                  this.offconData[j].containerStatus='Active';
              } else {
                  this.offconData[j].containerStatus='Inactive';
              }
              if ( this.offconData[j].propertyContainerId == null ) {
                  this.offconData[j].pptyItemLength = this.offconData[j].itemsForContainer.length;
              }
              if( this.offconData[j].itemsForContainer.length>0){

                  let offconDataT= this.offconData[j].itemsForContainer;
                  for( let t=0;t<offconDataT.length;t++){
                  this.offconData[j]["selectedTotalValue"] += Number(offconDataT[t]["propertyValue"]);
                  if ( offconDataT[t].images && offconDataT[t].images.length > 0 ) {
                      offconDataT[t].imageUrl = 'data:image/png;base64,' + offconDataT[t].images[0].imageThumbnail;
                  }
              }
              }
              options = [];
              for ( let i = 0; i < this.offconData.length; i++ ) {
                  if ( this.offconData[i].propertyContainerId != null ) {
                      if ( this.offconData[j].propertyContainerId != this.offconData[i].propertyContainerId ) {
                          propertyContainerId = this.offconData[i].propertyContainerId.toString();
                          let option =this.offconData[i].containerDescription+"("+this.offconData[i].propertyContainerId+")";
                          options.push( { "code": propertyContainerId, "description": option, "canDisplay": true,"sealMark":this.offconData[i].sealMark } );
                      }
                  }
                  else {
                      if(this.offconData[j].containerDescription!=this.offconData[i].containerDescription){
                      propertyContainerId = this.offconData[i].statusCode;
                      let option = this.offconData[i].locationDescription+"("+this.offconData[i].containerDescription+")" ;
                      options.push( { "code": propertyContainerId, "description": option, "canDisplay": true } );
                  }}
              }
              options.push( { "code": "REGISTERED", "description": "Remove From Container", "canDisplay": true } );
              this.offconData[j].moveToContainer = options;
              this.offconData[j].internalLocationCodeTemp= this.offconData[j].internalLocationCode;
              if(this.offconData[j].internalLocationId){
                this.offconData[j].internalLocationIdTemp= this.offconData[j].internalLocationId.toString();
              }
            
          }
      } );
  }

  onRowClickoffcon(event) {
      this.offconModel = new OffenderPptyContainers();
      this.changedIndex = this.offconData.indexOf(event);
      this.offconModel = event;
      for (let k = 0; k < this.rglocationallRg.length; k++) {
          if (this.rglocationallRg[k].text === this.offconModel.description) {
              this.agencyInternalLocations = new AgencyInternalLocations();
              this.agencyInternalLocations.internalLocationId = this.rglocationallRg[k].id;
          }
      }

      const checkPrimary = this.oidmpconFactory.checkPrimaryKeyOfInternalLocId(this.agencyInternalLocations);
      checkPrimary.subscribe(noprimayvalue => {
          this.agencyInternalLocTemp = new AgencyInternalLocations();
          this.agencyInternalLocTemp.description = noprimayvalue.description;
          this.agencyInternalLocTemp.internalLocationCode = noprimayvalue.internalLocationCode;

      });
      this.flag = this.offconModel.activeFlag;
      if (this.flag === false || this.offconModel.activeFlag === 'N') {
          this.isshowing = true;
      } else {
          this.isshowing = false;
      }
  }

  /**
   * This function auto generates the locationChange based on sealflag
   */
  locationChange = (event) => {
      const rowdata = new ValidateRowReturn();
      this.checkProposalDate = false;
      this.checkExpiryDate = false;
      if (this.agencyInternalLocations.internalLocationId) {
          if (!this.agencyInternalLocTemp.description && !this.agencyInternalLocTemp.internalLocationCode) {
              this.type = 'warn';
              this.message = this.translateService.translate('oidmpcon.noprimarykeyrowfound');
              this.show();
              rowdata.validated = true;
              rowdata.data = {
                  containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                  description: event.data.description,
                  proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                  expiryDate: event.data.expiryDate
              };
              return rowdata;
          }
      }
      if (event.field === 'expiryDate') {
          this.canNotBeDeactiveFlag = false;
          if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(event.data.expiryDate))) === 1) {
              this.checkExpiryDate = true;
              this.type = 'warn';
              this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
              this.show();
          }
          if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(event.data.expiryDate))) === 0) {
              if (this.offconModel.propertyContainerId) {
                  if (event.data.containerValue > 0) {
                      this.canNotBeDeactiveFlag = true;
                      this.type = 'warn';
                      this.message = this.translateService.translate('oidmpcon.containermustbeempty');
                      this.show();
                      rowdata.validated = true;
                      return rowdata;
                  }
              }
              rowdata.validated = true;
              event.data.activeFlag = false;
              rowdata.data = { activeFlag: false };
          } else {
              rowdata.validated = true;
              event.data.activeFlag = true;
              rowdata.data = { activeFlag: true };
          }
          rowdata.data = {
              containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
              description: event.data.description,
              proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
              expiryDate: event.data.expiryDate
          };
          return rowdata;
      }
      if (event.field === 'proposedDisposalDate') {
          if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(event.data.proposedDisposalDate))) === 1) {
              this.checkProposalDate = true;
              this.type = 'warn';
              this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
              this.show();
          }
          rowdata.validated = true;
          rowdata.data = {
              containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
              description: event.data.description,
              proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
              expiryDate: event.data.expiryDate
          };
          return rowdata;
      }
      if (event.field === 'description') {
          for (let i = 0 ; i < this.offconData.length; i++) {
              if (this.offconData[i].activeFlag && !this.offconData[i].description ) {
                  this.checkLocValue = true;
                  this.checkLocValue2 = true;
              } else {
                  this.checkLocValue2 = false;
                  this.checkLocValue1 = true;
              }
          }
          rowdata.validated = true;

          rowdata.data = {
              containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
              description: event.data.description,
              proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
              expiryDate: event.data.expiryDate
          };
          return rowdata;
      }
      if (event.field === 'sealMark') {
          this.sealMarkValues.push({'oldVal': event.oldValue, 'newVal': event.newValue, 'propId': event.data.propertyContainerId});
          rowdata.validated = true;

          rowdata.data = {
              containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
              description: event.data.description,
              proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
              expiryDate: event.data.expiryDate
          };
          return rowdata;
      }
      if (event.field === 'containerCode') {
          rowdata.validated = true;

          rowdata.data = {
              containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
              description: event.data.description,
              proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
              expiryDate: event.data.expiryDate
          };
          return rowdata;
      }
      if (event.field === 'activeFlag') {
          if (event.data.activeFlag) {
              this.isshowing = false;
              if (this.locationValueList.internalLocationId) {
                  event.data.description = this.locationValueList.internalLocationCode;
              } else if (!event.data.description) {
                  event.data.description = undefined;
              }
              rowdata.validated = true;

              rowdata.data = {
                  containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                  description: event.data.description,
                  proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                  expiryDate: event.data.expiryDate
              };
              for (let i = 0 ; i < this.offconData.length; i++) {
                  if (this.offconData[i].activeFlag && !this.offconData[i].description ) {
                      this.checkLocValue = true;
                      this.checkLocValue2 = true;
                  } else {
                      this.checkLocValue1 = true;
                  }
              }
              return rowdata;
          } else {
              if (event.data.pptyItemLength > 0) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidmpcon.cannotbedeactivated');
                  this.show();
                  setTimeout( () => {
                      this.grid.clearRecords(this.grid.gridOptions);
                  }, 10);
                  rowdata.validated = true;
                  event.data.activeFlag = true;
                  rowdata.data = {
                      containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                      description: event.data.description,
                      proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                      expiryDate: event.data.expiryDate
                  };
                  return rowdata;
              }
              event.data.activeFlag = false;
              event.data.description = undefined;
              rowdata.validated = true;
              rowdata.data = {
                  containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                  description: event.data.description,
                  proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                  expiryDate: event.data.expiryDate
              };
              for (let i = 0 ; i < this.offconData.length; i++) {
                  if (this.offconData[i].activeFlag && !this.offconData[i].description ) {
                      this.checkLocValue = true;
                      this.checkLocValue2 = true;
                  } else {
                      this.checkLocValue = false;
                  }
              }
              return rowdata;
          }
      }
  }
  updatePropDataForContainer(event) {
    this.selectedTotalValue = 0;
    for(let i = 0; i < this.propetiesToContainer.length; i++) {
        if(event.updated.propertyItemSeq==this.propetiesToContainer[i].propertyItemSeq){
            this.propetiesToContainer[i]=event.updated;
        }
        if(this.propetiesToContainer[i].primaryFlag){
          this.selectedTotalValue += Number(this.propetiesToContainer[i].propertyValue)
        }
    }
    this.addContainerbuttonCheck();
  }

  

  addContainerbuttonCheck(){
      if(!this.propetiesToContainer.length){
        this.disabled=true; 
      }else{
        this.disabled=false;
      }
      for(let i = 0; i < this.propetiesToContainer.length; i++){
          if( this.propetiesToContainer[i].primaryFlag == true){
              this.disabled=false;
              break;
          }else{
             this.disabled=true;
          }
      }
  }

    updateContainersData(event) {
        this.fromLoc = this.getFromLocation(event);
        this.disableMoveToLov = false;
        for (let i = 0; i < this.offconData.length; i++) {
            this.offconData[i]["selectedTotalValue"] = 0;
            this.containerPptyList = this.offconData[i].itemsForContainer;
            for (let j = 0; j < this.containerPptyList.length; j++) {
                if (event.updated.propertyContainerId == this.containerPptyList[j].propertyContainerId && event.updated.propertyItemSeq == this.containerPptyList[j].propertyItemSeq) {
                    if (event.updated.primaryFlag) {
                        this.propertiesSelectedForMoving.push(event.updated);
                    }
                    else {
                        this.propertiesSelectedForMoving.pop();
                    }
                    this.countFalse = 0;
                    for (let k = 0; k < this.containerPptyList.length; k++) {
                        if (!this.containerPptyList[k].primaryFlag) {
                            this.countFalse++;
                        }
                        else {
                            break;
                        }
                    }
                    if (this.countFalse == this.containerPptyList.length) {
                        this.offconData[i].disableSaveButton = true;
                        this.offconData[i].moveToContainerLov='';
                    }
                    else {
                        this.offconData[i].disableSaveButton = false;
                    }
                }
                this.offconData[i]["selectedTotalValue"] += Number(this.containerPptyList[j]["propertyValue"]);
            }
        }

        var fromLocTemp = this.fromLoc;
        if (this.fromLoc == this.translateService.translate('oidmpitm.missingstatus') || this.fromLoc == this.translateService.translate('oidmpitm.incellstatus')) {
            var propertiesSelectedForMovingTemp = this.propertiesSelectedForMoving.filter(function (property) {
                return property.statusCode == fromLocTemp;
            });
            this.propertiesSelectedForMoving = propertiesSelectedForMovingTemp;
        }
        else {
            var propertiesSelectedForMovingTemp = this.propertiesSelectedForMoving.filter(function (property) {
                return property.propertyContainerId == fromLocTemp;
            });
            this.propertiesSelectedForMoving = propertiesSelectedForMovingTemp;
        }
        
        this.isProceed = false;
    }

  proceedToManageProperties() {
      this.offconUpdateList=[];
          for(let i=0;i<this.offconData.length;i++) {
              if(this.offconData[i].dataFlag=="U") {
                  this.offconUpdateList.push(this.offconData[i]);
              }
          }
          this.oidmpconSaveoffconForm(this.offconUpdateList);
      }

  /**
   *  This function will be executed when commit event is
   * fired
   */
  oidmpconSaveoffconForm(listToUpdate) {
      
      //this.offconUpdateList = event;
      this.offconInsertList=[];
     // this.offconDeleteList = event.removed;
      if (this.canNotBeDeactiveFlag) {
          this.type = 'warn';
          this.message = this.translateService.translate('oidmpcon.containermustbeempty');
          this.show();
          return;
      }
      this.offconCommitModel.updateList = [];
      this.offconCommitModel.deleteList = [];
      if (this.offconUpdateList.length > 0) {
          for (let i = 0; i < this.offconUpdateList.length; i++) {
              if (this.offconUpdateList[i].description) {
              this.offconUpdateList[i].internalLocationId = Number(this.locationMap.get(this.offconUpdateList[i].description));
              }
              if (this.offconUpdateList[i].proposedDisposalDate) {
                  if (this.checkProposalDate) {
                      this.type = 'warn';
                      this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
                      this.show();
                      return;
                  }
              }

              if (this.offconUpdateList[i].expiryDate) {
                      if (this.checkExpiryDate) {
                      this.type = 'warn';
                      this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
                      this.show();
                      return;
                  }
              }
              if (this.offconUpdateList[i].activeFlag) {
                  if (!this.offconUpdateList[i].description || this.offconUpdateList[i].description === '') {
                      this.type = 'warn';
                      this.message = this.translateService.translate('common.locationmust');
                      this.show();
                      return;
                  }
              }
              if (this.offconUpdateList[i].activeFlag) {
                  this.offconUpdateList[i].activeFlag = 'Y';
              } else {
                  this.offconUpdateList[i].activeFlag = 'N';
                  this.offconUpdateList[i].internalLocationId = undefined;
              }
              this.offconUpdateList[i].modifyDateTime = DateFormat.getDate();
              this.offconUpdateList[i].modifyUserId = this.sessionManager.getId();
          }
      }
      this.offconCommitModel.updateList = this.offconUpdateList;
      this.offconCommitModel.insertList = this.offconInsertList;
      /*
      * dialogue will open when we changes the value of sealMark.
      * Condition is oldval not null and newval not null and old val not equals to new val then dialogue will open.
      * if click on save data will be save in DB.
      * if (2 line)condition fails doest open any dialogue directly goes to save saveThePptyConData() method
      */
      if (this.offconUpdateList.length > 0) {
          this.checkSealFlag = false;
          if (this.sealMarkValues.length > 0) {
              for (let l = 0; l < this.sealMarkValues.length; l++) {
                  if (this.checkMultpleChangeSealVal) {
                      if (this.sealMarkValues[l].oldVal) {
                          this.sealMarkValues[l].oldVal = this.sealMarkValues[l].oldVal.trim();
                      }
                      this.sealMarkValues[l].newVal = this.sealMarkValues[l].newVal.trim();
                      if (this.sealMarkValues[l].newVal.length > 0) {
                      if (this.sealMarkValues[l].oldVal != null && this.sealMarkValues[l].newVal != null &&
                          this.sealMarkValues[l].newVal !== this.sealMarkValues[l].oldVal) {
                          this.checkSealFlag = true;
                          this.checkMultpleChangeSealVal = false;
                          const data = {
                              label: this.translateService.translate('oidmpcon.changingthesealnumber'), yesBtn: true,
                               yesLabel: 'OK', noBtn: false
                          };
                          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                              if (typeof result === 'boolean' && result) {
                                  this.sealMarkValues = [];
                                  this.saveThePptyConData();
                              } else {
                                  this.checkMultpleChangeSealVal = true;
                              }
                          });
                      }
                  }
                  }
              }
          }
      }
      if (!this.checkSealFlag) {
          this.saveThePptyConData();
          }
  }

  saveThePptyConData() {
      const offconInsertData = this.oidmpconFactory.offConCommit(this.offconCommitModel);
      offconInsertData.subscribe(insertdata => {
          if (insertdata === 1) {
              this.checkMultpleChangeSealVal = true;
              this.sealMarkValues = [];
              this.type = 'success';
              this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
              this.show();
              this.isProceed=true;
              this.offconExecuteQuery();
          } else if (insertdata === 5) {
              this.type = 'info';
              this.message = this.translateService.translate('oidmpcon.storagelocationreachedmax');
              this.show();
              this.isProceed=true;
          } else if (insertdata === 10) {
              this.type = 'info';
              this.message = this.translateService.translate('oidmpcon.errormoduleomtocont');
              this.show();
              this.isProceed=true;
              return;
          } else {
              this.offconData = insertdata;
              this.checkMultpleChangeSealVal = true;
              this.type = 'warn';
              this.message = this.translateService.translate('common.addupdateremoverecordfailed');
              this.show();
              this.isProceed=true;
              this.offconExecuteQuery();
          }
      });
  }

  fetchContainerData(event) {
          this.showSelectedContainerData=true;
          this.selectedContainerData=[];
          this.selectedContainerData.push(event);

      }

  openNewContainer() {
      this.dialogService.openLinkDialog( '/NEWCON', this.vHeaderBlockModel, 50 ).subscribe( result => {
          if ( result === 1) {
              
             this.offconExecuteQuery();
          }
      });
  }

  clearedPropertyRegister(event){
      var count :number=0;
     for(let i=0;i<this.propetiesToContainer.length;i++){
        this.propetiesToContainer[i].primaryFlag=true;
         if(!this.propetiesToContainer[i].primaryFlag){
             count++;
         }
     }
     if(count==this.propetiesToContainer.length){
         this.disabled=true;
     }else{
        this.disabled=false;
    }
}
  onAccodianSngleClick(container){
      for ( var i = 0; i < this.offconData.length; i++ ) {
          if ( container.propertyContainerId == this.offconData[i].propertyContainerId && container.containerDescription == this.offconData[i].containerDescription &&!container.isDblClicked ) {
             document.getElementById("container"+i).classList.add("container-selected");
          } else {
            
              document.getElementById("container"+i).classList.remove("container-selected");
              if(this.offconData[i] && this.offconData[i].itemsForContainer){
                this.offconData[i].itemsForContainer.forEach(obj=>{
                     obj.primaryFlag=false;
                })
              }
          }
      }
      
     this.selectedConatinerValue = container;
  }

  onAccordianDblClick(container) {
      
      container.disableSaveButton=true;
      container.moveToContainerLov='';
      container.isDblClicked= !container.isDblClicked;
      if(container.sealMark){
          container.sealShow=false;
      } else{
          container.sealShow=true;
      }
      
      for ( var i = 0; i < this.offconData.length; i++ ) {
          if ( container.propertyContainerId == this.offconData[i].propertyContainerId  ) {
              document.getElementById("container"+i).classList.remove("container-selected");
              if( container.isDblClicked){
                  document.getElementById("container"+i).classList.add("container-expand");
              }else {
                  document.getElementById("container"+i).classList.remove("container-expand");
              }

          } else {
              document.getElementById("container"+i).classList.remove("container-expand");
          }
      }
     if ( this.offconData.length > 1 ) {
          this.moveToShow = true;
      } else {
          this.moveToShow = false;
      }
      this.ispanelClicked=true;
      this.showSelectedContainerData=true;
      this.selectedContainerData=[];
      this.selectedContainerData.push(container);
      this.populateRegisteredPropGrid();
      this.selectedPropertyContId=container.propertyContainerId;
      if(container.statusCode==this.translateService.translate('oidmpitm.missingstatus') || container.statusCode==this.translateService.translate('oidmpitm.incellstatus') ){
        container.sealShow=false;
      }
      
      this.tempContainer=container;
      this.selectedPropertyContStatusCode=container.statusCode;
//      this.moveToContainer='oidmpcon/getLocationValuesOfMoveToLov?offenderBookId='+container.offenderBookId+'&propertyContainerId='+container.propertyContainerId;
  }

  closeAccordianOnArrowClick(container){
      container.moveToContainerLov='';
      container.isDblClicked= !container.isDblClicked;
      for ( var i = 0; i < this.offconData.length; i++ ) {
          if ( container.propertyContainerId == this.offconData[i].propertyContainerId  ) {
              document.getElementById("container"+i).classList.remove("container-selected");
              if( container.isDblClicked){
                  document.getElementById("container"+i).classList.add("container-expand");
              }else {
                  document.getElementById("container"+i).classList.remove("container-expand");
              }

          } else {
              document.getElementById("container"+i).classList.remove("container-expand");
          }
      }
  }

  addPropToContainer(container){
    if(container.sealMark ){
            this.toMoveSealUpdate.offenderBookId=container.offenderBookId;
            this.toMoveSealUpdate.sealMark=null;
            this.toMoveSealUpdate.sealFlag="N";
            this.toMoveSealUpdate.propertyContainerId=container.propertyContainerId;
    const selectedContainerDesc=container.containerDescription+"("+container.propertyContainerId+")";
           this.warnMessage = this.translateService.translate('oidmpitm.containersealwarn');
               this.warnMessage = String(this.warnMessage).replace('%name%', selectedContainerDesc);
               container.message=this.warnMessage;
    this.dialogService.openLinkDialog( '/WARNDIALOG',container, 55 ).subscribe( result => {
        if(result=="Yes"){     
        const offconInsertData = this.oidmpconFactory.offConUpdateSeal(this.toMoveSealUpdate);
        offconInsertData.subscribe(insertdata => {
        for(let i=0;i< this.offconData.length;i++){
            if(this.offconData[i].propertyContainerId && this.offconData[i].propertyContainerId==container.propertyContainerId){
               this.offconData[i].sealMark=null;
               this.offconData[i].sealShow=true;
            }
        }
    if (insertdata === 1) {
            this.checkMultpleChangeSealVal = true;
            this.sealMarkValues = [];
        }
        this.selectedConatinerValue=container;
       this.addToContainer(container);
 });
}else{
    return;
}
});
}else{
    this.selectedConatinerValue=container;
    this.addToContainer(container);
}
}

  addToContainer(event){
    //this.selectedConatinerValue=event;
  
      this.propetiesToContainerTemp = this.removeDuplicates(this.propetiesToContainer,'propertyItemSeq');
      if ( this.fromLoc != 'REGISTERED' )
          this.addToContainerFlag = true;
            this.updatePropertyStatus='';
            if ( this.propetiesToContainerTemp.length < 1 ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oidmpitm.pleaseselectatleastonepropertyitem' );
                this.show(); 
                return;
            }
            else if (this.propetiesToContainerTemp.length > 0) {
                this.selectedTotalValue = 0;
                for (let i = 0; i < this.propetiesToContainerTemp.length; i++) {
                    if (this.propetiesToContainerTemp[i].primaryFlag) {
                        this.noItemChecked = false;
                        break;
                    }
                }
            }
            else if (this.noItemChecked) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidmpitm.pleaseselectatleastonepropertyitem');
                this.show();
                return;
            }

            if (!event) {
                this.openNewconaflag = true;
                this.openNewContainer();
            }
            else {
                if ( event == undefined && this.selectedConatinerValue==undefined) {
                    this.menuTrigger.openMenu();
                }
                else {
                    this.menuTrigger.closeMenu();
                    if(this.selectedConatinerValue!=null)
                    event=this.selectedConatinerValue;
                }
                this.propertiesMoveToselectedContainer = [];
                for(let i = 0; i < this.propetiesToContainerTemp.length; i++) {
                    if(this.propetiesToContainerTemp[i].primaryFlag) {
                        this.propertiesMoveToselectedContainer.push(this.propetiesToContainerTemp[i]);
                    }
                }
          //         if(this.addToContainerFlag){
                    this.changesCodesToDescription( this.propertiesMoveToselectedContainer );
          //         }
          //         else {
                //this.oidtpritSaveoffpiForm(this.propertiesMoveToselectedContainer);
          //         }
            }
      this.propertiesMoveToselectedContainer=[];
      if(event.propertyContainerId){
        this.selectedToLocation=event.propertyContainerId;
      }
      if(!this.addToContainerFlag){
          if(this.toDragLoc == this.translateService.translate('oidmpitm.missingstatus') || this.toDragLoc == this.translateService.translate('oidmpitm.incellstatus')){
              this.updatePropertyStatus = this.toDragLoc;
              this.selectedToLocation = null;
          }
           else
              this.selectedToLocation = this.toDragLoc;
      }
      if(event.propertyContainerId===null){
          this.updatePropertyStatus=event.statusCode;
      }
    
  }

  moveToLocationChange(container,event){
      if(event){
        container.moveToContainerSeal=event.sealMark;
        container.moveToContainerDesc=event.description;
      }
    
  }

  updateSeal(moveToContainerLov){
    const offconInsertData = this.oidmpconFactory.offConUpdateSeal(this.moveTobtnSealUpdate);
    offconInsertData.subscribe(insertdata => {
        for(let i=0;i<this.offconData.length;i++){
            if(this.offconData[i].propertyContainerId && this.offconData[i].propertyContainerId==moveToContainerLov){
                this.offconData[i].sealMark=null;
                this.offconData[i].sealShow=true;
            }
            this.offconData[i].moveToContainer.forEach(obj=>{
                if(obj.code == moveToContainerLov){
                 obj.sealMark=null;
                }
            })
        }
        if (insertdata === 1) {
            this.checkMultpleChangeSealVal = true;
            this.sealMarkValues = [];
            this.showSeal=false;
        }
    });
  }

  moveToContainer(container){
    const moveToContainerLov=container.moveToContainerLov;
    const moveToContainerSeal=container.moveToContainerSeal;
    const moveToContainerDesc=container.moveToContainerDesc;
    this.selectedContainerData[0]=container;
      this.moveTobtnSealUpdate.offenderBookId=this.selectedContainerData[0].offenderBookId;
      this.moveTobtnSealUpdate.sealFlag="N";
      this.moveTobtnSealUpdate.sealMark=null;
      this.moveTobtnSealUpdate.propertyContainerId=container.moveToContainerLov;
      if(!this.tempContainer.disableSaveButton){
        this.tempContainer.disableSaveButton=true;
    }
      this.addToContainerFlag = false;
      if (this.selectedContainerData[0].sealMark || moveToContainerSeal) {
          if (this.propertiesSelectedForMoving.length < 1) {      
              this.type = 'warn';
              this.message = this.translateService.translate('oidmpitm.movetorecords');
              this.show();
              return;
          }
          const selectedContainerDesc=this.selectedContainerData[0].containerDescription+"("+this.selectedContainerData[0].propertyContainerId+")";
          if(this.selectedContainerData[0].sealMark && moveToContainerSeal){
            this.warnMessage = this.translateService.translate('oidmpitm.containerssealwarn');
             this.warnMessage = String(this.warnMessage).replace('%container1%', selectedContainerDesc).replace('%container2%', moveToContainerDesc);
            }else if(this.selectedContainerData[0].sealMark ){
                this.warnMessage = this.translateService.translate('oidmpitm.containersealwarn');
                this.warnMessage = String(this.warnMessage).replace('%name%', selectedContainerDesc);
              
            }else if(moveToContainerSeal){
                this.warnMessage = this.translateService.translate('oidmpitm.containersealwarn');
                this.warnMessage = String(this.warnMessage).replace('%name%', moveToContainerDesc);
            }
          const warnMsg = {
            label: this.warnMessage, yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', warnMsg, 20).subscribe(result => {
    if (result) {                       
      if(moveToContainerLov==='' || moveToContainerLov===undefined){
          this.type = 'warn';
          this.message = this.translateService.translate('oidmpitm.movetowarning');
          this.show();
          for ( let i = 0; i < this.selectedContainerData[0].itemsForContainer.length; i++ ) {
            if ( this.selectedContainerData[0].itemsForContainer[i].primaryFlag ) {
                this.selectedContainerData[0].disableSaveButton=false;
            }
        }
          return ;
      }
      else if(this.propertiesSelectedForMoving.length<1){

              this.type = 'warn';
              this.message = this.translateService.translate('oidmpitm.movetorecords');
              this.show();
              return ;
          }
      else {
          this.updatePropertyStatus = '';
          this.updateSeal(moveToContainerLov);
          this.propertiesMoveToselectedContainer = [];
          if ( moveToContainerLov == this.translateService.translate('oidmpitm.missingstatus') ) {
              this.updatePropertyStatus = this.translateService.translate('oidmpitm.missingstatus');
          }
          else if ( moveToContainerLov == this.translateService.translate('oidmpitm.incellstatus') ) {
              this.updatePropertyStatus = this.translateService.translate('oidmpitm.incellstatus');
          }
          else if ( moveToContainerLov == 'REGISTERED' ) {
              this.updatePropertyStatus = "REGISTERED";
          }
          else {
              this.selectedToLocation = moveToContainerLov;
              this.selectedStatus = "STORED";
          }

          for ( let i = 0; i < this.propertiesSelectedForMoving.length; i++ ) {
              if ( this.propertiesSelectedForMoving[i].primaryFlag ) {
                  this.propertiesMoveToselectedContainer.push( this.propertiesSelectedForMoving[i] );
              }
          }

          this.propertiesSelectedForMoving = [];

          //if ( this.addToContainerFlag == false || this.registerdAndContainerDragDrop ) {
              this.changesCodesToDescription( this.removeDuplicates(this.propertiesMoveToselectedContainer, 'propertyItemSeq') );
         // }
          //else {
            //  this.oidtpritSaveoffpiForm(this.propertiesMoveToselectedContainer);
         // }


        }
              this.moveToSealUpdate();
              }else{
                for ( let i = 0; i < this.selectedContainerData[0].itemsForContainer.length; i++ ) {
                    if ( this.selectedContainerData[0].itemsForContainer[i].primaryFlag ) {
                        this.selectedContainerData[0].disableSaveButton=false;
                    }
                }
              }
          });
      } else{ 
              if(moveToContainerLov==='' || moveToContainerLov===undefined){
              this.type = 'warn';
              this.message = this.translateService.translate('oidmpitm.movetowarning');
              this.show();
             
             
              for ( let i = 0; i < this.selectedContainerData[0].itemsForContainer.length; i++ ) {
                if ( this.selectedContainerData[0].itemsForContainer[i].primaryFlag ) {
                    this.selectedContainerData[0].disableSaveButton=false;
                }
            }
              return;
          }
          else if(this.propertiesSelectedForMoving.length<1){

                  this.type = 'warn';
                  this.message = this.translateService.translate('oidmpitm.movetorecords');
                  this.show();
                  return;
              }
          else {
              this.updatePropertyStatus = '';
              this.propertiesMoveToselectedContainer = [];
              //this.updateSeal(moveToContainerLov);
              if ( moveToContainerLov == this.translateService.translate('oidmpitm.missingstatus') ) {
                  this.updatePropertyStatus = this.translateService.translate('oidmpitm.missingstatus');
              }
              else if ( moveToContainerLov == this.translateService.translate('oidmpitm.incellstatus') ) {
                  this.updatePropertyStatus = this.translateService.translate('oidmpitm.incellstatus');
              }
              else if ( moveToContainerLov == 'REGISTERED' ) {
                  this.updatePropertyStatus = "REGISTERED";
              }
              else {
                  this.selectedToLocation = moveToContainerLov;
                  this.selectedStatus = "STORED";
              }

              for ( let i = 0; i < this.propertiesSelectedForMoving.length; i++ ) {
                  if ( this.propertiesSelectedForMoving[i].primaryFlag ) {
                      this.propertiesMoveToselectedContainer.push( this.propertiesSelectedForMoving[i] );
                  }
              }

              this.propertiesSelectedForMoving = [];

              //if ( this.addToContainerFlag == false || this.registerdAndContainerDragDrop ) {
                  this.changesCodesToDescription( this.removeDuplicates(this.propertiesMoveToselectedContainer, 'propertyItemSeq') );
             // }
              //else {
                //  this.oidtpritSaveoffpiForm(this.propertiesMoveToselectedContainer);
             // }


            }
              
      }
              
  }

  changesCodesToDescription(propertiesTocontainer) {
      const propForContainer = this.oidmpitmFactory.setpropDescForPropertyAttr(propertiesTocontainer);
      propForContainer.subscribe(resultList => {
          for(let i = 0; i < resultList.length; i++) {
              resultList[i].primaryFlag=true;
          }
          this.propertiesMoveToselectedContainer=[];
          this.propertiesMoveToselectedContainer=resultList;
          this.oidtpritSaveoffpiForm(this.propertiesMoveToselectedContainer);
          });
      }
  /**
   *  This function will be executed when commit event is
  * fired
  */
     oidtpritSaveoffpiForm(event) {
         
      this.offpiUpdatetList = [];
      if ( this.updatePropertyStatus != null ) {
          if ( this.updatePropertyStatus == this.translateService.translate('oidmpitm.missingstatus') ) {
              this.selectedStatus = this.translateService.translate('oidmpitm.missingstatus');
          }
          else if(this.updatePropertyStatus == this.translateService.translate('oidmpitm.incellstatus')){
              this.selectedStatus = this.translateService.translate('oidmpitm.incellstatus');
          }
          else if(this.updatePropertyStatus == 'REGISTERED'){
              if(!this.registerdAndContainerDragDrop){
                  this.addToContainerFlag = true;
              }
              this.selectedStatus = "REGISTERED";
          }
          else {
              this.selectedStatus = "STORED";
              }
      }
      else {
      this.selectedStatus = "STORED";
      }
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

      this.fromContainerItemsTemp = [];
      this.toContainerItemsTemp = [];

      var toContainer;
      var fromContainer;

      if ( this.addToContainerFlag == false && !this.registerdAndContainerDragDrop) {

          var toLoc = this.getToLocation();
          var fromLocation = this.fromLoc;

          if(toLoc == fromLocation){
              this.type = 'warn';
              this.propertiesSelectedForMoving = this.offpiUpdatetList;
              this.message = this.translateService.translate('oidmpitm.samesourceanddestination');
              this.show();
              return;
          }

          if ( this.toContainerProperty == 'propertyContainerId' ) {
              toContainer = this.offconData.filter( function( container ) {
                  return container.propertyContainerId == toLoc;
              });
          }

          else if ( this.toContainerProperty == 'statusCode' ) {
              toContainer = this.offconData.filter( function( container ) {
                  return container.statusCode == toLoc;
              });
          }


          for ( let x = 0; x < toContainer[0].itemsForContainer.length; x++ ) {
              //toContainer[0].itemsForContainer[x].primaryFlag = false;
              this.toContainerItemsTemp.push( toContainer[0].itemsForContainer[x] );
          }

          for ( let x = 0; x < this.offpiUpdatetList.length; x++ ) {
              this.offpiUpdatetList[x].primaryFlag = false;
              this.toContainerItemsTemp.push( this.offpiUpdatetList[x] );
          }

          //======================================================================

          if ( this.fromContainerProperty == 'propertyContainerId' ) {
              fromContainer = this.offconData.filter( function( container ) {
                  return container.propertyContainerId == fromLocation;
              });
          }

          else if ( this.fromContainerProperty == 'statusCode' ) {
              fromContainer = this.offconData.filter( function( container ) {
                  return container.statusCode == fromLocation;
              });
          }

          var fromContainerTempItems = fromContainer[0].itemsForContainer.filter( function( properties ) {
              return properties.primaryFlag != true;
          });


          this.fromContainerItemsTemp = fromContainerTempItems;

          toContainer[0].itemsForContainer = this.toContainerItemsTemp;
          fromContainer[0].itemsForContainer = this.fromContainerItemsTemp;

          toContainer[0].pptyItemLength = toContainer[0].itemsForContainer.length;
          fromContainer[0].pptyItemLength = fromContainer[0].itemsForContainer.length;

      }

      if(this.registerdAndContainerDragDrop == true){

          var toLoc = this.getToLocation();
          var fromLocation = this.fromLoc;

          //propetiesToContainer

          if(toLoc == fromLocation){
              this.type = 'warn';
              this.propertiesSelectedForMoving = this.offpiUpdatetList;
              this.message = this.translateService.translate('oidmpitm.samesourceanddestination');
              this.show();
              return;
          }

          if(toLoc == 'REGISTERED'){
              toContainer = this.propetiesToContainer;

          } else  if ( this.toContainerProperty == 'propertyContainerId' ) {
              toContainer = this.offconData.filter( function( container ) {
                  return container.propertyContainerId == toLoc;
              });
          } else if ( this.toContainerProperty == 'statusCode' || toLoc != 'REGISTERED') {
              toContainer = this.offconData.filter( function( container ) {
                  return container.statusCode == toLoc;
              });
          }


          if(fromLocation == 'REGISTERED'){
              fromContainer = this.propetiesToContainer;
          } else  if ( this.fromContainerProperty == 'propertyContainerId' ) {
              fromContainer = this.offconData.filter( function( container ) {
                  return container.propertyContainerId == fromLocation;
              });
          } else if ( this.fromContainerProperty == 'statusCode' || fromLocation != 'REGISTERED') {
              fromContainer = this.offconData.filter( function( container ) {
                  return container.statusCode == fromLocation;
              });
          }

        ///////////////REFRESH GRID//////////////////////////////

          if ( toLoc != 'REGISTERED' ) {

              for ( let x = 0; x < toContainer[0].itemsForContainer.length; x++ ) {
                  //toContainer[0].itemsForContainer[x].primaryFlag = false;
                  this.toContainerItemsTemp.push( toContainer[0].itemsForContainer[x] );
              }

              for ( let x = 0; x < this.offpiUpdatetList.length; x++ ) {
                  this.offpiUpdatetList[x].primaryFlag = false;
                  this.toContainerItemsTemp.push( this.offpiUpdatetList[x] );
              }
          } else {
              for ( let x = 0; x < toContainer.length; x++ ) {
                  //toContainer[0].itemsForContainer[x].primaryFlag = false;
                  this.toContainerItemsTemp.push( toContainer[x] );
              }

              for ( let x = 0; x < this.offpiUpdatetList.length; x++ ) {
                  this.offpiUpdatetList[x].primaryFlag = true;
                  this.toContainerItemsTemp.push( this.offpiUpdatetList[x] );
              }
          }



          if ( fromLocation != 'REGISTERED' ) {

              var fromContainerTempItems = fromContainer[0].itemsForContainer.filter( function( properties ) {
                  return properties.primaryFlag != true;
              });

          } else {
              //var fromContainerTempItems: any;

              var fromContainerTempItems = fromContainer.filter( function( properties ) {
                  return properties.primaryFlag != true;
              });

              for ( let x = 0; x < fromContainerTempItems.length; x++ ) {
                  fromContainerTempItems[x].primaryFlag = true;
              }

          }

          //======================================================================


          this.fromContainerItemsTemp = fromContainerTempItems;


          if ( toLoc != 'REGISTERED' ) {
              toContainer[0].itemsForContainer = this.toContainerItemsTemp;
              toContainer[0].pptyItemLength = toContainer[0].itemsForContainer.length;
          } else {

              this.propetiesToContainer = this.toContainerItemsTemp;
          }

          if(fromLocation != 'REGISTERED'){
              fromContainer[0].itemsForContainer = this.fromContainerItemsTemp;
              fromContainer[0].pptyItemLength = fromContainer[0].itemsForContainer.length;
          } else {

              this.propetiesToContainer = this.fromContainerItemsTemp;
          }

      }


      this.offpiCommitModel.updateList = this.offpiUpdatetList;
      const offpiSaveData = this.oidtpritFactory.offPiCommit(this.offpiCommitModel);
      offpiSaveData.subscribe(data => {
          if (data === 1) {
//              for(let i=0;i<this.offconData.length;i++){
//              this.offconData[i].moveToContainerLov='';
//              }
              for ( let i = 0; i < this.offconData.length; i++ ) {
                  this.offconData[i]["selectedTotalValue"] = 0;
                  this.offconData[i].moveToContainerLov = '';
                  this.containerPptyList = this.offconData[i].itemsForContainer;
                  for (let j = 0; j < this.containerPptyList.length; j++) {
                      this.offconData[i]["selectedTotalValue"] += Number(this.containerPptyList[j]["propertyValue"]);
                      if (this.offconData[i].itemsForContainer[j].primaryFlag) {
                          this.offpiExecuteQuery();
                          this.offconExecuteQuery();
                      }
                  }
              }
              this.registerdAndContainerDragDrop = false;
              this.propertiesSelectedForMoving = [];
              this.selectedToLocation = null;
              this.type = 'success';
              this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
              this.show();
              if(!this.propetiesToContainer.length){
                this.disabled=true;
                    }else{
                this.disabled=false;
                }
              if ( this.addToContainerFlag ) {
                  this.offpiExecuteQuery();
                  this.offconExecuteQuery();
              }
          } else {
              return;
          }
      });
     }

     getToLocation() {
         if ( this.selectedToLocation == null || this.selectedToLocation == undefined ) {
             this.toContainerProperty = 'statusCode';
             return this.selectedStatus;
         } else{
             this.toContainerProperty = 'propertyContainerId';
             return this.selectedToLocation;
         }


     }

     getFromLocation( event ) {
         if ( event.updated.propertyContainerId == null || event.updated.propertyContainerId == undefined ) {
             this.fromContainerProperty = 'statusCode';
             return event.updated.statusCode;
         } else {
             this.fromContainerProperty = 'propertyContainerId';
             return event.updated.propertyContainerId;
         }
     }

     offpiExecuteQuery() {
         this.offpiData=[];
         this.offBkId = this.vHeaderBlockModel.offenderBookId;
         this.offpiModel.offenderBookId = this.offBkId;
         this.offpiModel.statusCode = 'REGISTERED';
         this.offpiModel.agyLocId = this.sessionManager.currentCaseLoad;
         this.propertyItemId=0;
          if(!this.propetiesToContainer.length){
                        this.disabled=true;
                 }else{
                    this.disabled=false;
                 }
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

     openCamera() {

         this.dialogService.openLinkDialog( '/CAMDLG',this.imageUrl, 50 ).subscribe( result => {
             if ( result ) {
                 var containerImage:OffenderPptyContainers = new OffenderPptyContainers;
                 if(result.imageUrl){
                     containerImage.imageUrl=result.imageUrl;
                 }
                 containerImage.offenderBookId= this.vHeaderBlockModel.offenderBookId;
                 //selectedPropertyContStatusCode

                 if(this.selectedPropertyContId === null ){

                     if(this.selectedPropertyContStatusCode === this.translateService.translate('oidmpitm.missingstatus')){
                         containerImage.propertyContainerId=1;
                     }else if(this.selectedPropertyContStatusCode === this.translateService.translate('oidmpitm.incellstatus')){
                         containerImage.propertyContainerId=2;
                     }

                 }else{
                     containerImage.propertyContainerId=this.selectedPropertyContId;
                 }



                 const imageInsertResult = this.oidmpconFactory.insertContainerImg(containerImage);
                 imageInsertResult.subscribe( imageInsertResult => {
                     this.offconExecuteQuery();
                     var imageInserted:number=0;
                     if ( imageInsertResult > 0 ) {
                         imageInserted = 1;
                         this.type = 'success';
                         this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                         this.show();
                         return imageInserted;
                     }
                     else {
                         return imageInserted;
                     }
                 } );
             }
         } );

  }

  
  setImageOnContainer(event){
    this.offconExecuteQuery();
  }
  showImage(container) {
      if (container.images && container.images.length > 0) {
          container['imageObjectType'] = 'PPTY_CONT';
                    this.dialogService.openLinkDialog('/propertyimagedialog', container, 50).subscribe(result => {
                    });
                }

      }
  /* setImageOnContainer(event){
    if ( event ) {

        var containerImage:OffenderPptyContainers = new OffenderPptyContainers;
        if(event.imageUrl){
            containerImage.imageUrl=event.imageUrl;
        }
        containerImage.offenderBookId= this.vHeaderBlockModel.offenderBookId;
        //selectedPropertyContStatusCode

        if(this.selectedPropertyContId === null ){

            if(this.selectedPropertyContStatusCode === 'MISSING'){
                containerImage.propertyContainerId=1;
            }else if(this.selectedPropertyContStatusCode === 'CELL'){
                containerImage.propertyContainerId=2;
            }

        }else{
            containerImage.propertyContainerId=this.selectedPropertyContId;
        }



        const imageInsertResult = this.oidmpconFactory.insertContainerImg(containerImage);
        imageInsertResult.subscribe( imageInsertResult => {
            this.offconExecuteQuery();
            var imageInserted:number=0;
            if ( imageInsertResult > 0 ) {
                imageInserted = 1;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                return imageInserted;
            }
            else {
                return imageInserted;
            }
        } );
    }

  } */
  showDeactivateContainer(container) {
      return ![this.translateService.translate('oidmpitm.missingstatus'),this.translateService.translate('oidmpitm.incellstatus')].includes(container.statusCode);
  }
  
  moveToSealUpdate(){
      if(this.selectedContainerData[0]!=null && this.selectedContainerData[0].sealMark){
          this.offConMoveToSealUpdate.offenderBookId=this.selectedContainerData[0].offenderBookId;
          this.offConMoveToSealUpdate.sealMark=null;
          this.offConMoveToSealUpdate.sealFlag="N";
          this.offConMoveToSealUpdate.propertyContainerId=this.selectedContainerData[0].propertyContainerId;
          }
      const offconInsertData = this.oidmpconFactory.offConUpdateSeal(this.offConMoveToSealUpdate);
      for(let i=0;i<this.offconData.length;i++){
          if(this.offconData[i].propertyContainerId && this.offconData[i].propertyContainerId==this.selectedContainerData[0].propertyContainerId){
              this.selectedContainerData[0].sealMark=null;
              this.selectedContainerData[0].sealShow=true;
          }
          this.offconData[i].moveToContainer.forEach(obj=>{
            if(obj.code == this.selectedContainerData[0].propertyContainerId){
             obj.sealMark=null;
            }
        })
      }
      offconInsertData.subscribe(insertdata => {
          if (insertdata === 1) {
              this.checkMultpleChangeSealVal = true;
              this.sealMarkValues = [];
          }
      });
  }
  
  
  sealMarkDialog(container){
    this.selectedContainerData[0]=container;
      if(this.selectedContainerData[0]!=null){
      this.offenderPptyUpdateSeal.offenderBookId=this.selectedContainerData[0].offenderBookId;
      this.offenderPptyUpdateSeal.sealFlag="Y";
      this.offenderPptyUpdateSeal.propertyContainerId=this.selectedContainerData[0].propertyContainerId;
      }
      this.dialogService.openLinkDialog( '/SEALDIALOG', 50,40 ).subscribe( result => {
          if ( result!=null && !(result=="Y")  ) {
           this. offenderPptyUpdateSeal.sealMark=result; 
           this.sealMark=result;
           const offconInsertData = this.oidmpconFactory.offConUpdateSeal(this.offenderPptyUpdateSeal);
           offconInsertData.subscribe(insertdata => {
               for(let i=0;i<this.offconData.length;i++){
                   if(this.offconData[i] && this.offconData[i].propertyContainerId && this.offconData[i].propertyContainerId==this.selectedContainerData[0].propertyContainerId){
                       this.selectedContainerData[0].sealMark=this.sealMark;
                       this.selectedContainerData[0].sealShow=false;
                   }
                   this.offconData[i].moveToContainer.forEach(obj=>{
                    if(obj.code == this.selectedContainerData[0].propertyContainerId){
                     obj.sealMark=this.sealMark;
                     this.sealmarkTemp=this.sealMark;
                    }
                
                })
            }
               if (insertdata === 1) {
                   this.checkMultpleChangeSealVal = true;
                   this.sealMarkValues = [];
                   this.type = 'success';
                   this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                   this.show();
                   this.showSeal=false;
               }
           });
          }   
      } );
      
      
      }
  
  clearedProperty(event){
    event.disableSaveButton=true ;
  }
  
  
  
  showDeactivatePopUp(container) {
    let offPpItmModel = new OffenderPptyItems();
    offPpItmModel.offenderBookId = container.offenderBookId;
    offPpItmModel.propertyContainerId = container.propertyContainerId;
      const data = {

          label: this.translateService.
          translate('oidmptim.confirmDeactivate'),
          offPpItmtxModel : offPpItmModel,
          offProperties : container.itemsForContainer
        };
        this.dialogService.openLinkDialog('/managepropsdlg', data, 90).subscribe(result => {
        if (result) {
            offPpItmModel = result;
            offPpItmModel.sealMark = container.sealMark;
            this.deactivateContainer(offPpItmModel);
        }
    });
    }
    deactivateContainer(prop) {
        this.oidmpitmFactory.deactivateContainer(prop).subscribe(data =>{
            if (data > 0) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offconExecuteQuery();
                this.populateRegisteredPropGrid();
          } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
          }
        });
    }
}
