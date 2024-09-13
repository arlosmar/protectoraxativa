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
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        DB::table('tags')->insert(
            [
                ['name' => 'Friendship'],
                ['name' => 'Sports'],
                ['name' => 'Games'],
                ['name' => 'Love'],
                ['name' => 'Anime'],
                ['name' => 'Languages'],
                ['name' => 'Gambling'],
                ['name' => 'Art'],
                ['name' => 'Astronomy'],
                ['name' => 'Au Pairs'],
                ['name' => 'Dance'],
                ['name' => 'BDSM'],
                ['name' => 'Babies'],
                ['name' => 'Beauty'],
                ['name' => 'Sex'],
                ['name' => 'Camping'],
                ['name' => 'Religion'],
                ['name' => 'Celiacs'],
                ['name' => 'Science'],
                ['name' => 'Cinema'],
                ['name' => 'Coaching'],
                ['name' => 'Cooking'],
                ['name' => 'Colections'],
                ['name' => 'Comics'],
                ['name' => 'Travel'],
                ['name' => 'Accommodation'],
                ['name' => 'Buy/Sell'],
                ['name' => 'Music'],
                ['name' => 'Culture'],
                ['name' => 'Curses'],
                ['name' => 'Books'],
                ['name' => 'Economy'],
                ['name' => 'Jobs'],
                ['name' => 'Feminism'],
                ['name' => 'Philosophy'],
                ['name' => 'Flowers'],
                ['name' => 'Photography'],
                ['name' => 'Gastronomy'],
                ['name' => 'Gays'],
                ['name' => 'Gym'],
                ['name' => 'History'],
                ['name' => 'Horoscope'],
                ['name' => 'Humour'],
                ['name' => 'Computing'],
                ['name' => 'Real estate'],
                ['name' => 'Social networks'],
                ['name' => 'Gardening'],
                ['name' => 'Karaoke'],
                ['name' => 'Lesbians'],
                ['name' => 'Flirting'],
                ['name' => 'Mobiles'],
                ['name' => 'Magic'],
                ['name' => 'Manga'],
                ['name' => 'DIY'],
                ['name' => 'Marketing'],
                ['name' => 'Health'],
                ['name' => 'Fashion'],
                ['name' => 'Mountaineering'],
                ['name' => 'Motor'],
                ['name' => 'Business'],
                ['name' => 'Beach'],
                ['name' => 'Politics'],
                ['name' => 'Psicology'],
                ['name' => 'Recipes'],
                ['name' => 'Vegans'],
                ['name' => 'Vegetarians']
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tags');
    }
};
