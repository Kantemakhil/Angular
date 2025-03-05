import {
    Component,
    OnInit,
    Input,Output,EventEmitter
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { HousingService } from '@inst/movements/housingchanges/service/housing.service';
import { Housing } from "../beans/Housing";

@Component( {
    templateUrl: './housing_conflicts.component.html',
    providers: [],
    styleUrls: ['./housing_conflicts.component.scss'],
    selector: 'housing-conflicts'
})

export class HousingConflictsViewComponent implements OnInit {
    conflictsViewColumndef:any[];
    bedInfo: Housing[]=[];
    disabled: boolean;
    @Output() backToUnit: EventEmitter<any> = new EventEmitter<any>();

get housingBedInfo(): any {
    return this.bedInfo;
}

@Input()
set housingBedInfo(v: any) {
    if(v!= null){
    this.bedInfo=v;
    }
}
    constructor( public translateService: TranslateService, public housingService:HousingService)
        { }   

    ngOnInit() {
        this.disabled=false;
        this.bedInfo = [];
        this.conflictsViewColumndef = [
                                         {
                                          fieldName: this.translateService.translate('housingview.image'),
                                            field: 'image',datatype: 'hyperlink', displayas: 'image', link: '/intakeDialog', data: 'row', 
                                          modal: true, editable: false,width: 100, styleClass:'thumbImg'
                                          }, 
                                        
                                        {
                                            fieldName: this.translateService.translate( 'housingview.offenderid' ),
                                            field: 'offenderId', editable: false, width: 300, 
                                        },
                                        {
                                            fieldName: this.translateService.translate( 'housingview.firstName' ),
                                            field: 'firstName', editable: false, width: 500 
                                        },
                                        
                                        {
                                            fieldName: this.translateService.translate( 'housingview.lastName' ),
                                            field: 'lastName', editable: false, width: 500

                                        },
                                        {
                                            fieldName: this.translateService.translate( 'housingview.cell' ),
                                            field: 'cellCode', editable: false, width: 500 
                                        },
                                        {
                                            fieldName: this.translateService.translate( 'housingview.bed' ),
                                            field: 'bed', editable: false, width: 500 
                                        }
                                    ];
       
    }
    
    backToPrevious(v){
        this.backToUnit.emit(v);
    }
}