import {BaseModel} from './BaseModel';
import {TagSearchPopulateOffDetails} from './TagSearchPopulateOffDetails';
import {Images} from './Images';
import {OffenderProfileDetails} from './OffenderProfileDetails';
import {OffenderPhysicalAttributes} from './OffenderPhysicalAttributes';
import {Offenders} from './Offenders';
export class PopulateSearch extends BaseModel {

    private _tspo:  TagSearchPopulateOffDetails;
    private _imgs: Images;
    private _ofd: OffenderProfileDetails;
    private _opa: OffenderPhysicalAttributes;
    private _offs: Offenders;

    get tspo(): TagSearchPopulateOffDetails { return this._tspo; }

    set tspo(ptspo: TagSearchPopulateOffDetails) { this._tspo = ptspo; }

    get imgs(): Images { return this._imgs; }

    set imgs(pImages: Images) { this._imgs = pImages; }

    get ofd(): OffenderProfileDetails { return this._ofd; }

    set ofd(pOfd: OffenderProfileDetails) { this._ofd = pOfd; }

    get opa(): OffenderPhysicalAttributes { return this._opa; }

    set opa(pOpa: OffenderPhysicalAttributes) { this._opa = pOpa; }

    get offs(): Offenders { return this._offs; }

    set offs(pOffs: Offenders) { this._offs = pOffs; }

    toJSON(): any {
        return {
            'ptspo': this._tspo,
            'pImages': this._imgs,
            'pOfd': this._ofd,
            'pOpa': this._opa,
            'pOffs' : this._offs,

       };
    }
}
