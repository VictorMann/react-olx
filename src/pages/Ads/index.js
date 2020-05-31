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
    
    // states para paginação
    const [adsTotal, setAdsTotal] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    const [resultOpacity, setResultOpacity] = useState(1);
    const [loading, setLoading] = useState(true);

    const useQueryString = () => {
        return new URLSearchParams( useLocation().search );
    };

    const query = useQueryString();

    const [q, setQ] = useState(query.get('q') ?? '');
    const [cat, setCat] = useState(query.get('cat') ?? '');
    const [state, setState] = useState(query.get('state') ?? '');

    const getAdsList = async () => {
        
        // exibe carregamento
        setLoading(true);

        const json = await api.getAds({
            sort: 'desc',
            limit: 2,
            q,
            cat,
            state
        });
        // atribui os valores a state adList
        setAdList(json.ads);
        // set o tatal de items no banco da consulta para paginação
        setAdsTotal(json.total);
        // finaliza a impressão de carregamento ao usuário
        setResultOpacity(1);
        // indica termino do carregamento
        setLoading(false);
    };

    /**
     *  para paginação
     */
    useEffect(() => {
        // condicional de segurança divisão por 0 (ZERO)
        if (adList.length == 0) 
            setPageCount( Math.ceil( adsTotal / adList.length ) );
        else setPageCount(0);
    }, [adsTotal]);

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

    // cria array para iterar sobre o total de paginas
    // a ser exibido na paginação
    let pagination = [];
    for (let i = 1; i <= pageCount; pagination.push(i ++)) /* vazio */ ;

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

                        {loading &&
                            <div className="listWarning">Carregando...</div>
                        }
                        {loading && adList.length == 0 &&
                            <div className="listWarning">Não encontramos resultados.</div>
                        }

                        <div className="list" style={{opaticy: resultOpacity}}>
                            {adList.map((i,k) =>
                                <AdItem key={k} data={i} />
                            )}
                        </div>
                        
                        <div className="pagination">
                            {pagination.map((i,k) =>
                                <div key={k} className="pagItem">
                                    {i}
                                </div>
                            )}
                        </div>

                    </div>
                </PageArae>
            </PageContainer>
        </>
    );
};

export default Page;