import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IAuthenticatedPage } from '@/Components/interfaces';
import EditProjectForm from './Partials/EditProjectForm';
import { IProject } from './Index';

interface IProjectsEdit extends IAuthenticatedPage {
	project: IProject
}

const Edit: React.FC<IProjectsEdit> = ({ auth, project }) => {
	
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Edit Project"
        >
            <section>
                <EditProjectForm project={project}/>
            </section>
        </AuthenticatedLayout>
    );
}

export default Edit;