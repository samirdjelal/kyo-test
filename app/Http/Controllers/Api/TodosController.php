<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todos;
use App\Models\User;
use Illuminate\Http\Request;

class TodosController extends Controller
{

	public function index(Request $request)
	{
//		$todos = Todos::whereId($request->user()->id)->get()->pluck('text');
		$todos = Todos::all()->pluck('text');
		return ['list' => $todos];
	}

	public function add(Request $request)
	{
		$request->validate([
			"text" => "required|string"
		]);
		$todo = Todos::create([
			"text" => $request->post('text'),
			"user_id" => $request->user()->id
		]);
		return $todo->id;
	}

	public function edit()
	{
		return 'edit';
	}

	public function remove()
	{
		return 'remove';
	}
}
