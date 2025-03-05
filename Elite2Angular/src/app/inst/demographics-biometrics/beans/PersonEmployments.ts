	export class PersonEmployments {
		 private _supervisorName: string;
		 private _createUserId: string;
		 private _city: string;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _employerName: string;
		 private _contactType: string;
		 private _commentText: string;
		 private _hoursWeek: number;
		 private _employmentSeq: number;
		 private _terminationDate: Date;
		 private _serialVersionUID: number;
		 private _contactNumber: string;
		 private _format: string;
		 private _sealFlag: string;
		 private _activeFlag: string;
		 private _wage: string;
		 private _phoneExt: string;
		 private _address: string;
		 private _address2: string;
		 private _address1: string;
		 private _employmentDate: Date;
		 private _createDatetime: Date;
		 private _wagePeriodCode: string;
		 private _occupationCode: string;
		 private _scheduleType: string;
		 private _phoneArea: string;
		 private _personId: number;
		 private _provStateCode: string;

		 get supervisorName(): string{ return  this._supervisorName }

		 set supervisorName(psupervisorName: string){ this._supervisorName = psupervisorName }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get city(): string{ return  this._city }

		 set city(pcity: string){ this._city = pcity }

		 get modifyDatetime(): Date{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get employerName(): string{ return  this._employerName }

		 set employerName(pemployerName: string){ this._employerName = pemployerName }

		 get contactType(): string{ return  this._contactType }

		 set contactType(pcontactType: string){ this._contactType = pcontactType }

		 get commentText(): string{ return  this._commentText }

		 set commentText(pcommentText: string){ this._commentText = pcommentText }

		 get hoursWeek(): number{ return  this._hoursWeek }

		 set hoursWeek(phoursWeek: number){ this._hoursWeek = phoursWeek }

		 get employmentSeq(): number{ return  this._employmentSeq }

		 set employmentSeq(pemploymentSeq: number){ this._employmentSeq = pemploymentSeq }

		 get terminationDate(): Date{ return  this._terminationDate }

		 set terminationDate(pterminationDate: Date){ this._terminationDate = pterminationDate }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get contactNumber(): string{ return  this._contactNumber }

		 set contactNumber(pcontactNumber: string){ this._contactNumber = pcontactNumber }

		 get format(): string{ return  this._format }

		 set format(format: string){ this._format = format }

		 get sealFlag(): string{ return  this._sealFlag }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }

		 get activeFlag(): string{ return  this._activeFlag }

		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag }

		 get wage(): string{ return  this._wage }

		 set wage(pwage: string){ this._wage = pwage }

		 get phoneExt(): string{ return  this._phoneExt }

		 set phoneExt(pphoneExt: string){ this._phoneExt = pphoneExt }

		 get address(): string{ return  this._address }

		 set address(paddress: string){ this._address = paddress }

		 get address2(): string{ return  this._address2 }

		 set address2(paddress2: string){ this._address2 = paddress2 }

		 get address1(): string{ return  this._address1 }

		 set address1(paddress1: string){ this._address1 = paddress1 }

		 get employmentDate(): Date{ return  this._employmentDate }

		 set employmentDate(pemploymentDate: Date){ this._employmentDate = pemploymentDate }

		 get createDatetime(): Date{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime }

		 get wagePeriodCode(): string{ return  this._wagePeriodCode }

		 set wagePeriodCode(pwagePeriodCode: string){ this._wagePeriodCode = pwagePeriodCode }

		 get occupationCode(): string{ return  this._occupationCode }

		 set occupationCode(poccupationCode: string){ this._occupationCode = poccupationCode }

		 get scheduleType(): string{ return  this._scheduleType }

		 set scheduleType(pscheduleType: string){ this._scheduleType = pscheduleType }

		 get phoneArea(): string{ return  this._phoneArea }

		 set phoneArea(pphoneArea: string){ this._phoneArea = pphoneArea }

		 get personId(): number{ return  this._personId }

		 set personId(ppersonId: number){ this._personId = ppersonId }

		 get provStateCode(): string{ return  this._provStateCode }

		 set provStateCode(pprovStateCode: string){ this._provStateCode = pprovStateCode }


 	toJSON(): any {
 		return { 
			'supervisorName': this._supervisorName,
			'createUserId': this._createUserId,
			'city': this._city,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'employerName': this._employerName,
			'contactType': this._contactType,
			'commentText': this._commentText,
			'hoursWeek': this._hoursWeek,
			'employmentSeq': this._employmentSeq,
			'terminationDate': this._terminationDate,
			'serialVersionUID': this._serialVersionUID,
			'contactNumber': this._contactNumber,
			'format': this._format,
			'sealFlag': this._sealFlag,
			'activeFlag': this._activeFlag,
			'wage': this._wage,
			'phoneExt': this._phoneExt,
			'address': this._address,
			'address2': this._address2,
			'address1': this._address1,
			'employmentDate': this._employmentDate,
			'createDatetime': this._createDatetime,
			'wagePeriodCode': this._wagePeriodCode,
			'occupationCode': this._occupationCode,
			'scheduleType': this._scheduleType,
			'phoneArea': this._phoneArea,
			'personId': this._personId,
			'provStateCode': this._provStateCode,
 			};
 		}  
 }