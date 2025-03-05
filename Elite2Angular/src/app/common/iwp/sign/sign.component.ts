import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ManageAppBarService } from '@core/service/manage-app-bar.service';
import { EoffenderService } from '../service/eoffender.service';
import { SigndocService } from '../service/signdoc.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit,OnDestroy {

  type = 'error';
  msglist = [];
  message = ' Invalid.';
  msgs: any[] = [];
  uri:any = null;

  constructor(private redirectUtil: RedirectUtil, public translateService: TranslateService,private activatedRoute: ActivatedRoute, private signDocService: SigndocService,
        private sessionManager: UserSessionManager, private eoffenderService: EoffenderService, private appbarService:ManageAppBarService) { }

  ngOnInit(): void {
    if(this.signDocService.signDocRequiredInfo){
      this.appbarService.manageIcon(false);
      var element = document.getElementsByClassName("s4-app-logo");
      element[0].classList.add('hidden');
      this.uri = this.signDocService.signDocRequiredInfo.documentID+ '~' +this.signDocService.signDocRequiredInfo.fileType;
      
    }
    else{
      this.type = 'warn';
      this.message = this.translateService.translate('Please click on the sign icon');
      this.show();
      //this.redirectUtil.redirectToHome();
      window.history.back();
    }
  }

  ngOnDestroy(): void {
    var element = document.getElementsByClassName("s4-app-logo");
    element[0].classList.remove('hidden');
    this.signDocService.signDocRequiredInfo = undefined;
  }

  show() {
    this.msglist = [];
    this.msglist.push( { message: this.message, type: this.type } );
    this.msgs = [...this.msglist];
  }


}
