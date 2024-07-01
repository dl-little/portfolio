import { ISharedProps } from '@/Components/interfaces';
import { IProject } from './Index';
import styled from "styled-components";
import Heading from '@/Components/Heading';
import RenderIf from '@/Components/RenderIf';
import GHLogo from '@/Components/logos/GHLogo';
import useDynamicImport from '@/Hooks/useDynamicImport';

import variables from '../../../scss/abstracts/_shared.module.scss';
const { gap, secondary, contrast, tabletBreak, desktopBreak } = variables;

const DetailsContainer = styled.section`
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-end;
	position: relative;

	& > *:not(:first-child) {
		margin-block-start: ${gap};
	}
`;

const ProjectImage = styled.img`
	display: block;
	height: 75px;
	width: 75px;
	object-fit: cover;

	@media( min-width: ${tabletBreak} ) {
        width: 150px;
		height: 150px;
    }

	@media( min-width: ${desktopBreak} ) {
        width: 300px;
		height: 300px;
    }
`;

interface IProjectsDetails extends ISharedProps {
	project: IProject
}

const Show: React.FC<IProjectsDetails> = ({ project }) => {
	const { description, github_url, image, title, is_hosted } = project;
	const projectComponent = useDynamicImport('Wrapper', {title: title});
	
    return (
		<DetailsContainer>
			<Heading>{title}</Heading>
			<RenderIf isTrue={!!github_url}>
				<a href={github_url} className="icon-link" title={`Github link for ${title}`}>
					<GHLogo
						primary={contrast}
						hover={secondary} 
						width={20}
					/>
				</a>
			</RenderIf>
			<RenderIf isTrue={is_hosted}>
				{projectComponent}
			</RenderIf>
			<RenderIf isTrue={!is_hosted}>
				<ProjectImage src={`/storage/${image}`} />
			</RenderIf>
			<RenderIf isTrue={!!description}>
				<p>{description}</p>
			</RenderIf>
		</DetailsContainer>
    );
}

export default Show;