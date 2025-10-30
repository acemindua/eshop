<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    // Dashboard
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'status' => session('status'),
        ]);
    }

    // Settings
    public function settings(): Response
    {
        return Inertia::render('Admin/Settings', [
            'status' => session('status'),
        ]);
    }
}
