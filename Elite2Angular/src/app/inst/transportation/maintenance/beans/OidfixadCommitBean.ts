import { BaseModel } from "@common/beans/BaseModel";
import { FixedAssetsCommitBean } from "./FixedAssetsCommitBean";
import { VehiclesCommitBean } from "./VehiclesCommitBean";

export class OidfixadCommitBean extends BaseModel{
    
    private _fixedAssetsCommitBean: FixedAssetsCommitBean = new FixedAssetsCommitBean();
    private _vehiclesCommitBean: VehiclesCommitBean = new VehiclesCommitBean();

    public get fixedAssetsCommitBean(): FixedAssetsCommitBean {
        return this._fixedAssetsCommitBean;
    }
    public set fixedAssetsCommitBean(value: FixedAssetsCommitBean) {
        this._fixedAssetsCommitBean = value;
    }
   
    public get vehiclesCommitBean(): VehiclesCommitBean {
        return this._vehiclesCommitBean;
    }
    public set vehiclesCommitBean(value: VehiclesCommitBean) {
        this._vehiclesCommitBean = value;
    }

    toJSON(): any {
        return {
            'fixedAssetsCommitBean': this._fixedAssetsCommitBean,
            'vehiclesCommitBean': this._vehiclesCommitBean,
        };
    }
}