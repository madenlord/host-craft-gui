import localforage from 'localforage';

export type Server = {
    mem_max: string;
    mem_init: string;
    gui: boolean;
};

export type Repo = {
    username: string;
    url: string;
    host: string;
}

const serverDefault: Server = {
    'mem_max':'2G',
    'mem_init':'512M',
    'gui':true
};

export async function getServer() {
    await fakeNetwork('server')
    let server = await localforage.getItem('server');
    if(!server) server = serverDefault;

    return server;
}

export async function updateServer(updates: any) {
    await fakeNetwork();
    let server: any = await localforage.getItem('server');
    if(!server) server = serverDefault;
    Object.assign(server, updates);
    await localforage.setItem("server", server);
    return server;
}

export async function getRepo() {
    await fakeNetwork('repo')
    let repo = await localforage.getItem('repo');
    if(!repo) repo = {};

    return repo;
}

export async function updateRepo(updates: any) {
    await fakeNetwork();
    let repo: any = await localforage.getItem('repo');
    if(!repo) repo = {};
    Object.assign(repo, updates);
    await localforage.setItem("repo", repo);
    return repo;
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: any = {};

async function fakeNetwork(key?: any) {
    if(!key) {
        fakeCache = {};
    }

    if(fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    })
}