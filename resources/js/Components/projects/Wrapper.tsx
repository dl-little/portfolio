import { useContext, useLayoutEffect } from "react";
import RenderIf from "../RenderIf";
import { ISharedProps } from "../interfaces";
import useDynamicImport from "@/Hooks/useDynamicImport";
import useScrollOffset from "@/Hooks/useScrollOffset";
import { ArticleContext } from "@/Layouts/ArticleContextProvider";

interface IWrapper extends ISharedProps {
	title: string
}

const Wrapper:React.FC<IWrapper> = ({ title }) => {
	const projectComponent = useDynamicImport( title, {});
	const articleContext = useContext(ArticleContext);
	const ref = articleContext.articleRef;
	const { setBodyAttribute } = useScrollOffset(ref);

	useLayoutEffect(() => {
		setBodyAttribute();
	}, [projectComponent])

	return (
		<RenderIf isTrue={!!projectComponent}>
			{projectComponent}
		</RenderIf>
	)
}

export default Wrapper;