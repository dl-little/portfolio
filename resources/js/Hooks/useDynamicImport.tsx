import { useEffect, useState } from "react";

const useDynamicImport = (title: string, props: any) => {
	const [ importedComponent, setImportedComponent ] = useState(<></>);

	useEffect(() => {
		const importComponent = async () => {
			try {
				const module = await import(`../Components/projects/${title}.tsx`);
				const AnotherComponent = module.default;
				setImportedComponent(<AnotherComponent {...props} />);
			} catch (e) {
				const module = await import(`../Components/projects/ImportError.tsx`);
				const ImportError = module.default;
				setImportedComponent(<ImportError />);
			}
		};
  
	  importComponent();
	}, []);

	return importedComponent;
};

export default useDynamicImport;