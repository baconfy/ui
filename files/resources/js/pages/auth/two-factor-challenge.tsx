import { Head, setLayoutProps } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import AuthLayout from '@/layouts/auth-layout';

export default function TwoFactorChallengePage() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{ title: string; description: string; toggleText: string }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery code',
                description: 'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleText: 'login using an authentication code',
            };
        }

        return {
            title: 'Authentication code',
            description: 'Enter the authentication code provided by your authenticator application.',
            toggleText: 'login using a recovery code',
        };
    }, [showRecoveryInput]);

    setLayoutProps({ title: authConfigContent.title, description: authConfigContent.description });

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Two-factor Authentication" />
        </>
    );
}

TwoFactorChallengePage.layout = (page: ReactNode) => <AuthLayout children={page} />;
