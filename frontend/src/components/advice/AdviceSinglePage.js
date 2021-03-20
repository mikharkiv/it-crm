import {observer} from "mobx-react";
import {Col, Comment, Row, Typography} from "antd";
import LoadingIcon from "../LoadingIcon";
import {useEffect} from "react";
import {AdviceSingleStore} from "../../stores/advice/AdviceSingleStore";
import {useMemo} from "react";
import {useParams} from "react-router";
import AdviceCommentEditor from "./AdviceCommentEditor";
import {useStores} from "../../hooks/use-stores";
import UserBar from "../UserBar";
import {runInAction} from "mobx";

const {Title} = Typography;

const AdviceSinglePage = () => {
	const {id} = useParams();
	const adviceStore = useMemo(() => new AdviceSingleStore(id), [id]);
	const rootStore = useStores().rootStore;

	useEffect(() => {adviceStore.fetch()}, [adviceStore]);

	runInAction(() => rootStore.setupHeading(true, adviceStore.advice.name || "...", "Порада"));

	if (adviceStore.state === "loading")
		return (<LoadingIcon/>);
	else
		return (
		<>
			<Row justify="center" style={{marginTop: "20px"}}>
				<Col span={16}>
					<Title level={1}>{adviceStore.advice.name}</Title>
					<UserBar size="small"
					         avatar={adviceStore.advice.author.image}
					         name={adviceStore.advice.author.full_name}
					         text={adviceStore.advice.created_at}
					         style={{marginBottom: "50px"}} />
				</Col>
				<Col span={16}>
					<p style={{marginBottom: "50px"}}><br/>{adviceStore.advice.text}</p>
				</Col>
			</Row>
			<Row justify="center">
				<Col span={16} style={{marginTop: "60px"}}>
					<Title level={3} style={{display: "block", textAlign: "left"}}>Коментарі</Title>
				</Col>
				{adviceStore.comments ?
					adviceStore.comments.map((e) => (
					<Col key={e.id} span={14} style={{marginBottom: "25px"}}>
						<Comment actions={[]} author={e.author.full_name} avatar={e.author.image}
						content={e.text} datetime={e.created_at} />
					</Col>)) :
					(<Title level={5} style={{textAlign: "center", margin: "20px 0"}}>Немає коментарів</Title>)
				}
			</Row>
			<AdviceCommentEditor adviceStore={adviceStore} />
		</>
		);
}

export default observer(AdviceSinglePage);
