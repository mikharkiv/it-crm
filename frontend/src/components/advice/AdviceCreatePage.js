import {observer} from "mobx-react";
import {Button, Col, Form, Input, Row, Typography, message} from "antd";
import {AdviceCreateStore} from "../../stores/advice/AdviceCreateStore";
import {useHistory} from "react-router";
import {useMemo} from "react";
import {useStores} from "../../hooks/use-stores";
import {useEffect} from "react";
import {runInAction} from "mobx";
// import {useState} from "react";

const {Title} = Typography;
const {TextArea} = Input;

const AdviceCreatePage = () => {
	const history = useHistory();
	const store = useMemo(() => new AdviceCreateStore(), []);
	const rootStore = useStores().rootStore;

	useEffect(() =>
		runInAction(() => rootStore.setupHeading(true, "Створити пораду", "")), []);

	const callback = (id) => {
		message.success('Пораду додано!', 5);
		history.push(`/advice/${id}`)
	}

	return (
		<Form layout="vertical" style={{margin: "10px 0 30px"}}
			onFinish={({name, theme, text}) => {store.performAdviceAdding(name, theme, text, callback)}}>
			<Row justify="center">
				<Col span={23}>
					<Title level={1} style={{marginBottom: "30px"}}>Додати пораду</Title>
					<Form.Item label="Назва" name="name" rules={[{required: true, message: 'Введіть назву'}]}>
						<Input placeholder="Назва поради..."/>
					</Form.Item>
					<Form.Item label="Тема" name="theme" rules={[{required: true, message: 'Введіть тему'}]}>
						<Input placeholder="Тема поради..."/>
					</Form.Item>
					<Form.Item label="Текст поради" name="text" rules={[{required: true, message: 'Введіть текст поради'}]}>
						<TextArea rows={20} placeholder="Текст поради..." />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">Додати пораду</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
}

export default observer(AdviceCreatePage);
