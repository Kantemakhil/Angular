import {
    Component
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';


@Component({
  selector: 'app-oidononadialog',
  templateUrl: './oidononadialog.component.html'
})

export class OidononaDialogComponent  {
    constructor(public translateService: TranslateService){
    }
}
