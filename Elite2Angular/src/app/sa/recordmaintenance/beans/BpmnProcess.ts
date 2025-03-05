import { BaseModel } from '@common/beans/BaseModel';

export class BpmnProcess extends BaseModel {
    private _processId: number;
    private _processKey: string;
    private _processDesc: string;
    private _bpmnFile: Blob;
    private _createDatetime: Date;
    private _modifyDatetime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _button: string;
    private _bpmn: string;
    private _deployeId: string;
    private _deployFlag: string;
    private _historyFlag: string;
    private _defVersion: number;
    private _procDefId: string;
    private _module: string;
    private _triggerId: string;
    private _deployDatetime: Date;
    private _deployUserId: string;
    private _dateTime: string;
    private _commonProcess: string;
    private _category: string;
    private _sourceModule: string;
    private _status: string;
    private _timerProcess: string;
    

    get button(): string { return  this._button; }
    set button(pbutton: string) { this._button = pbutton; }
    get processId(): number { return  this._processId; }
    set processId(pprocessId: number) { this._processId = pprocessId; }

    get bpmn(): string { return  this._bpmn; }
    set bpmn(pbpmn: string) { this._bpmn = pbpmn; }

    get processKey(): string { return  this._processKey; }
    set processKey(pprocessKey: string) { this._processKey = pprocessKey; }

    get processDesc(): string { return  this._processDesc; }
    set processDesc(pprocessDesc: string) { this._processDesc = pprocessDesc; }

    get bpmnFile(): Blob { return  this._bpmnFile; }
    set bpmnFile(pbpmnFile: Blob) { this._bpmnFile = pbpmnFile; }

    get createDatetime(): Date{ return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}

    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
         
	get modifyUserId(): string{ return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}

    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    
    get deployeId(): string{ return this._deployeId; }
    set deployeId(pdeployeId: string){ this._deployeId = pdeployeId ;}
    
    get deployFlag(): string{ return this._deployFlag; }
    set deployFlag(pdeployFlag: string){ this._deployFlag = pdeployFlag ;}
    
    get historyFlag(): string{ return this._historyFlag; }
    set historyFlag(phistoryFlag: string){ this._historyFlag = phistoryFlag ;}
    
    get defVersion(): number{ return this._defVersion; }
    set defVersion(pdefVersion: number){ this._defVersion = pdefVersion ;}
    
    get procDefId(): string{ return this._procDefId; }
    set procDefId(pprocDefId: string){ this._procDefId = pprocDefId ;}
    
    get module(): string{ return this._module; }
    set module(pmodule: string){ this._module = pmodule ;}
    
    get triggerId(): string{ return this._triggerId; }
    set triggerId(ptriggerId: string){ this._triggerId = ptriggerId ;}
    
    get deployDatetime(): Date{ return this._deployDatetime; }
    set deployDatetime(pdeployDatetime: Date){ this._deployDatetime = pdeployDatetime ;}
         
	get deployUserId(): string{ return this._deployUserId; }
    set deployUserId(pdeployUserId: string){ this._deployUserId = pdeployUserId ;}
    
    get dateTime(): string { return  this._dateTime; }
    set dateTime(pdateTime: string) { this._dateTime = pdateTime; }

    get commonProcess(): string { return  this._commonProcess; }
    set commonProcess(pcommonProcess: string) { this._commonProcess = pcommonProcess; }

    get category(): string { return  this._category; }
    set category(pcategory: string) { this._category = pcategory; }
    
    get sourceModule(): string { return  this._sourceModule; }
    set sourceModule(psourceModule: string) { this._sourceModule = psourceModule; }

    get status(): string { return  this._status; }
    set status(pstatus: string) { this._status = pstatus; }

    get timerProcess(): string { return  this._timerProcess; }
    set timerProcess(ptimerProcess: string) { this._timerProcess = ptimerProcess; }
    
    toJSON(): any {
        return {
           'processId': this._processId,
           'processKey': this._processKey,
           'processDesc': this._processDesc,
           'bpmnFile': this._bpmnFile,
           'createDatetime': this._createDatetime,
           'modifyDatetime': this._modifyDatetime,
		    'modifyUserId': this._modifyUserId,
           'createUserId': this._createUserId,
           'bpmn': this._bpmn,
           'button':this._button,
           'deployeId': this._deployeId,
           'deployFlag': this._deployFlag,
           'historyFlag': this._historyFlag,
           'defVersion': this._defVersion,
           'procDefId': this.procDefId,
           'module': this._module,
           'triggerId': this._triggerId,
           'deployDatetime': this._deployDatetime,
           'deployUserId': this._deployUserId,
           'dateTime':this.dateTime,
           'commonProcess':this._commonProcess,
           'category':this._category,
           'sourceModule':this._sourceModule,
           'status0':this._status,
           'timerProcess':this._timerProcess
        };
    }
}