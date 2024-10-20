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
    ProfileController
};

use App\Http\Controllers\{SettingsController,AnimalController,PersonController};
use Illuminate\Support\Facades\Route;


Route::middleware('guest')->group(function () {

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

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
     
    Route::get('google/callback', [AuthenticatedSessionController::class, 'googleCallback']);

    //Route::get('register', [RegisteredUserController::class, 'create'])->name('register');

    //Route::post('register', [RegisteredUserController::class, 'store']);

    //Route::get('user', [AuthenticatedSessionController::class, 'create'])->name('user');

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});

Route::middleware(['auth','verified'])->group(function () {

    Route::get('/user/profile/{subsection?}', [ProfileController::class, 'userProfile'])->name('user.profile');
    
    Route::get('/user/animals/{subsection?}/{page?}', [ProfileController::class, 'userAnimals'])->name('user.animals');
    
    Route::get('/user/{section?}/{page?}', [ProfileController::class, 'userSections'])->name('user');

    // to can return after edit. have name for the route
    Route::get('/user/people', [ProfileController::class, 'user'])->defaults('section','people')->name('user.people');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth','verified'])->group(function () {    
    Route::post('/animal/edit/{animal?}', [AnimalController::class, 'edit'])->name('animal.edit');
    Route::delete('/animal/delete/{animal?}', [AnimalController::class, 'delete'])->name('animal.delete');
});

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/peopleget', [PersonController::class, 'getList'])->name('people.get');
    //Route::patch('/person/edit', [PersonController::class, 'edit'])->name('person.edit');
    Route::patch('/person/edit/{person?}', [PersonController::class, 'edit'])->name('person.edit');
    Route::delete('/person/delete/{person?}', [PersonController::class, 'delete'])->name('person.delete');
});

Route::middleware(['auth','verified'])->group(function () {
    
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');    

    Route::put('settings', [SettingsController::class, 'update'])->name('settings.update');  
});

Route::middleware('auth')->group(function () {
    
    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware('throttle:6,1')->name('verification.send');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout.get');
});