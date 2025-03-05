import { Injectable, OnInit } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TranslateService } from '@common/translate/translate.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { OumsypflService } from '@sa/admin/service/oumsypfl.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject, of } from 'rxjs';
import { Images } from '@common/beans/Images';
import { takeUntil } from 'rxjs/operators';
import { NavigationEnd, NavigationError, Router } from '@angular/router';
import { DashboardBiService } from 'app/dashboard-bi/dashboard-bi.service';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { OumsysetBean } from '@sa/admin/beans/OumsysetBean';
import { ConfirmationDialogComponent } from '@core/ui-components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({ providedIn: 'root' })

export class DynamicMenuService {

    menu$ = new Subject<any>();
    menu:any[] = [];
    menuAvailable = false;
    routerSubscription:any;
    selectedOffenderSubscription:any;

    sysPflModelTemp: SystemProfiles = new SystemProfiles();
    
    recentOffenders$ = new Subject<boolean>();
    recentOffendersID:number;
    recentOffenders = [];
    imageModel: Images = new Images();
    private unsubscribe: Subject<void> = new Subject<void>();

    myOffenders$ = new Subject<boolean>();
    myOffendersID:number;
    myOffenders = [];
    imageModelMyOffenders: Images = new Images();

    reportMenus = [];
    
    navigationArr = [];

    duplicateHrefsArr = [];

    // insight varriable
    msglist: any[];
    msgs: any[];
    insightSubMenus: any = [];
    reportMenusAc: any = [];
    activeMenu: boolean = false;
    oumsysetModel: OumsysetBean = new OumsysetBean();
    systemSetData = [];
    currentActivatedRoute:any;
    selectedOffender:any;

    isSingleSaveBtnDisable: boolean = true;

    restrictDeactivateScreensArr = ['/OCDCORDS'];

    isCaseloadChanged$:any = new BehaviorSubject('');

    private propertyScreen = ['/OIDRPITM', '/OIDMPCON', '/OIDTPRIT', '/OIDVCONT', '/OIDDPROP', '/OIDTPCON', '/OIDRTCON', '/OIDIICLO',
        '/OIIPTRAN', '/OIIPCLOC', '/OIIPCTRA', '/OIDMPITM'];

        private admissionscreen = ['/OIDADMIS' , '/OCDINTAK']

    constructor(private http: HttpService, private sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService,
        private oumsypflFactory: OumsypflService,
        private osiosearFactory: OsiosearService,
        private router: Router,
        public dialog: MatDialog,
       private dashboardBiService: DashboardBiService, 
       private oumsysetService: OumsysetService
        ) {

         this.catchRouterChange();
            
        }


        catchRouterChange(){

            this.routerSubscription = this.router.events.subscribe(e => {
                if (e instanceof NavigationEnd) {
                    this.currentActivatedRoute = e;
                    this.navigationArr.push(e);
                    this.handleRouterChange();
                    
                }
            });

            this.selectedOffenderSubscription = this.offenderSearchService.selectedOffenderObservable.subscribe(e => {
                if(e){
                    this.selectedOffender = e;
                }
            })

        }


    setMenuInDom() {
        let myInterval = setInterval(() => {
            if (this.translateService.translate('imenu') !== "imenu" && this.sessionManager.userRoles) {
                clearInterval(myInterval);
                this.menuAvailable = true;
                this.setMenus();
            }
        }, 100);
    }

    getUserMenus(displayLoader = true) {
        return this.http.get('omss40/UserRoleInfo',null, displayLoader);
      }

    getMenu(){
        this.getUserMenus().subscribe(data => {
                this.sessionManager.userRoles = data;
                this.setMenuInDom();
        });
      }


        setMenus(): void {
            this.reportMenus = [
                {
                    id: 1,
                    name: "Reports",
                    url: "OIRREPORT"
                },
                {
                    id: 2,
                    name: "Import Reports",
                    url: "OIIMPJRP"
                },
                {
                    id: 3,
                    name: "Export Reports",
                    url: "OIEXPJRP"
                },
                {
                    id: 4,
                    name: "Manage Reports",
                    url: "OIRMREPOR"
                },
                {
                    id: 5,
                    name: "Manage Assets",
                    url: "OIRMASSET"
                },
            ];

            this.menu = [{
                id: 1,
                name: this.translateService.translate('imenu'),
                icon: 'main-menu',
                children: [],
                showChild: false,
                menuBorder: "center-align menurow"
            },
            //   {
            //       id: 3,
            //       name: this.translateService.translate('imenucalendar'),
            //       icon: 'my-calendar',
            //       children:[],
            //       showChild:false,
            //       menuBorder:"center-align menurow"
            //   },
            //   {
            //       id: 4,
            //       name: this.translateService.translate('imenumywork'),
            //       icon: 'my-tasks',
            //       children:[],
            //       showChild:false,
            //       menuBorder:"center-align menurow"
            //   },
            // {
            //     id: 5,
            //     name: this.translateService.translate('imenumyoffenders'),
            //     icon: 'my-offenders',
            //     children:[],
            //     showChild:false,
            //     menuBorder:"center-align menurow"
            // },
            {
                id: 6,
                name: this.translateService.translate('imenurecent'),
                icon: 'recent-offenders',
                children: [],
                showChild: false,
                menuBorder: "center-align menurow"
            },
            {
                id: 7,
                name: this.translateService.translate('imenuworkspace'),
                icon: 'workspaces',
                children: [],
                showChild: false,
                menuBorder: "center-align menurow"
            },
            {
                id: 9,
                name: this.translateService.translate('Integration'),
                icon: 'integration',
                children: [],
                showChild: false,
                menuBorder: "center-align menurow"
            },
            {
                id: 2,
                name: this.translateService.translate('imenufeatures'),
                icon: 'features',
                children: [],
                showChild: false,
                menuBorder: "center-align menurow"
            },
            {
                id: 8,
                name: this.translateService.translate('imenureport'),
                icon: 'report',
                children: [],
                showChild: false,
                menuBorder: "center-align menurow"
            }
            ];

            this.menu$.next(this.menu);
            this.sysPflExecuteQuery();
            this.finalWork(this.sessionManager.userRoles.menus);

            this.offenderSearchService.recentOffenderUpdateObservable
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(data => {
                    this.getRecentOffendersList();
                });

            this.offenderSearchService.isRecentOffernderUpdated$.subscribe((selectedOffender) => {
                if (selectedOffender) {
                    this.getAndSelectRecentOffender(selectedOffender)
                }
            })    

            this.recentOffenders$.subscribe( e => {
                if(e){
                    this.setRecentOffenders();
                }
             })

             this.myOffenders$.subscribe( e => {
                if(e){
                    this.setMyOffenders();
                }
             })
            
        }

    sysPflExecuteQuery() {
        this.sysPflModelTemp = new SystemProfiles();
        const syspflResult = this.oumsypflFactory.sysPflGetInsightMode();
        syspflResult.subscribe(syspflResultList => {
        for(let i = 0; i < syspflResultList.length; i++) {
            if(syspflResultList[i].profileCode == 'INSIGHT_MODE'){
                if(syspflResultList[i].profileValue == 'Y'){
                    // insight
                    this.buildInsightSubMenus();
                }
            }
          }
        });
      }

    setLink(link) {
        if (link.dynamicForm == null && link.insDashboard == null) {
            if (link.href !== null && link.href !== undefined && link.href !== '') { }
        }
        else if (link.dynamicForm == 'Y') {
            let qpVal = link.href;
            link['queryParams'] = { form: qpVal };
            link.href = "/FRMRENDER";

        }
        else {
            let qpVal = link.href;
            link['queryParams'] = { form: qpVal };
            link.href = "/INSDSBVW";
        }
        return link;
    }


      modifyLink(arr){
        if(arr.length > 0){
            for(let i=0;i<arr.length;i++){
                if(arr[i].children && arr[i].children.length > 0){
                    this.modifyLink(arr[i].children)
                  }
                  else{
                    let modifyLinkObj = this.setLink(arr[i])
                    arr[i] = modifyLinkObj;
                  }
            }
        }
        return arr;
      }

      finalWork(arr){
        for(let i=0;i<this.menu.length;i++){
            let id = this.menu[i].id;
            if ( id == 1 ) {
                let filteredArr = this.removeNonImplementedNodes(arr);
                let myArr = this.modifyLink(filteredArr);
                this.menu[i].children = myArr;
                this.sessionManager.userRoles.menus = myArr;
            }
            else if ( id == 2 ) {
                this.menu[i].children = [
                    {
                        id: 1,
                        name: 'Theme',
                        img: 'assets/images/Recentoffenders_icon.svg',
                        children: [
                            {
                                id: 27,
                                name: 'Aqua',
                            },
                            {
                                id: 21,
                                name: 'Cobalt Blue',
                            },
                            {
                                id: 26,
                                name: 'Light/Clean',
                            },
                        ]
                    },
                    // {
                    //     id: 2,
                    //     name: this.translateServiceService.translate( 'offender.schedule' ),
                    //     href: '/OFFSCH'
                    // },
                    // {   id: 3,
                    //     name:this.translateServiceService.translate('housing.configuration'),
                    //     href:'/HOUSCLEAN'
                    // },
                    // {   id: 4,
                    //     name:'Housing Auto Recommendation',
                    //     href:'/OIDARFPL'
                    // },
                    {
                        id: 2,
                        name:'Migrate AD User',
                        href:'/MIGADUSR'
                    },
    
                ];
            } 
            else if ( id == 4 ) {
                this.menu[i].children = [
                    {
                        id: 1,
                        name: this.translateService.translate( 'ocdmwork.mywork' ),
                        href: '/OCDMWORK'
                    }
                ];
            }    
            else if ( id == 5 ) {
                this.myOffendersID = id;
                this.getMyOffendersList();
            }
            else if ( id == 6 ) {
                this.recentOffendersID = id;
                this.getRecentOffendersList();
            }
            else if ( id == 7 ) {
                this.menu[i].children = [
                    {
                        id: 1,
                        name: this.translateService.translate( 'owheader.title' ),
                        href: '/OWHEADER'
                    },
                    {
                        id: 2,
                        name: 'Intake Dashboard',
                        href: '/OWINTAKE'
                    },
                ];
            }
            else if (id == 8) {
                let authorizedReportMenus = this.removeUnauthorizedReport(this.reportMenus);
                for (let z = 0; z < authorizedReportMenus.length; z++) {
                    authorizedReportMenus[z].href = authorizedReportMenus[z].url;
                    delete authorizedReportMenus.url;
                }
                if (authorizedReportMenus == 0 || authorizedReportMenus == undefined || authorizedReportMenus == null) {
                    this.menu.splice(i, 1);
                }
                else {
                    this.menu[i].children = authorizedReportMenus;
                }
            } 
            else if ( id == 9 ) {
               this.menu[i].children = [
                    {
                        id: 1,
                        name: this.translateService.translate( 'Intake Queue' ),
                        href: '/PORTALAPP'
                    },
                    {
                        id: 2,
                        name: this.translateService.translate( 'Schedule Queue' ),
                        href: '/PORTALSCHAPP'
                    }
                ];
            } 
        }
        this.handleSameHrefs(this.menu);
      }


    getRecentOffendersList() {
        this.recentOffenders = [];
        this.recentOffenders$.next(true)
        this.osiosearFactory.getRecOffendersList(this.sessionManager.currentCaseLoad).subscribe(data => {
            if ( data.length > 0 ) {
                this.recentOffenders = data;
                for ( let i = 0; i < this.recentOffenders.length; i++ ) {
                    this.recentOffenders[i]['isSelected'] = false;
                    if(this.recentOffenders[i].firstName !== null) {
                        this.recentOffenders[i]['name'] = this.recentOffenders[i].firstName + ' ' + this.recentOffenders[i].lastName;
                    } else {
                        this.recentOffenders[i]['name'] = this.recentOffenders[i].lastName;
                    }
                    this.recentOffenders$.next(true)
                    if (this.recentOffenders[i].imageId) {
                        this.imageModel.imageId = this.recentOffenders[i].imageId;
                        this.imageModel.imageObjectId = this.recentOffenders[i].offenderBookId;
                         this.osiosearFactory.offenderImages( this.imageModel ).subscribe( imageData => {
                            for ( let j = 0; j < this.recentOffenders.length; j++ ) {
                                if ( this.recentOffenders[j].offenderBookId == imageData[0].imageObjectId ) {
                                    this.recentOffenders[j].image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                                }
                            }
                            this.recentOffenders$.next(true)
                        });
                    }
                }
                this.findAndSelectRecentOffender();
            } else {
                this.recentOffenders = [];
            }
         });
    }

    findAndSelectRecentOffender(){
        if(this.offenderSearchService.selectedOffender && this.recentOffenders.length > 0){
            for ( let k = 0; k < this.recentOffenders.length; k++ ) {
                    if(this.recentOffenders[k].offenderId == this.offenderSearchService.selectedOffender.offenderId){
                        this.recentOffenders[k].isSelected = true;
                    }
                    else{
                        this.recentOffenders[k].isSelected = false;
                    }
            }
        }
    }


    getAndSelectRecentOffender(selectedOffender){
        let isSelectedOffenderAvailableInList = false;
                for ( let k = 0; k < this.recentOffenders.length; k++ ) {
                    if(this.recentOffenders[k].offenderId == selectedOffender.offenderId){
                        isSelectedOffenderAvailableInList = true;
                        this.recentOffenders[k].isSelected = true;
                      }
                      else{
                        this.recentOffenders[k].isSelected = false;
                      }
                 }

                 if(!isSelectedOffenderAvailableInList){
                    this.getRecentOffendersList();
                 }
    }

    getMyOffendersList() {
        this.myOffenders = [];
        this.myOffenders$.next(true)
        if (this.sessionManager.currentCaseLoadType === 'COMM') {
            this.osiosearFactory.getAssignedOffendersList(this.sessionManager.currentCaseLoadType).subscribe(data => {
                if (data.length > 0) {
                    this.myOffenders = data;
                    for (var i = 0; i < this.myOffenders.length; i++) {
                        this.myOffenders[i]['name'] = this.myOffenders[i].firstName + ' ' + this.myOffenders[i].lastName;
                        this.myOffenders$.next(true)
                        if (this.myOffenders[i].imageId) {
                            this.imageModelMyOffenders.imageId = this.myOffenders[i].imageId;
                            this.osiosearFactory.imageExecuteQuery(this.imageModelMyOffenders).subscribe(imageData => {
                                for (let j = 0; j < this.myOffenders.length; j++) {
                                    if (this.myOffenders[j].offenderBookId == imageData[0].imageObjectId)
                                        this.myOffenders[j].image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                                }
                                this.myOffenders$.next(true)
                            });
                        }
                    }
                }
            });
        }
    }


    setRecentOffenders() {
        if (this.recentOffendersID) {
            for (let i = 0; i < this.menu.length; i++) {
                if (this.menu[i].id && this.recentOffendersID && this.menu[i].id == this.recentOffendersID) {
                    this.menu[i].children = this.recentOffenders;
                    this.menu$.next(this.menu);
                    return;
                }
            }
        }
    }


    setMyOffenders() {
        if (this.myOffendersID) {
            for (let i = 0; i < this.menu.length; i++) {
                if (this.menu[i].id && this.myOffendersID && this.menu[i].id == this.myOffendersID) {
                    this.menu[i].children = this.myOffenders;
                    this.menu$.next(this.menu);
                    return;
                }
            }
        }
    }


    handleRouterChange(){
        // this is loggedIn user 
        if(!this.sessionManager.userSessionDetails()){
            this.navigationArr.length = 0;
            this.routerSubscription.unsubscribe();
            this.selectedOffenderSubscription.unsubscribe();
            this.menuAvailable = false;
           return;
        }

        if(this.sessionManager.userRoles == undefined){
            this.getMenu();
            return;
        }
        else if(this.sessionManager.userRoles && !this.menuAvailable){
            this.setMenuInDom();
            return;
        }

        if(this.navigationArr.length == 0){
            return;
        }

        

        for (let j = 0; j < this.navigationArr.length; j++) {
            if(this.navigationArr[j] !== ''){
                setTimeout(() => {
                    this.finalSetup(j);
                }, 3000);
            } 
        }

      }
    
      makeActiveToParents(currentActivatedEle){
          let li = currentActivatedEle.closest('li')
          let ul = li.parentElement;
          let pLi = ul.parentElement;
          let anchor = pLi.firstElementChild.firstElementChild ;
          anchor.classList.add('active-link');
          if(pLi.nodeName == "LI"){
             this.makeActiveToParents(anchor)
          }
      }

      finalSetup(index){
        let myEv = this.navigationArr[index];
        let ID = myEv.id;
        let url = myEv.url;
        let currentActivatedEle = document.querySelectorAll("[href='#"+ url +"']")[0];

        var htmlCollectionOfActiveEle = [].slice.call(document.getElementsByClassName('active-link'));
        for (var i = 0; i < htmlCollectionOfActiveEle.length; i++) {
          htmlCollectionOfActiveEle[i].classList.remove('active-link');
        }
    
        if(currentActivatedEle){
           currentActivatedEle.classList.add('active-link');
        }
       
        if(this.router.url !== "/home" && this.router.url !== "/login" && currentActivatedEle){
          this.makeActiveToParents(currentActivatedEle)
        }

        this.navigationArr[index] = '';
      }

    handleSameHrefs(menu) {
        this.duplicateHrefsArr = [];
        this.menu = this.updateSameHrefs(menu);
        this.menu$.next(this.menu);
        //console.log("View Set-->" + document.getElementsByClassName('menu-first-li').length)
        this.handleRouterChange();
    }


    updateSameHrefs(arr) {
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].children && arr[i].children.length > 0) {
                    this.updateSameHrefs(arr[i].children)
                }
                else {
                    let linkObj = arr[i];
                    let linkObjName = linkObj['name'];
                    let linkObjHref = linkObj['href'];
                    let linkObjQueryParams = linkObj['queryParams'];
                    if (linkObjHref && linkObjQueryParams == undefined) {
                        let freq = this.countFreq(this.duplicateHrefsArr, linkObjHref);
                        if (freq > 0) {
                           // arr[i]['queryParams'] = { O: freq };
                            this.duplicateHrefsArr.push(linkObjHref);
                        }
                        else {
                            this.duplicateHrefsArr.push(linkObjHref);
                        }
                    }
                }
            }
        }
        return arr;
    }


    countFreq(arr, ele) {
        let count = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == ele) {
                count += 1;
            }
        }
        return count;
    }
     
    
    



    buildInsightSubMenus() {
        this.insightSubMenus = [];
        this.getBiDetails();
      }
      onInsightsClick(insight: any) {
        this.insightSubMenus = this.insightSubMenus.map(object => {
          if (insight.id === object.id) {
            return { ...object, active: true };
          } else {
            return { ...object, active: false };
          }
        });
        this.router.navigate([insight['url']]);
      }
      getBiDetails() {
        const userSession = this.sessionManager.userSessionDetails();
        const userId = userSession.id;
        this.dashboardBiService.getInsightUserMail(userId).subscribe(
          (result: string) => {
            this.dashboardBiService.userEmail = result;
            if (!this.dashboardBiService.userEmail) {
              this.show(
                this.translateService.translate("insights.UserEmailNotAssociatedWithInsights"),
                "warn"
            );
            } else {
              this.getDetails();
            }
          });
      }
      getDetails() {
        this.oumsysetModel.settingType = 'INSIGHTS';
        this.oumsysetModel.settingProviderCode = 'INSIGHTS';
        this.oumsysetService.loadJsonData(this.oumsysetModel).subscribe((result) => {
          const rowData = JSON.parse(result.settingValue);
          this.systemSetData = rowData;
          this.dashboardBiService.environment = this.getKeyCodeValue("INS_ENV", this.systemSetData);
          this.dashboardBiService.siteIdentifier = this.getKeyCodeValue("INS_SITE_IDF", this.systemSetData);
          this.dashboardBiService.embedSecret = this.getKeyCodeValue("INS_EMB_SEC", this.systemSetData);
          this.dashboardBiService.InsightRoolUrl = this.getKeyCodeValue("INSI_SER_URL", this.systemSetData);
          this.dashboardBiService.insightUserId = this.getKeyCodeValue("INS_USER_ID", this.systemSetData);
          this.getAdminDetails();
        });
      }
      getAdminDetails() {
        this.oumsysetModel.settingType = 'INSIGHTS';
        this.oumsysetModel.settingProviderCode = 'AUTH';
        this.oumsysetService.loadJsonData(this.oumsysetModel).subscribe((result) => {
          const rowData = JSON.parse(result.settingValue);
          this.systemSetData = rowData;
          this.dashboardBiService.userAuthEmail = this.getKeyCodeValue("USERNAME", this.systemSetData);
          this.getAdminToken(this.dashboardBiService.userAuthEmail);
          
        });
      }
      getUserToken() {
        this.dashboardBiService.getUserToken().subscribe(data => {
          const result: any = data;
          this.dashboardBiService.token = result.access_token;
          this.getBiUser(this.dashboardBiService.userEmail, this.dashboardBiService.adminToken);
        });
      }
      getAdminToken(email) {
        this.dashboardBiService.getAdminToken(email).subscribe(data => {
          const result: any = data;
          this.dashboardBiService.adminToken = result.access_token;
          this.getUserToken();
        });
      }
      getBiUser(email, token) {
        this.dashboardBiService.getBiUser(email, token).subscribe((data) => {
          const getAccess = data;
          this.dashboardBiService.boldBIUserId = getAccess['UserId'];
          this.getPermissionGroups(this.dashboardBiService.boldBIUserId, token);
        });
      }

    getPermissionGroups(id, token) {
        this.dashboardBiService.getUserGroups(id, token).subscribe(
            (res) => {
                if (!res) {
                    this.show(
                        this.translateService.translate('insights.dashboardAccessDenied'),
                        'warn'
                    );
                } else {
                    this.insightSubMenus = [];
                    let dashboardObj = {
                        id: 1,
                        name: this.translateService.translate('insights.dashboardTitle'),
                        href: 'INSIGHTS'
                    }
                    let datasourceObj = {
                        id: 2,
                        name: this.translateService.translate('insights.datasourceTitle'),
                        href: 'BIDATASOURCE'
                    }
                    const fetchedGroupList = res.GroupList;
                    if (fetchedGroupList) {
                        let insightsAccess = this.getInsightsRights(fetchedGroupList);
                        if (insightsAccess) {
                            if (insightsAccess.canCreateDashboard === 'Y' || insightsAccess.canReadDashboard === 'Y') {
                                this.insightSubMenus.push(dashboardObj);
                            }
                            if (insightsAccess.canCreateDatasource === 'Y' || insightsAccess.canReadDatasource === 'Y') {
                                this.insightSubMenus.push(datasourceObj);
                            }
                            // insight
                            let myObj = {
                                id: 10,
                                name: this.translateService.translate('Insights'),
                                icon: 'insert_chart',
                                children: this.insightSubMenus,
                                showChild: false,
                                menuBorder: "center-align menurow"
                            }
                            let alreadyInsightPushed = false;
                            for (let k = 0; k < this.menu.length; k++) {
                                if (this.menu[k].id == 10) {
                                    alreadyInsightPushed = true;
                                }
                            }
                            if (!alreadyInsightPushed) {
                                this.menu.push(myObj);
                                this.menu$.next(this.menu);
                            }
                        } else {
                            this.show(
                                this.translateService.translate('insights.dashboardAccessDenied'),
                                'warn'
                            );
                        }
                    } else {
                        this.show(
                            this.translateService.translate('insights.dashboardAccessDenied'),
                            'warn'
                        );
                    }
                }
            },
        );
    }
      
      getKeyCodeValue(keycode, arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].KEY_CODE == keycode) {
            return arr[i].VALUE;
          }
        }
        return null
      }
      getInsightsRights(arr) {
        let insightsRights = {
            canCreateDashboard: 'N',
            canReadDashboard: 'N',
            canCreateDatasource: 'N',
            canReadDatasource: 'N',
        };
        for(let i=0; i<arr.length; i++){
            if(arr[i].Name == "Insights_Datasource_Developer"){
                insightsRights.canCreateDatasource = 'Y';
                insightsRights.canReadDatasource = 'Y';
                insightsRights.canCreateDashboard = (insightsRights.canCreateDashboard == 'Y') ? 'Y' : 'N';
                insightsRights.canReadDashboard = (insightsRights.canReadDashboard == 'Y') ? 'Y' : 'N';
            } else if(arr[i].Name == "Insights_Datasource_User"){
                insightsRights.canCreateDatasource = (insightsRights.canCreateDatasource == 'Y') ? 'Y' : 'N';
                insightsRights.canReadDatasource = 'Y';
                insightsRights.canCreateDashboard = (insightsRights.canCreateDashboard == 'Y') ? 'Y' : 'N';
                insightsRights.canReadDashboard = (insightsRights.canReadDashboard == 'Y') ? 'Y' : 'N';
            } else if(arr[i].Name == "Insights_Dashboard_User"){
                insightsRights.canCreateDatasource = (insightsRights.canCreateDatasource == 'Y') ? 'Y' : 'N';
                insightsRights.canReadDatasource = (insightsRights.canReadDatasource == 'Y') ? 'Y' : 'N';
                insightsRights.canCreateDashboard = (insightsRights.canCreateDashboard == 'Y') ? 'Y' : 'N';
                insightsRights.canReadDashboard = 'Y';
            } else if(arr[i].Name == "Insights_Dashboard_Designer"){
                insightsRights.canCreateDatasource = (insightsRights.canCreateDatasource == 'Y') ? 'Y' : 'N';
                insightsRights.canReadDatasource = (insightsRights.canReadDatasource == 'Y') ? 'Y' : 'N';
                insightsRights.canCreateDashboard = 'Y';
                insightsRights.canReadDashboard = 'Y';
            } else if(arr[i].Name == "Insights_Admin"){
                insightsRights.canCreateDatasource = 'Y';
                insightsRights.canReadDatasource = 'Y';
                insightsRights.canCreateDashboard = 'Y';
                insightsRights.canReadDashboard = 'Y';
            }
        }
        sessionStorage.setItem('insightsRights', JSON.stringify(insightsRights));
        return insightsRights;
      }
      show(message, type) {
        this.msglist = [];
        this.msglist.push({ message: message, type: type });
        this.msgs = [...this.msglist];
      }
    removeNonImplementedNodes(myArr) {
        let newArr = JSON.parse(JSON.stringify(myArr));
        if(newArr) {
            //Check Nodes Item has been implemented in route or not.
            for( var index=0; index<newArr.length; index++) {
               let node = newArr[index];
                this.removeNode(newArr, node, index);
                if(!node.children || node.children.length === 0) {
                    //Remove it from parent node if all children has been removed.
                    newArr.splice(index, 1);
                    index--;
                }
            }
        }
        return newArr;
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

    handleOffendersContext(){
        let currentScreen = this.currentActivatedRoute.url;
        if(currentScreen.includes('?')){
            currentScreen = currentScreen.split('?')[0];
        }
        let currentActivatedCaseload = this.offenderSearchService.currentCaseLoad;
        let allowAgencyLocations = this.offenderSearchService.allowAgencies;
        
        let currentScreenIsProperty = ( this.propertyScreen.indexOf( currentScreen ) >= 0 ) ? true : false;

        let currentScreenIsadmission =(this.admissionscreen.indexOf(currentScreen) >= 0  ) ? true : false;

        if (this.selectedOffender == undefined || currentScreen == undefined || currentActivatedCaseload == undefined ||
            this.selectedOffender.agyLocId == undefined) {
            return;
        }

        let selectedOffenderAgencyLoc = this.selectedOffender.agyLocId;

        let selectedOffenderCommAgencyLoc = this.selectedOffender.intakeAgyLocId;

        // clear offender If screen is other than property && selected offender agencyLocation is not include within activatedCaseload's agencyLocations
        if(!currentScreenIsProperty && !currentScreenIsadmission){
            if(!allowAgencyLocations.includes(selectedOffenderAgencyLoc) && !allowAgencyLocations.includes(selectedOffenderCommAgencyLoc)){
                this.offenderSearchService.clear();
                this.getRecentOffendersList();
            }
        } 
        
    }

    clearOffender(){
        this.selectedOffender = undefined;
    }
    
    removeUnauthorizedReport (reportMenus):any {
        let availablereportMenus : any = [];
        let roles = this.sessionManager.userRoles.roles;
        if(reportMenus) {
            reportMenus.forEach((report)=>{
                if(roles[report.url]) {
                    availablereportMenus.push(report);  
                }
            });
        }
        return availablereportMenus;
    }


    actionProceedDialog() {
        let msg = this.translateService.translate('ocdcords.changeslostmsg')
        const dialogConfig = {
            data: {
                title: 'Changes Lost',
                message: msg,
                yesText: 'Proceed',
                noText: 'Stop'
            },
            disableClose: true,
            hasBackdrop: true,
            height: '170px',
            width: '100%',
        };
        return this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    }


}