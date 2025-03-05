import {
    Component
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
@Component( {
    selector: 'app-ocdnoquedialog',
    templateUrl: './ocdnoquedialog.component.html'
} )
export class OcdnoqueDialogComponent {
constructor(public translateService: TranslateService){
}

}