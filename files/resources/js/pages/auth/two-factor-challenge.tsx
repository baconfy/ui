import { setLayoutProps } from '@inertiajs/react';
import { useMemo, useState } from 'react';

import type { TwoFactorMode } from '@/components/domain/auth/two-factor-challenge-form';
import { TwoFactorChallengeForm } from '@/components/domain/auth/two-factor-challenge-form';
import AuthLayout from '@/layouts/auth-layout';

export default function TwoFactorChallengePage() {
    const [mode, setMode] = useState<TwoFactorMode>('code');

    const content = useMemo<{ title: string; description: string; toggleLabel: string }>(() => {
        if (mode === 'recovery_code') {
            return {
                title: 'Recovery code',
                description: 'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleLabel: 'login using an authentication code',
            };
        }

        return {
            title: 'Authentication code',
            description: 'Enter the authentication code provided by your authenticator application.',
            toggleLabel: 'login using a recovery code',
        };
    }, [mode]);

    setLayoutProps({ title: content.title, description: content.description });

    return <TwoFactorChallengeForm mode={mode} onModeChange={setMode} toggleLabel={content.toggleLabel} />;
}

TwoFactorChallengePage.layout = [AuthLayout, { title: 'Two-factor Authentication', description: 'Please confirm access to your account by entering the authentication code provided by your authenticator application.' }];
