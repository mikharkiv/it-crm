import {Api} from "./Api";

export class CommunicationsAPI {
	static apiUrl = Api.mainUrl + 'clients/communications/';

	static async getCommunications(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getCommunication(id) {
		return await Api.fetch(`${this.apiUrl}${id}/`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async addCommunication(communication) {
		return await Api.fetch(`${this.apiUrl}`,
			Object.assign({}, Api.postJson, {body: JSON.stringify(communication)}))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async removeCommunication(id){
		return await Api.fetch(`${this.apiUrl}${id}/`, Api.delete)
			.then((r) => (r.status === 204 ? {} : "error"))
			.catch(() => "error");
	};

	static async modifyCommunication(id, communication) {
		return await Api.fetch(`${this.apiUrl}${id}/`,
			Object.assign(Api.putJson, {body: JSON.stringify(communication)}))
			.then((r) => r.json())
			.catch(() => "error");
	};
}
