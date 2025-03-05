import {
	Component, OnInit, 
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OiuschovService } from '../service/oiuschov.service';
import { VOffSchOverview } from '../beans/VOffSchOverview';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { Router } from "@angular/router";
@Component({
	selector: 'app-oiuschov',
	templateUrl: './oiuschov.component.html',
	
})
export class OiuschovComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    msgs: any[] = [];
    vOffSchdoverw: any[];
    vOffSchdoverwrowData: VOffSchOverview[] = [];
    validateRowData:any;
    vOffSchdoverwData: any;
    msglist: any[];
	message: any;
	type: any;
    dialogData: any;
    vOffSchOvervTemp:VOffSchOverview=new VOffSchOverview();
    vOffSchOvervData: VOffSchOverview[] = [];
    vOffSchOvervModel:VOffSchOverview=new VOffSchOverview();

    constructor(private oiuschovFactory: OiuschovService,public dialogService: DialogService,
        private router: Router, public translateService: TranslateService, public sessionManager: UserSessionManager) {
        this.vOffSchdoverw = [];
    }
    ngOnInit(): void {  
        this.dialogData = this.dialog.data;
        this.vOffSchdoverw = [
		
            { fieldName: this.translateService.translate('oiuschov.schprop'), field: 'tstatus', editable: true, width: 150,  },
            { fieldName: this.translateService.translate('oiuschov.intext'), field: 'intExt', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuschov.eventDate'), field:'eventDate', editable: false, width: 150 , datatype: 'date'},
            { fieldName: this.translateService.translate('oiuschov.eventTime'), field:'eventTime', editable: false, width: 150 , datatype: 'time'},
            { fieldName: this.translateService.translate('oiuschov.type'), field: 'typeDescp', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuschov.reason'), field: 'rsnDescp', editable: false, width: 150 },
          
    
        ];
       this.vOffSchOverviewExecQuery();
    }

    show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
    onButExitclick() {
        this.dialog.close(null);
    }

    vOffSchOverviewExecQuery() {
        this.vOffSchOvervModel.offenderBookId=this.dialog.data.offenderBookId;
        if (this.dialog.data['potSchFlag']) {
		const serviceObj = this.oiuschovFactory.
        vOffSchOverviewExecuteQuery(this.vOffSchOvervModel);
		serviceObj.subscribe(data => {
			if (data.length > 0) {
				this.vOffSchdoverwrowData =data;
                this.vOffSchOvervModel =this.vOffSchdoverwrowData[0]
			} else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
			}
		});
    }
	}
}

