"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = void 0;
const validationHandler = (validationSchema) => {
    return (req, res, next) => {
        var _a;
        try {
            let errorMessages = {};
            let errorExist = false;
            (_a = Object.keys(validationSchema)) === null || _a === void 0 ? void 0 : _a.map((key) => {
                var _a;
                const schema = validationSchema.body;
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
                        let messages = {};
                        (_a = error.details) === null || _a === void 0 ? void 0 : _a.map((err) => {
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
        }
        catch (err) {
            next(err);
        }
    };
};
exports.validationHandler = validationHandler;
