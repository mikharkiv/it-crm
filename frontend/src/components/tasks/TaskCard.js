import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import UserBar from "../UserBar";
import {Space} from "antd";
import {Typography} from "antd";
import "../../styles/tasks/TaskCard.css";

const {Title, Text} = Typography;

const TaskCard = (props) => {
	return (
		<Space direction="vertical" className="task-card">
			<Title level={3} style={{marginBottom: "0px"}}>
				<Link to={`${props.url}${props.task.id}`}>{props.task.name}</Link>
			</Title>
			<Text>{props.task.description}</Text>
			<Text><Text strong>Дедлайн: </Text>{props.task.deadline}</Text>
			<Text><Text strong>Бюджет: </Text>{props.task.budget}</Text>
			<Text><Text strong>Проєкт: </Text>{props.task.project.name}</Text>
			<Text><Text strong>Автор: </Text><UserBar size="small" avatar={props.task.author.image} name={props.task.author.full_name}/></Text>
		</Space>
	);
}

export default observer(TaskCard);
