import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export interface IValidationSchema {
  body?: Joi.AnySchema<any>;
}

const validationHandler = (validationSchema: IValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let errorMessages: { [key: string]: { [key: string]: string } } = {};
      let errorExist = false;

      Object.keys(validationSchema)?.map((key: string) => {
        const schema = validationSchema.body
        const reqData = req.body;

        if (schema && reqData) {
          const { error } = schema.validate(reqData, {
            abortEarly: false,
            errors: {
              wrap: {
                label: "",
              },
            },
          });

          if (error) {
            errorExist = true;
            let messages: { [key: string]: string } = {};

            error.details?.map((err) => {
              messages[err.path[0]] = err.message;
            });

            errorMessages[key] = messages;
          }
        }
      });

      // check the error exist or not
      if (errorExist) {
        return res.status(422).send({
          success: false, message: "Validation Error!",
          error: { description: errorMessages.body, code: 422 },
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export { validationHandler };

