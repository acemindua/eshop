<?php

namespace App\Http\Controllers\Admin;

use App\Facades\Settings;
use App\Filters\UserFilter;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

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
            ->orderByDesc('last_activity')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page'))
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'data' => [
                'users' => UserResource::collection($users)
            ],
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
        Gate::authorize('create', User::class);

        return Inertia::render('Admin/Users/Create', [
            'data' => [],

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        //
        Gate::authorize('create', User::class);

        $user = User::create($request->validated());

        if ($request->hasFile('avatar')) {
            $filename = Str::slug($user->full_name) . '.' . $request->file('avatar')->getClientOriginalExtension();
            $user->clearMediaCollection('avatars');
            $user->addMediaFromRequest('avatar')->setFileName($filename)->toMediaCollection('avatars');
        }

        if ($request->filled('role')) {
            $user->syncRoles([$request->role]);
        }

        return redirect()->route('admin.users.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "User `" . $user->name . "` successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response
    {
        Gate::authorize('view', User::class);

        return Inertia::render('Admin/Users/Show', [
            'data' => [
                'user' => $user
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        Gate::authorize('update', $user);

        return Inertia::render('Admin/Users/Edit', [
            'data' => [
                'user' => $user
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        //
        Gate::authorize('update', $user);

        $user->fill($request->validated());

        if ($request->hasFile('avatar')) {
            $filename = Str::slug($user->full_name) . '.' . $request->file('avatar')->getClientOriginalExtension();
            $user->clearMediaCollection('avatars');
            $user->addMediaFromRequest('avatar')->setFileName($filename)->toMediaCollection('avatars');
        }

        if ($request->filled('role')) {
            $user->syncRoles([$request->role]);
        }

        $user->save();

        return redirect()->route('admin.users.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "User `" . $user->name . "` successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        //
        Gate::authorize('delete', $user);

        $user->clearMediaCollection('avatars');
        $user->delete();

        return redirect()->route('admin.users.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "User `" . $user->name . "` successfully deleted!",
            ],
        ]);
    }
}
