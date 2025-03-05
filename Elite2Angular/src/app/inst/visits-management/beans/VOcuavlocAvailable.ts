    export class VOcuavlocAvailable {
         private _description: String;
         private _agencyVisitSlotId: number;
         private _groupsBooked: number    ;
         private _capacity: number    ;
         private _totalBooked: number    ;
         private _weekDay: String;
         private _agyLocId: String;
         private _maxAdults: number    ;
         private _startTime: String;
         private _visitDate: Date;
         private _maxGroups: number    ;
         private _adultsBooked: number    ;
         private _endTime: String;
         private _internalLocationId: number;
         private _offenderVisitId: number;

         get description(): String { return this._description; }
         set description(pdescription: String) { this._description = pdescription; }
         get agencyVisitSlotId():  number { return this._agencyVisitSlotId; }
         set agencyVisitSlotId(pagencyVisitSlotId:  number) { this._agencyVisitSlotId = pagencyVisitSlotId; }
         get groupsBooked():  number { return this._groupsBooked; }
         set groupsBooked(pgroupsBooked:  number) { this._groupsBooked = pgroupsBooked; }
         get capacity():  number { return this._capacity; }
         set capacity(pcapacity:  number) { this._capacity = pcapacity; }
         get totalBooked():  number { return this._totalBooked; }
         set totalBooked(ptotalBooked:  number) { this._totalBooked = ptotalBooked; }
         get weekDay(): String { return this._weekDay; }
         set weekDay(pweekDay: String) { this._weekDay = pweekDay; }
         get agyLocId(): String { return this._agyLocId; }
         set agyLocId(pagyLocId: String) { this._agyLocId = pagyLocId; }
         get maxAdults():  number { return this._maxAdults; }
         set maxAdults(pmaxAdults:  number) { this._maxAdults = pmaxAdults; }
         get startTime(): String { return this._startTime; }
         set startTime(pstartTime: String) { this._startTime = pstartTime; }
         get visitDate(): Date { return this._visitDate; }
         set visitDate(pvisitDate: Date) { this._visitDate = pvisitDate; }
         get maxGroups():  number { return this._maxGroups; }
         set maxGroups(pmaxGroups:  number) { this._maxGroups = pmaxGroups; }
         get adultsBooked():  number { return this._adultsBooked; }
         set adultsBooked(padultsBooked:  number) { this._adultsBooked = padultsBooked; }
         get endTime(): String { return this._endTime; }
         set endTime(pendTime: String) { this._endTime = pendTime; }
         get internalLocationId(): number { return this._internalLocationId; }
         set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }
         get offenderVisitId(): number { return this._offenderVisitId; }
         set offenderVisitId(poffenderVisitId: number) { this._offenderVisitId = poffenderVisitId; }

     toJSON(): any {
         return {
            'description': this._description,
            'agencyVisitSlotId': this._agencyVisitSlotId,
            'groupsBooked': this._groupsBooked,
            'capacity': this._capacity,
            'totalBooked': this._totalBooked,
            'weekDay': this._weekDay,
            'agyLocId': this._agyLocId,
            'maxAdults': this._maxAdults,
            'startTime': this._startTime,
            'visitDate': this._visitDate,
            'maxGroups': this._maxGroups,
            'adultsBooked': this._adultsBooked,
            'endTime': this._endTime,
            'internalLocationId': this._internalLocationId,
            'offenderVisitId': this._offenderVisitId
             };
         }
 }
