import { Form } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, FieldActions, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { email } from '@/routes/password';

function ForgotPasswordForm({ status }: { status?: string }) {
    return (
        <>
            <Form {...email.form()} disableWhileProcessing>
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
                                    <FieldLabel>Email address</FieldLabel>
                                    <Input id="email" type="email" name="email" autoFocus tabIndex={1} autoComplete="email" placeholder="email@example.com" />
                                    <FieldError children={errors.email} />
                                </Field>
                            </FieldGroup>
                            <FieldActions>
                                <Button type="submit" processing={processing} data-test="email-password-reset-link-button">
                                    Email password reset link
                                </Button>
                            </FieldActions>
                        </FieldSet>
                    </>
                )}
            </Form>
        </>
    );
}

export { ForgotPasswordForm };
