import {makeAutoObservable} from "mobx";
import {AutoComplete} from "antd";
import UserBar from "./../UserBar";
import {observer} from "mobx-react";
import {useMemo} from "react";
import {ClientsAPI} from "../../api/ClientsAPI";

export class ClientAutocompleteStore {
	variants = [];
	state = "idle";

	constructor() {
		makeAutoObservable(this);
	}

	*fetchVariants(query) {
		this.variants = [];
		this.state = "loading";
		yield ClientsAPI.getClients({search: query}).then((r) => {
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

const ClientAutocomplete = (props) => {
	const store = useMemo(() => new ClientAutocompleteStore(), []);

	return (
		<AutoComplete placeholder="Почніть писати, щоб побачити варіанти..."
		              onSelect={props.onSelect}
		              onChange={store.onChange} >
			{ store.variants.map((e) => (
				<AutoComplete.Option key={e.id} value={e.name}>
					<UserBar size="small" name={e.name} avatar={e.image}/>
				</AutoComplete.Option>
			))}
		</AutoComplete>
	);
}

export default observer(ClientAutocomplete);
