import { config } from "@repo/config-prettier";

export default {
    ...config,
    plugins: ["prettier-plugin-tailwindcss", ...config.plugins],
};
