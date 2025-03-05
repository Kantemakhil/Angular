import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OmuclassService } from '../service/omuclass.service';
import { AssessmentSectionScoresV1 } from '@inst/classification/beans/AssessmentSectionScoresV1';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
// import required bean declarations

@Component( {
    selector: 'app-omuclass',
    templateUrl: './omuclass.component.html',
    styleUrls: []
} )

export class OmuclassComponent implements OnInit {
    // Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    subtotalsData: AssessmentSectionScoresV1[] = [];
    subtotalsDataTemp: AssessmentSectionScoresV1[] = [];
    // TODO angular.copy(this.subtotalsData, thissubtotalsDataTemp);
    subtotalsModel: AssessmentSectionScoresV1 = new AssessmentSectionScoresV1();
    subtotalsIndex: number;
    subtotalsInsertList: AssessmentSectionScoresV1[] = [];
    subtotalsUpdatetList: AssessmentSectionScoresV1[] = [];
    subtotalsDeleteList: AssessmentSectionScoresV1[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    subTotalsColumnDef: any[];
    subTotalsReadOnly = false;
    cg$ctrlReadOnly = false;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    constructor( private omuclassFactory: OmuclassService, public translateService: TranslateService ) {
        // TODO initilize data members here..!
        this.subTotalsColumnDef = [];
    }
    ngOnInit() {
        this.subtotalsIndex = -1;
        this.subtotalsExecuteQuery();
        this.subTotalsColumnDef = [
            { fieldName: this.translateService.translate('common.date'), field: 'effectiveDate', editable: false,
             width: 150, datatype: 'date'},
            { fieldName:  this.translateService.translate('omuclass.section'), field: 'section', editable: false, width: 150 },
            { fieldName:  this.translateService.translate('common.description'), field: 'description', editable: false, width: 150 },
            { fieldName:  this.translateService.translate('omuclass.score'), field: 'score', editable: false, width: 150 },
            { fieldName:  this.translateService.translate('omuclass.securitylevels'), field: 'securityLevelDesc',
             editable: false, width: 200 }
        ];
        // TODO all initializations here
    }
   /**
     *To display messages
    */
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }
    onRowClicksubtotals( event ) {
    }
    onExitclick() {
        this.dialog.close(null);
    }
    subtotalsExecuteQuery() {
        this.subtotalsModel = new AssessmentSectionScoresV1();
        this.subtotalsModel.offenderBookId = this.dialog.data.offenderBookId;
        this.subtotalsModel.parentAssessmentId = this.dialog.data.assessmentTypeId;
        this.subtotalsModel.assessmentSeq = this.dialog.data.assessmentSeq;
        const subtotalsResult = this.omuclassFactory.
            subTotalsExecuteQuery( this.subtotalsModel );
        subtotalsResult.subscribe( subtotalsResultList => {
            if ( subtotalsResultList.length === 0 ) {
                this.subtotalsData = [];
            } else {
                this.subtotalsIndex = 0;
                this.subtotalsData = subtotalsResultList;
                this.subtotalsModel = subtotalsResultList[0];
            }
        } );
    }


}
