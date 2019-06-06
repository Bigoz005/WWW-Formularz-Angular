import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-indicator-dot',
    templateUrl: './indicator-dot.component.html',
    styleUrls: ['./indicator-dot.component.css']
})
export class IndicatorDotComponent implements OnInit {
    @Input() color: IndicatorColors;

    constructor() { }

    ngOnInit() {}
}

export enum IndicatorColors {
    white = "white",
    green = "green",
    red = "red"
}