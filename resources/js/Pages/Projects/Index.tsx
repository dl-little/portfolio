import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IAuthenticatedPage } from '@/Components/interfaces';
import { Link } from '@inertiajs/react';

const Projects: React.FC<IAuthenticatedPage> = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Projects"
        >
            <section>
                <Link href={route('projects.create')} as='button'>
                    Create Project
                </Link>
            </section>
        </AuthenticatedLayout>
    );
}

export default Projects;
