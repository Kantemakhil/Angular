import {
    Component
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
@Component( {
    selector: 'app-oidcnotedialog',
    templateUrl: './oidcnotedialog.component.html'
} )
export class OidcnoteDialogComponent {
constructor(public translateService: TranslateService){
}

}