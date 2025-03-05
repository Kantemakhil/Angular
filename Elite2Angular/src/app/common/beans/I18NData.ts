
import {BaseModel} from './BaseModel';

export class I18NData extends BaseModel {
  
  private _i18NData:Map<string, string>;
  
  get i18NData(): Map<string, string> { return this._i18NData; }
    
  set i18NData(pi18NData: Map<string, string>){ this._i18NData = pi18NData; }
}