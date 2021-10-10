import {action, makeAutoObservable, runInAction} from "mobx";
import {AutoComplete} from "antd";
import UserBar from "./../UserBar";
import {observer} from "mobx-react";
import {useMemo, useState, useEffect} from "react";
import {UsersAPI} from "../../api/UsersAPI";

export class UserAutocompleteStore {
	variants = [];
	state = "idle";
	variantsCallback = null;
	onlyManager = false;

	constructor(variantsCallback, onlyManager) {
		makeAutoObservable(this, {
			onChange: action
		});
		this.variantsCallback = variantsCallback;
		this.onlyManager = onlyManager;
	}

	*fetchVariants(query) {
		this.variants = [];
		this.state = "loading";
		const params = {search: query};
		if (this.onlyManager) params['position'] = 'MA';
		yield UsersAPI.getUsers(params).then((r) => {
			if (r !== "error") {
				this.state = "done";
				runInAction(() => this.variants = r.results);
				typeof this.variantsCallback === "function" && this.variantsCallback(this.variants);
			} else this.state = "error";
		});
	}

	onChange = (val) => {
		if (val && val.length >= 2) runInAction(() => this.fetchVariants(val));
		else this.variants = [];
	}
}

const UserAutocomplete = (props) => {
	const store = useMemo(() => new UserAutocompleteStore(props.variantsCallback, props.onlyManager), []);
	const [localVal, setLocalVal] = useState(props.value ? {value: props.value.value, key: props.value.key} :
		{value: '', key: null});

	useEffect(() => props.onChange && props.value && props.value.key && props.onChange(props.value.key),
		[props, props.value, props.onChange]);

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
					  value={localVal.value}>
			{ store.variants.map((e) => (
				<AutoComplete.Option key={e.id} value={e.full_name}>
					<UserBar size="small" name={e.full_name} avatar={e.image}/>
				</AutoComplete.Option>
			))}
		</AutoComplete>
	);
}

export default observer(UserAutocomplete);
