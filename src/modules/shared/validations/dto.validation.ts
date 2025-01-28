import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function _validateDto(dataToValidate, dto) {
  const dtoInstance = plainToInstance(dto, dataToValidate);
  let errors = await validate(dtoInstance as any);

  if (errors.length > 0) {
    errors = errors.map((error) => {
      return {
        property: error.property,
        errors: error.constraints,
      };
    });
    throw new BadRequestException(errors);
  }
  return dtoInstance;
}
