<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
       // Registrar novo usuário
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'OFICINA',
            'active'   => false,
        ]);

        return response()->json([
            'message' => 'Usuário registrado com sucesso!',
            'user'    => $user,
        ], 201);
    }

    // Login e geração do token
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $token = JWTAuth::attempt($credentials);

        if (!$token) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        $user = auth()->user();

        if (!$user->active) {
            return response()->json(['error' => 'Aguarde a ativação da sua conta'], 403);
        }

        return response()->json([
            'token' => $token,
            'user'  => [
                'id'    => $user->id,
                'name'  => $user->name,
                'role'  => $user->role,
                'email' => $user->email,
            ],
        ]);
    }

    // Autorização (rota protegida de teste)
    public function checkAuth()
    {
        return response()->json([
            'message' => 'Usuário autenticado',
            'user' => auth()->user()
        ]);
    }
}
