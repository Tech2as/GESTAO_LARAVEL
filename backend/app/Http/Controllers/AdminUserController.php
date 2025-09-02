<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminUserController extends Controller
{
    
   public function listarPendentes()
{
    $usuariosPendentes = User::where('active', false)->paginate(5);

    return response()->json($usuariosPendentes);
}

}
