import {makeAutoObservable, runInAction} from "mobx";
import React from "react";
import {ProjectsAPI} from "../../api/ProjectsAPI";

export class ProjectCreateEditStore {
	id;
	project = {};
	projectPure = {};
	state = "idle";
	editMode = false;

	constructor(id, editMode) {
		makeAutoObservable(this);
		this.editMode = editMode;
		if (!this.editMode) this.id = 0;
		else {
			this.id = id;
			this.fetchProject();
		}
	}

	*fetchProject() {
		this.project = {};
		this.state = "loading";
		yield ProjectsAPI.getProject(this.id).then((r) => {
			if (r !== "error") {
				this.projectPure = r;
				this.project = this.prepareOutput(r);
				this.state = "done";
			} else this.state = "error";
		});
	}

	*addProject(obj, callback) {
		yield ProjectsAPI.addProject(obj)
			.then((r) => {
				if (r !== "error") {
					callback(r.id);
				} else this.clientListState = "error";
			})
	}

	*saveProject(obj, callback) {
		yield ProjectsAPI.modifyProject(this.id, obj)
			.then((r) => {
				if (r !== "error") {
					callback(this.id);
				} else this.clientListState = "error";
			})
	}

	prepareOutput(obj) {
		return Object.assign(obj, {
			client: {value: obj.client.name, key: obj.client.id},
			team: {value: obj.team.name, key: obj.team.id},
		});
	}
}
