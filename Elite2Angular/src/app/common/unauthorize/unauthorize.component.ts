import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { RedirectUtil } from '@core/classes/redirectUtil';

@Component({
  selector: 'app-unauthorize',
  templateUrl: './unauthorize.component.html',
  styleUrls: ['./unauthorize.component.scss']
})
export class UnauthorizeComponent implements OnInit {


  arr = [];
  constructor(public allDialogRef: MatDialog, public translateService: TranslateService, private activatedRoute: ActivatedRoute,public redirectUtil: RedirectUtil) { }

  ngOnInit(): void {
    sessionStorage.removeItem('UNAUTHORIZE');
    this.redirectUtil.moduleNameArr$.subscribe(arrData => {
      this.arr = arrData;
      if(this.arr.length === 0){
        window.history.back();
      }
      else{
        this.allDialogRef.closeAll();
      }
    });
  }

}
