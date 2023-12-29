import { useLoaderData } from 'react-router-dom';

import LinkButton from '../components/LinkButton';
import ConfigPanel from '../components/ConfigPanel';
import Title from '../components/Title';
import { 
    Server,
    Repo,
    getServer,
    getRepo
} from '../config';

import styles from '../style/shared.module.css';

interface LoaderData {
  server: Server;
  repo: Repo;
}

export async function loader() {
    const server = await getServer();
    const repo = await getRepo();
    return { server, repo };
}

export default function Index() {
    const { server, repo } = useLoaderData() as LoaderData;

    return (
    <>
      <Title />
      <ConfigPanel server={server} repo={repo} /> 
      <div className={`${styles.buttonColumn} ${styles.footer}`}>
        <LinkButton to='settings' text='Settings' />
        <LinkButton to='run' text='Run' />
      </div>
    </>
  );
}