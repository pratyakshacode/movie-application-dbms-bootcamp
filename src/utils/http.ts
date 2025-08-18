import axios from "axios";

function joinURL(baseURL: string, url: string) {
    return `${baseURL}/${url}`;
}

class Service {

    domain;
    constructor() {
        this.domain = "";
        if (import.meta.env.VITE_BZENV === "development") {
        this.domain = "http://localhost:3000";
        }
    }

    async request(url: string, method = "POST", data?: any) {
        url = joinURL(this.domain, "api/" + url);

        const res = await axios.request({
        url,
        method,
        data,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
        });
        return res.data;
    }

    post(url: string, data: any) {
        const method = "POST";
        return this.request(url, method, data);
    }

    get(url: string) {
        const method = "GET";
        console.log(url,)
        return this.request(url, method);
    }

    delete(url: string, data: any) {
        const method = "DELETE";
        return this.request(url, method, data);
    }

    put(url: string, data: any) {
        const method = "PUT";
        return this.request(url, method, data);
    }

    patch(url: string, data: any) {
        const method = "PATCH";
        return this.request(url, method, data);
    }


    getBaseURL = () => {
        if (import.meta.env.VITE_BZENV === "development") {
        return import.meta.env.VITE_DEV_PROXY || "http://localhost:3000"; // fallback proxy
        }
        return window.location.origin;
    };
}

export default Service