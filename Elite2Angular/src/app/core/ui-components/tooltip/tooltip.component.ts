import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
@Component({
    selector: 's4-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: [],
})
export class TooltipComponent implements OnInit {

    @Input() disabled: boolean;
    // this is for  tool tip display data
    @Input() message: string;
    // this is for  tool tip position
    @Input() position: string;

    ngOnInit() {
    }
}
