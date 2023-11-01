import { createRouter, createWebHistory } from 'vue-router'
import { test } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

test('calculates totalNumPages correctly', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [], // provide your routes here
  })

  const wrapper = mount(Home, {
    data() {
      return {
        totalNumDrinks: 100,
        numbPerPage: 10
      }
    },
    global: {
      plugins: [router]
    }
  })
  
  expect(wrapper.vm.totalNumDrinks).toBe(100)
  expect(wrapper.vm.numbPerPage).toBe(10)
  expect(wrapper.vm.totalNumPages).toBe(9)
})