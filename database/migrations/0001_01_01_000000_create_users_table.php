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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->boolean('admin')->default(0);
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('authentication')->nullable();
            $table->string('loginApp')->nullable();
            $table->rememberToken();
            $table->string('language')->nullable();
            $table->string('settings')->nullable();

            $table->unsignedBigInteger('person_id')->nullable();
            $table->foreign('person_id')->references('id')->on('people')->onDelete('set null');
            
            $table->timestamps();
        });

        $date = gmdate('Y-m-d H:i:s');
        
        DB::table('users')->insert(
            [
                'admin' => 1,
                'name' => 'Admin',
                'email' => 'admin@protectoraxativa.org',                
                'password' => '$2y$12$U33xS7NDAFm.PPF0OvCyweZB.gayyWzsuvbSjgYqBxVgvZ6zFhQZC',
                'email_verified_at' => '2024-09-13 12:00:00', // $4&dm?1#n!%)·%=faN5T
                'created_at'    => $date,
                'updated_at'   => $date
            ]
        );

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
