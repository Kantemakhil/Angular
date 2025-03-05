import { BaseModel } from './BaseModel';

export class Facility extends BaseModel {

   
    private _description: string;
    private _facilityCode: string;
    

    get description(): string { return this._description; }

    set description( sdescription: string ) { this._description = sdescription; }

    get facilityCode(): string { return this._facilityCode; }

    set facilityCode( sfacilityCode: string ) { this._facilityCode = sfacilityCode; }

    toJSON(): any {
        return {
            
            'description': this._description,
            'facilityCode': this._facilityCode,
            
        };
    }
}
