import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { CaseLoads } from '@commonbeans/CaseLoads';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TranslateService } from '@common/translate/translate.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-homedialog',
    templateUrl: './app-homedialog.html'
})

export class AppHomeDialogComponent implements OnInit {
    @ViewChild('dialog', {static: false}) dialog: DialogComponent;
    dlgColumnDefs: any[] = [];
    caseloads: CaseLoads[] = [];
    caseLoadsModel: CaseLoads = new CaseLoads();
    caseLoadId: string;
    constructor(private loginService: LoginService, private sessionManager: UserSessionManager,
        public translate: TranslateService,
        private router: Router) { }
    ngOnInit() {
        this.caseloads = this.sessionManager.caseLoads;
        this.dlgColumnDefs = [
            { fieldName: this.translate.loginTranslate('home.caseloadid'), field: 'caseloadId', editable: false, width: 150 },
            { fieldName: this.translate.loginTranslate('home.cldescription'), field: 'description', editable: false, width: 400 },
            { fieldName: this.translate.loginTranslate('home.cltype'), field: 'caseloadType', editable: false, width: 150 }];
    }
    cancel(): void {
        this.dialog.close(null);
    }
    onRowSelect(data) {
        this.caseLoadsModel = data;
    }
    okBtnClickEvent() {
        const dialogData = { caseloadId: this.caseLoadsModel.caseloadId, description: this.caseLoadsModel.description ,
                             caseloadType: this.caseLoadsModel.caseloadType};
            if(dialogData.caseloadId === null || dialogData.caseloadId === undefined) {
                this.dialog.close(null);
            } else {
                this.dialog.close(dialogData);
            }
        // wait for the case load to change BEFORE navigating away from the current screen
        // this.router.navigate(['/home']); 
    }
}
