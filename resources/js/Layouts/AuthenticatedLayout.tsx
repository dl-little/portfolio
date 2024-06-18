import RenderIf from '@/Components/RenderIf';
import { ILayout } from './Layout';
import { usePage } from '@inertiajs/react';
import variables from '../../scss/abstracts/_shared.module.scss';
const { gap, halfGap, doubleGap, desktopBreak, tabletBreak } = variables;
import styled from 'styled-components';
import AuthenticatedNav from '@/Components/AuthenticatedNav';
import { IAuthenticatedPage } from '@/Components/interfaces';

const Children = styled.section`
    flex: 1;
    margin-block-start: ${doubleGap};
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    @media( min-width: ${tabletBreak} ) {
        margin-block-start: calc( ${doubleGap} + calc( ${gap} + ${halfGap} ) );
    }

    @media( min-width: ${desktopBreak} ) {
        margin-block-start: calc( ${doubleGap} + ${doubleGap} );
    }
`;

const Authenticated: React.FC<ILayout> = ({ user, title, children }) => {
    const { flash } = usePage<IAuthenticatedPage>().props;

    return (
        <section>
            <AuthenticatedNav user={user} />
            <Children>
                <RenderIf isTrue={!!flash && !!flash.message} >
                    {flash.message}
                </RenderIf>
                <RenderIf isTrue={!!title}>
                    <h2 className="screen-reader-text">{title}</h2>
                </RenderIf>
                {children}
            </Children>
        </section>
    );
}

export default Authenticated;
