import {
    Component, OnInit, Input, Output, EventEmitter, ContentChildren,
    QueryList, AfterContentInit, AfterContentChecked
} from '@angular/core';
// import { MatTabChangeEvent } from '@angular/material';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TabComponent } from '../tab/tab.component';

enum AccessLevel {
    none,
    view,
    full
}

@Component( {
    selector: 's4-tabgroup',
    templateUrl: './tabgroup.component.html',
    styleUrls: []
} )
export class TabgroupComponent implements OnInit, AfterContentInit, AfterContentChecked {
  
    @Input()
    isCustomTab:boolean = false;
    elementId:string;
    selectedTab:string;
    
    @ContentChildren( TabComponent, { descendants: true } ) tabs: QueryList<TabComponent>;
    
    @Input()
    selectedIndex: number;
    @Output()
    selectedIndexChange: EventEmitter<number> = new EventEmitter();

    @Output()
    selectedTabChange: EventEmitter<MatTabChangeEvent> = new EventEmitter();
    
    @Output()
    customTabChanged: EventEmitter<MatTabChangeEvent> = new EventEmitter();

    @Input()
    id: string;
    
    constructor() { }

    ngOnInit() {
    }

    onTabChange( e ) {
        
        this.selectedTabChange.emit( e );
        this.selectedIndexChange.next( e.index );
    }

    ngAfterContentChecked() {
       
    }

    ngAfterContentInit() {
    
    }
    
   toggleContent(index) {
       for (var i = 0; i <this.tabs.length; i++) {
       const fieldElement = <HTMLInputElement>document.getElementById("customTab"+i);
       
           if( i== index){
               document.getElementById("customTabContent"+index).classList.add("show");
               document.getElementById("customTabContent"+index).classList.remove("hide");
               fieldElement.classList.add("active");
           }else {
               document.getElementById("customTabContent"+i).classList.add("hide");
               document.getElementById("customTabContent"+i).classList.remove("show");
               fieldElement.classList.remove("active");
           }
       }
   }

    onCustomTabChange(evt,index) {
        this.selectedTab=evt.currentTarget.id;
        this.toggleContent(index);   
        this.customTabChanged.next( evt.index);
        return false;
    }
}
