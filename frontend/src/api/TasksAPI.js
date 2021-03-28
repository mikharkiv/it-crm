import {Api} from "./Api";

export class TasksAPI {
	static apiUrl = Api.mainUrl + 'tasks/';
	static commentsApiUrl = TasksAPI.apiUrl + 'comments/';

	static async getTasks(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getTasksComments(urlParams) {
		return await Api.fetch(Api.getLink(this.commentsApiUrl, urlParams))
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

	static async addTaskComment(id, text) {
		return await Api.fetch(`${this.commentsApiUrl}`,
			Object.assign({}, Api.postJson, {body: JSON.stringify({task: id, text})}))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async removeTask(id){
		return await Api.fetch(`${this.apiUrl}${id}/`, Api.delete)
			.then((r) => (r.status === 204 ? {} : "error"))
			.catch(() => "error");
	};

	static async modifyTask(id, task) {
		return await Api.fetch(`${this.apiUrl}${id}/`,
			Object.assign({}, Api.putJson, {body: JSON.stringify(task)}))
			.then((r) => r.json())
			.catch(() => "error");
	};

	static async setTaskCompleted(taskId, completed) {
		return await Api.fetch(`${this.apiUrl}${taskId}/setcompleted`,
			Object.assign({}, Api.postJson, {body: JSON.stringify({is_completed: completed})}))
			.then((r) => r.json())
			.catch(() => "error");
	}
}
