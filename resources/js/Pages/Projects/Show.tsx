import { ISharedProps } from '@/Components/interfaces';
import { IProject } from './Index';
import styled from "styled-components";
import Heading from '@/Components/Heading';
import { Link } from '@inertiajs/react';

import variables from '../../../scss/abstracts/_shared.module.scss';
const { gap, halfGap, contrast } = variables;

const DetailsContainer = styled.section`
	& > *:not(:first-child) {
		margin-block-start: ${gap};
	}
`

const BreadCrumbs = styled.section`
	& > a, span {
		font-size: .7em;
	}
`;

interface IProjectsDetails extends ISharedProps {
	project: IProject
}

const Show: React.FC<IProjectsDetails> = ({ project }) => {
	const { description, github_url, id, image, keywords, title } = project;
	
    return (
		<DetailsContainer>
			<Heading>{`  ${project.title}`}</Heading>
			<p>{description}</p>
		</DetailsContainer>
    );
}

export default Show;