import { BaseModel } from "@common/beans/BaseModel";

export class Vehicles extends BaseModel{

    private _createDatetime: Date;
    private _createUserId: string;
    private _fuelType: string;
    private _plateNo: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _vehicleId: number;
    private _licenceClass: string;
    private _sealFlag: string;
    private _remarks: string;
    private _capacity: number;
	private _optimalCapacity: number;
    private _lvExist: number;	
    

    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get fuelType(): string{ return this._fuelType; }
    set fuelType(pfuelType: string){ this._fuelType = pfuelType ;}
    get plateNo(): string{ return this._plateNo; }
    set plateNo(pplateNo: string){ this._plateNo = pplateNo ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get vehicleId(): number{ return this._vehicleId; }
    set vehicleId(pvehicleId: number){ this._vehicleId = pvehicleId ;}
    get licenceClass(): string{ return this._licenceClass; }
    set licenceClass(plicenceClass: string){ this._licenceClass = plicenceClass ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get remarks(): string{ return this._remarks; }
    set remarks(premarks: string){ this._remarks = premarks ;}
    get capacity(): number{ return this._capacity; }
    set capacity(pcapacity: number){ this._capacity = pcapacity ;}
    get optimalCapacity(): number { return this._optimalCapacity;}
    set optimalCapacity(value: number) { this._optimalCapacity = value;}
    get lvExist(): number {return this._lvExist;}
    set lvExist(value: number) {this._lvExist = value;}

toJSON(): any {
    return { 
       'createDatetime': this._createDatetime,
       'createUserId': this._createUserId,
       'fuelType': this._fuelType,
       'plateNo': this._plateNo,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'vehicleId': this._vehicleId,
       'licenceClass': this._licenceClass,
       'sealFlag': this._sealFlag,
       'remarks': this._remarks,
       'capacity': this._capacity,
       'optimalCapacity' : this._optimalCapacity,
       'lvExist' : this._lvExist,
        };
    } 
 
}