import { useEffect, useState } from "react";
import ImportError from "@/Components/projects/ImportError";

const useDynamicImport = (title: string, props: any) => {
	const [ importedComponent, setImportedComponent ] = useState(<></>);

	useEffect(() => {
		const importComponent = async () => {
			try {
				const module = await import(`/resources/js/Components/projects/${title}.tsx`);
				const AnotherComponent = module.default;
				setImportedComponent(<AnotherComponent {...props} />);
			} catch (e) {
				setImportedComponent(<ImportError />);
			}
		};
  
	  importComponent();
	}, []);

	return importedComponent;
};

export default useDynamicImport;