import * as process from "node:process";

export const config = () => ({
    port: process.env.PORT || 3000,
    authServicePort : process.env.AUTH_SERVICE_PORT || 3001,
    userServicePort : process.env.USER_SERVICE_PORT || 3002,
})