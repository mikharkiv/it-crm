import {Api} from "./Api";

export class DocumentsAPI {
	static apiUrl = Api.mainUrl + 'documents/';

	static async getDocuments(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getDocument(id) {
		return await Api.fetch(`${this.apiUrl}${id}/`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async addDocument(document) {
		return await Api.fetch(`${this.apiUrl}`,
			Object.assign({}, Api.post, {body: Api.makeFormData(document)}))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async removeDocument(id){
		return await Api.fetch(`${this.apiUrl}${id}/`, Api.delete)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async modifyDocument(id, document) {
		return await Api.fetch(`${this.apiUrl}${id}/`,
			Object.assign({}, Api.put, {body: Api.makeFormData(document)}))
			.then((r) => r.json())
			.catch(() => "error");
	}

}
