import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const app = () => {
    return <div id="main">
        <MainHeader/>
        <Outlet />
        <MainFooter/>
    </div>
}

export default app;