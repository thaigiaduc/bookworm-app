<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Repositories\Login\LoginRepository;
class LoginController extends Controller
{
    protected $loginRepo;
    
    public function __construct(LoginRepository $loginRepo)
    {
        $this->loginRepo = $loginRepo;
    }

    // public function store(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => ['required', 'email'],
    //         'password' => ['required'],
    //     ]);

    //     if (Auth::attempt($credentials)) {
    //         $user = Auth::user();
    //         return response()->json($user);
    //     }
    //     return response()->json('Login failed: Invalid username or password.', 422);
    // }

    // public function destroy(Request $request)
    // {
    //     Auth::logout();
    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();
    //     return response('', 204);
    // }

    // public function login(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => ['required', 'email'],
    //         'password' => ['required'],
    //     ]);

    //     if (Auth::attempt($credentials)) {
    //         $user = Auth::user();
    //         $user->access_token = $user->createToken("API_TOKEN")->plainTextToken;
    //         return response()->json($user);
    //     }
    //     return response()->json('Login failed: Invalid username or password.', 422);
    // }

    // public function logout(Request $request)
    // {
    //     auth()->user()->tokens()->delete();
    //     return response()->json('', 204);
    // }

    public function login(LoginRequest $request) 
    {
        return $this->loginRepo->queryLogin($request);
    }

    public function logout(Request $request)
    {
        return $this->loginRepo->queryLogout($request);
    }
}
