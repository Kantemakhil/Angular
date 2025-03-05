import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PortalAppService} from './service/portalapp.service';
import { TranslateService } from '@common/translate/translate.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OcucoffeService } from '@common/offender-records/service/ocucoffe.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock2 } from '@commonbeans/VHeaderBlock2';

@Component({
  selector: 'portalschedule',
  templateUrl: './portalschedule.component.html',
  styleUrls: []
})
export class PortalScheduleComponent implements OnInit {

    resultColumnDefs: any[];
    matchedOffendersColumnDefs: any[];
    searchresultsData: any[];
    exactMatchedOffender: any[];
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    selectedPerson:any;
    isbookingEnabled:boolean;
    matchedOffender : VHeaderBlock2;
    
    
    constructor(private router: Router, private portalAppService: PortalAppService, public translateService: TranslateService, 
            private ocucoffeFactory: OcucoffeService, private osiosearservice: OsiosearService, private offenderSearchService: OffenderSearchService) { }

    ngOnInit() {
        //Load All New Booking
        this.selectedPerson = {};
        this.isbookingEnabled = false;
        this.matchedOffender = null;
        this.exactMatchedOffender = [];
               this.resultColumnDefs = [
                                {
                                    fieldName: this.translateService.translate('Select'), field: 'selectForProcess',
                                    datatype: 'checkbox', width: 150, editable: true
                                 },

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
        
                    this.portalAppService.getAllScheduleNewBookings().subscribe( list => {
                        if ( list.length > 0 ) {
                            for ( let i = 0; i < list.length; i++ ) {
                                //list[i].checkoutButton = 'assets/images/person_search_2.png';
                                //list[i].reject = 'Reject'
                                list[i].selectForProcess = false;
                            }
                        }
                        this.searchresultsData = list; 
                    });
                    
                    
                  /*  this.portalAppService.messageObservable.subscribe (message => {
                        this.type  =  'warn';
                        this.message  =  message;
                        this.show();
                    });
                    
                    this.portalAppService.rowUpdateObservable.subscribe (gridUpdate => {
                       // this.eOffenderDocsList = [];
                        this.populateCourtSchedule();
                    });*/
                    
                    
    }
    showMsg(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
      }
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }
    populateCourtSchedule() {
        this.isbookingEnabled = false;
        this.selectedPerson = {};
        this.searchresultsData = [];
        this.exactMatchedOffender = [];
        this.portalAppService.getAllScheduleNewBookings().subscribe( list => {
            if ( list.length > 0 ) {
                for ( let i = 0; i < list.length; i++ ) {
                    list[i].selectForProcess = false;
                }
            }
            this.searchresultsData = list; 
        });
    }
    
    selectePersonClick(event) {
        this.selectedPerson = event;
        
        
    }
    refreshPortal() {
        this.matchedOffender = null;
        this.populateCourtSchedule();
    }
    
    matchOffender = (data) => {
        this.matchedOffender = data;
    }
    
    schedule() {
        let schdules = [];
        for ( var index = 0; index < this.searchresultsData.length; index++ ) {  
            let schedule = this.searchresultsData[index];
            if(schedule.selectForProcess && !schedule.personId) {
                this.type  =  'error';
                this.message  =  "Person ID required to save schedule." 
                this.show();
                return;
            }
            if(schedule.selectForProcess && !schedule.movementDate) {
                this.type  =  'error';
                this.message  =  "Movement date required to save schedule." 
                this.show();
                return;
            }
            if(schedule.selectForProcess && !schedule.movementStartTime) {
                this.type  =  'error';
                this.message  =  "Movement Time required to save schedule." 
                this.show();
                return;
            }
            if(schedule.selectForProcess && !schedule.toCourt) {
                this.type  =  'error';
                this.message  =  "Court required to save schedule." 
                this.show();
                return;
            }
            if(schedule.selectForProcess && !schedule.movementReason) {
                this.type  =  'error';
                this.message  =  "Movement reason required to save schedule."
                this.show();
                return;
            }
            
            if(schedule.selectForProcess) {
                schdules.push(schedule);
            }
        }
        this.portalAppService.updateScheduleStatus(schdules).subscribe(results=>{
            
            if(results && results.length>0) {
                let success = " Court Schedule created for Person ID ";
                let spersonId  = "";
                let personIdDoesNotExist = " Person ID does not exist ";
                let idDoesNotExistPErsonId = "";
                let scheduleCreated = "Schedule conflict for Person Id - ";
                let scheduleCreatedId = "";
                let updateFailed = "Schedule not processed due to server error For Person ID ";
                let updateFailedId = "";
                results.forEach(result => {
                    if(result.notProcessingReasonCode === 'SUCCESS') {
                        spersonId = spersonId===""?result.personId:spersonId + ", " + result.personId;
                    } else if(result.notProcessingReasonCode === 'PERSON_SCHEDULE_CONFLICT') {
                        scheduleCreatedId = scheduleCreatedId===""?result.personId:scheduleCreatedId + ", " + result.personId;
                    } else if (result.notProcessingReasonCode === 'PERSON_NOT_ADMITED') {
                        idDoesNotExistPErsonId = idDoesNotExistPErsonId===""?result.personId:idDoesNotExistPErsonId + ", " + result.personId;
                    } else {
                        updateFailedId = updateFailedId===""?result.personId:updateFailedId + ", " + result.personId;
                    }
                });
                
                this.message = "";
                if(spersonId.length>0) {
                    this.type  =  'success';
                    this.message  =  success + spersonId ;
                } 
                if(scheduleCreatedId.length>0) {
                    this.type  =  'warn';
                    this.message  =  "\n" + scheduleCreated + scheduleCreatedId ;
                }
                if(idDoesNotExistPErsonId.length>0) {
                    this.type  =  'warn';
                    this.message  =  "\n" +personIdDoesNotExist + idDoesNotExistPErsonId ;
                }
               this.populateCourtSchedule();
            } else {
                this.type  =  'error';
                this.message  =  "Schedule not processed due to server error." 
            }
            this.show();
            
        });
        
    }
    
}
