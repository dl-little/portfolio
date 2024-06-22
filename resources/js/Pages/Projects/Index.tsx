import { Link } from '@inertiajs/react';
import Heading from '@/Components/Heading';
import GHLogo from '@/Components/logos/GHLogo';
import styled from 'styled-components';
import { ISharedProps } from '@/Components/interfaces';
import RenderIf from '@/Components/RenderIf';

import variables from '../../../scss/abstracts/_shared.module.scss';
const { halfGap, gap, largeGap, contrast, secondary, tabletBreak, quarterGap } = variables;

const IndexContainer = styled.section`
    & > *:not(:first-child) {
        margin-block-start: ${gap};
    }
`;

const ProjectCards = styled.ul`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;

    & > *:not(:first-child) {
        margin-block-start: ${largeGap};
        @media( min-width: ${tabletBreak} ) {
            margin-block-start: ${gap};
        }
    }
`;

const ProjectCard = styled.li`
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    justify-content: flex-end;
    gap: ${quarterGap};
    @media( min-width: ${tabletBreak} ) {
        gap: ${halfGap};
    }

    & big {
        color: ${contrast};
    }
`;

const Keywords = styled.small`
    font-style: italic;
`;

const Links = styled.span`
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    justify-content: flex-end;
    gap: ${halfGap};
`;
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
        <IndexContainer>
            <Heading>Projects</Heading>
            <ProjectCards>
                {data.map((project) => {
                    return (
                        <ProjectCard key={project.id}>
                            <RenderIf isTrue={!!project.keywords}>
                                <Keywords>{project.keywords}</Keywords>
                            </RenderIf>
                            <Links>
                                <big>
                                    <Link className='inertia-link' href={route('projects.show', project.id)}>
                                        {project.title}
                                    </Link>
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
                            </Links>
                        </ProjectCard>
                    )
                })}
            </ProjectCards>
        </IndexContainer>
    );
}

export default Index;
