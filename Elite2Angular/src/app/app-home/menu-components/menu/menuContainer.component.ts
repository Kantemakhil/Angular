import { Component, Input, ViewChild, OnInit, forwardRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { LoginService } from '@common/login/service/login.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AppHomeComponent } from "../../../app-home/app-home.component";

import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { MyOffendersComponent } from '../my-offenders/my-offenders.component';
import { RecentOffenderComponent } from '../recent-offender/recent-offender.component';

@Component( {
    selector: 'menu-container',
    templateUrl: './menuContainer.component.html',
    styleUrls: ['./menuContainer.component.scss']
} )
export class MenuContainerComponent implements OnInit {

    constructor( private router: Router,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private loginService: LoginService,
        @Inject( forwardRef(() => AppHomeComponent ) ) public app: AppHomeComponent,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer) {
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

    nodes: any;
    @Input() homeNodes: any;
    @Input() sidenav: any;
    @Input() mainNodes = [];

  @ViewChild('mainMenu4', {static: false}) mainMenu4: any;
  @ViewChild(RecentOffenderComponent) roc;
  @ViewChild(MyOffendersComponent) moc;
  isGotAssignedOffender : boolean = false;
  isGotRecentOffender : boolean = false;
    ngOnInit() {
        this.app.getNodes();
    }

    openSubMenu( id ) {
        let mainNodes = null;
        for(var i=0; i<this.mainNodes.length; i++) {
            if(id == this.mainNodes[i].id) {
                mainNodes = this.mainNodes[i];
            }
        }
        
        
        mainNodes.showChild = !mainNodes.showChild;
        if ( id == 1 ) {
            this.nodes = this.homeNodes;
            mainNodes.nodes = this.nodes;
            mainNodes.menuBorder = mainNodes.showChild ? "menuBorder center-align menurow" : "center-align menurow";
        } else if ( id == 2 ) {
            mainNodes.menuBorder = mainNodes.showChild ? "menuBorder center-align menurow" : "center-align menurow";
            mainNodes.nodes = [
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
                //     name: this.translateService.translate( 'offender.schedule' ),
                //     href: '/OFFSCH'
                // },
                // {   id: 3,
                //     name:this.translateService.translate('housing.configuration'),
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
        } else if ( id == 4 ) {
            mainNodes.menuBorder = mainNodes.showChild ? "menuBorder center-align menurow" : "center-align menurow";
            mainNodes.nodes = [
                {
                    id: 1,
                    name: this.translateService.translate( 'ocdmwork.mywork' ),
                    href: '/OCDMWORK'
                }
            ];
        }
        else if ( id == 10 ) {
            mainNodes.menuBorder = mainNodes.showChild ? "menuBorder center-align menurow" : "center-align menurow";
        }
        else if ( id == 5 ) {
            mainNodes.menuBorder = mainNodes.showChild ? "menuBorder center-align menurow" : "center-align menurow";
            if(!this.isGotAssignedOffender){
                this.moc.getAssignedOffenders();
                this.isGotAssignedOffender = true;
            }   
        }
        else if ( id == 6 ) {
            mainNodes.menuBorder = mainNodes.showChild ? "menuBorder center-align menurow" : "center-align menurow";
            if(!this.isGotRecentOffender){
                this.roc.getRecentOffendersList();
                this.isGotRecentOffender = true;
            } 
        }
        else if ( id == 7 ) {
            mainNodes.menuBorder = mainNodes.showChild ? "menuBorder center-align menurow" : "center-align menurow";
            mainNodes.nodes = [
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
        else if ( id == 8 ) {
            mainNodes.menuBorder = mainNodes.showChild ? "menuBorder center-align menurow" : "center-align menurow";
        } else if ( id == 9 ) {
            mainNodes.menuBorder = mainNodes.showChild ? "menuBorder center-align menurow" : "center-align menurow";
            mainNodes.nodes = [
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
        } else {
            mainNodes.showChild = false;
            mainNodes.menuBorder = mainNodes.showChild ? "menuBorder center-align menurow" : "center-align menurow";
        }

        //this.removeNonImplementedNodes();

    }

}


