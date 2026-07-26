import { index as passkeyOptions, store as passkeyStore } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
import { ConfirmPasswordForm } from '@/components/domain/auth/confirm-password-form';
import { VerifyPasskey } from '@/components/domain/auth/verify-passkey';
import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPasswordPage({ showPasskey = true }: { showPasskey?: boolean }) {
    return (
        <>
            {showPasskey && <VerifyPasskey routes={{ options: passkeyOptions(), submit: passkeyStore() }} label="Confirm with passkey" loadingLabel="Confirming..." separator="Or confirm with password" />}

            <ConfirmPasswordForm />
        </>
    );
}

ConfirmPasswordPage.layout = [AuthLayout, { title: 'Confirm Password', description: 'This is a secure area of the application. Please confirm your password before continuing.' }];
