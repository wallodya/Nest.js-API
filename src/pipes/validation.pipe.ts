/** @format */

import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common"
import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { ValdationException } from "src/exceptions/validation.exception"

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: any, metadata: ArgumentMetadata) {
		const obj = plainToClass(metadata.metatype, value)
		console.log("value", value)
		const errors = await validate(obj)
		console.log("errors", errors)
		if (errors.length) {
			let messages = errors.map(err => {
					const msg = `Value "${err.value}" of property "${err.property}" doesn't match the contraint(s):\n`
                    const constraints = Object.values(err.constraints).join(", ")
                    const res = msg + constraints
                    return res
			})
			console.log("messages", messages)
			throw new ValdationException(messages)
		}
		return value
	}
}
