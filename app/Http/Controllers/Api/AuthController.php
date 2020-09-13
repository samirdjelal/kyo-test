<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
	public function login(Request $request)
	{
		$request->validate([
			'email' => 'required|email',
			'password' => 'required'
		]);
		$user = User::whereEmail($request->post('email'))->first();
		if (!$user || !Hash::check($request->post('password'), $user->password))  {
			throw ValidationException::withMessages([
				'email' => ["Incorrect email or password"]
			]);
		}
		return ['token' => $user->createToken('todoToken')->plainTextToken];
	}

	public function register(Request $request)
	{
		$request->validate([
			'name' => 'required',
			'email' => 'required|email',
			'password' => 'required',
			'password_confirm' => 'required'
		]);
		if ($request->post('password') != $request->post('password_confirm')) {
			throw ValidationException::withMessages([
				'password' => ["Password don't match"]
			]);
		}

		$user = User::create([
			'name' => $request->post('name'),
			'email' => $request->post('email'),
			'password' => Hash::make($request->post('password'))
		]);

		if (!$user) {
			throw ValidationException::withMessages([
				'name' => ["Something went wrong"]
			]);
		}

		return ['token' => $user->createToken('todoToken')->plainTextToken];
	}

	public function logout(Request $request)
	{
		return $request->user()->tokens;
	}


}
