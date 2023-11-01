import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  it("calculates totalNumPages correctly when totalNumDrinks is divisible by numbPerPage", () => {
    console.log("START")
    const wrapper = mount(Home, {
      data() {
        return {
          totalNumDrinks: 100,
          numbPerPage: 10,
        };
      },
    });
    console.log("STOP");
    expect(wrapper.vm.totalNumPages).toBe(10);
  });

  it("calculates totalNumPages correctly when totalNumDrinks is not divisible by numbPerPage", () => {
    const wrapper = mount(Home, {
      data() {
        return {
          totalNumDrinks: 105,
          numbPerPage: 20,
        };
      },
    });

    expect(wrapper.vm.totalNumPages).toBe(6);
  });

  it("returns 1 when totalNumDrinks is less than numbPerPage", () => {
    const wrapper = mount(Home, {
      data() {
        return {
          totalNumDrinks: 5,
          numbPerPage: 15,
        };
      },
    });

    expect(wrapper.vm.totalNumPages).toBe(1);
  });
});
