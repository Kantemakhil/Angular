import {
    Component,
    OnInit, ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OculcaseService } from "../service/oculcaseService";
import { CourtEvents } from "../beans/CourtEvents";
import { CourtCase } from "../beans/CourtCase";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

@Component( {
    selector: 'app-oculcase',
    templateUrl: './oculcase.component.html',
    styleUrls: ['./oculcase.component.scss']
} )

export class OculcaseComponent implements OnInit {
    selectHearing:  CourtEvents[] = [];
    linkCase: CourtCase[] = [];
    linkCaseColumndef: any[];
    toThisCaseColumndef:any[];
    selHearColumndef:any[];
    courtCasesData :any[];
    selectedCourtCase:CourtCase[]=[];
    lovLinkCase :  CourtCase[] = [];
    offenderBookId: number;
    caseId:number;
    case_Seq: number;
    msglist=[];
    disabled:boolean;
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    selectedLinkCase: CourtCase[] = [];
    public selected = -1;
    public selectedhearing = -1;
    caseIdl:number;
    eventId:number;
    disbaleLinkbtn:boolean;
    disbaleUnlinkbtn:boolean;
    updatedDialog : any[]=[];
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    constructor(private OculcaseFactory:OculcaseService,
                public translateService: TranslateService,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer){
        
        this.matIconRegistry.addSvgIcon("Link",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/images/link.svg" ));
        
        this.matIconRegistry.addSvgIcon("Unlink",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/images/unlink.svg" ));
        
        this.courtCasesData=[];
    }
    
    ngOnInit() {
        this.disabled = false;
        this.OculcaseFactory.selectFlag = false;
        if ( this.dialog.data ) {}
        this.linkCaseColumndef = [
                              {
                                  fieldName:this.translateService.translate('oculcase.line'),
                                  field: 'case_Seq', editable:false, width: 120, datatype:'text', 
                              },
                              
                              {
                                  fieldName:this.translateService.translate('oculcase.startDate'),
                                  field: "beginDate", editable: false, width: 150, datatype: 'date'
                              },
                             
                              {
                                  fieldName:this.translateService.translate('oculcase.court'), 
                                  field:'agy_loc_id',editable: false, width: 150,datatype:'lov', link:'ocdccase/populateCourtData'
                              },
                                                            
                              {
                                  fieldName:this.translateService.translate('oculcase.type'),
                                  field: 'caseType', editable: false, width: 120, datatype: 'lov', domain: 'LEG_CASE_TYP'
                              },
                              
                              {
                                  fieldName:this.translateService.translate('oculcase.prefix'),
                                  field: 'caseInfoPrefix', editable: false,  width: 150,datatype:'text'
                              },
                              {
                                  fieldName: "",
                                  field: 'caseInfoNumber', editable:false, width: 150 , datatype: 'text',
                              },

        ];
        
       this.toThisCaseColumndef = [
                                  {
                                      fieldName:this.translateService.translate('oculcase.line'),
                                      field: 'case_Seq', editable:false, width: 120, datatype:'text', 
                                      
                                  },
                                  
                                  {
                                      fieldName:this.translateService.translate('oculcase.startDate'),
                                      field: "beginDate", editable: false, width: 150, datatype: 'date'
                                  },
                                 
                                  {
                                      fieldName:this.translateService.translate('oculcase.court'),datatype: 'text', 
                                      field: 'agy_loc_id',editable: false, width: 150
                                  },
                                 
                                                                
                                  {
                                      fieldName:this.translateService.translate('oculcase.type'),
                                      field: 'caseType', editable: false, width: 120,  datatype: 'text'
                                  },
                                  
                                  {
                                      fieldName:this.translateService.translate('oculcase.prefix'),
                                      field: 'caseInfoPrefix', editable: false,  width: 150,datatype:'text'
                                  },
                                  {
                                      fieldName: "",
                                      field: 'caseInfoNumber', editable:false, width: 150 , datatype: 'text',
                                  },

            ];
        
        this.selHearColumndef = [
                                    {
                                        fieldName:this.translateService.translate('oculcase.selectFlag'),
                                        field: 'selectFlag', editable:true, width: 120, datatype:'checkbox', 

                                    },
                                    
                                    {
                                        fieldName:this.translateService.translate('oculcase.eventDate'),
                                        field: "eventDate", editable: false, width: 150, datatype: 'date'
                                         
                                    },
                                   
                                    {
                                        fieldName:this.translateService.translate('oculcase.time'),datatype:'time',
                                        field: 'startTime',editable: false, width: 150, 
                                    },
                                   
                                    {
                                        fieldName:this.translateService.translate('oculcase.court'),
                                        field: 'agyLocId', editable: false, width: 120,  datatype: 'text'
                                    },
                                    
                                    {
                                        fieldName:this.translateService.translate('oculcase.hearingType'),
                                        field: 'hearingType', editable: false,  width: 150,datatype:'text'
                                    },
                                    {
                                        fieldName:this.translateService.translate('oculcase.comment'),
                                        field: 'commentText', editable:false, width: 150 , datatype: 'text',
                                    },

              ];
        this.populateLinkCurrentcase();
       
    }
    
    populateLinkCurrentcase() {
        if ( this.dialog.data ) {
            this.courtCasesData.push( this.dialog.data );
            this.OculcaseFactory.caseId = this.dialog.data.caseId;
            this.OculcaseFactory.offenderBookId = this.dialog.data.offenderBookId;
        }
        if ( this.dialog.data.combinedCaseId > 0 ) {
            this.disbaleLinkbtn = false;
            this.disbaleUnlinkbtn = true;
            this.populateLinkCase();
        } else {
            this.disbaleUnlinkbtn = false;
            this.disbaleLinkbtn = true;
            this.populateLinkLovType();
        }
    }
    
 /* method for fetch data likned cases if linked(procedure call) */ 
    
    populateLinkCase() {
        const linkCase = this.OculcaseFactory.populateLinkCase( this.dialog.data );
        linkCase.subscribe( list => {
            this.lovLinkCase = list;
            for ( let i = 0; i < list.length; i++ ) {
                this.selected = 0;
            }
        } );
    }
    
 /* method for fetch data select hearing */ 
    populateSelectHearing( event ) {
        const selectHearing = this.OculcaseFactory.populateSelectHearing( event );
        selectHearing.subscribe( list => {
            for ( let i = 0; i < list.length; i++ ) {
                this.OculcaseFactory.eventId = list[i].eventId;
            }
            this.selectHearing = list;
            this.selectedhearing = 0;
        } );
    }
    
/* method for fetch data lov_link_case */  
    
    populateLinkLovType() {
        const lovLinkCase = this.OculcaseFactory.populateLinkLovType( this.dialog.data );
        lovLinkCase.subscribe( list => {
            for ( let i = 0; i < list.length; i++ ) {
                this.OculcaseFactory.caseIdl = list[i].caseId;
            }
            this.lovLinkCase = list;
            this.selected = 0;
        } );
    }
    
    
 /* When button press Link Case*/ 
    executeLinkCase() {
        if ( this.selectedLinkCase == null ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'oculcase.pleaseselectthecasetolink' );
            this.show();
            return;
        }
        if ( this.OculcaseFactory.selectFlag === false ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'oculcase.pleaseselecthearing' );
            this.show();
            return;
        }
        const chkSentence = this.OculcaseFactory.chkSentences( this.dialog.data.caseId, this.dialog.data.offenderBookId );
        chkSentence.subscribe( result => {
            if ( result == true ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'oculcase.linkisnotpermitted' );
                this.show();
                return;
            } else {
                let queryParam = {
                    offenderBookId: this.OculcaseFactory.offenderBookId,
                    caseId: this.dialog.data.caseId,
                    caseIdl: this.caseIdl,
                    eventId: this.eventId,
                }
                const linkCases = this.OculcaseFactory.linkCase( queryParam );
                linkCases.subscribe( result => {
                    if ( result ) {
                        this.disbaleUnlinkbtn = true;
                        this.disbaleLinkbtn = false;
                        this.type = 'success';
                        this.message = this.translateService.translate( 'oculcase.linkissuccessful' );
                        this.show();
                        return;
                    }

                } );
            }
        } );
    }
 
 /* When button Press Unlink Case*/   
    executeUnLinkCase() {
        if ( this.selectedLinkCase == null ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'oculcase.Pleaseselectcasetounlink' );
            this.show();
            return;
        }
        let queryParam = {
            offenderBookId: this.OculcaseFactory.offenderBookId,
            caseId: this.OculcaseFactory.caseId,
            caseIdl: this.caseIdl,
            eventId: this.eventId,
        }
        const unLinkCase = this.OculcaseFactory.unLinkCase( queryParam );
        unLinkCase.subscribe( unlinkResult => {
            if ( unlinkResult ) {
                this.disbaleUnlinkbtn = false;
                this.disbaleLinkbtn = true;
                this.type = 'success';
                this.message = this.translateService.translate( 'oculcase.unlinkissueccessfull' );
                this.show();
                return;
            }

        } );
  }
  
    onRowClicktothisCase( event ) {
        if ( event ) {
            this.caseIdl = event.caseId;
            this.selectedLinkCase = event.case_Seq;
            this.populateSelectHearing( event );
        }
  }
  
  onRowClickHearing(event){
     this.OculcaseFactory.selectFlag = true;
     this.eventId = event.eventId;
  }
  
  show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
      }
  
   onGridInsert = () =>  {
        return {   
        }
    }
    
    cancel(): void {
        this.dialog.close(true);
       }
 
    
}