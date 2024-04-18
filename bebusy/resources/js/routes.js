import HomePage from "./pages/HomePage.vue";

export const createRoutes = () => ([
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/_/:uuid',
        component: HomePage,
    },
])