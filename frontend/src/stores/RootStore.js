import {makeAutoObservable} from "mobx";
import {Api} from "../api/Api";

export class RootStore {
	// login logics
	isApiAvailable = true;
	isLoggedIn = false;
	errorLoggingIn = undefined;
	// page header logics
	pageHeaderTitle = "";
	pageHeaderSecondary = "";
	canGoBack = true;

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
		});
	}

	*doLogin(email, password, callback) {
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
		});
	}

	setupHeading = (canBack, title, secondary) => {
		this.canGoBack = canBack;
		this.pageHeaderTitle = title;
		this.pageHeaderSecondary = secondary;
	}
}
