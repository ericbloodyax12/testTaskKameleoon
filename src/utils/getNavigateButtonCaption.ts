import {Status} from "../services/api.ts";

export enum EPathCaption {
    "FINALIZE" = "Finalize",
    "RESULTS" =  "Results"
}

export const getNavigateButtonCaption = (status:Status) => {
    return status === Status.DRAFT ? EPathCaption.FINALIZE : EPathCaption.RESULTS;
}