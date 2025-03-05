import {
    Component,
    OnInit,ViewChild
} from '@angular/core';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcdccaseService } from "../service/ocdccase.service";
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { Offenses } from "../beans/offenses";

@Component({
    selector: 'app-ocuoffen',
    templateUrl: './ocuoffen.component.html',
  })
  
  export class OcuoffenComponent implements OnInit {
    msglist=[];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    offensesData : Offenses[] =[];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offencesColumndef:any[];
    remandsColumndefList:boolean=false;
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    
constructor(private sessionManager: UserSessionManager,
        private OcdccaseFactory : OcdccaseService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService){
        this.offencesColumndef =[];
    
}

ngOnInit() {
    this.offensesGridData();
    //this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    if ( this.dialog.data ) {}
    this.offencesColumndef = [
                              {
                                  fieldName: this.translateService.translate('ocuoffen.offensedescription'),
                                  field: 'offenseDescription', editable:true, width: 200
                                      },
                              {
                                 fieldName: this.translateService.translate('ocuoffen.category'),
                                 field: 'category',editable:false, width: 180
                              },
                              {
                                 fieldName: this.translateService.translate('ocuoffen.offensecode'),
                                 field: "offenseCode", editable:true, width: 150
                                  
                             }
                                                    
                         ];

                    }

    offensesGridData(){
        const offensesData = this.OcdccaseFactory.offencesAgainstOrdersData();
        offensesData.subscribe(list=> {
            
            this.offensesData = list;
        });
    }
    
    exit(): void {
        this.dialog.close(null);
      }
    }