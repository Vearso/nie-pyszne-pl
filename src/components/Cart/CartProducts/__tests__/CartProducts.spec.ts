import { mount } from "@vue/test-utils";
import CartProducts from "../CartProducts.vue";
import { createStore } from "vuex";
import { key } from "@/store";
import cart from "@/store/modules/cart";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import modal from "@/store/modules/modal";
import { CartState } from "@/store/interfaces";

const createVuexStore = (): any =>
  createStore({
    modules: {
      modal,
      cart: {
        ...cart,
        state: {
          ...cart.state,
          currentPage: 1,
          items: [
            {
              id: 0,
              name: "Pizza Pepperoni",
              price: 9,
              quantity: 2,
              isHoveredOn: false,
              imgUrl:
                "https://images.unsplash.com/photo-1542282811-943ef1a977c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            },
            {
              id: 1,
              name: "Fungi",
              price: 9,
              quantity: 3,
              isHoveredOn: true,
              imgUrl:
                "https://images.unsplash.com/photo-1600346019001-8d56d1b51d59?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            {
              id: 2,
              name: "Double Cheddar Cheeseburger",
              price: 12,
              quantity: 1,
              imgUrl:
                "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlZXNlYnVyZ2VyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            }
          ]
        },
        mutations: {
          ...cart.mutations,
          calculatePagesCount(state: CartState): void {
            state.pagesCount = 3;
          }
        }
      }
    }
  });
const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

function factory() {
  const store = createVuexStore();
  return mount(CartProducts, {
    props: {},
    global: {
      plugins: [[store, key], [i18n]],
      stubs: {
        ProductsDetails: true,
        ProductsHover: true,
        Modal: true,
        Buttons: true
      }
    }
  });
}

describe("Cart Products", () => {
  it("renders empty", () => {
    const store = createStore({ modules: { cart, modal } });
    const wrapper = mount(CartProducts, {
      global: {
        plugins: [[store, key], [i18n]],
        stubs: {
          ProductsDetails: true,
          ProductsHover: true,
          Modal: true,
          Buttons: true
        }
      }
    });
    expect(wrapper.html()).toContain("np-cartProducts--empty");
  });
  it("renders with items", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain("np-cartProducts__item");
  });
  it("hover renders product hover", async () => {
    const wrapper = factory();
    await wrapper.find(".np-cartProducts__item").trigger("mouseover");
    expect(wrapper.find(".np-cartProducts__item").html()).toContain(
      "products-hover-stub"
    );
  });
  it("hover off renders product details", async () => {
    const wrapper = factory();
    await wrapper.find(".np-cartProducts__item").trigger("mouseover");
    await wrapper.find(".np-cartProducts__item").trigger("mouseleave");
    expect(wrapper.find(".np-cartProducts__item").html()).toContain(
      "products-details-stub"
    );
  });
  it("renders buttons", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain("buttons-stub");
  });
  it("calculates right price", () => {
    const wrapper = factory();
    expect(
      wrapper.find(".np-cartProducts__item__price p:last-child").text()
    ).toBe("$57.00");
  });
  it("pagination works", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");
    await wrapper.find(".pagination__arrow--right").trigger("click");
    expect(input.element.value).toBe("2");
    await wrapper.find(".pagination__arrow--left").trigger("click");
    expect(input.element.value).toBe("1");
    await input.setValue("1");
    expect(input.element.value).toBe("1");
    expect(wrapper.html()).toContain("np-cartProducts__item");
  });
});
