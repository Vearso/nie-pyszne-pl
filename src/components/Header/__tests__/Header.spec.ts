import { mount } from "@vue/test-utils";
import Header from "../Header.vue";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

function factory({ data } = { data: {} }) {
  return mount(Header, {
    global: {
      plugins: [i18n]
    }
  });
}

describe("Header", () => {
  it("renders a logo", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain("svg");
  });
  it("renders a right messages", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain(
      messages.en.headerTitle && messages.en.headerSubtitle
    );
  });
});
