<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});

Route::get('/', [HomeController::class, 'index']);

//todo: re-route the react components when reloaded.
Route::get('/login', [HomeController::class, 'index']);
Route::get('/todos', [HomeController::class, 'index']);
Route::get('/logout', [HomeController::class, 'index']);
Route::get('/register', [HomeController::class, 'index']);
