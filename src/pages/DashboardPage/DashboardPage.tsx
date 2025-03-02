import React, {useState} from 'react';
import {useData} from "../../context/DataContext.tsx";
import {TextField} from "../../components/common/textField/TextField.tsx";
import {NavigateButton} from "../../components/common/navigateButton/NavigateButton.tsx";


import './dashboardPage.scss'
import {ESites, SITE_COLORS, SITE_URLS, Test} from "../../services/api.ts";
import {EPathCaption, getNavigateButtonCaption} from "../../utils/getNavigateButtonCaption.ts";
import {NavigateOptions, useNavigate} from "react-router-dom";
import {paths} from "../../routes/Routes.tsx";
import {DashboardTd} from "./dashboardTd/DashboardTd.tsx";

type TDashboardPageProps = {}

export const DashboardPage: React.FC<TDashboardPageProps> = ({}) => {

    const {tests, loading, error} = useData();
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();


    const navigator = (test: Test): [string, NavigateOptions] => {
        const pathTrack = getNavigateButtonCaption(test.status) === EPathCaption.FINALIZE
        return pathTrack
            ? [paths.FINALIZE(test.id), {state: {testName: test.name, headerCaption: EPathCaption.FINALIZE}}]
            : [paths.RESULTS(test.id), {state: {testName: test.name, headerCaption: EPathCaption.RESULTS}}]
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const filteredTests = tests.filter((test) =>
        test.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className={"main-div-container-dashboard"}>
            <TextField filter={filter} setFilter={setFilter} count={filteredTests.length}/>
            {
                filteredTests.length > 0
                    ? <table className={"table-container"}>
                        <thead>
                        <tr className={'column-names'}>
                            <th style={{paddingLeft: "19px"}}>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Site</th>
                            <></>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredTests.map((test) => (
                                <tr key={test.id} className={"table-container--row"}>
                                    <td>
                                        <div className="table-container__cell">
                                            <div className={"cell-name-color"}
                                                 style={{backgroundColor: SITE_COLORS[test.siteId as ESites]}}></div>
                                            <div className={"td-content--name"}>{test.name}</div>
                                        </div>
                                    </td>
                                    <DashboardTd className={"td-content--type"} content={test.type}/>
                                    <DashboardTd className={"td-content--status"} content={test.status}
                                                 statusClass={test.status.toLowerCase()}/>
                                    <DashboardTd className={"td-content--sites"}
                                                 content={SITE_URLS[test.siteId as ESites]}/>
                                    <td>
                                        <NavigateButton
                                            isTableButton
                                            buttonStyle={getNavigateButtonCaption(test.status) === EPathCaption.FINALIZE ? "finalize" : "results"}
                                            onNavigate={() => {
                                                const [path, options] = navigator(test)
                                                navigate(path, options)
                                            }}
                                        >
                                            {getNavigateButtonCaption(test.status)}
                                        </NavigateButton>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    : <div className={"results-not-found"}> Your search did not match any results. </div>
            }

        </div>
    )
        ;
}

