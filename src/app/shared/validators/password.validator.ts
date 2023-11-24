import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (!control) {
            return null;
        }

        const pass = control.get(
            'password'
        );

        const rePass = control.get(
            'passwordRepeat'
        );

        if (pass.value || rePass.value) {
            if (pass.value !== rePass.value) {
                pass.setErrors({
                    ...pass.errors,
                    'doNotMatch': true
                });
                rePass.setErrors({
                    ...rePass.errors,
                    'doNotMatch': true
                });
            } else {

                if (pass.hasError('doNotMatch')) {
                    delete pass.errors['doNotMatch'];
                    pass.updateValueAndValidity();
                }

                if (rePass.hasError('doNotMatch')) {
                    delete rePass.errors['doNotMatch'];
                    rePass.updateValueAndValidity();
                }
            };
        }

        return null;
    };
}