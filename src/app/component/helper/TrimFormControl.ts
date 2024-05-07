import {FormControl} from "@angular/forms";

export class TrimFormControl extends FormControl {
  private _value!: string | null;

  // @ts-ignore
  get value(): string | null {
    return this._value;
  }
  // @ts-ignore
  set value(value: string | null) {
    this._value = value ? value.trim() : value;
  }
}
