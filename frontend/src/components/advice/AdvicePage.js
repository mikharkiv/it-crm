import {observer} from "mobx-react";
import {Col, Row, Input, Pagination, Button} from "antd";
import AdviceCard from "./AdviceCard";
import {useEffect, useMemo} from "react";
import LoadingIcon from "../LoadingIcon";
import {useHistory, useRouteMatch} from "react-router";
import {AdviceStore} from "../../stores/advice/AdviceStore";
import { PlusOutlined } from '@ant-design/icons';
import {useStores} from "../../hooks/use-stores";
import {action, runInAction} from "mobx";
import {paths} from "../../Paths";


const {Search} = Input;

const AdvicePage = (props) => {
	const history = useHistory();
	const store = useMemo(() => new AdviceStore(props.filters), []);
	const rootStore = useStores().rootStore;
	const { path, url } = useRouteMatch();

	useEffect(action(() => {
		runInAction(() => rootStore.setupHeading(false, "Поради", ""));
		store.fetchAdvice();
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
			        <Button type="primary" style={{backgroundColor: "green", borderColor: "green"}} icon={<PlusOutlined/>} onClick={() => history.push('/advice/new')}>Додати</Button>
				</Col>
			</Row>
			<Row key="row2" justify="center" gutter={20}>
				{store.state === "loading" ?
					<LoadingIcon/> :
					(store.advice.map((el) => (
						<Col key={el.id} span={20}>
							<AdviceCard advice={el} url={paths.advice}/>
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

export default observer(AdvicePage);
