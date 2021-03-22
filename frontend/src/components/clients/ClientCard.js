import {observer} from "mobx-react";
import {Descriptions, Typography} from "antd";
import UserBar from "../UserBar";
import "../../styles/clients/ClientCard.css";
import {GlobalOutlined, HomeOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";

const {Text, Title, Link} = Typography;

const ClientCard = (props) => {
	return (
		<div className="client-card">
			<UserBar name={props.client.name} text='Клієнт' avatar={props.client.photo}
			         link={props.link} />
			{
				props.client.is_vip ? <Title level={4} strong type="success">VIP</Title> : null
			}
			<Descriptions style={{marginTop: "20px"}} size="small" layout="horizontal" column={1}>
				{ props.client.hasOwnProperty('phone') && props.client.phone &&
				(<Descriptions.Item label={<PhoneOutlined/>}>
					<Link href={`tel: ${props.client.phone}`}>{props.client.phone}</Link>
				</Descriptions.Item>) }
				{ props.client.hasOwnProperty('email') && props.client.email &&
				(<Descriptions.Item label={<MailOutlined/>}>
					<Link href={`mailto: ${props.client.email}`}>{props.client.email}</Link>
				</Descriptions.Item>) }
				{ props.client.hasOwnProperty('address') && props.client.address &&
				(<Descriptions.Item label={<HomeOutlined/>}>
					{props.client.address}
				</Descriptions.Item>) }
				{ props.client.hasOwnProperty('website') && props.client.website &&
				(<Descriptions.Item label={<GlobalOutlined/>}>
					<Link href={props.client.website} target="_blank">{props.client.website}</Link>
				</Descriptions.Item>) }
			</Descriptions>
		</div>
	);
}

export default observer(ClientCard);
