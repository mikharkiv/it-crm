import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import UserBar from "../UserBar";
import {Col, Space} from "antd";
import {Typography} from "antd";
import "../../styles/tasks/TaskCard.css";
const moment = require('moment');

const {Title, Text} = Typography;

const TaskCard = (props) => {
	const is_task_outdated = () => {
		return moment(props.task.deadline, 'DD.MM.YYYY HH:mm').isBefore(moment());
	}

	return (
		<Space direction="vertical" className="task-card">
			<Title level={3} style={{marginBottom: "0px"}} delete={props.task.is_completed}>
				<Link to={`${props.url}${props.task.id}`}>{props.task.name}</Link>
			</Title>
			{
				props.task.is_completed ?
					(<Text type="success">Виконано</Text>) :
					(<Text type="danger">Не виконано</Text>)
			}
			{
				is_task_outdated && !props.task.is_completed &&
				(<Text type="danger" strong>Прострочено</Text>)
			}
			<Text>{props.task.description}</Text>
			<Text><Text strong>Дедлайн: </Text>{props.task.deadline}</Text>
			<Text><Text strong>Бюджет: </Text>{props.task.budget}</Text>
			<Text><Text strong>Проєкт: </Text>{props.task.project.name}</Text>
			<Text><Text strong>Автор: </Text><UserBar size="small" avatar={props.task.author.image} name={props.task.author.full_name}/></Text>
		</Space>
	);
}

export default observer(TaskCard);
