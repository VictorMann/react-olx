import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import { PageContainer } from '../../components/MainComponents';
import { PageArae } from './styled';
import { Fake } from './styled';
import useApi from '../../helpers/OlxAPI';


const Page = () => {

    const api = useApi();
    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        };
        getAdInfo(id);
    }, []);


    const formatDate = (date) => {
        let cDate = new Date(date);

        let months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();
        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    };

    return (
        <PageContainer>
            <PageArae>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300} />}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img, key) => (
                                        <div key={key} className="each-slide">
                                            <img src={img} alt="" />
                                        </div>
                                    ))}
                                </Slide>
                            }
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20} />}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100} />}
                                {adInfo.description}
                                <hr />
                                {adInfo.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="box box--pading">
                        {loading && <Fake />}
                    </div>
                    <div className="box box--pading">
                    {loading && <Fake height={50} />}
                    </div>
                </div>
            </PageArae>
        </PageContainer>
    );
};

export default Page;