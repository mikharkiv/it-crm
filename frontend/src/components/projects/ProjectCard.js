import {observer} from "mobx-react";
import {Typography, Space} from "antd";
import {Link} from "react-router-dom";
import UserBar from "../UserBar";
import "../../styles/project/ProjectCard.css";

const {Title, Text} = Typography;

const ProjectCard = (props) => {
	return (
		<div className="project-card">
			<Title level={3}><Link to={`${props.url}${props.project.id}`}>{props.project.name}</Link></Title>
			<Space direction="vertical">
				<Text className="project-card-text">{props.project.description}</Text>
				<Text><Text strong>Команда: </Text>{props.project.team.name}</Text>
				<Text strong>Клієнт: </Text>
				<UserBar size="small" name={props.project.client.name}
				         avatar={props.project.client.photo}/>
			</Space>
		</div>
	);
}

export default observer(ProjectCard);
