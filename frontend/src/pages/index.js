import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import AccountRoutes from "./accounts";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import PostNew from "./PostNew";


function Root() {
    return (
        <>
            <Routes>
                <Route element={<LoginRequiredRoute /> }>
                   <Route path="/*" element={<Home />} />
                </Route>
                <Route path="/about" element={<About />} />
                <Route element={<LoginRequiredRoute /> }>
                   <Route path="/posts/new/*" element={<PostNew />} />
                </Route>
                <Route path="/accounts/*" element={<AccountRoutes />} />
            </Routes>
        </>
    )
}

export default Root;