import {Button, Col, Descriptions, message, Row, Tabs, Typography} from "antd";
import {useHistory, useParams} from "react-router";
import {useStores} from "../../hooks/use-stores";
import {useEffect, useMemo} from "react";
import {ClientStore} from "../../stores/clients/ClientStore";
import UserBar from "../UserBar";
import LoadingIcon from "../LoadingIcon";
import {observer} from "mobx-react";
import {runInAction} from "mobx";
import ContactsPage from "../contacts/ContactsPage";
import ProjectsPage from "../projects/ProjectsPage";
import TasksPage from "../tasks/TasksPage";
import DocumentsPage from "../documents/DocumentsPage";
import ClientCommunications from "./communications/ClientCommunications";

const {Link, Title} = Typography;
const {TabPane} = Tabs;

const ClientPage = () => {
	const {id} = useParams();
	const clientStore = useMemo(() => new ClientStore(id), [id]);
	const rootStore = useStores().rootStore;
	const history = useHistory();

	useEffect(() => {clientStore.fetch()}, [clientStore]);

	runInAction(() => rootStore.setupHeading(true, clientStore.client.name || "...", "Клієнт"));

	const edit = () => {
		history.push(`/clients/${id}/edit`);
	};

	const removeCallback = () => {
		message.success("Контакт успішно видалено!", 5);
		history.push('/clients/');
	}

	return (
		clientStore.state === "loading" ? (<LoadingIcon/>) : (
		<>
		<Row justify="center" style={{marginTop: "20px"}}>
			<Col span={16} style={{marginBottom: "30px"}}>
				<UserBar name={clientStore.client.name} text={clientStore.client.position}
				         avatar={clientStore.client.photo} />
				{clientStore.client.is_vip ? <Title level={5} strong type="success">VIP</Title>
					: <Title level={5} strong type="secondary">Не VIP</Title>}
			</Col>
			<Col span={22}>
				<Tabs defaultActiveKey="1" centered>
					<TabPane tab="Профіль" key="1">
						<Row justify="space-between">
							<Col span={11} style={{marginBottom: "30px"}}>
								<Title level={3}>Загальна інформація</Title>
								<Descriptions style={{marginTop: "20px"}} size="small" layout="horizontal" column={1} labelStyle={{fontWeight: 'bold'}}>
									<Descriptions.Item label="Тип">
										{clientStore.client.type === 'pers' ? "Фізична особа" : "Юридична особа"}
									</Descriptions.Item>
									<Descriptions.Item label="Джерело">
										{clientStore.client.source}
									</Descriptions.Item>
									<Descriptions.Item label="Статус">
										{clientStore.client.status || "не визначено"}
									</Descriptions.Item>
									<Descriptions.Item label="VIP">
										{clientStore.client.is_vip ? "так" : 'ні'}
									</Descriptions.Item>
									<Descriptions.Item label="Бажає отримувати рекламну інформацію">
										{clientStore.client.want_ads ? "так" : 'ні'}
									</Descriptions.Item>
									<Descriptions.Item label="Менеджер">
										<UserBar size="small" name={clientStore.client.manager.full_name} avatar={clientStore.client.manager.image} />
									</Descriptions.Item>
									<Descriptions.Item label="Створено">
										{clientStore.client.created_at}
									</Descriptions.Item>
									<Descriptions.Item label="Оновлено">
										{clientStore.client.updated_at}
									</Descriptions.Item>
								</Descriptions>
								<Title level={3} style={{display: 'block', marginTop: '20px'}}>Контакти</Title>
								<Descriptions style={{margin: "20px"}} size="small" layout="horizontal" column={1} labelStyle={{fontWeight: 'bold'}}>
									{ clientStore.client.hasOwnProperty('address') && clientStore.client.address &&
									(<Descriptions.Item label="Адреса">
										{clientStore.client.address}
									</Descriptions.Item>) }
									{ clientStore.client.hasOwnProperty('postal_address') && clientStore.client.postal_address &&
									(<Descriptions.Item label="Поштова адреса">
										{clientStore.client.postal_address}
									</Descriptions.Item>) }
									{ clientStore.client.hasOwnProperty('phone') && clientStore.client.phone &&
									(<Descriptions.Item label="Телефон">
										<Link href={`${clientStore.client.phone}`}>{clientStore.client.phone}</Link>
									</Descriptions.Item>) }
									{ clientStore.client.hasOwnProperty('fax') && clientStore.client.fax &&
									(<Descriptions.Item label="Факс">
										{clientStore.client.fax}
									</Descriptions.Item>) }
									{ clientStore.client.hasOwnProperty('email') && clientStore.client.email &&
									(<Descriptions.Item label="Email">
										<Link href={`mailto: ${clientStore.client.email}`}>{clientStore.client.email}</Link>
									</Descriptions.Item>) }
									{ clientStore.client.hasOwnProperty('website') && clientStore.client.email &&
									(<Descriptions.Item label="Сайт">
										<Link href={`${clientStore.client.website}`}>{clientStore.client.website}</Link>
									</Descriptions.Item>) }
								</Descriptions>
								<Title level={3}>Соцмережі</Title>
								<Descriptions style={{marginTop: "20px"}} size="small" layout="horizontal" column={1} labelStyle={{fontWeight: 'bold'}}>
									{ clientStore.client.hasOwnProperty('socials') && clientStore.client.socials &&
									typeof clientStore.client.socials === "object" ?
										(clientStore.client.socials.hasOwnProperty('viber') &&
											(<Descriptions.Item label="Viber">
												<Link href={`${clientStore.client.socials.viber}`}>{clientStore.client.socials.viber}</Link>
											</Descriptions.Item>)) || (
										clientStore.client.socials.hasOwnProperty('telegram') &&
										(<Descriptions.Item label="Telegram">
											<Link href={`${clientStore.client.socials.telegram}`}>{clientStore.client.socials.telegram}</Link>
										</Descriptions.Item>)) || (
										clientStore.client.socials.hasOwnProperty('whatsapp') &&
										(<Descriptions.Item label="Whatsapp">
											<Link href={`${clientStore.client.socials.whatsapp}`}>{clientStore.client.socials.whatsapp}</Link>
										</Descriptions.Item>)) || (
										clientStore.client.socials.hasOwnProperty('instagram') &&
										(<Descriptions.Item label="Instagram">
											<Link href={`${clientStore.client.socials.instagram}`}>{clientStore.client.socials.instagram}</Link>
										</Descriptions.Item>)) || (
										clientStore.client.socials.hasOwnProperty('facebook') &&
										(<Descriptions.Item label="Facebook">
											<Link href={`${clientStore.client.socials.facebook}`}>{clientStore.client.socials.facebook}</Link>
										</Descriptions.Item>)) || (
										clientStore.client.socials.hasOwnProperty('twitter') &&
										(<Descriptions.Item label="Twitter">
											<Link href={`${clientStore.client.socials.twitter}`}>{clientStore.client.socials.twitter}</Link>
										</Descriptions.Item>)) || (
										clientStore.client.socials.hasOwnProperty('linkedin') &&
										(<Descriptions.Item label="LinkedIn">
											<Link href={`${clientStore.client.socials.linkedin}`}>{clientStore.client.socials.linkedin}</Link>
										</Descriptions.Item>)) : null}
								</Descriptions>
							</Col>
							<Col span={11} style={{margi: "30px 0"}}>
								<ClientCommunications type="client" id={id}/>
							</Col>
							<Col span={23} style={{marginBottom: "30px"}}>
								<Button type="primary" disabled={clientStore.state === "loading"} loading={clientStore.state === "loading"}
								        onClick={() => edit()} style={{marginRight: "15px"}}>
									Редагувати
								</Button>
								<Button type="primary" danger disabled={clientStore.state === "loading"}
								        loading={clientStore.state === "loading"}
								        onClick={() => clientStore.remove(removeCallback)}>
									Видалити
								</Button>
							</Col>
						</Row>
					</TabPane>
					<TabPane tab="Контакти" key="2">
						<ContactsPage filters={{"client": clientStore.client.id}} />
					</TabPane>
					<TabPane tab="Проєкти" key="3">
						<ProjectsPage filters={{"client": clientStore.client.id}} />
					</TabPane>
					<TabPane tab="Завдання" key="4">
						<TasksPage filters={{"project__client": clientStore.client.id}} />
					</TabPane>
					<TabPane tab="Документи" key="5">
						<DocumentsPage filters={{"client": clientStore.client.id}} />
					</TabPane>
				</Tabs>
			</Col>
		</Row>
		</>
		)
	);
}

export default observer(ClientPage);
