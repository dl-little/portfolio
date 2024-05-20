import styled from 'styled-components';
import Logo from './Logo';
import colors from '../../scss/abstracts/_palette.module.scss';
const { darkBlue } = colors;

interface IHeader {
	title: string
}

const StyledHeader = styled.header`
	background-color: ${darkBlue};
`;

const Header: React.FC<IHeader> = () => {
	return (
		<StyledHeader>
			<div id="header-wrap" className="group">
				<Logo />
				<h1 className="screen-reader-text">Doug Little</h1>
			</div>
		</StyledHeader>
	)
}

export default Header;
