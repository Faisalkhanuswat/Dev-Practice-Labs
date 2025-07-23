import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { validateStatus } from "src/helpers/validate-status";
import { AppCode } from "../code-enum";

export class TaskStatusPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata) {
        if (value && validateStatus(value)) {
            return value
        }
        throw new BadRequestException({ message: "Invalid task status", code: AppCode.BAD_REQUEST });
    }
}