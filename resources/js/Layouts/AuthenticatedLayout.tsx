import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import styled from 'styled-components';
import RenderIf from '@/Components/RenderIf';
import { ILayout } from './Layout';
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

const Children = styled.section`
    flex: 1;
    margin-block-start: ${doubleGap};

    @media( min-width: ${tabletBreak} ) {
        margin-block-start: calc( ${doubleGap} + calc( ${gap} + ${halfGap} ) );
    }

    @media( min-width: ${desktopBreak} ) {
        margin-block-start: calc( ${doubleGap} + ${doubleGap} );
    }
`;

const Authenticated: React.FC<ILayout> = ({ user, title, children }) => {

    return (
        <>
            <Nav id="auth-nav">
                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                    Dashboard
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>

                <RenderIf isTrue={!!user}>
                        {/* @ts-ignore:next-line: Block won't render unless user is defined */}
                        <div className="font-medium text-base text-gray-800">{user.name}</div>
                </RenderIf>
        
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

export default Authenticated;
