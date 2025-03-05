import {  Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ocuincfe',
  templateUrl: './ocuincfe.component.html',
  styleUrls: ['./ocuincfe.component.css']
})
export class OcuincfeComponent implements OnInit {
//    @ViewChild('dialog') dialog: DialogComponent;
//   useOfForceclm :any[];
//equipmentUsedcln:any[];
//StaffForceInsertList:StaffForce[] = [] ;
//StaffForceUpdatetList: StaffForce[] = []; 
//StaffForceDeleteList :StaffForce[] = [];
//StaffEquipmentInsertList:StaffEquipment[] = [] ;
//StaffEquipmentUpdatetList: StaffEquipment[] = []; 
//StaffEquipmentDeleteList :StaffEquipment[] = [];
//StaffForceCommitBean=new StaffForceCommitBean();
//StaffEquipmentCommitBean=new StaffEquipmentCommitBean();
//
//useOfForceRowData:StaffForce[]=[];
//equipementRowData:StaffEquipment[]=[];
//StaffForceModel = new StaffForce();
//StaffEquipementModel=new StaffEquipment();
//agencyIncidentId:any;
//sequenceNumber:any;
//type = 'error';
//    msglist = [];
//    msgs: any[] = [];
//    message = ' Invalid.';
//  constructor(public translateService: TranslateService, private dialogService: DialogService,private ocuincfeService:OcuincfeService) { }
//
  ngOnInit() {
//              this.useOfForceclm =[        
//                                     {
//                                         fieldName: this.translateService.translate('Sequience') + '*', field: 'SequienceNumber',
//                                         editable: true, width: 150, filter: 'text', datatype: 'text'
//                                     },
//                                     {
//                                         fieldName: this.translateService.translate('Force Used') + '*', field: 'ForceUsed', datatype: 'lov',domain:'INC_STF_FRCE',
//                                         editable: true, width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: '70%',
//                                         
//                                     },
//                                     { 
//                                         fieldName: this.translateService.translate('Details'), 
//                                         field: 'ForceDetail', datatype: 'text', uppercase: 'false' ,editable: true, width: 500,maxlength: 3000
//                                     },
//                                 ];
//         this.equipmentUsedcln = [
//                                    {
//                                        fieldName: this.translateService.translate('Equipment Used') + '*', field: 'EquipmentUsed',datatype: 'lov',domain:'INC_STF_EQUP',
//                                        editable: true, width: 250
//                                     },
//                                     { 
//                                         fieldName: this.translateService.translate('Details'), 
//                                         field: 'EquipmentDetail', datatype: 'text', uppercase: 'false' ,editable: true, width: 500,maxlength: 3000
//                                     },
//                                 ];
//         
//         this.StaffForceDetails();
//         this.StaffEquipementDetails();
  }
//  clear(){
//      this.dialog.close(true);
//  }
//
//  onGridInsertOffforce = () => {
//    return{
//        SequienceNumber:'', ForceUsed:'' ,ForceDetail:''
//    };
//}
//
//onGridInsertOffEquipment = () => {
//    return{
//        EquipmentUsed:'', EquipmentDetail:'' 
//    };
//}
//
//  show() {
//    this.msglist = [];
//    this.msglist.push({ message: this.message, type: this.type });
//    this.msgs = [...this.msglist];
//}
// 
//  
// 
//  StaffForceDetails(){
//    this.StaffForceModel.agencyIncidentId = this.agencyIncidentId;
//    this.StaffForceModel.sequenceNumber=this.sequenceNumber;
//    const serviceObj = this.ocuincfeService.staffforceExecuteQuery( this.StaffForceModel);
//
//    serviceObj.subscribe(data => {
//        if (data.length === 0) {
//            this.useOfForceRowData = [];
//        } else {
//              this.useOfForceRowData = data;
//        }
//    });
//             
//}
//onRowForceUsedclick(event){
//    
//}
//StaffEquipementDetails(){
//      
//    
//    this.StaffEquipementModel.agencyIncidentId =  this.agencyIncidentId;
//    const serviceObj = this.ocuincfeService.staffEquipementExecuteQuery( this.StaffEquipementModel);
//
//    serviceObj.subscribe(data => {
//        if (data.length === 0) {
//            this.equipementRowData = [];
//        } else {
//              this.equipementRowData = data;
//        }
//    });
//             
//}
//
//
// 
// onRowSatffForce(event){
//     
// }
//
// onRowStaffEquipement(event){
//    
//}
//
//
//staffforceDatacommit(event){
//    this.StaffForceInsertList= [];
//    this.StaffForceUpdatetList = [];
//    this.StaffForceDeleteList=[];
//    this.StaffForceInsertList = event.added;
//    this.StaffForceUpdatetList = event.updated;
//    this.StaffForceDeleteList = event.removed;
//      if (this.StaffForceInsertList.length > 0) {
//          for (let i = 0; i < this.StaffForceInsertList.length; i++) {
//            //   if (!this.StaffForceInsertList[i]['weaponsUsed']) {
//            //       this.type = 'warn';
//            //       this.message = this.translateService.translate('weapons Used must be entered');
//            //       this.show();
//            //       return;
//            //       }
//            //   if (this.StaffForceInsertList[i]['weaponsDetail']) {
//            //       if (this.StaffForceInsertList.length > 10) {
//            //           this.type = 'warn';
//            //           this.message = this.translateService.translate('oidincde.costvalidation');
//            //           this.show();
//            //           return;
//                //   }
//            //   }
//             
//          }
//      }
//    if (this.StaffForceUpdatetList.length > 0) {
//          for (let i = 0; i < this.StaffForceUpdatetList.length; i++) {
//            
//          }
//      }
//     if (this.StaffForceDeleteList.length > 0) {
//          
//      }
//    this.StaffForceCommitBean.insertList = this.StaffForceInsertList;
//    this.StaffForceCommitBean.updateList = this.StaffForceUpdatetList;
//    this.StaffForceCommitBean.deleteList = this.StaffForceDeleteList;
//    const ServiceObj =  this.ocuincfeService.staffforceCommitData(this.StaffForceCommitBean);
//     ServiceObj.subscribe(agencyincidentRepair => {
//          if (agencyincidentRepair[0] === 0) {
//                 return;
//              } else {
//              this.useOfForceRowData = agencyincidentRepair;
//              this.type = 'info';
//              this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
//              this.show();
//              this.StaffForceDetails();
//              }
//         });
//
//      
//  }
//
//staffEquipmentCommitRow(event){
//    this.StaffEquipmentInsertList= [];
//    this.StaffEquipmentUpdatetList = [];
//    this.StaffEquipmentDeleteList=[];
//    this.StaffEquipmentInsertList = event.added;
//    this.StaffEquipmentUpdatetList = event.updated;
//    this.StaffEquipmentDeleteList = event.removed;
//      if (this.StaffEquipmentInsertList.length > 0) {
//          for (let i = 0; i < this.StaffEquipmentInsertList.length; i++) {
//            //   if (!this.StaffEquipmentInsertList[i]['weaponsUsed']) {
//            //       this.type = 'warn';
//            //       this.message = this.translateService.translate('weapons Used must be entered');
//            //       this.show();
//            //       return;
//            //       }
//            //   if (this.StaffEquipmentInsertList[i]['weaponsDetail']) {
//            //       if (this.StaffEquipmentInsertList.length > 10) {
//            //           this.type = 'warn';
//            //           this.message = this.translateService.translate('oidincde.costvalidation');
//            //           this.show();
//            //           return;
//            //       }
//            //   }
//             
//          }
//      }
//    if (this.StaffEquipmentUpdatetList.length > 0) {
//          for (let i = 0; i < this.StaffEquipmentUpdatetList.length; i++) {
//            
//          }
//      }
//     if (this.StaffEquipmentDeleteList.length > 0) {
//          
//      }
//    this.StaffEquipmentCommitBean.insertList = this.StaffEquipmentInsertList;
//    this.StaffEquipmentCommitBean.updateList = this.StaffEquipmentUpdatetList;
//    this.StaffEquipmentCommitBean.deleteList = this.StaffEquipmentDeleteList;
//    const ServiceObj =  this.ocuincfeService.staffEquipementCommitData(this.StaffEquipmentCommitBean);
//     ServiceObj.subscribe(agencyincidentRepair => {
//          if (agencyincidentRepair[0] === 0) {
//                 return;
//              } else {
//              this.equipementRowData = agencyincidentRepair;
//              this.type = 'info';
//              this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
//              this.show();
//              this.StaffForceDetails();
//              }
//         });
//
//      
//  }
//
//
//  
//  
//
}
