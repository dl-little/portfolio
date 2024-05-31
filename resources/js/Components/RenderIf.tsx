import { PropsWithChildren } from 'react';

interface IRenderIf extends PropsWithChildren {
	condition: boolean
}

const RenderIf: React.FC<IRenderIf> = ({ condition, children }) => {
	if (!condition) {
		return null
	}

	return <>{children}</>
}

export default RenderIf;
