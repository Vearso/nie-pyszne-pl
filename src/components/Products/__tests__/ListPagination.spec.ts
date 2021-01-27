import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import { createStore } from "vuex";
import { DOMWrapper, mount } from "@vue/test-utils";
import { key } from "@/store";
import ListPagination from "@/components/Products/ListPagination.vue";
import navigation from "@/store/modules/navigation";
import mockProducts from "@/store/mockModules/mockProducts";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

const createWrapper = (component: any, modules = {}, options = {}) => {
  const store = createStore({
    modules: {
      ...modules
    }
  });
  return mount(component, {
    global: {
      plugins: [i18n, [store, key]]
    },
    ...options
  });
};

describe("List Pagination", () => {
  const wrapper = createWrapper(ListPagination, {
    products: {
      ...mockProducts,
      state: { numberOfPages: 2, pageNumber: 1 }
    },
    navigation
  });
  it("commit PREVPAGE", async () => {
    await wrapper.find(".np-pagination__wrapper__left-arrow").trigger("click");
    expect(mockProducts.mutations.prevPage).toHaveBeenCalled();
  });
  it("commit NEXTPAGE", async () => {
    await wrapper.find(".np-pagination__wrapper__right-arrow").trigger("click");
    expect(mockProducts.mutations.nextPage).toHaveBeenCalled();
  });
  it("commit SETPAGE", async () => {
    const input = wrapper.find("#pageNumber") as DOMWrapper<HTMLInputElement>;
    await input.setValue(2);

    expect(+input.element.value).toBe(2);
    expect(mockProducts.mutations.setPage).toHaveBeenCalledWith(
      { numberOfPages: 2, pageNumber: 1 },
      2
    );
  });
});
