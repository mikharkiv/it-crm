import {makeAutoObservable} from "mobx";
import {TeamsAPI} from "../../api/TeamsAPI";


export class TeamStore {
	id = 0;
	team = {};
	state = "idle";

	constructor(id) {
		makeAutoObservable(this);
		this.id = id;
	}

	*fetch() {
		this.team = {};
		this.state = "loading";
		yield TeamsAPI.getTeam(this.id)
			.then((r) => {
				if (r !== "error") {
					this.team = r;
					this.state = "done";
				} else this.state = "error";
			})
	}

	*remove(callback) {
		yield TeamsAPI.removeTeam(this.id)
			.then((r) => {
				if (r !== "error") {
					callback();
				} else this.state = "error";
			})
	}
}
