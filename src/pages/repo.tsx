import { Form, useLoaderData, redirect } from "react-router-dom";

import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";
import { Repo, getRepo, updateRepo } from "../config";

import common from "../style/shared.module.css";

interface LoaderData {
  repo: Repo;
}

interface ActionData {
  request: Request;
}

export async function loader() {
  const repo = await getRepo();
  return { repo };
}

export async function action({ request }: ActionData) {
  const formData: FormData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateRepo(updates);

  return redirect("..");
}

export default function ConfigureRepo() {
  const { repo } = useLoaderData() as LoaderData;

  return (
    <>
      <header className={common.emptyHeader}></header>
      <div className={common.wide}>
        <Form method="post">
            <FormField
              label="User name:"
              type="text"
              inputName="username"
              defaultValue={repo.username}
            />
            <FormField
              label="Repository URL:"
              type="text"
              inputName="url"
              defaultValue={repo.url}
            />
          <div className={`${common.buttonColumn} ${common.footer}`}>
            <SubmitButton text="Save" />
          </div>
        </Form>
      </div>
    </>
  );
}
