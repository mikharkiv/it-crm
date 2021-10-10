import {observer} from "mobx-react";
import {Avatar, Col, Row, Tabs, Typography} from "antd";
import {useStores} from "../hooks/use-stores";
import {runInAction} from "mobx";
import ContactsPage from "./contacts/ContactsPage";
import ProjectsPage from "./projects/ProjectsPage";
import TasksPage from "./tasks/TasksPage";
import DocumentsPage from "./documents/DocumentsPage";
import ClientsPage from "./clients/ClientsPage";
import {useEffect} from "react";
import TeamsPage from "./teams/TeamsPage";

const {Title, Text, Link} = Typography;
const {TabPane} = Tabs;

const WelcomePage = (props) => {
	const rootStore = useStores().rootStore;


	useEffect(() => {
		runInAction(() => rootStore.setupHeading(false, " ", " "));
	}, []);

	return (
		<>
			<Row justify="center" style={{marginTop: "20px"}}>
				<Col>
					<Title level={1}>Вітаємо, <Avatar size={48} src={rootStore.me.image} /> {rootStore.me.full_name}</Title>
					<Title level={4} style={{display: 'block', marginTop: '0'}} align="center">{rootStore.me.position === 'MA' ? 'Менеджер' : 'Розробник'}</Title>
				</Col>
				<Col span={22}>
					<Tabs defaultActiveKey="1" centered>
						{rootStore.me.position === 'MA' && (
							<>
							<TabPane tab="Мої клієнти" key="1">
								<ClientsPage filters={{"manager": rootStore.me.id}} />
							</TabPane>
							<TabPane tab="Мої контакти" key="2">
								<ContactsPage filters={{"client__manager": rootStore.me.id}} />
							</TabPane>
							<TabPane tab="Мої задачі" key="3">
								<TasksPage filters={{"project__client__manager": rootStore.me.id}} />
							</TabPane>
							<TabPane tab="Мої проєкти" key="4">
								<ProjectsPage filters={{"client__manager": rootStore.me.id}} />
							</TabPane>
							<TabPane tab="Мої документи" key="5">
								<DocumentsPage filters={{"client__manager": rootStore.me.id}} />
							</TabPane>
							</>
						)}
						{rootStore.me.position !== 'MA' && (
							<>
							<TabPane tab="Мої задачі" key="1">
								<TasksPage filters={{"attached_persons__person": rootStore.me.id}} />
							</TabPane>
							<TabPane tab="Мої проєкти" key="2">
								<ProjectsPage filters={{"team__members": rootStore.me.id}} />
							</TabPane>
							<TabPane tab="Мої команди" key="3">
								<TeamsPage filters={{"members": rootStore.me.id}} />
							</TabPane>
							</>
						)}
					</Tabs>
				</Col>
			</Row>
		</>
	);
}

export default observer(WelcomePage);
