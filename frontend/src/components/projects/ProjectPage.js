import {observer} from "mobx-react";
import LoadingIcon from "../LoadingIcon";
import {Button, Col, message, Row, Space, Typography} from "antd";
import UserBar from "../UserBar";
import {useHistory, useParams} from "react-router";
import {useEffect, useMemo} from "react";
import {useStores} from "../../hooks/use-stores";
import {ProjectStore} from "../../stores/projects/ProjectStore";
import TaskComments from "../tasks/TaskComments";

const {Title, Text} = Typography;

const ProjectPage = () => {
	const {id} = useParams();
	const projectStore = useMemo(() => new ProjectStore(id), [id]);
	const rootStore = useStores().rootStore;
	const history = useHistory();

	useEffect(() => {projectStore.fetch()}, [projectStore]);

	rootStore.setupHeading(true, projectStore.project.name || "...", "Проєкт");

	const edit = () => {
		history.push(`/projects/${id}/edit`);
	};

	const removeCallback = () => {
		message.success("Проєкт успішно видалено!", 5);
		history.push('/projects/');
	}

	return (
	projectStore.state === "loading" ? (<LoadingIcon/>) : (
	<>
		<Row justify="space-around" style={{marginTop: "20px"}}>
			<Col span={11} style={{marginBottom: "30px"}}>
				<Title>{projectStore.project.name}</Title>
				<Space direction="vertical">
					<Text className="project-card-text">{projectStore.project.description}</Text>
					<Text><Text strong>Команда: </Text>{projectStore.project.team.name}</Text>
					<Text strong>Клієнт: </Text>
					<UserBar size="small" name={projectStore.project.client.name}
					         avatar={projectStore.project.client.photo}/>
				</Space>
			</Col>
			<Col span={11}>
				<TaskComments id={id} isProject={true}/>
			</Col>
			<Col span={16} style={{marginBottom: "30px"}}>
				<Button type="primary" disabled={projectStore.state === "loading"} loading={projectStore.state === "loading"}
				        onClick={() => edit()} style={{marginRight: "15px"}}>
					Редагувати
				</Button>
				<Button type="primary" danger disabled={projectStore.state === "loading"}
				        loading={projectStore.state === "loading"}
				        onClick={() => projectStore.remove(removeCallback)}>
					Видалити
				</Button>
			</Col>
		</Row>
	</>
	)
	);
};

export default observer(ProjectPage);
