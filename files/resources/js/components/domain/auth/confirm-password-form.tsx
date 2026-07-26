import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Field, FieldActions, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Password } from '@/components/ui/password';
import { store } from '@/routes/password/confirm';

function ConfirmPasswordForm({ submitLabel = 'Confirm password' }: { submitLabel?: string } = {}) {
    return (
        <Form {...store.form()} resetOnSuccess={['password']} disableWhileProcessing>
            {({ processing, errors }) => (
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <Password name="password" autoComplete="current-password" placeholder="Your password" autoFocus />
                            <FieldError children={errors.password} />
                        </Field>
                    </FieldGroup>

                    <FieldActions>
                        <Button type="submit" processing={processing} data-test="confirm-password-button">
                            {submitLabel}
                        </Button>
                    </FieldActions>
                </FieldSet>
            )}
        </Form>
    );
}

export { ConfirmPasswordForm };
