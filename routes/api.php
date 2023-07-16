<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//CREATE POST LOGIN ROUTE

Route::post('/login', function (Request $request) {
    if (! Auth::attempt($request->only('email', 'password'))) {
        return response(['message' => __('auth.failed')], 422);
    }
 
    $token = auth()->user()->createToken('client');
 
    return ['token' => $token->plainTextToken];
});


//CREATE POST LOGOUT ROUTE

Route::post('/logout', function (Request $request) {
    Auth::logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return response()->json([
        'message' => 'User logged out'
    ], 200);
});


//get user data route
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');