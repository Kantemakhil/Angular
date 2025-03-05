import {BaseModel} from '@commonbeans/BaseModel'

export class OrderType extends BaseModel {

   
    private _description: string;
    private _orderType: string;
    

    get description(): string { return this._description; }

    set description( sdescription: string ) { this._description = sdescription; }

    get orderType(): string { return this._orderType; }

    set orderType(orderType: string ) { this._orderType = orderType; }

    toJSON(): any {
        return {
            
            'description': this._description,
            'orderType': this._orderType,
            
        };
    }
}