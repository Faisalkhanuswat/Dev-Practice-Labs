import { ArgumentMetadata, BadRequestException, HttpCode, HttpStatus, PipeTransform, UnprocessableEntityException } from "@nestjs/common";
import { ZodSchema } from "zod";
import { AppCode } from "../code-enum";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) { }

    transform(value: unknown, metadata: ArgumentMetadata) {
        if (
            value == null ||
            (typeof value === 'object' && Object.keys(value).length === 0)
        ) {
            throw new BadRequestException({
                message: 'Request body is required',
                code: AppCode.BAD_REQUEST
            },);
        }
        // 88888888888888888888888888888888888888888888888888888888888
        //                           Method 1
        // 88888888888888888888888888888888888888888888888888888888888
        // try {
        //     const parsedValue = this.schema.parse(value);
        //     return parsedValue;
        // } catch (e) {
        //     const errors = {};
        //     e.issues.forEach((el: any) => errors[el.path.join(".")] = el.message);
        //     throw new BadRequestException(errors);
        // }

        // 88888888888888888888888888888888888888888888888888888888888
        //                           Method 2
        // 88888888888888888888888888888888888888888888888888888888888

        const result = this.schema.safeParse(value);
        if (!result.success) {
            const formattedErrors = {}
            result.error.errors.forEach((err: any) => formattedErrors[err.path.join('.')] = err.message);
            throw new UnprocessableEntityException({
                message: "Validation Failed",
                code: AppCode.VALIDATION_ERROR,
                validationErrors: formattedErrors
            });
        }

        return result.data;

    }
}