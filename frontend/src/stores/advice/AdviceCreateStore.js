import {makeAutoObservable} from "mobx";
import {AdviceAPI} from "../../api/AdviceAPI";

export class AdviceCreateStore {
	isAdding = false;

	constructor() {
		makeAutoObservable(this);
	}

	addAdvice = (name, theme, text, callback) => {
		this.performAdviceAdding(name, theme, text, callback);
	}

	*performAdviceAdding(name, theme, text, callback) {
		this.isAdding = true;
		yield AdviceAPI.publishAdvice(name, theme, text)
			.then((r) => {
				callback.call(null, r.id)
			})
			.catch(() => this.state = "error")
	}
}
