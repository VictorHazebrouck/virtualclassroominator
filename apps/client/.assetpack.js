import { pixiPipes } from "@assetpack/core/pixi";

export default {
    entry: "./raw_assets",
    output: "./public",
    pipes: [...pixiPipes({ manifest: { output: "./src/game/assets/manifest.json" } })],
};
