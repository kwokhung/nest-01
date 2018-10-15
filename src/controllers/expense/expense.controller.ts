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
    batchNo: string;
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
            'status': 'Export Pending',
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
            'status': 'Export Pending',
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
            'batchNo': '001'
        },
        {
            'id': 2,
            'date': '20181002',
            'batchNo': '001'
        },
        {
            'id': 3,
            'date': '20181002',
            'batchNo': '002'
        }
    ];

}

interface SearchCriteria {
    applicationDate: string;
    applicationNo: string;
    payee: string;
}

interface DownloadExportCriteria {
    date: string;
    batchNo: string;
}

@Controller('expense')
export class ExpenseController {

    @Get('/getAllExpenses')
    getAllExpenses(): Observable<Expense[]> {
        return of(MockData.expenses);
    }

    @Post('/getExpenses')
    getExpenses(@Body() parameter: SearchCriteria): Observable<Expense[]> {
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

        fs.writeFileSync(`C:/temp/export-${today}-${batchNo}.csv`, '"SeqNo","ExpenseId","ApplicationNo"\r\n');

        let seqNo: number = 1;

        parameter.forEach((item) => {
            let expense = MockData.expenses.find(expense => expense.id === item);
            expense.status = 'Exported';

            fs.appendFileSync(`C:/temp/export-${today}-${batchNo}.csv`, `"${seqNo++}","${item}","${expense.applicationNo}"\r\n`);
        });

        MockData.batchNo++;

        return of({ status: "true" });
    }

    @Get('/getExportList')
    getExportList(): Observable<ExportItem[]> {
        let exportList: ExportItem[] = [];
        let id = 1;

        fs.readdirSync('C:/temp').forEach(file => {
            let matches = file.match(/^export-(\d{8})-(\d{3}).csv$/);

            if (matches) {
                //console.log(matches);
                exportList.push({ id: id++, date: matches[1], batchNo: matches[2] });
            }
        });

        return of(exportList);
    }

    @Post('/getExportItemFile')
    getExportItemFile(@Body() parameter: DownloadExportCriteria, @Res() response): void {
        response.sendFile(path.resolve(`C:/temp/export-${parameter.date}-${parameter.batchNo}.csv`));
    }

    private isSomething(something: any) {
        return (something !== undefined && something !== null && something !== '');
    }
}
