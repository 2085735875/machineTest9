import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";


export class AsynEmailValidators{
    static isEmailAvailable(control : AbstractControl) : Promise <ValidationErrors | null> | Observable<ValidationErrors | null>{
        let val : string = control.value as string
        const promise = new Promise <ValidationErrors | null> ((resolve, reject) => {
            setTimeout( () => {
                if(val == 'rd7@gmail.com'){
                    resolve({
                        emailExistErr : 'This email id is already exist'
                    })
                }
                else{
                    resolve(null)
                }
            }, 2000)
        })
        return promise
    }
}