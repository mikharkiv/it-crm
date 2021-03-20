import {makeAutoObservable} from "mobx";
import {AutoComplete} from "antd";
import UserBar from "./../UserBar";
import {observer} from "mobx-react";
import {useMemo} from "react";
import {UsersAPI} from "../../api/UsersAPI";

export class UserAutocompleteStore {
	variants = [];
	state = "idle";

	constructor() {
		makeAutoObservable(this);
	}

	*fetchVariants(query) {
		this.variants = [];
		this.state = "loading";
		yield UsersAPI.getUsers({search: query}).then((r) => {
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

const UserAutocomplete = (props) => {
	const store = useMemo(() => new UserAutocompleteStore(), []);

	return (
		<AutoComplete placeholder="Почніть писати, щоб побачити варіанти..."
		              onSelect={props.onSelect}
		              onChange={store.onChange}
					  defaultValue={props.value}>
			{ store.variants.map((e) => (
				<AutoComplete.Option key={e.id} value={e.full_name}>
					<UserBar size="small" name={e.full_name} avatar={e.image}/>
				</AutoComplete.Option>
			))}
		</AutoComplete>
	);
}

export default observer(UserAutocomplete);
