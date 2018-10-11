import { Controller, Get, Post, Body } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { isNullOrUndefined } from 'util';

class Expense {
    id: number;
    applicationDate: string;
    applicationNo: string;
    payee: string;
    status: string;
    selected: boolean;
}

class MockData {

    public static expenses: Expense[] = [
        {
            'id': 1,
            'applicationDate': '20181001',
            'applicationNo': 'App-01',
            'payee': '16990',
            'status': 'Export Pending',
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
            'applicationDate': '20181001',
            'applicationNo': 'App-03',
            'payee': 'abc',
            'status': 'Export Pending',
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
    ];

}

interface Criteria {
    applicationDate: string;
    applicationNo: string;
    payee: string;
}

@Controller('expense')
export class ExpenseController {

    @Get('/getAllExpenses')
    getAllExpenses(): Observable<Expense[]> {
        return of(MockData.expenses);
    }

    @Post('/getExpenses')
    getExpenses(@Body() parameter: Criteria): Observable<Expense[]> {
        console.log(`parameter: ${JSON.stringify(parameter)}`);

        return of(MockData.expenses.filter(
            expense => !this.isSomething(parameter.applicationDate) || expense.applicationDate === parameter.applicationDate
        ).filter(
            expense => !this.isSomething(parameter.applicationNo) || expense.applicationNo === parameter.applicationNo
        ).filter(
            expense => !this.isSomething(parameter.payee) || expense.payee === parameter.payee
        ));
    }

    @Post('/requestToExport')
    requestToExport(@Body() parameter: Number[]): Observable<any> {
        console.log(`parameter: ${JSON.stringify(parameter)}`);

        parameter.forEach(function (item) {
            MockData.expenses.find(expense => expense.id === item).status = 'Exported';
        });

        return of({ status: "true" });
    }

    private isSomething(something: any) {
        return (something !== undefined && something !== null && something !== '');
    }
}
