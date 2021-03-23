import {Button, Col, message, Row, Space, Typography} from "antd";
import {observer} from "mobx-react";
import {useHistory, useParams} from "react-router";
import {useStores} from "../../hooks/use-stores";
import {runInAction} from "mobx";
import {useEffect, useMemo} from "react";
import {TaskStore} from "../../stores/tasks/TaskStore";
import LoadingIcon from "../LoadingIcon";
import UserBar from "../UserBar";
import TaskUserBar from "./TaskUserBar";
import TaskComments from "./TaskComments";

const {Text, Title, Link} = Typography;

const TaskPage = () => {
	const {id} = useParams();
	const taskStore = useMemo(() => new TaskStore(id), [id]);
	const rootStore = useStores().rootStore;
	const history = useHistory();

	useEffect(() => {taskStore.fetch()}, [taskStore]);

	runInAction(() => rootStore.setupHeading(true, taskStore.task.name || "...", "Задача"));

	const edit = () => {
		history.push(`/tasks/${id}/edit`);
	};

	const removeCallback = () => {
		message.success("Задачу успішно видалено!", 5);
		history.push('/tasks/');
	}

	return (
		taskStore.state === "loading" || Object.keys(taskStore.task).length === 0 ? (<LoadingIcon/>) : (
			<>
				<Row justify="space-around" style={{marginTop: "20px"}} className="task-page">
					<Col span={11} style={{marginBottom: "30px"}}>
						<Title level={3}>{taskStore.task.name}</Title>
						<Text style={{marginBottom: "20px", display: "block"}}>{taskStore.task.description}</Text>
						<Space direction="vertical">
							<Text><Text strong>Дедлайн: </Text>{taskStore.task.deadline}</Text>
							<Text><Text strong>Створено: </Text>{taskStore.task.created_at}</Text>
							<Text><Text strong>Бюджет: </Text>{taskStore.task.budget}</Text>
							<Text><Text strong>Проєкт: </Text>{taskStore.task.project.name}</Text>
							<Text><Text strong>Автор: </Text><UserBar size="small" avatar={taskStore.task.author.image}
							                                          name={taskStore.task.author.full_name}/></Text>
						</Space>
						<Title level={3} style={{margin: "15px 0"}}>Прикріплені користувачі</Title>
						<div className="task-page-attached_users">
							{taskStore.task.hasOwnProperty('attached_persons') &&
							taskStore.task["attached_persons"].map((e) => (
								<TaskUserBar key={e.person.id} avatar={e.person.image} name={e.person.full_name} checked={e.is_completed}
								             canEdit={
								             	rootStore.me && rootStore.me.hasOwnProperty('id') && e.person.id === rootStore.me.id
								             }
								             onChange={(e) => taskStore.setCompleted(e.target.checked)} />
							))}
						</div>
					</Col>
					<Col span={11}>
						<TaskComments id={id} isProject={false}/>
					</Col>
					<Col span={16} style={{marginBottom: "30px"}}>
						<Button type="primary" disabled={taskStore.state === "loading"} loading={taskStore.state === "loading"}
						        onClick={() => edit()} style={{marginRight: "15px"}}>
							Редагувати
						</Button>
						<Button type="primary" danger disabled={taskStore.state === "loading"}
						        loading={taskStore.state === "loading"}
						        onClick={() => taskStore.remove(removeCallback)}>
							Видалити
						</Button>
					</Col>
				</Row>
			</>
		)
	);
}

export default observer(TaskPage);
