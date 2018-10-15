import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import * as path from 'path';
import * as fs from 'fs';

class Expense {
    id: number;
    applicationDate: string;
    applicationNo: string;
    payee: string;
    status: string;
    selected: boolean;
}

class ExportItem {
    id: number;
    date: string;
    name: string;
    path: string;
}

class MockData {

    public static batchNo: number = 1;

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
            'payee': 'def',
            'status': 'Exported',
            'selected': false
        },
        {
            'id': 5,
            'applicationDate': '20181004',
            'applicationNo': 'App-05',
            'payee': 'abc',
            'status': 'Export Pending',
            'selected': false
        }
    ];

    public static exportList: ExportItem[] = [
        {
            'id': 1,
            'date': '20181001',
            'name': 'App-01',
            'path': '16990'
        },
        {
            'id': 2,
            'date': '20181002',
            'name': 'App-02',
            'path': '59990'
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

        let now = new Date();
        let y = now.getFullYear();
        let m = now.getMonth() + 1;
        let d = now.getDate();
        let today = '' + y + (m < 10 ? '0' : '') + m + (d < 10 ? '0' : '') + d;

        let batchNo = '' + MockData.batchNo;
        while (batchNo.length < (3 || 2)) { batchNo = '0' + batchNo; }

        fs.writeFile(`C:/temp/export-${today}-${batchNo}.csv`, '"SeqNo","ExpenseId"\r\n', (err) => {
            if (err) {
                console.error(JSON.stringify(err));

                return of({ status: "false" });
            }
        });

        let seqNo: number = 1;

        parameter.forEach(function (item) {
            MockData.expenses.find(expense => expense.id === item).status = 'Exported';

            fs.appendFile(`C:/temp/export-${today}-${batchNo}.csv`, `"${seqNo++}","${item}"\r\n`, (err) => {
                if (err) {
                    console.error(JSON.stringify(err));

                    return of({ status: "false" });
                }
            });
        });

        MockData.batchNo++;

        return of({ status: "true" });
    }

    @Get('/getExportList')
    getExportList(): Observable<ExportItem[]> {
        return of(MockData.exportList);
    }

    @Get('/getExportItemFile')
    getExportItemFile(@Res() response): void {
        response.sendFile(path.resolve('C:/temp/export.csv'));
    }

    private isSomething(something: any) {
        return (something !== undefined && something !== null && something !== '');
    }
}
