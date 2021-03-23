import {observer} from "mobx-react";
import {useHistory, useRouteMatch} from "react-router";
import {useEffect, useMemo} from "react";
import {useStores} from "../../hooks/use-stores";
import {action, runInAction} from "mobx";
import {Button, Col, Pagination, Row, Input, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import LoadingIcon from "../LoadingIcon";
import {DocumentsStore} from "../../stores/documents/DocumentsStore";
import DocumentCard from "./DocumentCard";
import {paths} from "../../Paths";

const {Search} = Input;
const {Title} = Typography;

const DocumentsPage = (props) => {
	const history = useHistory();
	const store = useMemo(() => new DocumentsStore(props.filters), []);
	const rootStore = useStores().rootStore;
	const { path, url } = useRouteMatch();

	useEffect(action(() => {
		runInAction(() => rootStore.setupHeading(false, "Документи", ""));
		store.fetchDocuments();
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
					<Button type="primary" style={{backgroundColor: "green", borderColor: "green"}} icon={<PlusOutlined/>} onClick={() => history.push('/documents/new')}>Додати</Button>
				</Col>
			</Row>
			<Row key="row2" justify="center" gutter={20}>
				{store.state === "loading" ?
					<LoadingIcon/> :
					(store.documents.length > 0 ?
						store.documents.map((el) => (
						<Col key={el.id} span={20}>
							<DocumentCard document={el} url={paths.documents}/>
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

export default observer(DocumentsPage);
