import {makeAutoObservable} from "mobx";
import {ProjectsAPI} from "../../api/ProjectsAPI";

export class ProjectStore {
	id = 0;
	project = {team: {}, client: {}};
	state = "idle";

	constructor(id) {
		makeAutoObservable(this);
		this.id = id;
	}

	*fetch() {
		this.project = {team: {}, client: {}};
		this.state = "loading";
		yield ProjectsAPI.getProject(this.id)
			.then((r) => {
				if (r !== "error") {
					this.project = r;
					console.log(r);
					this.state = "done";
				} else this.state = "error";
			})
	}

	*remove(callback) {
		yield ProjectsAPI.removeProject(this.id)
			.then((r) => {
				if (r !== "error") {
					callback();
				} else this.state = "error";
			})
	}
}
