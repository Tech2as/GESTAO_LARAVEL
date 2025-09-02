<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminUserController;


//Rotas do AuthController
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
//Route::middleware('auth:api')->get('/check-auth', [AuthController::class, 'checkAuth']);

//Rotas do Administrador
    Route::get('/usuarios/pendentes', [AdminUserController::class, 'listarPendentes']);
    Route::post('/usuarios/{id}/ativar', [AdminUserController::class, 'activate']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
