import { shallowMount } from "@vue/test-utils";
import Navigation from "@/components/Navigation/Navigation.vue";

describe("Navigations tests", () => {
  it("renders SearchBar", () => {
    const wrapper = shallowMount(Navigation, {
      global: {
        stubs: {
          SearchBar: true
        }
      }
    });

    expect(wrapper.html()).toContain("<search-bar-stub>");
  });

  it("renders FoodCategories", () => {
    const wrapper = shallowMount(Navigation, {
      global: {
        stubs: {
          FoodCategories: true
        }
      }
    });
    expect(wrapper.html()).toContain("<food-categories-stub>");
  });
});
