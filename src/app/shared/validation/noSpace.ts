import { AbstractControl, ValidationErrors } from "@angular/forms";


export class NoSpaceValidator {
    static npSpace(control : AbstractControl) : null | ValidationErrors{

        let val = control.value as string;
        if(!val){
            return null
        }
        if(val.includes(" ")){
            return {
                noSpaceError : 'SpaceBar is not allowed.'
            }
        }
        else{
            return null
        }
   }

}