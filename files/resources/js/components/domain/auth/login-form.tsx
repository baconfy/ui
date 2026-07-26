import { Form } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldActions, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { store } from '@/routes/login';

function LoginForm({ status }: { status?: string }) {
    return (
        <>
            <Form {...store.form()} disableWhileProcessing resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <>
                        <FieldSet>
                            {status && (
                                <FieldGroup>
                                    <Alert>
                                        <AlertDescription>{status}</AlertDescription>
                                    </Alert>
                                </FieldGroup>
                            )}
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Email address</FieldLabel>
                                    <Input type="email" name="email" autoFocus autoComplete="email" placeholder="email@example.com" disabled={processing} />
                                    <FieldError>{errors.email}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Password name="password" autoComplete="current-password" placeholder="Your password" disabled={processing} />
                                    <FieldError>{errors.password}</FieldError>
                                </Field>
                                <Field orientation="horizontal" className="w-fit">
                                    <Checkbox name="remember" />
                                    <FieldLabel>Remember me</FieldLabel>
                                </Field>
                            </FieldGroup>
                            <FieldActions>
                                <Button type="submit" processing={processing} data-test="login-button">
                                    Log in
                                </Button>
                            </FieldActions>
                        </FieldSet>
                    </>
                )}
            </Form>
        </>
    );
}

export { LoginForm };
