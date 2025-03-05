import {
    Component
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
@Component( {
    selector: 'app-ocdaliasdialog',
    templateUrl: './ocdaliasdialog.component.html'
} )
export class OcdaliasDialogComponent {
constructor(public translateService: TranslateService){
}

}