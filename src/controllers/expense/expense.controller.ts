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

class MockData {

    public static Expenses: Expense[] = [
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
        }
    ];

}

@Controller('expense')
export class ExpenseController {

    @Get('/getAllExpenses')
    getAllExpenses(): Observable<Expense[]> {
        return of(MockData.Expenses);
    }

}
