import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: import.meta.env.BASE_URL,
      component: () => import("@/views/Home.vue"),
      name: "Home",
    },
    {
      path: import.meta.env.BASE_URL + "drink/:id",
      component: () => import("@/views/Drink.vue"),
      name: "Drink",
    },
    {
      path: import.meta.env.BASE_URL + "add-drink",
      component: () => import("@/views/AddDrink.vue"),
      name: "AddDrink",
    },
    {
      path: import.meta.env.BASE_URL + "logo",
      component: () => import("@/views/Logo.vue"),
      name: "Logo",
    },
  ],
});
