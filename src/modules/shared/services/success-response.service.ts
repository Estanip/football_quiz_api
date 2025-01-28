import { Injectable } from '@nestjs/common';
import { SuccessResponseDto } from 'src/modules/shared/dto/success-response.dto';

@Injectable()
export class ResponseService {
  success<T>(
    success = true,
    statusCode: number,
    message: string,
    data: T = {} as T,
  ): SuccessResponseDto<T> {
    return new SuccessResponseDto(success, statusCode, message, data);
  }
}
