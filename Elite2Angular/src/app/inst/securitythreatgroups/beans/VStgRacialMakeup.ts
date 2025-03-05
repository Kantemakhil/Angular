    export class VStgRacialMakeup  {
         private _serialVersionUID: number;
         private _raceDescription: string;
         private _stgId: number;
         private _raceCount: number;

         get serialVersionUID(): number { return this._serialVersionUID; }
         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
         get raceDescription(): string { return this._raceDescription; }
         set raceDescription(praceDescription: string) { this._raceDescription = praceDescription; }
         get stgId(): number { return this._stgId; }
         set stgId(pstgId: number) { this._stgId = pstgId; }
         get raceCount(): number { return this._raceCount; }
         set raceCount(praceCount: number) { this._raceCount = praceCount; }

     toJSON(): any  {
         return  {
            'serialVersionUID': this._serialVersionUID,
            'raceDescription': this._raceDescription,
            'stgId': this._stgId,
            'raceCount': this._raceCount,
             };
         }
 }
