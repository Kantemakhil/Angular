import { OdynfrmService } from './../service/odynfrm.service';
import { TranslateService } from '@common/translate/translate.service';
import { Component, OnInit } from '@angular/core';
import { FormsBuilderBean } from '@core/ui-components/dynamic-forms/forms-builder-bean';
@Component({
    selector: 'app-odynfrmrender',
    templateUrl: './odynfrmrender.component.html',
    styleUrls: ['./odynfrmbldr.component.scss']
})

export class OdynFrmRenderComponent implements OnInit {
    formData: FormsBuilderBean;
    constructor(public translateService: TranslateService, private odynfrmService: OdynfrmService) {

    }
    ngOnInit() {
        this.formData = this.odynfrmService.formData;
    }

}