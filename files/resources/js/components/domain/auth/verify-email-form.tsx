import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldSet } from '@/components/ui/field';
import { send } from '@/routes/verification';

function VerifyEmailForm() {
    return (
        <>
            <Form {...send.form()} disableWhileProcessing>
                {({ processing }) => (
                    <>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <Button type="submit" processing={processing} tabIndex={5} data-test="register-user-button">
                                        Resend verification email
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

export { VerifyEmailForm };
