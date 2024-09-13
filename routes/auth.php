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

use App\Http\Controllers\{GroupController,EventController,SettingsController};
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

    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('user', [AuthenticatedSessionController::class, 'create'])->name('user');

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});

Route::middleware(['auth','verified'])->group(function () {

    Route::get('/user', [ProfileController::class, 'user'])->name('user');

    Route::get('/user/{section}/{subsection}', [ProfileController::class, 'user']);

    Route::get('/user/groups', [ProfileController::class, 'user'])->defaults('section','groups')->name('user.groups');
    Route::get('/user/events', [ProfileController::class, 'user'])->defaults('section','events')->name('user.events');
    Route::get('/user/{section}', [ProfileController::class, 'user']);
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth','verified'])->group(function () {

    Route::get('/group/edit/{group}', [GroupController::class, 'edit'])->name('group.edit');
    Route::patch('/group/edit', [GroupController::class, 'editSave'])->name('group.edit.save');
    Route::get('/group/create', [GroupController::class, 'create'])->name('group.create');
});

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/event/edit/{event}', [EventController::class, 'edit'])->name('event.edit');
    Route::patch('/event/edit', [EventController::class, 'editSave'])->name('event.edit.save');
    Route::get('/event/create', [EventController::class, 'create'])->name('event.create');
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