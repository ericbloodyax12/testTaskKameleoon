import React, {useState} from 'react';
import {useData} from "../../context/DataContext.tsx";
import {TextField} from "../../components/common/textField/TextField.tsx";
import {NavigateButton} from "../../components/common/navigateButton/NavigateButton.tsx";


import './dashboardPage.scss'
import {ESites, SITE_COLORS, SITE_URLS, Test} from "../../services/api.ts";
import {EPathCaption, getNavigateButtonCaption} from "../../utils/getNavigateButtonCaption.ts";
import {NavigateOptions, useNavigate} from "react-router-dom";
import {paths} from "../../routes/Routes.tsx";
import {DashboardTd} from "../../components/common/dashboardComponent/dashboardTd/DashboardTd.tsx";
import {SortColumn} from "../../components/common/dashboardComponent/sortColumn/sortColumn.tsx";
import {TableHeader} from "../../components/common/dashboardComponent/tableHeader/TableHeader.tsx";

type TDashboardPageProps = {}

export const DashboardPage: React.FC<TDashboardPageProps> = ({}) => {

    const {tests, loading, error, setTests} = useData();
    const [direction, setDirection] = useState<'asc' | 'desc'>("asc")
    const [filterValue, setFilterValue] = useState('');
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
        test.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    return (
        <div className={"main-div-container-dashboard"}>
            <TextField filter={filterValue} setFilter={setFilterValue} count={filteredTests.length}/>
            {
                filteredTests.length > 0
                    ? <table className={"table-container"}>
                       <TableHeader
                           columns={[
                               { label: 'Name', customStyles: { paddingLeft: '19px' } },
                               {
                                   label: 'Type',
                                   isSortable: true,
                                   renderSortComponent: () => (
                                       <SortColumn
                                           setTests={setTests}
                                           filteredTests={filteredTests}
                                           setDirection={setDirection}
                                           direction={direction}
                                       />
                                   ),
                               },
                               { label: 'Status' },
                               { label: 'Site' },
                               { label: '' },
                           ]}
                       />
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
                                            buttonText={getNavigateButtonCaption(test.status) === EPathCaption.FINALIZE ? "finalize" : "results"}
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

