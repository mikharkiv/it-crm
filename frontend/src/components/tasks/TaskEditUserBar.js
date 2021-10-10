import UserBar from "../../components/UserBar";
import "../../styles/tasks/TaskEditUserBar.css";
import {DeleteOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {observer} from "mobx-react";

const TaskEditUserBar = (props) => {
	return (
		<div className="task-edit-user-bar">
			<UserBar size="small" name={props.name} avatar={props.avatar} />
			<div className="task-edit-user-bar-buttons">
				{props.hasOwnProperty('onRemove') && (
					<Button onClick={() => props.onRemove(props.id)} icon={<DeleteOutlined/>} />)}
			</div>
		</div>
	);
}

export default observer(TaskEditUserBar);
