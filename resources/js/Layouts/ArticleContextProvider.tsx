import { useRef, createContext, MutableRefObject } from "react";

/* TODO: resolve the explicit any. */
export const ArticleContext = createContext<{articleRef: any}>({ articleRef: undefined });

const ArticleContextProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ArticleContext.Provider
			value={{
				articleRef: useRef()
			}}
		>
			{children}
		</ArticleContext.Provider>
	)
}

export default ArticleContextProvider;
