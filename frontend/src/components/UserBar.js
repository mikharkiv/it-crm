import "../styles/UserBar.css";
import {Avatar, Typography} from "antd";
import {Link} from "react-router-dom";
const {Title, Text} = Typography;

const UserBar = function(props) {
	return (
		<div className="user-bar">
			<Avatar size={props.size === "small" ? "default" : 64} src={props.avatar}/>
			<div className="user-bar-sub">
				<Title level={props.size === "small" ? 5 : 3} style={{marginBottom: 0}}>
					{props.link ? (<Link to={props.link}>{props.name}</Link>): props.name }
				</Title>
				{props.text ? <Text type="secondary">{props.text}</Text> : null}
			</div>
		</div>
	);
}

export default UserBar;
