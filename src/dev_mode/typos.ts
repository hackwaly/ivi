import { CSSStyleProps } from "../common/dom_props";
import { DEV_MODE, DevModeFlags, printWarn, printWarnOnce } from "./dev_mode";

let DOMAttributeTypos: { [key: string]: string };
if (__IVI_DEV__) {
    DOMAttributeTypos = {
        "autoFocus": "autofocus",
    };
}

/**
 * Checks DOM attribute typos and prints warning message with possible typos.
 *
 * @param attr Attributes.
 */
export function checkDOMAttributesForTypos(attrs: { [key: string]: any }): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableCheckingForTypos)) {
            const keys = Object.keys(attrs);
            for (let i = 0; i < keys.length; i++) {
                const attrName = keys[i];
                const match = DOMAttributeTypos[attrName];

                if (match) {
                    printWarnOnce(`typo.attribute.${attrName}`,
                        `Typo: attribute name "${attrName}" should be "${match}".`);
                }
            }
        }
    }
}

let DOMStyleTypos: { [key: string]: string };
if (__IVI_DEV__) {
    DOMStyleTypos = {
        "float": "cssFloat",
    };
}

/**
 * Checks DOM style typos and prints warning message with possible typos.
 *
 * @param styles Styles.
 */
export function checkDOMStylesForTypos(styles: CSSStyleProps): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableCheckingForTypos)) {
            const keys = Object.keys(styles);
            for (let i = 0; i < keys.length; i++) {
                const styleName = keys[i];
                const styleValue = (styles as any)[styleName];

                const match = DOMStyleTypos[styleName];
                if (match) {
                    printWarnOnce(`typo.style.${styleName}`,
                        `Typo: style name "${styleName}" should be "${match}".`);
                } else if (styleName.indexOf("-") > -1) {
                    printWarnOnce(`typo.style.${styleName}`,
                        `Typo: style "${styleName}" contains a hyphen symbol.`);
                }

                if (typeof styleValue === "string") {
                    if (styleValue.indexOf("\n") > -1) {
                        printWarn(`Typo: style "${styleName}" has a value with a newline character "${styleValue}".`);
                    }
                    if (styleValue.indexOf(";") > -1) {
                        printWarn(`Typo: style "${styleName}" has a value with a semicolon "${styleValue}".`);
                    }
                } else if (typeof styleValue === "number") {
                    if (isNaN(styleValue)) {
                        printWarn(`Typo: style "${styleName}" has a numeric NaN value.`);
                    }
                }
            }
        }
    }
}

/**
 * Check deprecated DOM SVG attributes.
 *
 * @param tag Tag name.
 * @param attrs SVG attributes.
 */
export function checkDeprecatedDOMSVGAttributes(tag: string, attrs: { [key: string]: any }): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableWarningsForUnsupportedFeatures)) {
            switch (tag) {
                case "svg":
                    if (attrs.hasOwnProperty("viewport")) {
                        printWarnOnce("deprecated.svg.attribute.viewport",
                            `SVG attribute "viewport" is deprecated.`);
                    }
                    break;
                case "view":
                    if (attrs.hasOwnProperty("viewTarget")) {
                        printWarnOnce("deprecated.svg.attribute.viewTarget",
                            `SVG attribute "viewTarget" is deprecated.`);
                    }
                    break;
            }
        }
    }
}