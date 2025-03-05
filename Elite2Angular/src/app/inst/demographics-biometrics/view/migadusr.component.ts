import { OumucreatService } from '@sa/usersystemsecurity/service/oumucreat.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@common/translate/translate.service";

@Component({
  selector: "app-migadusr",
  templateUrl: "./migadusr.component.html"
})
export class MigadusrComponent implements OnInit {
  disabled: boolean;
  type = "error";
  msglist = [];
  message = " Invalid.";
  msgs: any[] = [];
  vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
  constructor(
    public translateService: TranslateService,
    private oumucreatService: OumucreatService,
 

  ) {}

  ngOnInit() {}

  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  migrateAdUser(){
    this.oumucreatService.migrateAdUser().subscribe((result) => {
      
      if (result === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
      } else {
        this.show('common.addupdateremoverecordfailed', 'error');
      }



          
      })
    };

  
}
