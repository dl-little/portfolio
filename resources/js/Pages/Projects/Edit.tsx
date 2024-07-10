import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IAuthenticatedPage } from '@/Components/interfaces';
import EditProjectForm from './Partials/EditProjectForm';
import { IProject } from './Index';
import FormWrap from './Partials/FormWrap';

interface IProjectsEdit extends IAuthenticatedPage {
	project: IProject
}

const Edit: React.FC<IProjectsEdit> = ({ auth, project }) => {
	
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Edit Project"
        >
            <FormWrap>
                <EditProjectForm project={project}/>
            </FormWrap>
        </AuthenticatedLayout>
    );
}

export default Edit;