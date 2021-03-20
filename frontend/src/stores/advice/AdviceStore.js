import {action, makeAutoObservable} from "mobx";
import {AdviceAPI} from "../../api/AdviceAPI";

export class AdviceStore {
	state = "idle";
	advice = [];
	page = 1;
	totalPages = 1;
	searchQuery = "";

	constructor() {
		makeAutoObservable(this);
	}

	*fetchAdvice() {
		this.advice = [];
		this.state = "loading";
		yield AdviceAPI.getAdvice({page: this.page, search: this.searchQuery})
			.then((r) => {
				if (r !== "error") {
					this.advice = r.results;
					this.totalPages = r.total_pages;
					this.state = "done";
				} else this.state = "error";
			})
	}

	goToPage = (page) => {
		if (page > this.totalPages) return;
		this.page = page;
		this.fetchAdvice();
	}

	doSearch = (value) => {
		if (this.searchQuery === value) return;
		this.page = 1;
		this.searchQuery = value;
		this.fetchAdvice();
	}
}
