import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter-input',
  template: `
    <nz-input-group [nzSuffix]="suffixIconSearch" class="input-group">
      <input nz-input
             appFocus
             [(ngModel)]="value"
             type="text"
             placeholder="{{ placeholder? placeholder : ('Search')  }}"
             (input)="filterTextChanged()"
      />
    </nz-input-group>
    <ng-template #suffixIconSearch>
      <i nz-icon nzType="search"></i>
    </ng-template>
  `,
  styles: [`
    nz-input-group {
      width: 100%;
    }
  `]
})
export class FilterInputComponent implements OnInit {


  value: string="";
  @Input() placeholder!: string;
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  filterTextChanged(): void {
    this.filterChanged.emit(this.value);
  }

}
