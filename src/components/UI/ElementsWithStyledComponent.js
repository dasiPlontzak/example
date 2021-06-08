
import styled from 'styled-components';

export const TextArea = styled.textarea`
font-size:  ${(props) => props.editHeader.fontSize[props.textKind] || '30px'};
text-align:  ${(props) => props.editHeader.alignment || 'right'};
color: ${(props) => props.editHeader.textColor[props.textKind] || 'red'};
`;



export const BackgroundColor = styled.div`
background-image:  linear-gradient(to bottom, transparent 30%, black 95%), url(${(props) => props.imgSrc});
background-repeat: no-repeat, no-repeat;
background-size: cover;
height: 58vh;
`;

export const Div = styled.div`
padding-left:5vw;
padding-right: 5vw;
margin-top: 51px;
display: grid;
grid-template-columns: repeat(${(props) => props.channelSettings.columns}, 1fr);
grid-gap:20px;
`;

export const Button = styled.button`
background-color:${(props) => props.channelSettings.mainColor};
border-radius:${(props) => props.channelSettings.buttonStyle}%;
`;

export const TextsDiv = styled.div`
display: flex;
justify-content:${(props) => props.align === 'left' ? 'flex-start' : props.align === 'right' ? 'flex-end' : 'center'};
`;