import Cookie from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';

const apiFetchFile = async (endpoint, body) => {
    // adiciona o token no corpo da requisição
    // caso não tenha
    if (!body.token) {
        let token = Cookie.get('token');
        if (token) body.append('token', token);
    }

    // requisição POST
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        body
    });

    // retorno em JSON
    const json = await res.json();

    // caso não tenha permissão redireciona
    // para o login
    if (json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
};

const apiFetchPost = async (endpoint, body) => {

    // adiciona o token no corpo da requisição
    // caso não tenha
    if (!body.token) {
        let token = Cookie.get('token');
        if (token) body.token = token;
    }

    // requisição POST
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    // retorno em JSON
    const json = await res.json();

    // caso não tenha permissão redireciona
    // para o login
    if (json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
};

const apiFetchGet = async (endpoint, body = []) => {

    // adiciona o token no corpo da requisição
    // caso não tenha
    if (!body.token) {
        let token = Cookie.get('token');
        if (token) body.token = token;
    }

    // requisição POST
    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);

    // retorno em JSON
    const json = await res.json();

    // caso não tenha permissão redireciona
    // para o login
    if (json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
};

const OlxAPI = {
    login: async (email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );

        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet('/states');
        return json.states;
    },

    getCategories: async () => {
        const json = await apiFetchGet('/categories');
        return json.categories;
    },

    register: async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state: stateLoc}
        );

        return json;
    },

    getAds: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    getAd: async (id, other = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        );
        return json;
    },

    addAd: async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    }
}

export default () => OlxAPI;