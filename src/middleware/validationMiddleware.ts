import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodObject, ZodRawShape } from 'zod'

export function validateData(schema: ZodObject<ZodRawShape>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: issue.message
        }))
        res.status(400).json({ success: false, error: errorMessages, data: null })
      } else {
        res.status(500).json({ success: false, error: 'Internal server error', data: null, message: '' })
      }
    }
  }
}
