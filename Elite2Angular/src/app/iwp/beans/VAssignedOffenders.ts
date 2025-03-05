import { BaseModel } from "@common/beans/BaseModel";

export class VAssignedOffenders extends BaseModel {
   
    private _calAgyLocId: string;
    private  _endDate: Date;
    private  _casePlanStatus: string;
    private  _sacStaffId: number;
    private  _role: string;
    private  _position: string;
    private  _startDate: Date;
    private  _offenderStatus: string;
    private _supervisionLevel: string;
    private _sexCode: string;
    private _middleName: string;
    private _firstName: string;
    private _lastName: string;
    private _offenderBookId: number;
    private _offenderIdDisplay: string;

    private _caseType: string;
    private _imageData: any;
     

    public get caseType(): string {
        return this._caseType;
    }
    public set caseType(value: string) {
        this._caseType = value;
    }
   
   
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }


    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }

    public get offenderBookId(): number {
        return this._offenderBookId;
    }
    public set offenderBookId(value: number) {
        this._offenderBookId = value;
    }

    public get offenderIdDisplay(): string {
        return this._offenderIdDisplay;
    }
    public set offenderIdDisplay(value: string) {
        this._offenderIdDisplay = value;
    }

    get role(): string { return this._role; }
    set role(prole: string) { this._role = prole; }

    get calAgyLocId(): string { return this._calAgyLocId; }
    set calAgyLocId(pCalAgyLocId: string) { this._calAgyLocId = pCalAgyLocId; }

    get endDate(): Date { return this._endDate; }
    set endDate(pendDate: Date) { this._endDate = pendDate; }

    get casePlanStatus(): string { return this._casePlanStatus; }
    set casePlanStatus(pCasePlanStatus: string) { this._casePlanStatus = pCasePlanStatus; }

    get sacStaffId(): number { return this._sacStaffId; }
    set sacStaffId(psacStaffId: number) { this._sacStaffId = psacStaffId; }

    get position(): string { return this._position; }
    set position(pendDate: string) { this._position = pendDate; }

    get startDate(): Date { return this._startDate; }
    set startDate(pstartDate: Date) { this._startDate = pstartDate; }

    get offenderStatus(): string { return this._offenderStatus; }
    set offenderStatus(pendDate: string) { this._offenderStatus = pendDate; }

      get sexCode(): string {
        return this._sexCode;
    }
      set sexCode(value: string) {
        this._sexCode = value;
    }

      get supervisionLevel(): string {
        return this._supervisionLevel;
    }
      set supervisionLevel(value: string) {
        this._supervisionLevel = value;
    }

      get middleName(): string {
        return this._middleName;
    }
      set middleName(value: string) {
        this._middleName = value;
    }

    get imageData(): any {
        return this.imageData;
    }

    set imageData(pimageData: any) {
        this.imageData = pimageData;
    }

        

   toJSON(): any{
	return{
		'calAgyLocId': this._calAgyLocId,
		'endDate': this._endDate,
		'firstName': this._firstName,
		'lastName' :this._lastName,
		'offenderBookId':this._offenderBookId,
		'offenderIdDisplay' :this._offenderIdDisplay,
		'role' : this._role,
		'casePlanStatus' : this._casePlanStatus,
		'sacStaffId' : this._sacStaffId,
		'position' : this._position,
		'startDate' : this._startDate,
		'offenderStatus' : this._offenderStatus,
		'sexCode' : this._sexCode,
		'supervisionLevel' : this._supervisionLevel,
        'middleName' : this._middleName,
        'imageData': this._imageData,
		
	}
}

    
}