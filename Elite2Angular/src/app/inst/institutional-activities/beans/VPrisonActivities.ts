import { BaseModel } from '@commonbeans/BaseModel';
export class VPrisonActivities extends BaseModel {
    private _code: string;
    private _activity: string;
    private _programCode: string;
    private _description: string;
    private _internalLocationDesc: string;
    private _serialVersionUID: number;
    private _scheduleEndDate: number;
    private _scheduleStartDate: number;
    private _service: string;
    private _crsActyId: number;
    private _agyLocId: string;
    private _listSeq: number;
    private _internalLocationId: number;
    private _programId: number;
    private _activeFlag: string;
    private _agyLocDesc: string;

    get code(): string{ return this._code; }
    set code(pcode: string){ this._code = pcode ;}
    get activity(): string{ return this._activity; }
    set activity(pactivity: string){ this._activity = pactivity ;}
    get programCode(): string{ return this._programCode; }
    set programCode(pprogramCode: string){ this._programCode = pprogramCode ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
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
    get crsActyId(): number{ return this._crsActyId; }
    set crsActyId(pcrsActyId: number){ this._crsActyId = pcrsActyId ;}
    get agyLocId(): string{ return this._agyLocId; }
    set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
    get listSeq(): number{ return this._listSeq; }
    set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
    get internalLocationId(): number{ return this._internalLocationId; }
    set internalLocationId(pinternalLocationId: number){ this._internalLocationId = pinternalLocationId ;}
    get programId(): number{ return this._programId; }
    set programId(pprogramId: number){ this._programId = pprogramId ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get agyLocDesc(): string{ return this._agyLocDesc; }
    set agyLocDesc(pagyLocDesc: string){ this._agyLocDesc = pagyLocDesc ;}

toJSON(): any {
    return { 
       'code': this._code,
       'activity': this._activity,
       'programCode': this._programCode,
       'description': this._description,
       'internalLocationDesc': this._internalLocationDesc,
       'serialVersionUID': this._serialVersionUID,
       'scheduleEndDate': this._scheduleEndDate,
       'scheduleStartDate': this._scheduleStartDate,
       'service': this._service,
       'crsActyId': this._crsActyId,
       'agyLocId': this._agyLocId,
       'listSeq': this._listSeq,
       'internalLocationId': this._internalLocationId,
       'programId': this._programId,
       'activeFlag': this._activeFlag,
       'agyLocDesc': this._agyLocDesc,
        };
    } 
}
