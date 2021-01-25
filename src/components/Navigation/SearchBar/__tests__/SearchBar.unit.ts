import SearchBar from "@/components/Navigation/SearchBar/SearchBar.vue";
import { mount } from "@vue/test-utils";

// const i18n = createI18n({
//   legacy: false,
//   locale: "en",
//   fallbackLocale: "en",
//   messages
// });

jest.mock("@/store", () => ({
  useStore: () => {
    const state = {
      nav: require("@/store/modules/navigation").default.state
    };
    return {
      state,
      // getters: {
      //   ['cart/cartItems']: state.cart.items,
      //   ['cart/priceTotal']: state.cart.priceTotal,
      // },
      commit: jest.fn()
    };
  }
}));

describe("searchbar test", () => {
  describe("list view", () => {
    it("toggles to grid", async () => {
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
      await wrapper
        .find("[data-test='searchbar-li-view-btn']")
        .trigger("click");
      expect(mockFn).toHaveBeenCalled();
    });

    // it("toggles to list", () => {});
    //
    // it("sets query params", () => {});
    //
    // it("query sets list view", () => {});
  });

  // describe("order option", () => {});
});
