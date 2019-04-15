import * as h from "ivi-html";
import { testRenderDOM } from "ivi-test";

test(`<input value="abc">`, () => {
  testRenderDOM<HTMLInputElement>(r => {
    const n = r(h.input("", { value: h.VALUE("abc") }))!;

    expect(n.value).toBe("abc");
  });
});

test(`<input type="checkbox" checked="false">`, () => {
  testRenderDOM<HTMLInputElement>(r => {
    const n = r(h.input("", { type: "checkbox", checked: h.CHECKED(false) }))!;

    expect(n.checked).toBe(false);
  });
});

test(`<input type="checkbox" checked="true">`, () => {
  testRenderDOM<HTMLInputElement>(r => {
    const n = r(h.input("", { type: "checkbox", checked: h.CHECKED(true) }))!;

    expect(n.checked).toBe(true);
  });
});
