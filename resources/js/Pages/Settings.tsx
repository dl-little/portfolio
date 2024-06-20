import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IAuthenticatedPage } from '@/Components/interfaces';
import EditSettingsForm from './Auth/EditSettingsForm';

export type ISetting = {
    github_url: string
    linkedin_url: string
    email: string
    home_nouns: string
    home_big: string
    home_little: string
}

interface ISettings extends IAuthenticatedPage {
    values: ISetting
}

const Settings: React.FC<ISettings> = ({auth, values}) => {

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
