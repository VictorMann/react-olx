import styled from 'styled-components';

export const PageArae = styled.div`
form {
    background: white;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0 0 3px #999;

    .area {
        display: flex;
        align-items: center;
        padding: 10px;
        max-width: 500px;

        .area--title {
            width: 200px;
            text-align: right;
            padding-right: 20px;
            font-weight: bold;
            font-size: 14px;
        }
        .area--input {
            flex: 1;

            input, select, textarea {
                width: 100%;
                font-size: 14px;
                padding: 5px;
                border: 1px solid #ddd;
                border-radius: 3px;
                outline: 0;
                transition: .4s;

                &:focus {
                    border-color: #333;
                    color: #333;
                }
            }

            textarea {
                height: 150px;
                resize: none;
            }

            button {
                background: #0089ff;
                border: 0;
                outline: 0;
                padding: 5px 10px;
                border-radius: 4px;
                color: #fff;
                font-size: 15px;
                cursor: pointer;

                &:hover {
                    background: #006fce;
                }
            }
        }
    }
}

@media (max-width: 600px) {
    form {
        .area {
            flex-direction: column;

            .area--title {
                width: 100%;
                text-align: initial;
                margin-bottom: .5em;
            }
            .area--input {
                width: 100%;
                text-align: initial;

                input, select, textarea {
                    width: 100%;
                }

                [type=checkbox] {
                    width: auto;
                }

                button {
                    width: 100%;
                    padding: 10px;
                }
            }
        }
    }
}
`;