<?php

use App\Http\Controllers\Auth\{
    AuthenticatedSessionController,
    ConfirmablePasswordController,
    EmailVerificationNotificationController,
    EmailVerificationPromptController,
    NewPasswordController,
    PasswordController,
    PasswordResetLinkController,
    RegisteredUserController,
    VerifyEmailController,
    ProfileController,
    AdminController
};

use App\Http\Controllers\{SettingsController,AnimalController,PersonController,NewsController};
use Illuminate\Support\Facades\Route;

use App\Http\Middleware\{Admin,User};


Route::middleware('guest')->group(function () {

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);
    Route::post('login/authentication/{user}', [AuthenticatedSessionController::class, 'authentication'])->name('login.authentication');

    // login google, etc.
    /*
    Route::get('/auth/redirect', function () {
        return Socialite::driver('google')->redirect();
    });
     
    Route::get('/auth/callback', function () {
        $user = Socialite::driver('google')->user();
     
        // $user->token
    });
    */
    Route::get('google', [AuthenticatedSessionController::class, 'google'])->name('google');
    //Route::get('apple', [AuthenticatedSessionController::class, 'apple'])->name('apple');
     
    Route::get('callback/{type}', [AuthenticatedSessionController::class, 'loginCallback']);

    // for mobile app
    Route::get('callbackapp/{platform}/{type}', [AuthenticatedSessionController::class, 'loginCallbackApp']);
    Route::get('registerapp/{platform}', [RegisteredUserController::class, 'registerApp']);

    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('user', [AuthenticatedSessionController::class, 'create'])->name('user');

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});

Route::middleware(['auth','verified'])->group(function () {
    
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('password', [PasswordController::class, 'update'])->name('password.update');    

    Route::post('settings', [SettingsController::class, 'update'])->name('settings.update');  
    Route::post('settings/authentication', [SettingsController::class, 'authentication'])->name('settings.authentication');  
});

Route::middleware('auth')->group(function () {
    
    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware('throttle:6,1')->name('verification.send');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout.get');
});

////////////////////////////////////////////////
// for common users, not admin
////////////////////////////////////////////////
Route::middleware(['auth','verified',User::class])->group(function () {

    Route::get('/intranet/settings', [ProfileController::class, 'intranet'])->defaults('section','settings')->name('intranet.settings');

    Route::get('/intranet/{section?}/{subsection?}', [ProfileController::class, 'intranet'])->name('intranet');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    
    // patch not working on the server
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

////////////////////////////////////////////////
// only admins
////////////////////////////////////////////////
Route::middleware(['auth','verified',Admin::class])->group(function () {
    Route::post('send-notification', [AdminController::class, 'sendNotification'])->name('send.notification');
    Route::patch('/admin', [AdminController::class, 'update'])->name('admin.update');
    Route::delete('/admin', [AdminController::class, 'destroy'])->name('admin.destroy');

    // to test firebase notifications
    //Route::get('/firebase', [AdminController::class, 'firebase']);
});

Route::middleware(['auth','verified',Admin::class])->group(function () {
    
    Route::get('/admin/animals/{subsection?}/{page?}', [AdminController::class, 'adminAnimals'])->name('admin.animals');

    Route::get('/admin/settings', [AdminController::class, 'admin'])->defaults('section','settings')->name('admin.settings');

    Route::get('/admin/account/info', [AdminController::class, 'adminAccount'])->name('admin.account.info');
    Route::get('/admin/account/{subsection?}', [AdminController::class, 'adminAccount'])->name('admin.account');
    
    Route::get('/admin/{section?}/{page?}', [AdminController::class, 'adminSections'])->name('admin');

    // to can return after edit. have name for the route
    Route::get('/admin/people', [AdminController::class, 'admin'])->defaults('section','people')->name('admin.people');

    // to can return after edit. have name for the route
    Route::get('/admin/news', [AdminController::class, 'admin'])->defaults('section','news')->name('admin.news');
});

Route::middleware(['auth','verified',Admin::class])->group(function () {  

    // optional parameter because if creating you don't have any animal  
    Route::post('/animal/edit/{animal?}', [AnimalController::class, 'edit'])->name('animal.edit');

    Route::post('/animal/delete/{animal}', [AnimalController::class, 'delete'])->name('animal.delete');

    // upload images with rich text editor
    Route::post('/animal/upload', [AnimalController::class, 'upload'])->name('animal.upload');
});

Route::middleware(['auth','verified',Admin::class])->group(function () {
    
    Route::get('/peopleget', [PersonController::class, 'getList'])->name('people.get');
    //Route::patch('/person/edit', [PersonController::class, 'edit'])->name('person.edit');
    
    // optional parameter because if creating you don't have any person
    Route::post('/person/edit/{person?}', [PersonController::class, 'edit'])->name('person.edit');

    Route::post('/person/delete/{person}', [PersonController::class, 'delete'])->name('person.delete');

    // upload images with rich text editor
    Route::post('/person/upload', [PersonController::class, 'upload'])->name('person.upload');
});

Route::middleware(['auth','verified',Admin::class])->group(function () {
    
    Route::get('/newsuserget', [NewsController::class, 'getUserList'])->name('news.user.get');

    // optional parameter because if creating you don't have any news
    Route::post('/news/edit/{news?}', [NewsController::class, 'edit'])->name('news.edit');

    Route::post('/news/delete/{news}', [NewsController::class, 'delete'])->name('news.delete');
    Route::post('/news/delete-massive', [NewsController::class, 'deleteMassive'])->name('news.delete.massive');

    // upload images with rich text editor
    Route::post('/news/upload', [NewsController::class, 'upload'])->name('news.upload');
});