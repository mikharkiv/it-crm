import {makeAutoObservable, runInAction} from "mobx";
import React from "react";
import {ProjectsAPI} from "../../api/ProjectsAPI";

export class ProjectCreateEditStore {
	id;
	project = {};
	projectPure = {};
	state = "idle";
	selectedClient = null;
	selectedTeam = null;
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
		yield ProjectsAPI.addProject(this.prepareInput(obj))
			.then((r) => {
				if (r !== "error") {
					callback(r.id);
				} else this.clientListState = "error";
			})
	}

	*saveProject(obj, callback) {
		yield ProjectsAPI.modifyProject(this.id, this.prepareInput(obj))
			.then((r) => {
				if (r !== "error") {
					callback(this.id);
				} else this.clientListState = "error";
			})
	}

	prepareInput(obj) {
		if (this.selectedClient) obj.client = this.selectedClient;
		else if (this.editMode) obj.client = this.projectPure.client.id;
		if (this.selectedTeam) obj.team = this.selectedTeam;
		else if (this.editMode) obj.team = this.projectPure.team.id;
		return obj;
	}

	prepareOutput(obj) {
		return Object.assign(obj, {
			client: obj.client.name,
			team: obj.team.name
		});
	}

	onClientSelect = (val, option) => {
		this.selectedClient = option.key;
	}

	onTeamSelect = (val, option) => {
		this.selectedTeam = option.key;
	}
}
