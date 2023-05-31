// base error class
class BaseError extends Error {
  status: number
  isOperational: boolean
  constructor(message: string, status: number, isOperational = true) {
      super(message)
      this.status = status
      this.isOperational = isOperational
      Object.setPrototypeOf(this, BaseError.prototype)

  }
}

// validation error
class ValidationError extends BaseError {
  errorData: any
  constructor(data: any) {
      super("Validation Error", 400)
      this.errorData = data
      Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

/**
 * status response error
 */


// 400 bad error
class BadRequestError extends BaseError {
  constructor(message: string) {
      super(message, 400)
      Object.setPrototypeOf(this, BadRequestError.prototype)
  }
}

// 404 not found error
class NotFoundError extends BaseError {
  constructor(message: string) {
      super(message, 404)
      Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

// 409 exist or conflict error
class ConflictError extends BaseError {
  constructor(message: string) {
      super(message, 409)
      Object.setPrototypeOf(this, ConflictError.prototype)
  }
}

export {BaseError, NotFoundError, BadRequestError, ConflictError, ValidationError}