import { DialogService } from '@ui-components/dialog/dialog.service';
import { Component, Input, OnInit,AfterViewInit, EventEmitter, Output,ViewChildren,QueryList, ElementRef } from '@angular/core';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { ManageAppBarService } from '@core/service/manage-app-bar.service';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { ScreenWorkFlowService } from "./screen-workflow.service";
import { ScreenWorkFlow } from './ScreenWorkFlow';
import { Router } from '@angular/router';
// import { forEach } from '@angular/router/src/utils/collection';
import { TranslateService } from '@common/translate/translate.service';
import {RelatedScreensService} from './relatedScreens.service';
import {IWPPaneService} from './iwppane.service';
import { Global } from '@core/classes/Global';

enum AccessLevel {
    none,
    view,
    full
}

@Component({
    selector: 's4-pane',
    templateUrl: './pane.component.html',
    styleUrls: []
})
export class PaneComponent implements OnInit, AfterViewInit {

    // assume the user has no permission to access the component
    @Input() currentScreen: any;
    @Input() cardType: boolean = false;
    @Input() singleSaveBtnText:string;
    private userAccess: AccessLevel = AccessLevel.none;
    private innerReadOnly: boolean;
    private innerDisabled: boolean;
    private innerRoleId: string;
    position = "right";
    workflowsequence: ScreenWorkFlow[];
    selectedScreen: any;
    screenFlowOptions: ScreenWorkFlow[] = [];
    workFlowCode: ScreenWorkFlow = new ScreenWorkFlow();
    // stores the title value
    @Input() title = '';
    // stores the screenId value
    @Input() screenId = '';
    // stores the id value
    @Input() id: string;
    workSequence: any;
    private innerShowInmateHeader:boolean = undefined;
    private innerShowCustomHeader:boolean = undefined;
    private innerAllowInlineSearch: boolean = undefined;
    private innerShowSearchBlock:boolean=false;    
    private currentWorkFlow: any;
    @Input() limitSearchToCaseload = true;
    @Input()
    isSingleSave:boolean = false;
    @Input()
    isSingleSaveBtnDisable:boolean = true;
    @Output() onSingleCommit: EventEmitter<any> = new EventEmitter<any>();
    
    private   innerSelectedOffender: any;
    @Input()  bookingDetails = true;
    @Output()  selectedOffenderChange: EventEmitter<any> = new EventEmitter<any>();
    @Output()  selectedIwp: EventEmitter<any> = new EventEmitter<any>();
    @Output()  selectedIwpTask: EventEmitter<any> = new EventEmitter<any>();
    @Output()  selectedIwpMemo: EventEmitter<any> = new EventEmitter<any>();
    @Output()  selectedIwpCaseNote: EventEmitter<any> = new EventEmitter<any>();
    @Output()  selectedIwpEmail: EventEmitter<any> = new EventEmitter<any>();
    @ViewChildren( 'paneContent' ) paneContent: QueryList<any>;
    //@Output()  showWorkFlow: EventEmitter<any> = new EventEmitter<any>();
    flowright: boolean = false;
    flowdrop:boolean=false;
    flowleft: boolean = false;
    showdiv: boolean = false;
    desidedWorkflow: string;
    dropMenuRight: boolean = false;
    workFlowSize: any;
    dublicateModule: any = "";
    dropMenuleft: boolean = false;
    supportedWorkFlows: any[] = [];
    supportedRelatedScreen: any[] = [];
    relatedTitle="Related Screens";
    currentRelatedScreen:any[]=[];
    prevSupportedWorkFLows:any[] = [];
    nextSupportedWorkFLows:any[] = [];
    helpItems:any;
    paneTitelHeader:string="";
    msgs: any[] = [];
    @Input() showIwpIcon:boolean =false;
    showIwp:boolean=false;
    @Input() showFullScreenIcon = false;
    showTaskIcons = true;

    
    constructor(private service: OffenderSearchService, private appbarService:ManageAppBarService,
    private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer,
    private screenflow: ScreenWorkFlowService, private router: Router, public dialogService: DialogService,
        public translateService: TranslateService, private relatedScreens :RelatedScreensService, private iwpPaneService :IWPPaneService
    ) { 
           this.matIconRegistry.addSvgIcon( "flowdrop",
            this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/bookmarks.svg" ) );
           this.matIconRegistry.addSvgIcon( "flowright",
            this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/arrow_forward.svg" ) );
           this.matIconRegistry.addSvgIcon( "flowleft",
            this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/arrow_back.svg" ) );
            this.matIconRegistry.addSvgIcon( "iwp_doc",
            this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/article.svg" ) );
            this.matIconRegistry.addSvgIcon( "iwp_mail",
            this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/mail.svg" ) );
            this.matIconRegistry.addSvgIcon( "iwp_casenote",
            this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/snippet_folder.svg" ) );
            this.matIconRegistry.addSvgIcon( "iwp_memo",
            this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/assignment_ind.svg" ) );
            this.matIconRegistry.addSvgIcon( "iwp_task",
            this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/fact_check.svg" ) );
            this.matIconRegistry.addSvgIcon( "pdfhelp",
                    this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/pdf_help.svg" ) );
            this.matIconRegistry.addSvgIcon( "videohelp",
                    this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/video_help.svg" ) );
         this.matIconRegistry.addSvgIcon( "full_screen_view",
                    this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/fullScreen.svg" ) );
           this.matIconRegistry.addSvgIcon( "erdhelp",
                    this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/erd_help.svg" ) );
    }

    ngOnInit() {
        this.helpItems = [];
        this.roleId = '';
        this.showdiv = true;
        this.desidedWorkflow = undefined;
        this.innerSelectedOffender = this.service.selectedOffender;
        if(this.singleSaveBtnText == undefined){
            this.singleSaveBtnText = this.translateService.translate('comp.common.singlesavebtn');
        }
        if(Global.showTaskIcons && Global.showTaskIcons.trim() == "false"){
            this.showTaskIcons =false;

        }else{
            this.showTaskIcons = true;
        }
        if(this.innerShowInmateHeader==undefined){
            this.showInmateHeader=false;
        }
        
        if(this.innerShowCustomHeader==undefined){
            this.showCustomHeader=false;
        }
        this.screenflow.helpLinks(this.screenId).subscribe(resultList => {
            this.helpItems = resultList;
//            this.helpItems.forEach(helpItem => {
//                if(helpItem.helpType === 'V') {
//                    let link = helpItem.helpLink
//                    let components = link.split("/");
//                    helpItem.helpLink = components[3];
//                }
//                
//            });
        }); 
        this.showIwpIconImage();
        this.appbarService.showSearchBlockChanged.subscribe(status => this.showSearchBlock = status)
        this.screenflow.screenChanged.subscribe(
            currentscreen => {
                this.flowright= false;
                this.flowleft = false;
                this.dropMenuleft = false;
                this.dropMenuRight = false;
                this.nextSupportedWorkFLows=[];
                this.currentScreen = currentscreen;
                this.supportedWorkFlows = this.screenflow.supportedWorkFlow;
                if( this.supportedWorkFlows !=null &&  this.supportedWorkFlows.length >1) {
                    this.nextSupportedWorkFLows = this.supportedWorkFlows[0];
                    this.prevSupportedWorkFLows = this.supportedWorkFlows[1]; 
                }
                if ( currentscreen ) {
                    if ( currentscreen.prevScreen === "" ) {
                        // hide previous button
                        this.flowleft = false;
                    } else if ( currentscreen.prevScreen != "" ) {
                        // show button
                        this.dropMenuleft = false;
                        this.flowleft = true;
                    }
                    if ( currentscreen.nextScreen === "" ) {
                        // hide next button
                        this.flowright = false;
                    } else if ( currentscreen.nextScreen != "" ) {
                        // show button
                        this.dropMenuRight = false;
                        this.flowright = true;

                    }
                }
                else {
                    if ( currentscreen === "" || currentscreen === undefined ) {
                        if ( this.nextSupportedWorkFLows.length > 1 ) {
                            this.dropMenuleft = true;
                            this.dropMenuRight = true;
                        }
                    }
                }
            } )
            
            
              this.relatedScreens.screenChanged.subscribe(
                currentscreen => {
                    this.supportedRelatedScreen=currentscreen;
                    this.flowdrop =false;
                    if(currentscreen && currentscreen.length>0) {
                        this.flowdrop =true;
                    }
                } )
                this.paneHeaderStyle();
    }
    
    ngAfterViewInit() {
        //Need more optimized solution.
        //this.focusFirstInput();
        this.screenflow.currentScreen( this.screenId );
        this.relatedScreens.currentSelectedScreens( this.screenId );
         
    }
    
    showIwpIconImage(){
        if(this.screenId === 'OCIDOCUM'){
            this.showIwpIcon = false;
        }else{
            if(this.innerShowInmateHeader) {
        this.screenflow.iwpSupported(this.screenId).subscribe(count => {
            if(((count && count>0) && this.showIwp)) { 
                this.showIwpIcon = true;
            } else {
                this.showIwpIcon = false;
            }
        });  
    }
    }
    }

    focusFirstInput() {
        let element: ElementRef = this.paneContent.first;
        let formChildren = [].slice.call( element.nativeElement.children );
        formChildren.every( child => {
            //
            let input = this.getInputElement( child );
            if ( input ) {
                //
                //
                input.focus();
                return false; // break!
            }
            return true; // continue!
        } );
    }

    getInputElement( nativeElement: any ): any {
        if ( !nativeElement || !nativeElement.children ) return undefined;
        if ( !nativeElement.children.length && nativeElement.localName === 'input' && !nativeElement.disabled && !nativeElement.hidden && nativeElement.type !== 'hidden' ) {
            return nativeElement;
        }
        let input;
        //
        [].slice.call( nativeElement.children ).every( c => {
            input = this.getInputElement( c );
            //
            if ( input ) {
                return false; // break
            }
            return true; // continue!
        } );

        return input;
    }
    get roleId(): any {
        return this.innerRoleId;
    }
    
    @Input()
    set roleId(v: any) {
        if (v !== this.innerRoleId) {
            this.innerRoleId = v;
            if (this.roleId === undefined || this.roleId === '') {
                // This pane does not utilize RBAC
                this.userAccess = AccessLevel.full;
            } else {

                // TODO: Replace test code with logic to get the user permission for this form. (service call)
                switch (this.roleId) {
                    case 'role_full':
                        this.userAccess = AccessLevel.full;
                        break;
                    case 'role_view':
                        this.userAccess = AccessLevel.view;
                        break;
                    default:
                        this.userAccess = AccessLevel.none;
                }

            }
        }
    }
    
    
    get readonly(): boolean {
        return ((this.userAccess !== AccessLevel.full) || this.innerReadOnly);
    }

    @Input()
    set readonly(v: boolean) {
        if (v !== this.innerReadOnly) {
            this.innerReadOnly = v;

            // TODO: Add code to set inner elements to readonly (when applicable)
        }
    }

    // Disabled hides the contents of the pane from the user.
    get disabled(): boolean {
        return ((this.userAccess === AccessLevel.none) || this.innerDisabled);
    }

    @Input()
    set disabled(v: boolean) {
        if (v !== this.innerDisabled) {
            this.innerDisabled = v;
        }
    }

    onOffenderChange(offender) {
        if (offender) {
            this.showIwp = true;
            this.showIwpIconImage();
            let eliteViewLog = {};
            let offendersList = [];
            offendersList.push(offender)
            eliteViewLog['inputSearchResult'] = offendersList;
            eliteViewLog['inputSearchParameters'] = offender;
            eliteViewLog['moduleName'] = this.screenId;
            eliteViewLog['offenderIdDisplay'] = offender.offenderIdDisplay;
            eliteViewLog['bookingNo'] = offender.bookingNo;
            this.screenflow.auditPage(eliteViewLog).subscribe(data => {
                //To do
            });
        } else {
            this.showIwp = false;
            this.showIwpIconImage();
        }
        this.selectedOffenderChange.emit(offender);
    }

    get selectedOffender(): any {
        return this.innerSelectedOffender;
    }

    @Input()
    set selectedOffender(offender: any){
        this.innerSelectedOffender = offender;
    }
    
    @Input()
    set showInmateHeader(v:any) {
        this.innerShowInmateHeader = v;
        this.appbarService.manageIcon(this.innerAllowInlineSearch || this.innerShowInmateHeader);           
    }
    
    get showInmateHeader():any{
        return this.innerShowInmateHeader;
    }
      
    onSingleSave(gridOptions) {
    this.onSingleCommit.emit(gridOptions);
     }
    @Input()
    set showCustomHeader(v:any) {
        this.innerShowCustomHeader = v;
        this.appbarService.manageIcon(this.innerAllowInlineSearch || this.innerShowInmateHeader);           
    }
    
    get showCustomHeader():any {
        return this.innerShowCustomHeader;
    }
    
    @Input()
    set allowInlineSearch(v:any) {
        this.innerAllowInlineSearch = v;
        this.appbarService.manageIcon(this.innerAllowInlineSearch || this.innerShowInmateHeader);                   
    }
    
    get allowInlineSearch():any {
        return this.innerAllowInlineSearch;
    }
        
    @Input()
    set showSearchBlock(v: boolean) {
        if( v != this.innerShowSearchBlock) {
            this.innerShowSearchBlock = v;
        }
    }

    get showSearchBlock(): boolean {
        return (this.innerAllowInlineSearch || this.innerShowInmateHeader) && this.innerShowSearchBlock;
    }
    
    paneHeaderStyle() {
       if(!this.showInmateHeader && !this.showCustomHeader ){
          this.paneTitelHeader= "pane-title-no-header work-flow-mat-icon"; 
       }else
           this.paneTitelHeader = "pane-header work-flow-mat-icon";
   }   

    //Choose next workflow
    private onWorkFlowDesideNext( workFlowCode, screenId ): any {
        this.screenflow.onNextWorkFlowDeside( workFlowCode, screenId );
    }

    //Choose previous  workflow 
    private onWorkFlowDesidePrevious( workFlowCode, screenId ): any {
        this.screenflow.onPrevWorkFlowDeside( workFlowCode, screenId );
    }

    nextWorkflow() {
        this.relatedScreens.involvementFlag=true;
        this.screenflow.nextWorkflow();
    }

    previousWorkflow() {
        this.screenflow.prevworkflow();
    }
    
    screenRelatedOptions(relatedScreen){
        
        this.relatedScreens.selectedScreenNavigate(relatedScreen);
    }
    
    showHelpVideo = () => {
        this.helpItems.forEach(helpItem =>{
            if(helpItem.helpType==='V') {
                this.dialogService.openLinkDialog('helpVideo', helpItem.helpLink, 90).subscribe(result => {
                    
                    return true;
                }); 
            }
            
        });
        return false;
    }

    onIwpEoffender(e) {
        this.selectedIwp.emit(e);
        let screenParam = "";
        if(this.showInmateHeader) {
            screenParam = this.screenId+"~"+this.showInmateHeader;
        } else {
            let objectId = this.iwpPaneService.objectId;
            screenParam = this.screenId+"~"+this.showInmateHeader+"~"+objectId;
        }
        this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : screenParam } } );
    }    
    onIwpTask(e){
    	// Task Icon
        this.selectedIwpTask.emit(e);
        if (this.service.selectedOffender && this.service.selectedOffender.offenderBookId) {
            this.dialogService.openLinkDialog('/OSUNTASK', this.service.selectedOffender, 80).subscribe(result => {
            });
        } else if (this.showInmateHeader) {
            this.show(this.translateService.translate('common.pleaseselectanoffenerfirst'), 'warn');
        }
    }
    onIwpMemo(e){
    	// Memo Icon
        this.selectedIwpMemo.emit(e);
        if (this.service.selectedOffender && this.service.selectedOffender.offenderBookId) {
            this.dialogService.openLinkDialog('/OSUNMEMO', this.service.selectedOffender, 80).subscribe(result => {
            });
        } else if (this.showInmateHeader) {
           this.show(this.translateService.translate('common.pleaseselectanoffenerfirst'), 'warn');
        }
    }
    onIwpCaseNote(e){
    	// Note Icon
        this.selectedIwpCaseNote.emit(e);
        if (this.service.selectedOffender && this.service.selectedOffender.offenderBookId) {
            this.dialogService.openLinkDialog('/OSUCNOTE', this.service.selectedOffender, 80).subscribe(result => {
            });
        } else if (this.showInmateHeader) {
            this.show(this.translateService.translate('common.pleaseselectanoffenerfirst'), 'warn');
        }
    }
    onIwpEmail(e){
    	// Email Icon
        this.selectedIwpEmail.emit(e);
        if (this.service.selectedOffender && this.service.selectedOffender.offenderBookId) {
            this.dialogService.openLinkDialog('/OSUEMAIL', this.service.selectedOffender, 80).subscribe(result => {
            });
        } else if (this.showInmateHeader) {
            this.show(this.translateService.translate('common.pleaseselectanoffenerfirst'), 'warn');
        }
    }
     /**
* This function displays the messages
*/
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }

  fullView(){
    var elem = document.getElementById("s4MainBody");
    if (!document.fullscreenElement) {
        elem.requestFullscreen();
    } else {
        document.exitFullscreen();

    }
}
}

