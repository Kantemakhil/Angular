import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OmuaprisService } from '@inst/visits-management/service/omuapris.service';
import { VOffenderAuthorisedVisitors } from '@visitsbeans/VOffenderAuthorisedVisitors';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
    selector: 'app-omuapris',
    templateUrl: './omuapris.component.html'
})

export class OmuaprisComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('visitorPersonGrid') visitorPersonGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    voffauthvisData: VOffenderAuthorisedVisitors[] = [];
    voffauthvisDataTemp: VOffenderAuthorisedVisitors[] = [];
    voffauthvisModel: VOffenderAuthorisedVisitors = new VOffenderAuthorisedVisitors();
    voffauthvisIndex = -1;
    voffauthvisInsertList: VOffenderAuthorisedVisitors[] = [];
    voffauthvisUpdatetList: VOffenderAuthorisedVisitors[] = [];
    voffauthvisDeleteList: VOffenderAuthorisedVisitors[] = [];
    visitDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean ;
    vOffAuthVisColumnDef: any[];
    fboLocColumnDef: any[];
    avlLocColumnDef: any[];
    avlLocReadOnly: boolean;
    butCtrl1ReadOnly: boolean;
    fboLocReadOnly: boolean;
    butCtrl2ReadOnly: boolean;
    vOffAuthVisReadOnly: boolean;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    selectDisable: boolean;
    enableUpdate = true;
    checkFlag: boolean;
    warnFlag: boolean;
    constructor(private omuaprisFactory: OmuaprisService,
        public translateService: TranslateService, public dialogService: DialogService) {
        this.vOffAuthVisColumnDef = [];
        this.fboLocColumnDef = [];
        this.avlLocColumnDef = [];

    }
    ngOnInit() {
        this.selectDisable = true;
        this.checkFlag = false;
        this.vOffAuthVisColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'visitorOffenderIdDisplay',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'visitorLastName',
              editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'visitorFirstName',
              editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'location', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.contacttype'), field: 'contactType',
              editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.relationship'), field: 'relationshipType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.age'), field: 'age', editable: false, width: 150 },
            { fieldName: this.translateService.translate('omuapris.restriction'), field: 'restriction', editable: false, width: 150 },
            { fieldName: '', field: 'buttonView', datatype: 'hyperlink', displayas: 'href',
            dialogWidth: '80%', styleClass: 'search',  editable: false, width: 150 ,
            link: '/OCUPREST',  data: 'row', updateField: 'row', modal: true},
            { fieldName: this.translateService.translate('common.select'), field: 'select', datatype: 'checkbox',
             editable: true, width: 150 },
        ];
        this.voffauthvisExecuteQuery();
    }
    /**
     * event is fired when click on a row in Grid.
     * @param event
     */
    onRowClickvoffauthvis(event) {
        if (event) {
            this.voffauthvisModel = new VOffenderAuthorisedVisitors();
            this.voffauthvisModel = event;
        }

    }
    /**
     * event is fired when click on Select button.
     * throws a validation message when does not a check(Select field) a atleast one value in Grid.
     */
     onClickOnSelect() {
        if (!this.checkFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('omuapris.pleaseselectanoffenderrecord');
            this.show();
            return;

        }
        const closedData = [];
        this.voffauthvisData.forEach(element => {
            if (element.select) {
                closedData.push(element);
            }
        });
        // this.dialog.close({offenderIdDisplay: closedData[0].visitorOffenderIdDisplay,
        //     lastName: closedData[0].visitorLastName,
        //     firstName: closedData[0].visitorFirstName,
        //     agyLocId: closedData[0].location,
        //     contactType: closedData[0].contactType,
        //     restriction: closedData[0].restriction,
        //     relationshipType: closedData[0].relationshipType,
        //     selectLength: closedData.length,
        //     ocuvwarnFlag:  true,
        //     contactRootOffenderId: closedData[0].contactRootOffenderId
        // });
         this.dialog.close(closedData);
    }
    /**
     * event is fired when click on Cancel button.
     */
    onClickOnCancel() {
        this.dialog.close(null);
    }
    /**
     * event is called at the time of Screen loading.
     * displays the data in grid.
     */
    voffauthvisExecuteQuery() {
        this.voffauthvisModel.offenderBookId = this.dialog.data.offenderBookId;
        if (this.dialog.data.visitDate) {
        this.visitDate = DateFormat.getDate(this.dialog.data.visitDate);
        } else {
            this.visitDate = DateFormat.getDate();
        }
        const voffauthvisResult = this.omuaprisFactory.
        vOffAuthVisExecuteQuery(this.voffauthvisModel);
        voffauthvisResult.subscribe(voffauthvisResultList => {
            if (voffauthvisResultList.length === 0) {
                this.voffauthvisData = [];
                this.selectDisable = true;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                this.selectDisable = false;
                for (let i = 0; i < voffauthvisResultList.length; i++) {
                     voffauthvisResultList[i].buttonView = '';
                }
                this.voffauthvisData = [];
                this.voffauthvisData = voffauthvisResultList;
                for (let j = 0; j < this.voffauthvisData.length ; j++) {
                    this.voffauthvisData[j].visitorOffenderId = this.voffauthvisData[j].contactRootOffenderId;
                    // this.voffauthvisData[j]['selectFlag'] = false;
                    this.visitorPersonGrid.setColumnData('select', j, false);
                }
                this.voffauthvisModel = this.voffauthvisData[0];
                this.voffauthvisIndex = 0;
            }
        });
    }
    /*
  *  event is used to validate the row
  */
  validateData = (event) => {
    const rowdata = new ValidateRowReturn();
    const rowIndex = event.rowIndex;
       rowdata.validated = true;
       if (event.data.select === true) {
        this.warnFlag = false;
             for (let i = 0; i < this.voffauthvisData.length; i++) {
               //  this.voffauthvisData[i]['selectFlag'] = false;
                   // if (this.voffauthvisData[i].select) {
                    if (this.voffauthvisData[i]['select']) {
                         this.enableUpdate = false;
                         this.checkFlag = true;
                   }
             }
             const warnService = this.omuaprisFactory.getOffenderRestrcitions(event.data.visitorOffenderIdDisplay,
                 DateFormat.getDate(this.visitDate).getTime());
             warnService.subscribe(resData => {
                 if (resData.length > 0) {
                    const offRestrictionsData = {
                        personId: null, inVoke: 'OFFENDER', offenderId: event.data.visitorOffenderId,
                         offenderIdDisplay: event.data.visitorOffenderIdDisplay,
                        offenderBookId: resData[0].offenderBookId, visitDate: DateFormat.getDate(this.visitDate).getTime()
                    };
                    this.dialogService.openLinkDialog('/OCUVWARN', offRestrictionsData, 70).subscribe(result => {
                        if (result) {
                            this.visitorPersonGrid.setColumnData('select', rowIndex, true);
                            this.warnFlag = true;
                        } else {
                            event.data.select = false;
                            this.visitorPersonGrid.setColumnData('select', rowIndex, false);
                        }
                    });

                 }

             });
       } else if (!event.data.select) {
             for (let i = 0; i < this.voffauthvisData.length; i++) {
                   // if (this.voffauthvisData[i].select) {
                    if (this.voffauthvisData[i]['select']) {
                         this.enableUpdate = false;
                         this.checkFlag = true;
                         rowdata.validated = true;
                         return rowdata;
                   } else {
                         this.enableUpdate = false;
                         this.checkFlag = false;
                   }
             }
       }
       return rowdata;
 }
    /*
    * This method is used to show popup messages.
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
}
