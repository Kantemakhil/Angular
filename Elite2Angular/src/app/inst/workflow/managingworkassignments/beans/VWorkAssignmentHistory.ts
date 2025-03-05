	export class VWorkAssignmentHistory {
		 private _assignmentStatus: string;
		 private _staffRole: string;
		 private _offenderBookId: number;
		 private _staffLastName: string;
		 private _teamMemberId: number;
		 private _teamCode: string;
		 private _teamDescription: string;
		 private _workflowHistoryId: number;
		 private _workId: number;
		 private _serialVersionUID: number;
		 private _teamId: number;
		 private _staffName: string;
		 private _assignmentDate: Date;
		 private _detail: string;
		 private _taskAssignmentHtyId: number;
		 private _taskAssignmentId: number;
		 private _staffId: number;
		 private _staffPosition: string;

		 get assignmentStatus(): string{ return this._assignmentStatus; }
		 set assignmentStatus(passignmentStatus: string){ this._assignmentStatus = passignmentStatus ;}
		 get staffRole(): string{ return this._staffRole; }
		 set staffRole(pstaffRole: string){ this._staffRole = pstaffRole ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get staffLastName(): string{ return this._staffLastName; }
		 set staffLastName(pstaffLastName: string){ this._staffLastName = pstaffLastName ;}
		 get teamMemberId(): number{ return this._teamMemberId; }
		 set teamMemberId(pteamMemberId: number){ this._teamMemberId = pteamMemberId ;}
		 get teamCode(): string{ return this._teamCode; }
		 set teamCode(pteamCode: string){ this._teamCode = pteamCode ;}
		 get teamDescription(): string{ return this._teamDescription; }
		 set teamDescription(pteamDescription: string){ this._teamDescription = pteamDescription ;}
		 get workflowHistoryId(): number{ return this._workflowHistoryId; }
		 set workflowHistoryId(pworkflowHistoryId: number){ this._workflowHistoryId = pworkflowHistoryId ;}
		 get workId(): number{ return this._workId; }
		 set workId(pworkId: number){ this._workId = pworkId ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get teamId(): number{ return this._teamId; }
		 set teamId(pteamId: number){ this._teamId = pteamId ;}
		 get staffName(): string{ return this._staffName; }
		 set staffName(pstaffName: string){ this._staffName = pstaffName ;}
		 get assignmentDate(): Date{ return this._assignmentDate; }
		 set assignmentDate(passignmentDate: Date){ this._assignmentDate = passignmentDate ;}
		 get detail(): string{ return this._detail; }
		 set detail(pdetail: string){ this._detail = pdetail ;}
		 get taskAssignmentHtyId(): number{ return this._taskAssignmentHtyId; }
		 set taskAssignmentHtyId(ptaskAssignmentHtyId: number){ this._taskAssignmentHtyId = ptaskAssignmentHtyId ;}
		 get taskAssignmentId(): number{ return this._taskAssignmentId; }
		 set taskAssignmentId(ptaskAssignmentId: number){ this._taskAssignmentId = ptaskAssignmentId ;}
		 get staffId(): number{ return this._staffId; }
		 set staffId(pstaffId: number){ this._staffId = pstaffId ;}
		 get staffPosition(): string{ return this._staffPosition; }
		 set staffPosition(pstaffPosition: string){ this._staffPosition = pstaffPosition ;}

 	toJSON(): any {
 		return { 
			'assignmentStatus': this._assignmentStatus,
			'staffRole': this._staffRole,
			'offenderBookId': this._offenderBookId,
			'staffLastName': this._staffLastName,
			'teamMemberId': this._teamMemberId,
			'teamCode': this._teamCode,
			'teamDescription': this._teamDescription,
			'workflowHistoryId': this._workflowHistoryId,
			'workId': this._workId,
			'serialVersionUID': this._serialVersionUID,
			'teamId': this._teamId,
			'staffName': this._staffName,
			'assignmentDate': this._assignmentDate,
			'detail': this._detail,
			'taskAssignmentHtyId': this._taskAssignmentHtyId,
			'taskAssignmentId': this._taskAssignmentId,
			'staffId': this._staffId,
			'staffPosition': this._staffPosition,
 			};
 		}  
 }