import { RegisterForm } from '@/components/domain/auth/register-form';
import { Link } from '@/components/ui/link';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';

export default function RegisterPage({ passwordRules }: { passwordRules: string }) {
    return (
        <>
            <RegisterForm passwordRules={passwordRules} />

            <div className="flex flex-col gap-2 font-bold text-muted-foreground">
                <p>
                    Back to <Link href={login()}>login</Link>
                </p>
            </div>
        </>
    );
}

RegisterPage.layout = [AuthLayout, { title: 'Register', description: 'Enter your details below to create your account' }];
