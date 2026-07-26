import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Field, FieldActions, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { update } from '@/routes/password';

function ResetPasswordForm({ token, email, passwordRules }: { token: string; email: string; passwordRules: string }) {
    return (
        <>
            <Form {...update.form()} transform={(data) => ({ ...data, token, email })} resetOnSuccess={['password', 'password_confirmation']} disableWhileProcessing>
                {({ processing, errors }) => (
                    <>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Email address</FieldLabel>
                                    <Input id="email" type="email" name="email" autoComplete="email" value={email} readOnly />
                                    <FieldError children={errors.email} />
                                </Field>
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Password id="password" name="password" autoComplete="new-password" autoFocus placeholder="Password" passwordrules={passwordRules} />
                                    <FieldError children={errors.password} />
                                </Field>
                                <Field>
                                    <FieldLabel>Confirm password</FieldLabel>
                                    <Password id="password_confirmation" name="password_confirmation" autoComplete="new-password" placeholder="Confirm password" passwordrules={passwordRules} />
                                    <FieldError children={errors.password_confirmation} />
                                </Field>
                            </FieldGroup>
                            <FieldActions>
                                <Button type="submit" processing={processing} data-test="reset-password-button">
                                    Reset password
                                </Button>
                            </FieldActions>
                        </FieldSet>
                    </>
                )}
            </Form>
        </>
    );
}

export { ResetPasswordForm };
