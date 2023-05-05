import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Headers, HttpException, HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Response,
    UnauthorizedException
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TablesService} from "./tables.service";
import {CreateTableDto} from "./dto/create-table.dto";
import {Tables} from "./table.model";
import {isLogLevelEnabled} from "@nestjs/common/services/utils";

@ApiTags('tables')
@Controller('tables')
export class TablesController {

    constructor(private tableService: TablesService) {
    }

    @Post()
    @ApiResponse({status: 200})
    @ApiOperation({ summary: 'Создаёт таблицу' })
    create(@Body() tableDto: CreateTableDto,
           @Headers() headers: any) {
        const auth = this.tableService.authGuard(tableDto.projectId)
        auth.then((data: any) => {
            console.log(data, headers)
        })
        return this.tableService.createTable(tableDto)
    }

    @Post('/:tableName')
    @ApiResponse({status: 200})
    @ApiOperation({ summary: 'Добавляет значение в таблицу' })
    addValue(@Body() dto: any,
             @Param('tableName') tableName: string,
             @Headers() headers: any) {
        const auth = this.tableService.authGuard(dto.projectId)
        console.log(dto)
        auth.then((data: any) => {
            if (headers.guard === data) {
                return this.tableService.addValueByTableName(tableName, dto.data)
            }
        })
        /*throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Доступ запрещен'
        }, HttpStatus.FORBIDDEN)*/

    }

    @Get()
    @ApiResponse({status: 200, type: [Tables]})
    @ApiOperation({ summary: 'Получаем все таблицы' })
    getAll() {
        return this.tableService.getAllTables()
    }


    @Get(':tableName')
    @ApiResponse({status: 200})
    @ApiOperation({ summary: 'Получает все значения из таблицы' })
    getByName(@Param('tableName') tableName: string,
              @Response() response: any,
              @Query('page') page?: number,
              @Query('limit') limit?: number,) {
        const data = this.tableService.getTableByTableName(tableName, page, limit);
        data.then((data:any) => {
            response.setHeader('x-total-count', data?.total);
            return response.send(data.data)
        })

    }

    @Get('/user/:userId')
    @ApiResponse({status: 200, type: [Tables]})
    @ApiOperation({ summary: 'Получает все таблицы пользователя' })
    getByUserName(@Param('userId') userId: string) {
        // console.log(1)
        return this.tableService.getTablesByUseName(userId)
    }

    @Get(':tableName/meta')
    @ApiResponse({status: 200})
    @ApiOperation({ summary: 'Получает типы колонок таблицы' })
    getMetaData(@Param('tableName') tableName: string) {
        return this.tableService.getMetaDataByTableName(tableName);
    }

    @Get(':tableName/:id')
    @ApiResponse({status: 200})
    @ApiOperation({ summary: 'Получает значение из таблицы по id' })
    getValueByName(@Param('tableName') tableName: string, @Param('id') id: string) {
        return this.tableService.getValueFromTable(tableName, id);
    }

    @Put(':tableName/:id')
    @ApiResponse({status: 200})
    @ApiOperation({ summary: 'Изменяет значение из таблицы по id' })
    updateValueByName(@Param('tableName') tableName: string, @Param('id') id: string, @Body() dto: any) {
        return this.tableService.updateValueFromTable(tableName, id, dto)
    }

    @Delete(':tableName')
    @ApiResponse({status:200})
    @ApiOperation({ summary: 'Удаляет таблицу' })
    deleteTable(@Param('tableName') tableName: string){
        return this.tableService.deleteTableByTableName(tableName)
    }

    @Delete(':tableName/:id')
    @ApiResponse({status: 200})
    @ApiOperation({ summary: 'Удаляет значение из таблицы по id' })
    deleteValueByName(@Param('tableName') tableName: string, @Param('id') id: string) {
        return this.tableService.deleteValueFromTable(tableName, id)
    }
}
