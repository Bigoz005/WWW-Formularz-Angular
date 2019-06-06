import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IndicatorColors } from '../indicator-dot/indicator-dot.component';

@Component({
    selector: 'app-input-wrapper',
    templateUrl: './input-wrapper.component.html',
    styleUrls: ['./input-wrapper.component.css']
})
export class InputWrapperComponent implements OnInit {
    @Input() inputObj: SingleInput;
    @Input() secondClass: boolean = false;
    
    @Output() onChange: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit() {}
}

export interface SingleInput {
    label: string;
    value: string;
    placeholder: string;
    pattern: string | RegExp;
    color: IndicatorColors;
    type?: string;
}