import { Component, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormControlTemplate } from './formControlTemplate.model';

@Component({
  selector: 'app-base-form',
  standalone: true,
  imports: [],
  template: ''
})
export class BaseFormComponent {
  _fb: FormBuilder;
  formGroup: FormGroup | any;
  formControlTemplate: FormControlTemplate[] = [];

  constructor() {
    this._fb = inject(FormBuilder);
  }

  setForm(item: any) {
    this.setFormGroup()

    if(item) 
      this.formGroup.patchValue(item);
  }

  setFormGroup() {
    let group: any = {}

    this.formControlTemplate.forEach(item => {
      group[item.key] = new FormControl({ value: item.value || null, disabled: item.disabled }, this.getFormValidators(item))
    })

    this.formGroup = this._fb.group(group);

  }

  getFormValidators(control: any): ValidatorFn[] {
    let validators: any[] = [];
    if (control.required) {
      validators.push(Validators.required);
    }

    if (control.min) {
      validators.push(Validators.min(control.min));
    }

    if (control.max) {
      validators.push(Validators.max(control.max));
    }

    if (control.minLength || control.len) {
      validators.push(Validators.minLength(control.minLength));
    }

    if (control.maxLength || control.len) {
      validators.push(Validators.maxLength(control.maxLength));
    }

    if (control.pattern) {
      validators.push(Validators.pattern(control.pattern));
    }

    if (control.email) {
      validators.push(Validators.email);
    }

    return validators;
  }

}
