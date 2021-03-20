import {Api} from "./Api";

export class TasksAPI {
	static apiUrl = Api.mainUrl + 'tasks/';

	static async getTasks(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getTask(id) {
		return await Api.fetch(`${this.apiUrl}${id}`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async addTask(task) {
		return await Api.fetch(`${this.apiUrl}`,
			Object.assign({}, Api.postJson, {body: JSON.stringify(task)}))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async removeTask(id){
		return await Api.fetch(`${this.apiUrl}${id}/`, Api.delete)
			.then((r) => r.json())
			.catch(() => "error");
	};

	static async modifyTask(id, task) {
		return await Api.fetch(`${this.apiUrl}${id}/`,
			Object.assign({}, Api.putJson, {body: JSON.stringify(task)}))
			.then((r) => r.json())
			.catch(() => "error");
	};
}
