import {Api} from "./Api";

export class AdviceAPI {
	static apiUrl = Api.mainUrl + 'advice/';
	static commentsApiUrl = Api.mainUrl + 'advice-comments/';

	static async getAdvice(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getSingleAdvice(id) {
		return Api.fetch(`${this.apiUrl}${id}`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getSingleAdviceComments(id) {
		return Api.fetch(`${this.commentsApiUrl}?advice=${id}`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async publishComment(adviceId, text) {
		return Api.fetch(`${this.commentsApiUrl}`,
			Object.assign(Api.postJson, {body: JSON.stringify({text, advice: adviceId})}))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async publishAdvice(name, theme, text) {
		return Api.fetch(`${this.apiUrl}`,
			Object.assign(Api.postJson, {body: JSON.stringify({name, theme, text})}))
			.then((r) => r.json())
			.catch(() => "error");
	}
}
