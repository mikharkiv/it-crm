import {runInAction} from "mobx";
import {globalStores} from "../contexts";

export class Api {
	static mainUrl = 'http://localhost:8000/';
	static post = {'method': 'POST'};
	static put = {'method': 'PUT'};
	static delete = {'method': 'DELETE'};
	static json = {'Content-Type': 'application/json'};
	static postJson = Object.assign(Api.post, {'headers': Api.json});
	static putJson = Object.assign(Api.put, {'headers': Api.json});
	static deleteJson = Object.assign(Api.delete, {'headers': Api.json});

	static getLink(url, params) {
		let link = new URL(url);
		if (params) {
			if (params.hasOwnProperty('page') && params.page > 1) link.searchParams.append('page', params.page);
			if (params.hasOwnProperty('search') && params.search) link.searchParams.append('search', params.search);
		}
		return link.toString();
	}

	static async fetch(url, params) {
		if (!params) params = {};
		if (!params.headers) params.headers = {};
		return await Api.fetchNoToken(url, Object.assign(params,
			{headers: Object.assign(params.headers,
					{'Authorization': `Bearer ${localStorage.getItem('token')}`})}));
	}

	static async fetchNoToken(url, params) {
		return await fetch(url, params).then((r) => {
			if (r.ok)
				return r;
			else {
				if (r.status === 401 || r.status === 403)
					runInAction(() => {globalStores.rootStore.isLoggedIn = false});
				else if (r.status >= 500)
					runInAction(() => {globalStores.rootStore.isApiAvailable = false});
				else return r;
				return Response.error();
			}
		}).catch((e) => console.log(e));
	}
}