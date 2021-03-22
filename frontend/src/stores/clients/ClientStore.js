import {makeAutoObservable} from "mobx";
import {TeamsAPI} from "../../api/TeamsAPI";
import {ClientsAPI} from "../../api/ClientsAPI";


export class ClientStore {
	id = 0;
	client = {manager:{}};
	state = "idle";

	constructor(id) {
		makeAutoObservable(this);
		this.id = id;
	}

	*fetch() {
		this.client = {manager:{}};
		this.state = "loading";
		yield ClientsAPI.getClient(this.id)
			.then((r) => {
				if (r !== "error") {
					this.client = r;
					this.state = "done";
				} else this.state = "error";
			})
	}

	*remove(callback) {
		yield ClientsAPI.removeClient(this.id)
			.then((r) => {
				if (r !== "error") {
					callback();
				} else this.state = "error";
			})
	}
}
