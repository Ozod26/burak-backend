// import cors from "cors";
// import express from "express";
// import path from "path";
// import router from "./router";
// import routerAdmin from "./router-admin";
// import morgan from "morgan";
// import { MORGAN_FORMAT } from "./libs/config";
// import { T } from "./libs/types/common";
// import cookieParser from "cookie-parser";

// import session from "express-session";
// import ConnectMongoDB from "connect-mongodb-session";

// // session connection to database
// const MongoDBStore = ConnectMongoDB(session);
// // mongoDbStore object
// const store = new MongoDBStore({
//   uri: String(process.env.MONGO_URL),
//   collection: "sessions",
// });

// /** 1- Entrance **/
// const app = express();
// // middleware pattern
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/uploads", express.static("./uploads"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors({ credentials: true, origin: true }));
// app.use(cookieParser());
// app.use(morgan(MORGAN_FORMAT));

// /** 2- Session **/
// app.use(
//   session({
//     secret: String(process.env.SESSION_SECRET),
//     cookie: {
//       maxAge: 1000 * 3600 * 6, // 6 hours
//     },
//     store: store,
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// // middleware hamma qilinayotgan murojatlar uchun
// app.use(function (req, res, next) {
//   // requestan kelayotkan sessionni qabul qilish
//   const sessionInstance = req.session as T;
//   // session instance ichidan kelayotkan memberqiymatni res.locals.member ga tenglab qoyamz
//   // res.locals browserni varaible lari
//   res.locals.member = sessionInstance.member;
//   next();
// });

// /** 3- Views **/
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// /** 4- Routers **/
// app.use("/admin", routerAdmin); // BSSR: EJS
// app.use("/", router); // Middleware design pattern : React => SPA

// export default app;

import cors from "cors";
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

/** 1-ENTRANCE **/
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

/** 2-SESSIONS **/
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 6, // 6h
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTERS **/
app.use("/admin", routerAdmin); // SSR
app.use("/", router); // SPA

export default app;
