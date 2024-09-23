<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('breeds', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        $date = gmdate('Y-m-d H:i:s');

        DB::table('breeds')->insert(
            [
                [
                    'name' => 'pitbull',
                    'description' => 'Pitbull',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'yorkshire',
                    'description' => 'Yorkshire',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'cocker-english',
                    'description' => 'English Cocker',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'cocker-spanish',
                    'description' => 'Spanish Cocker',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'boxer',
                    'description' => 'Boxer',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'poodle',
                    'description' => 'Caniche',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'bulldog-english',
                    'description' => 'English Bulldog',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'bulldog-french',
                    'description' => 'French Bulldog',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ]
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('breeds');
    }
};
