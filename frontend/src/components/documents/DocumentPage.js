import {Button, Col, message, Row, Space, Tabs, Typography} from "antd";
import {observer} from "mobx-react";
import {useHistory, useParams} from "react-router";
import {useStores} from "../../hooks/use-stores";
import {runInAction} from "mobx";
import {useEffect, useMemo} from "react";
import {DocumentStore} from "../../stores/documents/DocumentStore";
import LoadingIcon from "../LoadingIcon";
import UserBar from "../UserBar";
import ClientCommunications from "../clients/communications/ClientCommunications";
const filesize = require('filesize');

const {Text, Title, Link} = Typography;

const DocumentPage = () => {
	const {id} = useParams();
	const documentStore = useMemo(() => new DocumentStore(id), [id]);
	const rootStore = useStores().rootStore;
	const history = useHistory();

	useEffect(() => {documentStore.fetch()}, [documentStore]);

	runInAction(() => rootStore.setupHeading(true, documentStore.document.name || "...", "Документ"));

	const edit = () => {
		history.push(`/documents/${id}/edit`);
	};

	const removeCallback = () => {
		message.success("Документ успішно видалено!", 5);
		history.push('/documents/');
	}

	return (
		documentStore.state === "loading" || Object.keys(documentStore.document).length === 0 ? (<LoadingIcon/>) : (
			<>
				<Row justify="center" style={{marginTop: "20px"}}>
					<Col span={16} style={{marginBottom: "30px"}}>
						<Space direction="vertical">
							<Title level={3}>{documentStore.document.name}</Title>
							<Text className="document-card-description">{documentStore.document.description}</Text>
							<Link href={documentStore.document.file} target="_blank" download>Завантажити</Link>
							<Text><Text strong>Ім'я файлу: </Text>{documentStore.document.file_name}</Text>
							<Text><Text strong>Розмір: </Text>{filesize(documentStore.document.file_size)}</Text>
							<Text><Text strong>Автор: </Text><UserBar size="small" avatar={documentStore.document.author.image} name={documentStore.document.author.full_name}/></Text>
							<Text><Text strong>Створено: </Text>{documentStore.document.created_at}</Text>
							{documentStore.document.hasOwnProperty('client') && documentStore.document.client ? (
								<Text><Text strong>Клієнт: </Text>
									<UserBar size="small" avatar={documentStore.document.client.photo} name={documentStore.document.client.name}/></Text>
							) : null}
							{documentStore.document.hasOwnProperty('task') && documentStore.document.task ? (
								<Text><Text strong>Задача: </Text>{documentStore.document.task.name}</Text>
							) : null}
							{documentStore.document.hasOwnProperty('project') && documentStore.document.project ? (
								<Text><Text strong>Проєкт: </Text>{documentStore.document.project.name}</Text>
							) : null}
						</Space>
					</Col>
					<Col span={16} style={{margin: "20px 0"}}>
						<Title level={4}>Обговорення</Title>
						<ClientCommunications type="document" id={id}/>
					</Col>
					<Col span={16} style={{marginBottom: "30px"}}>
						<Button type="primary" disabled={documentStore.state === "loading"} loading={documentStore.state === "loading"}
						        onClick={() => edit()} style={{marginRight: "15px"}}>
							Редагувати
						</Button>
						<Button type="primary" danger disabled={documentStore.state === "loading"}
						        loading={documentStore.state === "loading"}
						        onClick={() => documentStore.remove(removeCallback)}>
							Видалити
						</Button>
					</Col>
				</Row>
			</>
		)
	);
}

export default observer(DocumentPage);
