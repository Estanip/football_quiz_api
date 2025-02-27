import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Body, Get, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Role } from 'src/constants/role';
import { Roles } from 'src/modules/shared/decorators/roles.decorator';
import { SuccessResponseDto } from 'src/modules/shared/dto/success-response.dto';
import { BaseService } from 'src/modules/shared/services/base.service';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { _validateDto } from 'src/modules/shared/validations/dto.validation';
import { DeepPartial } from 'typeorm';

@ApiCookieAuth()
export class BaseController<T, CreateDto, GetDto> {
  constructor(
    protected readonly baseService: BaseService<T>,
    private readonly responseService: ResponseService,
    private readonly createDtoClass: new () => CreateDto,
    private readonly getDtoClass: new () => GetDto,
  ) {}

  @Get()
  @HttpCode(200)
  @CacheTTL(60000)
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @UseInterceptors(CacheInterceptor)
  async get(): Promise<SuccessResponseDto<GetDto[]>> {
    const data = await this.baseService.findAll();

    // Manual validation
    const dtoResult = (await _validateDto(data, this.getDtoClass)) as GetDto[];

    return this.responseService.success(true, HttpStatus.OK, 'Ok', dtoResult);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Roles(Role.Admin)
  async create(@Body() data: CreateDto): Promise<SuccessResponseDto<T>> {
    // Manual validation
    await _validateDto(data, this.createDtoClass);

    const createdEntity = await this.baseService.create(data as DeepPartial<T>);
    return this.responseService.success(
      true,
      HttpStatus.CREATED,
      'Entity created successfully',
      createdEntity,
    );
  }
}
