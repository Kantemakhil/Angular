export class SelectVehiclesV1 {
    private _optimumCapacity: number;
    private _butProfileExit: number;
    private _physicalCapacity: number;
    private _assetId: number;
    private _description: string;
    private _modelNo:string;
    private _vehicleId: number;
    private _type: string;
    private _make:string;
    private _butSelect: number;
    private _scheduledTripId: number;
    private _moduleName: any;
    private _formModuleName: any;
   
    

    get optimumCapacity(): number{ return this._optimumCapacity; }
    set optimumCapacity(poptimumCapacity: number){ this._optimumCapacity = poptimumCapacity ;}
    get butProfileExit(): number{ return this._butProfileExit; }
    set butProfileExit(pbutProfileExit: number){ this._butProfileExit = pbutProfileExit ;}
    get physicalCapacity(): number{ return this._physicalCapacity; }
    set physicalCapacity(pphysicalCapacity: number){ this._physicalCapacity = pphysicalCapacity ;}
    get assetId(): number{ return this._assetId; }
    set assetId(passetId: number){ this._assetId = passetId ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get modelNo():string{ return this._modelNo; }
    set modelNo(pmodelNo: string){ this._modelNo = pmodelNo ;}
    get vehicleId(): number{ return this._vehicleId; }
    set vehicleId(pvehicleId: number){ this._vehicleId = pvehicleId ;}
    get type(): string{ return this._type; }
    set type(ptype: string){ this._type = ptype ;}
    get make():string{ return this._make; }
    set make(pmake: string){ this._make = pmake ;}
    get butSelect(): number{ return this._butSelect; }
    set butSelect(pbutSelect: number){ this._butSelect = pbutSelect ;}
    get scheduledTripId(): number{ return this._scheduledTripId; }
    set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
    get moduleName(): any{ return this._moduleName; }
    set moduleName(pmoduleName: any){ this._moduleName = pmoduleName ;}
    get formModuleName(): any{ return this._formModuleName; }
    set formModuleName(pformModuleName: any){ this._formModuleName = pformModuleName ;}

    
toJSON(): any {
    return { 
       'optimumCapacity': this._optimumCapacity,
       'butProfileExit': this._butProfileExit,
       'physicalCapacity': this._physicalCapacity,
       'assetId': this._assetId,
       'description': this._description,
       'modelNo': this._modelNo,
       'vehicleId': this._vehicleId,
       'type': this._type,
       'make': this._make,
       'butSelect': this._butSelect,
       'scheduledTripId':this._scheduledTripId,
       'moduleName':this._moduleName,
       'formModuleName':this._formModuleName,
   

        };
    } 
}
