import {
    Component,
    OnInit,
    Input,
    forwardRef,
    Output,
    EventEmitter,
    ViewChild,
    TemplateRef
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
// import {
//     MatSnackBar,
//     MatSnackBarHorizontalPosition,
//     MatSnackBarVerticalPosition
// } from '@angular/material';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatSnackBarConfig
} from '@angular/material/snack-bar';
import { CalendarProfile } from '../schedule/calendar-profile';
import { UiCustomizeService } from '@core/service/ui-customize.service';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MessageComponent),
    multi: true
};

export type MsgType = 'success' | 'info' | 'warn' | 'error';

const noop = () => {
};


@Component({
    selector: 's4-message',
    templateUrl: './message.component.html'


})
export class MessageComponent implements OnInit, ControlValueAccessor {

    @ViewChild('iconRef', { static: true }) iconData: TemplateRef<any>;
    static _duration = 2000;
    static _msgToastDefPosition;
    msgDefHorPos: any;
    msgDefVertPos: any;
    title: any;
    profileValues: any;
    schedDisplayList: any[];
    public static set duration(value: number) {
        MessageComponent._duration = value;
    }

    public get duration(): number {
        return MessageComponent._duration;
    }
    public static set msgToastDefPosition(value: MatSnackBarHorizontalPosition) {
        MessageComponent._msgToastDefPosition = value;
    }

    public get msgToastDefPosition(): MatSnackBarHorizontalPosition {
        return MessageComponent._msgToastDefPosition;
    }

    private configSuccess: MatSnackBarConfig = {
        panelClass: ['style-success'],
    };

    private configError: MatSnackBarConfig = {
        panelClass: ['style-error'],
    };
    horizontalPosition?: MatSnackBarHorizontalPosition = 'right';

    verticalPosition?: MatSnackBarVerticalPosition = 'bottom';

    msgConfig = {
        duration: 50000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
    };


    action = 'Ok';
    icon: string;
    message: string;
    backgroundColor: string;
    messageType: string;
    innerMsgs = [];
    private values = [];
    @Output() msgsChange: EventEmitter<any> = new EventEmitter();

    // by the Control msgs Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    render = false;

    constructor(public snackBar: MatSnackBar, public uiCustomizeService: UiCustomizeService) {
        this.schedDisplayList = [];
        this.profileValues = CalendarProfile.getProfilesValues();

    }

    ngOnInit() {
        if (this.msgToastDefPosition && this.msgToastDefPosition != null) {
            var position = this.msgToastDefPosition.split("-");
            if (position && position != null) {
                this.msgDefHorPos = position[0];
                this.msgDefVertPos = position[1];
            }
        }
    }

    // get accessor for ngModel
    get msgs(): any {
        return this.innerMsgs;
    };

    // set accessor including call the onchange callback
    @Input()
    set msgs(v: any) {
        if (v !== this.innerMsgs && v) {
            this.innerMsgs = v;
            this.values.push(...v);
            if (!this.render) {
                setTimeout(() => { this.handleValueChange(this.values) }, 0);
            }
            this.msgsChange.next(this.innerMsgs);
            this.onChangeCallback(v);
        }
    }

    handleValueChange(list: any) {
        if (list.length > 0) {
            this.render = true;
        } else {
            this.render = false;
            return;
        }
        let msg = this.values[0];
        this.values.splice(0, 1);
        this.messageType = msg.type;
        if (msg.type) {
            this.msgConfig['panelClass'] = 'message-class-' + msg.type;

        } else {
            this.msgConfig['panelClass'] = 'message-class-success';
        }
        if (msg.message) {
            msg = msg.message;
        }
        this.message = msg;
        var position = 'top-right';
        var toastDuration = 1000;
        if (this.uiCustomizeService && this.uiCustomizeService.toastConfig) {
            if (this.messageType === 'success' && this.uiCustomizeService.toastConfig.successPos) {
                position = this.uiCustomizeService.toastConfig.successPos;
                toastDuration = this.uiCustomizeService.toastConfig.successDuration * 1000;
            } else if (this.messageType === 'error' && this.uiCustomizeService.toastConfig.errorPos) {
                position = this.uiCustomizeService.toastConfig.errorPos;
                toastDuration = this.uiCustomizeService.toastConfig.errorDuration * 1000;
            } else if (this.messageType === 'warn' && this.uiCustomizeService.toastConfig.warnPos) {
                position = this.uiCustomizeService.toastConfig.warnPos;
                toastDuration = this.uiCustomizeService.toastConfig.warnDuration * 1000;
            } else if (this.messageType === 'info' && this.uiCustomizeService.toastConfig.infoPos) {
                position = this.uiCustomizeService.toastConfig.infoPos;
                toastDuration = this.uiCustomizeService.toastConfig.infoDuration * 1000;
            }
        }
        this.msgConfig.duration = toastDuration;
        var positions = position.split("-");
        if (positions && positions != null) {
            this.msgConfig.verticalPosition = positions[0] as MatSnackBarVerticalPosition;
            this.msgConfig.horizontalPosition = positions[1] as MatSnackBarHorizontalPosition;
        }
        const snackBarRef = this.snackBar.openFromTemplate(this.iconData, this.msgConfig).afterDismissed().subscribe(() => {
            this.handleValueChange(this.values);
        });
        this.setBgColor('message-class-info', this.uiCustomizeService.toastConfig.infoColor);
        this.setBgColor('message-class-warn', this.uiCustomizeService.toastConfig.warnColor);
        this.setBgColor('message-class-error', this.uiCustomizeService.toastConfig.errorColor);
        this.setBgColor('message-class-success', this.uiCustomizeService.toastConfig.successColor);

    }
    setBgColor(className, color) {
        if (color && className) {
            var infoElements = document.getElementsByClassName(className);
            for (var i = 0; i < infoElements.length; i++) {
                infoElements[i].setAttribute("style", 'background-color: ' + color + ';');
            }
        }
    }
    get getIcon() {
        switch (this.messageType) {
            case 'success':
                this.title = 'Success!';
                return 'done';
            case 'error':
                this.title = 'Error!';
                return 'error';
            case 'warn':
                this.title = 'Warning!';
                return 'warning';
            case 'info':
                this.title = 'Information!';
                return 'info';
        }
    }
    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }
    close() {
        this.snackBar.dismiss();
    }
    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerMsgs) {
            this.innerMsgs = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }



}
