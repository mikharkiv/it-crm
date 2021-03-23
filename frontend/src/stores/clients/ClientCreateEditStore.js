import {makeAutoObservable, runInAction} from "mobx";
import {ClientsAPI} from "../../api/ClientsAPI";
import {ClientStatusesAPI} from "../../api/ClientsStatusesAPI";

export class ClientCreateEditStore {
	id;
	client = {};
	clientPure = {};
	state = "idle";
	selectedManager = null;
	editMode = false;
	photo = null;
	photoName = null;
	clientStatuses = [];

	constructor(id, editMode) {
		makeAutoObservable(this);
		this.editMode = editMode;
		if (!this.editMode) this.id = 0;
		else {
			this.id = id;
			this.fetchClient();
			this.fetchStatuses();
		}
	}

	*fetchClient() {
		this.team = {};
		this.state = "loading";
		yield ClientsAPI.getClient(this.id).then((r) => {
			if (r !== "error") {
				this.clientPure = r;
				this.client = this.prepareOutput(r);
				this.state = "done";
			} else this.state = "error";
		});
	}

	*fetchStatuses() {
		this.clientStatuses = [];
		yield ClientStatusesAPI.getStatuses().then((r) => {
			if (r !== "error") {
				this.clientStatuses = r.results;
			} else this.state = "error";
		});
	}

	*addClient(obj, callback) {
		yield ClientsAPI.addClient(this.prepareInput(obj))
			.then((r) => {
				if (r !== "error") {
					if (this.photo) {
						ClientsAPI.updatePhoto(r.id, {photo: this.photo}).then((re) => {
							if (re !== "error")
								callback(r.id);
							else this.state = "error";
						});
					} else
						callback(r.id);
				} else this.state = "error";
			})
	}

	*saveClient(obj, callback) {
		let prepared = this.prepareInput(obj);
		if (this.photo) {
			prepared.socials = JSON.stringify(prepared.socials);
			yield ClientsAPI.updatePhoto(this.id, Object.assign({photo: this.photo}, prepared))
				.then((r) => {
					if (r !== "error")
						callback(this.id);
					else this.state = "error";
				})
		} else {
			yield ClientsAPI.modifyClient(this.id, this.prepareInput(obj))
				.then((r) => {
					if (r !== "error") {
						callback(this.id);
					} else this.state = "error";
				});
		}
	}

	prepareInput(obj) {
		let socials = {};
		console.log(obj);
		if (obj.hasOwnProperty('socials_viber') && obj.socials_viber) socials.viber = obj.socials_viber;
		if (obj.hasOwnProperty('socials_telegram') && obj.socials_telegram) socials.telegram = obj.socials_telegram;
		if (obj.hasOwnProperty('socials_whatsapp') && obj.socials_whatsapp) socials.whatsapp = obj.socials_whatsapp;
		if (obj.hasOwnProperty('socials_instagram') && obj.socials_instagram) socials.instagram = obj.socials_instagram;
		if (obj.hasOwnProperty('socials_facebook') && obj.socials_facebook) socials.facebook = obj.socials_facebook;
		if (obj.hasOwnProperty('socials_twitter') && obj.socials_twitter) socials.twitter = obj.socials_twitter;
		if (obj.hasOwnProperty('socials_linkedin') && obj.socials_linkedin) socials.linkedin = obj.socials_linkedin;
		if (Object.keys(socials).length > 0) obj.socials = socials
		else obj.socials = [];
		if (this.selectedManager) obj.manager = this.selectedManager;
		else if (this.editMode) obj.manager = this.clientPure.manager.id;
		if (!obj.email) delete obj.email;
		if (!this.clientStatuses || this.clientStatuses.length === 0) delete obj.status;
		delete obj.photo;
		return obj;
	}

	prepareOutput(obj) {
		let out = {};
		if (obj.hasOwnProperty('socials') && obj.socials && typeof obj.socials === "object")
			for (let key of Object.keys(obj.socials))
				out['socials_' + key] = obj.socials[key];
		out.manager = obj.manager.full_name;
		if (obj.status)
			out.status = obj.status.name;
		out = Object.assign(obj, out);
		return out;
	}

	onManagerSelect = (val, option) => {
		this.selectedManager = option.key;
	}

	uploadPhoto = (file) => {
		return new Promise(() => this.photo = file);
	}
}
