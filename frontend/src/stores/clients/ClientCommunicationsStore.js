import {makeAutoObservable} from "mobx";
import {CommunicationsAPI} from "../../api/CommunicationsAPI";
import {message} from "antd";

export class ClientCommunicationsStore {
	page = 1;
	totalPages = 1;
	id = null;
	communications = [];
	state = "idle";
	pageState = "idle";
	searchQuery = "";
	newElementsCount = 0;

	constructor(id, type) {
		makeAutoObservable(this);
		this.id = id;
		this.type = type;
		this.fetchCommunications();
	}

	*fetchCommunications(append = false) {
		let params;
		switch (this.type) {
			case "client":
				params = {'contact__client': this.id}
				break
			case "contact":
				params = {'contact': this.id}
				break
			case "task":
				params = {'task': this.id}
				break;
			case "document":
				params = {'document': this.id}
				break;
			case "project":
				params = {'project': this.id}
				break;
		}
		if (!append) this.state = "loading";
		yield CommunicationsAPI.getCommunications(Object.assign({page: this.page, search: this.searchQuery}, params))
			.then((r) => {
				if (r !== "error") {
					if (append)	r.results.map((el) => this.communications.unshift(el));
					else this.communications = r.results.reverse();
					this.newElementsCount = r.results.length;
					this.totalPages = r.total_pages;
					this.state = "done";
					this.pageState = "idle";
				} else this.state = "error";
			})
	}

	*fetchNextPage() {
		if (!this.hasNextPage) return;
		if (this.pageState !== "idle") return;
		this.pageState = "loading";
		this.page += 1;
		yield this.fetchCommunications(true);
	}

	*addCommunication(communication) {
		if (this.type !== "contact") {
			message.error('Комунікацію можна додавати тільки до контакту!', 5);
			return;
		}
		let object = Object.assign({contact: this.id}, communication);
		yield CommunicationsAPI.addCommunication(object)
			.then((r) => {
				if (r !== "error") {
					this.page = 1;
					this.search = "";
					this.fetchCommunications();
					message.success('Комунікацію успішно додано!', 5);
				}
			})
	}

	get hasNextPage() {
		return this.page < this.totalPages;
	}
}
