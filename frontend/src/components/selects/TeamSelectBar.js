import {makeAutoObservable} from "mobx";
import {AutoComplete} from "antd";
import {observer} from "mobx-react";
import {useMemo} from "react";
import {TeamsAPI} from "../../api/TeamsAPI";

class TeamAutocompleteStore {
	variants = [];
	state = "idle";

	constructor() {
		makeAutoObservable(this);
	}

	*fetchVariants(query) {
		this.variants = [];
		this.state = "loading";
		yield TeamsAPI.getTeams({search: query}).then((r) => {
			if (r !== "error") {
				this.state = "done";
				this.variants = r.results;
			} else this.state = "error";
		});
	}

	onChange = (val) => {
		if (val && val.length >= 2) this.fetchVariants(val);
		else this.variants = [];
	}
}

const TeamAutocomplete = (props) => {
	const store = useMemo(() => new TeamAutocompleteStore(), []);

	return (
		<AutoComplete placeholder="Почніть писати, щоб побачити варіанти..."
		              onSelect={props.onSelect}
		              onChange={store.onChange} >
			{ store.variants.map((e) => (
				<AutoComplete.Option key={e.id} value={e.name}>
					{e.name}
				</AutoComplete.Option>
			))}
		</AutoComplete>
	);
}

export default observer(TeamAutocomplete);
