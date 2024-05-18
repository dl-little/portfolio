import Layout from '../Layouts/Layout';

const Home = () => {
	return (
		<>
			<p>sup</p>
		</>
	);
}

Home.layout = page => <Layout children={page} title="Home" />

export default Home;
