import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IAuthenticatedPage } from '@/Components/interfaces';
import CreateProjectForm from './Partials/CreateProjectForm';

const Create: React.FC<IAuthenticatedPage> = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="New Project"
        >
            <section>
                <CreateProjectForm />
            </section>
        </AuthenticatedLayout>
    );
}

export default Create;