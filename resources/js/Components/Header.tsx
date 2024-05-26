import Logo from './Logo';

const Header: React.FC = () => {
	return (
		<header>
			<div id="header-wrap">
				<Logo />
				<h1 className="screen-reader-text">Doug Little</h1>
			</div>
		</header>
	)
}

export default Header;
