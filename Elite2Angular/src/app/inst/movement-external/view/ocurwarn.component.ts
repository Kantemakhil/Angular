import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcurwarnService } from '../service/ocurwarn.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
//   import required bean declarations

@Component({
    selector: 'app-ocurwarn',
    templateUrl: './ocurwarn.component.html'
})

export class OcurwarnComponent implements OnInit {
    //   Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    ctlLstColumnDef: any[];
    ctlUnColumnDef: any[];
    ctlBlkReadOnly = false;
    ctlLstReadOnly = false;
    ctlUnReadOnly = false;
    titleBlockReadOnly = false;
    offRelDetailsReadOnly = false;
    label: string;
    constructor(private ocurwarnFactory: OcurwarnService, public translateService: TranslateService,
        private offenderSearchService:OffenderSearchService) {
        //   TODO initilize data members here..!
      
        //offenderSearchService.selectedOffender = JSON.parse(localStorage.getItem('selectedOffender'));
        this.ctlLstColumnDef = [];
        this.ctlUnColumnDef = [];
    }
    ngOnInit() {
        
        this.label = this.dialog.data.lastName + ', ' + this.dialog.data.firstName + ' ' +
            this.dialog.data.offenderIdDisplay + ' ' + this.translateService.translate('ocuwarn.activelegalcase');
    }
    /*
     * This function executed when we click on Yes button
     */
    butYesWhenButtonPressedTrigger() {
        this.dialog.close(true);
    }
    /*
     * This function executed when we click on No button
     */
    butNoWhenButtonPressedTrigger() {
        this.dialog.close(false);
    }
}
