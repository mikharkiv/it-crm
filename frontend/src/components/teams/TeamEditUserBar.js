import UserBar from "../../components/UserBar";
import "../../styles/teams/TeamEditUserBar.css";

import {DeleteOutlined, StarOutlined, StarFilled} from "@ant-design/icons";
import {Button} from "antd";
import {observer} from "mobx-react";

const TeamEditUserBar = (props) => {
	return (
		<div className="team-edit-user-bar">
			<UserBar size="small" name={props.name} avatar={props.avatar} />
			<div className="team-edit-user-bar-buttons">
				{props.hasOwnProperty('onSelect') ? (
					<Button disabled={props.active} onClick={() => props.onSelect(props.id)}
					        icon={props.active ? <StarFilled/> : <StarOutlined/>}/>
				) : (props.active && <StarFilled/>)}
				{props.hasOwnProperty('onRemove') && (
					<Button onClick={() => props.onRemove(props.id)}
					        icon={<DeleteOutlined/>} />
				)}
			</div>
		</div>
	)
}

export default observer(TeamEditUserBar);
