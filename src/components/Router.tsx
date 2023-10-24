import {Route, Routes} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {FC} from "react";

import {RoutesInt} from "../types/RoutesInt";
import {privateRoutes, publicRoutes} from "../utils/routes";
import Navigation from "./Navigation";
import { useTypeSelector} from "../hooks/redux";

 import SocketTs from "./SocketTS";
import Messages from "../pages/Messages";

const RouterComponent:FC = () => {
    const {user} = useTypeSelector(state => state.user)



    return (
        <div className='container'>

                <Router>
                    {window.innerWidth > 900 && user?.isAuth && <Navigation />}
                    <Routes>
                        {user?.isAuth ?
                            privateRoutes.map((route:RoutesInt, i:number) => <Route path={route.path} element={<route.element />} key={i} />)
                            :
                            publicRoutes.map((route: RoutesInt, i:number) => <Route path={route.path} element={<route.element />} key={i} /> )
                        }
								<Route path="*" element={<Messages/>} />
                    </Routes>
                </Router>
                <SocketTs />

        </div>
    )
}
export default  RouterComponent