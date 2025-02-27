import {paths} from "./Routes.tsx";
import {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";


// примерная реализация PrivateRouteWrapper для "авторизованных" пользователей
type TPrivateRouteWrapperProps = {
    isAuth: boolean;
};

export const PrivateRouteWrapper: FC<TPrivateRouteWrapperProps> = ({isAuth}) => {

    return isAuth ? <Outlet/> : <Navigate to={paths.DASHBOARD}/>;
}