import {AbstractControl} from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(c: AbstractControl) {
        const password = c.get('password').value;
        const confirmPassword = c.get('confirmPassword').value;

        if (password !== confirmPassword) {
            return { invalid: true};
        } else {
            return null;
        }
    }
}
