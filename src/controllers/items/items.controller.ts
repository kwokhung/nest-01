import { Controller, Get, Post, Param, HttpCode, Header } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller('items')
export class ItemsController {

    @Get('/all')
    findAlla(): Observable<number[]> {
        return of([1, 2, 3]);
    }

}
