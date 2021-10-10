import {makeAutoObservable} from "mobx";
import {DocumentsAPI} from "../../api/DocumentsAPI";

export class DocumentCreateEditStore {
	id = null;
	document = {};
	documentPure = {};
	state = "idle";
	editMode = false;
	file = null;

	constructor(id, editMode) {
		makeAutoObservable(this);
		this.editMode = editMode;
		if (!this.editMode) this.id = 0;
		else {
			this.id = id;
			this.fetchDocument();
		}
	}

	*fetchDocument() {
		this.team = {};
		this.state = "loading";
		yield DocumentsAPI.getDocument(this.id).then((r) => {
			if (r !== "error") {
				this.documentPure = r;
				this.document = this.prepareOutput(r);
				this.state = "done";
			} else this.state = "error";
		});
	}

	*addDocument(obj, callback) {
		yield DocumentsAPI.addDocument(this.prepareInput(obj))
			.then((r) => {
				if (r !== "error") {
					callback(r.id);
				} else this.state = "error";
			})
	}

	*saveDocument(obj, callback) {
		yield DocumentsAPI.modifyDocument(this.id, this.prepareInput(obj))
			.then((r) => {
				if (r !== "error") {
					callback(this.id);
				} else this.state = "error";
			});
	}

	prepareInput(obj) {
		if (this.file) obj.file = this.file;
		else delete obj.file;
		return obj;
	}

	prepareOutput(obj) {
		let out = {};
		if (obj.hasOwnProperty('client') && obj.client)
			out.client = {value: obj.client.name, key: obj.client.id};
		if (obj.hasOwnProperty('task') && obj.task)
			out.task = {value: obj.task.name, key: obj.task.id};
		if (obj.hasOwnProperty('project') && obj.project)
			out.project = {value: obj.project.name, key: obj.project.id};
		out = Object.assign({}, obj, out);
		return out;
	}

	uploadFile = (file) => {
		return new Promise(() => this.file = file);
	}
}
