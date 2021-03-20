import {Api} from "./Api";

export class ProjectsAPI {
	static apiUrl = Api.mainUrl + 'projects/';

	static async getProjects(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getProject(id) {
		return await Api.fetch(`${this.apiUrl}${id}/`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async addProject(project) {
		return await Api.fetch(`${this.apiUrl}`,
			Object.assign({}, Api.postJson, {body: JSON.stringify(project)}))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async removeProject(id){
		return await Api.fetch(`${this.apiUrl}${id}/`, Api.delete)
			.then((r) => r.json())
			.catch(() => "error");
	};

	static async modifyProject(id, project) {
		return await Api.fetch(`${this.apiUrl}${id}/`,
			Object.assign({}, Api.putJson, {body: JSON.stringify(project)}))
			.then((r) => r.json())
			.catch(() => "error");
	};

}
