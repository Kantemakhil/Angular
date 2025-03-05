
import { BaseModel } from '@commonbeans/BaseModel';

export class SignificantIncident extends BaseModel {

   
private _agencyincidentid: number;
private _significancetype : string;
private _modifyuserid  :   string;
private _createDateTime :   Date;
private _createuserid  :   string;
private _modifydatetime :   Date;
private _modifiedStaffId:string;
private _sealflag    :   string;
private _entrydate  :Date;
private _entryTime : Date;
private _recordedByStaffId: number;


    get significanceType(): string { return this._significancetype; }

    set significanceType(poffenderIdDisplay: string) { this._significancetype = poffenderIdDisplay; }

    get agencyIncidentId(): number { return this._agencyincidentid; }

    set agencyIncidentId(pagencyIncidentId: number) { this._agencyincidentid = pagencyIncidentId; }
    
    get createUserId(): string { return this._createuserid; }

    set createUserId(pstaffIdDes: string) { this._createuserid = pstaffIdDes; }
    
    get entryDate(): Date { return this._entrydate; }

    set entryDate(pdispositionDate: Date) { this._entrydate = pdispositionDate; }

    get modifyUserId(): string { return this._modifyuserid; }

    set modifyUserId(pstaffId: string) { this._modifyuserid = pstaffId; }
       
    get modifyDateTime(): Date { return this._modifydatetime; }

    set modifyDateTime(pdispositionDate: Date) { this._modifydatetime = pdispositionDate; }
    
    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pdispositionDate: Date) { this._createDateTime = pdispositionDate; }
    
    get sealFlag(): string { return this._sealflag; }

    set sealflag(pdispositionDate: string) { this._sealflag = pdispositionDate; }
    
    get modifiedStaffId(): string { return this._modifiedStaffId; }

    set modifiedStaffId(pdispositionDate: string) { this._modifiedStaffId = pdispositionDate; }

    get entryTime(): Date { return this._entryTime; }

    set entryTime(pentryTime: Date) { this._entryTime = pentryTime; }
   
    get recordedByStaffId(): number { return this._recordedByStaffId; }

    set recordedByStaffId(precordedByStaffId: number) { this._recordedByStaffId = precordedByStaffId; }
  

    toJSON(): any {
        return {
            'agencyIncidentId': this._agencyincidentid,
            'significanceType': this._significancetype,
            'modifyUserId':this._modifyuserid,
            'createUserId': this._createuserid,
            'createDateTime': this._createDateTime,
            'modifyDateTime': this._modifydatetime,
            'sealFlag': this._sealflag,
            'entryDate':this._entrydate ,
            'entryTime':this._entryTime,
            'modifiedStaffId':this._modifiedStaffId,
            'recordedByStaffId': this._recordedByStaffId

        };
    }
}




