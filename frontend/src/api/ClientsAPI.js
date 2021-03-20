import {Api} from "./Api";

export class ClientsAPI {
	static apiUrl = Api.mainUrl + 'clients/';

	static async getClients(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getClient(id) {
		return await Api.fetch(`${this.apiUrl}${id}/`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async addClient(client) {
		return await Api.fetch(`${this.apiUrl}`,
			Object.assign(Api.postJson, {body: JSON.stringify(client)}))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async removeClient(id){
		return await Api.fetch(`${this.apiUrl}${id}/`, Api.delete)
			.then((r) => r.json())
			.catch(() => "error");
	};

	static async modifyClient(id, client) {
		return await Api.fetch(`${this.apiUrl}${id}/`,
			Object.assign(Api.putJson, {body: JSON.stringify(client)}))
			.then((r) => r.json())
			.catch(() => "error");
	};

}
