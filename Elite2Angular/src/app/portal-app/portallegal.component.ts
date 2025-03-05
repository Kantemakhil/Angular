import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PortalAppService} from './service/portalapp.service';
import { TranslateService } from '@common/translate/translate.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OcucoffeService } from '@common/offender-records/service/ocucoffe.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

@Component({
  selector: 'portallegal',
  templateUrl: './portallegal.component.html',
  styleUrls: []
})
export class PortalLegalComponent implements OnInit {
    resultColumnDefs: any[];
    legalsData: any[];

    constructor(private router: Router, private portalAppService: PortalAppService, public translateService: TranslateService, 
        private ocucoffeFactory: OcucoffeService, private osiosearservice: OsiosearService, private offenderSearchService: OffenderSearchService) { }
    
    ngOnInit() {
        
        this.resultColumnDefs = [
                                  {
                                      fieldName: this.translateService.translate( 'Person Id' ),
                                      field: 'personId', datatype: 'text', width: 150
                                  },
                                  {
                                      fieldName: this.translateService.translate( 'Reason' ),
                                      field: 'movementReason', datatype: 'text', width: 150
                                  },
                                  {
                                      fieldName: this.translateService.translate( 'Court' ),
                                      field: 'toCourt', datatype: 'text', width: 100
                                  },
                                  {
                                      fieldName: this.translateService.translate( 'Judge' ),
                                      field: 'judgeName', datatype: 'text', width: 150
                                  },
                                  {
                                      fieldName: this.translateService.translate( 'Date' ),
                                      field: 'movementDate', datatype: 'date', width: 150
                                  },
                                  {
                                      fieldName: this.translateService.translate( 'Time' ),
                                      field: 'movementStartTime', datatype: 'time', width: 150
                                  }
                              ];
         
                     this.portalAppService.getAllNonPendingLegals().subscribe( list => {
                         if ( list.length > 0 ) {
                             for ( let i = 0; i < list.length; i++ ) {
                                 //list[i].checkoutButton = 'assets/images/person_search_2.png';
                                 //list[i].reject = 'Reject'
                                // list[i].selectForProcess = false;
                             }
                         }
                         this.legalsData = list; 
                     });
                     

        
    }

}