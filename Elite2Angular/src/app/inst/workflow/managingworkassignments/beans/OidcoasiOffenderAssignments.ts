export class OidcoasiOffenderAssignments {
	private _livingUnitCodeTwo: string;
	private _lastName: string;
	private _assignOfficerFirstName: string;
	private _confirmationFlag: string;
	private _confirmationFlagOne: boolean;
	private _unassignedFlag: string;
	private _confirmationAllFlag: string;
	private _staffLastName: string;
	private _caseAssignedTime: Date;
	private _currentOfficerLastName: string;
	private _movementTime: Date;
	private _livingUnitDesc: string;
	private _movementDate: Date;
	private _livingUnitCodethree: string;
	private _currentOfficerStaffId: number;
	private _caseAssignedDate: Date;
	private _livingUnitCodeFour: string;
	private _firstName: string;
	private _agyLocDescription: string;
	private _caseOfficerId: number;
	private _staffFirstName: string;
	private _currentOfficerFirstName: string;
	private _agyLocId: string;
	private _assignOfficerLastName: string;
	private _assignOfficerStaffId: number;
	private _offenderId: string;
	private _livingUnitCodeOne: string;
	private _sealFlag: string;
	private _user: string;


	get user(): string { return this._user; }
	set user(puser: string) { this._user = puser; }
	get sealFlag(): string { return this._sealFlag; }
	set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
	get livingUnitCodeTwo(): string { return this._livingUnitCodeTwo; }
	set livingUnitCodeTwo(plivingUnitCodeTwo: string) { this._livingUnitCodeTwo = plivingUnitCodeTwo; }
	get lastName(): string { return this._lastName; }
	set lastName(plastName: string) { this._lastName = plastName; }
	get assignOfficerFirstName(): string { return this._assignOfficerFirstName; }
	set assignOfficerFirstName(passignOfficerFirstName: string) { this._assignOfficerFirstName = passignOfficerFirstName; }
	get confirmationFlag(): string { return this._confirmationFlag; }
	set confirmationFlag(pconfirmationFlag: string) { this._confirmationFlag = pconfirmationFlag; }
	get confirmationFlagOne(): boolean { return this._confirmationFlagOne; }
	set confirmationFlagOne(pconfirmationFlagOne: boolean) { this._confirmationFlagOne = pconfirmationFlagOne; }
	get unassignedFlag(): string { return this._unassignedFlag; }
	set unassignedFlag(punassignedFlag: string) { this._unassignedFlag = punassignedFlag; }
	get confirmationAllFlag(): string { return this._confirmationAllFlag; }
	set confirmationAllFlag(pconfirmationAllFlag: string) { this._confirmationAllFlag = pconfirmationAllFlag; }
	get staffLastName(): string { return this._staffLastName; }
	set staffLastName(pstaffLastName: string) { this._staffLastName = pstaffLastName; }
	get caseAssignedTime(): Date { return this._caseAssignedTime; }
	set caseAssignedTime(pcaseAssignedTime: Date) { this._caseAssignedTime = pcaseAssignedTime; }
	get currentOfficerLastName(): string { return this._currentOfficerLastName; }
	set currentOfficerLastName(pcurrentOfficerLastName: string) { this._currentOfficerLastName = pcurrentOfficerLastName; }
	get movementTime(): Date { return this._movementTime; }
	set movementTime(pmovementTime: Date) { this._movementTime = pmovementTime; }
	get livingUnitDesc(): string { return this._livingUnitDesc; }
	set livingUnitDesc(plivingUnitDesc: string) { this._livingUnitDesc = plivingUnitDesc; }
	get movementDate(): Date { return this._movementDate; }
	set movementDate(pmovementDate: Date) { this._movementDate = pmovementDate; }
	get livingUnitCodethree(): string { return this._livingUnitCodethree; }
	set livingUnitCodethree(plivingUnitCodethree: string) { this._livingUnitCodethree = plivingUnitCodethree; }
	get currentOfficerStaffId(): number { return this._currentOfficerStaffId; }
	set currentOfficerStaffId(pcurrentOfficerStaffId: number) { this._currentOfficerStaffId = pcurrentOfficerStaffId; }
	get caseAssignedDate(): Date { return this._caseAssignedDate; }
	set caseAssignedDate(pcaseAssignedDate: Date) { this._caseAssignedDate = pcaseAssignedDate; }
	get livingUnitCodeFour(): string { return this._livingUnitCodeFour; }
	set livingUnitCodeFour(plivingUnitCodeFour: string) { this._livingUnitCodeFour = plivingUnitCodeFour; }
	get firstName(): string { return this._firstName; }
	set firstName(pfirstName: string) { this._firstName = pfirstName; }
	get agyLocDescription(): string { return this._agyLocDescription; }
	set agyLocDescription(pagyLocDescription: string) { this._agyLocDescription = pagyLocDescription; }
	get caseOfficerId(): number { return this._caseOfficerId; }
	set caseOfficerId(pcaseOfficerId: number) { this._caseOfficerId = pcaseOfficerId; }
	get staffFirstName(): string { return this._staffFirstName; }
	set staffFirstName(pstaffFirstName: string) { this._staffFirstName = pstaffFirstName; }
	get currentOfficerFirstName(): string { return this._currentOfficerFirstName; }
	set currentOfficerFirstName(pcurrentOfficerFirstName: string) { this._currentOfficerFirstName = pcurrentOfficerFirstName; }
	get agyLocId(): string { return this._agyLocId; }
	set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
	get assignOfficerLastName(): string { return this._assignOfficerLastName; }
	set assignOfficerLastName(passignOfficerLastName: string) { this._assignOfficerLastName = passignOfficerLastName; }
	get assignOfficerStaffId(): number { return this._assignOfficerStaffId; }
	set assignOfficerStaffId(passignOfficerStaffId: number) { this._assignOfficerStaffId = passignOfficerStaffId; }
	get offenderId(): string { return this._offenderId; }
	set offenderId(poffenderId: string) { this._offenderId = poffenderId; }
	get livingUnitCodeOne(): string { return this._livingUnitCodeOne; }
	set livingUnitCodeOne(plivingUnitCodeOne: string) { this._livingUnitCodeOne = plivingUnitCodeOne; }

	toJSON(): any {
		return {
			'livingUnitCodeTwo': this._livingUnitCodeTwo,
			'lastName': this._lastName,
			'assignOfficerFirstName': this._assignOfficerFirstName,
			'confirmationFlag': this._confirmationFlag,
			'staffLastName': this._staffLastName,
			'caseAssignedTime': this._caseAssignedTime,
			'currentOfficerLastName': this._currentOfficerLastName,
			'movementTime': this._movementTime,
			'livingUnitDesc': this._livingUnitDesc,
			'movementDate': this._movementDate,
			'livingUnitCodethree': this._livingUnitCodethree,
			'currentOfficerStaffId': this._currentOfficerStaffId,
			'caseAssignedDate': this._caseAssignedDate,
			'livingUnitCodeFour': this._livingUnitCodeFour,
			'firstName': this._firstName,
			'agyLocDescription': this._agyLocDescription,
			'caseOfficerId': this._caseOfficerId,
			'staffFirstName': this._staffFirstName,
			'currentOfficerFirstName': this._currentOfficerFirstName,
			'agyLocId': this._agyLocId,
			'assignOfficerLastName': this._assignOfficerLastName,
			'assignOfficerStaffId': this._assignOfficerStaffId,
			'offenderId': this._offenderId,
			'livingUnitCodeOne': this._livingUnitCodeOne,
			'sealFlag': this._sealFlag,
			'confirmationAllFlag': this._confirmationAllFlag,
			'unassignedFlag': this._unassignedFlag,
			'user': this.user,
			'confirmationFlagOne': this._confirmationFlagOne,
		};
	}
}