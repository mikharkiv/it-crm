import {observer} from "mobx-react";
import {useHistory, useRouteMatch} from "react-router";
import {useEffect, useMemo} from "react";
import {useStores} from "../../hooks/use-stores";
import {action, runInAction} from "mobx";
import {Button, Col, Pagination, Row, Input, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import LoadingIcon from "../LoadingIcon";
import {TasksStore} from "../../stores/tasks/TasksStore";
import TaskCard from "./TaskCard";
import {paths} from "../../Paths";

const {Search} = Input;
const {Title} = Typography;

const TasksPage = (props) => {
	const history = useHistory();
	const store = useMemo(() => new TasksStore(props.filters), []);
	const rootStore = useStores().rootStore;
	const { path, url } = useRouteMatch();

	useEffect(action(() => {
		runInAction(() => rootStore.setupHeading(false, "Задачі", ""));
		store.fetchTasks();
	}), []);

	return (
		<>
			<Row key="row1" justify="center">
				<Col span={20}
				     style={{marginBottom: "20px"}}
				     style={{display: "flex"}}
				>
					<Search placeholder="Введіть запит для пошуку..."
					        onSearch={store.doSearch}
					        loading={store.state === "loading"}
					        style={{"flexGrow": 1, "marginRight": "15px"}}
					/>
					<Button type="primary" style={{backgroundColor: "green", borderColor: "green"}} icon={<PlusOutlined/>} onClick={() => history.push('/tasks/new')}>Додати</Button>
				</Col>
			</Row>
			<Row key="row2" justify="center" gutter={20}>
				{store.state === "loading" ?
					<LoadingIcon/> :
					(store.tasks.length > 0 ?
						store.tasks.map((el) => (
						<Col key={el.id} span={20}>
							<TaskCard task={el} url={paths.tasks}/>
						</Col>
					)) : (
						<Col span={20}>
							<div className="list-no-results">
								<Title level={4}>Немає результатів</Title>
							</div>
						</Col>
						))
				}
			</Row>
			<Row key="row3" justify="center" style={{marginBottom: "40px"}}>
				<Pagination current={store.page} defaultPageSize={1} total={store.totalPages} onChange={store.goToPage}/>
			</Row>
		</>
	);
}

export default observer(TasksPage);
