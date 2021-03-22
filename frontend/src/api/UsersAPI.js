import {Api} from "./Api";

export class UsersAPI {
	static apiUrl = Api.mainUrl + 'users/';

	static async getUsers(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getUser(id) {
		return Api.fetch(`${this.apiUrl}${id}`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getMe() {
		return Api.fetch(`${this.apiUrl}me`)
			.then((r) => r.json())
			.catch(() => "error");
	}
}
