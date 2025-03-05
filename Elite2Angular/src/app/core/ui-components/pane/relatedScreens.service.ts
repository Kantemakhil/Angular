import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import {  Subject } from 'rxjs';
import { RelatedScreens } from './RelatedScreens';
import { Router } from '@angular/router';

@Injectable()
export class RelatedScreensService {
    
    involvementFlag:boolean;
    entriesOfRelatedScreens: Map<string, RelatedScreens[]> = new Map<string, RelatedScreens[]>();
    currentAccesedScreens:any[]=[];

    constructor( private http: HttpService, private router: Router ) {}

    resetService(){
        this.involvementFlag = undefined;
        this.currentAccesedScreens = [];
        this.entriesOfRelatedScreens.clear();
        this.initializeService();
    }

    initializeService() {
        this.relatedScreens().subscribe(resultList => {
            let relatedDetails: any = [];
            let prevModuleName = "";
            let previousRelatedData: any
            for (let relatedFlow of resultList) {
                if (previousRelatedData === '' || prevModuleName !== relatedFlow.moduleName) {
                    relatedDetails = [];
                    relatedDetails.push(relatedFlow);
                    //Assining to Map
                    this.entriesOfRelatedScreens.set(relatedFlow.moduleName, relatedDetails);
                } else {
                    relatedDetails.push(relatedFlow);
                }
                previousRelatedData = relatedFlow;
                prevModuleName = relatedFlow.moduleName;
            }
        });
    }

    relatedScreens(): any {

        return this.http.get( 'relatedScreens/getRelatedScreens' );
    }
    

    selectedScreenNavigate(relatedScreen:any) {
        if ( relatedScreen) {
            this.router.navigate( [relatedScreen.accessModuleName] );
        }
    }
    
    allotedScreensforCurrentScreen( screenId ): RelatedScreens[] {
        return this.entriesOfRelatedScreens.get(screenId);
        }
    
    currentSelectedScreens(screenId:string){
        this.currentAccesedScreens= this.allotedScreensforCurrentScreen(screenId);
        
        this.messageSource.next( this.currentAccesedScreens );
    }
    
    private messageSource = new Subject<any>();
    screenChanged = this.messageSource.asObservable();
}
