import styled from 'styled-components';

export const Fake = styled.div`
background: #ddd;
min-height: ${props => props.height || 30}px;
`;

export const PageArae = styled.div`
display: flex;
margin-top: 20px;

.box {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 4px #999;
    margin-bottom: 20px;
}

.box--pading {
    padding: 10px;
}

.leftSide {
    flex: 1;
    margin-right: 20px;

    .box {
        display: flex;
    }

    .adImage {
        width: 320px;
        height: 320px;
        margin-right: 20px;

        .each-slide img {
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: cover;
            height: 320px;
        }
    }
    .adInfo {
        
        flex: 1;

        .adName {
            margin-bottom: 10px;

            h2 {
                margin: 0;
                margin-top: 20px;
            }
            small {
                color: #999;
            }
        }
        .adDescription {

            small {
                color: #999;
            }
        }
    }
}
.rightSide {
    width: 250px;

    .price span {
        color: #00f;
        display: block;
        font-size: 27px;
        font-weight: bold;
    }
    .contactSellerLink {
        background: #00f;
        color: #fff;
        height: 30px;
        border-radius: 5px;
        box-shadow: 0 0 4px #999;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        margin-bottom: 20px;
    }

    .createdBy small {
        display: block;
        color: #999;
        margin-top: 10px;
    }
}
`;