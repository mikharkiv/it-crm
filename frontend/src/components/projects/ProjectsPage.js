import {observer} from "mobx-react";
import {useHistory, useRouteMatch} from "react-router";
import {useEffect, useMemo} from "react";
import {useStores} from "../../hooks/use-stores";
import {action} from "mobx";
import {Button, Col, Input, Pagination, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import LoadingIcon from "../LoadingIcon";
import {ProjectsStore} from "../../stores/projects/ProjectsStore";
import ProjectCard from "./ProjectCard";

const {Search} = Input;

const ProjectPage = () => {
	const history = useHistory();
	const store = useMemo(() => new ProjectsStore(), []);
	const rootStore = useStores().rootStore;
	const { path, url } = useRouteMatch();

	useEffect(action(() => {
		rootStore.setupHeading(false, "Проєкти", "");
		store.fetchProjects();
	}), []);

	return (
		<>
			<Row key="row1" justify="center">
				<Col span={20}
				     style={{marginBottom: "20px", display: "flex"}}
				>
					<Search placeholder="Введіть запит для пошуку..."
					        onSearch={store.doSearch}
					        loading={store.state === "loading"}
					        style={{"flexGrow": 1, "marginRight": "15px"}}
					/>
					<Button type="primary" style={{backgroundColor: "green", borderColor: "green"}} icon={<PlusOutlined/>} onClick={() => history.push('/projects/new')}>Додати</Button>
				</Col>
			</Row>
			<Row key="row2" justify="center" gutter={20}>
				{store.state === "loading" ?
					<LoadingIcon/> :
					(store.projects.map((el) => (
						<Col key={el.id} span={20}>
							<ProjectCard project={el} url={url}/>
						</Col>
					)))
				}
			</Row>
			<Row key="row3" justify="center" style={{marginBottom: "40px"}}>
				<Pagination current={store.page} defaultPageSize={1} total={store.totalPages} onChange={store.goToPage}/>
			</Row>
		</>
	);
}

export default observer(ProjectPage);
