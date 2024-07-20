import { AbstractControl, ValidationErrors } from "@angular/forms";

export class EmpIdValidator{
    static isEmpIdValid (control : AbstractControl) : null | ValidationErrors{
        let val = control.value as string;
        if(!val){
            return null
        }
        let regexp = /^[A-Z]\d{3}$/;
        let isValid = regexp.test(val)

        if(isValid){
            return null
        }
        else{
            return {
                inValidEmpId : 'Emp Id must be start with one Alphabet and ends with 3 numbers'
            }
        }
    }
}