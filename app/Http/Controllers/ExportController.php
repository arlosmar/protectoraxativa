<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;

use Illuminate\Http\Request;

// https://packagist.org/packages/phpoffice/phpspreadsheet
// https://medium.com/@adiyasaa56/a-guide-to-export-excel-in-laravel-using-phpspreadsheet-ac0a21e0ae63
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class ExportController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function export(Request $request) : JsonResponse
    {

        try{
            
            $values = $request->all();            

            if(isset($values['rows']) && !empty($values['rows'])){
                
                $spreadsheet = new Spreadsheet();
                $sheet = $spreadsheet->getActiveSheet();

                $title = 'Excel';
                if(isset($values['title']) && !empty($values['title'])){
                    $title = $values['title'];
                }

                $sheet->setTitle($title); // This is where you set the title 

                $rowNumber = 1;
                if(isset($values['columns']) && !empty($values['columns'])){
                    
                    $rowNumber = 2;
                    $sheet->fromArray($values['columns'], NULL, 'A1');
                    /*
                    foreach($values['columns'] as $column){
                        $sheet->setCellValue('A1', 'No'); // This is where you set the column header
                    }
                    */
                }

                /*
                // This is the loop to populate data
                for ($i=1; $i < 5; $i++) { 
                    $sheet->setCellValue('A' . $row, $i);
                    $sheet->setCellValue('B' . $row, "People ".$i);
                    $row++;
                
                } 
                */

                foreach($values['rows'] as $row){
                    $sheet->fromArray($row, NULL, 'A'.$rowNumber);
                    $rowNumber++;
                }

                $writer = new Xlsx($spreadsheet);
                $fileName = $title;
                header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                header("Content-Disposition: attachment;filename=\"$fileName\"");
                $writer->save("php://output");
                exit();
            }
            else{
                return response()->json(['result' => false]);
            }
        }
        catch(\Exception $e){
            //echo '<pre>'.print_r($e,true).'</pre>';die;
            return response()->json(['result' => false]);
        }
    }
}