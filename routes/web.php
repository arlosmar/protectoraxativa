<?php

//https://laravel.com/docs/11.x/routing#the-default-route-files

use App\Http\Controllers\{
    HomeController,
    AnimalController,
    NewsController,
    ContactController,
    SettingsController,
    ExportController
};
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

use App\Mail\Contact;

use App\Events\{EventBroadcast};
//use App\Notifications\Notifications;

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
Route::get('/php', [HomeController::class, 'php'])->name('php');
Route::post('/save-token', [HomeController::class, 'saveToken'])->name('save.token');

//Route::get('/export', [ExportController::class, 'export'])->name('export');

// to preview email template without sending it
Route::get('/email/{template}', [HomeController::class, 'email'])->name('email');
Route::get('/mails/{type}', function ($type) {

    $values = [
        'name'  => 'test',
        'email' => 'test@test.com',
        'message'   => 'test'
    ];

    if($type === 'contact'){
        return new App\Mail\Contact($values);
    }
});

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

Route::get('/news/{page?}', [NewsController::class, 'index'])->name('news');
Route::get('/newsget', [NewsController::class, 'getList'])->name('news.get');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'contactSend'])->name('contact.send');

Route::put('settings/language', [SettingsController::class, 'languageUpdate'])->name('language.update');

require __DIR__.'/auth.php';