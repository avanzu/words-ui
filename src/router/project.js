

// ------------------------------------------------------------------------------------------------------------- PROJECT
const projects      = r => require.ensure([], () => r(require('../pages/projects')), 'project');
const project       = r => require.ensure([], () => r(require('../pages/project')), 'project');
const projectEditor = r => require.ensure([], () => r(require('../components/project/project-editor')), 'project');
const projectcard   = r => require.ensure([], () => r(require('../components/project/project-card')), 'project');
const fileUpload    = r => require.ensure([], () => r(require('../components/file-upload')), 'project');

export default [
    {
        path      : '/projects',
        name      : 'projectsIndex',
        component : projects,
        meta      : {
            requiresAuth: true
        }
    },
    {
        path: '/projects/create',
        name: 'projectCreate',
        component: project,
        props: {
            slug: false, create: true
        },
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path      : '',
                name      : 'createProject',
                component : projectEditor,
                props     : {
                    project: false
                },
                meta      : {
                    requiresAuth : true
                }
            },
        ]
    },
    {
        path      : '/projects/:slug',
        component : project,
        props     : true,
        meta      : {
            requiresAuth: true
        },
        children: [
            {
                path      : '',
                name      : 'projectHome',
                component : projectcard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path      : '/projects/:slug/update',
                name      : 'updateProject',
                component : projectEditor,
                meta      : {
                    requiresAuth : true
                }
            },
            {
                path: '/projects/:slug/upload',
                name: 'uploadCatalogue',
                component: fileUpload,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]
;