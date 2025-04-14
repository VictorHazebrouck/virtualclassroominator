import type { TPlayerInfo } from "@repo/shared-types/common";

export const persist_config_json = {
    encode: JSON.stringify,
    decode: JSON.parse,
} as const;

export type PlayerDataPersisted = {
    _id: string;
    info: TPlayerInfo;
};
