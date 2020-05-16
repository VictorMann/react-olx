import Cookie from 'js-cookie';

export const isLogged = () => {
    let token = Cookie.get('token');
    return token ? true : false;
}