<?php
namespace App\Repositories\Login;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginRepository
{
    //lấy model tương ứng
    protected $loginRepo;
    public function queryLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken("API_TOKEN")->plainTextToken;
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'data' => $user,
                'status_code' => 200,
            ], 200);
        }

        return response()->json('Login failed: Invalid username or password.', 422);
    }

    public function queryLogout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete();
        return response()->json([
            'message' => 'Logout',
            'status_code' => 204,
        ]);
    }

}