import { OdynfrmService } from './../service/odynfrm.service';
import { TranslateService } from '@common/translate/translate.service';
import { Component, OnInit } from '@angular/core';
import { FormsBuilderBean } from '@core/ui-components/dynamic-forms/forms-builder-bean';
@Component({
    selector: 'app-odynfrmbldr',
    templateUrl: './odynfrmbldr.component.html',
    styleUrls: ['./odynfrmbldr.component.scss']
})

export class OdynFrmBldrComponent implements OnInit {
    formData: FormsBuilderBean;
    isPreview = false;
    constructor(public translateService: TranslateService, private odynfrmService: OdynfrmService) {

    }
    ngOnInit() {
        this.formData = this.odynfrmService.formData;

    }
    preview() {
        this.isPreview = true;
    }

}