import {useHistory} from "react-router";
import {useStores} from "../../hooks/use-stores";
import {Button, Col, Form, Input, message, Row, Typography, Upload} from "antd";
import LoadingIcon from "../LoadingIcon";
import {useEffect, useMemo} from "react";
import {observer} from "mobx-react";
import {DocumentCreateEditStore} from "../../stores/documents/DocumentCreateEditStore";
import ClientAutocomplete from "../selects/ClientSelectBar";
import {runInAction} from "mobx";
import {UploadOutlined} from "@ant-design/icons";
import TaskAutocomplete from "../selects/TaskSelectBar";
import ProjectAutocomplete from "../selects/ProjectSelectBar";

const {Title, Text} = Typography;
const {TextArea} = Input;

const DocumentCreateEditPage = (props) => {
	const history = useHistory();
	const store = useMemo(() => new DocumentCreateEditStore(props.id, props.editMode), []);
	const rootStore = useStores().rootStore;

	useEffect(() =>
		runInAction(() => rootStore.setupHeading(true,
		`${props.editMode ? 'Змінити':'Створити'} документ`, "")), [rootStore, props]);

	const callback = (id) => {
		message.success(`Документ ${props.editMode ? 'змінено' : 'додано'}!`, 5);
		history.push(`/documents/${id}`);
	}

	return (
		store.state === "loading" ? (<LoadingIcon/>) : (
			<Form layout="vertical" style={{margin: "10px 0 30px"}}
			      onFinish={(obj) => {props.editMode ? store.saveDocument(obj, callback) : store.addDocument(obj, callback)}}
			      initialValues={store.document}>
				<Row justify="center">
					<Col span={23}>
						<Title level={1} style={{marginBottom: "30px"}}>{props.editMode ?'Змінити':'Додати'} документ</Title>
						<Form.Item label="Ім'я" name="name" rules={[{required: true, message: 'Введіть ім\'я'}]}>
							<Input placeholder="Ім'я документа..."/>
						</Form.Item>
						<Form.Item label="Опис" name="description" rules={[{required: true, message: 'Введіть опис'}]}>
							<TextArea rows={7} placeholder="Опис документа..."/>
						</Form.Item>
						<Form.Item label="Файл" name="file" >
							<Upload beforeUpload={store.uploadFile}>
								<Button icon={<UploadOutlined/>}>Завантажити файл</Button>
								<Text style={{display: "block",marginTop: "10px"}}>Вибрано:<br/>{store.file && store.file.name}</Text>
							</Upload>
						</Form.Item>
						<Form.Item name="client" label="Вибрати клієнта">
							<ClientAutocomplete />
						</Form.Item>
						<Form.Item name="project" label="Вибрати проєкт">
							<ProjectAutocomplete />
						</Form.Item>
						<Form.Item name="task" label="Вибрати задачу">
							<TaskAutocomplete />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" disabled={!props.editMode && !store.file}>
								{props.editMode ?'Змінити':'Додати'} документ</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		)
	);
}

export default observer(DocumentCreateEditPage);
