import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAppContext } from "store";

export default function LoginRequiredRoute({ component: Component,...kwargs }) {
    const { store: { isAuthenticated } } = useAppContext();
    let location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/accounts/login" state={{ from:location }} />
    }

    return <Outlet />
    }

//    return (
//        <Route {...kwargs} render={props => {
//            if (isAuthenticated) {
//                return <Component {...props} />;
//            }
//            else {
//                return (
//                    <Redirect to={{
//                        pathname: "/accounts/login",
//                        state: { from: props.location }
//                    }} />
//                );
//            }
//        }} />
//    );
