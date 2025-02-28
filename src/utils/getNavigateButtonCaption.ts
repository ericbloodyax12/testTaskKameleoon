import {Status} from "../services/api.ts";


export const getNavigateButtonCaption = (status:Status) => {
    return status === Status.DRAFT ? "Finalize" : "Results";
}