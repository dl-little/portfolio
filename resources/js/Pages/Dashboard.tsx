import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IAuthenticatedPage } from '@/Components/interfaces';
import { Link } from '@inertiajs/react';
import styled from 'styled-components';
import RenderIf from '@/Components/RenderIf';

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
        object-fit: contain;
    }
`;

const TableCellDescription = styled.td`
    max-width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export interface IProject {
    description?: string
    github_url?: string
    id: number
    image: string
    keywords?: string
    title: string
}

interface IDashboard extends IAuthenticatedPage {
    projects: {
        data: IProject[]
    }
    values: {
        github_url: string
        linkedin_url: string
        email: string
    }
}

const Dashboard: React.FC<IDashboard> = ({ auth, projects, values }) => {
    const { data } = projects;

    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Dashboard"
        >
            <section>
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
                                    <TableCellDescription>
                                        {project.description}
                                    </TableCellDescription>
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
            </section>
            <RenderIf isTrue={!!values && !!Object.keys(values).length}>
                <section>
                    <section>
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(values).map((k) => {
                                        return (
                                            <TableHeading scope="col" key={k}>
                                                {k}
                                            </TableHeading>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {Object.entries(values).map(([k, v]) => {
                                        return (
                                            <TableCell key={k}>
                                                {v}
                                            </TableCell>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <Link href={route('settings')} as='button'>
                            Edit Settings
                        </Link>
                    </section>
                </section>
            </RenderIf>
        </AuthenticatedLayout>
    );
}

export default Dashboard;