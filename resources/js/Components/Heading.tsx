import styled from 'styled-components';
import variables from '../../scss/abstracts/_shared.module.scss';
const { primary } = variables;

const Heading = styled.h2.attrs({
	className: "emphasis highlight accent",
	})`
		display: inline-block;
		color: ${primary};
		font-size: .9em;
	`;

export default Heading;