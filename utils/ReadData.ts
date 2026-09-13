
// DataProvider in utils

import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

export class Dataprovider1 {

    // Read test data from JSON file
    static getTestDataFromJson(filePath: string): any {

        const data = JSON.parse(
            fs.readFileSync(filePath, 'utf8')
        );

        return data;
    }

    // Read test data from CSV file
    static getTestDataFromCsv(filePath: string): any[] {

        const data = parse(
            fs.readFileSync(filePath, 'utf8'),
            {
                columns: true,
                skip_empty_lines: true,
                trim: true
            }
        );

        return data;
    }
}

