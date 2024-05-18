import styled from 'styled-components';
import colors from '../../scss/abstracts/_palette.module.scss';
const { secondary } = colors;

const StyledFooter = styled.footer`
	background-color: ${secondary};
`

const Footer = () => {
	return (
		<StyledFooter>
			<div id="footer-wrap" className="group">
				<p>suaefp</p>
			</div>
		</StyledFooter>
	)
}

export default Footer;