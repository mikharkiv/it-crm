import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import UserBar from "../UserBar";
import {Avatar, Space} from "antd";
import {Typography} from "antd";
import "../../styles/teams/TeamCard.css";

const {Title, Text} = Typography;

const TeamCard = (props) => {
	return (
		<Space direction="vertical" className="team-card">
			<Title level={3} style={{marginBottom: "0px"}}>
				<Link to={`${props.url}${props.team.id}`}>{props.team.name}</Link>
			</Title>
			<Text>{props.team.description}</Text>
			{ props.team.teamlead && (<UserBar size="small" name={props.team.teamlead.full_name} avatar={props.team.teamlead.image} text={"Teamlead"} />)}
			<Title level={5}>Учасники</Title>
			<div className="team-card-avatars">
				{ props.team.members.map((e) => (
					<div className="team-card-avatar-container">
						<Avatar src={e.image}/>
					</div>
				)) }
			</div>
		</Space>
	);
}

export default observer(TeamCard);
