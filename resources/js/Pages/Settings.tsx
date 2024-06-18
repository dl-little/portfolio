import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IAuthenticatedPage } from '@/Components/interfaces';
import EditSettingsForm from './Auth/EditSettingsForm';

interface ISettings extends IAuthenticatedPage {
    values: {
        github_url: string
        linkedin_url: string
        email: string
    }
}

const Settings: React.FC<ISettings> = ({ auth, values }) => {
	return (
		<AuthenticatedLayout
            user={auth.user}
            title="Settings"
        >
			<section>
                <EditSettingsForm values={values}/>
            </section>
		</AuthenticatedLayout>
	)
}

export default Settings
