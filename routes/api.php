<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TodosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group(["middleware" => ['auth:sanctum']], function () {
	Route::get('/logout', [AuthController::class, 'logout']);

	Route::get('/todos', [TodosController::class, 'index']);
	Route::post('/todos', [TodosController::class, 'add']);
	Route::put('/todos', [TodosController::class, 'edit']);
	Route::delete('/todos', [TodosController::class, 'remove']);
});


//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
