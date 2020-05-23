import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../../components/MainComponents';
import { PageArae } from './styled';
import { Fake } from './styled';
import useApi from '../../helpers/OlxAPI';


const Page = () => {

    const api = useApi();
    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState([]);

    const { id } = useParams();

    return (
        <PageContainer>
            <PageArae>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300} />}
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20} />}
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100} />}
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