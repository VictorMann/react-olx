import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { PageArae } from './styled';
import useApi from '../../helpers/OlxAPI';

const Page = () => {

    const api = useApi();

    const fileField = useRef();
    const history = useHistory();

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        };
        getCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if (!title.trim()) {
            errors.push('Sem titulo');
        }

        if (!category) {
            errors.push('Sem categoria');
        }

        // tudo ok para enviar
        if (errors.length === 0) {
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            fData.append('cat', category);

            // obtem as imagens
            let files = fileField.current.files;
            // verifica se foi enviado alguma imagem
            if (files.length > 0) {
                for (let i = 0; i < files.length; i ++) {
                    fData.append('img', files[i]);
                }
            }

            // requisição
            const json = await api.addAd(fData);

            // se não houver erros
            if (!json.error) {
                history.push(`/ad/${json.id}`);
                return;
                
            // se houver erro
            } else {
                setError(json.error);
            }



        } else {
            setError(errors.join("\n"));
        }

        setDisabled(false);
    };

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    });

    return (
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArae>
                {
                    error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Titulo</div>
                        <div className="area--input">
                            <input 
                                type="test" 
                                disabled={disabled}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                                disabled={disabled}
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                <option></option>
                                {categories && categories.map(i => (
                                    <option key={i._id} value={i._id}>
                                        {i.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <MaskedInput 
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input 
                                type="checkbox"
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e => setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <textarea
                                disabled={disabled}
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                            ></textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Imagem (1 ou mais)</div>
                        <div className="area--input">
                            <input 
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Adicionar Anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArae>
        </PageContainer>
    );
};

export default Page;