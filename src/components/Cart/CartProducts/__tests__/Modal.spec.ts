import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import cart from "@/store/modules/cart";
import modal from "@/store/modules/modal";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import Modal from "@/components/Cart/CartProducts/Modal.vue";
import { key } from "@/store";

const store = createStore({
  modules: {
    modal: {
      ...modal,
      state: {
        showModal: true,
        itemToDelete: {
          id: 0,
          name: "Pizza Pepperoni",
          quantity: 1,
          price: 9,
          imgUrl:
            "https://images.unsplash.com/photo-1542282811-943ef1a977c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
          isHoveredOn: false
        }
      }
    },
    cart
  }
});

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

function factory() {
  return mount(Modal, {
    shallow: true,
    global: {
      plugins: [[store, key], [i18n]]
    }
  });
}

describe("Modal component", () => {
  it("shows modal", () => {
    const wrapper = factory();
    console.log(wrapper.html());
  });
});
