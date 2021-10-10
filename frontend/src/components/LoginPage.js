import {Form, Input, Checkbox, Button, Row, Col, Typography} from "antd";
import {observer} from "mobx-react";
import {useStores} from "../hooks/use-stores";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {useHistory} from "react-router";

const { Title, Text } = Typography;

const LoginPage = () => {
	const history = useHistory();
	const location = useLocation();
	const store = useStores().rootStore;

	let {from} = location.state || {from: {pathname: '/'}};

	let auth = () => { history.replace(from) };

	return (
		<Row style={{height: "100vh"}} align="middle" justify="center">
			<Col span={8}>
				<Form onFinish={(data) => store.doLogin(data.email, data.password, data.rememberme, auth.bind(this))}>
					<Title style={{width: "100%", textAlign: "center", marginBottom: "40px"}}>
						Вхід до IT-CRM
					</Title>
					<Form.Item
						name="email"
						rules={[{required: true, message: 'Введіть адресу ел. пошти'}]}
					>
						<Input placeholder="Електронна пошта"/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{required: true, message: 'Введіть пароль'}]}
					>
						<Input.Password placeholder="Пароль"/>
					</Form.Item>
					<Form.Item
						name="rememberme">
						<Checkbox>Запам'ятати мене</Checkbox>
					</Form.Item>
					<Form.Item
					>
						<Button type="primary" htmlType="submit">Увійти</Button>
					</Form.Item>
					<Form.Item
					>
						{store.errorLoggingIn &&
								(<Text type="danger" style={{display: "block", textAlign: "center"}}>
									Неправильна пошта або пароль</Text>)}
						{store.hasLoggedOut &&
								(<Text strong style={{display: "block", textAlign: "center"}}>
									Ви вийшли з облікового запису</Text>)}
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
}

export default observer(LoginPage);
