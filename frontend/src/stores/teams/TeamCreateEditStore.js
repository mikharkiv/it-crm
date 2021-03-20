import {action, makeAutoObservable, runInAction} from "mobx";
import {TeamsAPI} from "../../api/TeamsAPI";
import {UsersAPI} from "../../api/UsersAPI";

export class TeamCreateEditStore {
	id;
	team = {};
	state = "idle";
	membListState = "idle";
	members = [];
	membersCache = [];
	membersToDisplayInList = [];
	teamlead_id = -1;
	editMode = false;

	constructor(id, editMode) {
		makeAutoObservable(this);
		this.editMode = editMode;
		if (!this.editMode) this.id = 0;
		else {
			this.id = id;
			this.fetchTeam();
		}
	}

	*fetchTeam() {
		this.team = {};
		this.state = "loading";
		yield TeamsAPI.getTeam(this.id)
			.then((r) => {
				if (r !== "error") {
					this.team = r;
					this.members = this.team.members;
					this.teamlead_id = this.team.teamlead.id;
					this.state = "done";
				} else this.state = "error";
			})
	}

	*fetchUsersToDisplay(query) {
		this.membersToDisplayInList = [];
		this.membListState = "loading";
		yield UsersAPI.getUsers({search: query})
			.then((r) => {
				if (r !== "error") {
					runInAction(() => {
						this.membListState = "done";
						console.log(r.results);
						this.membersToDisplayInList = r.results;
						this.membersCache = r.results;
					});
				} else this.membListState = "error";
			})
	}

	*addTeam(name, description, callback) {
		yield TeamsAPI.addTeam(name, description, this.members.map((e) => e.id), this.teamlead_id)
			.then((r) => {
				if (r !== "error") {
					console.log(r);
					callback(r.id);
				} else this.membListState = "error";
			})
	}

	*saveTeam(name, description, callback) {
		yield TeamsAPI.modifyTeam(this.id, name, description, this.members.map((e) => e.id), this.teamlead_id)
			.then((r) => {
				if (r !== "error") {
					callback(this.id);
				} else this.membListState = "error";
			})
	}

	onMembersAutocompleteChange = (val) => {
		if (val && val.length >= 2)
			this.fetchUsersToDisplay(val);
		else
			this.membersToDisplayInList = [];
	}

	onMembersAutocompleteSelect = (id) => {
		this.members.push(this.membersCache.find((el) => el.id === id));
		if (this.members.length === 1) this.teamlead_id = id;
	}

	onMembersRemove = (id) => {
		this.members.splice(this.members.findIndex((e) => e.id === id),1);
		if (this.members.length === 1) this.teamlead_id = this.members[0].id;
	}

	onMembersTeamlead = (id) => {
		this.teamlead_id = id;
	}
}
