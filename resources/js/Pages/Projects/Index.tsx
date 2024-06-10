import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IAuthenticatedPage } from '@/Components/interfaces';
import { Link } from '@inertiajs/react';
import styled from 'styled-components';

interface IProject {
    description?: string
    github_url?: string
    id: number
    image: string
    keywords?: string
    title: string
}

interface IProjectsIndex extends IAuthenticatedPage {
    projects: {
        data: IProject[]
    }
}

const TableHeading = styled.th`
    border: 5px solid transparent;
`;

const TableCell = styled.td`
    max-width: 100px;
    word-wrap: break-word;
    border: 5px solid transparent;
    img {
        width: 100%;
        height: 100px;
        object-fit: cover;
    }
`;

const Index: React.FC<IProjectsIndex> = ({ auth, projects }) => {
    const { data } = projects;
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Projects"
        >
            <section>
                <table>
                    <thead>
                        <tr>
                            <TableHeading scope="col">
                                ID
                            </TableHeading>
                            <TableHeading scope="col">
                                Title
                            </TableHeading>
                            <TableHeading scope="col">
                                Image
                            </TableHeading>
                            <TableHeading scope="col">
                                Keywords
                            </TableHeading>
                            <TableHeading scope="col">
                                Github URL
                            </TableHeading>
                            <TableHeading scope="col">
                                Description
                            </TableHeading>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((project) => {
                            return (
                            <tr key={project.id}>
                                <TableHeading scope="row">
                                    {project.id}
                                </TableHeading>
                                <TableCell>
                                    {project.title}
                                </TableCell>
                                <TableCell>
                                    <img src={project.image} />
                                </TableCell>
                                <TableCell>
                                    {project.keywords}
                                </TableCell>
                                <TableCell>
                                    {project.github_url}
                                </TableCell>
                                <TableCell>
                                    {project.description}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={route('projects.edit', project.id)} 
                                    >
                                        Edit
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={route('projects.destroy', project.id)}
                                        as="button"
                                        method="delete"
                                        type="button"
                                    >
                                        Delete
                                    </Link>
                                </TableCell>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
            <section>
                <Link href={route('projects.create')} as='button'>
                    New Project
                </Link>
            </section>
        </AuthenticatedLayout>
    );
}

export default Index;
