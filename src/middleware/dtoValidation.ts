import { NextFunction, Request, Response, RequestHandler } from 'express'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { sanitize } from 'class-sanitizer'

const validateDTO = (
  type: ClassConstructor<object>,
  skipMissingProperties: boolean,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dtoObj = plainToInstance(type, req.body, {
    excludeExtraneousValues: false,
  })
  validate(dtoObj, { skipMissingProperties }).then(
    (errors: ValidationError[]) => {
      if (errors.length > 0) {
        const dtoErrors = errors.map((error: ValidationError) => {
          return {
            fieldName: error.property,
            errors: Object.values(error.constraints || {}),
          }
        })

        return res.status(422).json({
          status: 'fail',
          errors: dtoErrors,
        })
      } else {
        // sanitize the object and call the next middleware
        sanitize(dtoObj)
        req.body = dtoObj
        next()
      }
    }
  )
}

export function dtoValidation(
  type: ClassConstructor<object>,
  skipMissingProperties = true
): RequestHandler {
  return (req, res, next) => {
    validateDTO(type, skipMissingProperties, req, res, next)
  }
}
