import RenderIf from "../RenderIf";
import { ISharedProps } from "../interfaces";
import useDynamicImport from "@/Hooks/useDynamicImport";

interface IWrapper extends ISharedProps {
	title: string
}

const Wrapper:React.FC<IWrapper> = ({ title }) => {
	const projectComponent = useDynamicImport( title, {});

	return (
		<RenderIf isTrue={!!projectComponent}>
			{projectComponent}
		</RenderIf>
	)
}

export default Wrapper;