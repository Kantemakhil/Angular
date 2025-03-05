import {
    Component,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
@Component( {
    selector: 'app-oidoicusdialog',
    templateUrl: './oidoicusdialog.component.html'
} )
export class OidoicusDialogComponent {
constructor(public translateService: TranslateService) {
}

}
