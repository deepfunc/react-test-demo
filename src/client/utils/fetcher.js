import fetch from 'isomorphic-fetch';
import qs from 'querystring';

function FetchError(message, detail) {
    this.name = 'FetchError';
    this.message = message;
    this.detail = detail;
    this.stack = (new Error()).stack;
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;

function resHandlerForJSON(res) {
    if (res.status >= 400) {
        throw new FetchError(
            `fetch error. ${res.status} ${res.statusText}`,
            {status: res.status, statusText: res.statusText}
        );
    }
    else {
        return res.json();
    }
}

function defaultJSONHandler(json) {
    if (json.success) {
        return json.result;
    }
    else {
        throw new FetchError(
            `json result status error. ${json.error.message}`,
            {
                code: json.error.code,
                message: json.error.message,
                details: json.error.details
            }
        );
    }
}

const fetcher = {
    getJSON(url, params, customHeaders = undefined, credentials = 'include') {
        const headers = customHeaders ? new Headers(customHeaders) : new Headers();
        headers.append('Accept', 'application/json');
        const reqOpts = {method: 'GET', credentials, headers};
        const req = new Request(params ? `${url}?${qs.stringify(params)}` : url, reqOpts);
        return fetch(req).then(resHandlerForJSON).then(defaultJSONHandler);
    },

    postJSON(url, json = {}, customHeaders = undefined, credentials = 'include') {
        const headers = customHeaders ? new Headers(customHeaders) : new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json;charset=utf-8');
        const reqOpts = {method: 'POST', credentials, headers, body: JSON.stringify(json)};
        const req = new Request(url, reqOpts);
        return fetch(req).then(resHandlerForJSON).then(defaultJSONHandler);
    }
};

export { FetchError, fetcher };