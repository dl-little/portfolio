import RenderIf from '@/Components/RenderIf';
import { ILayout } from './Layout';
import variables from '../../scss/abstracts/_shared.module.scss';
const { gap, halfGap, doubleGap, desktopBreak, tabletBreak } = variables;
import styled from 'styled-components';
import AuthenticatedNav from '@/Components/AuthenticatedNav';

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
            <AuthenticatedNav user={user} />
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
