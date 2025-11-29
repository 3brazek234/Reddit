const mongoose = require('mongoose');
const grpc = require('@grpc/grpc-js');

const checkResourceExists = async (model, id, resourceName = 'Resource') => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw {
      code: grpc.status.INVALID_ARGUMENT,
      details: `Invalid ID format for ${resourceName}.`,
    };
  }
  const document = await model.findById(id);
  if (!document) {
    // نرمي خطأ gRPC
    throw {
      code: grpc.status.NOT_FOUND,
      details: `${resourceName} with ID '${id}' not found.`,
    };
  }
  return document;
};

module.exports = { checkResourceExists };