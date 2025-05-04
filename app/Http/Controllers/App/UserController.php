<?php

namespace App\Http\Controllers\App;

use App\Filters\UserFilter;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(UserFilter $filter): Response
    {
        Gate::authorize('viewAny', User::class);

        $users = User::filter($filter)
            ->whereHas('roles', fn($q) => env('APP_ENV') !== "local" ? $q->where('name', '!=', 'super-user') : null)
            ->latest('updated_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('App/Users/Index', [
            'data' => [
                'items' => UserResource::collection($users)
            ],
            'status'    => session('status'),
            'filters'   => request()->only(['search', 'status']),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        abort(404);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response
    {
        Gate::authorize('view', $user);

        return Inertia::render('App/Users/Show', [
            'data' => [
                'user' => $user,
                'role' => optional($user->roles->first())->name,
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * 
     */
    public function edit(User $user): Response
    {
        Gate::authorize('update', $user);

        return Inertia::render('App/Users/Edit', [
            'data' => [
                'user'  => $user,
                'role'  => optional($user->roles->first())->name,
                'roles' => Role::where('name', '!=', 'super-user')->get(),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        //
        Gate::authorize('update', [User::class, $user]);

        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($request->hasFile('avatar')) {
            $filename = Str::slug($user->full_name) . '.' . $request->file('avatar')->getClientOriginalExtension();
            $user->clearMediaCollection('avatars');
            $user->addMediaFromRequest('avatar')->setFileName($filename)->toMediaCollection('avatars');
        }

        if ($request->filled('role')) {
            $user->syncRoles([$request->role]);
        }

        $user->save();

        return Redirect::route('admin.users.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "User successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->clearMediaCollection('avatars');
        $user->delete();

        return Redirect::route('admin.users.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "User successfully deleted!",
            ],
        ]);
    }
}
