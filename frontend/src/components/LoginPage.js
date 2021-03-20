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
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	let {from} = location.state || {from: {pathname: '/'}};

	let auth = () => { history.replace(from) };

	return (
		<Row style={{height: "100vh"}} align="middle" justify="center">
			<Col span={8}>
				<Form >
					<Title style={{width: "100%", textAlign: "center", marginBottom: "40px"}}>
						Вхід до IT-CRM
					</Title>
					<Form.Item
						name="email"
						rules={[{required: true, message: 'Введіть адресу ел. пошти'}]}
					>
						<Input placeholder="Електронна пошта" onChange={(e) => {setLogin(e.target.value)}}/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{required: true, message: 'Введіть пароль'}]}
					>
						<Input.Password placeholder="Пароль" onChange={(e) => {setPassword(e.target.value)}}/>
					</Form.Item>
					<Form.Item
					>
						<Checkbox>Запам'ятати мене</Checkbox>
					</Form.Item>
					<Form.Item
					>
						<Button type="primary" onClick={() => store.doLogin(login, password, auth.bind(this))}>Увійти</Button>
					</Form.Item>
					<Form.Item
					>
						<Text type="danger" style={{display: "block", textAlign: "center"}}>
							{store.errorLoggingIn === true ? "Неправильна пошта або пароль" : ""}</Text>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
}

export default observer(LoginPage);
