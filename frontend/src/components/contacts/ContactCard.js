import {observer} from "mobx-react";
import {Descriptions, Typography} from "antd";
import UserBar from "../UserBar";
import "../../styles/contacts/ContactCard.css";
import {GlobalOutlined, HomeOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";

const {Text, Link} = Typography;

const ContactCard = (props) => {
	return (
		<div className="contact-card">
			<UserBar name={props.contact.name} text={props.contact.position} avatar={props.contact.photo}
			         link={props.link} />
			<Descriptions style={{marginTop: "20px"}} size="small" layout="horizontal" column={1}>
				{ props.contact.hasOwnProperty('phone') &&
				(<Descriptions.Item label={<PhoneOutlined/>}>
					<Link href={`tel: ${props.contact.phone}`}>{props.contact.phone}</Link>
				</Descriptions.Item>) }
				{ props.contact.hasOwnProperty('email') &&
				(<Descriptions.Item label={<MailOutlined/>}>
					<Link href={`mailto: ${props.contact.email}`}>{props.contact.email}</Link>
				</Descriptions.Item>) }
				{ props.contact.hasOwnProperty('address') &&
				(<Descriptions.Item label={<HomeOutlined/>}>
					{props.contact.address}
				</Descriptions.Item>) }
				{ props.contact.hasOwnProperty('website') &&
				(<Descriptions.Item label={<GlobalOutlined/>}>
					<Link href={props.contact.website} target="_blank">{props.contact.website}</Link>
				</Descriptions.Item>) }
			</Descriptions>
			<Text className="contact-card-client">Клієнт:</Text>
			<UserBar size="small" name={props.contact.client.name} avatar={props.contact.client.photo}/>
		</div>
	);
}

export default observer(ContactCard);
