import Layout from '@/Layouts/Layout';
import { PageProps } from '@inertiajs/core';

const Contact = () => {
	return (
		<>
			<p>contact</p>
		</>
	);
}

Contact.layout = (page: PageProps) => {
	return (
		<Layout children={page} title="Contact" />
	)
}

export default Contact;