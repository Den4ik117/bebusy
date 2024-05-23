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
import PageAdminUsersEdit from "@/pages/PageAdminUsersEdit.vue";
import PageMentors from "@/pages/PageMentors.vue";
import PageInterviews from "./pages/PageInterviews.vue";
import PageQuestions from "./pages/PageQuestions.vue";
import PageRequirements from "./pages/PageRequirements.vue";
import PageMentorShow from "./pages/PageMentorShow.vue";
import PageQuestionShow from "./pages/PageQuestionShow.vue";

export const createRoutes = () => ([
  {
    path: '/',
    name: 'chats',
    component: HomePage,
  },
  {
    path: '/_/:uuid',
    name: 'chat',
    component: HomePage,
  },
  {
    path: '/mentors',
    name: 'mentors',
    component: PageMentors,
  },
  {
    path: '/mentors/:slug',
    name: 'mentors.show',
    component: PageMentorShow,
  },
  {
    path: '/interviews',
    name: 'interviews',
    component: PageInterviews,
  },
  {
    path: '/questions',
    name: 'questions',
    component: PageQuestions,
  },
  {
    path: '/questions/:id',
    name: 'questions.show',
    component: PageQuestionShow,
  },
  {
    path: '/requirements',
    name: 'requirements',
    component: PageRequirements,
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
              path: 'users/create',
              name: 'admin.users.create',
              component: PageAdminUsersEdit,
          },
          {
              path: 'users/:id/edit',
              name: 'admin.users.edit',
              component: PageAdminUsersEdit,
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
