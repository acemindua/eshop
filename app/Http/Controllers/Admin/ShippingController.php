<?php

namespace App\Http\Controllers\Admin;

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
    public function index(): Response
    {
        Gate::authorize('viewAny', Shipping::class);

        return Inertia::render('Admin/Shipping/Index', [
            'shippings' => ShippingResource::collection(
                Shipping::orderBy('sort_order')->get()
            ),
        ]);
    }

    /**
     * Форма редагування конкретної служби.
     */
    public function edit(Shipping $shipping): Response
    {
        Gate::authorize('update', $shipping);

        return Inertia::render('Admin/Shipping/Edit', [
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

        return redirect()->route('admin.shippings.index')->with([
            'alert' => [
                'type'    => 'success',
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
                'type'    => 'success',
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
                'type'    => 'success',
                'message' => "Метод доставки `{$shipping->name}` додано.",
            ],
        ]);
    }
}
