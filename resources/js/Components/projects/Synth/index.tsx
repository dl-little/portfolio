import styled from "styled-components";
import variables from '../../../../scss/abstracts/_shared.module.scss';
const { tabletBreak } = variables;

export const SynthWrap = styled.section`
	width: 100%;
	display: flex;
	flex-flow:column nowrap;
	justify-content: center;
	align-items: center;
	background-color: #B1B1B1;
	@media (min-width: ${tabletBreak}) {
		-webkit-box-shadow: 5px 5px 5px #222222;
		box-shadow: 5px 5px 5px #222222;
	}
`;

export {SynthControls} from './components/SynthControls';
export {SynthKeyboard} from './components/SynthKeyboard';
