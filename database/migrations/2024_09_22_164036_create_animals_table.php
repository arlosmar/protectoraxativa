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
        Schema::create('animals', function (Blueprint $table) {
            
            $table->id();

            // to adopt, adopted, sponsored, etc.
            $table->unsignedBigInteger('status_id')->nullable();
            $table->foreign('status_id')->references('id')->on('statuses')->onDelete('set null');

            // dog, cat, etc.
            $table->unsignedBigInteger('type_id')->nullable();
            $table->foreign('type_id')->references('id')->on('types')->onDelete('set null');

            // puppy, adult
            $table->unsignedBigInteger('age_id')->nullable();
            $table->foreign('age_id')->references('id')->on('ages')->onDelete('set null');

            // male, female
            $table->unsignedBigInteger('gender_id')->nullable();
            $table->foreign('gender_id')->references('id')->on('genders')->onDelete('set null');

            // small, medium, large
            $table->unsignedBigInteger('size_id')->nullable();
            $table->foreign('size_id')->references('id')->on('sizes')->onDelete('set null');

            // bulldog, cocker, etc.
            $table->unsignedBigInteger('breed_id')->nullable();
            $table->foreign('breed_id')->references('id')->on('breeds')->onDelete('set null');

            $table->string('name')->nullable();
            $table->float('weight', precision: 2)->nullable();

            $table->date('birthdate')->nullable();
            $table->text('description')->nullable();
            $table->text('location')->nullable();

            $table->string('image')->nullable();

            $table->timestamps();
        });

        $date = gmdate('Y-m-d H:i:s');

        // from animals_0000001.jpg to animals_0000957.jpg
        $insert = [];
        for($i=1;$i<958;$i++){
            $insert[] = [
                'status_id' => '2', // adopted
                'image' => 'animals_'.str_pad($i,7,'0',STR_PAD_LEFT).'.jpg',
                'created_at'    => $date,
                'updated_at'    => $date
            ];
        }
        DB::table('animals')->insert($insert);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
