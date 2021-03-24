import {makeAutoObservable, runInAction} from "mobx";
import {Api} from "../api/Api";
import {UsersAPI} from "../api/UsersAPI";
import {message} from "antd";

export class RootStore {
	// login logics
	state = "idle";
	isApiAvailable = true;
	isLoggedIn = false;
	hasLoggedOut = false;
	errorLoggingIn = undefined;
	// page header logics
	pageHeaderTitle = "";
	pageHeaderSecondary = "";
	canGoBack = true;

	me = {};

	constructor() {
		makeAutoObservable(this);
		this.checkLocalStorage();
	}

	checkLocalStorage() {
		if (localStorage.length === 0) return;
		let token = localStorage.getItem('token');
		if (!token) return;
		Api.fetchNoToken('http://localhost:8000/api/token/verify/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({token})
		}).then((r) => {
			if (r.ok) {
				this.errorLoggingIn = false;
				this.isLoggedIn = true;
			}
			else {
				this.isLoggedIn = false;
				this.errorLoggingIn = true;
				return Response.error();
			}
			this.state = "inited";
		});
	}

	*doLogin(email, password, doRemember, callback) {
		yield Api.fetchNoToken('http://localhost:8000/api/token/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password})
		}).then((r) => {
			if (r.ok)
				return r.json()
			else {
				this.isLoggedIn = false;
				this.errorLoggingIn = true;
				return Response.error();
			}
		}).then((r) => {
			localStorage.setItem('token', r.access);
			localStorage.setItem('refresh', r.refresh);
			this.errorLoggingIn = false;
			this.isLoggedIn = true;
			if (callback)
				callback.call();

			// get curr user
			UsersAPI.getMe().then((r) => {
				if (r !== "error") this.me = r
				message.info(`Ви увійшли як ${this.me.full_name}, ${this.me.position === 'MA' ? 'Менеджер' : 'Розробник'}`, 7);
			});
		});
	}

	setupHeading = (canBack, title, secondary) => {
		this.canGoBack = canBack;
		this.pageHeaderTitle = title;
		this.pageHeaderSecondary = secondary;
	}

	logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('refresh');
		this.errorLoggingIn = false;
		this.isLoggedIn = false;
		this.hasLoggedOut = true;
		console.log('logged out');
	}
}
