import React, {useState} from 'react';
import {useData} from "../../context/DataContext.tsx";

import './dashboardPage.scss'
import {TextField} from "../../components/common/textField/TextField.tsx";

type TDashboardPageProps = {}

export const DashboardPage: React.FC<TDashboardPageProps> = ({}) => {

    const { tests, loading, error } = useData();
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
            <table >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Site</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {filteredTests.length > 0 ? (
                        filteredTests.map((test) => (
                            <tr key={test.id}>
                                <td>{test.name}</td>
                                <td>{test.type}</td>
                                <td>{test.siteId}</td>
                    <td>{test.status}</td>
                    </tr>
                    ))
                    ) : (
                    <tr>
                    <td colSpan={4}>No results found.
                </td>
            </tr>
            )}
        </tbody>
</table>
</div>
)
    ;
}

