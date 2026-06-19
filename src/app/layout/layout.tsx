import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import Login from '../../pages/auth/login/login';

const Layout = () => {
    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <div>
            <header>
                <nav>
                    {token ? (
                        <NavLink to="/"></NavLink>
                    ) : (
                        <>
                        <Login/>
                        </>
                    )}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout