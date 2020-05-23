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

    .adImage {

    }
    .adInfo {
        padding: 10px;

        .adName {
            margin-bottom: 10px;
        }
        .adDescription {

        }
    }
}
.rightSide {
    width: 250px;
}
`;