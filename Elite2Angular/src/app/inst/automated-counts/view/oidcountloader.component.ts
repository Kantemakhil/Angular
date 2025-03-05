import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidcountService } from '@inst/automated-counts/service/oidcount.service';
import { Subscription, timer } from 'rxjs';
import { TranslateService } from '@common/translate/translate.service';
@Component({
  selector: 'app-oidcountloader',
  templateUrl: './oidcountloader.component.html'
})

export class OidcountloaderComponent implements OnInit, OnDestroy {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  label: string;
  interval: any;
  timer: any;
  sub: Subscription;
  constructor(private oidcountFactory: OidcountService, public translateService: TranslateService) {
  }
  ngOnInit() {
    this.label = this.translateService.translate('oidcount.intiationinprogress');
    let parentScreenData = this.dialog.data;
    this.timer = timer(0, 5000);
    this.sub = this.timer.subscribe(t => {
      const refrTemp = this.oidcountFactory.refreshCountOfTempOidCount(parentScreenData.globalSessionId);
      refrTemp.subscribe(gridData => {
        if (gridData && gridData.length > 0) {
          if (gridData[0].actualCount && !gridData[0].reportedCount) {
            this.sub.unsubscribe();
            this.dialog.close({
              tempOidcountData: gridData
            });
          }

        }

      });

    }, 5000);

  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
