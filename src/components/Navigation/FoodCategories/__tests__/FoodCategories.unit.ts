import { mount } from "@vue/test-utils";
import FoodCategories from "@/components/Navigation/FoodCategories/FoodCategories.vue";
import { createStore } from "vuex";
import navStore from "@/store/modules/navigation";
import { key } from "@/store";

const nav = {
  ...navStore,
  state: {
    activeFoodCategory: "pizza",
    categoryList: [
      {
        id: "all",
        name: "All",
        categoryType: "all",
        iconUrl: "RestaurantIcon"
      },
      {
        id: "pizza",
        name: "Pizza",
        categoryType: "pizza",
        iconUrl: "PizzaIcon"
      },
      {
        id: "sushi",
        name: "Sushi",
        categoryType: "sushi",
        iconUrl: "SushiIcon"
      },
      {
        id: "mexican",
        name: "Mexican",
        categoryType: "mexican",
        iconUrl: "TacoIcon"
      },
      {
        id: "burgers",
        name: "Burgers",
        categoryType: "burgers",
        iconUrl: "BurgerIcon"
      }
    ]
  },
  mutations: {
    setActiveFoodCategory: jest.fn()
  }
};

const createVuexStore = (): any => createStore({ modules: { nav } });

const factory = (mockFn?: any) => {
  const store = createVuexStore();
  return mount(FoodCategories, {
    global: {
      plugins: [[store, key]],
      mocks: {
        setActiveCategory: mockFn
      }
    }
  });
};

jest.mock("@/router", () => {
  return {
    replace: jest.fn(),
    currentRoute: {
      value: {
        query: "test"
      }
    }
  };
});

describe("test food categories", () => {
  it("checks number of list items", () => {
    const wrapper = factory();

    expect(wrapper.findAll(".np-category-list__item").length).toBe(
      nav.state.categoryList.length
    );
  });

  it("fires setActiveCategory", async () => {
    const mockFn = jest.fn();
    const wrapper = factory(mockFn);

    await wrapper.find(".np-category-list__item").trigger("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("gives active class to active category", () => {
    const wrapper = factory();

    wrapper.find("#pizza");

    expect(wrapper.find("#pizza").html()).toContain(
      "np-category-list__item--active"
    );
  });
});
