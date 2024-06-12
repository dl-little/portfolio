import { Link } from "@inertiajs/react";
import styled from 'styled-components';
import RenderIf from '@/Components/RenderIf';

import variables from '../../scss/abstracts/_shared.module.scss';
const { gap, halfGap, doubleGap, desktopBreak, tabletBreak } = variables;

const Nav = styled.nav`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: flex-start;
    gap: ${gap};
    padding-left: calc(${doubleGap} + 80px);
    padding-top: calc( ${gap} + ${halfGap} );

    @media( min-width: ${tabletBreak} ) {
        position: fixed;
        right: calc( ${gap} + ${halfGap} );
        top: calc( ${gap} + ${halfGap} );
        padding-left: calc( ${doubleGap} + ${halfGap} + 80px );
        padding-top: 0;
    }

    @media( min-width: ${desktopBreak} ) {
        right: ${doubleGap};
        top: ${doubleGap};
        padding-left: calc( ${doubleGap} + ${gap} + 80px );
    }
`;

const routes = {
	Dashboard: 'dashboard',
	Profile: 'profile.edit',
	Projects: 'projects.index'
}

interface IAuthNav {
	user: {
		id: number,
		name: string,
		email: string
	}
}

const AuthenticatedNav: React.FC<IAuthNav> = ({ user }) => {
	return (
		<Nav id="auth-nav">
			<RenderIf isTrue={!!user}>
				<div>{user.name}</div>
			</RenderIf>
			{Object.entries(routes).map(([name, url]) => {
				return (
					<Link key={name} href={route(url)}>
						{name}
					</Link>
				)
			})}
			<Link method="post" href={route('logout')} as="button">
				Log Out
			</Link>
		</Nav>
	)
}

export default AuthenticatedNav;