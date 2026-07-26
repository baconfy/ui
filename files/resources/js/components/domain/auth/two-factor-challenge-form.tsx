import { Form } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldActions, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';

type TwoFactorMode = 'code' | 'recovery_code';

type Props = {
    mode?: TwoFactorMode;
    onModeChange?: (mode: TwoFactorMode) => void;
    submitLabel?: string;
    togglePrefix?: string;
    toggleLabel?: string;
};

function TwoFactorChallengeForm({ mode = 'code', onModeChange, submitLabel = 'Continue', togglePrefix = 'or you can', toggleLabel = 'use another method' }: Props = {}) {
    const [code, setCode] = useState<string>('');

    const usesRecoveryCode = mode === 'recovery_code';

    const toggleMode = (clearErrors: () => void): void => {
        clearErrors();
        setCode('');
        onModeChange?.(usesRecoveryCode ? 'code' : 'recovery_code');
    };

    return (
        <Form {...store.form()} resetOnError resetOnSuccess={!usesRecoveryCode} disableWhileProcessing>
            {({ processing, errors, clearErrors }) => (
                <FieldSet>
                    <FieldGroup>
                        {usesRecoveryCode ? (
                            <Field>
                                <FieldLabel className="sr-only">Recovery code</FieldLabel>
                                <Input name="recovery_code" type="text" autoFocus required placeholder="Enter recovery code" />
                                <FieldError children={errors.recovery_code} />
                            </Field>
                        ) : (
                            <Field>
                                <InputOTP name="code" maxLength={OTP_MAX_LENGTH} value={code} onChange={setCode} pattern={REGEXP_ONLY_DIGITS} aria-label="Authentication code" containerClassName="justify-center" autoFocus>
                                    <InputOTPGroup>
                                        {Array.from({ length: OTP_MAX_LENGTH }, (_, index) => (
                                            <InputOTPSlot key={index} index={index} />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                                <FieldError className="text-center" children={errors.code} />
                            </Field>
                        )}
                    </FieldGroup>

                    <FieldActions>
                        <Button type="submit" processing={processing} data-test="two-factor-challenge-button">
                            {submitLabel}
                        </Button>

                        <FieldDescription className="text-center">
                            {togglePrefix}{' '}
                            <Button type="button" variant="link" size="sm" className="h-auto p-0" onClick={() => toggleMode(clearErrors)} data-test="toggle-recovery-mode">
                                {toggleLabel}
                            </Button>
                        </FieldDescription>
                    </FieldActions>
                </FieldSet>
            )}
        </Form>
    );
}

export { TwoFactorChallengeForm, type TwoFactorMode };
