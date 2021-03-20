import {makeAutoObservable} from "mobx";
import {DocumentsAPI} from "../../api/DocumentsAPI";

export class DocumentStore {
	id = 0;
	document = {};
	state = "idle";

	constructor(id) {
		makeAutoObservable(this);
		this.id = id;
	}

	*fetch() {
		this.document = {};
		this.state = "loading";
		yield DocumentsAPI.getDocument(this.id)
			.then((r) => {
				if (r !== "error") {
					this.document = r;
					this.state = "done";
				} else this.state = "error";
			})
	}

	*remove(callback) {
		yield DocumentsAPI.removeDocument(this.id)
			.then((r) => {
				if (r !== "error") {
					callback();
				} else this.state = "error";
			})
	}
}
