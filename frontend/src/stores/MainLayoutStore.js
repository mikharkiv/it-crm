import {makeAutoObservable} from "mobx";

export class MainLayoutStore {
	paths = [
		'/',
		'/',
		'/contacts/',
		'/projects/',
		'/',
		'/teams/',
		'/documents/',
		'/',
		'/advice/',
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
