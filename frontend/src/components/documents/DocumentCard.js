import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import UserBar from "../UserBar";
import {Space} from "antd";
import {Typography} from "antd";
import "../../styles/documents/DocumentCard.css";
const filesize = require('filesize');

const {Title, Text} = Typography;
const AntLink = Typography.Link;

const DocumentCard = (props) => {
	return (
		<Space direction="vertical" className="document-card">
			<Title level={3} style={{marginBottom: "0px"}}>
				<Link to={`${props.url}${props.document.id}`}>{props.document.name}</Link>
			</Title>
			<Text><Text strong>Ім'я файлу: </Text>{props.document.file_name}</Text>
			<AntLink href={props.document.file} target="_blank" download>Завантажити</AntLink>
			<Text><Text strong>Автор: </Text><UserBar size="small" avatar={props.document.author.image} name={props.document.author.full_name}/></Text>
		</Space>
	);
}

export default observer(DocumentCard);
