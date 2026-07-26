import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Field, FieldActions, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { store } from '@/routes/login';

function RegisterForm({ passwordRules }: { passwordRules: string }) {
    return (
        <>
            <Form {...store.form()} disableWhileProcessing resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Name</FieldLabel>
                                    <Input id="name" type="text" required autoFocus tabIndex={1} autoComplete="name" name="name" placeholder="Full name" disabled={processing} />
                                    <FieldError>{errors.name}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel>Email address</FieldLabel>
                                    <Input id="email" type="email" required tabIndex={2} autoComplete="email" name="email" placeholder="email@example.com" disabled={processing} />
                                    <FieldError>{errors.email}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Password id="password" required tabIndex={3} autoComplete="new-password" name="password" placeholder="Password" passwordrules={passwordRules} disabled={processing} />
                                    <FieldError>{errors.password}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel>Confirm password</FieldLabel>
                                    <Password id="password_confirmation" required tabIndex={4} autoComplete="new-password" name="password_confirmation" placeholder="Confirm password" passwordrules={passwordRules} disabled={processing} />
                                    <FieldError>{errors.password_confirmation}</FieldError>
                                </Field>
                            </FieldGroup>
                            <FieldActions>
                                <Button type="submit" className="mt-2 w-full" tabIndex={5} data-test="register-user-button">
                                    Create account
                                </Button>
                            </FieldActions>
                        </FieldSet>
                    </>
                )}
            </Form>
        </>
    );
}

export { RegisterForm };
