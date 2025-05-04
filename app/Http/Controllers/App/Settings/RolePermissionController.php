<?php

namespace App\Http\Controllers\App\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Inertia\Response;

class RolePermissionController extends Controller
{
    public $data;

    public function __construct()
    {
        $this->data = [];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Role::class);

        $rolesQuery = Role::with('permissions')
            ->where('name', '!=', 'super-user')
            //->when(config('app.env') !== 'local', fn($query) => $query->where('name', '!=', 'super-user'))
            ->withCount('users') // Оптимізований підрахунок користувачів у ролі
            ->latest('id')
            ->get();

        $permissions = Permission::all()->pluck('name');

        $roles = $rolesQuery->map(function ($role) use ($permissions) {
            return [
                'id'          => $role->id,
                'name'        => $role->name,
                'count'       => $role->users_count,
                'permissions' => $permissions->mapWithKeys(fn($perm) => [$perm => $role->hasPermissionTo($perm)])
            ];
        });

        return Inertia::render('App/Settings/RolePermissions/Index', [
            'data' => [
                'roles' => $roles,
                'permissions' => $permissions
            ]
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        Gate::authorize('create', Role::class);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        Gate::authorize('create', Role::class);
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
        Gate::authorize('view', $role);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role): Response
    {
        Gate::authorize('update', $role);

        $modelPermissions = $role->permissions()->get();
        $permissions = Permission::all()->pluck('name');

        // Повертаємо дані в компонент Inertia
        return Inertia::render('App/Settings/RolePermissions/Edit', [
            'data' => [
                'role' => $role, // Передаємо роль з дозволами
                'modelPermissions' => $modelPermissions, // Передаємо всі дозволи
                'permissions' => $permissions
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role): RedirectResponse
    {
        Gate::authorize('update', $role);

        $request->validate([
            'name'          => 'required|max:255|unique:roles,name,' . $role->id,
            'permissions'   => 'required',
            'permissions.*' => 'required|string|exists:permissions,name'
        ]);

        $permissions = Permission::whereIn('name', $request->permissions)->get();
        $role->syncPermissions($permissions);

        return redirect()->back()->with('success', 'Role has been updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        Gate::authorize('delete', $role);
        
        return $role;
    }
}
