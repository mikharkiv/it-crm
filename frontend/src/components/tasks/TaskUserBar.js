import {observer} from "mobx-react";
import "../../styles/tasks/TaskUserBar.css"
import UserBar from "../UserBar";
import {Checkbox} from "antd";

const TaskUserBar = (props) => {
	return (
		<div className="task-user-bar">
			<UserBar size="small" avatar={props.avatar} name={props.name}/>
			<Checkbox defaultChecked={props.checked} disabled={!props.canEdit} onChange={props.onChange}>Завершено</Checkbox>
		</div>
	);
}

export default observer(TaskUserBar);
