<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            'total'     => User::count() - 1,
            'previous'  => User::select('id')->whereHas('roles', function ($q) {
                $q->where('name', '!=', 'super-user');
            })
                ->whereYear('created_at', Carbon::now()->subMonth()->year)
                ->whereMonth('created_at', Carbon::now()->subMonth()->month)->count(),
            'new'   => User::select('id')->whereHas('roles', function ($q) {
                $q->where('name', '!=', 'super-user');
            })
                ->whereYear('created_at', Carbon::now()->year)
                ->whereMonth('created_at', Carbon::now()->month)->count()
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
