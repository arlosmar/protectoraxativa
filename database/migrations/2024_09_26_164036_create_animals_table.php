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

            $table->integer('code')->nullable();

            $table->boolean('hidden')->default(0);

            // to adopt, adopted
            $table->unsignedTinyInteger('status_id')->nullable();
            $table->foreign('status_id')->references('id')->on('statuses')->onDelete('set null');

            // sponsored or not and potentially to be sponsored
            $table->unsignedTinyInteger('sponsor_id')->nullable();
            $table->foreign('sponsor_id')->references('id')->on('sponsors')->onDelete('set null');

            // dog, cat, etc.
            $table->unsignedTinyInteger('type_id')->nullable();
            $table->foreign('type_id')->references('id')->on('types')->onDelete('set null');

            // puppy, adult
            $table->unsignedTinyInteger('age_id')->nullable();
            $table->foreign('age_id')->references('id')->on('ages')->onDelete('set null');

            // male, female
            $table->unsignedTinyInteger('gender_id')->nullable();
            $table->foreign('gender_id')->references('id')->on('genders')->onDelete('set null');

            // small, medium, large
            $table->unsignedTinyInteger('size_id')->nullable();
            $table->foreign('size_id')->references('id')->on('sizes')->onDelete('set null');

            // bulldog, cocker, etc.
            $table->unsignedSmallInteger('breed_id')->nullable();
            $table->foreign('breed_id')->references('id')->on('breeds')->onDelete('set null');

            $table->string('name')->nullable();
            $table->float('weight', precision: 2)->nullable();

            $table->dateTime('birthdate')->nullable();

            $table->boolean('dead')->default(0);
            $table->dateTime('deathdate')->nullable();
            
            $table->string('location')->nullable();

            $table->string('image')->nullable();
            $table->string('image2')->nullable();
            $table->string('image_sponsored')->nullable();

            $table->string('video')->nullable();
            $table->string('video2')->nullable();

            $table->text('vaccines')->nullable();
            $table->text('treatment')->nullable();

            $table->boolean('castrated')->default(0);

            $table->dateTime('date_entry')->nullable();
            $table->dateTime('date_exit')->nullable();
            $table->dateTime('date_entry2')->nullable();
            $table->dateTime('date_exit2')->nullable();

            $table->unsignedBigInteger('person_id')->nullable();
            $table->foreign('person_id')->references('id')->on('people')->onDelete('set null');

            $table->text('internal')->nullable();
            $table->text('description')->nullable();

            $table->timestamps();
        });

        /*
        $date = gmdate('Y-m-d H:i:s');

        // from animals_0000001.jpg to animals_0000957.jpg
        // sudo apt-get install rename
        // rename 's/animal_/animal_0000/' *

        $insert = [];

        // adopted
        for($i=1;$i<957;$i++){
            $insert[] = [
                'code'  => $i,
                'status_id' => '2', // adopted,
                'sponsor_id'    => '1', // not sponsored
                'image' => 'animal_'.str_pad($i,7,'0',STR_PAD_LEFT).'.jpg',
                'created_at'    => $date,
                'updated_at'    => $date
            ];
        }

        // sponsored 59
        for($i=957;$i<1017;$i++){
            $insert[] = [
                'code'  => $i,
                'status_id' => '1', // to be adopted
                'sponsor_id'    => '2', // sponsored
                'image' => 'animal_'.str_pad($i,7,'0',STR_PAD_LEFT).'.jpg',
                'created_at'    => $date,
                'updated_at'    => $date
            ];
        }

        // potentially to be sponsored 32
        for($i=1017;$i<1049;$i++){
            $insert[] = [
                'code'  => $i,
                'status_id' => '1', // to be adopted 
                'sponsor_id' => '3', // potentially to be sponsored
                'image' => 'animal_'.str_pad($i,7,'0',STR_PAD_LEFT).'.jpg',
                'created_at'    => $date,
                'updated_at'    => $date
            ];
        }

        // 1091
        // heaven 66
        for($i=1049;$i<1115;$i++){
            $insert[] = [
                'code'  => $i,
                'status_id' => '3', // heaven
                'sponsor_id' => '1', // not sponsored
                'image' => 'animal_'.str_pad($i,7,'0',STR_PAD_LEFT).'.jpg',
                'created_at'    => $date,
                'updated_at'    => $date
            ];
        }
        DB::table('animals')->insert($insert);
        */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
