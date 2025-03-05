import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { LoaderService } from '@core/loader/loader.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { JiscommonconfirmboxService } from '../service/jiscommonconfirmbox.service';

@Component({
    selector: 'app-jiscommonconfirmbox',
    templateUrl: './jiscommonconfirmbox.component.html',
})
export class JiscommonconfirmboxComponent implements OnInit {

    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    yasBtn: boolean;
    noBtn: boolean;
    yesLabel: string = 'OK';
    cancelLabel: string = 'Cancel';
    flagOne = this.translateService.translate('jiscommonconfirmbox.searchinprogresspleasewait');
    flagTwo =  this.translateService.translate('jiscommonconfirmbox.awaitingresponsefromjiscommon');
    flagThree = this.translateService.translate('jiscommonconfirmbox.unabletoretrieveresults');
    flagFour = this.translateService.translate('jiscommonconfirmbox.eithertheconnectiontojiscommonhasbeenlost');
    flagFive = this.translateService.translate('jiscommonconfirmbox.isunavailabeatthistimepleasetryagain');
    noBtnDisable: boolean = false;
    interval: number = 5000
    take: number = 24;
    flag: string = "N";
    count: any = 0;
    negativeFlag: boolean = false;
    positiveFlag: boolean = true;
    yesFlag: boolean = true;
    cancelFlag: boolean = true;
    constructor(public translateService: TranslateService,
        private loaderService: LoaderService,
        private jiscommonconfirmboxService: JiscommonconfirmboxService) {

    }

    ngOnInit() {
        this.callEveryFiveSeconds();
        // this.loaderService.showLoader();
    }

    callEveryFiveSeconds() {
        interval(this.interval) // 5000 milliseconds = 5 seconds
            .pipe(take(this.take)) // 24 * 5 seconds = 2 minutes
            .subscribe(() => {
                if (this.yesFlag && this.cancelFlag) {
                    if (this.flag !== "Y") {
                        this.count = this.count + 1;
                        if (this.dialog.data['searchType'] && this.dialog.data['moduleName'] === 'OSIOSEAR') {
                            this.getDataFromJisCommonSystem();
                        }else if(this.dialog.data['searchType'] && this.dialog.data['moduleName'] === 'OSIPSEAR'){
                            this.getDataFromJisCommonSystemForPerson();
                        }
                    }
                    if (this.count === 24) {
                        this.negativeFlag = true;
                        this.positiveFlag = false;
                    }
                }
            });
    }

    getDataFromJisCommonSystem() {
        const obj = this.jiscommonconfirmboxService.getDataFromJisCommonSystem(this.dialog.data['pinSequence'],this.dialog.data['searchType'],this.dialog.data['moduleName']);
        obj.subscribe(data => {
            if (data) {
                this.flag = "Y";
                this.dialog.close(data);
            } else {
                this.flag = "N";
            }
        });
    }

    getDataFromJisCommonSystemForPerson() {
        const obj = this.jiscommonconfirmboxService.getDataFromJisCommonSystemForPerson(this.dialog.data['pinSequence'],this.dialog.data['searchType'],this.dialog.data['moduleName']);
        obj.subscribe(data => {
            if (data) {
                this.flag = "Y";
                this.dialog.close(data);
            } else {
                this.flag = "N";
            }
        });
    }



    yes() {
        this.yesFlag = false;
        this.count = 0;
        this.loaderService.hideLoader();
        this.dialog.close(false);
    }

    cancel() {
        this.cancelFlag = false;
        this.count = 0;
        this.loaderService.hideLoader();
        this.dialog.close(false);
    }

}
