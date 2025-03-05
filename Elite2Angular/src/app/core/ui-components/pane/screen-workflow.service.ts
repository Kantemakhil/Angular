import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import {  Subject } from 'rxjs';
import {ScreenWorkFlow} from './ScreenWorkFlow';
import { Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
@Injectable()
export class ScreenWorkFlowService {

    currentAccesedScreenIds: any;
    fectchedScreenFlowData: any[] = [];
    dataOfSupportedWorkFlow: any[] = [];
    currentAccesedScreenId: any;
    entries: string[] = [];
    currentAccesedWorkFlow: string[];
    currentworkflow: string;
    routes:any[];
    entriesWorkflows: Map<string, ScreenWorkFlow[]> = new Map<string, ScreenWorkFlow[]>();
    menuMigrated: Map<string, string> = new Map<string, string>();
    currentscreen: string;

    constructor(private http: HttpService, private router: Router,  private sessionManager: UserSessionManager ) { }

    resetService() {
        this.fectchedScreenFlowData = [];
        this.entries = [];
        this.dataOfSupportedWorkFlow = [];
        this.currentAccesedWorkFlow = [];
        this.routes = [];
        this.currentAccesedScreenIds = undefined;
        this.currentAccesedScreenId = undefined;
        this.currentworkflow = undefined;
        this.currentscreen = undefined;
        this.entriesWorkflows.clear()
        this.menuMigrated.clear();
        this.initializeService();
    }

    initializeService() {
        let prevScreen = "";
        let nextScreen = "";
        let previousWorkflow: any;
        this.routes = this.router.config;
        for (let route of this.routes) {
            this.menuMigrated.set(route.path, route.path);
        }
        this.paworkflowScreen().subscribe(resultList => {
            let screenRoles = {};
            screenRoles = this.sessionManager.userRoles.roles;
            let screenList = [];
            for (const [key, value] of Object.entries(screenRoles)) {
                screenList.push(key);
            }
            const filterWorkFlowScreen = resultList.filter((elem) => {
                return screenList.some((ele) => {
                    return ele === elem.moduleName;
                });
            });
            resultList = filterWorkFlowScreen;
            let screens: any = [];
            let prevworkflowCode = "";
            for (let workflow of resultList) {
                if (this.isModuleNameExist("/" + workflow.moduleName)) {
                    if (prevworkflowCode === '' || prevworkflowCode !== workflow.workFlowCode) {
                        screens = [];
                        workflow.prevScreen = "";
                        workflow.nextScreen = "";
                        workflow.prevScreenDesc = "";
                        workflow.nextScreenDesc = "";
                        screens.push(workflow);
                        //Assining to Map
                        this.entriesWorkflows.set(workflow.workFlowCode, screens);
                    } else {
                        workflow.prevScreen = previousWorkflow.moduleName;
                        workflow.prevScreenDesc = previousWorkflow.toolTip;
                        previousWorkflow.nextScreen = workflow.moduleName;
                        previousWorkflow.nextScreenDesc = workflow.toolTip;
                        workflow.nextScreen = "";
                        screens.push(workflow);
                    }

                    previousWorkflow = workflow;
                    prevworkflowCode = workflow.workFlowCode;
                }
            }
        });
    }
    
    isModuleNameExist(href): any  {
        let filteredRoute;
        let routes = this.router.config;
        routes.forEach((route)=>{
            if(route.children) {
                let filterChild = route.children.filter(child=>{
                    if("/"+child.path === href) {
                        return true;
                    }
                    })[0];
                // 
                if(filterChild) {
                    filteredRoute = filterChild;
                }
            }
            else if("/"+route.path === href){
                filteredRoute = route;
            }
        });
        // 
        return filteredRoute;
    }
    
    iwpSupported(moduleName):any {
        return this.http.get( 'omss40/iwpSupported?moduleName='+moduleName);
    }
    
    helpLinks(moduleName): any {
        return this.http.get( 'omss40/getHelpMedia?moduleName='+moduleName);
    }
    auditPage(obj): any {
        return this.http.post('omss40/auditPage', obj);
    }

    
    paworkflowScreen(): any {

        return this.http.get( 'screen-workflow/getWorkFlowScreens' );
    }

    allWorkFlowCodeForScreen( screenId ): any[] {
        //Iterate Map with key and value
        let workflowcodes : any[] = []
        let nextworkflowcodes: any[] = [];
        let prevworkflowcodes: any[] = [];
        
        this.entriesWorkflows.forEach(( value: ScreenWorkFlow[], key: string ) => {
            //Iterate list of values against every key 
            for ( var i = 0; i < value.length; i++ ) {
                if ( value[i].moduleName === screenId ) {
                    let nextScreendescription = value[i]["nextScreenDesc"];
                    if(!value[i]["nextScreenDesc"] || value[i]["nextScreenDesc"] == undefined) {
                        nextScreendescription = "Workflow Terminates";
                    }
                    let prevScreendescription = value[i]["prevScreenDesc"];
                    if(!value[i]["prevScreenDesc"] || value[i]["prevScreenDesc"] == undefined) {
                        prevScreendescription = "Workflow Starts";
                    }
                    nextworkflowcodes.push( {"workflowcode":key,"workflowdesc":key+" - "+ nextScreendescription} );
                    prevworkflowcodes.push( {"workflowcode":key,"workflowdesc":key+" - "+ prevScreendescription});
                }
            }
        } );
        if(nextworkflowcodes.length>0) {
            workflowcodes.push(nextworkflowcodes);
            workflowcodes.push(prevworkflowcodes);
        }
        
        
        return workflowcodes;
    }

    allScreensOftWorkflow( workflowcode ): any[] {
        let givenWorkflowCode = "";
        if ( workflowcode ) {
            givenWorkflowCode = workflowcode;
        } else {
            givenWorkflowCode = this.currentworkflow;
        }
        return this.entriesWorkflows.get( givenWorkflowCode );
    }

    screenExistinCurrentWorkflow( screenId ): boolean {
        let workflow: any[] = [];
        workflow = this.allScreensOftWorkflow( null );
        // Iterate returned array
        if ( workflow ) {
            for ( var i = 0; i < workflow.length; i++ ) {
                if ( workflow[i].moduleName === screenId ) {
                    i = workflow.length + 1;
                    return true;
                }
            }

        }
        return false;

    }

    screenInCurrentWorkflow( screenId ): any {
        let workflow: any[] = [];
        workflow = this.allScreensOftWorkflow( null );
        // Iterte returned array
        for ( var i = 0; i < workflow.length; i++ ) {
            if ( workflow[i].moduleName === screenId ) {
                return workflow[i];
            }
        }
        return null;
    }


    nextWorkflow() {
        if ( this.currentworkflow ) {
            this.router.navigate( [this.currentAccesedScreenId.nextScreen] );
        }
    }

    prevworkflow() {
        if ( this.currentworkflow ) {
            this.router.navigate( [this.currentAccesedScreenId.prevScreen] );
        }
    }

    //Deside nextworkflow
    onNextWorkFlowDeside( workFlowCode, screenId ) {
        this.currentworkflow = workFlowCode;
        this.currentAccesedScreenId = this.screenInCurrentWorkflow( screenId );
        if(this.currentAccesedScreenId.nextScreen!=""){
            this.nextWorkflow();
            }

    }

    //Deside prevworkflow
    onPrevWorkFlowDeside( workFlowCode, screenId ) {
        this.currentworkflow = workFlowCode;
        this.currentAccesedScreenId = this.screenInCurrentWorkflow( screenId );
        if(this.currentAccesedScreenId.prevScreen!=""){
            this.prevworkflow();
            }
    }


    get supportedWorkFlow(): string[] {

        return this.currentAccesedWorkFlow;
    }

    set supportedWorkFlow( workflow: string[] ) {
        this.currentAccesedWorkFlow = workflow;
    }


    currentScreen( screenId: string ) {
        let availableWorkFlowOptions: any[] = [];
        this.currentAccesedScreenId = "";
        let ScreenExisting: boolean;
        // stores current screen id
        let allWorkflowOptions = this.allWorkFlowCodeForScreen( screenId )
        availableWorkFlowOptions = allWorkflowOptions==null||allWorkflowOptions.length == 0?null:allWorkflowOptions[0];
        if ( this.currentworkflow === undefined ) {
            ///here we have to use to get all the workflow using iteration
            if ( availableWorkFlowOptions == null || availableWorkFlowOptions.length == 0) {
                //for all the screen which doest belongs to workflow
                this.currentworkflow = undefined;
            } else if ( availableWorkFlowOptions.length === 1 ) {

                this.currentworkflow = availableWorkFlowOptions[0].workflowcode;
                this.currentAccesedScreenId = this.screenInCurrentWorkflow( screenId );

            } else {
                // show the current wokflow will undefined 
                this.currentworkflow = undefined;
                // store the fetched wrkflow listr to use in next and prev worklfow LOV 
                this.supportedWorkFlow = allWorkflowOptions;
            }

        }

        ScreenExisting = this.screenExistinCurrentWorkflow( screenId );
        // screenid belongs to this.currentworkflow 
        if ( ScreenExisting ) {
            //record currentscreen current workflow record
            if( this.currentworkflow==undefined ){
                this.currentworkflow = availableWorkFlowOptions[0].workflowcode;
            }
            this.currentAccesedScreenId = this.screenInCurrentWorkflow( screenId );
            this.supportedWorkFlow = allWorkflowOptions;
        }
        //   screenid belongs to at least one workflow
        else if ( availableWorkFlowOptions && availableWorkFlowOptions.length > 0 ) {
            if ( availableWorkFlowOptions.length === 1 ) {

                this.currentworkflow = availableWorkFlowOptions[0].workflowcode;
                this.currentAccesedScreenId = this.screenInCurrentWorkflow( screenId );
                this.supportedWorkFlow = allWorkflowOptions;

            } else {
                // show the current wokflow will undefined 
                this.currentworkflow = undefined;
                // store the fetched wrkflow listr to use in next and prev worklfow LOV 
                this.supportedWorkFlow = allWorkflowOptions;
            }

        }
        else {
            // screenid does not belong to any workflow
            this.currentworkflow = undefined;
            this.supportedWorkFlow =[];
        }

        this.messageSource.next( this.currentAccesedScreenId );
    }
    
    private messageSource = new Subject<any>();
    screenChanged = this.messageSource.asObservable();
}