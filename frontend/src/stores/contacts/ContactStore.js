import {makeAutoObservable} from "mobx";
import {TeamsAPI} from "../../api/TeamsAPI";
import {ContactsAPI} from "../../api/ContactsAPI";


export class ContactStore {
	id = 0;
	contact = {};
	state = "idle";

	constructor(id) {
		makeAutoObservable(this);
		this.id = id;
	}

	*fetch() {
		this.contact = {};
		this.state = "loading";
		yield ContactsAPI.getContact(this.id)
			.then((r) => {
				if (r !== "error") {
					this.contact = r;
					this.state = "done";
				} else this.state = "error";
			})
	}

	*remove(callback) {
		yield ContactsAPI.removeContact(this.id)
			.then((r) => {
				if (r !== "error") {
					callback();
				} else this.state = "error";
			})
	}
}
