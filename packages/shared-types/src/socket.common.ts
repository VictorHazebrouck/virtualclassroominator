import { Type as t } from "@sinclair/typebox";

export const TBPlayerInfoSkin = t.Union([
    t.Literal("alex"),
    t.Literal("anna"),
    t.Literal("ardley"),
    t.Literal("colt"),
    t.Literal("ester"),
    t.Literal("tom"),
]);
export type TPlayerInfoSkin = typeof TBPlayerInfoSkin.static;

export const TBPlayerInfoStatus = t.Union([
    t.Literal("on"),
    t.Literal("off"),
    t.Literal("away"),
    t.Literal("disconnected"),
]);
export type TPlayerInfoStatus = typeof TBPlayerInfoStatus.static;

export const TBPlayerInfo = t.Object({
    name: t.String(),
    skin: TBPlayerInfoSkin,
    status: TBPlayerInfoStatus,
});
export type TPlayerInfo = typeof TBPlayerInfo.static;

export const TBPlayerStream = t.Object({
    is_mike_active: t.Boolean(),
    is_webcam_active: t.Boolean(),
    is_screensharing: t.Boolean(),
    is_talking: t.Boolean(),
});
export type TPlayerStream = typeof TBPlayerStream.static;

export const TBPosition = t.Object({
    x: t.Number(),
    y: t.Number(),
});
export type TPosition = typeof TBPosition.static;

export const TBDirection = t.Union([
    t.Literal("top"),
    t.Literal("down"),
    t.Literal("left"),
    t.Literal("right"),
]);
export type TDirection = typeof TBDirection.static;

export const TBPlayerSpacial = t.Object({
    postition: TBPosition,
    direction: TBDirection,
    is_moving: t.Boolean(),
});
export type TPlayerSpacial = typeof TBPlayerSpacial.static;

export const TBPlayerData = t.Object({
    _id: t.String(),
    info: TBPlayerInfo,
    spacial: TBPlayerSpacial,
    stream: TBPlayerStream,
});
export type TPlayerData = typeof TBPlayerData.static;

export const TBMessage = t.Object({
    _id: t.String(),
    sender: t.String(),
    message: t.String(),
});
export type TMessage = typeof TBMessage.static;
