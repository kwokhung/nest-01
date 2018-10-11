import { Controller, Get, Post, Param, HttpCode, Header } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller('cats')
export class CatsController {
    
    @Get('/type/:id')
    findOne(@Param('id') id) {
        console.log(id);
        return `This action returns a ${id} cat`;
    }

    @Get('/a')
    async findAll(): Promise<{}> {
        return new Promise(function (resolve, reject) {
            setInterval(resolve, 1000, 'foo');
        });
    }

    @Get('/b')
    findAlla(): Observable<number> {
        return of(1, 2, 3);
    }

    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    create() {
        return 'This action adds a new cat';
    }

}
