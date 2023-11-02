import { createRouter, createWebHistory } from "vue-router";
import { test } from "vitest";

import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

// Mock the router to prevent errors
const _router_mock = createRouter({
  history: createWebHistory(),
  routes: [],
});

test("maxPageNum - perfect division", async () => {
  // If we have 100 drinks and 10 per page, we should have 6 pages
  // The first page is 0 the last page is 9
  // So the max page number should be 9
  const wrapper = mount(Home, {
    global: {
      plugins: [_router_mock],
    },
  });

  wrapper.vm.totalNumDrinks = 100
  wrapper.vm.numbPerPage = 10

  expect(wrapper.vm.maxPageNum).toBe(9);
});

test("maxPageNum - no drinks", async () => {
  // If we have 0 drinks and 10 per page, we should have 1 page
  // This page has number 0
  const wrapper = mount(Home, {
    global: {
      plugins: [_router_mock],
    },
  });

  wrapper.vm.totalNumDrinks = 0
  wrapper.vm.numbPerPage = 20

  expect(wrapper.vm.maxPageNum).toBe(0);
});

test("maxPageNum - left over division", async () => {
  // If we have 105 drinks and 20 per page, we should have 6 pages
  // The first page is 0 the last page is 5
  // So the max page number should be 5
  const wrapper = mount(Home, {
    global: {
      plugins: [_router_mock],
    },
  });

  wrapper.vm.totalNumDrinks = 105
  wrapper.vm.numbPerPage = 20

  expect(wrapper.vm.maxPageNum).toBe(5);
});