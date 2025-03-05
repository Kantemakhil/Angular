import {
    Component
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
@Component( {
    selector: 'app-oidpidendialog',
    templateUrl: './oidpidendialog.component.html'
} )
export class OidpidenDialogComponent {
constructor(public translateService: TranslateService){
}

}