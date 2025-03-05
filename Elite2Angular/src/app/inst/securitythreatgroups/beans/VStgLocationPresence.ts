    export class VStgLocationPresence  {
         private _serialVersionUID: number;
         private _locationCount: number;
         private _locationDescription: string;
         private _agyLocId: string;
         private _stgId: number;

         get serialVersionUID(): number { return this._serialVersionUID; }
         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
         get locationCount(): number { return this._locationCount; }
         set locationCount(plocationCount: number) { this._locationCount = plocationCount; }
         get locationDescription(): string { return this._locationDescription; }
         set locationDescription(plocationDescription: string) { this._locationDescription = plocationDescription; }
         get agyLocId(): string { return this._agyLocId; }
         set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
         get stgId(): number { return this._stgId; }
         set stgId(pstgId: number) { this._stgId = pstgId; }

     toJSON(): any  {
         return  {
            'serialVersionUID': this._serialVersionUID,
            'locationCount': this._locationCount,
            'locationDescription': this._locationDescription,
            'agyLocId': this._agyLocId,
            'stgId': this._stgId,
             };
         }
 }
