import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderBookingsCommitBean } from '@instdemographicsbeans/OffenderBookingsCommitBean';
import { OffenderExternalMovementsCommitBean } from '@instdemographicsbeans/OffenderExternalMovementsCommitBean';

export class OidadmisCommitBean extends BaseModel {

  private _offenderBookingsCommitBean: OffenderBookingsCommitBean;

  private _offenderExternalMovementsCommitBean: OffenderExternalMovementsCommitBean;

  get offenderBookingsCommitBean(): OffenderBookingsCommitBean { return this._offenderBookingsCommitBean;; }

  set offenderBookingsCommitBean(offenderBookingsCommitBean: OffenderBookingsCommitBean) { this._offenderBookingsCommitBean = offenderBookingsCommitBean;; }

  get offenderExternalMovementsCommitBean(): OffenderExternalMovementsCommitBean { return this._offenderExternalMovementsCommitBean;; }

  set offenderExternalMovementsCommitBean(offenderExternalMovementsCommitBean: OffenderExternalMovementsCommitBean) { this._offenderExternalMovementsCommitBean = offenderExternalMovementsCommitBean;; }

  toJSON(): any {
    return {
      'offenderBookingsCommitBean': this._offenderBookingsCommitBean,
      'offenderExternalMovementsCommitBean': this._offenderExternalMovementsCommitBean,
   };
  }
}