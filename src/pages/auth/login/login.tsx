import { EyeIcon, EyeOffIcon,  } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../store/store';
import { loginUser } from '../../../api/auth/auth';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const { status, error, token } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isInvalid = (val: string) => val.length > 0 && val.length < 3;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ username: fullName, password }));
         
    };

    return (
        <div className="flex mt-30 items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 shadow-2xl rounded-2xl border border-gray-100">

                <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-8">
                    Login
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            FullName
                        </label>
                        <input
                            minLength={3}
                            maxLength={50}
                            type="text"
                            placeholder="Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={`w-full px-4 py-2.5 border rounded-lg outline-none transition duration-200 focus:ring-2 focus:ring-blue-100 ${
                                isInvalid(fullName)
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:border-blue-500'
                            }`}
                        />
                        {isInvalid(fullName) && (
                            <p className="text-red-500 text-xs mt-1">Minimum 3 characters required</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                minLength={3}
                                maxLength={50}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-2.5 border rounded-lg outline-none transition duration-200 focus:ring-2 focus:ring-blue-100 pr-11 ${
                                    isInvalid(password) ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 text-gray-400 hover:text-gray-600 transition">
                                {showPassword ? (
                                    <EyeOffIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {isInvalid(password) && (
                            <p className="text-red-500 text-xs mt-1">Minimum 3 characters required</p>
                        )}
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg mt-2 disabled:opacity-50">
                        {status === 'loading' ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-600 font-medium hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;