import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeactivateReason, SubUnitDetail, Backend } from '../../service/backend.service';
import { EditUnitDetails } from '../../beans/unit-details';
import { Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-edit-unit-dialog',
    templateUrl: './edit-unit-dialog.component.html',
    styleUrls: ['./edit-unit-dialog.component.scss'],
})
export class EditUnitDialogComponent implements OnInit {
    deactivateReasons: DeactivateReason[];
    unitDetails: SubUnitDetail;

    public myForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EditUnitDialogComponent>,
        private api: Backend,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: EditUnitDetails,
        public sessionManager: UserSessionManager,private router: Router
    ) {}

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            // animalControl: [null, [Validators.required]],
            deactivateReasonControl: [null, [Validators.required]],
            capactiyControl: [null, [Validators.required]],
            activeControl: [false],
        });

        const requiredCalls: Observable<object>[] = [];
        requiredCalls.push(this.api.getDeactivateReasonCodes(this.sessionManager.getId(),this.router.url));
        requiredCalls.push(
            this.api.getSubUnitsDetails('STAG', this.data.parentId)
        );
        forkJoin(requiredCalls).subscribe(
            (response) => {
                this.preapreData(response);
                if (this.myForm.controls.activeControl.value) {
                    this.myForm.controls.deactivateReasonControl.clearValidators();
                    this.myForm.controls.deactivateReasonControl.updateValueAndValidity();
                } else {
                    this.myForm.controls.deactivateReasonControl.setValidators([
                        Validators.required,
                    ]);
                    this.myForm.controls.deactivateReasonControl.updateValueAndValidity();
                }
            },
            (err) => {
                
            }
        );
    }

    private preapreData(response: object[]): void {
        this.deactivateReasons = response[0] as DeactivateReason[];
        const units = response[1] as SubUnitDetail[];
        units.forEach((element) => {
            if (element.livingUnitId === this.data.unitId) {
                this.unitDetails = element;
                this.myForm.controls.activeControl.setValue(
                    element.activeFlag === 'Y'
                );
                this.myForm.controls.capactiyControl.setValue(element.capacity);
                if (
                    !this.myForm.controls.activeControl.value &&
                    this.unitDetails.deactivateReasonCode
                ) {
                    this.myForm.controls.deactivateReasonControl.setValue(
                        this.deactivateReasons.find(
                            (item) =>
                                item.code ===
                                this.unitDetails.deactivateReasonCode
                        )
                    );
                }
            }
        });
    }

    public updateCell(): void {
        
    }

    toggleActive(event) {
        if (event.checked) {
            this.myForm.controls.deactivateReasonControl.clearValidators();
            this.myForm.controls.deactivateReasonControl.updateValueAndValidity();
        } else {
            this.myForm.controls.deactivateReasonControl.setValidators([
                Validators.required,
            ]);
            this.myForm.controls.deactivateReasonControl.updateValueAndValidity();
        }

        this.myForm.controls.deactivateReasonControl.reset();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    onKeyDown(event): boolean {
        if (event.key === 'e' || event.key === 'E' || (event.key === '-') || (event.key === '+')) {
            event.stopPropagation();
            return false;
        }
    }
    onSubmitClick() {
        this.myForm.markAllAsTouched();
        if (this.myForm.invalid) {
            return;
        }

        this.unitDetails.activeFlag = this.myForm.controls.activeControl.value
            ? 'Y'
            : 'N';
        this.unitDetails.capacity = this.myForm.controls.capactiyControl.value;
        if (
            this.myForm.controls.capactiyControl.value &&
            this.myForm.controls.deactivateReasonControl.value
        ) {
            this.unitDetails.deactivateReasonCode = this.myForm.controls.deactivateReasonControl.value.code;
        }
        this.dialogRef.close(this.unitDetails);
    }
}
