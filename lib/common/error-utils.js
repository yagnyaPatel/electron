'use strict'

const errorConstructors = {
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError
}

exports.deserialize = function (error) {
  if (error.__ELECTRON_SERIALIZED_ERROR__ && errorConstructors[error.name]) {
    const rehydratedError = new errorConstructors[error.name](error.message)
    rehydratedError.stack = error.stack
    return rehydratedError
  }
  return error
}

exports.serialize = function (error) {
  if (error instanceof Error) {
    // Errors get lost, because: JSON.stringify(new Error('Message')) === {}
    // Take the serializable properties and construct a generic object
    return {
      message: error.message,
      stack: error.stack,
      name: error.name,
      __ELECTRON_SERIALIZED_ERROR__: true
    }
  }
  return error
}
