// D:\microservices\Reddit\post-service\grpc\grpcServer.js
const grpc = require("@grpc/grpc-js");
const server = new grpc.Server();

exports.startGrpcServer = function (serviceDefinition, serviceImplementation) {
  try {
    server.addService(serviceDefinition, serviceImplementation);
    console.log("✅ Service added to gRPC server.");

    server.bindAsync(
      "0.0.0.0:50055", 
      grpc.ServerCredentials.createInsecure(),
      (error, port) => {
        if (error) {
          console.error("❌ Failed to bind gRPC server:", error);
          return;
        }
        console.log(`🚀 Post Service is running at http://0.0.0.0:${port}`);
          // server.start(); // مش محتاجينها في النسخ الجديدة
      }
    );
  } catch (err) {
    console.error("❌ Critical Error during server startup:", err.message);
  }
};