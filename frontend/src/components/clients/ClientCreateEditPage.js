import {useHistory} from "react-router";
import {useStores} from "../../hooks/use-stores";
import {Button, Col, Form, Input, message, Row, Select, Typography, Upload} from "antd";
import LoadingIcon from "../LoadingIcon";
import {useEffect, useMemo} from "react";
import {observer} from "mobx-react";
import {ClientCreateEditStore} from "../../stores/clients/ClientCreateEditStore";
import ClientAutocomplete from "../selects/ClientSelectBar";
import {runInAction} from "mobx";
import {UploadOutlined} from "@ant-design/icons";
import UserAutocomplete from "../selects/UserSelectBar";

const {Title, Text} = Typography;

const ClientCreateEditPage = (props) => {
	const history = useHistory();
	const store = useMemo(() => new ClientCreateEditStore(props.id, props.editMode), []);
	const rootStore = useStores().rootStore;

	useEffect(() =>
		runInAction(() => rootStore.setupHeading(true,
		`${props.editMode ? 'Змінити':'Створити'} клієнта`, "")), [rootStore, props]);

	const callback = (id) => {
		message.success(`Клієнта ${props.editMode ? 'змінено' : 'додано'}!`, 5);
		history.push(`/clients/${id}`);
	}

	return (
		store.state === "loading" ? (<LoadingIcon/>) : (
			<Form layout="vertical" style={{margin: "10px 0 30px"}}
			      onFinish={(obj) => {props.editMode ? store.saveClient(obj, callback) : store.addClient(obj, callback)}}
			      initialValues={store.client}>
				{console.log(store.client)}
				<Row justify="center">
					<Col span={23}>
						<Title level={1} style={{marginBottom: "30px"}}>{props.editMode ?'Змінити':'Додати'} клієнта</Title>
						<Form.Item label="Ім'я" name="name" rules={[{required: true, message: 'Введіть ім\'я'}]}>
							<Input placeholder="Ім'я клієнта..."/>
						</Form.Item>
						<Form.Item label="Джерело" name="source" rules={[{required: true, message: 'Введіть джерело'}]}>
							<Input placeholder="Джерело контакта..."/>
						</Form.Item>
						<Form.Item label="Тип" name="type" rules={[{required: true, message: 'Виберіть тип'}]}>
							<Select>
								<Select.Option key={1} value="pers">Фізична особа</Select.Option>
								<Select.Option key={2} value="comp">Юридична особа</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label="Статус" name="status">
							<Select>
								{store.clientStatuses.map((s) => <Select.Option key={s.name} value={s.name}>{s.name}</Select.Option>)}
							</Select>
						</Form.Item>
						<Form.Item name="manager" label="Вибрати менеджера" >
							<UserAutocomplete value={store.client.manager} onlyManager={true} onSelect={store.onManagerSelect} />
						</Form.Item>
						<Form.Item label="Фото" name="photo">
							<Upload accept="image/jpg, image/jpeg, image/png"
									beforeUpload={store.uploadPhoto}>
								<Button icon={<UploadOutlined/>}>Завантажити фото</Button>
								<Text style={{display: "block",marginTop: "10px"}}>Вибрано:<br/>{store.photo && store.photo.name}</Text>
							</Upload>
						</Form.Item>
						<Title level={3}>Контакти</Title>
						<Form.Item label="Адреса" name="address">
							<Input placeholder="Адреса контакта..."/>
						</Form.Item>
						<Form.Item label="Поштова адреса" name="postal_address">
							<Input placeholder="Поштова адреса контакта..."/>
						</Form.Item>
						<Form.Item label="Телефон" name="phone">
							<Input placeholder="Телефон контакта..."/>
						</Form.Item>
						<Form.Item label="Факс" name="fax">
							<Input placeholder="Факс контакта..."/>
						</Form.Item>
						<Form.Item label="Email" name="email">
							<Input placeholder="Email контакта..."/>
						</Form.Item>
						<Title level={3}>Соцмережі</Title>
						<Form.Item label="Viber" name="socials_viber">
							<Input placeholder="Viber..."/>
						</Form.Item>
						<Form.Item label="Telegram" name="socials_telegram">
							<Input placeholder="Telegram..."/>
						</Form.Item>
						<Form.Item label="Whatsapp" name="socials_whatsapp">
							<Input placeholder="Whatsapp..."/>
						</Form.Item>
						<Form.Item label="Instagram" name="socials_instagram">
							<Input placeholder="Instagram..."/>
						</Form.Item>
						<Form.Item label="Facebook" name="socials_facebook">
							<Input placeholder="Facebook..."/>
						</Form.Item>
						<Form.Item label="Twitter" name="socials_twitter">
							<Input placeholder="Twitter..."/>
						</Form.Item>
						<Form.Item label="Linkedin" name="socials_linkedin">
							<Input placeholder="Linkedin..."/>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" disabled={!props.editMode && !store.selectedManager}>
								{props.editMode ?'Змінити':'Додати'} клієнта</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		)
	);
}

export default observer(ClientCreateEditPage);
