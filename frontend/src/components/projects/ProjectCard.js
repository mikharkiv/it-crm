import {observer} from "mobx-react";
import {Typography, Space} from "antd";
import {Link} from "react-router-dom";
import UserBar from "../UserBar";
import "../../styles/project/ProjectCard.css";
import {ExclamationOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;

const ProjectCard = (props) => {
	const isBudgetOverspent = props.project.budget < props.project.tasks_budget;

	return (
		<div className="project-card">
			<Title level={3}><Link to={`${props.url}${props.project.id}`}>{props.project.name}</Link></Title>
			<Space direction="vertical">
				{
					props.project.has_tasks ?
						(
							props.project.is_finished ?
								(<Text type="success" strong>Всі задачі виконані</Text>) :
								(<Text type="warning" strong>Є невиконані задачі</Text>)
						) :
						(<Text type="danger" strong>Немає задач</Text>)
				}
				<Text className="project-card-text">{props.project.description}</Text>
				<Text>
					<Text strong>{isBudgetOverspent && <ExclamationOutlined/>}Бюджет: </Text>
					{isBudgetOverspent ? (
						<Text type="danger" strong>{props.project.budget}</Text>
					) : (<Text>{props.project.budget}</Text>)}
				</Text>
				<Text><Text strong>Витрачено: </Text>{props.project.tasks_budget}</Text>
				<Text><Text strong>Команда: </Text>{props.project.team.name}</Text>
				<Text strong>Клієнт: </Text>
				<UserBar size="small" name={props.project.client.name}
				         avatar={props.project.client.photo}/>
			</Space>
		</div>
	);
}

export default observer(ProjectCard);
