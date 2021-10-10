import {makeAutoObservable} from "mobx";
import {TasksAPI} from "../../api/TasksAPI";
import {message} from "antd";

const moment = require('moment');

export class TaskStore {
	id = 0;
	task = {};
	state = "idle";

	constructor(id) {
		makeAutoObservable(this);
		this.id = id;
	}

	*fetch() {
		this.task = {};
		this.state = "loading";
		yield TasksAPI.getTask(this.id)
			.then((r) => {
				if (r !== "error") {
					this.task = r;
					this.state = "done";
				} else this.state = "error";
			})
	}

	*remove(callback) {
		yield TasksAPI.removeTask(this.id)
			.then((r) => {
				if (r !== "error") {
					callback();
				} else this.state = "error";
			})
	}

	*setCompleted(completed) {
		yield TasksAPI.setTaskCompleted(this.id, completed)
			.then((r) => {
				if (r !== "error")
					message.success(`Задачу успішно відмічено як ${completed?'':'не'} виконану!`, 5);
			})
	}

	get is_task_outdated() {
		return moment(this.task.deadline, 'DD.MM.YYYY HH:mm').isBefore(moment());
	}
}
