import {BaseModel} from '@commonbeans/BaseModel';  
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';
export class WeekSchedule extends BaseModel {
         private _scheduleDateTime: Date;
         private _createUserId: string;
         private  _morningAMList: VOffenderAllSchedules[] = [];
         private  _afterNoonPMList: VOffenderAllSchedules[] = [];
         private  _eveningEDList: VOffenderAllSchedules[] = [];


        set scheduleDateTime(scheduleDateTime: Date){ this._scheduleDateTime = scheduleDateTime }

        get scheduleDateTime(): Date{ return  this._scheduleDateTime }
        
        set morningAMList(morningAMList: VOffenderAllSchedules[]){ this._morningAMList = morningAMList }

        get morningAMList(): VOffenderAllSchedules[]{ return  this._morningAMList }
        
        set afterNoonPMList(afterNoonPMList: VOffenderAllSchedules[]){ this._afterNoonPMList = afterNoonPMList }

        get afterNoonPMList(): VOffenderAllSchedules[]{ return  this._afterNoonPMList }
        
        set eveningEDList(eveningEDList: VOffenderAllSchedules[]){ this._eveningEDList = eveningEDList }

        get eveningEDList(): VOffenderAllSchedules[]{ return  this._eveningEDList }
        
}
