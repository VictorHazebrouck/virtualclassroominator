import type { SocketData } from "@repo/shared-types/socket";

export const persist_config = {
    encode: JSON.stringify,
    decode: JSON.parse,
} as const;

export type SocketDataPersisted = {
    _id: string;
    info: SocketData["info"];
};
