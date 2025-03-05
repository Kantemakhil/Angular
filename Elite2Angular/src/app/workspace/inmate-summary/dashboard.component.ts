import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, Injectable, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { log } from 'console';
import { MatMenuTrigger } from '@angular/material/menu';



@Component( {
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    selector: 'dashBoardComponent'
} )
@Injectable({providedIn: 'root'})
export class DashBoardComponent implements OnInit, OnDestroy {
 
    sidebarClick: boolean;
    private unsubscribe: Subject<void> = new Subject<void>();

    disabledBooking: Boolean = true;
   
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    translateLangOffendrGlobalSearch: string;
    translateLangConfirmation: string;

    alertData : string;
    translateGlobalSearchInfo: string;
  
    componentsDisable: Boolean = false;

    indexVal:number;
    selectedOptions: number[];
    container2Class: string = "hide";
    isAddDisabled: boolean = false;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    @ViewChild('configList', {static: true}) configList:MatSelectionList;
    offenderid :any;
    fieldElement :any;
    container1: Container;
    container2: Container;
    
    constructor(  public translateService: TranslateService,private sessionManager: UserSessionManager,
            private offenderSearchService: OffenderSearchService,private activatedRoute: ActivatedRoute, private injectOffenderService: InjectOffenderService) {
    }
    ngOnDestroy() {
    }
    ngOnInit() {
        this.injectOffenderService.injectOffender(this.activatedRoute);
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        
        this.fieldElement = <HTMLBaseElement>document.getElementsByTagName("mat-expansion-panel")[0];
        
        this.container1 = new Container(1, 'Container 1', [
                                                     ] );
        this.container2 = new Container(2, 'Container 2', [ 
                                                            new Box(this.translateService.translate('owheader.personal.title'),1,this.translateService.translate('owheader.personal.title')), 
                                                            new Box(this.translateService.translate('owheader.alert.title'),2,this.translateService.translate('owheader.alert.title')),
                                                            new Box(this.translateService.translate('owheader.legal.title'),3,this.translateService.translate('owheader.legal.title')),
                                                            new Box(this.translateService.translate('owheader.movement.title'),4,this.translateService.translate('owheader.movement.title')),
                                                            new Box(this.translateService.translate('owheader.assessment.title'),5,this.translateService.translate('owheader.assessment.title')),
                                                            new Box(this.translateService.translate('owheader.privilege.title'),6,this.translateService.translate('owheader.privilege.title')),
                                                            new Box(this.translateService.translate('owheader.schedule.title'),7,this.translateService.translate('owheader.schedule.title')),
                                                            new Box(this.translateService.translate('owheader.trust.title'),8,this.translateService.translate('owheader.trust.title')),
                                                            new Box(this.translateService.translate('owheader.supervision.title'),9,this.translateService.translate('owheader.supervision.title')),
                                                            new Box(this.translateService.translate('owheader.ieplevel.title'),10,this.translateService.translate('owheader.ieplevel.title'))
                                                            ]);
        var boxIds = window.localStorage.getItem(this.sessionManager.getId());
        
        if(boxIds == null || boxIds == "Undefined") {
            boxIds = "1,2,5";
            window.localStorage.setItem(this.sessionManager.getId(), "1,2,5"); 
        } 
        var boxIdsArrays = boxIds.split(",");
        
        boxIdsArrays.forEach((boxId:string)=>{this.addComponent(boxId)});
        
     }
    
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
    }
    
    dragOperation: boolean = false;

    widgets: Array<Box> = [];
    movePosition($event: any, x) {
        if ($event) {
            this.updateLocalStorage();
        }
    }
    
    /*adjustContainrHeight() {
        let length = this.container1.widgets.length;
        let containerHeight = 400 + (~~(length/4)*400);
        this.fieldElement.style.height = containerHeight+"px";
    }*/
    /*
     * Remove Component From Container 1 and add the same component in container 2.
     */
    removeComponent(boxId) {
        
        var index = this.container1.widgets.findIndex((box: Box)=> { 
                if(box.id == boxId) {
                    this.container2.widgets.push(box);
                    return true;
                }
           } 
        );
        this.container1.widgets.splice(index, 1);
        this.updateLocalStorage();
    }
    
    showHide() {
        if(this.container2Class === "hide") {
            this.container2Class = "show";
        } else {
            this.container2Class = "hide";
        }
    }
    stopCloseMenu($event:any){
        $event.stopPropagation();
    }
    addComponents() {
        
        let matSelectionList : MatSelectionList = this.configList;
        let matListOptions : MatListOption[] = matSelectionList.selectedOptions.selected;
        matListOptions.forEach((matListOption:  MatListOption) =>{
            
            this.addComponent(matListOption.value);
        });
        this.selectedOptions = [];
        this.showHide();
    }
    
    addComponent(boxId) {
        
        var index = this.container2.widgets.findIndex((box: Box)=> { 
                if(box.id == boxId) {
                    this.container1.widgets.push(box);
                    return true;
                }
           } 
        );
        if(index!=-1)
        this.container2.widgets.splice(index, 1);
        this.updateLocalStorage();
    }
    
    updateLocalStorage() {
        var boxIds = "";
        this.container1.widgets.forEach((box : Box)=> {boxIds=boxIds+box.id+","});
        window.localStorage.setItem(this.sessionManager.getId(), boxIds); 
    }
    
    
    onSidebarClick(event: Event) {
        this.sidebarClick = true;
    }
    
    onTabClick(event: Event, index: number) {
        event.preventDefault();
    }

    widclick(){
        console.log("I am srikanth");
        
    }

    
}
class Container {
    constructor(public id: number, public name: string, public widgets: Array<Box>) {}
  }

  class Box {
    constructor(public name: string, public id: number, public description:string) {}
  }
