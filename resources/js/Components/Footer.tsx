import { usePage, Link } from '@inertiajs/react';
import { ISharedProps } from "./interfaces";

const Footer = () => {
	const { props, url } = usePage<ISharedProps>()
	const { auth } = props

	return (
		<footer>
			<div id="footer-wrap">
				<div id="year">
					{ new Date().getFullYear() }
				</div>
			</div>
		</footer>
	)
}

export default Footer;