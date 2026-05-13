<?php

namespace App\Http\Controllers\Admin;

use App\Filters\ShippingFilter;
use App\Http\Controllers\Controller;
use App\Models\Shipping;
use App\Http\Resources\ShippingResource;
use App\Http\Requests\StoreShippingRequest;
use App\Http\Requests\UpdateShippingRequest;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ShippingController extends Controller
{
    /**
     * Список усіх служб доставки.
     */
    public function index(ShippingFilter $filter): Response
    {
        Gate::authorize('viewAny', Shipping::class);

        $shippings = Shipping::filter($filter)
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return inertia('Admin/Settings/Shippings/Index', [
            'data' => [
                'shippings' => ShippingResource::collection($shippings),
            ],

            'filters' => request()->all(['search', 'is_active', 'sort']),
        ]);
    }

    /**
     * Форма редагування конкретної служби.
     */
    public function edit(Shipping $shipping): Response
    {
        Gate::authorize('update', $shipping);

        return Inertia::render('Admin/Settings/Shippings/Edit', [
            'shipping' => new ShippingResource($shipping),
        ]);
    }

    /**
     * Оновлення налаштувань служби.
     */
    public function update(UpdateShippingRequest $request, Shipping $shipping): RedirectResponse
    {
        Gate::authorize('update', $shipping);

        $data = $request->validated();

        // Перевіряємо через 'alias', як домовлялися раніше
        if ($shipping->alias === 'nova_poshta' && isset($data['settings']['api_key'])) {
            // Якщо ти хочеш дублювати ключ у глобальний конфіг Settings
            \App\Facades\Settings::set('nova_poshta_key', $data['settings']['api_key']);
        }

        $shipping->update($data);

        return redirect()->route('admin.settings.shippings.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Налаштування доставки `{$shipping->name}` оновлено.",
            ],
        ]);
    }

    /**
     * Швидке перемикання статусу.
     */
    public function toggle(Shipping $shipping): RedirectResponse
    {
        Gate::authorize('update', $shipping);

        $shipping->update(['is_active' => !$shipping->is_active]);

        return back()->with([
            'alert' => [
                'type' => 'success',
                'message' => 'Статус доставки змінено.',
            ],
        ]);
    }

    /**
     * Створення (якщо агро-бізнес додасть власну логістику)
     */
    public function store(StoreShippingRequest $request): RedirectResponse
    {
        Gate::authorize('create', Shipping::class);

        $shipping = Shipping::create($request->validated());

        return redirect()->route('admin.shippings.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Метод доставки `{$shipping->name}` додано.",
            ],
        ]);
    }
}
