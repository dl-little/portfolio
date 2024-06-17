import { Link } from '@inertiajs/react';
import Heading from '@/Components/Heading';
import GHLogo from '@/Components/logos/GHLogo';
import styled from 'styled-components';
import { ISharedProps } from '@/Components/interfaces';
import RenderIf from '@/Components/RenderIf';

import variables from '../../../scss/abstracts/_shared.module.scss';
const { halfGap, gap, contrast, secondary, primary } = variables;

const ProjectCard = styled.li`
    display: flex;
    align-items: flex-end;
    gap: ${halfGap};
    
    &:not(:first-child) {
        margin-block-start: ${gap};
    }

    & big {
        color: ${contrast};
    }
`

export interface IProject {
    description?: string
    github_url?: string
    id: number
    image: string
    keywords?: string
    title: string
    is_hosted: boolean
}

interface IProjectsIndex extends ISharedProps{
    projects: {
        data: IProject[]
    }
}

const Index: React.FC<IProjectsIndex> = ({ projects }) => {
    const { data } = projects;
    return (
        <section>
            <Heading>Projects</Heading>
            {data.map((project) => {
                return (
                    <ProjectCard key={project.id}>
                        <RenderIf isTrue={!!project.keywords}>
                            <small>{project.keywords}</small>
                        </RenderIf>
                        <big>
                            <RenderIf isTrue={project.is_hosted}>
                                <Link className='inertia-link' href={route('projects.show', project.id)}>
                                    {project.title}
                                </Link>
                            </RenderIf>
                            <RenderIf isTrue={!project.is_hosted}>
                                {project.title}
                            </RenderIf>
                        </big>
                        <RenderIf isTrue={!!project.github_url}>
                            <a href={project.github_url} className="icon-link" title={`Github link for ${project.title}`}>
                                <GHLogo
                                    primary={contrast}
                                    hover={secondary} 
                                    width={20}
                                />
                            </a>
                        </RenderIf>
                    </ProjectCard>
                )
            })}
        </section>
    );
}

export default Index;
