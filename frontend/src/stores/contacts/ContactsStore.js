import {makeAutoObservable} from "mobx";
import {TeamsAPI} from "../../api/TeamsAPI";
import {ContactsAPI} from "../../api/ContactsAPI";

export class ContactsStore {
	state = "idle";
	contacts = [];
	page = 1;
	totalPages = 1;
	searchQuery = "";

	filters = {};

	constructor(filters) {
		makeAutoObservable(this);
		if (filters) this.filters = filters;
	}

	*fetchContacts() {
		this.teams = [];
		this.state = "loading";
		yield ContactsAPI.getContacts(Object.assign({page: this.page, search: this.searchQuery}, this.filters))
			.then((r) => {
				if (r !== "error") {
					this.contacts = r.results;
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
