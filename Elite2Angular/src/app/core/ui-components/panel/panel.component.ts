import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
// import { MatExpansionPanel } from '@angular/material';
import { MatExpansionPanel } from "@angular/material/expansion";

@Component({
  selector: "s4-panel",
  templateUrl: "./panel.component.html",
  styleUrls: [],
})
export class PanelComponent implements OnInit {
  private innerReadOnly = false;

  // title for Panel
  @Input() title: string;
  // description for Panel
  @Input() description: string;

  @Input() columnFlexType: boolean = false;
  @Input() wrap: boolean = false;
  @Input() cardType: boolean = false;
  // id for Panel
  @Input() id: string;
  // collapsible for Panel
  @Input() collapsible = false;
  // disable (hide) the panel
  @Input() disabled: boolean = false;
  // toggle Emitter in the panel
  @Output() onToggle: EventEmitter<any> = new EventEmitter<any>();

  hidden = false;

  constructor() {}

  ngOnInit() {}

  get readonly(): boolean {
    return this.innerReadOnly;
  }

  @Input()
  set readonly(v: boolean) {
    if (v !== this.innerReadOnly) {
      this.innerReadOnly = v;

      // TODO: Add code to set inner elements to readonly (when applicable)
    }
  }

  onExpandPanel(panel: MatExpansionPanel, event: Event): void {
    if (!this.collapsible) {
      event.stopPropagation(); // Preventing event bubbling
      if (!this.isExpansionIndicator(event.target)) {
        panel.open(); // Here's the magic
      }
    } else {
      this.onToggle.emit(panel);
    }
  }

  private isExpansionIndicator(target: any): boolean {
    const expansionIndicatorClass = "mat-expansion-indicator";
    return (
      target.classList && target.classList.contains(expansionIndicatorClass)
    );
  }
}
