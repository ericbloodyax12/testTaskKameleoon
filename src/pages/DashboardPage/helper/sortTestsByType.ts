import {Test} from "../../../services/api.ts";


export const sortTestsByType = (filteredTests: Test[], direction: 'asc' | 'desc'): Test[] => {
    return filteredTests.sort((a,b) => {
        return (direction === "asc" ? b.type.localeCompare(a.type) : a.type.localeCompare(b.type))
    })
}