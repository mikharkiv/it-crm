import {Api} from "./Api";

export class TeamsAPI {
	static apiUrl = Api.mainUrl + 'teams/';
	static addMemberPostfix = '/addmember';
	static removeMemberPostfix = '/removemember';
	static setTeamleadPostfix = '/setteamlead';

	static async getTeams(urlParams) {
		return await Api.fetch(Api.getLink(this.apiUrl, urlParams))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async getTeam(id) {
		return await Api.fetch(`${this.apiUrl}${id}`)
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async addTeam(name, description, members, teamlead) {
		return await Api.fetch(`${this.apiUrl}`,
			Object.assign({}, Api.postJson, {body: JSON.stringify({name, description, members, teamlead})}))
			.then((r) => r.json())
			.catch(() => "error");
	}

	static async removeTeam(id){
		return await Api.fetch(`${this.apiUrl}${id}/`, Api.delete)
			.then((r) => r.json())
			.catch(() => "error");
	};

	static async modifyTeam(id, name, description, members, teamlead) {
		return await Api.fetch(`${this.apiUrl}${id}/`,
			Object.assign({}, Api.putJson, {body: JSON.stringify({id, name, description, members, teamlead})}))
			.then((r) => r.json())
			.catch(() => "error");
	};

	static async addTeamMember(id, memberId) {
		return await Api.fetch(`${this.apiUrl}${id}${this.addMemberPostfix}`,
			Object.assign(Api.postJson, {body: JSON.stringify({user_id: memberId})}))
			.then((r) => r.json())
			.catch(() => "error");
	};
	static async removeTeamMember(id, memberId) {
		return await Api.fetch(`${this.apiUrl}${id}${this.removeMemberPostfix}`,
			Object.assign(Api.postJson, {body: JSON.stringify({user_id: memberId})}))
			.then((r) => r.json())
			.catch(() => "error");
	};

	static async setTeamlead(id, teamleadId) {
		return await Api.fetch(`${this.apiUrl}${id}${this.setTeamleadPostfix}`,
			Object.assign(Api.postJson, {body: JSON.stringify({user_id: teamleadId})}))
			.then((r) => r.json())
			.catch(() => "error");
	};
}
