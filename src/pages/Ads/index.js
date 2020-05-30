import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
import { PageArae } from './styled';

import useApi from '../../helpers/OlxAPI';

let timer;

const Page = () => {

    const api = useApi();
    const history = useHistory();
    
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    const [resultOpacity, setResultOpacity] = useState(1);

    const useQueryString = () => {
        return new URLSearchParams( useLocation().search );
    };

    const query = useQueryString();

    const [q, setQ] = useState(query.get('q') ?? '');
    const [cat, setCat] = useState(query.get('cat') ?? '');
    const [state, setState] = useState(query.get('state') ?? '');

    const getAdsList = async () => {
        
        const json = await api.getAds({
            sort: 'desc',
            limit: 8,
            q,
            cat,
            state
        });
        // atribui os valores a state adList
        setAdList(json.ads);
        // finaliza a impressão de carregamento ao usuário
        setResultOpacity(1);
    };

    /**
     *  monitora mudanças dos filtros
     *  para alterar a URL de acordo
     */
    useEffect(() => {

        // obtem os filtros se caso tenham dados
        let queryString = [];
        if (q) queryString.push(`q=${q}`);
        if (cat) queryString.push(`cat=${cat}`);
        if (state) queryString.push(`state=${state}`);

        queryString = queryString.join('&');

        /**
         *  muda a URL ao alterar o filtro
         *  sem recarregar a página
         */
        history.replace({
            search: '?' + queryString
        });

        // realiza consulta Web Service
        if (timer) clearTimeout(timer);
        timer = setTimeout(getAdsList, 2000);
        
        // causa a impressão de algo carregando para o usuário
        // como um loading
        setResultOpacity(.3);
        

    }, [q, cat, state]);
    
    useEffect(() => {
        const getStates = async () => {
            // const slist = await api.getStates();
            const slist = [
                {name: 'SP'},
                {name: 'RJ'},
            ];
            setStateList(slist);
        };
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        };
        getCategories();
    }, []);

    
    return (
        <>
            <PageContainer>
                <PageArae>
                    <div className="leftSide">
                        <form method="GET">
                            <input 
                                type="text" 
                                name="q"  
                                value={q}
                                onChange={e => setQ(e.target.value)}
                                placeholder="o que você procura" />
                            
                            <div className="filterName">Estado:</div>
                            <select 
                                name="state" 
                                value={state}
                                onChange={e => setState(e.target.value)}>
                                    <option></option>
                                    {stateList.map((i,k) => 
                                        <option
                                            key={k}
                                            value={i.name}>

                                                {i.name}
                                        </option>
                                    )}
                            </select>

                            <div className="filterName">Categoria:</div>
                            <ul>
                                {categories.map((i,k) =>
                                    <li 
                                        key={k} 
                                        className={i.slug == cat ? 'categoryItem active' : 'categoryItem'}
                                        onClick={() => setCat(i.slug)}>
                                            
                                            <img src={i.img} alt="" />
                                            <span>{i.name}</span>
                                    </li>
                                )}
                            </ul>

                        </form>
                    </div>
                    <div className="rightSide">
                        <h2>Resultados</h2>
                        <div className="list" style={{opaticy: resultOpacity}}>
                            {adList.map((i,k) =>
                                <AdItem key={k} data={i} />
                            )}
                        </div>
                    </div>
                </PageArae>
            </PageContainer>
        </>
    );
};

export default Page;