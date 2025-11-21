const PROTO_PATH = __dirname + "/user.proto";
const grpc = require("@grpc/grpc-js");
const server = new grpc.Server();

exports.startGrpcServer = function () {
  server.bindAsync(
    "127.0.0.1:50050",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.log(error);
      } else {
        console.log("server is running");
        server.start();
      }
    }
  );
};
exports.getGrpcServer = function () {
  return server;
};
