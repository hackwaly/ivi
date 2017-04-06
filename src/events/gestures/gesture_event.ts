import { SyntheticEvent } from "../synthetic_event";
import { SyntheticEventFlags } from "../flags";

export class GestureEvent extends SyntheticEvent {
    constructor(
        flags: SyntheticEventFlags,
    ) {
        super(flags, performance.now());
    }
}

export const enum GestureTapAction {
    Tap = 1,
    TapDown = 1 << 1,
    TapUp = 1 << 2,
    TapCancel = 1 << 3,
}

export class GestureTapEvent extends GestureEvent {
    readonly action: GestureTapAction;

    constructor(
        flags: SyntheticEventFlags,
        action: GestureTapAction,
    ) {
        super(flags);
        this.action = action;
    }
}

export class GestureLongPressEvent extends GestureEvent {
}
