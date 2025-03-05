import { Component, Input, OnInit, Output, EventEmitter, ViewChild , ElementRef, AfterViewInit} from '@angular/core';
import { Purpose } from './purpose' ;
import { Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { UiCustomizeService } from '@core/service/ui-customize.service';

@Component( {
    selector: 's4-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
} )
export class ButtonComponent implements OnInit, AfterViewInit {

    // represents onclick event of button
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
    // represents id of button
    @Input() id: string;
    // represents disable of button
    //@Input() disabled = false;
    innerDisabled = false;
    @Input() isLink = false; 
    // represents type of button
    @Input() type = Purpose.DEFAULT;
    @Input() module: string;
    @ViewChild ('buttonRef', {static: false, read: ElementRef}) buttonLinkText: ElementRef;
    btnColorConfig: any;
    
    btnClass:string="secondary-grey-btn";
    lastFocusedEle:any;

    constructor(public sessionManager: UserSessionManager, private route: Router, public uiCustomizeService: UiCustomizeService,) { }
 
    ngOnInit() {
        this.btnColorConfig = this.uiCustomizeService.btnConfig;
        if(this.type==Purpose.SECONDARY){
            this.btnClass="secondary-grey-btn";
        } else if(this.type==Purpose.PRIMARY){
            this.btnClass="primary-blue-btn";
        } else {
            this.btnClass="secondary-grey-btn";
        }
    }
    getColorStyles() {
        let myStyles = null;
        this.btnColorConfig = this.uiCustomizeService.btnConfig;
        if (this.btnColorConfig){
            if(this.type==Purpose.PRIMARY){
                myStyles = {
                'background-color': this.btnColorConfig.primaryColor ? this.btnColorConfig.primaryColor : undefined,
                'color': this.btnColorConfig.primaryTextColor ? this.btnColorConfig.primaryTextColor : undefined,
                };
            } else if (this.type==Purpose.SECONDARY) {
                myStyles = {
                'background-color': this.btnColorConfig.secondaryColor ? this.btnColorConfig.secondaryColor : undefined,
                'color': this.btnColorConfig.secondaryTextColor ? this.btnColorConfig.secondaryTextColor : undefined,
                };
            } else {
                myStyles = undefined;
                // this.btnClass = "secondary-grey-btn";
            }
        }
        return myStyles;
    }
    mouseover(){
        this.lastFocusedEle = document.activeElement;
    }

    click() {
        if (this.lastFocusedEle.tagName == 'INPUT') {
            setTimeout(() => {
                this.onClick.emit();
            }, 500);
        }
        else {
            this.onClick.emit();
        }
    }
    
    get disabled() :any {
        return this.innerDisabled;
    }
    
    ngAfterViewInit() {
        this.disableButtonRoleBased();
    }
    
    
    @Input()
    set disabled(isDisabled: any) {
        this.innerDisabled = isDisabled;
        this.disableButtonRoleBased();
    }


    disableButtonRoleBased() {
        if(this.buttonLinkText) {
            let buttonText = this.buttonLinkText.nativeElement.firstChild.innerText;
            const buttonTextList = ['save','add','submit','delete','generate','upload','import','export','update'];
            if (this.sessionManager && this.sessionManager.isSessionValied()) {
                if (this.sessionManager.userRoles) {
                    let url : string = this.route.url;
                    if(url.indexOf("?")>0) {
                        url = url.split("?")[0];
                    } 
                    if (url.startsWith('/')) {
                        url = url.substring(1);
                    }
                    if(url =="EOFFENDER"){
                        url=this.module;
                    }
                    let screenRole = this.sessionManager.userRoles.roles[url];
                    const currentCaseLoadIdObj = this.sessionManager.caseLoads.filter(e => e.caseloadId === this.sessionManager.currentCaseLoad );
                    if(((currentCaseLoadIdObj[0] && currentCaseLoadIdObj[0].updateAllowedFlag === 'N') || screenRole !== 'full') && buttonTextList.includes(buttonText?.trim().toLowerCase())) {
                        this.innerDisabled =  true;
                    }
                }
            }
        }
    }

}
