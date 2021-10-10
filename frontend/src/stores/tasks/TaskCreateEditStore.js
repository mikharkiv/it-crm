import {makeAutoObservable} from "mobx";
import {TasksAPI} from "../../api/TasksAPI";
const moment = require('moment');

export class TaskCreateEditStore {
	id = null;
	task = {};
	taskPure = {};
	state = "idle";
	members = [];
	editMode = false;
	userVariants = [];

	constructor(id, editMode) {
		makeAutoObservable(this);
		this.editMode = editMode;
		if (!this.editMode) this.id = 0;
		else {
			this.id = id;
			this.fetchTask();
		}
	}

	*fetchTask() {
		this.team = {};
		this.state = "loading";
		yield TasksAPI.getTask(this.id).then((r) => {
			if (r !== "error") {
				this.taskPure = r;
				this.task = this.prepareOutput(r);
				this.members = this.task.members;
				this.state = "done";
			} else this.state = "error";
		});
	}

	*addTask(obj, callback) {
		yield TasksAPI.addTask(this.prepareInput(obj))
			.then((r) => {
				if (r !== "error") {
					callback(r.id);
				} else this.state = "error";
			})
	}

	*saveTask(obj, callback) {
		yield TasksAPI.modifyTask(this.id, this.prepareInput(obj))
			.then((r) => {
				if (r !== "error") {
					callback(this.id);
				} else this.state = "error";
			});
	}

	prepareInput(obj) {
		obj.attached_persons = this.members.map((e) => e.id);
		obj.deadline = moment(obj.deadline, 'MM.DD.YYYY HH:mm').format('YYYY-MM-DD HH:mm').toString();
		return obj;
	}

	prepareOutput(obj) {
		let out = {};
		if (obj.hasOwnProperty('project') && obj.project)
			out.project = {value: obj.project.name, key: obj.project.id};
		out.members = obj.attached_persons.map((u) => u.person);
		out.deadline = moment(obj.deadline, "DD.MM.YYYY HH:mm");
		out = Object.assign({}, obj, out);
		return out;
	}

	onUserSelect = (val, option) => {
		this.members.push(this.userVariants.find((el) => el.id == option.key));
	}

	onUserRemove = (id) => {
		this.members.splice(this.members.findIndex((el) => el.id == id), 1);
	}

	setUserVariants = (v) => {
		this.userVariants = v;
	}
}
