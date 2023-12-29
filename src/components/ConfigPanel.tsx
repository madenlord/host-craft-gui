import ConfigParam from "./ConfigParam";
import { Server, Repo } from "../config";
import styles from "../style/ConfigPanel.module.css";

interface Props {
  server: Server;
  repo: Repo;
}

export default function ConfigPanel({ server, repo }: Props) {
  return (
  <div className={styles.configPanel}>
    <fieldset>
      <legend>
        <b>Server</b>
      </legend>
      <div className={styles.configDisplay}>
        <ConfigParam label="Maximum RAM memory:" value={server.mem_max} />
        <ConfigParam label="Memory at startup:" value={server.mem_init} />
        <ConfigParam
          label="Enable server GUI:"
          value={server.gui ? "Yes" : "No"}
        />
      </div>
    </fieldset>
    <fieldset>
      <legend>
        <b>Repository</b>
      </legend>
      <div className={styles.configDisplay}>
        <ConfigParam label="User name:" value={repo.username} />
        <ConfigParam label="Repo URL:" value={repo.url} />
        <ConfigParam label="Host:" value={repo.host} />
      </div>
    </fieldset>
  </div>
  );
}
