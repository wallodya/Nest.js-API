import { HttpException, HttpStatus } from "@nestjs/common";

export class ValdationException extends HttpException {
    messages
    constructor(messages) {
        super(messages, HttpStatus.BAD_REQUEST )
        this.messages = messages
    }
}