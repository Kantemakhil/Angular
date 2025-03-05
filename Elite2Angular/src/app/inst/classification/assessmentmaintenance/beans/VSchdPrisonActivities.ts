import { BaseModel } from '@commonbeans/BaseModel';
export class VSchdPrisonActivities extends BaseModel {
 private _activity: string;
       private _internalLocationDesc: string;
       private _serialVersionUID: number;
       private _scheduleEndDate: number;
       private _scheduleStartDate: number;
       private _service: string;
       private _crsSchId: number;
       private _crsActyId: number;
       private _scheduleDate: number;
       private _agyLocId: string;
       private _startTime: number;
       private _endTime: number;
       private _internalLocationId: number;
       private _programId: number;
       private _agyLocDesc: string;

       get activity(): string{ return this._activity; }
       set activity(pactivity: string){ this._activity = pactivity ;}
       get internalLocationDesc(): string{ return this._internalLocationDesc; }
       set internalLocationDesc(pinternalLocationDesc: string){ this._internalLocationDesc = pinternalLocationDesc ;}
       get serialVersionUID(): number{ return this._serialVersionUID; }
       set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
       get scheduleEndDate(): number{ return this._scheduleEndDate; }
       set scheduleEndDate(pscheduleEndDate: number){ this._scheduleEndDate = pscheduleEndDate ;}
       get scheduleStartDate(): number{ return this._scheduleStartDate; }
       set scheduleStartDate(pscheduleStartDate: number){ this._scheduleStartDate = pscheduleStartDate ;}
       get service(): string{ return this._service; }
       set service(pservice: string){ this._service = pservice ;}
       get crsSchId(): number{ return this._crsSchId; }
       set crsSchId(pcrsSchId: number){ this._crsSchId = pcrsSchId ;}
       get crsActyId(): number{ return this._crsActyId; }
       set crsActyId(pcrsActyId: number){ this._crsActyId = pcrsActyId ;}
       get scheduleDate(): number{ return this._scheduleDate; }
       set scheduleDate(pscheduleDate: number){ this._scheduleDate = pscheduleDate ;}
       get agyLocId(): string{ return this._agyLocId; }
       set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
       get startTime(): number{ return this._startTime; }
       set startTime(pstartTime: number){ this._startTime = pstartTime ;}
       get endTime(): number{ return this._endTime; }
       set endTime(pendTime: number){ this._endTime = pendTime ;}
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