import { BaseModel } from '@commonbeans/BaseModel';

export class StaffEquipment extends BaseModel {
   private agency_incident_id:number; 
   private party_seq :number;         
   private staff_id  :number;      
   private equipment_used :string;   
   private equipment_detail :string; 
   private create_datetime  :Date 
   private create_user_id :string;   
   private modify_user_id :string;   
   private modify_datetime :Date   
   private seal_flag     :string;    
   private _equipmentUsedTemp: string;
   private _incidentReportId: number;
   
    
   
   

  

get staffId() :number{return this.staff_id;}

set  staffId(staffId:number){this.staff_id=staffId;}

get createDatetime() :Date{return this.create_datetime;}

set createDatetime(createDatetime:Date) {this.create_datetime=createDatetime;}

get createUserId() :string {return this.create_user_id;}

set createUserId(createUserId:string) {this.create_user_id=createUserId;}

get modifyUserId() :string{return this.modify_user_id;}

set modifyUserId(modifyUserId:string) {this.modify_user_id=modifyUserId;}

get modifyDatetime() :Date{return this.modify_datetime;}

set modifyDatetime(modifyDatetime:Date) {this.modify_datetime=modifyDatetime;}

get agencyIncidentId() :number {return this.agency_incident_id;}

set agencyIncidentId(agencyIncidentId:number) {this.agency_incident_id=agencyIncidentId;}

get partySeq() :number {return this.party_seq;}

set partySeq(partySeq:number) {this.party_seq=partySeq;}

get sealFlag() :string{return this.seal_flag;}

set sealFlag(sealFlag:string) {this.seal_flag=sealFlag;}

get equipmentUsed() :string{return this.equipment_used;}

set equipmentUsed(equipmentUsed:string) {this.equipment_used=equipmentUsed;}

get equipmentDetail() :string{return this.equipment_detail;}

set equipmentDetail(equipmentDetail:string) {this.equipment_detail=equipmentDetail;}

public get equipmentUsedTemp(): string { return this._equipmentUsedTemp;}
public set equipmentUsedTemp(value: string) { this._equipmentUsedTemp = value;}

public get incidentReportId(): number {
    return this._incidentReportId;
}
public set incidentReportId(value: number) {
    this._incidentReportId = value;
}
toJSON() : any{
    return {
"staffId":this.staff_id,  
"createDatetime":this.create_datetime,
"createUserId":this.create_user_id,
"modifyUserId":this.modify_user_id,
"modifyDateti":this.modify_datetime,
"agencyIncidentId":this.agency_incident_id,
"partySeq":this.party_seq,
"sealFlag":this.seal_flag,
"equipmentUsed":this.equipment_used , 
"equipmentDetail":this.equipment_detail,
"equipmentUsedTemp":this.equipmentUsedTemp , 
'incidentReportId' :this._incidentReportId,

};

}
}