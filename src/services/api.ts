export enum Type {
    CLASSIC = "CLASSIC",
    SERVER_SIDE = "SERVER_SIDE",
    MVT = "MVT"
}


export enum ESites {
    Market = 1,
    Delivery = 2,
    Games = 3
}

export const SITE_URLS: { [key in ESites]: string } = {
    [ESites.Market]: "https://market.company.com",
    [ESites.Delivery]: "https://www.delivery.company.com",
    [ESites.Games]: "http://games.company.com"
};
export const SITE_COLORS: { [key in ESites]: string } = {
    [ESites.Market]: "#E14165",
    [ESites.Delivery]: "#C2C2FF",
    [ESites.Games]: "#8686FF"
};


export enum Status {
    DRAFT = "DRAFT",
    ONLINE = "ONLINE",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
}

export interface Site {
    id: number;
    url: string;
}

export interface Test {
    id: number;
    name: string;
    type: Type;
    status: Status;
    siteId: number;
}

export class ApiService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getSites(): Promise<Site[]> {
        const response = await fetch(`${this.baseUrl}/sites`)
        if (!response.ok) {
            throw new Error('Failed to fetch sites');
        }
        return response.json();
    }
    async getTests(): Promise<Test[]> {
        const response = await fetch(`${this.baseUrl}/tests`);
        if (!response.ok) {
            throw new Error('Failed to fetch tests');
        }
        return response.json();
    }
    async getTestById(id: number): Promise<Test> {
        const response = await fetch(`${this.baseUrl}/tests/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch test with ID ${id}`);
        }
        return response.json();
    }
    async getSiteById(id: number): Promise<Site> {
        const response = await fetch(`${this.baseUrl}/tests/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch site with ID ${id}`);
        }
        return response.json();
    }



}

export const apiService = new ApiService('http://localhost:3100');