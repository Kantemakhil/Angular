import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderCondTransfer extends BaseModel {
    private _createUserId: string;
		 private _offenderBookId: number;
		 private _teamMemberId: number;
		 private _modifyUserId: string;
		 private _toTeamId: number;
		 private _toAgyLocId: string;
		 private _createDateTime: Date;
		 private _serialVersionUID: number;
		 private _modifyDateTime: Date;
		 private _teamId: number;
		 private _offenderSentConditionId: number;
		 private _agyLocId: string;
		 private _conTransferId: number;
		 private _sealFlag: string;
		 private _staffId: number;
		 private _condiStatus: string;
		 private _listSeq: number;
		 private _toStaffId: number;
		 private _toTeamMemberId: number;
		 private _transferFlag: boolean;
		 private _parentCondTransferId: number;
		 private _prvsAllocOfficer: number;
		 private _prvsAllocToOfficer: number;
		 private _prvsAllocAgyLocId: string;
		 private _prvsAllocToAgyLocId: string;
		 private _prvsAllocTeamId: number;
		 private _prvsAllocToTeamId: number;
		 private _prvsAllocTeamMemberId: number;
		 private _prvsAllocToTeamMemberId: number;
		 private _assgnTeamCount: number;
		 private _sentenceSeq: number;
		 private _moduleId: String;
		 private _rcvdFromLoc: String;
		 private _rcvdFromTeam: number;
	     
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get teamMemberId(): number{ return this._teamMemberId; }
		 set teamMemberId(pteamMemberId: number){ this._teamMemberId = pteamMemberId ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get createDateTime(): Date{ return this._createDateTime; }
		 set createDateTime(pcreateDateTime: Date){ this._createDateTime = pcreateDateTime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get modifyDateTime(): Date{ return this._modifyDateTime; }
		 set modifyDateTime(pmodifyDateTime: Date){ this._modifyDateTime = pmodifyDateTime ;}
		 get teamId(): number{ return this._teamId; }
		 set teamId(pteamId: number){ this._teamId = pteamId ;}
		 get offenderSentConditionId(): number{ return this._offenderSentConditionId; }
		 set offenderSentConditionId(poffenderSentConditionId: number){ this._offenderSentConditionId = poffenderSentConditionId ;}
		 get agyLocId(): string{ return this._agyLocId; }
		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
		 get conTransferId(): number{ return this._conTransferId; }
		 set conTransferId(pconTransferId: number){ this._conTransferId = pconTransferId ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get staffId(): number{ return this._staffId; }
		 set staffId(pstaffId: number){ this._staffId = pstaffId ;}
		 get condiStatus(): string{ return this._condiStatus; }
		 set condiStatus(pcondiStatus: string){ this._condiStatus = pcondiStatus ;}
		 get listSeq(): number{ return this._listSeq; }
		 set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
		 get toTeamId(): number { return this._toTeamId; }
		 set toTeamId(value: number) { this._toTeamId = value; }
		 get toAgyLocId(): string { return this._toAgyLocId; }
		 set toAgyLocId(value: string) { this._toAgyLocId = value; }
		 get toStaffId(): number { return this._toStaffId; }
		 set toStaffId(value: number) { this._toStaffId = value;	}
		 get toTeamMemberId(): number { return this._toTeamMemberId;	}
		 set toTeamMemberId(value: number) { this._toTeamMemberId = value; }
		 get transferFlag(): boolean { return this._transferFlag; }
  		 set transferFlag(ptransferFlag: boolean) { this._transferFlag = ptransferFlag; }
		 get parentCondTransferId(): number { return this._parentCondTransferId; }
		 set parentCondTransferId(value: number) { this._parentCondTransferId = value; }
		 get prvsAllocOfficer(): number { return this._prvsAllocOfficer; }
     	 set prvsAllocOfficer(prvsAllocOfficer: number) { this._prvsAllocOfficer = prvsAllocOfficer; }
     	 get prvsAllocToOfficer(): number { return this._prvsAllocToOfficer; }
     	 set prvsAllocToOfficer(_prvsAlloctedToOfficer: number) { this._prvsAllocToOfficer = _prvsAlloctedToOfficer; }
     	 get prvsAllocAgyLocId(): string { return this._prvsAllocAgyLocId; }
     	 set prvsAllocAgyLocId(_prvsAllocAgyLocId: string) { this._prvsAllocAgyLocId = _prvsAllocAgyLocId; }
     	 get prvsAllocToAgyLocId(): string { return this._prvsAllocToAgyLocId; }
     	 set prvsAllocToAgyLocId(_prvsAllocToAgyLocId: string) { this._prvsAllocToAgyLocId = _prvsAllocToAgyLocId; }
     	 get prvsAllocTeamId(): number { return this._prvsAllocTeamId; }
     	 set prvsAllocTeamId(_prvsAllocTeamId: number) { this._prvsAllocTeamId = _prvsAllocTeamId; }
     	 get prvsAllocToTeamId(): number { return this._prvsAllocToTeamId; }
     	 set prvsAllocToTeamId(_prvsAllocToTeamId: number) { this._prvsAllocToTeamId = _prvsAllocToTeamId; }
     	 get prvsAllocTeamMemberId(): number { return this._prvsAllocTeamMemberId; }
     	 set prvsAllocTeamMemberId(_prvsAllocTeamMemberId: number) {  this._prvsAllocTeamMemberId = _prvsAllocTeamMemberId; }
     	 get prvsAllocToTeamMemberId(): number { return this._prvsAllocToTeamMemberId; }
     	 set prvsAllocToTeamMemberId(_prvsAllocToTeamMemberId: number) { this._prvsAllocToTeamMemberId = _prvsAllocToTeamMemberId; }
		 get assgnTeamCount(): number { return this._assgnTeamCount; }
		 set assgnTeamCount(value: number) { this._assgnTeamCount = value; }
		 get sentenceSeq(): number { return this._sentenceSeq; }
		 set sentenceSeq(psentenceSeq: number) { this._sentenceSeq = psentenceSeq; }
		 get moduleId(): String { return this._moduleId;}
		 set moduleId(value: String) {this._moduleId = value;}
		 get rcvdFromLoc(): String { return this._rcvdFromLoc; }
		 set rcvdFromLoc(value: String) { this._rcvdFromLoc = value;	}
		 get rcvdFromTeam(): number { return this._rcvdFromTeam;	}
		 set rcvdFromTeam(value: number) { this._rcvdFromTeam = value; }


 	toJSON(): any {
 		return { 
			'createUserId': this._createUserId,
			'offenderBookId': this._offenderBookId,
			'teamMemberId': this._teamMemberId,
			'modifyUserId': this._modifyUserId,
			'createDateTime': this._createDateTime,
			'serialVersionUID': this._serialVersionUID,
			'modifyDateTime': this._modifyDateTime,
			'teamId': this._teamId,
			'offenderSentConditionId': this._offenderSentConditionId,
			'agyLocId': this._agyLocId,
			'conTransferId': this._conTransferId,
			'sealFlag': this._sealFlag,
			'staffId': this._staffId,
			'condiStatus': this._condiStatus,
			'listSeq': this._listSeq,
			'toTeamId': this._toTeamId,
			'toAgyLocId': this._toAgyLocId,
			'toStaffId': this._toStaffId,
			'toTeamMemberId': this._toTeamMemberId,
			'sentenceSeq': this._sentenceSeq,
			'moduleId' : this._moduleId,
			'rcvdFromLoc' : this._rcvdFromLoc,
			'rcvdFromTeam' : this._rcvdFromTeam
 			};
 		} 
}
