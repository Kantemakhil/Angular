import { BaseModel } from '@commonbeans/BaseModel';
export class StaffForce extends BaseModel {

  private agency_incident_id :number;
  private party_seq :number;
  private staff_id  : number;
  private force_used:string;
  private force_detail:string;       
  private create_datetime :Date;
  private create_user_id:string;
  private modify_user_id  :string;
  private modify_datetime   :Date;
  private seal_flag:string;
  private _reasonForceUsed: string;
  private _sequenceNumberTemp: number;
  private _rowId: number;
  private _listSeq:number;
  private incident_report_id:number;
 




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

get forceUsed() :string{return this.force_used;}

set forceUsed(forceUsed:string) {this.force_used=forceUsed;}

get forceDetail() :string{return this.force_detail;}

set forceDetail(forceDetail:string) {this.force_detail=forceDetail;}

get reasonForceUsed(): string { return this._reasonForceUsed; }
set reasonForceUsed(value: string) { this._reasonForceUsed = value; }

public get sequenceNumberTemp(): number { return this._sequenceNumberTemp;}
public set sequenceNumberTemp(value: number) {this._sequenceNumberTemp = value;
 
}
public get rowId(): number {
  return this._rowId;
}
public set rowId(value: number) {
  this._rowId = value;
}


 get listSeq(): number { return  this._listSeq; }
 set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

 get incidentReportId ():number{return this.incident_report_id;}

 set incidentReportId(incidentReportId :number){this.incident_report_id=incidentReportId;}

    toJSON() : any{
        return {
        "staffId":this.staff_id,  
        "createDatetime":this.create_datetime,
        "createUserId":this.create_user_id,
        "modifyUserId":this.modify_user_id,
        "modifyDate":this.modify_datetime,
        "agencyIncidentId":this.agency_incident_id,
        "partySeq":this.party_seq,
        "sealFlag":this.seal_flag,
        "forceUsed":this.force_used , 
        "forceDetail":this.force_detail,
        'reasonForceUsed':this.reasonForceUsed,
        'sequenceNumberTemp' :this._sequenceNumberTemp,
        'rowId': this._rowId,
        'listSeq': this._listSeq,
        'incidentReportId' :this.incident_report_id


    };

}
}