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
        Schema::create('ages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        $date = gmdate('Y-m-d H:i:s');

        DB::table('ages')->insert(
            [
                [
                    'name' => 'puppy',
                    'description' => 'Puppy',
                    'created_at'    => $date,
                    'updated_at'    => $date
                ],
                [
                    'name' => 'adult',
                    'description' => 'Adult',
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
        Schema::dropIfExists('ages');
    }
};
