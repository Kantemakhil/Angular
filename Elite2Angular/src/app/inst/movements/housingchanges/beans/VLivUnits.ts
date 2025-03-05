import {BaseModel} from '@commonbeans/BaseModel';
export class VLivUnits extends BaseModel {
		 private _level4Type: string;
		 private _level1Code: string;
		 private _level4Desc: string;
		 private _level1Type: string;
		 private _level1Desc: string;
		 private _level2Type: string;
		 private _description: string;
		 private _level3Code: string;
		 private _capacity: number;
		 private _livingUnitId: number;
		 private _serialVersionUID: number;
		 private _level3Type: string;
		 private _level3Desc: string;
		 private _level2Desc: string;
		 private _level2ListSeq: number;
		 private _agyLocId: string;
		 private _level2Code: string;
		 private _level4ListSeq: number;
		 private _level1ListSeq: number;
		 private _level3ListSeq: number;
		 private _level4Code: string;
		 private _activeFlag: string;

		 get level4Type(): string{ return  this._level4Type }

		 set level4Type(plevel4Type: string){ this._level4Type = plevel4Type }

		 get level1Code(): string{ return  this._level1Code }

		 set level1Code(plevel1Code: string){ this._level1Code = plevel1Code }

		 get level4Desc(): string{ return  this._level4Desc }

		 set level4Desc(plevel4Desc: string){ this._level4Desc = plevel4Desc }

		 get level1Type(): string{ return  this._level1Type }

		 set level1Type(plevel1Type: string){ this._level1Type = plevel1Type }

		 get level1Desc(): string{ return  this._level1Desc }

		 set level1Desc(plevel1Desc: string){ this._level1Desc = plevel1Desc }

		 get level2Type(): string{ return  this._level2Type }

		 set level2Type(plevel2Type: string){ this._level2Type = plevel2Type }

		 get description(): string{ return  this._description }

		 set description(pdescription: string){ this._description = pdescription }

		 get level3Code(): string{ return  this._level3Code }

		 set level3Code(plevel3Code: string){ this._level3Code = plevel3Code }

		 get capacity(): number{ return  this._capacity }

		 set capacity(pcapacity: number){ this._capacity = pcapacity }

		 get livingUnitId(): number{ return  this._livingUnitId }

		 set livingUnitId(plivingUnitId: number){ this._livingUnitId = plivingUnitId }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get level3Type(): string{ return  this._level3Type }

		 set level3Type(plevel3Type: string){ this._level3Type = plevel3Type }

		 get level3Desc(): string{ return  this._level3Desc }

		 set level3Desc(plevel3Desc: string){ this._level3Desc = plevel3Desc }

		 get level2Desc(): string{ return  this._level2Desc }

		 set level2Desc(plevel2Desc: string){ this._level2Desc = plevel2Desc }

		 get level2ListSeq(): number{ return  this._level2ListSeq }

		 set level2ListSeq(plevel2ListSeq: number){ this._level2ListSeq = plevel2ListSeq }

		 get agyLocId(): string{ return  this._agyLocId }

		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId }

		 get level2Code(): string{ return  this._level2Code }

		 set level2Code(plevel2Code: string){ this._level2Code = plevel2Code }

		 get level4ListSeq(): number{ return  this._level4ListSeq }

		 set level4ListSeq(plevel4ListSeq: number){ this._level4ListSeq = plevel4ListSeq }

		 get level1ListSeq(): number{ return  this._level1ListSeq }

		 set level1ListSeq(plevel1ListSeq: number){ this._level1ListSeq = plevel1ListSeq }

		 get level3ListSeq(): number{ return  this._level3ListSeq }

		 set level3ListSeq(plevel3ListSeq: number){ this._level3ListSeq = plevel3ListSeq }

		 get level4Code(): string{ return  this._level4Code }

		 set level4Code(plevel4Code: string){ this._level4Code = plevel4Code }

		 get activeFlag(): string{ return  this._activeFlag }

		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag }


 	toJSON(): any {
 		return { 
			'level4Type': this._level4Type,
			'level1Code': this._level1Code,
			'level4Desc': this._level4Desc,
			'level1Type': this._level1Type,
			'level1Desc': this._level1Desc,
			'level2Type': this._level2Type,
			'description': this._description,
			'level3Code': this._level3Code,
			'capacity': this._capacity,
			'livingUnitId': this._livingUnitId,
			'serialVersionUID': this._serialVersionUID,
			'level3Type': this._level3Type,
			'level3Desc': this._level3Desc,
			'level2Desc': this._level2Desc,
			'level2ListSeq': this._level2ListSeq,
			'agyLocId': this._agyLocId,
			'level2Code': this._level2Code,
			'level4ListSeq': this._level4ListSeq,
			'level1ListSeq': this._level1ListSeq,
			'level3ListSeq': this._level3ListSeq,
			'level4Code': this._level4Code,
			'activeFlag': this._activeFlag,
 			};
 		}  
 }