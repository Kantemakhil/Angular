import { BaseModel } from '@common/beans/BaseModel';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';

export class ResponseEntityBean extends BaseModel {
    private _liReturn: number;
    private _vHeaderBlock: VHeaderBlock;

    get liReturn(): number { return  this._liReturn; }
    set liReturn(pliReturn: number) { this._liReturn = pliReturn; }

    get vHeaderBlock(): VHeaderBlock { return  this._vHeaderBlock; }
    set vHeaderBlock(pvHeaderBlock: VHeaderBlock) { this._vHeaderBlock = pvHeaderBlock; }

    toJSON(): any {
        return {
           'liReturn': this._liReturn,
           'vHeaderBlock': this._vHeaderBlock
        };
    }
}