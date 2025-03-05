import { BaseModel } from "@common/beans/BaseModel";

export class VStaffLocation extends BaseModel {

	private _supervisorFromDate: Date;
	private _supervisorRole: string;
	private _supervisorPosition: string;
	private _supervisorStaffId: number;
	private _fromDate: Date;
	private _hoursPerWeek: number;
	private _scheduleType: string;
	private _role: string;
	private _position: string;
	private _calAgyLocId: string;
	private _sexCode: string;
	private _name: string;
	private _staffId: number;
	private _supervisorAgyLocId: string;
	private _dspWorkFlowFlag: string;
	private _noOffender: number;

	get dspWorkFlowFlag(): string {
		return this._dspWorkFlowFlag;
	}
	  set dspWorkFlowFlag(value: string) {
		this._dspWorkFlowFlag = value;
	}

	  get noOffender(): number {
		return this._noOffender;
	}
	  set noOffender(value: number) {
		this._noOffender = value;
	}

	  get supervisorFromDate(): Date {
		return this._supervisorFromDate;
	}
	  set supervisorFromDate(value: Date) {
		this._supervisorFromDate = value;
	}

	  get supervisorRole(): string {
		return this._supervisorRole;
	}
	  set supervisorRole(value: string) {
		this._supervisorRole = value;
	}

	  set supervisorPosition(value: string) {
		this._supervisorPosition = value;
	}
	  get supervisorPosition(): string {
		return this._supervisorPosition;
	}

	  set supervisorStaffId(value: number) {
		this._supervisorStaffId = value;
	}
	  get supervisorStaffId(): number {
		return this._supervisorStaffId;
	}

	  set fromDate(value: Date) {
		this._fromDate = value;
	}
	  get fromDate(): Date {
		return this._fromDate;
	}

	  set hoursPerWeek(value: number) {
		this._hoursPerWeek = value;
	}
	  get hoursPerWeek(): number {
		return this._hoursPerWeek;
	}

	  set scheduleType(value: string) {
		this._scheduleType = value;
	}
	  get scheduleType(): string {
		return this._scheduleType;
	}

	  set role(value: string) {
		this._role = value;
	}
	  get role(): string {
		return this._role;
	}

	  set position(value: string) {
		this._position = value;
	}
	  get position(): string {
		return this._position;
	}

	  set calAgyLocId(value: string) {
		this._calAgyLocId = value;
	}
	  get calAgyLocId(): string {
		return this._calAgyLocId;
	}

	  set sexCode(value: string) {
		this._sexCode = value;
	}
	  get sexCode(): string {
		return this._sexCode;
	}

	  set name(value: string) {
		this._name = value;
	}
	  get name(): string {
		return this._name;
	}

	  set staffId(value: number) {
		this._staffId = value;
	}
	  get staffId(): number {
		return this._staffId;
	}

	  set supervisorAgyLocId(value: string) {
		this._supervisorAgyLocId = value;
	}
	  get supervisorAgyLocId(): string {
		return this._supervisorAgyLocId;
	}


	toJSON(): any {
		return {
			'supervisorFromDate': this._supervisorFromDate,
			'supervisorRole': this._supervisorRole,
			'supervisorPosition': this._supervisorPosition,
			'supervisorStaffId': this._supervisorStaffId,
			'fromDate': this._fromDate,
			'hoursPerWeek': this._hoursPerWeek,
			'scheduleType': this._scheduleType,
			'role': this._role,
			'position': this._position,
			'calAgyLocId': this._calAgyLocId,
			'sexCode': this._sexCode,
			'name': this._name,
			'staffId': this._staffId,
			'supervisorAgyLocId': this._supervisorAgyLocId,
			'dspWorkFlowFlag':this._dspWorkFlowFlag

		}

	}


}