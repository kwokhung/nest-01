import { Controller, Get, Post, Param, HttpCode, Header } from '@nestjs/common';
import { Observable, of } from 'rxjs';

class Expense {
    id: number;
    applicationDate: string;
    applicationNo: string;
    payee: string;
    status: string;
    selected: boolean;
}

@Controller('expense')
export class ExpenseController {

    @Get('/getExpenses')
    getExpenses(): Observable<Expense[]> {
        return of([
            {
                'id': 1,
                'applicationDate': '20181001',
                'applicationNo': 'App-01',
                'payee': '16990',
                'status': '',
                'selected': false
            },
            {
                'id': 2,
                'applicationDate': '20181002',
                'applicationNo': 'App-02',
                'payee': '59990',
                'status': 'Exported',
                'selected': false
            },
            {
                'id': 3,
                'applicationDate': '20181003',
                'applicationNo': 'App-03',
                'payee': 'abc',
                'status': '',
                'selected': false
            },
            {
                'id': 4,
                'applicationDate': '20181004',
                'applicationNo': 'App-04',
                'payee': 'abc',
                'status': 'Exported',
                'selected': false
            }
        ]);
    }

}
