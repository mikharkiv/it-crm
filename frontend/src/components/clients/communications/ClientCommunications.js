import {observer} from "mobx-react";
import React from "react";
import {useRef, useMemo, useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, Modal, Select, Typography} from "antd";
import LoadingIcon from "../../LoadingIcon";
import "../../../styles/clients/ClientCommunications.css";
import ClientCommunicationComment from "./ClientCommunicationComment";
import {ClientCommunicationsStore} from "../../../stores/clients/ClientCommunicationsStore";
import locale from "antd/es/date-picker/locale/uk_UA";
import TaskAutocomplete from "../../selects/TaskSelectBar";
import DocumentAutocomplete from "../../selects/DocumentSelectBar";
import ProjectAutocomplete from "../../selects/ProjectSelectBar";
const moment = require('moment');

const {TextArea} = Input;
const {Text, Title} = Typography;

const ClientCommunications = (props) => {
	const [form] = Form.useForm();
	const store = useMemo(() => new ClientCommunicationsStore(props.id, props.type), []);
	const list = useRef(null);
	const [formVisible, setFormVisible] = useState(false);

	const onListScroll = (e) => {
		if (e.target.scrollTop < (e.target.scrollHeight - e.target.clientHeight) * 0.1)
			store.fetchNextPage();
	};

	const scrollToBottom = () => {
		list.current && (list.current.scrollTop = 100000000);
	}

	const keepScrollingPosition = () => {
		if (store.pageState !== "idle") return;
		if (list.current)
			for (let i = 0; i < store.newElementsCount; i++)
				list.current.scrollTop += list.current.children[i].clientHeight;
	}

	useEffect(scrollToBottom, [store.state]);
	useEffect(keepScrollingPosition, [store.pageState]);

	return (
		<div className="client-communications">
			<Title level={5}>Історія комунікацій</Title>
			<div ref={list} onScroll={onListScroll}
			       className="client-communications-list">
				{ store.state === 'loading' && (<LoadingIcon style={{display: 'block', margin: '20px auto'}}/>)}
				{store.communications.length > 0 || store.state === "loading" ?
					(store.communications.map((c) => (<ClientCommunicationComment c={c}/>))) :
					(<Text>Немає комунікацій</Text>)
				}
			</div>
			<div className="client-communications-add">
				{ props.type !== "contact" ? (
					<div className="client-communications-no-add">
						<Text strong>Комунікації можна додати тільки до контакту</Text>
					</div>
				) : (
				<>
				<Button type="primary" style={{width: "100%"}} onClick={() => setFormVisible(true)}>
					Додати комунікацію
				</Button>
				<Modal visible={formVisible} onCancel={() => {setFormVisible(false); form.resetFields()}}
				       onOk={() => form.validateFields().then((vals) => {
				       	setFormVisible(false);
				       	store.addCommunication(vals);
				       })}
				       okText="Додати" cancelText="Скасувати"
				       title='Додати комунікацію'>
					<Form layout="vertical" form={form}>
						<Form.Item name="date" label="Дата і час" rules={[{required: true, message: 'Оберіть дату і час'}]}>
							<DatePicker placeholder="Дата і час комунікації..." locale={locale} showTime
							            format={(t) => t.format('DD.MM.YYYY HH:mm').toString()} />
						</Form.Item>
						<Form.Item name="channel" label="Канал комунікації" rules={[{required: true, message: 'Оберіть канал комунікаціії'}]}>
							<Select>
								<Select.Option value="email">Електронна пошта</Select.Option>
								<Select.Option value="phone">Телефон</Select.Option>
								<Select.Option value="social">Соцмережа</Select.Option>
								<Select.Option value="messenger">Месенджер</Select.Option>
								<Select.Option value="mail">Пошта</Select.Option>
								<Select.Option value="fax">Факс</Select.Option>
								<Select.Option value="meet">Особиста зустріч</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name="channel_info" label="Примітки до каналу комунікації">
							<Input placeholder="Примітки..." />
						</Form.Item>
						<Form.Item name="type" label="Тип" rules={[{required: true, message: 'Оберіть тип'}]}>
							<Select>
								<Select.Option value="in">Вхідний (ініційовано клієнтом)</Select.Option>
								<Select.Option value="out">Вихідний (ініційовано менеджером)</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name="description" label="Опис комунікації" rules={[{required: true, message: 'Введіть опис комунікації'}]}>
							<TextArea placeholder="Опис комунікації..." rows={6} />
						</Form.Item>
						<Form.Item name="task" label="Оберіть пов'язану задачу">
							<TaskAutocomplete />
						</Form.Item>
						<Form.Item name="project" label="Оберіть пов'язаний проєкт">
							<ProjectAutocomplete />
						</Form.Item>
						<Form.Item name="document" label="Оберіть пов'язаний документ">
							<DocumentAutocomplete />
						</Form.Item>
					</Form>
				</Modal>
				</>
				)}
			</div>
		</div>
	);
}

export default observer(ClientCommunications);
