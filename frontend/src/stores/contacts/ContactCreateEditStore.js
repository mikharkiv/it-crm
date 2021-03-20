import {makeAutoObservable, runInAction} from "mobx";
import {ContactsAPI} from "../../api/ContactsAPI";

export class ContactCreateEditStore {
	id;
	contact = {};
	contactPure = {};
	state = "idle";
	selectedClient = null;
	editMode = false;
	photo = null;
	photoName = null;

	constructor(id, editMode) {
		makeAutoObservable(this);
		this.editMode = editMode;
		if (!this.editMode) this.id = 0;
		else {
			this.id = id;
			this.fetchContact();
		}
	}

	*fetchContact() {
		this.team = {};
		this.state = "loading";
		yield ContactsAPI.getContact(this.id).then((r) => {
			if (r !== "error") {
				this.contactPure = r;
				this.contact = this.prepareOutput(r);
				this.state = "done";
			} else this.state = "error";
		});
	}

	*addContact(obj, callback) {
		yield ContactsAPI.addContact(this.prepareInput(obj))
			.then((r) => {
				if (r !== "error") {
					if (this.photo) {
						ContactsAPI.updatePhoto(r.id, {photo: this.photo}).then((re) => {
							if (re !== "error")
								callback(r.id);
							else this.state = "error";
						});
					} else
						callback(r.id);
				} else this.state = "error";
			})
	}

	*saveContact(obj, callback) {
		let prepared = this.prepareInput(obj);
		if (this.photo) {
			prepared.socials = JSON.stringify(prepared.socials);
			yield ContactsAPI.updatePhoto(this.id, Object.assign({photo: this.photo}, prepared))
				.then((r) => {
					if (r !== "error")
						callback(this.id);
					else this.state = "error";
				})
		} else {
			yield ContactsAPI.modifyContact(this.id, this.prepareInput(obj))
				.then((r) => {
					if (r !== "error") {
						callback(this.id);
					} else this.state = "error";
				});
		}
	}

	prepareInput(obj) {
		let socials = {};
		if (obj.hasOwnProperty('socials_viber') && obj.socials_viber) socials.viber = obj.socials_viber;
		if (obj.hasOwnProperty('socials_telegram') && obj.socials_telegram) socials.telegram = obj.socials_telegram;
		if (obj.hasOwnProperty('socials_whatsapp') && obj.socials_whatsapp) socials.whatsapp = obj.socials_whatsapp;
		if (obj.hasOwnProperty('socials_instagram') && obj.socials_instagram) socials.instagram = obj.socials_instagram;
		if (obj.hasOwnProperty('socials_facebook') && obj.socials_facebook) socials.facebook = obj.socials_facebook;
		if (obj.hasOwnProperty('socials_twitter') && obj.socials_twitter) socials.twitter = obj.socials_twitter;
		if (obj.hasOwnProperty('socials_linkedin') && obj.socials_linkedin) socials.linkedin = obj.socials_linkedin;
		if (Object.keys(socials).length > 0) obj.socials = socials;
		if (this.selectedClient) obj.client = this.selectedClient;
		else if (this.editMode) obj.client = this.contactPure.client.id;
		delete obj.photo;
		return obj;
	}

	prepareOutput(obj) {
		let out = {};
		if (obj.hasOwnProperty('socials') && obj.socials && typeof obj.socials === "object")
			for (let key of Object.keys(obj.socials))
				out['socials_' + key] = obj.socials[key];
		out.client = obj.client.name;
		out = Object.assign(obj, out)
		return out;
	}

	onClientSelect = (val, option) => {
		this.selectedClient = option.key;
	}

	uploadPhoto = (file) => {
		return new Promise(() => this.photo = file);
	}
}
