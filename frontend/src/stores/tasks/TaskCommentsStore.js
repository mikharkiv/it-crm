import {makeAutoObservable} from "mobx";
import {TasksAPI} from "../../api/TasksAPI";

export class TaskCommentsStore {
	page = 1;
	totalPages = 1;
	id = null;
	isProject = null; // all project comments or just one task comments
	comments = [];
	state = "idle";
	searchQuery = "";

	constructor(id, isProject) {
		makeAutoObservable(this);
		this.id = id;
		this.isProject = isProject;
		this.fetchComments();
	}

	*fetchComments(append = false) {
		let params = this.isProject ? {'task__project': this.id} : {'task': this.id};
		yield TasksAPI.getTasksComments(Object.assign({page: this.page, search: this.searchQuery}, params))
			.then((r) => {
				if (r !== "error") {
					if (append) this.comments = this.comments.concat(r.results);
					else this.comments = r.results;
					this.totalPages = r.total_pages;
					this.state = "done";
				} else this.state = "error";
			})
	}

	*fetchNextPage() {
		if (!this.hasNextPage) return;
		this.page += 1;
		yield this.fetchComments(true);
	}

	*addComment(text, callback) {
		yield TasksAPI.addTaskComment(this.id, text)
			.then((r) => {
				if (r !== "error") {
					this.fetchComments();
					callback();
				}
			})
	}

	get hasNextPage() {
		return this.page < this.totalPages;
	}
}
