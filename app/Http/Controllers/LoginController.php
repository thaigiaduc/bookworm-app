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

    // Đăng nhập
    public function login(LoginRequest $request) 
    {
        return $this->loginRepo->queryLogin($request);
    }

    // Đăng xuất
    public function logout(Request $request)
    {
        return $this->loginRepo->queryLogout($request);
    }
}
