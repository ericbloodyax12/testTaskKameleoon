import React, {useState} from 'react';
import {useData} from "../../context/DataContext.tsx";
import {TextField} from "../../components/common/textField/TextField.tsx";



import '../../components/common/dashboardComponent/dashboard/dashboard.scss'

import {DashboardTable} from "../../components/common/dashboardComponent/dashboard/Dashboard.tsx";

type TDashboardPageProps = {}

export const DashboardPage: React.FC<TDashboardPageProps> = ({}) => {

    const {tests, loading, error, setTests} = useData();
    const [direction, setDirection] = useState<'asc' | 'desc'>("asc")
    const [filterValue, setFilterValue] = useState('');

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
                    ? (
                        <DashboardTable
                            filteredTests={filteredTests}
                            setTests={setTests}
                            direction={direction}
                            setDirection={setDirection}
                        />
                    ) : (
                        <div className="results-not-found">Your search did not match any results.</div>
                    )}

        </div>
    )
        ;
}

