	export class VLivingUnitSummaries {
		 private _level1Code: String;
		 private _livingUnitTypeDesc: String;
		 private _livingUnitDesc: String;
		 private _level3Code: String;
		 private _reservedBeds: number;
		 private _userDesc: String;
		 private _inLivingUnits: number;
		 private _capacity: number;
		 private _livingUnitId: number;
		 private _parentLivingUnitId: number;
		 private _deactivateDate: Date;
		 private _outOfAgy: number;
		 private _agyLocId: String;
		 private _listSeq: number;
		 private _livingUnitType: String;
		 private _outOfLivingUnits: number;
		 private _level2Code: String;
		 private _vacancy: number;
		 private _level4Code: String;
		 private _filledFlag: String;
		 private _activeFlag: String;
		 private _allocated: number;
	     private _nextButton: String;

		 get level1Code(): String{ return this._level1Code; }
		 set level1Code(plevel1Code: String){ this._level1Code = plevel1Code ;}
		 get livingUnitTypeDesc(): String{ return this._livingUnitTypeDesc; }
		 set livingUnitTypeDesc(plivingUnitTypeDesc: String){ this._livingUnitTypeDesc = plivingUnitTypeDesc ;}
		 get livingUnitDesc(): String{ return this._livingUnitDesc; }
		 set livingUnitDesc(plivingUnitDesc: String){ this._livingUnitDesc = plivingUnitDesc ;}
		 get level3Code(): String{ return this._level3Code; }
		 set level3Code(plevel3Code: String){ this._level3Code = plevel3Code ;}
		 get reservedBeds(): number{ return this._reservedBeds; }
		 set reservedBeds(preservedBeds: number){ this._reservedBeds = preservedBeds ;}
		 get userDesc(): String{ return this._userDesc; }
		 set userDesc(puserDesc: String){ this._userDesc = puserDesc ;}
		 get inLivingUnits(): number{ return this._inLivingUnits; }
		 set inLivingUnits(pinLivingUnits: number){ this._inLivingUnits = pinLivingUnits ;}
		 get capacity(): number{ return this._capacity; }
		 set capacity(pcapacity: number){ this._capacity = pcapacity ;}
		 get livingUnitId(): number{ return this._livingUnitId; }
		 set livingUnitId(plivingUnitId: number){ this._livingUnitId = plivingUnitId ;}
		 get parentLivingUnitId(): number{ return this._parentLivingUnitId; }
		 set parentLivingUnitId(pparentLivingUnitId: number){ this._parentLivingUnitId = pparentLivingUnitId ;}
		 get deactivateDate(): Date{ return this._deactivateDate; }
		 set deactivateDate(pdeactivateDate: Date){ this._deactivateDate = pdeactivateDate ;}
		 get outOfAgy(): number{ return this._outOfAgy; }
		 set outOfAgy(poutOfAgy: number){ this._outOfAgy = poutOfAgy ;}
		 get agyLocId(): String{ return this._agyLocId; }
		 set agyLocId(pagyLocId: String){ this._agyLocId = pagyLocId ;}
		 get listSeq(): number{ return this._listSeq; }
		 set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
		 get livingUnitType(): String{ return this._livingUnitType; }
		 set livingUnitType(plivingUnitType: String){ this._livingUnitType = plivingUnitType ;}
		 get outOfLivingUnits(): number{ return this._outOfLivingUnits; }
		 set outOfLivingUnits(poutOfLivingUnits: number){ this._outOfLivingUnits = poutOfLivingUnits ;}
		 get level2Code(): String{ return this._level2Code; }
		 set level2Code(plevel2Code: String){ this._level2Code = plevel2Code ;}
		 get vacancy(): number{ return this._vacancy; }
		 set vacancy(pvacancy: number){ this._vacancy = pvacancy ;}
		 get level4Code(): String{ return this._level4Code; }
		 set level4Code(plevel4Code: String){ this._level4Code = plevel4Code ;}
		 get filledFlag(): String{ return this._filledFlag; }
		 set filledFlag(pfilledFlag: String){ this._filledFlag = pfilledFlag ;}
		 get activeFlag(): String{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: String){ this._activeFlag = pactiveFlag ;}
		 get allocated(): number{ return this._allocated; }
		 set allocated(pallocated: number){ this._allocated = pallocated ;}
		 get nextButton(): String{ return this._nextButton; }
         set nextButton(pnextButton: String){ this._nextButton = pnextButton ;}

 	toJSON(): any {
 		return { 
			'level1Code': this._level1Code,
			'livingUnitTypeDesc': this._livingUnitTypeDesc,
			'livingUnitDesc': this._livingUnitDesc,
			'level3Code': this._level3Code,
			'reservedBeds': this._reservedBeds,
			'userDesc': this._userDesc,
			'inLivingUnits': this._inLivingUnits,
			'capacity': this._capacity,
			'livingUnitId': this._livingUnitId,
			'parentLivingUnitId': this._parentLivingUnitId,
			'deactivateDate': this._deactivateDate,
			'outOfAgy': this._outOfAgy,
			'agyLocId': this._agyLocId,
			'listSeq': this._listSeq,
			'livingUnitType': this._livingUnitType,
			'outOfLivingUnits': this._outOfLivingUnits,
			'level2Code': this._level2Code,
			'vacancy': this._vacancy,
			'level4Code': this._level4Code,
			'filledFlag': this._filledFlag,
			'activeFlag': this._activeFlag,
			'nextButton': this._nextButton,
			'allocated': this._allocated,
 			};
 		}  
 }