import {makeAutoObservable} from "mobx";

export class MainLayoutStore {
	paths = [
		'/',
		'/',
		'/contacts/',
		'/projects/',
		'/tasks/',
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
