import {observer} from "mobx-react";
import {Avatar, Comment, Tag, Typography} from "antd";
import UserBar from "../../UserBar";
import {FallOutlined, RiseOutlined} from "@ant-design/icons";
import "../../../styles/clients/ClientCommunications.css";

const {Title, Text} = Typography;

const ClientCommunicationComment = (props) => {
	return (
		<Comment avatar={<Avatar src={props.c.author.image} alt={props.c.author.full_name}/>}
		         author={props.c.author.full_name}
		         datetime={props.c.date}
		         className="client-communications-comment"
		>
			<Tag className="client-communications-comment-tag">
				<Avatar size={24} style={{margin: "5px 0"}} src={props.c.contact.client.photo}/>
				<Text><Text type="secondary">Клієнт</Text><br/>{props.c.contact.client.name}</Text>
			</Tag>
			<Tag className="client-communications-comment-tag">
				<Avatar size={24} style={{margin: "5px 0"}} src={props.c.contact.photo}/>
				<Text><Text type="secondary">Контакт</Text><br/>{props.c.contact.name}</Text>
			</Tag>
			<Tag color="purple"><Text strong>Канал: </Text>{props.c.channel + (props.c.channel_info ? `, ${props.c.channel_info}` : '')}</Tag>
			<Tag color={props.c.type_pure === "in" ? "volcano" : "blue"}>
				{
					props.c.type_pure === "in" ? (
						<><FallOutlined/>Вхідний</>
					) : (
						<><RiseOutlined/> Вихідний</>
					)
				}
			</Tag>
			<br/>
			<Text style={{display: "block", margin: '10px 0'}}>{props.c.description}</Text>
			{ props.c.project && (<><Tag color="blue">Проєкт: {props.c.project.name}</Tag></>)}
			{ props.c.document && (<><Tag color="green">Документ: {props.c.document.name}</Tag></>)}
		</Comment>
	);
}

export default observer(ClientCommunicationComment);
