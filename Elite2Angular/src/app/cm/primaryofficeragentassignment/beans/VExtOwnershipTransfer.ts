
export class VExtOwnershipTransfer {

	private _offenderIdDisplay: string;
	private _offenderLastName: string;
	private _offenderFirstName: string;
	private _assStaffId: number;	
	private _staffLastName: string;
	private _staffFirstName: string;
	private _staffName: string;
	private _agyLocIdTo: string;
	private _offenderBookId: number;
	private _v_offenderId: number;
	private _vOffenderFileSeq: number;

	private _extTransferId: number;
	private _agyLocIdFrom: string;
	private _transferDate: Date;
	private _transferFlag: string;
    private _description: string;
    private _code: string;
    private _VagylocIdTo: string;



     set VagylocIdTo(value: string) {
        this._VagylocIdTo = value;
    }
     get VagylocIdTo(): string {
        return this._VagylocIdTo;
    }

     set description(value: string) {
        this._description = value;
    }
     get description(): string {
        return this._description;
    }

     set code(value: string) {
        this._code = value;
    }
     get code(): string {
        return this._code;
    }
	
	
	 set assStaffId(value: number) {
		this._assStaffId = value;
	}
	 get assStaffId(): number {
		return this._assStaffId;
	}


  set offenderLastName(value: string) {
		this._offenderLastName = value;
	}
	get offenderLastName(): string {
		return this._offenderLastName;
	}
	set offenderFirstName(value: string) {
		this._offenderFirstName = value;
	}
	get offenderFirstName(): string {
		return this._offenderFirstName;
	}

	set offenderIdDisplay(value: string) { this._offenderIdDisplay = value;  }
	get offenderIdDisplay(): string { return this._offenderIdDisplay; }

	set staffLastName(value: string) {
		this._staffLastName = value;
	}
	get staffLastName(): string {
		return this._staffLastName;
	}
	set staffFirstName(value: string) {
		this._staffFirstName = value;
	}
	get staffFirstName(): string {
		return this._staffFirstName;
	}

	set staffName(value: string) {
		this._staffName = value;
	}
	get staffName(): string {
		return this._staffName;
	}
	set agyLocIdTo(value: string) {
		this._agyLocIdTo = value;
	}
	get agyLocIdTo(): string {
		return this._agyLocIdTo;
	}
	set offenderBookId(value: number) {
		this._offenderBookId = value;
	}
	get offenderBookId(): number {
		return this._offenderBookId;
	}

    set v_offenderId(value: number) {
		this._v_offenderId = value;
	}
	get v_offenderId(): number {
		return this._v_offenderId;   
	}

	set vOffenderFileSeq(value: number) {
		this._vOffenderFileSeq = value;
	}
	get vOffenderFileSeq(): number {
		return this._vOffenderFileSeq;
	}

	set extTransferId(value: number) {
		this._extTransferId = value;
	}
	get extTransferId(): number {
		return this._extTransferId;
	}
	set agyLocIdFrom(value: string) {
		this._agyLocIdFrom = value;
	}
	get agyLocIdFrom(): string {
		return this._agyLocIdFrom;
	}
	set transferDate(value: Date) {
		this._transferDate = value;
	}
	get transferDate(): Date {
		return this._transferDate;
	}
	set transferFlag(value: string) {
		this._transferFlag = value;
	}
	get transferFlag(): string {
		return this._transferFlag;
	}



	toJSON(): any {
		return {
			'offenderIdDisplay': this._offenderIdDisplay,
			'offenderLastName': this._offenderLastName,
			'offenderFirstName': this._offenderFirstName,
			'assStaffId': this._assStaffId,
			'staffLastName': this._staffLastName,
			'staffName': this._staffName,
			'staffFirstName': this._staffFirstName,
			'agyLocIdTo': this._agyLocIdTo,
			'offenderBookId': this._offenderBookId,
			'extTransferId': this._extTransferId,
			'agyLocIdFrom': this._agyLocIdFrom,
			'transferDate': this._transferDate,
			'transferFlag': this._transferFlag,
			'VagylocIdTo' : this._VagylocIdTo,
			'v_offenderId' : this._v_offenderId,
			'vOffenderFileSeq' : this._vOffenderFileSeq,
			'description' : this._description,
			'code' : this._code,

		};
	}
}
