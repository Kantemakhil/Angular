import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.css']
})
export class MyWorkComponent implements OnInit {

    @Input() nodes: any;

    constructor(private router: Router) { }

    ngOnInit() {
    }
    toggleChild(node) {
        const fieldElement = <HTMLInputElement>document.getElementById('subMenu'+node.id);
        fieldElement.hidden = !fieldElement.hidden;
        const arrowKeyUp = <HTMLInputElement>document.getElementById('aup'+node.id);
        const arrowKeyDown = <HTMLInputElement>document.getElementById('adown'+node.id);
        arrowKeyUp.hidden = fieldElement.hidden;
        arrowKeyDown.hidden=!fieldElement.hidden;
    }
    reDirect(link) {
        if (link !== null && link !== undefined && link !== '') {
          this.router.navigate([link]);
        }
      }
}
