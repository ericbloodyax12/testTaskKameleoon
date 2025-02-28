import {JSX} from "react";

import {DashboardPage} from "../pages/DashboardPage/DashboardPage.tsx";
import {ResultsPage} from "../pages/ResultsPage.tsx";
import {FinalizedPage} from "../pages/FinalizedPage.tsx";

export const paths = {
    DASHBOARD: '/',
    RESULTS: (testId: number) => `/results/${testId}`,
    FINALIZE:  (testId: number) => `/finalize/${testId}`,
};

type RouteConfigType = {
    routeName: string,
    path: string,
    element: JSX.Element,
    private?: boolean
}

export const routesConfig: RouteConfigType[] = [
    {
        routeName: "dashboard",
        path: paths.DASHBOARD,
        element: <DashboardPage/>,
    },
    {
        routeName: "results",
        path: '/results/:testId',
        element: <ResultsPage/>,
        private: false // можно будет потом задавать true типо для "авторизованных пользователей"  (добавил для примера)
    },
    {
        routeName: "finalize",
        path: '/finalize/:testId',
        element: <FinalizedPage/>,
    },
]