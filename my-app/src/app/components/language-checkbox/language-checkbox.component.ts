import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SingleLanguage } from 'src/app/app.component';

@Component({
    selector: 'app-language-checkbox',
    templateUrl: './language-checkbox.component.html',
    styleUrls: ['./language-checkbox.component.css']
})
export class LanguageCheckboxComponent implements OnInit {
    @Input() language: SingleLanguage;
    @Output() onChange: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit() {}
}
