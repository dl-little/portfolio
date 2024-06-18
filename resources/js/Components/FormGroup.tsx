import styled from "styled-components";

import shared from '@/../scss/abstracts/_shared.module.scss';
const { halfGap, quarterGap } = shared;

const FormGroup = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    gap: ${quarterGap};

    &:not(:first-child) {
        margin-block-start: ${halfGap}
    }
`;

export default FormGroup;