import {makeAutoObservable} from "mobx";
import {TeamsAPI} from "../../api/TeamsAPI";
import {ClientsAPI} from "../../api/ClientsAPI";

export class ClientsStore {
	state = "idle";
	clients = [];
	page = 1;
	totalPages = 1;
	searchQuery = "";

	filters = {};

	constructor(filters) {
		makeAutoObservable(this);
		if (filters) this.filters = filters;
	}

	*fetchClients() {
		this.teams = [];
		this.state = "loading";
		yield ClientsAPI.getClients(Object.assign({page: this.page, search: this.searchQuery}, this.filters))
			.then((r) => {
				if (r !== "error") {
					this.clients = r.results;
					this.totalPages = r.total_pages;
					this.state = "done";
				} else this.state = "error";
			})
	}

	goToPage = (page) => {
		if (page > this.totalPages) return;
		this.page = page;
		this.fetchClients();
	}

	doSearch = (value) => {
		if (this.searchQuery === value) return;
		this.page = 1;
		this.searchQuery = value;
		this.fetchClients();
	}
}
