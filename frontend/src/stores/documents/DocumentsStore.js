import {makeAutoObservable} from "mobx";
import {DocumentsAPI} from "../../api/DocumentsAPI";

export class DocumentsStore {
	state = "idle";
	documents = [];
	page = 1;
	totalPages = 1;
	searchQuery = "";

	filters = {};

	constructor(filters) {
		makeAutoObservable(this);
		if (filters) this.filters = filters;
	}

	*fetchDocuments() {
		this.documents = [];
		this.state = "loading";
		yield DocumentsAPI.getDocuments(Object.assign({page: this.page, search: this.searchQuery}, this.filters))
			.then((r) => {
				if (r !== "error") {
					this.documents = r.results;
					this.totalPages = r.total_pages;
					this.state = "done";
				} else this.state = "error";
			})
	}

	goToPage = (page) => {
		if (page > this.totalPages) return;
		this.page = page;
		this.fetchDocuments();
	}

	doSearch = (value) => {
		if (this.searchQuery === value) return;
		this.page = 1;
		this.searchQuery = value;
		this.fetchDocuments();
	}
}
