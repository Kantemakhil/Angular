import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PortalAppService} from './service/portalapp.service';
import { Offenders } from '@commonbeans/Offenders';
import { TranslateService } from '@common/translate/translate.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OcucoffeService } from '@common/offender-records/service/ocucoffe.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock2 } from '@commonbeans/VHeaderBlock2';


@Component({
  selector: 'portalapp',
  templateUrl: './portalapp.component.html',
  styleUrls: []
})
export class PortalAppComponent implements OnInit {

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
        this.matchedOffendersColumnDefs = [
                                           
                                    {
                                        fieldName: this.translateService.translate( 'Image' ),
                                        field: 'image', datatype: 'hyperlink', displayas: 'image', link: '/intakeDialog', data: 'row', 
                                        modal: true, editable: false,width: 100, styleClass:'image-grid-component'
                                    },
                                    {
                                        fieldName: this.translateService.translate( 'name' ),
                                        field: 'name', datatype: 'hyperlink', displayas: 'href', link: '/intakeDialog', data: 'row', modal: true, editable: false,width: 296
                                    },
                                    {
                                        fieldName: this.translateService.translate( 'Offender Display Id' ),
                                        field: 'offenderIdDisplay', datatype: 'text', width: 150
                                    },
                                    {
                                        fieldName: this.translateService.translate( 'Gender' ),
                                        field: 'gender', datatype: 'text', width: 100
                                    },
                                    {
                                        fieldName: this.translateService.translate( 'Booking No' ),
                                        field: 'bookingNo', datatype: 'text', width: 150
                                    },
                                    {
                                        fieldName: this.translateService.translate( 'DOB' ),
                                        field: 'birthDate', datatype: 'date', width: 150
                                    },
                                    {
                                        fieldName: this.translateService.translate( 'Status' ),
                                        field: 'statusDisplay', datatype: 'text', width: 150
                                    },
                                    {
                                        fieldName: this.translateService.translate('Match'),
                                        field: 'matchOffender', datatype: 'launchbutton', queryparam: 'documentIdQuery',
                                        editable: false, width: 100, dialogWidth:120,height:240,
                                        data: 'row',updateField: 'row',imageTitleField:'checkoutBtnTitle', onLaunchClick: this.matchOffender
                                    }
                                
                                
                                ];
        this.resultColumnDefs = [
                                 {
                                    fieldName: this.translateService.translate( 'Last Name' ),
                                    field: 'lastName', datatype: 'text', width: 296
                                 },
                                 {
                                     fieldName: this.translateService.translate( 'First Name' ),
                                     field: 'firstName', datatype: 'text', width: 296
                                 },
                                 {
                                     fieldName: this.translateService.translate( 'Middle Name' ),
                                     field: 'middleName', datatype: 'text', width: 296
                                 },
                                 {
                                     fieldName: this.translateService.translate( 'Person Id' ),
                                     field: 'personId', datatype: 'text', width: 150
                                 },
                                 {
                                     fieldName: this.translateService.translate( 'Race' ),
                                     field: 'raceCode', datatype: 'text', width: 150
                                 },
                                 {
                                     fieldName: this.translateService.translate( 'Gender' ),
                                     field: 'sexCode', datatype: 'text', width: 100
                                 },
                                 {
                                     fieldName: this.translateService.translate( 'DOB' ),
                                     field: 'dateOfBirth', datatype: 'date', width: 150
                                 },
                                 {
                                     fieldName: this.translateService.translate('Search'),
                                     field: 'checkoutButton', datatype: 'hyperlink',displayas: 'image', queryparam: 'documentIdQuery',
                                     editable: false, width: 100, dialogWidth:120,height:240,
                                     data: 'row',updateField: 'row',imageTitleField:'checkoutBtnTitle', onLaunchClick: this.searchMatchingOffender
                                 },
                                 {
                                     fieldName: this.translateService.translate( 'Reject' ),
                                     field: 'reject', datatype: 'launchbutton', link: '/rejectDialog',
                                     data: 'row', updateField: 'row', modal: true, width: 150, typeValue :'medicalScreeningPresent', dialogWidth:50

                                 }
                             ];
        
                    this.portalAppService.getAllNewBookings().subscribe( list => {
                        if ( list.length > 0 ) {
                            for ( let i = 0; i < list.length; i++ ) {
                                list[i].checkoutButton = 'assets/images/person_search_2.png';
                                list[i].reject = 'Reject'
                            }
                        }
                        this.searchresultsData = list; 
                    });
                    
                    
                    this.portalAppService.messageObservable.subscribe (message => {
                        this.type  =  'warn';
                        this.message  =  message;
                        this.show();
                    });
                    
                    /* Refreshing the grid data  after action performed by  action buttons */
                    this.portalAppService.rowUpdateObservable.subscribe (gridUpdate => {
                       // this.eOffenderDocsList = [];
                        this.populateBookingOffender();
                    });
                    
                    
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
    populateBookingOffender() {
        this.isbookingEnabled = false;
        this.selectedPerson = {};
        this.searchresultsData = [];
        this.exactMatchedOffender = [];
        this.portalAppService.getAllNewBookings().subscribe( list => {
            if ( list.length > 0 ) {
                for ( let i = 0; i < list.length; i++ ) {
                    list[i].checkoutButton = 'assets/images/person_search_2.png';
                    list[i].reject = 'Reject'
                    if (list[i].birthDate && list[i].birthDate instanceof  Date) {
                        let offModel = {'birthDate':list[i].birthDate}
                        const ageData =  this.ocucoffeFactory.agevalidationvsagecur(offModel);
                        ageData.subscribe(age => {
                            list[i].age = age;
                        });
                      }
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
        this.populateBookingOffender();
    }
    
    matchOffender = (data) => {
        this.matchedOffender = data;
    }
    
    
    searchMatchingOffender = (data) => {
        if(data.personId && data.personId!=null) {
            this.isbookingEnabled = true;
        } else {
            this.isbookingEnabled = false;
        }
        
        this.exactMatchedOffender = [];
        let numerOfMatches = data.numberOfExactMatcheOffenders;
        this.portalAppService.searchMatchedPerson(data).subscribe(list=> {
            if ( list.length > 0 ) {
                for ( let i = 0; i < list.length; i++ ) {
                    list[i].name = list[i].lastName+", "+list[i].firstName;
                    if(list[i].statusDisplay !== 'Active') {
                        list[i].matchOffender = 'Match';
                    }
                    list[i].isIntakeQueue = 'true';
                    if ( list[i].imageId != null ) {
                        let imageModel ={'imageId':list[i].imageId};
                        this.osiosearservice.imageExecuteQuery( imageModel ).subscribe( imageData => {
                            list[i]['image'] = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                            this.exactMatchedOffender = list;
                        });     
                    } else {
                        this.exactMatchedOffender = list;
                    }
                }
                //this.exactMatchedOffender = list;
            }
            
        });
        return false;
    }
    
    admit() {
        /*this.portalAppService.bookPerson(this.selectedPerson).subscribe(result=>{
            if(result==1) {
                
            } else {
                this.message = "Person admission failed."
                this.show();
            }
        });*/
        this.offenderSearchService.selectedOffender = null;
        this.offAliasCommit();
        
    }
    
    
    offAliasCommit() {
        let offInsertList = [];
        let offInsert = {};
        let offCommitModel = {};
        {
          offInsert = this.selectedPerson;
          offInsert['lastNameKey'] = this.selectedPerson.lastName;
          offInsert['offenderIdDisplay'] = this.selectedPerson.personId;
          offInsert['rootOffenderId'] = this.matchedOffender?this.matchedOffender.rootOffenderId:null;
          offInsert['idSourceCode'] = 'USER';
          offInsert['aliasNameType'] =  'WORKING'; // TODO A can be passed when offender selected.
          offInsert['aliasOffenderId'] =  null; //(this.aliasData.length > 0) ? this.offModel.offenderId :
          offInsert['offenderNameSeq'] = 1; //(this.aliasData.length > 0) ? null : 1;
          offInsert['birthDate'] = this.selectedPerson.dateOfBirth;
        }
        offInsertList.push(offInsert);
        
        offCommitModel['insertList'] = offInsertList;
        const offSaveData = this.ocucoffeFactory.offCommit(offCommitModel);
        offSaveData.subscribe(offSaveResult => {
          if (offSaveResult) {
            this.showMsg(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.selectedPerson.offenderId = offSaveResult;
            this.portalAppService.updatePersonStatus(this.selectedPerson).subscribe(result=>{
                
                if(result==1) {
                } else {
                    //this.message = "Person admission failed."
                    //this.show();
                }
            });
            this.ocucoffePopulateDetails(offSaveResult);
          } else {
            this.showMsg(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            this.ocucoffePopulateDetails(offSaveResult);
          }
        });
      }
    ocucoffePopulateDetails(rootOffenderId) {
        if (rootOffenderId) {
          let offenModel = new Offenders();
          offenModel.rootOffenderId = rootOffenderId;
          const serviceObj = this.ocucoffeFactory.aliasExecuteQuery(offenModel);
          serviceObj.subscribe(data => {
            if (data) {
              let aliasData = data;
              //this.selectedAlias = 0;
              //if (!this.offModel.offenderId) {
                  let offModel = aliasData[0];
                  // this.offenderSearchService.selectedOffender = this.offModel;
                  this.osiosearservice.selectOffender = new VHeaderBlock2();
                  this.osiosearservice.selectOffender.offenderId = offModel.offenderId;
                  this.osiosearservice.selectOffender.offenderIdDisplay = offModel.offenderIdDisplay;
                  this.osiosearservice.selectOffender.rootOffenderId = offModel.rootOffenderId;
                  this.osiosearservice.selectOffender.lastName = offModel.lastName;
                  this.osiosearservice.selectOffender.firstName = offModel.firstName;
                  this.osiosearservice.selectOffender.middleName = offModel.middleName;
                  this.osiosearservice.selectOffender.suffix = offModel.suffix;
                  this.osiosearservice.selectOffender.birthDate = offModel.birthDate;
                  this.osiosearservice.externalsystemId=this.selectedPerson.requestId;
                  //this.offenderSearchService.selectedOffender['gender'] = this.offModel.sexCode;
                  // this.osiosearservice.selectOffender.offenderIdDisplay = this.offModel.offenderIdDisplay;
                  this.router.navigate( ['/OIDADMIS'] );
            //}
              //offModel.birthDate = DateFormat.getDate(offModel.birthDate);
           /* } else {
             this.aliasData = [];
            }*/
            }
          });
        }
      }
    
}
