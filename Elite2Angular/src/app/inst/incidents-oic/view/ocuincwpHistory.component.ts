import {Component, OnInit, ViewChild } from '@angular/core';

    import { DialogComponent } from '@ui-components/dialog/dialog.component';
    import { TranslateService } from '@common/translate/translate.service';
    import {OffenderWeapons} from '@instincidentsbeans/OffenderWeapons';
    import { OffenderWeaponCommitBean } from '@instincidentsbeans/OffenderWeaponCommitBean';
    import { OiiinlogService } from '../service/oiiinlog.service';
    import { OcuincwpService } from '../service/ocuincwp.service';
    import { IncidentSearchService } from '../service/incident-search.service';
    @Component({
      selector: 'app-ocuincwp',
      templateUrl: './ocuincwpHistory.component.html',
      styleUrls: ['./ocuincwp.component.css']
    })
    export class OcuincwpHistoryComponent implements OnInit {
        @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    coldatadef :any[];
    rowdatadef :any[]=[];
    type = 'error';
    msglist = [];
    weaponDataModel;any;
    offednerWeaponInsertList:OffenderWeapons[] = [] ;
    offednerWeaponUpdatetList: OffenderWeapons[] = []; 
    offednerWeaponDeleteList :OffenderWeapons[] = [];
    offednerWeaponInsertListtemp :OffenderWeapons[]=[];
    offenderWeaponCommitBean=new OffenderWeaponCommitBean();
    msgs: any[] = [];
    tableIndex=0;
    message = ' Invalid.';
    addflag :boolean=true;
    private offenderBookId:any;
    private agencyIncidentId:any;
    weaponrowdatadef:OffenderWeapons[] = [] ;
    
          constructor(public translateService: TranslateService,private ocuincwpService :OcuincwpService , private  oiiinlogFactory: OiiinlogService,private incidentSearchService: IncidentSearchService) { }
    
      ngOnInit() {
          let data =this.dialog.data;
          this.offenderBookId=data.offenderBookId;
          this.agencyIncidentId=data.agencyIncidentId;
          this.coldatadef=[
                           {
                               fieldName: this.translateService.translate('ocuincwp.weaponsused'), field: 'weaponsUsed',
                               datatype: 'lov',domain: 'INC_OFF_WEAP', editable: true, width: 200, 
                           },
                           {
                               fieldName: this.translateService.translate('ocuincwp.details'), field: 'weaponsDetail',
                               datatype: 'text', editable: true, width: 200,uppercase: 'false',maxlength: 600,tooltip: true
                           },
                           ];
                           
                   this.offenderWeaponPopulateDetails();        
      }

      onGridInsert = () => {
        return{
            weaponsUsed:'', weaponsdetail:'' ,agencyIncidentId:this.agencyIncidentId , offenderBookId:this.offenderBookId,
        };
    }

      show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
      clear(){
          this.dialog.close("true");
      }
      
     
      offenderWeaponPopulateDetails(){
        this.weaponDataModel = new OffenderWeapons();
        this.weaponDataModel.agencyIncidentId =  this.agencyIncidentId;
        this.weaponDataModel.offenderBookId=this.offenderBookId;
        this.weaponDataModel.partySeq=this.dialog.data.partySeq;
        const serviceObj = this.ocuincwpService.offenderWeaponsData( this.weaponDataModel);

        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.weaponrowdatadef = [];
            } else {
                  this.weaponrowdatadef = data;
            }
        });
                 
    }

     
     onRowWeaponeOffender(event){
         
     }
     offednerweaponecommit(event){
        this.offednerWeaponInsertList= [];
        this.offednerWeaponUpdatetList = [];
        this.offednerWeaponDeleteList=[];
        this.offednerWeaponInsertList = event.added;
        this.offednerWeaponUpdatetList = event.updated;
        this.offednerWeaponDeleteList = event.removed;
          if (this.offednerWeaponInsertList.length > 0) {
              for (let i = 0; i < this.offednerWeaponInsertList.length; i++) {
                  this.offednerWeaponInsertList[i].agencyIncidentId=this.agencyIncidentId;
                  this.offednerWeaponInsertList[i].offenderBookId=this.offenderBookId;
                  if (!this.offednerWeaponInsertList[i].weaponsUsed) {
                          this.type = 'warn';
                          this.message = this.translateService.translate('Weapons used must be entered');
                          this.show();
                          return;
                  }
                 
              }
          }
        if (this.offednerWeaponUpdatetList.length > 0) {
              for (let i = 0; i < this.offednerWeaponUpdatetList.length; i++) {
                  this.offednerWeaponUpdatetList[i].agencyIncidentId=this.agencyIncidentId;
                  this.offednerWeaponUpdatetList[i].offenderBookId=this.offenderBookId;
                
              }
          }
         if (this.offednerWeaponDeleteList.length > 0) {
             for (let i = 0; i < this.offednerWeaponUpdatetList.length; i++) {
                 this.offednerWeaponDeleteList[i].agencyIncidentId=this.agencyIncidentId;
                 this.offednerWeaponDeleteList[i].offenderBookId=this.offenderBookId;
               
             }
              
          }
        this.offenderWeaponCommitBean.insertList = this.offednerWeaponInsertList;
        this.offenderWeaponCommitBean.updateList = this.offednerWeaponUpdatetList;
        this.offenderWeaponCommitBean.deleteList = this.offednerWeaponDeleteList;
        const ServiceObj =  this.ocuincwpService.offednerWeaponsInsertQuery(this.offenderWeaponCommitBean);
         ServiceObj.subscribe(agencyincidentRepair => {
              if (agencyincidentRepair[0] === 0) {
                     return;
                  } else {
                  this.weaponrowdatadef = agencyincidentRepair;
                  this.type = 'success';
                  this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                  this.show();
                  this.offenderWeaponPopulateDetails();
                  }
             });

          
      }
      
    
    }
