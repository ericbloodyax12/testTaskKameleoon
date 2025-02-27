
import React, {createContext, useEffect, useState} from "react";
import {apiService, Site, Test} from "../services/api.ts";


interface DataContextType {
    tests: Test[];
    sites: Site[];
    loading: boolean;
    error: string | null;
}


const DataContext = createContext<DataContextType | undefined>(undefined);

export const  DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tests, setTests] = useState<Test[]>([]);
    const [sites, setSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [testsData, sitesData] = await Promise.all([apiService.getTests(), apiService.getSites()]);
                setTests(testsData);
                setSites(sitesData);
            }
            catch (err) {
                setError('Failed to load data');
            }
            finally {
                setLoading(false);
            }
        }
    }, [])

    return (
        <DataContext.Provider value={{ tests, sites, loading, error }}>
            {children}
        </DataContext.Provider>
    )
}
export const useData = () => {
    const context = React.useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};