import Layout from '@/Layouts/Layout';
import { PageProps } from '@inertiajs/core';

const Projects = () => {
	return (
		<>
			<p>sfaefaea</p>
		</>
	);
}

Projects.layout = (page: PageProps) => {
	return (
		<Layout children={page} title="Projects" />
	)
}

export default Projects;