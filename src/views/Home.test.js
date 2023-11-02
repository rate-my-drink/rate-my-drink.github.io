import { createRouter, createWebHistory } from "vue-router";
import { test } from "vitest";

import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

test("calculates totalNumPages correctly", async () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [], // provide your routes here
  });

  const wrapper = mount(Home, {
    global: {
      plugins: [router],
    },
  });

  wrapper.vm.totalNumDrinks = 100
  wrapper.vm.numbPerPage = 10

  expect(wrapper.vm.totalNumPages).toBe(9);
});
