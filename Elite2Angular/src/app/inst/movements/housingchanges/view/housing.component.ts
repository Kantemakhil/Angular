import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { HousingService } from '@inst/movements/housingchanges/service/housing.service';
import { Housing } from "../beans/Housing";
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from "@commonbeans/Images";
import { OmuavbedLivUnitsQuery } from '@instdemographicsbeans/OmuavbedLivUnitsQuery';
import { OmuavbedService } from '@inst/demographics-biometrics/service/omuavbed.service';
import { Observable, fromEvent } from 'rxjs';
import { take, map } from 'rxjs/operators';
@Component({
    selector: 'housing',
    templateUrl: './housing.component.html',
    styleUrls: ['./housing.component.scss']
})



export class HousingComponent implements OnInit {
    msgs: any[] = [];
    housingLocations : any;
    dataForBreadCrums : any;
    housingLocation : Housing = new Housing(); 
    heightPercentage:number;
    heightRemains:number;
    baseImage:string;
    baseClass:string;
    nextPage:string="";
    breadCrumbs:any[]=[];
    chkFloorPlan:string="";
    nextBreadcrumb:string="";
    navigateCount:number=0;
    imageMap= new Map();
    navigateFloorPlan:number=1;
    floorPlan:any;
    breadCrumbsNav:any[]=[];
    bedInfo: Housing[]=[];
    isEnableBedInfoGrid:boolean;    
    selectedInternalLocationId:number;
    conflictsCount:number;
    isConflictsInfo:boolean;
    currentInternalLocationId:number=0;
    currentAllocatedBeds:number=0;
    currentInternalLocationType:string=null; 
    currentFloorPlanId:string=null;
    isClosed:boolean=false;
    imageModel: Images = new Images();
    showHtml: boolean;
    isDblClick:boolean=false;
    livingunitsModel: OmuavbedLivUnitsQuery = new OmuavbedLivUnitsQuery();
    showOffenderDetails:boolean=false;
    showBedsDetails:boolean=false;
    showOnlyConflicts:boolean=false;
    availableBeds:number;
    cellDescription:string;
    internalLocationId:number;
    cellLocationCode:string;
    isAssignable:boolean=false;
    selectedFloorPlanId:number;
    hotspotStyle:string;
    selectedFlrPlnIdForBrdcrmb:number;
    breadCrumbsList:Housing[]=[];
    internalLocationType:string;
    hotspotDecs:string;
    isCellClicked:boolean;
    parentInternalLocId:number;
    selectedHotSpotId:number=0;
    isBacktoPreviousClicked:boolean=false;
    activeHotspotId:number;
    viewDailogClose:boolean=false;
    isEverParentNodeValue:boolean;
    showBreadCrumbs:boolean=false;
    isMoveToNextClicked:boolean=false;
    bedInfoTemp: Housing[]=[];
    public unitImageSize: ImageSize;
    radius: number;
    constructor(public translateService: TranslateService, public housingService:HousingService,private osiosearchService: OsiosearService
        ,private omuavbedFactory: OmuavbedService,private osiosearservice: OsiosearService) {   
    }
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
 
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    ngOnInit() {
    	this.showHtml=false;
        this.bedInfo=[];        
        this.getBreadCrumbs(1);
        this.baseClass="circle";
        this.housingLocations=[];
        this.dataForBreadCrums=[];
        this.floorPlan=[];
        this.dialog.data;
        this.vHeaderBlockModel=this.dialog.data;
        this.populateAllImages();
    }
    populateHousingInfo(housingLocation) {
        if(this.chkFloorPlan === ""){
            this.chkFloorPlan="Y";
        }else{
            this.chkFloorPlan="N";
        }
        if(this.housingLocation.floorPlanNextId === 1){
            this.chkFloorPlan = "Y";
        }
        let queryParam = {
                offenderBookId:this.vHeaderBlockModel.offenderBookId,
                offenderId:this.dialog.data.offenderId,                
                internalLocationId:this.dialog.data.livingUnitId,
                internalLocationType:this.housingLocation.internalLocationType,
                rootFloorPlan:this.chkFloorPlan,
                floorPlanNextId:this.housingLocation.floorPlanNextId,
                description:housingLocation.description,
                agyLocId:this.dialog.data.agyLocId,
                pLevel1Code:housingLocation.pLevel1Code,
                pLevel2Code:housingLocation.pLevel2Code,
                pLevel3Code:housingLocation.pLevel3Code,
                pLevel4Code:housingLocation.pLevel4Code
                }          
            this.housingService.populateAllHousing(queryParam).subscribe( data => {
                this.housingLocations = data;
                data.forEach(obj=>{
                    if(obj.capacity-obj.allocatedBeds === 0){
                        obj.stroke='#f94142';
                        obj.fill='#f94142';
                    }else{
                        obj.stroke='green';
                        obj.fill='green';
                    }
                })
                if(housingLocation.rootFloorPlan === 'Y' && housingLocation.internalLocationType=="TIER") {
                    this.getConflictsInfo(this.housingLocations);
                  }
                  if(data){
                   
                    this.imageModel.imageId = data[0].imageId;
                    
                  }
                for ( var i = 0; i < this.breadCrumbs.length-1; i++ ) {
                    document.getElementById( "brdcum" + i ).classList.remove( "active" );
                }
                this.populateBaseImageAndHotspot(this.imageModel);
        });
    }
    assignConflicts() {       
        const livingunitsResult = this.omuavbedFactory.livingUnitsExecuteQuery(this.livingunitsModel);
        livingunitsResult.subscribe(livingunitsResultList => {
            if (livingunitsResultList.length === 0) {
                this.housingLocation.conflict = "None";
            } else {
                livingunitsResultList.forEach(living => {
                    living.unitAtCapacity = (living.unitAtCapacity === 'Y') ? true : false;
                    living.prisonerConflict = (living.prisonerConflict === 'Y') ? true : false;
                    living.securityConflict = (living.securityConflict === 'Y') ? true : false;
                    living.cellSharingConflict = (living.cellSharingConflict === 'Y') ? true : false;
                    this.housingLocation.conflict="";
                    if(living.unitAtCapacity) {
                        this.housingLocation.conflict=", Operational Capacity";
                    }
                    if(living.prisonerConflict) {
                        this.housingLocation.conflict=this.housingLocation.conflict + ", Offender Conflict";
                    }
                    if(living.securityConflict) {
                        this.housingLocation.conflict=this.housingLocation.conflict + ", Security Conflict";
                    }
                    if(living.cellSharingConflict) {
                        this.housingLocation.conflict=this.housingLocation.conflict + ", Cell Sharing Conflict ";
                    }
                    
                    if(!living.unitAtCapacity && !living.prisonerConflict && !living.securityConflict && !living.cellSharingConflict){
                        this.housingLocation.conflict=", None"
                    }
                    this.housingLocation.conflict=this.housingLocation.conflict.substring(1, this.housingLocation.conflict.length);
                    
                });
            }
        });
    
    }
    
    hotspotClick( housingLocation ) {
       this.isAssignable=false;
      
       this.isEverParentNodeValue=true;
       this.isMoveToNextClicked = false;
       this.isEverParentNode(housingLocation.internalLocationId);
       this.isCellClicked=true;
       this.isDblClick=false;
       this.cellDescription=housingLocation.description;
       this.internalLocationId=housingLocation.internalLocationId;
        this.selectedHotSpotId=housingLocation.internalLocationId;
       this.cellLocationCode=housingLocation.internalLocationCode;
       this.populateHotSpot(this.housingLocations);
       this.isConflictsInfo = false;
       this.showBedsDetails = false;
       
        for ( var i = 0; i < this.housingLocations.length; i++ ) {
            if ( housingLocation == this.housingLocations[i] ) {
                this.housingLocations[i].baseClass=this.baseClass+" hp_active";
            } else {
                this.housingLocations[i].baseClass=this.baseClass;
            }
        }
        this.housingLocations=this.housingLocations;
        housingLocation.availBeds = housingLocation.capacity - housingLocation.allocatedBeds;
        this.housingLocation = housingLocation;
        if(this.housingLocation.capacity>0) {
            if(this.housingLocation.allocatedBeds>0){
                this.showBedsDetails=true;
            }
            
            this.showOnlyConflicts=false;
            this.showOffenderDetails=false;
            if(this.isEverParentNodeValue||this.isEverParentNodeValue==undefined) {
                this.isAssignable = false;
            }else {
                this.isAssignable = true;
            }
            
        } 
        this.housingLocation.showOffenderDetails=this.showOffenderDetails;
        this.housingLocation.showBedsDetails=this.showBedsDetails;
        this.housingLocation.showOnlyConflicts=this.showOnlyConflicts;
        this.housingLocation.isAssignable=this.isAssignable;
        if(housingLocation.floorPlanNextId==null) {
            this.showBedsDetails=false;
            this.livingunitsModel.pAgyLocId=this.dialog.data.agyLocId;
            this.livingunitsModel.pOffenderBookId=this.vHeaderBlockModel.offenderBookId;
            let levelCode =  housingLocation.description.split("-");
               for(let i=levelCode.length-1;i>=1;i--) {               
                   if(i==levelCode.length-1) {
                       this.livingunitsModel.pLevel4Code=levelCode[i];
                   }else if(i==levelCode.length-2) {
                       this.livingunitsModel.pLevel3Code=levelCode[i];
                   }else if(i==levelCode.length-3) {
                       this.livingunitsModel.pLevel2Code=levelCode[i];
                   }else if(i==levelCode.length-4) {
                       this.livingunitsModel.pLevel1Code=levelCode[i];
                  }
               }
               this.assignConflicts();
            } else if(!this.showBedsDetails){
                this.isConflictsInfo=true;
                this.housingLocation.showOnlyConflicts=true;
                this.housingLocation.conflict = "None";
            }
       
       if (housingLocation.floorPlanNextId==null){
           this.housingService.populateAllocatedOffDetails(housingLocation).subscribe( data => {
               if(data.length>0) {
                   if(data[0].capacity==1 && housingLocation.availBeds==0) {
                       this.housingLocation = data[0];
                       this.housingLocation.showOffenderDetails=true;
                       this.housingLocation.showBedsDetails=false;
                       this.housingLocation.showOnlyConflicts=false;
                       this.isAssignable = false;
                       this.housingLocation.availBeds=housingLocation.availBeds;
                       this.housingLocation.description=this.cellDescription;
                       this.housingLocation.internalLocationId=this.internalLocationId;
                       this.housingLocation.internalLocationCode=this.cellLocationCode;
                       this.housingLocation.isAssignable=this.isAssignable;
                       this.housingLocation.offenderBookId=this.vHeaderBlockModel.offenderBookId;
                       this.housingLocation.floorPlanId=this.selectedFloorPlanId;
                       this.housingLocation.image  = 'data:image/JPEG;base64,' + this.housingLocation.imageThumbnail;
                   }else {
                       if(this.housingLocation.capacity === 1  && this.housingLocation.allocatedBeds ===0){
                        this.housingLocation.showBedsDetails=false;
                        this.housingLocation.showOnlyConflicts=true;
                       }else{
                        this.housingLocation.showBedsDetails=true;
                        this.housingLocation.showOnlyConflicts=false;
                       }
                        
                         this.housingLocation.showOffenderDetails=false;
                        
                         if(this.housingLocation.allocatedBeds>0){
                            this.housingLocation.isViewEnable=true;
                         }else {
                            this.housingLocation.isViewEnable = false;
                           }
                         if(this.housingLocation.availBeds>0 && !this.isEverParentNodeValue) {
                             this.isAssignable = true;
                             this.housingLocation.isAssignable=this.isAssignable;
                         }else{
                             this.isAssignable = false;
                             this.housingLocation.isAssignable=this.isAssignable;
                             }
                     }
               }else {
                   if(this.isEverParentNodeValue) {
                       this.housingLocation.showOffenderDetails=false;
                       this.housingLocation.showOnlyConflicts=false;
                       //this.housingLocation.showBedsDetails=true;
                       if(this.housingLocation.allocatedBeds>0){
                        this.housingLocation.showBedsDetails=true;
                       }else{
                        this.housingLocation.showOnlyConflicts=true;
                        this.housingLocation.conflict = "None";
                       }
                       
                       
                   }else {
                       this.housingLocation.showOffenderDetails=false;
                       this.housingLocation.showBedsDetails=false;
                       
                       this.housingLocation.showOnlyConflicts=true;
                       if(this.housingLocation.availBeds>0 && !this.isEverParentNodeValue) {
                               this.isAssignable = true;
                               this.housingLocation.isAssignable=this.isAssignable;
                       }else{
                           this.isAssignable = false;
                           this.housingLocation.isAssignable=this.isAssignable;
                       }
                   }
                   
                   
               }
               
                 
             });
           }
        }

    movetonext( housingLocation ) {
           if ( housingLocation.floorPlanNextId != null ) { 
               housingLocation.isExploreFurtherEnable=false;
               this.isCellClicked=false;
                this.parentInternalLocId=0;
                this.isDblClick=true;
                this.isConflictsInfo=false;  
                this.housingLocation.isViewEnable=false;
                this.showHtml=false;
                this.currentInternalLocationId=housingLocation.internalLocationId;
                this.currentAllocatedBeds=housingLocation.allocatedBeds;
                this.currentInternalLocationType=housingLocation.internalLocationType;
                this.currentFloorPlanId=housingLocation.floorPlanId;
                this.selectedFloorPlanId=housingLocation.floorPlanId;
                this.selectedFlrPlnIdForBrdcrmb=housingLocation.floorPlanNextId;
                this.getBreadCrumbs(housingLocation.floorPlanNextId );
          if ( housingLocation.rootFloorPlan === 'N' ) {
              this.isMoveToNextClicked=true;
            this.selectedInternalLocationId = housingLocation.internalLocationId;
          }
          this.housingLocation.isConflictView = false;
            this.imageModel.imageId = this.imageMap.get(housingLocation.floorPlanNextId);
        }
    }
            
    navigate( breadCrumb ) {
        this.isConflictsInfo=false;
        this.isMoveToNextClicked=false;
        this.housingLocation.isViewEnable=false;
        this.showHtml=false;
        this.isDblClick = false;
        this.housingLocation.isConflictView = false;
        if(breadCrumb.Floor_Plan_Id == 2){
            this.getConflictsInfo(this.dataForBreadCrums);
        }
        this.isEnableBedInfoGrid = false;
        this.housingLocations = [];
        this.getBreadCrumbs(breadCrumb.Floor_Plan_Id);
        if(breadCrumb.Floor_Plan_Id==1){
            this.baseClass = "circle";
        }
        else{
            this.baseClass = "cell-circle";
        }
        this.housingLocation.floorPlanNextId = breadCrumb.Floor_Plan_Id;

    }
    allocatedBeds(value){
        this.dialog.close({allocated : value.allocated,
                           internalLocationId:value.internalLocationId,
                           warningMsg:value.warningMsg
        });
    }
    
    cancel(count): void {
        this.dialog.close(null);
      }

    getBedInfo(internalId){       
        let queryParam = {                           
                    internalLocationId:internalId,
                    agyLocId:this.dialog.data.agyLocId,
                }
        this.housingService.populateBedInfo(queryParam).subscribe( data => {
            this.bedInfo = data;  
            if(this.bedInfo.length > 0){
                for(let i=0; i<this.bedInfo.length; i++){
               /*  let descSplit = this.bedInfo[i].description.split("-");
                let bedInfoSplit = descSplit[descSplit.length-1].split(" ");
                let cellInfoSplit1 = descSplit[descSplit.length-2];
                let cellNo = cellInfoSplit1.substring( 4, cellInfoSplit1.length );                
                this.bedInfo[i].cell = Number(cellNo);
                this.bedInfo[i].bed = cellNo+" "+bedInfoSplit[1]; */ 
                
                this.bedInfo[i].cellCode =this.housingLocation.internalLocationCode;
                this.bedInfo[i].bed= this.bedInfo[i].description;
                if(this.bedInfo[i].imageId!=null && this.bedInfo[i].imageThumbnail){
                this.bedInfo[i]['image']  = 'data:image/JPEG;base64,' + this.bedInfo[i].imageThumbnail;
                }

                /* if(this.bedInfo[i].imageId!=null){
                    let imageModel ={'imageId':this.bedInfo[i].imageId};
                    this.osiosearservice.imageExecuteQuery( imageModel ).subscribe( imageData => {
                        this.bedInfo[i]['image']  = "assets/icons/eoff_icons/download_24x24.png";
                        //this.bedInfo[i]['image']  = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                        
                    }); 
                }   */             
            }
            }
        });
       }
        getBedInfoForSelectedHotSpot(internalId){       
        let queryParam = {                           
                    internalLocationId:internalId,
                    agyLocId:this.dialog.data.agyLocId,
                }
        this.housingService.populateBedInfoForSelectedHotSpot(queryParam).subscribe( data => {
            this.bedInfo = data; 
           
            if(this.bedInfo.length > 0){
                for(let i=0; i<this.bedInfo.length; i++){
                /* let descSplit = this.bedInfo[i].description.split("-");
                let bedInfoSplit = descSplit[descSplit.length-1].split(" ");
                let cellInfoSplit1 = descSplit[descSplit.length-2];
                let cellNo = cellInfoSplit1.substring( 4, cellInfoSplit1.length );                
                this.bedInfo[i].cell = Number(cellNo);
                this.bedInfo[i].bed = cellNo+" "+bedInfoSplit[1];    */ 
                this.bedInfo[i].cellCode =this.housingLocation.internalLocationCode;
                this.bedInfo[i].bed= this.bedInfo[i].description;
                if(this.bedInfo[i].imageId!=null && this.bedInfo[i].imageThumbnail){
                this.bedInfo[i]['image']  = 'data:image/JPEG;base64,' + this.bedInfo[i].imageThumbnail;
                }
                /* this.bedInfo[i].imageId=12589; */
               // this.bedInfo[i]['image']  = 'assets/images/person_search_2.png';
                /* if(this.bedInfo[i].imageId!=null){
                    let imageModel ={'imageId':this.bedInfo[i].imageId};
                    this.osiosearservice.imageExecuteQuery( imageModel ).subscribe( imageData => {
                        this.bedInfoTemp=JSON.parse(JSON.stringify(this.bedInfo));
                        this.bedInfoTemp[i]['image']  = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;

                        this.bedInfo=JSON.parse(JSON.stringify(this.bedInfoTemp));
                        
                    }); 
                }      */       
            }
            }
        });
       }
    viewAllocatedBedInfo(event){     
          
        this.isEnableBedInfoGrid=false;
        if(event){
            this.isEnableBedInfoGrid=true;
            if((this.selectedInternalLocationId>0 && this.isDblClick)||this.selectedInternalLocationId==this.selectedHotSpotId){
             this.getBedInfo(this.selectedInternalLocationId);
            }
             else{
            this.getBedInfoForSelectedHotSpot(this.selectedHotSpotId);
          }
       }
    }
    
    getConflictsInfo(housingLocations){
        this.dataForBreadCrums = housingLocations;
        this.conflictsCount = 0;
        for(let i=0;i<housingLocations.length;i++) {
               if(housingLocations[i].cellSharingConflict=='Y')
                    this.conflictsCount=this.conflictsCount+1;
               if(housingLocations[i].offenderConflict=='Y')
                    this.conflictsCount=this.conflictsCount+1;
               if(housingLocations[i].oprationalConflict=='Y')
                    this.conflictsCount=this.conflictsCount+1;
               if(housingLocations[i].securityConflict=='Y')
                    this.conflictsCount=this.conflictsCount+1;
            }
        this.housingLocation.totalConflicts = this.conflictsCount;
        this.housingLocation.isConflictView = true;           
        this.isConflictsInfo=true;
    }
    
    populateBaseImageAndHotspot(imageModel){
        this.osiosearchService.imageExecuteQuery(imageModel).subscribe( imageData => {
            this.housingLocation.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
            this.baseImage= this.housingLocation.image;
            this.getImgSize(this.baseImage).subscribe(
                (imageSize) => {
                    this.unitImageSize = imageSize;
                    if(this.unitImageSize && this.unitImageSize.width){
                        this.radius=(this.unitImageSize.width)/1500;
                        for ( var i = 0; i < this.housingLocations.length; i++ ) {
                            this.housingLocations[i].radius=(this.radius*15);
                        }
                        
                    }
                },
                (error) => {
                    
                }
            );
            if(this.baseImage!=null || this.baseImage!='') {
                this.populateHotSpot(this.housingLocations);                
                
            }
       }); 
    }

    private getImgSize(imageSrc: string): Observable<ImageSize> {
        const mapLoadedImage = (event): ImageSize => {
            return {
                width: event.target.width,
                height: event.target.height,
            };
        };
        const image = new Image();
        const $loadedImg = fromEvent(image, 'load').pipe(
            take(1),
            map(mapLoadedImage)
        );
        image.src = imageSrc;
        return $loadedImg;
    }
    populateHotSpot(housingLocations){
        var tempHousingLocation = new Housing(); 
        var totalBeds = 0;
        var availableBeds = 0;
        var fillBeds = 0;
        for ( let i = 0; i < housingLocations.length; i++ ) {
            this.housingLocations[i].baseClass=this.baseClass;
            this.housingLocations[i].height = "0%"
            this.housingLocations[i].remainsheight = "100%"
            if(this.isDblClick||this.isBacktoPreviousClicked) {
                if(housingLocations[i].internalLocationType=="BLOCK"||housingLocations[i].internalLocationType=="TIER") {
                    totalBeds = totalBeds + housingLocations[i].capacity;
                    availableBeds = availableBeds + housingLocations[i].availBeds;
                    fillBeds = fillBeds + housingLocations[i].allocatedBeds;
                    }
                } else {
                    totalBeds = totalBeds + housingLocations[i].capacity;
                    availableBeds = availableBeds + housingLocations[i].availBeds;
                    fillBeds = fillBeds + housingLocations[i].allocatedBeds;
                    }
                this.heightRemains = 0;
               
                this.housingLocations[i].hotspotStyle="percentage";
                this.heightPercentage = ( housingLocations[i].allocatedBeds * 100 ) / housingLocations[i].capacity;
                this.heightRemains= 100 - this.heightPercentage;
                this.housingLocations[i].remainsheight = String( this.heightRemains ) + "%";
                this.housingLocations[i].height = String( this.heightPercentage ) + "%";
            if(housingLocations[i].oprationalConflict=="Y") {
                this.housingLocations[i].hotspotStyle="operational_conflict";
                this.housingLocations[i].top = String( housingLocations[i].yCoordinate ) + "px";
                this.housingLocations[i].left = String( housingLocations[i].xCoordinate ) + "px";
            }else if(housingLocations[i].securityConflict=="Y") {
                this.housingLocations[i].hotspotStyle="security_conflict";
                this.housingLocations[i].top = String( housingLocations[i].yCoordinate ) + "px";
                this.housingLocations[i].left = String( housingLocations[i].xCoordinate ) + "px";
            }else {
                this.housingLocations[i].top = String( housingLocations[i].yCoordinate ) + "px";
                this.housingLocations[i].left = String( housingLocations[i].xCoordinate ) + "px";
            }
        }
        
        if(!this.isDblClick){
           tempHousingLocation.capacity = totalBeds;
           tempHousingLocation.allocatedBeds = fillBeds;
           tempHousingLocation.availBeds = totalBeds-fillBeds;
           this.availableBeds=tempHousingLocation.availBeds;
           tempHousingLocation.isViewEnable = this.housingLocation.isViewEnable;
           this.housingLocation = tempHousingLocation;
           this.housingLocation.showBedsDetails=true;           
           this.housingLocation.isConflictView = this.isConflictsInfo;
           this.housingLocation.totalConflicts = this.conflictsCount;  
        }
           
           this.showHtml=true;
           
           if ( this.isMoveToNextClicked && this.housingLocation.allocatedBeds>0) {
           this.housingLocation.isViewEnable=true;
           }
          this.showBreadCrumbs=true;
           
    }

    populateAllImages(){
        this.housingService.populateAllImages().subscribe(imageList => {
            for(let i = 0; i < imageList.length; i++ ){
                this.imageMap.set(imageList[i].floorPlanId,imageList[i].imageId);
            }
        });
    }
    getBreadCrumbs(floorPlanNextId){
        this.housingService.getBreadCrumbs(floorPlanNextId).subscribe(data => {
            this.breadCrumbsList=[];
            this.breadCrumbs=[];
            this.breadCrumbsList=data;
            for(var i=0;i< this.breadCrumbsList.length;i++){
                 if(i==this.breadCrumbsList.length-1){
                     this.selectedInternalLocationId=this.breadCrumbsList[i].internalLocationId;
                     //this.isDblClick=true;
                }
                if(floorPlanNextId==1){
                    this.breadCrumbs.push( { description: this.vHeaderBlockModel.agyLocId, Floor_Plan_Id: this.breadCrumbsList[i].floorPlanId,internalLocationType:this.internalLocationType,
                      hotspotDecs:this.hotspotDecs} );
                    break;
                }
                else{
                if(i==0){
                this.breadCrumbs.push( { description: this.breadCrumbsList[i].agyLocId, Floor_Plan_Id: 1,internalLocationType:this.internalLocationType,
                    hotspotDecs:this.hotspotDecs} );
                this.breadCrumbs.push( { description: this.breadCrumbsList[i].internalLocationCode, Floor_Plan_Id: this.breadCrumbsList[i].floorPlanId,internalLocationType:this.internalLocationType,
                    hotspotDecs:this.hotspotDecs} );
                }
                else{
                    this.breadCrumbs.push( { description: this.breadCrumbsList[i].internalLocationCode, Floor_Plan_Id: this.breadCrumbsList[i].floorPlanId,internalLocationType:this.internalLocationType,
                        hotspotDecs:this.hotspotDecs} );  
                }}
            }
                    this.housingLocations = [];
                    if(floorPlanNextId==1){
                        this.baseClass = "circle";
                    }
                    else{
                        this.baseClass = "cell-circle";
                    }
                for ( var i = 0; i < this.breadCrumbs.length-1; i++ ) {
                    document.getElementById( "brdcum" + i ).classList.remove( "active" );
                }
                for(var j=0;j< this.breadCrumbs.length;j++){
                    if(j==1) {
                        this.housingLocation.pLevel1Code=this.breadCrumbs[j].description;
                    }
                    if(j==2) {
                        this.housingLocation.pLevel2Code=this.breadCrumbs[j].description;
                    }
                    if(j==3) {
                        this.housingLocation.pLevel3Code=this.breadCrumbs[j].description;
                    }
                    if(j==4) {
                        this.housingLocation.pLevel4Code=this.breadCrumbs[j].description;
                    }
                }
                if(this.breadCrumbs.length>=1) {
                    this.populateHousingInfo(this.housingLocation);
                }
                
        });
    }

    /*to get back unit from grid view*/   
    backtoPrevious(){         
        this.isEnableBedInfoGrid=false;
        this.housingLocation.isViewEnable = true;
        this.isBacktoPreviousClicked=true;
    
    }
    
    isEverParentNode(internalLocationId) {
        const isParentNode = this.housingService.isEverParentNode(internalLocationId).subscribe( result => {
            this.isEverParentNodeValue=result;
            if(this.isEverParentNodeValue) {
                this.isAssignable=false;
            }else {
                this.isAssignable=true;
            }
        });
        
    }

    
}
interface ImageSize {
    width: number;
    height: number;
}