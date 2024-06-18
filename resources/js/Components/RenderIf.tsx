import { PropsWithChildren } from 'react';

interface IRenderIf extends PropsWithChildren {
	isTrue: boolean
}

const RenderIf: React.FC<IRenderIf> = ({ isTrue, children }) => {
	if (!isTrue) {
		return null
	}

	return <>{children}</>
}

export default RenderIf;
