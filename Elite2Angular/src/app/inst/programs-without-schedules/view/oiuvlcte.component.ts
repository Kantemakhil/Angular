
import {
Component, OnInit,
ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiuvlcteService } from '../service/oiuvlcte.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { CourseActivities } from '../beans/CourseActivities';
import { VAddresses } from '../../demographics-biometrics/beans/VAddresses';

// import required bean declarations

@Component({
selector: 'app-oiuvlcte',
templateUrl: './oiuvlcte.component.html',
})

export class OiuvlcteComponent implements OnInit {
@ViewChild('oiuvlcteDialog', {static: true}) oiuvlcteDialog: DialogComponent;
actionName: string;
lovModel: any[];
msgs: any[] = [];
nameOfLovPage: string;
listToCompare: any[] = [];
display: boolean;
errorMessage: string;
headerMessage: string;
disabled: boolean;
editable = true;
ctlBlkReadOnly = false;
ctlblkModel = new VAddresses();
oiuvlModel = new CourseActivities();
constructor(private oiuvlcteFactory: OiuvlcteService,
public translateService: TranslateService,
public sessionManager: UserSessionManager) {
}
ngOnInit() {
    if (this.oiuvlcteDialog.data) {
        this.oiuvlModel.crsActyId = this.oiuvlcteDialog.data.crsActyId;
    }
this.addressExecuteQuery();
}

validateRow = (event) => {
const rowdata = new ValidateRowReturn();
return rowdata;
}  /**
  * This function displays the messages
  */
show(vldmsg, type?) {
type = type ? type : 'warn';
vldmsg = this.translateService.translate(vldmsg);
const msgval = [{ message: vldmsg, type: type }];
this.msgs = [...msgval];
}

addressExecuteQuery() {
const addressResult = this.oiuvlcteFactory.
addresExecuteQuery(this.oiuvlModel);
addressResult.subscribe(resultList => {
if (!resultList) {
this.ctlblkModel = new VAddresses();
} else {
this.ctlblkModel = resultList;

}
});
}
onButExitclick() {
this.oiuvlcteDialog.close(null);
}
}
