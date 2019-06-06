import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { C } from '@angular/core/src/render3';
import { IndicatorColors } from './components/indicator-dot/indicator-dot.component';
import { SingleInput } from './components/input-wrapper/input-wrapper.component';
import { ValueTransformer } from '@angular/compiler/src/util';

const MAX_LANGUAGES = 3;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    public currentProgress: number = 0;
    public currentStep: number = 1;
    public value: number = 0;
    public variationCount: number = 0;

    public availableLanguages: SingleLanguage[] = [
        { label: 'C', checked: false, value: 'c', color: IndicatorColors.white },
        { label: 'C++', checked: false, value: 'cpp', color: IndicatorColors.white },
        { label: 'C#', checked: false, value: 'c#', color: IndicatorColors.white },
        { label: 'Java', checked: false, value: 'java', color: IndicatorColors.white },
        { label: 'Python', checked: false, value: 'python', color: IndicatorColors.white }
    ];
    public firstInputs: SingleInput[] = [
        { label: 'Imię', pattern: '[A-ZĄĘŁŃÓŚĆŹŻ][a-ząćęłńóśźż]{1,19}', placeholder: 'Imię', value: '', color: IndicatorColors.white },
        { label: 'Nazwisko', pattern: '[A-ZĄĘŁŃÓŚĆŹŻ][a-ząćęłńóśźż]{1,19}', placeholder: 'Nazwisko', value: '', color: IndicatorColors.white },
        { label: 'Miasto', pattern: '[A-ZĄĘŁŃÓŚĆŹŻ][a-ząćęłńóśźż]{1,19}', placeholder: 'Miasto', value: '', color: IndicatorColors.white },
        { label: 'Kod pocztowy', pattern: '[0-9][0-9]-[0-9]{3}', placeholder: 'Kod pocztowy', value: '', color: IndicatorColors.white },
    ];
    public selectedProvince = {
        value: 0,
        color: IndicatorColors.white
    };
    public secondInputs: SingleInput[] = [
        { label: 'E-mail', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$', placeholder: 'E-mail', value: '', color: IndicatorColors.white, type: 'email' },
        { label: 'IP', pattern: '^([0-9]{1,3}\.){3}[0-9]{1,3}$', placeholder: 'IP', value: '', color: IndicatorColors.white },
        { label: 'URL', pattern: '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/|ftps:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$', placeholder: 'URL', value: '', color: IndicatorColors.white, type: 'url' },
    ]
    public password: SingleInput = {
        label: 'Hasło', pattern: '[^ ]{6,}', placeholder: 'Hasło', value: '', color: IndicatorColors.white, type: 'password'
    }

    private languagesCounter = 0;
    private allSteps: ElementRef[];


    scorePassword() {
        var score = 0;
        var passLength = this.password.value;
        this.onPasswordChange(this.password.value);

        if (!this.password)
            return score;

        var letters = new Object();
        for (var i = 0; i < parseInt(passLength); i++) {
            letters[this.password[i]] = (letters[this.password[i]] || 0) + 1;
            score += 5.0 / letters[this.password[i]];
        }

        var variations = {
            digits: /\d/.test(passLength),
            lower: /[a-z]/.test(passLength),
            upper: /[A-Z]/.test(passLength),
            nonWords: /\W/.test(passLength),
        }

        this.variationCount = 0;
        for (var check in variations) {
            this.variationCount += (variations[check] == true) ? 1 : 0;
        }
        score += (this.variationCount - 1) * 15;

        return score;
    }

    onPasswordChange(pass) {
        if (pass.value !== '') {
            if (pass.match(this.password.pattern)) {
                if (this.password.color !== IndicatorColors.green) this.currentProgress++;
                this.password.color = IndicatorColors.green;
            } else {
                if (this.password.color === IndicatorColors.green) this.currentProgress--;
                this.password.color = IndicatorColors.red;
            }
        } else {
            if (this.password.color === IndicatorColors.green) this.currentProgress--;
            this.password.color = IndicatorColors.white;
        }
    }

    updateMeter() {
        var score = this.scorePassword();
        this.value = 0;

        if (score >= 15)
            this.value = 1;

        if (score > 20)
            this.value = 2;

        if (score > 40)
            this.value = 3;
    }

    @ViewChild('step1') step1: ElementRef;
    @ViewChild('step2') step2: ElementRef;
    @ViewChild('step3') step3: ElementRef;

    ngOnInit() { }

    ngAfterViewInit() {
        this.allSteps = [this.step1, this.step2, this.step3];
    }

    onLanguageChange(index: number) {
        let langObj = this.availableLanguages[index];
        if (langObj.checked) {
            if (this.languagesCounter < 3) {
                this.languagesCounter++;
                this.currentProgress++;
                langObj.color = IndicatorColors.green;
            } else {
                langObj.color = IndicatorColors.red
            }
        } else {
            if (langObj.color === IndicatorColors.green) {
                this.languagesCounter--;
                this.currentProgress--;
                this.updateLanguages();
            }
            langObj.color = IndicatorColors.white;
        }
    }

    onInputsChange(index: number, arr: SingleInput[]) {
        let input = arr[index];
        if (input.value !== '') {
            if (input.value.match(input.pattern)) {
                if (input.color !== IndicatorColors.green) this.currentProgress++;
                input.color = IndicatorColors.green;
            } else {
                if (input.color === IndicatorColors.green) this.currentProgress--;
                input.color = IndicatorColors.red;
            }
        } else {
            if (input.color === IndicatorColors.green) this.currentProgress--;
            input.color = IndicatorColors.white;
        }
        if (index == 3) {
            if (input.value.match("^([0-9][0-9])$")) {
                input.value += '-';
            }
        }
    }

    private updateLanguages() {
        for (let lang of this.availableLanguages) {
            if (lang.checked && lang.color === IndicatorColors.red && this.languagesCounter < 3) {
                this.languagesCounter++;
                this.currentProgress++;
                lang.color = IndicatorColors.green;
            }
        }
    }

    submit() {
        this.languagesCounter = 0;
        this.currentProgress = 0;
        this.password.value = '';
        this.value = 0;
        this.variationCount = 0;

        this.selectedProvince.value = 0;
        this.selectedProvince.color = IndicatorColors.white;

        this.password.color = IndicatorColors.white;

        for (let index of this.availableLanguages) {
            index.checked = false;
            index.color = IndicatorColors.white;
        }

        for (let index of this.firstInputs) {
            index.value = '';
            index.color = IndicatorColors.white;
        }

        for (let index of this.secondInputs) {
            index.value = '';
            index.color = IndicatorColors.white;
        }

        if (this.currentStep > 1) {
            this.hideSection();
            this.currentStep = 1;
            this.showSection()
        }

        for (let i = 0; i < 5; i++) {
            this.onLanguageChange(i);
        }
    }

    previousSection() {
        if (this.currentStep > 1) {
            this.hideSection();
            this.currentStep--;
            this.showSection()
        }
    }

    nextSection() {
        if (this.currentStep < 3) {
            this.hideSection();
            this.currentStep++;
            this.showSection();
        }
    }

    private hideSection() {
        this.allSteps[this.currentStep - 1].nativeElement.style.display = 'none';
    }

    private showSection() {
        this.allSteps[this.currentStep - 1].nativeElement.style.display = 'block';
    }

    onProvinceSelected() {
        if (this.selectedProvince.value !== 0 && this.selectedProvince.color !== IndicatorColors.green) {
            this.currentProgress++;
            this.selectedProvince.color = IndicatorColors.green;
        } else if (this.selectedProvince.value === 0) {
            this.currentProgress--;
            this.selectedProvince.color = IndicatorColors.red;
        }
    }

}

export interface SingleLanguage {
    label: string;
    checked: boolean;
    value: string;
    color: IndicatorColors;
}
