import {makeAutoObservable} from "mobx";
import {paths} from "../Paths";

export class MainLayoutStore {
	paths = [
		'/',
		paths.clients,
		paths.contacts,
		paths.projects,
		paths.tasks,
		paths.teams,
		paths.documents,
		paths.stats,
		paths.advice,
		'/',
		'/',
	];

	constructor() {
		makeAutoObservable(this);
	}

	menuItemClickPath(key) {
		return this.paths[key];
	}
}
