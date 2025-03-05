import { Component, OnInit, Injectable, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';


@Component( {
    templateUrl: './housing_info.component.html',
    providers: [],
    styleUrls: ['./housing_info.component.scss'],
    selector: 'housing-infoComponent'
} )

@Injectable({providedIn: 'root'})
export class HousingInfoComponent implements OnInit {
    private innerHouseRecords: any = {};
    totalBeds:number=0;
    availableBeds:number=0;
    allocatedBeds:number=0;
    floorName:String="";
    isEnable:boolean=false;
    isShowInfo:boolean=false;
    title:string = ""; 
    isShowAllocatedInfo:boolean=false;
    isShowConflict:boolean=false;
    @Output() exploreToNext: EventEmitter<any> = new EventEmitter<any>();
    isEnableAllocatedBed:boolean;
    @Output() toViewInfo: EventEmitter<any> = new EventEmitter<any>();
        constructor(public translateService: TranslateService) {   
    }
    ngOnInit(){
     this.title="Information";
     this.isEnableAllocatedBed=false;
    }
    
    
    get houseInfo(): any {
        return this.innerHouseRecords;
    }

    @Input()
    set houseInfo( v: any ) {
        if ( v != null ) {
            this.innerHouseRecords = v;
            if ( v.floorPlanId != null ) { 
                if ( v.floorPlanNextId != null ) {
                    v.isExploreFurtherEnable = true;
                    this.title = "Currently Selected";
                } else {
                    this.title = "Currently Selected";
                    let loc = v.description.search( "CELL" );
                    if ( loc > 0 ) {
                        v.internalLocationCode = "";
                        this.title = "Currently Selected";
                        let stringToSplit = v.description;
                        let discData = stringToSplit.split( "-" );
                        let cell = discData[discData.length - 2];
                        let cellNo = cell.substring( 4, cell.length );
                        let bed = discData[discData.length - 1];
                        let bedAdd = bed.split( " " );
                        let fullInfo = bedAdd[0] + " " + cellNo + " " + bedAdd[1];
                        v.internalLocationCode = fullInfo;
                    }
                    v.isExploreFurtherEnable = false;
                }

            } else {
                if ( v.offenderId != null ) {
                    this.title = "Currently Selected";
                    this.isShowAllocatedInfo = true;
                } else {

                    this.title = "Information";
                    this.isShowAllocatedInfo = false;
                    this.isShowConflict = true;
                    v.isExploreFurtherEnable = false;
                }
            }

        } else {
            this.title = "Currently Selected";
            v.isExploreFurtherEnable = false;
        }
        if ( v.floorPlanId != null ) {
            this.isShowInfo = true;
        }
        else {
            this.isShowInfo = false;
        }
        if ( v.floorPlanNextId == null && v.floorPlanId != null ) {
            this.innerHouseRecords.isViewEnable = true;
        }

    }
    
    explore(v){
        this.exploreToNext.emit(this.innerHouseRecords);
    }
    
    enableHousingBedInfo(){
        this.isEnableAllocatedBed=true;
        this.innerHouseRecords.isViewEnable= false; 
        this.toViewInfo.emit(this.isEnableAllocatedBed); 
    }
}