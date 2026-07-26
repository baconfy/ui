import { Form } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { email } from '@/routes/password';

function ForgotPasswordForm({ status }: { status?: string }) {
    return (
        <>
            <Form {...email.form()} disableWhileProcessing resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <>
                        <FieldSet>
                            {status && (
                                <FieldGroup>
                                    <Alert variant="success">
                                        <AlertDescription>{status}</AlertDescription>
                                    </Alert>
                                </FieldGroup>
                            )}
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">Email address</FieldLabel>
                                    <Input id="email" type="email" name="email" autoFocus tabIndex={1} autoComplete="email" placeholder="email@example.com" disabled={processing} />
                                    {errors.email && <FieldError children={errors.email} />}
                                </Field>
                            </FieldGroup>
                            <FieldGroup>
                                <Field>
                                    <Button type="submit" processing={processing} data-test="email-password-reset-link-button">
                                        Email password reset link
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </>
                )}
            </Form>
        </>
    );
}

export { ForgotPasswordForm };
