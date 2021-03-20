import {Space, Typography} from "antd";
import UserBar from "../UserBar";
import {Link} from "react-router-dom";
import "../../styles/advice/AdviceCard.css"
import {observer} from "mobx-react";

const {Title, Text} = Typography;

const AdviceCard = (props) => {
	return (
		<Space direction="vertical" className="advice-card">
			<Title level={3} style={{marginBottom: "0px"}}>
				<Link to={`${props.url}${props.advice.id}`}>{props.advice.name}</Link>
			</Title>
			<Title level={5} type="secondary">{props.advice.theme}</Title>
			<Text>{props.advice.text}</Text>
			<UserBar size="small" name={props.advice.author.full_name}
			         avatar={props.advice.author.image} text={props.advice.created_at} />
		</Space>
	);
}

export default observer(AdviceCard);
