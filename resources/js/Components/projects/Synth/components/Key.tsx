import RenderIf from "@/Components/RenderIf";
import styled from "styled-components";

interface IKey {
	color: string
	trigger: string
	keyboardLetters: boolean
	active: boolean
}

const KeyButton = styled.button<{className: string, value: boolean}>`
	flex: 1;
	height: ${props => props.className === 'black' ? '70%' : '100%'};
	border: 1px inset #222222;
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-end;
	align-items: flex-start;
	position: ${props => props.className === 'black' ? 'absolute' : 'static'};
	left: 0;
	top: 0;
	width: ${props => props.className === 'black' ? 'calc(11.11%/2)' : 'unset'};
	background-color: ${props => props.value ? '#829AB1' : props => props.className === 'black' ? '#3B3B3B' : '#F7F7F7'};
	color: ${props => props.className === 'black' ? '#F7F7F7' : '#3B3B3B'};
	padding: 0 0 2px 2px;
`;

const Key: React.FC<IKey> = ({color, trigger, keyboardLetters, active}) => {

	return (
		<KeyButton
			value={active}
			className={color}
		>
			<RenderIf isTrue={keyboardLetters}>
				{trigger}
			</RenderIf>
		</KeyButton>
	)
}

export default Key;