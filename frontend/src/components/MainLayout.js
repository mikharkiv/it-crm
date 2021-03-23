import { Layout, Menu, PageHeader } from 'antd';
import {
	HomeOutlined,
	UserOutlined,
	ContactsOutlined,
	AppstoreOutlined,
	CarryOutOutlined,
	TeamOutlined,
	FileOutlined,
	LineChartOutlined,
	BulbOutlined,
	SettingOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import {Route, Switch} from "react-router-dom";
import AdviceView from "./advice/AdviceView";
import {useRouteMatch} from "react-router-dom";
import {useMemo} from "react";
import {MainLayoutStore} from "../stores/MainLayoutStore";
import {observer} from "mobx-react";
import {useHistory} from "react-router";
import {useStores} from "../hooks/use-stores";
import TeamsView from "./teams/TeamsView";
import ContactsView from "./contacts/ContactsView";
import ProjectsView from "./projects/ProjectsView";
import DocumentsView from "./documents/DocumentsView";
import TasksView from "./tasks/TasksView";
import ClientsView from "./clients/ClientsView";
import StatsPage from "./stats/StatsPage";
import {runInAction} from "mobx";

const { Content, Sider } = Layout;


const MainLayout = () => {
	const { path, url } = useRouteMatch();
	const history = useHistory();
	const store = useMemo(() => new MainLayoutStore(), []);
	const rootStore = useStores().rootStore;

	return (
		<Layout>
			<Sider>
				<Menu mode="inline" theme="dark" style={{height: "100vh"}} onClick={
					({key}) => {
						if (key === "10") {
							runInAction(() => rootStore.logout());
						}
						else
							history.push(store.menuItemClickPath(key));
					}
				}>
					<Menu.Item key="0" icon={<HomeOutlined/>}>Головна</Menu.Item>
					<Menu.Item key="1" icon={<UserOutlined/>}>Клієнти</Menu.Item>
					<Menu.Item key="2" icon={<ContactsOutlined/>}>Контакти</Menu.Item>
					<Menu.Item key="3" icon={<AppstoreOutlined/>}>Проєкти</Menu.Item>
					<Menu.Item key="4" icon={<CarryOutOutlined/>}>Задачі</Menu.Item>
					<Menu.Item key="5" icon={<TeamOutlined/>}>Команди</Menu.Item>
					<Menu.Item key="6" icon={<FileOutlined/>}>Документи</Menu.Item>
					<Menu.Item key="7" icon={<LineChartOutlined/>}>Статистика</Menu.Item>
					<Menu.Item key="8" icon={<BulbOutlined/>}>Порадник</Menu.Item>
					{/*<Menu.Item key="9" icon={<SettingOutlined/>}>Налаштування</Menu.Item>*/}
					<Menu.Item key="10" icon={<LogoutOutlined/>}>Вийти</Menu.Item>
				</Menu>
			</Sider>
			<Content>
				<div className="page">
					<PageHeader
						onBack = {history.length > 0 && rootStore.canGoBack ? (() => history.goBack()) : false}
						title = {rootStore.pageHeaderTitle}
						subTitle = {rootStore.pageHeaderSecondary}
						/>
					<Switch>
						<Route path={`${path}advice`} component={AdviceView}/>
						<Route path={`${path}teams`} component={TeamsView}/>
						<Route path={`${path}contacts`} component={ContactsView}/>
						<Route path={`${path}projects`} component={ProjectsView}/>
						<Route path={`${path}documents`} component={DocumentsView}/>
						<Route path={`${path}tasks`} component={TasksView}/>
						<Route path={`${path}clients`} component={ClientsView}/>
						<Route path={`${path}stats`} component={StatsPage}/>
					</Switch>
				</div>
			</Content>
		</Layout>
	);
}

export default observer(MainLayout);
