import {Status} from "../services/api.ts";

export enum ENavigateButtonCaption {
    "FINALIZE" = "Finalize",
    "RESULTS" =  "Results"
}

export const getNavigateButtonCaption = (status:Status) => {
    return status === Status.DRAFT ? "Finalize" : "Results";
}