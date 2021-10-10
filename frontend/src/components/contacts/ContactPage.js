import {Button, Col, Descriptions, message, Row, Typography} from "antd";
import {useHistory, useParams} from "react-router";
import {useStores} from "../../hooks/use-stores";
import {useEffect, useMemo} from "react";
import {ContactStore} from "../../stores/contacts/ContactStore";
import UserBar from "../UserBar";
import LoadingIcon from "../LoadingIcon";
import {observer} from "mobx-react";
import {runInAction} from "mobx";
import ClientCommunications from "../clients/communications/ClientCommunications";

const {Link, Title} = Typography;

const ContactPage = () => {
	const {id} = useParams();
	const contactStore = useMemo(() => new ContactStore(id), [id]);
	const rootStore = useStores().rootStore;
	const history = useHistory();

	useEffect(() => {contactStore.fetch()}, [contactStore]);

	runInAction(() => rootStore.setupHeading(true, contactStore.contact.name || "...", "Контакт"));

	const edit = () => {
		history.push(`/contacts/${id}/edit`);
	};

	const removeCallback = () => {
		message.success("Контакт успішно видалено!", 5);
		history.push('/contacts/');
	}

	return (
		contactStore.state === "loading" ? (<LoadingIcon/>) : (
		<>
		<Row justify="space-around" style={{marginTop: "20px"}}>
			<Col span={23} style={{marginBottom: "30px"}}>
				<UserBar name={contactStore.contact.name} text={contactStore.contact.position}
				         avatar={contactStore.contact.photo} />
			</Col>
			<Col span={11} style={{marginBottom: "30px"}}>
				<Title level={3}>Контакти</Title>
				<Descriptions style={{marginTop: "20px"}} size="small" layout="horizontal" column={1}>
					{ contactStore.contact.hasOwnProperty('address') && contactStore.contact.address &&
					(<Descriptions.Item label="Адреса">
						{contactStore.contact.address}
					</Descriptions.Item>) }
					{ contactStore.contact.hasOwnProperty('postal_address') && contactStore.contact.postal_address &&
					(<Descriptions.Item label="Поштова адреса">
						{contactStore.contact.postal_address}
					</Descriptions.Item>) }
					{ contactStore.contact.hasOwnProperty('phone') && contactStore.contact.phone &&
					(<Descriptions.Item label="Телефон">
						<Link href={`${contactStore.contact.phone}`}>{contactStore.contact.phone}</Link>
					</Descriptions.Item>) }
					{ contactStore.contact.hasOwnProperty('fax') && contactStore.contact.fax &&
					(<Descriptions.Item label="Факс">
						{contactStore.contact.fax}
					</Descriptions.Item>) }
					{ contactStore.contact.hasOwnProperty('email') && contactStore.contact.email &&
					(<Descriptions.Item label="Email">
						<Link href={`mailto: ${contactStore.contact.email}`}>{contactStore.contact.email}</Link>
					</Descriptions.Item>) }
					{ contactStore.contact.hasOwnProperty('website') && contactStore.contact.email &&
					(<Descriptions.Item label="Сайт">
						<Link href={`${contactStore.contact.website}`}>{contactStore.contact.website}</Link>
					</Descriptions.Item>) }
				</Descriptions>
				<Title level={3} style={{marginTop: "30px"}}>Соцмережі</Title>
				<Descriptions style={{marginTop: "20px"}} size="small" layout="horizontal" column={1}>
					{ contactStore.contact.hasOwnProperty('socials') && contactStore.contact.socials &&
					typeof contactStore.contact.socials === "object" ?
						(contactStore.contact.socials.hasOwnProperty('viber') &&
							(<Descriptions.Item label="Viber">
								<Link href={`${contactStore.contact.socials.viber}`}>{contactStore.contact.socials.viber}</Link>
							</Descriptions.Item>)) || (
						contactStore.contact.socials.hasOwnProperty('telegram') &&
						(<Descriptions.Item label="Telegram">
							<Link href={`${contactStore.contact.socials.telegram}`}>{contactStore.contact.socials.telegram}</Link>
						</Descriptions.Item>)) || (
						contactStore.contact.socials.hasOwnProperty('whatsapp') &&
						(<Descriptions.Item label="Whatsapp">
							<Link href={`${contactStore.contact.socials.whatsapp}`}>{contactStore.contact.socials.whatsapp}</Link>
						</Descriptions.Item>)) || (
						contactStore.contact.socials.hasOwnProperty('instagram') &&
						(<Descriptions.Item label="Instagram">
							<Link href={`${contactStore.contact.socials.instagram}`}>{contactStore.contact.socials.instagram}</Link>
						</Descriptions.Item>)) || (
						contactStore.contact.socials.hasOwnProperty('facebook') &&
						(<Descriptions.Item label="Facebook">
							<Link href={`${contactStore.contact.socials.facebook}`}>{contactStore.contact.socials.facebook}</Link>
						</Descriptions.Item>)) || (
						contactStore.contact.socials.hasOwnProperty('twitter') &&
						(<Descriptions.Item label="Twitter">
							<Link href={`${contactStore.contact.socials.twitter}`}>{contactStore.contact.socials.twitter}</Link>
						</Descriptions.Item>)) || (
						contactStore.contact.socials.hasOwnProperty('linkedin') &&
						(<Descriptions.Item label="LinkedIn">
							<Link href={`${contactStore.contact.socials.linkedin}`}>{contactStore.contact.socials.linkedin}</Link>
						</Descriptions.Item>)) : null}
					<Descriptions.Item label="Створено">
						{contactStore.contact.created_at}
					</Descriptions.Item>
				</Descriptions>
			</Col>
			<Col span={11}>
				<ClientCommunications type="contact" id={id} />
			</Col>
			<Col span={23} style={{marginBottom: "30px"}}>
				<Button type="primary" disabled={contactStore.state === "loading"} loading={contactStore.state === "loading"}
				        onClick={() => edit()} style={{marginRight: "15px"}}>
					Редагувати
				</Button>
				<Button type="primary" danger disabled={contactStore.state === "loading"}
				        loading={contactStore.state === "loading"}
				        onClick={() => contactStore.remove(removeCallback)}>
					Видалити
				</Button>
			</Col>
		</Row>
		</>
		)
	);
}

export default observer(ContactPage);
