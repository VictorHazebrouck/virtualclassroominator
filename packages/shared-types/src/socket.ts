export interface ServerToClientEvents
{
    "server:player-join": (data: SocketData) => void;
    "server:player-leave": (data: { player_id: string }) => void;

    "server:chat:send-message-global": (data: { from_player_id: string; message: Message }) => void;
    "server:chat:send-message-to-player": (data: {
        from_player_id: string;
        message: Message;
    }) => void;

    "server:game:send-gamestate": (data: SocketData[]) => void;
    "server:game:broadcast-player-movement": (data: {
        player_id: string;
        spacial: SocketData["spacial"];
    }) => void;
    "server:game:broadcast-player-info": (data: {
        player_id: string;
        info: SocketData["info"];
    }) => void;
    "server:game:broadcast-player-chat": (data: {
        player_id: string;
        chat: SocketData["chat"];
    }) => void;
}

export interface ClientToServerEvents
{
    "client:connect": (data: SocketData) => void;

    "client:chat:send-message-global": (data: { message: Message }) => void;
    "client:chat:send-message-to-player": (data: {
        to_player_id: string;
        message: Message;
    }) => void;

    "client:game:player:movement": (data: SocketData["spacial"]) => void;
    "client:game:player:info": (data: SocketData["info"]) => void;
    "client:game:player:chat": (data: SocketData["chat"]) => void;
}

export interface InterServerEvents
{
    ping: () => void;
}

export interface SocketData extends Record<string, unknown>
{
    _id: string;
    info: {
        name: string;
        skin: AvailableSkins;
        status: PlayerStatus;
    };
    chat: {
        is_mike_active: boolean;
        is_webcam_active: boolean;
        is_screensharing: boolean;
        is_talking: boolean;
    };
    spacial: {
        postition: Postion;
        direction: Direction;
        is_moving: boolean;
    };
}

export type Direction = "top" | "down" | "left" | "right";

export type Postion = {
    x: number;
    y: number;
};

export type AvailableSkins = "alex" | "anna" | "ardley" | "colt" | "ester" | "tom";

export type PlayerStatus = "on" | "off" | "away" | "disconnected";

export type Message = {
    _id: string;
    sender: string;
    message: string;
};
