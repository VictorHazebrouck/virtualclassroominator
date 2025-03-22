import type { SocketData } from "@repo/shared-types/socket";

export const persist_config = {
    encode: JSON.stringify,
    decode: JSON.parse,
} as const;

export type SocketDataPersisted = {
    _id: string;
    info: SocketData["info"];
};

// export function convert_players_persisted_data()
// {
//     const base_obj = $players_other_persisted.get();
//     const res_obj: Record<string, SocketData> = {};

//     for (const user_id in base_obj)
//     {
//         res_obj[user_id] = {
//             ...base_obj[user_id]!,
//             chat: {
//                 is_mike_active: false,
//                 is_talking: false,
//                 is_screensharing: false,
//                 is_webcam_active: false,
//             },
//             spacial: {
//                 postition: { x: 100, y: 100 },
//                 direction: "down",
//                 is_moving: false,
//             },
//         };
//     }

//     return res_obj;
// }
