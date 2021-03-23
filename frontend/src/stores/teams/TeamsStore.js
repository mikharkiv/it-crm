import {makeAutoObservable} from "mobx";
import {TeamsAPI} from "../../api/TeamsAPI";

export class TeamsStore {
	state = "idle";
	teams = [];
	page = 1;
	totalPages = 1;
	searchQuery = "";

	filters = {};

	constructor(filters) {
		makeAutoObservable(this);
		if (filters) this.filters = filters;
	}

	*fetchTeams() {
		this.teams = [];
		this.state = "loading";
		yield TeamsAPI.getTeams(Object.assign({page: this.page, search: this.searchQuery}, this.filters))
			.then((r) => {
				if (r !== "error") {
					this.teams = r.results;
					this.totalPages = r.total_pages;
					this.state = "done";
				} else this.state = "error";
			})
	}

	goToPage = (page) => {
		if (page > this.totalPages) return;
		this.page = page;
		this.fetchTeams();
	}

	doSearch = (value) => {
		if (this.searchQuery === value) return;
		this.page = 1;
		this.searchQuery = value;
		this.fetchTeams();
	}
}
