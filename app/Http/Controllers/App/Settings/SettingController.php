<?php

namespace App\Http\Controllers\App\Settings;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Http\Resources\SettingResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;


class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {

        Gate::authorize('viewAny', Setting::class);

        $items = Setting::all();

        return Inertia::render('App/Settings/Index', [
            'data' => [
                'items' => SettingResource::collection($items)->keyBy('key'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $key)
    {
        $setting = Setting::where('key', $key)->firstOrFail();

        Gate::authorize('update', $setting);

        $setting->value = $request->value;
        $setting->save();

        return redirect()->back()->with([
            'alert' => [
                'type' => 'success',
                'message' => "Setting value successfully updated!",
            ],
        ]);
    }
}
