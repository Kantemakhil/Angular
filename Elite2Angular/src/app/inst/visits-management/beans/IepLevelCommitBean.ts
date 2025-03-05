import { IEPLevelBean } from   "@inst/visits-management/beans/ieplevelbean";
import { BaseModel } from "@common/beans/BaseModel";

    export class IEPLevelCommitBean  extends BaseModel {

        private _deleteList: Array<IEPLevelBean>;
       
        private _insertList: Array<IEPLevelBean>;
       
        private _updateList: Array<IEPLevelBean>;


        public get deleteList(): Array<IEPLevelBean> {
            return this._deleteList;
        }
        public set deleteList(value: Array<IEPLevelBean>) {
            this._deleteList = value;
        }
        public get insertList(): Array<IEPLevelBean> {
            return this._insertList;
        }
        public set insertList(value: Array<IEPLevelBean>) {
            this._insertList = value;
        }
        public get updateList(): Array<IEPLevelBean> {
            return this._updateList;
        }
        public set updateList(value: Array<IEPLevelBean>) {
            this._updateList = value;
        }

        toJSON(): any {
            return {
               'deleteList': this._deleteList,
               'insertList': this._insertList,
               'updateList': this._updateList
                };
            }
        
    }
