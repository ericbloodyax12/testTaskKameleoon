import {createBrowserRouter, createHashRouter, Navigate, RouterProvider} from "react-router-dom";
import {Layout} from "../components/layout/Layout.tsx";
import {paths, routesConfig} from "./Routes.tsx";
import {DashboardPage} from "../pages/DashboardPage/DashboardPage.tsx";
import {PrivateRouteWrapper} from "./PrivateRouteWrapper.tsx";


export const RouterWrapper = () => {
    const isAuth = true // пользователи авторизованы по умолчанию (захордкодил крч)

    const routeCreater = process.env.NODE_ENV === "development" ? createBrowserRouter  : createHashRouter // нужно для корректной работы gitHub pages..
    const router = routeCreater([
        {
            path: "/",
            element: <Layout/>,
            children: [
                ...routesConfig.map((route) =>
                    route.private
                    ?  {
                            path: route.path,
                            element: <PrivateRouteWrapper isAuth={isAuth ?? false}/>,
                            children: [
                                {
                                    path: "", // Путь по умолчанию для приватного маршрута
                                    element: route.element
                                }
                            ]
                        }
                        : {
                            path: route.path,
                            element: route.element,
                        }
                ),
                // Указываем маршрут по умолчанию
                {

                    index: true,
                    element: isAuth ? <DashboardPage/> : <DashboardPage/>, // компонент, который будет отображаться по умолчанию
                }
            ]
        },
        {
            path: "*",
            element: isAuth ? <Navigate to="/"/> : <Navigate to={paths.DASHBOARD}/>,
        },
    ]);
    return (
        <RouterProvider router={router}/>
    )
}