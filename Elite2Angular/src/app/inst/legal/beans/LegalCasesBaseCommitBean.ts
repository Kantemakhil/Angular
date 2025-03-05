import { BaseModel } from '@common/beans/BaseModel';
import { CourtCasesCommitBean } from '@inst/legal/beans/CourtCasesCommitBean';
import { CourtEventsCommitBean } from '@inst/legal/beans/CourtEventsCommitBean';
import { OffencesCommitBean } from '@inst/legal/beans/OffencesCommitBean';
import { SentencesCommitBean } from '@inst/legal/beans/SentencesCommitBean';
import { TermsCommitBean } from '@inst/legal/beans/TermsCommitBean';
export class LegalCasesBaseCommitBean extends BaseModel {
	private _courtCasesCommitBean: CourtCasesCommitBean = new CourtCasesCommitBean();
	private _courtEventsCommitBean: CourtEventsCommitBean = new CourtEventsCommitBean();
	private _offencesCommitBean: OffencesCommitBean = new OffencesCommitBean();
	private _sentencesCommitBean: SentencesCommitBean = new SentencesCommitBean();
	private _termsCommitBean: TermsCommitBean = new TermsCommitBean();
	private _convictedOffencesCommitBean: OffencesCommitBean = new OffencesCommitBean();
	private _ordersCommitBean: SentencesCommitBean = new SentencesCommitBean();
	private _periodsCommitBean: TermsCommitBean = new TermsCommitBean();
	private _convictedOffencesComCommitBean: OffencesCommitBean = new OffencesCommitBean();
	private _sealFlag: string;

	get courtCasesCommitBean(): CourtCasesCommitBean { return this._courtCasesCommitBean; }
	set courtCasesCommitBean(pcourtCasesCommitBean: CourtCasesCommitBean) { this._courtCasesCommitBean = pcourtCasesCommitBean; }
	get courtEventsCommitBean(): CourtEventsCommitBean { return this._courtEventsCommitBean; }
	set courtEventsCommitBean(pcourtEventsCommitBean: CourtEventsCommitBean) { this._courtEventsCommitBean = pcourtEventsCommitBean; }
	get offencesCommitBean(): OffencesCommitBean { return this._offencesCommitBean; }
	set offencesCommitBean(poffencesCommitBean: OffencesCommitBean) { this._offencesCommitBean = poffencesCommitBean; }
	get sentencesCommitBean(): SentencesCommitBean { return this._sentencesCommitBean; }
	set sentencesCommitBean(psentencesCommitBean: SentencesCommitBean) { this._sentencesCommitBean = psentencesCommitBean; }
	get ordersCommitBean(): SentencesCommitBean { return this._ordersCommitBean; }
	set ordersCommitBean(pordersCommitBean: SentencesCommitBean) { this._ordersCommitBean = pordersCommitBean; }
	get convictedOffencesComCommitBean(): OffencesCommitBean { return this._convictedOffencesComCommitBean; }
	set convictedOffencesComCommitBean(pconvictedOffencesComCommitBean: OffencesCommitBean) { this._convictedOffencesComCommitBean = pconvictedOffencesComCommitBean; }
	get sealFlag(): string { return this._sealFlag; }
	set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
	get termsCommitBean(): TermsCommitBean { return this._termsCommitBean; }
	set termsCommitBean(ptermsCommitBean: TermsCommitBean) { this._termsCommitBean = ptermsCommitBean; }
	get convictedOffencesCommitBean(): OffencesCommitBean { return this._convictedOffencesCommitBean; }
	set convictedOffencesCommitBean(pconvictedOffencesCommitBean: OffencesCommitBean) { this._convictedOffencesCommitBean = pconvictedOffencesCommitBean; }
	get periodsCommitBean(): TermsCommitBean { return this._periodsCommitBean; }
	set periodsCommitBean(pperiodsCommitBean: TermsCommitBean) { this._periodsCommitBean = pperiodsCommitBean; }

	toJSON(): any {
		return {
			'courtCasesCommitBean': this._courtCasesCommitBean,
			'courtEventsCommitBean': this._courtEventsCommitBean,
			'sentencesCommitBean': this._sentencesCommitBean,
			'offencesCommitBean': this._offencesCommitBean,
			'ordersCommitBean': this._ordersCommitBean,
			'convictedOffencesComCommitBean': this._convictedOffencesComCommitBean,
			'sealFlag': this._sealFlag,
			'termsCommitBean': this._termsCommitBean,
			'convictedOffencesCommitBean': this._convictedOffencesCommitBean,
			'periodsCommitBean': this._periodsCommitBean,
		};
	}
}