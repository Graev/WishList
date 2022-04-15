import { join, dirname } from "path";
import swaggerAutogen from "swagger-autogen";
import m2s from "mongoose-to-swagger";
import Wish from "./models/wish";
import Event from "./models/event";
import User from "./models/user";

//Docs
//desc
const doc = {
  // общая информация
  info: {
    title: "WishList API",
    description: "",
  },
  // что-то типа моделей
  definitions: {
    // модель задачи
    Wish: m2s(Wish),
    // модель массива задач
    Wishes: [
      {
        // ссылка на модель задачи
        $ref: "#/definitions/Wish",
      },
    ],
    // модель объекта с текстом новой задачи
    Event: m2s(Event),
    // модель объекта с изменениями существующей задачи
    Events: [
      {
        // ссылка на модель задачи
        $ref: "#/definitions/Event",
      },
    ],
    User: m2s(User),
  },
  host: "178.128.193.140",
  schemes: ["http"],
};

// путь и название генерируемого файла
const outputFile = join(__dirname, "output.json");
// массив путей к роутерам
const endpointsFiles = [join(__dirname, "./router/router.ts")];

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(
  ({ success }) => {
    console.log(`Generated: ${success}`);
  }
);
