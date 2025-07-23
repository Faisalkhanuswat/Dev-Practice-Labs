import { ArgumentMetadata, BadRequestException, PipeTransform, UnprocessableEntityException } from "@nestjs/common";
import { validate } from "uuid";
import { AppCode } from "../code-enum";

export class ValidateIdPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata) {
        if (validate(value)) {
            return value
        }
        throw new UnprocessableEntityException({ message: "Invalid Id", code: AppCode.VALIDATION_ERROR })
    }
}