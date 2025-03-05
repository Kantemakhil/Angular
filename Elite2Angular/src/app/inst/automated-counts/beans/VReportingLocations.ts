    export class VReportingLocations {
         private _recountRsnCode: string;
         private _rcntInProgressFlag: string;
         private _actualCount: number;
         private _locationDescription: string;
         private _locationType: string;
         private _reportedCount: number;
         private _reportingLocId: number;
         private _serialVersionUID: number;
         private _verifyDateTime: Date;
         private _discrepRsnCode: string;
         private _reportedTotal: number;
         private _conductedByUserid: string;
         private _rcntDateTime: Date;
         private _scheduledTime: string;
         private _verifyUserId: string;
         private _conductedDateTime: Date;
         private _rsnCodeDateTime: Date;
         private _agySeq: number;
         private _rsnCodeUserId: string;
         private _recountTotal: number;
         private _location3Id: number;
         private _location2Id: number;
         private _rcntConductedBy: string;
         private _agyLocId: string;
         private _listSeq: number;
         private _enteredByUserid: string;
         private _countTypeId: number;
         private _location1Id: number;
         private _countTypeCode: string;
         private _dateSubmitted: Date;

         get recountRsnCode(): string{ return  this._recountRsnCode }

         set recountRsnCode(precountRsnCode: string){ this._recountRsnCode = precountRsnCode }

         get rcntInProgressFlag(): string{ return  this._rcntInProgressFlag }

         set rcntInProgressFlag(prcntInProgressFlag: string){ this._rcntInProgressFlag = prcntInProgressFlag }

         get actualCount(): number{ return  this._actualCount }

         set actualCount(pactualCount: number){ this._actualCount = pactualCount }

         get locationDescription(): string{ return  this._locationDescription }

         set locationDescription(plocationDescription: string){ this._locationDescription = plocationDescription }

         get locationType(): string{ return  this._locationType }

         set locationType(plocationType: string){ this._locationType = plocationType }

         get reportedCount(): number{ return  this._reportedCount }

         set reportedCount(preportedCount: number){ this._reportedCount = preportedCount }

         get reportingLocId(): number{ return  this._reportingLocId }

         set reportingLocId(preportingLocId: number){ this._reportingLocId = preportingLocId }

         get serialVersionUID(): number{ return  this._serialVersionUID }

         set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

         get verifyDateTime(): Date{ return  this._verifyDateTime }

         set verifyDateTime(pverifyDateTime: Date){ this._verifyDateTime = pverifyDateTime }

         get discrepRsnCode(): string{ return  this._discrepRsnCode }

         set discrepRsnCode(pdiscrepRsnCode: string){ this._discrepRsnCode = pdiscrepRsnCode }

         get reportedTotal(): number{ return  this._reportedTotal }

         set reportedTotal(preportedTotal: number){ this._reportedTotal = preportedTotal }

         get conductedByUserid(): string{ return  this._conductedByUserid }

         set conductedByUserid(pconductedByUserid: string){ this._conductedByUserid = pconductedByUserid }

         get rcntDateTime(): Date{ return  this._rcntDateTime }

         set rcntDateTime(prcntDateTime: Date){ this._rcntDateTime = prcntDateTime }

         get scheduledTime(): string{ return  this._scheduledTime }

         set scheduledTime(pscheduledTime: string){ this._scheduledTime = pscheduledTime }

         get verifyUserId(): string{ return  this._verifyUserId }

         set verifyUserId(pverifyUserId: string){ this._verifyUserId = pverifyUserId }

         get conductedDateTime(): Date{ return  this._conductedDateTime }

         set conductedDateTime(pconductedDateTime: Date){ this._conductedDateTime = pconductedDateTime }

         get rsnCodeDateTime(): Date{ return  this._rsnCodeDateTime }

         set rsnCodeDateTime(prsnCodeDateTime: Date){ this._rsnCodeDateTime = prsnCodeDateTime }

         get agySeq(): number{ return  this._agySeq }

         set agySeq(pagySeq: number){ this._agySeq = pagySeq }

         get rsnCodeUserId(): string{ return  this._rsnCodeUserId }

         set rsnCodeUserId(prsnCodeUserId: string){ this._rsnCodeUserId = prsnCodeUserId }

         get recountTotal(): number{ return  this._recountTotal }

         set recountTotal(precountTotal: number){ this._recountTotal = precountTotal }

         get location3Id(): number{ return  this._location3Id }

         set location3Id(plocation3Id: number){ this._location3Id = plocation3Id }

         get location2Id(): number{ return  this._location2Id }

         set location2Id(plocation2Id: number){ this._location2Id = plocation2Id }

         get rcntConductedBy(): string{ return  this._rcntConductedBy }

         set rcntConductedBy(prcntConductedBy: string){ this._rcntConductedBy = prcntConductedBy }

         get agyLocId(): string{ return  this._agyLocId }

         set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId }

         get listSeq(): number{ return  this._listSeq }

         set listSeq(plistSeq: number){ this._listSeq = plistSeq }

         get enteredByUserid(): string{ return  this._enteredByUserid }

         set enteredByUserid(penteredByUserid: string){ this._enteredByUserid = penteredByUserid }

         get countTypeId(): number{ return  this._countTypeId }

         set countTypeId(pcountTypeId: number){ this._countTypeId = pcountTypeId }

         get location1Id(): number{ return  this._location1Id }

         set location1Id(plocation1Id: number){ this._location1Id = plocation1Id }

         get countTypeCode(): string{ return  this._countTypeCode }

         set countTypeCode(pcountTypeCode: string){ this._countTypeCode = pcountTypeCode }

         get dateSubmitted(): Date{ return  this._dateSubmitted }

         set dateSubmitted(pdateSubmitted: Date){ this._dateSubmitted = pdateSubmitted }


     toJSON(): any {
         return { 
            'recountRsnCode': this._recountRsnCode,
            'rcntInProgressFlag': this._rcntInProgressFlag,
            'actualCount': this._actualCount,
            'locationDescription': this._locationDescription,
            'locationType': this._locationType,
            'reportedCount': this._reportedCount,
            'reportingLocId': this._reportingLocId,
            'serialVersionUID': this._serialVersionUID,
            'verifyDateTime': this._verifyDateTime,
            'discrepRsnCode': this._discrepRsnCode,
            'reportedTotal': this._reportedTotal,
            'conductedByUserid': this._conductedByUserid,
            'rcntDateTime': this._rcntDateTime,
            'scheduledTime': this._scheduledTime,
            'verifyUserId': this._verifyUserId,
            'conductedDateTime': this._conductedDateTime,
            'rsnCodeDateTime': this._rsnCodeDateTime,
            'agySeq': this._agySeq,
            'rsnCodeUserId': this._rsnCodeUserId,
            'recountTotal': this._recountTotal,
            'location3Id': this._location3Id,
            'location2Id': this._location2Id,
            'rcntConductedBy': this._rcntConductedBy,
            'agyLocId': this._agyLocId,
            'listSeq': this._listSeq,
            'enteredByUserid': this._enteredByUserid,
            'countTypeId': this._countTypeId,
            'location1Id': this._location1Id,
            'countTypeCode': this._countTypeCode,
            'dateSubmitted': this._dateSubmitted,
             };
         }  
 }