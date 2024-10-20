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
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('surname')->nullable();
            $table->string('dni')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();            
            $table->string('address')->nullable();
            $table->string('name2')->nullable();
            $table->string('surname2')->nullable();
            $table->string('dni2')->nullable();
            $table->date('birthdate2')->nullable();
            $table->string('email2')->nullable();
            $table->string('phone2')->nullable();
            $table->string('address2')->nullable();
            $table->string('file')->nullable();
            $table->string('file2')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        $date = gmdate('Y-m-d H:i:s');
        /*
        DB::table('people')->insert([
            [
                'name'  => 'Armando',
                'surname'  => 'L.',
                'dni'  => '12345678A',
                'birthdate'  => '1983-07-16',
                'email' => 'a@a.com',
                'phone' => '+34699123456',
                'address'   => 'calle',
                'name2'  => 'Armanda',
                'surname2'  => 'L.',
                'dni2'  => '87654321B',
                'birthdate2'  => '1984-06-15',
                'email2' => 'a2@a.com',
                'phone2' => '+34656123486',
                'address2'   => 'calle2',
                'file'  => null,
                'file2'  => null,
                'description'  => 'prueba',
                'created_at'    => $date,
                'updated_at'    => $date
            ]
        ]);
        */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('people');
    }
};
