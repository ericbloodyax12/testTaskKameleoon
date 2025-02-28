import React, {useState} from 'react';
import {useData} from "../../context/DataContext.tsx";
import {TextField} from "../../components/common/textField/TextField.tsx";
import {NavigateButton} from "../../components/common/navigateButton/NavigateButton.tsx";


import './dashboardPage.scss'
import {ESites, SITE_COLORS, SITE_URLS} from "../../services/api.ts";
import {getNavigateButtonCaption} from "../../utils/getNavigateButtonCaption.ts";

type TDashboardPageProps = {}

export const DashboardPage: React.FC<TDashboardPageProps> = ({}) => {

    const {tests, loading, error} = useData();
    const [filter, setFilter] = useState('');

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
            <TextField filter={filter} setFilter={setFilter}/>
            <table className={"table-container"}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Site</th>
                    <th>Status</th>
                    <></>
                </tr>
                </thead>
                <tbody>
                {filteredTests.length > 0 ? (
                    filteredTests.map((test) => (
                        <tr key={test.id}>
                            <td>
                                <div className="table-container__cell">
                                    <div className={"cell-name-color"} style={{backgroundColor:SITE_COLORS[test.siteId as ESites] }}></div>
                                    <div className={"td-content"}>{test.name}</div>
                                </div>
                            </td>
                            <td>{test.type}</td>
                            <td>{test.status}</td>
                            <td>{SITE_URLS[test.siteId as ESites]}</td>
                            <td><NavigateButton>{getNavigateButtonCaption(test.status)}</NavigateButton></td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4}>Your search did not match any results.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
        ;
}

