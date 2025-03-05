import { BaseModel } from '@common/beans/BaseModel';

export class WorkItems extends BaseModel {
 private _workId: number;   
 private _businessFucnction: string;
 private _module: string;
 private _triggerId: string;
 private _process: number;
 private _addTrigger: string;
 private _updateTrigger: string;
 private _deleteTrigger: string;
 private _addTriggerFlag: boolean;
 private _updateTriggerFlag: boolean;
 private _deleteTriggerFlag: boolean;
 private _createDatetime: Date;
 private _modifyDatetime: Date;
 private _createUserId: string;
 private _modifyUserId: string;
 private _processDesc: string;
 private _triggerDesc: any;

    get workId(): number { return  this._workId; }
    set workId(pworkId: number) { this._workId = pworkId; }

    get businessFucnction(): string { return  this._businessFucnction; }
    set businessFucnction(pbusinessFucnction: string) { this._businessFucnction = pbusinessFucnction; }
 
    get module(): string { return  this._module; }
    set module(pmodule: string) { this._module = pmodule; }

    get triggerId(): string { return  this._triggerId; }
    set triggerId(ptriggerId: string) { this._triggerId = ptriggerId; }

    get process(): number { return  this._process; }
    set process(pprocess: number) { this._process = pprocess; }

    get addTrigger(): string { return  this._addTrigger; }
    set addTrigger(paddTrigger: string) { this._addTrigger = paddTrigger; }

    get updateTrigger(): string { return  this._updateTrigger; }
    set updateTrigger(pupdateTrigger: string) { this._updateTrigger = pupdateTrigger; }

    get deleteTrigger(): string { return  this._deleteTrigger; }
    set deleteTrigger(pdeleteTrigger: string) { this._deleteTrigger = pdeleteTrigger; }

    get addTriggerFlag(): boolean { return  this._addTriggerFlag; }
    set addTriggerFlag(paddTriggerFlag: boolean) { this._addTriggerFlag = paddTriggerFlag; }

    get updateTriggerFlag(): boolean { return  this._updateTriggerFlag; }
    set updateTriggerFlag(pupdateTriggerFlag: boolean) { this._updateTriggerFlag = pupdateTriggerFlag; }

    get deleteTriggerFlag(): boolean { return  this._deleteTriggerFlag; }
    set deleteTriggerFlag(pdeleteTriggerFlag: boolean) { this._deleteTriggerFlag = pdeleteTriggerFlag; }

    get createDatetime(): Date{ return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}

    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
         
	get modifyUserId(): string{ return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}

    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    
    get processDesc(): string{ return this.processDesc; }
    set processDesc(pprocessDesc: string){ this._processDesc = pprocessDesc ;}

    get triggerDesc(): string{ return this._triggerDesc; }
    set triggerDesc(triggerDesc: string){ this._triggerDesc = triggerDesc ;}
    

    toJSON(): any {
        return {
            'workId': this._workId,
            'process': this._process,
            'module': this._module,
            'triggerId': this._triggerId,
            'businessFucnction': this._businessFucnction,
            'addTrigger': this._addTrigger,
            'updateTrigger': this._updateTrigger,
            'deleteTrigger': this._deleteTrigger,
            'addTriggerFlag': this._addTriggerFlag,
            'updateTriggerFlag': this._updateTriggerFlag,
            'deleteTriggerFlag': this._deleteTriggerFlag,
            'createDatetime': this._createDatetime,
           'modifyDatetime': this._modifyDatetime,
		    'modifyUserId': this._modifyUserId,
           'createUserId': this._createUserId,
           'processDesc':this._processDesc,
           'triggerDesc':this._triggerDesc
        };
    }

}