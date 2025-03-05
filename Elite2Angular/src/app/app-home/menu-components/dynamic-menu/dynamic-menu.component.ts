import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Images } from '@common/beans/Images';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DynamicMenuService } from '@core/service/dynamic-menu.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss']
})

export class DynamicMenuComponent implements OnInit,OnDestroy {
  
  menu:any[] = [];
  menuSubscription:any;

  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  imageModel: Images = new Images();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
    public translate: TranslateService, private router: Router, public dms: DynamicMenuService,
    private offenderSearchService: OffenderSearchService,
        private osiosearFactory: OsiosearService, private sessionManager: UserSessionManager,
        public activatedRoute: ActivatedRoute, private dialog: MatDialog) {

    // register SVG icons for this component
    this.matIconRegistry.addSvgIcon("main-menu",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/view_modules.svg")
    );
    this.matIconRegistry.addSvgIcon("features",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/features.svg")
    );
    this.matIconRegistry.addSvgIcon("my-calendar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/my-calendar.svg")
    );
    this.matIconRegistry.addSvgIcon("my-tasks",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/my-tasks.svg")
    );
    this.matIconRegistry.addSvgIcon("my-offenders",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/my-offenders.svg")
    );
    this.matIconRegistry.addSvgIcon("recent-offenders",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/recent_actors.svg")
    );
    this.matIconRegistry.addSvgIcon("workspaces",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/workspaces.svg")
    );
    this.matIconRegistry.addSvgIcon("report",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/report.svg")
    );
    this.matIconRegistry.addSvgIcon("insert_chart",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/insert_chart.svg")
    );
    this.matIconRegistry.addSvgIcon("integration",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/integration.svg")
    );
  }

  ngOnInit(): void {
    this.menuSubscription = this.dms.menu$.subscribe(e => {
       this.menu = e;
    })
  }

  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
    this.dms.routerSubscription.unsubscribe();
    this.dms.selectedOffenderSubscription.unsubscribe();
    this.dms.menuAvailable = false;
    this.menu = [];
    this.dms.insightSubMenus = [];
  }

  openMenu(e: any) {
    let ele = e.elementRef.nativeElement;
    let anchor = ele.parentElement.children[0].getElementsByTagName('a')[0];
    let iIcon = ele.parentElement.children[0].getElementsByTagName("i");
    if(iIcon.length > 0){
      iIcon = iIcon[0]
    }
    else{
      iIcon = ele.parentElement.children[0].getElementsByTagName("mat-icon")[0];
    }
    
    let ul = ele.nextElementSibling;
    if (ul.style.display === "block") {
      ul.style.display = "none";
      iIcon.classList.remove('open-arrow')
      iIcon.innerText = 'keyboard_arrow_down'
    }
    else {
      iIcon.innerText = 'keyboard_arrow_up'
      iIcon.classList.add('open-arrow')
      ul.style.display = "block";
    }
  }

  refreshRecentOffenders(){
    this.dms.getRecentOffendersList();
  }

  refreshMyOffenders(){
    this.dms.getMyOffendersList();
  }

  redirectTo(level,ev) {
    let link = level.href;
    if(level.queryParams && level.queryParams.form){
        link = link + "?form=" + level.queryParams.form
    }
  }

  onMyOffenderclick(myOffenderData: any, ev) {
    let inputVHeaderBlockModel = new VHeaderBlock();
    inputVHeaderBlockModel.offenderIdDisplay = myOffenderData.offenderIdDisplay;
    inputVHeaderBlockModel.offenderId = myOffenderData.offenderId;
    inputVHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
    const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(inputVHeaderBlockModel);
    offbkGlobal.subscribe(list => {
      if (list.length > 0) {
        this.vHeaderBlockModel = list[0];
        if (list[0].imageId != null) {
          this.imageModel.imageId = list[0].imageId;
          this.osiosearFactory.imageExecuteQuery(this.imageModel).subscribe(imageData => {
            this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
          });
        }
        this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
      } else {
        this.vHeaderBlockModel = new VHeaderBlock();
        this.offenderSearchService.selectedOffender = undefined;
      }
    });
  }

  onRecentOffenderclick(recentOffenderData: any, ev) {
    // If trying to select same offendr again
    if (this.vHeaderBlockModel && recentOffenderData && this.vHeaderBlockModel.offenderIdDisplay == recentOffenderData.offenderIdDisplay) {
      return;
    }

    if (this.router && this.dms.restrictDeactivateScreensArr.includes(this.router.url) && !this.dms.isSingleSaveBtnDisable) {
      let confirmDlg = this.dms.actionProceedDialog();
      confirmDlg.afterClosed().subscribe((result) => {
        confirmDlg = null;
        if (result && result == true) {
          this.proceedRecentOffenderclick(recentOffenderData, ev)
        }
      });
    }
    else {
      this.proceedRecentOffenderclick(recentOffenderData, ev)
    }

  }


  proceedRecentOffenderclick(recentOffenderData: any, ev) {
    this.dms.isSingleSaveBtnDisable = true;
    this.vHeaderBlockModel = new VHeaderBlock();
    this.vHeaderBlockModel.offenderIdDisplay = recentOffenderData.offenderIdDisplay;
    this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
    this.vHeaderBlockModel['parentForm'] = this.router.url;
    const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
    offbkGlobal.subscribe(list => {
      if (list.length > 0) {
        this.vHeaderBlockModel = list[0];
        if (list[0].imageId != null) {
          this.imageModel.imageId = list[0].imageId;
          this.osiosearFactory.imageExecuteQuery(this.imageModel).subscribe(imageData => {
            this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
          });
        }
        this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
        this.offenderSearchService.setOffenderStatus('recentOffender');
      } else {
        this.vHeaderBlockModel = new VHeaderBlock();
        this.offenderSearchService.selectedOffender = undefined;
        this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
        this.offenderSearchService.offenderSelected = undefined;
        this.offenderSearchService.setOffenderStatus('recentOffender');
      }
    });
  }

  changeTheme(id) {
      const fieldElement = <HTMLBodyElement>(document.getElementsByTagName('body')[0]);
      fieldElement.classList.remove("s4-theme","deeppurple-amber","pink-bluegrey","purple-green", "indigo-pink", "light-and-clean", "aqua-theme", "teal-color-theme", "orange-color-theme");
      if(id == 21) {
          fieldElement.classList.add("s4-theme");
      } else if(id == 22) {
          fieldElement.classList.add("deeppurple-amber");
      } else if(id == 23) {
          fieldElement.classList.add("pink-bluegrey");
      } else if(id == 24) {
          fieldElement.classList.add("purple-green");
      } else if(id == 25) {
          fieldElement.classList.add("indigo-pink");
      } else if(id == 26) {
      	  fieldElement.classList.add("light-and-clean");
  	  } else if(id == 27) {
      	  fieldElement.classList.add("aqua-theme");
      } else {
          fieldElement.classList.add("teal-color-theme");
      }
  }

  handleOffenderActiveness(ev){
    let li = ev.target.closest('a').closest('li');
    var htmlCollectionOfActiveEle = [].slice.call(document.getElementsByClassName('dynamic-menu-offender'));
    for (var i = 0; i < htmlCollectionOfActiveEle.length; i++) {
      htmlCollectionOfActiveEle[i].classList.remove('dynamic-menu-selected-offender');
    }
    if(li){
       li.classList.add('dynamic-menu-selected-offender');
    }
  }



}



