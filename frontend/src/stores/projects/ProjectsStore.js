import {makeAutoObservable} from "mobx";
import {ProjectsAPI} from "../../api/ProjectsAPI";

export class ProjectsStore {
	state = "idle";
	projects = [];
	page = 1;
	totalPages = 1;
	searchQuery = "";

	constructor() {
		makeAutoObservable(this);
	}

	*fetchProjects() {
		this.teams = [];
		this.state = "loading";
		yield ProjectsAPI.getProjects({page: this.page, search: this.searchQuery})
			.then((r) => {
				if (r !== "error") {
					this.projects = r.results;
					this.totalPages = r.total_pages;
					this.state = "done";
				} else this.state = "error";
			})
	}

	goToPage = (page) => {
		if (page > this.totalPages) return;
		this.page = page;
		this.fetchContacts();
	}

	doSearch = (value) => {
		if (this.searchQuery === value) return;
		this.page = 1;
		this.searchQuery = value;
		this.fetchContacts();
	}
}
