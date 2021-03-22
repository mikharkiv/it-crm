import {makeAutoObservable} from "mobx";

export class MainLayoutStore {
	paths = [
		'/',
		'/clients/',
		'/contacts/',
		'/projects/',
		'/tasks/',
		'/teams/',
		'/documents/',
		'/stats/',
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
