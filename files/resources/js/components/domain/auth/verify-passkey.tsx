import type { UrlMethodPair } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import { usePasskeyVerify } from '@laravel/passkeys/react';
import { KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldSeparator, FieldSet } from '@/components/ui/field';

type Props = {
    routes?: {
        options: UrlMethodPair;
        submit: UrlMethodPair;
    };
    label?: string;
    loadingLabel?: string;
    separator?: string;
};

function VerifyPasskey({ routes, label, loadingLabel, separator }: Props = {}) {
    const { verify, isLoading, error, isSupported } = usePasskeyVerify({
        ...(routes && {
            routes: {
                options: routes.options.url,
                submit: routes.submit.url,
            },
        }),
        onSuccess: (response) => {
            router.visit(response.redirect ?? '/dashboard');
        },
    });

    if (!isSupported) {
        return null;
    }

    return (
        <>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <Button type="button" variant="outline" onClick={verify} disabled={isLoading}>
                            {!isLoading && <KeyRound />}
                            {isLoading ? (loadingLabel ?? 'Authenticating...') : (label ?? 'Sign in with a passkey')}
                        </Button>
                        <FieldError children={error} />
                    </Field>
                </FieldGroup>
                <FieldSeparator>{separator ?? 'Or continue with email'}</FieldSeparator>
            </FieldSet>
        </>
    );
}

export { VerifyPasskey };
