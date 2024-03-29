import {observer} from "mobx-react";
import LoadingIcon from "../LoadingIcon";
import {Button, Col, message, Row, Space, Tabs, Typography} from "antd";
import UserBar from "../UserBar";
import {useHistory, useParams} from "react-router";
import {useEffect, useMemo} from "react";
import {useStores} from "../../hooks/use-stores";
import {ProjectStore} from "../../stores/projects/ProjectStore";
import TaskComments from "../tasks/TaskComments";
import TasksPage from "../tasks/TasksPage";
import DocumentsPage from "../documents/DocumentsPage";
import {runInAction} from "mobx";
import ClientCommunications from "../clients/communications/ClientCommunications";
import {ExclamationOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;
const {TabPane} = Tabs;

const ProjectPage = () => {
	const {id} = useParams();
	const projectStore = useMemo(() => new ProjectStore(id), [id]);
	const rootStore = useStores().rootStore;
	const history = useHistory();

	useEffect(() => {projectStore.fetch()}, [projectStore]);

	runInAction(() => rootStore.setupHeading(true, projectStore.project.name || "...", "Проєкт"));

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
			<Col span={22} style={{marginBottom: "30px"}}>
				<Title>{projectStore.project.name}</Title>
				{
					projectStore.project.has_tasks ?
						(
							projectStore.project.is_finished ?
								(<Text type="success" strong>Всі задачі виконані</Text>) :
								(<Text type="warning" strong>Є невиконані задачі</Text>)
						) :
						(<Text type="danger" strong>Немає задач</Text>)
				}
				<br/>
				{projectStore.isBudgetOverspent && (<Text type="danger" strong>Бюджет перевищено</Text>)}
			</Col>
			<Col span={22}>
				<Tabs defaultActiveKey="1" centered>
					<TabPane key="1" tab="Інформація">
						<Row justify="space-around">
							<Col span={11}>
								<Space direction="vertical">
									<Text className="project-card-text">{projectStore.project.description}</Text>
									<Text>
										<Text strong>{projectStore.isBudgetOverspent && <ExclamationOutlined/>}Бюджет: </Text>
										{projectStore.isBudgetOverspent ? (
											<Text type="danger" strong>{projectStore.project.budget}</Text>
										) : (<Text>{projectStore.project.budget}</Text>)}
									</Text>
									<Text><Text strong>Команда: </Text>{projectStore.project.team.name}</Text>
									<Text strong>Клієнт: </Text>
									<UserBar size="small" name={projectStore.project.client.name}
									         avatar={projectStore.project.client.photo}/>
								</Space>
							</Col>
							<Col span={11}>
								<TaskComments id={id} isProject={true}/>
							</Col>
						</Row>
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
					</TabPane>
					<TabPane key="2" tab="Задачі">
						<TasksPage filters={{project: projectStore.project.id}}/>
					</TabPane>
					<TabPane key="3" tab="Документи">
						<DocumentsPage filters={{project: projectStore.project.id}}/>
					</TabPane>
					<TabPane key="4" tab="Комунікації" style={{paddingBottom: "40px"}}>
						<ClientCommunications type="project" id={id}/>
					</TabPane>
				</Tabs>
			</Col>
		</Row>
	</>
	)
	);
};

export default observer(ProjectPage);
