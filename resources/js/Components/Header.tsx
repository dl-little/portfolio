import Logo from './Logo';
import { usePage, Link } from '@inertiajs/react';
import classNames from 'classnames';

const Header: React.FC = () => {
	const { url } = usePage();

	return (
		<header id="header">
			<div id="header-wrap">
				<Link
					id="logo-wrap"
					aria-disabled={url === '/'}
					className={classNames({disabled: url === '/'})}
					href={ url === '/' ? '#' : '/' }
				>
					<Logo />
				</Link>
				<h1 className="screen-reader-text">Doug Little</h1>
				<nav id="nav">
					<ul id="nav-list">
						{['projects', 'contact'].map(( route ) => {
							const active = url === `/${route}`;
							return (
								<li key={route} className={classNames("nav-item", { active: active })}>
									<div className="dot">●</div>
									<Link className="nav-link" href={`/${route}`}>
										{route}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header;
