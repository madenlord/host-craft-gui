import { useState } from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";

import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";
import { Server, getServer, updateServer } from "../config";

import common from "../style/shared.module.css";

interface LoaderData {
  server: Server;
}

interface ActionData {
  request: Request;
}

export async function loader() {
  const server = await getServer();
  return { server };
}

export async function action({ request }: ActionData) {
  const formData: FormData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateServer(updates);

  return redirect("..");
}

export default function ConfigureServer() {
  const [valid, setValid] = useState(true);
  const { server } = useLoaderData() as LoaderData;

  function handleValidityChange() {
    setValid(!valid);
  }

  return (
    <>
      <header className={common.emptyHeader}></header>
      <div className={common.wide}>
        <Form method="post">
            <FormField
              label="Maximum RAM memory:"
              type="text"
              inputName="mem_max"
              defaultValue={server.mem_max}
              validate={true}
              onValidityChange={handleValidityChange}
            />
            <FormField
              label="Memory at startup:"
              type="text"
              inputName="mem_init"
              defaultValue={server.mem_init}
              validate={true}
              onValidityChange={handleValidityChange}
            />
            <FormField
              label="Enable GUI:"
              type="checkbox"
              inputName="gui"
              defaultValue={server.gui}
            />
          <div className={`${common.buttonColumn} ${common.footer}`}>
            <SubmitButton text="Save" disabled={!valid} />
          </div>
        </Form>
      </div>
    </>
  );
}
