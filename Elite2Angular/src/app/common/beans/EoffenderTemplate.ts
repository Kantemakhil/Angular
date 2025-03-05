import { BaseModel } from './BaseModel';

export class EoffenderTemplate extends BaseModel {

    private _templateDesription: string;
    private _templateId: number;

    public get templateDesription(): string {
        return this._templateDesription;
    }
    public set templateDesription( value: string ) {
        this._templateDesription = value;
    }

    public get templateId(): number {
        return this._templateId;
    }
    public set templateId( value: number ) {
        this._templateId = value;
    }

}