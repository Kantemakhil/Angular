import { BaseModel } from '@commonbeans/BaseModel';
export class VSchdPrisonActivities extends BaseModel {
 private _activity: string;
       private _internalLocationDesc: string;
       private _serialVersionUID: number;
       private _scheduleEndDate: Date;
       private _scheduleStartDate: Date;
       private _service: string;
       private _crsSchId: number;
       private _crsActyId: number;
       private _scheduleDate: Date;
       private _agyLocId: string;
       private _startTime: Date;
       private _endTime: Date;
       private _internalLocationId: number;
       private _programId: number;
       private _agyLocDesc: string;
       private _code :string;
       private _description :string;

       get activity(): string{ return this._activity; }
       set activity(pactivity: string){ this._activity = pactivity ;}
       get code(): string{ return this._code; }
       set code(pcode: string){ this._code = pcode ;}
       get description(): string{ return this._description; }
       set description(pdescription: string){ this._description = pdescription ;}
       get internalLocationDesc(): string{ return this._internalLocationDesc; }
       set internalLocationDesc(pinternalLocationDesc: string){ this._internalLocationDesc = pinternalLocationDesc ;}
       get serialVersionUID(): number{ return this._serialVersionUID; }
       set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
       get scheduleEndDate(): Date{ return this._scheduleEndDate; }
       set scheduleEndDate(pscheduleEndDate: Date){ this._scheduleEndDate = pscheduleEndDate ;}
       get scheduleStartDate(): Date{ return this._scheduleStartDate; }
       set scheduleStartDate(pscheduleStartDate: Date){ this._scheduleStartDate = pscheduleStartDate ;}
       get service(): string{ return this._service; }
       set service(pservice: string){ this._service = pservice ;}
       get crsSchId(): number{ return this._crsSchId; }
       set crsSchId(pcrsSchId: number){ this._crsSchId = pcrsSchId ;}
       get crsActyId(): number{ return this._crsActyId; }
       set crsActyId(pcrsActyId: number){ this._crsActyId = pcrsActyId ;}
       get scheduleDate(): Date{ return this._scheduleDate; }
       set scheduleDate(pscheduleDate: Date){ this._scheduleDate = pscheduleDate ;}
       get agyLocId(): string{ return this._agyLocId; }
       set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
       get startTime(): Date{ return this._startTime; }
       set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
       get endTime(): Date{ return this._endTime; }
       set endTime(pendTime: Date){ this._endTime = pendTime ;}
       get internalLocationId(): number{ return this._internalLocationId; }
       set internalLocationId(pinternalLocationId: number){ this._internalLocationId = pinternalLocationId ;}
       get programId(): number{ return this._programId; }
       set programId(pprogramId: number){ this._programId = pprogramId ;}
       get agyLocDesc(): string{ return this._agyLocDesc; }
       set agyLocDesc(pagyLocDesc: string){ this._agyLocDesc = pagyLocDesc ;}

toJSON(): any {
         return {
              'activity': this._activity,
              'internalLocationDesc': this._internalLocationDesc,
              'serialVersionUID': this._serialVersionUID,
              'scheduleEndDate': this._scheduleEndDate,
              'scheduleStartDate': this._scheduleStartDate,
              'service': this._service,
              'crsSchId': this._crsSchId, 
              'crsActyId': this._crsActyId,
              'scheduleDate': this._scheduleDate,
              'agyLocId': this._agyLocId,
              'startTime': this._startTime,
              'endTime': this._endTime,
              'internalLocationId': this._internalLocationId,
              'programId': this._programId,
              'agyLocDesc': this._agyLocDesc,
};
         }
}