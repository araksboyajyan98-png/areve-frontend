import { register } from "node:module";

// Подключает ts-hooks.mjs ко всем модулям, которые загружают тесты.
register("./ts-hooks.mjs", import.meta.url);
