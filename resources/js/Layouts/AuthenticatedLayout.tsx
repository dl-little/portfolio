import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import styled from 'styled-components';
import RenderIf from '@/Components/RenderIf';

import variables from '../../scss/abstracts/_shared.module.scss';
const { gap } = variables;

const Nav = styled.nav`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: flex-start;
    gap: ${gap};
`;

const UserDetails = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    gap: ${gap}
`;

const Children = styled.section`
    flex: 1;
    margin-block-start: ${gap};
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    gap: ${gap};
    text-align: left;
`;

export default function Authenticated({ user, title, children }) {

    return (
        <>
            <Nav id="auth-nav">
                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                    Dashboard
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>

                <UserDetails>
                    <div className="font-medium text-base text-gray-800">{user.name}</div>
                    <div className="font-medium text-sm text-gray-500">{user.email}</div>
                </UserDetails>
        
                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                    Log Out
                </ResponsiveNavLink>
            </Nav>

            <Children>
                <RenderIf isTrue={!!title}>
                    <h2 className="screen-reader-text">{title}</h2>
                </RenderIf>
                <div>
                    {children}
                </div>
            </Children>
        </>
    );
}
