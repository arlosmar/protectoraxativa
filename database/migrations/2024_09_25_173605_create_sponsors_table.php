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
        Schema::create('sponsors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        $date = gmdate('Y-m-d H:i:s');

        DB::table('sponsors')->insert(
            [
                [
                    'name' => 'not-sponsored',
                    'description' => 'To be sponsored',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'sponsored',
                    'description' => 'Sponsored',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'potentially-sponsor',
                    'description' => 'Potentially to be sponsored',
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
        Schema::dropIfExists('sponsors');
    }
};
