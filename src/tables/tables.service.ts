import {Injectable} from '@nestjs/common';
import {CreateTableDto} from "./dto/create-table.dto";
import {pool} from '../db/database'
import {InjectModel} from "@nestjs/sequelize";
import {Tables} from "./table.model";
import {ProjectsService} from "../projects/projects.service";

@Injectable()
export class TablesService {

    constructor(@InjectModel(Tables) private tableRepository: typeof Tables ) {
    }


    async getAllTables() {
        return this.tableRepository.findAll();
    }

    async authGuard(projectId: string) {
        const queryString = `select * from projects where id=${projectId} `

        try {
            const data = await pool.query(queryString)
            return data.rows[0].key
            //
        } catch (e) {
            console.log(e)
        } finally {

        }
    }

    async getTablesByUseName(userId: string) {
        //return this.tableRepository.findAll({where: {userId}})
    }

    async createTable(dto: CreateTableDto) {

        let tableColumns = '';

        for (const column of dto.columns) {
            tableColumns += ` , ${column.label}`
            switch (column.type) {
                case 'string': {
                    tableColumns += ' text'
                    break
                }
                case 'integer': {
                    tableColumns += ' int'
                    break
                }
                case 'boolean': {
                    tableColumns += ' boolean'
                    break
                }
                default: {
                    tableColumns += ' text'
                    break
                }

            }
        }

        const queryString = `create table ${dto.userName}_${dto.name} (ID SERIAL PRIMARY KEY ${tableColumns});`

        try {
            await pool.query(queryString);
            return await this.tableRepository.create({name: `${dto.name}`, tableName: `${dto.userName}_${dto.name}` , projectId: `${dto.projectId}`})
        } catch (e) {
            console.log(e.stack);
        } finally {
            // pool.end();
        }

    }

    async addValueByTableName(tableName: string, dto: any) {
        const inputProps = []
        let tableColumns = []

        for (const [key, value] of Object.entries(dto)) {
            inputProps.push(key)
            tableColumns.push("'" + value + "'")
        }
        const queryString = "insert into " + tableName + " (" + inputProps.join(',') + ") values (" + tableColumns.join(',') + ");"

        try {
            await pool.query(queryString)
        } catch (e) {
            console.log(e)
        } finally {

        }
    }

    async getTableByTableName(tableName: string, page: number, limit: number) {
        const queryString = `Select * from ${tableName}`
        const minLimit = (page - 1) * limit
        const maxLimit = limit * page

        try {
            const res = await pool.query(queryString);
            if (page) {
                return {data: res.rows.slice(minLimit, maxLimit), total: res.rowCount}
            }
            return {data: res.rows, total: res.rowCount}
        } catch (e) {
            console.log(e.stack);
        } finally {
            // pool.end();
        }
    }

    async getMetaDataByTableName(tableName: string) {
        const queryString = 'select column_name, data_type from  information_schema.columns where  table_name =' + "'" + tableName + "'" + ';'

        try {
            const res = await pool.query(queryString)

            return res.rows.filter((row) => {
                if (row.column_name !== 'id') {
                    return row
                }
            })
        } catch (e) {
            console.log(e.stack);
        } finally {
            // pool.end();
        }
    }

    async getValueFromTable(tableName: string, id: string) {
        const queryString = `Select * from ${tableName} where id=${id}`

        try {
            const res = await pool.query(queryString);
            return res.rows
        } catch (e) {
            console.log(e.stack);
        } finally {
            // pool.end();
        }
    }

    async updateValueFromTable(tableName: string, id: string, dto: any) {
        const queryString = `update ${tableName} set `
        let str = ''

        const meta = await this.getMetaDataByTableName(tableName)

        let body = []
        // console.log(meta)
        // console.log(dto)
        for (let i = 0; i < meta.length; i++) {
            str = ''
            str = meta[i].column_name + "="
            switch (meta[i].data_type) {
                case 'text': {
                    str += "'" + Object.entries(dto)[i][1] + "'"
                    break;
                }
                case 'integer': {
                    str += Object.entries(dto)[i][1]
                    break;
                }
                case 'boolean': {
                    str += Object.entries(dto)[i][1]
                    break;
                }
                default: {
                    break;
                }
            }
            body.push(str)
            // console.log(str)
        }
        console.log(queryString + body.join(',') + ' where id=' + id + ";")

        try {
            await pool.query(queryString + body.join(',') + ' where id=' + id + ";");
        } catch (e) {
            console.log(e.stack);
        } finally {
            // pool.end();
        }
    }

    async deleteTableByTableName(tableName: string) {
        const queryString = `drop table ${tableName}`

        try {
            await pool.query(queryString);
            return await this.tableRepository.destroy({where: {tableName}})
        } catch (e) {
            console.log(e.stack);
        } finally {

        }
    }

    async deleteValueFromTable(tableName: string, id: string) {
        const queryString = `delete from ${tableName} where id=${id}`

        try {
            await pool.query(queryString);
        } catch (e) {
            console.log(e.stack);
        } finally {
            // pool.end();
        }
    }
}
