<?php

//https://laravel.com/docs/11.x/routing#the-default-route-files

use App\Http\Controllers\{HomeController,GroupController,EventController,ContactController,SettingsController};
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

/*
Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/ca', [HomeController::class, 'index'])->defaults('lang','ca')->name('home.ca');
Route::get('/es', [HomeController::class, 'index'])->defaults('lang','es')->name('home.es');
Route::get('/en', [HomeController::class, 'index'])->defaults('lang','en')->name('home.en');

Route::get('/terms', [HomeController::class, 'info'])->defaults('item','terms')->name('terms');
Route::get('/policy', [HomeController::class, 'info'])->defaults('item','policy')->name('policy');

Route::get('/groups', [GroupController::class, 'index'])->name('groups');
Route::get('/groups/{type}', [GroupController::class, 'index']);

Route::get('/events', [EventController::class, 'index'])->name('events');
Route::get('/events/{type}', [EventController::class, 'index']);

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'contactSend'])->name('contact.send');

Route::put('settings/language', [SettingsController::class, 'languageUpdate'])->name('language.update');

require __DIR__.'/auth.php';