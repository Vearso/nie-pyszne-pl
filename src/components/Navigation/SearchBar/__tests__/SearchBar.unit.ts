import SearchBar from "@/components/Navigation/SearchBar/SearchBar.vue";
import { mount } from "@vue/test-utils";
import router from "@/router";

// const i18n = createI18n({
//   legacy: false,
//   locale: "en",
//   fallbackLocale: "en",
//   messages
// });

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

jest.mock("@/store", () => ({
  useStore: () => {
    const state = {
      nav: require("@/store/modules/navigation").default.state
    };
    return {
      state: {
        ...state,
        orderOptionsList: [
          {
            category: "Option",
            order: "details",
            type: "none"
          },
          {
            category: "Price",
            order: "Low to High",
            type: "price_asc"
          },
          {
            category: "Price",
            order: "High to Low",
            type: "price_desc"
          },
          {
            category: "Alphabetically",
            order: "A to Z",
            type: "alph_asc"
          },
          {
            category: "Alphabetically",
            order: "Z to A",
            type: "alph_desc"
          }
        ]
      },
      // getters: {
      //   ['cart/cartItems']: state.cart.items,
      //   ['cart/priceTotal']: state.cart.priceTotal,
      // },
      commit: jest.fn()
    };
  }
}));

describe("list view", () => {
  it("calls toggle function", async () => {
    const mockFn = jest.fn();
    const wrapper = mount(SearchBar, {
      global: {
        mocks: {
          changeFoodListView: mockFn
        }
      }
    });
    // console.log(wrapper);
    // const test = jest.spyOn((wrapper as any).componentVM, 'changeFoodListView');
    await wrapper.find("[data-test='searchbar-li-view-btn']").trigger("click");
    expect(mockFn).toHaveBeenCalled();
  });

  // it("changes color on hover", async ()=>{
  //   const wrapper = mount(SearchBar);
  //   console.log(wrapper);
  //   const svg = wrapper.find(".np-search-bar__toggle-list-view");
  //   await wrapper.trigger("mouseenter");
  //   const styles = window.getComputedStyle(svg);
  //
  //   expect(styles.fill).toBe('#6c63ff"');
  //  .toHaveStyles()
  // })

  // it("toggles to list", () => {});
  //
  // it("sets query params", () => {});
  //
  // it("query sets list view", () => {});
});

describe("order option", () => {
  it("fires set food order", async () => {
    const wrapper = mount(SearchBar);

    expect(wrapper.vm.isLiActive).toBe(false);

    await wrapper.find("#price_asc").trigger("click");

    expect(wrapper.vm.isLiActive).toBe(true);
  });

  it("modal fires toggle", async () => {
    const mockFn = jest.fn();
    const wrapper = mount(SearchBar, {
      global: {
        mocks: {
          toggleOrderList: mockFn
        }
      }
    });

    await wrapper.find('[data-test="modal-test"]').trigger("click");

    expect(mockFn).toHaveBeenCalled();
  });

  it("checks if list has enough order options", () => {
    const wrapper = mount(SearchBar);

    expect(wrapper.findAll(".np-search-bar__filter-list-item").length).toBe(4);
  });
});

describe("filter input", () => {
  it("test input fires event", async () => {
    const mockFn = jest.fn();
    const wrapper = mount(SearchBar, {
      global: {
        mocks: {
          setActiveFilter: mockFn
        }
      }
    });

    await wrapper.find("input").setValue("XD");

    expect(mockFn).toHaveBeenCalled();
  });

  // it("state value matches input value", () => {
  //   const wrapper = mount(SearchBar);
  //
  //   const inputVal = wrapper.find("input");
  //
  //   console.log(inputVal.element.value);
  //
  // })

  it("test input fires event", async () => {
    const mockFn = jest.fn();
    const wrapper = mount(SearchBar, {
      global: {
        plugins: {}
      }
    });

    await wrapper.find("input").setValue("XD");

    expect(mockFn).toHaveBeenCalled();
  });
});
