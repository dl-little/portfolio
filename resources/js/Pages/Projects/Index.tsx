import styled from 'styled-components';
import { ISharedProps } from '@/Components/interfaces';

import variables from '../../../scss/abstracts/_shared.module.scss';
const { gap, halfGap, doubleGap, desktopBreak, tabletBreak } = variables;

const ProjectsContainer = styled.ul`
`;

const ProjectsHeading = styled.h2`
    display: inline-block;
`;

const ProjectCard = styled.li`
    display: block;
    
    &:not(:first-child) {
        margin-block-start: ${gap};
    }
`

export interface IProject {
    description?: string
    github_url?: string
    id: number
    image: string
    keywords?: string
    title: string
}

interface IProjectsIndex extends ISharedProps{
    projects: {
        data: IProject[]
    }
}

const Index: React.FC<IProjectsIndex> = ({ projects }) => {
    const { data } = projects;
    return (
        <>
            <ProjectsContainer>
                <ProjectsHeading aria-hidden="true" className="emphasis highlight accent">Projects</ProjectsHeading>
                {data.map((project) => {
                    return (
                        <ProjectCard key={project.id}>
                            <big>{project.title}</big>
                        </ProjectCard>
                    )
                })}
            </ProjectsContainer>
        </>
    );
}

export default Index;
