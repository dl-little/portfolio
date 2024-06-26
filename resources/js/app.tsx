import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Layout from './Layouts/Layout';

const appName = import.meta.env.VITE_APP_NAME || 'Doug Little, Full-Stack Developer';

const setupPageLayout = (module: any, name: string) => {
    const strippedOfSlashes = /^([^\/])+/.exec(name)?.[0];
    module.default.layout ??= (p: any) => <Layout children={p} title={strippedOfSlashes} />
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')) as any;
        page.then((module: any) => setupPageLayout(module, name));
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
