import { FormEvent, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import FormGroup from '@/Components/FormGroup';
import { ISharedProps } from '@/Components/interfaces';
import styled from 'styled-components';

const Form = styled.form`
    max-width: 100%;
`;

const Login: React.FC<ISharedProps> = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            {status && <div>{status}</div>}

            <Form onSubmit={submit}>
                <FormGroup>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} />
                </FormGroup>

                <FormGroup>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password}/>
                </FormGroup>

                <FormGroup>
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span>Remember me</span>
                    </label>
                </FormGroup>

                <FormGroup>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <PrimaryButton disabled={processing}>
                        Log in
                    </PrimaryButton>
                </FormGroup>
            </Form>
        </>
    );
}

export default Login;