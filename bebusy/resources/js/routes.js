import HomePage from "./pages/HomePage.vue";
import AppAdminLayout from "./components/AppAdminLayout.vue";
import PageDashboard from "./pages/PageDashboard.vue";
import PageAdminMentors from "./pages/PageAdminMentors.vue";
import PageAdminMentorsEdit from "./pages/PageAdminMentorsEdit.vue";
import PageAdminInterviews from "./pages/PageAdminInterviews.vue";
import PageAdminInterviewsEdit from "./pages/PageAdminInterviewsEdit.vue";
import PageAdminQuestions from "./pages/PageAdminQuestions.vue";
import PageAdminQuestionsEdit from "./pages/PageAdminQuestionsEdit.vue";
import PageAdminRequirements from "./pages/PageAdminRequirements.vue";
import PageAdminRequirementsEdit from "./pages/PageAdminRequirementsEdit.vue";
import PageAdminUsers from "@/pages/PageAdminUsers.vue";

export const createRoutes = () => ([
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/_/:uuid',
        component: HomePage,
    },
    {
        path: '/admin',
        component: AppAdminLayout,
        children: [
            {
                path: '',
                name: 'admin.dashboard',
                component: PageDashboard,
            },
            {
                path: 'users',
                name: 'admin.users',
                component: PageAdminUsers,
            },
            {
                path: 'mentors',
                name: 'admin.mentors',
                component: PageAdminMentors,
            },
            {
                path: 'mentors/create',
                name: 'admin.mentors.create',
                component: PageAdminMentorsEdit,
            },
            {
                path: 'mentors/:id/edit',
                name: 'admin.mentors.edit',
                component: PageAdminMentorsEdit,
            },
            {
                path: 'interviews',
                name: 'admin.interviews',
                component: PageAdminInterviews,
            },
            {
                path: 'interviews/create',
                name: 'admin.interviews.create',
                component: PageAdminInterviewsEdit,
            },
            {
                path: 'interviews/:id/edit',
                name: 'admin.interviews.edit',
                component: PageAdminInterviewsEdit,
            },
            {
                path: 'questions',
                name: 'admin.questions',
                component: PageAdminQuestions,
            },
            {
                path: 'questions/create',
                name: 'admin.questions.create',
                component: PageAdminQuestionsEdit,
            },
            {
                path: 'questions/:id/edit',
                name: 'admin.questions.edit',
                component: PageAdminQuestionsEdit,
            },
            {
                path: 'requirements',
                name: 'admin.requirements',
                component: PageAdminRequirements,
            },
            {
                path: 'requirements/create',
                name: 'admin.requirements.create',
                component: PageAdminRequirementsEdit,
            },
            {
                path: 'requirements/:id/edit',
                name: 'admin.requirements.edit',
                component: PageAdminRequirementsEdit,
            },
        ],
    }
])