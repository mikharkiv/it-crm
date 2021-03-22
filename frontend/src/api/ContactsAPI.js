import {Api} from "./Api";

export class ContactsAPI {
	static apiUrl = Api.mainUrl + 'contacts/';

	static async getContacts(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getContact(id) {
		return await Api.fetch(`${this.apiUrl}${id}/`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async addContact(contact) {
		return await Api.fetch(`${this.apiUrl}`,
			Object.assign({}, Api.postJson, {body: JSON.stringify(contact)}))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async removeContact(id){
		return await Api.fetch(`${this.apiUrl}${id}/`, Api.delete)
			.then((r) => r.json())
			.catch(() => "error");
	};

	static async modifyContact(id, contact) {
		return await Api.fetch(`${this.apiUrl}${id}/`,
			Object.assign(Api.putJson, {body: JSON.stringify(contact)}))
			.then((r) => r.json())
			.catch(() => "error");
	};

	static async updatePhoto(id, photoObj) {
		return await Api.fetch(`${this.apiUrl}${id}/`,
			Object.assign({}, Api.put, {body: Api.makeFormData(photoObj)}))
			.then((r) => r.json())
			.catch(() => "error");
	}

}
