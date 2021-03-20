import {makeAutoObservable} from "mobx";
import {AdviceAPI} from "../../api/AdviceAPI";
import {message} from "antd";

export class AdviceSingleStore {
	state = "loading";
	id = 0;
	advice = {}; // our advice object
	comments = [];
	commentSubmitting = false;

	constructor(id) {
		this.id = id;
		makeAutoObservable(this);
	}

	*fetch() {
		this.advice = {};
		this.state = "loading";
		yield AdviceAPI.getSingleAdvice(this.id)
			.then((r) => this.advice = r)
			.catch(() => this.state = "error")
		this.fetchComments();
	}

	*fetchComments() {
		this.comments = [];
		yield AdviceAPI.getSingleAdviceComments(this.id)
			.then((r) => this.comments = r.results)
			.catch(() => this.state = "error")
		if (this.state !== "error") this.state = "done";
	}

	doCommentPublishing = (text) => {
		this.publishComment(text);
	}

	*publishComment(text) {
		this.commentSubmitting = true;
		yield AdviceAPI.publishComment(this.id, text)
			.then((r) => this.onCommentPublished(r))
			.catch(() => this.state = "error")
	}

	onCommentPublished(response) {
		this.fetchComments();
		this.commentSubmitting = false;
		message.success('Коментар додано!', 5);
	}
}
