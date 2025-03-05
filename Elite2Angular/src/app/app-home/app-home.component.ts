import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Component, OnInit, Inject, Optional, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";
import { SearchBlockComponent } from '@ui-components/search-block/search-block.component';
import { LoginService } from '@common/login/service/login.service';
import { CaseLoads } from '@commonbeans/CaseLoads';
import { LoaderService } from '@core/loader/loader.service';
import { UserSessionManager } from '@core/classes/userSessionManager';

import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { AppConstants } from '@core/classes/appConstants';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from '@commonbeans/Images';
import { timer, Observable } from 'rxjs';
import { ManageAppBarService } from "@core/service/manage-app-bar.service";
import { MessagesService } from '@core/service/messages.service';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { Subscription } from 'rxjs';
import { PhoneNumberUtils } from '@core/ui-components/phone/phone-number-utils';
import { MessageComponent } from '@core/ui-components/message/message.component';
import { takeUntil} from 'rxjs/operators';
import { PasswordComponent } from '@core/ui-components/password/password.component';
import { Global } from '@core/classes/Global';
import { UiCustomizeService } from '@core/service/ui-customize.service';
import { OcmpconfService } from '../sa/admin/service/ocmpconf.service';
import { DashboardBiService } from '../dashboard-bi/dashboard-bi.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { OumsypflService } from '@sa/admin/service/oumsypfl.service';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { DynamicMenuService } from '@core/service/dynamic-menu.service';
import { EngineStatusService } from '@core/service/engine-status.service';
import { EngineStatusComponent } from './engine-status/engine-status.component';
import { DeploymentDetectionService } from '@core/service/deployment-detection.service';
import { AppHomeDialogComponent } from './app-homedialog';
import { SsoService } from '@common/sso-logout/service/sso.service';

@Component({
    selector: 'app-home',
    templateUrl: './app-home.component.html',
    styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit, OnDestroy {
  @ViewChild('mainMenu3', {static: true}) mainMenu: any;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    supportedLangs: any[];
    selectedLang: string;
    hasmsgs = false;
    translateLabel: any;
    homeNodes: any;
    link = '';
    modalData: any;
    caseLoadId: string;
    description: string;
    themeClsName: any;
    caseLoadsModel: CaseLoads = new CaseLoads();
    changeCaseLoadModel: CaseLoads = new CaseLoads();
    caseloads: CaseLoads[] = [];
    dialogRef: MatDialogRef<SearchBlockComponent> | null;
    systemStatusDialogRef: MatDialogRef<EngineStatusComponent> | null;
    private unsubscribe: Subject<void> = new Subject<void>();
    userName: string;
    nameShortCode: string;
    userFullName: any;
    routes = [];
    mainNodes = [];
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private contentElement: any;
    colorType = "primary";
    lodderSubscriber: Subscription;

    top = 64; // top bar is 64 px
    footer = 50; // footer is 50 px;
    minHeight = 500;
    imageModel: Images = new Images();
    image: any;
    loginImages:Images [];
    headerlogo:string;
    serverTime: string;
    msgs: any[];
    isExpand:boolean;
    showTaskIcons = true;
    insights: string;
    refrehTime: number;
    myTaskColor = '#F29F05';
    teamTaskColor = '#054BA6';
    sysPflModelTemp: SystemProfiles = new SystemProfiles();

    engineStatusSubscription:any;
    refreshSystemStatusTime = 60000;
    systemStatusInterval:any;
    isSystemStatusOnline = false;
    noOfEngineOffline: number = 2;
    isViewDoneOfEngineStatus = false;

    deploymentStatusSubscription:any;
    deploymentDetectionTime = 60000;
    deploymentDetectionInterval:any;

    isCaseloadChangedSubscription:any;
    firstLoad:boolean = true;

    constructor(public dialog: MatDialog,
        private router: Router,
        private location: Location,
        public logService: LoginService,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private route: ActivatedRoute, public loaderService: LoaderService,
        private sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService,
        public translate: TranslateService,
        private appbarService: ManageAppBarService, 
        private messagesService: MessagesService,
        private uiCustomizeService : UiCustomizeService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private dashboardBiService: DashboardBiService,
        private ocmpconfService : OcmpconfService,
        private oumsypflFactory: OumsypflService,
        private oumsysetService: OumsysetService,
        private redirectUtil: RedirectUtil,
        private osiosearFactory: OsiosearService,
        public dms: DynamicMenuService,
        public ssoService: SsoService,
        public engineStatusService: EngineStatusService,
        public deployDetectionService: DeploymentDetectionService,
        @Inject(ElementRef) private element: ElementRef
    ) {
        if (this.translate.hasloginMsgs()) {
            this.supportedLangs = this.translate.langoptions;
            this.selectedLang = this.translate.currentLang;
            this.hasmsgs = true;
        } else {
            this.hasmsgs = false;
            this.reloadLanguage(this.translate.browserLanguage);
        }
        this.matIconRegistry.addSvgIcon("Menu-hem",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/Menu-hem.svg" ) );
        
        this.matIconRegistry.addSvgIcon("privacy",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/privacy.svg" ) );
        
        this.matIconRegistry.addSvgIcon("profile",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/profile.svg" ) );
        
        this.matIconRegistry.addSvgIcon("logout",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/logout.svg" ) );
        
        this.matIconRegistry.addSvgIcon("location",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/location.svg" ) );
        
        this.matIconRegistry.addSvgIcon("search",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/search.svg" ) );
        
        this.matIconRegistry.addSvgIcon("setting",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/setting.svg" ) );
        
        this.matIconRegistry.addSvgIcon("user",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/user.svg" ) );
                this.isExpand = true;
    }
    ngOnInit() {
        this.caseloadChangeInfoEvent();
        this.getSystemStatusData();
        this.detectDeployement();
        this.logService.loadMainColDefData();
        this.userName = this.sessionManager.getId();
        this.isDefaultTheme();
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        if(this.caseLoadId){
            this.getAccessedAgencyLocations(this.caseLoadId);
        }
        this.reloadLogo();
        this.getFormatTypes();
        this.description = this.sessionManager.currentCaseLoadName;
        if(Global.showTaskIcons){
            this.showTaskIcons = true;
        }else{
            this.showTaskIcons = false;
        }
        this.logService.getTaskCount(this.userName,false);
        this.loadUiConfiguarionData();
        const timerObser: Observable<number> = timer(0, 1000);
        timerObser.pipe(takeUntil(this.unsubscribe))
        .subscribe(x => {
          this.serverTime = DateFormat.updateServerDate();
        });
        this.logService.getCurrentStaffDetail().subscribe(
            (staff) => {
                const getFullName = staff.firstName + ' ' + staff.lastName;
                this.userFullName = getFullName;
                this.nameShortCode = this.userFullName.split(' ').map(x => x[0]).join('')
            },
        );
        this.logService.getServerTime().subscribe((time) => {
            const sysTime = new Date().toISOString();
            DateFormat.setServerDate(time);
            this.serverTime = DateFormat.updateServerDate();
        });
        this.messagesService.addMessageObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(msg => {
            
                if (msg) {
                    this.msgs = [];
                    this.msgs.push(msg);
                }
            });
        this.sessionManager.caseLoadNameObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(data => {
                this.description = data;
            });
        this.caseloads = this.sessionManager.caseLoads;
        if (!this.sessionManager.userRoles) {
            this.logService.getUserMenus().subscribe(data => {
                this.sessionManager.userRoles = data;
                this.homeNodes = data.menus;
                this.logService.resetScreenAndRelatedFlow();
                this.removeNonImplementedNodes();
            });
        } else {
            this.homeNodes = this.sessionManager.userRoles.menus;
            this.removeNonImplementedNodes();
        }
        if (!this.sessionManager.caseLoads) {
            this.logService.getCaseLoads().subscribe(data => {
                this.sessionManager.caseLoads = data;
            });
        }
        if (!this.sessionManager.caseLoadAgencies) {
            this.logService.getCaseLoadAgencies().subscribe(data => {
                this.sessionManager.caseLoadAgencies = data;
            });
        }
        if (!this.translate.hasAppMsgs()) {
            this.logService.getAppMsgs(this.sessionManager.getLang()).subscribe(data => {
                this.translate.appmsgs = data;
                this.getNodes();
            });
        }
        this.routes = this.router.config;
        
        this.contentElement = document.getElementsByTagName("mat-sidenav-content")[0];

        // Scroll to the top of the page (see the second solution at 
        // https://stackoverflow.com/questions/39601026/angular-2-scroll-to-top-on-route-change for details)
        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
       
        this.router.events.subscribe((ev:any) => {
            if (ev instanceof NavigationStart) {
                if (ev.url != this.lastPoppedUrl) {
                    this.yScrollStack.push(this.contentElement.scrollTop);
                }
            } else if (ev instanceof NavigationEnd) {
                if (ev.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    this.contentElement.scrollTo(0, this.yScrollStack.pop());
                    const headerElement = <HTMLBaseElement>document.getElementsByTagName('s4-header-block')[0];//this one
                } else {
                    this.contentElement.scrollTo(0, 0);
                }

                // let thisRef = this;
                // setTimeout(function(){
                //     thisRef.handleMenuActiveInactive(ev);
                // },0)

            }
        });
        this.isVisableSnipper();
        if(JSON.parse(sessionStorage.getItem('OffenderDetails'))){
            this.offenderSearchService.selectedOffender = JSON.parse(sessionStorage.getItem('OffenderDetails'));
            sessionStorage.removeItem('OffenderDetails');
        }
        if(JSON.parse(sessionStorage.getItem('caseloadType'))){
            this.offenderSearchService.currentCaseLoad = JSON.parse(sessionStorage.getItem('caseloadType'));
            sessionStorage.removeItem('caseloadType');
        }
        this.handleLandingpageForCaseloadChangeAndRefresh();
        window.onbeforeunload = () => this.whenPageReload();
    }
    sysPflExecuteQuery() {
        this.sysPflModelTemp = new SystemProfiles();
        const syspflResult = this.oumsypflFactory.sysPflGetInsightMode();
        syspflResult.subscribe(syspflResultList => {
        let myObj = {
            id: 10,
            name: this.translate.translate('Insights'),
            icon: 'insert_chart',
            nodes: [],
            showChild: false,
            menuBorder: "center-align menurow"
        }
        for(let i = 0; i < syspflResultList.length; i++) {
            if(syspflResultList[i].profileCode == 'INSIGHT_MODE'){
                if(syspflResultList[i].profileValue == 'Y'){
                    this.mainNodes.push(myObj);
                }
            }
          }
        });
      }
    openModal() {

        const dialogConfig = {
            disableClose: false,
            hasBackdrop: true,
            height: '300px',
            width: '100%',
            position: {
                top: '5%',
                bottom: '',
                left: '10%',
                right: ''
            },
        };

        this.dialogRef = this.dialog.open(SearchBlockComponent, dialogConfig);

        this.dialogRef.afterClosed().subscribe((result) => {
            this.dialogRef = null;

        });
    }
    
    reloadLogo(){
        const serve=this.logService.getLoginLogo();
        serve.subscribe(resp=>{
            if(resp !=null){
            this.loginImages=resp;
            for(let i=0;i<this.loginImages.length;i++){
            if (this.loginImages[i].imageObjectSeq==2 && this.loginImages[i].imageThumbnail ) {
                this.headerlogo = this.BASE64IMAGE + this.loginImages[i].imageThumbnail;
                this.loginImages[i]['imageFull'] = this.headerlogo;
            } 
            }
            }
        });
    }
            
        get BASE64IMAGE(): string {
            return 'data:image/JPEG;base64,';
        }

        get BASE64PNG(): string {
            return 'data:image/PNG;base64,';
        }

    logout() {
        if (this.router && this.dms.restrictDeactivateScreensArr.includes(this.router.url) && !this.dms.isSingleSaveBtnDisable) {
            let confirmDlg = this.dms.actionProceedDialog();
            confirmDlg.afterClosed().subscribe((result) => {
                confirmDlg = null;
                if (result && result == true) {
                    this.proceedToLogout();
                }
            });
        }
        else {
            this.proceedToLogout();
        }
    }


    proceedToLogout(){
        this.dms.isSingleSaveBtnDisable = true;
        this.logService.logout();
    }

    openCaseloadDialog(){
        if (this.router && this.dms.restrictDeactivateScreensArr.includes(this.router.url) && !this.dms.isSingleSaveBtnDisable) {
            let confirmDlg = this.dms.actionProceedDialog();
            confirmDlg.afterClosed().subscribe((result) => {
                confirmDlg = null;
                if (result && result == true) {
                    this.proceedToOpenCaesloadDialog();
                }
            });
        }
        else {
            this.proceedToOpenCaesloadDialog();
        }
    }

    proceedToOpenCaesloadDialog() {
        let dialogData = {
            disableClose: true,
            hasBackdrop: true
        };
        let appHomeDialog = this.dialog.open(AppHomeDialogComponent, dialogData);
        appHomeDialog.afterClosed().subscribe((result) => {
            appHomeDialog = null;
            if (result && result['caseloadId']) {
                this.setCaseLoad(result);
            }
        });
    }


    isDefaultTheme(){
        this.logService.getLoginMsgs(this.selectedLang).subscribe(data => {
            if (data.msgs && data.msgs.hasOwnProperty(AppConstants.DEFAULT_THEME)) {
                let theme = data.msgs[AppConstants.DEFAULT_THEME];
                this.updateTheme(theme);
                let classNames = <HTMLBodyElement>(document.getElementsByTagName('body')[0]);
                this.themeClsName = classNames.classList[1];
              }
        });
    }

    setCaseLoad(event) {
        if (event !== undefined && event !== null) {
            this.caseLoadId = event.caseloadId;
            this.getAccessedAgencyLocations(this.caseLoadId);
            this.description = event.description;
             // setCurrentCaseload method call to  the SP  with the caseLoadId parameter
             if (this.caseLoadId) {
                this.changeCaseLoadModel.caseloadId = this.caseLoadId;
                this.logService.setCurrentCaseload(this.changeCaseLoadModel).subscribe(data => {
                    if (data === 'TRUE') {
                        this.type = 'success';
                        this.message = this.translate.translate('common.caseloadchangedsuccess');
                        this.show();
                        this.offenderSearchService.currentCaseLoad = this.caseLoadId;
                        this.offenderSearchService.currentCaseLoad = event.caseloadId;
                        this.sessionManager.currentCaseLoad = event.caseloadId;
                        this.sessionManager.currentCaseLoadType = event.caseloadType;
                        this.offenderSearchService.showRecentOffenders = data;
                        this.offenderSearchService.updateInatkeData = data;
                        this.osiosearFactory.selectOffender = undefined;
                        this.offenderSearchService.clear();
                        // emit caseload change info
                        this.firstLoad = false;
                        let caseloadObj = {
                            id: event.caseloadId,
                            type: event.caseloadType
                        }
                        this.dms.isCaseloadChanged$.next(caseloadObj);
                      } else {
                          //Case load is not set.
                          this.type = 'warn';
                          this.message = this.translate.translate('common.caseloadnotset');
                          this.show();
                      }
                  });
            } else {
                //No case load selected.
                this.type = 'warn';
                this.message = this.translate.translate('common.caseloadnotset');
                this.show();
            }
            
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    getNodes() {
        this.mainNodes = [{
            id: 1,
            name: this.translate.translate('imenu'),
            icon: 'main-menu',
            nodes:[],
            showChild:false,
            menuBorder:"center-align menurow"
          },
          {
            id: 6,
            name: this.translate.translate('imenurecent'),
            icon: 'recent-offenders',
            nodes:[],
            showChild:false,
            menuBorder:"center-align menurow"
        },
        {
            id: 7,
            name: this.translate.translate('imenuworkspace'),
            icon: 'workspaces',
            nodes:[],
            showChild:false,
            menuBorder:"center-align menurow"
        },
          {
              id: 9,
              name: this.translate.translate('Integration'),
              icon: 'integration',
              nodes:[],
              showChild:false,
              menuBorder:"center-align menurow"
          },
          {
              id: 2,
              name: this.translate.translate('imenufeatures'),
              icon: 'features',
              nodes:[],
              showChild:false,
              menuBorder:"center-align menurow"
          },
        //   {
        //       id: 3,
        //       name: this.translate.translate('imenucalendar'),
        //       icon: 'my-calendar',
        //       nodes:[],
        //       showChild:false,
        //       menuBorder:"center-align menurow"
        //   },
        //   {
        //       id: 4,
        //       name: this.translate.translate('imenumywork'),
        //       icon: 'my-tasks',
        //       nodes:[],
        //       showChild:false,
        //       menuBorder:"center-align menurow"
        //   },
          /* {
              id: 5,
              name: this.translate.translate('imenumyoffenders'),
              icon: 'my-offenders',
              nodes:[],
              showChild:false,
              menuBorder:"center-align menurow"
          }, */
          {
              id: 8,
              name: this.translate.translate('imenureport'),
              icon: 'report',
              nodes:[],
              showChild:false,
              menuBorder:"center-align menurow"
        }];
        this.sysPflExecuteQuery();
    }
    
    removeNonImplementedNodes() {
        if(this.homeNodes) {
            //Check Nodes Item has been implemented in route or not.
            for( var index=0; index<this.homeNodes.length; index++) {
               let node = this.homeNodes[index];
                this.removeNode(this.homeNodes, node, index);
                if(!node.children || node.children.length === 0) {
                    //Remove it from parent node if all children has been removed.
                    this.homeNodes.splice(index, 1);
                    index--;
                }
            }
        }
    }
    removeNode(parrents, node, indexP): any {
        if(node.children) {
            
            for( var i=0; i<node.children.length; i++) {
                var child = node.children[i];
                let route = this.removeNode(node.children, child, i);
                if((!route || route === undefined) && (!child.children || child.children.length==0)) {
                    node.children.splice(i, 1);
                    i--;
                    
                }
            }
          } else {
            //Check is it implemented in router config.
            if (node.dynamicForm==null && node.insDashboard == null) {
                let route = this.isRouteExist(node.href);
                // 
                return route;
                //If route is not defined, remove the route.
            } else if(node.dynamicForm == 'Y'){
                return "FRMRENDER";
            } else {
                return "INSDSBVW";
            }
             
        }
    }
    isRouteExist(href): any  {
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
    
         
        reloadLanguage(lang: string) { 
            this.logService.getLoginMsgs(lang)
            .subscribe((data) => {
                this.supportedLangs = data.languages;
                this.selectedLang = data.lang;
                this.sessionManager.lang = data.lang;
                this.translate.langoptions = data.languages;
                this.translate.currentLang = data.lang;
                this.translate.loginmsgs = data.msgs;
                this.loadProfiles(data);
                this.hasmsgs = true;
               
                if (typeof (Storage) !== 'undefined') {
                    sessionStorage.setItem('langmsgs', JSON.stringify(data));
                }
                if (data.msgs && data.msgs.hasOwnProperty(AppConstants.SHOW_ICONS)) {
                    Global.showTaskIcons= data.msgs[AppConstants.SHOW_ICONS];  
                }
            });
            this.logService.getScheduleProfileData ();
            this.logService.getAppMsgs(this.selectedLang).subscribe(data => {
                this.translate.appmsgs = data;
                this.getNodes();
            });
        }
  loadProfiles(data) {
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.DATE_KEY)) {
            DateFormat.dateFormat = data.msgs[AppConstants.DATE_KEY];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.PHONE_KEY)) {
            PhoneNumberUtils.phoneFormat = data.msgs[AppConstants.PHONE_KEY];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.PHONE_PREFIX_KEY)) {
            PhoneNumberUtils.phonePrefix = data.msgs[AppConstants.PHONE_PREFIX_KEY];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.POPUP_DURATION_KEY)) {
            MessageComponent.duration = data.msgs[AppConstants.POPUP_DURATION_KEY];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.MSG_TOAST_POS)) {
            MessageComponent._msgToastDefPosition = data.msgs[AppConstants.MSG_TOAST_POS];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.PWD_REGX)) {
            PasswordComponent._passwordRegx = data.msgs[AppConstants.PWD_REGX];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.PWD_VAL_MSG)) {
            PasswordComponent._validationMsg = data.msgs[AppConstants.PWD_VAL_MSG];
        }
        if (data.msgs && data.msgs.hasOwnProperty(AppConstants.GRANT_USER)) {
            PasswordComponent._grantUser = data.msgs[AppConstants.GRANT_USER];
        }
        
    }
    getFormatTypes(){
        let addPayload = {
            settingProviderCode: "PHONEMASKING",
            settingType: "PHONEFORMAT"
        };
        this.oumsysetService.loadJsonData(addPayload).subscribe((result) => {
            PhoneNumberUtils.contactType = JSON.parse(result.settingValue);;
        });
    }
    updateTheme(theme: string){
        const fieldElement = <HTMLBodyElement>(document.getElementsByTagName('body')[0]);
        fieldElement.classList.remove("s4-theme","deeppurple-amber","pink-bluegrey","purple-green", "indigo-pink", "light-and-clean", "aqua-theme", "teal-color-theme", "orange-color-theme");
        fieldElement.classList.add(theme);
      }
       
        selectLanguageChange(lang: any) {
            
            this.sessionManager.lang = lang;
            this.selectedLang = lang;
            this.hasmsgs = false;
            this.sessionManager.setLang=lang;
            this.reloadLanguage(this.selectedLang);
        }
       
    toggleSearch(evt) {
        this.contentElement.scrollTo(0, 0);
        this.appbarService.showSearchBlock = !this.appbarService.showSearchBlock;
        if (this.appbarService.showSearchBlock) {
            evt.target.classList.remove("search-open");
        } else {
            evt.target.classList.add("search-open");
        }
    } 


        isVisableSnipper() {
          this.lodderSubscriber =  this.loaderService.lodingObserval.subscribe(loadingCount => {
               try {
            const htmlLodingElement = this.element.nativeElement.getElementsByClassName('s4-spinner')[0];
            if (htmlLodingElement) {
                if (loadingCount > 0) {
                htmlLodingElement.style.display = 'inline';
            } else {
                htmlLodingElement.style.display = 'none';
            }
        }
    } catch (e) {
        
    }
   });
        }
        toggleMenu(){
            this.isExpand = !this.isExpand;
            if(this.isExpand){
                const pageEl = this.element.nativeElement.getElementsByClassName('pagination--div');
                for (let i = 0; i < pageEl.length; i++) {
                    pageEl.item(i).style.paddingRight = "266px";
                    setTimeout(function(){
                        pageEl.item(i).style.paddingRight = "0px";
                      },500);
                    }
                //pageEl.style.paddingRight = "266px";
                
            }else{
                const pageEl = this.element.nativeElement.getElementsByClassName('pagination--div');
                for (let i = 0; i < pageEl.length; i++) {
                    pageEl.item(i).style.paddingRight = "0px";
            }
                //pageEl.style.paddingRight = "0px"
            }
            this.dashboardBiService.toggle.next(true);
        }
        
        whenPageReload(){
            if(this.offenderSearchService.selectedOffender){
                sessionStorage.setItem('OffenderDetails',JSON.stringify(this.offenderSearchService.selectedOffender));
            }
            if(this.offenderSearchService.currentCaseLoad){
                sessionStorage.setItem('caseloadType',JSON.stringify(this.offenderSearchService.currentCaseLoad));
            }
            
        }
        changeOfRoutes() {
            
            setTimeout(() => {
                this.dms.handleOffendersContext();
            }, 0);


            const url = this.router.url;
            if (url.search('home') !== -1 || url.search('OWINTAKE') !== -1 || url.search('OWHEADER') !== -1) {
                this.mainMenu && this.mainMenu.mainMenu4 && this.mainMenu.mainMenu4.checkEachChild();
            }
          }

          loadUiConfiguarionData(){
            this.ocmpconfService.loadData().subscribe(data => {
                this.uiCustomizeService.setUiConfigData(data);
                if(this.uiCustomizeService && this.uiCustomizeService.taskManagementConfig && this.uiCustomizeService.taskManagementConfig.refreshTime ){
                    this.refrehTime=1000*this.uiCustomizeService.taskManagementConfig.refreshTime;
                    if(this.showTaskIcons){
                        this.logService.interval = setInterval(() => {
                            this.logService.getTaskCount(this.userName,false);
                        }, 1000*this.uiCustomizeService.taskManagementConfig.refreshTime);
                     }
                     else{
                        clearInterval(this.logService.interval);
                     }
                }
                
            });
                
                
           
        }



    handleMenuActiveInactive(e) {
        let currentActivatedEle = document.querySelectorAll("[data-for-link='"+ e.url +"']")[0];
        var htmlCollection = [].slice.call(document.getElementsByClassName('s4-activeMenu'));
        for (var i = 0; i < htmlCollection.length; i++) {
            if(htmlCollection[i].hasAttribute("data-for-link")){
                htmlCollection[i].classList.remove('s4-activeMenu');
            }
        }
        if(currentActivatedEle){
            currentActivatedEle.classList.add('s4-activeMenu');
        }
        
    }


    getAccessedAgencyLocations(caseloadID) {
        let obj = { "caseloadId" : caseloadID };
        this.offenderSearchService.allowAgencies = [];
        this.osiosearFactory.alExecuteQuery(obj).subscribe((res) => {
            for(let i=0; i < res.length;i++){
               if(res[i].agyLocId){
                this.offenderSearchService.allowAgencies.push(res[i].agyLocId);
               }
            }
        });
    }


    systemStatus(evt){
        const dialogConfig = {
            disableClose: true,
            hasBackdrop: true,
        };
        this.isViewDoneOfEngineStatus = true;
        this.systemStatusDialogRef = this.dialog.open(EngineStatusComponent, dialogConfig);
        this.systemStatusDialogRef.afterClosed().subscribe((result) => {
            this.systemStatusDialogRef = null;
        });
    }


    getSystemStatusData() {
        this.engineStatusService.getSystemStatus();
        this.engineStatusSubscription = this.engineStatusService.enginesStatus$.subscribe(res => {
            if (res && this.engineStatusService.isObject(res) && Object.keys(res).length > 0) {
                this.noOfEngineOffline = 0;
                this.isSystemStatusOnline = true;
                for (const [key, value] of Object.entries(res)) {
                    if (value !== 'U') {
                      this.noOfEngineOffline = this.noOfEngineOffline + 1;
                      this.isSystemStatusOnline = false;
                      this.isViewDoneOfEngineStatus = false;
                    }
                }
            }       
        })
        this.systemStatusInterval = setInterval(() => {
            this.engineStatusService.getSystemStatus();
        }, this.refreshSystemStatusTime);
    }

    detectDeployement(){
        this.deployDetectionService.getDeploymentStatus();
        this.deploymentStatusSubscription = this.deployDetectionService.deploymentStatus$.subscribe((res:any) => {
            if (res) {
                let currentYear = new Date().getFullYear() + '-';
                let latestEliteVersion = res.split(currentYear)[1];
                let oldComplete = this.translate.loginTranslate('common.elite.version')
                let oldEliteVersion = oldComplete.split(currentYear)[1];
                //console.log(oldEliteVersion + '<-->' + latestEliteVersion);
                if (oldEliteVersion && latestEliteVersion && oldEliteVersion !== latestEliteVersion) {
                    if(this.sessionManager.isSessionValied()){
                        //console.log("deployemnt happened")
                        this.sessionManager.isDeployementHappen = true;
                        this.logout();
                    }  
                }
            }       
        })
        this.deploymentDetectionInterval = setInterval(() => {
            this.deployDetectionService.getDeploymentStatus();
        }, this.deploymentDetectionTime);
    }

    caseloadChangeInfoEvent() {
        this.isCaseloadChangedSubscription = this.dms.isCaseloadChanged$.subscribe((caseloadInfo) => {
            if(caseloadInfo && caseloadInfo.type){
                this.retrieveLanPgConfigData(caseloadInfo)
            }
        })
    }

    handleLandingpageForCaseloadChangeAndRefresh(){
        if(this.ssoService.isSsoEnable){
            //console.log("SSO ON")
            let caseloadObj = {
                id: this.caseLoadId,
                type: this.sessionManager.currentCaseLoadType
            }
            this.dms.isCaseloadChanged$.next(caseloadObj);
        }
        else if(this.sessionManager.userRoles){
            //console.log("Manual login.. do nothing")
        }
        else{
            //console.log("Browser REFRESH"); 
            let caseloadObj = {
                id: this.caseLoadId,
                type: this.sessionManager.currentCaseLoadType
            }
            this.retrieveLanPgConfigData(caseloadObj);
        }
    }

    retrieveLanPgConfigData(caseloadInfo) {
        let obj = {
            settingType: 'PAGE_CONFIG',
            settingProviderCode: 'PAGE_CONFIG',
        };
        this.oumsysetService.loadJsonData(obj).subscribe((result) => {
            const rowData = JSON.parse(result.settingValue);
            if (rowData && rowData.length > 0) {
                if (caseloadInfo && caseloadInfo.type == "INST") {
                    let getcaseLoadINST = rowData.find(x => x.KEY_CODE === 'INSTLP');
                    if (getcaseLoadINST && getcaseLoadINST.VALUE && getcaseLoadINST.VALUE !== 'APP_DEFAULT' ) {
                            this.redirectToScreen(getcaseLoadINST.VALUE)
                    }
                    else {
                        this.redirectToScreen("home")
                    }
                }
                else if (caseloadInfo && caseloadInfo.type == "COMM") {
                    let getcaseLoadCOMM = rowData.find(x => x.KEY_CODE === 'COMMLP');
                    if (getcaseLoadCOMM && getcaseLoadCOMM.VALUE && getcaseLoadCOMM.VALUE !== 'APP_DEFAULT') {
                        this.redirectToScreen(getcaseLoadCOMM.VALUE)
                    }
                    else {
                        this.redirectToScreen("home")
                    }
                }
            }
            else {
                if (caseloadInfo && caseloadInfo.type == "INST") {
                    this.redirectToScreen("home")
                }
                else if (this.sessionManager.userRoutes.hasOwnProperty('OCIPOWOF')) {
                    this.redirectToScreen("OCIPOWOF")
                }
            }
        })
    }

    redirectToScreen(screenId){
        let currentScreenId = this.dms.currentActivatedRoute.url.split('/')[1];
        if(currentScreenId == "home" && screenId == 'home' && this.firstLoad){
            //console.log("refresh on home screen case")
            return;
        }
        else if(currentScreenId == "home" && screenId == 'home' && !this.firstLoad){
            //console.log("change caseload manully on home screen")
            let caseloadObj = {
                screen: 'home'
            }
            this.dms.isCaseloadChanged$.next(caseloadObj);
        }
        else if(currentScreenId == screenId){
            //console.log("need to refresh component")
            this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
                this.router.navigate(['/'+ screenId ])
            );
        }
        else{
            //console.log("need to change component")  
            let myInterval = setInterval(() => {
                if (this.translate.translate('imenu') !== "imenu") {
                    clearInterval(myInterval);
                    this.router.navigate(['/'+ screenId ]);
                }
            }, 100);
        }
    }

    ngOnDestroy() {
        if (this.isCaseloadChangedSubscription) {
            this.isCaseloadChangedSubscription.unsubscribe();
        }
        if(this.engineStatusSubscription){
            this.engineStatusSubscription.unsubscribe();
        }
        if(this.systemStatusInterval){
            clearInterval(this.systemStatusInterval);
        }
        if(this.deploymentStatusSubscription){
            this.deploymentStatusSubscription.unsubscribe();
        }
        if(this.deploymentDetectionInterval){
            clearInterval(this.deploymentDetectionInterval);
        }
        this.unsubscribe.next();
        this.unsubscribe.complete();
        if (this.lodderSubscriber) {
            this.lodderSubscriber.unsubscribe();
        }
    }
    

}
