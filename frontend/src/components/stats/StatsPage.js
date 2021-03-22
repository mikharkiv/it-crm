import {observer} from "mobx-react";
import {useStores} from "../../hooks/use-stores";
import {runInAction} from "mobx";
import {useMemo, useEffect} from "react";
import {StatsStore} from "../../stores/stats/StatsStore";
import {Col, Row, Statistic, Typography} from "antd";
import LoadingIcon from "../LoadingIcon";

const {Title} = Typography;

const StatsPage = () => {
	const statsStore = useMemo(() => new StatsStore(), []);
	const rootStore = useStores().rootStore;

	useEffect(() => {statsStore.fetchStats()}, [statsStore]);

	runInAction(() => rootStore.setupHeading(false, "Статистика"));

	return (
		statsStore.state === 'loading' ? (<LoadingIcon/>) : (
		<>
			<Title style={{display: 'block', marginBottom: '50px'}}>Ваша статистика, {rootStore.me && rootStore.me.full_name}</Title>
			<Row justify="center" style={{marginBottom: '30px'}}>
				<Col span={6}>
					<Statistic title="Ваших клієнтів" value={statsStore.stats.clients_count}/>
				</Col>
				<Col span={6}>
					<Statistic title="Порад, створених вами" value={statsStore.stats.advice_count}/>
				</Col>
				<Col span={6}>
					<Statistic title="Задач з вами" value={statsStore.stats.tasks_count}/>
				</Col>
			</Row>
			<Row justify="center">
				<Col span={6}>
					<Statistic title="Задач, створених вами" value={statsStore.stats.tasks_created_count}/>
				</Col>
				<Col span={6}>
					<Statistic title="Команд з вами" value={statsStore.stats.teams_count}/>
				</Col>
				<Col span={6}>
					<Statistic title="Документів, створених вами" value={statsStore.stats.documents_count}/>
				</Col>
			</Row>
		</>
	));
}

export default observer(StatsPage);
