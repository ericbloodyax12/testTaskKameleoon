import {ESites, SITE_COLORS, SITE_URLS, Test} from "../../../../services/api.ts";
import {EPathCaption, getNavigateButtonCaption} from "../../../../utils/getNavigateButtonCaption.ts";
import {paths} from "../../../../routes/Routes.tsx";
import {TableHeader} from "../tableHeader/TableHeader.tsx";
import {SortColumn} from "../sortColumn/sortColumn.tsx";
import {DashboardTd} from "../dashboardTd/DashboardTd.tsx";
import {NavigateButton} from "../../navigateButton/NavigateButton.tsx";
import {Dispatch, FC, SetStateAction} from "react";
import {NavigateOptions, useNavigate} from "react-router-dom";

import "./dashboard.scss"

type DashboardTableProps = {
    filteredTests: Test[]; // Отфильтрованные тесты
    setTests: Dispatch<SetStateAction<Test[]>>; // Функция для обновления тестов
    direction: 'asc' | 'desc'; // Направление сортировки
    setDirection: Dispatch<SetStateAction<"asc" | "desc">>; // Функция для изменения направления сортировки
};

export const DashboardTable: FC<DashboardTableProps> = ({
                                                            filteredTests,
                                                            setTests,
                                                            direction,
                                                            setDirection,
                                                        }) => {
    const navigate = useNavigate()
    const navigator = (test: Test): [string, NavigateOptions] => {
        const pathTrack = getNavigateButtonCaption(test.status) === EPathCaption.FINALIZE;
        return pathTrack
            ? [paths.FINALIZE(test.id), {state: {testName: test.name, headerCaption: EPathCaption.FINALIZE}}]
            : [paths.RESULTS(test.id), {state: {testName: test.name, headerCaption: EPathCaption.RESULTS}}];
    };

    return (
        <table className="table-container">
            <TableHeader
                columns={[
                    {label: 'Name', customStyles: {paddingLeft: '19px'}},
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
                    {label: 'Status'},
                    {label: 'Site'},
                    {label: ''}, // Пустой заголовок для кнопок
                ]}
            />
            <tbody>
            {filteredTests.map((test) => (
                <tr key={test.id} className="table-container--row">
                    <td>
                        <div className="table-container__cell">
                            <div className="cell-name-color"
                                 style={{backgroundColor: SITE_COLORS[test.siteId as ESites]}}></div>
                            <div className="td-content--name">{test.name}</div>
                        </div>
                    </td>
                    <DashboardTd className="td-content--type" content={test.type}/>
                    <DashboardTd className="td-content--status" content={test.status}
                                 statusClass={test.status.toLowerCase()}/>
                    <DashboardTd className="td-content--sites" content={SITE_URLS[test.siteId as ESites]}/>
                    <td>
                        <NavigateButton
                            isTableButton
                            buttonText={
                                getNavigateButtonCaption(test.status) === EPathCaption.FINALIZE ? 'finalize' : 'results'
                            }
                            onNavigate={() => {
                                const [path, options] = navigator(test);
                                navigate(path, options)
                            }}
                        >
                            {getNavigateButtonCaption(test.status)}
                        </NavigateButton>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};