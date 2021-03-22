import {action, makeAutoObservable, runInAction} from "mobx";
import {AutoComplete} from "antd";
import UserBar from "./../UserBar";
import {observer} from "mobx-react";
import {useMemo, useState} from "react";
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

	const [val, setVal] = useState('');

	const onValChange = (v) => {
		setVal(v);
		runInAction(() => store.onChange(v));
	}

	const onSelect = (k, o) => {
		if (props.clearAfterSelect)
			setVal('');
		runInAction(() => props.onSelect(k, o));
	}

	return (
		<AutoComplete placeholder="Почніть писати, щоб побачити варіанти..."
		              onSelect={onSelect}
		              onChange={onValChange}
					  defaultValue={props.value} value={props.clearAfterSelect && val}>
			{ store.variants.map((e) => (
				<AutoComplete.Option key={e.id} value={e.full_name}>
					<UserBar size="small" name={e.full_name} avatar={e.image}/>
				</AutoComplete.Option>
			))}
		</AutoComplete>
	);
}

export default observer(UserAutocomplete);
