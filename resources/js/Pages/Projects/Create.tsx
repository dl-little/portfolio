import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IAuthenticatedPage } from '@/Components/interfaces';
import CreateProjectForm from './Partials/CreateProjectForm';
import FormWrap from './Partials/FormWrap';

const Create: React.FC<IAuthenticatedPage> = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="New Project"
        >
            <FormWrap>
                <CreateProjectForm />
            </FormWrap>
        </AuthenticatedLayout>
    );
}

export default Create;