import {makeAutoObservable} from "mobx";
import {AutoComplete} from "antd";
import {observer} from "mobx-react";
import {useMemo} from "react";
import {ProjectsAPI} from "../../api/ProjectsAPI";
import {TasksAPI} from "../../api/TasksAPI";

class ProjectAutocompleteStore {
	variants = [];
	state = "idle";

	constructor() {
		makeAutoObservable(this);
	}

	*fetchVariants(query) {
		this.variants = [];
		this.state = "loading";
		yield TasksAPI.getTasks({search: query}).then((r) => {
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

const TaskAutocomplete = (props) => {
	const store = useMemo(() => new ProjectAutocompleteStore(), []);

	return (
		<AutoComplete placeholder="Почніть писати, щоб побачити варіанти..."
		              onSelect={props.onSelect}
		              onChange={store.onChange}
		              defaultValue={props.value}>
			{ store.variants.map((e) => (
				<AutoComplete.Option key={e.id} value={e.name}>
					{e.name}
				</AutoComplete.Option>
			))}
		</AutoComplete>
	);
}

export default observer(TaskAutocomplete);
