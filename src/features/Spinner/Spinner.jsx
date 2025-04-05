import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transfrom: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const SpinnerWrapper = styled.div`
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: ${spin} 1s linear infinite;
    margin: 20px auto;
`

const Spinner = () => {
    return (
        <SpinnerWrapper />
    );
}

export default Spinner;