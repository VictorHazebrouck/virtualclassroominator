import { Container, Graphics } from "pixi.js";

export default class GroundsLayer extends Container
{
    constructor()
    {
        super();
        const rounded_rect = create_rect();
        this.addChild(rounded_rect);
    }
}

function create_rect()
{
    const rounded_rect = new Graphics();
    rounded_rect.rect(0, 0, 300, 300);
    rounded_rect.fill("#000");
    return rounded_rect;
}
