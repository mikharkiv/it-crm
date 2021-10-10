import {Api} from "./Api";

export class ClientStatusesAPI {
	static apiUrl = Api.mainUrl + 'clients-statuses/';

	static async getStatuses(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getStatus(id) {
		return await Api.fetch(`${this.apiUrl}${id}/`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async addStatus(status) {
		return await Api.fetch(`${this.apiUrl}`,
			Object.assign({}, Api.postJson, {body: JSON.stringify(status)}))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async removeStatus(id){
		return await Api.fetch(`${this.apiUrl}${id}/`, Api.delete)
			.then((r) => (r.status === 204 ? {} : "error"))
			.catch(() => "error");
	};

	static async modifyStatus(id, status) {
		return await Api.fetch(`${this.apiUrl}${id}/`,
			Object.assign({}, Api.putJson, {body: JSON.stringify(status)}))
			.then((r) => r.json())
			.catch(() => "error");
	};
}
