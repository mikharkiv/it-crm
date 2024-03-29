import {makeAutoObservable} from "mobx";
import {TasksAPI} from "../../api/TasksAPI";

export class TasksStore {
	state = "idle";
	tasks = [];
	page = 1;
	totalPages = 1;
	searchQuery = "";

	filters = {};

	constructor(filters) {
		makeAutoObservable(this);
		if (filters) this.filters = filters;
	}

	*fetchTasks() {
		this.tasks = [];
		this.state = "loading";
		yield TasksAPI.getTasks(Object.assign({page: this.page, search: this.searchQuery}, this.filters))
			.then((r) => {
				if (r !== "error") {
					this.tasks = r.results;
					this.totalPages = r.total_pages;
					this.state = "done";
				} else this.state = "error";
			})
	}

	goToPage = (page) => {
		if (page > this.totalPages) return;
		this.page = page;
		this.fetchTasks();
	}

	doSearch = (value) => {
		if (this.searchQuery === value) return;
		this.page = 1;
		this.searchQuery = value;
		this.fetchTasks();
	}
}
