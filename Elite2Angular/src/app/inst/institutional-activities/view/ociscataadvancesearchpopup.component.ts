import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OciscataService } from '@inst/institutional-activities/service/ociscata.service';
import { VCourseActivities } from '@instinstitutionalactivitiesbeans/VCourseActivities';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
@Component({
    selector: 'app-ociscataadvancesearchpopup',
    templateUrl: './ociscataadvancesearchpopup.component.html'
})
export class OciscataadvancesearchpopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    chargeColumnDefpopup: any[];
    offBookId: any;
    caseLoadId: any;
    namesOption: any[] = [];
    genderLink: any;
    raceLink: any;
    ageLink: any;
    facilitiesLink: any;
    inExGroupLink: any;
    statusLink: any;
    gender: string;
    race: string;
    age: string;
    facility: string;
    includeGroup: string;
    excludeGroup: string;
    status = '';
    statusTitles = { description: 'Description' };
    vCourseActivity = new VCourseActivities();
    vActivities = new VCourseActivities();
    valuesSetFlag = false;
    statusFlag = false;
    secondCheckStatusFlag = false;
    genderFlag = false;
    secondGenderFlag = false;
    raceFlag = false;
    secondRaceFlag = false;
    ageFlag = false;
    secondAgeFlag = false;
    facilityFlag = false;
    secondFacilityFlag = false;
    inFlag = false;
    secondInFlag = false;
    exFlag = false;
    secondExFlag = false;
    constructor(private ociscataFactory: OciscataService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager) {
    }

    ngOnInit() {
        this.genderLink = 'ociscata/rgPsSexRecordGroup';
        this.raceLink = 'ociscata/rgEthnicityRecordGroup';
        this.ageLink = 'ociscata/rgPsAgeRangeRecordGroup';
        this.facilitiesLink = 'ociscata/rgPsNeedsRecordGroup';
        this.inExGroupLink = 'ociscata/rgPsOffGrpsRecordGroup';
        this.statusLink = 'ociscata/rgPsAvailRecordGroup';

        this.vCourseActivity = this.ociscataFactory.vCourseActivities;
        if(this.vCourseActivity==undefined){
        const serviceObj = this.ociscataFactory.getDefaultDomain();
        serviceObj.subscribe(data => {
            if (data) {
                setTimeout(() => {
                this.status = data;
            }, 1800);
                if (this.vCourseActivity && this.vCourseActivity.nbtStatus) {
                    this.status = this.vCourseActivity.nbtStatus;
                    this.statusFlag = false;
                    this.secondCheckStatusFlag = false;
                }
            }
        });
    }
        if (this.vCourseActivity) {
            if (this.vCourseActivity.nbtGender) {
                setTimeout(() => {
                    this.gender = this.vCourseActivity.nbtGender;
                }, 1800);
                if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'N') {
                    this.genderFlag = false;
                    this.secondGenderFlag = false;
                } else if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'Y') {
                    this.genderFlag = true;
                } else {
                    this.genderFlag = true;
                }
            } else {
                this.genderFlag = true;
            }
            if (this.vCourseActivity.nbtRace) {
                setTimeout(() => {
                this.race = this.vCourseActivity.nbtRace;
            }, 1800);
                if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'N') {
                    this.raceFlag = false;
                    this.secondRaceFlag = false;
                } else if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'Y') {
                    this.raceFlag = true;
                } else {
                    this.raceFlag = true;
                }
            } else {
                this.raceFlag = true;
            }

            if (this.vCourseActivity.nbtAge) {
                setTimeout(() => {
                this.age = this.vCourseActivity.nbtAge;
            }, 1800);
                if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'N') {
                    this.ageFlag = false;
                    this.secondAgeFlag = false;
                } else if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'Y') {
                    this.ageFlag = true;
                } else {
                    this.ageFlag = true;
                }
            } else {
                this.ageFlag = true;
            }
            if (this.vCourseActivity.nbtFacility) {
                setTimeout(() => {
                this.facility = this.vCourseActivity.nbtFacility;
            }, 1800);

                if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'N') {
                    this.facilityFlag = false;
                    this.secondFacilityFlag = false;
                } else if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'Y') {
                    this.facilityFlag = true;
                } else {
                    this.facilityFlag = true;
                }
            } else {
                this.facilityFlag = true;
            }
            if (this.vCourseActivity.nbtInclude) {
                setTimeout(() => {
                this.includeGroup = this.vCourseActivity.nbtInclude;
            }, 1800);

                if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'N') {
                    this.inFlag = false;
                    this.secondInFlag = false;
                } else if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'Y') {
                    this.inFlag = true;
                } else {
                    this.inFlag = true;
                }
            } else {
                this.inFlag = true;
            }
            if (this.vCourseActivity.nbtExclude) {
                setTimeout(() => {
                this.excludeGroup = this.vCourseActivity.nbtExclude;
            }, 1800);
                if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'N') {
                    this.exFlag = false;
                    this.secondExFlag = false;
                } else if (this.vCourseActivity.nbtAdvSearch && this.vCourseActivity.nbtAdvSearch === 'Y') {
                    this.exFlag = true;
                } else {
                    this.exFlag = true;
                }
            } else {
                this.exFlag = true;
            }
            if (this.vCourseActivity.nbtStatus) {
                setTimeout(() => {
                this.status = this.vCourseActivity.nbtStatus;
            }, 1800);
            }
        } else {
            this.genderFlag = true;
            this.secondGenderFlag = false;
            this.raceFlag = true;
            this.secondRaceFlag = false;
            this.ageFlag = true;
            this.secondAgeFlag = false;
            this.facilityFlag = true;
            this.secondFacilityFlag = false;
            this.inFlag = true;
            this.secondInFlag = false;
            this.exFlag = true;
            this.secondExFlag = false;
        }

    }
    getData(event) {
        this.vCourseActivity = new VCourseActivities();
        this.valuesSetFlag = false;
        if (this.gender) {
            this.vCourseActivity.nbtGender = this.gender;
        } 
        if (this.race) {
            this.vCourseActivity.nbtRace = this.race;
        } else {
            this.secondRaceFlag = false;
        }
        if (this.age) {
            this.vCourseActivity.nbtAge = this.age;
        } else {
            this.secondAgeFlag = false;
        }
        if (this.facility) {
            this.vCourseActivity.nbtFacility = this.facility;
        } else {
            this.secondFacilityFlag = false;
        }
        if (this.includeGroup) {
            this.vCourseActivity.nbtInclude = this.includeGroup;
        } else {
            this.secondInFlag = false;
        }
        if (this.excludeGroup) {
            this.vCourseActivity.nbtExclude = this.excludeGroup;
        } else {
            this.secondExFlag = false;
        }
        if (this.status) {
            this.vCourseActivity.nbtStatus = this.status;
        }

        if (this.secondGenderFlag || this.secondRaceFlag || this.secondAgeFlag || this.secondFacilityFlag || this.secondInFlag ||
            this.secondExFlag) {
            this.valuesSetFlag = true;
        }
        if (!this.valuesSetFlag) {
            if (this.secondCheckStatusFlag) {
                this.valuesSetFlag = true;
            }
        }
        
        if (!this.valuesSetFlag) {
            if (this.ociscataFactory.vCourseActivities) {
                if (this.ociscataFactory.vCourseActivities && this.ociscataFactory.vCourseActivities.nbtAdvSearch && this.ociscataFactory.vCourseActivities.nbtAdvSearch === 'N') {
                    this.vCourseActivity.nbtAdvSearch = this.ociscataFactory.vCourseActivities.nbtAdvSearch;
                }
                this.ociscataFactory.vCourseActivities = this.vCourseActivity;
            }
        } else {
            this.ociscataFactory.vCourseActivities = this.vCourseActivity;
            }
        
        
        this.dialog.close({
            advanceSearch: this.valuesSetFlag
        });
    }
    clearData() {
        this.gender = undefined;
        this.race = undefined;
        this.age = undefined;
        this.facility = undefined;
        this.includeGroup = undefined;
        this.excludeGroup = undefined;
        this.statusFlag = false;
        this.secondCheckStatusFlag = false;
        this.genderFlag = true;
        this.secondGenderFlag = false;
        this.raceFlag = true;
        this.secondRaceFlag = false;
        this.ageFlag = true;
        this.secondAgeFlag = false;
        this.facilityFlag = true;
        this.secondFacilityFlag = false;
        this.inFlag = true;
        this.secondInFlag = false;
        this.exFlag = true;
        this.secondExFlag = false;
        const serviceObj = this.ociscataFactory.getDefaultDomain();
        serviceObj.subscribe(data => {
            if (data) {
                this.status = data;
                this.statusFlag = false;
                this.secondCheckStatusFlag = false;
            }
        });
    }

    onStatusWhenValidationItemTrigger() {

        if (this.status) {
            if (!this.statusFlag) {
                this.statusFlag = true;
                this.secondCheckStatusFlag = false;
            } else {
                if (!this.secondCheckStatusFlag) {
                    this.secondCheckStatusFlag = true;
                }
            }
        }
    }
    onGenderWhenValidationItemTrigger() {
        if (this.gender) {
            if (!this.genderFlag) {
                this.genderFlag = true;
                this.secondGenderFlag = false;
            } else {
                if (!this.secondGenderFlag) {
                    this.secondGenderFlag = true;
                }
            }
        }
    }

    onRaceWhenValidationItemTrigger() {
        if (this.race) {
            if (!this.raceFlag) {
                this.raceFlag = true;
                this.secondRaceFlag = false;
            } else {
                if (!this.secondRaceFlag) {
                    this.secondRaceFlag = true;
                }
            }
        }
    }

    onAgeWhenValidationItemTrigger() {
        if (this.age) {
            if (!this.ageFlag) {
                this.ageFlag = true;
                this.secondAgeFlag = false;
            } else {
                if (!this.secondAgeFlag) {
                    this.secondAgeFlag = true;
                }
            }
        }
    }

    onFacilityWhenValidationItemTrigger() {
        if (this.facility) {
            if (!this.facilityFlag) {
                this.facilityFlag = true;
                this.secondFacilityFlag = false;
            } else {
                if (!this.secondFacilityFlag) {
                    this.secondFacilityFlag = true;
                }
            }
        }
    }

    onInWhenValidationItemTrigger() {
        if (this.includeGroup) {
            if (!this.inFlag) {
                this.inFlag = true;
                this.secondInFlag = false;
            } else {
                if (!this.secondInFlag) {
                    this.secondInFlag = true;
                }
            }
        }
    }

    onExWhenValidationItemTrigger() {
        if (this.excludeGroup) {
            if (!this.exFlag) {
                this.exFlag = true;
                this.secondExFlag = false;
            } else {
                if (!this.secondExFlag) {
                    this.secondExFlag = true;
                }
            }
        }
    }


    /*
    *  This event is used to set the gender value in Advance Search Criteria Block.
    */
    onGenderChange() {
        this.gender = this.gender === undefined ? '' : undefined;
    }

    /*
    *  This event is used to set the race value in Advance Search Criteria Block.
    */
    onRaceChange() {
        this.race = this.race === undefined ? '' : undefined;
    }

    /*
    *  This event is used to set the facility value in Advance Search Criteria Block.
    */
    onFacilityChange() {
        this.facility = this.facility === undefined ? '' : undefined;
    }

    /*
     *  This event is used to set the age value in Advance Search Criteria Block.
     */
    onAgeChange() {
        this.age = this.age === undefined ? '' : undefined;
    }
    /*
     *  This event is used to set the include value in Advance Search Criteria Block.
     */
    onIncludeChange() {
        this.includeGroup = this.includeGroup === undefined ? '' : undefined;
    }

    /*
    *  This event is used to set the exclude value in Advance Search Criteria Block.
    */
    onExcludeChange() {
        this.includeGroup = this.includeGroup === undefined ? '' : undefined;
    }

    /*
    *  This event is used to set the status value in Advance Search Criteria Block.
    */
    onStatusChange() {
        this.status = this.status === undefined ? '' : undefined;
    }


}
