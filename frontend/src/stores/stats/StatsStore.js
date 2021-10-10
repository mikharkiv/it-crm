import {ClientStatusesAPI} from "../../api/ClientsStatusesAPI";
import {UsersAPI} from "../../api/UsersAPI";
import {makeAutoObservable} from "mobx";

export class StatsStore {
	state = "idle";
	stats = {}
	
	constructor() {
		makeAutoObservable(this);
	}

	*fetchStats() {
		this.state = "loading";
		yield UsersAPI.getMyStats().then((r) => {
			if (r !== "error") {
				this.stats = r;
				this.state = "done";
			} else this.state = "error";
		});
	}
}
