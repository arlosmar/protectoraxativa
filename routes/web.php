<?php

//https://laravel.com/docs/11.x/routing#the-default-route-files

use App\Http\Controllers\{
    HomeController,
    AnimalController,
    NewsController,
    ContactController,
    SettingsController
};
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

Route::get('/versions', [HomeController::class, 'versions'])->name('versions');

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/ca', [HomeController::class, 'index'])->defaults('lang','ca')->name('home.ca');
Route::get('/es', [HomeController::class, 'index'])->defaults('lang','es')->name('home.es');
Route::get('/en', [HomeController::class, 'index'])->defaults('lang','en')->name('home.en');

Route::get('/colaboration', [HomeController::class, 'section'])->defaults('section','colaboration')->name('home.colaboration');
Route::get('/social', [HomeController::class, 'section'])->defaults('section','social')->name('home.social');
Route::get('/partners', [HomeController::class, 'section'])->defaults('section','partners')->name('home.partners');
Route::get('/info', [HomeController::class, 'section'])->defaults('section','info')->name('home.info');

Route::get('/terms', [HomeController::class, 'info'])->defaults('item','terms')->name('terms');
Route::get('/policy', [HomeController::class, 'info'])->defaults('item','policy')->name('policy');

Route::get('/animals/{section?}/{subsection?}/{page?}', [AnimalController::class, 'index'])->name('animals');
Route::get('/animalsget', [AnimalController::class, 'getList'])->name('animals.get');

Route::get('/news', [NewsController::class, 'index'])->name('news');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'contactSend'])->name('contact.send');

Route::put('settings/language', [SettingsController::class, 'languageUpdate'])->name('language.update');

require __DIR__.'/auth.php';