import { createRouter, createWebHistory } from "vue-router";

export const path_home = import.meta.env.BASE_URL;
export const path_drinks = import.meta.env.BASE_URL + "drinks/:id";
export const path_contact = import.meta.env.BASE_URL + "contact";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: path_home,
      component: () => import("@/views/Home.vue"),
      name: "Home",
    },
    {
      path: path_drinks,
      component: () => import("@/views/Drink.vue"),
      name: "Drinks",
    },
    // {
    //   path: path_contact,
    //   component: () => import("@/views/Contact.vue"),
    //   name: "Contact",
    // },
  ],
});
