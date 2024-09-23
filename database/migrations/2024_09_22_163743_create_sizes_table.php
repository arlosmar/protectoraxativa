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
        Schema::create('sizes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        $date = gmdate('Y-m-d H:i:s');

        DB::table('sizes')->insert(
            [
                [
                    'name' => 'xs',
                    'description' => 'Extra small',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 's',
                    'description' => 'Small',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'm',
                    'description' => 'Medium',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'l',
                    'description' => 'Large',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'xl',
                    'description' => 'Extra large',
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
        Schema::dropIfExists('sizes');
    }
};
