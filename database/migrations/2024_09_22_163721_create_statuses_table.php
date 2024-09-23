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
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        $date = gmdate('Y-m-d H:i:s');

        DB::table('statuses')->insert(
            [
                [
                    'name' => 'adopt',
                    'description' => 'To be adopted',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'adopted',
                    'description' => 'Adopted',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'sponsor',
                    'description' => 'To be sponsored',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'sponsored',
                    'description' => 'To be sponsored',
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
        Schema::dropIfExists('statuses');
    }
};
