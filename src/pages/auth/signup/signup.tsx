const Signup = () => {
    return (
        <div className="flex mt-5 items-center justify-center  px-4">
            <div className="w-full max-w-md bg-white p-8 shadow-2xl rounded-2xl border border-gray-100">
                <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-8">
                    Signup
                </h2>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            FullName
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            SurName
                        </label>
                        <input
                            type="text"
                            placeholder="surname"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg mt-2"
                    >
                        Signup
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </a>
                </p>

            </div>
        </div>
    )
}

export default Signup