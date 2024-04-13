import UserRouter from "./routes/user-route";
import constants from "./utils/constants";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/users"), UserRouter);
};

export default requestMappings;
