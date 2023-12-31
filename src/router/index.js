import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Notfound from "@/views/404.vue";
import { useAuthenticate } from "../store/Authenticate";
import Admin from "../views/Admin.vue";
import Login from "../views/Login.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Profile from "../views/Profile.vue";

const redirectToHomeOnLoggedIn = (to, from, next) => {
  if (useAuthenticate().isLoggedIn) next({ name: "home" });
  else next();
};

const isAuthenticated = () => {
  const authStore = useAuthenticate();
  return authStore.isLoggedIn;
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard,
    },
    {
      name: "AdminPanel",
      path: "/admin",
      component: Admin,
      meta: { requiresAuth: true, isAdmin: true },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: redirectToHomeOnLoggedIn, // Add the login route guard here
    },
    {
      path: "/leadersboard",
      name: "leadersboard",
      component: Leaderboard,
      meta: { requireAuth: true },
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { requireAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      component: Notfound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // console.log(useAuthenticate().isAdmin)
  if (to.meta.requireAuth && !isAuthenticated()) {
    next({ name: "login" }); // Redirect to login page if not logged in
  } else if (to.meta.isAdmin && !useAuthenticate().isAdmin) {
    next({ name: "profile" });
  } else {
    next(); // Proceed with navigation
  }
});

export default router;
