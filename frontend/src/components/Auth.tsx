import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignupInput } from '@anil-prasad/medium-common';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface LabelledInputProps {
    label: string;
    type: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, type, placeholder, onChange }: LabelledInputProps) {
    return (
        <div className='flex flex-col'>
            <label className='text-slate-800 text-xl font-medium'>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className='border border-slate-500 rounded-lg p-2'
            />
        </div>
    );
}

function Auth({ type }: { type: 'signup' | 'signin' }) {
    const navigate = useNavigate()
    const [postInputs, setInputs] = useState<SignupInput>({
        name: '',
        email: '',
        password: '',
    });
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? 'signup' : 'signin'}`, postInputs);
            const jwt = response.data;
            localStorage.setItem('token', jwt);
            navigate('/blogs')
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    }
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div>
                <div className='px-8'>
                    <div className='text-4xl font-bold'>
                        Create an account
                    </div>
                    <div className='text-slate-400 mt-1'>
                        {type === 'signup' ? 'Already have an account?' : "Don't have an account"}
                        <Link className='pl-2 underline' to={type === 'signup' ? '/signin' : '/signup'}>
                            {type === 'signup' ? 'Sign In' : 'Sign Up'}
                        </Link>
                    </div>
                </div>
                <div className='pt-8 mt-4 flex flex-col gap-2'>
                    {type === 'signup' && (
                        <LabelledInput
                            label='Name'
                            type='text'
                            placeholder='Enter your name'
                            onChange={(e) => {
                                setInputs({
                                    ...postInputs,
                                    name: e.target.value,
                                });
                            }}
                        />
                    )}
                    <LabelledInput
                        label='Email'
                        type='email'
                        placeholder='Enter your email'
                        onChange={(e) => {
                            setInputs({
                                ...postInputs,
                                email: e.target.value,
                            });
                        }}
                    />
                    <LabelledInput
                        label='Password'
                        type='password'
                        placeholder='Enter your password'
                        onChange={(e) => {
                            setInputs({
                                ...postInputs,
                                password: e.target.value,
                            });
                        }}
                    />
                    <button onClick={sendRequest} className='bg-slate-900 mt-2 w-full text-white px-5 py-3 rounded-lg hover:bg-slate-950'>
                        {type === 'signup' ? 'Sign up' : 'Sign In'}
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Auth;
