import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import {TranslateService} from '@common/translate/translate.service';
import { OffenderSentences } from '@inst/legal/beans/OffenderSentences';
import { OcdprogrService } from '@cm/programsservices/service/ocdprogr.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OidshlogService } from '../service/oidshlog.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
@Component({
    selector: 'app-addoffender',
    templateUrl: './addoffender.component.html'
    
})

export class AddOffenderComponent implements OnInit {
    selectDisBtn = true;
    lovModel: any[];
    msgs: any[] = [];
    minDate: any;
    display: boolean;

    addDisable : boolean;
    
    relatedoffColumnDef: any[];
    relatedoffData: VHeaderBlock[] = [];
    tableIndex = 0;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    offenderSentData: OffenderSentences[] = [];
    offSentmodel: VHeaderBlock = new VHeaderBlock();
    constructor(private ocdprogrFactory: OcdprogrService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private oidshlogFactory: OidshlogService) {
        // TODO initilize data members here..!
        this.relatedoffColumnDef = [];
    }
    ngOnInit() {
        this.addDisable = true;
        this.ocdprogrPopulateDetails();

        
        this.relatedoffColumnDef = [
           
            {
                fieldName: 'Select  ', field: 'selectFlag', editable: true, width: 150,datatype: 'checkbox'
            },
            { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150, },

            { fieldName: 'Name', field: 'offenderFullName', editable: true, width: 150 },
            { fieldName: 'Living Unit Description', field: 'livingUnitDescription', editable: false, width: 150,  },
            { fieldName: '', field: 'offenderBookId', hide : true },

           
        ];
    }
    onRowClick(event) {
        if (event) {
            this.offSentmodel = event;
        }
    }
    /**
* This function displays the messages
*/
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    
    
    onButAddQueryclick() {
        let selectedData = [];
        if(this.relatedoffData && this.relatedoffData.length > 0){
            selectedData = this.relatedoffData.filter(e => e['selectFlag']);
        }
        if(selectedData && selectedData.length > 0){
            this.dialog.close(selectedData);
        }else{
            this.dialog.close(null);
        }
    }

    
   
    cancel() {
        this.dialog.close(null);
    }

    ocdprogrPopulateDetails() {
        const serviceObj = this.oidshlogFactory.offShiftLogExcuteQuery(this.dialog.data.internalLocationId);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.show(this.translateService.translate('common.querycaused'));
                this.relatedoffData = [];
                this.tableIndex = -1;
                this.addDisable = true;
            } else {
                this.relatedoffData = data;
                this.tableIndex = 0;
                this.addDisable = false;
            }
        });
    }
}
   