import {makeAutoObservable} from "mobx";
import {AutoComplete} from "antd";
import UserBar from "./../UserBar";
import {observer} from "mobx-react";
import {useMemo, useState, useEffect} from "react";
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
	const [localVal, setLocalVal] = useState(props.value ? {value: props.value.value, key: props.value.key} :
		{value: '', key: null});

	const onChange = (val) => {
		store.onChange(val);
		setLocalVal({value: val, key: null});
	}

	const onSelect = (val, option) => {
		setLocalVal({value: val, key: option.key});
		if (props.onChange) props.onChange(option.key);
		if (props.onSelect) props.onSelect(val, option);
	}

	return (
		<AutoComplete placeholder="Почніть писати, щоб побачити варіанти..."
		              onSelect={onSelect}
		              onChange={onChange}
		              value={localVal.value} >
			{ store.variants.map((e) => (
				<AutoComplete.Option key={e.id} value={e.name}>
					<UserBar size="small" name={e.name} avatar={e.image}/>
				</AutoComplete.Option>
			))}
		</AutoComplete>
	);
}

export default observer(ClientAutocomplete);
